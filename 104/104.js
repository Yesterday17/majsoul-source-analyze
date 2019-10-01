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
            game.Tools.strOfLocalization(2232),
            new ui.lobby.activitys.activity_jiujiUI()
          ) || this;
        t.btn_cd = 0;
        return t;
      }

      static Init() {
        var e = this;

        app.NetAgent.sendReq2Lobby('Lobby', 'fetchReviveCoinInfo', {}, (i, n) => {
          i || n.error
            ? t.UIMgr.Inst.showNetReqError('fetchReviveCoinInfo', i, n)
            : (e.has_gained = n.has_gained);
        });

        app.NetAgent.AddListener2Lobby(
          'NotifyReviveCoinUpdate',
          Laya.Handler.create(
            this,
            ({has_gained}) => {
              e.has_gained = has_gained;
              e.Inst && e.Inst.enable && e.Inst.refresh();
            },
            null,
            !1
          )
        );
      }

      isopen() {
        return !0;
      }

      onCreate() {
        var e = this;
        this.root = this.me.getChildByName('root');
        this.title = this.root.getChildByName('title');
        this.desc = this.root.getChildByName('desc');
        var n = this.root.getChildByName('task');

        this.task = {
          container: n,
          bg: n.getChildByName('bg'),
          container_info: n.getChildByName('info'),
          item_icon: n.getChildByName('info').getChildByName('item'),
          item_count: n.getChildByName('info').getChildByName('item_count'),
          item_name: n.getChildByName('info').getChildByName('item_name'),
          btn_get: n.getChildByName('info').getChildByName('btn_get'),
          getno: n.getChildByName('info').getChildByName('noget'),
          alreadyget: n.getChildByName('info').getChildByName('alreadyget')
        };

        this.task.btn_get.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.btn_cd = Laya.timer.currTimer + 1e3;
              e.btn_cd > Laya.timer.currTimer ||
                (app.NetAgent.sendReq2Lobby(
                'Lobby',
                'gainReviveCoin',
                {},
                (n, a) => {
                  e.btn_cd = 0;
                  e.task.btn_get.visible = !1;
                  e.task.alreadyget.visible = !0;
                  n || a.error
                    ? t.UIMgr.Inst.showNetReqError('gainReviveCoin', n, a)
                    : (i.has_gained = !0);
                }
              ));
            },
            null,
            !1
          );
      }

      show() {
        this.me.visible = !0;
        this.btn_cd = 0;
        this.refresh();
      }

      hide() {
        this.me.visible = !1;
      }

      findData() {
        var t = 0;

        cfg.events.soscoin.forEach(({level_limit, id, level3_limit}) => {
          level_limit == GameMgr.Inst.account_data.level.id && (t = id);
          level3_limit == GameMgr.Inst.account_data.level3.id &&
            (t = id);
        });

        return t;
      }

      refresh() {
        var t = cfg.events.soscoin.get(this.findData());
        this.desc.text = t[`desc_${GameMgr.client_language}`];

        this.task.bg.skin = game.Tools.localUISrc(
          'myres/lobby/bg_rules_no.png'
        );

        this.desc.text = game.Tools.strOfLocalization(2233);
        this.task.container_info.visible = !1;
        if (t)
          if (
            (t.gold_num < 1)
          )
            this.task.container_info.visible = !1;
          else {
            this.task.bg.skin = game.Tools.localUISrc(
              'myres/lobby/bg_rules.png'
            );

            this.task.container_info.visible = !0;
            this.task.getno.visible = !1;
            this.task.btn_get.visible = !1;
            this.task.alreadyget.visible = !1;
            this.task.item_count.text = t.gold_num.toString();
            i.has_gained
              ? (this.task.alreadyget.visible = !0)
              : GameMgr.Inst.account_data.gold < t.gold_limit
              ? (this.task.btn_get.visible = !0)
              : (this.task.getno.visible = !0);
            var e = cfg.item_definition.currency.get(100002);
            this.task.item_icon.skin = game.LoadMgr.getResImageSkin(e.icon);
            this.task.item_name.text = e[`name_${GameMgr.client_language}`];
          }
        else
          this.task.bg.skin = game.Tools.localUISrc(
              'myres/lobby/bg_rules_no.png'
            );
      }
    }

    __extends(i, e);

    i.Inst = null;
    i.has_gained = !1;
    return i;
  })(t.UI_ActivityBase);
  t.UI_Activity_Jiuji = e;
})(uiscript || (uiscript = {}));