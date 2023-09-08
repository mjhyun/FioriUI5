sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("projectb1006.controller.Detail", {
            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._patternMatched, this)
            },

            _patternMatched: function(oEvent) {
                // 파라미터로 받은 값 가져오기
                var oParam = oEvent.getParameters().arguments;
                console.log(oParam)
                
                //oParam 안에는 manifest.json에 등록된
                //RouteDetail의 Parameter의 값들이 있음
                //{paramOrder: 'OrderID', param2: undefined}
            },
            onNavMain: function() { // 뒤로가기 버튼
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain");
            }
        })
    });
