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

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.common.user_xieyiUI()) || this;
        t.current_index = 0;
        i.Inst = t;
        for (var n = [], a = 0; a < 15; a++)
          n.push(`user_xieyi/${a + 1}.txt`);
        Laya.loader.load(n);
        return t;
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');
        this.info = this.root.getChildByName('info');

        this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            () => {
              t.close(!0);
            },
            null,
            !1
          );

        this.btn_left = this.root.getChildByName('left');

        this.btn_left.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.current_index--;
              t.current_index <= 1 || (t.refresh());
            },
            null,
            !1
          );

        this.btn_right = this.root.getChildByName('right');

        this.btn_right.clickHandler = Laya.Handler.create(
            this,
            () => {
              t.current_index++;
              t.current_index >= 15 || (t.refresh());
            },
            null,
            !1
          );

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.close(!1);
            },
            null,
            !1
          );

        this.root.getChildByName('btn_close').visible =
            'chs' != GameMgr.client_language;
      }

      show(e) {
        this.complete = e;
        this.enable = !0;
        t.UIBase.anim_pop_out(this.root, null);
        this.current_index = 1;
        this.refresh();
      }

      refresh() {
        var t = Laya.loader.getRes(`user_xieyi/${this.current_index}.txt`);
        this.info.text = t || game.Tools.strOfLocalization(2198);
        this.btn_left.visible = this.current_index > 1;
        this.btn_right.visible = this.current_index < 15;
      }

      close(e) {
        var i = this;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            i.enable = !1;
            i.info.text = '';
            e && i.complete && i.complete.run();
          })
        );
      }

      onDestroy() {
        i.Inst = null;
        this.info.textField.destroy(!0);
        this.info.destroy(!0);
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_User_Xieyi = e;
})(uiscript || (uiscript = {}));