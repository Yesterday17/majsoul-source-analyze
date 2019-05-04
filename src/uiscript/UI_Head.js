class UI_Head {
  constructor(e) {
    this.me = e;
    this.img_head = new uiscript.UI_Character_Skin(e.getChildAt(0));
    this.img_emo = this.img_head.me.getChildAt(0);
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
    this.img_head.setSkin(id, "smallhead");
  }

  setEmo(t, e) {
    const _this = this;
    if (e === undefined) {
      e = -1;
    }

    Laya.timer.clearAll(this);

    if (this.img_emo) {
      if (t && t != "") {
        this.img_emo.visible = true;

        if (e > 0) {
          Laya.timer.once(e, this, () => {
            _this.img_emo.visible = false;
          });
        }
      } else {
        this.img_emo.visible = false;
      }
    }
  }
}

export default uiscript => (uiscript.UI_Head = UI_Head);
