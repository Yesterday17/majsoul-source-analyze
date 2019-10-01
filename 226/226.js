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
        var t =
          e.call(
            this,
            'chs' == GameMgr.client_language
              ? new ui.lobby.sushe_selectUI()
              : new ui.lobby.sushe_select_enUI()
          ) || this;
        t.container_top = null;
        t.container_heads = null;
        t.scrollview = null;
        t.btn_visit = null;
        t.btn_look = null;
        t.select_index = 0;
        t.locking = !1;
        return t;
      }

      onCreate() {
        var e = this;
        this.container_top = this.me.getChildByName('top');
        this.container_heads = this.me.getChildByName('heads');

        this.scrollview = this.container_heads.scriptMap[
            'capsui.CScrollView'
          ];

        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_character_cell),
          -1,
          3
        );

        this.btn_visit = this.me
            .getChildByName('heads')
            .getChildByName('btn_visit');

        this.btn_visit.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close();
              e.locking ||
                (Laya.timer.once(150, e, () => {
                t.UI_Sushe.Inst.show_page_visit(!1);
              }));
            },
            null,
            !1
          );

        this.btn_look = this.me.getChildByName('btn_look');

        this.btn_look.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close();
              e.locking ||
                (Laya.timer.once(150, e, () => {
                t.UI_Sushe.Inst.to_look_illust();
              }));
            },
            null,
            !1
          );

        this.container_top.getChildByName(
            'btn_back'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.close();
              e.locking || (t.UI_Sushe.Inst.go2Lobby());
            },
            null,
            !1
          );
      }

      show(e) {
        var i = this;
        this.enable = !0;
        this.locking = !0;
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 200);
        t.UIBase.anim_alpha_in(this.container_heads, { x: 30 }, 200);
        t.UIBase.anim_alpha_in(this.btn_look, { x: 30 }, 200);

        Laya.timer.once(200, this, () => {
          i.locking = !1;
        });

        this.select_index = e;
        this.scrollview.reset();
        this.scrollview.addItem(t.UI_Sushe.characters.length);
      }

      close() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150);
        t.UIBase.anim_alpha_out(this.container_heads, { x: 30 }, 150, 0);
        t.UIBase.anim_alpha_out(this.btn_look, { x: 30 }, 150);
        Laya.timer.once(150, this, () => {
          e.locking = !1;
          e.enable = !1;
        });
      }

      onDisable() {
        for (var e = 0; e < t.UI_Sushe.characters.length; e++)
          Laya.loader.clearTextureRes(
            game.LoadMgr.getResImageSkin(
              `${cfg.item_definition.skin.get(t.UI_Sushe.characters[e].skin).path}/bighead.png`
            )
          );
      }

      render_character_cell({index, container, cache_data}) {
        var i = this;
        var n = index;
        var a = container;
        var r = cache_data;
        r.index = n;
        r.inited = !0;

        a.getChildByName('btn').clickHandler = new Laya.Handler(
            this,
            () => {
              i.onClickAtHead(r.index);
            }
          );

        r.inited ||
          ((r.skin = new t.UI_Character_Skin(
            a.getChildByName('btn').getChildByName('head')
          )));
        var s = a.getChildByName('btn');
        s.getChildByName('choose').visible = n == this.select_index;
        r.skin.setSkin(t.UI_Sushe.characters[n].skin, 'bighead');

        s.getChildByName('using').visible =
            t.UI_Sushe.characters[n].charid == t.UI_Sushe.main_character_id;

        s.getChildByName(
            'label_name'
          ).text = cfg.item_definition.character.find(
            t.UI_Sushe.characters[n].charid
          )[`name_${GameMgr.client_language}`];
      }

      onClickAtHead(e) {
        if (this.select_index == e) {
          if (t.UI_Sushe.characters[e].charid != t.UI_Sushe.main_character_id)
            if (t.UI_PiPeiYuYue.Inst.enable)
              t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2769));
            else {
              var i = t.UI_Sushe.main_character_id;

              t.UI_Sushe.main_character_id =
                  t.UI_Sushe.characters[e].charid;

              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'changeMainCharacter',
                { character_id: t.UI_Sushe.main_character_id },
                (t, e) => {}
              );

              GameMgr.Inst.account_data.avatar_id =
                  t.UI_Sushe.characters[e].skin;

              GameMgr.Inst.account_data.avatar_frame = 0;
              if (
                (t.UI_Sushe.characters[e].views)
              )
                for (a = 0; a < t.UI_Sushe.characters[e].views.length; a++) {
                  var n = t.UI_Sushe.characters[e].views[a];
                  n.slot == game.EPlayerView.head_frame &&
                    (GameMgr.Inst.account_data.avatar_frame = n.item_id);
                }
              for (var a = 0; a < t.UI_Sushe.characters.length; a++)
                t.UI_Sushe.characters[a].charid == i &&
                  this.scrollview.wantToRefreshItem(a);
              this.scrollview.wantToRefreshItem(e);
            }
        } else {
          var r = this.select_index;
          this.select_index = e;
          this.scrollview.wantToRefreshItem(r);
          this.scrollview.wantToRefreshItem(e);
          t.UI_Sushe.Inst.change_select(e);
        }
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Sushe_Select = e;
})(uiscript || (uiscript = {}));