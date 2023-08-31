sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("projectb1001.controller.Main", {
            onHelloWorld: function () {
                // let addr = "application-projectb1001-display-component---Main--"
                // let inner = "-inner"
                // let x = document.getElementById(addr+"_IDinput"+inner).value
                let y = this.getView().byId("_IDinput"); // getView()는 생략 가능
                let x = y.getValue();
                let z = this.byId("_IDGenText1")
                z.setText(x);
            },

            onPressButton: function () {
                let y = this.byId("_IDinput");
                let x = y.getValue();
                alert(x);
            },

            onInit: function () {

        }
    });
});
