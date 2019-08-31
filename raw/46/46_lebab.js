let game;
!(t => {
  const e = (() => {
    function e(i, n, a, r, s) {
      void 0 === s && (s = !1),
        (this.destoryed = !1),
        (this.target = i),
        (this.destoryed = !1),
        (this.pos_offset = a),
        (this.scale = r),
        (this.effect = new t.EffectBase(n, s)),
        e.effects.push(this),
        this._update();
    }
    return (e.regist = t => {
      e.effects.push(t);
    }),
    (e.update = function() {
      for (var t = 0, e = 0; e < this.effects.length; e++)
        this.effects[e].destoryed ||
          (this.effects[e]._update(), (this.effects[t++] = this.effects[e]));
      for (e = this.effects.length - t; e >= 0; e--) this.effects.pop();
    }),
    (e.prototype._update = function() {
      if (!this.destoryed && this.target) {
        const t = uiscript.UIMgr.Inst.getWorldPosition(
          this.target,
          this.pos_offset
        );
        (t.x = t.x - 0.5),
          (t.y = 0.5 - t.y),
          this.effect &&
            this.effect.root &&
            ((this.effect.root.transform.localPosition = new Laya.Vector3(
              t.x * i.scene_width,
              t.y * i.scene_height,
              0
            )),
            0 != this.scale
              ? (this.effect.root.transform.localScale = new Laya.Vector3(
                  this.target.scaleX * this.scale,
                  this.target.scaleY * this.scale,
                  1
                ))
              : (this.effect.root.transform.localScale = new Laya.Vector3(
                  1,
                  1,
                  1
                )));
      }
    }),
    (e.prototype.destory = function() {
      this.destoryed || ((this.destoryed = !0), this.effect.destory());
    }),
    (e.effects = []),
    e
  ;
  })();
  t.UIEffect = e;
  var i = (() => {
    function i() {
      (this._scene = null),
        (this._root = null),
        (this._scene2 = null),
        (this._root2 = null),
        (this._container_effect = null),
        (this._effect_click = null),
        (this._effects = {});
    }
    return Object.defineProperty(i.prototype, 'root', {
      get() {
        return this._root;
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(i.prototype, 'root2', {
      get() {
        return this._root2;
      },
      enumerable: !0,
      configurable: !0
    }),
    (i.init = function() {
      ((i.Inst = new i())._scene = Laya.loader.getRes(i.scene_path)),
        GameMgr.Inst.root_front_effect.addChild(i.Inst._scene),
        (i.Inst._root = i.Inst._scene.getChildByName('root')),
        (i.Inst._container_effect = i.Inst._scene.getChildByName(
          'container_effect'
        )),
        (i.Inst._effect_click = i.Inst._container_effect.getChildByName(
          'effect_click'
        )),
        (i.Inst._scene.visible = !0),
        Laya.stage.on(Laya.Event.MOUSE_DOWN, i.Inst, i.Inst.bangClickEffect),
        (this.Inst._scene2 = Laya.loader.getRes(i.scene2_path)),
        (this.Inst._root2 = this.Inst._scene2.getChildByName('root')),
        GameMgr.Inst.root_front_scene_effect.addChild(this.Inst._scene2),
        (this.Inst._scene2.visible = !0),
        Laya.timer.frameLoop(1, this, () => {
          e.update();
        });
    }),
    (i.prototype.bangClickEffect = function() {
      const e = Laya.MouseManager.instance.mouseX;
      const n = Laya.MouseManager.instance.mouseY;
      (!t.Scene_MJ.Inst.active ||
        (uiscript.UI_GameEnd.Inst && uiscript.UI_GameEnd.Inst.enable)) &&
        view.AudioMgr.PlayAudio(103);
      let a = 0;
      let r = 0;
      Laya.Browser.width / 1920 < Laya.Browser.height / 1080
        ? (r = (Laya.Browser.height - (Laya.Browser.width / 1920) * 1080) / 2)
        : (a =
            (Laya.Browser.width - (Laya.Browser.height / 1080) * 1920) / 2);

      const s =
          (e / (Laya.Browser.width - 2 * a)) * i.scene_width -
          i.scene_width / 2;

      const o =
        i.scene_height -
        (n / (Laya.Browser.height - 2 * r)) * i.scene_height -
        i.scene_height / 2;

      const l = this._effect_click.clone();
      this._root.addChild(l),
        (l.active = !1),
        (l.active = !0),
        (l.transform.localPosition = new Laya.Vector3(s, o, 1)),
        Laya.timer.once(1500, this, () => {
          l.destroy(!0);
        });
    }),
    (i.prototype.create_ui_effect = function(t, i, n, a, r) {
      void 0 === r && (r = !1);
      const s = new e(t, i, n, a, r);
      return this._root2.addChild(s.effect.root), s;
    }),
    (i.Inst = null),
    (i.scene_path = 'scene/front_effect.ls'),
    (i.scene2_path = 'scene/front_scene_effect.ls'),
    (i.scene_width = 32),
    (i.scene_height = 18),
    i
  ;
  })();
  t.FrontEffect = i;
})(game || (game = {}));