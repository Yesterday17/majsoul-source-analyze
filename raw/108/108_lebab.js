const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (e => {
    function i() {
      return (
        e.call(
          this,
          cfg.activity.activity.get(1002).name,
          new ui.lobby.activitys.activity_exchangeUI()
        ) || this
      );
    }
    return __extends(i, e),
    (i.prototype.isopen = () => t.UI_Activity.activities[1002]),
    (i.prototype.onCreate = function() {
      e.prototype.onCreate.call(this),
        (this.label_count_bell = this.head.getChildByName('count0')),
        (this.label_count_socks = this.head.getChildByName('count1'));
    }),
    (i.prototype.refreshCurrencyCount = function() {
      (this.label_count_bell.text = t.UI_Bag.get_item_count(
        309001
      ).toString()),
        (this.label_count_socks.text = t.UI_Bag.get_item_count(
          309002
        ).toString());
    }),
    (i.prototype.show = function() {
      (this.enable = !0),
        game.LoadMgr.setImgSkin(
          this.head,
          'myres2/treasurehead/christmas_reward.jpg'
        ),
        this.refreshView(t.UI_Activity.getExchangeList(1002));
    }),
    (i.prototype.hide = function() {
      this.enable = !1;
    }),
    i
  ;
  })(t.UI_Activity_Exchange);
  t.UI_Christmas_Exchange = e;
})(uiscript || (uiscript = {}));