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
        return (
          e.call(
            this,
            cfg.activity.activity.get(1005).name,
            new ui.lobby.activitys.activity_exchangeUI()
          ) || this
        );
      }

      isopen() {
        return t.UI_Activity.activities[1005];
      }

      onCreate() {
        e.prototype.onCreate.call(this);
        this.label_count_0 = this.head.getChildByName('count0');
        this.label_count_1 = this.head.getChildByName('count1');
        this.label_count_2 = this.head.getChildByName('count2');
      }

      refreshCurrencyCount() {
        this.label_count_0.text = t.UI_Bag.get_item_count(309003).toString();

        this.label_count_1.text = t.UI_Bag.get_item_count(
            309004
          ).toString();

        this.label_count_2.text = t.UI_Bag.get_item_count(
            309005
          ).toString();
      }

      show() {
        this.enable = !0;

        game.LoadMgr.setImgSkin(
          this.head,
          'myres2/treasurehead/newyear_reward.jpg'
        );

        this.refreshView(t.UI_Activity.getExchangeList(1005));
      }

      hide() {
        this.enable = !1;
      }
    }

    __extends(i, e);

    return i;
  })(t.UI_Activity_Exchange);
  t.UI_NewYear_Exchange = e;
})(uiscript || (uiscript = {}));