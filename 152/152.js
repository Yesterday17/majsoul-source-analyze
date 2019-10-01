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
  var e = (t => {
    class e {
      constructor() {
        var i = t.call(this, new ui.common.commonUI()) || this;
        i.label_net_lobby = null;
        i.label_net_mj = null;
        i.label_fps = null;
        i._fps_count = 0;
        i._last_time = 0;
        e.Inst = i;
        return i;
      }

      onCreate() {
        var t = this.me.getChildByName('container_net');
        this.label_net_lobby = t.getChildByName('lobby');
        this.label_net_mj = t.getChildByName('mj');
        this.label_fps = t.getChildByName('fps');
        this.label_net_lobby.text = '';
        this.label_net_mj.text = '';
        this.label_fps.text = '';
      }

      onEnable() {
        this._fps_count = 0;
        this._last_time = Laya.timer.currTimer;
        game.LobbyNetMgr.Inst.refreshCommonShow();
      }

      update() {
        this._fps_count++;
        var t = Laya.timer.currTimer - this._last_time;

        this.label_fps.text =
            `fps:${Math.floor((this._fps_count / t) * 1e3)}`;

        this._fps_count = 0;
        t >= 500 &&
          ((this._last_time = Laya.timer.currTimer));
      }
    }

    __extends(e, t);

    e.Inst = null;
    return e;
  })(t.UIBase);
  t.UI_Common = e;
})(uiscript || (uiscript = {}));