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
  const e = (t => {
    function e() {
      const i = t.call(this, new ui.common.rollnoticeUI()) || this;
      return (i.speed = 0.18), (e.Inst = i), i;
    }
    return __extends(e, t),
    (e.init = function() {
      const t = this;
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchRollingNotice', {}, (e, {error, notice}) => {
        e || error || t.receiveInfo(notice);
      }),
        app.NetAgent.AddListener2Lobby(
          'NotifyRollingNotice',
          Laya.Handler.create(
            this,
            ({notice}) => {
              t.receiveInfo(notice);
            },
            null,
            !1
          )
        );
    }),
    (e.receiveInfo = function(t) {
      (this.current_notice = t), this.try2Show();
    }),
    (e.try2Show = function() {
      const t = this;
      null != this.current_notice &&
        (1e3 * this.current_notice.end_time <
        Laya.timer.currTimer + GameMgr.Inst.server_time_delta
          ? (this.current_notice = null)
          : this.Inst.enable ||
            this.Inst.show(
              this.current_notice.content,
              Laya.Handler.create(this, () => {
                t.current_notice &&
                  Laya.timer.once(
                    1e3 * t.current_notice.repeat_interval,
                    t,
                    t.try2Show
                  );
              })
            ));
    }),
    (e.prototype.onCreate = function() {
      (this.root = this.me.getChildByName('root')),
        (this.panel = this.root.getChildByName('content')),
        (this.label = this.panel.getChildByName('label')),
        Laya.timer.once(3e3, this, () => {
          e.init();
        });
    }),
    (e.prototype.show = function(t, e) {
      (this.label.text = t),
        (this.complete = e),
        Laya.timer.clearAll(this),
        (this.root.visible = !0),
        (this.origin_x = this.panel.width + 500 * this.speed),
        (this.target_x = -(
          500 * this.speed +
          this.label.textField.textWidth
        )),
        (this.start_time = Laya.timer.currTimer),
        Laya.timer.frameLoop(1, this, this.__update, null, !0),
        (this.enable = !0);
    }),
    (e.prototype.close = function() {
      this.complete && this.complete.run(),
        Laya.timer.clearAll(this),
        (this.enable = !1);
    }),
    (e.prototype.__update = function() {
      const t = Laya.timer.currTimer - this.start_time;
      t >= (this.origin_x - this.target_x) / this.speed
        ? ((this.root.visible = !1), this.close())
        : (this.label.x = this.origin_x - this.speed * t);
    }),
    (e.Inst = null),
    (e.current_notice = null),
    e
  ;
  })(t.UIBase);
  t.UI_RollNotice = e;
})(uiscript || (uiscript = {}));