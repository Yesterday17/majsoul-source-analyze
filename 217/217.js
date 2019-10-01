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
  var e = (() => {
    function t(t) {
      var e = this;
      this.tabs = [];
      this.scrollview = null;
      this.tab_index = -1;
      this.me = t;
      for (
        var i = this.me.getChildByName('tabs'),
          n = this.me
            .getChildByName('fans')
            .getChildByName('content')
            .getChildByName('templete')
            .getChildByName('decs'),
          a = 1;
        a <= 8;
        a++
      ) {
        var r = i.getChildByName(`tab_${a}`);

        this.tabs.push({
          choosed: r.getChildByName('unchoose'),
          unchoosed: r.getChildByName('choosed'),
          ids: [],
          heights: []
        });

        r.clickHandler = Laya.Handler.create(
            this,
            this._changeTab,
            [a - 1],
            !1
          );
      }

      cfg.fandesc.fandesc.forEach(t => {
        if (t.show) {
          var i = t.tag - 1;
          e.tabs[i].ids.push(t.id);
          n.text = t[`desc_${GameMgr.client_language}`];
          i >= 0 &&
            i < e.tabs.length &&
            (e.tabs[i].heights.push(n.textField.textHeight + 240));
        }
      });

      this.scrollview = this.me.getChildByName('fans').scriptMap[
          'capsui.CScrollView'
        ];

      this.scrollview.init_scrollview(
        Laya.Handler.create(
          this,
          ({index, container}) => {
            e._showItem(index, container);
          },
          null,
          !1
        )
      );
    }

    t.prototype.onEnter = function() {
      this.tab_index = -1;
      this._changeTab(0);
    };

    t.prototype.show = function() {
      this.me.visible = !0;
    };

    t.prototype.close = function() {
      this.me.visible = !1;
    };

    t.prototype._changeTab = function(t) {
      if (t != this.tab_index) {
        this.tab_index = t;
        this.tabs[e].choosed.visible = e == t;
        for (var e = 0; e < this.tabs.length; e++)
          this.tabs[e].unchoosed.visible = e != t;
        this.scrollview.reset();
        this.scrollview.addItems(this.tabs[t].heights);
      }
    };

    t.prototype._showItem = function(t, e) {
      var i = cfg.fandesc.fandesc.get(this.tabs[this.tab_index].ids[t]);

      e.getChildByName('name').text =
        i[`name_${GameMgr.client_language}`];

      e.getChildByName('decs').text =
          i[`desc_${GameMgr.client_language}`];

      e.getChildByName('limit').text =
          i[`desc2_${GameMgr.client_language}`];
      var n = e.getChildByName('tiles');
      n.y = 100 + e.getChildByName('decs').textField.textHeight;
      e.height = this.tabs[this.tab_index].heights[t];
      for (
        var a = i.case,
          r = 0,
          s = 0,
          o =
            `myres2/mjp/${game.GameUtility.get_common_view_res_name(
  game.ECommonView.mjp
)}/ui/`,
          l = 0;
        l < n.numChildren;
        l++
      ) {
        var h = n.getChildAt(l);
        if (r >= a.length) h.visible = !1;
        else {
          var c = '';
          c = 'back';
          c = a[r] + a[r + 1];

          'b' == a[r]
            ? (r++)
            : (r += 2);

          h.skin = game.Tools.localUISrc(`${o + c}.png`);
          h.visible = !0;
          h.x = s;
          h.y = 0;
          s += h.width;
        }
        s += 20;
        for (; r < a.length && '|' == a[r]; ) r++;
      }
    };

    return t;
  })();

  var i = (() => {
    class t {
      constructor(t) {
        var e = this;
        this.locking = !1;
        this.loadover = [];

        this.urls = [
            game.Tools.localUISrc('course/course0.png'),
            game.Tools.localUISrc('course/course1.png'),
            game.Tools.localUISrc('course/course2.png'),
            game.Tools.localUISrc('course/course3.png'),
            game.Tools.localUISrc('course/course4.png'),
            game.Tools.localUISrc('course/course5.png'),
            game.Tools.localUISrc('course/course6.png'),
            game.Tools.localUISrc('course/course7.png'),
            game.Tools.localUISrc('course/course8.png')
          ];

        this.pageindex = 0;
        this.me = t;
        this.page = this.me.getChildByName('page');
        this.btn_pre = this.me.getChildByName('pre');
        this.btn_next = this.me.getChildByName('next');
        this.btn_close = this.me.getChildByName('btn_close');
        this.loading = this.me.getChildByName('loading');

        this.btn_pre.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || (0 != e.pageindex && e.showPage(e.pageindex - 1));
            },
            null,
            !1
          );

        this.btn_next.clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking ||
                (e.pageindex != e.urls.length - 1 &&
                  e.showPage(e.pageindex + 1));
            },
            null,
            !1
          );
        for (var i = 0; i < this.urls.length; i++) this.loadover.push(!1);
        this.label_count = this.me.getChildByName('count');
      }

      onEnter() {
        this.pageindex = 0;
      }

      show() {
        var t = this;
        this.showPage(this.pageindex);
        this.me.visible = !0;
        for (
          var e = e => {
            i.loadover.push(!1);
            Laya.loader.load(
              i.urls[e],
              Laya.Handler.create(i, () => {
                Laya.timer.frameOnce(3, t, () => {
                  t.loadover[e] = !0;
                  t.loading.visible = !1;
                  t.page.source = Laya.loader.getRes(t.urls[e]);

                  t.me.visible &&
                    t.pageindex == e &&
                    ((t.page.visible = !0));

                  t.me.visible ||
                    Laya.loader.clearTextureRes(t.urls[e]);
                });
              })
            );
          },
            i = this,
            n = 0;
          n < this.urls.length;
          n++
        )
          e(n);
      }

      close() {
        this.me.visible = !1;
        for (var t = 0; t < this.urls.length; t++)
          this.loadover[t] && Laya.loader.clearTextureRes(this.urls[t]);
      }

      showPage(t) {
        this.pageindex = t;
        this.btn_pre.visible = 0 != t;
        this.btn_next.visible = t != this.urls.length - 1;
        this.page.visible = !0;
        this.page.source = Laya.loader.getRes(this.urls[t]);
        this.page.visible = !1;

        this.loadover[t]
          ? (this.loading.visible = !1)
          : (this.loading.visible = !0);

        this.label_count.text =
            `${(this.pageindex + 1).toString()}/${this.urls.length.toString()}`;
      }
    }

    return t;
  })();

  var n = (n => {
    class a {
      constructor() {
        var t =
          n.call(
            this,
            'chs' == GameMgr.client_language
              ? new ui.both_ui.rulesUI()
              : new ui.both_ui.rules_enUI()
          ) || this;
        t.root = null;
        t.blackmask = null;
        t.page_rule = null;
        t.page_course = null;
        t.locking = !1;
        t.tab_index = 0;
        t.func_close = null;
        t.tab_fan = null;
        t.tab_course = null;
        t.tab_img_dark = '';
        t.tab_img_chosen = '';
        a.Inst = t;
        return t;
      }

      onCreate() {
        var t = this;

        this.tab_img_chosen = game.Tools.localUISrc(
              'myres/bothui/info_tab_chosen.png'
            );

        this.tab_img_chosen = game.Tools.localUISrc(
              'myres/bothui/info_tabheng_chosen.png'
            );

        'chs' == GameMgr.client_language
          ? (this.tab_img_dark = game.Tools.localUISrc(
              'myres/bothui/info_tab_dark.png'
            ))
          : (this.tab_img_dark = game.Tools.localUISrc(
              'myres/bothui/info_tabheng_dark.png'
            ));

        this.root = this.me.getChildByName('root');
        this.blackmask = this.me.getChildByName('bmask');
        this.page_rule = new e(this.root.getChildByName('page_fan'));
        this.page_course = new i(this.root.getChildByName('page_course'));
        this.tab_fan = this.root.getChildByName('tab_fan');

        this.root.getChildByName(
            'tab_fan'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.changeTab(0);
            },
            null,
            !1
          );

        this.tab_course = this.root.getChildByName('tab_course');

        this.root.getChildByName(
            'tab_course'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.changeTab(1);
            },
            null,
            !1
          );

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              t.close();
            },
            null,
            !1
          );
      }

      show(e, i) {
        var n = this;
        void 0 === e && (e = 0);
        void 0 === i && (i = null);
        this.locking = !0;
        this.enable = !0;
        this.page_course.onEnter();
        this.page_rule.onEnter();

        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );

        this.blackmask.alpha = 0;
        Laya.Tween.to(this.blackmask, { alpha: 0.3 }, 150);
        this.tab_index = -1;
        this.changeTab(e);
        this.func_close = i;
      }

      changeTab(t) {
        this.tab_index = t;
        this.page_course.close();
        this.page_rule.show();
        this.tab_course.skin = this.tab_img_dark;
        this.page_course.show();
        this.page_rule.close();
        this.tab_course.skin = this.tab_img_chosen;
        t != this.tab_index &&
          ((0 == this.tab_index ? this.tab_fan.skin = this.tab_img_chosen : this.tab_fan.skin = this.tab_img_dark));
      }

      onDisable() {
        this.page_course.close();
        this.page_course.close();
      }

      close() {
        var e = this;
        this.locking = !0;
        Laya.Tween.to(this.blackmask, { alpha: 0 }, 150);
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
            e.func_close && e.func_close.run();
          })
        );
      }
    }

    __extends(a, n);

    a.Inst = null;
    return a;
  })(t.UIBase);

  t.UI_Rules = n;
})(uiscript || (uiscript = {}));