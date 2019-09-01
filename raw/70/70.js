var capsui;
!(function(t) {
  var e = (function(t) {
    function e() {
      var e = t.call(this) || this;
      return (e.origin_scale = 1), (e.origin_width = 1), e;
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        (this.origin_scale = this.me.scaleX),
          (this.origin_width = this.me.width),
          this.me.on('change', this, this.refresh_size),
          this.refresh_size();
      }),
      (e.prototype.onEnable = function() {}),
      (e.prototype.onDisable = function() {}),
      (e.prototype.change_width = function(t) {
        (this.origin_width = t), this.refresh_size();
      }),
      (e.prototype.refresh_size = function() {
        var t = this.me.textField.textWidth;
        if (t > this.origin_width) {
          var e = t / this.origin_width;
          (this.me.width = this.origin_width * e),
            (this.me.scaleX = this.me.scaleY = this.origin_scale / e);
        } else
          (this.me.width = this.origin_width),
            (this.me.scaleX = this.me.scaleY = this.origin_scale);
      }),
      e
    );
  })(t.UIComponent);
  t.LabelLocalizationSize = e;
})(capsui || (capsui = {}));