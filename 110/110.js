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
        var t =
          e.call(
            this,
            game.Tools.strOfLocalization(2839),
            new ui.lobby.activitys.activity_yuekaUI()
          ) || this;
        t.yueka_id = 1010;

        'chs' == GameMgr.client_language
          ? (t.yueka_id = 1010)
          : 'jp' == GameMgr.client_language
          ? (t.yueka_id = 2010)
          : 'en' == GameMgr.client_language && (t.yueka_id = 3010);

        i.yueka_ui[t.yueka_id] = t;
        return t;
      }

      static Init() {
        var e = this;
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchMonthTicketInfo',
          {},
          (i, n) => {
            if (i || n.error)
              t.UIMgr.Inst.showNetReqError('fetchMonthTicketInfo', i, n);
            else if (n.month_ticket_info)
              for (var a = 0; a < n.month_ticket_info.length; a++) {
                var r = n.month_ticket_info[a];
                e.yueka_data[r.id] = r;
              }
          }
        );
      }

      static GetYuekaData(t) {
        return this.yueka_data[t];
      }

      static GetYuekaLeftDays(t) {
        var e = this.yueka_data[t];
        return e
          ? e.end_time < Date.now() / 1e3
            ? -2
            : Math.floor((e.end_time - Date.now() / 1e3) / 24 / 3600)
          : -1;
      }

      static OnBuyedYueka(t) {
        this.yueka_data[t] ||
          (this.yueka_data[t] = {
            id: t,
            last_pay_time: Date.now() / 1e3,
            end_time:
              24 * Math.floor((Date.now() / 1e3 + 10800) / 24 / 3600) * 3600
          });

        this.yueka_data[t].end_time += 2592e3;
        this.yueka_ui[t] &&
          this.yueka_ui[t].enable &&
          this.yueka_ui[t].refresh();
      }

      static YuekaCanGet(t) {
        var e = this.GetYuekaData(t);
        return (
          !!e &&
          (!(this.GetYuekaLeftDays(t) < 0) &&
            !game.Tools.isPassedRefreshTime(e.last_pay_time))
        );
      }

      isopen() {
        return !game.Tools.CannotPay();
      }

      haveRedPoint() {
        return '1' !=
          Laya.LocalStorage.getItem(
            game.Tools.eeesss(`yueka_${GameMgr.Inst.account_id}`)
          ) || i.YuekaCanGet(this.yueka_id);
      }

      need_popout() {
        return !1;
      }

      onCreate() {
        var e = this;
        this.container_buy = this.me.getChildByName('container_buy');

        this.container_buy.getChildByName(
            'btn_buy'
          ).clickHandler = new Laya.Handler(this, () => {
            t.UI_Recharge.on_want_2_buy(e.yueka_id);
          });

        this.container_get = this.me.getChildByName('container_get');
        this.btn_get = this.container_get.getChildByName('btn_get');

        this.btn_get.clickHandler = new Laya.Handler(this, () => {
          e.btn_get.mouseEnabled = !1;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'payMonthTicket',
            { ticket_id: e.yueka_id },
            (n, a) => {
              e.btn_get.mouseEnabled = !0;

              game.Tools.showRewards(
                    {
                      rewards: [
                        { id: a.resource_id, count: a.resource_count }
                      ]
                    },
                    null
                  );

              i.yueka_data[e.yueka_id].last_pay_time =
                    Date.now() / 1e3;

              n || a.error
                ? t.UIMgr.Inst.showNetReqError('payMonthTicket', n, a)
                : (e.enable && e.refresh());
            }
          );
        });

        this.img_getted = this.container_get.getChildByName('getted');
        this.label_days = this.container_get.getChildByName('left_day');
      }

      show() {
        this.enable = !0;
        this.refresh();
        this.btn_get.mouseEnabled = !0;
        Laya.LocalStorage.setItem(
          game.Tools.eeesss(`yueka_${GameMgr.Inst.account_id}`),
          '1'
        );
      }

      refresh() {
        var e = i.GetYuekaData(this.yueka_id);
        this.container_get.visible = !0;
        this.container_buy.x = 194;
        this.container_buy.visible = !0;
        this.btn_get.visible = !1;
        this.btn_get.visible = !0;

        game.Tools.isPassedRefreshTime(e.last_pay_time)
          ? (this.img_getted.visible = !0)
          : (this.img_getted.visible = !1);

        this.container_buy.x = 345;

        e && Date.now() / 1e3 < e.end_time
          ? (this.label_days.text = Math.floor(
              (e.end_time - Date.now() / 1e3) / 24 / 3600
            ).toString())
          : (this.container_get.visible = !1);

        'chs' == GameMgr.client_language
          ? (this.label_days.x = 111)
          : 'en' == GameMgr.client_language
          ? (this.label_days.x = 155)
          : 'jp' == GameMgr.client_language && (this.label_days.x = 108);

        t.UI_Activity.Inst.refresh_redpoint();
        t.UI_Lobby.Inst.top.refreshRedpoint();
      }

      hide() {
        this.enable = !1;
      }

      onDisable() {
        var t = 'res/atlas/';

        'chs' != GameMgr.client_language &&
          (t += `${GameMgr.client_language}/`);

        Laya.loader.clearTextureRes(`${t}myres/yueka.atlas`);
      }
    }

    __extends(i, e);

    i.yueka_data = {};
    i.yueka_ui = {};
    return i;
  })(t.UI_ActivityBase);
  t.UI_Activity_Yueka = e;
})(uiscript || (uiscript = {}));