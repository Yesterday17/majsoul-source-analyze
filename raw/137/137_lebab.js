let uiscript;
!(t => {
  const e = (e => {
    function i() {
      return e.call(this, new ui.entrance.chooseserverUI()) || this;
    }
    return __extends(i, e),
    (i.show = function(e) {
      if (!this._inited)
        if (
          ((this._complete = e),
          (this._inited = true),
          (this._ips = GameMgr.config_data.ip),
          1 == this._ips.length)
        )
          this._linkLobby(0);
        else {
          const n = new i();
          t.UIMgr.Inst.AddLobbyUI(n),
            Laya.timer.frameOnce(5, this, () => {
              n._show();
            });
        }
    }),
    (i._linkLobby = function(t) {
      const e = this._ips[t];
      (game.LobbyNetMgr.gateway_name = e.name),
        (game.LobbyNetMgr.gateway_regions = e.region_urls),
        game.LobbyNetMgr.Inst.OpenConnect('', null),
        this._complete.run();
    }),
    (i._linkLobbyStr = function(t) {
      (game.LobbyNetMgr.gateway_name = `自选：${t}`),
        (game.LobbyNetMgr.gateway_regions = {
          mainland: `http://${t}/api/v0/recommend_list`
        }),
        game.LocalStorage.setItem('test_server_url', t),
        game.LobbyNetMgr.Inst.OpenConnect('', null),
        this._complete.run();
    }),
    (i.do_guanzhan = () => {
      let t = 0;
      const e = [];

      const i = ({action_data, timestamp, action_category}) => {
        const e = net.MessageWrapper.decodeMessage(action_data);
        return {
          timestamp: timestamp,
          category: action_category,
          name: e.$type.name,
          data: e
        };
      };

      const n = function() {
        if (t > 70) console.log(JSON.stringify(e));
        else {
          const a = new Laya.HttpRequest();
          a.once(Laya.Event.COMPLETE, this, a => {
            e.push({
              index: t,
              split: '==================================================='
            });
            const r = new Laya.Byte();
            r.writeArrayBuffer(a);
            for (
              let s = net.MessageWrapper.decodeMessage(
                      r.getUint8Array(0, r.length)
                    ),
                  o = 0;
              o < s.actions.length;
              o++
            )
              e.push(i(s.actions[o]));
            t++, n();
          }),
            a.once(Laya.Event.ERROR, this, t => {});
          a.send(`guanzhan/${t}`, '', 'get', 'arraybuffer', []);
        }
      };

      n();
    }),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.scorllview = this.root.getChildByName('lst').scriptMap[
          'capsui.CScrollView'
        ]),
        this.scorllview.init_scrollview(
          Laya.Handler.create(
            this,
            ({index, container}) => {
              const n = index;
              const a = container;
              (a.label = i._ips[n].name),
                (a.clickHandler = Laya.Handler.create(
                  t,
                  () => {
                    i._linkLobby(n), (t.enable = false), t.me.destroy(true);
                  },
                  null,
                  false
                ));
            },
            null,
            false
          )
        ),
        (this.input = this.root.getChildByName('input')),
        (this.root.getChildByName('enter').clickHandler = new Laya.Handler(
          this,
          () => {
            i._linkLobbyStr(t.input.text), (t.enable = false), t.me.destroy(true);
          }
        ));
    }),
    (i.prototype._show = function() {
      (this.enable = true),
        this.scorllview.reset(),
        this.scorllview.addItem(i._ips.length);
      const t = game.LocalStorage.getItem('test_server_url');
      t && (this.input.text = t);
    }),
    (i._ips = []),
    (i._inited = false),
    (i._complete = null),
    i
  ;
  })(t.UIBase);
  t.UI_ChooseServer = e;
})(uiscript || (uiscript = {}));