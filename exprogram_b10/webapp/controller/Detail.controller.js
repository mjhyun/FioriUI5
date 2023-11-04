sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("exam.exprogramb10.controller.Detail", {
            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._patternMatched, this)
            },

            _patternMatched: function(oEvent) {
                var oParam = oEvent.getParameters().arguments;
                var oModel = this.getView().getModel()
                var sPath = `/carrierSet('${oParam.paramID}')`

                // var sPath = oModel.createKey('/carrierSet', {
                //     Carrid : oParam.paramID
                // });

                oModel.read(sPath, {
                    urlParameters: {
                        '$expand' : 'to_Flight'
                    },
                    success: function(oReturn) {
                        this.getView().bindElement(sPath); // Detail 테이블 경로 바인딩
                        var oModel = new JSONModel(oReturn.to_Flight)
                        this.byId("idFlightTable").setModel(oModel, "flightList")
                    }.bind(this)
                })

            },

            onNavMain: function() { // 뒤로가기 버튼
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain");
            }
        })
    });
