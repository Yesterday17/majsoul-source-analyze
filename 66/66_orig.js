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
    })(),
  capsui;
!(function(t) {
  var e = (function(t) {
    function e() {
      var e = (null !== t && t.apply(this, arguments)) || this;
      return (e.islong = !1), (e._drag_scroll = !1), e;
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        this.scrollpoint = this.me.getChildByName('scrollpoint');
      }),
      (e.prototype.init = function(t) {
        var e = this;
        (this.handler_change = t),
          t &&
            (this.me.on('mousedown', this, function() {
              e._drag_scroll = !0;
              var i = e.me.mouseX / e.me.width;
              t.runWith(i);
            }),
            this.me.on('mousemove', this, function() {
              if (e._drag_scroll) {
                var i = e.me.mouseX / e.me.width;
                t.runWith(i);
              }
            }),
            this.me.on('mouseup', this, function() {
              e._drag_scroll = !1;
            }),
            this.me.on('mouseout', this, function() {
              e._drag_scroll = !1;
            }));
      }),
      (e.prototype.setVal = function(t, e) {
        (t = t < 0 ? 0 : t > 1 ? 1 : t),
          (e = e < 0 ? 0 : e) >= 1
            ? this.me.visible && (this.me.visible = !1)
            : (this.me.visible || (this.me.visible = !0),
              this.islong
                ? ((this.scrollpoint.width = this.me.width * e),
                  this.scrollpoint.width < 20 && (this.scrollpoint.width = 20),
                  (this.scrollpoint.x =
                    (this.me.width - this.scrollpoint.width) * t))
                : (this.scrollpoint.x = this.me.width * t));
      }),
      (e.prototype.reset = function() {
        this._drag_scroll = !1;
      }),
      e
    );
  })(t.UIComponent);
  t.CScrollBar_Heng = e;
})(capsui || (capsui = {}));