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
  var e;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.daoju = 1)] = 'daoju';
    t[(t.gift = 2)] = 'gift';
    t[(t.fudai = 3)] = 'fudai';
    t[(t.character_view = 4)] = 'character_view';
    t[(t.common_view = 5)] = 'common_view';
  })(e = t.EItemCategory || (t.EItemCategory = {}));
  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this, new ui.lobby.bagUI()) || this;
        t.container_top = null;
        t.container_content = null;
        t.locking = !1;
        t.tabs = [];
        t.page_item = null;
        t.page_gift = null;
        t.page_desktop = null;
        t.page_skin = null;
        t.select_index = 0;
        n.Inst = t;
        return t;
      }

      static init() {
        var t = this;

        app.NetAgent.AddListener2Lobby(
          'NotifyAccountUpdate',
          Laya.Handler.create(
            this,
            ({update}) => {
              var i = update;
              t.update_data(i.bag.update_items);
              i &&
                i.bag &&
                (t.update_daily_gain_data(i.bag));
            },
            null,
            !1
          )
        );

        this.fetch();
      }

      static fetch() {
        var e = this;
        this._item_map = {};
        this._daily_gain_record = {};
        app.NetAgent.sendReq2Lobby('Lobby', 'fetchBagInfo', {}, (i, n) => {
          if (i || n.error)
            t.UIMgr.Inst.showNetReqError('fetchBagInfo', i, n);
          else {
            app.Log.log(`背包信息：${JSON.stringify(n)}`);
            var a = n.bag;
            if (a) {
              if (a.items)
                for (h = 0; h < a.items.length; h++) {
                  var r = a.items[h].item_id;
                  var s = a.items[h].stack;
                  var o = cfg.item_definition.item.get(r);
                  o &&
                    (e._item_map[r] = {
                      item_id: r,
                      count: s,
                      category: o.category
                    });
                }
              if (a.daily_gain_record)
                for (var l = a.daily_gain_record, h = 0; h < l.length; h++) {
                  var c = l[h].limit_source_id;
                  e._daily_gain_record[c] = {};
                  var u = l[h].record_time;
                  e._daily_gain_record[c].record_time = u;
                  var _ = l[h].records;
                  if (_)
                    for (var d = 0; d < _.length; d++)
                      e._daily_gain_record[c][_[d].item_id] = _[d].count;
                }
            }
          }
        });
      }

      static find_item(t) {
        var e = this._item_map[t];
        return e
          ? { item_id: e.item_id, category: e.category, count: e.count }
          : null;
      }

      static get_item_count(t) {
        var e = this.find_item(t);
        if (e) return e.count;
        if (100001 == t) {
          var i = GameMgr.Inst.account_data.diamond;

          GameMgr.inGooglePlay &&
            GameMgr.Inst.account_numerical_resource[101001] &&
            (i += GameMgr.Inst.account_numerical_resource[101001]);

          GameMgr.inChina &&
            GameMgr.Inst.account_numerical_resource[101002] &&
            (i += GameMgr.Inst.account_numerical_resource[101002]);

          return i;
        }
        return 100002 == t ? GameMgr.Inst.access_token.gold : 0;
      }

      static find_items_by_category(t) {
        var e = [];
        for (var i in this._item_map)
          this._item_map[i].category == t &&
            e.push({
              item_id: this._item_map[i].item_id,
              category: this._item_map[i].category,
              count: this._item_map[i].count
            });
        return e;
      }

      static update_data(t) {
        for (r = 0; r < t.length; r++) {
          var e = t[r].item_id;
          var i = t[r].stack;
          this._item_map[e] = 0;
          i > 0
            ? this._item_map.hasOwnProperty(e.toString())
              ? (this._item_map[e].count = i)
              : (this._item_map[e] = {
                  item_id: e,
                  count: i,
                  category: cfg.item_definition.item.get(e).category
                })
            : this._item_map.hasOwnProperty(e.toString()) &&
              (delete this._item_map[e]);
        }
        this.Inst && this.Inst.when_data_change();
        for (r = 0; r < t.length; r++) {
          e = t[r].item_id;
          if (this._item_listener.hasOwnProperty(e.toString()))
            for (var n = this._item_listener[e], a = 0; a < n.length; a++)
              n[a].run();
        }
        for (var r = 0; r < this._all_item_listener.length; r++)
          this._all_item_listener[r].run();
      }

      static update_daily_gain_data({update_daily_gain_record}) {
        var e = update_daily_gain_record;
        if (e)
          for (var i = 0; i < e.length; i++) {
            var n = e[i].limit_source_id;
            this._daily_gain_record[n] || (this._daily_gain_record[n] = {});
            var a = e[i].record_time;
            this._daily_gain_record[n].record_time = a;
            var r = e[i].records;
            if (r)
              for (var s = 0; s < r.length; s++)
                this._daily_gain_record[n][r[s].item_id] = r[s].count;
          }
      }

      static get_item_daily_record(t, e) {
        return this._daily_gain_record[t] &&
          this._daily_gain_record[t].record_time &&
          game.Tools.isPassedRefreshTime(
            this._daily_gain_record[t].record_time
          ) &&
          this._daily_gain_record[t][e]
          ? this._daily_gain_record[t][e]
          : 0;
      }

      static add_item_listener(t, e) {
        this._item_listener.hasOwnProperty(t.toString()) ||
          (this._item_listener[t] = []);

        this._item_listener[t].push(e);
      }

      static remove_item_listener(t, e) {
        var i = this._item_listener[t];
        if (i)
          for (var n = 0; n < i.length; n++)
            if (i[n] === e) {
              i[n] = i[i.length - 1];
              i.pop();
              break;
            }
      }

      static add_all_item_listener(t) {
        this._all_item_listener.push(t);
      }

      static remove_all_item_listener(t) {
        for (var e = this._all_item_listener, i = 0; i < e.length; i++)
          if (e[i] === t) {
            e[i] = e[e.length - 1];
            e.pop();
            break;
          }
      }

      have_red_point() {
        return this.page_desktop.have_red_point();
      }

      onCreate() {
        var e = this;
        this.container_top = this.me.getChildByName('top');

        this.container_top.getChildByName(
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
          );

        this.container_content = this.me.getChildByName('content');
        for (
          var i = t => {
            n.tabs.push(
              n.container_content
                .getChildByName('tabs')
                .getChildByName(`btn${t}`)
            );

            n.tabs[t].clickHandler = Laya.Handler.create(
                n,
                () => {
                  e.select_index != t && e.on_change_tab(t);
                },
                null,
                !1
              );
          },
            n = this,
            a = 0;
          a < 5;
          a++
        )
          i(a);

        this.page_item = new t.UI_Bag_PageItem(
          this.container_content.getChildByName('page_items')
        );

        this.page_gift = new t.UI_Bag_PageGift(
            this.container_content.getChildByName('page_gift')
          );

        this.page_desktop = new t.UI_Bag_PageDesktop(
            this.container_content.getChildByName('page_desktop')
          );

        this.page_skin = new t.UI_Bag_PageSkin(
            this.container_content.getChildByName('page_skin')
          );
      }

      show(e) {
        var i = this;
        void 0 === e && (e = 0);
        this.enable = !0;
        this.locking = !0;
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 200);
        t.UIBase.anim_alpha_in(this.container_content, { y: 30 }, 200);

        Laya.timer.once(300, this, () => {
          i.locking = !1;
        });

        this.on_change_tab(e);
        game.Scene_Lobby.Inst.change_bg('indoor', !1);
        4 != e && this.page_skin.when_update_data();
        this.tabs[3].getChildByName(
            'redpoint'
          ).visible = this.page_desktop.have_red_point();
      }

      hide(e) {
        var i = this;
        this.locking = !0;
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 200);
        t.UIBase.anim_alpha_out(this.container_content, { y: 30 }, 200);
        Laya.timer.once(300, this, () => {
          i.locking = !1;
          i.enable = !1;
          e && e.run();
        });
      }

      onDisable() {
        this.page_desktop.me.visible && this.page_desktop.close();
        this.page_skin.close();
      }

      on_change_tab(t) {
        this.select_index = t;

        this.tabs[i].skin = game.Tools.localUISrc(
          t == i ? 'myres/shop/tab_choose.png' : 'myres/shop/tab_unchoose.png'
        );

        for (var i = 0; i < this.tabs.length; i++)
          this.tabs[i].getChildAt(0).color = t == i ? '#d9b263' : '#8cb65f';
        this.page_item.close();
        this.page_gift.close();
        this.page_desktop.close();
        this.page_skin.me.visible = !1;
        switch (
          (t)
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
      }

      when_data_change() {
        this.page_item.me.visible && this.page_item.when_update_data();
        this.page_gift.me.visible && this.page_gift.when_update_data();
      }

      on_skin_change() {
        this.page_skin.when_update_data();
      }

      clear_desktop_btn_redpoint() {
        this.tabs[3].getChildByName('redpoint').visible = !1;
      }
    }

    __extends(n, i);

    n._item_map = {};
    n._item_listener = {};
    n._all_item_listener = [];
    n._daily_gain_record = {};
    n.Inst = null;
    return n;
  })(t.UIBase);
  t.UI_Bag = i;
})(uiscript || (uiscript = {}));