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
      const t = e.call(this, new ui.entrance.error_infoUI()) || this;
      return (t.locking = !1), (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me
        .getChildByName('error')
        .getChildByName('container')),
        (this.info = this.root.getChildByName('text')),
        (this.me.visible = !1),
        (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.close();
          },
          null,
          !1
        ));
    }),
    (i.prototype.show = function(e, i) {
      const n = this;
      (this.info.text = e),
        (this.root.getChildByName('einfo').text = i
          ? app.Log.getCacheLog()
          : ''),
        (this.enable = !0),
        (this.locking = !0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.enable = !1), (e.locking = !1);
          })
        );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Entrance_Error = e;
})(uiscript || (uiscript = {}));