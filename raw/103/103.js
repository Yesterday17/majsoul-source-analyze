var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t =
        e.call(
          this,
          cfg.activity.activity.get(1004).name,
          new ui.lobby.activitys.activity_task_newyearUI()
        ) || this;
      return (t.activity_id = 1004), (t.toth = 0), t;
    }
    return (
      __extends(i, e),
      (i.prototype.isopen = function() {
        return t.UI_Activity.activities[1004];
      }),
      (i.prototype.need_popout = function() {
        var t = cfg.activity.activity.get(1004);
        return !(!t || !t.need_popout);
      }),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.content = this.root.getChildByName('content')),
          (this.scrollbar = this.root.getChildByName('scrollbar').scriptMap[
            'capsui.CScrollBar'
          ]),
          (this.content.vScrollBarSkin = ''),
          this.scrollbar.init(null),
          (this.toth =
            this.content.getChildByName('fu').y +
            this.content.getChildByName('fu').height),
          this.content.vScrollBar.on('change', this, function() {
            t.scrollbar.setVal(
              t.content.vScrollBar.value / t.content.vScrollBar.max,
              t.content.height / t.toth
            );
          });
      }),
      (i.prototype.show = function() {
        (this.enable = true),
          this.content.refresh(),
          (this.content.vScrollBar.value = 0),
          this.content.vScrollBar.stopScroll(),
          this.scrollbar.reset(),
          this.scrollbar.setVal(0, this.content.height / this.toth),
          game.LoadMgr.setImgSkin(
            this.root.getChildByName('content').getChildByName('head'),
            'myres2/treasurehead/newyear_task.jpg'
          ),
          game.LoadMgr.setImgSkin(
            this.content
              .getChildByName('denglong')
              .getChildByName('info')
              .getChildByName('item'),
            game.GameUtility.get_item_view(309003).icon
          ),
          game.LoadMgr.setImgSkin(
            this.content
              .getChildByName('baozhu')
              .getChildByName('info')
              .getChildByName('item'),
            game.GameUtility.get_item_view(309004).icon
          ),
          game.LoadMgr.setImgSkin(
            this.content
              .getChildByName('fu')
              .getChildByName('info')
              .getChildByName('item'),
            game.GameUtility.get_item_view(309005).icon
          );
      }),
      (i.prototype.hide = function() {
        this.enable = false;
      }),
      i
    );
  })(t.UI_ActivityBase);
  t.UI_Activity_NewYear = e;
})(uiscript || (uiscript = {}));