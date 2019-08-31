var uiscript;
!(function(t) {
  var e = (function() {
      function e(t, e) {
        (this._cell = null), (this.id = e), (this.loaded = !1), (this.note = t);
      }
      return (
        (e.prototype.bind = function(e, i) {
          var n = this;
          i.cell ||
            (i.cell = {
              head: new t.UI_Head(e.getChildByName('head')),
              btn_check_info: e.getChildByName('btn_checkinfo'),
              date: e.getChildByName('date'),
              time: e.getChildByName('time'),
              btn_del: e.getChildByName('btn_del'),
              emo: new t.UI_Character_Emo(e.getChildByName('emo')),
              words: e.getChildByName('word'),
              name: e.getChildByName('name'),
              level: e.getChildByName('level'),
              noteitem: null
            }),
            i.cell.btn_check_info &&
              (i.cell.btn_check_info.clickHandler = Laya.Handler.create(
                this,
                function() {
                  t.UI_OtherPlayerInfo.Inst.show(n.commenter.account_id);
                },
                null,
                !1
              )),
            i.cell.btn_del &&
              (i.cell.btn_del.clickHandler = Laya.Handler.create(
                this,
                function() {
                  game.Tools.setGrayDisable(i.cell.btn_del, !0),
                    t.UI_SecondConfirm.Inst.show(
                      game.Tools.strOfLocalization(19),
                      Laya.Handler.create(n, function() {
                        n.note.delItem(i.cell.noteitem.id);
                      }),
                      Laya.Handler.create(n, function() {
                        game.Tools.setGrayDisable(i.cell.btn_del, !1);
                      })
                    );
                },
                null,
                !1
              )),
            this._cell !== i.cell &&
              (i.cell.noteitem && i.cell.noteitem.disbind(),
              this._cell && (this._cell.noteitem = null),
              (this._cell = i.cell),
              (this._cell.noteitem = this)),
            this.render();
        }),
        (e.prototype.disbind = function() {
          this._cell = null;
        }),
        (e.prototype.setInfo = function(t) {
          (this.timestamp = t.timestamp),
            (this.commenter = t.commenter),
            (this.content = t.content),
            (this.loaded = !0),
            this.render();
        }),
        (e.prototype.render = function() {
          if (this._cell) {
            if (this.loaded) {
              (this._cell.head.id = this.commenter.avatar_id),
                (this._cell.date.text = game.Tools.time2YearMounthDate(
                  this.timestamp
                )),
                (this._cell.time.text = game.Tools.time2HourMinute(
                  this.timestamp
                ));
              var t = JSON.parse(this.content);
              (this._cell.emo.me.visible = !1),
                (this._cell.words.visible = !1),
                'emo' == t.type
                  ? ((this._cell.emo.me.visible = !0),
                    this._cell.emo.setSkin(t.chara, t.index))
                  : ((this._cell.words.visible = !0),
                    (this._cell.words.text = game.Tools.strWithoutForbidden(
                      t.text
                    ))),
                (this._cell.name.text = this.commenter.nickname),
                (this._cell.level.text = '');
              var e = cfg.level_definition.level_definition.get(
                this.commenter.level.id
              );
              e &&
                (this._cell.level.text =
                  e['full_name_' + GameMgr.client_language]),
                this.note.target_id == GameMgr.Inst.account_id ||
                this.commenter.account_id == GameMgr.Inst.account_id
                  ? (this._cell.btn_del.visible = !0)
                  : (this._cell.btn_del.visible = !1);
            } else
              (this._cell.head.id = 400101),
                (this._cell.date.text = ''),
                (this._cell.time.text = ''),
                (this._cell.emo.me.visible = !1),
                (this._cell.words.visible = !1),
                (this._cell.btn_del.visible = !1),
                (this._cell.name.text = ''),
                (this._cell.level.text = '');
            this._cell.btn_del &&
              game.Tools.setGrayDisable(this._cell.btn_del, !1);
          }
        }),
        e
      );
    })(),
    i = (function() {
      function e(e, i, n, r) {
        var s = this;
        (this.target_id = -1),
          (this.comment_allow = -1),
          (this.container_input = i),
          (this.noinfo = n),
          (this.blockemj = new a(
            r,
            Laya.Handler.create(
              this,
              function(i) {
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'leaveComment',
                  {
                    target_id: s.target_id,
                    content: JSON.stringify({
                      type: 'emo',
                      chara: i.chara,
                      index: i.index
                    })
                  },
                  function(i, n) {
                    i || n.error
                      ? (t.UIMgr.Inst.showNetReqError('leaveComment', i, n),
                        n &&
                          n.error &&
                          (2004 == n.error.code
                            ? s.show(s.target_id, 1)
                            : 2005 == n.error.code && s.show(s.target_id, 2)))
                      : e.refresh();
                  }
                );
              },
              null,
              !1
            )
          )),
          (this.img_input = this.container_input.getChildByName('input')),
          (this.txt_input = this.img_input.getChildByName('txtinput')),
          (this.container_input.getChildByName(
            'emj'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              s.blockemj.show();
            },
            null,
            !1
          ));
        var o = 0;
        (this.btn_send = this.container_input.getChildByName('btn_send')),
          (this.btn_send.clickHandler = Laya.Handler.create(
            this,
            function() {
              var i = s.txt_input.text;
              i &&
                '' != i &&
                (o > Laya.timer.currTimer ||
                  ((o = Laya.timer.currTimer + 3e3),
                  game.Tools.setGrayDisable(s.btn_send, !0),
                  (i = game.Tools.strWithoutForbidden(i)),
                  app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'leaveComment',
                    {
                      target_id: s.target_id,
                      content: JSON.stringify({ type: 'word', text: i })
                    },
                    function(i, n) {
                      (o = 0),
                        game.Tools.setGrayDisable(s.btn_send, !1),
                        i || n.error
                          ? (t.UIMgr.Inst.showNetReqError('leaveComment', i, n),
                            n &&
                              n.error &&
                              (2004 == n.error.code
                                ? s.show(s.target_id, 1)
                                : 2005 == n.error.code &&
                                  s.show(s.target_id, 2)))
                          : ((s.txt_input.text = ''), e.refresh());
                    }
                  )));
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.show = function(t, e) {
          if (this.target_id != t || e != this.comment_allow) {
            (this.target_id = t),
              (this.comment_allow = e),
              (this.blockemj.me.visible = !1),
              (this.noinfo.visible = !1),
              (this.container_input.visible = !1);
            if (
              (game.Tools.setGrayDisable(this.btn_send, !1),
              t == GameMgr.Inst.account_id)
            )
              (this.noinfo.visible = !0),
                (this.noinfo.text = game.Tools.strOfLocalization(2155));
            else {
              var i = !1,
                n = !1;
              game.Scene_MJ.Inst.active &&
                view.DesktopMgr.Inst.mode == view.EMJMode.play &&
                (n = !0),
                n
                  ? ((this.noinfo.visible = !0),
                    (this.noinfo.text = game.Tools.strOfLocalization(20)))
                  : 2 == e
                  ? ((this.noinfo.visible = !0),
                    (this.noinfo.text = game.Tools.strOfLocalization(17)))
                  : 1 == e
                  ? game.FriendMgr.find(t)
                    ? (i = !0)
                    : ((this.noinfo.visible = !0),
                      (this.noinfo.text = game.Tools.strOfLocalization(18)))
                  : (i = !0),
                i &&
                  ((this.container_input.visible = !0),
                  (this.img_input.height = 74),
                  (this.txt_input.height = 95),
                  (this.txt_input.text = ''));
            }
          }
        }),
        (e.prototype.reset = function() {
          (this.noinfo.visible = !1),
            (this.container_input.visible = !1),
            (this.blockemj.me.visible = !1),
            (this.target_id = -1),
            (this.comment_allow = -1);
        }),
        e
      );
    })(),
    n = (function() {
      function e(e) {
        (this.me = e),
          (this.label_noinfo = e.getChildByName('noinfo')),
          (this.label_content = e.getChildByName('content'));
        var i = e.getChildByName('btn_change');
        i &&
          (i.clickHandler = Laya.Handler.create(
            this,
            function() {
              t.Sign_Input.Inst.show();
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.reset = function() {
          (this.label_noinfo.visible = !1), (this.label_content.visible = !1);
        }),
        (e.prototype.setSign = function(t) {
          this.reset(),
            t && '' != t
              ? ((this.label_content.visible = !0),
                (this.label_content.text = game.Tools.strWithoutForbidden(t)))
              : (this.label_noinfo.visible = !0);
        }),
        e
      );
    })(),
    a = (function() {
      function e(t, e) {
        var i = this;
        (this._emjs = []),
          (this.me = t),
          (this._on_btn_emj = e),
          (this.root = this.me.getChildByName('root')),
          (this.scroll_view = this.root.scriptMap['capsui.CScrollView']),
          this.scroll_view.init_scrollview(
            Laya.Handler.create(this, this.render_item, null, !1)
          ),
          (this.me.getChildByName('close').clickHandler = Laya.Handler.create(
            this,
            function() {
              i._locking || i.close();
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.show = function() {
          var e = this;
          this._emjs = [];
          for (var i = 0; i < t.UI_Sushe.characters.length; i++) {
            var n = t.UI_Sushe.characters[i],
              a = cfg.item_definition.character.get(n.charid);
            if (a) {
              for (r = 0; r < 9; r++)
                this._emjs.push({
                  path: a.emo + '/' + r + '.png',
                  chara: n.charid,
                  index: r
                });
              if (n.extra_emoji && n.extra_emoji.length > 0)
                for (var r = 0; r < n.extra_emoji.length; r++)
                  this._emjs.push({
                    path: a.emo + '/' + n.extra_emoji[r] + '.png',
                    chara: n.charid,
                    index: n.extra_emoji[r]
                  });
            }
          }
          this.scroll_view.reset(),
            this.scroll_view.addItem(Math.ceil(this._emjs.length / 3)),
            (this._locking = !0),
            (this.me.visible = !0),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e._locking = !1;
              })
            );
        }),
        (e.prototype.close = function() {
          var e = this;
          (this._locking = !0),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e._locking = !1), (e.me.visible = !1);
              })
            );
        }),
        (e.prototype.render_item = function(e) {
          for (
            var i = this,
              n = e.index,
              a = e.container,
              r = e.cache_data,
              s = function(e) {
                var s = a.getChildAt(e),
                  l = 3 * n + e;
                l >= o._emjs.length
                  ? (s.visible = !1)
                  : ((s.visible = !0),
                    r['skin_' + e] ||
                      (r['skin_' + e] = new t.UI_Character_Emo(s)),
                    r['skin_' + e].setSkin(o._emjs[l].chara, o._emjs[l].index),
                    (s.clickHandler = Laya.Handler.create(
                      o,
                      function() {
                        i._locking ||
                          (i._on_btn_emj.runWith(i._emjs[l]), i.close());
                      },
                      null,
                      !1
                    )));
              },
              o = this,
              l = 0;
            l < 3;
            l++
          )
            s(l);
        }),
        e
      );
    })(),
    r = (function() {
      function a(t, e) {
        var a = this;
        (this.comment_allow = 0),
          (this.comment_list = []),
          (this.input = null),
          (this.nonote = null),
          (this.red_point = null),
          (this.readed = !0),
          (this.last_read_id = -1),
          (this.red_point = e),
          (this.me = t),
          (this.content = this.me.scriptMap['capsui.CScrollView']),
          this.content.init_scrollview(
            Laya.Handler.create(this, this._render_item, null, !1)
          ),
          (this.page_controller = new capsui.PageController(
            this.me.getChildByName('page_controller'),
            Laya.Handler.create(this, this._render_page, null, !1)
          )),
          this.me.getChildByName('input') &&
            (this.input = new i(
              this,
              this.me.getChildByName('input'),
              this.me.getChildByName('noinfo'),
              this.me.getChildByName('container_emj')
            )),
          (this.nonote = this.me.getChildByName('nonote')),
          (this.sign = new n(this.me.getChildByName('sign'))),
          (this.scrollbar = this.me.getChildByName('scrollbar_light').scriptMap[
            'capsui.CScrollBar'
          ]),
          this.scrollbar.init(null),
          this.me.on('ratechange', this, function() {
            a.content.total_height > 0
              ? a.scrollbar.setVal(
                  a.content.rate,
                  a.content.view_height / a.content.total_height
                )
              : a.scrollbar.setVal(0, 1);
          });
      }
      return (
        (a.prototype.init_data = function(t) {
          (this.readed = !0),
            (this.target_id = t),
            (this.comment_list = []),
            (this.nonote.visible = !1),
            this.red_point && (this.red_point.visible = !1),
            this.page_controller.reset(),
            this.content.reset(),
            this.input && this.input.reset(),
            this.refresh(),
            this.sign.reset();
        }),
        (a.prototype.show = function() {
          (this.me.visible = !0),
            this.target_id == GameMgr.Inst.account_id &&
              (this.read(), this.red_point && (this.red_point.visible = !1));
        }),
        (a.prototype.close = function() {
          this.me.visible = !1;
        }),
        (a.prototype.refresh = function() {
          var i = this;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchCommentList',
            { target_id: this.target_id },
            function(n, a) {
              if (n || a.error)
                t.UIMgr.Inst.showNetReqError('fetchCommentList', n, a);
              else {
                if (
                  ((i.comment_list = []),
                  i.page_controller.reset(),
                  i.content.reset(),
                  a.comment_id_list)
                ) {
                  for (var r = 0; r < a.comment_id_list.length; r++)
                    i.comment_list.push(new e(i, a.comment_id_list[r]));
                  i.page_controller.set_total_page_count(
                    Math.ceil(i.comment_list.length / 10)
                  );
                }
                (i.nonote.visible = 0 == i.comment_list.length),
                  (i.comment_allow = a.comment_allow),
                  i.input && i.input.show(i.target_id, i.comment_allow),
                  (i.last_read_id = a.last_read_id),
                  i.target_id == GameMgr.Inst.account_id &&
                    (i.me.visible
                      ? i.read()
                      : i.red_point &&
                        (i.red_point.visible =
                          i.comment_list.length > 0 &&
                          i.comment_list[0].id != i.last_read_id));
              }
            }
          );
        }),
        (a.prototype.read = function() {
          -1 != this.last_read_id &&
            0 != this.comment_list.length &&
            this.target_id == GameMgr.Inst.account_id &&
            this.last_read_id != this.comment_list[0].id &&
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'updateReadComment',
              { read_id: this.comment_list[0].id },
              function(t, e) {}
            );
        }),
        (a.prototype._render_page = function(t) {
          if (10 * t >= this.comment_list.length) this.content.reset();
          else {
            this.content.reset();
            var e = this.comment_list.length - 10 * t;
            e > 10 && (e = 10),
              this.content.addItem(e),
              this._fetch_current_page();
          }
        }),
        (a.prototype._fetch_current_page = function() {
          for (var e = this, i = [], n = 0; n < 10; n++) {
            var a = 10 * this.page_controller.current_index + n;
            if (a >= this.comment_list.length) break;
            this.comment_list[a].loaded || i.push(this.comment_list[a].id);
          }
          i.length > 0 &&
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'fetchCommentContent',
              { target_id: this.target_id, comment_id_list: i },
              function(i, n) {
                if (i || n.error)
                  t.UIMgr.Inst.showNetReqError('fetchCommentContent', i, n);
                else
                  for (var a = 0; a < n.comments.length; a++)
                    for (
                      var r = n.comments[a], s = 0;
                      s < e.comment_list.length;
                      s++
                    )
                      if (e.comment_list[s].id == r.comment_id) {
                        e.comment_list[s].setInfo(r);
                        break;
                      }
              }
            );
        }),
        (a.prototype._render_item = function(e) {
          var i = e.index,
            n = e.container,
            a = e.cache_data,
            r = 10 * this.page_controller.current_index + i;
          r < this.comment_list.length
            ? this.comment_list[r].bind(n, a)
            : t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2156));
        }),
        (a.prototype.delItem = function(e) {
          for (var i = -1, n = 0; n < this.comment_list.length; n++)
            if (this.comment_list[n].id === e) {
              for (var a = n; a < this.comment_list.length - 1; a++)
                this.comment_list[a] = this.comment_list[a + 1];
              this.comment_list.pop(),
                (i = n - 10 * this.page_controller.current_index);
              break;
            }
          i >= 0 &&
            i < 10 &&
            (this.content.delItem(i),
            10 * this.page_controller.current_index + 10 <=
              this.comment_list.length &&
              (this.content.addItem(1), this._fetch_current_page())),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'deleteComment',
              { target_id: this.target_id, delete_list: [e] },
              function(e, i) {
                (e || i.error) &&
                  t.UIMgr.Inst.showNetReqError('deleteComment', e, i);
              }
            ),
            this.page_controller.set_total_page_count(
              Math.ceil(this.comment_list.length / 10)
            ),
            (this.nonote.visible = 0 == this.comment_list.length);
        }),
        a
      );
    })();
  t.UI_PlayerNote = r;
})(uiscript || (uiscript = {}));