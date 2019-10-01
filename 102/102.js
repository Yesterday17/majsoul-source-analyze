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
            cfg.activity.activity.get(i.activity_id)[
              `name_${GameMgr.client_language}`
            ],
            new ui.lobby.activitys.activity_guoqingUI()
          ) || this;
        t.btn_hs = [];
        t.btn_vs = [];
        t.btn_mids = [];
        t.ids_mid = {};
        t.ids_h = {};
        t.ids_v = {};
        i.Inst = t;
        return t;
      }

      static Init() {
        var t = this;
        this.count = 0;
        this.rewards = {};
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchActivityFlipInfo',
          { activity_id: this.activity_id },
          (e, {count, error, rewards}) => {
            count && (t.count = count);
            if (e || error);
            else if ((rewards))
              for (var n = 0; n < rewards.length; n++)
                t.rewards[rewards[n]] = 1;
          }
        );
      }

      static onTaskDataUpdate(t) {
        if (t) {
          for (var e = t, n = 0; n < e.length; n++) {
            var a = e[n];
            this.task_data[a.id.toString()] = a;
          }
          i.Inst && i.Inst.enable && i.Inst.refresh();
        }
      }

      static onRewardGet(t) {
        var e = cfg.activity.flip_task.get(t);

        5 == e.matrix_x || 5 == e.matrix_y
          ? (this.rewards[t] = 1)
          : this.task_data[t] && (this.task_data[t].rewarded = !0);

        i.Inst && i.Inst.enable && i.Inst.refresh();
      }

      static rewardState(t) {
        var e = cfg.activity.flip_task.get(t);
        if (5 == e.matrix_x && 5 == e.matrix_y) {
          if (this.rewards[t.toString()]) return 2;
          var i = 0;
          for (var n in this.task_data) {
            if (!this.task_data[n].achieved) break;
            i++;
          }
          return 25 != i ? 0 : 1;
        }
        if (5 == e.matrix_x) {
          if (this.rewards[t.toString()]) return 2;
          a = 0;
          for (var n in this.task_data)
            if (this.task_data[n].achieved) {
              (r = cfg.activity.flip_task.get(parseInt(n))).matrix_y ==
                e.matrix_y && (a |= 1 << r.matrix_x);
            }
          return 31 != a ? 0 : 1;
        }
        if (5 == e.matrix_y) {
          if (this.rewards[t.toString()]) return 2;
          var a = 0;
          for (var n in this.task_data)
            if (this.task_data[n].achieved) {
              (r = cfg.activity.flip_task.get(parseInt(n))).matrix_x ==
                e.matrix_x && (a |= 1 << r.matrix_y);
            }
          return 31 != a ? 0 : 1;
        }
        var r = this.task_data[t.toString()];
        return r ? (r.rewarded ? 2 : r.achieved ? 1 : 0) : 0;
      }

      isopen() {
        return t.UI_Activity.activity_is_running(i.activity_id);
      }

      haveRedPoint() {
        return !1;
      }

      need_popout() {
        var t = cfg.activity.activity.get(i.activity_id);
        return !(!t || !t.need_popout);
      }

      onCreate() {
        var e = this;

        cfg.activity.flip_task.forEach(({activity_id, matrix_x, matrix_y, id}) => {
          activity_id == i.activity_id &&
            (5 == matrix_x && 5 == matrix_y
              ? (e.id_all = id)
              : 5 == matrix_x
              ? (e.ids_h[matrix_y.toString()] = id)
              : 5 == matrix_y
              ? (e.ids_v[matrix_x.toString()] = id)
              : (e.ids_mid[(5 * matrix_y + matrix_x).toString()] = id));
        });

        this.root = this.me.getChildByName('root');
        this.content = this.root.getChildByName('content');

        this.scrollbar = this.root.getChildByName('scrollbar').scriptMap[
            'capsui.CScrollBar'
          ];

        this.content.vScrollBarSkin = '';
        this.scrollbar.init(null);

        this.content.vScrollBar.on('change', this, () => {
          e.scrollbar.setVal(
            e.content.vScrollBar.value / e.content.vScrollBar.max,
            e.content.height / e.bg.height
          );
        });

        this.bg = this.content.getChildByName('bg');
        this.label_count_fan = this.content.getChildByName('count_fan');
        this.btn_hs = [];
        this.btn_vs = [];
        for (
          var n = n => {
            a.btn_hs.push(a.content.getChildByName(`btn_h${n}`));
            a.btn_vs.push(a.content.getChildByName(`btn_v${n}`));

            a.btn_hs[n].clickHandler = new Laya.Handler(a, () => {
                var a = e.ids_h[n.toString()];
                t.UI_Activity_Guoping_Pop.Inst.show(a, i.rewardState(a));
              });

            a.btn_vs[n].clickHandler = new Laya.Handler(a, () => {
                var a = e.ids_v[n.toString()];
                t.UI_Activity_Guoping_Pop.Inst.show(a, i.rewardState(a));
              });
          },
            a = this,
            r = 0;
          r < 5;
          r++
        )
          n(r);
        this.btn_all = this.content.getChildByName('btn_all');

        this.btn_all.clickHandler = new Laya.Handler(this, () => {
            var n = e.id_all;
            t.UI_Activity_Guoping_Pop.Inst.show(n, i.rewardState(n));
          });

        this.btn_mids = [];
        this.container_mid = this.content.getChildByName('container_mid');
        var s = this.container_mid.getChildByName('btn_templete');
        s.visible = !1;
        for (
          var o = n => {
              for (
                var a = a => {
                  var r = s.scriptMap['capsui.UICopy'].getNodeClone();
                  r.visible = !0;
                  r.x = 146.5 * a;
                  r.y = 146.5 * n;
                  l.btn_mids.push(r);
                  r.clickHandler = new Laya.Handler(l, () => {
                      var s = e.ids_mid[(5 * n + a).toString()];
                      if (i.task_data[s]) {
                        var o = 0;
                        i.task_data[s] && (o = i.task_data[s].counter);
                        t.UI_Activity_Guoping_Pop.Inst.show(
                          s,
                          i.rewardState(s),
                          o
                        );
                      } else
                        i.count <= 0
                          ? t.UIMgr.Inst.ShowErrorInfo(
                              game.Tools.strOfLocalization(2849)
                            )
                          : t.UI_SecondConfirm.Inst.show(
                              game.Tools.strOfLocalization(2848),
                              Laya.Handler.create(e, () => {
                                r.mouseEnabled = !1;
                                app.NetAgent.sendReq2Lobby(
                                  'Lobby',
                                  'recieveActivityFlipTask',
                                  { task_id: s },
                                  (n, a) => {
                                    r.mouseEnabled = !0;
                                    i.count = a.count;

                                    i.task_data[s.toString()] = {
                                          id: s,
                                          counter: 0,
                                          achieved: !1,
                                          rewarded: !1
                                        };

                                    e.refresh();
                                    n || a.error
                                      ? t.UIMgr.Inst.showNetReqError(
                                          'recieveActivityFlipTask',
                                          n,
                                          a
                                        )
                                      : (e.enable &&
                                      (t.UI_Activity_Guoping_Pop.Inst.show(
                                      s,
                                      0,
                                      0
                                    )));
                                  }
                                );
                              })
                            );
                    });
                  var o = r.getChildByName('bmask');
                  o.alpha = 0;

                  r.on('mousedown', l, () => {
                    o.alpha = 0;
                    Laya.Tween.to(
                      o,
                      { alpha: 0.5 },
                      50,
                      null,
                      null,
                      0,
                      !0,
                      !0
                    );
                  });

                  r.on('mouseup', l, () => {
                    Laya.Tween.to(
                      o,
                      { alpha: 0 },
                      50,
                      null,
                      null,
                      0,
                      !0,
                      !0
                    );
                  });

                  r.on('mouseout', l, () => {
                    Laya.Tween.to(
                      o,
                      { alpha: 0 },
                      50,
                      null,
                      null,
                      0,
                      !0,
                      !0
                    );
                  });
                },
                  r = 0;
                r < 5;
                r++
              )
                a(r);
            },
            l = this,
            r = 0;
          r < 5;
          r++
        )
          o(r);
      }

      show() {
        this.enable = !0;
        this.refresh();
        this.content.refresh();
        this.content.vScrollBar.value = 0;
        this.content.vScrollBar.stopScroll();
        this.scrollbar.reset();
        this.scrollbar.setVal(0, this.content.height / this.bg.height);
        game.LoadMgr.setImgSkin(this.bg, 'myres/activity_fanpai/bg.jpg');
      }

      refresh() {
        this.label_count_fan.text = i.count.toString();
        this.label_count_fan.x =
            'jp' == GameMgr.client_language ? 249 : 288;
        for (var t = 0; t < 5; t++)
          for (var e = 0; e < 5; e++) {
            var n = 5 * t + e;
            var a = this.ids_mid[n.toString()];
            var r = i.task_data[a.toString()];
            var s = (u = this.btn_mids[n]).getChildByName('task');
            u.getChildByName('bmask').alpha = 0;

            u.skin = game.Tools.localUISrc(
              'myres/activity_fanpai/state2.png'
            );

            u.skin = game.Tools.localUISrc(
              'myres/activity_fanpai/state0.png'
            );

            if ((r))
              if (r.rewarded) u.visible = !1;
              else if (r.achieved)
                s.visible = !1;
              else {
                u.skin = game.Tools.localUISrc(
                  'myres/activity_fanpai/state1.png'
                );

                s.visible = !0;
                var o = cfg.activity.flip_task.get(a).base_task_id;
                var l = cfg.events.base_task.get(o);
                var h = r.counter;
                var c = l.target;
                h > c && (h = c);

                s.getChildByName('progress').getChildByName('va').scaleX =
                    h / c;

                s.getChildByName('count').text = h.toString();
                s.getChildByName('total').text = c.toString();
              }
            else
              s.visible = !1;
          }
        for (d = 0; d < 5; d++) {
          var u = this.btn_hs[d];
          var a = this.ids_h[d];
          var _ = i.rewardState(a);
          u.skin =
            2 == _
              ? game.Tools.localUISrc('myres/activity_fanpai/getted0.png')
              : 1 == _
              ? game.Tools.localUISrc('myres/activity_fanpai/get0.png')
              : game.Tools.localUISrc('myres/activity_fanpai/look0.png');
        }
        for (var d = 0; d < 5; d++) {
          var u = this.btn_vs[d];
          var a = this.ids_v[d];
          var _ = i.rewardState(a);
          u.skin =
            2 == _
              ? game.Tools.localUISrc('myres/activity_fanpai/getted0.png')
              : 1 == _
              ? game.Tools.localUISrc('myres/activity_fanpai/get0.png')
              : game.Tools.localUISrc('myres/activity_fanpai/look0.png');
        }
        var u = this.btn_all;
        var a = this.id_all;
        var _ = i.rewardState(a);
        u.skin =
          2 == _
            ? game.Tools.localUISrc('myres/activity_fanpai/getted1.png')
            : 1 == _
            ? game.Tools.localUISrc('myres/activity_fanpai/get1.png')
            : game.Tools.localUISrc('myres/activity_fanpai/look1.png');
      }

      hide() {
        this.enable = !1;
      }

      onDisable() {
        var t = 'res/atlas/';

        'chs' != GameMgr.client_language &&
          (t += `${GameMgr.client_language}/`);

        Laya.loader.clearTextureRes(`${t}myres/activiy_fanpai.atlas`);
        Laya.loader.clearTextureRes(this.bg.skin);
        this.bg.skin &&
          (game.LoadMgr.clearImgSkin(this.bg));
      }
    }

    __extends(i, e);

    i.Inst = null;
    i.activity_id = 1022;
    i.rewards = {};
    i.task_data = {};
    return i;
  })(t.UI_ActivityBase);
  t.UI_Activity_Fanpai = e;
})(uiscript || (uiscript = {}));