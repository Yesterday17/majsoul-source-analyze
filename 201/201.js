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
            'chs' == GameMgr.client_language
              ? new ui.both_ui.otherplayerinfoUI()
              : new ui.both_ui.otherplayerinfo_enUI()
          ) || this;
        t.account_id = 0;
        t.origin_x = 0;
        t.origin_y = 0;
        t.root = null;
        t.title = null;
        t.level = null;
        t.btn_addfriend = null;
        t.illust = null;
        t.label_name = null;
        t.detail_data = null;
        t.locking = !1;
        t.tab_info4 = null;
        t.tab_info3 = null;
        t.tab_note = null;
        t.tab_img_dark = '';
        t.tab_img_chosen = '';
        t.player_data = null;
        t.tab_index = 1;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;

        this.tab_img_chosen = game.Tools.localUISrc(
              'myres/bothui/info_tab_chosen.png'
            );

        this.tab_img_chosen = game.Tools.localUISrc(
              'myres/bothui/info_tabheng_chosen.png'
            );

        'chs' == GameMgr.client_language
          ? (this.tab_img_dark = game.Tools.localUISrc(
              'myres/bothui/info_tab_dark.png'
            ))
          : (this.tab_img_dark = game.Tools.localUISrc(
              'myres/bothui/info_tabheng_dark.png'
            ));

        this.root = this.me.getChildByName('root');
        this.origin_x = this.root.x;
        this.origin_y = this.root.y;
        this.container_info = this.root.getChildByName('container_info');

        this.title = new t.UI_PlayerTitle(
            this.container_info.getChildByName('title')
          );

        this.label_name = this.container_info.getChildByName('ID');

        this.level = new t.UI_Level(
            this.container_info.getChildByName('rank')
          );

        this.detail_data = new t.UI_PlayerData(
            this.container_info.getChildByName('data')
          );

        this.illust = new t.UI_Character_Skin(
            this.root.getChildByName('illust').getChildByName('illust')
          );

        this.btn_addfriend = this.container_info.getChildByName('btn_add');

        this.btn_addfriend.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.btn_addfriend.visible = !1;
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'applyFriend',
                { target_id: e.account_id },
                (t, e) => {}
              );
            },
            null,
            !1
          );

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close();
            },
            null,
            !1
          );

        this.note = new t.UI_PlayerNote(
            this.root.getChildByName('container_note'),
            null
          );

        this.tab_info4 = this.root.getChildByName('tab_info4');

        this.tab_info4.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || (1 != e.tab_index && e.changeMJCategory(1));
            },
            null,
            !1
          );

        this.tab_info3 = this.root.getChildByName('tab_info3');

        this.tab_info3.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || (2 != e.tab_index && e.changeMJCategory(2));
            },
            null,
            !1
          );

        this.tab_note = this.root.getChildByName('tab_note');

        this.tab_note.clickHandler = Laya.Handler.create(
            this,
            () => {
              if (!e.locking) {
                var i = Date.now();
                e.container_info.visible = !1;
                e.tab_info4.skin = e.tab_img_dark;
                e.tab_info3.skin = e.tab_img_dark;
                e.tab_note.skin = e.tab_img_chosen;
                e.tab_index = 3;
                'chs' == GameMgr.client_language &&
                i >= 15696e8 &&
                i <= 15706548e5
                  ? t.UIMgr.Inst.ShowErrorInfo('该功能正在维护')
                  : e.container_info.visible &&
                    (e.note.show());
              }
            },
            null,
            !1
          );

        this.locking = !1;
      }

      show(e, i) {
        var n = this;
        void 0 === i && (i = 1);
        GameMgr.Inst.BehavioralStatistics(14);
        this.account_id = e;
        this.enable = !0;
        this.locking = !0;
        this.root.y = 560;
        this.player_data = null;

        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );

        this.detail_data.reset();

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchAccountStatisticInfo',
          { account_id: e },
          (e, i) => {
            n.detail_data.setData(i);
            e || i.error
              ? t.UIMgr.Inst.showNetReqError(
                  'fetchAccountStatisticInfo',
                  e,
                  i
                )
              : (n.changeMJCategory(n.tab_index));
          }
        );

        this.note.init_data(e);
        this.refreshBaseInfo();
        this.tab_index = i;
        this.container_info.visible = !0;

        this.tab_info4.skin =
            1 == this.tab_index ? this.tab_img_chosen : this.tab_img_dark;

        this.tab_info3.skin =
            2 == this.tab_index ? this.tab_img_chosen : this.tab_img_dark;

        this.tab_note.skin = this.tab_img_dark;
        this.note.close();

        this.level.id = this.player_data[
              1 == this.tab_index ? 'level' : 'level3'
            ].id;

        this.level.id = 1 == this.tab_index ? 10101 : 20101;
        this.player_data
          ? (this.level.exp = this.player_data[
              1 == this.tab_index ? 'level' : 'level3'
            ].score)
          : (this.level.exp = 0);
      }

      refreshBaseInfo() {
        var e = this;
        this.title.id = 0;
        this.illust.me.visible = !1;
        this.label_name.text = '';
        this.btn_addfriend.visible = !1;
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchAccountInfo',
          { account_id: this.account_id },
          (i, n) => {
            if (i || n.error)
              t.UIMgr.Inst.showNetReqError('fetchAccountInfo', i, n);
            else {
              var a = n.account;
              e.player_data = a;
              e.label_name.text = a.nickname;

              e.title.id = game.Tools.titleLocalization(
                  a.account_id,
                  a.title
                );

              e.level.id = a.level.id;

              e.level.id =
                  e.player_data[1 == e.tab_index ? 'level' : 'level3'].id;

              e.level.exp =
                  e.player_data[1 == e.tab_index ? 'level' : 'level3'].score;

              e.illust.me.visible = !0;
              e.illust.setSkin(a.avatar_id, 'waitingroom');

              game.Tools.is_same_zone(
                GameMgr.Inst.account_id,
                e.account_id
              ) &&
              e.account_id != GameMgr.Inst.account_id &&
              null == game.FriendMgr.find(e.account_id)
                ? (e.btn_addfriend.visible = !0)
                : (e.btn_addfriend.visible = !1);

              e.note.sign.setSign(a.signature);
            }
          }
        );
      }

      changeMJCategory(t) {
        this.tab_index = t;
        this.container_info.visible = !0;
        this.detail_data.changeMJCategory(t);

        this.tab_info4.skin =
            1 == this.tab_index ? this.tab_img_chosen : this.tab_img_dark;

        this.tab_info3.skin =
            2 == this.tab_index ? this.tab_img_chosen : this.tab_img_dark;

        this.tab_note.skin = this.tab_img_dark;
        this.note.close();

        this.level.id = this.player_data[
              1 == this.tab_index ? 'level' : 'level3'
            ].id;

        this.level.id = 1 == this.tab_index ? 10101 : 20101;
        this.player_data
          ? (this.level.exp = this.player_data[
              1 == this.tab_index ? 'level' : 'level3'
            ].score)
          : (this.level.exp = 0);
      }

      close() {
        var e = this;
        this.locking = !0;
        this.detail_data.close();
        this.enable &&
          (this.locking ||
            (t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
          })
        )));
      }

      onDisable() {
        this.detail_data.close();
        this.illust.clear();
        Laya.loader.clearTextureRes(this.level.icon.skin);
      }
    }

    __extends(i, e);

    i.Inst = null;
    return i;
  })(t.UIBase);
  t.UI_OtherPlayerInfo = e;
})(uiscript || (uiscript = {}));