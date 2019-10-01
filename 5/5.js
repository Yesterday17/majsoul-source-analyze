var uiscript;
!(t => {
  var e = (() => {
    class t {
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
        this.icon = t.getChildByName('icon');
        for (var e = 1; e <= 3; e++)
          if (t.getChildByName(`star${e}`)) {
            var i = t.getChildByName(`star${e}`).getChildAt(0);
            i && this.stars.push(i);
          }
        this.container_exp = this.me.getChildByName('exp');
        this.level_v = this.container_exp.getChildByName('value');
        this.level_vmax = this.container_exp.getChildByName('max');

        this.container_exp &&
          ((this.level_bar = this.container_exp
            .getChildByName('bar')
            .getChildByName('v')));

        this.container_huntian = this.me.getChildByName('huntian');

        this.container_huntian &&
          (this.level_v_huntian = this.container_huntian.getChildByName(
            'value'
          ));

        this.bgp = this.me.getChildByName('bgp');
      }

      set id(t) {
        var e = cfg.level_definition.level_definition.get(t);
        e || (e = cfg.level_definition.level_definition.find(10101));
        this._id = e.id;
        this.icon.skin = game.LoadMgr.getResImageSkin(e.primary_icon);
        if (
          (10601 == t || 20601 == t)
        ) {
          for (i = 0; i < this.stars.length; i++)
            this.stars[i].parent.visible = !1;
          this.container_exp && (this.container_exp.visible = !1);

          this.container_huntian
            ? (this.container_huntian.visible = !0)
            : this.container_exp && (this.container_exp.visible = !0);

          this.bgp && (this.bgp.visible = !0);
        } else {
          this.stars[i].visible = i < e.secondary_level;
          for (var i = 0; i < this.stars.length; i++)
            this.stars[i].parent.visible = !0;
          this.container_huntian && (this.container_huntian.visible = !1);
          this.container_exp && (this.container_exp.visible = !0);
          this.bgp && (this.bgp.visible = !1);
        }
      }

      set exp(t) {
        var e = cfg.level_definition.level_definition.get(this._id);
        this.level_v && (this.level_v.text = Math.floor(t).toString());

        this.level_vmax &&
          (this.level_vmax.text = Math.floor(e.end_point).toString());

        if (
          (this.level_bar)
        ) {
          var i = t / e.end_point;
          i = i < 0 ? 0 : i > 1 ? 1 : i;
          this.level_bar.x = 145 * i - 153;
        }
        this.level_v_huntian &&
          (this.level_v_huntian.text = Math.floor(t).toString());
      }
    }

    return t;
  })();
  t.UI_Level = e;
})(uiscript || (uiscript = {}));