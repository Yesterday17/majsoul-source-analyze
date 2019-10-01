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
  var e;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.down = 1)] = 'down';
    t[(t.move = 2)] = 'move';
  })(e || (e = {}));
  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this, new ui.lobby.shop_skin_yulanUI()) || this;
        t.skin_cells = [];
        t.mouse_state = e.none;
        n.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;
        this.container_illust = this.me.getChildByName('illust');
        this.illust = this.container_illust.getChildByName('illust');
        this.container_info = this.me.getChildByName('container_info');
        this.label_name = this.container_info.getChildByName('name');

        this.label_character = this.container_info.getChildByName(
            'character'
          );

        this.label_desc = this.container_info.getChildByName('info');
        this.container_right = this.me.getChildByName('right');

        this.container_buy = this.container_right.getChildByName(
            'container_buy'
          );

        this.container_chooses = this.container_right.getChildByName(
            'container_chooses'
          );
        for (var i = 0; i < this.container_chooses.numChildren; i++) {
          var n = this.container_chooses.getChildAt(i);
          this.skin_cells.push({
            me: n,
            mask: n.mask,
            content: n.getChildByName('content'),
            icon: n.getChildByName('content').getChildByName('icon'),
            gray_mask: n.getChildByName('content').getChildByName('gray')
          });
        }
        this.btn_choose = this.container_right.getChildByName('btn_choose');
        var a = () => {
          t.onChangeAngle(30 * Math.floor((t.target_angle + 15) / 30));
        };

        this.btn_choose.on('mousedown', this, () => {
          t.mouse_state = e.down;
          t.locking ||
            ((t.last_mouse_x = t.btn_choose.mouseX));
        });

        this.btn_choose.on('mouseup', this, () => {
          t.mouse_state == e.down ? (() => {
                for (
                  var e = t.btn_choose.mouseX, i = 0;
                  i < t.skin_cells.length;
                  i++
                ) {
                  var n = t.skin_cells[i];
                  if (
                    n.me.visible &&
                    n.me.x <= e &&
                    e <= n.me.x + n.me.width
                  ) {
                    if (n.goods_index == t.choosed_goods_index) return;
                    t.onChangeAngle(30 * n.goods_index);
                    break;
                  }
                }
              })() : t.mouse_state == e.move && a();

          t.mouse_state = e.none;
        });

        this.btn_choose.on('mousemove', this, () => {
          var i = t.btn_choose.mouseX;
          var n = i - t.last_mouse_x;

          t.mouse_state == e.down &&
            Math.abs(n) > 10 &&
            (t.mouse_state = e.move);

          t.onChangeAngle(t.target_angle - (180 * n) / 400);
          t.mouse_state == e.move &&
            ((t.last_mouse_x = i));
        });

        this.btn_choose.on('mouseover', this, () => {
          t.mouse_state == e.move && a();
          t.mouse_state = e.none;
        });

        this.container_right.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, () => {
            t.locking || t.close();
          });

        this.btn_left = this.container_right.getChildByName('btn_left');
        this.btn_right = this.container_right.getChildByName('btn_right');

        this.btn_left.clickHandler = new Laya.Handler(this, () => {
            t.locking ||
              t.choosed_goods_index <= 0 ||
              t.onChangeAngle(30 * (t.choosed_goods_index - 1));
          });

        this.btn_right.clickHandler = new Laya.Handler(this, () => {
            t.locking ||
              t.choosed_goods_index >= t.goods_lst.length - 1 ||
              t.onChangeAngle(30 * (t.choosed_goods_index + 1));
          });
      }

      onChangeAngle(t) {
        t < 0 && (t = 0);

        t > 30 * this.goods_lst.length - 30 &&
          (t = 30 * this.goods_lst.length - 30);

        this.target_angle = t;
        var e = Math.floor((t + 15) / 30);
        this.choosed_goods_index = e;
        e != this.choosed_goods_index &&
          (this.onCenterCharacterChange());
      }

      refresh_scroll() {
        for (
          var t = 30 * Math.floor(this.current_angle / 30) - 90, e = [], i = 0;
          i < this.skin_cells.length;
          i++
        )
          e.push(!1);
        for (var n = this.container_chooses.width / 2, i = 0; i <= 6; i++) {
          var a = t + 30 * i;
          var r = a - this.current_angle;
          if (Math.abs(r) < 89) {
            var s = a / 30;
            var o = s % this.skin_cells.length;
            if (s >= 0 && s < this.goods_lst.length) {
              e[o] = !0;
              var l = this.skin_cells[o];
              if (this.skin_cells[o].goods_index != s) {
                var h = this.goods_lst[s];
                l.me.visible = !0;
                l.goods_index = s;
                game.LoadMgr.setImgSkin(l.icon, `${h.icon}/waitingroom.png`);
              }
              for (var c = Math.cos((r * Math.PI) / 180), u = 0; u < 4; u++)
                c *= c;
              l.gray_mask.alpha = 1 - c;
              l.me.x = Math.sin(((r - 15) * Math.PI) / 180) * n + n;

              l.me.width =
                  (Math.sin(((r + 15) * Math.PI) / 180) -
                    Math.sin(((r - 15) * Math.PI) / 180)) *
                  n;

              l.mask.width = l.me.width;
              l.content.x = l.me.width / 2;
              l.me.y = 0;
            }
          }
        }
        this.skin_cells[i].goods_index = -1;
        this.skin_cells[i].me.visible = !1;
        for (i = 0; i < this.skin_cells.length; i++)
          e[i] ||
            ((this.skin_cells[i].me.width = 0));
      }

      refresh_price(t, e, i) {
        var n = t.getChildByName('container_origin_price');
        var a = t.getChildByName('container_discount');
        n.visible = !1;
        a.visible = !1;
        n.visible = !0;
        if ((i >= 1))
          n.getChildByName('now_price').text = e.toString();
        else {
          a.visible = !0;
          a.getChildByName('discount').text =
              `-${100 - Math.ceil(100 * i)}%`;
          var r = a.getChildByName('now_price');
          var s = a.getChildByName('origin_price');
          var o = a.getChildByName('del');
          s.text = e.toString();
          r.text = Math.floor(e * i).toString();
          o.width = s.textField.textWidth + 6;
        }
      }

      refresh_buy() {
        var e = this;

        var i = cfg.shops.goods.get(
          this.goods_lst[this.choosed_goods_index].goods_id
        );

        this.container_buy.getChildByName(
          'container_discount'
        ).visible = !1;

        this.container_buy.getChildByName(
            'container_origin_price'
          ).visible = !1;

        this.container_buy.getChildByName('btn_buy').visible = !1;
        if (t.UI_Sushe.skin_owned(i.item_id))
          this.container_buy.getChildByName('owned').visible = !0;
        else {
          this.container_buy.getChildByName('owned').visible = !1;
          this.refresh_price(
            this.container_buy,
            i.price,
            t.UI_Shop.goods_discount_value(i.id)
          );
          var n = this.container_buy.getChildByName('btn_buy');
          n.visible = !0;
          n.clickHandler = Laya.Handler.create(
              this,
              () => {
                t.UI_SecondConfirm.Inst.show(
                  game.Tools.strOfLocalization(2822, [
                    i[`desc_${GameMgr.client_language}`]
                  ]),
                  Laya.Handler.create(e, () => {
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'buyFromShop',
                      {
                        goods_id: e.goods_lst[e.choosed_goods_index].goods_id,
                        count: 1,
                        deal_price: Math.floor(
                          i.price * t.UI_Shop.goods_discount_value(i.id)
                        )
                      },
                      (a, r) => {
                        game.Tools.setGrayDisable(n, !1);
                        view.AudioMgr.PlayAudio(106);
                        t.UI_Sushe.add_skin(i.item_id);

                        t.UI_LightTips.Inst.show(
                          game.Tools.strOfLocalization(2191)
                        );

                        a || r.error
                          ? t.UIMgr.Inst.showNetReqError('buyFromShop', a, r)
                          : (e.refresh_buy());
                      }
                    );
                  })
                );
              },
              null,
              !1
            );
        }
        Laya.Tween.clearAll(this.container_buy);
        this.container_buy.y = 640;
        this.container_buy.alpha = 0;
        Laya.Tween.to(this.container_buy, { y: 570, alpha: 1 }, 200);
      }

      update_anim() {
        if (this.current_angle != this.target_angle) {
          var t = Math.abs(this.target_angle - this.current_angle);
          var e = (0.005 / 30) * t * t + 0.1;
          var i = Laya.timer.delta * e;

          i >= t
            ? (this.current_angle = this.target_angle)
            : this.target_angle > this.current_angle
            ? (this.current_angle += i)
            : (this.current_angle -= i);

          this.refresh_scroll();
        }
      }

      refresh_skin() {
        cfg.shops.goods.get(t.goods_id);
        var t = this.goods_lst[this.choosed_goods_index];

        var e =
          (cfg.item_definition.skin.get(t.skin_id));

        game.LoadMgr.setImgSkin(this.illust, `${e.path}/full.png`);
        var i = 1e3 / e.full_height;
        this.illust.height = 1e3;
        this.illust.width = e.full_width * i;
        this.illust.x = 620 - e.full_center_x * e.full_width * i;
        this.illust.y = 40;
        this.label_name.text = e[`name_${GameMgr.client_language}`];

        this.label_character.text = cfg.item_definition.character.get(
            e.character_id
          )[`name_${GameMgr.client_language}`];

        this.label_desc.text = e[`desc_${GameMgr.client_language}`];
        Laya.Tween.clearAll(this.container_illust);
        Laya.Tween.clearAll(this.container_info);
        this.container_illust.x = -200;
        this.container_illust.alpha = 0;

        Laya.Tween.to(
          this.container_illust,
          { x: 0, alpha: 1 },
          200,
          Laya.Ease.linearNone
        );

        this.container_info.x = -200;
        this.container_info.alpha = 0;
        Laya.Tween.to(
          this.container_info,
          { x: 0, alpha: 1 },
          200,
          Laya.Ease.linearNone
        );
      }

      onCenterCharacterChange() {
        this.refresh_skin();
        this.refresh_buy();
        this.btn_left.visible = this.choosed_goods_index > 0;
        this.btn_right.visible =
            this.choosed_goods_index < this.goods_lst.length - 1;
      }

      show(i) {
        var n = this;
        void 0 === i && (i = -1);
        this.goods_lst = [];
        this.current_angle = 0;
        this.choosed_goods_index = 0;

        cfg.shops.goods.forEach(({id, item_id, category, category_goods}) => {
          n.goods_lst.push({
              goods_id: id,
              skin_id: item_id,
              icon: cfg.item_definition.skin.get(item_id).path
            });

          n.choosed_goods_index = n.goods_lst.length - 1;
          5 == category &&
            1 == category_goods &&
            t.UI_Shop.goods_on_sell(id) &&
            ((id == i && (n.current_angle = 30 * n.choosed_goods_index)));
        });

        this.target_angle = this.current_angle;
        this.enable = !0;
        this.onCenterCharacterChange();
        this.refresh_scroll();
        this.mouse_state = e.none;
        Laya.timer.clearAll(this);
        Laya.timer.frameLoop(1, this, this.update_anim);
        this.locking = !0;
        t.UIBase.anim_alpha_in(this.container_right, { x: 100 }, 200);
        Laya.timer.once(350, this, () => {
          n.locking = !1;
        });
      }

      close() {
        var e = this;
        Laya.timer.clearAll(this);
        this.locking = !0;
        t.UIBase.anim_alpha_out(this.container_right, { x: 100 }, 200);
        t.UIBase.anim_alpha_out(this.container_illust, { x: -100 }, 200);
        t.UIBase.anim_alpha_out(this.container_info, { x: -100 }, 200);
        Laya.timer.once(200, this, () => {
          e.locking = !1;
          e.enable = !1;
          t.UI_Shop.Inst.show(4);
        });
      }

      onDisable() {
        this.skin_cells[t].icon.skin = '';
        this.skin_cells[t].me.visible = !1;
        this.skin_cells[t].me.width = 0;
        this.skin_cells[t].mask.width = 0;
        for (t = 0; t < this.skin_cells.length; t++)
          this.skin_cells[t].goods_index = -1;
        this.illust.skin = '';

        Laya.loader.clearTextureRes(
          game.LoadMgr.getResImageSkin(
            `${this.goods_lst[t].icon}/waitingroom.png`
          )
        );

        for (var t = 0; t < this.goods_lst.length; t++)
          Laya.loader.clearTextureRes(
            game.LoadMgr.getResImageSkin(`${this.goods_lst[t].icon}/full.png`)
          );
        this.goods_lst = [];
      }
    }

    __extends(n, i);

    return n;
  })(t.UIBase);
  t.UI_Shop_Skin_Yulan = i;
})(uiscript || (uiscript = {}));