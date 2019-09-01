var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.entrance.account_prohibitionUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me
          .getChildByName('Prohibition')
          .getChildByName('container')),
          (this.info = this.root.getChildByName('text')),
          (this.me.visible = false),
          (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.close();
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function(e) {
        var i = game.Tools.strOfLocalization(2064) + '\n';
        if (e.u32_params && e.u32_params.length >= 2)
          if (0 == e.u32_params[1])
            i += game.Tools.strOfLocalization(2065) + '\n';
          else {
            var n = e.u32_params[0] + e.u32_params[1];
            i +=
              game.Tools.strOfLocalization(2066) +
              game.Tools.time2YearMounthDate(n) +
              ' ' +
              game.Tools.time2HourMinute(n) +
              '\n';
          }
        e.str_params &&
          e.str_params.length > 0 &&
          (i += game.Tools.strOfLocalization(2067) + e.str_params[0]),
          (this.info.text = i),
          (this.me.visible = true),
          t.UIBase.anim_pop_out(this.root, null);
      }),
      (i.prototype.close = function() {
        var e = this;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, function() {
            e.me.visible = false;
          })
        );
      }),
      i
    );
  })(t.UIBase);
  t.UI_Entrance_Prohibition = e;
})(uiscript || (uiscript = {}));