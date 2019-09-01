var uiscript;
!(function(t) {
  var e = (function() {
      function t(t) {
        var e = this;
        (this.tabs = []),
          (this.scrollview = null),
          (this.tab_index = -1),
          (this.me = t);
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
          var r = i.getChildByName('tab_' + a);
          this.tabs.push({
            choosed: r.getChildByName('unchoose'),
            unchoosed: r.getChildByName('choosed'),
            ids: [],
            heights: []
          }),
            (r.clickHandler = Laya.Handler.create(
              this,
              this._changeTab,
              [a - 1],
              false
            ));
        }
        cfg.fandesc.fandesc.forEach(function(t) {
          if (t.show) {
            var i = t.tag - 1;
            i >= 0 &&
              i < e.tabs.length &&
              (e.tabs[i].ids.push(t.id),
              (n.text = t['desc_' + GameMgr.client_language]),
              e.tabs[i].heights.push(n.textField.textHeight + 240));
          }
        }),
          (this.scrollview = this.me.getChildByName('fans').scriptMap[
            'capsui.CScrollView'
          ]),
          this.scrollview.init_scrollview(
            Laya.Handler.create(
              this,
              function(t) {
                e._showItem(t.index, t.container);
              },
              null,
              false
            )
          );
      }
      return (
        (t.prototype.onEnter = function() {
          (this.tab_index = -1), this._changeTab(0);
        }),
        (t.prototype.show = function() {
          this.me.visible = true;
        }),
        (t.prototype.close = function() {
          this.me.visible = false;
        }),
        (t.prototype._changeTab = function(t) {
          if (t != this.tab_index) {
            this.tab_index = t;
            for (var e = 0; e < this.tabs.length; e++)
              (this.tabs[e].choosed.visible = e == t),
                (this.tabs[e].unchoosed.visible = e != t);
            this.scrollview.reset(),
              this.scrollview.addItems(this.tabs[t].heights);
          }
        }),
        (t.prototype._showItem = function(t, e) {
          var i = cfg.fandesc.fandesc.get(this.tabs[this.tab_index].ids[t]);
          (e.getChildByName('name').text =
            i['name_' + GameMgr.client_language]),
            (e.getChildByName('decs').text =
              i['desc_' + GameMgr.client_language]),
            (e.getChildByName('limit').text =
              i['desc2_' + GameMgr.client_language]);
          var n = e.getChildByName('tiles');
          (n.y = 100 + e.getChildByName('decs').textField.textHeight),
            (e.height = this.tabs[this.tab_index].heights[t]);
          for (
            var a = i.case,
              r = 0,
              s = 0,
              o =
                'myres2/mjp/' +
                game.GameUtility.get_common_view_res_name(
                  game.ECommonView.mjp
                ) +
                '/ui/',
              l = 0;
            l < n.numChildren;
            l++
          ) {
            var h = n.getChildAt(l);
            if (r >= a.length) h.visible = false;
            else {
              var c = '';
              'b' == a[r]
                ? ((c = 'back'), r++)
                : ((c = a[r] + a[r + 1]), (r += 2)),
                (h.skin = game.Tools.localUISrc(o + c + '.png')),
                (h.visible = true),
                (h.x = s),
                (h.y = 0),
                (s += h.width);
            }
            for (; r < a.length && '|' == a[r]; ) (s += 20), r++;
          }
        }),
        t
      );
    })(),
    i = (function() {
      function t(t) {
        var e = this;
        (this.locking = false),
          (this.loadover = []),
          (this.urls = [
            game.Tools.localUISrc('course/course0.png'),
            game.Tools.localUISrc('course/course1.png'),
            game.Tools.localUISrc('course/course2.png'),
            game.Tools.localUISrc('course/course3.png'),
            game.Tools.localUISrc('course/course4.png'),
            game.Tools.localUISrc('course/course5.png'),
            game.Tools.localUISrc('course/course6.png'),
            game.Tools.localUISrc('course/course7.png'),
            game.Tools.localUISrc('course/course8.png')
          ]),
          (this.pageindex = 0),
          (this.me = t),
          (this.page = this.me.getChildByName('page')),
          (this.btn_pre = this.me.getChildByName('pre')),
          (this.btn_next = this.me.getChildByName('next')),
          (this.btn_close = this.me.getChildByName('btn_close')),
          (this.loading = this.me.getChildByName('loading')),
          (this.btn_pre.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking || (0 != e.pageindex && e.showPage(e.pageindex - 1));
            },
            null,
            false
          )),
          (this.btn_next.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                (e.pageindex != e.urls.length - 1 &&
                  e.showPage(e.pageindex + 1));
            },
            null,
            false
          ));
        for (var i = 0; i < this.urls.length; i++) this.loadover.push(false);
        this.label_count = this.me.getChildByName('count');
      }
      return (
        (t.prototype.onEnter = function() {
          this.pageindex = 0;
        }),
        (t.prototype.show = function() {
          var t = this;
          this.showPage(this.pageindex), (this.me.visible = true);
          for (
            var e = function(e) {
                i.loadover.push(false),
                  Laya.loader.load(
                    i.urls[e],
                    Laya.Handler.create(i, function() {
                      Laya.timer.frameOnce(3, t, function() {
                        (t.loadover[e] = true),
                          t.me.visible &&
                            t.pageindex == e &&
                            ((t.loading.visible = false),
                            (t.page.source = Laya.loader.getRes(t.urls[e])),
                            (t.page.visible = true)),
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
        }),
        (t.prototype.close = function() {
          this.me.visible = false;
          for (var t = 0; t < this.urls.length; t++)
            this.loadover[t] && Laya.loader.clearTextureRes(this.urls[t]);
        }),
        (t.prototype.showPage = function(t) {
          (this.pageindex = t),
            (this.btn_pre.visible = 0 != t),
            (this.btn_next.visible = t != this.urls.length - 1),
            this.loadover[t]
              ? ((this.page.visible = true),
                (this.page.source = Laya.loader.getRes(this.urls[t])),
                (this.loading.visible = false))
              : ((this.page.visible = false), (this.loading.visible = true)),
            (this.label_count.text =
              (this.pageindex + 1).toString() +
              '/' +
              this.urls.length.toString());
        }),
        t
      );
    })(),
    n = (function(n) {
      function a() {
        var t =
          n.call(
            this,
            'chs' == GameMgr.client_language
              ? new ui.both_ui.rulesUI()
              : new ui.both_ui.rules_enUI()
          ) || this;
        return (
          (t.root = null),
          (t.blackmask = null),
          (t.page_rule = null),
          (t.page_course = null),
          (t.locking = false),
          (t.tab_index = 0),
          (t.func_close = null),
          (t.tab_fan = null),
          (t.tab_course = null),
          (t.tab_img_dark = ''),
          (t.tab_img_chosen = ''),
          (a.Inst = t),
          t
        );
      }
      return (
        __extends(a, n),
        (a.prototype.onCreate = function() {
          var t = this;
          'chs' == GameMgr.client_language
            ? ((this.tab_img_chosen = game.Tools.localUISrc(
                'myres/bothui/info_tab_chosen.png'
              )),
              (this.tab_img_dark = game.Tools.localUISrc(
                'myres/bothui/info_tab_dark.png'
              )))
            : ((this.tab_img_chosen = game.Tools.localUISrc(
                'myres/bothui/info_tabheng_chosen.png'
              )),
              (this.tab_img_dark = game.Tools.localUISrc(
                'myres/bothui/info_tabheng_dark.png'
              ))),
            (this.root = this.me.getChildByName('root')),
            (this.blackmask = this.me.getChildByName('bmask')),
            (this.page_rule = new e(this.root.getChildByName('page_fan'))),
            (this.page_course = new i(this.root.getChildByName('page_course'))),
            (this.tab_fan = this.root.getChildByName('tab_fan')),
            (this.root.getChildByName(
              'tab_fan'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                t.changeTab(0);
              },
              null,
              false
            )),
            (this.tab_course = this.root.getChildByName('tab_course')),
            (this.root.getChildByName(
              'tab_course'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                t.changeTab(1);
              },
              null,
              false
            )),
            (this.root.getChildByName(
              'btn_close'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                t.close();
              },
              null,
              false
            ));
        }),
        (a.prototype.show = function(e, i) {
          var n = this;
          undefined === e && (e = 0),
            undefined === i && (i = null),
            (this.locking = true),
            (this.enable = true),
            this.page_course.onEnter(),
            this.page_rule.onEnter(),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                n.locking = false;
              })
            ),
            (this.blackmask.alpha = 0),
            Laya.Tween.to(this.blackmask, { alpha: 0.3 }, 150),
            (this.tab_index = -1),
            this.changeTab(e),
            (this.func_close = i);
        }),
        (a.prototype.changeTab = function(t) {
          t != this.tab_index &&
            ((this.tab_index = t),
            0 == this.tab_index
              ? (this.page_course.close(),
                this.page_rule.show(),
                (this.tab_course.skin = this.tab_img_dark),
                (this.tab_fan.skin = this.tab_img_chosen))
              : (this.page_course.show(),
                this.page_rule.close(),
                (this.tab_course.skin = this.tab_img_chosen),
                (this.tab_fan.skin = this.tab_img_dark)));
        }),
        (a.prototype.onDisable = function() {
          this.page_course.close(), this.page_course.close();
        }),
        (a.prototype.close = function() {
          var e = this;
          (this.locking = true),
            Laya.Tween.to(this.blackmask, { alpha: 0 }, 150),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = false),
                  (e.enable = false),
                  e.func_close && e.func_close.run();
              })
            );
        }),
        (a.Inst = null),
        a
      );
    })(t.UIBase);
  t.UI_Rules = n;
})(uiscript || (uiscript = {}));