sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("SAP.BTP.ux410solving.controller.Detail", {
            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._patternMatched, this)
            },

            _patternMatched: function(oEvent) {
                debugger;
                var oParam = oEvent.getParameters().arguments;
                // {paramOrder: 10248, paramPid:72}
                this.getView().bindElement(`/Order_Details(OrderID=${oParam.paramOrder},ProductID=${oParam.paramPid})`);
            }
        })
    });
