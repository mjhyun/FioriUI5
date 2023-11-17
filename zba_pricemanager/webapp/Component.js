/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "zbapricemanager/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("zbapricemanager.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // set External Script (Map)
                let mapScript = document.createElement('script');
                mapScript.setAttribute('src', 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=2bmdrpiaro&submodules=geocoder');
                document.head.appendChild(mapScript);

                // set External Script (Postcode)
                let pcScript = document.createElement('script');
                pcScript.setAttribute('src', 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
                document.head.appendChild(pcScript);
            }
        });
    }
);