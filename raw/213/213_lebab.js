let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t =
        e.call(
          this,
          'chs' == GameMgr.client_language
            ? new ui.lobby.sushe_selectUI()
            : new ui.lobby.sushe_select_enUI()
        ) || this;
      return (
        (t.container_top = null),
        (t.container_heads = null),
        (t.scrollview = null),
        (t.btn_visit = null),
        (t.btn_look = null),
        (t.select_index = 0),
        (t.locking = false),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.container_top = this.me.getChildByName('top')),
        (this.container_heads = this.me.getChildByName('heads')),
        (this.scrollview = this.container_heads.scriptMap[
          'capsui.CScrollView'
        ]),
        this.scrollview.init_scrollview(
          new Laya.Handler(this, this.render_character_cell),
          -1,
          3
        ),
        (this.btn_visit = this.me
          .getChildByName('heads')
          .getChildByName('btn_visit')),
        (this.btn_visit.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              (e.close(),
              Laya.timer.once(150, e, () => {
                t.UI_Sushe.Inst.show_page_visit(false);
              }));
          },
          null,
          false
        )),
        (this.btn_look = this.me.getChildByName('btn_look')),
        (this.btn_look.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              (e.close(),
              Laya.timer.once(150, e, () => {
                t.UI_Sushe.Inst.to_look_illust();
              }));
          },
          null,
          false
        )),
        (this.container_top.getChildByName(
          'btn_back'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || (e.close(), t.UI_Sushe.Inst.go2Lobby());
          },
          null,
          false
        ));
    }),
    (i.prototype.show = function(e) {
      const i = this;
      (this.enable = true),
        (this.locking = true),
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 200),
        t.UIBase.anim_alpha_in(this.container_heads, { x: 30 }, 200),
        t.UIBase.anim_alpha_in(this.btn_look, { x: 30 }, 200),
        Laya.timer.once(200, this, () => {
          i.locking = false;
        }),
        (this.select_index = e),
        this.scrollview.reset(),
        this.scrollview.addItem(t.UI_Sushe.characters.length);
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 150),
        t.UIBase.anim_alpha_out(this.container_heads, { x: 30 }, 150, 0),
        t.UIBase.anim_alpha_out(this.btn_look, { x: 30 }, 150),
        Laya.timer.once(150, this, () => {
          (e.locking = false), (e.enable = false);
        });
    }),
    (i.prototype.onDisable = () => {
      for (let e = 0; e < t.UI_Sushe.characters.length; e++)
        Laya.loader.clearTextureRes(
          game.LoadMgr.getResImageSkin(
            `${cfg.item_definition.skin.get(t.UI_Sushe.characters[e].skin).path}/bighead.png`
          )
        );
    }),
    (i.prototype.render_character_cell = function({index, container, cache_data}) {
      const i = this;
      const n = index;
      const a = container;
      const r = cache_data;
      (r.index = n),
        r.inited ||
          ((r.inited = true),
          (a.getChildByName('btn').clickHandler = new Laya.Handler(
            this,
            () => {
              i.onClickAtHead(r.index);
            }
          )),
          (r.skin = new t.UI_Character_Skin(
            a.getChildByName('btn').getChildByName('head')
          )));
      const s = a.getChildByName('btn');
      (s.getChildByName('choose').visible = n == this.select_index),
        r.skin.setSkin(t.UI_Sushe.characters[n].skin, 'bighead'),
        (s.getChildByName('using').visible =
          t.UI_Sushe.characters[n].charid == t.UI_Sushe.main_character_id),
        (s.getChildByName(
          'label_name'
        ).text = cfg.item_definition.character.find(
          t.UI_Sushe.characters[n].charid
        )[`name_${GameMgr.client_language}`]);
    }),
    (i.prototype.onClickAtHead = function(e) {
      if (this.select_index == e) {
        if (t.UI_Sushe.characters[e].charid != t.UI_Sushe.main_character_id)
          if (t.UI_PiPeiYuYue.Inst.enable)
            t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2769));
          else {
            const i = t.UI_Sushe.main_character_id;
            (t.UI_Sushe.main_character_id = t.UI_Sushe.characters[e].charid),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'changeMainCharacter',
                { character_id: t.UI_Sushe.main_character_id },
                (t, e) => {}
              ),
              (GameMgr.Inst.account_data.avatar_id =
                t.UI_Sushe.characters[e].skin);
            for (let n = 0; n < t.UI_Sushe.characters.length; n++)
              t.UI_Sushe.characters[n].charid == i &&
                this.scrollview.wantToRefreshItem(n);
            this.scrollview.wantToRefreshItem(e);
          }
      } else {
        const a = this.select_index;
        (this.select_index = e),
          this.scrollview.wantToRefreshItem(a),
          this.scrollview.wantToRefreshItem(e),
          t.UI_Sushe.Inst.change_select(e);
      }
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Sushe_Select = e;
})(uiscript || (uiscript = {}));