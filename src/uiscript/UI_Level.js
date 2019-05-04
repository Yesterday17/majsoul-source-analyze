class UI_Level {
  constructor(t) {
    this.stars = [];
    this._id = 0;
    this.level_v = null;
    this.level_vmax = null;
    this.level_bar = null;
    this.container_huntian = null;
    this.level_v_huntian = null;
    this.bgp = null;
    this.me = t;
    this.icon = t.getChildByName("icon");

    for (let i = 1; i <= 3; i++) {
      this.stars.push(t.getChildByName(`star${i}`).getChildAt(0));
    }
    this.container_exp = this.me.getChildByName("exp");
    if (this.container_exp) {
      this.level_v = this.container_exp.getChildByName("value");
      this.level_vmax = this.container_exp.getChildByName("max");
      this.level_bar = this.container_exp
        .getChildByName("bar")
        .getChildByName("v");
    }
    this.container_huntian = this.me.getChildByName("huntian");
    if (this.container_huntian) {
      this.level_v_huntian = this.container_huntian.getChildByName("value");
    }
    this.bgp = this.me.getChildByName("bgp");
  }

  set id(id) {
    let user = cfg.level_definition.level_definition.get(id);
    if (!user) {
      user = cfg.level_definition.level_definition.find(10201);
    }

    this._id = user.id;
    this.icon.skin = game.LoadMgr.getResImageSkin(user.primary_icon);
    if (id == 10601) {
      this.stars.forEach(({ parent }) => (parent.visible = false));
      if (this.container_huntian) {
        if (this.container_exp) this.container_exp.visible = false;
        this.container_huntian.visible = true;
      } else {
        if (this.container_exp) this.container_exp.visible = true;
        if (this.bgp) this.bgp.visible = true;
      }
    } else {
      this.stars.forEach(star => {
        star.visible = i < user.secondary_level;
        star.parent.visible = true;
      });
      if (this.container_huntian) this.container_huntian.visible = false;
      if (this.container_exp) this.container_exp.visible = true;
      if (this.bgp) this.bgp.visible = false;
    }
  }

  set exp(exp) {
    let user = cfg.level_definition.level_definition.get(this._id);
    if (this.level_v) this.level_v.text = Math.floor(exp).toString();
    if (this.level_vmax)
      this.level_vmax.text = Math.floor(user.end_point).toString();
    if (this.level_bar) {
      let i = exp / user.end_point;
      if (i < 0) i = 0;
      else if (i > 1) i = 1;
      this.level_bar.x = 145 * i - 153;
    }
    if (this.level_v_huntian)
      this.level_v_huntian.text = Math.floor(exp).toString();
  }
}

export default uiscript => (uiscript.UI_Level = UI_Level);
