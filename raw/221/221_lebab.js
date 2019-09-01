let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.common.user_xieyi_enjpUI()) || this;
      return (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.label_title = this.root.getChildByName('title')),
        (this.panel = this.root.getChildByName('panel')),
        (this.label_content = this.panel.getChildByName('content')),
        (this.scrollbar = this.root.getChildByName('scrollbar').scriptMap[
          'capsui.CScrollBar'
        ]),
        this.scrollbar.init(null),
        (this.panel.vScrollBarSkin = ''),
        this.panel.vScrollBar.on('change', this, () => {
          t.refresh_scroll_bar();
        }),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.close();
          },
          null,
          false
        ));
    }),
    (i.prototype.refresh_scroll_bar = function() {
      this.label_content.textField.textHeight > 0
        ? this.scrollbar.setVal(
            this.panel.vScrollBar.value / this.panel.vScrollBar.max,
            this.panel.height / this.label_content.textField.textHeight
          )
        : this.scrollbar.setVal(0, 1);
    }),
    (i.prototype.show = function(e) {
      const i = this;
      (this.locking = true),
        (this.me.visible = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            i.locking = false;
          })
        ),
        (this.label_title.text = ''),
        (this.label_content.text = 'loading...'),
        (this.label_content.height = 60),
        this.panel.refresh();
      const n = 1e5 * Math.random();
      (this.id = n),
        Laya.loader.load(
          e,
          Laya.Handler.create(this, () => {
            if (i.me.visible && i.id == n) {
              const t = Laya.loader.getRes(e);
              if (t) {
                const a = t.indexOf('\n');
                (i.label_title.text = t.substring(0, a)),
                  (i.label_content.text = t.substring(a + 1)),
                  (i.label_content.height =
                    i.label_content.textField.textHeight),
                  i.panel.refresh(),
                  i.refresh_scroll_bar();
              }
            }
          })
        ),
        this.refresh_scroll_bar();
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false),
              (e.me.visible = false),
              (e.label_content.text = '');
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_User_Xieyi_enjp = e;
})(uiscript || (uiscript = {}));