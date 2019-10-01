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
  var e;
  !(t => {
    t[(t.normal = 0)] = 'normal';
    t[(t.detail = 1)] = 'detail';
    t[(t.liqiing = 2)] = 'liqiing';
  })(e || (e = {}));
  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this) || this;
        t.c_gang = null;
        t.com_add_gang = null;
        t.com_an_gang = null;
        t.liqi_data = null;
        t._oplist = [];
        t.state = e.normal;
        n.Inst = t;
        return t;
      }

      show(t) {
        this.com_add_gang = [];
        this.com_an_gang = [];
        this.liqi_data = [];
        i.push('btn_lizhi');
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
              this.liqi_data = t[n].combination;
              break;
            case mjcore.E_PlayOperation.zimo:
              i.push('btn_zimo');
              break;
            case mjcore.E_PlayOperation.jiuzhongjiupai:
              i.push('btn_jiuzhongjiupai');
          }

        this.com_add_gang.length + this.com_an_gang.length > 0 &&
          i.push('btn_gang');

        i.push('btn_cancel');
        this._oplist = i;
        this.showOp(i);
        this.enable = !0;
        this.state = e.normal;
        view.AudioMgr.PlayAudio(202);
      }

      onClickOpBtn(t) {
        view.AudioMgr.PlayAudio(101);
        if (view.DesktopMgr.Inst.mode == view.EMJMode.play)
          switch ((t)) {
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
      }

      onDetailBack() {
        this.showOp(this._oplist);
        view.DesktopMgr.Inst.mode == view.EMJMode.play &&
          (view.AudioMgr.PlayAudio(101));
      }

      onClickDetail(e) {
        view.AudioMgr.PlayAudio(101);
        this.enable = !1;

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
            );

        view.DesktopMgr.Inst.WhenDoOperation();
      }

      onBtn_Gang() {
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
            );

        if (this.com_an_gang.length + this.com_add_gang.length == 1)
          this.enable = !1;
        else {
          for (var i = [], n = 0; n < this.com_add_gang.length; n++)
            i.push(this.com_add_gang[n]);
          for (n = 0; n < this.com_an_gang.length; n++)
            i.push(this.com_an_gang[n]);
          this.showDetail(game.Tools.strOfLocalization(2078), i);
          this.state = e.detail;
        }
      }

      onLiqiBack() {
        this.container_btns.visible = !0;
        this.btn_cancel.visible = !1;
        view.DesktopMgr.Inst.mainrole.LiQiSelect(null, !1);
        this.state = e.normal;
      }

      onBtn_Liqi() {
        this.container_btns.visible = !1;
        this.btn_cancel.visible = !0;
        this.btn_cancel.clickHandler = Laya.Handler.create(
            this,
            this.onLiqiBack
          );
        for (var t = [], i = 0; i < this.liqi_data.length; i++)
          t.push(mjcore.MJPai.Create(this.liqi_data[i]));
        view.DesktopMgr.Inst.mainrole.LiQiSelect(t, !0);
        this.state = e.liqiing;
      }

      onBtn_Zimo() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputOperation',
          {
            type: mjcore.E_PlayOperation.zimo,
            index: 0,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {}
        );

        view.DesktopMgr.Inst.WhenDoOperation();
      }

      onBtn_BaBei() {
        var e = !1;
        var i = view.DesktopMgr.Inst.mainrole;
        i.last_tile && '4z' === i.last_tile.val.toString() && (e = !0);

        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputOperation',
          {
            type: mjcore.E_PlayOperation.babei,
            moqie: e,
            timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
          },
          (t, e) => {}
        );

        view.DesktopMgr.Inst.WhenDoOperation();
      }

      onBtn_Liuju() {
        app.NetAgent.sendReq2MJ(
          'FastTest',
          'inputOperation',
          {
            type: mjcore.E_PlayOperation.jiuzhongjiupai,
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
            'inputOperation',
            {
              cancel_operation: !0,
              timeuse: t.UI_DesktopInfo.Inst._timecd.timeuse
            },
            (t, e) => {}
          );

        view.DesktopMgr.Inst.mainrole.can_discard ||
          (view.DesktopMgr.Inst.WhenDoOperation());

        this.enable = !1;
      }

      onDoubleClick(t) {
        this.onDetailBack();
        this.onLiqiBack();
        this.onBtn_Cancel();
        return this.state == e.detail
          ? (!1)
          : this.state == e.liqiing
          ? (!1)
          : !!t || (!1);
      }

      onDisable() {
        Laya.timer.clearAll(this);
      }
    }

    __extends(n, i);

    n.Inst = null;
    return n;
  })(t.UI_PlayerOperation);
  t.UI_LiQiZiMo = i;
})(uiscript || (uiscript = {}));