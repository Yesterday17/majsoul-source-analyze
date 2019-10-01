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
        var t = e.call(this) || this;
        t._data = new Object();
        t.choosed_op = mjcore.E_PlayOperation.eat;
        t._oplist = [];
        i.Inst = t;
        return t;
      }

      show(t) {
        e.push('btn_chi');
        e.push('btn_peng');
        for (var e = [], i = 0; i < t.length; i++)
          switch (t[i].type) {
            case mjcore.E_PlayOperation.eat:
              this._data.chi = t[i].combination;
              break;
            case mjcore.E_PlayOperation.peng:
              this._data.peng = t[i].combination;
              break;
            case mjcore.E_PlayOperation.ming_gang:
              e.push('btn_gang');
              break;
            case mjcore.E_PlayOperation.rong:
              e.push('btn_hu');
          }
        e.push('btn_cancel');
        this._oplist = e;
        this.showOp(e);
        this.enable = !0;
        view.DesktopMgr.Inst.ShowChiPengEffect();
        view.AudioMgr.PlayAudio(202);
      }

      onClickOpBtn(t) {
        view.AudioMgr.PlayAudio(101);
        if (view.DesktopMgr.Inst.mode == view.EMJMode.play)
          switch ((t)) {
            case 'btn_chi':
              this.onBtn_Chi();
              break;
            case 'btn_peng':
              this.onBtn_Peng();
              break;
            case 'btn_gang':
              this.onBtn_Gang();
              break;
            case 'btn_hu':
              this.onBtn_Hu();
              break;
            case 'btn_cancel':
              this.onBtn_Cancel();
          }
      }

      onClickDetail(t) {
        view.AudioMgr.PlayAudio(101);

        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputChiPengGang',
          { type: this.choosed_op, index: t },
          (t, e) => {}
        );

        view.DesktopMgr.Inst.mode == view.EMJMode.play &&
          (view.DesktopMgr.Inst.WhenDoOperation());
      }

      onDetailBack() {
        this.showOp(this._oplist);
        view.AudioMgr.PlayAudio(101);
      }

      onBtn_Chi() {
        this.choosed_op = mjcore.E_PlayOperation.eat;

        app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputChiPengGang',
              {
                type: mjcore.E_PlayOperation.eat,
                index: 0,
                timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
              },
              (t, e) => {}
            );

        this._data.chi.length > 1
          ? (this.showDetail(game.Tools.strOfLocalization(2038), this._data.chi))
          : (view.DesktopMgr.Inst.WhenDoOperation());
      }

      onBtn_Peng() {
        this.choosed_op = mjcore.E_PlayOperation.peng;

        app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputChiPengGang',
              {
                type: mjcore.E_PlayOperation.peng,
                index: 0,
                timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
              },
              (t, e) => {}
            );

        this._data.peng.length > 1
          ? (this.showDetail(
          game.Tools.strOfLocalization(2039),
          this._data.peng
        ))
          : (view.DesktopMgr.Inst.WhenDoOperation());
      }

      onBtn_Gang() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputChiPengGang',
          {
            type: mjcore.E_PlayOperation.ming_gang,
            index: 0,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {}
        );

        view.DesktopMgr.Inst.WhenDoOperation();
      }

      onBtn_Hu() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputChiPengGang',
          {
            type: mjcore.E_PlayOperation.rong,
            index: 0,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {}
        );

        view.DesktopMgr.Inst.WhenDoOperation();
      }

      onBtn_Cancel() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputChiPengGang',
          {
            cancel_operation: !0,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {}
        );

        view.DesktopMgr.Inst.WhenDoOperation();
      }

      onDisable() {
        view.DesktopMgr.Inst.CloseChiPngEffect();
        Laya.timer.clearAll(this);
      }

      onDoubleClick() {
        this.onBtn_Cancel();
      }
    }

    __extends(i, e);

    i.Inst = null;
    return i;
  })(t.UI_PlayerOperation);
  t.UI_ChiPengHu = e;
})(uiscript || (uiscript = {}));