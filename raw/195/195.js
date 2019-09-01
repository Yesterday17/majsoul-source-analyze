var uiscript;
!(function(t) {
  var e = (function(t) {
    function e() {
      var e = t.call(this, new ui.common.preventaddictionUI()) || this;
      return (
        (e.container_tips = null),
        (e.container_time = null),
        (e.label_time = null),
        (e.next_show_tip_time = 0),
        (e.tips0 = null),
        (e.tips1 = null),
        (e.tips2 = null),
        e
      );
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        (this.container_tips = this.me.getChildByName('container_tips')),
          (this.container_time = this.me.getChildByName('container_time')),
          (this.label_time = this.container_time.getChildByName('time')),
          (this.tips0 = this.container_tips.getChildByName('l0')),
          (this.tips1 = this.container_tips.getChildByName('l1')),
          (this.tips2 = this.container_tips.getChildByName('l2')),
          Laya.timer.loop(1e3, this, this.timePass);
      }),
      (e.prototype.onEnable = function() {
        this.next_show_tip_time = 0;
        var t = Math.ceil(
          ((Laya.timer.currTimer - GameMgr.Inst.account_refresh_time) / 1e3 +
            GameMgr.Inst.account_data.anti_addiction.online_duration) /
            60
        );
        this.refreshTime(t),
          this.caluNextTipsTime(t),
          (this.container_tips.visible = false);
      }),
      (e.prototype.timePass = function() {
        var t = Math.ceil(
          ((Laya.timer.currTimer - GameMgr.Inst.account_refresh_time) / 1e3 +
            GameMgr.Inst.account_data.anti_addiction.online_duration) /
            60
        );
        this.refreshTime(t),
          t >= this.next_show_tip_time &&
            ((this.tips0.visible = t < 180),
            (this.tips1.visible = t >= 180 && t < 300),
            (this.tips2.visible = t >= 300),
            t < 180 &&
              (this.tips0.text = game.Tools.strOfLocalization(2157, [
                Math.floor(t / 60).toString()
              ])),
            (this.container_tips.visible = true),
            this.caluNextTipsTime(t));
      }),
      (e.prototype.caluNextTipsTime = function(t) {
        this.next_show_tip_time =
          t < 180
            ? 60 * Math.ceil((t + 1) / 60)
            : t < 300
            ? 30 * Math.ceil((t - 180 + 1) / 30) + 180
            : 15 * Math.ceil((t - 300 + 1) / 15) + 300;
      }),
      (e.prototype.refreshTime = function(t) {
        var e = Math.floor(t / 60),
          i = t % 60,
          n = '';
        e < 10 && (n += '0'),
          (n += e.toString()),
          (n += ':'),
          i < 10 && (n += '0'),
          (n += i),
          (this.label_time.text = n);
      }),
      e
    );
  })(t.UIBase);
  t.UI_PreventAddiction = e;
})(uiscript || (uiscript = {}));