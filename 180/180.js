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
  var e = (() => {
    class e {
      constructor(e, n) {
        var a = this;
        this.me = e;
        e.visible = !1;
        this.me.x = 543;
        this.me.y = -260;
        this.data = n;
        Laya.timer.frameOnce(5, this, () => {
          a.locking = !0;
          a.me.visible = !0;

          Laya.Tween.to(
            a.me,
            { y: -44 },
            150,
            Laya.Ease.strongInOut,
            Laya.Handler.create(a, () => {
              a.locking = !1;
            })
          );

          a.me.getChildByName('name').text = n.nickname;
          var e = '';

          'en' == GameMgr.client_language
            ? (e += 'Room:')
            : (e += game.Tools.room_mode_desc(n.mode.mode)) && (e += ':');

          e += n.room_id.toString();
          a.me.getChildByName('room').text = e;

          a.me.getChildByName('banned').clickHandler = Laya.Handler.create(
              a,
              () => {
                i.addBanned(n.account_id);
                a.locking || (a.close());
              },
              null,
              !1
            );

          a.me.getChildByName('cancel').clickHandler = Laya.Handler.create(
              a,
              () => {
                i.onCancel(n.account_id);
                a.locking || (a.close());
              },
              null,
              !1
            );

          a.me.getChildByName('join').clickHandler = Laya.Handler.create(
              a,
              () => {
                if (!a.locking)
                  if (t.UI_PiPeiYuYue.Inst.enable)
                    t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    );
                  else {
                    i.onCancel(n.account_id);
                    GameMgr.Inst.beinvited_roomid = n.room_id;
                    game.Scene_MJ.Inst.ForceOut();
                    t.UIMgr.Inst.closeUIWithTag_Lobby();
                    if ((game.Scene_MJ.Inst.active))
                      t.UIMgr.Inst.closeUIWithTag_Both();
                    else {
                      var e = !1,
                        r = Laya.Handler.create(
                          a,
                          i => {
                            i
                              ? app.NetAgent.sendReq2Lobby(
                                  'Lobby',
                                  'joinRoom',
                                  { room_id: n.room_id },
                                  (i, n) => {
                                    t.UIMgr.Inst.showNetReqError(
                                          'joinRoom',
                                          i,
                                          n
                                        );

                                    t.UIMgr.Inst.closeUIWithTag_Lobby();
                                    t.UIMgr.Inst.closeUIWithTag_Both();

                                    t.UI_WaitingRoom.Inst.updateData(
                                      n.room
                                    );

                                    i || n.error
                                      ? (e && (t.UI_Lobby.Inst.enable = !0))
                                      : (t.UIMgr.Inst.ShowWaitingRoom());
                                  }
                                )
                              : e && (t.UI_Lobby.Inst.enable = !0);
                          },
                          null,
                          !1
                        );
                      e = !0;
                      t.UI_WaitingRoom.Inst.enable
                        ? (t.UI_WaitingRoom.Inst.tryToClose(r))
                        : t.UI_PiPei.Inst.enable
                        ? t.UI_PiPei.Inst.tryToClose(r)
                        : r.runWith(!0);
                    }
                    a.close();
                  }
              },
              null,
              !1
            );

          Laya.timer.once(
            n.time + 18e4 - Laya.timer.currTimer,
            a,
            () => {
              a.close();
              a.locking || (i.onCancel(n.account_id));
            }
          );
        });
      }

      close() {
        var t = this;
        this.locking = !0;
        Laya.Tween.to(
          this.me,
          { y: -260 },
          150,
          Laya.Ease.strongOut,
          Laya.Handler.create(this, () => {
            t.locking = !1;
            i.Inst.onBlockClose(t);
          })
        );
      }

      destory() {
        this.me.visible = !1;
        this.me.destroy(!0);
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
      }
    }

    return e;
  })();

  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this, new ui.both_ui.inviteUI()) || this;
        t.templete = null;
        t._blocks = null;
        n.Inst = t;
        return t;
      }

      static onNewInvite(e) {
        var i = JSON.parse(e),
          n = i.account_id;
        if (
          !(
            (this._banneds.hasOwnProperty(n.toString()) &&
              Laya.timer.currTimer < this._banneds[n.toString()] + 3e5) ||
            (t.UI_WaitingRoom.Inst &&
              t.UI_WaitingRoom.Inst.enable &&
              t.UI_WaitingRoom.Inst.room_id == i.room_id) ||
            t.UI_PiPeiChengGong.Inst.enable
          )
        ) {
          for (
            var a = {
                time: Laya.timer.currTimer,
                room_id: i.room_id,
                mode: i.mode,
                account_id: i.account_id,
                nickname: i.nickname
              },
              r = 0;
            r < this._invites.length;
            r++
          )
            if (this._invites[r].account_id == n) {
              for (var s = r; s < this._invites.length - 1; s++)
                this._invites[s] = this._invites[s + 1];
              this._invites.pop();
              break;
            }
          this._invites.push(a);
          this.Inst.enable && this.Inst.popout(a);
        }
      }

      static addBanned(t) {
        this._banneds[t.toString()] = Laya.timer.currTimer;
        this.onCancel(t);
      }

      static onCancel(t) {
        for (var e = 0; e < this._invites.length; e++)
          if (this._invites[e].account_id == t) {
            for (var i = e; i < this._invites.length - 1; i++)
              this._invites[i] = this._invites[i + 1];
            this._invites.pop();
            break;
          }
      }

      onCreate() {
        this.templete = this.me.getChildByName('templete');
        this.templete.visible = !1;
      }

      onEnable() {
        this._blocks = [];
        for (var t = n._invites, e = [], i = 0; i < t.length; i++)
          Laya.timer.currTimer < t[i].time + 12e4 && e.push(t[i]);
        t = n._invites = e;
        for (i = 0; i < t.length; i++) this.popout(t[i]);
      }

      onDisable() {
        for (var t = 0; t < this._blocks.length; t++)
          this._blocks[t].destory();
        this._blocks = [];
      }

      popout(t) {
        if (t.mode && t.room_id) {
          for (var i = [], n = 0; n < this._blocks.length; n++)
            this._blocks[n].data.account_id == t.account_id &&
              i.push(this._blocks[n]);
          for (n = 0; n < i.length; n++) this.onBlockClose(i[n]);
          var a = this.templete.scriptMap['capsui.UICopy'].getNodeClone();
          this._blocks.push(new e(a, t));
        }
      }

      onBlockClose(t) {
        for (var e = 0; e < this._blocks.length; e++)
          if (t === this._blocks[e]) {
            this._blocks[e] = this._blocks[this._blocks.length - 1];
            t.destory();
            this._blocks.pop();
            break;
          }
      }
    }

    __extends(n, i);

    n._invites = [];
    n._banneds = {};
    return n;
  })(t.UIBase);

  t.UI_Invite = i;
})(uiscript || (uiscript = {}));