const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
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

let capsui;
!(t => {
  const e = (t => {
    function e() {
      const e = t.call(this) || this;
      return (e.origin_scale = 1), (e.origin_width = 1), e;
    }
    return __extends(e, t),
    (e.prototype.onCreate = function() {
      (this.origin_scale = this.me.scaleX),
        (this.origin_width = this.me.width),
        this.me.on('change', this, this.refresh_size),
        this.refresh_size();
    }),
    (e.prototype.onEnable = () => {}),
    (e.prototype.onDisable = () => {}),
    (e.prototype.change_width = function(t) {
      (this.origin_width = t), this.refresh_size();
    }),
    (e.prototype.refresh_size = function() {
      const t = this.me.textField.textWidth;
      if (t > this.origin_width) {
        const e = t / this.origin_width;
        (this.me.width = this.origin_width * e),
          (this.me.scaleX = this.me.scaleY = this.origin_scale / e);
      } else
        (this.me.width = this.origin_width),
          (this.me.scaleX = this.me.scaleY = this.origin_scale);
    }),
    e
  ;
  })(t.UIComponent);
  t.LabelLocalizationSize = e;
})(capsui || (capsui = {}));