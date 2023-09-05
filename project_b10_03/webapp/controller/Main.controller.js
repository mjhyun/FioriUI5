sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projectb1003.controller.Main", {
            onInit: function () {
                var oData = { title : "Me", 
                              list  : 
                              [
                                {num1: 12, operator: '+', num2: 13, result: 25}
                              ],
                              age   :  29} // json data 생성
                var oModel = new JSONModel(oData); // json data를 포함한 json model 생성
                this.getView().setModel(oModel, 'Main'); // json model을 view에서 사용할 수 있도록 세팅
                },

            onCalc: function () {
                var opt = this.byId("selectId").getSelectedKey()
                let sText = this.byId("textId")
                var result = 0;

                var num1 = Number(this.byId("inputId").getValue())
                var num2 = Number(this.byId("inputId2").getValue())

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
                //sText.setText(result);
                this.onAdd(result);
            },

            onAdd: function(result) {
                let opt = this.byId("selectId").getSelectedItem().getText()
                 let num1 = Number(this.byId("inputId").getValue())
                 let num2 = Number(this.byId("inputId2").getValue())
                // main 모델의 list 배열 데이터를 가져오는 방법
                var oModel = this.getView().getModel("Main"), // Main 모델 가져오기
                    //aList = oModel.getData().list, // list 배열 데이터 가져오기: getData는 모델의 데이터를 전부 가져온다
                    aList = oModel.getProperty("/list"); // list 배열 데이터 가져오기2: getProperty는 경로에 맞는 데이터를 
                                                          // 가져온다.
                    
                aList.push(
                    {
                        num1: num1, 
                        operator: opt, 
                        num2: num2, 
                        result : result
                    }); // 데이터 추가
                oModel.setProperty("/list", aList) // aList의 list배열에 aList2 데이터 세팅
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
