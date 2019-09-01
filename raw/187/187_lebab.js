let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.openboxUI()) || this;
      return (
        (t.locking = false),
        (t.datas = []),
        (t.choosed_index = -1),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.blackBg = this.me.getChildByName('backbg')),
        (this.root = this.me.getChildByName('root')),
        (this.box_name = this.root.getChildByName('box_name')),
        (this.btn_confirm = this.root.getChildByName('btn_confirm')),
        (this.scroll_view = this.root.scriptMap['capsui.CScrollView']),
        this.scroll_view.init_scrollview(
          new Laya.Handler(this, this.render_item),
          -1,
          4
        ),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = new Laya.Handler(this, () => {
          e.locking || e.close();
        })),
        (this.btn_confirm.clickHandler = new Laya.Handler(this, () => {
          if (!e.locking && -1 != e.choosed_index) {
            const i = e.datas[e.choosed_index].item_id;
            const n = e.datas[e.choosed_index].count;
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'openManualItem',
              { item_id: e.box_id, count: n, select_id: i },
              (e, a) => {
                if (e || a.error)
                  t.UIMgr.Inst.showNetReqError('openManualItem', e, a);
                else {
                  const r = game.GameUtility.get_item_view(i);
                  t.UI_LightTips.Inst.show(
                    game.Tools.strOfLocalization(2781, [r.name, n.toString()])
                  );
                }
              }
            ),
              e.close();
          }
        }));
    }),
    (i.prototype.show = function(e) {
      const i = this;
      (this.enable = true),
        (this.locking = true),
        (this.blackBg.alpha = 0),
        Laya.Tween.to(this.blackBg, { alpha: 0.3 }, 150),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            i.locking = false;
          })
        ),
        (this.box_id = e),
        (this.choosed_index = -1),
        (this.datas = []);
      for (
        var n = cfg.item_definition.item.get(e),
          a = cfg.item_definition.item_manual_pool.findGroup(n.iargs[0]),
          r = 0;
        r < a.length;
        r++
      )
        this.datas.push({ item_id: a[r].res_id, count: a[r].res_count });
      this.scroll_view.reset(),
        this.scroll_view.addItem(this.datas.length),
        game.Tools.setGrayDisable(this.btn_confirm, true),
        (this.box_name.text = n[`name_${GameMgr.client_language}`]);
    }),
    (i.prototype.close = function() {
      const e = this;
      (this.locking = true),
        Laya.Tween.to(this.blackBg, { alpha: 0 }, 150),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    (i.prototype.render_item = function({index, container}) {
      const e = this;
      const i = index;
      const n = container;
      const a = this.datas[i].item_id;
      const r = this.datas[i].count;
      const s = n.getChildByName('btn');
      if (
        ((s.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.choosed_index == i ? e.changeSelect(-1) : e.changeSelect(i);
          },
          null,
          false
        )),
        game.LoadMgr.setImgSkin(
          s.getChildByName('icon'),
          cfg.item_definition.item.get(a).icon
        ),
        r <= 1)
      )
        s.getChildByName('num').visible = false;
      else {
        const o = s.getChildByName('num');
        (o.visible = true), (o.text = r.toString());
      }
      s.getChildByName('chosen').visible = this.choosed_index == i;
    }),
    (i.prototype.changeSelect = function(t) {
      const e = this.choosed_index;
      (this.choosed_index = t),
        -1 != e && this.scroll_view.wantToRefreshItem(e),
        -1 != this.choosed_index &&
          this.scroll_view.wantToRefreshItem(this.choosed_index),
        -1 == e &&
          -1 != this.choosed_index &&
          game.Tools.setGrayDisable(this.btn_confirm, false),
        -1 != e &&
          -1 == this.choosed_index &&
          game.Tools.setGrayDisable(this.btn_confirm, true);
    }),
    i
  ;
  })(t.UIBase);
  t.UI_OpenBox = e;
})(uiscript || (uiscript = {}));