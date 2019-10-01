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
        return (
          e.call(this, cfg.activity.activity.get(i.activity_id).name) || this
        );
      }

      onCreate() {
        e.prototype.onCreate.call(this);
        this.setHead('myres2/treasurehead/christmas_task.jpg', 974, 326);
      }

      isopen() {
        return t.UI_Activity.activities[i.activity_id];
      }

      haveRedPoint() {
        var e = t.UI_Activity.getTaskList(i.activity_id);
        if (e)
          for (var n = 0; n < e.length; n++)
            if (!e[n].rewarded && e[n].achieved) return !0;
        return !1;
      }

      need_popout() {
        var t = cfg.activity.activity.get(i.activity_id);
        return !(!t || !t.need_popout);
      }

      show() {
        this.enable = !0;
        this.refreshView(t.UI_Activity.getTaskList(i.activity_id));
      }

      hide() {
        this.enable = !1;
      }
    }

    __extends(i, e);

    i.activity_id = 1001;
    return i;
  })(t.UI_Activity_Task);
  t.UI_Christmas_Task = e;
})(uiscript || (uiscript = {}));