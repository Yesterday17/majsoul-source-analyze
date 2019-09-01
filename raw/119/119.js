var uiscript;
!(function(t) {
  var e = (function() {
      function e(e) {
        (this.tasks = []),
          (this.left_scrollview = null),
          (this.panel_right = null),
          (this.select_index = 0),
          (this.notask = null),
          (this.opening_tasks = []),
          (this.me = e),
          (this.me.visible = false),
          (this.notask = this.me.getChildByName('notask')),
          (this.left_scrollview = this.me.getChildByName('left').scriptMap[
            'capsui.CScrollView'
          ]),
          this.left_scrollview.init_scrollview(
            Laya.Handler.create(this, this.renderLeft, null, false)
          ),
          (this.panel_right = this.me.getChildByName('right')),
          cfg.activity &&
            cfg.activity.activity &&
            cfg.activity.activity.get(t.UI_Activity_DuanWu_Point.activity_id) &&
            this.addTask(new t.UI_Activity_DuanWu_Point()),
          this.addTask(new t.UI_Activity_Xuanshang()),
          this.addTask(new t.UI_Activity_Jiuji());
      }
      return (
        (e.prototype.haveRedPoint = function() {
          for (var t = 0; t < this.tasks.length; t++)
            if (this.tasks[t].isopen() && this.tasks[t].haveRedPoint())
              return true;
          return false;
        }),
        (e.prototype.need_popout = function() {
          var t = 0,
            e = Laya.LocalStorage.getItem('activity_popout');
          e && '' != e && (t = parseInt(e));
          var i = Date.now();
          if (i < t + 864e5) return false;
          for (var n = 0; n < this.tasks.length; n++)
            if (this.tasks[n].isopen() && this.tasks[n].need_popout())
              return (
                Laya.LocalStorage.setItem('activity_popout', i.toString()), true
              );
          return false;
        }),
        (e.prototype.addTask = function(t) {
          this.panel_right.addChild(t.me), this.tasks.push(t);
        }),
        (e.prototype.show = function() {
          (this.me.visible = true),
            this.left_scrollview.reset(),
            (this.select_index = 0),
            (this.opening_tasks = []);
          for (var t = 0; t < this.tasks.length; t++)
            this.tasks[t].isopen() && this.opening_tasks.push(t);
          this.opening_tasks.length > 0
            ? ((this.left_scrollview.me.visible = true),
              (this.panel_right.visible = true),
              (this.notask.visible = false),
              this.left_scrollview.addItem(this.opening_tasks.length),
              this.tasks[this.opening_tasks[this.select_index]].show())
            : ((this.left_scrollview.me.visible = false),
              (this.panel_right.visible = false),
              (this.notask.visible = true));
        }),
        (e.prototype.hide = function() {
          (this.me.visible = false),
            this.select_index >= 0 &&
              this.select_index < this.opening_tasks.length &&
              (this.tasks[this.opening_tasks[this.select_index]].hide(),
              this.left_scrollview.wantToRefreshItem(this.select_index)),
            (this.select_index = -1),
            this.left_scrollview.reset();
        }),
        (e.prototype.renderLeft = function(t) {
          var e = this,
            i = t.index,
            n = t.container,
            a = n.getChildByName('bg');
          (a.skin = game.Tools.localUISrc(
            this.select_index == i
              ? 'myres/lobby/act_choosed.png'
              : 'myres/lobby/act_unchoosen.png'
          )),
            (n.clickHandler = Laya.Handler.create(
              this,
              function() {
                if (e.select_index != i) {
                  var t = e.select_index;
                  (e.select_index = i),
                    t >= 0 &&
                      t < e.opening_tasks.length &&
                      (e.tasks[e.opening_tasks[t]].hide(),
                      e.left_scrollview.wantToRefreshItem(t)),
                    (a.skin = game.Tools.localUISrc(
                      'myres/lobby/act_choosed.png'
                    )),
                    (e.select_index = i),
                    e.tasks[e.opening_tasks[e.select_index]].show();
                }
              },
              null,
              false
            )),
            (n.getChildByName('title').text = this.tasks[
              this.opening_tasks[i]
            ].activity_name),
            (n.getChildByName('title').fontSize =
              'en' == GameMgr.client_language ? 30 : 34),
            (n.getChildByName('redpoint').visible = this.tasks[
              this.opening_tasks[i]
            ].haveRedPoint());
        }),
        (e.prototype.refreshAllLeft = function() {
          this.left_scrollview.wantToRefreshAll();
        }),
        e
      );
    })(),
    i = (function(i) {
      function n() {
        var t = i.call(this, new ui.lobby.activityUI()) || this;
        return (
          (t.root = null),
          (t.tabs = []),
          (t.redpoint = null),
          (t.page_huodong = null),
          (t.select_tab = -1),
          (t.locking = false),
          (n.Inst = t),
          t
        );
      }
      return (
        __extends(n, i),
        Object.defineProperty(n, 'haveRedPoint', {
          get: function() {
            return !(!this.Inst || !this.Inst.page_huodong.haveRedPoint());
          },
          enumerable: true,
          configurable: true
        }),
        Object.defineProperty(n, 'need_popout', {
          get: function() {
            return !(!this.Inst || !this.Inst.page_huodong.need_popout());
          },
          enumerable: true,
          configurable: true
        }),
        (n.init = function() {
          var e = this;
          (this.activities = {}),
            (this.activity_tasks = {}),
            (this.activity_exchange = {}),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'fetchActivityList',
              {},
              function(i, n) {
                if (i || n.error)
                  t.UIMgr.Inst.showNetReqError('fetchActivityList', i, n);
                else if (n.activities)
                  for (var a = 0; a < n.activities.length; a++)
                    e.activities[n.activities[a].activity_id] = 1;
              }
            ),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'fetchAccountActivityData',
              {},
              function(i, n) {
                if (i || n.error)
                  t.UIMgr.Inst.showNetReqError(
                    'fetchAccountActivityData',
                    i,
                    n
                  );
                else {
                  if (n.exchange_records)
                    for (r = 0; r < n.exchange_records.length; r++) {
                      var a = n.exchange_records[r];
                      e.activity_exchange[a.exchange_id] = a;
                    }
                  if (n.task_progress_list)
                    for (var r = 0; r < n.task_progress_list.length; r++) {
                      var s = n.task_progress_list[r];
                      e.activity_tasks[s.id] = s;
                    }
                  t.UI_Activity_DuanWu_Point.init(n),
                    t.UI_Activity_DuanWu_Rank.init(n);
                }
              }
            ),
            app.NetAgent.AddListener2Lobby(
              'NotifyActivityTaskUpdate',
              new Laya.Handler(this, function(t) {
                if (((e.activity_tasks = {}), t.progresses))
                  for (var i = 0; i < t.progresses.length; i++) {
                    var n = t.progresses[i];
                    e.activity_tasks[n.id] = n;
                  }
              })
            ),
            app.NetAgent.AddListener2Lobby(
              'NotifyActivityChange',
              new Laya.Handler(this, function(t) {
                if (t.end_activities)
                  for (n = 0; n < t.end_activities.length; n++) {
                    var i = t.end_activities[n];
                    e.activities[i] && delete e.activities[i];
                  }
                if (t.new_activities)
                  for (var n = 0; n < t.new_activities.length; n++) {
                    var a = t.new_activities[n];
                    e.activities[a.activity_id] = 1;
                  }
              })
            );
        }),
        (n.accountUpdate = function(t) {
          if (t.activity_task && t.activity_task.progresses)
            for (var e = 0; e < t.activity_task.progresses.length; e++) {
              var i = t.activity_task.progresses[e];
              this.activity_tasks[i.id] = i;
            }
        }),
        (n.activity_is_running = function(t) {
          return !!this.activities[t];
        }),
        (n.getTaskList = function(t) {
          var e = [];
          for (var i in this.activity_tasks) {
            var n = parseInt(i),
              a = cfg.activity.task.get(n);
            a && a.activity_id === t && e.push(this.activity_tasks[i]);
          }
          return e;
        }),
        (n.getExchangeList = function(t) {
          var e = this,
            i = [];
          return (
            cfg.activity.exchange.forEach(function(n) {
              n.activity_id === t &&
                (e.activity_exchange[n.id]
                  ? i.push(e.activity_exchange[n.id])
                  : i.push({ exchange_id: n.id, count: 0 }));
            }),
            i
          );
        }),
        (n.onExchanged = function(t) {
          this.activity_exchange[t] ||
            (this.activity_exchange[t] = { exchange_id: t, count: 0 }),
            this.activity_exchange[t].count++;
        }),
        (n.onTaskRewarded = function(e) {
          this.activity_tasks[e] && (this.activity_tasks[e].rewarded = true),
            this.Inst && this.Inst.page_huodong.refreshAllLeft(),
            t.UI_Lobby.Inst.refreshInfo();
        }),
        (n.onTreasureRateUp = function(t) {
          var e = function(e) {
            var i = parseInt(e),
              n = cfg.activity.activity.get(i);
            if (n && 'chest_up' === n.type) {
              var a = cfg.activity.chest_up.getGroup(i);
              if (a) {
                var r = '';
                if (
                  (a.forEach(function(e) {
                    e.chest_id == t && (r = e.img);
                  }),
                  '' != r)
                )
                  return { value: r };
              }
            }
          };
          for (var i in this.activities) {
            var n = e(i);
            if ('object' == typeof n) return n.value;
          }
          return '';
        }),
        (n.onTreasureRateUpRetID = function(t) {
          var e = function(e) {
            var i = parseInt(e),
              n = cfg.activity.activity.get(i);
            if (n && 'chest_up' === n.type) {
              var a = cfg.activity.chest_up.getGroup(i);
              if (a) {
                var r = 0;
                if (
                  (a.forEach(function(e) {
                    e.chest_id == t && (r = e.activity_id);
                  }),
                  r)
                )
                  return { value: r };
              }
            }
          };
          for (var i in this.activities) {
            var n = e(i);
            if ('object' == typeof n) return n.value;
          }
          return 0;
        }),
        (n.prototype.onCreate = function() {
          var i = this;
          this.root = this.me.getChildByName('root');
          for (var n = 0; n < 2; n++)
            this.tabs.push(
              this.root
                .getChildByName('tabs')
                .getChildByName('tab' + n.toString())
            ),
              (this.tabs[n].clickHandler = Laya.Handler.create(
                this,
                this._switchTab,
                [n, false],
                false
              ));
          (this.redpoint = this.tabs[1].getChildByName('redpoint')),
            (this.redpoint.visible = false),
            new t.UI_Mail(this.root.getChildByName('page_mail')),
            (this.page_huodong = new e(
              this.root.getChildByName('page_huodong')
            )),
            (this.root.getChildByName(
              'btn_close'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                i.close();
              },
              null,
              false
            ));
        }),
        (n.prototype.show = function() {
          var e = this;
          (this.enable = true),
            (this.locking = true),
            this._switchTab(0, true),
            this.refresh_redpoint(),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e.locking = false;
              })
            );
        }),
        (n.prototype.close = function() {
          var e = this;
          (this.locking = true),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = false), (e.enable = false);
              })
            );
        }),
        (n.prototype.onDisable = function() {
          this.page_huodong.hide(), t.UI_Mail.Inst.hide();
        }),
        (n.prototype._switchTab = function(e, i) {
          (i || this.select_tab != e) &&
            ((this.select_tab = e),
            (this.tabs[0].getChildByName('img').skin = game.Tools.localUISrc(
              0 == e ? 'myres/lobby/act_bright.png' : 'myres/lobby/act_dark.png'
            )),
            (this.tabs[1].getChildByName('img').skin = game.Tools.localUISrc(
              1 == e
                ? 'myres/lobby/mail_bright.png'
                : 'myres/lobby/mail_dark.png'
            )),
            1 == this.select_tab
              ? (this.page_huodong.hide(), t.UI_Mail.Inst.show())
              : (this.page_huodong.show(), t.UI_Mail.Inst.hide()));
        }),
        (n.prototype.refresh_redpoint = function() {
          (this.redpoint.visible = t.UI_Mail.haveRedPoint),
            this.page_huodong.refreshAllLeft();
        }),
        (n.Inst = null),
        (n.activities = {}),
        (n.activity_tasks = {}),
        (n.activity_exchange = {}),
        n
      );
    })(t.UIBase);
  t.UI_Activity = i;
})(uiscript || (uiscript = {}));