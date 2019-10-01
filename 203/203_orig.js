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
  var e;
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.during = 1)] = 'during'),
      (t[(t.success = 2)] = 'success');
  })(e || (e = {}));
  var i = (function(i) {
    function n() {
      var t = i.call(this, new ui.lobby.pipeiUI()) || this;
      return (
        (t.state = e.none),
        (n.Inst = t),
        app.NetAgent.AddListener2Lobby(
          'NotifyRoomGameStart',
          Laya.Handler.create(t, function(e) {
            t.enable &&
              (app.Log.log('NotifyRoomGameStart:' + JSON.stringify(e)),
              t.onGameStart(e));
          })
        ),
        t
      );
    }
    return (
      __extends(n, i),
      (n.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.info = this.root.getChildByName('text')),
          (this.title = this.root.getChildByName('ttt')),
          (this.btn = this.root.getChildByName('btn')),
          (this.btn.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                ((e.btn.disabled = !0),
                app.NetAgent.sendReq2Lobby('Lobby', 'cancelMatch', {}, function(
                  i,
                  n
                ) {
                  i || n.error
                    ? t.UIMgr.Inst.showNetReqError('cancelMatch', i, n)
                    : e.close();
                }));
            },
            null,
            !1
          )),
          (this.btn.disabled = !1);
      }),
      (n.prototype.tryToClose = function(i) {
        var n = this;
        this.state == e.none
          ? ((this.enable = !1), i.runWith(!0))
          : this.state == e.during
          ? app.NetAgent.sendReq2Lobby('Lobby', 'cancelMatch', {}, function(
              e,
              a
            ) {
              e || a.error
                ? (t.UIMgr.Inst.showNetReqError('cancelMatch', e, a),
                  i.runWith(!1))
                : ((n.enable = !1), i.runWith(!0), n.close());
            })
          : this.state == e.success && i.runWith(!1);
      }),
      (n.prototype.show = function(i) {
        var n = this;
        (this.enable = !0),
          (this.locking = !0),
          (this.btn.disabled = !1),
          (this.root.scaleX = this.root.scaleY = 1),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              n.locking = !1;
            })
          ),
          Laya.timer.clearAll(this);
        var a = 0;
        (this.state = e.none),
          Laya.timer.loop(1e3, this, function() {
            var t = game.Tools.strOfLocalization(2151);
            a = (a + 1) % 4;
            for (var e = 0; e < a; e++) t += '.';
            n.info.text = t;
          }),
          Laya.timer.once(300, this, function() {
            (n.state = e.during),
              n.enable &&
                !n.locking &&
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'matchGame',
                  { match_mode: i },
                  function(i, a) {
                    (i || a.error) &&
                      (t.UIMgr.Inst.showNetReqError('matchGame', i, a),
                      n.close(),
                      (n.state = e.none));
                  }
                );
          });
      }),
      (n.prototype.close = function() {
        var e = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = !1), (e.enable = !1);
            })
          );
      }),
      (n.prototype.onDisable = function() {
        Laya.timer.clearAll(this);
      }),
      (n.prototype.onGameStart = function(i) {
        (this.state = e.success),
          (this.enable = !1),
          (t.UI_Lobby.Inst.enable = !1),
          game.MJNetMgr.Inst.OpenConnect(
            i.connect_token,
            i.game_uuid,
            i.location,
            !1,
            null
          );
      }),
      (n.prototype.onMatchTimeout = function(i) {
        this.close(),
          (this.state = e.none),
          t.UI_Popout.PopOutNoTitle(game.Tools.strOfLocalization(2152), null);
      }),
      (n.Inst = null),
      n
    );
  })(t.UIBase);
  t.UI_PiPei = i;
})(uiscript || (uiscript = {}));