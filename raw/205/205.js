var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.mj.scorechangeUI()) || this;
      return (
        (t.black_mask = null),
        (t.viewplayers = []),
        (t.container_arrow = null),
        (t.btn_confirm = null),
        (t.count_down = null),
        (t.label_waitingother = null),
        (t.change_num = []),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        this.black_mask = this.me.getChildByName('black_mask');
        for (var e = 0; e < 4; e++) {
          for (
            var i = this.me.getChildByName('player_' + e), n = [], a = 0;
            a < 7;
            a++
          )
            n.push(
              i.getChildByName('container_score').getChildByName(a.toString())
            );
          var r = {
            txt_name: i.getChildByName('label_name'),
            txt_delta: i.getChildByName('label_delta'),
            container_head: i.getChildByName('head'),
            container: i,
            x: i.x,
            y: i.y,
            rank_x: i.getChildByName('rank').x,
            rank_y: i.getChildByName('rank').y,
            head: new t.UI_Head(i.getChildByName('head')),
            container_rank0: i.getChildByName('rank'),
            rank0: i.getChildByName('rank').getChildByName('val'),
            rank0_wei: i.getChildByName('rank').getChildAt(1),
            container_rank1: i.getChildByName('rank1'),
            rank1: i.getChildByName('rank1').getChildByName('val'),
            rank1_wei: i.getChildByName('rank').getChildAt(1),
            img_scores: n
          };
          this.viewplayers.push(r);
        }
        (this.container_arrow = this.me.getChildByName('container_arrow')),
          (this.btn_confirm = this.me.getChildByName('btn_confirm')),
          (this.count_down = this.btn_confirm.getChildByName('countdown')),
          (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            this.onBtnConfirm,
            null,
            false
          ));
        this.container_arrow.getChildByName('nums');
        this.label_waitingother = this.me.getChildByName('waitingother');
      }),
      (i.prototype.show = function(t) {
        var e = this;
        if (view.DesktopMgr.Inst.mode != view.EMJMode.paipu) {
          (this.enable = true),
            (this.black_mask.alpha = 0),
            Laya.Tween.to(this.black_mask, { alpha: 0.5 }, 120);
          for (var i = [], n = [], a = 0; a < t.length; a++)
            i.push(a), n.push(a);
          (i = i.sort(function(e, i) {
            return 100 * (t[i].old_score - t[e].old_score) + e - i;
          })),
            (n = n.sort(function(e, i) {
              return (
                100 *
                  (t[i].old_score + t[i].delta - t[e].old_score - t[e].delta) +
                e -
                i
              );
            }));
          for (var r = false, a = 0; a < this.viewplayers.length; a++) {
            this.viewplayers[a].container.visible = false;
          }
          for (
            var s = function(a) {
                var s = view.DesktopMgr.Inst.seat2LocalPosition(a),
                  l = o.viewplayers[s];
                l.container.visible = true;
                var h = 0,
                  c = 0;
                switch (s) {
                  case 0:
                    c = -80;
                    break;
                  case 1:
                    h = -80;
                    break;
                  case 2:
                    c = 80;
                    break;
                  case 3:
                    h = 80;
                }
                (l.container.x = l.x + h),
                  (l.container.y = l.y + c),
                  (l.container.alpha = 0),
                  Laya.Tween.to(
                    l.container,
                    { alpha: 1, x: l.x, y: l.y },
                    100,
                    null,
                    null,
                    120
                  );
                var u = view.DesktopMgr.Inst.player_datas[a],
                  _ = t[a];
                (l.txt_name.text = u.nickname),
                  (l.head.id = u.avatar_id),
                  o.setScore(l.img_scores, _.old_score);
                for (var d = 0, f = 0; f < i.length; f++)
                  if (i[f] == a) {
                    d = f + 1;
                    break;
                  }
                for (var p = 0, f = 0; f < n.length; f++)
                  if (n[f] == a) {
                    p = f + 1;
                    break;
                  }
                (l.container_rank0.visible = true),
                  (l.container_rank0.x = l.rank_x),
                  (l.container_rank0.y = l.rank_y),
                  (l.rank0.skin = game.Tools.localUISrc(
                    'myres/mjdesktop/s_' + d.toString() + '.png'
                  )),
                  (l.rank0_wei.skin = game.Tools.localUISrc(
                    'myres/mjdesktop/s_' +
                      d.toString() +
                      '_' +
                      d.toString() +
                      '.png'
                  )),
                  (l.container_rank0.alpha = 1),
                  (l.txt_delta.visible = false),
                  0 != _.delta &&
                    ((r = true),
                    _.delta > 0
                      ? ((l.txt_delta.text = '+' + _.delta),
                        (l.txt_delta.color = '#64cf42'))
                      : ((l.txt_delta.text = _.delta.toString()),
                        (l.txt_delta.color = '#d61111')),
                    (l.txt_delta.visible = true),
                    (l.txt_delta.alpha = 0),
                    Laya.Tween.to(
                      l.txt_delta,
                      { alpha: 1 },
                      100,
                      null,
                      null,
                      250
                    )),
                  (l.container_rank1.visible = false),
                  Laya.timer.once(2500, o, function() {
                    r &&
                      (Laya.Tween.to(
                        l.container_rank0,
                        { x: l.rank_x - 50, alpha: 0 },
                        70,
                        Laya.Ease.strongIn
                      ),
                      Laya.timer.once(300 + 300 * (4 - p), e, function() {
                        (l.rank0.skin = game.Tools.localUISrc(
                          'myres/mjdesktop/s_' + p.toString() + '.png'
                        )),
                          (l.rank0_wei.skin = game.Tools.localUISrc(
                            'myres/mjdesktop/s_' +
                              p.toString() +
                              '_' +
                              p.toString() +
                              '.png'
                          )),
                          Laya.Tween.to(
                            l.container_rank0,
                            { x: l.rank_x, alpha: 1 },
                            70,
                            Laya.Ease.strongIn
                          ),
                          1 == p
                            ? (view.AudioMgr.PlayAudio(218),
                              Laya.timer.once(70, e, function() {
                                (l.container_rank1.visible = true),
                                  (l.rank1.skin = game.Tools.localUISrc(
                                    'myres/mjdesktop/s_1.png'
                                  )),
                                  (l.rank1_wei.skin = game.Tools.localUISrc(
                                    'myres/mjdesktop/s_1_1.png'
                                  )),
                                  (l.container_rank1.x = l.rank_x),
                                  (l.container_rank1.y = l.rank_y),
                                  (l.container_rank1.scaleX = l.container_rank1.scaleY =
                                    l.container_rank0.scaleX),
                                  (l.container_rank1.alpha = 1),
                                  Laya.Tween.to(
                                    l.container_rank1,
                                    { scaleX: 1.7, scaleY: 1.7, alpha: 0 },
                                    500,
                                    Laya.Ease.strongOut
                                  );
                              }))
                            : view.AudioMgr.PlayAudio(219);
                      }));
                  });
              },
              o = this,
              a = 0;
            a < t.length;
            a++
          )
            s(a);
          this.container_arrow.visible = true;
          for (a = 0; a < 4; a++)
            for (var l = a + 1; l < 4; l++)
              (this.container_arrow.getChildByName(
                a.toString() + l.toString()
              ).visible = false),
                (this.container_arrow.getChildByName(
                  l.toString() + a.toString()
                ).visible = false);
          if (
            (Laya.timer.once(250, this, function() {
              e.change_num = [];
              for (var i = e.calu_line(t), n = 0; n < i.length; n++) {
                var a = view.DesktopMgr.Inst.seat2LocalPosition(i[n].b),
                  r = view.DesktopMgr.Inst.seat2LocalPosition(i[n].a),
                  s = a.toString() + r.toString(),
                  o = e.container_arrow.getChildByName(s);
                (o.alpha = 0),
                  (o.visible = true),
                  Laya.Tween.to(o, { alpha: 1 }, 100);
              }
            }),
            r)
          )
            for (var h = 0, a = 0; a < 33; a++)
              Laya.timer.once(1200 + 30 * a, this, function() {
                h % 5 == 0 && view.AudioMgr.PlayAudio(222);
                for (var i = ++h / 33, n = 0; n < t.length; n++)
                  if (0 != t[n].delta) {
                    var a = view.DesktopMgr.Inst.seat2LocalPosition(n),
                      r = Math.ceil(t[n].delta * i);
                    if (33 != h) {
                      var s = t[n].delta - r;
                      e.viewplayers[a].txt_delta.text =
                        s > 0 ? '+' + s : s.toString();
                    } else e.viewplayers[a].txt_delta.visible = false;
                    e.setScore(e.viewplayers[a].img_scores, t[n].old_score + r);
                  }
              });
          (this.btn_confirm.visible = false),
            (this.label_waitingother.visible = false);
          var c = r ? 4500 : 1200;
          Laya.timer.once(c, this, function() {
            (e.btn_confirm.visible = true),
              (e.btn_confirm.alpha = 0),
              Laya.Tween.to(e.btn_confirm, { alpha: 1 }, 100);
            for (var i = [], n = 0; n < t.length; n++)
              i.push(t[n].delta + t[n].old_score);
            if (
              (view.DesktopMgr.Inst.setScores(i),
              view.DesktopMgr.Inst.mode == view.EMJMode.play)
            ) {
              e.count_down.text = '(3)';
              for (
                var a = function(t) {
                    Laya.timer.once(1e3 * t, e, function() {
                      e.btn_confirm.visible &&
                        (e.count_down.text = '(' + (3 - t).toString() + ')');
                    });
                  },
                  n = 0;
                n < 3;
                n++
              )
                a(n);
              Laya.timer.once(3e3, e, function() {
                e.btn_confirm.visible && e.onBtnConfirm();
              });
            }
          });
        } else this.onBtnConfirm();
      }),
      (i.prototype.setScore = function(t, e) {
        for (var i = e.toString(), n = 0; n < t.length; n++) t[n].visible = false;
        for (n = 0; n < i.length && n < t.length; n++) {
          var a = t[n];
          a.visible = true;
          var r = i.charAt(i.length - 1 - n);
          a.skin =
            '-' == r
              ? game.Tools.localUISrc('myres/mjdesktop/ww_minus.png')
              : game.Tools.localUISrc('myres/mjdesktop/ww_' + r + '.png');
        }
      }),
      (i.prototype.calu_line = function(t) {
        for (var e = [], i = [], n = 0; n < t.length; n++) i.push(t[n].delta);
        for (;;) {
          for (var a = -1, r = -1, s = -1, n = 0; n < i.length; n++) {
            var o = -1,
              l = -1;
            i[(h = n)] < 0 &&
              (i[(o = (h - 1 + i.length) % i.length)] > 0 &&
                (l = Math.min(-i[h], i[o])) > s &&
                ((s = l), (a = o), (r = h)),
              i[(o = (h + 1) % i.length)] > 0 &&
                (l = Math.min(-i[h], i[o])) > s &&
                ((s = l), (a = o), (r = h)));
          }
          if (!(s > 0)) break;
          e.push({ a: a, b: r, score: s }), (i[a] -= s), (i[r] += s);
        }
        for (;;) {
          for (var a = -1, r = -1, s = -1, n = 0; n < i.length; n++) {
            var h = n,
              o = -1,
              l = -1;
            i[h] < 0 &&
              i[(o = (h + 2) % i.length)] > 0 &&
              (l = Math.min(-i[h], i[o])) > s &&
              ((s = l), (a = o), (r = h));
          }
          if (!(s > 0)) break;
          e.push({ a: a, b: r, score: s }), (i[a] -= s), (i[r] += s);
        }
        return e;
      }),
      (i.prototype.onBtnConfirm = function() {
        var e = this;
        if (
          ((this.btn_confirm.visible = false),
          view.DesktopMgr.Inst.mode == view.EMJMode.play)
        )
          if (null != view.DesktopMgr.Inst.gameEndResult)
            t.UIMgr.Inst.ShowGameEnd(), (this.enable = false);
          else {
            view.DesktopMgr.Inst.Reset(),
              Laya.timer.once(200, this, function() {
                view.DesktopMgr.Inst.timestoped
                  ? view.DesktopMgr.Inst.handles_after_timerun.push(
                      Laya.Handler.create(e, function() {
                        app.NetAgent.sendReq2MJ(
                          'FastTest',
                          'confirmNewRound',
                          {},
                          function(t, e) {}
                        );
                      })
                    )
                  : app.NetAgent.sendReq2MJ(
                      'FastTest',
                      'confirmNewRound',
                      {},
                      function(t, e) {}
                    );
              }),
              (this.label_waitingother.visible = true);
            var i = 0;
            Laya.timer.loop(500, this, function() {
              for (
                var t = game.Tools.strOfLocalization(2180), n = 0;
                n < i;
                n++
              )
                t += '.';
              (i = (i + 1) % 4), (e.label_waitingother.text = t);
            });
          }
        else if (view.DesktopMgr.Inst.mode == view.EMJMode.paipu)
          t.UI_Replay.Inst.nextStep(true), (this.enable = false);
        else if (view.DesktopMgr.Inst.mode == view.EMJMode.live_broadcast) {
          t.UI_Live_Broadcast.Inst.onScoreChangeConfirm(),
            (this.label_waitingother.visible = true);
          var n = 0;
          Laya.timer.loop(500, this, function() {
            for (var t = game.Tools.strOfLocalization(2180), i = 0; i < n; i++)
              t += '.';
            (n = (n + 1) % 4), (e.label_waitingother.text = t);
          });
        }
      }),
      (i.prototype.onDisable = function() {
        Laya.timer.clearAll(this);
      }),
      (i.Inst = null),
      i
    );
  })(t.UIBase);
  t.UI_ScoreChange = e;
})(uiscript || (uiscript = {}));