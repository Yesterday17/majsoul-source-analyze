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
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.common.loadingUI()) || this;
        t.tips = [];
        t.tips_showindex = 0;
        t.tips_changeCD = 0;
        t.current_progress = 0;
        t.pre_t = 0;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;
        this.img_loading = this.me.getChildByName('loading');
        this.container_waitother = this.me.getChildByName('waitother');

        this.waitother_label0 = this.container_waitother.getChildByName(
            'count0'
          );

        this.waitother_label1 = this.container_waitother.getChildByName(
            'count1'
          );

        this.label_tips = this.me.getChildByName('tips');
        this.progress_bar = this.me.getChildByName('progress');
        this.progress_val = this.progress_bar.getChildByName('bar').mask;
        this.img_flower = this.progress_bar.getChildByName('flower');

        this.progress_label = this.progress_bar
            .getChildByName('bar')
            .getChildByName('v');

        this.img_character = this.me.getChildByName('img');
        cfg.str.str.forEach(e => {
          'fighttips' == e.type && t.tips.push(e[GameMgr.client_language]);
        });
      }

      show(e) {
        this.pre_t = Laya.timer.currTimer;
        this.current_progress = 0;
        this.progress_val.width = 0;
        this.img_flower.x = 0;
        this.progress_label.x = -40;

        this.img_loading.skin = game.Tools.localUISrc(
            `myres/necessary/${e}.png`
          );

        if (
          (!this.enable)
        ) {
          t.UIMgr.Inst.closeUIWithTag_Both();
          this.enable = !0;
          for (var i = 1; i < this.tips.length; i++) {
            var n = Math.floor(Math.random() * (i + 1));
            var a = this.tips[n];
            this.tips[n] = this.tips[i];
            this.tips[i] = a;
          }
          this.tips_showindex = 0;
          this.tips_changeCD = Laya.timer.currTimer + 5e3;
          this.label_tips.text = this.tips[0];
          this.img_loading.visible = !0;
          this.container_waitother.visible = !1;
          this.starttime = Laya.timer.currTimer;
          this.me.getChildByName('black').visible = !0;
          var r =
            ((Math.floor((game.Tools.currentTime - 1549296e3) / 3600 / 24) %
              8) +
              8) %
            8;
          game.LoadMgr.setImgSkin(
            this.img_character,
            `newyear_loading/newyear_${r}.png`
          );
        }
      }

      close(t) {
        void 0 === t && (t = null);
        this.enable = !1;
        t && t.run();
      }

      update() {
        var t = Laya.timer.currTimer - this.pre_t;
        this.pre_t = Laya.timer.currTimer;
        this.refresh_flower();
        this.refresh_progress(t);
      }

      showLoadCount(t, e) {
        this.img_loading.visible = !1;
        this.container_waitother.visible = !0;
        this.waitother_label0.text = t.toString();
        this.waitother_label1.text = e.toString();
        for (
          var i =
              this.container_waitother.displayWidth /
                this.container_waitother.scaleX +
              40,
            n = 0;
          n < this.container_waitother.numChildren;
          n++
        ) {
          var a = this.container_waitother.getChildAt(n);
          a.x = i;
          i += a.textField.textWidth;
        }
      }

      setProgressVal(t) {
        this.current_progress = t;
      }

      refresh_flower() {
        var t = Laya.timer.currTimer - this.starttime;
        t = 0;
        t > 2e3 && ((this.starttime = Laya.timer.currTimer));
        var e = t / 2e3;
        this.img_flower.rotation = 360 * e;
        this.tips_changeCD = Laya.timer.currTimer + 5e3;

        this.tips_showindex =
            (this.tips_showindex + 1) % this.tips.length;

        this.tips_changeCD <= Laya.timer.currTimer &&
          ((this.label_tips.text = this.tips[this.tips_showindex]));
      }

      refresh_progress(t) {
        var e = this.progress_bar.width * (0.8 * this.current_progress + 0.2);
        if (this.progress_val.width >= e) this.progress_val.width = e;
        else {
          var i = (e - this.progress_val.width) / this.progress_bar.width;
          var n = (Math.sqrt(4 * i) * t) / 1e3;
          n >= i
            ? (this.progress_val.width = e)
            : (this.progress_val.width += n * this.progress_bar.width);
        }
        this.progress_label.x = this.progress_val.width - 40;

        this.progress_label.text =
            `${((this.progress_val.width / this.progress_bar.width) * 100).toFixed(
  0
)}%`;

        this.img_flower.x = this.progress_val.width;
      }
    }

    __extends(i, e);

    i.Inst = null;
    return i;
  })(t.UIBase);
  t.UI_Loading = e;
})(uiscript || (uiscript = {}));