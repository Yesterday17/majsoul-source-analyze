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
      constructor(...args) {
        var e = (null !== t && t.apply(this, args)) || this;
        e.islong = !1;
        e._drag_scroll = !1;
        return e;
      }

      onCreate() {
        this.scrollpoint = this.me.getChildByName('scrollpoint');
      }

      init(t) {
        var e = this;
        this.handler_change = t;

        this.me.on('mousedown', this, () => {
            e._drag_scroll = !0;
            var i = e.me.mouseY / e.me.height;
            t.runWith(i);
          });

        this.me.on('mousemove', this, () => {
          if (e._drag_scroll) {
            var i = e.me.mouseY / e.me.height;
            t.runWith(i);
          }
        });

        this.me.on('mouseup', this, () => {
          e._drag_scroll = !1;
        });

        t &&
          (this.me.on('mouseout', this, () => {
          e._drag_scroll = !1;
        }));
      }

      setVal(t, e) {
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        this.me.visible || (this.me.visible = !0);
        this.scrollpoint.height = this.me.height * e;

        this.scrollpoint.height < 20 &&
          (this.scrollpoint.height = 20);

        (e = e < 0 ? 0 : e) >= 1
          ? this.me.visible && (this.me.visible = !1)
          : (this.islong
          ? (this.scrollpoint.y =
              (this.me.height - this.scrollpoint.height) * t)
          : (this.scrollpoint.y = this.me.height * t));
      }

      reset() {
        this._drag_scroll = !1;
      }
    }

    __extends(e, t);

    return e;
  })(t.UIComponent);
  t.CScrollBar = e;
})(capsui || (capsui = {}));