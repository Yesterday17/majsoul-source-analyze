var uiscript;
!(function(t) {
  var e = (function() {
      function e(e, n) {
        var a = this;
        (this.me = e),
          (e.visible = false),
          (this.me.x = 543),
          (this.me.y = -260),
          (this.data = n),
          Laya.timer.frameOnce(5, this, function() {
            (a.locking = true),
              (a.me.visible = true),
              Laya.Tween.to(
                a.me,
                { y: -44 },
                150,
                Laya.Ease.strongInOut,
                Laya.Handler.create(a, function() {
                  a.locking = false;
                })
              ),
              (a.me.getChildByName('name').text = n.nickname);
            var e = '';
            'en' == GameMgr.client_language
              ? (e += 'Room:')
              : (e += game.Tools.room_mode_desc(n.mode.mode)) && (e += ':'),
              (e += n.room_id.toString()),
              (a.me.getChildByName('room').text = e),
              (a.me.getChildByName('banned').clickHandler = Laya.Handler.create(
                a,
                function() {
                  a.locking || (i.addBanned(n.account_id), a.close());
                },
                null,
                false
              )),
              (a.me.getChildByName('cancel').clickHandler = Laya.Handler.create(
                a,
                function() {
                  a.locking || (i.onCancel(n.account_id), a.close());
                },
                null,
                false
              )),
              (a.me.getChildByName('join').clickHandler = Laya.Handler.create(
                a,
                function() {
                  if (!a.locking)
                    if (t.UI_PiPeiYuYue.Inst.enable)
                      t.UI_Popout.PopOutNoTitle(
                        game.Tools.strOfLocalization(204),
                        null
                      );
                    else {
                      if ((i.onCancel(n.account_id), game.Scene_MJ.Inst.active))
                        (GameMgr.Inst.beinvited_roomid = n.room_id),
                          game.Scene_MJ.Inst.ForceOut(),
                          t.UIMgr.Inst.closeUIWithTag_Lobby(),
                          t.UIMgr.Inst.closeUIWithTag_Both();
                      else {
                        var e = false,
                          r = Laya.Handler.create(
                            a,
                            function(i) {
                              i
                                ? app.NetAgent.sendReq2Lobby(
                                    'Lobby',
                                    'joinRoom',
                                    { room_id: n.room_id },
                                    function(i, n) {
                                      i || n.error
                                        ? (t.UIMgr.Inst.showNetReqError(
                                            'joinRoom',
                                            i,
                                            n
                                          ),
                                          e && (t.UI_Lobby.Inst.enable = true))
                                        : (t.UIMgr.Inst.closeUIWithTag_Lobby(),
                                          t.UIMgr.Inst.closeUIWithTag_Both(),
                                          t.UI_WaitingRoom.Inst.updateData(
                                            n.room
                                          ),
                                          t.UIMgr.Inst.ShowWaitingRoom());
                                    }
                                  )
                                : e && (t.UI_Lobby.Inst.enable = true);
                            },
                            null,
                            false
                          );
                        t.UI_WaitingRoom.Inst.enable
                          ? ((e = true), t.UI_WaitingRoom.Inst.tryToClose(r))
                          : t.UI_PiPei.Inst.enable
                          ? t.UI_PiPei.Inst.tryToClose(r)
                          : r.runWith(true);
                      }
                      a.close();
                    }
                },
                null,
                false
              )),
              Laya.timer.once(
                n.time + 18e4 - Laya.timer.currTimer,
                a,
                function() {
                  a.locking || (a.close(), i.onCancel(n.account_id));
                }
              );
          });
      }
      return (
        (e.prototype.close = function() {
          var t = this;
          (this.locking = true),
            Laya.Tween.to(
              this.me,
              { y: -260 },
              150,
              Laya.Ease.strongOut,
              Laya.Handler.create(this, function() {
                (t.locking = false), i.Inst.onBlockClose(t);
              })
            );
        }),
        (e.prototype.destory = function() {
          (this.me.visible = false),
            this.me.destroy(true),
            Laya.timer.clearAll(this),
            Laya.Tween.clearAll(this);
        }),
        e
      );
    })(),
    i = (function(i) {
      function n() {
        var t = i.call(this, new ui.both_ui.inviteUI()) || this;
        return (t.templete = null), (t._blocks = null), (n.Inst = t), t;
      }
      return (
        __extends(n, i),
        (n.onNewInvite = function(e) {
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
            this._invites.push(a), this.Inst.enable && this.Inst.popout(a);
          }
        }),
        (n.addBanned = function(t) {
          (this._banneds[t.toString()] = Laya.timer.currTimer),
            this.onCancel(t);
        }),
        (n.onCancel = function(t) {
          for (var e = 0; e < this._invites.length; e++)
            if (this._invites[e].account_id == t) {
              for (var i = e; i < this._invites.length - 1; i++)
                this._invites[i] = this._invites[i + 1];
              this._invites.pop();
              break;
            }
        }),
        (n.prototype.onCreate = function() {
          (this.templete = this.me.getChildByName('templete')),
            (this.templete.visible = false);
        }),
        (n.prototype.onEnable = function() {
          this._blocks = [];
          for (var t = n._invites, e = [], i = 0; i < t.length; i++)
            Laya.timer.currTimer < t[i].time + 12e4 && e.push(t[i]);
          t = n._invites = e;
          for (i = 0; i < t.length; i++) this.popout(t[i]);
        }),
        (n.prototype.onDisable = function() {
          for (var t = 0; t < this._blocks.length; t++)
            this._blocks[t].destory();
          this._blocks = [];
        }),
        (n.prototype.popout = function(t) {
          if (t.mode && t.room_id) {
            for (var i = [], n = 0; n < this._blocks.length; n++)
              this._blocks[n].data.account_id == t.account_id &&
                i.push(this._blocks[n]);
            for (n = 0; n < i.length; n++) this.onBlockClose(i[n]);
            var a = this.templete.scriptMap['capsui.UICopy'].getNodeClone();
            this._blocks.push(new e(a, t));
          }
        }),
        (n.prototype.onBlockClose = function(t) {
          for (var e = 0; e < this._blocks.length; e++)
            if (t === this._blocks[e]) {
              (this._blocks[e] = this._blocks[this._blocks.length - 1]),
                t.destory(),
                this._blocks.pop();
              break;
            }
        }),
        (n._invites = []),
        (n._banneds = {}),
        n
      );
    })(t.UIBase);
  t.UI_Invite = i;
})(uiscript || (uiscript = {}));