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
      function t(t, e, i, n, a) {
        var r = this;
        (this.isopen = !1),
          (this.locking = !1),
          (this.showed = !1),
          (this.when_close = null),
          (this.when_choose = null),
          (this.datas = []),
          (this.start_rate = 0),
          (this.me = t),
          (t.visible = !1),
          (this.isopen = !1),
          (this.locking = !1),
          (this.when_close = e),
          (this.when_choose = i),
          (this.datas = n),
          (this.start_rate = a),
          (this.scrollview = this.me.scriptMap['capsui.CScrollView']),
          this.scrollview.init_scrollview(
            new Laya.Handler(this, this.refresh_item)
          ),
          (this.bg = this.me.getChildByName('bg')),
          (this.content = this.me.getChildByName('content')),
          (t.getChildByName('btn_open').clickHandler = new Laya.Handler(
            this,
            function() {
              r.locking || (r.isopen ? r.close() : r.show());
            }
          ));
      }
      return (
        (t.prototype.reset = function() {
          (this.isopen = !1),
            (this.locking = !1),
            (this.me.visible = !0),
            (this.bg.visible = !1),
            (this.content.visible = !1);
        }),
        (t.prototype.show = function() {
          var t = this;
          (this.locking = !0),
            (this.isopen = !0),
            (this.bg.visible = !0),
            (this.bg.height = 10),
            Laya.Tween.to(this.bg, { height: 385 }, 150, Laya.Ease.linearNone),
            (this.content.visible = !0),
            (this.content.alpha = 0),
            Laya.Tween.to(
              this.content,
              { alpha: 1 },
              150,
              Laya.Ease.linearNone
            ),
            Laya.timer.once(150, this, function() {
              t.locking = !1;
            }),
            this.showed ||
              (this.scrollview.reset(),
              this.scrollview.addItem(this.datas.length),
              (this.showed = !0),
              (this.scrollview.rate = this.start_rate));
        }),
        (t.prototype.refresh_item = function(t) {
          var e = this,
            i = t.index,
            n = t.container;
          (n.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            function() {
              e.locking ||
                (e.close(), e.when_choose && e.when_choose.runWith(e.datas[i]));
            },
            null,
            !1
          )),
            (n.getChildByName('btn').getChildByName('txt').text = this.datas[
              i
            ]);
        }),
        (t.prototype.close = function() {
          var t = this;
          (this.locking = !0),
            Laya.Tween.to(
              this.content,
              { alpha: 0 },
              150,
              Laya.Ease.linearNone
            ),
            Laya.Tween.to(this.bg, { height: 10 }, 150, Laya.Ease.linearNone),
            Laya.timer.once(150, this, function() {
              (t.locking = !1),
                (t.bg.visible = !1),
                (t.content.visible = !1),
                (t.isopen = !1),
                t.when_close && t.when_close.run();
            });
        }),
        t
      );
    })(),
    i = (function() {
      function t(t, i, n) {
        var a = this;
        (this.locking = !1),
          (this.me = t),
          (t.visible = !1),
          (this.me.getChildByName('btn_close').clickHandler = new Laya.Handler(
            this,
            function() {
              a.dropdown_mouth.locking ||
                a.dropdown_year.locking ||
                (a.dropdown_mouth.isopen && a.dropdown_mouth.close(),
                a.dropdown_year.isopen && a.dropdown_year.close());
            }
          ));
        this.dropdown_mouth = new e(
          this.me.getChildByName('container_month'),
          new Laya.Handler(this, function() {
            a._OnStateChange(), i.runWith('');
          }),
          new Laya.Handler(this, function(t) {
            return i.runWith(t);
          }),
          [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12'
          ],
          0
        );
        for (var r = new Date(Date.now()), s = [], o = 0; o < 120; o++)
          s.push((r.getFullYear() + o - 30).toString());
        this.dropdown_year = new e(
          this.me.getChildByName('container_year'),
          new Laya.Handler(this, function() {
            a._OnStateChange(), n.runWith('');
          }),
          new Laya.Handler(this, function(t) {
            return n.runWith(t);
          }),
          s,
          0.262
        );
      }
      return (
        (t.prototype.show = function(t) {
          this.dropdown_mouth.reset(),
            this.dropdown_year.reset(),
            (this.me.visible = !0),
            t ? this.dropdown_mouth.show() : this.dropdown_year.show();
        }),
        (t.prototype._OnStateChange = function() {
          this.dropdown_year.isopen ||
            this.dropdown_mouth.isopen ||
            (this.me.visible = !1);
        }),
        t
      );
    })(),
    n = (function() {
      function e(t) {
        var e = this;
        (this.locking = !1),
          (this.me = t),
          (t.visible = !1),
          (this.root = this.me.getChildByName('root')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, function() {
            e.locking || e.close();
          })),
          (this.root.getChildByName('confirm').clickHandler = new Laya.Handler(
            this,
            function() {
              e.locking || e.close();
            }
          ));
      }
      return (
        (e.prototype.show = function() {
          var e = this;
          (this.locking = !0),
            (this.me.visible = !0),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e.locking = !1;
              })
            );
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.me.visible = !1);
              })
            );
        }),
        e
      );
    })(),
    a = (function(e) {
      function a() {
        var t = e.call(this, new ui.lobby.payment.creditcardUI()) || this;
        return (
          (t.color_wrong = '#FF3030'),
          (t.color_hint = '#5A82C8'),
          (t.locking = !1),
          (t.current_goodsID = 0),
          (a.Inst = t),
          t
        );
      }
      return (
        __extends(a, e),
        (a.prototype.onCreate = function() {
          var t = this;
          this.root_adyen = this.me.getChildByName('root_adyen');
          var e = this.root_adyen.getChildByName('card');
          (this.input_cardno = e
            .getChildByName('input')
            .getChildByName('txtinput')),
            (this.cardno_wrong = e
              .getChildByName('input')
              .getChildByName('wrong')),
            (this.cardno_ac = e.getChildByName('input').getChildByName('ac')),
            (this.notice_cardno = e.getChildByName('notice')),
            (this.card_imgs = e.getChildByName('card_img')),
            this.input_cardno.on('blur', this, function() {
              t.pending_cardno();
            }),
            this.input_cardno.on('input', this, function() {
              t.cardno_wrong.visible && (t.cardno_wrong.visible = !1),
                t.code_ac.visible && (t.code_ac.visible = !1);
            });
          var a = this.root_adyen.getChildByName('date');
          (this.btn_month = a.getChildByName('month')),
            (this.btn_month.clickHandler = new Laya.Handler(this, function() {
              t.locking || t.date_dropdown.show(!0);
            })),
            (this.txt_month = this.btn_month.getChildByName('txt')),
            (this.notice_month = a.getChildByName('notice_month')),
            (this.btn_year = a.getChildByName('year')),
            (this.btn_year.clickHandler = new Laya.Handler(this, function() {
              t.locking || t.date_dropdown.show(!1);
            })),
            (this.txt_year = this.btn_year.getChildByName('txt')),
            (this.notice_year = a.getChildByName('notice_year'));
          var r = this.root_adyen.getChildByName('code');
          (this.input_code = r
            .getChildByName('input')
            .getChildByName('txtinput')),
            (this.code_wrong = r
              .getChildByName('input')
              .getChildByName('wrong')),
            (this.code_ac = r.getChildByName('input').getChildByName('ac')),
            (this.notice_code = r.getChildByName('notice')),
            this.input_code.on('blur', this, function() {
              t.pending_code();
            }),
            this.input_code.on('input', this, function() {
              t.code_wrong.visible && (t.code_wrong.visible = !1),
                t.code_ac.visible && (t.code_ac.visible = !1);
            }),
            (r.getChildByName('btn_what').clickHandler = new Laya.Handler(
              this,
              function() {
                t.locking || t.contianer_cardnumber_hint.show();
              }
            )),
            (this.root_adyen.getChildByName(
              'paybutton'
            ).clickHandler = new Laya.Handler(this, function() {
              t.locking || t.onClickConfirm();
            })),
            (this.root_adyen.getChildByName(
              'btn_close'
            ).clickHandler = new Laya.Handler(this, function() {
              t.locking || t.close();
            })),
            (this.contianer_cardnumber_hint = new n(
              this.me.getChildByName('container_cardnumber')
            )),
            (this.date_dropdown = new i(
              this.me.getChildByName('container_dropdown'),
              new Laya.Handler(this, function(e) {
                '' != e && (t.txt_month.text = e), t.pending_month();
              }),
              new Laya.Handler(this, function(e) {
                '' != e && (t.txt_year.text = e), t.pending_year();
              })
            ));
        }),
        (a.prototype.show = function(e) {
          var i = this;
          (this.enable = !0),
            (this.locking = !0),
            (this.current_goodsID = e),
            (this.date_dropdown.me.visible = !1),
            (this.contianer_cardnumber_hint.me.visible = !1),
            t.UIBase.anim_pop_out(
              this.root_adyen,
              Laya.Handler.create(this, function() {
                i.locking = !1;
              })
            ),
            (this.txt_month.text = game.Tools.strOfLocalization(2729)),
            (this.txt_year.text = game.Tools.strOfLocalization(2730)),
            (this.input_cardno.text = ''),
            (this.input_code.text = ''),
            (this.notice_cardno.text = game.Tools.strOfLocalization(2726)),
            (this.notice_cardno.color = this.color_hint),
            (this.notice_month.text = game.Tools.strOfLocalization(2731)),
            (this.notice_month.color = this.color_hint),
            (this.notice_year.text = game.Tools.strOfLocalization(2732)),
            (this.notice_year.color = this.color_hint),
            (this.notice_code.text = game.Tools.strOfLocalization(2736)),
            (this.notice_code.color = this.color_hint),
            (this.cardno_wrong.visible = !1),
            (this.card_imgs.visible = !1),
            (this.cardno_ac.visible = !1),
            (this.code_wrong.visible = !1),
            (this.code_ac.visible = !1);
        }),
        (a.prototype.pending_Luhn = function(t) {
          for (var e = 0, i = '0'.charCodeAt(0), n = 0; n < t.length; n += 2)
            e += t.charCodeAt(t.length - n - 1) - i;
          for (n = 1; n < t.length; n += 2) {
            var a = 2 * (t.charCodeAt(t.length - n - 1) - i);
            e += a <= 9 ? a : a - 9;
          }
          return e % 10 == 0;
        }),
        (a.prototype.isValidCreditCard = function(t) {
          var e = this.pending_Luhn(t),
            i = parseInt(t.substr(0, 2)),
            n = (parseInt(t.substr(0, 3)), parseInt(t.substr(0, 4))),
            a = (parseInt(t.substr(0, 5)), parseInt(t.substr(0, 6)));
          if (15 == t.length && (34 == i || 37 == i) && e) return 'amex';
          if (16 == t.length && n >= 3528 && n <= 3589 && e) return 'jcb';
          if (16 == t.length) {
            if (a >= 51e4 && a <= 559999 && e) return 'mastercard';
            if (n >= 2221 && n <= 2720 && e) return 'mastercard';
          }
          if (14 == t.length) {
            if (a >= 3e5 && a <= 303574 && e) return 'diner';
            if (3095 == n) return 'diner';
            if (36 == i) return 'diner';
            if (i >= 38 && i <= 39) return 'diner';
          }
          return '4' != t.charAt(0) || (13 != t.length && 16 != t.length) || !e
            ? ''
            : 'visa';
        }),
        (a.prototype.pending_cardno = function() {
          if (
            this.input_cardno.text.length >= 13 &&
            this.input_cardno.text.length <= 19
          ) {
            var t = this.isValidCreditCard(this.input_cardno.text);
            if ('' != t) {
              (this.cardno_wrong.visible = !1),
                (this.notice_cardno.text = ''),
                (this.cardno_ac.visible = !0),
                (this.card_imgs.visible = !0);
              for (var e = 0; e < this.card_imgs.numChildren; e++) {
                var i = this.card_imgs.getChildAt(e);
                i.visible = i.name == t;
              }
              return !0;
            }
            return (
              (this.cardno_wrong.visible = !0),
              (this.cardno_ac.visible = !1),
              (this.notice_cardno.text = ''),
              (this.notice_cardno.color = this.color_wrong),
              (this.card_imgs.visible = !1),
              !1
            );
          }
          return (
            (this.cardno_wrong.visible = !0),
            (this.cardno_ac.visible = !1),
            (this.notice_cardno.text = game.Tools.strOfLocalization(2727)),
            (this.notice_cardno.color = this.color_wrong),
            (this.card_imgs.visible = !1),
            !1
          );
        }),
        (a.prototype.pending_month = function() {
          return this.txt_month.text != game.Tools.strOfLocalization(2729)
            ? ((this.notice_month.text = ''), !0)
            : ((this.notice_month.text = game.Tools.strOfLocalization(2733)),
              (this.notice_month.color = this.color_wrong),
              !1);
        }),
        (a.prototype.pending_year = function() {
          return this.txt_year.text != game.Tools.strOfLocalization(2730)
            ? ((this.notice_year.text = ''), !0)
            : ((this.notice_year.text = game.Tools.strOfLocalization(2734)),
              (this.notice_year.color = this.color_wrong),
              !1);
        }),
        (a.prototype.pending_code = function() {
          return this.input_code.text.length >= 3 &&
            this.input_code.text.length <= 4
            ? ((this.notice_code.text = ''),
              (this.code_wrong.visible = !1),
              (this.code_ac.visible = !0),
              !0)
            : ((this.code_wrong.visible = !0),
              (this.code_ac.visible = !1),
              (this.notice_code.text = game.Tools.strOfLocalization(2737)),
              (this.notice_code.color = this.color_wrong),
              !1);
        }),
        (a.prototype.onClickConfirm = function() {
          var e = !0;
          if (
            (this.pending_cardno() || (e = !1),
            this.pending_month() || (e = !1),
            this.pending_year() || (e = !1),
            this.pending_code() || (e = !1),
            e)
          ) {
            this.close(), (t.UI_Payment_Loading.Inst.enable = !0);
            var i = this.input_cardno.text,
              n = this.current_goodsID;
            window.Multipayment.init(GameMgr.config_data.jp_shop_id),
              Multipayment.getToken(
                {
                  cardno: this.input_cardno.text,
                  expire: this.txt_year.text + this.txt_month.text,
                  securitycode: this.input_code.text
                },
                function(e) {
                  if ('000' != e.resultCode)
                    !(function(e) {
                      t.UIMgr.Inst.ShowErrorInfo(
                        game.Tools.strOfLocalization(e)
                      ),
                        (t.UI_Payment_Loading.Inst.enable = !1);
                    })(2742);
                  else {
                    var a = e.tokenObject;
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'createJPCreditCardOrder',
                      {
                        goods_id: n,
                        client_type: 0,
                        account_id: GameMgr.Inst.account_id,
                        return_url: t.UI_Recharge.open_new_window()
                          ? 'Yo://CloseWindow'
                          : GameMgr.Inst.link_url,
                        access_token: GameMgr.Inst.yostar_accessToken
                      },
                      function(e, n) {
                        if (e || n.error)
                          if (e)
                            t.UIMgr.Inst.showNetReqError(
                              'createJPCreditCardOrder',
                              e,
                              n
                            ),
                              (t.UI_Payment_Loading.Inst.enable = !1);
                          else if (1991 == n.error.code)
                            t.UI_Agepending.Inst.show(),
                              (t.UI_Payment_Loading.Inst.enable = !1);
                          else if (1992 == n.error.code) {
                            var r = JSON.parse(n.error.json_param);
                            t.UI_Agexiane.Inst.show(r.recharged, r.age),
                              (t.UI_Payment_Loading.Inst.enable = !1);
                          } else
                            t.UIMgr.Inst.showNetReqError(
                              'createJPCreditCardOrder',
                              e,
                              n
                            ),
                              (t.UI_Payment_Loading.Inst.enable = !1);
                        else {
                          var s = {};
                          (s.type = 'CreditCard'),
                            (s.lang = 'ja'),
                            (s.accessToken = GameMgr.Inst.yostar_accessToken),
                            (s.token = a.token),
                            (s.orderId = n.order_id),
                            (s.cardNo = i),
                            (s.openNewWindow = t.UI_Recharge.open_new_window()),
                            Yo.execOrder(s),
                            (t.UI_Payment_Loading.Inst.enable = !1);
                        }
                      }
                    );
                  }
                }
              );
          }
        }),
        (a.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.root_adyen,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.enable = !1);
              })
            );
        }),
        a
      );
    })(t.UIBase);
  t.UI_Payment_Creditcard = a;
})(uiscript || (uiscript = {}));