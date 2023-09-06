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

        return Controller.extend("projectb1006.controller.Main", {
            onInit: function () {
            },

            onValueHelp: function () {
                sap.ui.getCore().setModel(this.getView().getModel()) // Core에 setModel.
                
                if (!sap.ui.getCore().byId("idDialog")){
                Fragment.load({
                    name: 'projectb1006.view.fragment.Order',
                    type: 'XML',
                    controller : this
                    // 팝업 안에서 이벤트 처리를 하려면 함수의 컨트롤러를 넘겨줘야함
                    //fragment에 this를 넘겨준다.
                    }).then(function(oDialog) {
                        
                        oDialog.open();
                    });
                } else {
                    sap.ui.getCore().byId("idDialog").open()
                    }
                },

            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
                },
            })
        });
