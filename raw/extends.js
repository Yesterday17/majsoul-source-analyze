var __extends =
  (this && this.__extends) ||
  (function() {
    var t = function(e, i) {
      return (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(t, e) {
            t.__proto__ = e;
          }) ||
        function(t, e) {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        })(e, i);
    };
    return function(e, i) {
      function n() {
        this.constructor = e;
      }
      t(e, i),
        (e.prototype =
          null === i
            ? Object.create(i)
            : ((n.prototype = i.prototype), new n()));
    };
  })();
