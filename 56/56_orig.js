var capsui;
!(function(t) {
  var e = (function() {
    function t(t, e) {
      var i = this;
      (this.me = t),
        (this.render_page = e),
        (this.btn_left = this.me.getChildByName('btn_left'));
      (this.btn_left.clickHandler = Laya.Handler.create(
        this,
        function() {
          i.change_page(i.current_index - 1, !1);
        },
        null,
        !1
      )),
        (this.btn_right = this.me.getChildByName('btn_right')),
        (this.btn_right.clickHandler = Laya.Handler.create(
          this,
          function() {
            i.change_page(i.current_index + 1, !1);
          },
          null,
          !1
        )),
        (this.label_current_page = this.me.getChildByName('curr_page')),
        (this.btn_page = this.me.getChildByName('btn_page')),
        (this.btn_page.clickHandler = Laya.Handler.create(
          this,
          function() {
            i.page_show_locking || i._show_page_choose();
          },
          null,
          !1
        )),
        (this.container_pages = this.me.getChildByName('container_pages')),
        (this.container_pages.getChildByName(
          'close'
        ).clickHandler = Laya.Handler.create(
          this,
          function() {
            i.page_show_locking || i._close_page_choose();
          },
          null,
          !1
        )),
        (this.scroll_pages = this.container_pages.getChildByName(
          'bg'
        ).scriptMap['capsui.CScrollView']),
        this.scroll_pages.init_scrollview(
          Laya.Handler.create(this, this._render_page_choose_item, null, !1)
        );
    }
    return (
      (t.prototype.reset = function() {
        (this.me.visible = !1),
          (this.container_pages.visible = !1),
          this.scroll_pages.reset(),
          (this.btn_left.visible = !1),
          (this.btn_right.visible = !1),
          (this.btn_page.visible = !1),
          (this.page_show_locking = !1),
          (this.current_index = -1),
          (this.label_current_page.text = '');
      }),
      (t.prototype.set_total_page_count = function(t) {
        (this.total_count = t),
          (this.me.visible = this.total_count > 0),
          (this.btn_page.visible = this.total_count > 1),
          (this.btn_left.visible = this.current_index > 0),
          (this.btn_right.visible = this.current_index + 1 < this.total_count),
          this.change_page(this.current_index, !1);
      }),
      (t.prototype.change_page = function(t, e) {
        t >= this.total_count && (t = this.total_count - 1),
          t < 0 && (t = 0),
          (e || this.current_index != t) &&
            ((this.current_index = t),
            (this.btn_left.visible = this.current_index > 0),
            (this.btn_right.visible =
              this.current_index + 1 < this.total_count),
            (this.label_current_page.text = (
              this.current_index + 1
            ).toString()),
            this.render_page && this.render_page.runWith(t));
      }),
      (t.prototype._show_page_choose = function() {
        var t = this;
        if (this.total_count <= 1) this.page_show_locking = !1;
        else {
          (this.container_pages.visible = !0),
            this.scroll_pages.reset(),
            this.scroll_pages.addItem(this.total_count);
          var e = this.container_pages.getChildByName('bg'),
            i = e.getChildByName('content');
          this.total_count <= 3
            ? ((i.height = 54 * this.total_count),
              (e.height = i.height),
              (e.y = this.container_pages.height - e.height))
            : ((i.height = this.container_pages.height),
              (e.height = i.height),
              (e.y = 0)),
            (e.alpha = 0),
            Laya.Tween.to(e, { alpha: 1 }, 150),
            Laya.timer.once(150, this, function() {
              t.page_show_locking = !1;
            });
        }
      }),
      (t.prototype._close_page_choose = function() {
        var t = this,
          e = this.container_pages.getChildByName('bg');
        Laya.Tween.to(e, { alpha: 0 }, 150),
          (this.page_show_locking = !0),
          Laya.timer.once(150, this, function() {
            (t.page_show_locking = !1), (t.container_pages.visible = !1);
          });
      }),
      (t.prototype._render_page_choose_item = function(t) {
        var e = this,
          i = t.index,
          n = t.container;
        (n.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          function() {
            e.page_show_locking ||
              (e.change_page(i, !1), e._close_page_choose());
          },
          null,
          !1
        )),
          (n.getChildByName('page').text = (i + 1).toString());
      }),
      t
    );
  })();
  t.PageController = e;
})(capsui || (capsui = {}));