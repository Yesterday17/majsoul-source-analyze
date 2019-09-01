let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.mj.liujuUI()) || this;
      return (t.root = null), (t.img_title = null), t;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      (this.root = this.me.getChildByName('root')),
        (this.img_title = this.root.getChildByName('title'));
    }),
    (i.prototype.Show = function(t) {
      const e = this;
      this.data = t;
      let i = '';
      let n = '';
      switch (t.type) {
        case mjcore.E_LiuJu.jiuzhongjiupai:
          (i = 'jiuzhongjiupai'), (n = 'gameend_jiuzhongjiupai');
          break;
        case mjcore.E_LiuJu.sanjiahule:
          i = 'sanjiahule';
          break;
        case mjcore.E_LiuJu.sifenglianda:
          (i = 'sifenglianda'), (n = 'gameend_sifenglianda');
          break;
        case mjcore.E_LiuJu.sijializhi:
          i = 'sijializhi';
          break;
        case mjcore.E_LiuJu.sigangsanle:
          (i = 'sigangsanle'), (n = 'gameend_sigangliuju');
      }
      (this.img_title.skin = game.Tools.localUISrc(
        `myres/mjdesktop/${i}.png`
      )),
        (this.enable = true),
        Laya.Tween.from(this.root, { alpha: 0 }, 500),
        '' != n &&
          (t.type == mjcore.E_LiuJu.jiuzhongjiupai
            ? view.AudioMgr.PlayCharactorSound(
                view.DesktopMgr.Inst.player_datas[t.seat].character,
                n
              )
            : view.AudioMgr.PlayCharactorSound(
                view.DesktopMgr.Inst.main_role_character_info,
                n
              )),
        view.DesktopMgr.Inst.mode == view.EMJMode.play
          ? Laya.timer.once(4e3, this, this.onBtnConfirm)
          : Laya.timer.once(4e3, this, () => {
              e.enable = false;
            });
    }),
    (i.prototype.onDisable = function() {
      Laya.timer.clearAll(this);
    }),
    (i.prototype.onBtnConfirm = function() {
      null != view.DesktopMgr.Inst.gameEndResult
        ? (t.UIMgr.Inst.ShowGameEnd(), (this.enable = false))
        : (view.DesktopMgr.Inst.Reset(),
          Laya.timer.once(200, this, () => {
            app.NetAgent.sendReq2MJ(
              'FastTest',
              'confirmNewRound',
              {},
              (t, e) => {}
            );
          }));
    }),
    i
  ;
  })(t.UIBase);
  t.UI_LiuJu = e;
})(uiscript || (uiscript = {}));