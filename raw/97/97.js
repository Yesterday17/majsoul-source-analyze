var uiscript;
!(function(t) {
  var e = (function() {
    function e(t) {
      (this._me = null),
        (this._enable = false),
        (this._valid = false),
        (this._enable = this._valid = false),
        t
          ? ((this._me = t),
            (this._me.visible = false),
            this._me.frameOnce(4, this, this._onload))
          : console.error('加载UI失败');
    }
    return (
      Object.defineProperty(e.prototype, 'me', {
        get: function() {
          return this._me;
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(e.prototype, 'enable', {
        get: function() {
          return this._valid && this._enable;
        },
        set: function(t) {
          this._valid &&
            this._enable != t &&
            ((this._enable = t),
            (this._me.visible = t),
            t ? this._onEnable() : this._onDisable());
        },
        enumerable: true,
        configurable: true
      }),
      (e.prototype._onload = function() {
        (this._valid = true),
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
          (this.enable = false),
          this.onDestroy(),
          (this._valid = false),
          this._me.destroy(true),
          t.UIMgr.Inst.onUIDestory(this));
      }),
      (e.prototype.onCreate = function() {}),
      (e.prototype.onEnable = function() {}),
      (e.prototype.update = function() {}),
      (e.prototype.onDisable = function() {}),
      (e.prototype.onDestroy = function() {}),
      (e.anim_pop_out = function(t, e) {
        t.alpha = 0;
        var i = t.scaleX,
          n = t.scaleY;
        (t.scaleX = 0.6 * i),
          (t.scaleY = 0.6 * n),
          Laya.Tween.to(
            t,
            { alpha: 1, scaleX: i, scaleY: n },
            150,
            Laya.Ease.backOut,
            Laya.Handler.create(t, function() {
              (t.scaleX = i), (t.scaleY = n), (t.alpha = 1), e && e.run();
            })
          );
      }),
      (e.anim_pop_hide = function(t, e) {
        t.alpha = 1;
        var i = t.scaleX,
          n = t.scaleY;
        Laya.Tween.to(
          t,
          { alpha: 0, scaleX: 0.6 * i, scaleY: 0.6 * n },
          150,
          Laya.Ease.backOut,
          Laya.Handler.create(t, function() {
            (t.scaleX = i), (t.scaleY = n), (t.alpha = 0), e && e.run();
          })
        );
      }),
      (e.anim_alpha_in = function(t, e, i, n, a, r) {
        undefined === n && (n = 0),
          undefined === a && (a = null),
          undefined === r && (r = null);
        var s = {};
        for (var o in e) (s[o] = t[o]), (t[o] += e[o]);
        (t.alpha = 0), (s.alpha = 1), Laya.Tween.to(t, s, i, r, a, n);
      }),
      (e.anim_alpha_out = function(t, e, i, n, a, r) {
        undefined === n && (n = 0),
          undefined === a && (a = null),
          undefined === r && (r = null);
        var s = {};
        for (var o in e) (s[o] = t[o]), (e[o] += t[o]);
        (e.alpha = 0),
          Laya.Tween.to(
            t,
            e,
            i,
            r,
            Laya.Handler.create(t, function() {
              for (var i in e) t[i] = s[i];
              (t.alpha = 0), a && a.run();
            }),
            n
          );
      }),
      e
    );
  })();
  t.UIBase = e;
})(uiscript || (uiscript = {}));