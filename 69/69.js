var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var capsui;
!(t => {
  var e = (t => {
    class e {
      constructor() {
        var e = t.call(this) || this;
        e.origin_x = 1;
        e.origin_width = 1;
        e.extend_right = !0;
        return e;
      }

      onCreate() {
        this.origin_x = this.me.x;
        this.origin_width = this.me.width;
        this.me.on('change', this, this.refresh_position);
        this.refresh_position();
      }

      onEnable() {}
      onDisable() {}

      refresh_position() {
        var t = this.me.textField.textWidth;
        t > this.origin_width
          ? (this.me.x =
              this.origin_x +
              ((t - this.origin_width) / 2) *
                this.me.scaleX *
                (this.extend_right ? 1 : -1))
          : (this.me.x = this.origin_x);
      }
    }

    __extends(e, t);

    return e;
  })(t.UIComponent);
  t.LabelLocalizationPosition = e;
})(capsui || (capsui = {}));