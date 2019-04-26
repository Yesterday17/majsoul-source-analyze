module.exports = function(uiscript) {
  let newNote = (function() {
    function note(note, id) {
      this._cell = null;
      this.id = id;
      this.loaded = false;
      this.note = note;
    }

    note.prototype.bind = function(e, i) {
      var _this = this;
      if (!i.cell) {
        i.cell = {
          head: new uiscript.UI_Head(e.getChildByName("head")),
          btn_check_info: e.getChildByName("btn_checkinfo"),
          date: e.getChildByName("date"),
          time: e.getChildByName("time"),
          btn_del: e.getChildByName("btn_del"),
          emo: new uiscript.UI_Character_Emo(e.getChildByName("emo")),
          words: e.getChildByName("word"),
          name: e.getChildByName("name"),
          level: e.getChildByName("level"),
          noteitem: null
        };
      }

      if (i.cell.btn_check_info) {
        i.cell.btn_check_info.clickHandler = Laya.Handler.create(
          this,
          function() {
            uiscript.UI_OtherPlayerInfo.Inst.show(_this.commenter.account_id);
          },
          null,
          false
        );
      }

      if (i.cell.btn_del) {
        i.cell.btn_del.clickHandler = Laya.Handler.create(
          this,
          function() {
            game.Tools.setGrayDisable(i.cell.btn_del, true),
              uiscript.UI_SecondConfirm.Inst.show(
                game.Tools.strOfLocalization(19),
                Laya.Handler.create(_this, function() {
                  _this.note.delItem(i.cell.noteitem.id);
                }),
                Laya.Handler.create(_this, function() {
                  game.Tools.setGrayDisable(i.cell.btn_del, false);
                })
              );
          },
          null,
          false
        );
      }

      if (this._cell !== i.cell) {
        if (i.cell.noteitem) {
          i.cell.noteitem.disbind();
        }

        if (this._cell) {
          this._cell.noteitem = null;
        }

        this._cell = i.cell;
        this._cell.noteitem = this;
      }

      this.render();
    };

    note.prototype.disbind = function() {
      this._cell = null;
    };

    note.prototype.setInfo = function(info) {
      this.timestamp = info.timestamp;
      this.commenter = info.commenter;
      this.content = info.content;
      this.loaded = true;
      this.render();
    };

    note.prototype.render = function() {
      if (this._cell) {
        if (this.loaded) {
          this._cell.head.id = this.commenter.avatar_id;
          this._cell.date.text = game.Tools.time2YearMounthDate(this.timestamp);
          this._cell.time.text = game.Tools.time2HourMinute(this.timestamp);

          let data = JSON.parse(this.content);
          this._cell.emo.me.visible = false;
          this._cell.words.visible = false;

          if (data.type == "emo") {
            this._cell.emo.me.visible = true;
            this._cell.emo.setSkin(data.chara, data.index);
          } else {
            this._cell.words.visible = true;
            this._cell.words.text = game.Tools.strWithoutForbidden(data.text);
          }

          this._cell.name.text = this.commenter.nickname;
          this._cell.level.text = "";

          let level_id_defined = cfg.level_definition.level_definition.get(
            this.commenter.level.id
          );

          if (level_id_defined) {
            this._cell.level.text =
              level_id_defined["full_name_" + GameMgr.client_language];
            if (this.note.target_id != GameMgr.Inst.account_id) {
              this._cell.btn_del.visible =
                this.commenter.account_id == GameMgr.Inst.account_id;
            }
          }
        } else {
          this._cell.head.id = 400101;
        }

        this._cell.date.text = "";
        this._cell.time.text = "";
        this._cell.emo.me.visible = false;
        this._cell.words.visible = false;
        this._cell.btn_del.visible = false;
        this._cell.name.text = "";
        this._cell.level.text = "";
        if (this._cell.btn_del) {
          game.Tools.setGrayDisable(this._cell.btn_del, false);
        }
      }
    };

    return note;
  })();

  let leaveComment = (function() {
    function comment(e, i, n, r) {
      var _this = this;
      this.target_id = -1;
      this.comment_allow = -1;
      this.container_input = i;
      this.noinfo = n;
      this.blockemj = new selectEmoji(
        r,
        Laya.Handler.create(
          this,
          function(i) {
            app.NetAgent.sendReq2Lobby(
              "Lobby",
              "leaveComment",
              {
                target_id: _this.target_id,
                content: JSON.stringify({
                  type: "emo",
                  chara: i.chara,
                  index: i.index
                })
              },
              function(i, n) {
                if (!i) {
                  if (n.error) {
                    uiscript.UIMgr.Inst.showNetReqError("leaveComment", i, n);
                    if (n && n.error) {
                      if (n.error.code == 2004) {
                        _this.show(_this.target_id, 1);
                      } else if (n.error.code == 2005) {
                        _this.show(_this.target_id, 2);
                      }
                    }
                  } else {
                    e.refresh();
                  }
                }
              }
            );
          },
          null,
          false
        )
      );
      this.img_input = this.container_input.getChildByName("input");
      this.txt_input = this.img_input.getChildByName("txtinput");
      this.container_input.getChildByName(
        "emj"
      ).clickHandler = Laya.Handler.create(
        this,
        function() {
          _this.blockemj.show();
        },
        null,
        false
      );

      let time = 0;
      this.btn_send = this.container_input.getChildByName("btn_send");
      this.btn_send.clickHandler = Laya.Handler.create(
        this,
        function() {
          let text = _this.txt_input.text;
          if (text && text != "") {
            if (time <= Laya.timer.currTimer) {
              time = Laya.timer.currTimer + 3000;
              game.Tools.setGrayDisable(_this.btn_send, true);
              text = game.Tools.strWithoutForbidden(text);
              app.NetAgent.sendReq2Lobby(
                "Lobby",
                "leaveComment",
                {
                  target_id: _this.target_id,
                  content: JSON.stringify({
                    type: "word",
                    text: text
                  })
                },
                function(i, n) {
                  time = 0;
                  game.Tools.setGrayDisable(_this.btn_send, false);
                  if (!i) {
                    if (n.error) {
                      uiscript.UIMgr.Inst.showNetReqError("leaveComment", i, n);

                      if (n && n.error) {
                        if (n.error.code == 2004) {
                          _this.show(_this.target_id, 1);
                        } else if (n.error.code == 2005) {
                          _this.show(_this.target_id, 2);
                        }
                      }
                    } else {
                      _this.txt_input.text = "";
                      e.refresh();
                    }
                  }
                }
              );
            }
          }
        },
        null,
        false
      );
    }

    comment.prototype.show = function(id, e) {
      if (this.target_id != id || this.comment_allow != e) {
        this.target_id = id;
        this.comment_allow = e;
        this.blockemj.me.visible = false;
        this.noinfo.visible = false;
        this.container_input.visible = false;
        game.Tools.setGrayDisable(this.btn_send, false);

        if (id == GameMgr.Inst.account_id) {
          this.noinfo.visible = true;
          this.noinfo.text = game.Tools.strOfLocalization(2155);
        } else {
          var i = false,
            n = false;
          if (game.Scene_MJ.Inst.active) {
            if (view.DesktopMgr.Inst.mode == view.EMJMode.play) {
              n = true;
            }

            if (n) {
              this.noinfo.visible = true;
              this.noinfo.text = game.Tools.strOfLocalization(20);
            } else {
              if (e == 2) {
                this.noinfo.visible = true;
                this.noinfo.text = game.Tools.strOfLocalization(17);
              } else if (e == 1) {
                if (game.FriendMgr.find(id)) {
                  i = true;
                } else {
                  this.noinfo.visible = true;
                  this.noinfo.text = game.Tools.strOfLocalization(18);
                }
              } else {
                i = true;
              }
            }

            if (i) {
              this.container_input.visible = true;
              this.img_input.height = 74;
              this.txt_input.height = 95;
              this.txt_input.text = "";
            }
          }
        }
      }
    };

    comment.prototype.reset = function() {
      (this.noinfo.visible = false),
        (this.container_input.visible = false),
        (this.blockemj.me.visible = false),
        (this.target_id = -1),
        (this.comment_allow = -1);
    };

    return comment;
  })();

  let n = (function() {
    function label(me) {
      this.me = me;
      this.label_noinfo = me.getChildByName("noinfo");
      this.label_content = me.getChildByName("content");
      var btn_change = me.getChildByName("btn_change");

      if (btn_change) {
        btn_change.clickHandler = Laya.Handler.create(
          this,
          function() {
            uiscript.Sign_Input.Inst.show();
          },
          null,
          false
        );
      }
    }

    label.prototype.reset = function() {
      this.label_noinfo.visible = false;
      this.label_content.visible = false;
    };

    label.prototype.setSign = function(t) {
      this.reset();
      if (t) {
        if (t != "") {
          this.label_content.visible = true;
          this.label_content.text = game.Tools.strWithoutForbidden(t);
        } else {
          this.label_noinfo.visible = true;
        }
      }
    };

    return label;
  })();

  let selectEmoji = (function() {
    function emoji(t, e) {
      var _this = this;
      this._emjs = [];
      this.me = t;
      this._on_btn_emj = e;
      this.root = this.me.getChildByName("root");
      this.scroll_view = this.root.scriptMap["capsui.CScrollView"];
      this.scroll_view.init_scrollview(
        Laya.Handler.create(this, this.render_item, null, false)
      );
      this.me.getChildByName("close").clickHandler = Laya.Handler.create(
        this,
        function() {
          _this._locking || _this.close();
        },
        null,
        false
      );
    }

    emoji.prototype.show = function() {
      var _this = this;
      this._emjs = [];
      for (let i = 0; i < uiscript.UI_Sushe.characters.length; i++) {
        let character = uiscript.UI_Sushe.characters[i],
          a = cfg.item_definition.character.get(character.charid);
        if (a) {
          for (r = 0; r < 9; r++)
            this._emjs.push({
              path: a.emo + "/" + r + ".png",
              chara: character.charid,
              index: r
            });
          if (character.extra_emoji && character.extra_emoji.length > 0)
            for (var r = 0; r < character.extra_emoji.length; r++)
              this._emjs.push({
                path: a.emo + "/" + character.extra_emoji[r] + ".png",
                chara: character.charid,
                index: character.extra_emoji[r]
              });
        }
      }

      this.scroll_view.reset();
      this.scroll_view.addItem(Math.ceil(this._emjs.length / 3));
      this._locking = true;
      this.me.visible = true;
      uiscript.UIBase.anim_pop_out(
        this.root,
        Laya.Handler.create(this, function() {
          _this._locking = false;
        })
      );
    };

    emoji.prototype.close = function() {
      let _this = this;
      this._locking = true;
      uiscript.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, function() {
          _this._locking = false;
          _this.me.visible = false;
        })
      );
    };

    emoji.prototype.render_item = function(e) {
      let _this = this,
        _this_2 = this,
        index = e.index,
        container = e.container,
        cache = e.cache_data,
        makecache = function(e) {
          let child = container.getChildAt(e);
          let offset = 3 * index + e;
          if (offset >= _this_2._emjs.length) {
            child.visible = false;
          } else {
            child.visible = true;
            if (!cache["skin_" + e]) {
              cache["skin_" + e] = new uiscript.UI_Character_Emo(child);
              cache["skin_" + e].setSkin(
                _this_2._emjs[offset].chara,
                _this_2._emjs[offset].index
              );
              child.clickHandler = Laya.Handler.create(
                _this_2,
                function() {
                  if (!_this._locking) {
                    _this._on_btn_emj.runWith(_this._emjs[offset]);
                    _this.close();
                  }
                },
                null,
                false
              );
            }
          }
        };

      for (let j = 0; j < 3; j++) makecache(j);
    };
    return emoji;
  })();

  let playerNote = (function() {
    function note(t, e) {
      var _this = this;
      this.comment_allow = 0;
      this.comment_list = [];
      this.input = null;
      this.nonote = null;
      this.red_point = null;
      this.readed = true;
      this.last_read_id = -1;
      this.red_point = e;
      this.me = t;
      this.content = this.me.scriptMap["capsui.CScrollView"];
      this.content.init_scrollview(
        Laya.Handler.create(this, this._render_item, null, false)
      );
      this.page_controller = new capsui.PageController(
        this.me.getChildByName("page_controller"),
        Laya.Handler.create(this, this._render_page, null, false)
      );
      if (this.me.getChildByName("input")) {
        this.input = new leaveComment(
          this,
          this.me.getChildByName("input"),
          this.me.getChildByName("noinfo"),
          this.me.getChildByName("container_emj")
        );
      }
      this.nonote = this.me.getChildByName("nonote");
      this.sign = new n(this.me.getChildByName("sign"));
      this.scrollbar = this.me.getChildByName("scrollbar_light").scriptMap[
        "capsui.CScrollBar"
      ];
      this.scrollbar.init(false, null);

      this.me.on("ratechange", this, function() {
        if (_this.content.total_height > 0) {
          _this.scrollbar.setVal(
            _this.content.rate,
            _this.content.view_height / _this.content.total_height
          );
        } else {
          _this.scrollbar.setVal(0, 1);
        }
      });
    }

    note.prototype.init_data = function(target) {
      this.readed = true;
      this.target_id = target;
      this.comment_list = [];
      this.nonote.visible = false;
      this.red_point && (this.red_point.visible = false);
      this.page_controller.reset();
      this.content.reset();
      if (this.input) {
        this.input.reset();
      }
      this.refresh();
      this.sign.reset();
    };

    note.prototype.show = function() {
      this.me.visible = true;
      if (this.target_id == GameMgr.Inst.account_id) {
        this.read();
        if (this.red_point) {
          this.red_point.visible = false;
        }
      }
    };

    note.prototype.close = function() {
      this.me.visible = false;
    };

    note.prototype.refresh = function() {
      var i = this;
      app.NetAgent.sendReq2Lobby(
        "Lobby",
        "fetchCommentList",
        {
          target_id: this.target_id
        },
        function(n, a) {
          if (n || a.error)
            uiscript.UIMgr.Inst.showNetReqError("fetchCommentList", n, a);
          else {
            i.comment_list = [];
            i.page_controller.reset();
            i.content.reset();
            if (a.comment_id_list) {
              for (let r = 0; r < a.comment_id_list.length; r++)
                i.comment_list.push(new newNote(i, a.comment_id_list[r]));
              i.page_controller.set_total_page_count(
                Math.ceil(i.comment_list.length / 10)
              );
            }
            i.nonote.visible = i.comment_list.length == 0;
            i.comment_allow = a.comment_allow;
            if (i.input) {
              i.input.show(i.target_id, i.comment_allow);
            }
            i.last_read_id = a.last_read_id;
            if (i.target_id == GameMgr.Inst.account_id) {
              if (i.me.visible) {
                i.read();
              } else {
                if (i.red_point) {
                  if (i.comment_list.length > 0) {
                    i.red_point.visible =
                      i.comment_list[0].id != i.last_read_id;
                  } else {
                    i.red_point.visible = false;
                  }
                }
              }
            }
          }
        }
      );
    };

    note.prototype.read = function() {
      if (
        this.last_read_id != -1 &&
        this.comment_list.length != 0 &&
        this.target_id == GameMgr.Inst.account_id &&
        this.last_read_id != this.comment_list[0].id
      ) {
        app.NetAgent.sendReq2Lobby(
          "Lobby",
          "updateReadComment",
          {
            read_id: this.comment_list[0].id
          },
          function(t, e) {}
        );
      }
    };

    note.prototype._render_page = function(t) {
      if (this.comment_list.length <= t * 10) {
        this.content.reset();
      } else {
        this.content.reset();
        let e = this.comment_list.length - t * 10;
        if (e > 10) {
          e = 10;
          this.content.addItem(e);
          this._fetch_current_page();
        }
      }
    };

    note.prototype._fetch_current_page = function() {
      let _this = this;
      let comment_id_list = [];

      for (let i = 0; i < 10; i++) {
        let index = 10 * this.page_controller.current_index + i;
        if (index >= this.comment_list.length) break;
        if (!this.comment_list[index].loaded) {
          comment_id_list.push(this.comment_list[index].id);
        }
      }
      if (comment_id_list.length > 0) {
        app.NetAgent.sendReq2Lobby(
          "Lobby",
          "fetchCommentContent",
          {
            target_id: this.target_id,
            comment_id_list: comment_id_list
          },
          function(i, n) {
            if (i || n.error) {
              uiscript.UIMgr.Inst.showNetReqError("fetchCommentContent", i, n);
            } else {
              for (let i = 0; i < n.comments.length; i++) {
                let comment = n.comments[i];
                for (let j = 0; j < _this.comment_list.length; j++)
                  if (_this.comment_list[j].id == comment.comment_id) {
                    _this.comment_list[j].setInfo(comment);
                    break;
                  }
              }
            }
          }
        );
      }
    };

    note.prototype._render_item = function(e) {
      let index = e.index,
        container = e.container,
        cache = e.cache_data,
        r = 10 * this.page_controller.current_index + index;
      if (this.comment_list.length > r) {
        this.comment_list[r].bind(container, cache);
      } else {
        uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2156));
      }
    };

    note.prototype.delItem = function(item) {
      for (var i = -1, n = 0; n < this.comment_list.length; n++) {
        if (this.comment_list[n].id === item) {
          for (let j = n; j < this.comment_list.length - 1; j++) {
            this.comment_list[j] = this.comment_list[j + 1];
          }
          this.comment_list.pop();
          i = n - 10 * this.page_controller.current_index;
          break;
        }
      }
      if (i >= 0 && i < 10) {
        this.content.delItem(i);
        if (
          this.comment_list.length >=
          this.page_controller.current_index * 10 + 10
        ) {
          this.content.addItem(1);
          this._fetch_current_page();
        }
        app.NetAgent.sendReq2Lobby(
          "Lobby",
          "deleteComment",
          {
            target_id: this.target_id,
            delete_list: [item]
          },
          function(e, i) {
            if (e || i.error) {
              uiscript.UIMgr.Inst.showNetReqError("deleteComment", e, i);
            }
          }
        );
        this.page_controller.set_total_page_count(
          Math.ceil(this.comment_list.length / 10)
        );
        this.nonote.visible = 0 == this.comment_list.length;
      }
    };

    return note;
  })();
  uiscript.UI_PlayerNote = playerNote;
};
