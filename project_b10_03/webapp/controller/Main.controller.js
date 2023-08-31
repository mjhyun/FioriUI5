sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("projectb1003.controller.Main", {
            onInit: function () {
                },

            onCalc: function () {
                let opt = this.byId("selectId").getSelectedKey()
                let sText = this.byId("textId")
                let result = 0;

                let num1 = Number(this.byId("inputId").getValue())
                let num2 = Number(this.byId("inputId2").getValue())

                if (num1 == "") {
                    alert("숫자 입력하세요!!!!!!")
                    exit
                } else if (opt == "plus") {
                    result = num1 + num2;
                } else if (opt == "minus") {
                   result = num1 - num2;
                } else if (opt == "multiple") {
                    result = num1 * num2;
                } else if (opt == "division") {
                    if (!num2) {
                        alert("해당값은 넣을 수 없습니다!!")
                        //return this.byId("inputId2").fireEvent('onChange')
                    } result = num1 / num2;
                }
                sText.setText(result);
            },

            onChange: function(oEvent) {
                let opt = this.byId("selectId").getSelectedKey()
                let bt = this.byId("calcButton")

                var nNum = Number(oEvent.getParameters().value); // 0 or NaN
                if (opt == "division" && !nNum) {
                    oEvent.getSource().setValueState("Error")
                    bt.setEnabled(false)
                } else {
                    oEvent.getSource().setValueState("Success")
                    bt.setEnabled(true)
                }
            }

        });
    });
