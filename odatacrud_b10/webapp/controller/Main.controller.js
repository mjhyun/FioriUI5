sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter) {
        "use strict";

        return Controller.extend("odatacrudb10.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel()
                this.getView().setModel(oModel, 'view')
            },

            onRead: function(){
                // var getId = this.byId("idMemberTable").getSelectedContexts()[0].getObject().MB_ID
                // var bindItem = this.byId("idMemberTable").getBinding('items')

                // var aFilters = new Filter({
                //         path: "MB_ID",
                //         operator: "EQ",
                //         value1: getId
                //     })
                    
                //     bindItem.filter(aFilters)

                var oModel = this.getView().getModel('view')

                var oDataModel = this.getOwnerComponent().getModel();
                debugger;
                var sValue = this.byId("idMemberTable").getSelectedContexts()[0].getObject().MB_ID
                var sPath = oDataModel.createKey("/MemberSet", {
                    MB_ID : sValue
                })
                
                //GET요청
                oDataModel.read(sPath, {
                    success: function(oReturn) {
                        oModel.setProperty("/", oReturn) 
                        // var jModel = new JSONModel(oReturn)
                        // this.getView().setModel(jModel)
                    }.bind(this),
                    error: function(oError){
                        console.log('Error 발생');
                    }
                });
            },

            onCreate: function(){
                var oDataModel = this.getOwnerComponent().getModel();
                var oModel = this.getView().getModel('view') // input 모델 가져옴
                var oBody = oModel.getData()

                console.log(oBody)

                oDataModel.create('/MemberSet', oBody, {
                    success: function() {
                        oDataModel.refresh(true)
                    },
                    error: function() {
                        console.log('Error 발생');
                    }
                }) // '경로(EntitiySetName)', {생성할데이터}, {설정}

            },

            // PUT : /EntitySetName('keyValue') + Body
            onUpdate: function() {
                var oDataModel = this.getOwnerComponent().getModel();
                var oModel = this.getView().getModel('view') // input 모델 가져옴
                var oBody = oModel.getData()

                oDataModel.update(`/MemberSet('${oBody.MB_ID}')`, oBody, {
                    success: function() {
                        oDataModel.refresh(true)
                    },
                    error: function() {}
                })

            },

            // DELETE : /EntitySetName('keyValue')
            onDelete: function(){
                var oTable = this.byId("idTable")
                var sValue = oTable.getSelectedContexts()[0].getObject().CustId
                var oDataModel = this.getOwnerComponent().getModel();

                var sPath = oDataModel.createKey("/ZBB_SDT030", {
                    MB_ID : sValue
                })

                oDataModel.remove(sPath, {
                    success: function() {
                        oDataModel.refresh(true)
                    }
                });
            }
        });
    });
