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
        var t = e.call(this, new ui.lobby.tanfang0UI()) || this;
        t.need_show_loading = !1;
        t.loadover = !1;
        t.waiting_to_show = !1;
        t.results = null;
        i.Inst = t;
        return t;
      }

      onCreate() {
        this.loading = this.me.getChildByName('loading');
        this.root = this.me.getChildByName('root');
      }

      beginload() {
        var e = this;
        if (!this.loadover) {
          var i = 'res/atlas/';

          'chs' != GameMgr.client_language &&
            (i += `${GameMgr.client_language}/`);

          this.urls = [`${i}tanfang.atlas`];
          Laya.loader.create(
            this.urls,
            Laya.Handler.create(this, () => {
              e.root.addChild(new t.UI_Tanfang().me);
              Laya.timer.frameOnce(8, e, () => {
                e.loadover = !0;
                e.waiting_to_show && e.show_result();
              });
            })
          );
        }
      }

      show(e, i, n) {
        var a = this;
        this.loading.visible = !1;
        this.need_show_loading = !0;
        Laya.timer.clearAll(this);

        Laya.timer.once(500, this, () => {
          a.need_show_loading && (a.loading.visible = !0);
        });

        this.waiting_to_show = !1;

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'openChest',
          { chest_id: e, count: i, use_ticket: n },
          (i, n) => {
            t.UIMgr.Inst.showNetReqError('openChest', i, n);
            a.results = n.results;

            t.UI_Treasure.on_chest_count_change([
              {
                faith_id: cfg.chest.chest.find(e).faith_id,
                total_open_count: n.total_open_count
              }
            ]);

            i || n.error
              ? (a.close())
              : (a.loadover ? a.show_result() : (a.waiting_to_show = !0));
          }
        );

        this.enable = !0;
      }

      test() {
        var t = this;
        this.loading.visible = !1;
        this.need_show_loading = !0;
        Laya.timer.clearAll(this);

        Laya.timer.once(500, this, () => {
          t.need_show_loading && (t.loading.visible = !0);
        });

        this.waiting_to_show = !1;
        this._test10();
        this.loadover ? this.show_result() : (this.waiting_to_show = !0);

        Laya.timer.once(1e3, this, () => {
          t.beginload();
        });

        this.enable = !0;
      }

      close() {
        this.need_show_loading = !1;
        this.loading.visible = !1;
        for (var e = 0; e < this.urls.length; e++)
          Laya.loader.clearTextureRes(this.urls[e].url);
        Laya.loader.clearTextureRes(t.UI_Get_Character.Inst.atlas_url);
        this.enable = !1;
        view.BgmListMgr.PlayLobbyBgm();
      }

      show_result() {
        this.need_show_loading = !1;
        this.loading.visible = !1;
        t.UI_Tanfang.Inst.show(this.results);
        view.BgmListMgr.stopBgm();
      }

      _test10() {
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
      }

      _test1() {
        this.results = [{ reward: { id: 200001, count: 1 } }];
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_TanfangRoot = e;
})(uiscript || (uiscript = {}));