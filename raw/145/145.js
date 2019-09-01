var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.common.disconnectUI()) || this;
      return (
        (t.root = null),
        (t.txt_info = null),
        (t.txt_dot = null),
        (t.state = 0),
        (t.count = 0),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        (this.root = this.me.getChildByName('root')),
          (this.txt_info = this.root.getChildByName('text')),
          (this.txt_dot = this.root.getChildByName('text_dot'));
      }),
      (i.prototype.show = function() {
        1 == this.state ||
          (0 == this.state
            ? ((this.enable = true),
              Laya.timer.clearAll(this),
              this.refreshInfo(),
              t.UIBase.anim_pop_out(this.root, null),
              Laya.timer.loop(500, this, this.refreshInfo))
            : 2 == this.state
            ? (Laya.timer.clearAll(this),
              this.refreshInfo(),
              Laya.timer.loop(500, this, this.refreshInfo))
            : 3 == this.state &&
              (Laya.timer.clearAll(this),
              this.refreshInfo(),
              (this.root.scaleX = 1),
              (this.root.scaleY = 1),
              (this.root.alpha = 1),
              t.UIBase.anim_pop_out(this.root, null),
              Laya.timer.loop(500, this, this.refreshInfo))),
          (this.state = 1),
          t.UIMgr.Inst.disableMouse();
      }),
      (i.prototype.hide = function() {
        var e = this;
        (this.state = 2),
          Laya.timer.clearAll(this),
          Laya.timer.once(1e3, this, function() {
            (e.state = 3),
              t.UIBase.anim_pop_hide(
                e.root,
                Laya.Handler.create(e, function() {
                  (e.state = 0), (e.enable = false), t.UIMgr.Inst.enableMouse();
                })
              );
          });
      }),
      (i.prototype.refreshInfo = function() {
        this.count = (this.count + 1) % 4;
        for (var t = '', e = 0; e < this.count; e++) t += '.';
        game.LobbyNetMgr.Inst.connect_state == game.EConnectState.disconnect
          ? ((this.txt_info.text = game.Tools.strOfLocalization(2049)),
            (this.txt_dot.text = ''))
          : game.LobbyNetMgr.Inst.connect_state ==
            game.EConnectState.reconnecting
          ? ((this.txt_info.text = game.Tools.strOfLocalization(2050)),
            (this.txt_dot.text = t))
          : game.LobbyNetMgr.Inst.connect_state == game.EConnectState.none ||
            game.LobbyNetMgr.Inst.connect_state == game.EConnectState.tryconnect
          ? ((this.txt_info.text = game.Tools.strOfLocalization(2051)),
            (this.txt_dot.text = ''))
          : game.LobbyNetMgr.Inst.connect_state ==
              game.EConnectState.connecting &&
            (game.MJNetMgr.Inst.connect_state == game.EConnectState.none ||
            game.MJNetMgr.Inst.connect_state == game.EConnectState.tryconnect ||
            game.MJNetMgr.Inst.connect_state == game.EConnectState.connecting
              ? ((this.txt_info.text = game.Tools.strOfLocalization(2052)),
                (this.txt_dot.text = ''),
                this.hide())
              : game.MJNetMgr.Inst.connect_state ==
                game.EConnectState.disconnect
              ? ((this.txt_info.text = game.Tools.strOfLocalization(2049)),
                (this.txt_dot.text = ''))
              : game.MJNetMgr.Inst.connect_state ==
                  game.EConnectState.reconnecting &&
                ((this.txt_info.text = game.Tools.strOfLocalization(2050)),
                (this.txt_dot.text = t)));
      }),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_Disconnect = e;
})(uiscript || (uiscript = {}));