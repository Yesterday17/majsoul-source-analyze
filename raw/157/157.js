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
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.both_ui.gitfcodeUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.input = this.root.getChildByName('input')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            !1
          )),
          (this.btn_confirm = this.root.getChildByName('btn_confirm')),
          (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                e.btn_cd > Laya.timer.currTimer ||
                ((e.btn_cd = Laya.timer.currTimer + 1e3),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'useGiftCode',
                  { code: e.input.text },
                  function(i, n) {
                    (e.btn_cd = 0),
                      i || n.error
                        ? t.UIMgr.Inst.showNetReqError('useGiftCode', i, n)
                        : game.Tools.showRewards(n, null);
                  }
                ));
            },
            null,
            !1
          )),
          this.input.on('input', this, function() {
            e.btn_confirm.visible = 12 == e.input.text.length;
          });
      }),
      (i.prototype.show = function() {
        var e = this;
        (this.enable = !0),
          (this.locking = !0),
          (this.input.text = ''),
          (this.btn_cd = 0),
          (this.btn_confirm.visible = !1),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              e.locking = !1;
            })
          );
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = !1), (e.enable = !1);
            })
          );
      }),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_Giftcode = e;
})(uiscript || (uiscript = {}));