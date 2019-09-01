let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.both_ui.gitfcodeUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.root = this.me.getChildByName('root')),
        (this.input = this.root.getChildByName('input')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          false
        )),
        (this.btn_confirm = this.root.getChildByName('btn_confirm')),
        (this.btn_confirm.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              e.btn_cd > Laya.timer.currTimer ||
              ((e.btn_cd = Laya.timer.currTimer + 1e3),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'useGiftCode',
                { code: e.input.text },
                (i, n) => {
                  (e.btn_cd = 0),
                    i || n.error
                      ? t.UIMgr.Inst.showNetReqError('useGiftCode', i, n)
                      : game.Tools.showRewards(n, null);
                }
              ));
          },
          null,
          false
        )),
        this.input.on('input', this, () => {
          e.btn_confirm.visible = 12 == e.input.text.length;
        });
    }),
    (i.prototype.show = function() {
      const e = this;
      (this.enable = true),
        (this.locking = true),
        (this.input.text = ''),
        (this.btn_cd = 0),
        (this.btn_confirm.visible = false),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
          })
        );
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
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_Giftcode = e;
})(uiscript || (uiscript = {}));