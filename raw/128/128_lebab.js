const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  let e;
  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.daoju = 1)] = 'daoju'),
      (t[(t.gift = 2)] = 'gift'),
      (t[(t.fudai = 3)] = 'fudai'),
      (t[(t.character_view = 4)] = 'character_view'),
      (t[(t.common_view = 5)] = 'common_view');
  })(e = t.EItemCategory || (t.EItemCategory = {}));
  const i = (i => {
    function n() {
      const t = i.call(this, new ui.lobby.bagUI()) || this;
      return (
        (t.container_top = null),
        (t.container_content = null),
        (t.locking = !1),
        (t.tabs = []),
        (t.page_item = null),
        (t.page_gift = null),
        (t.page_desktop = null),
        (t.page_skin = null),
        (t.select_index = 0),
        (n.Inst = t),
        t
      );
    }
    return __extends(n, i),
    (n.init = function() {
      const t = this;
      app.NetAgent.AddListener2Lobby(
        'NotifyAccountUpdate',
        Laya.Handler.create(
          this,
          ({update}) => {
            const i = update;
            i &&
              i.bag &&
              (t.update_data(i.bag.update_items),
              t.update_daily_gain_data(i.bag));
          },
          null,
          !1
        )
      ),
        this.fetch();
    }),
    (n.fetch = function() {
      const e = this;
      (this._item_map = {}),
        (this._daily_gain_record = {}),
        app.NetAgent.sendReq2Lobby('Lobby', 'fetchBagInfo', {}, (i, n) => {
          if (i || n.error)
            t.UIMgr.Inst.showNetReqError('fetchBagInfo', i, n);
          else {
            app.Log.log(`背包信息：${JSON.stringify(n)}`);
            const a = n.bag;
            if (a) {
              if (a.items)
                for (h = 0; h < a.items.length; h++) {
                  const r = a.items[h].item_id;
                  const s = a.items[h].stack;
                  const o = cfg.item_definition.item.get(r);
                  o &&
                    (e._item_map[r] = {
                      item_id: r,
                      count: s,
                      category: o.category
                    });
                }
              if (a.daily_gain_record)
                for (var l = a.daily_gain_record, h = 0; h < l.length; h++) {
                  const c = l[h].limit_source_id;
                  e._daily_gain_record[c] = {};
                  const u = l[h].record_time;
                  e._daily_gain_record[c].record_time = u;
                  const _ = l[h].records;
                  if (_)
                    for (let d = 0; d < _.length; d++)
                      e._daily_gain_record[c][_[d].item_id] = _[d].count;
                }
            }
          }
        });
    }),
    (n.find_item = function(t) {
      const e = this._item_map[t];
      return e
        ? { item_id: e.item_id, category: e.category, count: e.count }
        : null;
    }),
    (n.get_item_count = function(t) {
      const e = this.find_item(t);
      if (e) return e.count;
      if (100001 == t) {
        let i = GameMgr.Inst.account_data.diamond;
        return (
          GameMgr.inGooglePlay &&
            GameMgr.Inst.account_numerical_resource[101001] &&
            (i += GameMgr.Inst.account_numerical_resource[101001]),
          GameMgr.inChina &&
            GameMgr.Inst.account_numerical_resource[101002] &&
            (i += GameMgr.Inst.account_numerical_resource[101002]),
          i
        );
      }
      return 100002 == t ? GameMgr.Inst.access_token.gold : 0;
    }),
    (n.find_items_by_category = function(t) {
      const e = [];
      for (const i in this._item_map)
        this._item_map[i].category == t &&
          e.push({
            item_id: this._item_map[i].item_id,
            category: this._item_map[i].category,
            count: this._item_map[i].count
          });
      return e;
    }),
    (n.update_data = function(t) {
      for (r = 0; r < t.length; r++) {
        var e = t[r].item_id;
        const i = t[r].stack;
        i > 0
          ? this._item_map.hasOwnProperty(e.toString())
            ? (this._item_map[e].count = i)
            : (this._item_map[e] = {
                item_id: e,
                count: i,
                category: cfg.item_definition.item.get(e).category
              })
          : this._item_map.hasOwnProperty(e.toString()) &&
            ((this._item_map[e] = 0), delete this._item_map[e]);
      }
      this.Inst && this.Inst.when_data_change();
      for (r = 0; r < t.length; r++) {
        e = t[r].item_id;
        if (this._item_listener.hasOwnProperty(e.toString()))
          for (let n = this._item_listener[e], a = 0; a < n.length; a++)
            n[a].run();
      }
      for (var r = 0; r < this._all_item_listener.length; r++)
        this._all_item_listener[r].run();
    }),
    (n.update_daily_gain_data = function({update_daily_gain_record}) {
      const e = update_daily_gain_record;
      if (e)
        for (let i = 0; i < e.length; i++) {
          const n = e[i].limit_source_id;
          this._daily_gain_record[n] || (this._daily_gain_record[n] = {});
          const a = e[i].record_time;
          this._daily_gain_record[n].record_time = a;
          const r = e[i].records;
          if (r)
            for (let s = 0; s < r.length; s++)
              this._daily_gain_record[n][r[s].item_id] = r[s].count;
        }
    }),
    (n.get_item_daily_record = function(t, e) {
      return this._daily_gain_record[t] &&
        this._daily_gain_record[t].record_time &&
        game.Tools.isPassedRefreshTime(
          this._daily_gain_record[t].record_time
        ) &&
        this._daily_gain_record[t][e]
        ? this._daily_gain_record[t][e]
        : 0;
    }),
    (n.add_item_listener = function(t, e) {
      this._item_listener.hasOwnProperty(t.toString()) ||
        (this._item_listener[t] = []),
        this._item_listener[t].push(e);
    }),
    (n.remove_item_listener = function(t, e) {
      const i = this._item_listener[t];
      if (i)
        for (let n = 0; n < i.length; n++)
          if (i[n] === e) {
            (i[n] = i[i.length - 1]), i.pop();
            break;
          }
    }),
    (n.add_all_item_listener = function(t) {
      this._all_item_listener.push(t);
    }),
    (n.remove_all_item_listener = function(t) {
      for (let e = this._all_item_listener, i = 0; i < e.length; i++)
        if (e[i] === t) {
          (e[i] = e[e.length - 1]), e.pop();
          break;
        }
    }),
    (n.prototype.have_red_point = function() {
      return this.page_desktop.have_red_point();
    }),
    (n.prototype.onCreate = function() {
      const e = this;
      (this.container_top = this.me.getChildByName('top')),
        (this.container_top.getChildByName(
          'btn_back'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking ||
              e.hide(
                Laya.Handler.create(e, () => {
                  t.UI_Lobby.Inst.enable = !0;
                })
              );
          },
          null,
          !1
        )),
        (this.container_content = this.me.getChildByName('content'));
      for (
        let i = t => {
                n.tabs.push(
                  n.container_content
                    .getChildByName('tabs')
                    .getChildByName(`btn${t}`)
                ),
                  (n.tabs[t].clickHandler = Laya.Handler.create(
                    n,
                    () => {
                      e.select_index != t && e.on_change_tab(t);
                    },
                    null,
                    !1
                  ));
              },
            n = this,
            a = 0;
        a < 5;
        a++
      )
        i(a);
      (this.page_item = new t.UI_Bag_PageItem(
        this.container_content.getChildByName('page_items')
      )),
        (this.page_gift = new t.UI_Bag_PageGift(
          this.container_content.getChildByName('page_gift')
        )),
        (this.page_desktop = new t.UI_Bag_PageDesktop(
          this.container_content.getChildByName('page_desktop')
        )),
        (this.page_skin = new t.UI_Bag_PageSkin(
          this.container_content.getChildByName('page_skin')
        ));
    }),
    (n.prototype.show = function(e) {
      const i = this;
      void 0 === e && (e = 0),
        (this.enable = !0),
        (this.locking = !0),
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 200),
        t.UIBase.anim_alpha_in(this.container_content, { y: 30 }, 200),
        Laya.timer.once(300, this, () => {
          i.locking = !1;
        }),
        this.on_change_tab(e),
        game.Scene_Lobby.Inst.change_bg('indoor', !1),
        4 != e && this.page_skin.when_update_data(),
        (this.tabs[3].getChildByName(
          'redpoint'
        ).visible = this.page_desktop.have_red_point());
    }),
    (n.prototype.hide = function(e) {
      const i = this;
      (this.locking = !0),
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 200),
        t.UIBase.anim_alpha_out(this.container_content, { y: 30 }, 200),
        Laya.timer.once(300, this, () => {
          (i.locking = !1), (i.enable = !1), e && e.run();
        });
    }),
    (n.prototype.onDisable = function() {
      this.page_desktop.me.visible && this.page_desktop.close(),
        this.page_skin.close();
    }),
    (n.prototype.on_change_tab = function(t) {
      this.select_index = t;
      for (let i = 0; i < this.tabs.length; i++)
        (this.tabs[i].skin = game.Tools.localUISrc(
          t == i ? 'myres/shop/tab_choose.png' : 'myres/shop/tab_unchoose.png'
        )),
          (this.tabs[i].getChildAt(0).color = t == i ? '#d9b263' : '#8cb65f');
      switch (
        (this.page_item.close(),
        this.page_gift.close(),
        this.page_desktop.close(),
        (this.page_skin.me.visible = !1),
        t)
      ) {
        case 0:
          this.page_item.show(e.daoju);
          break;
        case 1:
          this.page_gift.show();
          break;
        case 2:
          this.page_item.show(e.character_view);
          break;
        case 3:
          this.page_desktop.show();
          break;
        case 4:
          this.page_skin.show();
      }
    }),
    (n.prototype.when_data_change = function() {
      this.page_item.me.visible && this.page_item.when_update_data(),
        this.page_gift.me.visible && this.page_gift.when_update_data();
    }),
    (n.prototype.on_skin_change = function() {
      this.page_skin.when_update_data();
    }),
    (n.prototype.clear_desktop_btn_redpoint = function() {
      this.tabs[3].getChildByName('redpoint').visible = !1;
    }),
    (n._item_map = {}),
    (n._item_listener = {}),
    (n._all_item_listener = []),
    (n._daily_gain_record = {}),
    (n.Inst = null),
    n
  ;
  })(t.UIBase);
  t.UI_Bag = i;
})(uiscript || (uiscript = {}));