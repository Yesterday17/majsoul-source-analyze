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
      const t = e.call(this, new ui.lobby.add_roomUI()) || this;
      return (
        (t.txtinput = null), (t.locking = !1), (t.root = null), (i.Inst = t), t
      );
    }
    return __extends(i, e),
    (i.Show = function() {
      this.Inst._show();
    }),
    (i.Close = function() {
      null != this.Inst && this.Inst._hide();
    }),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_cancel'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t._hide();
          },
          null,
          !1
        )),
        (this.root.getChildByName(
          'btn_create'
        ).clickHandler = Laya.Handler.create(
          this,
          this._btnAddRoom,
          null,
          !1
        )),
        (this.txtinput = this.root
          .getChildByName('input')
          .getChildByName('txtinput'));
      for (
        var e = this.root.getChildByName('numpad'),
          i = i => {
            const a = e.getChildByName(`n${i}`), r = a.getChildByName('s');
            r.alpha = 0;
            let s = !1;
            a.on('mousedown', n, () => {
              (r.alpha = 0),
                (s = !0),
                Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, !0, !0);
            }),
              a.on('mouseup', n, () => {
                Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
                  s &&
                    t.txtinput.text.length < t.txtinput.maxChars &&
                    (t.txtinput.text = t.txtinput.text + i.toString()),
                  (s = !1);
              }),
              a.on('mouseout', n, () => {
                Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
                  (s = !1);
              });
          },
          n = this,
          a = 0;
        a < 10;
        a++
      )
        i(a);
      const r = (o = e.getChildByName('clear')).getChildByName('s');
      r.alpha = 0;
      let s = !1;
      o.on('mousedown', this, () => {
        (r.alpha = 0),
          (s = !0),
          Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, !0, !0);
      }),
        o.on('mouseup', this, () => {
          Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
            s && (t.txtinput.text = ''),
            (s = !1);
        }),
        o.on('mouseout', this, () => {
          Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0), (s = !1);
        });
      var o = e.getChildByName('del');
      const l = o.getChildByName('s');
      l.alpha = 0;
      let h = !1;
      o.on('mousedown', this, () => {
        (l.alpha = 0),
          (h = !0),
          Laya.Tween.to(l, { alpha: 1 }, 50, null, null, 0, !0, !0);
      }),
        o.on('mouseup', this, () => {
          if (
            (Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, !0, !0), h)
          ) {
            let e = t.txtinput.text;
            e.length > 0 && (e = e.substr(0, e.length - 1)),
              (t.txtinput.text = e);
          }
          h = !1;
        }),
        o.on('mouseout', this, () => {
          Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, !0, !0), (h = !1);
        });
    }),
    (i.prototype._show = function() {
      const e = this;
      (this.enable = !0),
        (this.txtinput.text = ''),
        this.locking ||
          ((this.locking = !0),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, () => {
              e.locking = !1;
            })
          ));
    }),
    (i.prototype._hide = function() {
      const e = this;
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.enable = !1);
          })
        );
    }),
    (i.prototype._btnAddRoom = function() {
      const e = this;
      this.locking ||
        (this._hide(),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'joinRoom',
          { room_id: parseInt(this.txtinput.text) },
          (i, n) => {
            i || n.error
              ? t.UIMgr.Inst.showNetReqError('joinRoom', i, n)
              : ((e.enable = !1),
                (t.UI_Lobby.Inst.enable = !1),
                t.UI_WaitingRoom.Inst.updateData(n.room),
                t.UIMgr.Inst.ShowWaitingRoom());
          }
        ));
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_Add_Room = e;
})(uiscript || (uiscript = {}));