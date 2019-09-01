let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.titlebookUI()) || this;
      return (
        (t._root = null),
        (t._scrollview = null),
        (t._blackmask = null),
        (t._locking = false),
        (t._showindexs = []),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.Init = function() {
      const e = this;
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchTitleList', {}, (i, n) => {
        if (i || n.error)
          t.UIMgr.Inst.showNetReqError('fetchTitleList', i, n);
        else {
          e.owned_title = [];
          for (let a = 0; a < n.title_list.length; a++) {
            const r = n.title_list[a];
            e.owned_title.push(r),
              600005 == r &&
                app.PlayerBehaviorStatistic.fb_trace_pending(
                  app.EBehaviorType.Get_The_Title1,
                  1
                ),
              r >= 600005 &&
                r <= 600015 &&
                app.PlayerBehaviorStatistic.google_trace_pending(
                  app.EBehaviorType.G_get_title_1 + r - 600005,
                  1
                );
          }
        }
      });
    }),
    (i.addTitle = function({new_titles}) {
      for (let e = 0; e < new_titles.length; e++)
        this.owned_title.push(new_titles[e]),
          600005 == new_titles[e] &&
            app.PlayerBehaviorStatistic.fb_trace_pending(
              app.EBehaviorType.Get_The_Title1,
              1
            ),
          new_titles[e] >= 600005 &&
            new_titles[e] <= 600015 &&
            app.PlayerBehaviorStatistic.google_trace_pending(
              app.EBehaviorType.G_get_title_1 + new_titles[e] - 600005,
              1
            );
    }),
    (i.prototype.onCreate = function() {
      const e = this;
      (this._root = this.me.getChildByName('root')),
        (this._blackmask = new t.UI_BlackMask(
          this.me.getChildByName('bmask'),
          Laya.Handler.create(
            this,
            () => e._locking,
            null,
            false
          ),
          Laya.Handler.create(this, this.close, null, false)
        )),
        (this._scrollview = this._root.getChildByName('content').scriptMap[
          'capsui.CScrollView'
        ]),
        this._scrollview.init_scrollview(
          Laya.Handler.create(
            this,
            ({index, container}) => {
              e.setItemValue(index, container);
            },
            null,
            false
          )
        ),
        (this._root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e._locking || (e._blackmask.hide(), e.close());
          },
          null,
          false
        )),
        (this._noinfo = this._root.getChildByName('noinfo'));
    }),
    (i.prototype.show = function() {
      const e = this;
      if (
        ((this._locking = true),
        (this.enable = true),
        this._blackmask.show(),
        i.owned_title.length > 0)
      ) {
        this._showindexs = [];
        for (let n = 0; n < i.owned_title.length; n++)
          this._showindexs.push(n);
        (this._showindexs = this._showindexs.sort((t, e) => {
          let n = t;
          const a = cfg.item_definition.title.get(i.owned_title[t]);
          a && (n += 1e3 * a.priority);
          let r = e;
          const s = cfg.item_definition.title.get(i.owned_title[e]);
          return s && (r += 1e3 * s.priority), r - n;
        })),
          this._scrollview.reset(),
          this._scrollview.addItem(i.owned_title.length),
          (this._scrollview.me.visible = true),
          (this._noinfo.visible = false);
      } else (this._noinfo.visible = true), (this._scrollview.me.visible = false);
      t.UIBase.anim_pop_out(
        this._root,
        Laya.Handler.create(this, () => {
          e._locking = false;
        })
      );
    }),
    (i.prototype.close = function() {
      const e = this;
      (this._locking = true),
        t.UIBase.anim_pop_hide(
          this._root,
          Laya.Handler.create(this, () => {
            (e._locking = false), (e.enable = false);
          })
        );
    }),
    (i.prototype.onDisable = function() {
      this._scrollview.reset();
    }),
    (i.prototype.setItemValue = function(t, e) {
      const n = this;
      if (this.enable) {
        const a = i.owned_title[this._showindexs[t]];
        const r = cfg.item_definition.title.find(a);
        game.LoadMgr.setImgSkin(e.getChildByName('img_title'), r.icon),
          (e.getChildByName('using').visible =
            a == GameMgr.Inst.account_data.title),
          (e.getChildByName('desc').text =
            r[`desc_${GameMgr.client_language}`]);
        e.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            a != GameMgr.Inst.account_data.title
              ? (n.changeTitle(t), (e.getChildByName('using').visible = true))
              : (n.changeTitle(-1), (e.getChildByName('using').visible = false));
          },
          null,
          false
        );
      }
    }),
    (i.prototype.changeTitle = function(e) {
      const n = this;
      const a = GameMgr.Inst.account_data.title;
      let r = 0;
      (r =
        e >= 0 && e < this._showindexs.length
          ? i.owned_title[this._showindexs[e]]
          : 600001),
        (GameMgr.Inst.account_data.title = r);
      for (var s = -1, o = 0; o < this._showindexs.length; o++)
        if (a == i.owned_title[this._showindexs[o]]) {
          s = o;
          break;
        }
      t.UI_Lobby.Inst.enable && t.UI_Lobby.Inst.top.refresh(),
        t.UI_PlayerInfo.Inst.enable && t.UI_PlayerInfo.Inst.refreshBaseInfo(),
        -1 != s && this._scrollview.wantToRefreshItem(s),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'useTitle',
          { title: 600001 == r ? 0 : r },
          (i, r) => {
            (i || r.error) &&
              (t.UIMgr.Inst.showNetReqError('useTitle', i, r),
              (GameMgr.Inst.account_data.title = a),
              t.UI_Lobby.Inst.enable && t.UI_Lobby.Inst.top.refresh(),
              t.UI_PlayerInfo.Inst.enable &&
                t.UI_PlayerInfo.Inst.refreshBaseInfo(),
              n.enable &&
                (e >= 0 &&
                  e < n._showindexs.length &&
                  n._scrollview.wantToRefreshItem(e),
                s >= 0 &&
                  s < n._showindexs.length &&
                  n._scrollview.wantToRefreshItem(s)));
          }
        );
    }),
    (i.Inst = null),
    (i.owned_title = []),
    i
  ;
  })(t.UIBase);
  t.UI_TitleBook = e;
})(uiscript || (uiscript = {}));