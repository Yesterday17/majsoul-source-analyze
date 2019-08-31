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
      const t =
        e.call(
          this,
          game.Tools.strOfLocalization(2235),
          new ui.lobby.activitys.activity_xuanshangUI()
        ) || this;
      return (t.tasks = []), (t.btn_cd = 0), t;
    }
    return __extends(i, e),
    (i.Init = function() {
      const e = this;
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchDailyTask', {}, (i, n) => {
        i || n.error
          ? t.UIMgr.Inst.showNetReqError('fetchDailyTask', i, n)
          : ((e.has_refresh_count = n.has_refresh_count),
            (e.datas = n.progresses));
      }),
        app.NetAgent.AddListener2Lobby(
          'NotifyDailyTaskUpdate',
          Laya.Handler.create(
            this,
            ({progresses}) => {
              (e.has_refresh_count = !0),
                (e.datas = progresses),
                e.Inst && e.Inst.enable && e.Inst.refresh();
            },
            null,
            !1
          )
        );
    }),
    (i.dataUpdate = function({progresses}) {
      for (let e = 0; e < progresses.length; e++)
        for (let i = progresses[e], n = 0; n < this.datas.length; n++)
          if (!this.datas[n].achieved && this.datas[n].id == i.id) {
            null != i.achieved &&
              void 0 != i.achieved &&
              (this.datas[n].achieved = i.achieved),
              null != i.counter &&
                void 0 != i.counter &&
                (this.datas[n].counter = i.counter);
            break;
          }
    }),
    (i.prototype.isopen = () => !0),
    (i.prototype.onCreate = function() {
      this.root = this.me.getChildByName('root');
      for (let t = 0; t < 3; t++) {
        const e = this.root.getChildByName(`task${t}`);
        (this.timerefresh = this.root.getChildByName('nochange')),
          this.tasks.push({
            container: e,
            bg: e.getChildByName('bg'),
            container_info: e.getChildByName('info'),
            item_icon: e.getChildByName('info').getChildByName('item'),
            item_name: e.getChildByName('info').getChildByName('item_name'),
            item_count: e.getChildByName('info').getChildByName('item_count'),
            desc: e.getChildByName('info').getChildByName('requirement'),
            progress_bar: e
              .getChildByName('info')
              .getChildByName('bar')
              .getChildByName('val'),
            progress_label: e
              .getChildByName('info')
              .getChildByName('progress'),
            btn_change: e.getChildByName('info').getChildByName('btn_change')
          });
      }
    }),
    (i.prototype.show = function() {
      (this.enable = !0), (this.btn_cd = 0), this.refresh();
    }),
    (i.prototype.getLocalTime = () => {
      let t = new Date().getTime();
      return (
        (t = Math.ceil(t / 1e3)),
        (t += 10800),
        (t %= 86400),
        (t = 86400 - t) < 3600
          ? ((t = Math.ceil(t / 60)),
            game.Tools.strOfLocalization(2674, [t.toString()]) +
              game.Tools.strOfLocalization(2748))
          : ((t = Math.ceil(t / 3600)),
            game.Tools.strOfLocalization(2674, [t.toString()]) +
              game.Tools.strOfLocalization(2747))
      );
    }),
    (i.prototype.hide = function() {
      this.enable = !1;
    }),
    (i.prototype.refresh = function() {
      const e = this;
      this.timerefresh.text = this.getLocalTime();
      for (
        let n = n => {
                const r = a.tasks[n];
                if (n < i.datas.length) {
                  const s = i.datas[n], o = cfg.events.dailyevent.get(s.id);
                  if (s.achieved || !o)
                    (r.container_info.visible = !1),
                      (r.bg.skin = game.Tools.localUISrc(
                        'myres/lobby/bg_rules_no.png'
                      ));
                  else {
                    (r.container_info.visible = !0),
                      (r.bg.skin = game.Tools.localUISrc(
                        'myres/lobby/bg_rules.png'
                      )),
                      (r.btn_change.visible = i.has_refresh_count),
                      (r.desc.text = o[`desc_${GameMgr.client_language}`]),
                      (r.item_count.text = `×${o.reward_num.toString()}`),
                      (r.item_count.parent.getChildAt(6).visible = !1);
                    const l = cfg.item_definition.currency.get(o.reward_type);
                    l &&
                      ((r.item_icon.skin = game.LoadMgr.getResImageSkin(l.icon)),
                      (r.item_name.text = l[`name_${GameMgr.client_language}`]));
                    const h = cfg.item_definition.item.get(o.reward_type);
                    h &&
                      ((r.item_icon.skin = game.LoadMgr.getResImageSkin(h.icon)),
                      (r.item_name.text = h[`name_${GameMgr.client_language}`])),
                      (r.progress_bar.scaleX = s.counter / o.target),
                      (r.progress_label.text =
                        `${s.counter.toString()}/${o.target.toString()}`),
                      (r.btn_change.clickHandler = Laya.Handler.create(
                        a,
                        () => {
                          if (!(e.btn_cd > Laya.timer.currTimer)) {
                            e.btn_cd = 1e3 + Laya.timer.currTimer;
                            for (let a = 0; a < e.tasks.length; a++)
                              e.tasks[a].btn_change.visible = !1;
                            app.NetAgent.sendReq2Lobby(
                              'Lobby',
                              'refreshDailyTask',
                              { task_id: s.id },
                              (a, r) => {
                                if (((e.btn_cd = 0), a || r.error))
                                  t.UIMgr.Inst.showNetReqError(
                                    'refreshDailyTask',
                                    a,
                                    r
                                  );
                                else {
                                  (i.has_refresh_count = !1),
                                    (i.datas[n] = r.progress);
                                  for (var s = [], o = 0; o < i.datas.length; o++)
                                    i.datas[o].achieved || s.push(i.datas[o]);
                                  (i.datas = s), e.refresh();
                                }
                              }
                            );
                          }
                        },
                        null,
                        !1
                      ));
                  }
                } else
                  (r.container_info.visible = !1),
                    (r.bg.skin = game.Tools.localUISrc(
                      'myres/lobby/bg_rules_no.png'
                    ));
              },
            a = this,
            r = 0;
        r < this.tasks.length;
        r++
      )
        n(r);
    }),
    (i.has_refresh_count = !1),
    (i.datas = []),
    i
  ;
  })(t.UI_ActivityBase);
  t.UI_Activity_Xuanshang = e;
})(uiscript || (uiscript = {}));