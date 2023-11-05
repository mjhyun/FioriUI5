sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
    "sap/f/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, FilterOperator, Filter, Fragment, fioriLibrary) {
        "use strict";

        return Controller.extend("zbapricemanager.controller.Main", {
            onInit: function () {
            },
            
            // 리스트 누를때 Detail.view.xml 화면으로 이동
            onListItemPress: function(oEvent) {
                var oRouter = this.getOwnerComponent().getRouter();
                var getParam = oEvent.getParameters().listItem.getBindingContext().getObject().Kunnr;

                oRouter.navTo("RouteDetail" // 라우트 객체 이름 설정
                , {
                    paramCust: getParam
                });
            },

            onSearch: function(oEvent) {
                var inputNm = this.byId("searchInput").getValue();
                var bindItem = this.byId("CustomerTable").getBinding('items')

                var aFilters = []

                if(inputNm){
                    aFilters.push(
                        new Filter({
                            path: "Kutxt",
                            operator: FilterOperator.Contains,
                            value1: inputNm
                        }))
                }
                bindItem.filter(aFilters)
            },

            onAdd: function () {
                if (sap.ui.getCore().byId("customerDialog")){
                    sap.ui.getCore().byId("customerDialog").open()
                } else {
                Fragment.load({
                    name: 'zbapricemanager.view.fragment.Add',
                    type: 'XML',
                    controller : this
                    }).then(function(oDialog) {
                        oDialog.open();
                    }.bind(this));
                }
            },

            // Table Insert
            onInsert: function() {

            },


            // input 필드 초기화
            onAfterOpen: function() {
                for(var i=0; i<document.getElementsByTagName('Input').length-1; i++){
                    document.getElementsByTagName('Input')[i].value = ''
                 }
            },

            // fragment 닫기
            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
            }
        });
    });
