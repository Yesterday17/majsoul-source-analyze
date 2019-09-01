var uiscript;
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
        (this.container_liuju.visible = false),
          (this.container_zimo.visible = false),
          (this.container_rong.visible = true);
        for (var i = [], n = 0; n < 4; n++)
          i.push(this.container_rong.getChildByName(n.toString())),
            (i[n].visible = false);
        this.black_mask.alpha = 0;
        for (
          var a = function(e) {
              var n = i[t[e]];
              (n.visible = true),
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
                  true
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
          e.enable = false;
        }),
          (this.enable = true);
      }),
      (e.prototype.showZimo = function(t) {
        var e = this;
        (this.container_liuju.visible = false),
          (this.container_rong.visible = false),
          (this.container_zimo.visible = true);
        for (var i = [], n = 0; n < 4; n++)
          i.push(this.container_zimo.getChildByName(n.toString())),
            (i[n].visible = false);
        this.black_mask.alpha = 0;
        for (
          var a = function(e) {
              var n = i[t[e]];
              (n.visible = true),
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
                  true
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
          e.enable = false;
        }),
          (this.enable = true);
      }),
      (e.prototype.showLiuJu = function(t) {
        var e = this;
        (this.container_liuju.visible = true),
          (this.container_zimo.visible = false),
          (this.container_rong.visible = false);
        for (var i = [], n = [], a = 0; a < 4; a++)
          i.push(this.container_liuju.getChildByName(a.toString())),
            (i[a].visible = false),
            n.push(this.container_liuju.getChildByName('no' + a)),
            (n[a].visible = false);
        for (a = 0; a < 4; a++)
          this.container_liuju.getChildByName('t' + a).visible = false;
        (this.black_mask.alpha = 0),
          Laya.Tween.to(this.black_mask, { alpha: 0.4 }, 150);
        var r = this.container_liuju.getChildByName('title');
        (r.alpha = 0), Laya.Tween.to(r, { alpha: 1 }, 150);
        for (
          var s = 'myres2/mjp/' + GameMgr.Inst.mjp_view + '/ui/', a = 0;
          a < 4;
          a++
        ) {
          this.container_liuju.getChildByName('t' + a).visible = false;
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
                r.visible = true;
                for (var h = [], c = 0; c < t[n].tings.length; c++)
                  h.push(mjcore.MJPai.Create(t[n].tings[c].tile)),
                    (h[c].dora = false);
                h = h.sort(mjcore.MJPai.Distance);
                for (c = 0; c < r.numChildren; c++) {
                  var u = r.getChildAt(c);
                  c < h.length
                    ? ((u.visible = true),
                      (u.skin = game.Tools.localUISrc(
                        s + h[c].toString() + '.png'
                      )),
                      (u.x = 17 + 66 * c))
                    : (u.visible = false);
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
                    true
                  ),
                  (o.visible = true),
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
                    true
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
              } else if (((r.visible = false), n == view.DesktopMgr.Inst.seat)) {
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
          e.enable = false;
        }),
          (this.enable = true);
      }),
      (e.Inst = null),
      e
    );
  })(t.UIBase);
  t.UI_Huleshow = e;
})(uiscript || (uiscript = {}));