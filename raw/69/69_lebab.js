let capsui;
!(t => {
  const e = (t => {
    function e() {
      const e = t.call(this) || this;
      return (e.origin_x = 1), (e.origin_width = 1), (e.extend_right = true), e;
    }
    return __extends(e, t),
    (e.prototype.onCreate = function() {
      (this.origin_x = this.me.x),
        (this.origin_width = this.me.width),
        this.me.on('change', this, this.refresh_position),
        this.refresh_position();
    }),
    (e.prototype.onEnable = () => {}),
    (e.prototype.onDisable = () => {}),
    (e.prototype.refresh_position = function() {
      const t = this.me.textField.textWidth;
      t > this.origin_width
        ? (this.me.x =
            this.origin_x +
            ((t - this.origin_width) / 2) *
              this.me.scaleX *
              (this.extend_right ? 1 : -1))
        : (this.me.x = this.origin_x);
    }),
    e
  ;
  })(t.UIComponent);
  t.LabelLocalizationPosition = e;
})(capsui || (capsui = {}));