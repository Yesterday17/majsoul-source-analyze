let uiscript;
!(t => {
  let e;
  !(t => {
    (t[(t.normal = 0)] = 'normal'),
      (t[(t.detail = 1)] = 'detail'),
      (t[(t.liqiing = 2)] = 'liqiing');
  })(e || (e = {}));
  const i = (i => {
    function n() {
      const t = i.call(this) || this;
      return (
        (t.c_gang = null),
        (t.com_add_gang = null),
        (t.com_an_gang = null),
        (t.liqi_data = null),
        (t._oplist = []),
        (t.state = e.normal),
        (n.Inst = t),
        t
      );
    }
    return __extends(n, i),
    (n.prototype.show = function(t) {
      (this.com_add_gang = []),
        (this.com_an_gang = []),
        (this.liqi_data = []);
      for (var i = [], n = 0; n < t.length; n++)
        switch (t[n].type) {
          case mjcore.E_PlayOperation.babei:
            i.push('btn_babei');
            break;
          case mjcore.E_PlayOperation.add_gang:
            this.com_add_gang = t[n].combination;
            break;
          case mjcore.E_PlayOperation.an_gang:
            this.com_an_gang = t[n].combination;
            break;
          case mjcore.E_PlayOperation.liqi:
            i.push('btn_lizhi'), (this.liqi_data = t[n].combination);
            break;
          case mjcore.E_PlayOperation.zimo:
            i.push('btn_zimo');
            break;
          case mjcore.E_PlayOperation.jiuzhongjiupai:
            i.push('btn_jiuzhongjiupai');
        }
      this.com_add_gang.length + this.com_an_gang.length > 0 &&
        i.push('btn_gang'),
        i.push('btn_cancel'),
        (this._oplist = i),
        this.showOp(i),
        (this.enable = true),
        (this.state = e.normal),
        view.AudioMgr.PlayAudio(202);
    }),
    (n.prototype.onClickOpBtn = function(t) {
      if (view.DesktopMgr.Inst.mode == view.EMJMode.play)
        switch ((view.AudioMgr.PlayAudio(101), t)) {
          case 'btn_gang':
            this.onBtn_Gang();
            break;
          case 'btn_lizhi':
            this.onBtn_Liqi();
            break;
          case 'btn_zimo':
            this.onBtn_Zimo();
            break;
          case 'btn_cancel':
            this.onBtn_Cancel();
            break;
          case 'btn_jiuzhongjiupai':
            this.onBtn_Liuju();
            break;
          case 'btn_babei':
            this.onBtn_BaBei();
        }
    }),
    (n.prototype.onDetailBack = function() {
      view.DesktopMgr.Inst.mode == view.EMJMode.play &&
        (this.showOp(this._oplist), view.AudioMgr.PlayAudio(101));
    }),
    (n.prototype.onClickDetail = function(e) {
      view.AudioMgr.PlayAudio(101),
        (this.enable = false),
        e < this.com_add_gang.length
          ? app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputOperation',
              {
                type: mjcore.E_PlayOperation.add_gang,
                index: e,
                timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
              },
              (t, e) => {}
            )
          : app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputOperation',
              {
                type: mjcore.E_PlayOperation.an_gang,
                index: e - this.com_add_gang.length,
                timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
              },
              (t, e) => {}
            ),
        view.DesktopMgr.Inst.WhenDoOperation();
    }),
    (n.prototype.onBtn_Gang = function() {
      if (this.com_an_gang.length + this.com_add_gang.length == 1)
        1 == this.com_an_gang.length
          ? app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputOperation',
              {
                type: mjcore.E_PlayOperation.an_gang,
                index: 0,
                timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
              },
              (t, e) => {}
            )
          : app.NetAgent.sendReq2MJ(
              'FastTest',
              'inputOperation',
              {
                type: mjcore.E_PlayOperation.add_gang,
                timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse,
                index: 0
              },
              (t, e) => {}
            ),
          (this.enable = false);
      else {
        for (var i = [], n = 0; n < this.com_add_gang.length; n++)
          i.push(this.com_add_gang[n]);
        for (n = 0; n < this.com_an_gang.length; n++)
          i.push(this.com_an_gang[n]);
        this.showDetail(game.Tools.strOfLocalization(2078), i),
          (this.state = e.detail);
      }
    }),
    (n.prototype.onLiqiBack = function() {
      (this.container_btns.visible = true),
        (this.btn_cancel.visible = false),
        view.DesktopMgr.Inst.mainrole.LiQiSelect(null, false),
        (this.state = e.normal);
    }),
    (n.prototype.onBtn_Liqi = function() {
      (this.container_btns.visible = false),
        (this.btn_cancel.visible = true),
        (this.btn_cancel.clickHandler = Laya.Handler.create(
          this,
          this.onLiqiBack
        ));
      for (var t = [], i = 0; i < this.liqi_data.length; i++)
        t.push(mjcore.MJPai.Create(this.liqi_data[i]));
      view.DesktopMgr.Inst.mainrole.LiQiSelect(t, true),
        (this.state = e.liqiing);
    }),
    (n.prototype.onBtn_Zimo = () => {
      app.NetAgent.sendReq2MJ(
        'FastTest',
        'inputOperation',
        {
          type: mjcore.E_PlayOperation.zimo,
          index: 0,
          timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
        },
        (t, e) => {}
      ),
        view.DesktopMgr.Inst.WhenDoOperation();
    }),
    (n.prototype.onBtn_BaBei = () => {
      let e = false;
      const i = view.DesktopMgr.Inst.mainrole;
      i.last_tile && '4z' === i.last_tile.val.toString() && (e = true),
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputOperation',
          {
            type: mjcore.E_PlayOperation.babei,
            moqie: e,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {}
        ),
        view.DesktopMgr.Inst.WhenDoOperation();
    }),
    (n.prototype.onBtn_Liuju = () => {
      app.NetAgent.sendReq2MJ(
        'FastTest',
        'inputOperation',
        {
          type: mjcore.E_PlayOperation.jiuzhongjiupai,
          index: 0,
          timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
        },
        (t, e) => {}
      ),
        view.DesktopMgr.Inst.WhenDoOperation();
    }),
    (n.prototype.onBtn_Cancel = function() {
      view.DesktopMgr.Inst.mainrole.can_discard ||
        (app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputOperation',
          {
            cancel_operation: true,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {}
        ),
        view.DesktopMgr.Inst.WhenDoOperation()),
        (this.enable = false);
    }),
    (n.prototype.onDoubleClick = function(t) {
      return this.state == e.detail
        ? (this.onDetailBack(), false)
        : this.state == e.liqiing
        ? (this.onLiqiBack(), false)
        : !!t || (this.onBtn_Cancel(), false);
    }),
    (n.prototype.onDisable = function() {
      Laya.timer.clearAll(this);
    }),
    (n.Inst = null),
    n
  ;
  })(t.UI_PlayerOperation);
  t.UI_LiQiZiMo = i;
})(uiscript || (uiscript = {}));