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
        var t =
          e.call(
            this,
            game.Tools.strOfLocalization(2235),
            new ui.lobby.activitys.activity_xuanshangUI()
          ) || this;
        t.btn_cd = 0;
        return t;
      }

      static Init() {
        var e = this;

        app.NetAgent.sendReq2Lobby('Lobby', 'fetchDailyTask', {}, (i, n) => {
          e.refresh_count = n.refresh_count;
          e.datas = n.progresses;
          i || n.error
            ? t.UIMgr.Inst.showNetReqError('fetchDailyTask', i, n)
            : (e.max_daily_task_count = n.max_daily_task_count);
        });

        app.NetAgent.AddListener2Lobby(
          'NotifyDailyTaskUpdate',
          Laya.Handler.create(
            this,
            ({refresh_count, progresses, max_daily_task_count}) => {
              e.refresh_count = refresh_count;
              e.datas = progresses;
              e.max_daily_task_count = max_daily_task_count;
              e.Inst && e.Inst.enable && e.Inst.refresh();
            },
            null,
            !1
          )
        );
      }

      static dataUpdate({progresses}) {
        for (var e = 0; e < progresses.length; e++)
          for (var i = progresses[e], n = 0; n < this.datas.length; n++)
            if (!this.datas[n].achieved && this.datas[n].id == i.id) {
              null != i.achieved &&
                void 0 != i.achieved &&
                (this.datas[n].achieved = i.achieved);

              null != i.counter &&
                void 0 != i.counter &&
                (this.datas[n].counter = i.counter);
              break;
            }
      }

      isopen() {
        return !0;
      }

      onCreate() {
        this.root = this.me.getChildByName('root');
        this.timerefresh = this.root.getChildByName('nochange');
        this.scrollview = this.root.scriptMap['capsui.CScrollView'];

        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item)
        );

        this.scrollview.reset();
      }

      show() {
        this.enable = !0;
        this.btn_cd = 0;
        this.refresh();
      }

      getLocalTime() {
        var t = new Date().getTime();
        t = Math.ceil(t / 1e3);
        t += 10800;
        t %= 86400;
        t = Math.ceil(t / 60);
        t = Math.ceil(t / 3600);
        return (t = 86400 - t) < 3600
          ? (game.Tools.strOfLocalization(2674, [t.toString()]) +
          game.Tools.strOfLocalization(2748))
          : (game.Tools.strOfLocalization(2674, [t.toString()]) +
          game.Tools.strOfLocalization(2747));
      }

      hide() {
        this.enable = !1;
      }

      refresh() {
        this.timerefresh.text = this.getLocalTime();
        this.scrollview.reset();
        var t = i.max_daily_task_count;
        t < i.datas.length && (t = i.datas.length);
        this.scrollview.addItem(t);
      }

      render_item({index, container}) {
        var n = this;
        var a = index;
        var r = container;
        var s = r.getChildByName('bg');
        var o = r.getChildByName('info');
        var l = r.getChildByName('info').getChildByName('item');
        var h = r.getChildByName('info').getChildByName('item_name');
        var c = r.getChildByName('info').getChildByName('item_count');
        var u = r.getChildByName('info').getChildByName('requirement');

        var _ = r
          .getChildByName('info')
          .getChildByName('bar')
          .getChildByName('val');

        var d = r.getChildByName('info').getChildByName('progress');
        var f = r.getChildByName('info').getChildByName('btn_change');
        o.visible = !1;
        if (a < i.datas.length) {
          var p = i.datas[a];
          var m = cfg.events.dailyevent.get(p.id);
          o.visible = !1;
          if (p.achieved || !m)
            s.skin = game.Tools.localUISrc('myres/lobby/bg_rules_no.png');
          else {
            o.visible = !0;
            s.skin = game.Tools.localUISrc('myres/lobby/bg_rules.png');
            f.visible = i.refresh_count > 0;
            u.text = m[`desc_${GameMgr.client_language}`];
            c.text = `×${m.reward_num.toString()}`;
            c.parent.getChildAt(6).visible = !1;
            var g = cfg.item_definition.currency.get(m.reward_type);
            l.skin = game.LoadMgr.getResImageSkin(g.icon);
            g &&
              ((h.text = g[`name_${GameMgr.client_language}`]));
            var y = cfg.item_definition.item.get(m.reward_type);
            l.skin = game.LoadMgr.getResImageSkin(y.icon);

            y &&
              ((h.text = y[`name_${GameMgr.client_language}`]));

            _.scaleX = p.counter / m.target;
            d.text = `${p.counter.toString()}/${m.target.toString()}`;
            f.clickHandler = Laya.Handler.create(
                this,
                () => {
                  n.btn_cd = 1e3 + Laya.timer.currTimer;
                  n.btn_cd > Laya.timer.currTimer ||
                    (app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'refreshDailyTask',
                    { task_id: p.id },
                    (e, r) => {
                      n.btn_cd = 0;
                      if ((e || r.error))
                        t.UIMgr.Inst.showNetReqError(
                          'refreshDailyTask',
                          e,
                          r
                        );
                      else {
                        i.refresh_count = r.refresh_count;
                        i.datas[a] = r.progress;
                        for (var s = [], o = 0; o < i.datas.length; o++)
                          i.datas[o].achieved || s.push(i.datas[o]);
                        i.datas = s;
                        n.scrollview.wantToRefreshAll();
                      }
                    }
                  ));
                },
                null,
                !1
              );
          }
        } else
          s.skin = game.Tools.localUISrc('myres/lobby/bg_rules_no.png');
      }
    }

    __extends(i, e);

    i.refresh_count = 0;
    i.datas = [];
    i.max_daily_task_count = 0;
    return i;
  })(t.UI_ActivityBase);
  t.UI_Activity_Xuanshang = e;
})(uiscript || (uiscript = {}));