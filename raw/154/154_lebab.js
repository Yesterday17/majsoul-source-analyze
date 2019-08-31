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

let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.both_ui.getreward2UI()) || this;
      return (t.items = []), (t.datas = []), (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      this.root = this.me.getChildByName('root');
      const i = this.root.getChildByName('items');
      this.container_items = i;
      for (
        let n = n => {
                const r = i.getChildAt(n);
                a.items.push({
                  container: r,
                  icon0: new t.UI_Item_Skin(
                    r.getChildByName('btn').getChildByName('icon0')
                  ),
                  count0: r.getChildByName('count0'),
                  name0: r.getChildByName('name0'),
                  icon1: new t.UI_Item_Skin(
                    r.getChildByName('btn').getChildByName('icon1')
                  ),
                  count1: r.getChildByName('count1'),
                  name1: r.getChildByName('name1')
                }),
                  (r.getChildByName('btn').clickHandler = new Laya.Handler(
                    a,
                    () => {
                      e.locking ||
                        t.UI_ItemDetail.Inst.show(e.datas[n].reward.id);
                    }
                  ));
              },
            a = this,
            r = 0;
        r < i.numChildren;
        r++
      )
        n(r);
      (this.btn_close = this.me.getChildByName('btn_close')),
        (this.btn_close.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          !1
        ));
    }),
    (i.prototype.show = function(t) {
      const e = this;
      (this.enable = !0), (this.datas = t), Laya.timer.clearAll(this);
      for (
        let i = i => {
                if (i < t.length) {
                  const a = t[i];
                  n.items[i].container.visible = !0;
                  const r = game.GameUtility.get_item_view(a.reward.id);
                  if (
                    (n.items[i].icon0.setSkin(r.icon),
                    (n.items[i].name0.text = r.name),
                    (n.items[i].count0.text = a.reward.count.toString()),
                    a.replace)
                  ) {
                    const s = game.GameUtility.get_item_view(a.replace.id);
                    n.items[i].icon1.setSkin(s.icon),
                      (n.items[i].name1.text = s.name),
                      (n.items[i].count1.text = a.replace.count.toString()),
                      (n.items[i].icon1.me.visible = !0),
                      (n.items[i].name1.visible = !0),
                      (n.items[i].count1.visible = !0),
                      (n.items[i].icon1.me.alpha = 0),
                      (n.items[i].name1.alpha = 0),
                      (n.items[i].count1.alpha = 0);
                  } else
                    (n.items[i].icon1.me.visible = !1),
                      (n.items[i].name1.visible = !1),
                      (n.items[i].count1.visible = !1);
                  (n.items[i].container.x =
                    (-210 * (t.length - 1)) / 2 + 210 * i + 788),
                    (n.items[i].container.y = 0),
                    (n.items[i].container.scaleX = 0),
                    (n.items[i].container.scaleY = 0),
                    (n.items[i].container.alpha = 0),
                    (n.items[i].name0.alpha = 0),
                    (n.items[i].count0.alpha = 0),
                    Laya.Tween.to(
                      n.items[i].container,
                      { scaleX: 1, scaleY: 1, alpha: 1 },
                      200,
                      Laya.Ease.backOut,
                      Laya.Handler.create(n, () => {
                        (e.items[i].name0.alpha = 1),
                          (e.items[i].count0.alpha = 1);
                      }),
                      150 * i + 400
                    );
                } else n.items[i].container.visible = !1;
              },
            n = this,
            a = 0;
        a < this.items.length;
        a++
      )
        i(a);
      (this.btn_close.visible = !1),
        (this.root.alpha = 1),
        (this.root.scaleY = 1),
        (this.locking = !0),
        this.me.in.play(0, !1),
        Laya.timer.once(400 + 150 * t.length, this, () => {
          (e.locking = !1), (e.btn_close.visible = !0), e.anim_change();
        });
    }),
    (i.prototype.anim_change = function() {
      const t = this;
      const e = Laya.timer.currTimer;
      let i = 1;
      Laya.timer.frameLoop(1, this, () => {
        let n = Laya.timer.currTimer - e;
        if ((n -= 2600 * Math.floor(n / 2600)) < 800) i = 1;
        else if (n < 1300) {
          i = 1 - (a = (n - 800) / 500);
        } else if (n < 2100) i = 0;
        else {
          var a = (n - 800 - 500 - 800) / 500;
          i = a;
        }
        for (let r = 0; r < t.datas.length; r++)
          r < t.items.length &&
            t.datas[r].replace &&
            ((t.items[r].icon0.me.alpha = i),
            (t.items[r].name0.alpha = i),
            (t.items[r].count0.alpha = i),
            (t.items[r].icon1.me.alpha = 1 - i),
            (t.items[r].name1.alpha = 1 - i),
            (t.items[r].count1.alpha = 1 - i));
      });
    }),
    (i.prototype.close = function() {
      const t = this;
      (this.locking = !0),
        this.me.out.play(0, !1),
        Laya.timer.once(200, this, () => {
          (t.locking = !1), (t.enable = !1), Laya.timer.clearAll(t);
        });
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_GetReward2 = e;
})(uiscript || (uiscript = {}));