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
      var t = e.call(this, new ui.lobby.add_roomUI()) || this;
      return (
        (t.txtinput = null), (t.locking = !1), (t.root = null), (i.Inst = t), t
      );
    }
    return (
      __extends(i, e),
      (i.Show = function() {
        this.Inst._show();
      }),
      (i.Close = function() {
        null != this.Inst && this.Inst._hide();
      }),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.root.getChildByName(
            'btn_cancel'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
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
            i = function(i) {
              var a = e.getChildByName('n' + i),
                r = a.getChildByName('s');
              r.alpha = 0;
              var s = !1;
              a.on('mousedown', n, function() {
                (r.alpha = 0),
                  (s = !0),
                  Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, !0, !0);
              }),
                a.on('mouseup', n, function() {
                  Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
                    s &&
                      t.txtinput.text.length < t.txtinput.maxChars &&
                      (t.txtinput.text = t.txtinput.text + i.toString()),
                    (s = !1);
                }),
                a.on('mouseout', n, function() {
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
        var r = (o = e.getChildByName('clear')).getChildByName('s');
        r.alpha = 0;
        var s = !1;
        o.on('mousedown', this, function() {
          (r.alpha = 0),
            (s = !0),
            Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, !0, !0);
        }),
          o.on('mouseup', this, function() {
            Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0),
              s && (t.txtinput.text = ''),
              (s = !1);
          }),
          o.on('mouseout', this, function() {
            Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, !0, !0), (s = !1);
          });
        var o = e.getChildByName('del'),
          l = o.getChildByName('s');
        l.alpha = 0;
        var h = !1;
        o.on('mousedown', this, function() {
          (l.alpha = 0),
            (h = !0),
            Laya.Tween.to(l, { alpha: 1 }, 50, null, null, 0, !0, !0);
        }),
          o.on('mouseup', this, function() {
            if (
              (Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, !0, !0), h)
            ) {
              var e = t.txtinput.text;
              e.length > 0 && (e = e.substr(0, e.length - 1)),
                (t.txtinput.text = e);
            }
            h = !1;
          }),
          o.on('mouseout', this, function() {
            Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, !0, !0), (h = !1);
          });
      }),
      (i.prototype._show = function() {
        var e = this;
        (this.enable = !0),
          (this.txtinput.text = ''),
          this.locking ||
            ((this.locking = !0),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e.locking = !1;
              })
            ));
      }),
      (i.prototype._hide = function() {
        var e = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = !1), (e.enable = !1);
            })
          );
      }),
      (i.prototype._btnAddRoom = function() {
        var e = this;
        this.locking ||
          (this._hide(),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'joinRoom',
            { room_id: parseInt(this.txtinput.text) },
            function(i, n) {
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
    );
  })(t.UIBase);
  t.UI_Add_Room = e;
})(uiscript || (uiscript = {}));