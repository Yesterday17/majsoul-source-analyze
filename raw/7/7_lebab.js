let uiscript;
!(t => {
  const e = (() => {
    function e(e) {
      (this.me = e),
        (this.img_head = new t.UI_Character_Skin(e.getChildAt(0))),
        (this.img_emo = this.img_head.me.getChildAt(0));
    }
    return Object.defineProperty(e.prototype, 'id', {
      get() {
        return this._id;
      },
      set(t) {
        (this._id = t), this.img_head.setSkin(t, 'smallhead');
      },
      enumerable: true,
      configurable: true
    }),
    (e.prototype.setEmo = function(t, e) {
      const i = this;
      undefined === e && (e = -1),
        Laya.timer.clearAll(this),
        this.img_emo &&
          (t && '' != t
            ? ((this.img_emo.visible = true),
              e > 0 &&
                Laya.timer.once(e, this, () => {
                  i.img_emo.visible = false;
                }))
            : (this.img_emo.visible = false));
    }),
    e
  ;
  })();
  t.UI_Head = e;
})(uiscript || (uiscript = {}));