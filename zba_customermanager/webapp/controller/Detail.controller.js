sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("zbacustomermanager.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._patternMatched, this)
                this.getOwnerComponent().getModel().refresh(true)
            },

            _patternMatched: function(oEvent) {
                // 파라미터로 받은 값 가져오기
                var oParam = oEvent.getParameters().arguments;
                this.getView().bindElement(`/ZBA_SDT010Set('${oParam.paramCust}')`);

                var queryMap = this.getView().byId("idAddr").getText()

                naver.maps.Service.geocode({
                    query: queryMap
                }, function(status, response) {
                    if (status !== naver.maps.Service.Status.OK) {
                        return alert('Something wrong!');
                    }
                    var result = response.v2, // 검색 결과의 컨테이너
                    items = result.addresses; // 검색 결과의 배열
                    return this.onMap(items);
            }.bind(this))
            },

            onMap: function(items) { // 지도
                var mapOps = document.getElementById('application-zbacustomermanager-display-component---Main--detailView--mapBox');
                var x = items[0].x
                var y = items[0].y

                var mapLat = new naver.maps.LatLng(y,x) // 좌표 지정
                var map = new naver.maps.Map(mapOps, {center: mapLat, zoom: 19}) // 지도 호출
                
                var marker = new naver.maps.Marker({ // 마커 지정
                    map: map,
                    position: mapLat
                });
            },

            onNavMain: function() { // 뒤로가기 버튼
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteMain");
            },

            onEdit: function(oEvent) {
                if (!this.getView().byId("kunnr_detail").getText()) {
                    MessageToast.show("수정할 수 없습니다.");
                } else {
                this.getOwnerComponent().byId("Main").byId("flexibleColumnLayout").setLayout("ThreeColumnsMidExpanded")
                var oRouter = this.getOwnerComponent().getRouter();
                var getParam = oEvent.getSource().getBindingContext().getObject().Kunnr

                oRouter.navTo("RouteEdit", {paramCust: getParam});
                }
            },

            onDelete: function() {
                MessageBox.warning("정말 삭제하시겠습니까?", {
                    actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if (sAction == 'OK') {
                            var oDataModel = this.getOwnerComponent().getModel()
                            
                            var oData = {
                                Kunnr : this.getView().byId("kunnr_detail").getText(),
                                Delet : 'X'
                            }

                            oDataModel.update(`/ZBA_SDT010Set('${oData.Kunnr}')`, oData, {
                                success: function() {
                                    MessageToast.show("고객 정보가 삭제되었습니다.")
                                    oDataModel.refresh(true)
                                    
                                },
                                error: function() {
                                    MessageToast.show("고객 정보 삭제 실패")
                                }
                            })                
                        }
                    }.bind(this)
                })
            }
        })
    })