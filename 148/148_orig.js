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
  var e = (function(e) {
    function i() {
      var t = e.call(this) || this;
      return (
        (t._data = new Object()),
        (t.choosed_op = mjcore.E_PlayOperation.eat),
        (t._oplist = []),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.show = function(t) {
        for (var e = [], i = 0; i < t.length; i++)
          switch (t[i].type) {
            case mjcore.E_PlayOperation.eat:
              e.push('btn_chi'), (this._data.chi = t[i].combination);
              break;
            case mjcore.E_PlayOperation.peng:
              e.push('btn_peng'), (this._data.peng = t[i].combination);
              break;
            case mjcore.E_PlayOperation.ming_gang:
              e.push('btn_gang');
              break;
            case mjcore.E_PlayOperation.rong:
              e.push('btn_hu');
          }
        e.push('btn_cancel'),
          (this._oplist = e),
          this.showOp(e),
          (this.enable = !0),
          view.DesktopMgr.Inst.ShowChiPengEffect(),
          view.AudioMgr.PlayAudio(202);
      }),
      (i.prototype.onClickOpBtn = function(t) {
        if (view.DesktopMgr.Inst.mode == view.EMJMode.play)
          switch ((view.AudioMgr.PlayAudio(101), t)) {
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
      }),
      (i.prototype.onClickDetail = function(t) {
        view.DesktopMgr.Inst.mode == view.EMJMode.play &&
          (view.AudioMgr.PlayAudio(101),
          app.NetAgent.sendReq2MJ(
            'FastTest',
            'inputChiPengGang',
            { type: this.choosed_op, index: t },
            function(t, e) {}
          ),
          view.DesktopMgr.Inst.WhenDoOperation());
      }),
      (i.prototype.onDetailBack = function() {
        this.showOp(this._oplist), view.AudioMgr.PlayAudio(101);
      }),
      (i.prototype.onBtn_Chi = function() {
        this._data.chi.length > 1
          ? ((this.choosed_op = mjcore.E_PlayOperation.eat),
            this.showDetail(game.Tools.strOfLocalization(2038), this._data.chi))
          : (app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputChiPengGang',
              {
                type: mjcore.E_PlayOperation.eat,
                index: 0,
                timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
              },
              function(t, e) {}
            ),
            view.DesktopMgr.Inst.WhenDoOperation());
      }),
      (i.prototype.onBtn_Peng = function() {
        this._data.peng.length > 1
          ? ((this.choosed_op = mjcore.E_PlayOperation.peng),
            this.showDetail(
              game.Tools.strOfLocalization(2039),
              this._data.peng
            ))
          : (app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputChiPengGang',
              {
                type: mjcore.E_PlayOperation.peng,
                index: 0,
                timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
              },
              function(t, e) {}
            ),
            view.DesktopMgr.Inst.WhenDoOperation());
      }),
      (i.prototype.onBtn_Gang = function() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputChiPengGang',
          {
            type: mjcore.E_PlayOperation.ming_gang,
            index: 0,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          function(t, e) {}
        ),
          view.DesktopMgr.Inst.WhenDoOperation();
      }),
      (i.prototype.onBtn_Hu = function() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputChiPengGang',
          {
            type: mjcore.E_PlayOperation.rong,
            index: 0,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          function(t, e) {}
        ),
          view.DesktopMgr.Inst.WhenDoOperation();
      }),
      (i.prototype.onBtn_Cancel = function() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputChiPengGang',
          {
            cancel_operation: !0,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          function(t, e) {}
        ),
          view.DesktopMgr.Inst.WhenDoOperation();
      }),
      (i.prototype.onDisable = function() {
        view.DesktopMgr.Inst.CloseChiPngEffect(), Laya.timer.clearAll(this);
      }),
      (i.prototype.onDoubleClick = function() {
        this.onBtn_Cancel();
      }),
      (i.Inst = null),
      i
    );
  })(t.UI_PlayerOperation);
  t.UI_ChiPengHu = e;
})(uiscript || (uiscript = {}));