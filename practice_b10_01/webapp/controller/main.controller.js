sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment) {
        "use strict";

        return Controller.extend("practiceb1001.controller.main", {
            onInit: function () {

                let oModel = new JSONModel();
                oModel.loadData("../model/viewData.json", {}, false);
                // ../-> main/webapp으로 감 
                //true는 동기처리, false는 비동기 처리

                this.getView().setModel(oModel)
            },

            onCalc: function () {
                let num1 = this.byId("num1").getValue()
                let num2 = this.byId("num2").getValue()
                let opt = this.byId("opt").getSelectedItem().getText()
                let result = 0;

                // 값이 비어있거나 나눗셈할때 0 넣을 시 경고 메세지
                if (opt == "/" && num2 == 0) {
                    sap.m.MessageToast.show("0은 들어갈 수 없어요.")
                    return;
                } else if (num1 == "" || num2 == "") {
                    sap.m.MessageToast.show("값을 넣어주세요!")
                    return;
                }

                switch (opt) {
                    case '+':
                        result = Number(num1) + Number(num2)
                        break;
                    case '-':
                        result = Number(num1) - Number(num2)
                        break;
                    case '*':
                        result = Number(num1) * Number(num2)
                        break;
                    case '/':
                        result = Number(num1) / Number(num2)
                        break;
                }
                this.onAdd(num1, num2, opt, result)
                this.byId("num1").setValue("")
                this.byId("num2").setValue("")
            },

            onAdd: function (num1, num2, opt, result) {
                let aList = this.getView().getModel().getProperty("/list")

                aList.push({
                    num1: num1,
                    num2: num2,
                    operator: opt,
                    result: result
                })
                this.getView().getModel().setProperty("/list", aList)
            },
            onDel: function (oEvent) {
                let aList = this.getView().getModel().getProperty("/list")
                let getIndex = oEvent.getParameters().row.getIndex()

                aList.splice(getIndex, 1)
                this.getView().getModel().setProperty("/list", aList)
            },

            onOpenDialog: function (oDialog) { // Dialog 함수
                // if (!sap.ui.getCore().byId("idDialog")){
                // Fragment.load({
                //     name: 'practiceb1001.fragment.HelloDialog',
                //     type: 'XML',
                //     controller : this 
                //     // 팝업 안에서 이벤트 처리를 하려면 함수의 컨트롤러를 넘겨줘야함
                //     //fragment에 this를 넘겨준다.
                //     }).then(function(oDialog) {
                //         oDialog.open();
                //     });
                // } else {
                //     sap.ui.getCore().byId("idDialog").open()
                //     }

                ///////////////////////////////////////////////////////////////

                let oDialog = this.byId("idDialog");

                if (oDialog) {
                    oDialog.open();
                    
                } else {
                    console.log(this)
                    this.loadFragment({
                        name: 'practiceb1001.fragment.HelloDialog',
                        type: 'XML',
                    }).then(function (oDialog) {
                        oDialog.open();
                        console.log(this)
                    }.bind(this));
                }

            },

            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
                //sap.ui.getCore().byId("idDialog").close(); => Fragment.load쓸때

                /*66666666+
                    또 다른 방법: oEvent 이용
                    oEvent.getSource().getParent().close()
                */
            },

            onOpenDialog2: function () {
                if (this.byId('idDialogView')) {
                    this.byId('idDialogView').open();
                }
            }
        });
    });
