sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("zbapricemanager.controller.Edit", {
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
                var oDataModel = this.getOwnerComponent().getModel()

                var oData = {
                    Kunnr: this.getView().byId("kunnr").getValue(),
                    Kutxt: this.getView().byId("kutxt").getValue(),
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
                        oDataModel.refresh(true)
                        console.log("성공")
                    },
                    error: function() {}
                })
            },

            onEditCancel: function(oEvent) { // 변경 취소 버튼
                this.getOwnerComponent().byId("Main").byId("flexibleColumnLayout").setLayout("TwoColumnsMidExpanded")
                // var oRouter = this.getOwnerComponent().getRouter();
                // var getParam = oEvent.getSource().getBindingContext().getObject().Kunnr
                // oRouter.navTo("RouteDetail", {paramCust:getParam});
            },
        });
    });
