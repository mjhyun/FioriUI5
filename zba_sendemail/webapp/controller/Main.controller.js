sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, Fragment, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("zbasendemail.controller.Main", {
            echeckGroup: function(oContext){
                if (oContext.getProperty().Echeck == 'N') {
                    return '미발송'
                } else if (oContext.getProperty().Echeck == 'Y') {
                    return '발송'
                }
            },
            
            onInit: function () {
            },

            onFilterInvoices: function() { // 검색 창

            },

            onPress: function (oEvent) {
                var sPath = oEvent.getSource().getBindingContext().getPath();
                var sValue = oEvent.getSource().getBindingContext().getObject()

                this.getOwnerComponent().getModel().read(sPath+"/ZBA_SDT110",{
                    success: function (oReturn) {
                        console.log(oReturn)
                        var oModel = new JSONModel(oReturn)
                        return this.onLoadFragment(sValue, oModel)
                    }.bind(this)
                })

            },

            onLoadFragment: function(sValue, oModel) {
                if (sap.ui.getCore().byId("invoiceDialog")){
                    return this.onFragment(sValue, oModel)
                } else {
                Fragment.load({
                    name: 'zbasendemail.view.fragment.Invoice',
                    type: 'XML',
                    controller : this
                    }).then(function() {
                        return this.onFragment(sValue, oModel)
                    }.bind(this));
                }
            },

            onFragment: function(sValue, oModel) {
                if (sValue.Echeck == 'Y'){ // 발송 버튼 표시 유무
                    sap.ui.getCore().byId("sendBtn").setVisible(false)
                } else {
                    sap.ui.getCore().byId("sendBtn").setVisible(true)
                }
                
                // fragment 표시할 데이터
                sap.ui.getCore().byId("dPaynr").setText(sValue.Paynr)
                sap.ui.getCore().byId("dPernr").setText(sValue.Pernr)
                sap.ui.getCore().byId("dInvdt").setText(sap.ui.core.format.DateFormat.getDateTimeInstance({
                    pattern : 'yyyy.MM.dd'}).format(sValue.Invdt))

                sap.ui.getCore().byId("dCharge").setNumber(sap.ui.core.format.NumberFormat.getCurrencyInstance({"showMeasure": false}).format(sValue.Charge, sValue.Waers)).setUnit("KRW")
                sap.ui.getCore().byId("dOddat").setText(sap.ui.core.format.DateFormat.getDateTimeInstance({
                    pattern : 'yyyy.MM.dd'}).format(sValue.Oddat))

                var nDate = new Date(sValue.Oddat.setDate(sValue.Oddat.getDate() + 60))
                sap.ui.getCore().byId("dDate").setText(sap.ui.core.format.DateFormat.getDateTimeInstance({
                    pattern : 'yyyy.MM.dd'}).format(nDate))                    

                sap.ui.getCore().byId("dStceg").setText(sValue.Stceg)
                sap.ui.getCore().byId("dKutxt").setText(sValue.Kutxt)
                sap.ui.getCore().byId("iditemTable").setModel(oModel, "item")
                sap.ui.getCore().byId("invoiceDialog").open()
            },

            onSend: function() { // 이메일 발송
                var Paynr = sap.ui.getCore().byId("dPaynr").getText()
                var OdataModel = this.getOwnerComponent().getModel()

                var eModel = {                                
                sYear: sap.ui.getCore().byId("dInvdt").getText().slice(0,4),
                sMonth: sap.ui.getCore().byId("dInvdt").getText().slice(5,7),
                Kutxt: sap.ui.getCore().byId("dKutxt").getText(),
                Stceg: sap.ui.getCore().byId("dStceg").getText(),
                Invdt: sap.ui.getCore().byId("dInvdt").getText(),
                Date:  sap.ui.getCore().byId("dDate").getText(),
                Charge: sap.ui.getCore().byId("dCharge").getNumber()
                }

                // 아이템 가져오기
                debugger;
                for(var i=0; i<sap.ui.getCore().byId("iditemTable").getBinding("items").getLength(); i++){
                    eModel['Matnm'+i] = document.getElementById(`matnm-iditemTable-${i}`).innerText
                    eModel['Sapri'+i] = document.getElementById(`sapri-iditemTable-${i}-number`).innerText
                    eModel['Auqua'+i] = document.getElementById(`auqua-iditemTable-${i}-number`).innerText
                    eModel['Auamo'+i] = document.getElementById(`auamo-iditemTable-${i}-number`).innerText
                }

                // 메일 발송 상태 업데이트
                var uData = {Echeck: 'Y'}

                MessageBox.warning("대금청구서를 발송하시겠습니까?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if (sAction == 'OK') {
                            sap.ui.getCore().byId("sendBtn").setText("발송 중...")
                            emailjs.send("service_k702msg","template_7n4g8nj",eModel,"xxw-vjcdFzTijeF9J")
                            .then(function(response) {
                                OdataModel.update(`/ZBA_SDT100Set('${Paynr}')`, uData, {
                                    success: function() {
                                        console.log("success")
                                    },
                                    error: function() {
                                    }
                                })
                                sap.ui.getCore().byId("sendBtn").setText("이메일 발송")
                                MessageToast.show("대금청구서가 발송되었습니다.")
                                console.log('SUCCESS!', response.status, response.text);
                                sap.ui.getCore().byId("invoiceDialog").close()
                                OdataModel.refresh(true)
                             }, function(error) {
                                MessageToast.show("발송 실패")
                                console.log('FAILED...', error);
                             });
                        }
                    }
                })
            },

            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            }
        });
    });
