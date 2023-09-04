sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("projectb0101.controller.MAIN", {
      onInit: function () {},
      onClick: function () {
        var oText = this.byId("inputs"); // 컨트롤러의 Input객체 지정.
        var sText = oText.getValue(); // Input의 메소드 사용

        var tText = this.byId("idText"); // Text 객체 지정 
        tText.setText(sText);  // sText의 값을 써서 Text객체의 메소드를 사용
    
      },
      onPress: function () {
        var oInput = this.byId("inputs"); //컨트롤러의 input객체를 id따라 가져옴

        var sInput = oInput.getValue(); // Input객체의 text value 값을 가져옴 (method)

        alert(sInput);
      },
    });
  }
);
