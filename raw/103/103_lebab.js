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
      const t =
        e.call(
          this,
          cfg.activity.activity.get(1004).name,
          new ui.lobby.activitys.activity_task_newyearUI()
        ) || this;
      return (t.activity_id = 1004), (t.toth = 0), t;
    }
    return __extends(i, e),
    (i.prototype.isopen = () => t.UI_Activity.activities[1004]),
    (i.prototype.need_popout = () => {
      const t = cfg.activity.activity.get(1004);
      return !(!t || !t.need_popout);
    }),
    (i.prototype.onCreate = function() {
      const t = this;
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
        this.content.vScrollBar.on('change', this, () => {
          t.scrollbar.setVal(
            t.content.vScrollBar.value / t.content.vScrollBar.max,
            t.content.height / t.toth
          );
        });
    }),
    (i.prototype.show = function() {
      (this.enable = !0),
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
      this.enable = !1;
    }),
    i
  ;
  })(t.UI_ActivityBase);
  t.UI_Activity_NewYear = e;
})(uiscript || (uiscript = {}));