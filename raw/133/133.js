var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.checkhuiyuUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.btn_close = this.root.getChildByName('btn_close')),
          (this.btn_chongzhi = this.root.getChildByName('btn_buy')),
          (this.btn_confirm = this.root.getChildByName('btn_confirm')),
          (this.notice1 = this.root.getChildByName('notice1')),
          (this.notice2 = this.root.getChildByName('notice2')),
          (this.notice3 = this.root.getChildByName('notice3')),
          (this.btn_close.clickHandler = Laya.Handler.create(
            this,
            function() {
              (e.locking = true),
                t.UIBase.anim_pop_hide(
                  e.root,
                  Laya.Handler.create(e, function() {
                    (e.locking = false), (e.enable = false);
                  })
                );
            },
            null,
            false
          )),
          (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            function() {
              (e.locking = true),
                t.UIBase.anim_pop_hide(
                  e.root,
                  Laya.Handler.create(e, function() {
                    (e.locking = false), (e.enable = false);
                  })
                );
            },
            null,
            false
          )),
          (this.btn_chongzhi.clickHandler = Laya.Handler.create(
            this,
            function() {
              (e.func_locking && e.func_locking.run()) ||
                (t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : (e.func_close
                      ? e.func_close.runWith(
                          Laya.Handler.create(
                            e,
                            function() {
                              t.UI_Recharge.Inst.show('huiyu');
                            },
                            null,
                            false
                          )
                        )
                      : ((e.locking = true),
                        t.UIBase.anim_pop_hide(
                          e.root,
                          Laya.Handler.create(e, function() {
                            (e.locking = false), (e.enable = false);
                          })
                        )),
                    (e.enable = false)));
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function(e, i, n) {
        var a = this;
        (this.locking = true),
          (this.func_close = i),
          (this.func_locking = n),
          (this.enable = true),
          (this.root.visible = true),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              a.locking = false;
            })
          );
        var r = GameMgr.Inst.account_data.diamond,
          s = 0;
        GameMgr.inGooglePlay &&
          GameMgr.Inst.account_numerical_resource[101001] &&
          (s += GameMgr.Inst.account_numerical_resource[101001]),
          GameMgr.inChina &&
            GameMgr.Inst.account_numerical_resource[101002] &&
            (s += GameMgr.Inst.account_numerical_resource[101002]),
          (this.notice2.text = r.toString()),
          (this.notice1.text = s.toString()),
          (this.notice3.text = (s + r).toString());
      }),
      (i.Inst = null),
      (i.first = true),
      i
    );
  })(t.UIBase);
  t.UI_checkhuiyu = e;
})(uiscript || (uiscript = {}));