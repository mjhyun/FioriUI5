sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zbapricemanager.controller.Main", {
            onInit: function () {

            },

            onNavDetail: function(getParam) {
                //Detail.view.xml 화면으로 이동
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail" // 라우트 객체 이름 설정
                , {
                    paramOrder: getParam
                    //param2: 'Option'
                });
            },
        });
    });
