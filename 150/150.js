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
        return e.call(this, new ui.entrance.chooseserverUI()) || this;
      }

      static show(e) {
        this._complete = e;
        this._inited = !0;
        this._ips = GameMgr.config_data.ip;
        if (!this._inited)
          if (
            (1 == this._ips.length)
          )
            this._linkLobby(0);
          else {
            var n = new i();
            t.UIMgr.Inst.AddLobbyUI(n);
            Laya.timer.frameOnce(5, this, () => {
              n._show();
            });
          }
      }

      static _linkLobby(t) {
        var e = this._ips[t];
        game.LobbyNetMgr.gateway_name = e.name;
        game.LobbyNetMgr.gateway_regions = e.region_urls;
        game.LobbyNetMgr.Inst.OpenConnect('', null);
        this._complete.run();
      }

      static _linkLobbyStr(t) {
        game.LobbyNetMgr.gateway_name = `自选：${t}`;

        game.LobbyNetMgr.gateway_regions = {
            mainland: `http://${t}/api/v0/recommend_list`
          };

        game.LocalStorage.setItem('test_server_url', t);
        game.LobbyNetMgr.Inst.OpenConnect('', null);
        this._complete.run();
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');

        this.scorllview = this.root.getChildByName('lst').scriptMap[
            'capsui.CScrollView'
          ];

        this.scorllview.init_scrollview(
          Laya.Handler.create(
            this,
            ({index, container}) => {
              var n = index;
              var a = container;
              a.label = i._ips[n].name;
              a.clickHandler = Laya.Handler.create(
                  t,
                  () => {
                    i._linkLobby(n);
                    t.enable = !1;
                    t.me.destroy(!0);
                  },
                  null,
                  !1
                );
            },
            null,
            !1
          )
        );

        this.input = this.root.getChildByName('input');
        this.root.getChildByName('enter').clickHandler = new Laya.Handler(
            this,
            () => {
              i._linkLobbyStr(t.input.text);
              t.enable = !1;
              t.me.destroy(!0);
            }
          );
      }

      _show() {
        this.enable = !0;
        this.scorllview.reset();
        this.scorllview.addItem(i._ips.length);
        var t = game.LocalStorage.getItem('test_server_url');
        t && (this.input.text = t);
      }
    }

    __extends(i, e);

    i.do_guanzhan = () => {
      var t = 0;
      var e = [];

      var i = ({action_data, timestamp, action_category}) => {
        var e = net.MessageWrapper.decodeMessage(action_data);
        return {
          timestamp: timestamp,
          category: action_category,
          name: e.$type.name,
          data: e
        };
      };

      var n = function() {
        if (t > 20) console.log(JSON.stringify(e));
        else {
          var a = new Laya.HttpRequest();

          a.once(Laya.Event.COMPLETE, this, a => {
            e.push({
              index: t,
              split: '==================================================='
            });
            var r = new Laya.Byte();
            r.writeArrayBuffer(a);
            for (
              var s = net.MessageWrapper.decodeMessage(
                  r.getUint8Array(0, r.length)
                ),
                o = 0;
              o < s.actions.length;
              o++
            )
              e.push(i(s.actions[o]));
            t++;
            n();
          });

          a.once(Laya.Event.ERROR, this, t => {});
          a.send(`guanzhan/${t}`, '', 'get', 'arraybuffer', []);
        }
      };

      n();
    };

    i._ips = [];
    i._inited = !1;
    i._complete = null;
    return i;
  })(t.UIBase);
  t.UI_ChooseServer = e;
})(uiscript || (uiscript = {}));