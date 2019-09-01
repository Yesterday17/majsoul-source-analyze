let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.skin_yulanUI()) || this;
      return (
        (t.scale = 1),
        (t.during_move = false),
        (t.mouse_start_x = 0),
        (t.mouse_start_y = 0),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.illust = this.me.getChildByName('illust')),
        (this.skin = new t.UI_Character_Skin(
          this.illust.getChildByName('illust')
        )),
        (this.container_move = this.me.getChildByName('move')),
        this.container_move.on('mousedown', this, () => {
          (e.during_move = true),
            (e.mouse_start_x = e.container_move.mouseX),
            (e.mouse_start_y = e.container_move.mouseY);
        }),
        this.container_move.on('mousemove', this, () => {
          e.during_move &&
            (e.move(
              e.container_move.mouseX - e.mouse_start_x,
              e.container_move.mouseY - e.mouse_start_y
            ),
            (e.mouse_start_x = e.container_move.mouseX),
            (e.mouse_start_y = e.container_move.mouseY));
        }),
        this.container_move.on('mouseup', this, () => {
          e.during_move = false;
        }),
        this.container_move.on('mouseout', this, () => {
          e.during_move = false;
        }),
        (this.btn_big = this.me.getChildByName('btn_big')),
        (this.btn_big.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.bigger();
          },
          null,
          false
        )),
        (this.btn_small = this.me.getChildByName('btn_small')),
        (this.btn_small.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.smaller();
          },
          null,
          false
        )),
        (this.btn_close = this.me.getChildByName('btn_close')),
        (this.btn_close.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          false
        )),
        (this.container_info = this.me.getChildByName('container_info')),
        (this.label_name = this.container_info.getChildByName('name')),
        (this.label_character = this.container_info.getChildByName(
          'character'
        )),
        (this.label_desc = this.container_info.getChildByName('info'));
    }),
    (i.prototype.show = function(e, i) {
      const n = this;
      (this.when_close = i),
        this.skin.setSkin(e, 'full'),
        (this.illust_start_x = this.illust.x),
        (this.illust_start_y = this.illust.y),
        (this.illust_center_x = 1017),
        (this.illust_center_y = 629),
        (this.scale = 1),
        (this.illust.scaleX = this.illust.scaleY = 1),
        (this.illust.x = this.illust_center_x),
        (this.illust.y = this.illust_center_y);
      const a = cfg.item_definition.skin.get(e);
      (this.label_name.text = a[`name_${GameMgr.client_language}`]),
        (this.label_character.text = cfg.item_definition.character.get(
          a.character_id
        )[`name_${GameMgr.client_language}`]),
        (this.label_desc.text = a[`desc_${GameMgr.client_language}`]),
        (this.enable = true),
        (this.locking = true),
        t.UIBase.anim_pop_out(this.btn_big, null),
        t.UIBase.anim_pop_out(this.btn_small, null),
        t.UIBase.anim_pop_out(this.btn_close, null),
        (this.illust.alpha = 1),
        Laya.Tween.from(
          this.illust,
          { x: this.illust_center_x - 100, alpha: 0 },
          200,
          Laya.Ease.backOut
        ),
        (this.container_info.alpha = 0),
        (this.container_info.x = -100),
        Laya.Tween.to(
          this.container_info,
          { x: 0, alpha: 1 },
          200,
          Laya.Ease.backOut
        ),
        (this.during_move = false),
        Laya.timer.once(250, this, () => {
          n.locking = false;
        });
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        Laya.Tween.to(this.illust, { alpha: 0 }, 200),
        Laya.Tween.to(this.container_info, { alpha: 0 }, 200),
        t.UIBase.anim_pop_hide(this.btn_big, null),
        t.UIBase.anim_pop_hide(this.btn_small, null),
        t.UIBase.anim_pop_hide(this.btn_close, null),
        Laya.timer.once(250, this, () => {
          (e.locking = false),
            (e.enable = false),
            e.when_close && e.when_close.run();
        });
    }),
    (i.prototype.onDisable = function() {
      this.skin.clear();
    }),
    (i.prototype.bigger = function() {
      1.1 * this.scale > 1.5 ||
        ((this.scale *= 1.1),
        Laya.Tween.to(
          this.illust,
          { scaleX: this.scale, scaleY: this.scale },
          100,
          null,
          null,
          0,
          true,
          true
        ));
    }),
    (i.prototype.smaller = function() {
      this.scale / 1.1 < 0.5 ||
        ((this.scale /= 1.1),
        Laya.Tween.to(
          this.illust,
          { scaleX: this.scale, scaleY: this.scale },
          100,
          null,
          null,
          0,
          true,
          true
        ));
    }),
    (i.prototype.move = function(t, e) {
      let i = this.illust.x + t;
      let n = this.illust.y + e;
      i < this.illust_center_x - 600
        ? (i = this.illust_center_x - 600)
        : i > this.illust_center_x + 600 && (i = this.illust_center_x + 600),
        n < this.illust_center_y - 1200
          ? (n = this.illust_center_y - 1200)
          : n > this.illust_center_y + 800 &&
            (n = this.illust_center_y + 800),
        (this.illust.x = i),
        (this.illust.y = n);
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Skin_Yulan = e;
})(uiscript || (uiscript = {}));