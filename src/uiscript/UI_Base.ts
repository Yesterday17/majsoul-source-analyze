// 97
/// <reference path="../LayaAir.d.ts" />

var uiscript;
(uiscript => {
  class UIBase {
    _me: laya.ui.View = null;
    _enable = false;
    _valid = false;

    constructor(view: laya.ui.View) {
      if (view) {
        this._me = view;
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

    set enable(e) {
      if (this._valid && this._enable != e) {
        this._enable = e;
        this._me.visible = e;
        e ? this._onEnable() : this._onDisable();
      }
    }

    _onload() {
      this._valid = true;
      this.onCreate();
      this.me.frameLoop(1, this, this._update);
    }

    _update() {
      if (this.enable) {
        this.update();
      }
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
        uiscript.UIMgr.Inst.onUIDestory(this);
      }
    }

    onCreate() {}
    onEnable() {}
    update() {}
    onDisable() {}
    onDestroy() {}

    static anim_pop_out(target, e) {
      target.alpha = 0;
      const scaleX = target.scaleX;
      const scaleY = target.scaleY;
      target.scaleX = 0.6 * scaleX;
      target.scaleY = 0.6 * scaleY;
      Laya.Tween.to(
        target,
        { alpha: 1, scaleX, scaleY },
        150,
        Laya.Ease.backOut,
        Laya.Handler.create(target, () => {
          target.scaleX = scaleX;
          target.scaleY = scaleY;
          target.alpha = 1;
          if (e) {
            e.run();
          }
        })
      );
    }

    static anim_pop_hide(target, e) {
      target.alpha = 1;
      const scaleX = target.scaleX;
      const scaleY = target.scaleY;
      Laya.Tween.to(
        target,
        { alpha: 0, scaleX: 0.6 * scaleX, scaleY: 0.6 * scaleY },
        150,
        Laya.Ease.backOut,
        Laya.Handler.create(target, () => {
          target.scaleX = scaleX;
          target.scaleY = scaleY;
          target.alpha = 0;
          if (e) {
            e.run();
          }
        })
      );
    }

    static anim_alpha_in(
      target,
      properties,
      duration,
      delay = 0,
      completeHandler = null,
      ease = null
    ) {
      const props: any = {};
      for (const key in properties) {
        props[key] = target[key];
        target[key] += properties[key];
      }
      target.alpha = 0;
      props.alpha = 1;
      Laya.Tween.to(target, props, duration, ease, completeHandler, delay);
    }

    static anim_alpha_out(
      target,
      props,
      duration,
      delay = 0,
      a = null,
      ease = null
    ) {
      const s = {};
      for (const key in props) {
        s[key] = target[key];
        props[key] += target[key];
      }
      props.alpha = 0;
      Laya.Tween.to(
        target,
        props,
        duration,
        ease,
        Laya.Handler.create(target, () => {
          for (const key in props) {
            target[key] = s[key];
          }
          target.alpha = 0;
          if (a) {
            a.run();
          }
        }),
        delay
      );
    }
  }
  uiscript.UIBase = UIBase;
})(uiscript || (uiscript = {}));
