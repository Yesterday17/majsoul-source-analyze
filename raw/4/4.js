var uiscript;
!(function(t) {
  var e = (function() {
    function e(i) {
      (this.items = []),
        (this.select_index = -1),
        (this.right_btn_cd = 0),
        (e.Inst = this),
        (this.me = i),
        (this.me.visible = false),
        (this.container_left = this.me.getChildByName('left')),
        (this.container_right = this.me.getChildByName('right')),
        (this.container_nomail = this.me.getChildByName('nomail')),
        (this.left_sroll = this.me.getChildByName('left').scriptMap[
          'capsui.CScrollView'
        ]),
        this.left_sroll.init_scrollview(
          Laya.Handler.create(this, this._renderLeft, null, false)
        );
      var n = this.me.getChildByName('right');
      (this.title = n.getChildByName('title')),
        (this.content = n.getChildByName('content')),
        (this.btn_get = n.getChildByName('btn_get')),
        (this.btn_del = n.getChildByName('btn_del')),
        (this.container_item = n.getChildByName('container_item'));
      for (var a = 0; a < this.container_item.numChildren; a++) {
        var r = this.container_item.getChildAt(a);
        this.items.push({
          me: r,
          icon: new t.UI_Item_Skin(
            r.getChildByName('btn').getChildByName('icon')
          )
        }),
          (this.items[a].me.visible = false);
      }
    }
    return (
      Object.defineProperty(e, 'haveRedPoint', {
        get: function() {
          for (var t = 0; t < this.mails.length; t++)
            if (0 == this.mails[t].state) return true;
          return false;
        },
        enumerable: true,
        configurable: true
      }),
      (e.Init = function() {
        var i = this;
        app.NetAgent.sendReq2Lobby('Lobby', 'fetchMailInfo', {}, function(
          e,
          n
        ) {
          if (e || n.error) t.UIMgr.Inst.showNetReqError('fetchMailInfo', e, n);
          else {
            if (((i.mails = []), n.mails))
              for (var a = 0; a < n.mails.length; a++) i.mails.push(n.mails[a]);
            i.mails = i.mails.sort(function(t, e) {
              var i = t.create_time;
              i || (i = 0);
              var n = e.create_time;
              return n || (n = 0), n - i;
            });
          }
        }),
          app.NetAgent.AddListener2Lobby(
            'NotifyNewMail',
            Laya.Handler.create(
              this,
              function(t) {
                i.mails.unshift(t.mail);
              },
              null,
              false
            )
          ),
          app.NetAgent.AddListener2Lobby(
            'NotifyDeleteMail',
            Laya.Handler.create(
              this,
              function(t) {
                for (var n = 0; n < t.mail_id_list.length; n++)
                  if (i.Inst) i.Inst.onDelMail(t.mail_id_list[n]);
                  else {
                    for (var a = -1, r = 0; r < e.mails.length; r++)
                      if (e.mails[r].mail_id == t.mail_id_list[r]) {
                        a = r;
                        break;
                      }
                    for (var s = a; s < e.mails.length - 1; s++)
                      e.mails[s] = e.mails[s + 1];
                    e.mails.pop();
                  }
              },
              null,
              false
            )
          );
      }),
      (e.prototype.show = function() {
        this.left_sroll.reset(),
          (this.right_btn_cd = 0),
          e.mails.length > 0
            ? ((this.select_index = 0),
              this.left_sroll.addItem(e.mails.length),
              this._renderRight(0, true),
              (this.container_left.visible = true),
              (this.container_right.visible = true),
              (this.container_nomail.visible = false))
            : ((this.select_index = 0),
              (this.container_left.visible = false),
              (this.container_right.visible = false),
              (this.container_nomail.visible = true)),
          (this.me.visible = true);
      }),
      (e.prototype.onDelMail = function(i) {
        for (var n = -1, a = 0; a < e.mails.length; a++)
          if (e.mails[a].mail_id == i) {
            n = a;
            break;
          }
        for (var r = n; r < e.mails.length - 1; r++)
          e.mails[r] = e.mails[r + 1];
        if ((e.mails.pop(), t.UI_Activity.Inst.enable)) {
          var s = this.select_index;
          s == e.mails.length && s--,
            this.left_sroll.delItem(n),
            e.mails.length <= 0
              ? ((this.container_left.visible = false),
                (this.container_right.visible = false),
                (this.container_nomail.visible = true))
              : ((this.container_left.visible = true),
                (this.container_right.visible = true),
                (this.container_nomail.visible = false),
                this._renderRight(s, true),
                this.left_sroll.wantToRefreshItem(s));
        }
      }),
      (e.prototype.hide = function() {
        (this.me.visible = false), this.left_sroll.reset();
      }),
      (e.prototype._renderLeft = function(t) {
        var i = this,
          n = t.index,
          a = t.container,
          r = e.mails[n],
          s = a.getChildByName('bg');
        s.skin = game.Tools.localUISrc(
          this.select_index == n
            ? 'myres/lobby/act_choosed.png'
            : 'myres/lobby/act_unchoosen.png'
        );
        var o = a.getChildByName('state');
        (o.skin = game.Tools.localUISrc(
          this.select_index != n && 0 == r.state
            ? 'myres/lobby/read_no.png'
            : 'myres/lobby/read_yes.png'
        )),
          (a.clickHandler = Laya.Handler.create(
            this,
            function() {
              if (i.select_index != n) {
                var t = i.select_index;
                i._renderRight(n, false),
                  (r.state = 1),
                  (s.skin = game.Tools.localUISrc(
                    'myres/lobby/act_choosed.png'
                  )),
                  (o.skin = game.Tools.localUISrc('myres/lobby/read_yes.png')),
                  t >= 0 && i.left_sroll.wantToRefreshItem(t);
              }
            },
            null,
            false
          )),
          (a.getChildByName('title').text = r.title);
      }),
      (e.prototype._renderRight = function(i, n) {
        var a = this;
        if (n || this.select_index != i) {
          var r = e.mails[i];
          (this.select_index = i),
            (this.title.text = r.title),
            (this.content.text = r.content);
          for (var s = false, o = [], l = 0; l < r.attachments.length; l++)
            100099 != r.attachments[l].id &&
              100098 != r.attachments[l].id &&
              o.push(r.attachments[l]);
          if (r.attachments && r.attachments.length > 0) {
            s = !r.take_attachment;
            for (
              var h = function(e) {
                  if (e < o.length) {
                    c.items[e].me.visible = true;
                    var i = o[e],
                      n = i.id,
                      a = i.count;
                    (c.items[e].me.getChildByName(
                      'btn'
                    ).clickHandler = Laya.Handler.create(
                      c,
                      function() {
                        t.UI_ItemDetail.Inst.show(n);
                      },
                      null,
                      false
                    )),
                      c.items[e].icon.setSkin(
                        game.GameUtility.get_item_view(n).icon
                      );
                    var r = c.items[e].me.getChildByName('count');
                    a <= 1
                      ? (r.visible = false)
                      : ((r.visible = true), (r.text = a.toString()));
                    (c.items[e].me.getChildByName('getted').visible = !s),
                      (c.items[e].me.x = 12 + 120 * e),
                      (c.items[e].me.y = c.items[0].me.y);
                  } else c.items[e].me.visible = false;
                },
                c = this,
                l = 0;
              l < this.items.length;
              l++
            )
              h(l);
          } else
            for (l = 0; l < this.items.length; l++)
              this.items[l].me.visible = false;
          (this.btn_get.visible = s),
            (this.btn_del.visible = !s),
            0 == r.state &&
              (this.onReadStateChange(),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'readMail',
                { mail_id: r.mail_id },
                function() {}
              ),
              (r.state = 1),
              this.onReadStateChange()),
            (this.right_btn_cd = 0),
            (this.btn_get.clickHandler = Laya.Handler.create(
              this,
              function() {
                Laya.timer.currTimer < a.right_btn_cd ||
                  ((a.right_btn_cd = Laya.timer.currTimer + 1e3),
                  app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'takeAttachmentFromMail',
                    { mail_id: r.mail_id },
                    function(e, i) {
                      if (((a.right_btn_cd = 0), e || i.error))
                        t.UIMgr.Inst.showNetReqError(
                          'takeAttachmentFromMail',
                          e,
                          i
                        );
                      else {
                        (a.btn_get.visible = !s),
                          (a.btn_del.visible = s),
                          (r.take_attachment = true);
                        for (var n = 0; n < a.items.length; n++)
                          a.items[n].me.visible &&
                            (a.items[n].me.getChildByName(
                              'getted'
                            ).visible = true);
                        game.Tools.showRewards({ rewards: o }, null);
                      }
                    }
                  ));
              },
              null,
              false
            )),
            (this.btn_del.clickHandler = Laya.Handler.create(this, function() {
              Laya.timer.currTimer < a.right_btn_cd ||
                ((a.right_btn_cd = Laya.timer.currTimer + 1e3),
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'deleteMail',
                  { mail_id: r.mail_id },
                  function(e, i) {
                    (a.right_btn_cd = 0),
                      e || i.error
                        ? t.UIMgr.Inst.showNetReqError('deleteMail', e, i)
                        : a.onDelMail(r.mail_id);
                  }
                ));
            }));
        }
      }),
      (e.prototype.onReadStateChange = function() {
        t.UI_Lobby.Inst.top.refreshRedpoint(),
          t.UI_Activity.Inst.refresh_redpoint();
      }),
      (e.Inst = null),
      (e.mails = []),
      e
    );
  })();
  t.UI_Mail = e;
})(uiscript || (uiscript = {}));