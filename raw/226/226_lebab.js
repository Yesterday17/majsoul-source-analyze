const GameMgr = (() => {
  function t() {
    const e = this;
    (this.stage = null),
      (this.uimgr = null),
      (this.root_ui = null),
      (this.root_scene = null),
      (this.root_front_scene_effect = null),
      (this.root_front_effect = null),
      (this.logined = false),
      (this.link_url = ''),
      (this.account = ''),
      (this.password = ''),
      (this.sociotype = 0),
      (this.player_name = ''),
      (this.access_token = ''),
      (this.account_id = -1),
      (this.account_setting = {}),
      (this.account_data = null),
      (this.account_numerical_resource = null),
      (this.yostar_accessToken = ''),
      (this.player_in_haiwai = false),
      (this.commonview_slot = {}),
      (this.mjp_view = ''),
      (this.mjp_item_id = 0),
      (this.mj_server_location = ''),
      (this.mj_game_token = ''),
      (this.mj_game_uuid = ''),
      (this.ingame = false),
      (this.beinvited_roomid = -1),
      (this.outsee_paipuid = ''),
      (this.custom_match_id = 0),
      (this.account_refresh_time = 0),
      (this._current_scene = null),
      (this._scene_lobby = null),
      (this._scene_mj = null),
      (this.duringPaipu = false),
      (this._statisticinfo = {}),
      (this._last_heatbeat_time = 0),
      (this._pre_mouse_point = new Laya.Point(0, 0)),
      (this._fastin = false),
      (this.comment_allow = 0),
      (this.server_time_delta = 0),
      (this.client_endpoint = null),
      (this._ad_str = ''),
      (this._mail_account = ''),
      (t.Inst = this),
      (t._inRes =
        !!Laya.Browser.window.conch ||
        (!document.getElementById('environment') ||
          'dev' != document.getElementById('environment').innerText)),
      Laya3D.init(1920, 1080, true),
      (Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL),
      Laya.Browser.onMobile
        ? (Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL)
        : (Laya.stage.screenMode = Laya.Stage.SCREEN_NONE),
      (Laya.stage.alignH = Laya.Stage.ALIGN_CENTER),
      (Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE),
      (Laya.stage.bgColor = '#000000'),
      t._inRes || Laya.Stat.show(),
      this.pendinglink()
        ? (Laya.Browser.window.location.href = this.link_url)
        : (Laya.loader.load(
            'client_language.txt',
            Laya.Handler.create(this, () => {
              const i = Laya.loader.getRes('client_language.txt');
              (t.client_language =
                'en' === i ? 'en' : 'jp' === i ? 'jp' : 'chs'),
                e.init(),
                t.iniOSWebview
                  ? Laya.timer.once(500, e, () => {
                      e.load0();
                    })
                  : e.load0();
            })
          ),
          (this._statisticinfo = {}),
          Laya.timer.loop(
            1e4,
            this,
            () => {
              if (
                game.LobbyNetMgr.Inst.connect_state ==
                game.EConnectState.connecting
              ) {
                const t = [];
                for (const i in e._statisticinfo)
                  t.push({ key: parseInt(i), value: e._statisticinfo[i] });
                t.length > 0 && (e._statisticinfo = {});
              }
            },
            null,
            false
          ));
  }
  return Object.defineProperty(t, 'inRelease', {
    get() {
      return this._inRes;
    },
    enumerable: true,
    configurable: true
  }),
  Object.defineProperty(t, 'inConch', {
    get() {
      return Laya.Browser.window.conch;
    },
    enumerable: true,
    configurable: true
  }),
  Object.defineProperty(t, 'iniOSWebview', {
    get() {
      return Laya.Browser.window.wkbridge;
    },
    enumerable: true,
    configurable: true
  }),
  Object.defineProperty(t, 'inHttps', {
    get() {
      return (
        this.iniOSWebview || 'https:' == Laya.Browser.window.location.protocol
      );
    },
    enumerable: true,
    configurable: true
  }),
  Object.defineProperty(t, 'inChina', {
    get() {
      return this._in_china;
    },
    enumerable: true,
    configurable: true
  }),
  Object.defineProperty(t, 'inGooglePlay', {
    get() {
      return this._in_google_play;
    },
    enumerable: true,
    configurable: true
  }),
  Object.defineProperty(t, 'ClientRegion', {
    get() {
      return this._client_region;
    },
    enumerable: true,
    configurable: true
  }),
  (t.encodeP = t => CryptoJS.HmacSHA256(t, 'lailai').toString()),
  (t.prototype.init = function() {
    let e = Laya.LocalStorage.getItem('fpsmode');
    (e && '' != e) ||
      ((e =
        !Laya.Browser.onMobile || t.inConch || t.iniOSWebview
          ? 'fast'
          : 'slow'),
      Laya.LocalStorage.setItem('fpsmode', e)),
      (Laya.stage.frameRate = e);
    let i = Laya.LocalStorage.getItem('dddddcv');
    (i && '' != i) ||
      ((i = game.Tools.generateUUID()),
      Laya.LocalStorage.setItem('dddddcv', i)),
      (t.device_id = i),
      (Laya.Browser.window.onerror = this.handleWindowError),
      (this.root_scene = new Laya.Sprite()),
      (this.root_ui = new Laya.Sprite()),
      (this.root_front_effect = new Laya.Sprite()),
      Laya.stage.addChild(this.root_scene),
      Laya.stage.addChild(this.root_ui),
      Laya.stage.addChild(this.root_front_effect),
      (this.logined = false),
      (this._current_scene = null),
      (this.duringPaipu = false),
      (this._scene_lobby = new game.Scene_Lobby()),
      (this._scene_mj = new game.Scene_MJ()),
      view.AudioMgr.init();
    const n = Laya.LocalStorage.getItem('click_prefer');
    view.DesktopMgr.click_prefer = n && '1' == n ? 1 : 0;
    const a = Laya.LocalStorage.getItem('double_click_pass');
    if (
      ((view.DesktopMgr.double_click_pass = a && '1' == a ? 1 : 0),
      'en' == t.client_language)
    ) {
      view.DesktopMgr.en_mjp = true;
      'false' == game.LocalStorage.getItem('en_mjp') &&
        (view.DesktopMgr.en_mjp = false);
    } else view.DesktopMgr.en_mjp = false;
    const r = Laya.LocalStorage.getItem('_pre_room');
    if (
      (r && '' != r && (this.beinvited_roomid = parseInt(r)),
      (this.outsee_paipuid = Laya.LocalStorage.getItem('_pre_paipu')),
      this.outsee_paipuid || (this.outsee_paipuid = ''),
      this.trasform_storage(),
      Laya.Browser.window.conch)
    ) {
      const s = Laya.PlatformClass.createClass('layaair.majsoul.mjmgr');
      const o = s.newObject();
      o.callWithBack(function(t) {
        const e = JSON.parse(t);
        e.type &&
          ((this._fastin = true),
          Laya.LocalStorage.setItem('_pre_sociotype', e.type),
          Laya.LocalStorage.setItem('_pre_code', e.code)),
          Laya.LocalStorage.setItem('_pre_st', '');
      }, 'getSocioCode'),
        s.call('clearSocioCode'),
        s.call('initWXPay', 'wxa81767d38cb2f4ff'),
        o.callWithBack(e => {
          (t._in_china = true),
            'ingoogleplay' == e &&
              ((t._in_google_play = true), (t._in_china = false));
        }, 'getAppConfig');
    }
  }),
  (t.prototype.trasform_storage = function() {
    (t = Laya.LocalStorage.getItem('_pre_st')) &&
      '' != t &&
      ((this._fastin = true),
      Laya.LocalStorage.setItem('_pre_sociotype', t),
      Laya.LocalStorage.setItem('_pre_st', ''));
    (t = Laya.LocalStorage.getItem('_pre_xdsfdl')) &&
      '' != t &&
      ((this._fastin = true),
      Laya.LocalStorage.setItem('_pre_sociotype', t),
      Laya.LocalStorage.setItem('_pre_xdsfdl', ''));
    (t = Laya.LocalStorage.getItem('_pre_uid')) &&
      '' != t &&
      (game.LocalStorage.setItem('yostar_uid', t),
      Laya.LocalStorage.removeItem('_pre_uid'));
    var t = Laya.LocalStorage.getItem('_pre_token');
    t &&
      '' != t &&
      (game.LocalStorage.setItem('yostar_token', t),
      Laya.LocalStorage.removeItem('_pre_token'));
    const e = Laya.LocalStorage.getItem('_pre_state');
    !e ||
      '' == e ||
      ('xdsfdl3' != e && 'xdsfdl4' != e) ||
      ((this._fastin = true),
      Laya.LocalStorage.setItem('_pre_sociotype', '3'),
      Laya.LocalStorage.setItem('_pre_st', '')),
      Laya.LocalStorage.setItem('_pre_state', '');
  }),
  (t.prototype.load0 = function() {
    const e = this;
    window && window.conch && window.loadingView.loading(30),
      t.iniOSWebview &&
        Laya.Browser.window.wkbridge.callNative &&
        Laya.Browser.window.wkbridge.callNative(
          'setloadrate',
          '30',
          () => {}
        );
    const i = () => {
      game.ResourceVersion.init(
        Laya.Handler.create(e, () => {
          window && window.conch && window.loadingView.loading(40),
            t.iniOSWebview &&
              Laya.Browser.window.wkbridge.callNative(
                'setloadrate',
                '40',
                () => {}
              );
          let i = 'res/atlas/bitmapfont.atlas';
          'jp' == t.client_language
            ? (i = 'res/atlas/bitmapfont/jp.atlas')
            : 'en' == t.client_language &&
              (i = 'res/atlas/bitmapfont/en.atlas'),
            Laya.loader.create(
              i,
              Laya.Handler.create(e, () => {
                let i = [];
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
                let n = 0;

                const a = () => {
                  n++,
                    window &&
                      window.conch &&
                      window.loadingView.loading(
                        Math.floor(40 + (n / i.length) * 20)
                      ),
                    t.iniOSWebview &&
                      Laya.Browser.window.wkbridge.callNative(
                        'setloadrate',
                        Math.floor(40 + (n / i.length) * 20).toString(),
                        () => {}
                      ),
                    n == i.length && Laya.timer.frameOnce(2, e, e.load1);
                };

                if ('chs' == t.client_language)
                  for (
                    var r = t => {
                        const n = new Laya.BitmapFont();
                        n.loadFont(
                          `bitmapfont/${i[t]}.fnt`,
                          Laya.Handler.create(e, () => {
                            n.setSpaceWidth(10),
                              Laya.Text.registerBitmapFont(i[t], n),
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
                    const o = n => {
                              const r = new Laya.BitmapFont();
                              r.loadFont(
                                `bitmapfont/${t.client_language}/${i[n]}.fnt`,
                                Laya.Handler.create(e, () => {
                                  r.setSpaceWidth(10),
                                    Laya.Text.registerBitmapFont(i[n], r),
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
    if ('chs' == t.client_language) {
      let n = '';
      (n = t.inConch ? '../../../region/region.txt' : '../region/region.txt'),
        Laya.loader.load(
          n,
          Laya.Handler.create(this, () => {
            const e = Laya.loader.getRes(n);
            (t._client_region = e && 'hk' === e ? 'hk' : 'mainland'), i();
          })
        );
    } else (t._client_region = 'mainland'), i();
  }),
  (t.prototype.load1 = function() {
    const e = this;
    game.LoadMgr.httpload(
      'config.json',
      'json',
      false,
      Laya.Handler.create(this, ({success, data}) => {
        if (
          (window && window.conch && window.loadingView.loading(70),
          t.iniOSWebview &&
            Laya.Browser.window.wkbridge.callNative(
              'setloadrate',
              '70',
              () => {}
            ),
          success)
        ) {
          const n = data;
          (t.config_data = n),
            Laya.loader.load(
              'res/proto/liqi.json',
              new Laya.Handler(e, () => {
                window && window.conch && window.loadingView.loading(80),
                  t.iniOSWebview &&
                    Laya.Browser.window.wkbridge.callNative(
                      'setloadrate',
                      '80',
                      () => {}
                    );
                const i = Laya.loader.getRes('res/proto/liqi.json');
                if (i) {
                  net.ProtobufManager.loadProto(i),
                    net.MessageWrapper.initWrapper(),
                    app.NetAgent.init(),
                    window && window.conch && window.loadingView.loading(85),
                    t.iniOSWebview &&
                      Laya.Browser.window.wkbridge.callNative(
                        'setloadrate',
                        '85',
                        () => {}
                      );
                  let n = '';
                  (n = `uiconfig/ui_${t.client_language}.json`),
                    'chs' != t.client_language && e.loadUStarLogin(),
                    Laya.loader.load(
                      n,
                      Laya.Handler.create(e, () => {
                        const i = Laya.loader.getRes(n);
                        (Laya.View.uiMap = i),
                          new caps.ShaderInitor().init(
                            Laya.Handler.create(e, () => {
                              window &&
                                window.conch &&
                                window.loadingView.loading(100),
                                t.iniOSWebview &&
                                  Laya.Browser.window.wkbridge.callNative(
                                    'setloadrate',
                                    '100',
                                    () => {}
                                  ),
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
  }),
  (t.prototype.loadUStarLogin = () => {
    const e = document.createElement('script');
    e.src = `${t.config_data.yo_service_url}/js/${t.config_data.yo_sdk_js}`;
    const i = document.getElementsByTagName('script')[0];
    i.parentNode.insertBefore(e, i);
  }),
  (t.prototype.loadExcel = function(t) {
    const e = this;
    Laya.loader.load(
      'res/proto/config.proto',
      new Laya.Handler(this, () => {
        uiscript.UI_Remind.Inst && uiscript.UI_Remind.Inst.setprocess(1);
        Laya.loader.load(
          'res/config/lqc.lqbin',
          new Laya.Handler(e, () => {
            uiscript.UI_Remind.Inst && uiscript.UI_Remind.Inst.setprocess(2);
            const e = Laya.loader.getRes('res/proto/config.proto');
            if (e) {
              uiscript.UI_Remind.Inst &&
                uiscript.UI_Remind.Inst.setprocess(3);
              const i = Laya.loader.getRes('res/config/lqc.lqbin');
              if (i) {
                uiscript.UI_Remind.Inst &&
                  uiscript.UI_Remind.Inst.setprocess(4);
                const n = new Laya.Byte();
                n.writeArrayBuffer(i);
                const a = new bin.BinParser();
                a.parseSync(e, n.getUint8Array(0, n.length)),
                  uiscript.UI_Remind.Inst &&
                    uiscript.UI_Remind.Inst.setprocess(5);
                const r = new bin.TSDataFormat(
                  a.exportSchema(),
                  a.exportData()
                );
                cfg.load(r.toFormat()),
                  uiscript.UI_Remind.Inst &&
                    uiscript.UI_Remind.Inst.setprocess(6),
                  t && t.run();
              } else console.error('load bincontent failed: bindata is null');
            } else console.error('load configProto failed: configProto is null');
          }),
          null,
          Laya.Loader.BUFFER
        );
      })
    );
  }),
  (t.prototype.pendinglink = function() {
    let e = '';
    document.getElementById('game_link') &&
      (e = document.getElementById('game_link').innerText),
      e && (this.link_url = e),
      t.inConch && (this.link_url = 'https://majsoul.union-game.com/0/');
    let i = Laya.Browser.window.location.href;
    const n = {};
    if (i) {
      i.indexOf('#') > 0 && (i = i.substr(0, i.indexOf('#')));
      let a = i.indexOf('?');
      if (a >= 0) {
        e || (this.link_url = i.substr(0, a));
        for (
          let r = i.substring(a + 1, i.length), s = (r = (r = r.replace('#_=_', '')).replace('#', '')).split('&'), o = 0;
          o < s.length;
          o++
        )
          if ((a = s[o].indexOf('=')) > 0) {
            const l = s[o].substring(0, a);
            const h = s[o].substring(a + 1, s[o].length);
            n[l] = h;
          }
      } else (this.beinvited_roomid = -1), (this.outsee_paipuid = '');
      e ||
        (this.link_url.includes('index.html') &&
          (this.link_url = this.link_url.substr(
            0,
            this.link_url.indexOf('index.html')
          )),
        '/' != this.link_url.charAt(this.link_url.length - 1) &&
          (this.link_url += '/'));
    }
    let c = false;
    let u = '';
    for (const _ in n)
      'mv_' == _.substr(0, 3) ||
        ('utm_' == _.substr(0, 4)
          ? ('' != u && (u += '&'), (u += `${_}=${n[_]}`))
          : Laya.LocalStorage.setItem(`_pre_${_}`, n[_])),
        (c = true);
    return (
      u &&
        (Laya.LocalStorage.setItem('__ad_s', u),
        Laya.LocalStorage.setItem('__ad_t', Date.now().toString())),
      c
    );
  }),
  (t.prototype.addScene = function(t) {
    this.root_scene.addChild(t);
  }),
  (t.prototype.addUI = function(t) {
    this.root_ui.addChild(t);
  }),
  (t.prototype.initUIRoot = function() {
    if (
      ((this.uimgr = new uiscript.UIMgr()), this.uimgr.init(), t.iniOSWebview)
    ) {
      const e = this;
      Laya.Browser.window.wkbridge.callNative('getappversion', '', t => {
        game.LoadMgr.httpload(
          'iOSver',
          'text',
          false,
          Laya.Handler.create(e, ({success, data}) => {
            Laya.Browser.window.wkbridge.callNative(
              'closeloadview',
              '',
              () => {}
            ),
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
  }),
  (t.prototype.showEntrance = function() {
    const e = this;
    uiscript.UI_ChooseServer.show(
      Laya.Handler.create(this, () => {
        if (e._fastin)
          e.loadExcel(
            Laya.Handler.create(e, () => {
              game.LoadMgr.loadRes(
                game.E_LoadType.entrance,
                Laya.Handler.create(e, () => {
                  e.uimgr.showEntrance(),
                    game.LoadMgr.loadConfig(),
                    e._scene_lobby.init(null);
                })
              );
            })
          );
        else {
          const i =
            `res/atlas${'chs' == t.client_language ? '' : `/${t.client_language}`}/myres/start_show.atlas`;
          Laya.loader.create(
            i,
            Laya.Handler.create(e, () => {
              e.uimgr.showRemind();
              const t = Laya.timer.currTimer;
              e.loadExcel(
                Laya.Handler.create(e, () => {
                  uiscript.UI_Remind.Inst &&
                    uiscript.UI_Remind.Inst.setprocess(7),
                    game.LoadMgr.loadRes(
                      game.E_LoadType.entrance,
                      Laya.Handler.create(e, () => {
                        uiscript.UI_Remind.Inst &&
                          uiscript.UI_Remind.Inst.setprocess(8);
                        let i = t + 3e3 - Laya.timer.currTimer;
                        i <= 60 && (i = 60),
                          Laya.timer.once(i, e, () => {
                            uiscript.UI_Remind.Inst &&
                              uiscript.UI_Remind.Inst.setprocess(9),
                              e.uimgr.showEntrance(),
                              game.LoadMgr.loadConfig(),
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
  }),
  (t.prototype.fetch_login_info = function() {
    const t = this;
    game.FriendMgr.init(),
      uiscript.UI_Mail.Init(),
      uiscript.UI_Activity_Xuanshang.Init(),
      uiscript.UI_Activity_Jiuji.Init(),
      uiscript.UI_TitleBook.Init(),
      uiscript.UI_Bag.init(),
      uiscript.UI_Shop.init(),
      uiscript.UI_Activity.init(),
      uiscript.UI_Recharge.init(),
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchCommentSetting', {}, (e, i) => {
        e || i.error
          ? uiscript.UIMgr.Inst.showNetReqError('fetchCommentSetting', e, i)
          : (t.comment_allow = i.comment_allow);
      }),
      (this.commonview_slot = {}),
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchCommonView', {}, (e, i) => {
        if (e || i.error)
          uiscript.UIMgr.Inst.showNetReqError('fetchCommonView', e, i);
        else {
          if (i.slots)
            for (let n = 0; n < i.slots.length; n++)
              t.commonview_slot[i.slots[n].slot] = i.slots[n].value;
          let a = 0;
          t.commonview_slot.hasOwnProperty(game.ECommonView.mjp.toString()) &&
            (a = t.commonview_slot[game.ECommonView.mjp.toString()]),
            t.load_mjp_view(a);
        }
      }),
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchAccountSettings',
        {},
        (e, {error, settings}) => {
          if (e || error);
          else if (((t.account_setting = []), settings))
            for (let n = 0; n < settings.length; n++)
              t.account_setting[settings[n].key] = settings[n].value;
        }
      ),
      (this.last_mod_name_time = 0),
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchModNicknameTime',
        {},
        (e, {error, last_mod_time}) => {
          e ||
            error ||
            (last_mod_time && (t.last_mod_name_time = last_mod_time));
        }
      ),
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchMisc', {}, (t, {error, recharged_list, faiths}) => {
        if (t || error)
          cfg.mall.goods.forEach(({cny}) => {
            uiscript.UI_Recharge.new_recharge_list[cny] = 1;
          });
        else {
          if (recharged_list)
            for (let i = 0; i < recharged_list.length; i++)
              uiscript.UI_Recharge.new_recharge_list[recharged_list[i]] = 1;
          faiths && uiscript.UI_Treasure.on_chest_count_change(faiths);
        }
      }),
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchIDCardInfo', {}, (e, {error, country, is_authed}) => {
        e || error
          ? (uiscript.UI_ShiMingRenZheng.renzhenged = false)
          : 'CN' == country
          ? ((t.player_in_haiwai = false),
            (uiscript.UI_ShiMingRenZheng.renzhenged = is_authed))
          : ((t.player_in_haiwai = true),
            (uiscript.UI_ShiMingRenZheng.renzhenged = is_authed));
      });
  }),
  (t.prototype.gameInit = function() {
    const t = this;
    view.BgmListMgr.init(),
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchServerTime', {}, (e, i) => {
        e || i.error
          ? uiscript.UIMgr.Inst.showNetReqError('fetchServerTime', e, i)
          : (t.server_time_delta =
              1e3 * i.server_time - Laya.timer.currTimer);
      }),
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchServerSettings', {}, (t, e) => {
        if (t || e.error)
          uiscript.UIMgr.Inst.showNetReqError('fetchServerSettings', t, e);
        else if (
          (app.Log.log(`fetchServerSettings: ${JSON.stringify(e)}`),
          (uiscript.UI_Recharge.open_payment = false),
          (uiscript.UI_Recharge.payment_info = ''),
          (uiscript.UI_Recharge.open_wx = true),
          (uiscript.UI_Recharge.wx_type = 0),
          (uiscript.UI_Recharge.open_alipay = true),
          (uiscript.UI_Recharge.alipay_type = 0),
          e.settings && e.settings.payment_setting)
        ) {
          const i = e.settings.payment_setting;
          i.open_payment && (uiscript.UI_Recharge.open_payment = true),
            null != i.payment_info_show_type &&
              (uiscript.UI_Recharge.payment_info_show_type =
                i.payment_info_show_type),
            null != i.payment_info &&
              (uiscript.UI_Recharge.payment_info = i.payment_info),
            i.wechat &&
              (i.wechat.disable_create && (uiscript.UI_Recharge.open_wx = false),
              null != i.wechat.payment_source_platform &&
                (uiscript.UI_Recharge.wx_type =
                  i.wechat.payment_source_platform)),
            i.alipay &&
              (i.alipay.disable_create &&
                (uiscript.UI_Recharge.open_alipay = false),
              null != i.alipay.payment_source_platform &&
                (uiscript.UI_Recharge.alipay_type =
                  i.alipay.payment_source_platform));
        }
      }),
      app.NetAgent.sendReq2Lobby('Lobby', 'fetchConnectionInfo', {}, (e, {error, client_endpoint}) => {
        e || error || (t.client_endpoint = client_endpoint);
      }),
      app.PlayerBehaviorStatistic.init(),
      this.account_data.nickname && this.fetch_login_info(),
      uiscript.UI_Info.Init(),
      app.NetAgent.AddListener2Lobby(
        'NotifyAccountUpdate',
        Laya.Handler.create(
          this,
          e => {
            app.Log.log(`NotifyAccountUpdate :${JSON.stringify(e)}`);
            const i = e.update;
            if (i) {
              if (i.numerical)
                for (let n = 0; n < i.numerical.length; n++) {
                  const a = i.numerical[n].id;
                  const r = i.numerical[n].final;
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
              uiscript.UI_Sushe.on_data_updata(i),
                i.daily_task &&
                  uiscript.UI_Activity_Xuanshang.dataUpdate(i.daily_task),
                i.title && uiscript.UI_TitleBook.addTitle(i.title),
                i.new_recharged_list &&
                  uiscript.UI_Recharge.on_new_recharge_refresh(i),
                i.activity_task && uiscript.UI_Activity.accountUpdate(i);
            }
          },
          null,
          false
        )
      ),
      app.NetAgent.AddListener2Lobby(
        'NotifyAnotherLogin',
        Laya.Handler.create(this, t => {
          uiscript.UI_AnotherLogin.Inst.show();
        })
      ),
      app.NetAgent.AddListener2Lobby(
        'NotifyAccountLogout',
        Laya.Handler.create(this, t => {
          uiscript.UI_Hanguplogout.Inst.show();
        })
      ),
      app.NetAgent.AddListener2Lobby(
        'NotifyClientMessage',
        Laya.Handler.create(this, t => {
          app.Log.log(`收到消息：${JSON.stringify(t)}`),
            t.type == game.EFriendMsgType.room_invite &&
              uiscript.UI_Invite.onNewInvite(t.content);
        })
      ),
      app.NetAgent.AddListener2Lobby(
        'NotifyServerSetting',
        Laya.Handler.create(this, ({settings}) => {
          if (
            ((uiscript.UI_Recharge.open_payment = false),
            (uiscript.UI_Recharge.payment_info = ''),
            (uiscript.UI_Recharge.open_wx = true),
            (uiscript.UI_Recharge.wx_type = 0),
            (uiscript.UI_Recharge.open_alipay = true),
            (uiscript.UI_Recharge.alipay_type = 0),
            settings && settings.payment_setting)
          ) {
            const e = settings.payment_setting;
            e.open_payment && (uiscript.UI_Recharge.open_payment = true),
              null != e.payment_info_show_type &&
                (uiscript.UI_Recharge.payment_info_show_type =
                  e.payment_info_show_type),
              null != e.payment_info &&
                (uiscript.UI_Recharge.payment_info = e.payment_info),
              e.wechat &&
                (e.wechat.disable_create &&
                  (uiscript.UI_Recharge.open_wx = false),
                null != e.wechat.payment_source_platform &&
                  (uiscript.UI_Recharge.wx_type =
                    e.wechat.payment_source_platform)),
              e.alipay &&
                (e.alipay.disable_create &&
                  (uiscript.UI_Recharge.open_alipay = false),
                null != e.alipay.payment_source_platform &&
                  (uiscript.UI_Recharge.alipay_type =
                    e.alipay.payment_source_platform));
          }
        })
      ),
      app.NetAgent.AddListener2Lobby(
        'NotifyVipLevelChange',
        Laya.Handler.create(this, t => {
          (uiscript.UI_Sushe.send_gift_limit = t.gift_limit),
            (game.FriendMgr.friend_max_count = t.friend_max_count),
            (uiscript.UI_Shop.shopinfo.zhp.free_refresh.limit =
              t.zhp_free_refresh_limit),
            (uiscript.UI_Shop.shopinfo.zhp.cost_refresh.limit =
              t.zhp_cost_refresh_limit),
            (uiscript.UI_PaiPu.collect_limit = t.record_collect_limit);
        })
      ),
      Laya.timer.loop(36e4, this, () => {
        if (game.LobbyNetMgr.Inst.isOK) {
          const e = (Laya.timer.currTimer - t._last_heatbeat_time) / 1e3;
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'heatbeat',
            { no_operation_counter: e },
            () => {}
          ),
            e >= 3e3 && uiscript.UI_Hanguplogout.Inst.show();
        }
      }),
      Laya.timer.loop(1e3, this, () => {
        const e = Laya.stage.getMousePoint();
        (e.x == t._pre_mouse_point.x && e.y == t._pre_mouse_point.y) ||
          (t.clientHeatBeat(),
          (t._pre_mouse_point.x = e.x),
          (t._pre_mouse_point.y = e.y));
      }),
      Laya.timer.loop(1e3, this, () => {
        Laya.LocalStorage.setItem(
          'dolllt',
          game.Tools.currentTime.toString()
        );
      });
  }),
  (t.prototype.afterLogin = function() {
    const e = this;
    this.gameInit(), (this.logined = true);
    Laya.LocalStorage.setItem('_pre_room', ''),
      Laya.LocalStorage.setItem('_pre_paipu', ''),
      (t.Inst.account_data.nickname && '' != t.Inst.account_data.nickname) ||
        uiscript.UI_XinShouYinDao.pre_load(),
      this._scene_lobby.addLoadListenter(
        Laya.Handler.create(this, () => {
          game.FrontEffect.init(),
            uiscript.UI_Sushe.init(
              Laya.Handler.create(e, () => {
                uiscript.UI_Loading.Inst.setProgressVal(1),
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
          false
        )
      ),
      app.PlayerBehaviorStatistic.google_trace_force(
        app.EBehaviorType.G_Role_login
      );
  }),
  (t.prototype.updateAccountInfo = function() {
    const e = this;
    app.NetAgent.sendReq2Lobby('Lobby', 'fetchAccountInfo', {}, (i, n) => {
      if (i || n.error)
        uiscript.UIMgr.Inst.showNetReqError('fetchAccountInfo', i, n);
      else {
        app.Log.log(`UpdateAccount: ${JSON.stringify(n)}`),
          (t.Inst.account_refresh_time = Laya.timer.currTimer);
        for (const a in n.account)
          if (
            ((t.Inst.account_data[a] = n.account[a]), 'platform_diamond' == a)
          )
            for (let r = n.account[a], s = 0; s < r.length; s++)
              e.account_numerical_resource[r[s].id] = r[s].count;
        uiscript.UI_Lobby.Inst.refreshInfo(),
          n.account.room_id && t.Inst.updateRoom(),
          10102 === t.Inst.account_data.level.id &&
            app.PlayerBehaviorStatistic.fb_trace_pending(
              app.EBehaviorType.Level_2,
              1
            ),
          10103 === t.Inst.account_data.level.id &&
            app.PlayerBehaviorStatistic.fb_trace_pending(
              app.EBehaviorType.Level_3,
              1
            );
      }
    });
  }),
  (t.prototype.updateRoom = () => {
    app.NetAgent.sendReq2Lobby('Lobby', 'fetchRoom', {}, (t, e) => {
      t || e.error
        ? uiscript.UIMgr.Inst.showNetReqError('fetchRoom', t, e)
        : uiscript.UI_WaitingRoom.Inst.updateData(e.room);
    });
  }),
  (t.prototype.EnterMJ = function() {
    this._current_scene !== this._scene_mj &&
      (this._current_scene &&
        this._current_scene.active &&
        (this._current_scene.active = false),
      (this._current_scene = this._scene_mj),
      (this._current_scene.active = true));
  }),
  (t.prototype.EnterLobby = function() {
    const t = this;
    this._current_scene !== this._scene_lobby
      ? (this._current_scene && (this._current_scene.active = false),
        (this._current_scene = this._scene_lobby),
        uiscript.UI_Loading.Inst.show('enter_lobby'),
        this._scene_lobby.buildScene(
          Laya.Handler.create(this, () => {
            uiscript.UI_Loading.Inst.close(),
              (t._current_scene.active = true),
              game.Scene_MJ.Inst.load_common_texture2d();
          }),
          Laya.Handler.create(
            this,
            t => uiscript.UI_Loading.Inst.setProgressVal(t),
            null,
            false
          )
        ))
      : (uiscript.UI_Loading.Inst.close(), (this._current_scene.active = true));
  }),
  (t.prototype.checkPaiPu = function(t, e, i) {
    const n = this;
    app.Log.log(
      `checkPaiPu game_uuid:${t} account_id:${e.toString()} paipu_config:${i}`
    ),
      this.duringPaipu
        ? app.Log.Error('已经在看牌谱了')
        : ((this.duringPaipu = true),
          uiscript.UI_Loading.Inst.show('enter_mj'),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchGameRecord',
            { game_uuid: t },
            (t, a) => {
              if (t || a.error)
                uiscript.UIMgr.Inst.showNetReqError('fetchGameRecord', t, a),
                  uiscript.UI_Loading.Inst.close(null),
                  uiscript.UIMgr.Inst.showLobby(),
                  (n.duringPaipu = false);
              else {
                uiscript.UI_Loading.Inst.setProgressVal(0.1);
                const r = a.head;
                const s = [null, null, null, null];
                let o = game.Tools.strOfLocalization(2003);
                const l = r.config.mode;
                l.extendinfo && (o = game.Tools.strOfLocalization(2004)),
                  l.detail_rule &&
                    l.detail_rule.ai_level &&
                    (1 === l.detail_rule.ai_level &&
                      (o = game.Tools.strOfLocalization(2003)),
                    2 === l.detail_rule.ai_level &&
                      (o = game.Tools.strOfLocalization(2004)));
                for (c = 0; c < r.accounts.length; c++) {
                  const h = r.accounts[c];
                  h.character
                    ? (s[h.seat] = h)
                    : ((h.character = {
                        charid: h.avatar_id,
                        level: 0,
                        exp: 0,
                        views: [],
                        skin: cfg.item_definition.character.get(h.avatar_id)
                          .init_skin,
                        is_upgraded: false
                      }),
                      (h.avatar_id = h.character.skin),
                      (s[h.seat] = h));
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
                        is_upgraded: false
                      }
                    });

                const u = Laya.Handler.create(n, t => {
                    game.Scene_Lobby.Inst.active &&
                      (game.Scene_Lobby.Inst.active = false),
                      game.Scene_MJ.Inst.openMJRoom(
                        s,
                        Laya.Handler.create(n, () => {
                          (n.duringPaipu = false),
                            view.DesktopMgr.Inst.initRoom(
                              JSON.parse(JSON.stringify(r.config)),
                              s,
                              e,
                              view.EMJMode.paipu,
                              Laya.Handler.create(n, () => {
                                (view.DesktopMgr.Inst.paipu_config = i),
                                  uiscript.UI_Replay.Inst.initData(t),
                                  (uiscript.UI_Replay.Inst.enable = true),
                                  Laya.timer.once(1e3, n, () => {
                                    n.EnterMJ();
                                  }),
                                  Laya.timer.once(1500, n, () => {
                                    (view.DesktopMgr.player_link_state = [
                                      view.ELink_State.READY,
                                      view.ELink_State.READY,
                                      view.ELink_State.READY,
                                      view.ELink_State.READY
                                    ]),
                                      uiscript.UI_DesktopInfo.Inst.refreshLinks(),
                                      uiscript.UI_Loading.Inst.close();
                                  }),
                                  Laya.timer.once(1e3, n, () => {
                                    uiscript.UI_Replay.Inst.nextStep(true);
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
                          false
                        )
                      );
                  });

                const _ = {};
                (_.record = r),
                  a.data && a.data.length
                    ? ((_.game = net.MessageWrapper.decodeMessage(a.data)),
                      u.runWith(_))
                    : game.LoadMgr.httpload(
                        a.data_url,
                        'arraybuffer',
                        false,
                        Laya.Handler.create(n, ({success, data}) => {
                          if (success) {
                            const e = new Laya.Byte();
                            e.writeArrayBuffer(data);
                            const i = net.MessageWrapper.decodeMessage(
                              e.getUint8Array(0, e.length)
                            );
                            (_.game = i), u.runWith(_);
                          } else uiscript.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2005) + a.data_url), uiscript.UI_Loading.Inst.close(null), uiscript.UIMgr.Inst.showLobby(), (n.duringPaipu = false);
                        })
                      );
              }
            }
          ));
  }),
  (t.prototype.BehavioralStatistics = function(t, e) {
    undefined === e && (e = 1);
    const i = t.toString();
    this._statisticinfo.hasOwnProperty[i] || (this._statisticinfo[i] = 0),
      (this._statisticinfo[i] += e);
  }),
  (t.prototype.clientHeatBeat = function() {
    (Laya.timer.currTimer - this._last_heatbeat_time) / 1e3 > 2400 &&
      game.LobbyNetMgr.Inst.isOK &&
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'heatbeat',
        { no_operation_counter: 0 },
        () => {}
      ),
      (this._last_heatbeat_time = Laya.timer.currTimer);
  }),
  (t.prototype.getHangUpTime = function() {
    return Laya.timer.currTimer - this._last_heatbeat_time;
  }),
  (t.prototype.onFatalError = (e, i) => {
    undefined === i && (i = true), app.Log.Error('onFatalError');
    const n = {};
    (n.timestamp = Math.floor(Date.now() / 1e3)),
      (n.fatal = true),
      (n.lobby_ip = app.NetAgent.lobby_ip),
      (n.mj_ip = app.NetAgent.mj_ip),
      t.Inst && (n.account_id = t.Inst.account_id),
      (n.client_version = game.ResourceVersion.version),
      (n.device = game.Tools.deviceInfo);
    const a = {};
    if (
      ((a.standardinfo = n),
      (a.fatalerror = e),
      t.inRelease && (a.logs = app.Log.getCacheLog()),
      t.inRelease)
    ) {
      new Laya.HttpRequest().send(
        t.error_url,
        `data=${JSON.stringify(a)}`,
        'post'
      );
    } else app.Log.Error(JSON.stringify(a));
    i && uiscript.UIMgr.Inst.showFE();
  }),
  (t.prototype.onXiangGongError = e => {
    app.Log.Error('相公了');
    const i = {};
    if (
      ((i.timestamp = Math.floor(Date.now() / 1e3)),
      (i.type = 'xiangong'),
      t.Inst && (i.account_id = t.Inst.account_id),
      (i.client_version = game.ResourceVersion.version),
      (i.device = game.Tools.deviceInfo),
      t.inRelease && (i.logs = app.Log.getCacheLog()),
      (i.detail = e),
      t.inRelease)
    ) {
      new Laya.HttpRequest().send(
        t.error_url,
        `data=${JSON.stringify(i)}`,
        'post'
      );
    } else app.Log.Error(JSON.stringify(i));
  }),
  (t.prototype.postInfo2Server = e => {
    if (t.inRelease) {
      new Laya.HttpRequest().send(
        t.error_url,
        `data=${JSON.stringify(e)}`,
        'post'
      );
    } else app.Log.Error(JSON.stringify(e));
  }),
  (t.prototype.handleWindowError = (t, e, i, n, a) => false),
  (t.prototype.load_mjp_view = function(e) {
    let i = 'mjp_default';
    const n = cfg.item_definition.view.get(e);
    if (
      (n && (i = n.res_name),
      view.DesktopMgr.en_mjp && (i += '_0'),
      (this.mjp_item_id = e),
      i != this.mjp_view)
    ) {
      let a = 'res/atlas/';
      'chs' != t.client_language && (a += `${t.client_language}/`),
        '' != this.mjp_view &&
          Laya.loader.clearRes(
            `${a}myres2/mjp/${this.mjp_view}/ui.atlas`
          ),
        (this.mjp_view = i),
        Laya.loader.load([`${a}myres2/mjp/${this.mjp_view}/ui.atlas`]);
    }
  }),
  (t._inRes = true),
  (t.error_url = 'http://47.98.236.52:5031/api/v0/client_report_message'),
  (t.Inst = null),
  (t.config_data = {}),
  (t.device_id = ''),
  (t._in_china = true),
  (t._in_google_play = false),
  (t._client_region = 'mainland'),
  (t.client_language = 'chs'),
  t
;
})();
new GameMgr();
