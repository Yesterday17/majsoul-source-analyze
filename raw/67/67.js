var capsui;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this) || this;
      return (
        (t._scrollbar = null),
        (t._drag_scroll = false),
        (t._container_items = null),
        (t._content = null),
        (t._templete = null),
        (t._items = []),
        (t._item_heights = []),
        (t._total_height = 0),
        (t._rate = 0),
        (t._repeat_x = 1),
        (t._span_x = 0),
        (t._value_count = 0),
        (t._render_func = null),
        t
      );
    }
    return (
      __extends(i, e),
      Object.defineProperty(i.prototype, 'rate', {
        get: function() {
          return this._rate;
        },
        set: function(t) {
          this._total_height <= this._content.height
            ? (this._content.vScrollBar.value = 0)
            : (this._content.vScrollBar.value =
                ((this._total_height - this._content.height) * t) / 1);
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i.prototype, 'value_count', {
        get: function() {
          return this._value_count;
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i.prototype, 'need_scroll', {
        get: function() {
          return this._total_height > this._content.height;
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i.prototype, 'total_height', {
        get: function() {
          return this._total_height;
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i.prototype, 'view_height', {
        get: function() {
          return this._content.height;
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i.prototype, 'near_bottom', {
        get: function() {
          return (
            this.total_height <= this.view_height ||
            (1 - this.rate) * this.value_count < 0.5
          );
        },
        enumerable: true,
        configurable: true
      }),
      (i.prototype.addItem = function(t, e) {
        undefined === e && (e = -1);
        var i = this._value_count;
        e <= 0 && (e = this._templete.height);
        for (n = 0; n < t; n++) this._item_heights.push(e);
        if (
          ((this._value_count += t),
          this._repeat_x <= 1
            ? (this._total_height += e * t)
            : (this._total_height =
                e * Math.ceil(this._value_count / this._repeat_x)),
          i > 0)
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
      }),
      (i.prototype.addItems = function(t) {
        for (var e = this._value_count, i = 0, n = 0; n < t.length; n++)
          this._item_heights.push(t[n]), (i += t[n]);
        if (
          ((this._value_count += t.length),
          this._repeat_x <= 1 && (this._total_height += i),
          e > 0)
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
      }),
      (i.prototype.delItem = function(t) {
        for (var e = 0; e < this._items.length; e++)
          this._items[e].value_index >= t &&
            (this._items[e].value_index == this.value_count - 1 ||
              this._render_func.runWith({
                index: this._items[e].value_index,
                container: this._items[e].container,
                cache_data: this._items[e].cache_data
              }));
        this.popItem();
      }),
      (i.prototype.popItem = function() {
        if (0 != this._value_count) {
          var t = this._item_heights[this._item_heights.length - 1];
          this._total_height, this._rate;
          (this._total_height -= t),
            this._value_count--,
            this._item_heights.pop(),
            this._onChange();
        }
      }),
      (i.prototype.onCreate = function() {
        var e = this,
          i = this.me.getChildByName('scrollbar');
        i &&
          (i.scriptMap && (this._scrollbar = i.scriptMap['capsui.CScrollBar']),
          this._scrollbar ||
            ((this._scrollbar = new t.CScrollBar()),
            (this._scrollbar.owner = i)),
          Laya.timer.frameOnce(3, this, function() {
            i.on('mousedown', e, function() {
              (e._drag_scroll = true), (e.rate = i.mouseY / i.height);
            }),
              i.on('mousemove', e, function() {
                e._drag_scroll && (e.rate = i.mouseY / i.height);
              }),
              i.on('mouseup', e, function() {
                e._drag_scroll = false;
              });
          })),
          (this._content = this.me.getChildByName('content')),
          (this._content.vScrollBarSkin = game.Tools.localUISrc(
            'myres/vscroll.png'
          )),
          (this._container_items = new Laya.Sprite()),
          this._content.addChild(this._container_items),
          (this._container_items.x = this._container_items.y = 0),
          (this._container_items.height = 1e7),
          Laya.timer.frameOnce(3, this, function() {
            (e._content.vScrollBar.visible = false),
              e._content.vScrollBar.on('change', e, e._onChange);
          }),
          (this._templete = this._content.getChildByName('templete')),
          (this._templete.visible = false);
      }),
      (i.prototype.init_scrollview = function(t, e, i, n) {
        if (
          (undefined === e && (e = -1),
          undefined === i && (i = 1),
          undefined === n && (n = 0),
          (this._repeat_x = i),
          (this._span_x = n),
          (this._render_func = t),
          this._items.length > 0)
        ) {
          for (r = 0; r < this._items.length; r++)
            this._container_items.removeChild(this._items[r].container),
              this._items[r].container.destroy();
          this._items = [];
        }
        e <= 0 && (e = this._templete.height);
        var a = Math.ceil(this._content.height / e) + 2;
        a *= this._repeat_x;
        for (var r = 0; r < a; r++)
          this._items.push({
            container: this._templete.scriptMap['capsui.UICopy'].getNodeClone(),
            value_index: -1,
            cache_data: {}
          }),
            this._content.removeChild(this._items[r].container),
            this._container_items.addChild(this._items[r].container);
      }),
      (i.prototype.reset = function() {
        this._content.vScrollBar.stopScroll(),
          (this._drag_scroll = false),
          (this._total_height = 0),
          (this._value_count = 0),
          (this._item_heights = []),
          (this.rate = 0),
          this._onRateChange(0);
      }),
      (i.prototype.change_render_handler = function(t) {
        this.reset(), (this._render_func = t);
      }),
      (i.prototype._onChange = function() {
        var t = this._content.vScrollBar,
          e = 1 * t.value;
        if (this._total_height <= this._content.height)
          e > 0 ? (t.value = 0) : this._onRateChange(0);
        else if (e > this._total_height - this._content.height)
          t.value = (this._total_height - this._content.height) / 1;
        else {
          var i = e / (this._total_height - this._content.height);
          this._onRateChange(i);
        }
      }),
      (i.prototype.scrollDelta = function(t) {
        this.need_scroll && (this._content.vScrollBar.value += t);
      }),
      (i.prototype._onRateChange = function(t) {
        var e = 0;
        this._total_height <= this._content.height
          ? ((this._rate = 0), this._scrollbar && this._scrollbar.setVal(0, 1))
          : ((this._rate = t),
            this._rate < 0
              ? (this._rate = 0)
              : this._rate > 1 && (this._rate = 1),
            this._scrollbar &&
              this._scrollbar.setVal(
                t,
                this._content.height / this.total_height
              ),
            (e = (this._total_height - this._content.height) * this._rate));
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
              ((l = this._items[
                (r + a + o) % this._items.length
              ]).container.visible = false),
                (l.value_index = -1);
            }
          else {
            for (var o = 0; o < this._repeat_x; o++) {
              var l = this._items[(r + a + o) % this._items.length],
                h = s + o;
              h >= this.value_count
                ? ((l.container.visible = false), (l.value_index = -1))
                : l.value_index != h &&
                  ((l.container.visible = true),
                  (l.value_index = h),
                  (l.container.y = n),
                  (l.container.x = (this._templete.width + this._span_x) * o),
                  this._container_items.removeChild(l.container),
                  this._container_items.addChild(l.container),
                  this._render_func &&
                    this._render_func.runWith({
                      index: h,
                      container: l.container,
                      cache_data: l.cache_data
                    }));
            }
            n += this._item_heights[s];
          }
        }
        this.me.event('ratechange');
      }),
      (i.prototype.wantToRefreshItem = function(t) {
        for (var e = 0; e < this._items.length; e++)
          this._items[e].value_index == t &&
            this._render_func.runWith({
              index: t,
              container: this._items[e].container,
              cache_data: this._items[e].cache_data
            });
      }),
      (i.prototype.wantToRefreshAll = function() {
        for (var t = 0; t < this._items.length; t++)
          this._items[t].value_index >= 0 &&
            this._render_func.runWith({
              index: this._items[t].value_index,
              container: this._items[t].container,
              cache_data: this._items[t].cache_data
            });
      }),
      i
    );
  })(t.UIComponent);
  t.CScrollView = e;
})(capsui || (capsui = {}));