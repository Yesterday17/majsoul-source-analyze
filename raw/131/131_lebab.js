let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.chang_nicknameUI()) || this;
      return (t.locking = false), (i.Inst = t), t;
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
          false
        )),
        this.input.on('focus', this, () => {
          (t.lb.visible = false), (t.input_no.visible = false);
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
          false
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
        (this.container_no.visible = true),
          (this.label_count.text = n.toString()),
          (this.container_input.visible = false);
      else {
        (this.container_input.visible = true),
          (this.container_no.visible = false),
          (this.input_no.visible = false),
          (this.lb.visible = true),
          (this.input.text = ''),
          (this.notice.text = game.Tools.strOfLocalization(2675));
        const a = this.container_input.getChildByName('price');
        const r = cfg.item_definition.item.get(302013);
        game.LoadMgr.setImgSkin(a.getChildByName('icon'), r.icon);
        const s = a.getChildByName('count');
        (s.text = 'x1'),
          t.UI_Bag.get_item_count(302013) > 0
            ? ((s.color = '#00ff00'),
              game.Tools.setGrayDisable(this.btn_confirm, false))
            : ((s.color = '#ff0000'),
              game.Tools.setGrayDisable(this.btn_confirm, true)),
          game.Tools.child_align_center(a, [10, 10, 10]);
      }
      (this.enable = true),
        (this.locking = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
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
          for (var n = false, a = 0; a < '~@!#%&()_+={}:;<>'.length; a++)
            if ('~@!#%&()_+={}:;<>'[a] == t[e]) {
              n = true;
              break;
            }
          if (!n) return true;
        }
      }
      return false;
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
            ? (this.input_no.visible = true)
            : (game.Tools.setGrayDisable(this.btn_confirm, true),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'modifyNickname',
                { nickname: s, use_item_id: 302013 },
                (i, n) => {
                  i || n.error
                    ? (t.UIMgr.Inst.showNetReqError('modifyNickname', i, n),
                      game.Tools.setGrayDisable(e.btn_confirm, false))
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
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Change_Nickname = e;
})(uiscript || (uiscript = {}));