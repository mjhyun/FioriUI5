sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zbapricemanager.controller.Detail", {
            onInit: function () {
                if (this.getView().byId("idHtitle").getText() == "") {
                    // 빈화면
                }
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._patternMatched, this)
            },

            _patternMatched: function(oEvent) {
                // 파라미터로 받은 값 가져오기
                var oParam = oEvent.getParameters().arguments;
                this.getView().bindElement(`/ZBA_SDT010Set('${oParam.paramCust}')`);

                //oParam 안에는 manifest.json에 등록된
                //RouteDetail의 Parameter의 값들이 있음
                //{paramOrder: 'OrderID', param2: undefined}
            },

            onNavMain: function() { // 뒤로가기 버튼
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain");
            },

            onEdit: function(oEvent) {
                this.getOwnerComponent().byId("Main").byId("flexibleColumnLayout").setLayout("ThreeColumnsMidExpanded")
                var oRouter = this.getOwnerComponent().getRouter();
                var getParam = oEvent.getSource().getBindingContext().getObject().Kunnr

                oRouter.navTo("RouteEdit", {paramCust: getParam});
            },

            onDelete: function() {
                var oDataModel = this.getOwnerComponent().getModel()
                
                var oData = {
                    Kunnr : this.getView().byId("kunnr_detail").getText(),
                    Delet : 'X'
                }

                oDataModel.update(`/ZBA_SDT010Set('${oData.Kunnr}')`, oData, {
                    success: function() {
                        oDataModel.refresh(true)
                        console.log("성공")
                    },
                    error: function() {}
                })                
            },
        })
    });