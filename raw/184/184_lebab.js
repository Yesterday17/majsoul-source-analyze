const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.nicknameUI()) || this;
      return (t.locking = !1), (t.btn_cd = 0), t;
    }
    return __extends(i, e),
    (i.show = function() {
      const e = new i();
      t.UIMgr.Inst.AddLobbyUI(e),
        Laya.timer.frameOnce(5, this, () => {
          e.show();
        });
    }),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.root = this.me.getChildByName('root')),
        (this.lb = this.root.getChildByName('lb')),
        (this.input = this.root.getChildByName('txtinput')),
        (this.yes = this.root.getChildByName('yes')),
        (this.no = this.root.getChildByName('no')),
        (this.btn_confirm = this.root.getChildByName('btn_confirm')),
        (this.btn_confirm.clickHandler = Laya.Handler.create(
          this,
          this.onBtnConfrim,
          null,
          !1
        )),
        this.input.on('focus', this, () => {
          (e.lb.visible = !1), (e.yes.visible = !1), (e.no.visible = !1);
        }),
        this.input.on('blur', this, () => {
          e.lb.visible = !e.input.text || '' == e.input.text;
        }),
        this.input.on('input', this, () => {
          e.input.text && e.input.text;
        }),
        (this.root_xinshou = this.me.getChildByName('root_xinshou')),
        (this.root_xinshou.getChildByName(
          'btn_no'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close_course();
          },
          null,
          !1
        )),
        (this.root_xinshou.getChildByName(
          'btn_yes'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              ((e.enable = !1),
              t.UI_Rules.Inst.show(
                1,
                Laya.Handler.create(e, () => {
                  e.destroy(), game.Scene_Lobby.Inst.pending_enter_event();
                })
              ));
          },
          null,
          !1
        )),
        (this.root.getChildByName('en_no_space').visible =
          'en' == GameMgr.client_language);
    }),
    (i.prototype.show = function() {
      const e = this;
      (this.enable = !0),
        (this.locking = !0),
        (this.yes.visible = !1),
        (this.no.visible = !1),
        (this.root_xinshou.visible = !1),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
    }),
    (i.prototype.close_nickname = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1),
              (e.root.visible = !1),
              (e.enable = !1),
              e.destroy(),
              t.UI_XinShouYinDao.Inst.show(
                0,
                Laya.Handler.create(e, () => {
                  game.Scene_Lobby.Inst.pending_enter_event();
                })
              );
          })
        );
    }),
    (i.prototype.show_course = function() {
      const e = this;
      (this.root_xinshou.visible = !0),
        (this.root_xinshou.getChildByName('name').text =
          `${this.input.text} ${game.Tools.strOfLocalization(2150)}`),
        (this.locking = !0),
        t.UIBase.anim_pop_out(
          this.root_xinshou,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
    }),
    (i.prototype.close_course = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root_xinshou,
          Laya.Handler.create(this, () => {
            (e.locking = !1),
              (e.enable = !1),
              e.destroy(),
              game.Scene_Lobby.Inst.pending_enter_event();
          })
        );
    }),
    (i.prototype.have_invalid_char = t => {
      for (let e = 0; e < t.length; e++) {
        const i = t.charCodeAt(e);
        if (
          !(i >= '0'.charCodeAt(0) && i <= '9'.charCodeAt(0)) &&
          !(
            (i >= 'a'.charCodeAt(0) && i <= 'z'.charCodeAt(0)) ||
            (i >= 'A'.charCodeAt(0) && i <= 'Z'.charCodeAt(0)) ||
            (i >= 11904 && i <= 40959)
          )
        ) {
          for (var n = !1, a = 0; a < '~@!#%&()_+={}:;<>'.length; a++)
            if ('~@!#%&()_+={}:;<>'[a] == t[e]) {
              n = !0;
              break;
            }
          if (!n) return !0;
        }
      }
      return !1;
    }),
    (i.prototype.onBtnConfrim = function() {
      const e = this;
      if (!this.locking && '' != this.input.text) {
        for (
          var i = this.input.text, n = 0, a = 0, r = 0;
          r < i.length;
          r++
        ) {
          if (i.charCodeAt(r) > 255) {
            if (n + 2 > 14) break;
            n += 2;
          } else {
            if (n + 1 > 14) break;
            n += 1;
          }
          a++;
        }
        if (a == i.length) {
          const s = this.input.text;
          if (this.have_invalid_char(s) || t.UI_Entrance.Accountforbidden(s))
            this.no.visible = !0;
          else if (!(Laya.timer.currTimer < this.btn_cd)) {
            this.btn_cd = Laya.timer.currTimer + 700;
            const o = {};
            (o.nickname = s),
              GameMgr.Inst._ad_str &&
                (o.advertise_str = GameMgr.Inst._ad_str),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'createNickname',
                o,
                (i, n) => {
                  (e.btn_cd = 0),
                    i || n.error
                      ? t.UIMgr.Inst.showNetReqError('createNickname', i, n)
                      : (app.PlayerBehaviorStatistic.fb_trace_force(
                          app.EBehaviorType.Level_1
                        ),
                        (GameMgr.Inst.account_data.nickname = s),
                        GameMgr.Inst.fetch_login_info(),
                        (GameMgr.Inst.account_setting[
                          game.EAccountSetKey.user_xieyi.toString()
                        ] = 1),
                        e.close_nickname());
                }
              ),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'updateAccountSettings',
                {
                  setting: { key: game.EAccountSetKey.user_xieyi, value: 1 }
                },
                (t, e) => {}
              );
            const l = t.UI_Sushe.characters;
            const h = Math.floor(Math.random() * l.length);
            (t.UI_Sushe.main_character_id = t.UI_Sushe.characters[h].charid),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'changeMainCharacter',
                { character_id: t.UI_Sushe.main_character_id },
                (t, e) => {}
              ),
              (GameMgr.Inst.account_data.avatar_id =
                t.UI_Sushe.characters[h].skin);
          }
        } else t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2750));
      }
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Nickname = e;
})(uiscript || (uiscript = {}));