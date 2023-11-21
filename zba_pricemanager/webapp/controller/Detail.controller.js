sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zbapricemanager.controller.Detail", {
            onInit: function () {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetail").attachPatternMatched(this._patternMatched, this)
                this.getOwnerComponent().getModel().refresh(true)
            },

            _patternMatched: function(oEvent) {
                // 파라미터로 받은 값 가져오기
                var oParam = oEvent.getParameters().arguments;
                this.getView().bindElement(`/ZBA_SDT010Set('${oParam.paramCust}')`);

                var mapOps = document.getElementById('__section1-innerGrid');
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
                var mapOps = document.getElementById('__box1');
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
                if (this.getView().byId("kunnr_detail").getText()) {
                    
                } else {
                this.getOwnerComponent().byId("Main").byId("flexibleColumnLayout").setLayout("ThreeColumnsMidExpanded")
                var oRouter = this.getOwnerComponent().getRouter();
                var getParam = oEvent.getSource().getBindingContext().getObject().Kunnr

                oRouter.navTo("RouteEdit", {paramCust: getParam});
            }
            },

            onDelete: function() {
                var oDataModel = this.getOwnerComponent().getModel()
                
                var oData = {
                    Kunnr : this.getView().byId("kunnr_detail").getText(),
                    Delet : 'X'
                }

                oDataModel.update(`/ZBA_SDT010Set('${oData.Kunnr}')`, oData, {
                    success: function() {
                        oDataModel.refresh(true)
                        console.log("성공")
                    },
                    error: function() {}
                })                
            },
        })
    });