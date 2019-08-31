var uiscript;
!(function(t) {
  var e = (function() {
    function e(e) {
      (this.me = e),
        (this.img_head = new t.UI_Character_Skin(e.getChildAt(0))),
        (this.img_emo = this.img_head.me.getChildAt(0));
    }
    return (
      Object.defineProperty(e.prototype, 'id', {
        get: function() {
          return this._id;
        },
        set: function(t) {
          (this._id = t), this.img_head.setSkin(t, 'smallhead');
        },
        enumerable: !0,
        configurable: !0
      }),
      (e.prototype.setEmo = function(t, e) {
        var i = this;
        void 0 === e && (e = -1),
          Laya.timer.clearAll(this),
          this.img_emo &&
            (t && '' != t
              ? ((this.img_emo.visible = !0),
                e > 0 &&
                  Laya.timer.once(e, this, function() {
                    i.img_emo.visible = !1;
                  }))
              : (this.img_emo.visible = !1));
      }),
      e
    );
  })();
  t.UI_Head = e;
})(uiscript || (uiscript = {}));