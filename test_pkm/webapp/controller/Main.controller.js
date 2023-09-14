sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("testpkm.controller.Main", {
            onInit: function () {
                var newModel = new JSONModel()
                this.getView.setModel(newModel)
            }
        });
    });
