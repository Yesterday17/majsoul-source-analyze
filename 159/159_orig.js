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
      function t(e) {
        (this.me = e),
          (t.scene_entrance =
            'jp' == GameMgr.client_language
              ? 'scene/entrance_jp.ls'
              : 'en' == GameMgr.client_language
              ? 'scene/entrance_en.ls'
              : 'scene/entrance.ls');
      }
      return (
        (t.prototype.show = function() {
          (this.scene = Laya.loader.getRes(t.scene_entrance)),
            this.me.addChild(this.scene),
            (this.scene.visible = !0);
        }),
        (t.prototype.close = function() {
          Laya.timer.clearAll(this),
            (this.scene.visible = !1),
            this.scene.destroy(!0);
        }),
        (t.scene_entrance = ''),
        t
      );
    })(),
    i = (function() {
      function t(t) {
        (this.me = t),
          (this.round = this.me.getChildByName('round')),
          (this.word = this.me.getChildByName('word')),
          (this.icon = this.me.getChildByName('icon')),
          (this.me.visible = !1);
      }
      return (
        (t.prototype.show = function(t) {
          var e = this;
          if (!this.me.visible) {
            this.me.visible = !0;
            var i = Laya.timer.currTimer;
            if (
              (Laya.timer.frameLoop(1, this, function() {
                e.round.rotation = ((Laya.timer.currTimer - i) / 2e3) * 360;
              }),
              (this.word.text = game.Tools.strOfLocalization(2053)),
              0 == t)
            )
              (this.icon.visible = !1), (this.word.y = 150);
            else
              switch (((this.icon.visible = !0), (this.word.y = 195), t)) {
                case 1:
                case 4:
                  this.icon.skin = game.Tools.localUISrc(
                    'myres/entrance/weixin.png'
                  );
                  break;
                case 2:
                case 5:
                  this.icon.skin = game.Tools.localUISrc(
                    'myres/entrance/weibo.png'
                  );
                  break;
                case 3:
                case 6:
                  this.icon.skin = game.Tools.localUISrc(
                    'myres/entrance/QQ.png'
                  );
                  break;
                case 7:
                  this.icon.skin = game.Tools.localUISrc(
                    'myres/entrance/yostar.png'
                  );
                  break;
                case 8:
                  this.icon.skin = game.Tools.localUISrc(
                    'myres/entrance/google.png'
                  );
                  break;
                case 9:
                  this.icon.skin = game.Tools.localUISrc(
                    'myres/entrance/facebook.png'
                  );
                  break;
                case 10:
                  this.icon.skin = game.Tools.localUISrc(
                    'myres/entrance/tiwtter.png'
                  );
                  break;
                default:
                  this.icon.visible = !1;
              }
          }
        }),
        (t.prototype.close = function() {
          Laya.timer.clearAll(this), (this.me.visible = !1);
        }),
        t
      );
    })(),
    n = (function() {
      function e(e) {
        var i = this;
        (this.saveflag = !0),
          (this.locking = !1),
          (this.last_mail_time = -1),
          (this.me = e),
          (this.me.visible = !1),
          (this.root = this.me.getChildByName('jpenroot')),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              i.locking || i.close();
            },
            null,
            !1
          )),
          (this.input_account = this.root
            .getChildByName('container_mail')
            .getChildByName('txtinput')),
          (this.label_account_no = this.root
            .getChildByName('container_mail')
            .getChildByName('no')),
          this.input_account.on('input', this, function() {
            i.label_account_no.visible && (i.label_account_no.visible = !1),
              '' != i.input_code.text &&
                '' != i.input_account.text &&
                game.Tools.setGrayDisable(i.btn_regist, !1);
          }),
          (this.input_code = this.root
            .getChildByName('container_yanzhengma')
            .getChildByName('txtinput')),
          this.input_code.on('input', this, function() {
            '' != i.input_code.text &&
              '' != i.input_account.text &&
              game.Tools.setGrayDisable(i.btn_regist, !1);
          }),
          (this.btn_getcode = this.root
            .getChildByName('sendbutton')
            .getChildByName('btn')),
          (this.btn_getcode.clickHandler = new Laya.Handler(this, function() {
            var t = i.input_account.text;
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
              t
            )
              ? (Yo.request({
                  account: t,
                  lang: 'jp' == GameMgr.client_language ? 'ja' : 'en'
                }).then(function(t) {
                  t
                    ? 0 === t.result
                      ? a.Inst.showInfo(game.Tools.strOfLocalization(2688))
                      : 50003 === t.result
                      ? a.Inst.showError(game.Tools.strOfLocalization(2684))
                      : 50004 === t.result
                      ? a.Inst.showError(game.Tools.strOfLocalization(2685))
                      : a.Inst.showError(game.Tools.strOfLocalization(2683))
                    : a.Inst.showError(game.Tools.strOfLocalization(2683));
                }),
                (i.last_mail_time = Laya.timer.currTimer),
                i.refresh_code_state())
              : (i.label_account_no.visible = !0);
          })),
          (this.btn_regist = this.root.getChildByName('btn_enter')),
          (this.btn_regist.clickHandler = new Laya.Handler(this, function() {
            if (!i.locking) {
              app.Log.log('btn mail login');
              var t = a.Inst.login_index,
                e = i.input_account.text;
              Yo.submit({
                account: i.input_account.text,
                code: i.input_code.text
              }).then(function(i) {
                t == a.Inst.login_index &&
                  (i
                    ? (app.Log.log('mail login submit result:' + i.result),
                      0 === i.result
                        ? (game.LocalStorage.setItem('mail_account', e),
                          a.onSocioBack(7, i.token, i.uid))
                        : 50016 === i.result
                        ? (a.Inst.showError(game.Tools.strOfLocalization(2686)),
                          a.Inst.showContainerLogin())
                        : 50009 === i.result
                        ? (a.Inst.showError(game.Tools.strOfLocalization(2687)),
                          a.Inst.showContainerLogin())
                        : (a.Inst.showError(game.Tools.strOfLocalization(2689)),
                          a.Inst.showContainerLogin()))
                    : (app.Log.log('mail login submit result: no'),
                      a.Inst.showError(game.Tools.strOfLocalization(2689)),
                      a.Inst.showContainerLogin()));
              }),
                1 == i.saveflag
                  ? (game.LocalStorage.setItem(
                      'useremail',
                      i.input_account.text
                    ),
                    game.LocalStorage.setItem('saveflag', 'true'))
                  : (game.LocalStorage.setItem('useremail', ''),
                    game.LocalStorage.setItem('saveflag', 'false')),
                i.close(),
                a.Inst.showLoginLoading(7);
            }
          })),
          (this.label_info = this.root
            .getChildByName('sendbutton')
            .getChildByName('label'));
        var n = this.root.getChildByName('checkxieyi');
        (this.checkbox = n.getChildByName('checkbox')),
          (n.getChildByName('btn_check').clickHandler = new Laya.Handler(
            this,
            function() {
              (i.checkbox.visible = !i.checkbox.visible),
                (i.btn_regist.visible = i.checkbox.visible);
            }
          ));
        var r;
        'jp' == GameMgr.client_language
          ? ((n.getChildByName('en').visible = !1),
            (r = n.getChildByName('jp')))
          : ((n.getChildByName('jp').visible = !1),
            (r = n.getChildByName('en'))),
          (n.getChildByName('btn_check').clickHandler = new Laya.Handler(
            this,
            function() {
              (i.checkbox.visible = !i.checkbox.visible),
                (i.btn_regist.visible = i.checkbox.visible);
            }
          )),
          (r.getChildByName('guize').clickHandler = Laya.Handler.create(
            this,
            function() {
              'jp' == GameMgr.client_language
                ? t.UI_User_Xieyi_enjp.Inst.show('docs/jp_liyongguiyue.txt')
                : 'en' == GameMgr.client_language &&
                  t.UI_User_Xieyi_enjp.Inst.show('docs/term_of_service.txt');
            },
            null,
            !1
          )),
          (r.getChildByName('yinsi').clickHandler = Laya.Handler.create(
            this,
            function() {
              'jp' == GameMgr.client_language
                ? t.UI_User_Xieyi_enjp.Inst.show('docs/jp_yinsixieyi.txt')
                : 'en' == GameMgr.client_language &&
                  t.UI_User_Xieyi_enjp.Inst.show('docs/privacy_policy.txt');
            },
            null,
            !1
          ));
      }
      return (
        (e.prototype.onchangecheck = function(t) {
          (this.checkbox.visible = t),
            (this.btn_regist.visible = t),
            (this.root.getChildByName('checkxieyi').visible = t);
        }),
        (e.prototype.show = function() {
          var e = this;
          (this.locking = !0),
            (this.me.visible = !0),
            t.UIBase.anim_pop_out(
              this.root,
              Laya.Handler.create(this, function() {
                e.locking = !1;
              })
            ),
            (this.input_account.text = ''),
            (this.label_account_no.visible = !1),
            (this.input_code.text = ''),
            (this.checkbox.visible = !0),
            (this.btn_regist.visible = !0);
          var i = game.LocalStorage.getItem('saveflag'),
            n = game.LocalStorage.getItem('useremail');
          'true' == i && ((this.input_account.text = n), app.Log.log(n)),
            game.Tools.setGrayDisable(this.btn_regist, !0),
            Laya.timer.clearAll(this),
            this.refresh_code_state(),
            Laya.timer.loop(100, this, function() {
              e.refresh_code_state();
            });
        }),
        (e.prototype.refresh_code_state = function() {
          var t = 1e8;
          game.Tools.setGrayDisable(this.btn_getcode, !0),
            this.last_mail_time > 0 &&
              (t = Laya.timer.currTimer - this.last_mail_time),
            t < 6e4
              ? ((this.label_info.underline = !1),
                (t = Math.ceil((6e4 - t) / 1e3)),
                (this.label_info.text = game.Tools.strOfLocalization(2682, [
                  t.toString()
                ])),
                (this.label_info.underline = !1),
                game.Tools.setGrayDisable(this.btn_getcode, !0))
              : ((this.label_info.text = game.Tools.strOfLocalization(2720)),
                (this.label_info.underline = !0),
                game.Tools.setGrayDisable(this.btn_getcode, !1));
        }),
        (e.prototype.close = function() {
          var e = this;
          (this.locking = !0),
            t.UIBase.anim_pop_hide(
              this.root,
              Laya.Handler.create(this, function() {
                (e.locking = !1), (e.me.visible = !1), Laya.timer.clearAll(e);
              })
            );
        }),
        e
      );
    })(),
    a = (function(a) {
      function r() {
        var t = a.call(this, new ui.entrance.entranceUI()) || this;
        return (
          (t.scene = null),
          (t.login_type_tabs = []),
          (t.txt_account = null),
          (t.txt_password = null),
          (t.btn_login_cd = 0),
          (t.login_loading = null),
          (t.btn_add2desktop = null),
          (t.btn_cancel_login = null),
          (t.page_maillogin = null),
          (t.container_extendInfo = null),
          (t.server_index = 0),
          (t.xieyiflag = 0),
          (t.login_index = 0),
          (t.login_type_tab_index = -1),
          (t.login_account_input_info = {}),
          (r.Inst = t),
          t
        );
      }
      return (
        __extends(r, a),
        (r.trySocio = function(t) {
          var e = Laya.LocalStorage.getItem('_pre_sociotype'),
            i = -1;
          e && '' != e && (i = parseInt(e));
          var n = !0;
          if (i === t)
            if (t >= 1 && t <= 6) {
              var a = Laya.LocalStorage.getItem('_pre_code');
              a && '' != a && ((n = !1), this.onSocioBack(t, a, null));
            } else if (7 == t);
            else if (t >= 8 && t <= 10) {
              var r = game.LocalStorage.getItem('yostar_token');
              r || (r = '');
              var s = game.LocalStorage.getItem('yostar_uid');
              s || (s = ''),
                '' != r && '' != s && ((n = !1), this.onSocioBack(t, r, s));
            }
          if (n)
            if (GameMgr.inConch) {
              var o = Laya.PlatformClass.createClass('layaair.majsoul.mjmgr');
              1 == t
                ? o.call('wxLogin')
                : 2 == t
                ? o.call('weiboLogin')
                : 3 == t && o.call('qqLogin');
            } else if (GameMgr.iniOSWebview) {
              var l = '';
              switch (t) {
                case 1:
                  l = 'wxLogin';
                  break;
                case 2:
                  l = 'wbLogin';
                  break;
                case 3:
                  l = 'qqLogin';
              }
              if (l) {
                var h = this;
                Laya.Browser.window.wkbridge.callNative(l, '', function(e) {
                  h.onSocioBack(t + 3, e, null);
                });
              }
            } else {
              var c = window.location.href;
              if ((-1 != c.indexOf('?') && (c = c.split('?')[0]), 1 == t)) {
                u = 'https://open.weixin.qq.com/connect/qrconnect?';
                (u += 'appid=wx2a0c2449cab74448'),
                  (u += '&response_type=code'),
                  (u +=
                    '&redirect_uri=' +
                    encodeURI('https://www.majsoul.com/0?xdsfdl=1-' + c)),
                  (u += '&scope=snsapi_login'),
                  (Laya.Browser.window.location.href = u);
              } else if (2 == t) {
                u = 'https://api.weibo.com/oauth2/authorize?';
                (u += 'client_id=399644784'),
                  (u +=
                    '&redirect_uri=https://www.majsoul.com/0?xdsfdl=2-' + c),
                  (Laya.Browser.window.location.href = u);
              } else if (3 == t) {
                var u = 'https://graph.qq.com/oauth2.0/authorize?';
                (u += 'response_type=code'),
                  (u += '&client_id=101480027'),
                  (u +=
                    '&redirect_uri=' + encodeURI('https://www.majsoul.com/0')),
                  GameMgr.Inst.link_url.indexOf('majsoul.com/1') >= 0
                    ? (u += '&state=xdsfdl4')
                    : (u += '&state=xdsfdl3'),
                  (Laya.Browser.window.location.href = u);
              } else if (7 == t) this.Inst && this.Inst.showMailLogin();
              else if (8 == t) {
                _ = GameMgr.Inst.link_url + 'redirect/';
                GameMgr.inRelease
                  ? (_ += GameMgr.client_language)
                  : (_ += 'tt'),
                  (_ += '/yo_google.html'),
                  'jp' == GameMgr.client_language
                    ? Yo.googleJaAuth({ redirect_uri: _, openNewWindow: !1 })
                    : Yo.googleAuth({ redirect_uri: _, openNewWindow: !1 });
              } else if (9 == t) {
                _ = GameMgr.Inst.link_url + 'redirect/';
                GameMgr.inRelease
                  ? (_ += GameMgr.client_language)
                  : (_ += 'tt'),
                  (_ += '/yo_facebook.html'),
                  Yo.facebookAuth({ redirect_uri: _, openNewWindow: !1 });
              } else if (10 == t) {
                var _ = GameMgr.Inst.link_url + 'redirect/';
                GameMgr.inRelease
                  ? (_ += GameMgr.client_language)
                  : (_ += 'tt'),
                  (_ += '/yo_tiwtter.html'),
                  'jp' == GameMgr.client_language
                    ? Yo.twitterJaAuth({ redirect_uri: _, openNewWindow: !1 })
                    : Yo.twitterAuth({ redirect_uri: _, openNewWindow: !1 });
              }
            }
        }),
        (r.onSocioBack = function(t, e, i) {
          app.Log.log('!!!!!!!!!!!!!!! ' + t + ' ' + e),
            this.Inst && this.Inst._onSocioBack(t, e, i);
        }),
        Object.defineProperty(r.prototype, 'server_region_name', {
          get: function() {
            switch (this.server_index) {
              case 0:
                return 'mainland';
              case 1:
                return 'hk';
              default:
                return '';
            }
          },
          enumerable: !0,
          configurable: !0
        }),
        (r.prototype.onCreate = function() {
          var a = this,
            s = this.me.getChildByName('root');
          this.container_login = this.me
            .getChildByName('root')
            .getChildByName('container_login');
          var o = function(t) {
              var e = {
                container: t,
                input: t.getChildByName('txtinput'),
                lb: t.getChildByName('lb')
              };
              return (
                (e.input.text = ''),
                (e.lb.visible = !0),
                e.input.on('focus', a, function() {
                  e.lb.visible = !1;
                }),
                e.input.on('blur', a, function() {
                  e.lb.visible = !e.input.text || '' == e.input.text;
                }),
                e.input.on('input', a, function() {}),
                e
              );
            },
            l = this.container_login.getChildByName('chs');
          (this.label_server = l.getChildByName('lb').getChildByName('word')),
            (l
              .getChildByName('lb')
              .getChildByName('btn').clickHandler = new Laya.Handler(
              this,
              function() {
                t.UI_Entrance_Choose_Route.Inst.show();
              }
            )),
            'chs' != GameMgr.client_language &&
              ((l.getChildByName('lb').visible = !1),
              (l.getChildByName('img_lb').visible = !1)),
            (this.txt_account = o(l.getChildByName('container_account'))),
            (this.txt_password = o(l.getChildByName('container_mima'))),
            this.txt_account.input.on(
              laya.events.Event.KEY_DOWN,
              this.txt_account.input,
              function(t) {
                t.keyCode === Laya.Keyboard.ENTER && a._btn_login();
              }
            ),
            this.txt_password.input.on(
              laya.events.Event.KEY_DOWN,
              this.txt_account.input,
              function(t) {
                t.keyCode === Laya.Keyboard.ENTER && a._btn_login();
              }
            ),
            (this.login_type_tabs = []);
          for (
            var h = function(t) {
                var e = l
                  .getChildByName('container_tabs')
                  .getChildByName('tab' + t);
                c.login_type_tabs.push({
                  btn: e,
                  word: e.getChildByName('word'),
                  choosen: e.getChildByName('chosen')
                }),
                  (c.login_type_tabs[t].btn.clickHandler = new Laya.Handler(
                    c,
                    function() {
                      a.login_type_tab_index != t && a.change_chs_login_tab(t);
                    }
                  ));
              },
              c = this,
              u = 0;
            u < 2;
            u++
          )
            h(u);
          (this.container_extendInfo = s.getChildByName('extendinfo')),
            (this.container_extendInfo.visible = !1),
            (l.getChildByName('btn_regist').clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_Entrance_Mail_Regist.Inst.show();
              },
              null,
              !1
            )),
            (l.getChildByName(
              'btn_forgetpassword'
            ).clickHandler = Laya.Handler.create(
              this,
              function() {
                t.UI_Entrance_Reset_Password.Inst.show();
              },
              null,
              !1
            )),
            (this.btn_add2desktop = this.me
              .getChildByName('root')
              .getChildByName('btn_add2desktop')),
            (this.btn_add2desktop.visible =
              (Laya.Browser.onAndriod ||
                Laya.Browser.onAndroid ||
                Laya.Browser.onIOS) &&
              !GameMgr.inConch &&
              !GameMgr.inConch),
            (this.btn_add2desktop.clickHandler = new Laya.Handler(
              this,
              function() {
                t.UI_Add2Desktop.Inst && t.UI_Add2Desktop.Inst.show();
              }
            )),
            (l.getChildByName('btn_enter').clickHandler = Laya.Handler.create(
              this,
              this._btn_login,
              null,
              !1
            )),
            (this.login_loading = new i(s.getChildByName('loading_login'))),
            (this.page_maillogin = new n(this.me.getChildByName('mail_login'))),
            (this.scene = new e(this.me.getChildByName('scene'))),
            (this.container_social = this.container_login.getChildByName(
              'social'
            )),
            (this.social_btns = []);
          for (u = 0; u < 4; u++)
            this.social_btns.push(
              this.container_social.getChildByName('btn' + u)
            ),
              (this.social_btns[u].visible = !1);
          var _ = [];
          'chs' == GameMgr.client_language &&
            (_ = [
              { img: 'myres/entrance/weibo.png', type: 2 },
              { img: 'myres/entrance/QQ.png', type: 3 },
              { img: 'myres/entrance/weixin.png', type: 1 }
            ]),
            'jp' == GameMgr.client_language &&
              (_ = [
                { img: 'myres/entrance/google.png', type: 8 },
                { img: 'myres/entrance/tiwtter.png', type: 10 }
              ]),
            'en' == GameMgr.client_language &&
              (_ = [
                { img: 'myres/entrance/google.png', type: 8 },
                { img: 'myres/entrance/facebook.png', type: 9 },
                { img: 'myres/entrance/tiwtter.png', type: 10 }
              ]);
          for (
            var d = function(t) {
                var e = f.social_btns[t];
                t < _.length
                  ? ((e.visible = !0),
                    (e.getChildAt(0).skin = game.Tools.localUISrc(_[t].img)),
                    (e.clickHandler = new Laya.Handler(f, function() {
                      r.trySocio(_[t].type);
                    })),
                    (e.x = (340 * t) / (_.length - 1) + 55))
                  : (e.visible = !1);
              },
              f = this,
              u = 0;
            u < this.social_btns.length;
            u++
          )
            d(u);
          2 == _.length &&
            ((this.social_btns[0].x = 340 / 3 + 55),
            (this.social_btns[1].x = 680 / 3 + 55)),
            (this.me
              .getChildByName('infos')
              .getChildByName('btn').clickHandler = Laya.Handler.create(
              this,
              function() {
                GameMgr.inConch ||
                  game.Tools.open_new_window(
                    'http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/2c1d78cce7104e28b8898e2c0fc3d803'
                  );
              },
              null,
              !1
            )),
            (this.me.getChildByName('infos').visible = !1),
            (this.me.getChildByName('copyright').visible =
              'chs' == GameMgr.client_language && GameMgr.inConch),
            (this.me
              .getChildByName('root')
              .getChildByName('loading_login')
              .getChildByName('btn_cancel').clickHandler = Laya.Handler.create(
              this,
              function() {
                a.login_loading.me.visible &&
                  (game.LobbyNetMgr.Inst.Close(),
                  Laya.LocalStorage.setItem('_pre_sociotype', ''),
                  a.showContainerLogin(),
                  (a.btn_login_cd = Laya.timer.currTimer + 500));
              },
              null,
              !1
            ));
        }),
        (r.prototype.ModelJpEn = function() {
          var t = this.container_login.getChildByName('jpen'),
            e = t.getChildByName('btn_enter');
          e.clickHandler = Laya.Handler.create(
            this,
            function() {
              !(function(t) {
                1 == t && r.trySocio(7);
              })(!0);
            },
            null,
            !1
          );
          var i = t.getChildByName('checksave'),
            n = i.getChildByName('checkbox');
          i.getChildByName('btn_check').clickHandler = new Laya.Handler(
            this,
            function() {
              n.visible = !n.visible;
            }
          );
        }),
        (r.prototype.show = function() {
          var t = this;
          'chs' != GameMgr.client_language && GameMgr.inRelease
            ? ((this.container_login.getChildByName('chs').visible = !1),
              (this.container_login.getChildByName('jpen').visible = !0),
              this.ModelJpEn())
            : ((this.container_social.x = 40), (this.container_social.y = 475)),
            -1 != GameMgr.Inst.beinvited_roomid
              ? ((this.container_extendInfo.visible = !0),
                (this.container_extendInfo.getChildAt(0).text =
                  game.Tools.strOfLocalization(2054) +
                  ':' +
                  GameMgr.Inst.beinvited_roomid))
              : '' != GameMgr.Inst.outsee_paipuid
              ? ((this.container_extendInfo.visible = !0),
                (this.container_extendInfo.getChildAt(
                  0
                ).text = game.Tools.strOfLocalization(2055)))
              : (this.container_extendInfo.visible = !1),
            (this.me.getChildByName('root').getChildByName('version').text =
              game.ResourceVersion.version);
          var e = Laya.LocalStorage.getItem('_pre_sociotype'),
            i = Laya.LocalStorage.getItem('ssssoooodd');
          i || (i = '');
          var n = -1;
          e && '' != e && (n = parseInt(e)), app.Log.log('sociotype:' + n);
          var a = this.login_index;
          if (n < 0 || n > 10) this.showContainerLogin();
          else if (0 == n)
            '' != i
              ? (this.showLoginLoading(0),
                Laya.timer.once(600, this, function() {
                  a == t.login_index && t._try_socio_check(a, n, i);
                }))
              : this.showContainerLogin();
          else if (n >= 1 && n <= 6) {
            var r = Laya.LocalStorage.getItem('_pre_code');
            r || (r = ''),
              '' != r || '' != i
                ? (this.showLoginLoading(n),
                  Laya.timer.once(500, this, function() {
                    a == t.login_index &&
                      (r && '' != r
                        ? t._loginby_sociocode(a, n, r)
                        : t._try_socio_check(a, n, i));
                  }))
                : this.showContainerLogin();
          } else if (
            n >= 7 &&
            n <= 10 &&
            'chs' != GameMgr.client_language &&
            Yo.login
          ) {
            var s = game.LocalStorage.getItem('yostar_token');
            s || (s = '');
            var o = game.LocalStorage.getItem('yostar_uid');
            o || (o = ''),
              '' != o && '' != s
                ? (this.showLoginLoading(n),
                  Laya.timer.once(500, this, function() {
                    a == t.login_index && t._login_2_yostar(a, n, s, o);
                  }))
                : this.showContainerLogin();
          } else this.showContainerLogin();
          this.scene.show(),
            (this.enable = !0),
            'hk' == game.LobbyNetMgr.gateway_region_name
              ? this.showServer(1)
              : this.showServer(0);
        }),
        (r.prototype._onSocioBack = function(t, e, i) {
          var n = this,
            a = this.login_index;
          this.showLoginLoading(t),
            Laya.timer.once(500, this, function() {
              a == n.login_index &&
                (e && '' != e
                  ? (Laya.LocalStorage.setItem('_pre_sociotype', t.toString()),
                    i
                      ? n._login_2_yostar(a, t, e, i)
                      : (Laya.LocalStorage.setItem('_pre_code', e),
                        n._loginby_sociocode(a, t, e)))
                  : n.showContainerLogin());
            });
        }),
        (r.prototype.showContainerLogin = function() {
          if (-1 == this.login_type_tab_index) {
            var t = game.LocalStorage.getItem('login_type_tab'),
              e = game.LocalStorage.getItem('account'),
              i = game.LocalStorage.getItem('password');
            if (
              ((this.login_account_input_info = {}),
              e && i && '' != e && '' != i)
            ) {
              var n = 0;
              t && '' != t && (n = parseInt(t)),
                (this.login_account_input_info[n] = {
                  account: e,
                  password: i
                }),
                this.change_chs_login_tab(n);
            } else this.change_chs_login_tab(0);
          } else this.change_chs_login_tab(this.login_type_tab_index);
          (this.container_login.visible = !0),
            this.login_loading.close(),
            this.login_index++;
        }),
        (r.prototype.showLoginLoading = function(t) {
          (this.container_login.visible = !1), this.login_loading.show(t);
        }),
        (r.prototype.change_chs_login_tab = function(t) {
          this.login_type_tab_index >= 0 &&
            (this.login_account_input_info[this.login_type_tab_index] = {
              account: this.txt_account.input.text,
              password: this.txt_password.input.text
            }),
            t || (t = 0),
            (this.login_type_tab_index = t);
          for (var e = 0; e < this.login_type_tabs.length; e++)
            (this.login_type_tabs[e].word.color =
              e == t ? '#446fdb' : '#84827b'),
              (this.login_type_tabs[e].choosen.visible = e == t);
          switch (t) {
            case 0:
              (this.txt_account.lb.text = '账号/邮箱'),
                (this.txt_account.input.restrict = ''),
                (this.txt_account.input.maxChars = 50);
              break;
            case 1:
              (this.txt_account.lb.text = '手机号'),
                (this.txt_account.input.restrict = '0-9'),
                (this.txt_account.input.maxChars = 11);
              break;
            default:
            case 0:
              (this.txt_account.lb.text = ''),
                (this.txt_account.input.restrict = ''),
                (this.txt_account.input.maxChars = 50);
          }
          var i = this.login_account_input_info[t],
            n = '',
            a = '';
          i && ((n = i.account), (a = i.password)),
            n && '' != n
              ? ((this.txt_account.input.text = n),
                (this.txt_account.lb.visible = !1))
              : ((this.txt_account.input.text = ''),
                (this.txt_account.lb.visible = !0)),
            a && '' != a
              ? ((this.txt_password.input.text = a),
                (this.txt_password.lb.visible = !1))
              : ((this.txt_password.input.text = ''),
                (this.txt_password.lb.visible = !0));
        }),
        (r.prototype._btn_login = function() {
          var e = this,
            i = this.txt_account.input.text,
            n = this.txt_password.input.text;
          if (i && '' != i)
            if (n && '' != n) {
              if (!(Laya.timer.currTimer < this.btn_login_cd))
                if (this.multiLogin())
                  this.showInfo(game.Tools.strOfLocalization(2058));
                else {
                  (this.btn_login_cd = Laya.timer.currTimer + 1e3),
                    this.showLoginLoading(0);
                  var a = this.login_index;
                  game.LobbyNetMgr.Inst.isOK &&
                  r.Inst.server_region_name ==
                    game.LobbyNetMgr.gateway_region_name
                    ? r.Inst._try_login_account(a, i, n)
                    : game.LobbyNetMgr.Inst.OpenConnect(
                        r.Inst.server_region_name,
                        Laya.Handler.create(this, function(s) {
                          a == e.login_index &&
                            (s.open
                              ? r.Inst._try_login_account(a, i, n)
                              : (s.maintenance
                                  ? t.UI_Entrance_Maintenance.Inst.show(
                                      s.maintenance
                                    )
                                  : e.showInfo(s.info),
                                e.showContainerLogin(),
                                (e.btn_login_cd = 0)));
                        })
                      );
                }
            } else this.showInfo(game.Tools.strOfLocalization(2057));
          else this.showInfo(game.Tools.strOfLocalization(2056));
        }),
        (r.prototype._try_regist_account = function(t, e, i, n) {
          var a = this;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'signup',
            { account: t, password: GameMgr.encodeP(i), code: e, type: n },
            function(e, r) {
              if (e)
                a.showError(game.Tools.strOfLocalization(2059), e),
                  app.Log.Error(e.message);
              else if (r.error)
                a.showError(game.Tools.strOfLocalization(2060), r.error.code),
                  app.Log.Error(
                    game.Tools.strOfLocalization(2219, [JSON.stringify(r)])
                  );
              else {
                var s = n - 1;
                (a.login_account_input_info[s] = { account: t, password: i }),
                  a.change_chs_login_tab(s),
                  a._try_login_account(a.login_index, t, i);
              }
            }
          );
        }),
        (r.prototype._try_login_account = function(e, i, n) {
          var a = this;
          if (e == this.login_index) {
            if (this.multiLogin())
              return (
                this.showInfo(game.Tools.strOfLocalization(2058)),
                void this.showContainerLogin()
              );
            var r = {};
            GameMgr.inConch
              ? (r.device_type = 'app')
              : GameMgr.iniOSWebview
              ? (r.device_type = 'app-ios')
              : (Laya.Browser.onPC && (r.device_type = 'pc'),
                Laya.Browser.onIPad && (r.device_type = 'ipad'),
                Laya.Browser.onMobile && (r.device_type = 'mobile')),
              Laya.Browser.onMac && (r.os = 'mac'),
              Laya.Browser.onIOS && (r.os = 'ios'),
              (Laya.Browser.onAndriod || Laya.Browser.onAndroid) &&
                (r.os = 'android'),
              Laya.Browser.onWeiXin && (r.browser = 'weixin'),
              Laya.Browser.onSafari && (r.browser = 'safari'),
              Laya.Browser.onFirefox && (r.browser = 'firefox'),
              Laya.Browser.onEdge && (r.browser = 'edge'),
              Laya.Browser.onMiniGame && (r.browser = 'minigame');
            var s = [];
            GameMgr.inGooglePlay && s.push(1),
              GameMgr.inChina && s.push(2),
              game.LocalStorage.setItem('account', i),
              game.LocalStorage.setItem('password', n),
              game.LocalStorage.setItem(
                'login_type_tab',
                this.login_type_tab_index.toString()
              ),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'login',
                {
                  account: i,
                  password: GameMgr.encodeP(n),
                  reconnect: !1,
                  device: r,
                  random_key: GameMgr.device_id,
                  client_version: game.ResourceVersion.version,
                  gen_access_token: !0,
                  currency_platforms: s,
                  type: this.login_type_tab_index
                },
                function(r, s) {
                  e == a.login_index &&
                    ((a.btn_login_cd = 0),
                    r
                      ? (a.showError(game.Tools.strOfLocalization(2061), r),
                        a.showContainerLogin())
                      : s.error
                      ? (503 == s.error.code
                          ? t.UI_Entrance_Prohibition.Inst.show(s.error)
                          : a.showError('', s.error.code),
                        a.showContainerLogin())
                      : (Laya.LocalStorage.setItem('_pre_sociotype', '0'),
                        game.LocalStorage.setItem('account', i),
                        game.LocalStorage.setItem('password', n),
                        game.LocalStorage.setItem(
                          'login_type_tab',
                          a.login_type_tab_index.toString()
                        ),
                        (GameMgr.Inst.account = i),
                        (GameMgr.Inst.password = n),
                        (GameMgr.Inst.sociotype = 0),
                        a._onLoginSuccess(0, s)));
                }
              );
          }
        }),
        (r.prototype._login_2_yostar = function(t, e, i, n) {
          var a = this;
          if (t == this.login_index) {
            app.Log.log(
              'login_2_yostar sociotype:' + e + ' token:' + i + ' uid:' + n
            );
            var r = this,
              s = function(t) {
                switch (t) {
                  case 1:
                    r.showError(game.Tools.strOfLocalization(2677));
                    break;
                  case 2:
                    r.showError(game.Tools.strOfLocalization(2678));
                    break;
                  case 3:
                    r.showError(game.Tools.strOfLocalization(2679));
                    break;
                  case 4:
                    r.showError(game.Tools.strOfLocalization(2680));
                    break;
                  default:
                    r.showError(game.Tools.strOfLocalization(2676));
                }
                Laya.LocalStorage.setItem('_pre_sociotype', ''),
                  r.showContainerLogin();
              };
            Yo.login &&
              Yo.login({ uid: n, token: i }).then(function(o) {
                t == a.login_index &&
                  (o
                    ? (app.Log.log('yo login data.result:' + o.result),
                      0 == o.result
                        ? (game.LocalStorage.setItem('yostar_token', i),
                          game.LocalStorage.setItem('yostar_uid', n),
                          (GameMgr.Inst.yostar_accessToken = o.accessToken),
                          r._loginby_sociocode(t, e, o.accessToken, n))
                        : s(o.result))
                    : (app.Log.log('yo login data.result: no'), s(-1)));
              });
          }
        }),
        (r.prototype._loginby_sociocode = function(e, i, n, a) {
          var s = this;
          if ((void 0 === a && (a = ''), e == this.login_index))
            if (
              (app.Log.log(
                '_loginby_sociocode0 sociotype:' +
                  i +
                  ', code:' +
                  n +
                  ', uid:' +
                  a
              ),
              game.LobbyNetMgr.Inst.isOK &&
                r.Inst.server_region_name ==
                  game.LobbyNetMgr.gateway_region_name)
            ) {
              Laya.LocalStorage.setItem('_pre_code', ''),
                Laya.LocalStorage.setItem('_pre_sociotype', ''),
                app.Log.log(
                  '_loginby_sociocode1 sociotype' +
                    i +
                    ' code:' +
                    n +
                    ' uid:' +
                    a
                );
              var o = { type: i, code: n };
              a && (o.uid = a),
                app.NetAgent.sendReq2Lobby('Lobby', 'oauth2Auth', o, function(
                  t,
                  n
                ) {
                  e == s.login_index &&
                    (t
                      ? (app.Log.log('oauth2Auth err:' + t),
                        s.showError(game.Tools.strOfLocalization(2059), t),
                        app.Log.Error(t.message),
                        s.showContainerLogin())
                      : (app.Log.log('oauth2Auth res: ' + JSON.stringify(n)),
                        n.error
                          ? (s.showError(
                              game.Tools.strOfLocalization(2062),
                              n.error.code
                            ),
                            s.showContainerLogin())
                          : s._try_socio_check(e, i, n.access_token)));
                });
            } else
              game.LobbyNetMgr.Inst.OpenConnect(
                r.Inst.server_region_name,
                Laya.Handler.create(this, function(r) {
                  e == s.login_index &&
                    (r.open
                      ? s._loginby_sociocode(e, i, n, a)
                      : (r.maintenance
                          ? t.UI_Entrance_Maintenance.Inst.show(r.maintenance)
                          : s.showInfo(r.info),
                        s.showContainerLogin()));
                })
              );
        }),
        (r.prototype._try_socio_check = function(e, i, n) {
          var a = this;
          if (e == this.login_index)
            return this.multiLogin()
              ? (this.showInfo(game.Tools.strOfLocalization(2058)),
                void this.showContainerLogin())
              : void (game.LobbyNetMgr.Inst.isOK &&
                r.Inst.server_region_name ==
                  game.LobbyNetMgr.gateway_region_name
                  ? (app.Log.log(
                      '_try_socio_check sociotype' + i + ' access_token:' + n
                    ),
                    app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'oauth2Check',
                      { type: i, access_token: n },
                      function(t, r) {
                        e == a.login_index &&
                          (t
                            ? (a.showError(
                                game.Tools.strOfLocalization(2059),
                                t
                              ),
                              app.Log.Error(t.message),
                              a.showContainerLogin())
                            : (app.Log.log(
                                'oauth2Check res: ' + JSON.stringify(r)
                              ),
                              r.error
                                ? (a.showError(
                                    game.Tools.strOfLocalization(2062),
                                    r.error.code
                                  ),
                                  a.showContainerLogin())
                                : r.has_account
                                ? a._try_login_socio(e, i, n)
                                : a._try_regist_socio(e, i, n)));
                      }
                    ))
                  : game.LobbyNetMgr.Inst.OpenConnect(
                      r.Inst.server_region_name,
                      Laya.Handler.create(this, function(r) {
                        e == a.login_index &&
                          (r.open
                            ? a._try_socio_check(e, i, n)
                            : (r.maintenance
                                ? t.UI_Entrance_Maintenance.Inst.show(
                                    r.maintenance
                                  )
                                : a.showInfo(r.info),
                              a.showContainerLogin()));
                      })
                    ));
        }),
        (r.prototype._try_regist_socio = function(t, e, i) {
          var n = this;
          if (t == this.login_index) {
            app.Log.log(
              '_try_regist_socio sociotype' + e + ' access_token:' + i
            );
            var a = Laya.LocalStorage.getItem('__ad_s');
            a && (GameMgr.Inst._ad_str = a);
            var r = {};
            (r.type = e),
              (r.access_token = i),
              GameMgr.Inst._ad_str && (r.advertise_str = GameMgr.Inst._ad_str),
              7 == e && (r.email = game.LocalStorage.getItem('mail_account')),
              app.NetAgent.sendReq2Lobby('Lobby', 'oauth2Signup', r, function(
                a,
                r
              ) {
                t == n.login_index &&
                  (a
                    ? (app.Log.log('oauth2Signup err:' + a),
                      n.showError(game.Tools.strOfLocalization(2059), a),
                      app.Log.Error(a.message),
                      n.showContainerLogin())
                    : (app.Log.log('oauth2Signup res: ' + JSON.stringify(r)),
                      r.error
                        ? (n.showError(
                            game.Tools.strOfLocalization(2060),
                            r.error.code
                          ),
                          app.Log.Error(
                            game.Tools.strOfLocalization(2219, [
                              JSON.stringify(r)
                            ])
                          ),
                          n.showContainerLogin())
                        : (app.PlayerBehaviorStatistic.fb_trace_force(
                            app.EBehaviorType.CompleteRegistration
                          ),
                          app.PlayerBehaviorStatistic.google_trace_force(
                            app.EBehaviorType.G_Role_create
                          ),
                          app.PlayerBehaviorStatistic.tw_trace_force(
                            app.EBehaviorType.TW_Signup
                          ),
                          n._try_login_socio(t, e, i))));
              });
          }
        }),
        (r.prototype._try_login_socio = function(e, i, n) {
          var a = this;
          if (e == this.login_index) {
            if (this.multiLogin())
              return (
                this.showError(game.Tools.strOfLocalization(2058)),
                void this.showContainerLogin()
              );
            app.Log.log(
              '_try_login_socio sociotype' + i + ' access_token:' + n
            );
            var r = {};
            GameMgr.inConch
              ? (r.device_type = 'app')
              : GameMgr.iniOSWebview
              ? (r.device_type = 'app-ios')
              : (Laya.Browser.onPC && (r.device_type = 'pc'),
                Laya.Browser.onIPad && (r.device_type = 'ipad'),
                Laya.Browser.onMobile && (r.device_type = 'mobile')),
              Laya.Browser.onMac && (r.os = 'mac'),
              Laya.Browser.onIOS && (r.os = 'ios'),
              (Laya.Browser.onAndriod || Laya.Browser.onAndroid) &&
                (r.os = 'android'),
              Laya.Browser.onWeiXin && (r.browser = 'weixin'),
              Laya.Browser.onSafari && (r.browser = 'safari'),
              Laya.Browser.onFirefox && (r.browser = 'firefox'),
              Laya.Browser.onEdge && (r.browser = 'edge'),
              Laya.Browser.onMiniGame && (r.browser = 'minigame');
            var s = [];
            GameMgr.inGooglePlay && s.push(1),
              GameMgr.inChina && s.push(2),
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'oauth2Login',
                {
                  type: i,
                  access_token: n,
                  reconnect: !1,
                  device: r,
                  random_key: GameMgr.device_id,
                  client_version: game.ResourceVersion.version,
                  currency_platforms: s
                },
                function(r, s) {
                  e == a.login_index &&
                    ((a.btn_login_cd = 0),
                    r
                      ? (app.Log.log('oauth2Login err:' + r),
                        a.showError(game.Tools.strOfLocalization(2061), r),
                        a.showContainerLogin())
                      : (app.Log.log('oauth2Login res: ' + JSON.stringify(s)),
                        s.error
                          ? (503 == s.error.code
                              ? t.UI_Entrance_Prohibition.Inst.show(s.error)
                              : a.showError('', s.error.code),
                            a.showContainerLogin())
                          : (Laya.LocalStorage.setItem(
                              '_pre_sociotype',
                              i.toString()
                            ),
                            Laya.LocalStorage.setItem('ssssoooodd', n),
                            (GameMgr.Inst.sociotype = i),
                            (GameMgr.Inst.access_token = n),
                            a._onLoginSuccess(i, s))));
                }
              );
          }
        }),
        (r.prototype._onLoginSuccess = function(e, i) {
          var n = this;
          if (
            (app.Log.log('登陆：' + JSON.stringify(i)),
            (GameMgr.Inst.account_id = i.account_id),
            (GameMgr.Inst.account_data = i.account),
            (GameMgr.Inst.account_numerical_resource = {}),
            i.account.platform_diamond)
          )
            for (var a = i.account.platform_diamond, r = 0; r < a.length; r++)
              GameMgr.Inst.account_numerical_resource[a[r].id] = a[r].count;
          (GameMgr.Inst.account_refresh_time = Laya.timer.currTimer),
            i.game_info &&
              ((GameMgr.Inst.ingame = !0),
              (GameMgr.Inst.mj_server_location = i.game_info.location),
              (GameMgr.Inst.mj_game_token = i.game_info.connect_token),
              (GameMgr.Inst.mj_game_uuid = i.game_info.game_uuid)),
            i.access_token &&
              (Laya.LocalStorage.setItem('_pre_sociotype', e.toString()),
              Laya.LocalStorage.setItem('ssssoooodd', i.access_token),
              (GameMgr.Inst.sociotype = e),
              (GameMgr.Inst.access_token = i.access_token)),
            Laya.LocalStorage.removeItem('__ad_s'),
            t.UI_Loading.Inst.show('load_lobby'),
            (this.enable = !1),
            this.scene.close(),
            t.UI_Entrance_Mail_Regist.Inst.close(),
            this.login_loading.close(),
            t.UIMgr.Inst.openLobbyUI(
              Laya.Handler.create(this, function() {
                GameMgr.Inst.afterLogin(),
                  GameMgr.Inst.account_data.anti_addiction &&
                    t.UIMgr.Inst.ShowPreventAddiction(),
                  n.destroy(),
                  n.disposeRes(),
                  t.UI_Add2Desktop.Inst &&
                    (t.UI_Add2Desktop.Inst.destroy(),
                    (t.UI_Add2Desktop.Inst = null));
              }),
              Laya.Handler.create(
                this,
                function(e) {
                  return t.UI_Loading.Inst.setProgressVal(0.2 * e);
                },
                null,
                !1
              )
            );
        }),
        (r.prototype.showMailLogin = function() {
          this.page_maillogin.show();
        }),
        (r.prototype.showInfo = function(e) {
          var i = '';
          e && (i += e), t.UI_Entrance_Error.Inst.show(i, !1);
        }),
        (r.prototype.showError = function(e, i, n) {
          void 0 === i && (i = -1), void 0 === n && (n = '');
          var a = '';
          e && (a += e),
            -1 != i &&
              (a.length > 0 && (a += ','),
              cfg.info.error.get(i)
                ? (a += cfg.info.error.get(i)[GameMgr.client_language])
                : (a += game.Tools.strOfLocalization(2063) + '(' + i + ')')),
            n && (a += ', info:' + n),
            t.UI_Entrance_Error.Inst.show(a, !1);
        }),
        (r.prototype.showServer = function(t) {
          0 == t
            ? (Laya.LocalStorage.setItem('gateway_region', 'mainland'),
              (this.server_index = 0),
              (this.label_server.text = game.Tools.strOfLocalization(2217)))
            : 1 == t &&
              (Laya.LocalStorage.setItem('gateway_region', 'hk'),
              (this.server_index = 1),
              (this.label_server.text = game.Tools.strOfLocalization(2216)));
        }),
        (r.Accountforbidden = function(t) {
          var e = !1;
          return (
            cfg.info.forbidden.forEach(function(i, n) {
              '' != i.word && t.indexOf(i.word) >= 0 && (e = !0);
            }),
            e
          );
        }),
        (r.prototype.multiLogin = function() {
          var t = Laya.LocalStorage.getItem('dolllt');
          return (
            !(!t || '' == t) && game.Tools.currentTime < parseFloat(t) + 1.5
          );
        }),
        (r.prototype.disposeRes = function() {
          Laya.Loader.clearTextureRes('res/atlas/myres/entrance.atlas');
          var t = '';
          (t =
            'en' == GameMgr.client_language
              ? 'scene/Assets/Resource/entrance/icon_color_en.png'
              : 'jp' == GameMgr.client_language
              ? 'scene/Assets/Resource/entrance/icon_color_jp.png'
              : 'scene/Assets/Resource/entrance/icon_color.png'),
            Laya.loader.getRes(t).dispose(!0);
        }),
        (r.Inst = null),
        r
      );
    })(t.UIBase);
  t.UI_Entrance = a;
})(uiscript || (uiscript = {}));