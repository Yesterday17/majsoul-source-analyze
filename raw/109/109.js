var uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      return (
        e.call(this, cfg.activity.activity.get(i.activity_id).name) || this
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        e.prototype.onCreate.call(this),
          this.setHead('myres2/treasurehead/christmas_task.jpg', 974, 326);
      }),
      (i.prototype.isopen = function() {
        return t.UI_Activity.activities[i.activity_id];
      }),
      (i.prototype.haveRedPoint = function() {
        var e = t.UI_Activity.getTaskList(i.activity_id);
        if (e)
          for (var n = 0; n < e.length; n++)
            if (!e[n].rewarded && e[n].achieved) return true;
        return false;
      }),
      (i.prototype.need_popout = function() {
        var t = cfg.activity.activity.get(i.activity_id);
        return !(!t || !t.need_popout);
      }),
      (i.prototype.show = function() {
        (this.enable = true),
          this.refreshView(t.UI_Activity.getTaskList(i.activity_id));
      }),
      (i.prototype.hide = function() {
        this.enable = false;
      }),
      (i.activity_id = 1001),
      i
    );
  })(t.UI_Activity_Task);
  t.UI_Christmas_Task = e;
})(uiscript || (uiscript = {}));