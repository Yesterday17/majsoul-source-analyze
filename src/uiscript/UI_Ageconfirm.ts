// 122
/// <reference path="../LayaAir.d.ts" />

var ui: any;
var app;
var GameMgr;

(uiscript => {
  class UI_Ageconfirm extends uiscript.UIBase {
    birth_day = 0;
    locking: boolean;
    static Inst: UI_Ageconfirm;

    root: laya.display.Node;
    btn_confirm: laya.ui.Button;
    btn_close: laya.ui.Button;
    nianling: laya.display.Text;
    shangxian: laya.display.Text;

    constructor() {
      super(new ui.lobby.ageconfirmUI());
      UI_Ageconfirm.Inst = this;
    }

    onCreate() {
      const e = this;
      this.root = this.me.getChildByName("agepending").getChildByName("root");
      this.btn_confirm = this.root.getChildByName(
        "btn_confirm"
      ) as laya.ui.Button;
      this.btn_close = this.root.getChildByName("btn_close") as laya.ui.Button;
      this.nianling = this.root.getChildByName("sheding") as laya.display.Text;
      this.shangxian = this.root.getChildByName(
        "shangxian"
      ) as laya.display.Text;
      this.btn_confirm.clickHandler = Laya.Handler.create(
        this,
        () => {
          e.locking ||
            (e.close(),
            app.NetAgent.sendReq2Lobby(
              "Lobby",
              "modifyBirthday",
              { birthday: e.birth_day },
              (i, n) => {
                i || n.error
                  ? uiscript.UIMgr.Inst.showNetReqError("modifyBirthday", i, n)
                  : ((GameMgr.Inst.account_data.birthday = e.birth_day),
                    uiscript.UI_Agesuccess.Inst.show());
              }
            ));
        },
        null,
        false
      );
      this.btn_close.clickHandler = Laya.Handler.create(
        this,
        () => {
          e.locking || e.close();
        },
        null,
        false
      );
    }

    show(e, i, n) {
      this.enable = true;
      this.locking = true;
      this.nianling.text = `生年月日を${e}年${i}月に設定しますか？`;
      const s = new Date();
      s.setFullYear(parseInt(e), parseInt(i) - 1, 1);
      s.setHours(1, 0, 0, 0);
      this.birth_day = Math.floor(s.getTime() / 1000);
      const xf0 = this.root.getChildByName("xiaofei0") as laya.display.Sprite;
      const xf1 = this.root.getChildByName("xiaofei1") as laya.display.Sprite;
      if (n < 0) {
        this.shangxian.visible = false;
        xf1.visible = false;
        xf0.visible = false;
      } else {
        this.shangxian.text = n.toString();
        this.shangxian.visible = true;
        xf1.visible = true;
        xf0.visible = true;
      }
      uiscript.UIBase.anim_pop_out(
        this.root,
        Laya.Handler.create(this, () => {
          this.locking = false;
        })
      );
    }

    close() {
      const e = this;
      this.locking = true;
      uiscript.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          (e.locking = false), (e.enable = false);
        })
      );
    }
  }
  uiscript.UI_Ageconfirm = UI_Ageconfirm;
})(uiscript || (uiscript = {}));
