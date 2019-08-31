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
      const t = e.call(this, new ui.lobby.chang_nicknameUI()) || this;
      return (t.locking = !1), (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.container_input = this.root.getChildByName('container_input')),
        (this.lb = this.container_input.getChildByName('lb')),
        (this.input = this.container_input.getChildByName('txtinput')),
        (this.input_no = this.container_input.getChildByName('no')),
        (this.btn_confirm = this.container_input.getChildByName(
          'btn_confirm'
        )),
        (this.notice = this.container_input.getChildByName('nochange')),
        (this.btn_confirm.clickHandler = Laya.Handler.create(
          this,
          this.onBtnConfrim,
          null,
          !1
        )),
        this.input.on('focus', this, () => {
          (t.lb.visible = !1), (t.input_no.visible = !1);
        }),
        this.input.on('blur', this, () => {
          t.lb.visible = !t.input.text || '' == t.input.text;
        }),
        this.input.on('input', this, () => {
          t.input.text && t.input.text;
        }),
        (this.container_no = this.root.getChildByName('container_no')),
        (this.label_count = this.container_no.getChildByName('count')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.close();
          },
          null,
          !1
        )),
        (this.container_input.getChildByName('en_no_space').visible =
          'en' == GameMgr.client_language);
    }),
    (i.prototype.show = function() {
      const e = this;
      const i = Date.now() / 1e3;

      const n =
        30 - Math.floor((i - GameMgr.Inst.last_mod_name_time) / 3600 / 24);

      if (n > 0)
        (this.container_no.visible = !0),
          (this.label_count.text = n.toString()),
          (this.container_input.visible = !1);
      else {
        (this.container_input.visible = !0),
          (this.container_no.visible = !1),
          (this.input_no.visible = !1),
          (this.lb.visible = !0),
          (this.input.text = ''),
          (this.notice.text = game.Tools.strOfLocalization(2675));
        const a = this.container_input.getChildByName('price');
        const r = cfg.item_definition.item.get(302013);
        game.LoadMgr.setImgSkin(a.getChildByName('icon'), r.icon);
        const s = a.getChildByName('count');
        (s.text = 'x1'),
          t.UI_Bag.get_item_count(302013) > 0
            ? ((s.color = '#00ff00'),
              game.Tools.setGrayDisable(this.btn_confirm, !1))
            : ((s.color = '#ff0000'),
              game.Tools.setGrayDisable(this.btn_confirm, !0)),
          game.Tools.child_align_center(a, [10, 10, 10]);
      }
      (this.enable = !0),
        (this.locking = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
    }),
    (i.prototype.have_invalid_char = t => {
      for (let e = 0; e < t.length; e++) {
        const i = t.charCodeAt(e);
        if (
          !(i >= 'a'.charCodeAt(0) && i <= 'z'.charCodeAt(0)) &&
          !(
            (i >= 'A'.charCodeAt(0) && i <= 'Z'.charCodeAt(0)) ||
            (i >= '0'.charCodeAt(0) && i <= '9'.charCodeAt(0)) ||
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
          this.have_invalid_char(s) || t.UI_Entrance.Accountforbidden(s)
            ? (this.input_no.visible = !0)
            : (game.Tools.setGrayDisable(this.btn_confirm, !0),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'modifyNickname',
                { nickname: s, use_item_id: 302013 },
                (i, n) => {
                  i || n.error
                    ? (t.UIMgr.Inst.showNetReqError('modifyNickname', i, n),
                      game.Tools.setGrayDisable(e.btn_confirm, !1))
                    : ((GameMgr.Inst.account_data.nickname = s),
                      (GameMgr.Inst.last_mod_name_time = Date.now() / 1e3),
                      t.UI_PlayerInfo.Inst.refreshBaseInfo(),
                      t.UI_Lobby.Inst.top.refresh(),
                      e.close());
                }
              ));
        } else t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2750));
      }
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.enable = !1);
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Change_Nickname = e;
})(uiscript || (uiscript = {}));