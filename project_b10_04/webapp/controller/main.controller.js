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
                var oTable = this.byId("tableId")
                var rowCount = oTable.getSelectedIndices();
                console.log(rowCount)

                var oModel = this.getView().getModel(),
                arr = oModel.getProperty("/list");

                for(var i=0; i<rowCount.length; i++){
                    arr.splice(rowCount[i], rowCount.length);
                }
                    oModel.setProperty("/list", arr)
            }
        });
    });
