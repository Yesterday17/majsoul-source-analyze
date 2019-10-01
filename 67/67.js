var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var capsui;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this) || this;
        t._scrollbar = null;
        t._drag_scroll = !1;
        t._container_items = null;
        t._content = null;
        t._templete = null;
        t._items = [];
        t._item_heights = [];
        t._total_height = 0;
        t._rate = 0;
        t._repeat_x = 1;
        t._span_x = 0;
        t._value_count = 0;
        t._render_func = null;
        return t;
      }

      get rate() {
        return this._rate;
      }

      set rate(t) {
        this._total_height <= this._content.height
          ? (this._content.vScrollBar.value = 0)
          : (this._content.vScrollBar.value =
              ((this._total_height - this._content.height) * t) / 1);
      }

      get value_count() {
        return this._value_count;
      }

      get need_scroll() {
        return this._total_height > this._content.height;
      }

      get total_height() {
        return this._total_height;
      }

      get view_height() {
        return this._content.height;
      }

      get near_bottom() {
        return (
          this.total_height <= this.view_height ||
          (1 - this.rate) * this.value_count < 0.5
        );
      }

      addItem(t, e) {
        void 0 === e && (e = -1);
        var i = this._value_count;
        e <= 0 && (e = this._templete.height);
        for (n = 0; n < t; n++) this._item_heights.push(e);
        this._value_count += t;

        this._repeat_x <= 1
          ? (this._total_height += e * t)
          : (this._total_height =
              e * Math.ceil(this._value_count / this._repeat_x));

        if (
          (i > 0)
        )
          for (var n = 0; n < this._items.length; n++)
            if (this._items[n].value_index == i - 1) {
              var a = this._items[n];
              this._render_func &&
                this._render_func.runWith({
                  index: a.value_index,
                  container: a.container,
                  cache_data: a.cache_data
                });
            }
        this._onChange();
      }

      addItems(t) {
        this._item_heights.push(t[n]);
        for (var e = this._value_count, i = 0, n = 0; n < t.length; n++)
          i += t[n];
        this._value_count += t.length;
        this._repeat_x <= 1 && (this._total_height += i);
        if (
          (e > 0)
        )
          for (n = 0; n < this._items.length; n++)
            if (this._items[n].value_index == e - 1) {
              var a = this._items[n];
              this._render_func &&
                this._render_func.runWith({
                  index: a.value_index,
                  container: a.container,
                  cache_data: a.cache_data
                });
            }
        this._onChange();
      }

      delItem(t) {
        for (var e = 0; e < this._items.length; e++)
          this._items[e].value_index >= t &&
            (this._items[e].value_index == this.value_count - 1 ||
              this._render_func.runWith({
                index: this._items[e].value_index,
                container: this._items[e].container,
                cache_data: this._items[e].cache_data
              }));
        this.popItem();
      }

      popItem() {
        if (0 != this._value_count) {
          var t = this._item_heights[this._item_heights.length - 1];
          this._total_height;
          this._rate;
          this._total_height -= t;
          this._value_count--;
          this._item_heights.pop();
          this._onChange();
        }
      }

      onCreate() {
        var e = this;
        var i = this.me.getChildByName('scrollbar');
        i.scriptMap && (this._scrollbar = i.scriptMap['capsui.CScrollBar']);
        this._scrollbar = new t.CScrollBar();

        this._scrollbar ||
          ((this._scrollbar.owner = i));

        i &&
          (Laya.timer.frameOnce(3, this, () => {
          i.on('mousedown', e, () => {
            e._drag_scroll = !0;
            e.rate = i.mouseY / i.height;
          });

          i.on('mousemove', e, () => {
            e._drag_scroll && (e.rate = i.mouseY / i.height);
          });

          i.on('mouseup', e, () => {
            e._drag_scroll = !1;
          });
        }));

        this._content = this.me.getChildByName('content');

        this._content.vScrollBarSkin = game.Tools.localUISrc(
            'myres/vscroll.png'
          );

        this._container_items = new Laya.Sprite();
        this._content.addChild(this._container_items);
        this._container_items.x = this._container_items.y = 0;
        this._container_items.height = 1e7;

        Laya.timer.frameOnce(3, this, () => {
          e._content.vScrollBar.visible = !1;
          e._content.vScrollBar.on('change', e, e._onChange);
        });

        this._templete = this._content.getChildByName('templete');
        this._templete.visible = !1;
      }

      init_scrollview(t, e, i, n) {
        void 0 === e && (e = -1);
        void 0 === i && (i = 1);
        void 0 === n && (n = 0);
        this._repeat_x = i;
        this._span_x = n;
        this._render_func = t;
        if (
          (this._items.length > 0)
        ) {
          this._container_items.removeChild(this._items[r].container);
          for (r = 0; r < this._items.length; r++)
            this._items[r].container.destroy();
          this._items = [];
        }
        e <= 0 && (e = this._templete.height);
        var a = Math.ceil(this._content.height / e) + 2;
        a *= this._repeat_x;

        this._items.push({
          container: this._templete.scriptMap['capsui.UICopy'].getNodeClone(),
          value_index: -1,
          cache_data: {}
        });

        this._content.removeChild(this._items[r].container);
        for (var r = 0; r < a; r++)
          this._container_items.addChild(this._items[r].container);
      }

      reset() {
        this._content.vScrollBar.stopScroll();
        this._drag_scroll = !1;
        this._total_height = 0;
        this._value_count = 0;
        this._item_heights = [];
        this.rate = 0;
        this._onRateChange(0);
      }

      change_render_handler(t) {
        this.reset();
        this._render_func = t;
      }

      _onChange() {
        var t = this._content.vScrollBar;
        var e = 1 * t.value;
        if (this._total_height <= this._content.height)
          e > 0 ? (t.value = 0) : this._onRateChange(0);
        else if (e > this._total_height - this._content.height)
          t.value = (this._total_height - this._content.height) / 1;
        else {
          var i = e / (this._total_height - this._content.height);
          this._onRateChange(i);
        }
      }

      scrollDelta(t) {
        this.need_scroll && (this._content.vScrollBar.value += t);
      }

      _onRateChange(t) {
        var e = 0;
        this._rate = 0;
        this._rate = t;

        this._rate < 0
          ? (this._rate = 0)
          : this._rate > 1 && (this._rate = 1);

        this._scrollbar &&
          this._scrollbar.setVal(
            t,
            this._content.height / this.total_height
          );

        this._total_height <= this._content.height
          ? (this._scrollbar && this._scrollbar.setVal(0, 1))
          : (e = (this._total_height - this._content.height) * this._rate);
        for (
          var i = 0, n = 0, a = 0;
          a < this._item_heights.length;
          a += this._repeat_x
        ) {
          if (n + this._item_heights[a] >= e) {
            i = a;
            break;
          }
          n += this._item_heights[a];
        }
        for (
          var r = i % this._items.length, a = 0;
          a < this._items.length;
          a += this._repeat_x
        ) {
          var s = i + a;
          if (s >= this._value_count || n - e > this._content.height)
            for (o = 0; o < this._repeat_x; o++) {
              (l = this._items[
                (r + a + o) % this._items.length
              ]).container.visible = !1;

              l.value_index = -1;
            }
          else {
            for (var o = 0; o < this._repeat_x; o++) {
              var l = this._items[(r + a + o) % this._items.length];
              var h = s + o;
              l.container.visible = !1;
              l.container.visible = !0;
              l.value_index = h;
              l.container.y = n;
              l.container.x = (this._templete.width + this._span_x) * o;
              this._container_items.removeChild(l.container);
              this._container_items.addChild(l.container);
              h >= this.value_count
                ? (l.value_index = -1)
                : l.value_index != h &&
                  ((this._render_func && this._render_func.runWith({
                index: h,
                container: l.container,
                cache_data: l.cache_data
              })));
            }
            n += this._item_heights[s];
          }
        }
        this.me.event('ratechange');
      }

      wantToRefreshItem(t) {
        for (var e = 0; e < this._items.length; e++)
          this._items[e].value_index == t &&
            this._render_func.runWith({
              index: t,
              container: this._items[e].container,
              cache_data: this._items[e].cache_data
            });
      }

      wantToRefreshAll() {
        for (var t = 0; t < this._items.length; t++)
          this._items[t].value_index >= 0 &&
            this._render_func.runWith({
              index: this._items[t].value_index,
              container: this._items[t].container,
              cache_data: this._items[t].cache_data
            });
      }
    }

    __extends(i, e);

    return i;
  })(t.UIComponent);
  t.CScrollView = e;
})(capsui || (capsui = {}));