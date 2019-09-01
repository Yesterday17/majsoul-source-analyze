var uiscript;
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
                ((e.btn.disabled = true),
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
            false
          )),
          (this.btn.disabled = false);
      }),
      (n.prototype.tryToClose = function(i) {
        var n = this;
        this.state == e.none
          ? ((this.enable = false), i.runWith(true))
          : this.state == e.during
          ? app.NetAgent.sendReq2Lobby('Lobby', 'cancelMatch', {}, function(
              e,
              a
            ) {
              e || a.error
                ? (t.UIMgr.Inst.showNetReqError('cancelMatch', e, a),
                  i.runWith(false))
                : ((n.enable = false), i.runWith(true), n.close());
            })
          : this.state == e.success && i.runWith(false);
      }),
      (n.prototype.show = function(i) {
        var n = this;
        (this.enable = true),
          (this.locking = true),
          (this.btn.disabled = false),
          (this.root.scaleX = this.root.scaleY = 1),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              n.locking = false;
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
        (this.locking = true),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = false), (e.enable = false);
            })
          );
      }),
      (n.prototype.onDisable = function() {
        Laya.timer.clearAll(this);
      }),
      (n.prototype.onGameStart = function(i) {
        (this.state = e.success),
          (this.enable = false),
          (t.UI_Lobby.Inst.enable = false),
          game.MJNetMgr.Inst.OpenConnect(
            i.connect_token,
            i.game_uuid,
            i.location,
            false,
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