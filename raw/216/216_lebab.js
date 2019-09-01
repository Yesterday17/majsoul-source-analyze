let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.tanfang0UI()) || this;
      return (
        (t.need_show_loading = false),
        (t.loadover = false),
        (t.waiting_to_show = false),
        (t.results = null),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      (this.loading = this.me.getChildByName('loading')),
        (this.root = this.me.getChildByName('root'));
    }),
    (i.prototype.beginload = function() {
      const e = this;
      if (!this.loadover) {
        let i = 'res/atlas/';
        'chs' != GameMgr.client_language &&
          (i += `${GameMgr.client_language}/`),
          (this.urls = [`${i}tanfang.atlas`]),
          Laya.loader.create(
            this.urls,
            Laya.Handler.create(this, () => {
              e.root.addChild(new t.UI_Tanfang().me),
                Laya.timer.frameOnce(8, e, () => {
                  (e.loadover = true), e.waiting_to_show && e.show_result();
                });
            })
          );
      }
    }),
    (i.prototype.show = function(e, i, n) {
      const a = this;
      (this.loading.visible = false),
        (this.need_show_loading = true),
        Laya.timer.clearAll(this),
        Laya.timer.once(500, this, () => {
          a.need_show_loading && (a.loading.visible = true);
        }),
        (this.waiting_to_show = false),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'openChest',
          { chest_id: e, count: i, use_ticket: n },
          (i, n) => {
            i || n.error
              ? (t.UIMgr.Inst.showNetReqError('openChest', i, n), a.close())
              : ((a.results = n.results),
                t.UI_Treasure.on_chest_count_change([
                  {
                    faith_id: cfg.chest.chest.find(e).faith_id,
                    total_open_count: n.total_open_count
                  }
                ]),
                a.loadover ? a.show_result() : (a.waiting_to_show = true));
          }
        ),
        (this.enable = true);
    }),
    (i.prototype.test = function() {
      const t = this;
      (this.loading.visible = false),
        (this.need_show_loading = true),
        Laya.timer.clearAll(this),
        Laya.timer.once(500, this, () => {
          t.need_show_loading && (t.loading.visible = true);
        }),
        (this.waiting_to_show = false),
        this._test10(),
        this.loadover ? this.show_result() : (this.waiting_to_show = true),
        Laya.timer.once(1e3, this, () => {
          t.beginload();
        }),
        (this.enable = true);
    }),
    (i.prototype.close = function() {
      (this.need_show_loading = false), (this.loading.visible = false);
      for (let e = 0; e < this.urls.length; e++)
        Laya.loader.clearTextureRes(this.urls[e].url);
      Laya.loader.clearTextureRes(t.UI_Get_Character.Inst.atlas_url),
        (this.enable = false),
        view.BgmListMgr.PlayLobbyBgm();
    }),
    (i.prototype.show_result = function() {
      (this.need_show_loading = false),
        (this.loading.visible = false),
        t.UI_Tanfang.Inst.show(this.results),
        view.BgmListMgr.stopBgm();
    }),
    (i.prototype._test10 = function() {
      this.results = [
        { reward: { id: 200001, count: 1 } },
        {
          reward: { id: 200001, count: 1 },
          replace: { id: 302002, count: 75 }
        },
        { reward: { id: 200002, count: 1 } },
        { reward: { id: 302007, count: 3 } },
        { reward: { id: 302012, count: 7 } },
        { reward: { id: 303041, count: 10 } },
        { reward: { id: 305007, count: 1 } },
        { reward: { id: 305002, count: 1 } },
        { reward: { id: 305013, count: 1 } },
        { reward: { id: 305017, count: 1 } }
      ];
    }),
    (i.prototype._test1 = function() {
      this.results = [{ reward: { id: 200001, count: 1 } }];
    }),
    i
  ;
  })(t.UIBase);
  t.UI_TanfangRoot = e;
})(uiscript || (uiscript = {}));