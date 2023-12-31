sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("zbacustomermanager.controller.Edit", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteEdit").attachPatternMatched(this._patternMatched, this)
            },

            _patternMatched: function(oEvent) {
                // 파라미터로 받은 값 가져오기
                var oParam = oEvent.getParameters().arguments;
                this.getView().bindElement(`/ZBA_SDT010Set('${oParam.paramCust}')`);
                var oModel = new JSONModel(this.getView().getModel())
                this.byId("SimpleFormChangeColumn_threeGroups234").setModel(oModel, "update")            
            },

            onUpdate: function() {
                var that = this;
                MessageBox.warning("정말 수정하시겠습니까?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if (sAction == 'OK') {
                        var oDataModel = this.getOwnerComponent().getModel()

                        var oData = {
                            Kunnr: this.getView().byId("kunnr").getValue(),
                            Kutxt: this.getView().byId("kutxt").getValue(),
                            Stceg: this.getView().byId("stceg").getValue(),
                            Brsch: this.getView().byId("brsch").getSelectedItem().getKey(),
                            Frepre: this.getView().byId("frepre").getValue(),
                            Ablad: this.getView().byId("ablad").getValue(),
                            Crert: this.getView().byId("crert").getSelectedItem().getKey(),
                            Cemail: this.getView().byId("cemail").getValue(),
                            Telp1: this.getView().byId("telp1").getValue(),
                            Adrnr: this.getView().byId("adrnr").getValue()
                        }

                        oDataModel.update(`/ZBA_SDT010Set('${oData.Kunnr}')`, oData, {
                            success: function() {
                                MessageToast.show("고객 정보가 업데이트 되었습니다.")
                                that.getOwnerComponent().byId("Main").byId("flexibleColumnLayout").setLayout("TwoColumnsMidExpanded")
                                oDataModel.refresh(true)
                            },
                            error: function() {
                                MessageToast.show("고객 정보 수정 실패")
                            }
                        })
                }
            }.bind(this)
        })},

            onCheckInput: function (oEvent) { // 유효성 검사
                var inputValue = oEvent.getSource().getValue()
                var inputId = oEvent.getSource().getId()
                console.log(inputId)
                console.log(inputValue)

                if(!inputValue){
                    oEvent.getSource().setValueState(sap.ui.core.ValueState.Error)
                    oEvent.getSource().setValueStateText("해당 필드는 비워둘 수 없습니다.")
                } else if(inputId == "application-zbacustomermanager-display-component---Main--EditView--cemail"){ // 이메일
                    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                    if (!regExp.test(inputValue)){
                        oEvent.getSource().setValueState(sap.ui.core.ValueState.Error)
                        oEvent.getSource().setValueStateText("잘못된 이메일 주소입니다.")                        
                    } else {
                        oEvent.getSource().setValueState(sap.ui.core.ValueState.None)
                    }
                } else {
                    oEvent.getSource().setValueState(sap.ui.core.ValueState.None)
                }

                if (inputId == "application-zbacustomermanager-display-component---Main--EditView--telp1"){ // 전화번호
                var inputValue2 = inputValue.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                oEvent.getSource().setValue(inputValue2)
                }

                if (inputId == "application-zbacustomermanager-display-component---Main--EditView--stceg"){ // 사업자번호
                    var sValue = inputValue.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
                    oEvent.getSource().setValue(sValue)
                    }
            },

            onAddrSearch: function (oEvent) {
                var addr = '';
                var themeObj = { searchBgColor: "#0B65C8", queryTextColor: "#FFFFFF" } // 적용할 테마
                if (oEvent.getParameters().searchButtonPressed) {
                new daum.Postcode({
                    theme: themeObj,
                    oncomplete: function(data) { // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
                        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                            addr = data.roadAddress;
                        } else { // 사용자가 지번 주소를 선택했을 경우(J)
                            addr = data.jibunAddress;
                        }
                        this.byId("searchInput").setValue(addr)                        
                    }.bind(this)
                    
                }).open({ popupTitle: '고객사 주소 검색' });
            }
            },

            onEditCancel: function(oEvent) { // 변경 취소 버튼
                this.getOwnerComponent().byId("Main").byId("flexibleColumnLayout").setLayout("TwoColumnsMidExpanded")
                // var oRouter = this.getOwnerComponent().getRouter();
                // var getParam = oEvent.getSource().getBindingContext().getObject().Kunnr
                // oRouter.navTo("RouteDetail", {paramCust:getParam});
            },
        });
    });
