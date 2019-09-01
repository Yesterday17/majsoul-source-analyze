var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.both_ui.getrewardUI()) || this;
      return (t.items = []), (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        this.root = this.me.getChildByName('root');
        var i = this.root.getChildByName('items');
        this.container_items = i;
        for (var n = 0; n < i.numChildren; n++) {
          var a = i.getChildAt(n);
          this.items.push({
            container: a,
            icon: new t.UI_Item_Skin(a.getChildByName('icon')),
            count: a.getChildByName('count'),
            name: a.getChildByName('name')
          });
        }
        (this.btn_close = this.me.getChildByName('btn_close')),
          (this.btn_close.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || e.close();
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function(t, e) {
        var i = this;
        (this.enable = true), (this.complete = e);
        for (
          var n = function(e) {
              if (e < t.length) {
                a.items[e].container.visible = true;
                var n = game.GameUtility.get_item_view(t[e].id);
                a.items[e].icon.setSkin(n.icon),
                  (a.items[e].name.text = n.name),
                  (a.items[e].count.text = t[e].count.toString()),
                  (a.items[e].container.x =
                    a.container_items.width / 2 -
                    (210 * (t.length - 1)) / 2 +
                    210 * e),
                  (a.items[e].container.y = 72),
                  (a.items[e].container.scaleX = 0),
                  (a.items[e].container.scaleY = 0),
                  (a.items[e].container.alpha = 0),
                  (a.items[e].name.alpha = 0),
                  (a.items[e].count.alpha = 0),
                  Laya.Tween.to(
                    a.items[e].container,
                    { scaleX: 1, scaleY: 1, alpha: 1 },
                    200,
                    Laya.Ease.backOut,
                    Laya.Handler.create(a, function() {
                      (i.items[e].name.alpha = 1), (i.items[e].count.alpha = 1);
                    }),
                    150 * e + 400
                  );
              } else a.items[e].container.visible = false;
            },
            a = this,
            r = 0;
          r < this.items.length;
          r++
        )
          n(r);
        (this.btn_close.visible = false),
          (this.root.alpha = 1),
          (this.root.scaleY = 1),
          (this.locking = true),
          this.me.in.play(0, false),
          Laya.timer.once(400 + 150 * t.length, this, function() {
            (i.locking = false), (i.btn_close.visible = true);
          });
      }),
      (i.prototype.close = function() {
        var t = this;
        (this.locking = true),
          this.me.out.play(0, false),
          Laya.timer.once(200, this, function() {
            (t.locking = false), (t.enable = false), t.complete && t.complete.run();
          });
      }),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_Getrewardextends = e;
})(uiscript || (uiscript = {}));