var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function(t) {
    function e() {
      var i = t.call(this, new ui.mj.huleshowUI()) || this;
      return (
        (i.black_mask = null),
        (i.container_rong = null),
        (i.container_zimo = null),
        (i.container_liuju = null),
        (e.Inst = i),
        i
      );
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        (this.black_mask = this.me.getChildByName('black_mask')),
          (this.container_rong = this.me.getChildByName('container_rong')),
          (this.container_zimo = this.me.getChildByName('container_zimo')),
          (this.container_liuju = this.me.getChildByName('container_liuju'));
      }),
      (e.prototype.showRong = function(t) {
        var e = this;
        (this.container_liuju.visible = !1),
          (this.container_zimo.visible = !1),
          (this.container_rong.visible = !0);
        for (var i = [], n = 0; n < 4; n++)
          i.push(this.container_rong.getChildByName(n.toString())),
            (i[n].visible = !1);
        this.black_mask.alpha = 0;
        for (
          var a = function(e) {
              var n = i[t[e]];
              (n.visible = !0),
                (n.alpha = 0),
                (n.scaleX = 3),
                (n.scaleY = 3),
                Laya.Tween.to(
                  n,
                  { alpha: 1, scaleX: 1, scaleY: 1 },
                  200,
                  Laya.Ease.strongIn,
                  null,
                  300,
                  !0
                ),
                Laya.timer.once(300 + 30 * e, r, function() {
                  view.DesktopMgr.Inst.players[t[e]].PlaySound('act_ron');
                }),
                Laya.Tween.to(
                  n,
                  { alpha: 0 },
                  0,
                  Laya.Ease.strongIn,
                  null,
                  1200
                );
            },
            r = this,
            n = 0;
          n < t.length;
          n++
        )
          a(n);
        Laya.timer.once(1200, this, function() {
          e.enable = !1;
        }),
          (this.enable = !0);
      }),
      (e.prototype.showZimo = function(t) {
        var e = this;
        (this.container_liuju.visible = !1),
          (this.container_rong.visible = !1),
          (this.container_zimo.visible = !0);
        for (var i = [], n = 0; n < 4; n++)
          i.push(this.container_zimo.getChildByName(n.toString())),
            (i[n].visible = !1);
        this.black_mask.alpha = 0;
        for (
          var a = function(e) {
              var n = i[t[e]];
              (n.visible = !0),
                (n.alpha = 0),
                (n.scaleX = 3),
                (n.scaleY = 3),
                Laya.Tween.to(
                  n,
                  { alpha: 1, scaleX: 1, scaleY: 1 },
                  200,
                  Laya.Ease.strongIn,
                  null,
                  300,
                  !0
                ),
                Laya.timer.once(300, r, function() {
                  view.DesktopMgr.Inst.players[t[e]].PlaySound('act_tumo');
                }),
                Laya.Tween.to(
                  n,
                  { alpha: 0 },
                  0,
                  Laya.Ease.strongIn,
                  null,
                  1200
                );
            },
            r = this,
            n = 0;
          n < t.length;
          n++
        )
          a(n);
        Laya.timer.once(1200, this, function() {
          e.enable = !1;
        }),
          (this.enable = !0);
      }),
      (e.prototype.showLiuJu = function(t) {
        var e = this;
        (this.container_liuju.visible = !0),
          (this.container_zimo.visible = !1),
          (this.container_rong.visible = !1);
        for (var i = [], n = [], a = 0; a < 4; a++)
          i.push(this.container_liuju.getChildByName(a.toString())),
            (i[a].visible = !1),
            n.push(this.container_liuju.getChildByName('no' + a)),
            (n[a].visible = !1);
        for (a = 0; a < 4; a++)
          this.container_liuju.getChildByName('t' + a).visible = !1;
        (this.black_mask.alpha = 0),
          Laya.Tween.to(this.black_mask, { alpha: 0.4 }, 150);
        var r = this.container_liuju.getChildByName('title');
        (r.alpha = 0), Laya.Tween.to(r, { alpha: 1 }, 150);
        for (
          var s = 'myres2/mjp/' + GameMgr.Inst.mjp_view + '/ui/', a = 0;
          a < 4;
          a++
        ) {
          this.container_liuju.getChildByName('t' + a).visible = !1;
        }
        for (
          var o = function(e) {
              var n =
                  (e + view.DesktopMgr.Inst.index_ju) %
                  view.DesktopMgr.Inst.player_count,
                a = view.DesktopMgr.Inst.seat2LocalPosition(n),
                r = l.container_liuju.getChildByName('t' + a);
              if (t[n].tings && t[n].tings.length > 0) {
                var o = i[a];
                r.visible = !0;
                for (var h = [], c = 0; c < t[n].tings.length; c++)
                  h.push(mjcore.MJPai.Create(t[n].tings[c].tile)),
                    (h[c].dora = !1);
                h = h.sort(mjcore.MJPai.Distance);
                for (c = 0; c < r.numChildren; c++) {
                  var u = r.getChildAt(c);
                  c < h.length
                    ? ((u.visible = !0),
                      (u.skin = game.Tools.localUISrc(
                        s + h[c].toString() + '.png'
                      )),
                      (u.x = 17 + 66 * c))
                    : (u.visible = !1);
                }
                var _ = 34 + 60 * h.length + 6 * (h.length - 1);
                if (
                  ((r.width = _),
                  r.width < 350 || 2 == a || 0 == a
                    ? (r.x = o.x + o.width / 2 - _ / 2)
                    : 1 == a
                    ? (r.x = o.x + 350 - _)
                    : 3 == a && (r.x = o.x + o.width / 2 - 175),
                  (r.alpha = 0),
                  Laya.Tween.to(
                    r,
                    { alpha: 1 },
                    150,
                    Laya.Ease.strongIn,
                    null,
                    300,
                    !0
                  ),
                  (o.visible = !0),
                  (o.alpha = 0),
                  (o.skin = game.Tools.localUISrc(
                    'myres/mjdesktop/show_tingpai.png'
                  )),
                  Laya.Tween.to(
                    o,
                    { alpha: 1 },
                    150,
                    Laya.Ease.strongIn,
                    null,
                    300,
                    !0
                  ),
                  n == view.DesktopMgr.Inst.seat)
                ) {
                  var d = game.Tools.get_chara_audio(
                    view.DesktopMgr.Inst.player_datas[n].character,
                    'gameend_tingpai'
                  );
                  d &&
                    Laya.timer.once(300, l, function() {
                      view.AudioMgr.PlaySound(d.path, d.volume, null);
                    });
                }
              } else if (((r.visible = !1), n == view.DesktopMgr.Inst.seat)) {
                var f = game.Tools.get_chara_audio(
                  view.DesktopMgr.Inst.player_datas[n].character,
                  'gameend_noting'
                );
                f &&
                  Laya.timer.once(300, l, function() {
                    view.AudioMgr.PlaySound(f.path, f.volume, null);
                  });
              }
            },
            l = this,
            h = 0;
          h < view.DesktopMgr.Inst.player_count;
          h++
        )
          o(h);
        Laya.timer.once(4500, this, function() {
          e.enable = !1;
        }),
          (this.enable = !0);
      }),
      (e.Inst = null),
      e
    );
  })(t.UIBase);
  t.UI_Huleshow = e;
})(uiscript || (uiscript = {}));