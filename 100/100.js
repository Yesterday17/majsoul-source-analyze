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
            new ui.lobby.activitys.activity_duanwu_rankUI()
          ) || this;
        t.last_refresh_time = -1;
        t.my_rank = -1;
        t.datas = [];
        return t;
      }

      static init(t) {
        this.point = 0;
        this.reward_getted = !1;
        if ((t))
          for (var e = t.rank_data_list, i = 0; i < e.length; i++) {
            var n = e[i];
            this.point = n.point;
            n.leaderboard_id == this.activity_id &&
              ((this.reward_getted = n.gained_reward));
          }
      }

      onCreate() {
        var e = this.me.getChildByName('root');
        this.head = e.getChildByName('head');
        var i = e.getChildByName('head');
        this.label_score = i.getChildByName('score');
        this.label_rank = i.getChildByName('rank');
        this.label_reward = i.getChildByName('reward');
        this.btn_info = i.getChildByName('what');
        this.btn_getreward = i.getChildByName('btn_get');
        this.label_alreadyget = i.getChildByName('alreadyget');
        this.scrollview = e.scriptMap['capsui.CScrollView'];

        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item)
        );

        this.noinfo = e.getChildByName('noinfo');
        this.label_alreadyget.visible = !1;
        this.noinfo.visible = !1;
        this.scrollview.reset();
        this.btn_getreward.visible = !1;
        this.label_rank.text = '--';
        this.label_reward.text = '--';
        this.label_score.text = '--';
        i.getChildByName('what').clickHandler = new Laya.Handler(
            this,
            () => {
              t.UI_InfoLite_Title.Inst.show(
                game.Tools.strOfLocalization(2776),
                game.Tools.strOfLocalization(2777)
              );
            }
          );
      }

      render_item({container, index, cache_data}) {
        var i = container;
        var n = index;
        var a = cache_data;
        var r = this.datas[n];
        i.getChildByName('rank').text = r.rank.toString();

        a.hasOwnProperty('head') ||
          (a.head = new t.UI_Head(i.getChildByName('head')));

        a.hasOwnProperty('title') ||
          (a.title = new t.UI_PlayerTitle(i.getChildByName('title')));

        a.head.id = GameMgr.Inst.account_data.avatar_id;
        a.head.head_frame = GameMgr.Inst.account_data.avatar_frame;

        a.title.id = game.Tools.titleLocalization(
              r.account_id,
              GameMgr.Inst.account_data.title
            );

        i.getChildByName('name').text =
              GameMgr.Inst.account_data.nickname;

        a.head.id = r.view.avatar_id;
        a.head.id = r.view.avatar_frame;

        a.title.id = game.Tools.titleLocalization(
              r.account_id,
              r.view.title
            );

        i.getChildByName('name').text = r.view.nickname;

        r.account_id == GameMgr.Inst.account_id
          ? (i.getChildByName('bg').skin = game.Tools.localUISrc(
              'myres/activity_duanwu/rank_cell_me.png'
            ))
          : (i.getChildByName('bg').skin = game.Tools.localUISrc(
              'myres/activity_duanwu/rank_cell.png'
            ));

        i.getChildByName('btn_see').clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_OtherPlayerInfo.Inst.show(r.account_id);
            },
            null,
            !1
          );

        i.getChildByName('score').text = r.point.toString();
      }

      isopen() {
        return t.UI_Activity.activities[i.activity_id];
      }

      haveRedPoint() {
        return !i.reward_getted &&
        i.gainable_time > 0 &&
        i.gainable_time < Date.now() / 1e3;
      }

      need_popout() {
        return 1 == cfg.activity.activity.get(i.activity_id).need_popout;
      }

      show() {
        var e = this;
        this.enable = !0;

        game.LoadMgr.setImgSkin(
          this.head,
          'myres2/treasurehead/duanwu_rank.jpg'
        );

        this.label_score.text = i.point.toString();
        this.refresh_my_rank();
        var n = Date.now() / 1e3;
        var a = 60;
        var r = cfg.leaderboard.leaderboard.get(i.activity_id);
        r && (a = r.refresh_cd);
        this.scrollview.rate = 0;
        this.scrollview.reset();
        this.datas = [];
        n < this.last_refresh_time + a &&
        !(this.last_refresh_time < i.gainable_time && n < i.gainable_time)
          ? (this.noinfo.visible = 0 == this.datas.length)
          : (app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchRankPointLeaderboard',
          { leaderboard_id: i.activity_id },
          (i, n) => {
            if (i || n.error)
              t.UIMgr.Inst.showNetReqError(
                'fetchRankPointLeaderboard',
                i,
                n
              );
            else {
              e.last_refresh_time = n.last_refresh_time;
              var a = n.items;
              var r = {};
              r[a[s].account_id] = 1;
              if (a)
                for (s = 0; s < a.length; s++)
                  r[a[s].account_id] ||
                    (e.datas.push(a[s]));

              e.datas = e.datas.sort(({rank}, {rank}) => rank - rank);

              e.scrollview.addItem(e.datas.length);
              e.noinfo.visible = 0 == e.datas.length;
              for (var s = 0; s < e.datas.length; s++)
                if (e.datas[s].account_id == GameMgr.Inst.account_id) {
                  e.my_rank = e.datas[s].rank;
                  break;
                }
              e.refresh_my_rank();
            }
          }
        ));
      }

      refresh_my_rank() {
        var e = this;
        var n = cfg.activity.rank_reward.findGroup(1010);
        var a = -1;

        var r =
          `(${game.Tools.strOfLocalization(2782, [
  Math.floor(
    (Date.now() / 1e3 - this.last_refresh_time) / 60
  ).toString()
])})`;

        Date.now() > i.gainable_time && (r = '');
        if ((this.my_rank > 0)) {
          this.label_rank.text = this.my_rank.toString() + r;
          for (l = n.length - 1; l >= 0; l--)
            if (this.my_rank >= n[l].lower_rank_bound) {
              a = l;
              break;
            }
        } else
          this.label_rank.text =
            `${n[n.length - 1].lower_rank_bound.toString()}+${r}`;
        this.label_reward.text = game.Tools.strOfLocalization(2780);
        this.btn_getreward.visible = !1;
        this.label_alreadyget.visible = !1;

        app.NetAgent.sendReq2Lobby(
              'Lobby',
              'gainRankPointReward',
              { leaderboard_id: i.activity_id, activity_id: i.activity_id },
              (t, e) => {}
            );

        i.gainable_time > 0 &&
          Date.now() / 1e3 > i.gainable_time &&
          (i.reward_getted ||
            ((i.reward_getted = !0)));

        if (a >= 0) {
          for (
            var s = '', o = n[a].reward.split(','), l = 0;
            l < o.length;
            l++
          ) {
            var h = o[l].split('-');
            if (2 == h.length) {
              var c = parseInt(h[0]);
              var u = parseInt(h[1]);
              var _ = game.GameUtility.get_item_view(c);
              '' != s && (s += ',');
              s += `${_.name}x${u}`;
            }
          }
          this.label_reward.text = s;
          this.btn_getreward.visible = !i.reward_getted;
          this.label_alreadyget.visible = i.reward_getted;

          game.Tools.setGrayDisable(
            this.btn_getreward,
            i.gainable_time > 0 && Date.now() / 1e3 < i.gainable_time
          );

          this.btn_getreward.clickHandler = Laya.Handler.create(
              this,
              () => {
                game.Tools.setGrayDisable(e.btn_getreward, !0);
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'gainRankPointReward',
                  {
                    leaderboard_id: i.activity_id,
                    activity_id: i.activity_id
                  },
                  (n, a) => {
                    game.Tools.setGrayDisable(e.btn_getreward, !1);
                    i.reward_getted = !0;
                    e.btn_getreward.visible = !1;
                    e.label_alreadyget.visible = !0;
                    n || a.error
                      ? t.UIMgr.Inst.showNetReqError(
                          'gainRankPointReward',
                          n,
                          a
                        )
                      : (t.UI_LightTips.Inst.show(
                      game.Tools.strOfLocalization(2211)
                    ));
                  }
                );
              },
              null,
              !1
            );
        } else
          this.btn_getreward.clickHandler = null;
      }

      hide() {
        this.enable = !1;
        var t = game.Tools.localUISrc('myres2/treasurehead/duanwu_rank.jpg');
        Laya.loader.clearTextureRes(t);
      }
    }

    __extends(i, e);

    i.activity_id = 1010;
    i.point = 0;
    i.reward_getted = !1;
    i.gainable_time = -1;
    return i;
  })(t.UI_ActivityBase);
  t.UI_Activity_DuanWu_Rank = e;
})(uiscript || (uiscript = {}));