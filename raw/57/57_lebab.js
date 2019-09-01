let capsui;
!(t => {
  const e = (() => {
    function t() {
      (this._data = null),
        (this._me = null),
        (this.items = []),
        (this.lines = []);
    }
    return Object.defineProperty(t.prototype, 'locking', {
      get() {
        return this._locking;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'me', {
      get() {
        return this._me;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'owner', {
      set(t) {
        (this._me = t), Laya.timer.frameOnce(3, this, this.onCreate);
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t.prototype, 'choosed_index', {
      get() {
        return this._choosed_index;
      },
      enumerable: true,
      configurable: true
    }),
    (t.prototype.onCreate = function() {
      const t = this;
      (this.out = this.me.getChildByName('out')),
        (this.bg = this.me.getChildByName('bg')),
        (this.line = this.me.getChildByName('line')),
        (this.item_templete = this.me.getChildByName('templete')),
        (this.content = this.me.getChildByName('content')),
        (this.content.vScrollBarSkin = game.Tools.localUISrc(
          'myres/vscroll.png'
        )),
        (this.content.vScrollBar.visible = false),
        (this.item_templete.visible = false);
      for (
        var e = this.item_templete.scriptMap['capsui.UICopy'], i = 0;
        i < 10;
        i++
      ) {
        const n = e.getNodeClone();
        this.content.addChild(n), this.items.push(n);
      }
      for (i = 0; i < 12; i++) {
        const a = this.line.scriptMap['capsui.UICopy'].getNodeClone();
        this.content.addChild(a), this.lines.push(a);
      }
      (this.item_templete.visible = true),
        (this.item_templete.clickHandler = Laya.Handler.create(
          this,
          () => {
            t._locking || (t.out.visible ? t.up() : t.down());
          },
          null,
          false
        )),
        (this.out.clickHandler = Laya.Handler.create(
          this,
          () => {
            t._locking || t.up();
          },
          null,
          false
        ));
    }),
    (t.prototype.init = function(t, e) {
      (this._render = t), (this._onChange = e);
    }),
    (t.prototype.reset_show = function(t, e) {
      (this.out.visible = false),
        (this.line.visible = false),
        (this.content.visible = false),
        (this.bg.height = this.item_templete.height),
        (this._value_count = e),
        (this._choosed_index = t),
        this._render.runWith({ index: t, container: this.item_templete }),
        (this._locking = false);
    }),
    (t.prototype.down = function() {
      const t = this;
      (this._locking = true), (this.out.visible = true);
      for (n = 0; n < this.items.length; n++) this.items[n].visible = false;
      (this.content.visible = false),
        (this.line.visible = true),
        (this.line.y = this.item_templete.height),
        (this.content.y = this.item_templete.height + this.line.height);
      for (
        var e = e => {
            e < i._value_count
              ? (0 != e &&
                  ((i.lines[e - 1].visible = true),
                  (i.lines[e - 1].y =
                    i.item_templete.height * e + i.line.height * (e - 1))),
                i._render.runWith({ index: e, container: i.items[e] }),
                (i.items[e].visible = true),
                (i.items[e].y = (i.item_templete.height + i.line.height) * e),
                (i.items[e].clickHandler = Laya.Handler.create(
                  i,
                  () => {
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
                  false
                )))
              : (i.items[e].visible = false);
          },
          i = this,
          n = 0;
        n < this.items.length;
        n++
      )
        e(n);
      if (
        ((this.content.visible = true),
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
        Laya.timer.once(150, this, () => {
          t._locking = false;
        });
    }),
    (t.prototype.up = function() {
      const t = this;
      this._locking = true;
      const e = this.item_templete.height;
      Laya.Tween.to(this.bg, { height: e }, 150, Laya.Ease.strongOut),
        Laya.Tween.to(this.content, { alpha: 0 }, 150),
        Laya.Tween.to(this.line, { alpha: 0 }, 150),
        Laya.timer.once(150, this, () => {
          (t.out.visible = false),
            (t.line.visible = false),
            (t.content.visible = false),
            (t._locking = false);
        });
    }),
    t
  ;
  })();
  t.CDropdown = e;
})(capsui || (capsui = {}));