var game;
!(function(t) {
  t.stardust_id = 302004;
  var e;
  !(function(t) {
    (t[(t.desktop = 1)] = 'desktop'), (t[(t.mjp = 2)] = 'mjp');
  })((e = t.ECommonView || (t.ECommonView = {})));
  !(function(t) {
    (t[(t.liqibang = 1)] = 'liqibang'),
      (t[(t.hupai_effect = 2)] = 'hupai_effect'),
      (t[(t.liqi_effect = 3)] = 'liqi_effect'),
      (t[(t.hand_model = 4)] = 'hand_model'),
      (t[(t.liqi_bgm = 5)] = 'liqi_bgm');
  })(t.EPlayerView || (t.EPlayerView = {}));
  var i;
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.currency = 1)] = 'currency'),
      (t[(t.character = 2)] = 'character'),
      (t[(t.item = 3)] = 'item'),
      (t[(t.skin = 4)] = 'skin'),
      (t[(t.title = 5)] = 'title');
  })((i = t.EIDType || (t.EIDType = {})));
  !(function(t) {
    t[(t.user_xieyi = 1)] = 'user_xieyi';
  })(t.EAccountSetKey || (t.EAccountSetKey = {}));
  var n = (function() {
    function t() {}
    return (
      (t.get_common_view_id = function(t) {
        var e = t.toString();
        return GameMgr.Inst.commonview_slot.hasOwnProperty(e)
          ? GameMgr.Inst.commonview_slot[e]
          : 0;
      }),
      (t.get_common_view_res_name = function(t) {
        var i = cfg.item_definition.view.get(this.get_common_view_id(t));
        if (i)
          return t == e.mjp && view.DesktopMgr.en_mjp
            ? i.res_name + '_0'
            : i.res_name;
        switch (t) {
          case e.desktop:
            return 'tablecloth_default';
          case e.mjp:
            return view.DesktopMgr.en_mjp ? 'mjp_default_0' : 'mjp_default';
        }
        return 'default';
      }),
      (t.get_id_type = function(t) {
        var e = Math.floor(t / 1e4);
        return 10 == e
          ? i.currency
          : 20 == e
          ? i.character
          : 30 == e
          ? i.item
          : 40 == e
          ? i.skin
          : 60 == e
          ? i.title
          : i.none;
      }),
      (t.get_item_view = function(t) {
        var e = '',
          n = '',
          a = '';
        switch (this.get_id_type(t)) {
          case i.currency:
            var r = cfg.item_definition.currency.get(t);
            r &&
              ((e = r['name_' + GameMgr.client_language]),
              (n = r.icon),
              (a = r['desc_' + GameMgr.client_language]));
            break;
          case i.character:
            var s = cfg.item_definition.character.get(t);
            s &&
              ((e = s['name_' + GameMgr.client_language]),
              (n =
                cfg.item_definition.skin.get(s.init_skin).path +
                '/bighead.png'),
              (a = s['desc_item_' + GameMgr.client_language]));
            break;
          case i.item:
            var o = cfg.item_definition.item.get(t);
            o &&
              ((e = o['name_' + GameMgr.client_language]),
              (n = o.icon),
              (a = o['desc_' + GameMgr.client_language]));
            break;
          case i.skin:
            var l = cfg.item_definition.skin.get(t);
            l &&
              ((e = l['name_' + GameMgr.client_language]),
              (n = l.path + '/bighead.png'),
              (a = l['desc_' + GameMgr.client_language]));
            break;
          case i.title:
            var h = cfg.item_definition.title.get(t);
            h &&
              ((e = h['name_' + GameMgr.client_language]),
              (n = h.icon_item),
              (a = h['desc_' + GameMgr.client_language]));
        }
        return { name: e, icon: n, desc: a };
      }),
      (t.item_owned = function(t) {
        var e = this.get_id_type(t);
        if (e == i.character) {
          if ((a = uiscript.UI_Sushe.characters))
            for (r = 0; r < a.length; r++)
              if (a[r] && a[r].charid == t) return true;
        } else if (e == i.item) {
          var n = cfg.item_definition.item.get(t);
          if (n && (4 == n.category || 5 == n.category)) {
            if (uiscript.UI_Bag.get_item_count(t) > 0) return true;
          }
        } else {
          if (e == i.skin) return uiscript.UI_Sushe.skin_owned(t);
          if (e == i.title) {
            var a = uiscript.UI_TitleBook.owned_title;
            if (a) for (var r = 0; r < a.length; r++) if (a[r] == t) return true;
          }
        }
        return false;
      }),
      t
    );
  })();
  t.GameUtility = n;
})(game || (game = {}));