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
      return (
        e.call(this, cfg.activity.activity.get(i.activity_id).name) || this
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      e.prototype.onCreate.call(this),
        this.setHead('myres2/treasurehead/christmas_task.jpg', 974, 326);
    }),
    (i.prototype.isopen = () => t.UI_Activity.activities[i.activity_id]),
    (i.prototype.haveRedPoint = () => {
      const e = t.UI_Activity.getTaskList(i.activity_id);
      if (e)
        for (let n = 0; n < e.length; n++)
          if (!e[n].rewarded && e[n].achieved) return !0;
      return !1;
    }),
    (i.prototype.need_popout = () => {
      const t = cfg.activity.activity.get(i.activity_id);
      return !(!t || !t.need_popout);
    }),
    (i.prototype.show = function() {
      (this.enable = !0),
        this.refreshView(t.UI_Activity.getTaskList(i.activity_id));
    }),
    (i.prototype.hide = function() {
      this.enable = !1;
    }),
    (i.activity_id = 1001),
    i
  ;
  })(t.UI_Activity_Task);
  t.UI_Christmas_Task = e;
})(uiscript || (uiscript = {}));