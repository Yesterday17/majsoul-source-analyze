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
        e.origin_scale = 1;
        e.origin_width = 1;
        return e;
      }

      onCreate() {
        this.origin_scale = this.me.scaleX;
        this.origin_width = this.me.width;
        this.me.on('change', this, this.refresh_size);
        this.refresh_size();
      }

      onEnable() {}
      onDisable() {}

      change_width(t) {
        this.origin_width = t;
        this.refresh_size();
      }

      refresh_size() {
        var t = this.me.textField.textWidth;
        this.me.width = this.origin_width;
        if (t > this.origin_width) {
          var e = t / this.origin_width;
          this.me.width = this.origin_width * e;
          this.me.scaleX = this.me.scaleY = this.origin_scale / e;
        } else
          this.me.scaleX = this.me.scaleY = this.origin_scale;
      }
    }

    __extends(e, t);

    return e;
  })(t.UIComponent);
  t.LabelLocalizationSize = e;
})(capsui || (capsui = {}));