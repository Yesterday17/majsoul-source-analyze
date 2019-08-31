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
  const e = (t => {
    function e() {
      const e = t.call(this, new ui.common.preventaddictionUI()) || this;
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
    return __extends(e, t),
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
      const t = Math.ceil(
        ((Laya.timer.currTimer - GameMgr.Inst.account_refresh_time) / 1e3 +
          GameMgr.Inst.account_data.anti_addiction.online_duration) /
          60
      );
      this.refreshTime(t),
        this.caluNextTipsTime(t),
        (this.container_tips.visible = !1);
    }),
    (e.prototype.timePass = function() {
      const t = Math.ceil(
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
          (this.container_tips.visible = !0),
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
      const e = Math.floor(t / 60);
      const i = t % 60;
      let n = '';
      e < 10 && (n += '0'),
        (n += e.toString()),
        (n += ':'),
        i < 10 && (n += '0'),
        (n += i),
        (this.label_time.text = n);
    }),
    e
  ;
  })(t.UIBase);
  t.UI_PreventAddiction = e;
})(uiscript || (uiscript = {}));