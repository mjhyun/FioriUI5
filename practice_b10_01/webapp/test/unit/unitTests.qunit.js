/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"practice_b10_01/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
