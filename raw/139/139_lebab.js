let uiscript;
!(t => {
  const e = (t => {
    function e() {
      const i = t.call(this, new ui.common.commonUI()) || this;
      return (
        (i.label_net_lobby = null),
        (i.label_net_mj = null),
        (i.label_fps = null),
        (i._fps_count = 0),
        (i._last_time = 0),
        (e.Inst = i),
        i
      );
    }
    return __extends(e, t),
    (e.prototype.onCreate = function() {
      const t = this.me.getChildByName('container_net');
      (this.label_net_lobby = t.getChildByName('lobby')),
        (this.label_net_mj = t.getChildByName('mj')),
        (this.label_fps = t.getChildByName('fps')),
        (this.label_net_lobby.text = ''),
        (this.label_net_mj.text = ''),
        (this.label_fps.text = '');
    }),
    (e.prototype.onEnable = function() {
      (this._fps_count = 0),
        (this._last_time = Laya.timer.currTimer),
        game.LobbyNetMgr.Inst.refreshCommonShow();
    }),
    (e.prototype.update = function() {
      this._fps_count++;
      const t = Laya.timer.currTimer - this._last_time;
      t >= 500 &&
        ((this.label_fps.text =
          `fps:${Math.floor((this._fps_count / t) * 1e3)}`),
        (this._fps_count = 0),
        (this._last_time = Laya.timer.currTimer));
    }),
    (e.Inst = null),
    e
  ;
  })(t.UIBase);
  t.UI_Common = e;
})(uiscript || (uiscript = {}));