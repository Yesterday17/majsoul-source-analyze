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
  var e = (function() {
      function e(t, e, i, n, a, r, s) {
        (this.me = t),
          (this.id = e),
          (this.pre_score = i),
          (this.me_score = n),
          (this.next_score = a),
          (this.item_id = r),
          (this.item_count = s);
      }
      return (
        (e.prototype.init = function() {
          var e = this;
          (this.label_score = this.me.getChildByName('score')),
            (this.shine_point = this.me.getChildByName('shine_point')),
            (this.btn_reward = this.me.getChildByName('reward')),
            (this.reward_shine = this.btn_reward.getChildByName('shine')),
            (this.img_reward = this.btn_reward.getChildByName('item')),
            (this.label_count = this.btn_reward.getChildByName('num')),
            (this.flag_getted = this.btn_reward.getChildByName('getted')),
            (this.line_down = this.me.getChildByName('line_down')),
            (this.line_up = this.me.getChildByName('line_up')),
            (this.line_reward = this.me.getChildByName('line_reward')),
            (this.container_lock = this.me.getChildByName('lock')),
            (this.label_lock_time = this.container_lock.getChildByName('time')),
            (this.btn_reward.clickHandler = new Laya.Handler(this, function() {
              e.game_score >= e.me_score && !e.getted
                ? (game.Tools.setGrayDisable(e.btn_reward, !0),
                  app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'gainAccumulatedPointActivityReward',
                    { activity_id: i.activity_id, reward_id: e.id },
                    function(n, a) {
                      game.Tools.setGrayDisable(e.btn_reward, !1),
                        n || a.error
                          ? t.UIMgr.Inst.showNetReqError(
                              'gainAccumulatedPointActivityReward',
                              n,
                              a
                            )
                          : (i.onGetReward(e.id), e.onGetted());
                    }
                  ))
                : t.UI_ItemDetail.Inst.show(e.item_id);
            }));
        }),
        (e.prototype.show = function(t, e, i, n) {
          (this.game_score = t), (this.getted = e);
          var a = game.GameUtility.get_item_view(this.item_id);
          if (
            (game.LoadMgr.setImgSkin(this.img_reward, a.icon),
            (this.label_score.text = this.me_score.toString()),
            -1 == this.pre_score)
          )
            this.line_up.visible = !1;
          else {
            this.line_up.visible = !0;
            (r =
              ((t - (this.pre_score + this.me_score) / 2) /
                (this.me_score - this.pre_score)) *
              2) < 0
              ? (this.line_up.getChildByName('value').visible = !1)
              : (r > 1 && (r = 1),
                (this.line_up.getChildByName('value').visible = !0),
                (this.line_up.getChildByName('value').scaleY = r));
          }
          if (-1 == this.next_score) this.line_down.visible = !1;
          else {
            this.line_down.visible = !0;
            var r =
              ((t - this.me_score) / (this.next_score - this.me_score)) * 2;
            r < 0
              ? (this.line_down.getChildByName('value').visible = !1)
              : (r > 1 && (r = 1),
                (this.line_down.getChildByName('value').visible = !0),
                (this.line_down.getChildByName('value').scaleY = r));
          }
          t < this.me_score
            ? ((this.line_reward.getChildByName('value').visible = !1),
              (this.reward_shine.visible = !1),
              (this.shine_point.skin = game.Tools.localUISrc(
                'myres/activity_duanwu/point_unshine.png'
              )),
              (this.label_score.color = '#bababa'))
            : ((this.line_reward.getChildByName('value').visible = !0),
              (this.reward_shine.visible = !0),
              (this.shine_point.skin = game.Tools.localUISrc(
                'myres/activity_duanwu/point_shine.png'
              )),
              (this.label_score.color = '#ffd52b')),
            (this.flag_getted.visible = !!e),
            game.Tools.setGrayDisable(this.btn_reward, !1),
            this.item_count <= 1
              ? (this.label_count.visible = !1)
              : ((this.label_count.visible = !0),
                (this.label_count.text = this.item_count.toString()));
          var s = n - i,
            o =
              24 * cfg.activity.game_point.get(this.id).unlock_day * 3600 * 1e3;
          if (s < o) {
            this.container_lock.visible = !0;
            var l = (i + o) / 1e3,
              h =
                game.Tools.time2YearMounthDate(l) +
                ' ' +
                game.Tools.time2HourMinute(l);
            this.label_lock_time.text = game.Tools.strOfLocalization(2825, [h]);
          } else this.container_lock.visible = !1;
        }),
        (e.prototype.onGetted = function() {
          (this.getted = !0),
            Laya.timer.clearAll(this),
            (this.flag_getted.visible = !0);
          var e = this.flag_getted.getChildByName('bg');
          (e.alpha = 0), Laya.Tween.to(e, { alpha: 0.5 }, 150);
          var i = this.flag_getted.getChildByName('gou');
          (i.scaleX = i.scaleY = 0),
            (i.alpha = 0),
            Laya.Tween.to(
              i,
              { scaleX: 1, scaleY: 1, alpha: 1 },
              200,
              Laya.Ease.backOut
            ),
            game.GameUtility.get_id_type(this.item_id) == game.EIDType.character
              ? t.UI_Get_Character.Inst.show(this.item_id)
              : game.Tools.showRewards(
                  { rewards: [{ id: this.item_id, count: this.item_count }] },
                  null
                ),
            t.UI_Lobby.Inst.top.refreshRedpoint(),
            t.UI_Activity.Inst.refresh_redpoint();
        }),
        e
      );
    })(),
    i = (function(i) {
      function n() {
        var t =
          i.call(
            this,
            cfg.activity.activity.get(n.activity_id)[
              'name_' + GameMgr.client_language
            ],
            new ui.lobby.activitys.activity_duanwu_pointUI()
          ) || this;
        return (
          (n.Inst = t),
          (t.atlas_url = 'res/atlas/'),
          'chs' != GameMgr.client_language &&
            (t.atlas_url += GameMgr.client_language + '/'),
          (t.atlas_url += 'myres/activity_duanwu.atlas'),
          t
        );
      }
      return (
        __extends(n, i),
        (n.init = function(t) {
          if (
            ((this.point = 0),
            (this.getted_rewards = {}),
            (this.getted_rewards_count = 0),
            t)
          )
            for (var e = t.accumulated_point_list, i = 0; i < e.length; i++) {
              var n = e[i];
              if (
                n.activity_id == this.activity_id &&
                ((this.point = n.point), n.gained_reward_list)
              ) {
                for (var a = 0; a < n.gained_reward_list.length; a++)
                  this.getted_rewards[n.gained_reward_list[a]] = 1;
                this.getted_rewards_count = n.gained_reward_list.length;
              }
            }
        }),
        (n.onGetReward = function(t) {
          this.getted_rewards[t] ||
            ((this.getted_rewards[t] = 1),
            this.getted_rewards_count++,
            this.Inst && this.Inst.enable && this.Inst.refreshRewardsCount());
        }),
        (n.max_point = function() {
          var t = this,
            e = Date.now(),
            i = game.Tools.ParseTime(
              cfg.activity.activity.get(this.activity_id).start_time
            ),
            n = Math.floor((e - i) / 24 / 3600 / 1e3),
            a = 0;
          return (
            cfg.activity.game_point.forEach(function(e) {
              e.activity_id == t.activity_id &&
                e.unlock_day <= n &&
                (a = a > e.point ? a : e.point);
            }),
            a
          );
        }),
        (n.prototype.onCreate = function() {
          var t = this;
          this.cells = [];
          var i = this.me.getChildByName('root');
          (this.content = i.getChildByName('content')),
            (this.head = this.content.getChildByName('head')),
            (this.label_score = this.head.getChildByName('score')),
            (this.label_reward_count = this.head.getChildByName(
              'reward_count'
            ));
          var a = this.content
            .getChildByName('cells')
            .getChildByName('task_templete');
          this.cells = [];
          var r = [];
          cfg.activity.game_point.forEach(function(t) {
            t.activity_id == n.activity_id && r.push(t);
          });
          for (var s = 0; s < r.length; s++) {
            var o = null;
            (o =
              0 == this.cells.length
                ? a
                : a.scriptMap['capsui.UICopy'].getNodeClone()),
              this.cells.push(
                new e(
                  o,
                  r[s].id,
                  s > 0 ? r[s - 1].point : -1,
                  r[s].point,
                  s + 1 < r.length ? r[s + 1].point : -1,
                  r[s].res_id,
                  r[s].res_count
                )
              );
          }
          Laya.timer.frameOnce(6, this, function() {
            for (var e = 0; e < t.cells.length; e++)
              t.cells[e].init(), (t.cells[e].me.y = t.cells[e].me.height * e);
          }),
            (this.content.vScrollBarSkin = ''),
            (this.content.getChildByName('cells').height = r.length * a.height),
            (this.toth =
              this.content.getChildByName('cells').y + r.length * a.height),
            (this.scrollbar = i.getChildByName('scrollbar').scriptMap[
              'capsui.CScrollBar'
            ]),
            this.scrollbar.init(null),
            this.content.vScrollBar.on('change', this, function() {
              t.scrollbar.setVal(
                t.content.vScrollBar.value / t.content.vScrollBar.max,
                t.content.height / t.toth
              );
            }),
            Laya.timer.once(2e3, this, function() {
              t.enable || Laya.loader.clearTextureRes(t.atlas_url);
            });
        }),
        (n.prototype.isopen = function() {
          return t.UI_Activity.activities[n.activity_id];
        }),
        (n.prototype.haveRedPoint = function() {
          var t = !1;
          return (
            cfg.activity.game_point.forEach(function(e) {
              e.activity_id == n.activity_id &&
                e.point < n.point &&
                !n.getted_rewards[e.id] &&
                (t = !0);
            }),
            t
          );
        }),
        (n.prototype.need_popout = function() {
          return 1 == cfg.activity.activity.get(n.activity_id).need_popout;
        }),
        (n.prototype.show = function() {
          (this.enable = !0),
            game.LoadMgr.setImgSkin(
              this.head,
              'myres2/treasurehead/quehunji_huodong.jpg'
            );
          for (
            var t = Date.now(),
              e = cfg.activity.activity.get(n.activity_id),
              i = game.Tools.ParseTime(e.start_time),
              a = 0;
            a < this.cells.length;
            a++
          )
            this.cells[a].show(
              n.point,
              n.getted_rewards[this.cells[a].id],
              i,
              t
            );
          (this.label_score.text = n.point.toString()),
            this.refreshRewardsCount();
        }),
        (n.prototype.refreshRewardsCount = function() {
          (this.label_reward_count.text =
            n.getted_rewards_count.toString() +
            '/' +
            this.cells.length.toString()),
            (this.label_reward_count.x =
              'en' == GameMgr.client_language ? 747 : 686);
        }),
        (n.prototype.hide = function() {
          this.enable = !1;
          var t = game.Tools.localUISrc(
            'myres2/treasurehead/quehunji_huodong.jpg'
          );
          Laya.loader.clearTextureRes(t),
            Laya.loader.clearTextureRes(this.atlas_url);
        }),
        (n.activity_id = 1014),
        (n.point = 0),
        (n.getted_rewards_count = 0),
        n
      );
    })(t.UI_ActivityBase);
  t.UI_Activity_DuanWu_Point = i;
})(uiscript || (uiscript = {}));