let uiscript;
!(t => {
  const e = (e => {
    function i() {
      return e.call(
        this,
        cfg.activity.activity.get(i.activity_id)[
          `name_${GameMgr.client_language}`
        ]
      ) || this;
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      e.prototype.onCreate.call(this),
        this.setHead('myres2/treasurehead/task_20190501.jpg', 974, 326);
    }),
    (i.prototype.isopen = () => t.UI_Activity.activities[i.activity_id]),
    (i.prototype.haveRedPoint = () => {
      const e = t.UI_Activity.getTaskList(i.activity_id);
      if (e)
        for (let n = 0; n < e.length; n++)
          if (!e[n].rewarded && e[n].achieved) return true;
      return false;
    }),
    (i.prototype.need_popout = () => {
      const t = cfg.activity.activity.get(i.activity_id);
      return !(!t || !t.need_popout);
    }),
    (i.prototype.show = function() {
      (this.enable = true),
        this.refreshView(t.UI_Activity.getTaskList(i.activity_id));
    }),
    (i.prototype.hide = function() {
      this.enable = false;
    }),
    (i.activity_id = 1006),
    i
  ;
  })(t.UI_Activity_Task);
  t.UI_Activity_Wuyi_Task = e;
})(uiscript || (uiscript = {}));