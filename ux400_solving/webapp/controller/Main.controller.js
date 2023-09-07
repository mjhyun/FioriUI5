sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("Sap.btp.ux400solving.controller.Main", {
            formatter : {
                transformDiscontinued: function(getData) {
                    if(getData == true) {
                        return "Yes"
                    } else {
                        return "No"
                    }
                }
            },

            onInit: function () {
                let oData = {list:[]}
                let oModel = new JSONModel(oData)
                this.getView().setModel(oModel)
            },

            onRandomPress: function() {
                let ranNum = Math.floor(Math.random() * 100) + 1
                let putInput = this.byId("idInput")
                putInput.setValue(ranNum)
                this.onAdd(ranNum)
            },

            onAdd: function(getData) {
                let oModel = this.getView().getModel()
                let arr = oModel.getProperty("/list")
                arr.push({text: getData})
                oModel.setProperty("/list", arr)
            },

            onDialog: function () {
                this.getView().setModel(this.getOwnerComponent().getModel())

                let oDialog = this.byId("idDialog");

                if(oDialog){
                    oDialog.open()
                    console.log(oDialog)
                } else {
                this.loadFragment({
                        name: 'Sap.btp.ux400solving.view.fragment.Products',
                        type: 'XML'
                    }).then(function (oDialog) {
                        console.log(oDialog)
                        oDialog.open();
                    }.bind(this));
                }
                // sap.ui.getCore().setModel(this.getOwnerComponent().getModel())
            
                // if(!sap.ui.getCore().byId("idDialog")) {
                // Fragment.load({
                //     name: 'Sap.btp.ux400solving.view.fragment.Products',
                //     type: 'XML',
                //     controller : this
                //     }).then(function(oDialog) {
                //         oDialog.open();
                //     });
                // } else {
                //     sap.ui.getCore().byId("idDialog").open()
                // }
            },

            onClose: function() {
                //sap.ui.getCore().byId("idDialog").close()
                this.byId("idDialog").close()
            },

            onValueChange: function(oEvent) {
                let uNum = this.byId("idInput").getValue()

                if (uNum > 0 && uNum <= 100) {
                    oEvent.getSource().setValueState("None");
                    this.onAdd(uNum)

                } else {
                    oEvent.getSource().setValueState("Error")
                    this.byId("idInput").setValueStateText("1이상 100이하 숫자를 넣어주세요")
                }
            },

        });
    });
