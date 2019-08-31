var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      return e.call(this, new ui.entrance.chooseserverUI()) || this;
    }
    return (
      __extends(i, e),
      (i.show = function(e) {
        if (!this._inited)
          if (
            ((this._complete = e),
            (this._inited = !0),
            (this._ips = GameMgr.config_data.ip),
            1 == this._ips.length)
          )
            this._linkLobby(0);
          else {
            var n = new i();
            t.UIMgr.Inst.AddLobbyUI(n),
              Laya.timer.frameOnce(5, this, function() {
                n._show();
              });
          }
      }),
      (i._linkLobby = function(t) {
        var e = this._ips[t];
        (game.LobbyNetMgr.gateway_name = e.name),
          (game.LobbyNetMgr.gateway_regions = e.region_urls),
          game.LobbyNetMgr.Inst.OpenConnect('', null),
          this._complete.run();
      }),
      (i._linkLobbyStr = function(t) {
        (game.LobbyNetMgr.gateway_name = '自选：' + t),
          (game.LobbyNetMgr.gateway_regions = {
            mainland: 'http://' + t + '/api/v0/recommend_list'
          }),
          game.LocalStorage.setItem('test_server_url', t),
          game.LobbyNetMgr.Inst.OpenConnect('', null),
          this._complete.run();
      }),
      (i.do_guanzhan = function() {
        var t = 0,
          e = [],
          i = function(t) {
            var e = net.MessageWrapper.decodeMessage(t.action_data);
            return {
              timestamp: t.timestamp,
              category: t.action_category,
              name: e.$type.name,
              data: e
            };
          },
          n = function() {
            if (t > 70) console.log(JSON.stringify(e));
            else {
              var a = new Laya.HttpRequest();
              a.once(Laya.Event.COMPLETE, this, function(a) {
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
                t++, n();
              }),
                a.once(Laya.Event.ERROR, this, function(t) {});
              a.send('guanzhan/' + t, '', 'get', 'arraybuffer', []);
            }
          };
        n();
      }),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.scorllview = this.root.getChildByName('lst').scriptMap[
            'capsui.CScrollView'
          ]),
          this.scorllview.init_scrollview(
            Laya.Handler.create(
              this,
              function(e) {
                var n = e.index,
                  a = e.container;
                (a.label = i._ips[n].name),
                  (a.clickHandler = Laya.Handler.create(
                    t,
                    function() {
                      i._linkLobby(n), (t.enable = !1), t.me.destroy(!0);
                    },
                    null,
                    !1
                  ));
              },
              null,
              !1
            )
          ),
          (this.input = this.root.getChildByName('input')),
          (this.root.getChildByName('enter').clickHandler = new Laya.Handler(
            this,
            function() {
              i._linkLobbyStr(t.input.text), (t.enable = !1), t.me.destroy(!0);
            }
          ));
      }),
      (i.prototype._show = function() {
        (this.enable = !0),
          this.scorllview.reset(),
          this.scorllview.addItem(i._ips.length);
        var t = game.LocalStorage.getItem('test_server_url');
        t && (this.input.text = t);
      }),
      (i._ips = []),
      (i._inited = !1),
      (i._complete = null),
      i
    );
  })(t.UIBase);
  t.UI_ChooseServer = e;
})(uiscript || (uiscript = {}));