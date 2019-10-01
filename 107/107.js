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
        return e.call(
          this,
          cfg.activity.activity.get(i.activity_id)[
            `name_${GameMgr.client_language}`
          ],
          new ui.lobby.activitys.activity_wuyi_exchangeUI()
        ) || this;
      }

      isopen() {
        return t.UI_Activity.activities[i.activity_id];
      }

      onCreate() {
        e.prototype.onCreate.call(this);
        this.label_count_tool = this.head.getChildByName('count0');
        this.label_count_glasses = this.head.getChildByName('count1');
      }

      refreshCurrencyCount() {
        this.label_count_tool.text = t.UI_Bag.get_item_count(
          309011
        ).toString();

        this.label_count_glasses.text = t.UI_Bag.get_item_count(
            309012
          ).toString();
      }

      show() {
        this.enable = !0;

        game.LoadMgr.setImgSkin(
          this.head,
          'myres2/treasurehead/banner_zhongqiushangdian.jpg'
        );

        this.refreshView(t.UI_Activity.getExchangeList(i.activity_id));
      }

      hide() {
        this.enable = !1;
      }
    }

    __extends(i, e);

    i.activity_id = 1019;
    return i;
  })(t.UI_Activity_Exchange);
  t.UI_Activity_Wuyi_Reward = e;
})(uiscript || (uiscript = {}));