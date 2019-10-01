var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function() {
      function e(t) {
        (this.me = t),
          (this.icon = this.me.getChildByName('item')),
          (this.name = this.me.getChildByName('name')),
          (this.count = this.me.getChildByName('count'));
      }
      return (
        (e.prototype.show = function(e) {
          (this.me.visible = !0), t.UIBase.anim_pop_out(this.me, null);
          var i = game.GameUtility.get_item_view(e.id);
          game.LoadMgr.setImgSkin(this.icon, i.icon),
            (this.name.text = i.name),
            (this.count.text = '+' + e.count),
            (this.count.alpha = 0),
            t.UIBase.anim_alpha_in(this.count, { x: -60 }, 150, 400);
        }),
        e
      );
    })(),
    i = (function(t) {
      function i() {
        var e = t.call(this, new ui.mj.activity_taskUI()) || this;
        return (
          (e.cells = []),
          (e.locking = !1),
          (e.complete = null),
          (e.activity_reward = []),
          (e.index = 0),
          (i.Inst = e),
          e
        );
      }
      return (
        __extends(i, t),
        (i.prototype.onCreate = function() {
          var t = this;
          (this.root = this.me.getChildByName('root')), (this.cells = []);
          for (var i = 0; i < 3; i++)
            this.cells.push(new e(this.root.getChildByName('task' + i)));
          (this.btn = this.me.getChildByName('btn_close')),
            (this.btn.clickHandler = new Laya.Handler(this, function() {
              t.locking || t.close_one();
            }));
        }),
        (i.prototype.show = function(t, e) {
          (this.locking = !0), (this.complete = e);
          for (var i = 0; i < this.cells.length; i++)
            this.cells[i].me.visible = !1;
          (this.enable = !0),
            (this.index = 0),
            (this.activity_reward = t.activity_reward),
            this.show_one(this.activity_reward[0]);
        }),
        (i.prototype.show_one = function(t) {
          var e = this;
          (this.locking = !0), (this.root.alpha = 1);
          for (r = 0; r < this.cells.length; r++) this.cells[r].me.visible = !1;
          for (
            var i = t.rewards,
              n = function(t) {
                t < a.cells.length &&
                  Laya.timer.once(600 * t, a, function() {
                    e.cells[t].show(i[t]);
                  });
              },
              a = this,
              r = 0;
            r < i.length;
            r++
          )
            n(r);
          var s =
            600 *
            ((i.length > this.cells.length ? this.cells.length : i.length) + 1);
          Laya.timer.once(s, this, function() {
            e.locking = !1;
          });
        }),
        (i.prototype.close_one = function() {
          var t = this;
          (this.locking = !0),
            Laya.Tween.to(
              this.root,
              { alpha: 0 },
              150,
              null,
              Laya.Handler.create(this, function() {
                (t.locking = !1),
                  t.index++,
                  t.index < t.activity_reward.length
                    ? t.show_one(t.activity_reward[t.index])
                    : ((t.enable = !1), t.complete && t.complete.run());
              })
            );
        }),
        i
      );
    })(t.UIBase);
  t.UI_MJReward_Activity = i;
})(uiscript || (uiscript = {}));