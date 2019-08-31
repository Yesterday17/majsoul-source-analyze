var capsui;
!(function(t) {
  var e = (function() {
    function t() {
      (this._data = null),
        (this._me = null),
        (this.items = []),
        (this.lines = []);
    }
    return (
      Object.defineProperty(t.prototype, 'locking', {
        get: function() {
          return this._locking;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(t.prototype, 'me', {
        get: function() {
          return this._me;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(t.prototype, 'owner', {
        set: function(t) {
          (this._me = t), Laya.timer.frameOnce(3, this, this.onCreate);
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(t.prototype, 'choosed_index', {
        get: function() {
          return this._choosed_index;
        },
        enumerable: !0,
        configurable: !0
      }),
      (t.prototype.onCreate = function() {
        var t = this;
        (this.out = this.me.getChildByName('out')),
          (this.bg = this.me.getChildByName('bg')),
          (this.line = this.me.getChildByName('line')),
          (this.item_templete = this.me.getChildByName('templete')),
          (this.content = this.me.getChildByName('content')),
          (this.content.vScrollBarSkin = game.Tools.localUISrc(
            'myres/vscroll.png'
          )),
          (this.content.vScrollBar.visible = !1),
          (this.item_templete.visible = !1);
        for (
          var e = this.item_templete.scriptMap['capsui.UICopy'], i = 0;
          i < 10;
          i++
        ) {
          var n = e.getNodeClone();
          this.content.addChild(n), this.items.push(n);
        }
        for (i = 0; i < 12; i++) {
          var a = this.line.scriptMap['capsui.UICopy'].getNodeClone();
          this.content.addChild(a), this.lines.push(a);
        }
        (this.item_templete.visible = !0),
          (this.item_templete.clickHandler = Laya.Handler.create(
            this,
            function() {
              t._locking || (t.out.visible ? t.up() : t.down());
            },
            null,
            !1
          )),
          (this.out.clickHandler = Laya.Handler.create(
            this,
            function() {
              t._locking || t.up();
            },
            null,
            !1
          ));
      }),
      (t.prototype.init = function(t, e) {
        (this._render = t), (this._onChange = e);
      }),
      (t.prototype.reset_show = function(t, e) {
        (this.out.visible = !1),
          (this.line.visible = !1),
          (this.content.visible = !1),
          (this.bg.height = this.item_templete.height),
          (this._value_count = e),
          (this._choosed_index = t),
          this._render.runWith({ index: t, container: this.item_templete }),
          (this._locking = !1);
      }),
      (t.prototype.down = function() {
        var t = this;
        (this._locking = !0), (this.out.visible = !0);
        for (n = 0; n < this.items.length; n++) this.items[n].visible = !1;
        (this.content.visible = !1),
          (this.line.visible = !0),
          (this.line.y = this.item_templete.height),
          (this.content.y = this.item_templete.height + this.line.height);
        for (
          var e = function(e) {
              e < i._value_count
                ? (0 != e &&
                    ((i.lines[e - 1].visible = !0),
                    (i.lines[e - 1].y =
                      i.item_templete.height * e + i.line.height * (e - 1))),
                  i._render.runWith({ index: e, container: i.items[e] }),
                  (i.items[e].visible = !0),
                  (i.items[e].y = (i.item_templete.height + i.line.height) * e),
                  (i.items[e].clickHandler = Laya.Handler.create(
                    i,
                    function() {
                      t._locking ||
                        (t.up(),
                        t._choosed_index != e &&
                          ((t._choosed_index = e),
                          t._render.runWith({
                            index: e,
                            container: t.item_templete
                          }),
                          t._onChange.runWith(t._choosed_index)));
                    },
                    null,
                    !1
                  )))
                : (i.items[e].visible = !1);
            },
            i = this,
            n = 0;
          n < this.items.length;
          n++
        )
          e(n);
        if (
          ((this.content.visible = !0),
          (this.content.alpha = 0),
          this._value_count <= 3)
        ) {
          a =
            (this.item_templete.height + this.line.height) *
            (this._value_count + 1);
          (this.content.height =
            (this.item_templete.height + this.line.height) * this._value_count),
            Laya.Tween.to(this.bg, { height: a }, 150, Laya.Ease.strongOut),
            Laya.Tween.to(this.content, { alpha: 1 }, 150);
        } else {
          var a = 4.5 * (this.item_templete.height + this.line.height);
          (this.content.height =
            3.4 * (this.item_templete.height + this.line.height)),
            Laya.Tween.to(this.bg, { height: a }, 150, Laya.Ease.strongOut),
            Laya.Tween.to(this.content, { alpha: 1 }, 150);
        }
        (this.line.alpha = 0),
          Laya.Tween.to(this.line, { alpha: 1 }, 150),
          Laya.timer.once(150, this, function() {
            t._locking = !1;
          });
      }),
      (t.prototype.up = function() {
        var t = this;
        this._locking = !0;
        var e = this.item_templete.height;
        Laya.Tween.to(this.bg, { height: e }, 150, Laya.Ease.strongOut),
          Laya.Tween.to(this.content, { alpha: 0 }, 150),
          Laya.Tween.to(this.line, { alpha: 0 }, 150),
          Laya.timer.once(150, this, function() {
            (t.out.visible = !1),
              (t.line.visible = !1),
              (t.content.visible = !1),
              (t._locking = !1);
          });
      }),
      t
    );
  })();
  t.CDropdown = e;
})(capsui || (capsui = {}));