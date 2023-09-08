sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, FilterOperator, Filter) {
        "use strict";

        return Controller.extend("projectb1006.controller.Main", {
            formatter : { // 객체를 통해 함수 관리
                // fnDateString => 날짜 객체를 yyyy-mm-dd 형태로 변경
                fnDateString : function (oDate) {
                    if(oDate){
                    var oDateTimeInstance = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern : 'yyyy-MM-dd'
                    })
                    return oDateTimeInstance.format(oDate);
                    }
                }
            },


            onInit: function () {
            },

            onValueHelp: function () {

                if (sap.ui.getCore().byId("idDialog")){
                    sap.ui.getCore().byId("idDialog").open()
                } else {
                Fragment.load({
                    name: 'projectb1006.view.fragment.Order',
                    type: 'XML',
                    controller : this
                    // 팝업 안에서 이벤트 처리를 하려면 함수의 컨트롤러를 넘겨줘야함
                    //fragment에 this를 넘겨준다.
                    }).then(function(oDialog) {
                        oDialog.setModel(this.getView().getModel()) // Core에 setModel.
                        oDialog.open();
                    }.bind(this));
                }
            },

            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();
                },

            onBeforeOpen: function() {
                var oTable = sap.ui.getCore().byId("idOrderTable");
                var aFilters = [
                    new Filter({
                        path: "EmployeeID",
                        operator: "GE",
                        value1: 4
                    }),
                    new Filter({
                        path: "CustomerID",
                        operator: "Contains",
                        value1: 'R'
                    })
                ];

                var oFilter = new Filter({
                    path: "Price",
                    operator: FilterOperator.BT,
                    value1: 11.0,
                    value2: 23.0
                })

                // oTable의 rows에 바인딩된 정보를 가져와서 
                // 바인딩 정보 중 filter안에 필터 객체를 추가
                // => 이때 filter() 안에는 Object 또는 Array 형태가 들어갈 수 있음
                // oTable.getBinding('rows').filter() => 이렇게 하면 필터 초기화
                oTable.getBinding('rows').filter(aFilters)
            },

            onSearch: function() {
                var orderNum = this.byId("idInput").getValue();
                var aFilters = [
                    new Filter({
                        path: "OrderID",
                        operator: "EQ",
                        value1: orderNum 
                    }),
                ];
                this.byId("idProductsTable").getBinding('items').filter(aFilters)

            }
        })
    });
