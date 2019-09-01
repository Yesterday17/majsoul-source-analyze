let uiscript;
!(t => {
  const e = (() => {
      function e(t, e, i, n, a, r, s) {
        (this.me = t),
          (this.id = e),
          (this.pre_score = i),
          (this.me_score = n),
          (this.next_score = a),
          (this.item_id = r),
          (this.item_count = s);
      }
      return (e.prototype.init = function() {
        const e = this;
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
          (this.btn_reward.clickHandler = new Laya.Handler(this, () => {
            e.game_score >= e.me_score && !e.getted
              ? (game.Tools.setGrayDisable(e.btn_reward, true),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'gainAccumulatedPointActivityReward',
                  { activity_id: i.activity_id, reward_id: e.id },
                  (n, a) => {
                    game.Tools.setGrayDisable(e.btn_reward, false),
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
        const a = game.GameUtility.get_item_view(this.item_id);
        if (
          (game.LoadMgr.setImgSkin(this.img_reward, a.icon),
          (this.label_score.text = this.me_score.toString()),
          -1 == this.pre_score)
        )
          this.line_up.visible = false;
        else {
          this.line_up.visible = true;
          (r =
            ((t - (this.pre_score + this.me_score) / 2) /
              (this.me_score - this.pre_score)) *
            2) < 0
            ? (this.line_up.getChildByName('value').visible = false)
            : (r > 1 && (r = 1),
              (this.line_up.getChildByName('value').visible = true),
              (this.line_up.getChildByName('value').scaleY = r));
        }
        if (-1 == this.next_score) this.line_down.visible = false;
        else {
          this.line_down.visible = true;
          var r =
            ((t - this.me_score) / (this.next_score - this.me_score)) * 2;
          r < 0
            ? (this.line_down.getChildByName('value').visible = false)
            : (r > 1 && (r = 1),
              (this.line_down.getChildByName('value').visible = true),
              (this.line_down.getChildByName('value').scaleY = r));
        }
        t < this.me_score
          ? ((this.line_reward.getChildByName('value').visible = false),
            (this.reward_shine.visible = false),
            (this.shine_point.skin = game.Tools.localUISrc(
              'myres/activity_duanwu/point_unshine.png'
            )),
            (this.label_score.color = '#bababa'))
          : ((this.line_reward.getChildByName('value').visible = true),
            (this.reward_shine.visible = true),
            (this.shine_point.skin = game.Tools.localUISrc(
              'myres/activity_duanwu/point_shine.png'
            )),
            (this.label_score.color = '#ffd52b')),
          (this.flag_getted.visible = !!e),
          game.Tools.setGrayDisable(this.btn_reward, false),
          this.item_count <= 1
            ? (this.label_count.visible = false)
            : ((this.label_count.visible = true),
              (this.label_count.text = this.item_count.toString()));
        const s = n - i,
              o =
                24 * cfg.activity.game_point.get(this.id).unlock_day * 3600 * 1e3;
        if (s < o) {
          this.container_lock.visible = true;
          const l = (i + o) / 1e3,
                h =
                  `${game.Tools.time2YearMounthDate(l)} ${game.Tools.time2HourMinute(l)}`;
          this.label_lock_time.text = game.Tools.strOfLocalization(2825, [h]);
        } else this.container_lock.visible = false;
      }),
      (e.prototype.onGetted = function() {
        (this.getted = true),
          Laya.timer.clearAll(this),
          (this.flag_getted.visible = true);
        const e = this.flag_getted.getChildByName('bg');
        (e.alpha = 0), Laya.Tween.to(e, { alpha: 0.5 }, 150);
        const i = this.flag_getted.getChildByName('gou');
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
    ;
    })();

  var i = (i => {
    function n() {
      const t =
        i.call(
          this,
          cfg.activity.activity.get(n.activity_id)[
            `name_${GameMgr.client_language}`
          ],
          new ui.lobby.activitys.activity_duanwu_pointUI()
        ) || this;
      return (n.Inst = t),
      (t.atlas_url = 'res/atlas/'),
      'chs' != GameMgr.client_language &&
        (t.atlas_url += `${GameMgr.client_language}/`),
      (t.atlas_url += 'myres/activity_duanwu.atlas'),
      t
    ;
    }
    return __extends(n, i),
    (n.init = function(t) {
      if (
        ((this.point = 0),
        (this.getted_rewards = {}),
        (this.getted_rewards_count = 0),
        t)
      )
        for (let e = t.accumulated_point_list, i = 0; i < e.length; i++) {
          const n = e[i];
          if (
            n.activity_id == this.activity_id &&
            ((this.point = n.point), n.gained_reward_list)
          ) {
            for (let a = 0; a < n.gained_reward_list.length; a++)
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
      const t = this;
      const e = Date.now();

      const i = game.Tools.ParseTime(
        cfg.activity.activity.get(this.activity_id).start_time
      );

      const n = Math.floor((e - i) / 24 / 3600 / 1e3);
      let a = 0;
      return cfg.activity.game_point.forEach(({activity_id, unlock_day, point}) => {
        activity_id == t.activity_id &&
          unlock_day <= n &&
          (a = a > point ? a : point);
      }),
      a
    ;
    }),
    (n.prototype.onCreate = function() {
      const t = this;
      this.cells = [];
      const i = this.me.getChildByName('root');
      (this.content = i.getChildByName('content')),
        (this.head = this.content.getChildByName('head')),
        (this.label_score = this.head.getChildByName('score')),
        (this.label_reward_count = this.head.getChildByName(
          'reward_count'
        ));
      const a = this.content
        .getChildByName('cells')
        .getChildByName('task_templete');
      this.cells = [];
      const r = [];
      cfg.activity.game_point.forEach(t => {
        t.activity_id == n.activity_id && r.push(t);
      });
      for (let s = 0; s < r.length; s++) {
        let o = null;
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
      Laya.timer.frameOnce(6, this, () => {
        for (let e = 0; e < t.cells.length; e++)
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
        this.content.vScrollBar.on('change', this, () => {
          t.scrollbar.setVal(
            t.content.vScrollBar.value / t.content.vScrollBar.max,
            t.content.height / t.toth
          );
        }),
        Laya.timer.once(2e3, this, () => {
          t.enable || Laya.loader.clearTextureRes(t.atlas_url);
        });
    }),
    (n.prototype.isopen = () => t.UI_Activity.activities[n.activity_id]),
    (n.prototype.haveRedPoint = () => {
      let t = false;
      return cfg.activity.game_point.forEach(({activity_id, point, id}) => {
        activity_id == n.activity_id &&
          point < n.point &&
          !n.getted_rewards[id] &&
          (t = true);
      }),
      t
    ;
    }),
    (n.prototype.need_popout = () => 1 == cfg.activity.activity.get(n.activity_id).need_popout),
    (n.prototype.show = function() {
      (this.enable = true),
        game.LoadMgr.setImgSkin(
          this.head,
          'myres2/treasurehead/quehunji_huodong.jpg'
        );
      for (
        let t = Date.now(), e = cfg.activity.activity.get(n.activity_id), i = game.Tools.ParseTime(e.start_time), a = 0;
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
        `${n.getted_rewards_count.toString()}/${this.cells.length.toString()}`),
        (this.label_reward_count.x =
          'en' == GameMgr.client_language ? 747 : 686);
    }),
    (n.prototype.hide = function() {
      this.enable = false;
      const t = game.Tools.localUISrc(
        'myres2/treasurehead/quehunji_huodong.jpg'
      );
      Laya.loader.clearTextureRes(t),
        Laya.loader.clearTextureRes(this.atlas_url);
    }),
    (n.activity_id = 1014),
    (n.point = 0),
    (n.getted_rewards_count = 0),
    n
  ;
  })(t.UI_ActivityBase);

  t.UI_Activity_DuanWu_Point = i;
})(uiscript || (uiscript = {}));