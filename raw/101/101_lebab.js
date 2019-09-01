let uiscript;
!(t => {
  const e = (() => {
      function e(e, i) {
        const n = this;
        (this.me = e),
          (this.father = i),
          (this.me.visible = false),
          (this.container_info = e.getChildByName('info')),
          (this.item_icon = this.container_info.getChildByName('item')),
          (this.item_name = this.container_info.getChildByName('item_name')),
          (this.item_count = this.container_info.getChildByName('item_count')),
          (this.btn_exchange = this.container_info.getChildByName(
            'btn_exchange'
          ));
        const a = this.container_info.getChildByName('count');
        (this.currency_icon = a.getChildByName('icon')),
          (this.currency_count = a.getChildByName('need_count')),
          (this.left_count = a.getChildByName('left_count')),
          (this.btn_icon = this.container_info.getChildByName('btn_icon')),
          (this.btn_icon.clickHandler = Laya.Handler.create(
            this,
            () => {
              const e = cfg.activity.exchange.get(n.id);
              e && t.UI_ItemDetail.Inst.show(e.reward_id);
            },
            null,
            false
          )),
          (this.label_getted = this.container_info.getChildByName('getted'));
      }
      return (e.prototype.refresh = function() {
        const e = this, i = this.id, n = cfg.activity.exchange.get(i);
        (this.container_info.visible = true),
          (this.item_count.text = `x${n.reward_count}`);
        const a = cfg.item_definition.currency.get(n.reward_id);
        a &&
          (game.LoadMgr.setImgSkin(this.item_icon, a.icon),
          (this.item_name.text = a[`name_${GameMgr.client_language}`]));
        const r = cfg.item_definition.item.get(n.reward_id);
        r &&
          (game.LoadMgr.setImgSkin(this.item_icon, r.icon),
          (this.item_name.text = r[`name_${GameMgr.client_language}`]));
        const s = cfg.item_definition.item.get(n.consume_id);
        s && game.LoadMgr.setImgSkin(this.currency_icon, s.icon_transparent),
          (this.currency_count.text = n.consume_count.toString()),
          (this.item_count.x =
            this.item_name.textField.textWidth + this.item_name.x + 50);
        let o = this.count;
        const l = n.exchange_limit;
        (o = o >= l ? 0 : l - o),
          (this.left_count.text = `${o}/${l}`),
          'en' == GameMgr.client_language
            ? (this.left_count.x = 55)
            : (this.left_count.x = 78),
          (this.label_getted.visible = false),
          (this.btn_exchange.visible = false),
          0 != o
            ? ((this.left_count.color = '#37b625'),
              t.UI_Bag.get_item_count(n.consume_id) < n.consume_count
                ? (this.btn_exchange.filters = [
                    new Laya.ColorFilter(t.GRAY_FILTER)
                  ])
                : (this.btn_exchange.filters = []),
              (this.btn_exchange.visible = true),
              (this.btn_exchange.clickHandler = Laya.Handler.create(
                this,
                () => {
                  t.UI_Bag.get_item_count(n.consume_id) < n.consume_count
                    ? t.UIMgr.Inst.ShowErrorInfo(
                        game.Tools.strOfLocalization(2230, [
                          s[`name_${GameMgr.client_language}`]
                        ])
                      )
                    : (game.Tools.setGrayDisable(e.btn_exchange, true),
                      app.NetAgent.sendReq2Lobby(
                        'Lobby',
                        'exchangeActivityItem',
                        { exchange_id: i },
                        (n, a) => {
                          if (i == e.id)
                            if (
                              (game.Tools.setGrayDisable(e.btn_exchange, false),
                              n || a.error)
                            )
                              t.UIMgr.Inst.showNetReqError(
                                'exchangeActivityItem',
                                n,
                                a
                              );
                            else {
                              if (
                                (e.count++,
                                e.father.refreshCurrencyCount(),
                                Laya.timer.once(500, e, () => {
                                  e.father.refreshCurrencyCount();
                                }),
                                t.UI_Activity.onExchanged(i),
                                r && r.category == t.EItemCategory.fudai)
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
                false
              )))
            : ((this.left_count.color = '#e3283c'),
              (this.btn_exchange.clickHandler = null),
              (this.label_getted.visible = true),
              game.Tools.setGrayDisable(this.btn_exchange, true));
      }),
      (e.prototype.show = function({exchange_id, count}) {
        (this.id = exchange_id),
          (this.count = count),
          this.refresh(),
          (this.me.visible = true);
      }),
      e
    ;
    })();

  const i = (t => {
    function i(e, i) {
      return t.call(this, e, i) || this;
    }
    return __extends(i, t),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.content = this.root.getChildByName('content')),
        (this.head = this.content.getChildByName('head')),
        (this.task_templete = this.content.getChildByName('task_templete')),
        (this.task_templete.visible = false),
        (this.cells = []);
      for (let i = 0; i < 20; i++)
        this.cells.push(
          new e(
            this.task_templete.scriptMap['capsui.UICopy'].getNodeClone(),
            this
          )
        );
      (this.scrollbar = this.root.getChildByName('scrollbar')),
        (this.scrollpoint = this.scrollbar.getChildByName('scrollpoint')),
        (this.content.vScrollBarSkin = ''),
        this.content.vScrollBar.on('change', this, () => {
          t.refresh_scrollbar();
        });
    }),
    (i.prototype.refreshCurrencyCount = () => {}),
    (i.prototype.refreshView = function(t) {
      for (var e = this.head.height + 15, i = 0; i < this.cells.length; i++)
        i < t.length
          ? (this.cells[i].show(t[i]),
            (this.cells[i].me.y = e),
            (e += this.cells[i].me.height))
          : (this.cells[i].me.visible = false);
      (this.total_h = e),
        this.content.refresh(),
        this.refresh_scrollbar(),
        this.refreshCurrencyCount();
    }),
    (i.prototype.refreshAll = function() {
      for (let t = 0; t < this.cells.length; t++)
        this.cells[t].me.visible && this.cells[t].refresh();
    }),
    (i.prototype.refresh_scrollbar = function() {
      if (this.total_h > this.content.height) {
        const t = this.content.vScrollBar.value / this.content.vScrollBar.max;
        (this.scrollpoint.height =
          (this.scrollbar.height * this.content.height) / this.total_h),
          (this.scrollpoint.y =
            t *
            this.scrollbar.height *
            (1 - this.content.height / this.total_h)),
          (this.scrollbar.visible = true);
      } else this.scrollbar.visible = false;
    }),
    i
  ;
  })(t.UI_ActivityBase);

  t.UI_Activity_Exchange = i;
})(uiscript || (uiscript = {}));