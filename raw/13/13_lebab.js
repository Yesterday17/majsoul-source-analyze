let uiscript;
!(t => {
  const e = (() => {
      function e(t) {
        (this.skin_id = 0), (this.me = t);
      }
      return (e.prototype.onCreate = function() {
        const e = this, i = this.me.getChildByName('btn_detail');
        (i.clickHandler = new Laya.Handler(this, () => {
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
        })),
          (this.icon = new t.UI_Character_Skin(
            i.getChildByName('content').getChildByName('icon')
          )),
          (this.container_lock = i
            .getChildByName('content')
            .getChildByName('lock')),
          (this.container_lock_info = this.container_lock.getChildByName(
            'info'
          )),
          (this.label_lock_info = this.container_lock_info.getChildByName(
            'info'
          ));
      }),
      (e.prototype.show = function() {
        if (
          ((this.me.visible = true),
          this.icon.setSkin(this.skin_id, 'bighead'),
          t.UI_Sushe.skin_owned(this.skin_id))
        )
          this.container_lock.visible = false;
        else {
          this.container_lock.visible = true;
          const e = cfg.item_definition.skin.get(this.skin_id);
          this.label_lock_info.text =
            e[`lock_tips_${GameMgr.client_language}`];
        }
      }),
      (e.prototype.reset = function() {
        this.icon.clear();
      }),
      e
    ;
    })();

  const i = (() => {
    function i(t) {
      const i = this;
      (this.cells = []),
        (this.container_charas = []),
        (this.skin_data = {}),
        (this.inited = false),
        (this.total_h = 0),
        (this.me = t),
        (this.content = this.me.getChildByName('content'));
      const n = this.content.getChildByName('templete_cell');
      (n.visible = false),
        (this.cells = []),
        cfg.item_definition.skin.forEach(({character_id, type, id}) => {
          const a = cfg.item_definition.character.get(character_id);
          if (a && a.open) {
            let r = true;
            0 == type ? (r = false) : 1 == type && (a.can_marry || (r = false)),
              r &&
                (0 == i.cells.length
                  ? i.cells.push(new e(n))
                  : i.cells.push(
                      new e(n.scriptMap['capsui.UICopy'].getNodeClone())
                    ),
                i.skin_data[character_id] ||
                  (i.skin_data[character_id] = []),
                i.skin_data[character_id].push(id));
          }
        });
      const a = this.content.getChildByName('templete_chara');
      (a.visible = false), (this.container_charas = []);
      for (const r in this.skin_data)
        0 == this.container_charas.length
          ? this.container_charas.push(a)
          : this.container_charas.push(
              a.scriptMap['capsui.UICopy'].getNodeClone()
            );
      const s = this.me.getChildByName('show_all');
      (this.checkbox_showAll = s.getChildByName('checkbox')),
        (s.clickHandler = new Laya.Handler(this, () => {
          (i.checkbox_showAll.visible = !i.checkbox_showAll.visible),
            i.refresh_force();
        })),
        (this.scrollbar = this.me.getChildByName('scrollbar').scriptMap[
          'capsui.CScrollBar'
        ]),
        this.scrollbar.init(
          new Laya.Handler(this, t => {
            (i.content.vScrollBar.value = i.content.vScrollBar.max * t),
              i.onPanelScroll();
          })
        ),
        (this.scrollbar.islong = false),
        (this.content.vScrollBarSkin = ''),
        this.content.vScrollBar.on('change', this, () => {
          i.onPanelScroll();
        }),
        (this.no_info = this.me.getChildByName('no_info')),
        Laya.timer.frameOnce(5, this, () => {
          for (let t = 0; t < i.cells.length; t++) i.cells[t].onCreate();
        });
    }
    return (i.prototype.refresh_force = function() {
      for (var e = this, i = 0; i < this.cells.length; i++)
        (this.cells[i].skin_id = 0),
          this.cells[i].reset(),
          (this.cells[i].me.visible = false),
          this.content.addChild(this.cells[i].me),
          (this.cells[i].me.y = 0);
      for (i = 0; i < this.container_charas.length; i++)
        (this.container_charas[i].visible = false),
          (this.container_charas[i].y = 0),
          (this.container_charas[i].height = 0);
      this.checkbox_showAll.visible;
      let n = 0, a = 0, r = 0;
      cfg.item_definition.character.forEach(i => {
        const s = i.id;
        if (e.skin_data[s]) {
          for (
            var o = e.skin_data[s], l = [], h = 0, c = 0;
            c < o.length;
            c++
          ) {
            p = o[c];
            (e.checkbox_showAll.visible || t.UI_Sushe.skin_owned(p)) &&
              (t.UI_Sushe.skin_owned(p) && h++, l.push(p));
          }
          if (0 != l.length) {
            const u = e.container_charas[a++];
            (u.visible = true), (u.y = r);
            const _ = u.getChildByName('name');
            _.text = i[`name_${GameMgr.client_language}`];
            const d = u.getChildByName('count');
            (d.text = `${h.toString()}/${o.length.toString()}`),
              (d.x = _.x + _.textField.textWidth + 30);
            for (
              var f = u.getChildByName('container_skins'), c = 0;
              c < l.length;
              c++
            ) {
              var p = l[c];
              const m = e.cells[n++];
              (m.me.visible = true),
                f.addChild(m.me),
                (m.me.x = (c % 6) * m.me.width),
                (m.me.y = Math.floor(c / 6) * m.me.height),
                (m.skin_id = p),
                m.show();
            }
            const g =
              f.y + Math.ceil(l.length / 6) * e.cells[0].me.height + 20;
            (u.getChildByName('line').visible = 1 != a),
              (u.height = g),
              (r += g);
          }
        }
      }),
        (this.total_h = r),
        this.content.refresh(),
        this.scrollbar.reset(),
        this.scrollbar.setVal(
          0,
          this.total_h > 0 ? this.content.height / this.total_h : 1
        ),
        (this.no_info.visible = this.total_h <= 0);
    }),
    (i.prototype.onPanelScroll = function() {
      this.total_h < this.content.height
        ? this.scrollbar.setVal(0, 1)
        : this.scrollbar.setVal(
            this.content.vScrollBar.value / this.content.vScrollBar.max,
            this.content.height / this.total_h
          );
    }),
    (i.prototype.refresh_lite = function() {
      for (let t = 0; t < this.cells.length; t++)
        this.cells[t].me.visible && this.cells[t].show();
      (this.no_info.visible = this.total_h <= 0), this.onPanelScroll();
    }),
    (i.prototype.show = function() {
      (this.me.visible = true),
        this.inited
          ? this.refresh_lite()
          : ((this.inited = true),
            (this.checkbox_showAll.visible = true),
            this.refresh_force());
    }),
    (i.prototype.close = function() {
      this.me.visible = false;
      for (let t = 0; t < this.cells.length; t++) this.cells[t].reset();
    }),
    (i.prototype.when_update_data = function() {
      this.inited = false;
    }),
    i
  ;
  })();

  t.UI_Bag_PageSkin = i;
})(uiscript || (uiscript = {}));