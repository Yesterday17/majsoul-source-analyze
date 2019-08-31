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
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.introduceUI()) || this;
      return (
        (t._blackmask = null),
        (t._root = null),
        (t._content = null),
        (t._locking = !1),
        (t._cells = []),
        (t._templete = null),
        (t._label_title = null),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this._blackmask = new t.UI_BlackMask(
        this.me.getChildByName('bmask'),
        Laya.Handler.create(
          this,
          () => e._locking,
          null,
          !1
        ),
        Laya.Handler.create(this, this.close, null, !1)
      )),
        (this._root = this.me.getChildByName('root')),
        (this._content = this._root.getChildByName('content')),
        (this._content.vScrollBar.visible = !1);
      const i = this._content.getChildByName('templete');
      (i.visible = !1),
        (this._templete = i),
        (this._cells = []),
        cfg.rank_introduce.rank.forEach((t, n) => {
          for (let a = 0; a < 4; a++) {
            const r = i.scriptMap['capsui.UICopy'].getNodeClone();
            e._cells.push(r);
          }
        }),
        (this._label_title = this._root.getChildByName('title'));
    }),
    (i.prototype.show = function(e) {
      const i = this;
      (this._locking = !0),
        (this.enable = !0),
        this._blackmask.show(),
        (this._content.vScrollBar.value = 0),
        t.UIBase.anim_pop_out(
          this._root,
          Laya.Handler.create(this, () => {
            i._locking = !1;
          })
        ),
        this.refresh_show(e);
    }),
    (i.prototype.refresh_show = function(t) {
      const e = this;
      this._label_title.text = game.Tools.strOfLocalization(
        1 == t ? 2794 : 2793
      );
      let i = 0;
      const n = [181, 165, 165, 165];
      let a = 0;
      let r = 0;
      let s = 0;
      switch (GameMgr.client_language) {
        case 'chs':
          s = 0;
          break;
        case 'jp':
          s = 4;
          break;
        case 'en':
          s = 8;
      }
      for (
        var o = this._templete.getChildByName('info'), l = 0, h = 0;
        h < 4;
        h++
      )
        (o.text = cfg.rank_introduce[1 == t ? 'rank' : 'rank3'].get(1).info[
          s + h
        ]),
          (n[h] = o.textField.textWidth),
          (l += n[h]);
      for (h = 0; h < 4; h++) n[h] = (600 * n[h]) / l + (0 == h ? 76 : 0);
      cfg.rank_introduce[1 == t ? 'rank' : 'rank3'].forEach(({info}, o) => {
        a = 0;
        for (let l = 0; l < 4; l++) {
          const h = e._cells[i++];
          (h.x = a), (h.y = r), (h.width = n[l]), (h.height = 76);
          const c = h.getChildByName('bound');
          (c.x = 0), (c.y = 0), (c.width = h.width), (c.height = h.height);
          const u = h.getChildByName('info');
          (u.width = h.width / 0.7 - 20),
            (u.x = 0.5 * h.width),
            u.scriptMap['capsui.LabelLocalizationSize'].change_width(u.width),
            (u.text = info[l + s]),
            (a += h.width - 3);
        }
        r += 73;
      }),
        this._content.refresh();
    }),
    (i.prototype.close = function() {
      const e = this;
      (this._locking = !0),
        t.UIBase.anim_pop_hide(
          this._root,
          Laya.Handler.create(this, () => {
            (e._locking = !1), (e.enable = !1);
          })
        );
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_Introduce = e;
})(uiscript || (uiscript = {}));