var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.common.errorinfoUI()) || this;
        t.locking = !1;
        return t;
      }

      onCreate() {
        this.root = this.me.getChildByName('root');
        this.info = this.root.getChildByName('text');
        this.blackbg = this.me.getChildByName('blackbg');
        this.btn_cancel = this.root.getChildByName('btn_cancel');
        this.btn_restart = this.root.getChildByName('btn_restart');

        this.btn_cancel.clickHandler = Laya.Handler.create(
            this,
            this.close,
            null,
            !1
          );

        this.btn_restart.clickHandler = Laya.Handler.create(
            this,
            () => {
              Laya.Browser.window.conch
                ? Laya.Browser.window.conch &&
                  Laya.Browser.window.conch.exit &&
                  Laya.Browser.window.conch.exit()
                : (Laya.Browser.window.location.href = GameMgr.Inst.link_url);
            },
            null,
            !1
          );

        this.btn_restart.visible = !1;
        this.btn_cancel.visible = !1;
        this.blackbg.visible = !1;
      }

      showStr(t) {
        this.btn_cancel.visible = !0;
        this.info.text = t;
        this._show();
      }

      showNetReqError(t, e, i) {
        this.btn_cancel.visible = !0;
        var n = '';
        var a = '';
        var r = !0;
        if (e && '' != e) {
          var s = '';
          s = e.message ? e.message : e;
          a = `错误：${s}`;
          'TIMEOUT' == s && (s = game.Tools.strOfLocalization(11));
          n += s;
          n += '\n';
          if (
            (!GameMgr.inRelease)
          )
            switch ((game.LobbyNetMgr.Inst.connect_state)) {
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
          r = !1;
          var o = i.error.code;
          var l = cfg.info.error.get(o);
          n += l[GameMgr.client_language];
          n += game.Tools.strOfLocalization(2068) + o;
          l
            ? (a = l.chs)
            : (a = `一个未收录的异常：${o}`);
        }
        this.info.text = n;
        this._show();
        var h = {};
        h.timestamp = Math.floor(Date.now() / 1e3);
        h.fatal = !1;
        h.lobby_ip = app.NetAgent.lobby_ip;
        h.mj_ip = app.NetAgent.mj_ip;
        h.account_id = GameMgr.Inst.account_id;

        GameMgr.Inst.client_endpoint
          ? (h.client_endpoint = JSON.stringify(
              GameMgr.Inst.client_endpoint
            ))
          : (h.client_endpoint = 'null');

        h.client_region = GameMgr.ClientRegion;

        GameMgr.Inst &&
          ((h.gateway_region_name = game.LobbyNetMgr.gateway_region_name));

        h.client_version = game.ResourceVersion.version;
        h.device = game.Tools.deviceInfo;
        h.method = t;
        h.send_info = a;
        var c = {};
        c.standardinfo = h;
        if ((GameMgr.inRelease)) {
          if (r) {
            new Laya.HttpRequest().send(
              GameMgr.error_url,
              `data=${JSON.stringify(c)}`,
              'post'
            );
          }
        } else app.Log.log(JSON.stringify(c));
      }

      showFE() {
        this.enable = !0;
        this.info.text = game.Tools.strOfLocalization(14);
        this.blackbg.visible = !0;
        this.btn_restart.visible = !0;
      }

      _show() {
        var e = this;
        this.me.visible = !0;
        this.locking = !0;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
          })
        );
      }

      close() {
        var e = this;
        this.locking = !0;
        this.locking ||
          (t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.me.visible = !1;
            e.me.destroy(!0);
          })
        ));
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_ErrorInfo = e;
})(uiscript || (uiscript = {}));