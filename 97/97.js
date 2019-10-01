var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(t) {
        this._me = null;
        this._enable = !1;
        this._valid = !1;
        this._enable = this._valid = !1;
        this._me = t;
        this._me.visible = !1;
        t
          ? (this._me.frameOnce(4, this, this._onload))
          : console.error('加载UI失败');
      }

      get me() {
        return this._me;
      }

      get enable() {
        return this._valid && this._enable;
      }

      set enable(t) {
        this._enable = t;
        this._me.visible = t;
        this._valid &&
          this._enable != t &&
          ((t ? this._onEnable() : this._onDisable()));
      }

      _onload() {
        this._valid = !0;
        this.onCreate();
        this.me.frameLoop(1, this, this._update);
      }

      _update() {
        this.enable && this.update();
      }

      _onEnable() {
        this.me.event('onenable');
        this._valid && (this.onEnable());
      }

      _onDisable() {
        this.me.event('ondisable');
        this._valid && (this.onDisable());
      }

      destroy() {
        Laya.timer.clearAll(this);
        this.enable = !1;
        this.onDestroy();
        this._valid = !1;
        this._me.destroy(!0);
        this._valid &&
          (t.UIMgr.Inst.onUIDestory(this));
      }

      onCreate() {}
      onEnable() {}
      update() {}
      onDisable() {}
      onDestroy() {}
    }

    e.anim_pop_out = (t, e) => {
      t.alpha = 0;
      var i = t.scaleX;
      var n = t.scaleY;
      t.scaleX = 0.6 * i;
      t.scaleY = 0.6 * n;
      Laya.Tween.to(
        t,
        { alpha: 1, scaleX: i, scaleY: n },
        150,
        Laya.Ease.backOut,
        Laya.Handler.create(t, () => {
          t.scaleX = i;
          t.scaleY = n;
          t.alpha = 1;
          e && e.run();
        })
      );
    };

    e.anim_pop_hide = (t, e) => {
      t.alpha = 1;
      var i = t.scaleX;
      var n = t.scaleY;
      Laya.Tween.to(
        t,
        { alpha: 0, scaleX: 0.6 * i, scaleY: 0.6 * n },
        150,
        Laya.Ease.backOut,
        Laya.Handler.create(t, () => {
          t.scaleX = i;
          t.scaleY = n;
          t.alpha = 0;
          e && e.run();
        })
      );
    };

    e.anim_alpha_in = (t, e, i, n, a, r) => {
      void 0 === n && (n = 0);
      void 0 === a && (a = null);
      void 0 === r && (r = null);
      var s = {};
      s[o] = t[o];
      for (var o in e) t[o] += e[o];
      t.alpha = 0;
      s.alpha = 1;
      Laya.Tween.to(t, s, i, r, a, n);
    };

    e.anim_alpha_out = (t, e, i, n, a, r) => {
      void 0 === n && (n = 0);
      void 0 === a && (a = null);
      void 0 === r && (r = null);
      var s = {};
      s[o] = t[o];
      for (var o in e) e[o] += t[o];
      e.alpha = 0;
      Laya.Tween.to(
        t,
        e,
        i,
        r,
        Laya.Handler.create(t, () => {
          for (var i in e) t[i] = s[i];
          t.alpha = 0;
          a && a.run();
        }),
        n
      );
    };

    return e;
  })();
  t.UIBase = e;
})(uiscript || (uiscript = {}));