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
              ((e.btn.disabled = !0),
              app.NetAgent.sendReq2Lobby('Lobby', 'cancelMatch', {}, (i, n) => {
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
      const n = this;
      this.state == e.none
        ? ((this.enable = !1), i.runWith(!0))
        : this.state == e.during
        ? app.NetAgent.sendReq2Lobby('Lobby', 'cancelMatch', {}, (e, a) => {
            e || a.error
              ? (t.UIMgr.Inst.showNetReqError('cancelMatch', e, a),
                i.runWith(!1))
              : ((n.enable = !1), i.runWith(!0), n.close());
          })
        : this.state == e.success && i.runWith(!1);
    }),
    (n.prototype.show = function(i) {
      const n = this;
      (this.enable = !0),
        (this.locking = !0),
        (this.btn.disabled = !1),
        (this.root.scaleX = this.root.scaleY = 1),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
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
      (this.locking = !0),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.enable = !1);
          })
        );
    }),
    (n.prototype.onDisable = function() {
      Laya.timer.clearAll(this);
    }),
    (n.prototype.onGameStart = function({connect_token, game_uuid, location}) {
      (this.state = e.success),
        (this.enable = !1),
        (t.UI_Lobby.Inst.enable = !1),
        game.MJNetMgr.Inst.OpenConnect(
          connect_token,
          game_uuid,
          location,
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
  ;
  })(t.UIBase);
  t.UI_PiPei = i;
})(uiscript || (uiscript = {}));