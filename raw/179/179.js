var uiscript;
!(function(t) {
  var e;
  !(function() {
    function t(t) {
      (this.cd = 300),
        (this.pre_t = 0),
        (this.items = []),
        (this.me = t),
        (this.templete = t.getChildByName('templete')),
        (this.templete.visible = false);
    }
    (t.prototype.reset = function() {
      Laya.timer.clearAll(this);
      for (var t = 0; t < this.items.length; t++) this.items[t].destroy(true);
      (this.items = []), (this.pre_t = 0);
    }),
      (t.prototype.fly = function(t) {
        var e = this,
          i = this.templete.scriptMap['capsui.UICopy'].getNodeClone(),
          n = i.getChildByName('icon'),
          a = i.getChildByName('count'),
          r = t.getChildByName('icon'),
          s = t.getChildByName('count');
        (n.skin = game.Tools.localUISrc(r.skin)),
          (a.text = s.text),
          (n.x = r.x),
          (a.x = s.x),
          this.items.push(i);
        var o = this.pre_t + this.cd - Laya.timer.currTimer;
        o < 120 && (o = 120), (i.visible = false);
        var l = t.parent.localToGlobal(new Laya.Point(t.x, t.y));
        Laya.timer.once(o, this, function() {
          (i.visible = true), (i.x = l.x), (i.y = l.y), (i.alpha = 10);
          var t = Laya.timer.currTimer,
            n = e;
          Laya.timer.frameLoop(1, i, function() {
            var e = Laya.timer.currTimer - t;
            if (e >= 600) {
              for (var a = 0; a < n.items.length; a++)
                if (n.items[a] === i) {
                  for (var r = a; r < n.items.length - 1; r++)
                    n.items[r] = n.items[r + 1];
                  break;
                }
              i.destroy(true), Laya.timer.clearAll(i);
            } else {
              var s = e / 600;
              (i.y = l.y - 50 * s), (i.alpha = s < 0.7 ? 1 : (1 - s) / 0.3);
            }
          });
        }),
          (this.pre_t = o + Laya.timer.currTimer);
      });
  })();
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.small = 1)] = 'small'),
      (t[(t.big = 2)] = 'big'),
      (t[(t.passed = 3)] = 'passed');
  })(e || (e = {}));
  var i = (function(i) {
    function n() {
      var e = i.call(this, new ui.lobby.match_shilianUI()) || this;
      return (
        (e.container_top = null),
        (e.money = null),
        (e.root = null),
        (e.container_step = null),
        (e.steps = []),
        (e.container_down = null),
        (e.btn_start = null),
        (e.btn_getreward = null),
        (e.btn_rule = null),
        (e.btn_quit = null),
        (e.container_tips = null),
        (e.rand_tips = []),
        (e.container_result = null),
        (e.shine = null),
        (e._gray_filter = null),
        (e.locking = false),
        (e.reward_fly = null),
        (e._inmatch = false),
        (e._step_index = 0),
        (e._can_reward = false),
        (e._fail = false),
        (e._gray_filter = new Laya.ColorFilter(t.GRAY_FILTER)),
        (n.Inst = e),
        e
      );
    }
    return (
      __extends(n, i),
      (n.prototype.onCreate = function() {}),
      (n.prototype.setStepState = function(t, i) {
        var n = this.steps[t];
        i == e.none
          ? ((n.root.scaleX = n.root.scaleY = 1),
            (n.passed.visible = false),
            (n.container_info.y = 98),
            (n.qidian.visible = false),
            (n.fandian.visible = false),
            (n.contianer_reward.visible = true),
            (n.contianer_reward.alpha = 1),
            (n.star.visible = false),
            (n.container_main.filters = []))
          : i == e.big
          ? ((n.root.scaleX = n.root.scaleY = 1.1),
            (n.passed.visible = false),
            (n.container_info.y = 144),
            (n.qidian.visible = true),
            (n.qidian.alpha = 1),
            (n.fandian.visible = true),
            (n.qidian.alpha = 1),
            (n.contianer_reward.visible = true),
            (n.contianer_reward.alpha = 1),
            (n.star.visible = false),
            (n.container_main.filters = []))
          : i == e.small
          ? ((n.root.scaleX = n.root.scaleY = 0.85),
            (n.passed.visible = false),
            (n.container_info.y = 98),
            (n.qidian.visible = false),
            (n.fandian.visible = false),
            (n.contianer_reward.visible = false),
            (n.star.visible = true),
            (n.star.alpha = 1),
            (n.container_main.filters = []))
          : i == e.passed &&
            ((n.root.scaleX = n.root.scaleY = 0.85),
            (n.passed.visible = true),
            (n.container_info.y = 98),
            (n.qidian.visible = false),
            (n.fandian.visible = false),
            (n.contianer_reward.visible = false),
            (n.star.visible = true),
            (n.star.alpha = 1),
            (n.container_main.filters = [this._gray_filter]));
      }),
      (n.prototype.show_backin = function(t, i, n) {
        var a = this;
        (this.enable = true),
          (this.locking = true),
          (this._inmatch = true),
          (this._fail = n),
          (this._can_reward = i),
          (this._step_index = t);
        for (var r = 0; r < this.steps.length; r++)
          r < t
            ? this.setStepState(r, e.passed)
            : r == t
            ? this.setStepState(r, e.big)
            : this.setStepState(r, e.small);
        this._show_init(),
          n
            ? ((this.btn_start.visible = false),
              (this.btn_quit.visible = false),
              (this.btn_getreward.visible = false),
              (this.shine.visible = false),
              (this.btn_rule.visible = true),
              Laya.timer.once(500, this, function() {
                (a.locking = false), a.showResult(false);
              }))
            : ((this.btn_start.visible = !i),
              (this.btn_getreward.visible = i),
              (this.btn_quit.visible = true),
              (this.container_result.visible = n),
              (this.shine.visible = false),
              (this.btn_rule.visible = true),
              Laya.timer.once(500, this, function() {
                a.locking = false;
              }));
      }),
      (n.prototype.show_newin = function(i, n, a, r) {
        var s = this;
        (this.locking = true),
          (this.enable = true),
          (this._inmatch = i),
          (this._step_index = n),
          (this._can_reward = a),
          (this._fail = r);
        for (var o = 0; o < this.steps.length; o++) {
          i
            ? o < n
              ? this.setStepState(o, e.passed)
              : o == n
              ? this.setStepState(o, e.big)
              : this.setStepState(o, e.small)
            : this.setStepState(o, e.none);
          var l = this.steps[o];
          (l.root.alpha = 0),
            t.UIBase.anim_alpha_in(
              l.root,
              { y: 150 },
              200,
              60 * o,
              null,
              Laya.Ease.strongOut
            );
        }
        (this.btn_start.visible = i && !a),
          (this.btn_quit.visible = i),
          (this.btn_getreward.visible = i && a),
          (this.container_result.visible = false),
          (this.btn_rule.visible = true),
          (this.shine.visible = false),
          this._show_init(),
          (this.container_top.alpha = 1),
          (this.root.alpha = 1),
          (this.container_down.alpha = 1),
          t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 200),
          t.UIBase.anim_alpha_in(this.container_down, { y: 30 }, 200),
          Laya.timer.once(800, this, function() {
            (s.locking = false), i || ((i = true), s.matchStart());
          });
      }),
      (n.prototype.matchStart = function() {
        (this._inmatch = true),
          (this.btn_start.visible = true),
          (this.btn_start.alpha = 0),
          Laya.Tween.to(this.btn_start, { alpha: 1 }, 200),
          (this._step_index = 0),
          (this._can_reward = false),
          (this.btn_quit.visible = true),
          (this.btn_quit.alpha = 0),
          Laya.Tween.to(this.btn_quit, { alpha: 1 }, 200),
          this.steps[0].anim_small2big.play(0, false);
        for (var t = 1; t < this.steps.length; t++)
          this.steps[t].anim_middle2small.play(0, false);
      }),
      (n.prototype._show_init = function() {
        for (var t = this, e = 0, i = 0; i < this.rand_tips.length; i++)
          this.rand_tips[i].visible = i == e;
        Laya.timer.loop(8e3, this, function() {
          ++e >= t.rand_tips.length && (e = 0);
          for (var i = 0; i < t.rand_tips.length; i++)
            t.rand_tips[i].visible = i == e;
        }),
          this.money.onEnable();
      }),
      (n.prototype.close = function(e) {
        var i = this;
        (this.locking = true),
          this.reward_fly.reset(),
          t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 200),
          t.UIBase.anim_alpha_out(this.root, { y: 100 }, 200),
          Laya.timer.once(300, this, function() {
            Laya.timer.clearAll(i),
              (i.enable = false),
              (i.locking = false),
              e && e.run();
          });
      }),
      (n.prototype.showResult = function(e) {
        var i = this;
        this.container_result.visible = true;
        (e ? this.me.success_in : this.me.fail_in).play(0, false),
          (this.container_result.getChildByName('success').visible = e),
          (this.container_result.getChildByName('fail').visible = !e),
          (this.container_result.getChildByName(
            'btn'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              var n = e ? i.me.success_out : i.me.fail_out;
              (i.locking = true),
                n.play(0, false),
                Laya.timer.once(300, i, function() {
                  i.close(
                    Laya.Handler.create(i, function() {
                      t.UI_Lobby.Inst.enable = true;
                    })
                  );
                });
            },
            null,
            false
          ));
      }),
      (n.prototype.getRewardSuccess = function(t) {
        var e = this,
          i = this.steps[t];
        this.locking = true;
        for (var n = 0; n < i.rewards.length; n++)
          this.reward_fly.fly(i.rewards[n]);
        t + 1 < this.steps.length
          ? ((this._step_index = t + 1),
            (this._can_reward = false),
            i.anim_big2small.play(0, false),
            Laya.timer.once(500, this, function() {
              i.container_main.filters = [e._gray_filter];
            }),
            Laya.timer.once(700, this, function() {
              e.steps[t + 1].anim_small2big.play(0, false),
                Laya.timer.once(500, e, function() {
                  (e.locking = false),
                    (e.btn_start.visible = true),
                    (e.btn_start.alpha = 0),
                    Laya.Tween.to(e.btn_start, { alpha: 1 }, 150);
                });
            }))
          : ((this._can_reward = false),
            Laya.timer.once(300 * i.rewards.length + 200, this, function() {
              e.showResult(true);
            }));
      }),
      (n.Inst = null),
      n
    );
  })(t.UIBase);
  t.UI_Match_Shilian = i;
})(uiscript || (uiscript = {}));