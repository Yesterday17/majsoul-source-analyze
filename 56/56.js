var capsui;
!(t => {
  var e = (() => {
    class t {
      constructor(t, e) {
        var i = this;
        this.me = t;
        this.render_page = e;
        this.btn_left = this.me.getChildByName('btn_left');

        this.btn_left.clickHandler = Laya.Handler.create(
          this,
          () => {
            i.change_page(i.current_index - 1, !1);
          },
          null,
          !1
        );

        this.btn_right = this.me.getChildByName('btn_right');

        this.btn_right.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.change_page(i.current_index + 1, !1);
            },
            null,
            !1
          );

        this.label_current_page = this.me.getChildByName('curr_page');
        this.btn_page = this.me.getChildByName('btn_page');

        this.btn_page.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.page_show_locking || i._show_page_choose();
            },
            null,
            !1
          );

        this.container_pages = this.me.getChildByName('container_pages');

        this.container_pages.getChildByName(
            'close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              i.page_show_locking || i._close_page_choose();
            },
            null,
            !1
          );

        this.scroll_pages = this.container_pages.getChildByName(
            'bg'
          ).scriptMap['capsui.CScrollView'];

        this.scroll_pages.init_scrollview(
          Laya.Handler.create(this, this._render_page_choose_item, null, !1)
        );
      }

      reset() {
        this.me.visible = !1;
        this.container_pages.visible = !1;
        this.scroll_pages.reset();
        this.btn_left.visible = !1;
        this.btn_right.visible = !1;
        this.btn_page.visible = !1;
        this.page_show_locking = !1;
        this.current_index = -1;
        this.label_current_page.text = '';
      }

      set_total_page_count(t) {
        this.total_count = t;
        this.me.visible = this.total_count > 0;
        this.btn_page.visible = this.total_count > 1;
        this.btn_left.visible = this.current_index > 0;
        this.btn_right.visible = this.current_index + 1 < this.total_count;
        this.change_page(this.current_index, !1);
      }

      change_page(t, e) {
        t >= this.total_count && (t = this.total_count - 1);
        t < 0 && (t = 0);
        this.current_index = t;
        this.btn_left.visible = this.current_index > 0;

        this.btn_right.visible =
            this.current_index + 1 < this.total_count;

        this.label_current_page.text = (
            this.current_index + 1
          ).toString();

        (e || this.current_index != t) &&
          ((this.render_page && this.render_page.runWith(t)));
      }

      _show_page_choose() {
        var t = this;
        if (this.total_count <= 1) this.page_show_locking = !1;
        else {
          this.container_pages.visible = !0;
          this.scroll_pages.reset();
          this.scroll_pages.addItem(this.total_count);
          var e = this.container_pages.getChildByName('bg');
          var i = e.getChildByName('content');
          i.height = 54 * this.total_count;
          e.height = i.height;
          i.height = this.container_pages.height;
          e.height = i.height;

          this.total_count <= 3
            ? (e.y = this.container_pages.height - e.height)
            : (e.y = 0);

          e.alpha = 0;
          Laya.Tween.to(e, { alpha: 1 }, 150);
          Laya.timer.once(150, this, () => {
            t.page_show_locking = !1;
          });
        }
      }

      _close_page_choose() {
        var t = this;
        var e = this.container_pages.getChildByName('bg');
        Laya.Tween.to(e, { alpha: 0 }, 150);
        this.page_show_locking = !0;
        Laya.timer.once(150, this, () => {
          t.page_show_locking = !1;
          t.container_pages.visible = !1;
        });
      }

      _render_page_choose_item({index, container}) {
        var e = this;
        var i = index;
        var n = container;

        n.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            e.change_page(i, !1);
            e.page_show_locking ||
              (e._close_page_choose());
          },
          null,
          !1
        );

        n.getChildByName('page').text = (i + 1).toString();
      }
    }

    return t;
  })();
  t.PageController = e;
})(capsui || (capsui = {}));