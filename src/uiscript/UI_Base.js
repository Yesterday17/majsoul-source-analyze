// 97

let uiscript;
!(t => {
  class UIBase {
    constructor(t) {
      this._me = null;
      this._enable = false;
      this._valid = false;
      this._enable = this._valid = false;

      if (t) {
        this._me = t;
        this._me.visible = false;
        this._me.frameOnce(4, this, this._onload);
      } else {
        console.error("加载UI失败");
      }
    }

    get me() {
      return this._me;
    }

    get enable() {
      return this._valid && this._enable;
    }

    set enable(t) {
      if (this._valid && this._enable != t) {
        this._enable = t;
        this._me.visible = t;
        t ? this._onEnable() : this._onDisable();
      }
    }

    _onload() {
      this._valid = true;
      this.onCreate();
      this.me.frameLoop(1, this, this._update);
    }

    _update() {
      this.enable && this.update();
    }

    _onEnable() {
      if (this._valid) {
        this.me.event("onenable");
        this.onEnable();
      }
    }

    _onDisable() {
      if (this._valid) {
        this.me.event("ondisable");
        this.onDisable();
      }
    }

    destroy() {
      if (this._valid) {
        Laya.timer.clearAll(this);
        this.enable = false;
        this.onDestroy();
        this._valid = false;
        this._me.destroy(true);
        t.UIMgr.Inst.onUIDestory(this);
      }
    }

    onCreate() {}
    onEnable() {}
    update() {}
    onDisable() {}
    onDestroy() {}
  }

  UIBase.anim_pop_out = (t, e) => {
    t.alpha = 0;
    const i = t.scaleX;
    const n = t.scaleY;
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

  UIBase.anim_pop_hide = (t, e) => {
    t.alpha = 1;
    const i = t.scaleX;
    const n = t.scaleY;
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

  UIBase.anim_alpha_in = (
    target,
    e,
    duration,
    delay,
    completeHandler,
    ease
  ) => {
    undefined === delay && (delay = 0);
    undefined === completeHandler && (completeHandler = null);
    undefined === ease && (ease = null);
    const props = {};
    for (const o in e) {
      props[o] = target[o];
      target[o] += e[o];
    }
    target.alpha = 0;
    props.alpha = 1;
    Laya.Tween.to(target, props, duration, ease, completeHandler, delay);
  };

  UIBase.anim_alpha_out = (t, e, i, n, a, r) => {
    undefined === n && (n = 0);
    undefined === a && (a = null);
    undefined === r && (r = null);
    const s = {};
    for (const o in e) (s[o] = t[o]), (e[o] += t[o]);
    e.alpha = 0;
    Laya.Tween.to(
      t,
      e,
      i,
      r,
      Laya.Handler.create(t, () => {
        for (const i in e) t[i] = s[i];
        t.alpha = 0;
        a && a.run();
      }),
      n
    );
  };
  t.UIBase = UIBase;
})(uiscript || (uiscript = {}));
