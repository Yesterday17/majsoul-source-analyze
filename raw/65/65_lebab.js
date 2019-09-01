let capsui;
!(t => {
  const e = (t => {
    function e(...args) {
      const e = (null !== t && t.apply(this, args)) || this;
      return (e.islong = false), (e._drag_scroll = false), e;
    }
    return __extends(e, t),
    (e.prototype.onCreate = function() {
      this.scrollpoint = this.me.getChildByName('scrollpoint');
    }),
    (e.prototype.init = function(t) {
      const e = this;
      (this.handler_change = t),
        t &&
          (this.me.on('mousedown', this, () => {
            e._drag_scroll = true;
            const i = e.me.mouseY / e.me.height;
            t.runWith(i);
          }),
          this.me.on('mousemove', this, () => {
            if (e._drag_scroll) {
              const i = e.me.mouseY / e.me.height;
              t.runWith(i);
            }
          }),
          this.me.on('mouseup', this, () => {
            e._drag_scroll = false;
          }),
          this.me.on('mouseout', this, () => {
            e._drag_scroll = false;
          }));
    }),
    (e.prototype.setVal = function(t, e) {
      (t = t < 0 ? 0 : t > 1 ? 1 : t),
        (e = e < 0 ? 0 : e) >= 1
          ? this.me.visible && (this.me.visible = false)
          : (this.me.visible || (this.me.visible = true),
            this.islong
              ? ((this.scrollpoint.height = this.me.height * e),
                this.scrollpoint.height < 20 &&
                  (this.scrollpoint.height = 20),
                (this.scrollpoint.y =
                  (this.me.height - this.scrollpoint.height) * t))
              : (this.scrollpoint.y = this.me.height * t));
    }),
    (e.prototype.reset = function() {
      this._drag_scroll = false;
    }),
    e
  ;
  })(t.UIComponent);
  t.CScrollBar = e;
})(capsui || (capsui = {}));