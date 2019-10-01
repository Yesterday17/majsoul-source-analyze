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
        var t = e.call(this, new ui.mj.liujuUI()) || this;
        t.root = null;
        t.img_title = null;
        return t;
      }

      onCreate() {
        this.root = this.me.getChildByName('root');
        this.img_title = this.root.getChildByName('title');
      }

      Show(t) {
        var e = this;
        this.data = t;
        var i = '';
        var n = '';
        i = 'jiuzhongjiupai';
        i = 'sifenglianda';
        i = 'sigangsanle';
        switch (t.type) {
          case mjcore.E_LiuJu.jiuzhongjiupai:
            n = 'gameend_jiuzhongjiupai';
            break;
          case mjcore.E_LiuJu.sanjiahule:
            i = 'sanjiahule';
            break;
          case mjcore.E_LiuJu.sifenglianda:
            n = 'gameend_sifenglianda';
            break;
          case mjcore.E_LiuJu.sijializhi:
            i = 'sijializhi';
            break;
          case mjcore.E_LiuJu.sigangsanle:
            n = 'gameend_sigangliuju';
        }

        this.img_title.skin = game.Tools.localUISrc(
          `myres/mjdesktop/${i}.png`
        );

        this.enable = !0;
        Laya.Tween.from(this.root, { alpha: 0 }, 500);

        '' != n &&
          (t.type == mjcore.E_LiuJu.jiuzhongjiupai
            ? view.AudioMgr.PlayCharactorSound(
                view.DesktopMgr.Inst.player_datas[t.seat].character,
                n
              )
            : view.AudioMgr.PlayCharactorSound(
                view.DesktopMgr.Inst.main_role_character_info,
                n
              ));

        view.DesktopMgr.Inst.mode == view.EMJMode.play
          ? Laya.timer.once(4e3, this, this.onBtnConfirm)
          : Laya.timer.once(4e3, this, () => {
              e.enable = !1;
            });
      }

      onDisable() {
        Laya.timer.clearAll(this);
      }

      onBtnConfirm() {
        t.UIMgr.Inst.ShowGameEnd();
        view.DesktopMgr.Inst.Reset();
        null != view.DesktopMgr.Inst.gameEndResult
          ? (this.enable = !1)
          : (Laya.timer.once(200, this, () => {
          app.NetAgent.sendReq2MJ(
            'FastTest',
            'confirmNewRound',
            {},
            (t, e) => {}
          );
        }));
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_LiuJu = e;
})(uiscript || (uiscript = {}));