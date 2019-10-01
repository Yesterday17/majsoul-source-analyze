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
  var e = (() => {
    class e {
      constructor(e, i) {
        var n = this;
        this.me = e;
        this.father = i;
        this.me.visible = !1;
        this.container_info = e.getChildByName('info');
        this.item_icon = this.container_info.getChildByName('item');
        this.item_name = this.container_info.getChildByName('item_name');
        this.item_count = this.container_info.getChildByName('item_count');
        this.btn_exchange = this.container_info.getChildByName(
            'btn_exchange'
          );
        var a = this.container_info.getChildByName('count');
        this.currency_icon = a.getChildByName('icon');
        this.currency_count = a.getChildByName('need_count');
        this.left_count = a.getChildByName('left_count');
        this.btn_icon = this.container_info.getChildByName('btn_icon');

        this.btn_icon.clickHandler = Laya.Handler.create(
            this,
            () => {
              var e = cfg.activity.exchange.get(n.id);
              e && t.UI_ItemDetail.Inst.show(e.reward_id);
            },
            null,
            !1
          );

        this.label_getted = this.container_info.getChildByName('getted');
      }

      refresh() {
        var e = this,
          i = this.id,
          n = cfg.activity.exchange.get(i);
        this.container_info.visible = !0;
        this.item_count.text = `x${n.reward_count}`;
        var a = cfg.item_definition.currency.get(n.reward_id);
        game.LoadMgr.setImgSkin(this.item_icon, a.icon);
        a &&
          ((this.item_name.text = a[`name_${GameMgr.client_language}`]));
        var r = cfg.item_definition.item.get(n.reward_id);
        game.LoadMgr.setImgSkin(this.item_icon, r.icon);
        r &&
          ((this.item_name.text = r[`name_${GameMgr.client_language}`]));
        var s = cfg.item_definition.item.get(n.consume_id);
        s && game.LoadMgr.setImgSkin(this.currency_icon, s.icon_transparent);
        this.currency_count.text = n.consume_count.toString();
        this.item_count.x =
            this.item_name.textField.textWidth * this.item_name.scaleX +
            this.item_name.x +
            40;
        var o = this.count,
          l = n.exchange_limit;
        o = o >= l ? 0 : l - o;
        this.left_count.text = `${o}/${l}`;

        'en' == GameMgr.client_language
          ? (this.left_count.x = 55)
          : (this.left_count.x = 78);

        this.label_getted.visible = !1;
        this.btn_exchange.visible = !1;
        this.left_count.color = '#37b625';

        t.UI_Bag.get_item_count(n.consume_id) < n.consume_count
          ? (this.btn_exchange.filters = [
              new Laya.ColorFilter(t.GRAY_FILTER)
            ])
          : (this.btn_exchange.filters = []);

        this.btn_exchange.visible = !0;
        this.left_count.color = '#e3283c';
        this.btn_exchange.clickHandler = null;
        this.label_getted.visible = !0;
        0 != o
          ? (this.btn_exchange.clickHandler = Laya.Handler.create(
              this,
              () => {
                game.Tools.setGrayDisable(e.btn_exchange, !0);
                t.UI_Bag.get_item_count(n.consume_id) < n.consume_count
                  ? t.UIMgr.Inst.ShowErrorInfo(
                      game.Tools.strOfLocalization(2230, [
                        s[`name_${GameMgr.client_language}`]
                      ])
                    )
                  : (app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'exchangeActivityItem',
                  { exchange_id: i },
                  (n, a) => {
                    game.Tools.setGrayDisable(e.btn_exchange, !1);
                    if (i == e.id)
                      if (
                        (n || a.error)
                      )
                        t.UIMgr.Inst.showNetReqError(
                          'exchangeActivityItem',
                          n,
                          a
                        );
                      else {
                        e.count++;
                        e.father.refreshCurrencyCount();

                        Laya.timer.once(500, e, () => {
                          e.father.refreshCurrencyCount();
                        });

                        t.UI_Activity.onExchanged(i);
                        if (
                          (r && r.category == t.EItemCategory.fudai)
                        ) {
                          if (a.execute_reward) {
                            for (
                              var s = [], o = 0;
                              o < a.execute_reward.length;
                              o++
                            )
                              s.push(a.execute_reward[o].reward);
                            game.Tools.showRewards(
                              { rewards: s },
                              null
                            );
                          }
                        } else
                          t.UI_LightTips.Inst.show(
                            game.Tools.strOfLocalization(2231, [
                              `${e.item_name.text} ${e.item_count.text}`
                            ])
                          );
                        e.father.refreshAll();
                      }
                  }
                ));
              },
              null,
              !1
            ))
          : (game.Tools.setGrayDisable(this.btn_exchange, !0));
      }

      show({exchange_id, count}) {
        this.id = exchange_id;
        this.count = count;
        this.refresh();
        this.me.visible = !0;
      }
    }

    return e;
  })();

  var i = (t => {
    class i {
      constructor(e, i) {
        return t.call(this, e, i) || this;
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');
        this.content = this.root.getChildByName('content');
        this.head = this.content.getChildByName('head');
        this.task_templete = this.content.getChildByName('task_templete');
        this.task_templete.visible = !1;
        this.cells = [];
        for (var i = 0; i < 20; i++)
          this.cells.push(
            new e(
              this.task_templete.scriptMap['capsui.UICopy'].getNodeClone(),
              this
            )
          );
        this.scrollbar = this.root.getChildByName('scrollbar');
        this.scrollpoint = this.scrollbar.getChildByName('scrollpoint');
        this.content.vScrollBarSkin = '';
        this.content.vScrollBar.on('change', this, () => {
          t.refresh_scrollbar();
        });
      }

      refreshCurrencyCount() {}

      refreshView(t) {
        this.cells[i].show(t[i]);
        this.cells[i].me.y = e;
        for (var e = this.head.height + 15, i = 0; i < this.cells.length; i++)
          i < t.length
            ? (e += this.cells[i].me.height)
            : (this.cells[i].me.visible = !1);
        this.total_h = e;
        this.content.refresh();
        this.refresh_scrollbar();
        this.refreshCurrencyCount();
      }

      refreshAll() {
        for (var t = 0; t < this.cells.length; t++)
          this.cells[t].me.visible && this.cells[t].refresh();
      }

      refresh_scrollbar() {
        if (this.total_h > this.content.height) {
          var t = this.content.vScrollBar.value / this.content.vScrollBar.max;

          this.scrollpoint.height =
            (this.scrollbar.height * this.content.height) / this.total_h;

          this.scrollpoint.y =
              t *
              this.scrollbar.height *
              (1 - this.content.height / this.total_h);

          this.scrollbar.visible = !0;
        } else this.scrollbar.visible = !1;
      }
    }

    __extends(i, t);

    return i;
  })(t.UI_ActivityBase);

  t.UI_Activity_Exchange = i;
})(uiscript || (uiscript = {}));