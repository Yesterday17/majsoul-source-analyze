var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.ageconfirmUI()) || this;
      return (t.birth_day = 0), (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me
          .getChildByName('agepending')
          .getChildByName('root')),
          (this.btn_confirm = this.root.getChildByName('btn_confirm')),
          (this.btn_close = this.root.getChildByName('btn_close')),
          (this.nianling = this.root.getChildByName('sheding')),
          (this.shangxian = this.root.getChildByName('shangxian')),
          (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                (e.close(),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'modifyBirthday',
                  { birthday: e.birth_day },
                  function(i, n) {
                    i || n.error
                      ? t.UIMgr.Inst.showNetReqError('modifyBirthday', i, n)
                      : ((GameMgr.Inst.account_data.birthday = e.birth_day),
                        t.UI_Agesuccess.Inst.show());
                  }
                ));
            },
            null,
            false
          )),
          (this.btn_close.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function(e, i, n) {
        var a = this;
        (this.enable = true), (this.locking = true);
        var r = '生年月日を' + e + '年' + i + '月に設定しますか？';
        this.nianling.text = r;
        var s = new Date();
        s.setFullYear(parseInt(e), parseInt(i) - 1, 1),
          s.setHours(1, 0, 0, 0),
          (this.birth_day = Math.floor(s.getTime() / 1e3)),
          n < 0
            ? ((this.shangxian.visible = false),
              (this.root.getChildByName('xiaofei1').visible = false),
              (this.root.getChildByName('xiaofei0').visible = false))
            : ((this.shangxian.text = n.toString()),
              (this.shangxian.visible = true),
              (this.root.getChildByName('xiaofei1').visible = true),
              (this.root.getChildByName('xiaofei0').visible = true)),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              a.locking = false;
            })
          );
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = false), (e.enable = false);
            })
          );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Ageconfirm = e;
})(uiscript || (uiscript = {}));