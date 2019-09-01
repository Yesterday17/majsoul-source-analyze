let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.entrance.choose_routeUI()) || this;
      return (t.btns = []), (i.Inst = t), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.root = this.me
        .getChildByName('servers')
        .getChildByName('container')),
        (this.me.visible = false),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.close();
          },
          null,
          false
        ));
      for (
        let i = i => {
                const a = n.root.getChildByName(`btn${i}`);
                n.btns.push(a),
                  (a.clickHandler = new Laya.Handler(n, () => {
                    t.UI_Entrance.Inst.showServer(i), e.close();
                  }));
              },
            n = this,
            a = 0;
        a < 2;
        a++
      )
        i(a);
    }),
    (i.prototype.show = function() {
      (this.enable = true),
        t.UIBase.anim_pop_out(this.root, null),
        game.LobbyNetMgr.gateway_regions.mainland
          ? (this.btns[0].visible = true)
          : (this.btns[0].visible = false),
        game.LobbyNetMgr.gateway_regions.hk
          ? (this.btns[1].visible = true)
          : (this.btns[1].visible = false);
    }),
    (i.prototype.close = function() {
      const e = this;
      t.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          e.enable = false;
        })
      );
    }),
    i
  ;
  })(t.UIBase);
  t.UI_Entrance_Choose_Route = e;
})(uiscript || (uiscript = {}));