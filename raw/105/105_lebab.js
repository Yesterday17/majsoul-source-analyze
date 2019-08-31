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
        new ui.lobby.activitys.activity_wuyi_exchangeUI()
      ) || this;
    }
    return __extends(i, e),
    (i.prototype.isopen = () => t.UI_Activity.activities[i.activity_id]),
    (i.prototype.onCreate = function() {
      e.prototype.onCreate.call(this),
        (this.label_count_tool = this.head.getChildByName('count0')),
        (this.label_count_glasses = this.head.getChildByName('count1')),
        'en' == GameMgr.client_language
          ? ((this.label_count_tool.x = 775),
            (this.label_count_glasses.x = 915))
          : 'jp' == GameMgr.client_language &&
            ((this.label_count_tool.x = 807),
            (this.label_count_glasses.x = 920));
    }),
    (i.prototype.refreshCurrencyCount = function() {
      (this.label_count_tool.text = t.UI_Bag.get_item_count(
        309006
      ).toString()),
        (this.label_count_glasses.text = t.UI_Bag.get_item_count(
          309007
        ).toString());
    }),
    (i.prototype.show = function() {
      (this.enable = !0),
        game.LoadMgr.setImgSkin(
          this.head,
          'myres2/treasurehead/reward_20190501.jpg'
        ),
        this.refreshView(t.UI_Activity.getExchangeList(i.activity_id));
    }),
    (i.prototype.hide = function() {
      this.enable = !1;
    }),
    (i.activity_id = 1007),
    i
  ;
  })(t.UI_Activity_Exchange);
  t.UI_Activity_Wuyi_Reward = e;
})(uiscript || (uiscript = {}));