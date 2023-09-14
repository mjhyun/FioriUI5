sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projectb1007.controller.Main", {
            onInit: function () {
                this._setChartInView()
                this._setChartInController()
            },

            _setChartInView: function() {
                var arr = {list : [{name:'aaa', rate:'35', cost:'10'},
                                    {name:"bbb", rate:"15", cost:"12"},
                                    {name:"ccc", rate:"10", cost:"4"},
                                    {name:"ddd", rate:"5", cost:"6"},
                                    {name:"eee", rate:"15", cost:"10"},
                                    {name:"fff", rate:"10", cost:"15"}]}
                var view = new JSONModel(arr)
                this.getView().setModel(view, 'view');
            },

            _setChartInController: function() {
                var arr = {
                    sales : [
                        { product: 'Jacket', amount: '60' },
                        { product: 'Shirt', amount: '70' },
                        { product: 'Pants', amount: '65' },
                        { product: 'Coats', amount: '45' },
                        { product: 'Purse', amount: '30' }
                    ]
                }
                var view = new JSONModel(arr)
                this.getView().setModel(view, 'cont');
                
                //chart
                var oColChart = this.byId("idChart")

                //dataset
                var oColDataset = new sap.viz.ui5.data.FlattenedDataset({
                    data: { path: "cont>/sales" },
                    dimensions: [{ name: "Product", value: "{cont>product}"}],
                    measures: [{ name: "Amount", value: "{cont>amount}"}]
                });
                oColChart.setDataset(oColDataset)

                // feeds
                var oFeedItemValue = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    uid : "valueAxis",
                    type : "Measure",
                    values : ["Amount"]
                });

                var oFeedItemCategory = new sap.viz.ui5.controls.common.feeds.FeedItem({
                    uid : "categoryAxis",
                    type : "Dimension",
                    values : ["Product"]
                });

                oColChart.addFeed(oFeedItemValue);
                oColChart.addFeed(oFeedItemCategory);

                oColChart.setVizProperties({
                    'title': {'visible':true, 'text':'Line Chart'},
                    'legendGroup': {layout: {position: 'left'} },
                    'plotArea': {
                        drawingEffect: 'glossy',
                        colorPalette: ['#B7F0B1','#A7F9B2','#B2EBF4'],
                        dataLabel : {visible : true}
                    }
                })
            }
        });
    });
