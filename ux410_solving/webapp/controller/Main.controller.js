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

        return Controller.extend("SAP.BTP.ux410solving.controller.Main", {
            onInit: function () {
                var arr = [{type : "bar"}, 
                            {type : "column"}, 
                            {type : "line"}, 
                            {type : "donut"}]
                var JModel = new JSONModel(arr)
                this.getView().setModel(JModel, "typeList")

            },

            onChange: function(oEvent) {
                if(oEvent.getParameters().value == "") {
                    oEvent.getSource().setValueState("Error")
                } else {
                    oEvent.getSource().setValueState("None")
                }
            },

            onSearch: function() {
                var getComb = this.byId("idComboBox").getSelectedItem()
                var getType = this.byId("idComboBox2").getSelectedItem().getText()
                var bindItem = this.byId("idFDset").getBinding('data')
                var aFilters = []

                bindItem.filter(aFilters)

                // 필터 적용
                if(getComb != null){
                    var getOid = getComb.getText()

                    aFilters.push(
                        new Filter({
                            path: "OrderID",
                            operator: "EQ",
                            value1: getOid
                        }))
                }

                bindItem.filter(aFilters)

                // type 변경
                this.byId("idChart").setVizType(getType);
            },

            onSelectData: function(oEvent) {
                var getOid = oEvent.getParameters().data[0].data.OrderID
                var getPid = oEvent.getParameters().data[0].data.ProductID
                debugger
                return this.onNavDetail(getOid, getPid)

            },

            onNavDetail: function(getOid, getPid) {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail" // 라우트 객체 이름 설정
                , {
                    paramOrder: getOid,
                    paramPid: getPid
                });
            }
        });
    });
