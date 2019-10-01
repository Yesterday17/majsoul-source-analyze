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

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.both_ui.getrewardUI()) || this;
        t.items = [];
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;
        this.root = this.me.getChildByName('root');
        var i = this.root.getChildByName('items');
        this.container_items = i;
        for (var n = 0; n < i.numChildren; n++) {
          var a = i.getChildAt(n);
          this.items.push({
            container: a,
            icon: new t.UI_Item_Skin(a.getChildByName('icon')),
            count: a.getChildByName('count'),
            name: a.getChildByName('name')
          });
        }
        this.btn_close = this.me.getChildByName('btn_close');
        this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close();
            },
            null,
            !1
          );
      }

      show(t, e) {
        var i = this;
        this.enable = !0;
        this.complete = e;
        for (
          var n = e => {
              if (e < t.length) {
                a.items[e].container.visible = !0;
                var n = game.GameUtility.get_item_view(t[e].id);
                a.items[e].icon.setSkin(n.icon);
                a.items[e].name.text = n.name;
                a.items[e].count.text = t[e].count.toString();

                a.items[e].container.x =
                    a.container_items.width / 2 -
                    (210 * (t.length - 1)) / 2 +
                    210 * e;

                a.items[e].container.y = 72;
                a.items[e].container.scaleX = 0;
                a.items[e].container.scaleY = 0;
                a.items[e].container.alpha = 0;
                a.items[e].name.alpha = 0;
                a.items[e].count.alpha = 0;
                Laya.Tween.to(
                  a.items[e].container,
                  { scaleX: 1, scaleY: 1, alpha: 1 },
                  200,
                  Laya.Ease.backOut,
                  Laya.Handler.create(a, () => {
                    i.items[e].name.alpha = 1;
                    i.items[e].count.alpha = 1;
                  }),
                  150 * e + 400
                );
              } else a.items[e].container.visible = !1;
            },
            a = this,
            r = 0;
          r < this.items.length;
          r++
        )
          n(r);
        this.btn_close.visible = !1;
        this.root.alpha = 1;
        this.root.scaleY = 1;
        this.locking = !0;
        this.me.in.play(0, !1);
        Laya.timer.once(400 + 150 * t.length, this, () => {
          i.locking = !1;
          i.btn_close.visible = !0;
        });
      }

      close() {
        var t = this;
        this.locking = !0;
        this.me.out.play(0, !1);
        Laya.timer.once(200, this, () => {
          t.locking = !1;
          t.enable = !1;
          t.complete && t.complete.run();
        });
      }
    }

    __extends(i, e);

    i.Inst = null;
    return i;
  })(t.UIBase);
  t.UI_Getrewardextends = e;
})(uiscript || (uiscript = {}));