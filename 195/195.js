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
        var t = e.call(this, new ui.mj.task_progressUI()) || this;
        t.tasks = [];
        t.locking = !1;
        i.Inst = t;
        return t;
      }

      static record() {
        this.datas = [];
        for (var e = 0; e < t.UI_Activity_Xuanshang.datas.length; e++)
          this.datas.push({
            id: t.UI_Activity_Xuanshang.datas[e].id,
            counter: t.UI_Activity_Xuanshang.datas[e].counter,
            achieved: t.UI_Activity_Xuanshang.datas[e].achieved
          });
      }

      static needShow() {
        var e = [];
        if (
          view.DesktopMgr.Inst &&
          view.DesktopMgr.Inst.mode == view.EMJMode.play
        )
          for (
            var i = t.UI_Activity_Xuanshang.datas, n = 0;
            n < this.datas.length;
            n++
          )
            if (!this.datas[n].achieved)
              for (var a = 0; a < i.length; a++)
                if (i[a].id == this.datas[n].id) {
                  (i[a].achieved || i[a].counter != this.datas[n].counter) &&
                    e.push({
                      id: this.datas[n].id,
                      oc: this.datas[n].counter,
                      nc: i[a].counter,
                      achieved: i[a].achieved
                    });
                  break;
                }
        return e;
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');
        this.tasks = [];
        for (var e = 0; e < 3; e++) {
          var i = this.root.getChildByName(`task${e}`);
          this.tasks.push({
            container: i,
            bg: i.getChildByName('bg'),
            item_icon: i.getChildByName('item'),
            item_name: i.getChildByName('item_name'),
            item_count: i.getChildByName('item_count'),
            desc: i.getChildByName('requirement'),
            progress_bar: i.getChildByName('bar').getChildByName('val'),
            progress_label: i.getChildByName('progress'),
            img_finish: i.getChildByName('finished')
          });
        }
        this.btn_close = this.me.getChildByName('btn_close');
        this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.locking || t.hide();
            },
            null,
            !1
          );
      }

      show(e, i, n) {
        var a = this;
        this.enable = !0;
        this.locking = !0;
        this.compelte = n;
        Laya.timer.clearAll(this);
        this.btn_close.visible = !1;
        t.UIBase.anim_alpha_in(
          this.root,
          { x: 0 },
          200,
          0,
          Laya.Handler.create(this, () => {}, null, !1)
        );
        for (
          var r = 0,
            s = 0,
            o = () => {
              a.locking = !1;
              a.btn_close.visible = !0;
              r == ++s &&
                (Laya.timer.once(2e3, a, () => {
                a.btn_close.visible = !1;
                a.locking || (a.hide());
              }));
            },
            l = t => {
              var n = h.tasks[t];
              if (t + i < e.length) {
                var s = e[t + i];
                n.container.visible = !0;
                var l = cfg.events.dailyevent.get(s.id),
                  c = cfg.item_definition.currency.get(l.reward_type);
                n.item_icon.skin = game.LoadMgr.getResImageSkin(c.icon);
                c &&
                  ((n.item_name.text = c[`name_${GameMgr.client_language}`]));
                var u = cfg.item_definition.item.get(l.reward_type);
                n.item_icon.skin = game.LoadMgr.getResImageSkin(u.icon);

                u &&
                  ((n.item_name.text = u[`name_${GameMgr.client_language}`]));

                n.desc.text = l[`desc_${GameMgr.client_language}`];
                n.item_count.text = l.reward_num.toString();
                n.img_finish.visible = !1;
                n.progress_bar.scaleX = s.oc / l.target;
                n.progress_label.text =
                    `${s.oc.toString()}/${l.target.toString()}`;
                var _ = 0,
                  d =
                    (((_ = s.achieved ? 1 : s.nc / l.target) -
                      s.oc / l.target) /
                      1) *
                    1e3;
                r++;
                Laya.timer.once(600, h, () => {
                  Laya.Tween.to(
                    n.progress_bar,
                    { scaleX: _ },
                    d,
                    Laya.Ease.strongOut,
                    Laya.Handler.create(a, () => {
                      var t = s.nc;
                      t > l.target && (t = l.target);

                      n.progress_label.text =
                          `${t.toString()}/${l.target.toString()}`;

                      n.img_finish.visible = !0;
                      n.img_finish.alpha = 0;
                      n.img_finish.scaleX = n.img_finish.scaleY = 2;
                      s.achieved
                        ? (Laya.timer.once(200, a, () => {
                        Laya.Tween.to(
                          n.img_finish,
                          { alpha: 1, scaleX: 1, scaleY: 1 },
                          120,
                          Laya.Ease.strongIn,
                          Laya.Handler.create(a, () => {
                            o();
                          })
                        );
                      }))
                        : o();
                    })
                  );
                });
              } else n.container.visible = !1;
            },
            h = this,
            c = 0;
          c < this.tasks.length;
          c++
        )
          l(c);
        return r + i;
      }

      hide() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_alpha_out(
          this.root,
          { x: 0 },
          200,
          0,
          Laya.Handler.create(this, () => {
            e.enable = !1;
            Laya.timer.clearAll(e);
            e.compelte.run();
          })
        );
      }
    }

    __extends(i, e);

    i.datas = [];
    return i;
  })(t.UIBase);
  t.UI_MJTask_Progress = e;
})(uiscript || (uiscript = {}));