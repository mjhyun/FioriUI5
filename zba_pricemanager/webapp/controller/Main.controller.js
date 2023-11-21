sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/ui/core/Fragment",
    "sap/f/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, FilterOperator, Filter, Fragment, fioriLibrary) {
        "use strict";

        return Controller.extend("zbapricemanager.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel()
                sap.ui.getCore().setModel(oModel, 'view')
            },
            
            // 리스트 누를때 Detail.view.xml 화면으로 이동
            onListItemPress: function(oEvent) {
                // 2개 Column으로 초기화
                this.getOwnerComponent().byId("Main").byId("flexibleColumnLayout").setLayout("TwoColumnsMidExpanded")

                var oRouter = this.getOwnerComponent().getRouter();
                var getParam = oEvent.getParameters().listItem.getBindingContext().getObject().Kunnr;

                oRouter.navTo("RouteDetail", {
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
                    }).then(function() {
                        sap.ui.getCore().byId("customerDialog").open();
                    }.bind(this));
                }
            },

            // Table Insert
            onInsert: function(oEvent) {
                var oDataModel = this.getOwnerComponent().getModel();
                var oModel = sap.ui.getCore().getModel('view') // input 모델 가져옴
                var oBody = oModel.getData()

                oDataModel.create('/ZBA_SDT010Set', oBody, {
                    success: function() {
                        oDataModel.refresh(true)
                        console.log('성공이요');
                    },
                    error: function() {
                        console.log('Error 발생');
                    }
                }) // '경로(EntitiySetName)', {생성할데이터}, {설정}
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
            },

            onCheckInput: function (oEvent) { // 유효성 검사
                var inputValue = oEvent.getSource().getValue()
                var inputId = oEvent.getSource().getId()
                console.log(inputId)
                console.log(inputValue)

                if(!inputValue){
                    oEvent.getSource().setValueState(sap.ui.core.ValueState.Error)
                    oEvent.getSource().setValueStateText("해당 필드는 비워둘 수 없습니다.")
                } else if(inputId == "__input4"){ // 이메일
                    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                    if (!regExp.test(inputValue)){
                        oEvent.getSource().setValueState(sap.ui.core.ValueState.Error)
                        oEvent.getSource().setValueStateText("잘못된 이메일 주소입니다.")                        
                    } else {
                        oEvent.getSource().setValueState(sap.ui.core.ValueState.None)
                    }
                } else {
                    oEvent.getSource().setValueState(sap.ui.core.ValueState.None)
                }

                if (inputId == "__input5"){ // 전화번호
                var inputValue2 = inputValue.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
                oEvent.getSource().setValue(inputValue2)
                }

                if (inputId == "__input1"){ // 사업자번호
                    var sValue = inputValue.replace(/[^0-9]/g, '').replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
                    oEvent.getSource().setValue(sValue)
                    }


            },

            // onCheckInput: function (oEvent) {
            //     var inputValue = oEvent.getSource().getValue()
            //     var inputId = oEvent.getSource().getId()

            //     if(!inputValue){
            //         oEvent.getSource().setValueState(sap.ui.core.ValueState.Error)
            //         oEvent.getSource().setValueStateText("해당 필드는 비워둘 수 없습니다.")
            //     } else if (inputId == "__input0" && inputValue.length > 6){
            //         oEvent.getSource().setValueState(sap.ui.core.ValueState.Error)
            //         oEvent.getSource().setValueStateText("해당 필드는 6자리 까지만 입력가능합니다.")
            //     } else {
            //         oEvent.getSource().setValueState(sap.ui.core.ValueState.None)
            //       }              
            // },
            
            onAddrSearch: function () {
                var addr = '';
                var themeObj = { searchBgColor: "#0B65C8", queryTextColor: "#FFFFFF" } // 적용할 테마
                new daum.Postcode({
                    theme: themeObj,
                    oncomplete: function(data) { // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
                        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                            addr = data.roadAddress;
                        } else { // 사용자가 지번 주소를 선택했을 경우(J)
                            addr = data.jibunAddress;
                        }
                        sap.ui.getCore().byId("searchInput").setValue(addr)                        
                    }
                    
                }).open({ popupTitle: '고객사 주소 검색' });
            }
        });
    });
