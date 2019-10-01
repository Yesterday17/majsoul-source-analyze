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
        var t = e.call(this, new ui.lobby.ageconfirmUI()) || this;
        t.birth_day = 0;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;

        this.root = this.me
          .getChildByName('agepending')
          .getChildByName('root');

        this.btn_confirm = this.root.getChildByName('btn_confirm');
        this.btn_close = this.root.getChildByName('btn_close');
        this.nianling = this.root.getChildByName('sheding');
        this.shangxian = this.root.getChildByName('shangxian');

        this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close();
              e.locking ||
                (app.NetAgent.sendReq2Lobby(
                'Lobby',
                'modifyBirthday',
                { birthday: e.birth_day },
                (i, n) => {
                  GameMgr.Inst.account_data.birthday = e.birth_day;
                  i || n.error
                    ? t.UIMgr.Inst.showNetReqError('modifyBirthday', i, n)
                    : (t.UI_Agesuccess.Inst.show());
                }
              ));
            },
            null,
            !1
          );

        this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close();
            },
            null,
            !1
          );
      }

      show(e, i, n) {
        var a = this;
        this.enable = !0;
        this.locking = !0;
        var r = `生年月日を${e}年${i}月に設定しますか？`;
        this.nianling.text = r;
        var s = new Date();
        s.setFullYear(parseInt(e), parseInt(i) - 1, 1);
        s.setHours(1, 0, 0, 0);
        this.birth_day = Math.floor(s.getTime() / 1e3);
        this.shangxian.visible = !1;
        this.root.getChildByName('xiaofei1').visible = !1;
        this.shangxian.text = n.toString();
        this.shangxian.visible = !0;
        this.root.getChildByName('xiaofei1').visible = !0;

        n < 0
          ? (this.root.getChildByName('xiaofei0').visible = !1)
          : (this.root.getChildByName('xiaofei0').visible = !0);

        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            a.locking = !1;
          })
        );
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Ageconfirm = e;
})(uiscript || (uiscript = {}));