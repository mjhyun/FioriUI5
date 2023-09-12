sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("projectb1006.controller.Detail", {
            onInit: function() {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._patternMatched, this)
            },

            _patternMatched: function(oEvent) {
                // 파라미터로 받은 값 가져오기
                var oParam = oEvent.getParameters().arguments;

                //oParam 안에는 manifest.json에 등록된
                //RouteDetail의 Parameter의 값들이 있음
                //{paramOrder: 'OrderID', param2: undefined}

                this.getView().bindElement(`/Orders(${oParam.paramOrder})`);
                var oModel = this.getView().getModel()
                var sPath = oModel.createKey('/Orders', {
                    OrderID : oParam.paramOrder
                });

                oModel.read(sPath, {
                    urlParameters: {
                        '$expand' : 'Order_Details'
                    },
                    success: function(oReturn) {
                        var detail = new JSONModel(oReturn.Order_Details)
                        this.byId("idODTable").setModel(detail)
                        console.log(this.byId("idODTable").getModel())
                        ; // json data
                        // JSON DATA를 JSON Model에 넣어서 사용가능..
                    }.bind(this),
                    error: function(oError) {
                        console.log(oError)

                    }
                })

            },

            

            onNavMain: function() { // 뒤로가기 버튼
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain");
            }
        })
    });
