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
      return e.call(
        this,
        cfg.activity.activity.get(i.activity_id)[
          `name_${GameMgr.client_language}`
        ],
        new ui.lobby.activitys.activity_exchange_zhongxiaUI()
      ) || this;
    }
    return __extends(i, e),
    (i.prototype.isopen = () => t.UI_Activity.activities[i.activity_id]),
    (i.prototype.onCreate = function() {
      e.prototype.onCreate.call(this),
        (this.label_count0 = this.head.getChildByName('count0')),
        (this.label_count1 = this.head.getChildByName('count1')),
        (this.label_count2 = this.head.getChildByName('count2'));
    }),
    (i.prototype.refreshCurrencyCount = function() {
      (this.label_count0.text = t.UI_Bag.get_item_count(309008).toString()),
        (this.label_count1.text = t.UI_Bag.get_item_count(309009).toString()),
        (this.label_count2.text = t.UI_Bag.get_item_count(309010).toString());
    }),
    (i.prototype.show = function() {
      (this.enable = !0),
        game.LoadMgr.setImgSkin(
          this.head,
          'myres2/treasurehead/zhongxia_reward.jpg'
        ),
        this.refreshView(t.UI_Activity.getExchangeList(i.activity_id));
    }),
    (i.prototype.hide = function() {
      this.enable = !1;
    }),
    (i.activity_id = 1013),
    i
  ;
  })(t.UI_Activity_Exchange);
  t.UI_Exchange_ZhongXia = e;
})(uiscript || (uiscript = {}));