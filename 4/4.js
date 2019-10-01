var uiscript;
!(t => {
  var e = (() => {
    class e {
      constructor(i) {
        this.items = [];
        this.select_index = -1;
        this.right_btn_cd = 0;
        e.Inst = this;
        this.me = i;
        this.me.visible = !1;
        this.container_left = this.me.getChildByName('left');
        this.container_right = this.me.getChildByName('right');
        this.container_nomail = this.me.getChildByName('nomail');

        this.left_sroll = this.me.getChildByName('left').scriptMap[
            'capsui.CScrollView'
          ];

        this.left_sroll.init_scrollview(
          Laya.Handler.create(this, this._renderLeft, null, !1)
        );
        var n = this.me.getChildByName('right');
        this.title = n.getChildByName('title');
        this.content = n.getChildByName('content');
        this.btn_get = n.getChildByName('btn_get');
        this.btn_del = n.getChildByName('btn_del');
        this.container_item = n.getChildByName('container_item');
        for (var a = 0; a < this.container_item.numChildren; a++) {
          var r = this.container_item.getChildAt(a);

          this.items.push({
            me: r,
            icon: new t.UI_Item_Skin(
              r.getChildByName('btn').getChildByName('icon')
            )
          });

          this.items[a].me.visible = !1;
        }
      }

      static Init() {
        var i = this;

        app.NetAgent.sendReq2Lobby('Lobby', 'fetchMailInfo', {}, (e, n) => {
          if (e || n.error) t.UIMgr.Inst.showNetReqError('fetchMailInfo', e, n);
          else {
            i.mails = [];
            if ((n.mails))
              for (var a = 0; a < n.mails.length; a++) i.mails.push(n.mails[a]);
            i.mails = i.mails.sort(({create_time}, {create_time}) => {
              var i = create_time;
              i || (i = 0);
              var n = create_time;
              n || (n = 0);
              return n - i;
            });
          }
        });

        app.NetAgent.AddListener2Lobby(
          'NotifyNewMail',
          Laya.Handler.create(
            this,
            ({mail}) => {
              i.mails.unshift(mail);
            },
            null,
            !1
          )
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyDeleteMail',
          Laya.Handler.create(
            this,
            ({mail_id_list}) => {
              for (var n = 0; n < mail_id_list.length; n++)
                if (i.Inst) i.Inst.onDelMail(mail_id_list[n]);
                else {
                  for (var a = -1, r = 0; r < e.mails.length; r++)
                    if (e.mails[r].mail_id == mail_id_list[r]) {
                      a = r;
                      break;
                    }
                  for (var s = a; s < e.mails.length - 1; s++)
                    e.mails[s] = e.mails[s + 1];
                  e.mails.pop();
                }
            },
            null,
            !1
          )
        );
      }

      show() {
        this.left_sroll.reset();
        this.right_btn_cd = 0;
        this.select_index = 0;
        this.left_sroll.addItem(e.mails.length);
        this._renderRight(0, !0);
        this.container_left.visible = !0;
        this.container_right.visible = !0;
        this.select_index = 0;
        this.container_left.visible = !1;
        this.container_right.visible = !1;

        e.mails.length > 0
          ? (this.container_nomail.visible = !1)
          : (this.container_nomail.visible = !0);

        this.me.visible = !0;
      }

      onDelMail(i) {
        for (var n = -1, a = 0; a < e.mails.length; a++)
          if (e.mails[a].mail_id == i) {
            n = a;
            break;
          }
        for (var r = n; r < e.mails.length - 1; r++)
          e.mails[r] = e.mails[r + 1];
        e.mails.pop();
        if ((t.UI_Activity.Inst.enable)) {
          var s = this.select_index;
          s == e.mails.length && s--;
          this.left_sroll.delItem(n);
          this.container_left.visible = !1;
          this.container_right.visible = !1;
          this.container_left.visible = !0;
          this.container_right.visible = !0;
          this.container_nomail.visible = !1;
          this._renderRight(s, !0);
          e.mails.length <= 0
            ? (this.container_nomail.visible = !0)
            : (this.left_sroll.wantToRefreshItem(s));
        }
      }

      hide() {
        this.me.visible = !1;
        this.left_sroll.reset();
      }

      _renderLeft({index, container}) {
        var i = this;
        var n = index;
        var a = container;
        var r = e.mails[n];
        var s = a.getChildByName('bg');
        s.skin = game.Tools.localUISrc(
          this.select_index == n
            ? 'myres/lobby/act_choosed.png'
            : 'myres/lobby/act_unchoosen.png'
        );
        var o = a.getChildByName('state');

        o.skin = game.Tools.localUISrc(
          this.select_index != n && 0 == r.state
            ? 'myres/lobby/read_no.png'
            : 'myres/lobby/read_yes.png'
        );

        a.clickHandler = Laya.Handler.create(
            this,
            () => {
              if (i.select_index != n) {
                var t = i.select_index;
                i._renderRight(n, !1);
                r.state = 1;

                s.skin = game.Tools.localUISrc(
                    'myres/lobby/act_choosed.png'
                  );

                o.skin = game.Tools.localUISrc('myres/lobby/read_yes.png');
                t >= 0 && i.left_sroll.wantToRefreshItem(t);
              }
            },
            null,
            !1
          );

        a.getChildByName('title').text = r.title;
      }

      _renderRight(i, n) {
        var a = this;
        if (n || this.select_index != i) {
          var r = e.mails[i];
          this.select_index = i;
          this.title.text = r.title;
          this.content.text = r.content;
          for (var s = !1, o = [], l = 0; l < r.attachments.length; l++)
            100099 != r.attachments[l].id &&
              100098 != r.attachments[l].id &&
              o.push(r.attachments[l]);
          if (r.attachments && r.attachments.length > 0) {
            s = !r.take_attachment;
            for (
              var h = e => {
                  if (e < o.length) {
                    c.items[e].me.visible = !0;
                    var i = o[e],
                      n = i.id,
                      a = i.count;

                    c.items[e].me.getChildByName(
                      'btn'
                    ).clickHandler = Laya.Handler.create(
                      c,
                      () => {
                        t.UI_ItemDetail.Inst.show(n);
                      },
                      null,
                      !1
                    );

                    c.items[e].icon.setSkin(
                      game.GameUtility.get_item_view(n).icon
                    );
                    var r = c.items[e].me.getChildByName('count');
                    r.visible = !0;
                    a <= 1
                      ? (r.visible = !1)
                      : (r.text = a.toString());
                    c.items[e].me.getChildByName('getted').visible = !s;
                    c.items[e].me.x = 12 + 120 * e;
                    c.items[e].me.y = c.items[0].me.y;
                  } else c.items[e].me.visible = !1;
                },
                c = this,
                l = 0;
              l < this.items.length;
              l++
            )
              h(l);
          } else
            for (l = 0; l < this.items.length; l++)
              this.items[l].me.visible = !1;
          this.btn_get.visible = s;
          this.btn_del.visible = !s;
          this.onReadStateChange();

          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'readMail',
            { mail_id: r.mail_id },
            () => {}
          );

          r.state = 1;

          0 == r.state &&
            (this.onReadStateChange());

          this.right_btn_cd = 0;

          this.btn_get.clickHandler = Laya.Handler.create(
              this,
              () => {
                a.right_btn_cd = Laya.timer.currTimer + 1e3;
                Laya.timer.currTimer < a.right_btn_cd ||
                  (app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'takeAttachmentFromMail',
                  { mail_id: r.mail_id },
                  (e, i) => {
                    a.right_btn_cd = 0;
                    if ((e || i.error))
                      t.UIMgr.Inst.showNetReqError(
                        'takeAttachmentFromMail',
                        e,
                        i
                      );
                    else {
                      a.btn_get.visible = !s;
                      a.btn_del.visible = s;
                      r.take_attachment = !0;
                      for (var n = 0; n < a.items.length; n++)
                        a.items[n].me.visible &&
                          (a.items[n].me.getChildByName(
                            'getted'
                          ).visible = !0);
                      game.Tools.showRewards({ rewards: o }, null);
                    }
                  }
                ));
              },
              null,
              !1
            );

          this.btn_del.clickHandler = Laya.Handler.create(this, () => {
            a.right_btn_cd = Laya.timer.currTimer + 1e3;
            Laya.timer.currTimer < a.right_btn_cd ||
              (app.NetAgent.sendReq2Lobby(
              'Lobby',
              'deleteMail',
              { mail_id: r.mail_id },
              (e, i) => {
                a.right_btn_cd = 0;
                e || i.error
                  ? t.UIMgr.Inst.showNetReqError('deleteMail', e, i)
                  : a.onDelMail(r.mail_id);
              }
            ));
          });
        }
      }

      onReadStateChange() {
        t.UI_Lobby.Inst.top.refreshRedpoint();
        t.UI_Activity.Inst.refresh_redpoint();
      }
    }

    Object.defineProperty(e, 'haveRedPoint', {
      get() {
        for (var t = 0; t < this.mails.length; t++)
          if (0 == this.mails[t].state) return !0;
        return !1;
      },
      enumerable: !0,
      configurable: !0
    });

    e.Inst = null;
    e.mails = [];
    return e;
  })();
  t.UI_Mail = e;
})(uiscript || (uiscript = {}));