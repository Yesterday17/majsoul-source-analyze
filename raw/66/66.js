var capsui;
!(function(t) {
  var e = (function(t) {
    function e() {
      var e = (null !== t && t.apply(this, arguments)) || this;
      return (e.islong = false), (e._drag_scroll = false), e;
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
              e._drag_scroll = true;
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
              e._drag_scroll = false;
            }),
            this.me.on('mouseout', this, function() {
              e._drag_scroll = false;
            }));
      }),
      (e.prototype.setVal = function(t, e) {
        (t = t < 0 ? 0 : t > 1 ? 1 : t),
          (e = e < 0 ? 0 : e) >= 1
            ? this.me.visible && (this.me.visible = false)
            : (this.me.visible || (this.me.visible = true),
              this.islong
                ? ((this.scrollpoint.width = this.me.width * e),
                  this.scrollpoint.width < 20 && (this.scrollpoint.width = 20),
                  (this.scrollpoint.x =
                    (this.me.width - this.scrollpoint.width) * t))
                : (this.scrollpoint.x = this.me.width * t));
      }),
      (e.prototype.reset = function() {
        this._drag_scroll = false;
      }),
      e
    );
  })(t.UIComponent);
  t.CScrollBar_Heng = e;
})(capsui || (capsui = {}));