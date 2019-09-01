let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.common.errorinfoUI()) || this;
      return (t.locking = false), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      (this.root = this.me.getChildByName('root')),
        (this.info = this.root.getChildByName('text')),
        (this.blackbg = this.me.getChildByName('blackbg')),
        (this.btn_cancel = this.root.getChildByName('btn_cancel')),
        (this.btn_restart = this.root.getChildByName('btn_restart')),
        (this.btn_cancel.clickHandler = Laya.Handler.create(
          this,
          this.close,
          null,
          false
        )),
        (this.btn_restart.clickHandler = Laya.Handler.create(
          this,
          () => {
            Laya.Browser.window.conch
              ? Laya.Browser.window.conch &&
                Laya.Browser.window.conch.exit &&
                Laya.Browser.window.conch.exit()
              : (Laya.Browser.window.location.href = GameMgr.Inst.link_url);
          },
          null,
          false
        )),
        (this.btn_restart.visible = false),
        (this.btn_cancel.visible = false),
        (this.blackbg.visible = false);
    }),
    (i.prototype.showStr = function(t) {
      (this.btn_cancel.visible = true), (this.info.text = t), this._show();
    }),
    (i.prototype.showNetReqError = function(t, e, i) {
      this.btn_cancel.visible = true;
      let n = '';
      let a = '';
      let r = true;
      if (e && '' != e) {
        let s = '';
        if (
          ((s = e.message ? e.message : e),
          (a = `错误：${s}`),
          'TIMEOUT' == s && (s = game.Tools.strOfLocalization(11)),
          (n += s),
          !GameMgr.inRelease)
        )
          switch (((n += '\n'), game.LobbyNetMgr.Inst.connect_state)) {
            case game.EConnectState.none:
              n += '服务器未连接';
              break;
            case game.EConnectState.tryconnect:
              n += '服务器正在尝试连接';
              break;
            case game.EConnectState.reconnecting:
              n += '服务器正在重连';
              break;
            case game.EConnectState.connecting:
              n += '服务器连接正常';
              break;
            case game.EConnectState.disconnect:
              n += '服务器断开连接';
          }
      } else if (i && i.error && i.error.code) {
        r = false;
        const o = i.error.code;
        const l = cfg.info.error.get(o);
        l
          ? ((n += l[GameMgr.client_language]), (a = l.chs))
          : ((n += game.Tools.strOfLocalization(2068) + o),
            (a = `一个未收录的异常：${o}`));
      }
      (this.info.text = n), this._show();
      const h = {};
      (h.timestamp = Math.floor(Date.now() / 1e3)),
        (h.fatal = false),
        (h.lobby_ip = app.NetAgent.lobby_ip),
        (h.mj_ip = app.NetAgent.mj_ip),
        GameMgr.Inst &&
          ((h.account_id = GameMgr.Inst.account_id),
          GameMgr.Inst.client_endpoint
            ? (h.client_endpoint = JSON.stringify(
                GameMgr.Inst.client_endpoint
              ))
            : (h.client_endpoint = 'null'),
          (h.client_region = GameMgr.ClientRegion),
          (h.gateway_region_name = game.LobbyNetMgr.gateway_region_name)),
        (h.client_version = game.ResourceVersion.version),
        (h.device = game.Tools.deviceInfo),
        (h.method = t),
        (h.send_info = a);
      const c = {};
      if (((c.standardinfo = h), GameMgr.inRelease)) {
        if (r) {
          new Laya.HttpRequest().send(
            GameMgr.error_url,
            `data=${JSON.stringify(c)}`,
            'post'
          );
        }
      } else app.Log.log(JSON.stringify(c));
    }),
    (i.prototype.showFE = function() {
      (this.enable = true),
        (this.info.text = game.Tools.strOfLocalization(14)),
        (this.blackbg.visible = true),
        (this.btn_restart.visible = true);
    }),
    (i.prototype._show = function() {
      const e = this;
      (this.me.visible = true),
        (this.locking = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
          })
        );
    }),
    (i.prototype.close = function() {
      const e = this;
      this.locking ||
        ((this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.me.visible = false), e.me.destroy(true);
          })
        ));
    }),
    i
  ;
  })(t.UIBase);
  t.UI_ErrorInfo = e;
})(uiscript || (uiscript = {}));