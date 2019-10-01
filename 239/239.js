var GameMgr = (() => {
  class t {
    constructor() {
      var e = this;
      this.stage = null;
      this.uimgr = null;
      this.root_ui = null;
      this.root_scene = null;
      this.root_front_scene_effect = null;
      this.root_front_effect = null;
      this.logined = !1;
      this.link_url = '';
      this.account = '';
      this.password = '';
      this.sociotype = 0;
      this.player_name = '';
      this.access_token = '';
      this.account_id = -1;
      this.account_setting = {};
      this.account_data = null;
      this.account_numerical_resource = null;
      this.yostar_accessToken = '';
      this.player_in_haiwai = !1;
      this.commonview_slot = {};
      this.mjp_view = '';
      this.mjp_item_id = 0;
      this.mj_server_location = '';
      this.mj_game_token = '';
      this.mj_game_uuid = '';
      this.ingame = !1;
      this.beinvited_roomid = -1;
      this.outsee_paipuid = '';
      this.custom_match_id = 0;
      this.account_refresh_time = 0;
      this._current_scene = null;
      this._scene_lobby = null;
      this._scene_mj = null;
      this.duringPaipu = !1;
      this._statisticinfo = {};
      this._last_heatbeat_time = 0;
      this._pre_mouse_point = new Laya.Point(0, 0);
      this._fastin = !1;
      this.comment_allow = 0;
      this.server_time_delta = 0;
      this.client_endpoint = null;
      this._ad_str = '';
      this._mail_account = '';
      t.Inst = this;

      t._inRes =
          !!Laya.Browser.window.conch ||
          (!document.getElementById('environment') ||
            'dev' != document.getElementById('environment').innerText);

      Laya3D.init(1920, 1080, !0);
      Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;

      Laya.Browser.onMobile
        ? (Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL)
        : (Laya.stage.screenMode = Laya.Stage.SCREEN_NONE);

      Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
      Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
      Laya.stage.bgColor = '#000000';
      t._inRes || Laya.Stat.show();

      Laya.loader.load(
            'client_language.txt',
            Laya.Handler.create(this, () => {
              var i = Laya.loader.getRes('client_language.txt');

              t.client_language =
                'en' === i ? 'en' : 'jp' === i ? 'jp' : 'chs';

              e.init();
              t.iniOSWebview
                ? Laya.timer.once(500, e, () => {
                    e.load0();
                  })
                : e.load0();
            })
          );

      this._statisticinfo = {};
      this.pendinglink()
        ? (Laya.Browser.window.location.href = this.link_url)
        : (Laya.timer.loop(
        1e4,
        this,
        () => {
          if (
            game.LobbyNetMgr.Inst.connect_state ==
            game.EConnectState.connecting
          ) {
            var t = [];
            for (var i in e._statisticinfo)
              t.push({ key: parseInt(i), value: e._statisticinfo[i] });
            t.length > 0 && (e._statisticinfo = {});
          }
        },
        null,
        !1
      ));
    }

    init() {
      var e = Laya.LocalStorage.getItem('fpsmode');

      e =
          !Laya.Browser.onMobile || t.inConch || t.iniOSWebview
            ? 'fast'
            : 'slow';

      (e && '' != e) ||
        (Laya.LocalStorage.setItem('fpsmode', e));

      Laya.stage.frameRate = e;
      var i = Laya.LocalStorage.getItem('dddddcv');
      i = game.Tools.generateUUID();

      (i && '' != i) ||
        (Laya.LocalStorage.setItem('dddddcv', i));

      t.device_id = i;
      Laya.Browser.window.onerror = this.handleWindowError;
      this.root_scene = new Laya.Sprite();
      this.root_ui = new Laya.Sprite();
      this.root_front_effect = new Laya.Sprite();
      Laya.stage.addChild(this.root_scene);
      Laya.stage.addChild(this.root_ui);
      Laya.stage.addChild(this.root_front_effect);
      this.logined = !1;
      this._current_scene = null;
      this.duringPaipu = !1;
      this._scene_lobby = new game.Scene_Lobby();
      this._scene_mj = new game.Scene_MJ();
      view.AudioMgr.init();
      var n = Laya.LocalStorage.getItem('click_prefer');
      view.DesktopMgr.click_prefer = n && '1' == n ? 1 : 0;
      var a = Laya.LocalStorage.getItem('double_click_pass');
      view.DesktopMgr.double_click_pass = a && '1' == a ? 1 : 0;
      if (
        ('en' == t.client_language)
      ) {
        view.DesktopMgr.en_mjp = !0;
        'false' == game.LocalStorage.getItem('en_mjp') &&
          (view.DesktopMgr.en_mjp = !1);
      } else view.DesktopMgr.en_mjp = !1;
      var r = Laya.LocalStorage.getItem('_pre_room');
      r && '' != r && (this.beinvited_roomid = parseInt(r));
      this.outsee_paipuid = Laya.LocalStorage.getItem('_pre_paipu');
      this.outsee_paipuid || (this.outsee_paipuid = '');
      this.trasform_storage();
      if (
        (Laya.Browser.window.conch)
      ) {
        var s = Laya.PlatformClass.createClass('layaair.majsoul.mjmgr');
        var o = s.newObject();

        o.callWithBack(function(t) {
          var e = JSON.parse(t);
          this._fastin = !0;
          Laya.LocalStorage.setItem('_pre_sociotype', e.type);

          e.type &&
            (Laya.LocalStorage.setItem('_pre_code', e.code));

          Laya.LocalStorage.setItem('_pre_st', '');
        }, 'getSocioCode');

        s.call('clearSocioCode');
        s.call('initWXPay', 'wxa81767d38cb2f4ff');
        o.callWithBack(e => {
          t._in_china = !0;
          t._in_google_play = !0;
          'ingoogleplay' == e &&
            ((t._in_china = !1));
        }, 'getAppConfig');
      }
    }

    trasform_storage() {
      this._fastin = !0;
      Laya.LocalStorage.setItem('_pre_sociotype', t);
      (t = Laya.LocalStorage.getItem('_pre_st')) &&
        '' != t &&
        (Laya.LocalStorage.setItem('_pre_st', ''));
      this._fastin = !0;
      Laya.LocalStorage.setItem('_pre_sociotype', t);
      (t = Laya.LocalStorage.getItem('_pre_xdsfdl')) &&
        '' != t &&
        (Laya.LocalStorage.setItem('_pre_xdsfdl', ''));
      game.LocalStorage.setItem('yostar_uid', t);
      (t = Laya.LocalStorage.getItem('_pre_uid')) &&
        '' != t &&
        (Laya.LocalStorage.removeItem('_pre_uid'));
      var t = Laya.LocalStorage.getItem('_pre_token');
      game.LocalStorage.setItem('yostar_token', t);
      t &&
        '' != t &&
        (Laya.LocalStorage.removeItem('_pre_token'));
      var e = Laya.LocalStorage.getItem('_pre_state');
      this._fastin = !0;
      Laya.LocalStorage.setItem('_pre_sociotype', '3');

      !e ||
        '' == e ||
        ('xdsfdl3' != e && 'xdsfdl4' != e) ||
        (Laya.LocalStorage.setItem('_pre_st', ''));

      Laya.LocalStorage.setItem('_pre_state', '');
    }

    load0() {
      var e = this;
      window && window.conch && window.loadingView.loading(30);
      t.iniOSWebview &&
        Laya.Browser.window.wkbridge.callNative &&
        Laya.Browser.window.wkbridge.callNative(
          'setloadrate',
          '30',
          () => {}
        );
      var i = () => {
        game.ResourceVersion.init(
          Laya.Handler.create(e, () => {
            window && window.conch && window.loadingView.loading(40);
            t.iniOSWebview &&
              Laya.Browser.window.wkbridge.callNative(
                'setloadrate',
                '40',
                () => {}
              );
            var i = 'res/atlas/bitmapfont.atlas';

            'jp' == t.client_language
              ? (i = 'res/atlas/bitmapfont/jp.atlas')
              : 'en' == t.client_language &&
                (i = 'res/atlas/bitmapfont/en.atlas');

            Laya.loader.create(
              i,
              Laya.Handler.create(e, () => {
                var i = [];
                i =
                  'jp' == t.client_language
                    ? ['jp_haolong', 'jp_jiye']
                    : 'en' == t.client_language
                    ? ['en_haolong', 'en_hanyi', 'en_shuhun']
                    : [
                        'fengyu',
                        'hanyi',
                        'haolong',
                        'youyuan',
                        'youyuan_bold'
                      ];
                var n = 0;

                var a = () => {
                  n++;

                  window &&
                    window.conch &&
                    window.loadingView.loading(
                      Math.floor(40 + (n / i.length) * 20)
                    );

                  t.iniOSWebview &&
                    Laya.Browser.window.wkbridge.callNative(
                      'setloadrate',
                      Math.floor(40 + (n / i.length) * 20).toString(),
                      () => {}
                    );

                  n == i.length && Laya.timer.frameOnce(2, e, e.load1);
                };

                if ('chs' == t.client_language)
                  for (
                    var r = t => {
                        var n = new Laya.BitmapFont();
                        n.loadFont(
                          `bitmapfont/${i[t]}.fnt`,
                          Laya.Handler.create(e, () => {
                            n.setSpaceWidth(10);
                            Laya.Text.registerBitmapFont(i[t], n);
                            a();
                          })
                        );
                      },
                      s = 0;
                    s < i.length;
                    s++
                  )
                    r(s);
                else
                  for (
                    var o = n => {
                        var r = new Laya.BitmapFont();
                        r.loadFont(
                          `bitmapfont/${t.client_language}/${i[n]}.fnt`,
                          Laya.Handler.create(e, () => {
                            r.setSpaceWidth(10);
                            Laya.Text.registerBitmapFont(i[n], r);
                            a();
                          })
                        );
                      },
                      s = 0;
                    s < i.length;
                    s++
                  )
                    o(s);
              })
            );
          })
        );
      };
      t._client_region = 'mainland';
      if ('chs' == t.client_language) {
        var n = '';
        n = t.inConch ? '../../../region/region.txt' : '../region/region.txt';
        Laya.loader.load(
          n,
          Laya.Handler.create(this, () => {
            var e = Laya.loader.getRes(n);
            t._client_region = e && 'hk' === e ? 'hk' : 'mainland';
            i();
          })
        );
      } else i();
    }

    load1() {
      var e = this;
      game.LoadMgr.httpload(
        'config.json',
        'json',
        !1,
        Laya.Handler.create(this, ({success, data}) => {
          window && window.conch && window.loadingView.loading(70);

          t.iniOSWebview &&
            Laya.Browser.window.wkbridge.callNative(
              'setloadrate',
              '70',
              () => {}
            );

          if (
            (success)
          ) {
            var n = data;
            t.config_data = n;
            Laya.loader.load(
              'res/proto/liqi.json',
              new Laya.Handler(e, () => {
                window && window.conch && window.loadingView.loading(80);
                t.iniOSWebview &&
                  Laya.Browser.window.wkbridge.callNative(
                    'setloadrate',
                    '80',
                    () => {}
                  );
                var i = Laya.loader.getRes('res/proto/liqi.json');
                if (i) {
                  net.ProtobufManager.loadProto(i);
                  net.MessageWrapper.initWrapper();
                  app.NetAgent.init();
                  window && window.conch && window.loadingView.loading(85);
                  t.iniOSWebview &&
                    Laya.Browser.window.wkbridge.callNative(
                      'setloadrate',
                      '85',
                      () => {}
                    );
                  var n = '';
                  n = `uiconfig/ui_${t.client_language}.json`;
                  'chs' != t.client_language && e.loadUStarLogin();
                  Laya.loader.load(
                    n,
                    Laya.Handler.create(e, () => {
                      var i = Laya.loader.getRes(n);
                      Laya.View.uiMap = i;
                      new caps.ShaderInitor().init(
                        Laya.Handler.create(e, () => {
                          window &&
                            window.conch &&
                            window.loadingView.loading(100);

                          t.iniOSWebview &&
                            Laya.Browser.window.wkbridge.callNative(
                              'setloadrate',
                              '100',
                              () => {}
                            );

                          e.initUIRoot();
                        })
                      );
                    })
                  );
                } else
                  console.error(
                    'load protobuf failed: liqiDescriptor is null'
                  );
              })
            );
          } else app.Log.Error('未找到配置文件：config.json');
        })
      );
    }

    loadUStarLogin() {
      var e = document.createElement('script');
      e.src = `${t.config_data.yo_service_url}/js/${t.config_data.yo_sdk_js}`;
      var i = document.getElementsByTagName('script')[0];
      i.parentNode.insertBefore(e, i);
    }

    loadExcel(t) {
      var e = this;
      Laya.loader.load(
        'res/proto/config.proto',
        new Laya.Handler(this, () => {
          uiscript.UI_Remind.Inst && uiscript.UI_Remind.Inst.setprocess(1);
          Laya.loader.load(
            'res/config/lqc.lqbin',
            new Laya.Handler(e, () => {
              uiscript.UI_Remind.Inst && uiscript.UI_Remind.Inst.setprocess(2);
              var e = Laya.loader.getRes('res/proto/config.proto');
              if (e) {
                uiscript.UI_Remind.Inst &&
                  uiscript.UI_Remind.Inst.setprocess(3);
                var i = Laya.loader.getRes('res/config/lqc.lqbin');
                if (i) {
                  uiscript.UI_Remind.Inst &&
                    uiscript.UI_Remind.Inst.setprocess(4);
                  var n = new Laya.Byte();
                  n.writeArrayBuffer(i);
                  var a = new bin.BinParser();
                  a.parseSync(e, n.getUint8Array(0, n.length));
                  uiscript.UI_Remind.Inst &&
                    uiscript.UI_Remind.Inst.setprocess(5);
                  var r = new bin.TSDataFormat(
                    a.exportSchema(),
                    a.exportData()
                  );
                  cfg.load(r.toFormat());

                  uiscript.UI_Remind.Inst &&
                    uiscript.UI_Remind.Inst.setprocess(6);

                  t && t.run();
                } else console.error('load bincontent failed: bindata is null');
              } else console.error('load configProto failed: configProto is null');
            }),
            null,
            Laya.Loader.BUFFER
          );
        })
      );
    }

    pendinglink() {
      var e = '';

      document.getElementById('game_link') &&
        (e = document.getElementById('game_link').innerText);

      e && (this.link_url = e);
      t.inConch && (this.link_url = 'https://majsoul.union-game.com/0/');
      var i = Laya.Browser.window.location.href;
      var n = {};
      if (i) {
        i.indexOf('#') > 0 && (i = i.substr(0, i.indexOf('#')));
        var a = i.indexOf('?');
        this.beinvited_roomid = -1;
        if (a >= 0) {
          e || (this.link_url = i.substr(0, a));
          for (
            var r = i.substring(a + 1, i.length),
              s = (r = (r = r.replace('#_=_', '')).replace('#', '')).split('&'),
              o = 0;
            o < s.length;
            o++
          )
            if ((a = s[o].indexOf('=')) > 0) {
              var l = s[o].substring(0, a);
              var h = s[o].substring(a + 1, s[o].length);
              n[l] = h;
            }
        } else this.outsee_paipuid = '';

        this.link_url.includes('index.html') &&
            (this.link_url = this.link_url.substr(
              0,
              this.link_url.indexOf('index.html')
            ));

        e ||
          ('/' != this.link_url.charAt(this.link_url.length - 1) &&
          (this.link_url += '/'));
      }
      var c = !1;
      var u = '';
      '' != u && (u += '&');

      'mv_' == _.substr(0, 3) ||
        ('utm_' == _.substr(0, 4)
          ? (u += `${_}=${n[_]}`)
          : Laya.LocalStorage.setItem(`_pre_${_}`, n[_]));

      for (var _ in n)
        c = !0;
      Laya.LocalStorage.setItem('__ad_s', u);

      u &&
        (Laya.LocalStorage.setItem('__ad_t', Date.now().toString()));

      return c;
    }

    addScene(t) {
      this.root_scene.addChild(t);
    }

    addUI(t) {
      this.root_ui.addChild(t);
    }

    initUIRoot() {
      this.uimgr = new uiscript.UIMgr();
      this.uimgr.init();
      if (
        (t.iniOSWebview)
      ) {
        var e = this;
        Laya.Browser.window.wkbridge.callNative('getappversion', '', t => {
          game.LoadMgr.httpload(
            'iOSver',
            'text',
            !1,
            Laya.Handler.create(e, ({success, data}) => {
              Laya.Browser.window.wkbridge.callNative(
                'closeloadview',
                '',
                () => {}
              );

              success
                ? parseInt(t) < parseInt(data)
                  ? uiscript.UI_IOS_Webview_Update.show(
                      game.Tools.strOfLocalization(2001)
                    )
                  : e.showEntrance()
                : uiscript.UI_IOS_Webview_Update.show(
                    game.Tools.strOfLocalization(2002)
                  );
            })
          );
        });
      } else this.showEntrance();
    }

    showEntrance() {
      var e = this;
      uiscript.UI_ChooseServer.show(
        Laya.Handler.create(this, () => {
          if (e._fastin)
            e.loadExcel(
              Laya.Handler.create(e, () => {
                game.LoadMgr.loadRes(
                  game.E_LoadType.entrance,
                  Laya.Handler.create(e, () => {
                    e.uimgr.showEntrance();
                    game.LoadMgr.loadConfig();
                    e._scene_lobby.init(null);
                  })
                );
              })
            );
          else {
            var i =
              `res/atlas${'chs' == t.client_language ? '' : `/${t.client_language}`}/myres/start_show.atlas`;
            Laya.loader.create(
              i,
              Laya.Handler.create(e, () => {
                e.uimgr.showRemind();
                var t = Laya.timer.currTimer;
                e.loadExcel(
                  Laya.Handler.create(e, () => {
                    uiscript.UI_Remind.Inst &&
                      uiscript.UI_Remind.Inst.setprocess(7);

                    game.LoadMgr.loadRes(
                      game.E_LoadType.entrance,
                      Laya.Handler.create(e, () => {
                        uiscript.UI_Remind.Inst &&
                          uiscript.UI_Remind.Inst.setprocess(8);
                        var i = t + 3e3 - Laya.timer.currTimer;
                        i <= 60 && (i = 60);
                        Laya.timer.once(i, e, () => {
                          uiscript.UI_Remind.Inst &&
                            uiscript.UI_Remind.Inst.setprocess(9);

                          e.uimgr.showEntrance();
                          game.LoadMgr.loadConfig();
                          e._scene_lobby.init(null);
                        });
                      })
                    );
                  })
                );
              })
            );
          }
        })
      );
    }

    fetch_login_info() {
      var t = this;
      game.FriendMgr.init();
      uiscript.UI_Mail.Init();
      uiscript.UI_Activity_Xuanshang.Init();
      uiscript.UI_Activity_Jiuji.Init();
      uiscript.UI_TitleBook.Init();
      uiscript.UI_Bag.init();
      uiscript.UI_Shop.init();
      uiscript.UI_Activity.init();
      uiscript.UI_Recharge.init();
      uiscript.UI_Activity_Yueka.Init();

      app.NetAgent.sendReq2Lobby('Lobby', 'fetchCommentSetting', {}, (e, i) => {
        e || i.error
          ? uiscript.UIMgr.Inst.showNetReqError('fetchCommentSetting', e, i)
          : (t.comment_allow = i.comment_allow);
      });

      this.commonview_slot = {};

      app.NetAgent.sendReq2Lobby('Lobby', 'fetchCommonView', {}, (e, i) => {
        if (e || i.error)
          uiscript.UIMgr.Inst.showNetReqError('fetchCommonView', e, i);
        else {
          if (i.slots)
            for (var n = 0; n < i.slots.length; n++)
              t.commonview_slot[i.slots[n].slot] = i.slots[n].value;
          var a = 0;

          t.commonview_slot.hasOwnProperty(game.ECommonView.mjp.toString()) &&
            (a = t.commonview_slot[game.ECommonView.mjp.toString()]);

          t.load_mjp_view(a);
        }
      });

      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchAccountSettings',
        {},
        (e, {error, settings}) => {
          t.account_setting = [];
          if (e || error);
          else if ((settings))
            for (var n = 0; n < settings.length; n++)
              t.account_setting[settings[n].key] = settings[n].value;
        }
      );

      this.last_mod_name_time = 0;

      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchModNicknameTime',
        {},
        (e, {error, last_mod_time}) => {
          e ||
            error ||
            (last_mod_time && (t.last_mod_name_time = last_mod_time));
        }
      );

      app.NetAgent.sendReq2Lobby('Lobby', 'fetchMisc', {}, (t, {error, recharged_list, faiths}) => {
        if (t || error)
          cfg.mall.goods.forEach(({cny}) => {
            uiscript.UI_Recharge.new_recharge_list[cny] = 1;
          });
        else {
          if (recharged_list)
            for (var i = 0; i < recharged_list.length; i++)
              uiscript.UI_Recharge.new_recharge_list[recharged_list[i]] = 1;
          faiths && uiscript.UI_Treasure.on_chest_count_change(faiths);
        }
      });

      app.NetAgent.sendReq2Lobby('Lobby', 'fetchIDCardInfo', {}, (e, {error, country, is_authed}) => {
        t.player_in_haiwai = !1;
        t.player_in_haiwai = !0;
        e || error
          ? (uiscript.UI_ShiMingRenZheng.renzhenged = !1)
          : 'CN' == country
          ? (uiscript.UI_ShiMingRenZheng.renzhenged = is_authed)
          : (uiscript.UI_ShiMingRenZheng.renzhenged = is_authed);
      });
    }

    gameInit() {
      var t = this;
      view.BgmListMgr.init();

      app.NetAgent.sendReq2Lobby('Lobby', 'fetchServerTime', {}, (e, i) => {
        e || i.error
          ? uiscript.UIMgr.Inst.showNetReqError('fetchServerTime', e, i)
          : (t.server_time_delta =
              1e3 * i.server_time - Laya.timer.currTimer);
      });

      app.NetAgent.sendReq2Lobby('Lobby', 'fetchServerSettings', {}, (t, e) => {
        app.Log.log(`fetchServerSettings: ${JSON.stringify(e)}`);
        uiscript.UI_Recharge.open_payment = !1;
        uiscript.UI_Recharge.payment_info = '';
        uiscript.UI_Recharge.open_wx = !0;
        uiscript.UI_Recharge.wx_type = 0;
        uiscript.UI_Recharge.open_alipay = !0;
        uiscript.UI_Recharge.alipay_type = 0;
        if (t || e.error)
          uiscript.UIMgr.Inst.showNetReqError('fetchServerSettings', t, e);
        else if (
          (e.settings && e.settings.payment_setting)
        ) {
          var i = e.settings.payment_setting;
          i.open_payment && (uiscript.UI_Recharge.open_payment = !0);

          null != i.payment_info_show_type &&
            (uiscript.UI_Recharge.payment_info_show_type =
              i.payment_info_show_type);

          null != i.payment_info &&
            (uiscript.UI_Recharge.payment_info = i.payment_info);

          i.wechat.disable_create && (uiscript.UI_Recharge.open_wx = !1);

          i.wechat &&
            ((null != i.wechat.payment_source_platform && (uiscript.UI_Recharge.wx_type = i.wechat.payment_source_platform)));

          i.alipay.disable_create &&
              (uiscript.UI_Recharge.open_alipay = !1);

          i.alipay &&
            ((null != i.alipay.payment_source_platform && (uiscript.UI_Recharge.alipay_type = i.alipay.payment_source_platform)));
        }
      });

      app.NetAgent.sendReq2Lobby('Lobby', 'fetchConnectionInfo', {}, (e, {error, client_endpoint}) => {
        e || error || (t.client_endpoint = client_endpoint);
      });

      app.PlayerBehaviorStatistic.init();
      this.account_data.nickname && this.fetch_login_info();
      uiscript.UI_Info.Init();

      app.NetAgent.AddListener2Lobby(
        'NotifyAccountUpdate',
        Laya.Handler.create(
          this,
          e => {
            app.Log.log(`NotifyAccountUpdate :${JSON.stringify(e)}`);
            var i = e.update;
            if (i) {
              if (i.numerical)
                for (var n = 0; n < i.numerical.length; n++) {
                  var a = i.numerical[n].id;
                  var r = i.numerical[n].final;
                  switch (a) {
                    case 100001:
                      t.account_data.diamond = r;
                      break;
                    case 100002:
                      t.account_data.gold = r;
                      break;
                    case 100099:
                      t.account_data.vip = r;
                  }
                  (a >= 101001 || a <= 101999) &&
                    (t.account_numerical_resource[a] = r);
                }
              uiscript.UI_Sushe.on_data_updata(i);

              i.daily_task &&
                uiscript.UI_Activity_Xuanshang.dataUpdate(i.daily_task);

              i.title && uiscript.UI_TitleBook.addTitle(i.title);

              i.new_recharged_list &&
                uiscript.UI_Recharge.on_new_recharge_refresh(i);

              i.activity_task && uiscript.UI_Activity.accountUpdate(i);
              i.activity_flip_task &&
                uiscript.UI_Activity_Fanpai.onTaskDataUpdate(
                  i.activity_flip_task.progresses
                );
            }
          },
          null,
          !1
        )
      );

      app.NetAgent.AddListener2Lobby(
        'NotifyAnotherLogin',
        Laya.Handler.create(this, t => {
          uiscript.UI_AnotherLogin.Inst.show();
        })
      );

      app.NetAgent.AddListener2Lobby(
        'NotifyAccountLogout',
        Laya.Handler.create(this, t => {
          uiscript.UI_Hanguplogout.Inst.show();
        })
      );

      app.NetAgent.AddListener2Lobby(
        'NotifyClientMessage',
        Laya.Handler.create(this, t => {
          app.Log.log(`收到消息：${JSON.stringify(t)}`);
          t.type == game.EFriendMsgType.room_invite &&
            uiscript.UI_Invite.onNewInvite(t.content);
        })
      );

      app.NetAgent.AddListener2Lobby(
        'NotifyServerSetting',
        Laya.Handler.create(this, ({settings}) => {
          uiscript.UI_Recharge.open_payment = !1;
          uiscript.UI_Recharge.payment_info = '';
          uiscript.UI_Recharge.open_wx = !0;
          uiscript.UI_Recharge.wx_type = 0;
          uiscript.UI_Recharge.open_alipay = !0;
          uiscript.UI_Recharge.alipay_type = 0;
          if (
            (settings && settings.payment_setting)
          ) {
            var e = settings.payment_setting;
            e.open_payment && (uiscript.UI_Recharge.open_payment = !0);

            null != e.payment_info_show_type &&
              (uiscript.UI_Recharge.payment_info_show_type =
                e.payment_info_show_type);

            null != e.payment_info &&
              (uiscript.UI_Recharge.payment_info = e.payment_info);

            e.wechat.disable_create &&
                (uiscript.UI_Recharge.open_wx = !1);

            e.wechat &&
              ((null != e.wechat.payment_source_platform && (uiscript.UI_Recharge.wx_type = e.wechat.payment_source_platform)));

            e.alipay.disable_create &&
                (uiscript.UI_Recharge.open_alipay = !1);

            e.alipay &&
              ((null != e.alipay.payment_source_platform && (uiscript.UI_Recharge.alipay_type = e.alipay.payment_source_platform)));
          }
        })
      );

      app.NetAgent.AddListener2Lobby(
        'NotifyVipLevelChange',
        Laya.Handler.create(this, t => {
          uiscript.UI_Sushe.send_gift_limit = t.gift_limit;
          game.FriendMgr.friend_max_count = t.friend_max_count;

          uiscript.UI_Shop.shopinfo.zhp.free_refresh.limit =
              t.zhp_free_refresh_limit;

          uiscript.UI_Shop.shopinfo.zhp.cost_refresh.limit =
              t.zhp_cost_refresh_limit;

          uiscript.UI_PaiPu.collect_limit = t.record_collect_limit;
        })
      );

      Laya.timer.loop(36e4, this, () => {
        if (game.LobbyNetMgr.Inst.isOK) {
          var e = (Laya.timer.currTimer - t._last_heatbeat_time) / 1e3;

          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'heatbeat',
            { no_operation_counter: e },
            () => {}
          );

          e >= 3e3 && uiscript.UI_Hanguplogout.Inst.show();
        }
      });

      Laya.timer.loop(1e3, this, () => {
        var e = Laya.stage.getMousePoint();
        t.clientHeatBeat();
        t._pre_mouse_point.x = e.x;
        (e.x == t._pre_mouse_point.x && e.y == t._pre_mouse_point.y) ||
          ((t._pre_mouse_point.y = e.y));
      });

      Laya.timer.loop(1e3, this, () => {
        Laya.LocalStorage.setItem(
          'dolllt',
          game.Tools.currentTime.toString()
        );
      });
    }

    afterLogin() {
      var e = this;
      this.gameInit();
      this.logined = !0;
      Laya.LocalStorage.setItem('_pre_room', '');
      Laya.LocalStorage.setItem('_pre_paipu', '');

      (t.Inst.account_data.nickname && '' != t.Inst.account_data.nickname) ||
        uiscript.UI_XinShouYinDao.pre_load();

      this._scene_lobby.addLoadListenter(
        Laya.Handler.create(this, () => {
          game.FrontEffect.init();
          uiscript.UI_Sushe.init(
            Laya.Handler.create(e, () => {
              uiscript.UI_Loading.Inst.setProgressVal(1);
              Laya.timer.once(500, e, () => {
                e.EnterLobby();
              });
            })
          );
        }),
        Laya.Handler.create(
          this,
          t => uiscript.UI_Loading.Inst.setProgressVal(0.2 + 0.7 * t),
          null,
          !1
        )
      );

      app.PlayerBehaviorStatistic.google_trace_force(
        app.EBehaviorType.G_Role_login
      );
    }

    updateAccountInfo() {
      var e = this;
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchAccountInfo', {}, (i, n) => {
        if (i || n.error)
          uiscript.UIMgr.Inst.showNetReqError('fetchAccountInfo', i, n);
        else {
          app.Log.log(`UpdateAccount: ${JSON.stringify(n)}`);
          t.Inst.account_refresh_time = Laya.timer.currTimer;
          t.Inst.account_data[a] = n.account[a];
          for (var a in n.account)
            if (
              ('platform_diamond' == a)
            )
              for (var r = n.account[a], s = 0; s < r.length; s++)
                e.account_numerical_resource[r[s].id] = r[s].count;
          uiscript.UI_Lobby.Inst.refreshInfo();
          n.account.room_id && t.Inst.updateRoom();

          10102 === t.Inst.account_data.level.id &&
            app.PlayerBehaviorStatistic.fb_trace_pending(
              app.EBehaviorType.Level_2,
              1
            );

          10103 === t.Inst.account_data.level.id &&
            app.PlayerBehaviorStatistic.fb_trace_pending(
              app.EBehaviorType.Level_3,
              1
            );
        }
      });
    }

    updateRoom() {
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchRoom', {}, (t, e) => {
        t || e.error
          ? uiscript.UIMgr.Inst.showNetReqError('fetchRoom', t, e)
          : uiscript.UI_WaitingRoom.Inst.updateData(e.room);
      });
    }

    EnterMJ() {
      this._current_scene &&
          this._current_scene.active &&
          (this._current_scene.active = !1);

      this._current_scene = this._scene_mj;
      this._current_scene !== this._scene_mj &&
        ((this._current_scene.active = !0));
    }

    EnterLobby() {
      var t = this;
      this._current_scene && (this._current_scene.active = !1);
      this._current_scene = this._scene_lobby;
      uiscript.UI_Loading.Inst.show('enter_lobby');
      uiscript.UI_Loading.Inst.close();
      this._current_scene !== this._scene_lobby
        ? (this._scene_lobby.buildScene(
        Laya.Handler.create(this, () => {
          uiscript.UI_Loading.Inst.close();
          t._current_scene.active = !0;
          game.Scene_MJ.Inst.load_common_texture2d();
        }),
        Laya.Handler.create(
          this,
          t => uiscript.UI_Loading.Inst.setProgressVal(t),
          null,
          !1
        )
      ))
        : (this._current_scene.active = !0);
    }

    checkPaiPu(t, e, i) {
      var n = this;

      app.Log.log(
        `checkPaiPu game_uuid:${t} account_id:${e.toString()} paipu_config:${i}`
      );

      this.duringPaipu = !0;
      uiscript.UI_Loading.Inst.show('enter_mj');
      this.duringPaipu
        ? app.Log.Error('已经在看牌谱了')
        : (app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchGameRecord',
        { game_uuid: t },
        (t, a) => {
          uiscript.UIMgr.Inst.showNetReqError('fetchGameRecord', t, a);
          uiscript.UI_Loading.Inst.close(null);
          uiscript.UIMgr.Inst.showLobby();
          if (t || a.error)
            n.duringPaipu = !1;
          else {
            uiscript.UI_Loading.Inst.setProgressVal(0.1);
            var r = a.head;
            var s = [null, null, null, null];
            var o = game.Tools.strOfLocalization(2003);
            var l = r.config.mode;
            l.extendinfo && (o = game.Tools.strOfLocalization(2004));

            1 === l.detail_rule.ai_level &&
                (o = game.Tools.strOfLocalization(2003));

            l.detail_rule &&
              l.detail_rule.ai_level &&
              ((2 === l.detail_rule.ai_level && (o = game.Tools.strOfLocalization(2004))));
            for (c = 0; c < r.accounts.length; c++) {
              var h = r.accounts[c];

              h.character = {
                    charid: h.avatar_id,
                    level: 0,
                    exp: 0,
                    views: [],
                    skin: cfg.item_definition.character.get(h.avatar_id)
                      .init_skin,
                    is_upgraded: !1
                  };

              h.avatar_id = h.character.skin;
              h.character
                ? (s[h.seat] = h)
                : (s[h.seat] = h);
            }
            for (var c = 0; c < s.length; c++)
              null == s[c] &&
                (s[c] = {
                  nickname: o,
                  avatar_id: 400101,
                  level: { id: 10101 },
                  level3: { id: 20101 },
                  character: {
                    charid: 200001,
                    level: 0,
                    exp: 0,
                    views: [],
                    skin: 400101,
                    is_upgraded: !1
                  }
                });

            var u = Laya.Handler.create(n, t => {
              game.Scene_Lobby.Inst.active &&
                (game.Scene_Lobby.Inst.active = !1);

              game.Scene_MJ.Inst.openMJRoom(
                r.config,
                s,
                Laya.Handler.create(n, () => {
                  n.duringPaipu = !1;
                  view.DesktopMgr.Inst.initRoom(
                    JSON.parse(JSON.stringify(r.config)),
                    s,
                    e,
                    view.EMJMode.paipu,
                    Laya.Handler.create(n, () => {
                      view.DesktopMgr.Inst.paipu_config = i;
                      uiscript.UI_Replay.Inst.initData(t);
                      uiscript.UI_Replay.Inst.enable = !0;

                      Laya.timer.once(1e3, n, () => {
                        n.EnterMJ();
                      });

                      Laya.timer.once(1500, n, () => {
                        view.DesktopMgr.player_link_state = [
                          view.ELink_State.READY,
                          view.ELink_State.READY,
                          view.ELink_State.READY,
                          view.ELink_State.READY
                        ];

                        uiscript.UI_DesktopInfo.Inst.refreshLinks();
                        uiscript.UI_Loading.Inst.close();
                      });

                      Laya.timer.once(1e3, n, () => {
                        uiscript.UI_Replay.Inst.nextStep(!0);
                      });
                    })
                  );
                }),
                Laya.Handler.create(
                  n,
                  t => uiscript.UI_Loading.Inst.setProgressVal(
                    0.1 + 0.9 * t
                  ),
                  null,
                  !1
                )
              );
            });

            var _ = {};
            _.record = r;
            _.game = net.MessageWrapper.decodeMessage(a.data);
            a.data && a.data.length
              ? (u.runWith(_))
              : game.LoadMgr.httpload(
                  a.data_url,
                  'arraybuffer',
                  !1,
                  Laya.Handler.create(n, ({success, data}) => {
                    uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2005) + a.data_url);
                    uiscript.UI_Loading.Inst.close(null);
                    uiscript.UIMgr.Inst.showLobby();
                    if (success) {
                      var e = new Laya.Byte();
                      e.writeArrayBuffer(data);
                      var i = net.MessageWrapper.decodeMessage(
                        e.getUint8Array(0, e.length)
                      );
                      _.game = i;
                      u.runWith(_);
                    } else n.duringPaipu = !1;
                  })
                );
          }
        }
      ));
    }

    BehavioralStatistics(t, e) {
      void 0 === e && (e = 1);
      var i = t.toString();
      this._statisticinfo.hasOwnProperty[i] || (this._statisticinfo[i] = 0);
      this._statisticinfo[i] += e;
    }

    clientHeatBeat() {
      (Laya.timer.currTimer - this._last_heatbeat_time) / 1e3 > 2400 &&
        game.LobbyNetMgr.Inst.isOK &&
        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'heatbeat',
          { no_operation_counter: 0 },
          () => {}
        );

      this._last_heatbeat_time = Laya.timer.currTimer;
    }

    getHangUpTime() {
      return Laya.timer.currTimer - this._last_heatbeat_time;
    }

    onFatalError(e, i) {
      void 0 === i && (i = !0);
      app.Log.Error('onFatalError');
      var n = {};
      n.timestamp = Math.floor(Date.now() / 1e3);
      n.fatal = !0;
      n.lobby_ip = app.NetAgent.lobby_ip;
      n.mj_ip = app.NetAgent.mj_ip;
      t.Inst && (n.account_id = t.Inst.account_id);
      n.client_version = game.ResourceVersion.version;
      n.device = game.Tools.deviceInfo;
      var a = {};
      a.standardinfo = n;
      a.fatalerror = e;
      t.inRelease && (a.logs = app.Log.getCacheLog());
      if (
        (t.inRelease)
      ) {
        new Laya.HttpRequest().send(
          t.error_url,
          `data=${JSON.stringify(a)}`,
          'post'
        );
      } else app.Log.Error(JSON.stringify(a));
      i && uiscript.UIMgr.Inst.showFE();
    }

    onXiangGongError(e) {
      app.Log.Error('相公了');
      var i = {};
      i.timestamp = Math.floor(Date.now() / 1e3);
      i.type = 'xiangong';
      t.Inst && (i.account_id = t.Inst.account_id);
      i.client_version = game.ResourceVersion.version;
      i.device = game.Tools.deviceInfo;
      t.inRelease && (i.logs = app.Log.getCacheLog());
      i.detail = e;
      if (
        (t.inRelease)
      ) {
        new Laya.HttpRequest().send(
          t.error_url,
          `data=${JSON.stringify(i)}`,
          'post'
        );
      } else app.Log.Error(JSON.stringify(i));
    }

    postInfo2Server(e) {
      if (t.inRelease) {
        new Laya.HttpRequest().send(
          t.error_url,
          `data=${JSON.stringify(e)}`,
          'post'
        );
      } else app.Log.Error(JSON.stringify(e));
    }

    handleWindowError(t, e, i, n, a) {
      return !1;
    }

    load_mjp_view(e) {
      var i = 'mjp_default';
      var n = cfg.item_definition.view.get(e);
      n && (i = n.res_name);
      view.DesktopMgr.en_mjp && (i += '_0');
      this.mjp_item_id = e;
      if (
        (i != this.mjp_view)
      ) {
        var a = 'res/atlas/';
        'chs' != t.client_language && (a += `${t.client_language}/`);

        '' != this.mjp_view &&
          Laya.loader.clearRes(
            `${a}myres2/mjp/${this.mjp_view}/ui.atlas`
          );

        this.mjp_view = i;
        Laya.loader.load([`${a}myres2/mjp/${this.mjp_view}/ui.atlas`]);
      }
    }
  }

  Object.defineProperty(t, 'inRelease', {
    get() {
      return this._inRes;
    },
    enumerable: !0,
    configurable: !0
  });

  Object.defineProperty(t, 'inConch', {
    get() {
      return Laya.Browser.window.conch;
    },
    enumerable: !0,
    configurable: !0
  });

  Object.defineProperty(t, 'iniOSWebview', {
    get() {
      return Laya.Browser.window.wkbridge;
    },
    enumerable: !0,
    configurable: !0
  });

  Object.defineProperty(t, 'inHttps', {
    get() {
      return (
        this.iniOSWebview || 'https:' == Laya.Browser.window.location.protocol
      );
    },
    enumerable: !0,
    configurable: !0
  });

  Object.defineProperty(t, 'inChina', {
    get() {
      return this._in_china;
    },
    enumerable: !0,
    configurable: !0
  });

  Object.defineProperty(t, 'inGooglePlay', {
    get() {
      return this._in_google_play;
    },
    enumerable: !0,
    configurable: !0
  });

  Object.defineProperty(t, 'ClientRegion', {
    get() {
      return this._client_region;
    },
    enumerable: !0,
    configurable: !0
  });

  t.encodeP = t => CryptoJS.HmacSHA256(t, 'lailai').toString();

  t._inRes = !0;
  t.error_url = 'http://47.98.236.52:5031/api/v0/client_report_message';
  t.Inst = null;
  t.config_data = {};
  t.device_id = '';
  t._in_china = !0;
  t._in_google_play = !1;
  t._client_region = 'mainland';
  t.client_language = 'chs';
  return t;
})();
new GameMgr();
