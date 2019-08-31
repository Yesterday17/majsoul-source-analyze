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
  const e = (() => {
      function t(t) {
        (this.content = null),
          (this.me = t),
          (this.btn_open = this.me.getChildByName('btn_open')),
          (this.title = this.btn_open.getChildByName('info_title')),
          (this.arrow = this.me
            .getChildByName('btn_open')
            .getChildByName('arrow')),
          (this.container_content = this.btn_open.getChildByName('content')),
          (this.content = this.container_content.getChildAt(0)),
          (this.new_flag = this.me.getChildByName('new')),
          (this.btn_cd = 0),
          (this.isopen = !1),
          (this.btn_open.clickHandler = Laya.Handler.create(
            this,
            this.switchShow,
            null,
            !1
          ));
      }
      return Object.defineProperty(t.prototype, 'h', {
        get() {
          let t = 0;
          return (
            this.isnew && (t += 8),
            (t += 90),
            this.isopen && ((t += 40), (t += this.content_h)),
            t
          );
        },
        enumerable: !0,
        configurable: !0
      }),
      (t.prototype.onEnable = function({id, title, content}, e, i) {
        (this.announcement_id = id),
          (this.title.text = title),
          (this.content.text = content),
          (this.content_h = this.content.textHeight),
          (this.isopen = i),
          (this.isnew = e),
          (this.btn_cd = 0),
          this.isopen
            ? ((this.container_content.alpha = 1),
              (this.container_content.visible = !0),
              (this.arrow.rotation = 0))
            : ((this.container_content.visible = !1),
              (this.arrow.rotation = -180)),
          this.isnew
            ? ((this.new_flag.visible = !0), (this.btn_open.y = 8))
            : ((this.new_flag.visible = !1), (this.btn_open.y = 0)),
          (this.me.height = this.h);
      }),
      (t.prototype.onDisable = function() {
        this.announcement_id > 0 &&
          this.isopen &&
          this.isnew &&
          (app.NetAgent.sendReq2Lobby(
            'Lobby',
            'readAnnouncement',
            { announcement_id: this.announcement_id },
            (t, e) => {}
          ),
          i.read_list.push(this.announcement_id),
          i.Inst.onReadStateChange()),
          (this.announcement_id = -1),
          (this.me.visible = !1);
      }),
      (t.prototype.switchShow = function() {
        const t = this;
        Laya.timer.currTimer < this.btn_cd ||
          ((this.btn_cd = Laya.timer.currTimer + 200),
          Laya.timer.clearAll(this),
          (this.isopen = !this.isopen),
          this.isopen
            ? ((this.container_content.visible = !0),
              Laya.Tween.to(
                this.container_content,
                { alpha: 1 },
                200,
                null,
                null,
                0,
                !0
              ),
              (this.arrow.rotation = 0))
            : (this.isnew &&
                ((this.isnew = !1),
                (this.new_flag.visible = !1),
                Laya.Tween.to(
                  this.btn_open,
                  { y: 0 },
                  100,
                  Laya.Ease.strongOut
                ),
                i.read_list.push(this.announcement_id),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'readAnnouncement',
                  { announcement_id: this.announcement_id },
                  (t, e) => {}
                ),
                i.Inst.onReadStateChange()),
              Laya.Tween.to(
                this.container_content,
                { alpha: 0 },
                200,
                null,
                Laya.Handler.create(this, () => {
                  t.container_content.visible = !1;
                }),
                0,
                !0
              ),
              (this.arrow.scaleY = 1),
              (this.arrow.rotation = -180)),
          (this.me.height = this.h));
      }),
      t
    ;
    })();

  var i = (i => {
    function n() {
      const t = i.call(this, new ui.lobby.infoUI()) || this;
      return (t.items = []), (t._last_time = 0), (n.Inst = t), t;
    }
    return __extends(n, i),
    (n.lobbyPopout = function() {
      if (
        !this.first ||
        !this.announcements ||
        0 == this.announcements.length
      )
        return !1;
      for (var t = !1, e = [], i = 0; i < n.announcements.length; i++)
        e.push(i);
      for (var a = {}, i = 0; i < n.announcement_sort.length; i++)
        a[n.announcement_sort[i].toString()] = i;
      return (e = e.sort((t, e) => {
        let i = 0;
        const r = n.announcements[t].id.toString();
        i = a.hasOwnProperty(r) ? a[r] : 1e3 + t;
        let s = 0;
        const o = n.announcements[e].id.toString();
        return (s = a.hasOwnProperty(o) ? a[o] : 1e3 + e), i - s;
      })),
      this.announcements.length > 0 &&
        (t = !this.isAnnouncementReaded(this.announcements[e[0]].id)),
      !!t && (this.Inst.show(), !0)
    ;
    }),
    Object.defineProperty(n, 'haveRedPoint', {
      get() {
        for (let t = 0; t < this.announcements.length; t++)
          if (!this.isAnnouncementReaded(this.announcements[t].id))
            return !0;
        return !1;
      },
      enumerable: !0,
      configurable: !0
    }),
    (n.Init = function() {
      const e = this;
      (this.read_list = []),
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchAnnouncement',
          {},
          (i, n) => {
            i || n.error
              ? t.UIMgr.Inst.showNetReqError('fetchAnnouncement', i, n)
              : e._refreshAnnouncements(n);
          }
        ),
        app.NetAgent.AddListener2Lobby(
          'NotifyAnnouncementUpdate',
          Laya.Handler.create(this, this._refreshAnnouncements, null, !1)
        );
    }),
    (n._refreshAnnouncements = function({announcements, sort, read_list}) {
      if (
        (announcements && (this.announcements = announcements),
        sort && (this.announcement_sort = sort),
        read_list)
      ) {
        this.read_list = [];
        for (let e = 0; e < read_list.length; e++)
          this.read_list.push(read_list[e]);
      }
    }),
    (n.isAnnouncementReaded = function(t) {
      for (let e = 0; e < this.read_list.length; e++)
        if (this.read_list[e] == t) return !0;
      return !1;
    }),
    (n.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.locking || t.close();
          },
          null,
          !1
        )),
        (this.panel = this.root.getChildByName('info')),
        (this.panel.vScrollBar.visible = !1),
        (this.item_templete = this.panel.getChildByName('templete')),
        (this.items = []),
        (this.item_templete.visible = !1);
    }),
    (n.prototype.show = function() {
      const i = this;
      (this.enable = !0), (this.locking = !0);
      let a = 0;
      if (n.announcements.length > this.items.length) {
        a = 5;
        for (let r = this.items.length; r < n.announcements.length; r++) {
          const s = this.item_templete.scriptMap[
            'capsui.UICopy'
          ].getNodeClone();
          this.items.push(new e(s));
        }
      }
      (this.root.visible = !1),
        Laya.timer.frameOnce(a, this, () => {
          for (var e = [], a = 0; a < n.announcements.length; a++)
            e.push(a);
          for (var r = {}, a = 0; a < n.announcement_sort.length; a++)
            r[n.announcement_sort[a].toString()] = a;
          e = e.sort((t, e) => {
            let i = 0;
            const a = n.announcements[t].id.toString();
            i = r.hasOwnProperty(a) ? r[a] : 1e3 + t;
            let s = 0;
            const o = n.announcements[e].id.toString();
            return (s = r.hasOwnProperty(o) ? r[o] : 1e3 + e), i - s;
          });
          for (a = 0; a < i.items.length; a++)
            if (a >= e.length) i.items[a].me.visible = !1;
            else {
              i.items[a].me.visible = !0;
              const s = n.announcements[e[a]];
              i.items[a].onEnable(s, !n.isAnnouncementReaded(s.id), 0 == a);
            }
          i.panel.vScrollBar.stopScroll(),
            (i.panel.vScrollBar.value = 0),
            i.panel.refresh(),
            (i._last_time = 0),
            (i.duringshow = !0),
            (i.panel.vScrollBar.value = 0),
            (i.root.visible = !0),
            t.UIBase.anim_pop_out(
              i.root,
              Laya.Handler.create(i, () => {
                i.locking = !1;
              })
            );
        });
    }),
    (n.prototype.close = function() {
      const e = this;
      (this.duringshow = !1),
        (this.locking = !0),
        this.panel.vScrollBar.stopScroll(),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = !1), (e.enable = !1);
          })
        );
    }),
    (n.prototype.onDisable = function() {
      this.panel.vScrollBar.stopScroll();
      for (let t = 0; t < this.items.length; t++)
        this.items[t].me.visible && this.items[t].onDisable();
    }),
    (n.prototype.update = function() {
      if (this.duringshow) {
        for (
          let t = 0, e = (this.panel.vScrollBar.value, this.panel.vScrollBar.max, 0);
          e < this.items.length;
          e++
        )
          if (this.items[e].me.visible) {
            const i = this.items[e].me.y, n = Math.abs(i - t);
            if (n < 0.001) this.items[e].me.y = t;
            else {
              const a = Math.sqrt((2 * n) / (1400 / 22500)), r = Laya.timer.currTimer - this._last_time;
              if (r >= a) this.items[e].me.y = t;
              else {
                const s = (1400 / 22500) * 0.5 * (a - r) * (a - r);
                this.items[e].me.y = i < t ? t - s : t + s;
              }
            }
            t += this.items[e].h;
          }
        this.panel.refresh(), (this._last_time = Laya.timer.currTimer);
      }
    }),
    (n.prototype.onReadStateChange = () => {
      t.UI_Lobby.Inst.top.refreshRedpoint();
    }),
    (n.Inst = null),
    (n.announcements = []),
    (n.announcement_sort = []),
    (n.read_list = []),
    (n.first = !0),
    n
  ;
  })(t.UIBase);

  t.UI_Info = i;
})(uiscript || (uiscript = {}));