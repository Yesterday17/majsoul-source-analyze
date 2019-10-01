var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      return (
        e.call(
          this,
          cfg.activity.activity.get(i.activity_id)[
            'name_' + GameMgr.client_language
          ]
        ) || this
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        e.prototype.onCreate.call(this),
          this.setHead(
            'myres2/treasurehead/banner_zhongqiurenwu.jpg',
            974,
            326
          );
      }),
      (i.prototype.isopen = function() {
        return t.UI_Activity.activities[i.activity_id];
      }),
      (i.prototype.haveRedPoint = function() {
        var e = t.UI_Activity.getTaskList(i.activity_id);
        if (e)
          for (var n = 0; n < e.length; n++)
            if (!e[n].rewarded && e[n].achieved) return !0;
        return !1;
      }),
      (i.prototype.need_popout = function() {
        var t = cfg.activity.activity.get(i.activity_id);
        return !(!t || !t.need_popout);
      }),
      (i.prototype.show = function() {
        (this.enable = !0),
          this.refreshView(t.UI_Activity.getTaskList(i.activity_id));
      }),
      (i.prototype.hide = function() {
        this.enable = !1;
      }),
      (i.activity_id = 1018),
      i
    );
  })(t.UI_Activity_Task);
  t.UI_Activity_Wuyi_Task = e;
})(uiscript || (uiscript = {}));