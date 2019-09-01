var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t =
        e.call(
          this,
          game.Tools.strOfLocalization(2232),
          new ui.lobby.activitys.activity_jiujiUI()
        ) || this;
      return (t.btn_cd = 0), t;
    }
    return (
      __extends(i, e),
      (i.Init = function() {
        var e = this;
        app.NetAgent.sendReq2Lobby('Lobby', 'fetchReviveCoinInfo', {}, function(
          i,
          n
        ) {
          i || n.error
            ? t.UIMgr.Inst.showNetReqError('fetchReviveCoinInfo', i, n)
            : (e.has_gained = n.has_gained);
        }),
          app.NetAgent.AddListener2Lobby(
            'NotifyReviveCoinUpdate',
            Laya.Handler.create(
              this,
              function(t) {
                (e.has_gained = t.has_gained),
                  e.Inst && e.Inst.enable && e.Inst.refresh();
              },
              null,
              false
            )
          );
      }),
      (i.prototype.isopen = function() {
        return true;
      }),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.root = this.me.getChildByName('root')),
          (this.title = this.root.getChildByName('title')),
          (this.desc = this.root.getChildByName('desc'));
        var n = this.root.getChildByName('task');
        (this.task = {
          container: n,
          bg: n.getChildByName('bg'),
          container_info: n.getChildByName('info'),
          item_icon: n.getChildByName('info').getChildByName('item'),
          item_count: n.getChildByName('info').getChildByName('item_count'),
          item_name: n.getChildByName('info').getChildByName('item_name'),
          btn_get: n.getChildByName('info').getChildByName('btn_get'),
          getno: n.getChildByName('info').getChildByName('noget'),
          alreadyget: n.getChildByName('info').getChildByName('alreadyget')
        }),
          (this.task.btn_get.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.btn_cd > Laya.timer.currTimer ||
                ((e.btn_cd = Laya.timer.currTimer + 1e3),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'gainReviveCoin',
                  {},
                  function(n, a) {
                    (e.btn_cd = 0),
                      n || a.error
                        ? t.UIMgr.Inst.showNetReqError('gainReviveCoin', n, a)
                        : ((e.task.btn_get.visible = false),
                          (e.task.alreadyget.visible = true),
                          (i.has_gained = true));
                  }
                ));
            },
            null,
            false
          ));
      }),
      (i.prototype.show = function() {
        (this.me.visible = true), (this.btn_cd = 0), this.refresh();
      }),
      (i.prototype.hide = function() {
        this.me.visible = false;
      }),
      (i.prototype.findData = function() {
        var t = 0;
        return (
          cfg.events.soscoin.forEach(function(e) {
            e.level_limit == GameMgr.Inst.account_data.level.id && (t = e.id),
              e.level3_limit == GameMgr.Inst.account_data.level3.id &&
                (t = e.id);
          }),
          t
        );
      }),
      (i.prototype.refresh = function() {
        var t = cfg.events.soscoin.get(this.findData());
        if (t)
          if (
            ((this.desc.text = t['desc_' + GameMgr.client_language]),
            t.gold_num < 1)
          )
            (this.task.bg.skin = game.Tools.localUISrc(
              'myres/lobby/bg_rules_no.png'
            )),
              (this.task.container_info.visible = false);
          else {
            (this.task.bg.skin = game.Tools.localUISrc(
              'myres/lobby/bg_rules.png'
            )),
              (this.task.container_info.visible = true),
              (this.task.getno.visible = false),
              (this.task.btn_get.visible = false),
              (this.task.alreadyget.visible = false),
              (this.task.item_count.text = t.gold_num.toString()),
              i.has_gained
                ? (this.task.alreadyget.visible = true)
                : GameMgr.Inst.account_data.gold < t.gold_limit
                ? (this.task.btn_get.visible = true)
                : (this.task.getno.visible = true);
            var e = cfg.item_definition.currency.get(100002);
            (this.task.item_icon.skin = game.LoadMgr.getResImageSkin(e.icon)),
              (this.task.item_name.text = e['name_' + GameMgr.client_language]);
          }
        else
          (this.desc.text = game.Tools.strOfLocalization(2233)),
            (this.task.container_info.visible = false),
            (this.task.bg.skin = game.Tools.localUISrc(
              'myres/lobby/bg_rules_no.png'
            ));
      }),
      (i.Inst = null),
      (i.has_gained = false),
      i
    );
  })(t.UI_ActivityBase);
  t.UI_Activity_Jiuji = e;
})(uiscript || (uiscript = {}));