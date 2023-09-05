sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("practiceb1001.controller.main", {
            onInit: function () {
                let oData = { list : [],
                              operators : [{ operatorText : "+"},
                              { operatorText : "-"},
                              { operatorText : "*"},
                              { operatorText : "/"}]}
                let oModel = new JSONModel(oData)
                this.getView().setModel(oModel)
            },

            onCalc: function () {
                let num1 = this.byId("num1").getValue()
                let num2 = this.byId("num2").getValue()
                let opt = this.byId("opt").getSelectedItem().getText()
                let result = 0;

                // 값이 비어있거나 나눗셈할때 0 넣을 시 경고 메세지
                if ( opt == "/" && num2 == 0 ) {
                    sap.m.MessageToast.show("0은 들어갈 수 없어요.")
                    return;
                } else if ( num1 == "" || num2 == "" ){
                    sap.m.MessageToast.show("값을 넣어주세요!")
                    return;
                } 

              switch (opt) {
                case '+':
                    result = Number(num1) + Number(num2)
                    break;
                case '-':
                    result = Number(num1) - Number(num2)
                    break;
                case '*':
                    result = Number(num1) * Number(num2)
                    break;
                case '/':
                    result = Number(num1) / Number(num2)
                    break;
            }
            this.onAdd(num1, num2, opt, result)
            this.byId("num1").setValue("")
            this.byId("num2").setValue("")
        },

        onAdd: function (num1, num2, opt, result) {
            let aList = this.getView().getModel().getProperty("/list")

            aList.push ({
                num1 : num1,
                num2 : num2,
                operator : opt,
                result : result
            })
            this.getView().getModel().setProperty("/list", aList)
        },

        onDel: function (oEvent) {
            let aList = this.getView().getModel().getProperty("/list")
            let getIndex = oEvent.getParameters().row.getIndex()

            aList.splice(getIndex, 1)
            this.getView().getModel().setProperty("/list", aList)
        }
        });
    });
