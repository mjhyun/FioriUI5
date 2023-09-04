sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("projectb1005.controller.HelloPanel", {
            onInit: function () {
                
            },

            onShowHello: function () {
                //var that = this; => 변수에 this 반영
                sap.m.MessageBox.success('버튼 클릭', {
                    title: "Success",
                    onClose: function(action) {
                        switch (action) {
                            case 'YES':
                                //sap.m.MessageToast.show('YES Click');
                                this.afterSuccess()
                                break;
                            case 'NO':
                                sap.m.MessageToast.show('NO Click');
                                break;
                        }
                    }.bind(this),
                    actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
                    emphasizedAction: sap.m.MessageBox.Action.YES,
                })
            },

            afterSuccess: function () {
                sap.m.MessageToast.show('생성 후 로직');
            }

        });
    });