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
  !(() => {
    function t(t) {
      (this.cd = 300),
        (this.pre_t = 0),
        (this.items = []),
        (this.me = t),
        (this.templete = t.getChildByName('templete')),
        (this.templete.visible = !1);
    }
    (t.prototype.reset = function() {
      Laya.timer.clearAll(this);
      for (let t = 0; t < this.items.length; t++) this.items[t].destroy(!0);
      (this.items = []), (this.pre_t = 0);
    }),
      (t.prototype.fly = function(t) {
      const e = this;
      const i = this.templete.scriptMap['capsui.UICopy'].getNodeClone();
      const n = i.getChildByName('icon');
      const a = i.getChildByName('count');
      const r = t.getChildByName('icon');
      const s = t.getChildByName('count');
      (n.skin = game.Tools.localUISrc(r.skin)),
        (a.text = s.text),
        (n.x = r.x),
        (a.x = s.x),
        this.items.push(i);
      let o = this.pre_t + this.cd - Laya.timer.currTimer;
      o < 120 && (o = 120), (i.visible = !1);
      const l = t.parent.localToGlobal(new Laya.Point(t.x, t.y));
      Laya.timer.once(o, this, () => {
        (i.visible = !0), (i.x = l.x), (i.y = l.y), (i.alpha = 10);
        const t = Laya.timer.currTimer;
        const n = e;
        Laya.timer.frameLoop(1, i, () => {
          const e = Laya.timer.currTimer - t;
          if (e >= 600) {
            for (let a = 0; a < n.items.length; a++)
              if (n.items[a] === i) {
                for (let r = a; r < n.items.length - 1; r++)
                  n.items[r] = n.items[r + 1];
                break;
              }
            i.destroy(!0), Laya.timer.clearAll(i);
          } else {
            const s = e / 600;
            (i.y = l.y - 50 * s), (i.alpha = s < 0.7 ? 1 : (1 - s) / 0.3);
          }
        });
      }),
        (this.pre_t = o + Laya.timer.currTimer);
    });
  })();
  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.small = 1)] = 'small'),
      (t[(t.big = 2)] = 'big'),
      (t[(t.passed = 3)] = 'passed');
  })(e || (e = {}));
  const i = (i => {
    function n() {
      const e = i.call(this, new ui.lobby.match_shilianUI()) || this;
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
        (e.locking = !1),
        (e.reward_fly = null),
        (e._inmatch = !1),
        (e._step_index = 0),
        (e._can_reward = !1),
        (e._fail = !1),
        (e._gray_filter = new Laya.ColorFilter(t.GRAY_FILTER)),
        (n.Inst = e),
        e
      );
    }
    return __extends(n, i),
    (n.prototype.onCreate = () => {}),
    (n.prototype.setStepState = function(t, i) {
      const n = this.steps[t];
      i == e.none
        ? ((n.root.scaleX = n.root.scaleY = 1),
          (n.passed.visible = !1),
          (n.container_info.y = 98),
          (n.qidian.visible = !1),
          (n.fandian.visible = !1),
          (n.contianer_reward.visible = !0),
          (n.contianer_reward.alpha = 1),
          (n.star.visible = !1),
          (n.container_main.filters = []))
        : i == e.big
        ? ((n.root.scaleX = n.root.scaleY = 1.1),
          (n.passed.visible = !1),
          (n.container_info.y = 144),
          (n.qidian.visible = !0),
          (n.qidian.alpha = 1),
          (n.fandian.visible = !0),
          (n.qidian.alpha = 1),
          (n.contianer_reward.visible = !0),
          (n.contianer_reward.alpha = 1),
          (n.star.visible = !1),
          (n.container_main.filters = []))
        : i == e.small
        ? ((n.root.scaleX = n.root.scaleY = 0.85),
          (n.passed.visible = !1),
          (n.container_info.y = 98),
          (n.qidian.visible = !1),
          (n.fandian.visible = !1),
          (n.contianer_reward.visible = !1),
          (n.star.visible = !0),
          (n.star.alpha = 1),
          (n.container_main.filters = []))
        : i == e.passed &&
          ((n.root.scaleX = n.root.scaleY = 0.85),
          (n.passed.visible = !0),
          (n.container_info.y = 98),
          (n.qidian.visible = !1),
          (n.fandian.visible = !1),
          (n.contianer_reward.visible = !1),
          (n.star.visible = !0),
          (n.star.alpha = 1),
          (n.container_main.filters = [this._gray_filter]));
    }),
    (n.prototype.show_backin = function(t, i, n) {
      const a = this;
      (this.enable = !0),
        (this.locking = !0),
        (this._inmatch = !0),
        (this._fail = n),
        (this._can_reward = i),
        (this._step_index = t);
      for (let r = 0; r < this.steps.length; r++)
        r < t
          ? this.setStepState(r, e.passed)
          : r == t
          ? this.setStepState(r, e.big)
          : this.setStepState(r, e.small);
      this._show_init(),
        n
          ? ((this.btn_start.visible = !1),
            (this.btn_quit.visible = !1),
            (this.btn_getreward.visible = !1),
            (this.shine.visible = !1),
            (this.btn_rule.visible = !0),
            Laya.timer.once(500, this, () => {
              (a.locking = !1), a.showResult(!1);
            }))
          : ((this.btn_start.visible = !i),
            (this.btn_getreward.visible = i),
            (this.btn_quit.visible = !0),
            (this.container_result.visible = n),
            (this.shine.visible = !1),
            (this.btn_rule.visible = !0),
            Laya.timer.once(500, this, () => {
              a.locking = !1;
            }));
    }),
    (n.prototype.show_newin = function(i, n, a, r) {
      const s = this;
      (this.locking = !0),
        (this.enable = !0),
        (this._inmatch = i),
        (this._step_index = n),
        (this._can_reward = a),
        (this._fail = r);
      for (let o = 0; o < this.steps.length; o++) {
        i
          ? o < n
            ? this.setStepState(o, e.passed)
            : o == n
            ? this.setStepState(o, e.big)
            : this.setStepState(o, e.small)
          : this.setStepState(o, e.none);
        const l = this.steps[o];
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
        (this.container_result.visible = !1),
        (this.btn_rule.visible = !0),
        (this.shine.visible = !1),
        this._show_init(),
        (this.container_top.alpha = 1),
        (this.root.alpha = 1),
        (this.container_down.alpha = 1),
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 200),
        t.UIBase.anim_alpha_in(this.container_down, { y: 30 }, 200),
        Laya.timer.once(800, this, () => {
          (s.locking = !1), i || ((i = !0), s.matchStart());
        });
    }),
    (n.prototype.matchStart = function() {
      (this._inmatch = !0),
        (this.btn_start.visible = !0),
        (this.btn_start.alpha = 0),
        Laya.Tween.to(this.btn_start, { alpha: 1 }, 200),
        (this._step_index = 0),
        (this._can_reward = !1),
        (this.btn_quit.visible = !0),
        (this.btn_quit.alpha = 0),
        Laya.Tween.to(this.btn_quit, { alpha: 1 }, 200),
        this.steps[0].anim_small2big.play(0, !1);
      for (let t = 1; t < this.steps.length; t++)
        this.steps[t].anim_middle2small.play(0, !1);
    }),
    (n.prototype._show_init = function() {
      for (var t = this, e = 0, i = 0; i < this.rand_tips.length; i++)
        this.rand_tips[i].visible = i == e;
      Laya.timer.loop(8e3, this, () => {
        ++e >= t.rand_tips.length && (e = 0);
        for (let i = 0; i < t.rand_tips.length; i++)
          t.rand_tips[i].visible = i == e;
      }),
        this.money.onEnable();
    }),
    (n.prototype.close = function(e) {
      const i = this;
      (this.locking = !0),
        this.reward_fly.reset(),
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 200),
        t.UIBase.anim_alpha_out(this.root, { y: 100 }, 200),
        Laya.timer.once(300, this, () => {
          Laya.timer.clearAll(i),
            (i.enable = !1),
            (i.locking = !1),
            e && e.run();
        });
    }),
    (n.prototype.showResult = function(e) {
      const i = this;
      this.container_result.visible = !0;
      (e ? this.me.success_in : this.me.fail_in).play(0, !1),
        (this.container_result.getChildByName('success').visible = e),
        (this.container_result.getChildByName('fail').visible = !e),
        (this.container_result.getChildByName(
          'btn'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            const n = e ? i.me.success_out : i.me.fail_out;
            (i.locking = !0),
              n.play(0, !1),
              Laya.timer.once(300, i, () => {
                i.close(
                  Laya.Handler.create(i, () => {
                    t.UI_Lobby.Inst.enable = !0;
                  })
                );
              });
          },
          null,
          !1
        ));
    }),
    (n.prototype.getRewardSuccess = function(t) {
      const e = this;
      const i = this.steps[t];
      this.locking = !0;
      for (let n = 0; n < i.rewards.length; n++)
        this.reward_fly.fly(i.rewards[n]);
      t + 1 < this.steps.length
        ? ((this._step_index = t + 1),
          (this._can_reward = !1),
          i.anim_big2small.play(0, !1),
          Laya.timer.once(500, this, () => {
            i.container_main.filters = [e._gray_filter];
          }),
          Laya.timer.once(700, this, () => {
            e.steps[t + 1].anim_small2big.play(0, !1),
              Laya.timer.once(500, e, () => {
                (e.locking = !1),
                  (e.btn_start.visible = !0),
                  (e.btn_start.alpha = 0),
                  Laya.Tween.to(e.btn_start, { alpha: 1 }, 150);
              });
          }))
        : ((this._can_reward = !1),
          Laya.timer.once(300 * i.rewards.length + 200, this, () => {
            e.showResult(!0);
          }));
    }),
    (n.Inst = null),
    n
  ;
  })(t.UIBase);
  t.UI_Match_Shilian = i;
})(uiscript || (uiscript = {}));