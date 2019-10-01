var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(t) {
        var e = this;
        this.desktop_default = 305044;
        this.mjp_defalut = 305045;
        this.lobby_bg_default = 307001;
        this.tab_index = 0;
        this.select_index = 0;
        this.items = [];
        this.img_desktop = null;
        this.img_mjp = null;
        this.btn_save = null;
        this.seen_lobby_bg_map = null;
        this.me = t;

        this.scrollview = t.getChildByName('items').scriptMap[
            'capsui.CScrollView'
          ];

        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_item),
          -1,
          3,
          10
        );

        this.scrollview.reset();

        this.btn_tablecloth = t
            .getChildByName('items')
            .getChildByName('btn_tablecloth');

        this.btn_tablecloth.clickHandler = Laya.Handler.create(
            this,
            () => {
              1 != e.tab_index && e.change_tab(1);
            },
            null,
            !1
          );

        this.btn_cardback = t
            .getChildByName('items')
            .getChildByName('btn_cardback');

        this.btn_cardback.clickHandler = Laya.Handler.create(
            this,
            () => {
              2 != e.tab_index && e.change_tab(2);
            },
            null,
            !1
          );

        this.btn_lobby_bg = t
            .getChildByName('items')
            .getChildByName('btn_lobby_bg');

        this.btn_lobby_bg.clickHandler = new Laya.Handler(this, () => {
            3 != e.tab_index && e.change_tab(3);
          });
        var i = this.me.getChildByName('preview');
        this.img_desktop = i.getChildByName('desktop');
        this.img_mjp = i.getChildByName('mjp');
        this.btn_save = i.getChildByName('btn_use');
        this.btn_save.clickHandler = Laya.Handler.create(
            this,
            this.save_change,
            null,
            !1
          );
      }

      have_red_point() {
        if (!this.seen_lobby_bg_map) {
          this.seen_lobby_bg_map = {};
          var e = Laya.LocalStorage.getItem(
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
          var a = t.UI_Bag.find_items_by_category(t.EItemCategory.common_view),
            n = 0;
          n < a.length;
          n++
        ) {
          if (
            3 == cfg.item_definition.item.get(a[n].item_id).type &&
            !this.seen_lobby_bg_map[a[n].item_id]
          )
            return !0;
        }
        return !1;
      }

      show() {
        this.me.visible = !0;
        this.btn_save.visible = !1;
        this.change_tab(1);
        this.btn_lobby_bg.getChildByName(
            'redpoint'
          ).visible = this.have_red_point();
      }

      close() {
        this.me.visible = !1;
        this.items = [];
        this.scrollview.reset();
        Laya.loader.clearTextureRes(this.img_desktop.skin);
        Laya.loader.clearTextureRes(this.img_mjp.skin);
        this.img_desktop.skin = '';
        this.img_mjp.skin = '';
        game.LoadMgr.clearImgSkin(this.img_desktop);
        game.LoadMgr.clearImgSkin(this.img_mjp);
      }

      change_tab(e) {
        var i = this;
        this.tab_index = e;
        this.items = [];

        1 == e
          ? this.items.push({ item_id: this.desktop_default, owned: !0 })
          : 2 == e
          ? this.items.push({ item_id: this.mjp_defalut, owned: !0 })
          : 3 == e &&
            this.items.push({ item_id: this.lobby_bg_default, owned: !0 });

        this.scrollview.reset();
        this.select_index = 0;
        this.btn_tablecloth.getChildByName('inchoose').visible = 1 == e;
        this.btn_cardback.getChildByName('inchoose').visible = 2 == e;
        this.btn_lobby_bg.getChildByName('inchoose').visible = 3 == e;
        if (
          (1 == e || 2 == e)
        ) {
          var n = t.UI_Bag.find_items_by_category(t.EItemCategory.common_view);
          n = n.sort(({item_id}, {item_id}) => item_id - item_id);
          for (a = 0; a < n.length; a++)
            if (
              n[a].item_id != this.desktop_default &&
              n[a].item_id != this.mjp_defalut
            ) {
              this.items.push({ item_id: n[a].item_id, owned: !0 });
              cfg.item_definition.item.get(n[a].item_id).type == e &&
                ((n[a].item_id == game.GameUtility.get_common_view_id(e) && (this.select_index = this.items.length - 1)));
            }
        } else
          3 == e &&
            cfg.item_definition.item.forEach(({id, category, type}) => {
              i.items.push({
                  item_id: id,
                  owned: t.UI_Bag.get_item_count(id) > 0
                });

              id != i.lobby_bg_default &&
                5 == category &&
                3 == type &&
                ((id == game.GameUtility.get_common_view_id(e) && (i.select_index = i.items.length - 1)));
            });
        this.select_index < 0 && (this.select_index = 0);
        this.scrollview.addItem(this.items.length);
        this._on_select_change();
        if (
          (3 == e)
        ) {
          this.btn_lobby_bg.getChildByName('redpoint').visible = !1;
          t.UI_Bag.Inst.clear_desktop_btn_redpoint();
          for (var a = 0; a < this.items.length; a++)
            this.items[a].owned &&
              (this.seen_lobby_bg_map[this.items[a].item_id.toString()] = 1);
          var r = '';
          '' != r && (r += ',');
          for (var s in this.seen_lobby_bg_map) r += s;
          Laya.LocalStorage.setItem(
            game.Tools.eeesss(`lobby_bg_list_${GameMgr.Inst.account_id}`),
            game.Tools.eeesss(r)
          );
        }
      }

      render_item({index, container, cache_data}) {
        var i = this;
        var n = index;
        var a = container;
        var r = cache_data;
        var s = this.items[n];
        var o = cfg.item_definition.item.get(s.item_id);
        var l = a.getChildByName('btn').getChildByName('inchoose');
        this.select_index == n ? (l.visible = !0) : (l.visible = !1);
        var h = a.getChildByName('btn');
        h.clickHandler = Laya.Handler.create(
          this,
          () => {
            if (i.select_index != n) {
              var e = i.select_index;
              i.select_index = n;
              l.visible = !0;

              e >= 0 &&
                e < i.items.length &&
                i.scrollview.wantToRefreshItem(e);

              i._on_select_change();
            } else t.UI_ItemDetail.Inst.show(s.item_id);
          },
          null,
          !1
        );
        var c = a.getChildByName('useing');
        var u = GameMgr.Inst.commonview_slot[this.tab_index];

        u ||
          (1 == this.tab_index
            ? (u = this.desktop_default)
            : 2 == this.tab_index
            ? (u = this.mjp_defalut)
            : 3 == this.tab_index && (u = this.lobby_bg_default));

        u == s.item_id ? (c.visible = !0) : (c.visible = !1);
        h.getChildByName('lock').visible = !s.owned;
        r.skin || (r.skin = new t.UI_Item_Skin(h.getChildByName('icon')));
        r.skin.setSkin(o.icon);
        a.getChildByName('name').text = o[`name_${GameMgr.client_language}`];
      }

      _on_select_change() {
        this.img_mjp.visible = 1 == this.tab_index || 2 == this.tab_index;
        this.btn_save.visible = !1;
        this._show_desktop_preview(0);
        this._show_mjp_preview(0);
        if (
          (this.select_index >= 0 && this.select_index < this.items.length)
        ) {
          var t = this.items[this.select_index];
          if (t.owned) {
            var e = GameMgr.Inst.commonview_slot[this.tab_index];

            e ||
              (1 == this.tab_index
                ? (e = this.desktop_default)
                : 2 == this.tab_index
                ? (e = this.mjp_defalut)
                : 3 == this.tab_index && (e = this.lobby_bg_default));

            this.btn_save.visible = !0;
            e == t.item_id
              ? (this.btn_save.visible = !1)
              : (this.btn_save.getChildByName(
                  'info'
                ).text = game.Tools.strOfLocalization(2035));
          } else this.btn_save.visible = !1;
          this._show_desktop_preview(t.item_id);
          this._show_mjp_preview(t.item_id);
          1 == this.tab_index
            ? (this._show_mjp_preview(
            game.GameUtility.get_common_view_id(game.ECommonView.mjp)
          ))
            : 2 == this.tab_index
            ? (this._show_desktop_preview(
            game.GameUtility.get_common_view_id(game.ECommonView.desktop)
          ))
            : 3 == this.tab_index && this._show_lobby_bg_preview(t.item_id);
        } else
          1 == this.tab_index
            ? (this._show_mjp_preview(
            game.GameUtility.get_common_view_id(game.ECommonView.mjp)
          ))
            : 2 == this.tab_index
            ? (this._show_desktop_preview(
            game.GameUtility.get_common_view_id(game.ECommonView.desktop)
          ))
            : 3 == this.tab_index && this._show_lobby_bg_preview(0);
      }

      _show_desktop_preview(t) {
        var e = cfg.item_definition.view.get(t);
        var i = '';
        e || (e = cfg.item_definition.view.get(this.desktop_default));
        i = `myres2/tablecloth/${e.res_name}/preview.jpg`;
        game.LoadMgr.clearImgSkin(this.img_desktop);
        Laya.loader.clearTextureRes(this.img_desktop.skin);

        '' != this.img_desktop.skin &&
          ((this.img_desktop.skin = ''));

        game.LoadMgr.setImgSkin(this.img_desktop, i);
      }

      _show_mjp_preview(t) {
        var e = cfg.item_definition.view.get(t);
        var i = '';
        e || (e = cfg.item_definition.view.get(this.mjp_defalut));
        i = `myres2/mjp/${e.res_name}/preview.png`;
        game.LoadMgr.clearImgSkin(this.img_mjp);
        Laya.loader.clearTextureRes(this.img_mjp.skin);

        '' != this.img_mjp.skin &&
          ((this.img_mjp.skin = ''));

        game.LoadMgr.setImgSkin(this.img_mjp, i);
      }

      _show_lobby_bg_preview(t) {
        var e = cfg.item_definition.view.get(t);
        var i = '';
        e || (e = cfg.item_definition.view.get(this.lobby_bg_default));
        i = `myres2/lobby_bg/${e.res_name}.jpg`;
        game.LoadMgr.clearImgSkin(this.img_desktop);
        Laya.loader.clearTextureRes(this.img_desktop.skin);

        '' != this.img_desktop.skin &&
          ((this.img_desktop.skin = ''));

        game.LoadMgr.setImgSkin(this.img_desktop, i);
      }

      save_change() {
        var t = this.items[this.select_index];
        var e = t.item_id;
        0 == this.select_index && (e = 0);
        GameMgr.Inst.commonview_slot[this.tab_index] = e;

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'changeCommonView',
          { slot: this.tab_index, value: e },
          (t, e) => {
            t ? app.Log.log(t) : app.Log.log(e);
          }
        );

        2 == this.tab_index && GameMgr.Inst.load_mjp_view(e);
        if (
          (3 == this.tab_index)
        ) {
          var i = '';
          if (0 != this.select_index) {
            i =
              `scene/Assets/Resource/lobby/${cfg.item_definition.view.get(t.item_id).res_name}.jpg`;
          } else i = 'scene/Assets/Resource/lobby/yard.jpg';
          game.Scene_Lobby.Inst.set_lobby_bg(i);
        }
        for (var n = 0; n < this.items.length; n++)
          this.scrollview.wantToRefreshItem(n);
        this._on_select_change();
      }
    }

    return e;
  })();
  t.UI_Bag_PageDesktop = e;
})(uiscript || (uiscript = {}));