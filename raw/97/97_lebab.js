let uiscript;
!(t => {
  const e = (() => {
    function e(t) {
      (this._me = null),
        (this._enable = !1),
        (this._valid = !1),
        (this._enable = this._valid = !1),
        t
          ? ((this._me = t),
            (this._me.visible = !1),
            this._me.frameOnce(4, this, this._onload))
          : console.error('加载UI失败');
    }
    return Object.defineProperty(e.prototype, 'me', {
      get() {
        return this._me;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(e.prototype, 'enable', {
      get() {
        return this._valid && this._enable;
      },
      set(t) {
        this._valid &&
          this._enable != t &&
          ((this._enable = t),
          (this._me.visible = t),
          t ? this._onEnable() : this._onDisable());
      },
      enumerable: !0,
      configurable: !0
    }),
    (e.prototype._onload = function() {
      (this._valid = !0),
        this.onCreate(),
        this.me.frameLoop(1, this, this._update);
    }),
    (e.prototype._update = function() {
      this.enable && this.update();
    }),
    (e.prototype._onEnable = function() {
      this._valid && (this.me.event('onenable'), this.onEnable());
    }),
    (e.prototype._onDisable = function() {
      this._valid && (this.me.event('ondisable'), this.onDisable());
    }),
    (e.prototype.destroy = function() {
      this._valid &&
        (Laya.timer.clearAll(this),
        (this.enable = !1),
        this.onDestroy(),
        (this._valid = !1),
        this._me.destroy(!0),
        t.UIMgr.Inst.onUIDestory(this));
    }),
    (e.prototype.onCreate = () => {}),
    (e.prototype.onEnable = () => {}),
    (e.prototype.update = () => {}),
    (e.prototype.onDisable = () => {}),
    (e.prototype.onDestroy = () => {}),
    (e.anim_pop_out = (t, e) => {
      t.alpha = 0;
      const i = t.scaleX;
      const n = t.scaleY;
      (t.scaleX = 0.6 * i),
        (t.scaleY = 0.6 * n),
        Laya.Tween.to(
          t,
          { alpha: 1, scaleX: i, scaleY: n },
          150,
          Laya.Ease.backOut,
          Laya.Handler.create(t, () => {
            (t.scaleX = i), (t.scaleY = n), (t.alpha = 1), e && e.run();
          })
        );
    }),
    (e.anim_pop_hide = (t, e) => {
      t.alpha = 1;
      const i = t.scaleX;
      const n = t.scaleY;
      Laya.Tween.to(
        t,
        { alpha: 0, scaleX: 0.6 * i, scaleY: 0.6 * n },
        150,
        Laya.Ease.backOut,
        Laya.Handler.create(t, () => {
          (t.scaleX = i), (t.scaleY = n), (t.alpha = 0), e && e.run();
        })
      );
    }),
    (e.anim_alpha_in = (t, e, i, n, a, r) => {
      void 0 === n && (n = 0),
        void 0 === a && (a = null),
        void 0 === r && (r = null);
      const s = {};
      for (const o in e) (s[o] = t[o]), (t[o] += e[o]);
      (t.alpha = 0), (s.alpha = 1), Laya.Tween.to(t, s, i, r, a, n);
    }),
    (e.anim_alpha_out = (t, e, i, n, a, r) => {
      void 0 === n && (n = 0),
        void 0 === a && (a = null),
        void 0 === r && (r = null);
      const s = {};
      for (const o in e) (s[o] = t[o]), (e[o] += t[o]);
      (e.alpha = 0),
        Laya.Tween.to(
          t,
          e,
          i,
          r,
          Laya.Handler.create(t, () => {
            for (const i in e) t[i] = s[i];
            (t.alpha = 0), a && a.run();
          }),
          n
        );
    }),
    e
  ;
  })();
  t.UIBase = e;
})(uiscript || (uiscript = {}));