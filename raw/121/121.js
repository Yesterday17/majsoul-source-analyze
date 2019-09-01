var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.add_roomUI()) || this;
      return (
        (t.txtinput = null), (t.locking = false), (t.root = null), (i.Inst = t), t
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
            false
          )),
          (this.root.getChildByName(
            'btn_create'
          ).clickHandler = Laya.Handler.create(
            this,
            this._btnAddRoom,
            null,
            false
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
              var s = false;
              a.on('mousedown', n, function() {
                (r.alpha = 0),
                  (s = true),
                  Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, true, true);
              }),
                a.on('mouseup', n, function() {
                  Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true),
                    s &&
                      t.txtinput.text.length < t.txtinput.maxChars &&
                      (t.txtinput.text = t.txtinput.text + i.toString()),
                    (s = false);
                }),
                a.on('mouseout', n, function() {
                  Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true),
                    (s = false);
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
        var s = false;
        o.on('mousedown', this, function() {
          (r.alpha = 0),
            (s = true),
            Laya.Tween.to(r, { alpha: 1 }, 50, null, null, 0, true, true);
        }),
          o.on('mouseup', this, function() {
            Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true),
              s && (t.txtinput.text = ''),
              (s = false);
          }),
          o.on('mouseout', this, function() {
            Laya.Tween.to(r, { alpha: 0 }, 50, null, null, 0, true, true), (s = false);
          });
        var o = e.getChildByName('del'),
          l = o.getChildByName('s');
        l.alpha = 0;
        var h = false;
        o.on('mousedown', this, function() {
          (l.alpha = 0),
            (h = true),
            Laya.Tween.to(l, { alpha: 1 }, 50, null, null, 0, true, true);
        }),
          o.on('mouseup', this, function() {
            if (
              (Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, true, true), h)
            ) {
              var e = t.txtinput.text;
              e.length > 0 && (e = e.substr(0, e.length - 1)),
                (t.txtinput.text = e);
            }
            h = false;
          }),
          o.on('mouseout', this, function() {
            Laya.Tween.to(l, { alpha: 0 }, 50, null, null, 0, true, true), (h = false);
          });
      }),
      (i.prototype._show = function() {
        var e = this;
        (this.enable = true),
          (this.txtinput.text = ''),
          this.locking ||
            ((this.locking = true),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e.locking = false;
              })
            ));
      }),
      (i.prototype._hide = function() {
        var e = this;
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = false), (e.enable = false);
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
                : ((e.enable = false),
                  (t.UI_Lobby.Inst.enable = false),
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