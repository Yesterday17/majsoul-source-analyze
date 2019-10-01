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
  var e = (() => {
    class e {
      constructor(e) {
        this.tasks = [];
        this.left_scrollview = null;
        this.panel_right = null;
        this.select_index = 0;
        this.notask = null;
        this.opening_tasks = [];
        this.me = e;
        this.me.visible = !1;
        this.notask = this.me.getChildByName('notask');

        this.left_scrollview = this.me.getChildByName('left').scriptMap[
            'capsui.CScrollView'
          ];

        this.left_scrollview.init_scrollview(
          Laya.Handler.create(this, this.renderLeft, null, !1)
        );

        this.panel_right = this.me.getChildByName('right');

        cfg.activity &&
          cfg.activity.activity &&
          cfg.activity.activity.get(t.UI_Activity_Fanpai.activity_id) &&
          this.addTask(new t.UI_Activity_Fanpai());

        this.addTask(new t.UI_Activity_Yueka());
        this.addTask(new t.UI_Activity_Xuanshang());
        this.addTask(new t.UI_Activity_Jiuji());
      }

      haveRedPoint() {
        for (var t = 0; t < this.tasks.length; t++)
          if (this.tasks[t].isopen() && this.tasks[t].haveRedPoint())
            return !0;
        return !1;
      }

      need_popout() {
        if (game.Tools.CannotPay()) return !1;
        var t = 0,
          e = Laya.LocalStorage.getItem('activity_popout');
        e && '' != e && (t = parseInt(e));
        var i = Date.now();
        if (i < t + 864e5) return !1;
        Laya.LocalStorage.setItem('activity_popout', i.toString());
        for (var n = 0; n < this.tasks.length; n++)
          if (this.tasks[n].isopen() && this.tasks[n].need_popout())
            return !0;
        return !1;
      }

      addTask(t) {
        this.panel_right.addChild(t.me);
        this.tasks.push(t);
      }

      show() {
        this.me.visible = !0;
        this.left_scrollview.reset();
        this.select_index = 0;
        this.opening_tasks = [];
        for (var t = 0; t < this.tasks.length; t++)
          this.tasks[t].isopen() && this.opening_tasks.push(t);
        this.left_scrollview.me.visible = !0;
        this.panel_right.visible = !0;
        this.notask.visible = !1;
        this.left_scrollview.addItem(this.opening_tasks.length);
        this.left_scrollview.me.visible = !1;
        this.panel_right.visible = !1;
        this.opening_tasks.length > 0
          ? (this.tasks[this.opening_tasks[this.select_index]].show())
          : (this.notask.visible = !0);
      }

      hide() {
        this.me.visible = !1;
        this.tasks[this.opening_tasks[this.select_index]].hide();

        this.select_index >= 0 &&
          this.select_index < this.opening_tasks.length &&
          (this.left_scrollview.wantToRefreshItem(this.select_index));

        this.select_index = -1;
        this.left_scrollview.reset();
      }

      renderLeft({index, container}) {
        var e = this,
          i = index,
          n = container,
          a = n.getChildByName('bg');

        a.skin = game.Tools.localUISrc(
          this.select_index == i
            ? 'myres/lobby/act_choosed.png'
            : 'myres/lobby/act_unchoosen.png'
        );

        n.clickHandler = Laya.Handler.create(
            this,
            () => {
              if (e.select_index != i) {
                var t = e.select_index;
                e.select_index = i;
                e.tasks[e.opening_tasks[t]].hide();

                t >= 0 &&
                  t < e.opening_tasks.length &&
                  (e.left_scrollview.wantToRefreshItem(t));

                a.skin = game.Tools.localUISrc(
                    'myres/lobby/act_choosed.png'
                  );

                e.select_index = i;
                e.tasks[e.opening_tasks[e.select_index]].show();
              }
            },
            null,
            !1
          );

        n.getChildByName('title').text = this.tasks[
            this.opening_tasks[i]
          ].activity_name;

        n.getChildByName('title').fontSize =
            'en' == GameMgr.client_language ? 30 : 34;

        n.getChildByName('redpoint').visible = this.tasks[
            this.opening_tasks[i]
          ].haveRedPoint();
      }

      refreshAllLeft() {
        this.left_scrollview.wantToRefreshAll();
      }
    }

    return e;
  })();

  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this, new ui.lobby.activityUI()) || this;
        t.root = null;
        t.tabs = [];
        t.redpoint = null;
        t.page_huodong = null;
        t.select_tab = -1;
        t.locking = !1;
        n.Inst = t;
        return t;
      }

      static init() {
        var e = this;
        this.activities = {};
        this.activity_tasks = {};
        this.activity_exchange = {};

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchActivityList',
          {},
          (i, n) => {
            if (i || n.error)
              t.UIMgr.Inst.showNetReqError('fetchActivityList', i, n);
            else {
              if (n.activities)
                for (var a = 0; a < n.activities.length; a++)
                  e.activities[n.activities[a].activity_id] = 1;
              e.activity_is_running(t.UI_Activity_Fanpai.activity_id) &&
                t.UI_Activity_Fanpai.Init();
            }
          }
        );

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchAccountActivityData',
          {},
          (i, n) => {
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
              t.UI_Activity_DuanWu_Point.init(n);
              t.UI_Activity_DuanWu_Rank.init(n);
              t.UI_Activity_Fanpai.onTaskDataUpdate(
                n.flip_task_progress_list
              );
            }
          }
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyActivityTaskUpdate',
          new Laya.Handler(this, ({progresses}) => {
            e.activity_tasks = {};
            if ((progresses))
              for (var i = 0; i < progresses.length; i++) {
                var n = progresses[i];
                e.activity_tasks[n.id] = n;
              }
          })
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyActivityChange',
          new Laya.Handler(this, ({end_activities, new_activities}) => {
            if (end_activities)
              for (n = 0; n < end_activities.length; n++) {
                var i = end_activities[n];
                e.activities[i] && delete e.activities[i];
              }
            if (new_activities)
              for (var n = 0; n < new_activities.length; n++) {
                var a = new_activities[n];
                e.activities[a.activity_id] = 1;
              }
          })
        );
      }

      static accountUpdate({activity_task}) {
        if (activity_task && activity_task.progresses)
          for (var e = 0; e < activity_task.progresses.length; e++) {
            var i = activity_task.progresses[e];
            this.activity_tasks[i.id] = i;
          }
      }

      static activity_is_running(t) {
        return !!this.activities[t];
      }

      static getTaskList(t) {
        var e = [];
        for (var i in this.activity_tasks) {
          var n = parseInt(i),
            a = cfg.activity.task.get(n);
          a && a.activity_id === t && e.push(this.activity_tasks[i]);
        }
        return e;
      }

      static getExchangeList(t) {
        var e = this,
          i = [];

        cfg.activity.exchange.forEach(({activity_id, id}) => {
          activity_id === t &&
            (e.activity_exchange[id]
              ? i.push(e.activity_exchange[id])
              : i.push({ exchange_id: id, count: 0 }));
        });

        return i;
      }

      static onExchanged(t) {
        this.activity_exchange[t] ||
          (this.activity_exchange[t] = { exchange_id: t, count: 0 });

        this.activity_exchange[t].count++;
      }

      static onTaskRewarded(e) {
        this.activity_tasks[e] && (this.activity_tasks[e].rewarded = !0);
        this.Inst && this.Inst.page_huodong.refreshAllLeft();
        t.UI_Lobby.Inst.refreshInfo();
      }

      static onTreasureRateUp(t) {
        var e = e => {
          var i = parseInt(e),
            n = cfg.activity.activity.get(i);
          if (n && 'chest_up' === n.type) {
            var a = cfg.activity.chest_up.getGroup(i);
            if (a) {
              var r = '';

              a.forEach(({chest_id, img}) => {
                  chest_id == t && (r = img);
                });

              if (
                ('' != r)
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
      }

      static onTreasureRateUpRetID(t) {
        var e = e => {
          var i = parseInt(e),
            n = cfg.activity.activity.get(i);
          if (n && 'chest_up' === n.type) {
            var a = cfg.activity.chest_up.getGroup(i);
            if (a) {
              var r = 0;

              a.forEach(({chest_id, activity_id}) => {
                  chest_id == t && (r = activity_id);
                });

              if (
                (r)
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
      }

      onCreate() {
        var i = this;
        this.root = this.me.getChildByName('root');

        this.tabs.push(
          this.root
            .getChildByName('tabs')
            .getChildByName(`tab${n.toString()}`)
        );

        for (var n = 0; n < 2; n++)
          this.tabs[n].clickHandler = Laya.Handler.create(
              this,
              this._switchTab,
              [n, !1],
              !1
            );
        this.redpoint = this.tabs[1].getChildByName('redpoint');
        this.redpoint.visible = !1;
        new t.UI_Mail(this.root.getChildByName('page_mail'));

        this.page_huodong = new e(
            this.root.getChildByName('page_huodong')
          );

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              i.close();
            },
            null,
            !1
          );
      }

      show() {
        var e = this;
        this.enable = !0;
        this.locking = !0;
        this._switchTab(0, !0);
        this.refresh_redpoint();
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
          })
        );
      }

      onDisable() {
        this.page_huodong.hide();
        t.UI_Mail.Inst.hide();
      }

      _switchTab(e, i) {
        this.select_tab = e;

        this.tabs[0].getChildByName('img').skin = game.Tools.localUISrc(
            0 == e ? 'myres/lobby/act_bright.png' : 'myres/lobby/act_dark.png'
          );

        this.tabs[1].getChildByName('img').skin = game.Tools.localUISrc(
            1 == e
              ? 'myres/lobby/mail_bright.png'
              : 'myres/lobby/mail_dark.png'
          );

        this.page_huodong.hide();
        this.page_huodong.show();
        (i || this.select_tab != e) &&
          ((1 == this.select_tab ? t.UI_Mail.Inst.show() : t.UI_Mail.Inst.hide()));
      }

      refresh_redpoint() {
        this.redpoint.visible = t.UI_Mail.haveRedPoint;
        this.page_huodong.refreshAllLeft();
      }
    }

    __extends(n, i);

    Object.defineProperty(n, 'haveRedPoint', {
      get() {
        return !(!this.Inst || !this.Inst.page_huodong.haveRedPoint());
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(n, 'need_popout', {
      get() {
        return !(!this.Inst || !this.Inst.page_huodong.need_popout());
      },
      enumerable: !0,
      configurable: !0
    });

    n.Inst = null;
    n.activities = {};
    n.activity_tasks = {};
    n.activity_exchange = {};
    return n;
  })(t.UIBase);

  t.UI_Activity = i;
})(uiscript || (uiscript = {}));