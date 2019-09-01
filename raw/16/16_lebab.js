let uiscript;
!(t => {
  const e = (() => {
    function e(t) {
      const e = this;
      (this.desktop_default = 305044),
        (this.mjp_defalut = 305045),
        (this.lobby_bg_default = 307001),
        (this.tab_index = 0),
        (this.select_index = 0),
        (this.items = []),
        (this.img_desktop = null),
        (this.img_mjp = null),
        (this.btn_save = null),
        (this.seen_lobby_bg_map = null),
        (this.me = t),
        (this.scrollview = t.getChildByName('items').scriptMap[
          'capsui.CScrollView'
        ]),
        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item),
          -1,
          3,
          10
        ),
        this.scrollview.reset(),
        (this.btn_tablecloth = t
          .getChildByName('items')
          .getChildByName('btn_tablecloth')),
        (this.btn_tablecloth.clickHandler = Laya.Handler.create(
          this,
          () => {
            1 != e.tab_index && e.change_tab(1);
          },
          null,
          false
        )),
        (this.btn_cardback = t
          .getChildByName('items')
          .getChildByName('btn_cardback')),
        (this.btn_cardback.clickHandler = Laya.Handler.create(
          this,
          () => {
            2 != e.tab_index && e.change_tab(2);
          },
          null,
          false
        )),
        (this.btn_lobby_bg = t
          .getChildByName('items')
          .getChildByName('btn_lobby_bg')),
        (this.btn_lobby_bg.clickHandler = new Laya.Handler(this, () => {
          3 != e.tab_index && e.change_tab(3);
        }));
      const i = this.me.getChildByName('preview');
      (this.img_desktop = i.getChildByName('desktop')),
        (this.img_mjp = i.getChildByName('mjp')),
        (this.btn_save = i.getChildByName('btn_use')),
        (this.btn_save.clickHandler = Laya.Handler.create(
          this,
          this.save_change,
          null,
          false
        ));
    }
    return (e.prototype.have_red_point = function() {
      if (!this.seen_lobby_bg_map) {
        this.seen_lobby_bg_map = {};
        let e = Laya.LocalStorage.getItem(
          game.Tools.eeesss(`lobby_bg_list_${GameMgr.Inst.account_id}`)
        );
        if (e)
          for (
            var i = (e = game.Tools.dddsss(e)).split(','), n = 0;
            n < i.length;
            n++
          )
            this.seen_lobby_bg_map[i[n]] = 1;
      }
      for (
        const a = t.UI_Bag.find_items_by_category(t.EItemCategory.common_view), n = 0;
        n < a.length;
        n++
      ) {
        if (
          3 == cfg.item_definition.item.get(a[n].item_id).type &&
          !this.seen_lobby_bg_map[a[n].item_id]
        )
          return true;
      }
      return false;
    }),
    (e.prototype.show = function() {
      (this.me.visible = true),
        (this.btn_save.visible = false),
        this.change_tab(1),
        (this.btn_lobby_bg.getChildByName(
          'redpoint'
        ).visible = this.have_red_point());
    }),
    (e.prototype.close = function() {
      (this.me.visible = false),
        (this.items = []),
        this.scrollview.reset(),
        Laya.loader.clearTextureRes(this.img_desktop.skin),
        Laya.loader.clearTextureRes(this.img_mjp.skin),
        (this.img_desktop.skin = ''),
        (this.img_mjp.skin = ''),
        game.LoadMgr.clearImgSkin(this.img_desktop),
        game.LoadMgr.clearImgSkin(this.img_mjp);
    }),
    (e.prototype.change_tab = function(e) {
      const i = this;
      if (
        ((this.tab_index = e),
        (this.items = []),
        1 == e
          ? this.items.push({ item_id: this.desktop_default, owned: true })
          : 2 == e
          ? this.items.push({ item_id: this.mjp_defalut, owned: true })
          : 3 == e &&
            this.items.push({ item_id: this.lobby_bg_default, owned: true }),
        this.scrollview.reset(),
        (this.select_index = 0),
        (this.btn_tablecloth.getChildByName('inchoose').visible = 1 == e),
        (this.btn_cardback.getChildByName('inchoose').visible = 2 == e),
        (this.btn_lobby_bg.getChildByName('inchoose').visible = 3 == e),
        1 == e || 2 == e)
      ) {
        let n = t.UI_Bag.find_items_by_category(t.EItemCategory.common_view);
        n = n.sort(({item_id}, {item_id}) => item_id - item_id);
        for (a = 0; a < n.length; a++)
          if (
            n[a].item_id != this.desktop_default &&
            n[a].item_id != this.mjp_defalut
          ) {
            cfg.item_definition.item.get(n[a].item_id).type == e &&
              (this.items.push({ item_id: n[a].item_id, owned: true }),
              n[a].item_id == game.GameUtility.get_common_view_id(e) &&
                (this.select_index = this.items.length - 1));
          }
      } else
        3 == e &&
          cfg.item_definition.item.forEach(({id, category, type}) => {
            id != i.lobby_bg_default &&
              5 == category &&
              3 == type &&
              (i.items.push({
                item_id: id,
                owned: t.UI_Bag.get_item_count(id) > 0
              }),
              id == game.GameUtility.get_common_view_id(e) &&
                (i.select_index = i.items.length - 1));
          });
      if (
        (this.select_index < 0 && (this.select_index = 0),
        this.scrollview.addItem(this.items.length),
        this._on_select_change(),
        3 == e)
      ) {
        (this.btn_lobby_bg.getChildByName('redpoint').visible = false),
          t.UI_Bag.Inst.clear_desktop_btn_redpoint();
        for (var a = 0; a < this.items.length; a++)
          this.items[a].owned &&
            (this.seen_lobby_bg_map[this.items[a].item_id.toString()] = 1);
        let r = '';
        for (const s in this.seen_lobby_bg_map) '' != r && (r += ','), (r += s);
        Laya.LocalStorage.setItem(
          game.Tools.eeesss(`lobby_bg_list_${GameMgr.Inst.account_id}`),
          game.Tools.eeesss(r)
        );
      }
    }),
    (e.prototype.render_item = function({index, container, cache_data}) {
      const i = this;
      const n = index;
      const a = container;
      const r = cache_data;
      const s = this.items[n];
      const o = cfg.item_definition.item.get(s.item_id);
      const l = a.getChildByName('btn').getChildByName('inchoose');
      this.select_index == n ? (l.visible = true) : (l.visible = false);
      const h = a.getChildByName('btn');
      h.clickHandler = Laya.Handler.create(
        this,
        () => {
          if (i.select_index != n) {
            const e = i.select_index;
            (i.select_index = n),
              (l.visible = true),
              e >= 0 &&
                e < i.items.length &&
                i.scrollview.wantToRefreshItem(e),
              i._on_select_change();
          } else t.UI_ItemDetail.Inst.show(s.item_id);
        },
        null,
        false
      );
      const c = a.getChildByName('useing');
      let u = GameMgr.Inst.commonview_slot[this.tab_index];
      u ||
        (1 == this.tab_index
          ? (u = this.desktop_default)
          : 2 == this.tab_index
          ? (u = this.mjp_defalut)
          : 3 == this.tab_index && (u = this.lobby_bg_default)),
        u == s.item_id ? (c.visible = true) : (c.visible = false),
        (h.getChildByName('lock').visible = !s.owned),
        r.skin || (r.skin = new t.UI_Item_Skin(h.getChildByName('icon'))),
        r.skin.setSkin(o.icon);
      a.getChildByName('name').text = o[`name_${GameMgr.client_language}`];
    }),
    (e.prototype._on_select_change = function() {
      if (
        ((this.img_mjp.visible = 1 == this.tab_index || 2 == this.tab_index),
        this.select_index >= 0 && this.select_index < this.items.length)
      ) {
        const t = this.items[this.select_index];
        if (t.owned) {
          let e = GameMgr.Inst.commonview_slot[this.tab_index];
          e ||
            (1 == this.tab_index
              ? (e = this.desktop_default)
              : 2 == this.tab_index
              ? (e = this.mjp_defalut)
              : 3 == this.tab_index && (e = this.lobby_bg_default)),
            e == t.item_id
              ? (this.btn_save.visible = false)
              : ((this.btn_save.visible = true),
                (this.btn_save.getChildByName(
                  'info'
                ).text = game.Tools.strOfLocalization(2035)));
        } else this.btn_save.visible = false;
        1 == this.tab_index
          ? (this._show_desktop_preview(t.item_id),
            this._show_mjp_preview(
              game.GameUtility.get_common_view_id(game.ECommonView.mjp)
            ))
          : 2 == this.tab_index
          ? (this._show_mjp_preview(t.item_id),
            this._show_desktop_preview(
              game.GameUtility.get_common_view_id(game.ECommonView.desktop)
            ))
          : 3 == this.tab_index && this._show_lobby_bg_preview(t.item_id);
      } else
        (this.btn_save.visible = false),
          1 == this.tab_index
            ? (this._show_desktop_preview(0),
              this._show_mjp_preview(
                game.GameUtility.get_common_view_id(game.ECommonView.mjp)
              ))
            : 2 == this.tab_index
            ? (this._show_mjp_preview(0),
              this._show_desktop_preview(
                game.GameUtility.get_common_view_id(game.ECommonView.desktop)
              ))
            : 3 == this.tab_index && this._show_lobby_bg_preview(0);
    }),
    (e.prototype._show_desktop_preview = function(t) {
      let e = cfg.item_definition.view.get(t);
      let i = '';
      e || (e = cfg.item_definition.view.get(this.desktop_default)),
        (i = `myres2/tablecloth/${e.res_name}/preview.jpg`),
        game.LoadMgr.clearImgSkin(this.img_desktop),
        '' != this.img_desktop.skin &&
          (Laya.loader.clearTextureRes(this.img_desktop.skin),
          (this.img_desktop.skin = '')),
        game.LoadMgr.setImgSkin(this.img_desktop, i);
    }),
    (e.prototype._show_mjp_preview = function(t) {
      let e = cfg.item_definition.view.get(t);
      let i = '';
      e || (e = cfg.item_definition.view.get(this.mjp_defalut)),
        (i = `myres2/mjp/${e.res_name}/preview.png`),
        game.LoadMgr.clearImgSkin(this.img_mjp),
        '' != this.img_mjp.skin &&
          (Laya.loader.clearTextureRes(this.img_mjp.skin),
          (this.img_mjp.skin = '')),
        game.LoadMgr.setImgSkin(this.img_mjp, i);
    }),
    (e.prototype._show_lobby_bg_preview = function(t) {
      let e = cfg.item_definition.view.get(t);
      let i = '';
      e || (e = cfg.item_definition.view.get(this.lobby_bg_default)),
        (i = `myres2/lobby_bg/${e.res_name}.jpg`),
        game.LoadMgr.clearImgSkin(this.img_desktop),
        '' != this.img_desktop.skin &&
          (Laya.loader.clearTextureRes(this.img_desktop.skin),
          (this.img_desktop.skin = '')),
        game.LoadMgr.setImgSkin(this.img_desktop, i);
    }),
    (e.prototype.save_change = function() {
      const t = this.items[this.select_index];
      let e = t.item_id;
      if (
        (0 == this.select_index && (e = 0),
        (GameMgr.Inst.commonview_slot[this.tab_index] = e),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'changeCommonView',
          { slot: this.tab_index, value: e },
          (t, e) => {
            t ? app.Log.log(t) : app.Log.log(e);
          }
        ),
        2 == this.tab_index && GameMgr.Inst.load_mjp_view(e),
        3 == this.tab_index)
      ) {
        let i = '';
        if (0 != this.select_index) {
          i =
            `scene/Assets/Resource/lobby/${cfg.item_definition.view.get(t.item_id).res_name}.jpg`;
        } else i = 'scene/Assets/Resource/lobby/yard.jpg';
        game.Scene_Lobby.Inst.set_lobby_bg(i);
      }
      for (let n = 0; n < this.items.length; n++)
        this.scrollview.wantToRefreshItem(n);
      this._on_select_change();
    }),
    e
  ;
  })();
  t.UI_Bag_PageDesktop = e;
})(uiscript || (uiscript = {}));