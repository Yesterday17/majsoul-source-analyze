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
  var e = (function() {
      function e(e) {
        var i = this;
        (this.btn_next_flag = 0),
          (this.btn_prev_flag = 0),
          (this.maskflag = 0),
          (this.locking = !1),
          (this.loadover = []),
          (this.pageid = []),
          (this.pageindex = 0),
          (this.pagecorrect = 0),
          (this.pagewrong = 0),
          (this.effectnext = 1),
          (this.effectprev = 0),
          (this.container_chat = null),
          (this.chat_block = null),
          (this.me = e),
          (this.blackground = this.me.getChildByName('bg')),
          (this.page = this.me
            .getChildByName('content')
            .getChildByName('content')),
          (this.skip_text = this.me.getChildByName('skipimg')),
          (this.img_correct = this.me
            .getChildByName('content')
            .getChildByName('correct')),
          (this.img_error = this.me
            .getChildByName('content')
            .getChildByName('error')),
          (this.btn_next = this.me.getChildByName('nextbutton')),
          (this.btn_next_flag = 0),
          (this.btn_prev = this.me.getChildByName('prevbutton')),
          (this.btn_prev_flag = 0),
          (this.btn_exit = this.me.getChildByName('exit')),
          (this.btn_back = this.me.getChildByName('back')),
          (this.loading = this.me.getChildByName('loading')),
          (this.buttonCrew = this.me.getChildByName('buttonCrew')),
          (this.btn1 = this.buttonCrew.getChildByName('btn1')),
          (this.btn2 = this.buttonCrew.getChildByName('btn2')),
          (this.btn3 = this.buttonCrew.getChildByName('btn3')),
          (this.buttonCrew.visible = !1),
          (this.yijibg = this.me.getChildByName('yjbg')),
          (this.Dialogue = this.me.getChildByName('Dialogue')),
          (this.Dtext = this.Dialogue.getChildByName('content').getChildByName(
            'info'
          )),
          (this.Dnamet = this.Dialogue.getChildByName('name')),
          (this.Dnamet.scaleX = this.Dnamet.scaleY =
            'en' == GameMgr.client_language ? 1.8 : 1.3),
          (this.Shead = this.Dialogue.getChildByName('head')),
          (this.mask = this.me.getChildByName('content').mask),
          (this.chat_block = new t.UI_Character_Chat(
            this.me.getChildByName('Dialogue')
          )),
          (this.btn_prev.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking ||
                (0 != i.pageindex &&
                  i.data &&
                  i.data.datas &&
                  ((i.effectprev = 1), (i.btn_next_flag = 0), i.btnprev()));
            },
            null,
            !1
          )),
          (this.btn_next.clickHandler = Laya.Handler.create(
            this,
            function() {
              if (
                !i.locking &&
                i.data &&
                i.data.datas &&
                i.pageindex != i.data.datas.length - 1
              ) {
                i.effectnext = 1;
                var t;
                if (((i.btn_prev_flag = 0), 0 == i.btn_next_flag)) {
                  for (var e = 0; e < i.data.datas.length; e++)
                    i.data.datas[e].page_id == i.data.datas[i.pageindex].next &&
                      ((i.pagecorrect = e),
                      0 == (t = parseFloat(i.data.datas[e].effect)) && (t = 2),
                      1 == t && (t = 0));
                  i.showPage(i.pagecorrect, t);
                } else (i.btn_next_flag = 0), i.showPage(i.pagecorrect, 0);
              }
            },
            null,
            !1
          )),
          (this.btn1.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || i.changepage(i.pageindex, 0);
            },
            null,
            !1
          )),
          (this.btn2.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || i.changepage(i.pageindex, 1);
            },
            null,
            !1
          )),
          (this.btn3.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || i.changepage(i.pageindex, 2);
            },
            null,
            !1
          )),
          (this.btn_back.clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking ||
                (0 != i.pageindex &&
                  i.data &&
                  i.data.datas &&
                  ((i.effectprev = 1), i.btnprev()));
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.btnvisible = function(t, e) {
          this.buttonCrew.visible != e &&
            (e ? i.Inst.me.ani1.play(0, !0) : i.Inst.me.ani1.stop()),
            (this.buttonCrew.visible = e);
          for (var n = 1; n < t + 1; n++) {
            var a = 'btn' + n;
            this.buttonCrew.getChildByName(a).visible = e;
          }
        }),
        (e.prototype.btnprev = function() {
          var t;
          if (this.data.datas[this.pageindex].prev) {
            for (e = 0; e < this.data.datas.length; e++)
              this.data.datas[e].page_id ==
                this.data.datas[this.pageindex].prev &&
                ((t = parseFloat(this.data.datas[this.pageindex].effect)),
                (this.pageindex = e),
                0 == t && (t = 2));
            this.showPage(this.pageindex, t);
          } else if (0 == this.btn_prev_flag) {
            for (var e = 0; e < this.pageid.length; e++)
              this.pageid[e] == this.pageindex &&
                (this.pageindex = this.pageid[e - 1]);
            this.showPage(this.pageindex, 1);
          } else (this.btn_prev_flag = 0), this.showPage(this.pagewrong, 2);
        }),
        (e.prototype.show = function() {
          var t = this;
          game.Scene_Lobby.Inst.change_bg('indoor', !1),
            (this.effectnext = 1),
            (this.effectprev = 0),
            (this.me.visible = !0);
          var e = 'res/atlas/' + game.Tools.localUISrc('myres/course_ui.atlas');
          Laya.loader.load(
            e,
            Laya.Handler.create(this, function() {
              (t.blackground.skin = game.Tools.localUISrc(
                'myres/course_ui/blackboard.png'
              )),
                (t.img_correct.getChildByName(
                  'text'
                ).skin = game.Tools.localUISrc('myres/course_ui/correct.png')),
                (t.img_correct.getChildByName(
                  'circle'
                ).skin = game.Tools.localUISrc(
                  'myres/course_ui/correct_circle.png'
                )),
                (t.img_error.getChildByName(
                  'text'
                ).skin = game.Tools.localUISrc('myres/course_ui/error.png')),
                (t.img_error.getChildByName(
                  'circle'
                ).skin = game.Tools.localUISrc(
                  'myres/course_ui/error_circle.png'
                )),
                (t.btn_next.getChildByName('next').skin = game.Tools.localUISrc(
                  'myres/course_ui/arrow.png'
                )),
                (t.btn_prev.getChildByName('next').skin = game.Tools.localUISrc(
                  'myres/course_ui/arrow.png'
                )),
                (t.Dialogue.getChildByName(
                  'textbg'
                ).skin = game.Tools.localUISrc('myres/course_ui/bubble.png')),
                (t.Dialogue.getChildByName('textbg').sizeGrid = '51,41,65,128'),
                (t.Dialogue.getChildByName(
                  'namebg'
                ).skin = game.Tools.localUISrc('myres/course_ui/bg_name.png')),
                (t.me.getChildByName('skipimg').skin = game.Tools.localUISrc(
                  'myres/course_ui/skip.png'
                )),
                (t.mask.skin = game.Tools.localUISrc(
                  'myres/course_ui/Maskimg.png'
                ));
              for (
                var e = t.me
                    .getChildByName('buttonCrew')
                    .getChildByName('choose_shine'),
                  i = 0;
                i < e.numChildren;
                i++
              ) {
                e.getChildAt(i).skin = game.Tools.localUISrc(
                  'myres/course_ui/choose_box_shine.png'
                );
              }
            })
          );
          var i = 'docs/xinshouyindao_' + GameMgr.client_language + '.json';
          (this.data = null),
            Laya.loader.load(
              i,
              Laya.Handler.create(this, function() {
                t.data = Laya.loader.getRes(i);
                for (
                  var e = 0,
                    n = function(i) {
                      t.data.datas[i].page_id.length <= 13 &&
                        ((t.pageid[e] = i), e++),
                        t.loadover.push(!1);
                      var n = game.Tools.localUISrc(t.data.datas[i].img);
                      Laya.loader.load(
                        n,
                        Laya.Handler.create(t, function() {
                          Laya.timer.frameOnce(3, t, function() {
                            (t.loadover[i] = !0),
                              t.me.visible &&
                                t.pageindex == i &&
                                ((t.loading.visible = !1),
                                (t.page.source = Laya.loader.getRes(n)),
                                (t.page.visible = !0)),
                              t.me.visible || Laya.loader.clearTextureRes(n);
                          });
                        })
                      );
                    },
                    a = 0;
                  a < t.data.datas.length;
                  a++
                )
                  n(a);
                (t.loadover[0] = !0), t.showPage(t.pageindex, 0);
              })
            );
        }),
        (e.prototype.showPage = function(t, e) {
          (this.pageindex = t),
            (this.btn_prev.visible = 0 != t),
            (this.btn_next.visible = t != this.data.page_count - 1),
            (this.yijibg.visible = !1),
            (this.btn_exit.visible = !1),
            (this.btn_back.visible = !1),
            this.btnvisible(3, !1),
            (this.img_correct.visible = !1),
            (this.img_error.visible = !1),
            t > 0
              ? ((this.blackground.visible = !0),
                (this.skip_text.visible = !1),
                (this.btn_prev.visible = !0))
              : ((this.blackground.visible = !1),
                (this.skip_text.visible = !0)),
            t == this.data.datas.length - 1 && (this.btn_exit.visible = !0),
            this.chat_block.show(
              this.data.datas[t].text,
              'en' == GameMgr.client_language ? 10 : 5
            ),
            (this.Dnamet.text = this.data.datas[t].name);
          var i = 'extendRes/emo/' + this.data.datas[t].head;
          game.LoadMgr.setImgSkin(this.Shead, i),
            this.loadover[t]
              ? ('1' == this.data.datas[t].bg
                  ? ((i = 'extendRes/charactor/' + this.data.datas[t].img),
                    game.LoadMgr.setImgSkin(this.yijibg, i),
                    (this.yijibg.scaleX = parseFloat(this.data.datas[t].flip)),
                    (this.blackground.visible = !1),
                    (this.yijibg.visible = !0),
                    (this.page.visible = !1))
                  : ((this.page.visible = !0),
                    (this.page.source = Laya.loader.getRes(
                      game.Tools.localUISrc(this.data.datas[t].img)
                    ))),
                (this.loading.visible = !1))
              : ((this.page.visible = !1), (this.loading.visible = !0)),
            this.data.datas[t].answers &&
              null != this.data.datas[t].answers &&
              this.buttonChoose(t),
            this.pinshan(t, e),
            t == this.data.datas.length - 1 &&
              (app.PlayerBehaviorStatistic.fb_trace_pending(
                app.EBehaviorType.CompleteTutorial,
                1
              ),
              0 ==
                app.PlayerBehaviorStatistic.get_val(
                  app.EBehaviorType.XinShouYinDao
                ) &&
                (app.PlayerBehaviorStatistic.update_val(
                  app.EBehaviorType.XinShouYinDao,
                  1
                ),
                app.PlayerBehaviorStatistic.google_trace_pending(
                  app.EBehaviorType.G_tutorial_complete,
                  1
                ),
                app.PlayerBehaviorStatistic.tw_trace_pending(
                  app.EBehaviorType.TW_Tutorial_Completed,
                  1
                )));
        }),
        (e.prototype.pinshan = function(t, e) {
          var i = this,
            n = this.buttonCrew.visible;
          (this.btn_next.mouseEnabled = !1),
            (this.btn_prev.mouseEnabled = !1),
            (this.buttonCrew.visible = !1),
            1 == e
              ? ((this.mask.x = 1700),
                Laya.Tween.to(
                  this.mask,
                  { x: -260 },
                  250,
                  null,
                  Laya.Handler.create(this, function() {
                    (i.btn_next.mouseEnabled = !0),
                      (i.btn_prev.mouseEnabled = !0),
                      (i.buttonCrew.visible = n),
                      (i.effectnext = 0);
                  })
                ))
              : 0 == e
              ? ((this.mask.x = -2220),
                Laya.Tween.to(
                  this.mask,
                  { x: -260 },
                  250,
                  null,
                  Laya.Handler.create(this, function() {
                    (i.btn_next.mouseEnabled = !0),
                      (i.btn_prev.mouseEnabled = !0),
                      (i.buttonCrew.visible = n),
                      (i.effectprev = 0);
                  })
                ))
              : ((this.mask.visible = !1),
                (this.mask.x = -260),
                (this.btn_next.mouseEnabled = !0),
                (this.btn_prev.mouseEnabled = !0),
                (this.buttonCrew.visible = n));
        }),
        (e.prototype.buttonChoose = function(t) {
          this.btnvisible(3, !0), (this.btn_next.visible = !1);
          for (var e = 0; e < 3; e++)
            if (null != this.data.datas[t].answers[e].flag) {
              if ('correct' == this.data.datas[t].answers[e].flag) {
                (this.img_correct.x = this.data.datas[t].answers[e].x),
                  (this.img_correct.y = this.data.datas[t].answers[e].y),
                  (this.img_correct.visible = !0),
                  (this.btn_next.visible = !0),
                  (this.btn_next_flag = 1),
                  this.btnvisible(3, !1),
                  i.Inst.me.correct.play(0, !1);
                for (n = 0; n < this.data.datas.length; n++)
                  this.data.datas[n].page_id == this.data.datas[t].next &&
                    ((this.pagecorrect = n),
                    (this.btn_prev.visible = !0),
                    (this.btn_prev_flag = 1),
                    (this.pagewrong = this.pagecorrect - 4));
              }
              if ('wrong' == this.data.datas[t].answers[e].flag) {
                (this.img_error.x = this.data.datas[t].answers[e].x),
                  (this.img_error.y = this.data.datas[t].answers[e].y),
                  (this.img_error.visible = !0),
                  (this.btn_back.visible = !0),
                  i.Inst.me.error.play(0, !1);
                for (var n = 0; n < this.data.datas.length; n++)
                  this.data.datas[n].page_id == this.data.datas[t].next &&
                    ((this.btn_prev_flag = 1), (this.pagewrong = n));
                this.btnvisible(3, !1);
              }
            }
        }),
        (e.prototype.changepage = function(t, e) {
          for (var i = 0; i < this.data.datas.length; i++)
            this.data.datas[i].page_id == this.data.datas[t].answers[e].jump &&
              (this.pageindex = i);
          this.showPage(this.pageindex, 2);
        }),
        (e.prototype.onEnter = function() {
          (this.pageindex = 0),
            (this.btn_back.mouseEnabled = !0),
            (this.btn_prev.mouseEnabled = !0),
            (this.mask.visible = !0);
        }),
        (e.prototype.close = function() {
          this.me.visible = !1;
          for (var t = 0; t < this.data.datas.length; t++)
            this.loadover[t] &&
              Laya.loader.clearTextureRes(
                game.Tools.localUISrc(this.data.datas[t].img)
              );
          (this.loadover = []),
            Laya.loader.clearTextureRes(
              'res/atlas/' + game.Tools.localUISrc('myres/course_ui.atlas')
            ),
            game.Scene_Lobby.Inst.change_bg('yard', !1),
            this.chat_block.close(!1),
            (this.mask.visible = !1);
        }),
        e
      );
    })(),
    i = (function(i) {
      function n() {
        var t = i.call(this, new ui.lobby.xinshouyindaoUI()) || this;
        return (
          (t.root = null),
          (t.blackmask = null),
          (t.page_course = null),
          (t.locking = !1),
          (t.func_close = null),
          (n.Inst = t),
          t
        );
      }
      return (
        __extends(n, i),
        (n.pre_load = function() {
          var t = this,
            e = 'res/atlas/' + game.Tools.localUISrc('myres/course_ui.atlas');
          Laya.loader.load(e, Laya.Handler.create(this, function() {}));
          var i = 'docs/xinshouyindao_' + GameMgr.client_language + '.json';
          Laya.loader.load(
            i,
            Laya.Handler.create(this, function() {
              for (
                var e = Laya.loader.getRes(i), n = 0;
                n < e.datas.length;
                n++
              ) {
                var a = game.Tools.localUISrc(e.datas[n].img);
                Laya.loader.load(a, Laya.Handler.create(t, function() {}));
              }
            })
          );
        }),
        (n.prototype.onCreate = function() {
          var t = this;
          (this.root = this.me.getChildByName('root')),
            (this.blackmask = this.me.getChildByName('bmask')),
            (this.page_course = new e(
              this.root.getChildByName('xinshouzhidao')
            )),
            (this.root.getChildByName(
              'skipbutton'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                t.close();
              },
              null,
              !1
            )),
            (this.root
              .getChildByName('xinshouzhidao')
              .getChildByName('exit').clickHandler = Laya.Handler.create(
              this,
              function() {
                t.close();
              },
              null,
              !1
            ));
        }),
        (n.prototype.show = function(e, i) {
          var n = this;
          void 0 === e && (e = 0),
            void 0 === i && (i = null),
            (this.locking = !0),
            (this.enable = !0),
            this.page_course.onEnter(),
            t.UIBase.anim_alpha_in(
              this.root,
              { y: 0 },
              300,
              0,
              Laya.Handler.create(this, function() {
                n.locking = !1;
              })
            ),
            (this.blackmask.alpha = 0),
            Laya.Tween.to(this.blackmask, { alpha: 0.3 }, 150),
            this.changeTab(),
            (this.func_close = i);
        }),
        (n.prototype.changeTab = function() {
          this.page_course.show();
        }),
        (n.prototype.onDisable = function() {
          this.page_course.close();
        }),
        (n.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            Laya.Tween.to(this.blackmask, { alpha: 0 }, 150),
            t.UIBase.anim_alpha_out(
              this.root,
              { y: 0 },
              150,
              0,
              Laya.Handler.create(this, function() {
                (e.locking = !1),
                  (e.enable = !1),
                  e.func_close && e.func_close.run();
              })
            );
        }),
        (n.Inst = null),
        n
      );
    })(t.UIBase);
  t.UI_XinShouYinDao = i;
})(uiscript || (uiscript = {}));