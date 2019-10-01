var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(t) {
        this.skin_id = 0;
        this.me = t;
      }

      onCreate() {
        var e = this,
          i = this.me.getChildByName('btn_detail');

        i.clickHandler = new Laya.Handler(this, () => {
          t.UI_Bag.Inst.locking ||
            t.UI_Bag.Inst.hide(
              Laya.Handler.create(e, () => {
                t.UI_Skin_Yulan.Inst.show(
                  e.skin_id,
                  Laya.Handler.create(e, () => {
                    t.UI_Bag.Inst.show(4);
                  })
                );
              })
            );
        });

        this.icon = new t.UI_Character_Skin(
            i.getChildByName('content').getChildByName('icon')
          );

        this.container_lock = i
            .getChildByName('content')
            .getChildByName('lock');

        this.container_lock_info = this.container_lock.getChildByName(
            'info'
          );

        this.label_lock_info = this.container_lock_info.getChildByName(
            'info'
          );
      }

      show() {
        this.me.visible = !0;
        this.icon.setSkin(this.skin_id, 'bighead');
        if (
          (t.UI_Sushe.skin_owned(this.skin_id))
        )
          this.container_lock.visible = !1;
        else {
          this.container_lock.visible = !0;
          var e = cfg.item_definition.skin.get(this.skin_id);
          this.label_lock_info.text =
            e[`lock_tips_${GameMgr.client_language}`];
        }
      }

      reset() {
        this.icon.clear();
      }
    }

    return e;
  })();

  var i = (() => {
    class i {
      constructor(t) {
        var i = this;
        this.cells = [];
        this.container_charas = [];
        this.skin_data = {};
        this.inited = !1;
        this.total_h = 0;
        this.me = t;
        this.content = this.me.getChildByName('content');
        var n = this.content.getChildByName('templete_cell');
        n.visible = !1;
        this.cells = [];
        cfg.item_definition.skin.forEach(({character_id, type, id}) => {
          var a = cfg.item_definition.character.get(character_id);
          if (a && a.open) {
            var r = !0;
            0 == type ? (r = !1) : 1 == type && (a.can_marry || (r = !1));

            0 == i.cells.length
                ? i.cells.push(new e(n))
                : i.cells.push(
                    new e(n.scriptMap['capsui.UICopy'].getNodeClone())
                  );

            i.skin_data[character_id] ||
              (i.skin_data[character_id] = []);

            r &&
              (i.skin_data[character_id].push(id));
          }
        });
        var a = this.content.getChildByName('templete_chara');
        a.visible = !1;
        this.container_charas = [];
        for (var r in this.skin_data)
          0 == this.container_charas.length
            ? this.container_charas.push(a)
            : this.container_charas.push(
                a.scriptMap['capsui.UICopy'].getNodeClone()
              );
        var s = this.me.getChildByName('show_all');
        this.checkbox_showAll = s.getChildByName('checkbox');

        s.clickHandler = new Laya.Handler(this, () => {
          i.checkbox_showAll.visible = !i.checkbox_showAll.visible;
          i.refresh_force();
        });

        this.scrollbar = this.me.getChildByName('scrollbar').scriptMap[
            'capsui.CScrollBar'
          ];

        this.scrollbar.init(
          new Laya.Handler(this, t => {
            i.content.vScrollBar.value = i.content.vScrollBar.max * t;
            i.onPanelScroll();
          })
        );

        this.scrollbar.islong = !1;
        this.content.vScrollBarSkin = '';

        this.content.vScrollBar.on('change', this, () => {
          i.onPanelScroll();
        });

        this.no_info = this.me.getChildByName('no_info');
        Laya.timer.frameOnce(5, this, () => {
          for (var t = 0; t < i.cells.length; t++) i.cells[t].onCreate();
        });
      }

      refresh_force() {
        this.cells[i].skin_id = 0;
        this.cells[i].reset();
        this.cells[i].me.visible = !1;
        this.content.addChild(this.cells[i].me);
        for (var e = this, i = 0; i < this.cells.length; i++)
          this.cells[i].me.y = 0;
        this.container_charas[i].visible = !1;
        this.container_charas[i].y = 0;
        for (i = 0; i < this.container_charas.length; i++)
          this.container_charas[i].height = 0;
        this.checkbox_showAll.visible;
        var n = 0,
          a = 0,
          r = 0;

        cfg.item_definition.character.forEach(i => {
          var s = i.id;
          if (e.skin_data[s]) {
            for (
              var o = e.skin_data[s], l = [], h = 0, c = 0;
              c < o.length;
              c++
            ) {
              p = o[c];
              t.UI_Sushe.skin_owned(p) && h++;
              (e.checkbox_showAll.visible || t.UI_Sushe.skin_owned(p)) &&
                (l.push(p));
            }
            if (0 != l.length) {
              var u = e.container_charas[a++];
              u.visible = !0;
              u.y = r;
              var _ = u.getChildByName('name');
              _.text = i[`name_${GameMgr.client_language}`];
              var d = u.getChildByName('count');
              d.text = `${h.toString()}/${o.length.toString()}`;
              d.x = _.x + _.textField.textWidth + 30;
              for (
                var f = u.getChildByName('container_skins'), c = 0;
                c < l.length;
                c++
              ) {
                var p = l[c],
                  m = e.cells[n++];
                m.me.visible = !0;
                f.addChild(m.me);
                m.me.x = (c % 6) * m.me.width;
                m.me.y = Math.floor(c / 6) * m.me.height;
                m.skin_id = p;
                m.show();
              }
              var g =
                f.y + Math.ceil(l.length / 6) * e.cells[0].me.height + 20;
              u.getChildByName('line').visible = 1 != a;
              u.height = g;
              r += g;
            }
          }
        });

        this.total_h = r;
        this.content.refresh();
        this.scrollbar.reset();

        this.scrollbar.setVal(
          0,
          this.total_h > 0 ? this.content.height / this.total_h : 1
        );

        this.no_info.visible = this.total_h <= 0;
      }

      onPanelScroll() {
        this.total_h < this.content.height
          ? this.scrollbar.setVal(0, 1)
          : this.scrollbar.setVal(
              this.content.vScrollBar.value / this.content.vScrollBar.max,
              this.content.height / this.total_h
            );
      }

      refresh_lite() {
        for (var t = 0; t < this.cells.length; t++)
          this.cells[t].me.visible && this.cells[t].show();
        this.no_info.visible = this.total_h <= 0;
        this.onPanelScroll();
      }

      show() {
        this.me.visible = !0;
        this.inited = !0;
        this.checkbox_showAll.visible = !0;
        this.inited
          ? this.refresh_lite()
          : (this.refresh_force());
      }

      close() {
        this.me.visible = !1;
        for (var t = 0; t < this.cells.length; t++) this.cells[t].reset();
      }

      when_update_data() {
        this.inited = !1;
      }
    }

    return i;
  })();

  t.UI_Bag_PageSkin = i;
})(uiscript || (uiscript = {}));