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
            formatter : { 
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

            onValueHelp2: function () {

                if (sap.ui.getCore().byId("idCustomerDialog")){
                    sap.ui.getCore().byId("idCustomerDialog").open()
                } else {
                Fragment.load({
                    name: 'projectb1006.view.fragment.CustomerID',
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

                // var oFilter = new Filter({
                //     path: "Price",
                //     operator: FilterOperator.BT,
                //     value1: 11.0,
                //     value2: 23.0
                // })

                // oTable의 rows에 바인딩된 정보를 가져와서 
                // 바인딩 정보 중 filter안에 필터 객체를 추가
                // => 이때 filter() 안에는 Object 또는 Array 형태가 들어갈 수 있음
                // oTable.getBinding('rows').filter() => 이렇게 하면 필터 초기화
                oTable.getBinding('rows').filter(aFilters)
            },

            onSearch: function() {
                var inputNm = this.byId("idInput").getValue();
                var inputCm = this.byId("idInput2").getValue();
                var getDateRange = this.byId("idDateRange")
                var bindItem = this.byId("idProductsTable").getBinding('items')

                var aFilters = []

                if(inputNm){
                    aFilters.push(
                        new Filter({
                            path: "OrderID",
                            operator: "EQ",
                            value1: inputNm
                        }))
                }

                if(inputCm) {
                    aFilters.push(
                        new Filter({
                            path: "CustomerID",
                            operator: "EQ",
                            value1: inputCm
                        }))
                }

                if(getDateRange.getDateValue() && getDateRange.getSecondDateValue()){
                    aFilters.push(
                    new Filter({
                        path: "OrderDate",
                        operator: "BT",
                        value1: getDateRange.getDateValue(), //getValue().split(" - ")[0],
                        value2: getDateRange.getSecondDateValue() //getValue().split(" - ")[1]
                    }))
                }

                bindItem.filter(aFilters)
                //bindItem.filter((aFilters.length && aFilters) || undefined);
            },

            onNavDetail: function(getParam) {
                //Detail.view.xml 화면으로 이동
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail" // 라우트 객체 이름 설정
                , {
                    paramOrder: getParam
                    //param2: 'Option'
                });
            },

            onSelectionChange: function (oEvent) {
            /* 
            var sPath = oEvent.getParameters().listItem.getBindingContextPath();
            var oModel = this.getView().getModel();
            oModel.getProperty로 해당 Row의 전체 데이터 가져오기
            전체데이터.OrderID를 통해 값 얻기 가능
            */
            var getId = oEvent.getParameters().listItem.getBindingContext().getObject().OrderID
            //var getId = oEvent.getParameters().listItem.getBindingContextPath().slice(8,13)
            return this.onNavDetail(getId)
        },

        onRowChange: function(oEvent) {
            var getId = this.getView().getModel().getProperty("/"+oEvent.getSource().getBinding('rows').aKeys[oEvent.getParameters().rowIndices]).OrderID
            this.byId("idInput").setValue(getId)
            sap.ui.getCore().byId("idDialog").close()
        },

        onRowChange2: function(oEvent) {
            var getId = this.getView().getModel().getProperty("/"+oEvent.getSource().getBinding('rows').aKeys[oEvent.getParameters().rowIndices]).CustomerID
            this.byId("idInput2").setValue(getId)
            sap.ui.getCore().byId("idCustomerDialog").close()
        }
    })
});