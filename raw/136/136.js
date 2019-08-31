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
      return e.call(this, new ui.entrance.choose_languageUI()) || this;
    }
    return (
      __extends(i, e),
      (i.show = function(e) {
        if (!this._inited) {
          (this._complete = e), (this._inited = !0);
          var n = new i();
          t.UIMgr.Inst.AddLobbyUI(n),
            Laya.timer.frameOnce(5, this, function() {
              n._show();
            });
        }
      }),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.scorllview = this.root.getChildByName('lst').scriptMap[
            'capsui.CScrollView'
          ]),
          (this.lst = []),
          this.lst.push({ name: '简体中文', language: 'chs' }),
          this.lst.push({ name: '繁体中文', language: 'chs_t' }),
          this.lst.push({ name: '日文', language: 'jp' }),
          this.lst.push({ name: '英文', language: 'en' }),
          this.scorllview.init_scrollview(
            Laya.Handler.create(
              this,
              function(e) {
                var i = e.index,
                  n = e.container;
                (n.label = t.lst[i].name),
                  (n.clickHandler = Laya.Handler.create(
                    t,
                    function() {
                      Laya.LocalStorage.setItem('lang', t.lst[i].language),
                        (t.enable = !1),
                        t.me.destroy(!0),
                        Laya.Browser.window.conch ||
                          (Laya.Browser.window.location.href =
                            GameMgr.Inst.link_url);
                    },
                    null,
                    !1
                  ));
              },
              null,
              !1
            )
          ),
          (this.me.getChildByName('jump').clickHandler = Laya.Handler.create(
            this,
            function() {
              (t.enable = !1),
                t.me.destroy(!0),
                i._complete && i._complete.run();
            },
            null,
            !1
          ));
      }),
      (i.prototype._show = function() {
        (this.enable = !0),
          this.scorllview.reset(),
          this.scorllview.addItem(this.lst.length);
        var t = '当前语言：';
        switch (GameMgr.client_language) {
          case 'chs':
            t += '简体中文';
            break;
          case 'chs_t':
            t += '繁体中文';
            break;
          case 'jp':
            t += '日文';
            break;
          case 'en':
            t += '英文';
            break;
          default:
            t += '未知';
        }
        this.me.getChildByName('now').text = t;
      }),
      (i._ips = []),
      (i._inited = !1),
      (i._complete = null),
      i
    );
  })(t.UIBase);
  t.UI_ChooseLanguage = e;
})(uiscript || (uiscript = {}));