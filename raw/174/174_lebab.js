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
      const t = e.call(this, new ui.common.loadingUI()) || this;
      return (
        (t.tips = []),
        (t.tips_showindex = 0),
        (t.tips_changeCD = 0),
        (t.current_progress = 0),
        (t.pre_t = 0),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.img_loading = this.me.getChildByName('loading')),
        (this.container_waitother = this.me.getChildByName('waitother')),
        (this.waitother_label0 = this.container_waitother.getChildByName(
          'count0'
        )),
        (this.waitother_label1 = this.container_waitother.getChildByName(
          'count1'
        )),
        (this.label_tips = this.me.getChildByName('tips')),
        (this.progress_bar = this.me.getChildByName('progress')),
        (this.progress_val = this.progress_bar.getChildByName('bar').mask),
        (this.img_flower = this.progress_bar.getChildByName('flower')),
        (this.progress_label = this.progress_bar
          .getChildByName('bar')
          .getChildByName('v')),
        (this.img_character = this.me.getChildByName('img')),
        cfg.str.str.forEach(e => {
          'fighttips' == e.type && t.tips.push(e[GameMgr.client_language]);
        });
    }),
    (i.prototype.show = function(e) {
      if (
        ((this.pre_t = Laya.timer.currTimer),
        (this.current_progress = 0),
        (this.progress_val.width = 0),
        (this.img_flower.x = 0),
        (this.progress_label.x = -40),
        (this.img_loading.skin = game.Tools.localUISrc(
          `myres/necessary/${e}.png`
        )),
        !this.enable)
      ) {
        t.UIMgr.Inst.closeUIWithTag_Both(), (this.enable = !0);
        for (let i = 1; i < this.tips.length; i++) {
          const n = Math.floor(Math.random() * (i + 1));
          const a = this.tips[n];
          (this.tips[n] = this.tips[i]), (this.tips[i] = a);
        }
        (this.tips_showindex = 0),
          (this.tips_changeCD = Laya.timer.currTimer + 5e3),
          (this.label_tips.text = this.tips[0]),
          (this.img_loading.visible = !0),
          (this.container_waitother.visible = !1),
          (this.starttime = Laya.timer.currTimer),
          (this.me.getChildByName('black').visible = !0);
        const r =
          ((Math.floor((game.Tools.currentTime - 1549296e3) / 3600 / 24) %
            8) +
            8) %
          8;
        game.LoadMgr.setImgSkin(
          this.img_character,
          `newyear_loading/newyear_${r}.png`
        );
      }
    }),
    (i.prototype.close = function(t) {
      void 0 === t && (t = null), (this.enable = !1), t && t.run();
    }),
    (i.prototype.update = function() {
      const t = Laya.timer.currTimer - this.pre_t;
      (this.pre_t = Laya.timer.currTimer),
        this.refresh_flower(),
        this.refresh_progress(t);
    }),
    (i.prototype.showLoadCount = function(t, e) {
      (this.img_loading.visible = !1),
        (this.container_waitother.visible = !0),
        (this.waitother_label0.text = t.toString()),
        (this.waitother_label1.text = e.toString());
      for (
        let i =
                this.container_waitother.displayWidth /
                  this.container_waitother.scaleX +
                40,
            n = 0;
        n < this.container_waitother.numChildren;
        n++
      ) {
        const a = this.container_waitother.getChildAt(n);
        (a.x = i), (i += a.textField.textWidth);
      }
    }),
    (i.prototype.setProgressVal = function(t) {
      this.current_progress = t;
    }),
    (i.prototype.refresh_flower = function() {
      let t = Laya.timer.currTimer - this.starttime;
      t > 2e3 && ((t = 0), (this.starttime = Laya.timer.currTimer));
      const e = t / 2e3;
      (this.img_flower.rotation = 360 * e),
        this.tips_changeCD <= Laya.timer.currTimer &&
          ((this.tips_changeCD = Laya.timer.currTimer + 5e3),
          (this.tips_showindex =
            (this.tips_showindex + 1) % this.tips.length),
          (this.label_tips.text = this.tips[this.tips_showindex]));
    }),
    (i.prototype.refresh_progress = function(t) {
      const e = this.progress_bar.width * (0.8 * this.current_progress + 0.2);
      if (this.progress_val.width >= e) this.progress_val.width = e;
      else {
        const i = (e - this.progress_val.width) / this.progress_bar.width;
        const n = (Math.sqrt(4 * i) * t) / 1e3;
        n >= i
          ? (this.progress_val.width = e)
          : (this.progress_val.width += n * this.progress_bar.width);
      }
      (this.progress_label.x = this.progress_val.width - 40),
        (this.progress_label.text =
          `${((this.progress_val.width / this.progress_bar.width) * 100).toFixed(
  0
)}%`),
        (this.img_flower.x = this.progress_val.width);
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_Loading = e;
})(uiscript || (uiscript = {}));