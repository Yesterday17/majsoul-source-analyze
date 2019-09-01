let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this) || this;
      return (
        (t._data = new Object()),
        (t.choosed_op = mjcore.E_PlayOperation.eat),
        (t._oplist = []),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
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
        (this.enable = true),
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
          (t, e) => {}
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
            (t, e) => {}
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
            (t, e) => {}
          ),
          view.DesktopMgr.Inst.WhenDoOperation());
    }),
    (i.prototype.onBtn_Gang = () => {
      app.NetAgent.sendReq2MJ(
        'FastTest',
        'inputChiPengGang',
        {
          type: mjcore.E_PlayOperation.ming_gang,
          index: 0,
          timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
        },
        (t, e) => {}
      ),
        view.DesktopMgr.Inst.WhenDoOperation();
    }),
    (i.prototype.onBtn_Hu = () => {
      app.NetAgent.sendReq2MJ(
        'FastTest',
        'inputChiPengGang',
        {
          type: mjcore.E_PlayOperation.rong,
          index: 0,
          timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
        },
        (t, e) => {}
      ),
        view.DesktopMgr.Inst.WhenDoOperation();
    }),
    (i.prototype.onBtn_Cancel = () => {
      app.NetAgent.sendReq2MJ(
        'FastTest',
        'inputChiPengGang',
        {
          cancel_operation: true,
          timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
        },
        (t, e) => {}
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
  ;
  })(t.UI_PlayerOperation);
  t.UI_ChiPengHu = e;
})(uiscript || (uiscript = {}));