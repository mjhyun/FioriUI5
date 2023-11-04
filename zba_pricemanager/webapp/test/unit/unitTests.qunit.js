/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zba_pricemanager/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
