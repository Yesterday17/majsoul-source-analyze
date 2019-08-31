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
      const t = e.call(this, new ui.mj.task_progressUI()) || this;
      return (t.tasks = []), (t.locking = !1), (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.record = function() {
      this.datas = [];
      for (let e = 0; e < t.UI_Activity_Xuanshang.datas.length; e++)
        this.datas.push({
          id: t.UI_Activity_Xuanshang.datas[e].id,
          counter: t.UI_Activity_Xuanshang.datas[e].counter,
          achieved: t.UI_Activity_Xuanshang.datas[e].achieved
        });
    }),
    (i.needShow = function() {
      const e = [];
      if (
        view.DesktopMgr.Inst &&
        view.DesktopMgr.Inst.mode == view.EMJMode.play
      )
        for (
          let i = t.UI_Activity_Xuanshang.datas, n = 0;
          n < this.datas.length;
          n++
        )
          if (!this.datas[n].achieved)
            for (let a = 0; a < i.length; a++)
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
    }),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')), (this.tasks = []);
      for (let e = 0; e < 3; e++) {
        const i = this.root.getChildByName(`task${e}`);
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
      (this.btn_close = this.me.getChildByName('btn_close')),
        (this.btn_close.clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.hide();
          },
          null,
          !1
        ));
    }),
    (i.prototype.show = function(e, i) {
      const n = this;
      (this.enable = !0),
        (this.locking = !0),
        (this.compelte = i),
        Laya.timer.clearAll(this),
        (this.btn_close.visible = !1),
        t.UIBase.anim_alpha_in(
          this.root,
          { x: 0 },
          200,
          0,
          Laya.Handler.create(this, () => {}, null, !1)
        );
      for (
        let a = 0,
            r = () => {
              ++a == e.length &&
                ((n.locking = !1),
                (n.btn_close.visible = !0),
                Laya.timer.once(2e3, n, () => {
                  n.locking || ((n.btn_close.visible = !1), n.hide());
                }));
            },
            s = t => {
              const i = o.tasks[t];
              if (t < e.length) {
                i.container.visible = !0;
                const a = cfg.events.dailyevent.get(e[t].id), s = cfg.item_definition.currency.get(a.reward_type);
                s &&
                  ((i.item_icon.skin = game.LoadMgr.getResImageSkin(s.icon)),
                  (i.item_name.text = s[`name_${GameMgr.client_language}`]));
                const l = cfg.item_definition.item.get(a.reward_type);
                l &&
                  ((i.item_icon.skin = game.LoadMgr.getResImageSkin(l.icon)),
                  (i.item_name.text = l[`name_${GameMgr.client_language}`])),
                  (i.desc.text = a[`desc_${GameMgr.client_language}`]),
                  (i.item_count.text = a.reward_num.toString()),
                  (i.img_finish.visible = !1),
                  (i.progress_bar.scaleX = e[t].oc / a.target),
                  (i.progress_label.text =
                    `${e[t].oc.toString()}/${a.target.toString()}`);
                let h = 0;

                const c =
                  (((h = e[t].achieved ? 1 : e[t].nc / a.target) -
                    e[t].oc / a.target) /
                    1) *
                  1e3;

                Laya.timer.once(600, o, () => {
                  Laya.Tween.to(
                    i.progress_bar,
                    { scaleX: h },
                    c,
                    Laya.Ease.strongOut,
                    Laya.Handler.create(n, () => {
                      (i.progress_label.text =
                        `${e[t].nc.toString()}/${a.target.toString()}`),
                        e[t].achieved
                          ? ((i.img_finish.visible = !0),
                            (i.img_finish.alpha = 0),
                            (i.img_finish.scaleX = i.img_finish.scaleY = 2),
                            Laya.timer.once(200, n, () => {
                              Laya.Tween.to(
                                i.img_finish,
                                { alpha: 1, scaleX: 1, scaleY: 1 },
                                120,
                                Laya.Ease.strongIn,
                                Laya.Handler.create(n, () => {
                                  r();
                                })
                              );
                            }))
                          : r();
                    })
                  );
                });
              } else i.container.visible = !1;
            },
            o = this,
            l = 0;
        l < this.tasks.length;
        l++
      )
        s(l);
    }),
    (i.prototype.hide = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_alpha_out(
          this.root,
          { x: 0 },
          200,
          0,
          Laya.Handler.create(this, () => {
            (e.enable = !1), Laya.timer.clearAll(e), e.compelte.run();
          })
        );
    }),
    (i.datas = []),
    i
  ;
  })(t.UIBase);
  t.UI_MJTask_Progress = e;
})(uiscript || (uiscript = {}));