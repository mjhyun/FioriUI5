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

        return Controller.extend("Sap.btp.ux400solving.controller.Main", {
            formatter : {
                transformDiscontinued: function(getData) {
                    console.log(getData)
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
                let oModel = this.getView().getModel()
                let arr = oModel.getProperty("/list")
                let putInput = this.byId("idInput")
                let ranNum = Math.floor(Math.random() * 100) + 1

                putInput.setValue(ranNum)

                arr.push({
                    text:ranNum
                })
                oModel.setProperty("/list", arr)
                
            },

            onDialog: function (oModel) {
                sap.ui.getCore().setModel(this.getOwnerComponent().getModel())
            
                if(!sap.ui.getCore().byId("idDialog")) {
                Fragment.load({
                    name: 'Sap.btp.ux400solving.view.fragment.Products',
                    type: 'XML',
                    controller : this
                    }).then(function(oDialog) {
                        oDialog.open();
                    });
                } else {
                    sap.ui.getCore().byId("idDialog").open()
                }
            },

            onClose: function() {
                sap.ui.getCore().byId("idDialog").close()
            },

            onValueChange: function(oEvent) {
                let uNum = this.byId("idInput").getValue()

                if (uNum > 0 && uNum <= 100) {
                    oEvent.getSource().setValueState("None")
                    let arr = this.getView().getModel().getProperty("/list")
                    arr.push({
                        text: uNum
                    })
                    this.getView().getModel().setProperty("/list", arr)

                } else {
                    oEvent.getSource().setValueState("Error")
                    return
                    
                }
            }
        });
    });
