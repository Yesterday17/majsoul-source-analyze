var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t =
        e.call(
          this,
          game.Tools.strOfLocalization(2235),
          new ui.lobby.activitys.activity_xuanshangUI()
        ) || this;
      return (t.btn_cd = 0), t;
    }
    return (
      __extends(i, e),
      (i.Init = function() {
        var e = this;
        app.NetAgent.sendReq2Lobby('Lobby', 'fetchDailyTask', {}, function(
          i,
          n
        ) {
          i || n.error
            ? t.UIMgr.Inst.showNetReqError('fetchDailyTask', i, n)
            : ((e.refresh_count = n.refresh_count),
              (e.datas = n.progresses),
              (e.max_daily_task_count = n.max_daily_task_count));
        }),
          app.NetAgent.AddListener2Lobby(
            'NotifyDailyTaskUpdate',
            Laya.Handler.create(
              this,
              function(t) {
                (e.refresh_count = t.refresh_count),
                  (e.datas = t.progresses),
                  (e.max_daily_task_count = t.max_daily_task_count),
                  e.Inst && e.Inst.enable && e.Inst.refresh();
              },
              null,
              !1
            )
          );
      }),
      (i.dataUpdate = function(t) {
        for (var e = 0; e < t.progresses.length; e++)
          for (var i = t.progresses[e], n = 0; n < this.datas.length; n++)
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
      (i.prototype.isopen = function() {
        return !0;
      }),
      (i.prototype.onCreate = function() {
        (this.root = this.me.getChildByName('root')),
          (this.timerefresh = this.root.getChildByName('nochange')),
          (this.scrollview = this.root.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            new Laya.Handler(this, this.render_item)
          ),
          this.scrollview.reset();
      }),
      (i.prototype.show = function() {
        (this.enable = !0), (this.btn_cd = 0), this.refresh();
      }),
      (i.prototype.getLocalTime = function() {
        var t = new Date().getTime();
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
        (this.timerefresh.text = this.getLocalTime()), this.scrollview.reset();
        var t = i.max_daily_task_count;
        t < i.datas.length && (t = i.datas.length), this.scrollview.addItem(t);
      }),
      (i.prototype.render_item = function(e) {
        var n = this,
          a = e.index,
          r = e.container,
          s = r.getChildByName('bg'),
          o = r.getChildByName('info'),
          l = r.getChildByName('info').getChildByName('item'),
          h = r.getChildByName('info').getChildByName('item_name'),
          c = r.getChildByName('info').getChildByName('item_count'),
          u = r.getChildByName('info').getChildByName('requirement'),
          _ = r
            .getChildByName('info')
            .getChildByName('bar')
            .getChildByName('val'),
          d = r.getChildByName('info').getChildByName('progress'),
          f = r.getChildByName('info').getChildByName('btn_change');
        if (a < i.datas.length) {
          var p = i.datas[a],
            m = cfg.events.dailyevent.get(p.id);
          if (p.achieved || !m)
            (o.visible = !1),
              (s.skin = game.Tools.localUISrc('myres/lobby/bg_rules_no.png'));
          else {
            (o.visible = !0),
              (s.skin = game.Tools.localUISrc('myres/lobby/bg_rules.png')),
              (f.visible = i.refresh_count > 0),
              (u.text = m['desc_' + GameMgr.client_language]),
              (c.text = '×' + m.reward_num.toString()),
              (c.parent.getChildAt(6).visible = !1);
            var g = cfg.item_definition.currency.get(m.reward_type);
            g &&
              ((l.skin = game.LoadMgr.getResImageSkin(g.icon)),
              (h.text = g['name_' + GameMgr.client_language]));
            var y = cfg.item_definition.item.get(m.reward_type);
            y &&
              ((l.skin = game.LoadMgr.getResImageSkin(y.icon)),
              (h.text = y['name_' + GameMgr.client_language])),
              (_.scaleX = p.counter / m.target),
              (d.text = p.counter.toString() + '/' + m.target.toString()),
              (f.clickHandler = Laya.Handler.create(
                this,
                function() {
                  n.btn_cd > Laya.timer.currTimer ||
                    ((n.btn_cd = 1e3 + Laya.timer.currTimer),
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'refreshDailyTask',
                      { task_id: p.id },
                      function(e, r) {
                        if (((n.btn_cd = 0), e || r.error))
                          t.UIMgr.Inst.showNetReqError(
                            'refreshDailyTask',
                            e,
                            r
                          );
                        else {
                          (i.refresh_count = r.refresh_count),
                            (i.datas[a] = r.progress);
                          for (var s = [], o = 0; o < i.datas.length; o++)
                            i.datas[o].achieved || s.push(i.datas[o]);
                          (i.datas = s), n.scrollview.wantToRefreshAll();
                        }
                      }
                    ));
                },
                null,
                !1
              ));
          }
        } else
          (o.visible = !1),
            (s.skin = game.Tools.localUISrc('myres/lobby/bg_rules_no.png'));
      }),
      (i.refresh_count = 0),
      (i.datas = []),
      (i.max_daily_task_count = 0),
      i
    );
  })(t.UI_ActivityBase);
  t.UI_Activity_Xuanshang = e;
})(uiscript || (uiscript = {}));