var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.lobby.skin_yulanUI()) || this;
        t.scale = 1;
        t.during_move = !1;
        t.mouse_start_x = 0;
        t.mouse_start_y = 0;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;
        this.illust = this.me.getChildByName('illust');

        this.skin = new t.UI_Character_Skin(
            this.illust.getChildByName('illust')
          );

        this.container_move = this.me.getChildByName('move');

        this.container_move.on('mousedown', this, () => {
          e.during_move = !0;
          e.mouse_start_x = e.container_move.mouseX;
          e.mouse_start_y = e.container_move.mouseY;
        });

        this.container_move.on('mousemove', this, () => {
          e.move(
              e.container_move.mouseX - e.mouse_start_x,
              e.container_move.mouseY - e.mouse_start_y
            );

          e.mouse_start_x = e.container_move.mouseX;
          e.during_move &&
            ((e.mouse_start_y = e.container_move.mouseY));
        });

        this.container_move.on('mouseup', this, () => {
          e.during_move = !1;
        });

        this.container_move.on('mouseout', this, () => {
          e.during_move = !1;
        });

        this.btn_big = this.me.getChildByName('btn_big');

        this.btn_big.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.bigger();
            },
            null,
            !1
          );

        this.btn_small = this.me.getChildByName('btn_small');

        this.btn_small.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.smaller();
            },
            null,
            !1
          );

        this.btn_close = this.me.getChildByName('btn_close');

        this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close();
            },
            null,
            !1
          );

        this.container_info = this.me.getChildByName('container_info');
        this.label_name = this.container_info.getChildByName('name');

        this.label_character = this.container_info.getChildByName(
            'character'
          );

        this.label_desc = this.container_info.getChildByName('info');
      }

      show(e, i) {
        var n = this;
        this.when_close = i;
        this.skin.setSkin(e, 'full');
        this.illust_start_x = this.illust.x;
        this.illust_start_y = this.illust.y;
        this.illust_center_x = 1017;
        this.illust_center_y = 629;
        this.scale = 1;
        this.illust.scaleX = this.illust.scaleY = 1;
        this.illust.x = this.illust_center_x;
        this.illust.y = this.illust_center_y;
        var a = cfg.item_definition.skin.get(e);
        this.label_name.text = a[`name_${GameMgr.client_language}`];

        this.label_character.text = cfg.item_definition.character.get(
            a.character_id
          )[`name_${GameMgr.client_language}`];

        this.label_desc.text = a[`desc_${GameMgr.client_language}`];
        this.enable = !0;
        this.locking = !0;
        t.UIBase.anim_pop_out(this.btn_big, null);
        t.UIBase.anim_pop_out(this.btn_small, null);
        t.UIBase.anim_pop_out(this.btn_close, null);
        this.illust.alpha = 1;

        Laya.Tween.from(
          this.illust,
          { x: this.illust_center_x - 100, alpha: 0 },
          200,
          Laya.Ease.backOut
        );

        this.container_info.alpha = 0;
        this.container_info.x = -100;

        Laya.Tween.to(
          this.container_info,
          { x: 0, alpha: 1 },
          200,
          Laya.Ease.backOut
        );

        this.during_move = !1;
        Laya.timer.once(250, this, () => {
          n.locking = !1;
        });
      }

      close() {
        var e = this;
        this.locking = !0;
        Laya.Tween.to(this.illust, { alpha: 0 }, 200);
        Laya.Tween.to(this.container_info, { alpha: 0 }, 200);
        t.UIBase.anim_pop_hide(this.btn_big, null);
        t.UIBase.anim_pop_hide(this.btn_small, null);
        t.UIBase.anim_pop_hide(this.btn_close, null);
        Laya.timer.once(250, this, () => {
          e.locking = !1;
          e.enable = !1;
          e.when_close && e.when_close.run();
        });
      }

      onDisable() {
        this.skin.clear();
      }

      bigger() {
        this.scale *= 1.1;
        1.1 * this.scale > 1.5 ||
          (Laya.Tween.to(
          this.illust,
          { scaleX: this.scale, scaleY: this.scale },
          100,
          null,
          null,
          0,
          !0,
          !0
        ));
      }

      smaller() {
        this.scale /= 1.1;
        this.scale / 1.1 < 0.5 ||
          (Laya.Tween.to(
          this.illust,
          { scaleX: this.scale, scaleY: this.scale },
          100,
          null,
          null,
          0,
          !0,
          !0
        ));
      }

      move(t, e) {
        var i = this.illust.x + t;
        var n = this.illust.y + e;

        i < this.illust_center_x - 600
          ? (i = this.illust_center_x - 600)
          : i > this.illust_center_x + 600 && (i = this.illust_center_x + 600);

        n < this.illust_center_y - 1200
          ? (n = this.illust_center_y - 1200)
          : n > this.illust_center_y + 800 &&
            (n = this.illust_center_y + 800);

        this.illust.x = i;
        this.illust.y = n;
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Skin_Yulan = e;
})(uiscript || (uiscript = {}));