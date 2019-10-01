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
    class t {
      constructor(e) {
        var n = this;
        this.change_cd = 0;
        t.Inst = this;
        this.me = e;
        this.input = e.getChildByName('input');

        e.getChildByName('btn_confirm').clickHandler = Laya.Handler.create(
            this,
            () => {
              var t = n.input.text;
              GameMgr.Inst.account_data.signature = t;

              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'modifySignature',
                { signature: t },
                (t, e) => {}
              );

              n.change_cd = Laya.timer.currTimer + 3e4;

              t == GameMgr.Inst.account_data.signature ||
                (i.Inst.note.sign.setSign(t));

              n.me.visible = !1;
            },
            null,
            !1
          );

        this.input.on('input', this, () => {
          if (n.input.text && '' != n.input.text) {
            for (var t = n.input.text, e = 0, i = 0, a = 0; a < t.length; a++) {
              if (t.charCodeAt(a) > 255) {
                if (e + 2 > 180) break;
                e += 2;
              } else {
                if (e + 1 > 180) break;
                e += 1;
              }
              i++;
            }
            i != t.length && (n.input.text = t.substr(0, i));
          }
        });
      }

      show() {
        this.me.visible = !0;
        this.input.text = GameMgr.Inst.account_data.signature;
      }
    }

    t.Inst = null;
    return t;
  })();
  t.Sign_Input = e;
  var i = (i => {
    class n {
      constructor() {
        var t =
          i.call(
            this,
            'chs' == GameMgr.client_language
              ? new ui.lobby.playerinfoUI()
              : new ui.lobby.playerinfo_enUI()
          ) || this;
        t.origin_x = 0;
        t.origin_y = 0;
        t.root = null;
        t.title = null;
        t.level = null;
        t.input = null;
        t.label_name = null;
        t.detail_data = null;
        t.tab_info4 = null;
        t.tab_info3 = null;
        t.tab_note = null;
        t.note_readpoint = null;
        t.locking = !1;
        t.havenewcomment = !1;
        t.tab_img_dark = '';
        t.tab_img_chosen = '';
        t.tab_index = 1;
        n.Inst = t;
        return t;
      }

      onCreate() {
        var i = this;

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

        this.container_info.getChildByName(
            'btn_title'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_TitleBook.Inst.show();
            },
            null,
            !1
          );

        this.container_info.getChildByName(
            'btn_changenickname'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_Change_Nickname.Inst.show();
            },
            null,
            !1
          );

        game.Tools.labelLocalizationSize(
          this.container_info
            .getChildByName('btn_changenickname')
            .getChildAt(0),
          180,
          0.9
        );

        this.container_info.getChildByName(
            'btn_rank'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.UI_Introduce.Inst.show(i.tab_index);
            },
            null,
            !1
          );

        this.tab_info4 = this.root.getChildByName('tab_info4');

        this.tab_info4.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || (1 != i.tab_index && i.changeMJCategory(1));
            },
            null,
            !1
          );

        this.tab_info3 = this.root.getChildByName('tab_info3');

        this.tab_info3.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.locking || (2 != i.tab_index && i.changeMJCategory(2));
            },
            null,
            !1
          );

        this.tab_note = this.root.getChildByName('tab_note');

        this.tab_note.clickHandler = Laya.Handler.create(
            this,
            () => {
              if (!i.locking) {
                var e = Date.now();
                i.container_info.visible = !1;
                i.tab_info4.skin = i.tab_img_dark;
                i.tab_info3.skin = i.tab_img_dark;
                i.tab_note.skin = i.tab_img_chosen;
                i.tab_index = 3;
                'chs' == GameMgr.client_language &&
                e >= 15696e8 &&
                e <= 15706548e5
                  ? t.UIMgr.Inst.ShowErrorInfo('该功能正在维护')
                  : i.container_info.visible &&
                    (i.note.show());
              }
            },
            null,
            !1
          );

        this.note_readpoint = this.tab_note.getChildByName('redpoint');
        this.note_readpoint.visible = !1;

        this.note = new t.UI_PlayerNote(
            this.root.getChildByName('container_note'),
            this.note_readpoint
          );

        this.locking = !1;
        this.input = new e(this.me.getChildByName('container_sign_input'));
        this.input.me.visible = !1;
      }

      show(e) {
        var i = this;
        void 0 === e && (e = 1);
        this.enable = !0;
        this.root.alpha = 0;
        this.root.y = this.origin_y + 100;
        this.locking = !0;

        Laya.Tween.to(
          this.root,
          { alpha: 1, y: this.origin_y },
          200,
          null,
          Laya.Handler.create(this, () => {
            i.locking = !1;
          })
        );

        this.detail_data.reset();
        this.tab_index = e;

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchAccountStatisticInfo',
          { account_id: GameMgr.Inst.account_id },
          (e, n) => {
            app.Log.log(JSON.stringify(n));
            i.detail_data.setData(n);
            e || n.error
              ? t.UIMgr.Inst.showNetReqError(
                  'fetchAccountStatisticInfo',
                  e,
                  n
                )
              : (i.changeMJCategory(i.tab_index));
          }
        );

        this.note.init_data(GameMgr.Inst.account_id);
        this.refreshBaseInfo();
        this.input.me.visible = !1;
        this.tab_index = this.tab_index;
        this.container_info.visible = !0;

        this.tab_info4.skin =
            1 == this.tab_index ? this.tab_img_chosen : this.tab_img_dark;

        this.tab_info3.skin =
            2 == this.tab_index ? this.tab_img_chosen : this.tab_img_dark;

        this.tab_note.skin = this.tab_img_dark;
        this.note.close();

        this.level.id =
            GameMgr.Inst.account_data[
              1 == this.tab_index ? 'level' : 'level3'
            ].id;

        this.locking ||
          ((this.level.exp = GameMgr.Inst.account_data[
          1 == this.tab_index ? 'level' : 'level3'
        ].score));
      }

      refreshBaseInfo() {
        var t = GameMgr.Inst.account_data;
        this.label_name.text = t.nickname;
        this.title.id = t.title;
        this.note.sign.setSign(t.signature);
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

        this.level.id =
            GameMgr.Inst.account_data[
              1 == this.tab_index ? 'level' : 'level3'
            ].id;

        this.level.exp =
            GameMgr.Inst.account_data[
              1 == this.tab_index ? 'level' : 'level3'
            ].score;
      }

      close() {
        var t = this;
        this.locking = !0;
        this.locking ||
          (Laya.Tween.to(
          this.root,
          { alpha: 0, y: this.origin_y + 100 },
          200,
          null,
          Laya.Handler.create(this, () => {
            t.locking = !1;
            t.enable = !1;
          })
        ));
      }

      onDisable() {
        this.detail_data.close();
      }
    }

    __extends(n, i);

    n.Inst = null;
    return n;
  })(t.UIBase);
  t.UI_PlayerInfo = i;
})(uiscript || (uiscript = {}));