sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projectb1004.controller.main", {
            onInit: function () {
                var oData = { list : [] }
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

            },

            onAdd: function () {
                 var oModel = this.getView().getModel(),
                     arr = oModel.getProperty("/list");
                    
                arr.push(
                    {
                        Name : "",
                        Address : "",
                        Phone : "",
                        Department : ""
                    });
                    
                oModel.setProperty("/list", arr)
            },

            onDel: function () {
                var oModel = this.getView().getModel(),
                arr = oModel.getProperty("/list");

                var oTable = this.byId("tableId") // table 객체 가져옴
                var rowCount = oTable.getSelectedIndices(); // 선택한 row의 index를 배열 형태로 가져옴

                for(var i=rowCount.length-1; i>-1; i--){ // 1개뿐만 아니라 여러개의 row를 삭제시킬거기 때문에 반복문
                    arr.splice(rowCount[i], 1); // 배열 삭제 기능인 splice를 통해 삭제시킴 첫번째 파라미터는 삭제시킬 row의 인덱스값. 두번째 파라미터는 몇개 삭제시키는 건지 기술.
                }
                    oModel.setProperty("/list", arr) // 변경된 데이터를 모델에 적용
            },

            onRowActionItem: function (oEvent) {
                var oModel = this.getView().getModel(),
                arr = oModel.getProperty("/list");

                var getIndex = oEvent.getParameters().row.getIndex()
                arr.splice(getIndex,1)
                oModel.setProperty("/list", arr)
            }
        });
    });
