var uiscript;
!(function(t) {
  (t.GRAY_FILTER = [
    0.3086,
    0.6094,
    0.082,
    0,
    0,
    0.3086,
    0.6094,
    0.082,
    0,
    0,
    0.3086,
    0.6094,
    0.082,
    0,
    0,
    0,
    0,
    0,
    1,
    0
  ]),
    (t.DARK_FILTER = [
      0.3,
      0,
      0,
      0,
      0,
      0,
      0.3,
      0,
      0,
      0,
      0,
      0,
      0.3,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ]);
  var e = (function() {
    function e() {
      (this._root = null),
        (this._mj_root = null),
        (this._lobby_root = null),
        (this._both_root = null),
        (this._common_root = null),
        (this._error_root = null),
        (this._mj_inited = !1),
        (this._lobby_inited = !1),
        (this._uis = new Array()),
        (this._lobby_uis = []),
        (this._mj_uis = []),
        (this._common_uis = []),
        (this._both_uis = []),
        (this._ui_chipenghu = null),
        (this._ui_desktop = null),
        (this._ui_liqizimo = null),
        (this._ui_win = null),
        (this._ui_gameend = null),
        (this._ui_liuju = null),
        (this._ui_lobby = null),
        (this._ui_entrance = null),
        (this._ui_waitingroom = null),
        (this._ui_preventaddiction = null),
        (this._ui_scale = -1);
    }
    return (
      (e.prototype.init = function() {
        (e.Inst = this),
          (this._root = new Laya.Sprite()),
          GameMgr.Inst.addUI(this._root),
          this._root.addChild((this._lobby_root = new Laya.Sprite())),
          this._root.addChild((this._mj_root = new Laya.Sprite())),
          this._root.addChild(
            (GameMgr.Inst.root_front_scene_effect = new Laya.Sprite())
          ),
          this._root.addChild((this._both_root = new Laya.Sprite())),
          this._root.addChild((this._common_root = new Laya.Sprite())),
          this._root.addChild((this._error_root = new Laya.Sprite())),
          (this._ui_scale = -1),
          this.RefreshShow(),
          Laya.timer.frameLoop(1, this, this.RefreshShow);
      }),
      (e.prototype.openLobbyUI = function(e, i) {
        var n = this;
        this._lobby_inited
          ? (i && i.runWith(1), e && e.run())
          : game.Scene_Lobby.Inst.addLoadListenter(
              Laya.Handler.create(this, function() {
                (n._lobby_inited = !0),
                  n.AddLobbyUI((n._ui_lobby = new t.UI_Lobby())),
                  n.AddBothUI(new t.UI_XinShouYinDao()),
                  n.AddLobbyUI((n._ui_waitingroom = new t.UI_WaitingRoom())),
                  n.AddLobbyUI(new t.UI_PaiPu()),
                  n.AddLobbyUI(new t.UI_Sushe()),
                  n.AddLobbyUI(new t.UI_Ob()),
                  n.AddLobbyUI(new t.UI_Shop()),
                  n.AddLobbyUI(new t.UI_Friend()),
                  n.AddLobbyUI(new t.UI_Recharge()),
                  n.AddLobbyUI(new t.UI_Create_Room()),
                  n.AddLobbyUI(new t.UI_Bag()),
                  n.AddLobbyUI(new t.UI_Match_Lobby()),
                  n.AddLobbyUI(new t.UI_Match_Room()),
                  n.AddLobbyUI(new t.UI_Treasure()),
                  n.AddLobbyUI(new t.UI_TanfangRoot()),
                  n.AddLobbyUI(new t.UI_Skin_Yulan()),
                  n.AddLobbyUI(new t.UI_PiPeiYuYue()),
                  n.AddLobbyUI(new t.UI_Shop_Skin_Yulan()),
                  n.AddLobbyUI(new t.UI_Shop_Pack_Detail()),
                  n.AddLobbyUI(new t.UI_PlayerInfo()),
                  n.AddLobbyUI(new t.UI_Introduce()),
                  n.AddLobbyUI(new t.UI_TitleBook()),
                  n.AddLobbyUI(new t.UI_Activity()),
                  n.AddLobbyUI(new t.UI_Rank()),
                  n.AddLobbyUI(new t.UI_NumberInput()),
                  n.AddLobbyUI(new t.UI_OpenBox()),
                  n.AddLobbyUI(new t.UI_PiPei()),
                  n.AddLobbyUI(new t.UI_WaitOb()),
                  n.AddLobbyUI(new t.UI_Change_Nickname()),
                  n.AddLobbyUI(new t.UI_Info()),
                  n.AddLobbyUI(new t.UI_PiPeiChengGong()),
                  n.AddLobbyUI(new t.UI_checkhuiyu()),
                  n.AddLobbyUI(new t.UI_Agepending()),
                  n.AddLobbyUI(new t.UI_Ageconfirm()),
                  n.AddLobbyUI(new t.UI_Agesuccess()),
                  n.AddLobbyUI(new t.UI_Agexiane()),
                  n.AddLobbyUI(new t.UI_Get_Character()),
                  n.AddBothUI(new t.UI_Character_star_up()),
                  n.AddBothUI(new t.UI_Config()),
                  n.AddBothUI(new t.UI_Need_Bind_Mail()),
                  n.AddBothUI(new t.UI_Bind_Mail0()),
                  n.AddBothUI(new t.UI_Bind_Mail1()),
                  n.AddBothUI(new t.UI_Giftcode()),
                  n.AddBothUI(new t.UI_Rules()),
                  n.AddBothUI(new t.UI_OtherPlayerInfo()),
                  n.AddBothUI(new t.UI_Gettitle()),
                  n.AddBothUI(new t.UI_Getrewardextends()),
                  n.AddBothUI(new t.UI_GetReward2()),
                  n.AddBothUI(new t.UI_ItemDetail()),
                  n.AddBothUI(new t.UI_InfoLite_Title()),
                  n.AddBothUI(new t.UI_InfoLite()),
                  n.AddBothUI(new t.UI_SecondConfirm()),
                  n.AddBothUI(new t.UI_Popout()),
                  n.AddBothUI(new t.UI_Invite()),
                  n.AddBothUI(new t.UI_LightTips()),
                  n.AddBothUI(new t.UI_FlyTips()),
                  n.AddCommonUI(new t.UI_ShiMingRenZheng()),
                  n.AddCommonUI(new t.UI_Reconnect()),
                  n.AddCommonUI(new t.UI_Hanguplogout()),
                  n.AddCommonUI(new t.UI_AnotherLogin()),
                  n.AddCommonUI(new t.UI_Disconnect()),
                  n.AddCommonUI(new t.UI_RollNotice()),
                  n.AddCommonUI(new t.UI_CloseApp()),
                  t.UI_Loading.Inst.me.parent.setChildIndex(
                    t.UI_Loading.Inst.me,
                    t.UI_Loading.Inst.me.parent.numChildren - 2
                  ),
                  t.UI_CloseApp.Inst.me.parent.setChildIndex(
                    t.UI_CloseApp.Inst.me,
                    t.UI_CloseApp.Inst.me.parent.numChildren - 1
                  ),
                  Laya.timer.frameOnce(6, n, function() {
                    e && e.run();
                  });
              }),
              i
            );
      }),
      (e.prototype.openMjDesktopUI = function(e, i) {
        var n = this;
        this._mj_inited
          ? (i && i.runWith(1), e && e.run())
          : game.LoadMgr.loadRes(
              game.E_LoadType.ui_mj,
              Laya.Handler.create(this, function() {
                (n._mj_inited = !0),
                  n.AddMJUI(new t.UI_Live_Broadcast()),
                  n.AddMJUI(new t.UI_ReplayWheel()),
                  n.AddMJUI((n._ui_desktop = new t.UI_DesktopInfo())),
                  n.AddMJUI((n._ui_chipenghu = new t.UI_ChiPengHu())),
                  n.AddMJUI((n._ui_liqizimo = new t.UI_LiQiZiMo())),
                  n.AddMJUI(new t.UI_TingPai()),
                  n.AddMJUI((n._ui_liuju = new t.UI_LiuJu())),
                  n.AddMJUI(new t.UI_Huleshow()),
                  n.AddMJUI(new t.UI_Replay()),
                  n.AddMJUI(new t.UI_Info_MD5()),
                  n.AddMJUI(new t.UI_Hangup_Warn()),
                  n.AddMJUI((n._ui_win = new t.UI_Win())),
                  n.AddMJUI((n._ui_gameend = new t.UI_GameEnd())),
                  n.AddMJUI(new t.UI_RankChange()),
                  n.AddMJUI(new t.UI_ScoreChange()),
                  n.AddMJUI(new t.UI_MJReward()),
                  n.AddMJUI(new t.UI_MJTask_Progress()),
                  n.AddMJUI(new t.UI_MJReward_Activity()),
                  n.AddMJUI(new t.UI_GameStop()),
                  (n._mj_root.visible = !1),
                  Laya.timer.frameOnce(6, n, function() {
                    e && e.run();
                  });
              }),
              i
            );
      }),
      (e.prototype.disableMouse = function() {
        (this._mj_root.mouseEnabled = !1), (this._lobby_root.mouseEnabled = !1);
      }),
      (e.prototype.enableMouse = function() {
        (this._mj_root.mouseEnabled = !0), (this._lobby_root.mouseEnabled = !0);
      }),
      (e.prototype.closeUIWithTag_Lobby = function() {
        for (var e = 0; e < this._lobby_uis.length; e++)
          this._lobby_uis[e] !== t.UI_PiPeiYuYue.Inst &&
            this._lobby_uis[e] !== t.UI_PiPeiChengGong.Inst &&
            this._lobby_uis[e] &&
            this._lobby_uis[e].enable &&
            (this._lobby_uis[e].enable = !1);
      }),
      (e.prototype.closeUIWithTag_Both = function() {
        for (var e = 0; e < this._both_uis.length; e++)
          this._both_uis[e] &&
            this._both_uis[e].enable &&
            (this._both_uis[e].enable = !1);
        t.UI_ShiMingRenZheng.Inst &&
          t.UI_ShiMingRenZheng.Inst.enable &&
          (t.UI_ShiMingRenZheng.Inst.enable = !1);
      }),
      (e.prototype.showLobby = function() {
        (this._lobby_root.visible = !0),
          t.UI_Ob.Inst.enable ||
            t.UI_PaiPu.Inst.enable ||
            (t.UI_Lobby.Inst.enable = !0);
      }),
      (e.prototype.intoMJDesktop = function() {
        this._lobby_root.visible = !1;
      }),
      (e.prototype.onSceneMJ_Enable = function() {
        (this._mj_root.visible = !0),
          this.CloseLiuJu(),
          this.CloseWin(),
          this.CloseChipenghu(),
          this.CloseLiqiZimo();
      }),
      (e.prototype.onSceneMJ_Disable = function() {
        (this._mj_root.visible = !1),
          (t.UI_Replay.Inst.enable = !1),
          (t.UI_Live_Broadcast.Inst.enable = !1);
      }),
      (e.prototype.onSceneLobby_Enable = function() {
        this._lobby_root.visible = !0;
      }),
      (e.prototype.onSceneLobby_Disable = function() {
        this._lobby_root.visible = !1;
      }),
      (e.prototype.showRemind = function() {
        null == t.UI_Remind.Inst
          ? (this.AddLobbyUI(new t.UI_Remind()),
            Laya.timer.frameOnce(5, this, function() {
              t.UI_Remind.Inst &&
                !t.UI_Remind.Inst.me.destroyed &&
                (t.UI_Remind.Inst.enable = !0);
            }))
          : (t.UI_Remind.Inst.enable = !0);
      }),
      (e.prototype.showEntrance = function() {
        var e = this;
        null == this._ui_entrance
          ? Laya.timer.frameOnce(1, this, function() {
              e.AddCommonUI(new t.UI_Entrance_Reset_Password()),
                e.AddCommonUI(new t.UI_Entrance_Mail_Regist()),
                'chs' == GameMgr.client_language
                  ? null == t.UI_User_Xieyi.Inst &&
                    e.AddCommonUI(new t.UI_User_Xieyi())
                  : null == t.UI_User_Xieyi_enjp.Inst &&
                    (e.AddCommonUI(new t.UI_User_Xieyi()),
                    e.AddCommonUI(new t.UI_User_Xieyi_enjp())),
                e.AddCommonUI(new t.UI_Entrance_Maintenance()),
                e.AddCommonUI(new t.UI_Entrance_Prohibition()),
                e.AddCommonUI(new t.UI_Entrance_Choose_Route()),
                e.AddCommonUI(new t.UI_Add2Desktop()),
                e.AddCommonUI(new t.UI_Entrance_Error()),
                null == t.UI_Loading.Inst && e.AddCommonUI(new t.UI_Loading()),
                null == t.UI_Common.Inst &&
                  (e.AddCommonUI(new t.UI_Common()),
                  Laya.timer.frameOnce(5, e, function() {
                    GameMgr.inRelease || (t.UI_Common.Inst.enable = !0);
                  })),
                t.UI_Remind.Inst && t.UI_Remind.Inst.setprocess(10),
                e.AddLobbyUI((e._ui_entrance = new t.UI_Entrance())),
                Laya.timer.frameOnce(5, e, function() {
                  e._ui_entrance.show();
                  var i =
                    'res/atlas' +
                    ('chs' == GameMgr.client_language
                      ? ''
                      : '/' + GameMgr.client_language) +
                    '/myres/start_show.atlas';
                  Laya.loader.clearTextureRes(i),
                    null != t.UI_Remind.Inst && t.UI_Remind.Inst.destroy();
                });
            })
          : (this._ui_entrance.enable = !0);
      }),
      (e.prototype.ShowChipenghu = function(t) {
        this._ui_chipenghu && this._ui_chipenghu.show(t);
      }),
      (e.prototype.CloseChipenghu = function() {
        this._ui_chipenghu && (this._ui_chipenghu.enable = !1);
      }),
      (e.prototype.ShowLiqiZimo = function(t) {
        this._ui_liqizimo.show(t);
      }),
      (e.prototype.CloseLiqiZimo = function() {
        this._ui_liqizimo.enable = !1;
      }),
      (e.prototype.ShowWin = function(t, e) {
        this._ui_win.show(t, e);
      }),
      (e.prototype.CloseWin = function() {
        this._ui_win.enable = !1;
      }),
      (e.prototype.ShowPreventAddiction = function() {
        var e = this;
        null == this._ui_preventaddiction &&
          (this.AddCommonUI(
            (this._ui_preventaddiction = new t.UI_PreventAddiction())
          ),
          Laya.timer.frameOnce(10, this, function() {
            e._ui_preventaddiction.enable = !0;
          }));
      }),
      (e.prototype.ShowLiuJu = function(t) {
        this._ui_liuju.Show(t);
      }),
      (e.prototype.CloseLiuJu = function() {
        this._ui_liuju.enable = !1;
      }),
      (e.prototype.ShowGameEnd = function() {
        this._ui_gameend.show();
      }),
      (e.prototype.ShowWaitingRoom = function() {
        this._ui_waitingroom.show();
      }),
      (e.prototype.ShowErrorInfo = function(e) {
        var i = new t.UI_ErrorInfo();
        this._error_root.addChild(i.me),
          Laya.timer.frameOnce(10, this, function() {
            i.showStr(e);
          });
      }),
      (e.prototype.showNetReqError = function(e, i, n) {
        var a = new t.UI_ErrorInfo();
        this._error_root.addChild(a.me),
          Laya.timer.frameOnce(5, this, function() {
            a.showNetReqError(e, i, n);
          });
      }),
      (e.prototype.showFE = function() {
        var e = new t.UI_ErrorInfo();
        this._error_root.addChild(e.me),
          Laya.timer.frameOnce(5, this, function() {
            e.showFE();
          });
      }),
      (e.prototype.RefreshShow = function() {
        var t = Laya.stage.height / 1080;
        if (Math.abs(t - this._ui_scale) > 0.01) {
          this._ui_scale = t;
          var e = 0.5 * (Laya.stage.width - 1920 * t);
          this._root.scale(t, t), (this._root.x = e);
        }
      }),
      (e.prototype.onUIDestory = function(t) {
        var e = [];
        e.push(this._uis),
          e.push(this._lobby_uis),
          e.push(this._mj_uis),
          e.push(this._both_uis),
          e.push(this._common_uis);
        for (var i = 0; i < e.length; i++)
          for (var n = 0; n < e[i].length; n++) {
            if (e[i][n] === t) {
              (e[i][n] = e[i][e[i].length - 1]), e.pop();
              break;
            }
          }
      }),
      (e.prototype.AddLobbyUI = function(t) {
        this._lobby_root.addChild(t.me),
          this._uis.push(t),
          this._lobby_uis.push(t);
      }),
      (e.prototype.AddMJUI = function(t) {
        this._mj_root.addChild(t.me), this._uis.push(t), this._mj_uis.push(t);
      }),
      (e.prototype.AddBothUI = function(t) {
        this._both_root.addChild(t.me),
          this._uis.push(t),
          this._both_uis.push(t);
      }),
      (e.prototype.AddCommonUI = function(t) {
        this._common_root.addChild(t.me),
          this._uis.push(t),
          this._common_uis.push(t);
      }),
      (e.prototype.getWorldPosition = function(t, e) {
        var i = new Laya.Point(t.x + e.x, t.y + e.y);
        if (t && t !== this._root)
          for (t = t.parent; t && t !== this._root; )
            (i = t.toParentPoint(i)), (t = t.parent);
        return (i.x /= 1920), (i.y /= 1080), i;
      }),
      (e.Inst = null),
      e
    );
  })();
  t.UIMgr = e;
})(uiscript || (uiscript = {}));