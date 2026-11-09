/* Mobile menu is a checkbox, so it opens with CSS alone.
   This script only adds aria-expanded, closes on Escape, and closes after a link click. */
(function () {
  "use strict";

  var inputs = document.querySelectorAll(".nav-check");
  for (var i = 0; i < inputs.length; i++) {
    (function (input) {
      var panel = document.getElementById(input.getAttribute("aria-controls") || "");

      function sync() {
        input.setAttribute("aria-expanded", input.checked ? "true" : "false");
      }

      input.addEventListener("change", sync);
      sync();

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && input.checked) {
          input.checked = false;
          sync();
          input.focus();
        }
      });

      if (panel) {
        panel.addEventListener("click", function (event) {
          var node = event.target;
          while (node && node !== panel) {
            if (node.tagName === "A") {
              input.checked = false;
              sync();
              return;
            }
            node = node.parentNode;
          }
        });
      }
    })(inputs[i]);
  }
})();
