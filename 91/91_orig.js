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
  view;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this) || this;
      return (
        (t._choose_pai = null),
        (t._mouse_in_pai = null),
        (t._mouse_in_start_time = -1),
        (t.handpool = []),
        (t.hand = []),
        (t.during_liqi = !1),
        (t.effect_click = null),
        (t.trans_hand3D = null),
        (t.trans_hand3DCover = null),
        (t._hand3d = []),
        (t.can_discard = !1),
        (t.last_tile = null),
        (t._prediscard_index = -1),
        (t.mouse_downx = 0),
        (t.mouse_downy = 0),
        (t.mouse_downed = !1),
        (t.during_drag = !1),
        (t.click_on_choosed = !1),
        (t.zd = 0),
        (t.xianggonged = !1),
        (t.screen_left = -7.2),
        (t.screen_right = 44.4),
        (t.screen_top = 16.6),
        (t.screen_bottom = -1.4),
        (t.handrange_top = 2.5),
        (t.handorigin_x = 0),
        (t.handwidth = 2.55),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.Init = function(i, n, a, r, s, o, l) {
        e.prototype.Init.call(this, i, n, a, r, s, o, l);
        var h = a.getChildByName('pai');
        (this.effect_click = a.getChildByName('effect_dianji')),
          (a.active = !0),
          (h.active = !1);
        for (var c = 0; c < 16; c++) {
          var u = h.clone();
          this.trans_hand.addChild(u),
            (u.transform.localPosition = new Laya.Vector3(0, 0, 0)),
            (u.transform.localRotation = new Laya.Quaternion(0, 0, 0, 1)),
            (u.transform.localScale = new Laya.Vector3(1, 1, 1)),
            (u.active = !1);
          var _ = u.addComponent(t.HandPaiPlane);
          this.handpool.push(_);
        }
        (this.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3())),
          (this.phasorSprite3D = new Laya.PhasorSpriter3D()),
          (this.rayCastHit = new Laya.RaycastHit()),
          Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown),
          Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp),
          Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove),
          Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
      }),
      (i.prototype._AddHandPai = function(e) {
        var i = this.handpool.pop();
        return (
          i.Reset(),
          i.SetVal(e, !0),
          (i.z = this.zd),
          (this.zd -= 0.02),
          t.DesktopMgr.Inst.mode != t.EMJMode.play &&
            ((i.ispaopai = t.DesktopMgr.Inst.isPaoPai(i.val)),
            i.RefreshPaoPai()),
          this.hand.push(i),
          i
        );
      }),
      (i.prototype._OnRemovePai = function(t) {
        t === this._choose_pai &&
          ((this._choose_pai = null), this.resetMouseState());
      }),
      (i.prototype._RemovePai = function(t) {
        for (var e = 0; e < this.hand.length; e++)
          if (this.hand[e] === t) {
            for (var i = this.hand[e], n = e; n < this.hand.length - 1; n++)
              (this.hand[n] = this.hand[n + 1]),
                this.hand[n].SetIndex(n, !1, !0);
            this.hand.pop(),
              this._OnRemovePai(i),
              i.Reset(),
              this.handpool.push(i);
            break;
          }
      }),
      (i.prototype._RemoveHandPai = function(t) {
        for (var e = this.hand.length - 1; e >= 0; e--)
          if (mjcore.MJPai.isSame(t, this.hand[e].val)) {
            for (var i = this.hand[e], n = e; n < this.hand.length - 1; n++)
              (this.hand[n] = this.hand[n + 1]),
                this.hand[n].SetIndex(n, !1, !0);
            this.hand.pop(),
              this._OnRemovePai(i),
              i.Reset(),
              this.handpool.push(i);
            break;
          }
      }),
      (i.prototype.Reset = function() {
        e.prototype.Reset.call(this);
        for (t = 0; t < this.hand.length; t++)
          this.hand[t].Reset(), this.handpool.push(this.hand[t]);
        this.hand = [];
        for (var t = 0; t < this._hand3d.length; t++) this._hand3d[t].Destory();
        (this._hand3d = []),
          (this.zd = 0),
          (this.during_liqi = !1),
          (this.trans_hand3D.active = !1),
          (this.trans_hand3DCover.active = !1),
          (this.last_tile = null),
          (this.can_discard = !1),
          (this._choose_pai = null),
          (this._mouse_in_pai = null),
          (this.xianggonged = !1),
          this.resetMouseState(),
          Laya.timer.clearAll(this);
      }),
      (i.prototype.NewGame = function(e, i) {
        var n = this;
        if ((this.Reset(), this.RefreshDir(), i)) {
          for (r = 0; r < e.length; r++) {
            this._AddHandPai(e[r]).SetIndex(r, 14 == r, !1);
          }
          this.pendingXiangGong(14 == this.hand.length, 'NewGame fast');
        } else {
          for (var a = [], r = 0; r < e.length; r++) {
            var s = Math.floor(Math.random() * r);
            a.push(a[s]), (a[s] = e[r]);
          }
          for (var o = 0, r = 0; r < 4; r++)
            Laya.timer.once(300 * r, this, function() {
              for (var e = 0; e < 4 && o != a.length; e++) {
                o++;
                var i = n._AddHandPai(a[o - 1]);
                i.SetIndex(o - 1, !1, !1), i.AnimNewTile();
              }
              t.AudioMgr.PlayAudio(216);
            });
          Laya.timer.once(1200, this, function() {
            n.LiPai(),
              (n.last_tile = n.hand[n.hand.length - 1]),
              14 == n.hand.length &&
                n.hand[n.hand.length - 1].SetIndex(n.hand.length - 1, !0, !1),
              n.pendingXiangGong(14 == n.hand.length, 'NewGame No fast');
          });
        }
        Laya.timer.frameLoop(1, this, this.update);
      }),
      (i.prototype.RecordNewGame = function(t) {
        this.Reset(), this.RefreshDir();
        for (var e = 0; e < t.length; e++) {
          this._AddHandPai(t[e]).SetIndex(e, 14 == e, !1);
        }
        this.pendingXiangGong(14 == this.hand.length, 'RecordNewGame'),
          Laya.timer.frameLoop(1, this, this.update);
      }),
      (i.prototype.TakePai = function(t, e) {
        void 0 === e && (e = !0),
          app.Log.log('ViewPlayer_Me TakePai ' + t.toString() + ' doanim:' + e);
        try {
          var i = this._AddHandPai(t);
          i.SetIndex(this.hand.length - 1, !0, !1),
            e && i.AnimNewTile(),
            (this.last_tile = i),
            this.pendingXiangGong(!0, 'TakePai');
        } catch (t) {
          var n = {};
          (n.error = t.message),
            (n.stack = t.stack),
            (n.method = 'TakePai'),
            (n.name = 'ViewPlayer_Me'),
            GameMgr.Inst.onFatalError(n);
        }
        app.Log.log('ViewPlayer_Me TakePai end');
      }),
      (i.prototype.onBabei = function(t, e) {
        this.OnDiscardTile(t, e);
      }),
      (i.prototype.OnDiscardTile = function(t, e) {
        app.Log.log(
          'ViewPlayer_Me OnDiscardTile ' + t.toString() + ' fast:' + e
        );
        try {
          if (
            this._prediscard_index >= 0 &&
            this._prediscard_index < this.hand.length
          ) {
            this.hand[this._prediscard_index].val;
            mjcore.MJPai.isSame(this.hand[this._prediscard_index].val, t)
              ? this._RemovePai(this.hand[this._prediscard_index])
              : ((this.hand[this._prediscard_index].mySelf.active = !0),
                this._RemoveHandPai(t));
          } else this._RemoveHandPai(t);
          this.LiPai(e),
            (this.last_tile = null),
            (this._prediscard_index = -1),
            this.pendingXiangGong(!1, 'OnDiscardTile');
        } catch (t) {
          var i = {};
          (i.error = t.message),
            (i.stack = t.stack),
            (i.method = 'OnDiscardTile'),
            (i.name = 'ViewPlayer_Me OnDiscardTile'),
            GameMgr.Inst.onFatalError(i);
        }
      }),
      (i.prototype.AddGang = function(t, i) {
        void 0 === i && (i = !0),
          app.Log.log('ViewPlayer_Me AddGang ' + t.toString() + ' doanim:' + i);
        try {
          e.prototype.AddGang.call(this, t, i),
            this._RemoveHandPai(t),
            this.LiPai(),
            (this.last_tile = null),
            this.pendingXiangGong(!1, 'AddGang');
        } catch (t) {
          var n = {};
          (n.error = t.message),
            (n.stack = t.stack),
            (n.method = 'AddGang'),
            (n.class = 'ViewPlayer_Me'),
            GameMgr.Inst.onFatalError(n);
        }
      }),
      (i.prototype.LiPai = function(e) {
        void 0 === e && (e = !1);
        for (i = 0; i < this.hand.length; i++) this.hand[i].SelectEnd();
        if (
          t.DesktopMgr.Inst.auto_liqi ||
          t.DesktopMgr.Inst.mode != t.EMJMode.play
        ) {
          this.hand.sort(t.HandPaiPlane.Cmp);
          for (var i = 0; i < this.hand.length; i++)
            this.hand[i].SetIndex(i, !1, !e),
              t.DesktopMgr.Inst.mode != t.EMJMode.play &&
                this.hand[i].RefreshPaoPai();
        }
      }),
      (i.prototype.AddMing = function(t, e) {
        void 0 === e && (e = !0),
          app.Log.log('ViewPlayer_Me AddMing ' + t.toString() + ' doanim:' + e);
        try {
          for (var i = 0; i < t.pais.length; i++)
            t.from[i] == this.seat && this._RemoveHandPai(t.pais[i]);
          this.container_ming.AddMing(t, e),
            this.LiPai(),
            (this.last_tile = null),
            this.pendingXiangGong(
              t.type == mjcore.E_Ming.kezi || t.type == mjcore.E_Ming.shunzi,
              'AddMing'
            );
        } catch (t) {
          var n = {};
          (n.error = t.message),
            (n.stack = t.stack),
            (n.method = 'AddMing'),
            (n.class = 'ViewPlayer_Me'),
            GameMgr.Inst.onFatalError(n);
        }
      }),
      (i.prototype.ChiTiSelect = function(t) {
        for (var e = 0; e < this.hand.length; e++) this.hand[e].ChiTiSelect(t);
      }),
      (i.prototype.LiQiSelect = function(t, e) {
        this.during_liqi = e;
        for (var i = 0; i < this.hand.length; i++)
          e ? this.hand[i].LiqiSelect(t) : this.hand[i].SelectEnd();
      }),
      (i.prototype.HulePrepare = function(e, i, n) {
        app.Log.log('ViewPlayer_Me HulePrepare ' + i.toString() + ' zimo:' + n);
        try {
          uiscript.UI_DesktopInfo.Inst.setZhenting(!1);
          for (r = 0; r < this.hand.length; r++) this.hand[r].Hule();
          for (var a = [], r = 0; r < e.length; r++) {
            var s = new t.HandPai3D(this.trans_hand3D);
            s.SetVal(e[r]), s.SetIndex(r, !1), s.Stand(), a.push(s);
          }
          (this._hand3d = a), (this.trans_hand3D.active = !0);
        } catch (t) {
          var o = {};
          (o.error = t.message),
            (o.stack = t.stack),
            (o.method = 'HulePrepare'),
            (o.class = 'ViewPlayer_Me'),
            GameMgr.Inst.onFatalError(o);
        }
      }),
      (i.prototype.Hule = function(e, i, n, a) {
        var r = this;
        if (
          (app.Log.log('ViewPlayer_Me Hule ' + i.toString() + ' zimo:' + n), n)
        ) {
          var s = new t.HandPai3D(this.trans_hand3D);
          s.SetVal(i),
            s.SetIndex(this._hand3d.length, !0),
            this._hand3d.push(s),
            s.FullDown(),
            (s.shadow.active = !1),
            (s.model.transform.localPosition.z += 0.15 * t.PAIMODEL_HEIGHT);
          var o = s.pai3D.model.transform.position.clone();
          (this.hand3d.transform.position = o.clone()),
            this.hand3d
              .getChildAt(0)
              .getChildByName('node_tile')
              .addChild(s.pai3D.model),
            (s.pai3D.model.transform.localPosition = new Laya.Vector3(0, 0, 0)),
            (s.pai3D.model.transform.localScale = new Laya.Vector3(
              1.1111,
              1.1111,
              1.1111
            )),
            (s.pai3D.model.transform.localRotationEuler = new Laya.Vector3(
              0,
              0,
              0
            ));
          var l = t.ModelAnimationController.get_anim_config(
            'Zimo',
            this.hand_type
          );
          this.playHandAnimtion(l),
            Laya.timer.once(l.keypoint[0], this, function() {
              t.AudioMgr.PlayAudio(227);
            }),
            Laya.timer.once(l.keypoint[1], this, function() {
              s.contianer_pai.addChild(s.pai3D.model),
                (s.pai3D.model.transform.localScale = new Laya.Vector3(
                  1,
                  1,
                  1
                )),
                (s.pai3D.model.transform.localRotationEuler = new Laya.Vector3(
                  0,
                  180,
                  0
                )),
                s.FullDown(),
                Laya.timer.once(100, r, function() {
                  return t.DesktopMgr.Inst.ShowHuleEffect(
                    s,
                    s.pai3D.model.transform.position,
                    t.DesktopMgr.Inst.player_effects[r.seat].effect_hupai
                  );
                });
            });
        }
        var h = this._hand3d.length - (n ? 1 : 0),
          c = n ? 1100 : 200;
        Laya.timer.once(c, this, function() {
          if (0 != r._hand3d.length) {
            t.AudioMgr.PlayAudio(223);
            for (var e = 0; e < h; e++) r._hand3d[e].DoAnim_FullDown();
          }
        }),
          (this.trans_hand3D.active = !0);
      }),
      (i.prototype.Huangpai = function(e, i, n) {
        var a = this;
        app.Log.log('ViewPlayer_Me Huangpai  tingpai:' + e + ' fast:' + n),
          uiscript.UI_DesktopInfo.Inst.setZhenting(!1);
        for (o = 0; o < this.hand.length; o++) this.hand[o].Hule();
        for (
          var r = [], s = e ? this.trans_hand3D : this.trans_hand3DCover, o = 0;
          o < this.hand.length;
          o++
        ) {
          var l = new t.HandPai3D(s);
          l.SetVal(this.hand[o].val), l.SetIndex(o, !1), l.Stand(), r.push(l);
        }
        var h = r.length;
        if (n)
          for (o = 0; o < h; o++)
            e ? this._hand3d[o].FullDown() : this._hand3d[o].Cover();
        else
          Laya.timer.once(500, this, function() {
            for (var i = 0; i < h; i++)
              e ? a._hand3d[i].DoAnim_FullDown() : a._hand3d[i].DoAnim_Cover();
            t.AudioMgr.PlayAudio(223);
          });
        (this._hand3d = r), (s.active = !0);
      }),
      (i.prototype.OnDoraRefresh = function() {
        if (-1 != this.seat) {
          e.prototype.OnDoraRefresh.call(this);
          for (var t = 0; t < this.hand.length; t++) this.hand[t].RefreshDora();
        }
      }),
      (i.prototype.DoDiscardTile = function() {
        if ((app.Log.log('ViewPlayer_Me DoDiscardTile'), this.during_liqi)) {
          if (
            !this.desktop.Action_LiQi(
              this._choose_pai.val,
              this._choose_pai === this.last_tile
            )
          )
            return;
          this.during_liqi = !1;
        } else
          this.desktop.Action_QiPai(
            this._choose_pai.val,
            this._choose_pai === this.last_tile,
            !1
          );
        (this._prediscard_index = this._choose_pai.index),
          (this._choose_pai.mySelf.active = !1),
          (this._choose_pai = null),
          (this.can_discard = !1);
      }),
      (i.prototype.onShowPaopaiChange = function() {
        if (t.DesktopMgr.Inst.gameing)
          for (var e = 0; e < this.hand.length; e++)
            (this.hand[e].ispaopai = t.DesktopMgr.Inst.isPaoPai(
              this.hand[e].val
            )),
              this.hand[e].RefreshPaoPai();
      }),
      (i.prototype.pendingXiangGong = function(t, e) {
        if (!this.xianggonged)
          try {
            var i = 13 - 3 * this.container_ming.mings.length;
            t && i++;
            for (var n = !1, a = 0; a < this.hand.length; a++)
              if (this.hand[a].index != a) {
                n = !0;
                break;
              }
            for (var r = '', a = 0; a < this.hand.length; a++)
              0 != a && (r += ', '),
                (r +=
                  '[' +
                  a +
                  '|' +
                  this.hand[a].index +
                  ']' +
                  this.hand[a].val.toString());
            if (
              (app.Log.log('hands: ' + r),
              this.hand.length != i ||
                n ||
                this.hand.length + this.handpool.length != 16)
            ) {
              this.xianggonged = !0;
              var s = {};
              (s.from = e),
                (s.need_discard = t),
                (s.ming_count = this.container_ming.mings.length),
                (s.tile_count = i),
                (s.hand_length = this.hand.length),
                (s.index_error = n),
                (s.hands = r),
                (s.handpool_count = this.handpool.length),
                GameMgr.Inst.onXiangGongError(s);
            }
          } catch (t) {}
      }),
      (i.prototype.onDoubleClick = function() {
        this.can_discard &&
          (this.during_liqi ||
            (this.last_tile &&
              (t.DesktopMgr.Inst.timestoped ||
                (this.desktop.Action_QiPai(this.last_tile.val, !0, !1),
                (this._prediscard_index = this.hand.length - 1),
                (this.last_tile.mySelf.active = !1),
                (this._choose_pai = null),
                (this.can_discard = !1)))));
      }),
      (i.prototype.setChoosePai = function(e, i) {
        if (this._choose_pai !== e) {
          if (this._choose_pai && this._choose_pai != e) {
            var n = this._choose_pai.mySelf.transform.localPosition.clone();
            (n.y = 0),
              (this._choose_pai.mySelf.transform.localPosition = n),
              (this._choose_pai = null);
          }
          this._choose_pai = e;
          var a = this._choose_pai.mySelf.transform.localPosition.clone();
          (a.y = 0.8),
            (this._choose_pai.mySelf.transform.localPosition = a),
            i && e.AddClickEffect(this.effect_click.clone()),
            t.DesktopMgr.Inst.setChoosedPai(this._choose_pai.val),
            t.AudioMgr.PlayAudio(204);
        }
      }),
      (i.prototype.resetMouseState = function() {
        if (
          ((this._mouse_in_pai = null),
          (this.during_drag = !1),
          (this.mouse_downed = !1),
          (this.click_on_choosed = !1),
          this._choose_pai)
        ) {
          var e = this._choose_pai.mySelf.transform.localPosition.clone();
          (e.y = 0),
            (this._choose_pai.mySelf.transform.localPosition = e),
            (this._choose_pai = null);
        }
        t.DesktopMgr.Inst.setChoosedPai(null);
      }),
      (i.prototype.onMouseDown = function() {
        if (
          t.DesktopMgr.Inst.gameing &&
          !(
            (t.DesktopMgr.Inst.mode == t.EMJMode.play &&
              t.DesktopMgr.Inst.timestoped) ||
            uiscript.UI_Hangup_Warn.Inst.enable
          )
        ) {
          var e = this.getMouseInfo();
          e.pai
            ? (this._choose_pai === e.pai
                ? (this.click_on_choosed = !0)
                : (this.setChoosePai(e.pai, !0), (this.click_on_choosed = !1)),
              (this.mouse_downx = Laya.MouseManager.instance.mouseX),
              (this.mouse_downy = Laya.MouseManager.instance.mouseY),
              (this.mouse_downed = !0))
            : this.resetMouseState();
        }
      }),
      (i.prototype.onMouseMove = function() {
        if (
          t.DesktopMgr.Inst.mode == t.EMJMode.play &&
          (t.DesktopMgr.Inst.mode != t.EMJMode.play ||
            !t.DesktopMgr.Inst.timestoped) &&
          !uiscript.UI_Hangup_Warn.Inst.enable &&
          this._choose_pai &&
          this.mouse_downed
        ) {
          var e = Laya.MouseManager.instance.mouseX,
            i = Laya.MouseManager.instance.mouseY;
          (e - this.mouse_downx) * (e - this.mouse_downx) +
            (i - this.mouse_downy) * (i - this.mouse_downy) >
            400 && (this.during_drag = !0);
        }
      }),
      (i.prototype.onMouseUp = function() {
        if (
          t.DesktopMgr.Inst.gameing &&
          !(
            (t.DesktopMgr.Inst.mode == t.EMJMode.play &&
              t.DesktopMgr.Inst.timestoped) ||
            uiscript.UI_Hangup_Warn.Inst.enable
          )
        ) {
          var e = this.getMouseInfo();
          (this.mouse_downed = !1),
            this.during_drag
              ? ((this.during_drag = !1),
                null == this._choose_pai
                  ? this.resetMouseState()
                  : this.can_discard && !e.inHandRange && this._choose_pai.valid
                  ? (this.DoDiscardTile(), this.resetMouseState())
                  : this.resetMouseState())
              : this.click_on_choosed &&
                this.can_discard &&
                this._choose_pai.valid &&
                (this.DoDiscardTile(), this.resetMouseState());
        }
      }),
      (i.prototype.onMouseOut = function() {
        (this.mouse_downed = !1),
          (this.click_on_choosed = !1),
          this.during_drag && ((this.during_drag = !1), this.resetMouseState());
      }),
      (i.prototype.getMouseInfo = function() {
        var e = Laya.MouseManager.instance.mouseX,
          i = Laya.MouseManager.instance.mouseY,
          n = 0,
          a = 0;
        Laya.Browser.width / 1920 < Laya.Browser.height / 1080
          ? (a = (Laya.Browser.height - (Laya.Browser.width / 1920) * 1080) / 2)
          : (n =
              (Laya.Browser.width - (Laya.Browser.height / 1080) * 1920) / 2);
        var r =
            (e / (Laya.Browser.width - 2 * n)) *
              (this.screen_right - this.screen_left) +
            this.screen_left,
          s =
            (i / (Laya.Browser.height - 2 * a)) *
              (this.screen_bottom - this.screen_top) +
            this.screen_top,
          o = Math.floor((r - this.handorigin_x) / this.handwidth);
        o < 0 && (o = 0), o >= this.hand.length && (o = this.hand.length - 1);
        var l = null;
        return (
          game.Scene_MJ.Inst.camera_hand.viewportPointToRay(
            new Laya.Vector2(e, i),
            this.ray
          ),
          Laya.Physics.rayCast(this.ray, this.rayCastHit, 300),
          this.rayCastHit.sprite3D &&
            (l = this.rayCastHit.sprite3D.getComponentByType(t.HandPaiPlane)),
          { inHandRange: s < this.handrange_top, index: o, x: r, y: s, pai: l }
        );
      }),
      (i.prototype.update = function() {
        var e = this.getMouseInfo();
        if (this.during_drag)
          if (!t.DesktopMgr.Inst.gameing || t.DesktopMgr.Inst.timestoped)
            this.resetMouseState();
          else if (null == this._choose_pai) this.resetMouseState();
          else {
            if (
              !t.DesktopMgr.Inst.auto_liqi &&
              e.inHandRange &&
              e.index != this._choose_pai.index
            ) {
              if (e.index < this._choose_pai.index) {
                for (i = e.index; i < this._choose_pai.index; i++)
                  this.hand[i].SetIndex(i + 1, !1, !0);
                for (i = this._choose_pai.index; i > e.index; i--)
                  (this.hand[i] = this.hand[i - 1]),
                    this.hand[i].SetIndex(i, !1, !0);
              } else
                for (var i = this._choose_pai.index; i < e.index; i++)
                  (this.hand[i] = this.hand[i + 1]),
                    this.hand[i].SetIndex(i, !1, !0);
              (this.hand[e.index] = this._choose_pai),
                this._choose_pai.SetIndex(e.index, !1, !0);
            }
            this._choose_pai.mySelf.parent.setChildIndex(
              this._choose_pai.mySelf,
              this._choose_pai.mySelf.parent.numChildren - 1
            ),
              (this._choose_pai.mySelf.transform.localPosition = new Laya.Vector3(
                e.x,
                e.y,
                0.5
              ));
          }
        else if (!this.mouse_downed) {
          if (
            t.DesktopMgr.Inst.mode == t.EMJMode.play &&
            t.DesktopMgr.Inst.timestoped
          )
            return;
          if (uiscript.UI_Hangup_Warn.Inst.enable) return;
          if (
            Laya.Browser.onPC &&
            !GameMgr.inConch &&
            0 == t.DesktopMgr.click_prefer &&
            t.DesktopMgr.Inst.gameing
          )
            if (null == e.pai) this.resetMouseState();
            else if (this._mouse_in_pai && this._mouse_in_pai === e.pai) {
              Laya.timer.currTimer - this._mouse_in_start_time > 10 &&
                (this.setChoosePai(this._mouse_in_pai, !1),
                (this._mouse_in_pai = null));
            } else
              (this._mouse_in_pai = e.pai),
                (this._mouse_in_start_time = Laya.timer.currTimer);
        }
      }),
      (i.Inst = null),
      i
    );
  })(t.ViewPlayer);
  t.ViewPlayer_Me = e;
})(view || (view = {}));