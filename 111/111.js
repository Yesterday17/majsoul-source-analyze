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
            cfg.activity.activity.get(1002).name,
            new ui.lobby.activitys.activity_exchangeUI()
          ) || this
        );
      }

      isopen() {
        return t.UI_Activity.activities[1002];
      }

      onCreate() {
        e.prototype.onCreate.call(this);
        this.label_count_bell = this.head.getChildByName('count0');
        this.label_count_socks = this.head.getChildByName('count1');
      }

      refreshCurrencyCount() {
        this.label_count_bell.text = t.UI_Bag.get_item_count(
          309001
        ).toString();

        this.label_count_socks.text = t.UI_Bag.get_item_count(
            309002
          ).toString();
      }

      show() {
        this.enable = !0;

        game.LoadMgr.setImgSkin(
          this.head,
          'myres2/treasurehead/christmas_reward.jpg'
        );

        this.refreshView(t.UI_Activity.getExchangeList(1002));
      }

      hide() {
        this.enable = !1;
      }
    }

    __extends(i, e);

    return i;
  })(t.UI_Activity_Exchange);
  t.UI_Christmas_Exchange = e;
})(uiscript || (uiscript = {}));