var uiscript;
!(function(t) {
  var e = (function(t) {
    function e() {
      var i = t.call(this, new ui.entrance.remind_newUI()) || this;
      return (i.process = null), (i._created = false), (i._v = 0), (e.Inst = i), i;
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        (this.process = this.me.getChildByName('process')),
          (this.process.text = this._v.toString() + '/10'),
          (this._created = true);
      }),
      (e.prototype.setprocess = function(t) {
        (this._v = t),
          this._created && (this.process.text = t.toString() + '/10');
      }),
      (e.Inst = null),
      e
    );
  })(t.UIBase);
  t.UI_Remind = e;
})(uiscript || (uiscript = {}));