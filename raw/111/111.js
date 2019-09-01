var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      return (
        e.call(
          this,
          cfg.activity.activity.get(1005).name,
          new ui.lobby.activitys.activity_exchangeUI()
        ) || this
      );
    }
    return (
      __extends(i, e),
      (i.prototype.isopen = function() {
        return t.UI_Activity.activities[1005];
      }),
      (i.prototype.onCreate = function() {
        e.prototype.onCreate.call(this),
          (this.label_count_0 = this.head.getChildByName('count0')),
          (this.label_count_1 = this.head.getChildByName('count1')),
          (this.label_count_2 = this.head.getChildByName('count2'));
      }),
      (i.prototype.refreshCurrencyCount = function() {
        (this.label_count_0.text = t.UI_Bag.get_item_count(309003).toString()),
          (this.label_count_1.text = t.UI_Bag.get_item_count(
            309004
          ).toString()),
          (this.label_count_2.text = t.UI_Bag.get_item_count(
            309005
          ).toString());
      }),
      (i.prototype.show = function() {
        (this.enable = true),
          game.LoadMgr.setImgSkin(
            this.head,
            'myres2/treasurehead/newyear_reward.jpg'
          ),
          this.refreshView(t.UI_Activity.getExchangeList(1005));
      }),
      (i.prototype.hide = function() {
        this.enable = false;
      }),
      i
    );
  })(t.UI_Activity_Exchange);
  t.UI_NewYear_Exchange = e;
})(uiscript || (uiscript = {}));