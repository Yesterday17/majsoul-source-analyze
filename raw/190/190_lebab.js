let uiscript;
!(t => {
  let e;
  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.during = 1)] = 'during'),
      (t[(t.success = 2)] = 'success');
  })(e || (e = {}));
  const i = (i => {
    function n() {
      const t = i.call(this, new ui.lobby.pipeiUI()) || this;
      return (t.state = e.none),
      (n.Inst = t),
      app.NetAgent.AddListener2Lobby(
        'NotifyRoomGameStart',
        Laya.Handler.create(t, e => {
          t.enable &&
            (app.Log.log(`NotifyRoomGameStart:${JSON.stringify(e)}`),
            t.onGameStart(e));
        })
      ),
      t
    ;
    }
    return __extends(n, i),
    (n.prototype.onCreate = function() {
      const e = this;
      (this.root = this.me.getChildByName('root')),
        (this.info = this.root.getChildByName('text')),
        (this.title = this.root.getChildByName('ttt')),
        (this.btn = this.root.getChildByName('btn')),
        (this.btn.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              ((e.btn.disabled = true),
              app.NetAgent.sendReq2Lobby('Lobby', 'cancelMatch', {}, (i, n) => {
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
      const n = this;
      this.state == e.none
        ? ((this.enable = false), i.runWith(true))
        : this.state == e.during
        ? app.NetAgent.sendReq2Lobby('Lobby', 'cancelMatch', {}, (e, a) => {
            e || a.error
              ? (t.UIMgr.Inst.showNetReqError('cancelMatch', e, a),
                i.runWith(false))
              : ((n.enable = false), i.runWith(true), n.close());
          })
        : this.state == e.success && i.runWith(false);
    }),
    (n.prototype.show = function(i) {
      const n = this;
      (this.enable = true),
        (this.locking = true),
        (this.btn.disabled = false),
        (this.root.scaleX = this.root.scaleY = 1),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = false;
          })
        ),
        Laya.timer.clearAll(this);
      let a = 0;
      (this.state = e.none),
        Laya.timer.loop(1e3, this, () => {
          let t = game.Tools.strOfLocalization(2151);
          a = (a + 1) % 4;
          for (let e = 0; e < a; e++) t += '.';
          n.info.text = t;
        }),
        Laya.timer.once(300, this, () => {
          (n.state = e.during),
            n.enable &&
              !n.locking &&
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'matchGame',
                { match_mode: i },
                (i, a) => {
                  (i || a.error) &&
                    (t.UIMgr.Inst.showNetReqError('matchGame', i, a),
                    n.close(),
                    (n.state = e.none));
                }
              );
        });
    }),
    (n.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    (n.prototype.onDisable = function() {
      Laya.timer.clearAll(this);
    }),
    (n.prototype.onGameStart = function({connect_token, game_uuid, location}) {
      (this.state = e.success),
        (this.enable = false),
        (t.UI_Lobby.Inst.enable = false),
        game.MJNetMgr.Inst.OpenConnect(
          connect_token,
          game_uuid,
          location,
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
  ;
  })(t.UIBase);
  t.UI_PiPei = i;
})(uiscript || (uiscript = {}));