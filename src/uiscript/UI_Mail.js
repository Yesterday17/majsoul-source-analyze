module.exports = function(uiscript) {
  let newMail = (function() {
    function mail(i) {
      this.items = [];
      this.select_index = -1;
      this.right_btn_cd = 0;
      mail.Inst = this;
      this.me = i;
      this.me.visible = false;
      this.container_left = this.me.getChildByName("left");
      this.container_right = this.me.getChildByName("right");
      this.container_nomail = this.me.getChildByName("nomail");
      this.left_sroll = this.me.getChildByName("left").scriptMap[
        "capsui.CScrollView"
      ];
      this.left_sroll.init_scrollview(
        Laya.Handler.create(this, this._renderLeft, null, false)
      );

      let right = this.me.getChildByName("right");
      this.title = right.getChildByName("title");
      this.content = right.getChildByName("content");
      this.btn_get = right.getChildByName("btn_get");
      this.btn_del = right.getChildByName("btn_del");
      this.container_item = right.getChildByName("container_item");

      for (let i = 0; i < this.container_item.numChildren; i++) {
        let at = this.container_item.getChildAt(i);
        this.items.push({
          me: at,
          icon: new uiscript.UI_Item_Skin(
            at.getChildByName("btn").getChildByName("icon")
          )
        });
        this.items[i].me.visible = false;
      }
    }

    Object.defineProperty(mail, "haveRedPoint", {
      get: function() {
        for (let i = 0; i < this.mails.length; i++) {
          if (this.mails[i].state == 0) return true;
        }
        return false;
      },
      enumerable: true,
      configurable: true
    });

    mail.Init = function() {
      let _this = this;
      app.NetAgent.sendReq2Lobby("Lobby", "fetchMailInfo", {}, function(e, n) {
        if (e || n.error) {
          uiscript.UIMgr.Inst.showNetReqError("fetchMailInfo", e, n);
        } else {
          _this.mails = [];
          if (n.mails) {
            for (let i = 0; i < n.mails.length; i++) {
              _this.mails.push(n.mails[i]);
            }
          }
          _this.mails = _this.mails.sort(function(t, e) {
            let create_time = t.create_time || 0;
            let n = e.create_time;
            return n || -create_time;
          });
        }
      });
      app.NetAgent.AddListener2Lobby(
        "NotifyNewMail",
        Laya.Handler.create(
          this,
          function(t) {
            _this.mails.unshift(t.mail);
          },
          null,
          false
        )
      );
      app.NetAgent.AddListener2Lobby(
        "NotifyDeleteMail",
        Laya.Handler.create(
          this,
          function(t) {
            for (let i = 0; i < t.mail_id_list.length; i++) {
              if (_this.Inst) {
                _this.Inst.onDelMail(t.mail_id_list[i]);
              } else {
                let pos = -1;
                for (let j = 0; j < mail.mails.length; j++)
                  if (mail.mails[j].mail_id == t.mail_id_list[j]) {
                    pos = j;
                    break;
                  }
                for (var k = pos; k < mail.mails.length - 1; k++) {
                  mail.mails[k] = mail.mails[k + 1];
                }
                mail.mails.pop();
              }
            }
          },
          null,
          false
        )
      );
    };

    mail.prototype.show = function() {
      this.left_sroll.reset();
      this.right_btn_cd = 0;
      this.select_index = 0;
      if (mail.mails.length > 0) {
        this.left_sroll.addItem(mail.mails.length);
        this._renderRight(0, true);
        this.container_left.visible = true;
        this.container_right.visible = true;
        this.container_nomail.visible = false;
      } else {
        this.container_left.visible = false;
        this.container_right.visible = false;
        this.container_nomail.visible = true;
        this.me.visible = true;
      }
    };

    mail.prototype.onDelMail = function(i) {
      let pos = -1;
      for (let i = 0; i < mail.mails.length; i++)
        if (mail.mails[i].mail_id == i) {
          pos = i;
          break;
        }

      for (var j = pos; j < mail.mails.length - 1; j++) {
        mail.mails[j] = mail.mails[j + 1];
      }

      if ((mail.mails.pop(), uiscript.UI_Activity.Inst.enable)) {
        var selected = this.select_index;
        if (mail.mails.length == selected) {
          selected--;
          this.left_sroll.delItem(pos);
          if (mail.mails.length <= 0) {
            this.container_left.visible = false;
            this.container_right.visible = false;
            this.container_nomail.visible = true;
          } else {
            this.container_left.visible = true;
            this.container_right.visible = true;
            this.container_nomail.visible = false;
            this._renderRight(selected, true);
            this.left_sroll.wantToRefreshItem(selected);
          }
        }
      }
    };

    mail.prototype.hide = function() {
      this.me.visible = false;
      this.left_sroll.reset();
    };

    mail.prototype._renderLeft = function(t) {
      let _this = this,
        index = t.index,
        container = t.container,
        mail = mail.mails[index],
        bg = container.getChildByName("bg");
      bg.skin = game.Tools.localUISrc(
        this.select_index == index
          ? "myres/lobby/act_choosed.png"
          : "myres/lobby/act_unchoosen.png"
      );

      let state = container.getChildByName("state");
      state.skin = game.Tools.localUISrc(
        this.select_index != index && 0 == mail.state
          ? "myres/lobby/read_no.png"
          : "myres/lobby/read_yes.png"
      );

      container.clickHandler = Laya.Handler.create(
        this,
        function() {
          if (_this.select_index != index) {
            let selected_index = _this.select_index;
            _this._renderRight(index, false);
            mail.state = 1;
            bg.skin = game.Tools.localUISrc("myres/lobby/act_choosed.png");
            state.skin = game.Tools.localUISrc("myres/lobby/read_yes.png");
            if (selected_index >= 0) {
              _this.left_sroll.wantToRefreshItem(selected_index);
            }
          }
        },
        null,
        false
      );
      container.getChildByName("title").text = mail.title;
    };

    mail.prototype._renderRight = function(i, n) {
      let _this = this;
      if (n || this.select_index != i) {
        let mail = mail.mails[i],
          attachment = false,
          list = [];
        this.select_index = i;
        this.title.text = mail.title;
        this.content.text = mail.content;

        mail.attachments.forEach(att => {
          if (att.id != 100099 && att.id != 100098) list.push(att);
        });

        if (mail.attachments && mail.attachments.length > 0) {
          attachment = !mail.take_attachment;
          this.items.forEach((_mail, index) => {
            if (index < list.length) {
              _mail.me.visible = true;
              let id = _mail.id;
              let count = _mail.count;
              _mail.me.getChildByName("btn").clickHandler = Laya.Handler.create(
                this,
                function() {
                  uiscript.UI_ItemDetail.Inst.show(id);
                },
                null,
                false
              );
              _mail.icon.setSkin(game.GameUtility.get_item_view(id).icon);

              let count = _mail.me.getChildByName("count");
              if (count <= 1) {
                count.visible = false;
              } else {
                count.visible = true;
                count.text = count.toString();
              }

              _mail.me.getChildByName("getted").visible = !attachment;
              _mail.me.x = 12 + 120 * _mail;
              _mail.me.y = this.items[0].me.y;
            } else {
              _mail.me.visible = false;
            }
          });
        } else {
          this.items.forEach(item => (item.me.visible = false));
        }

        this.btn_get.visible = attachment;
        this.btn_del.visible = !attachment;
        if (mail.state == 0) {
          this.onReadStateChange();
          app.NetAgent.sendReq2Lobby(
            "Lobby",
            "readMail",
            {
              mail_id: mail.mail_id
            },
            function() {}
          );

          mail.state = 1;
          this.onReadStateChange();
          this.right_btn_cd = 0;
          this.btn_get.clickHandler = Laya.Handler.create(
            this,
            function() {
              if (Laya.timer.currTimer >= _this.right_btn_cd) {
                _this.right_btn_cd = Laya.timer.currTimer + 1e3;
                app.NetAgent.sendReq2Lobby(
                  "Lobby",
                  "takeAttachmentFromMail",
                  {
                    mail_id: mail.mail_id
                  },
                  function(e, i) {
                    if (((_this.right_btn_cd = 0), e || i.error))
                      uiscript.UIMgr.Inst.showNetReqError(
                        "takeAttachmentFromMail",
                        e,
                        i
                      );
                    else {
                      _this.btn_get.visible = !attachment;
                      _this.btn_del.visible = attachment;
                      mail.take_attachment = true;
                      for (var n = 0; n < _this.items.length; n++) {
                        if (_this.items[n].me.visible) {
                          _this.items[n].me.getChildByName(
                            "getted"
                          ).visible = true;
                        }
                      }
                    }
                  }
                );
              }
            },
            null,
            false
          );

          this.btn_del.clickHandler = Laya.Handler.create(this, function() {
            if (Laya.timer.currTimer >= _this.right_btn_cd) {
              _this.right_btn_cd = Laya.timer.currTimer + 1e3;
              app.NetAgent.sendReq2Lobby(
                "Lobby",
                "deleteMail",
                {
                  mail_id: mail.mail_id
                },
                function(e, i) {
                  _this.right_btn_cd = 0;
                  if (!e) {
                    if (i.error) {
                      uiscript.UIMgr.Inst.showNetReqError("deleteMail", e, i);
                    } else {
                      _this.onDelMail(mail.mail_id);
                    }
                  }
                }
              );
            }
          });
        }
      }
    };

    mail.prototype.onReadStateChange = function() {
      uiscript.UI_Lobby.Inst.top.refreshRedpoint();
      uiscript.UI_Activity.Inst.refresh_redpoint();
    };

    mail.Inst = null;
    mail.mails = [];
    return mail;
  })();
  uiscript.UI_Mail = newMail;
};
