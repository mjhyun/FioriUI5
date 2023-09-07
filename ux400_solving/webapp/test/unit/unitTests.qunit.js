/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Sapbtp/ux400_solving/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
