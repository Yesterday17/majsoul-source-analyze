var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      return (
        e.call(
          this,
          cfg.activity.activity.get(1002).name,
          new ui.lobby.activitys.activity_exchangeUI()
        ) || this
      );
    }
    return (
      __extends(i, e),
      (i.prototype.isopen = function() {
        return t.UI_Activity.activities[1002];
      }),
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
        (this.enable = true),
          game.LoadMgr.setImgSkin(
            this.head,
            'myres2/treasurehead/christmas_reward.jpg'
          ),
          this.refreshView(t.UI_Activity.getExchangeList(1002));
      }),
      (i.prototype.hide = function() {
        this.enable = false;
      }),
      i
    );
  })(t.UI_Activity_Exchange);
  t.UI_Christmas_Exchange = e;
})(uiscript || (uiscript = {}));