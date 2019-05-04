module.exports = function(uiscript) {
  var newHead = (function() {
    function head(e) {
      this.me = e;
      this.img_head = new uiscript.UI_Character_Skin(e.getChildAt(0));
      this.img_emo = this.img_head.me.getChildAt(0);
    }

    Object.defineProperty(head.prototype, "id", {
      get: function() {
        return this._id;
      },
      set: function(id) {
        this._id = id;
        this.img_head.setSkin(id, "smallhead");
      },
      enumerable: true,
      configurable: true
    });

    head.prototype.setEmo = function(t, e) {
      var _this = this;
      if (e === undefined) {
        e = -1;
      }

      Laya.timer.clearAll(this);

      if (this.img_emo) {
        if (t && t != "") {
          this.img_emo.visible = true;

          if (e > 0) {
            Laya.timer.once(e, this, function() {
              _this.img_emo.visible = false;
            });
          }
        } else {
          this.img_emo.visible = false;
        }
      }
    };
    return head;
  })();
  uiscript.UI_Head = newHead;
};
