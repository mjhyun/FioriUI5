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

        return Controller.extend("exam.exprogramb10.controller.Main", {
            onInit: function () {
                var currList = [{curr : "USD"},{curr : "EUR"},{curr : "KRW"}]
                var cModel = new JSONModel(currList);
                this.getView().setModel(cModel, "currList");
            },

            onSearch: function() {
                var inputCurr = this.byId("idCurrBox").getValue();
                var inputCarr = this.byId("idInput").getValue();
                var aFilters = []

                // 해당 값이 있을때 aFilters 배열에 필터값 추가
                if(inputCurr){
                    aFilters.push(
                        new Filter({
                            path: "Currcode",
                            operator: "EQ",
                            value1: inputCurr
                        }))
                }

                if(inputCarr) {
                    aFilters.push(
                        new Filter({
                            path: "Carrname",
                            operator: "Contains",
                            value1: inputCarr
                        }))
                }

                // 필터 적용
                this.byId("idCarrierTable").getBinding('items').filter(aFilters);
            },

            onInitFragment: function(oEvent) { // 해당 Row를 통해 경로 읽어오기
                //var sPath = oEvent.getSource().getBindingContext().getObject().Carrid
                var sPath = oEvent.getSource().getBindingContext().getPath();

                this.getView().getModel().read(sPath,{
                    urlParameters: { '$expand' : "to_Item" },
                    success: function (oReturn) {
                        return this.onFragment(oReturn.to_Item, sPath) // 아래의 onFragment 함수 호출
                    }.bind(this)
                })
            },

            onFragment: function(oReturn, sPath) { // Fragment 로드
                var oDialog = this.byId("idBookStatusDialog");
                
                if (oDialog) {
                    oDialog.bindElement(sPath);
                    this.byId("idBookStatusTable").setModel(new JSONModel(oReturn), "bookList");
                    this.byId("idFlatDatSet").setModel(new JSONModel(oReturn), "bookList");
                    oDialog.open();
                } else {
                    this.loadFragment({
                        name : 'exam.exprogramb10.view.fragment.Book'}
                        ).then(function (oDialog) {
                            oDialog.bindElement(sPath); // Dialog title 경로 지정
                            this.byId("idBookStatusTable").setModel(new JSONModel(oReturn), "bookList"); // fragment 테이블 모델 지정
                            this.byId("idFlatDatSet").setModel(new JSONModel(oReturn), "bookList"); // fragment 차트 모델 지정
                        oDialog.open();
                    }.bind(this));
                }
            },

            onClose: function() { // Dialog 닫기
                this.byId("idBookStatusDialog").close();
            },

            onDetail: function() { // Detail View 라우팅
                var getID = this.byId("idCarrierTable").getSelectedContexts()[0].getObject().Carrid;
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteDetail", {paramID: getID});
            }
        });
    });
