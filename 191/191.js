var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (() => {
    function e(t) {
      var e = this;
      this.locking = !1;
      this.datas = [];
      this.me = t;
      this.root = t.getChildByName('root_chs');
      this.root = t.getChildByName('root_en');

      'chs' == GameMgr.client_language
        ? (t.getChildByName('root_en').visible = !1)
        : (t.getChildByName('root_chs').visible = !1);

      this.scrollview = this.root.getChildByName(
          'container_infos'
        ).scriptMap['capsui.CScrollView'];

      this.scrollview.init_scrollview(
        new Laya.Handler(this, this.render_item)
      );

      this.light_scrollbar = this.root
          .getChildByName('container_infos')
          .getChildByName('light_scrollbar');

      this.scrollpoint = this.light_scrollbar.getChildByName(
          'scrollpoint'
        );

      this.scrollview.me.on('ratechange', this, () => {
        e.refresh_scorllbar();
      });

      this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          !1
        );

      this.root.getChildByName(
          'btn_close1'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          !1
        );
    }

    e.prototype.show = function(e) {
      var i = this;
      e = JSON.parse(JSON.stringify(e));
      this.locking = !0;
      this.me.visible = !0;

      t.UIBase.anim_pop_out(
        this.root,
        Laya.Handler.create(this, () => {
          i.locking = !1;
        })
      );

      this.scrollview.reset();
      this.datas = [];
      this.datas.push({
        name: game.Tools.strOfLocalization(2087),
        infos: [game.Tools.room_mode_desc(e.mode)],
        isdefault: [!0]
      });
      var n = e.mode < 10,
        a = e.detail_rule,
        r = null != a.time_fixed ? a.time_fixed : 5,
        s = null != a.time_add ? a.time_add : 20;

      this.datas.push({
          name: game.Tools.strOfLocalization(2088),
          infos: [
            `${r.toString()}+${s.toString()}${game.Tools.strOfLocalization(2019)}`
          ],
          isdefault: [!0]
        });

      if (
        (n)
      ) {
        o = '3';
        if (null != a.dora_count)
          switch (a.dora_count) {
            case 0:
              o = '0';
              break;
            case 3:
              o = '3';
              break;
            case 4:
              o = '4';
          }
        this.datas.push({
          name: game.Tools.strOfLocalization(2089),
          infos: [o],
          isdefault: ['3' === o]
        });
      } else {
        var o = '2';
        if (null != a.dora_count)
          switch (a.dora_count) {
            case 0:
              o = '0';
              break;
            case 2:
              o = '2';
          }
        this.datas.push({
          name: game.Tools.strOfLocalization(2089),
          infos: [o],
          isdefault: ['2' === o]
        });
      }
      this.datas.push({
        name: game.Tools.strOfLocalization(2090),
        infos: [
          game.Tools.strOfLocalization(0 === a.shiduan ? 2091 : 2092)
        ],
        isdefault: [0 !== a.shiduan]
      });
      var l = (t, e, n, r, s) => {
        var o = n;
        null != a[e] && (o = a[e]);
        i.datas.push({
          name: t,
          infos: [o ? r : s],
          isdefault: [o === n]
        });
      },
        h = (t, e, n) => {
          var r = n;
          null != a[e] && (r = a[e]);
          i.datas.push({
            name: t,
            infos: [r.toString()],
            isdefault: [r === n]
          });
        };

      h(
          game.Tools.strOfLocalization(2093),
          'init_point',
          n ? 25e3 : 35e3
        );

      h(game.Tools.strOfLocalization(2094), 'fandian', n ? 3e4 : 4e4);

      l(
        game.Tools.strOfLocalization(2095),
        'can_jifei',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      h(game.Tools.strOfLocalization(2096), 'tianbian_value', 0);
      h(game.Tools.strOfLocalization(2097), 'liqibang_value', 1e3);

      h(
        game.Tools.strOfLocalization(2098),
        'changbang_value',
        n ? 300 : 200
      );

      if (
        (n)
      ) {
        var c = 1e3,
          u = 1500,
          _ = 3e3;
        null != a.noting_fafu_1 && (c = a.noting_fafu_1);
        null != a.noting_fafu_2 && (u = a.noting_fafu_2);
        null != a.noting_fafu_3 && (_ = a.noting_fafu_3);
        this.datas.push({
          name: game.Tools.strOfLocalization(2099),
          infos: [c.toString(), u.toString(), _.toString()],
          isdefault: [1e3 === c, 1500 === u, 3e3 === _]
        });
      } else {
        var c = 1e3,
          u = 2e3;
        null != a.noting_fafu_1 && (c = a.noting_fafu_1);
        null != a.noting_fafu_2 && (u = a.noting_fafu_2);
        this.datas.push({
          name: game.Tools.strOfLocalization(2099),
          infos: [c.toString(), u.toString()],
          isdefault: [1e3 === c, 2e3 === u]
        });
      }

      h(
          game.Tools.strOfLocalization(2100),
          'jingsuanyuandian',
          n ? 25e3 : 35e3
        );

      if (
        (n)
      ) {
        var d = null != a.shunweima_2 ? a.shunweima_2 : 5,
          f = null != a.shunweima_3 ? a.shunweima_3 : -5,
          p = null != a.shunweima_4 ? a.shunweima_4 : -15,
          m = -(d + f + p);
        this.datas.push({
          name: game.Tools.strOfLocalization(2101),
          infos: [
            (m > 0 ? '+' : '') + m.toString(),
            (d > 0 ? '+' : '') + d.toString(),
            (f > 0 ? '+' : '') + f.toString(),
            (p > 0 ? '+' : '') + p.toString()
          ],
          isdefault: [15 === m, 5 === d, -5 === f, -15 === p]
        });
      } else {
        m = -(
          (d = null != a.shunweima_2 ? a.shunweima_2 : 0) +
          (f = null != a.shunweima_3 ? a.shunweima_3 : -15)
        );
        this.datas.push({
          name: game.Tools.strOfLocalization(2101),
          infos: [
            (m > 0 ? '+' : '') + m.toString(),
            (d > 0 ? '+' : '') + d.toString(),
            (f > 0 ? '+' : '') + f.toString()
          ],
          isdefault: [15 === m, 0 === d, -15 === f]
        });
      }

      l(
        game.Tools.strOfLocalization(2102),
        'bianjietishi',
        !0,
        game.Tools.strOfLocalization(2103),
        game.Tools.strOfLocalization(2104)
      );

      l(
        game.Tools.strOfLocalization(2105),
        'have_liujumanguan',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2106),
        'have_qieshangmanguan',
        !1,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2107),
        'have_biao_dora',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2108),
        'have_gang_biao_dora',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2109),
        'have_li_dora',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2110),
        'have_gang_li_dora',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2111),
        'ming_dora_immediately_open',
        !1,
        game.Tools.strOfLocalization(2103),
        game.Tools.strOfLocalization(2104)
      );

      n &&
        l(
          game.Tools.strOfLocalization(2112),
          'have_sifenglianda',
          !0,
          game.Tools.strOfLocalization(2092),
          game.Tools.strOfLocalization(2091)
        );

      l(
        game.Tools.strOfLocalization(2113),
        'have_sigangsanle',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      n &&
        l(
          game.Tools.strOfLocalization(2114),
          'have_sijializhi',
          !0,
          game.Tools.strOfLocalization(2092),
          game.Tools.strOfLocalization(2091)
        );

      l(
        game.Tools.strOfLocalization(2115),
        'have_jiuzhongjiupai',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      n &&
        l(
          game.Tools.strOfLocalization(2116),
          'have_sanjiahele',
          !1,
          game.Tools.strOfLocalization(2092),
          game.Tools.strOfLocalization(2091)
        );

      l(
        game.Tools.strOfLocalization(2117),
        'have_toutiao',
        !1,
        game.Tools.strOfLocalization(2103),
        game.Tools.strOfLocalization(2104)
      );

      l(
        game.Tools.strOfLocalization(2118),
        'have_helelianzhuang',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2119),
        'have_helezhongju',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2120),
        'have_tingpailianzhuang',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2121),
        'have_tingpaizhongju',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2122),
        'have_yifa',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2123),
        'have_nanruxiru',
        !0,
        game.Tools.strOfLocalization(2092),
        game.Tools.strOfLocalization(2091)
      );

      l(
        game.Tools.strOfLocalization(2210),
        'disable_multi_yukaman',
        !1,
        game.Tools.strOfLocalization(2103),
        game.Tools.strOfLocalization(2104)
      );

      this.scrollview.reset();
      this.scrollview.addItem(this.datas.length);
    };

    e.prototype.close = function() {
      var e = this;
      this.locking = !0;
      t.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          e.locking = !1;
          e.me.visible = !1;
        })
      );
    };

    e.prototype.render_item = function({index, container}) {
      var e = index,
        i = container;
      i.getChildByName('name').text = this.datas[e].name;
      for (
        var n = this.datas[e].infos, a = this.datas[e].isdefault, r = 0;
        r < n.length && r < 4;
        r++
      ) {
        var s = i.getChildByName(`item${r}`);
        s.visible = !0;
        s.getChildByName('label_name').text = n[r];
        s.getChildByName('label_name').color = a[r]
            ? '#402031'
            : '#03751a';
      }
      for (r = n.length; r < 4; r++)
        i.getChildByName(`item${r}`).visible = !1;
    };

    e.prototype.refresh_scorllbar = function() {
      this.light_scrollbar.visible = !0;

      this.scrollpoint.height =
            (this.light_scrollbar.height * this.scrollview.view_height) /
            this.scrollview.total_height;

      this.scrollview.need_scroll
        ? (this.scrollpoint.y =
            this.scrollview.rate *
            this.light_scrollbar.height *
            (1 -
              this.scrollview.view_height / this.scrollview.total_height))
        : (this.light_scrollbar.visible = !1);
    };

    return e;
  })();

  var i = (() => {
    function e(t) {
      var e = this;
      this.locking = !1;
      this.me = t;
      this.root = t.getChildByName('root');

      this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          !1
        );

      this.root.getChildByName(
          'btn_close1'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.close();
          },
          null,
          !1
        );

      this.title = this.root.getChildByName('title');
      this.info = this.root.getChildByName('info');
    }

    e.prototype.show = function({code, json_param}) {
      var i = this;
      this.locking = !0;
      this.me.visible = !0;
      var n = code;
      this.title.text = '';
      this.info.text = '';
      this.title.text = game.Tools.strOfLocalization(2205);
      if ((2511 == n))
        this.info.text = game.Tools.strOfLocalization(2206);
      else if (2518 == n) {
        this.title.text = game.Tools.strOfLocalization(2207);
        var a = JSON.parse(json_param),
          r = cfg.level_definition.level_definition.find(a.required_level);
        this.info.text = game.Tools.strOfLocalization(2208, [
          r[`full_name_${GameMgr.client_language}`]
        ]);
      } else if (2519 == n) {
        this.title.text = game.Tools.strOfLocalization(2207);
        a = JSON.parse(json_param);
        this.info.text = game.Tools.strOfLocalization(2209, [
          a.max_game_count
        ]);
      }
      t.UIBase.anim_pop_out(
        this.root,
        Laya.Handler.create(this, () => {
          i.locking = !1;
        })
      );
    };

    e.prototype.close = function() {
      var e = this;
      this.locking = !0;
      t.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          e.locking = !1;
          e.me.visible = !1;
        })
      );
    };

    return e;
  })();

  var n = (() => {
    function e(t) {
      var e = this;
      this.me = t;
      this.root = this.me.getChildByName('root');
      this.title = this.root.getChildByName('title');

      this.input = this.root
          .getChildByName('input')
          .getChildByName('txtinput');

      this.btn_confirm = this.root.getChildByName('btn_confirm');
      this.btn_cancel = this.root.getChildByName('btn_cancel');
      this.me.visible = !1;
      this.btn_cancel.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.hide(null);
          },
          null,
          !1
        );
    }

    e.prototype.show_share = function(e) {
      var i = this;
      this.title.text = game.Tools.strOfLocalization(2124);
      this.btn_confirm.visible = !0;
      this.btn_confirm.visible = !0;
      this.btn_confirm.visible = !1;

      GameMgr.inConch
        ? (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            () => {
              Laya.PlatformClass.createClass(
                'layaair.majsoul.mjmgr'
              ).call('setSysClipboardText', i.input.text);

              i.hide(null);
              t.UI_FlyTips.ShowTips(game.Tools.strOfLocalization(2125));
            },
            null,
            !1
          ))
        : GameMgr.iniOSWebview
        ? (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            () => {
              Laya.Browser.window.wkbridge.callNative(
                'copy2clip',
                i.input.text,
                () => {}
              );

              i.hide(null);
              t.UI_FlyTips.ShowTips(game.Tools.strOfLocalization(2125));
            },
            null,
            !1
          ))
        : (this.btn_confirm.clickHandler = Laya.Handler.create(
            this,
            () => {},
            null,
            !1
          ));

      this.input.editable = !1;
      var n = game.Tools.encode_account_id(GameMgr.Inst.account_id);

      this.input.text =
        `${game.Tools.strOfLocalization(2126)} : ${GameMgr.Inst.link_url}?paipu=${e}_a${n}`;

      this.me.visible = !0;
      this.locking = !0;

      this.btn_confirm.getChildAt(0).text = game.Tools.strOfLocalization(
          2127
        );

      t.UIBase.anim_pop_out(
        this.root,
        Laya.Handler.create(this, () => {
          i.locking = !1;
        })
      );
    };

    e.prototype.show_check = function() {
      var e = this;
      this.title.text = game.Tools.strOfLocalization(2128);
      this.btn_confirm.visible = !0;

      this.btn_confirm.getChildAt(0).text = game.Tools.strOfLocalization(
          2129
        );

      this.btn_confirm.clickHandler = Laya.Handler.create(
          this,
          () => {
            e.hide(
              Laya.Handler.create(e, () => {
                var t = e.input.text.split('='),
                  i = t[t.length - 1].split('_'),
                  n = 0;
                i.length > 1 &&
                  (n =
                    'a' == i[1].charAt(0)
                      ? game.Tools.decode_account_id(
                          parseInt(i[1].substr(1))
                        )
                      : parseInt(i[1]));
                var a = 0;
                if (i.length > 2) {
                  var r = parseInt(i[2]);
                  r && (a = r);
                }
                GameMgr.Inst.checkPaiPu(i[0], n, a);
              })
            );
          },
          null,
          !1
        );

      this.input.editable = !0;
      this.input.text = '';
      this.me.visible = !0;
      this.locking = !0;
      t.UIBase.anim_pop_out(
        this.root,
        Laya.Handler.create(this, () => {
          e.locking = !1;
        })
      );
    };

    e.prototype.hide = function(e) {
      var i = this;
      this.locking = !0;
      t.UIBase.anim_pop_hide(
        this.root,
        Laya.Handler.create(this, () => {
          i.locking = !1;
          i.me.visible = !1;
          e && e.run();
        })
      );
    };

    return e;
  })();

  var a = (() => {
    function t(t) {
      this.me = t;
    }
    t.prototype.onEnterRoom = () => {};
    t.prototype.show = () => {};
    t.prototype.close = () => {};
    return t;
  })();

  var r = (() => {
    function e(e) {
      var i = this;
      this.match_id = -1;
      this.infos = [];
      this.show_index = [];
      this.me = e;
      this.scrollview = this.me.scriptMap['capsui.CScrollView'];
      this.scrollview.init_scrollview(
        new Laya.Handler(this, this.render_item)
      );
      var n = this.me.getChildByName('only_system');
      this.only_system_flag = n.getChildByName('check');

      n.clickHandler = new Laya.Handler(this, () => {
        i.only_system_flag.visible = !i.only_system_flag.visible;
        i.refresh_all_info();
      });

      this.txt_input = this.me
          .getChildByName('input')
          .getChildByName('txtinput');

      this.btn_send = this.me.getChildByName('send');

      this.btn_send.clickHandler = Laya.Handler.create(
          this,
          () => {
            game.Tools.setGrayDisable(i.btn_send, !0);

            Laya.timer.once(5e3, i, () => {
              game.Tools.setGrayDisable(i.btn_send, !1);
            });

            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'sayChatMessage',
              { content: i.txt_input.text },
              (e, i) => {
                (e || i.error) &&
                  t.UIMgr.Inst.showNetReqError('sayChatMessage', e, i);
              }
            );

            '' != i.txt_input.text &&
              ((i.txt_input.text = ''));
          },
          null,
          !1
        );

      this.txt_input.on(laya.events.Event.KEY_DOWN, this, ({keyCode}) => {
        if (keyCode == Laya.Keyboard.ENTER) {
          if (!i.btn_send.mouseEnabled) return;
          if ('' == i.txt_input.text) return;
          game.Tools.setGrayDisable(i.btn_send, !0);

          Laya.timer.once(5e3, i, () => {
            game.Tools.setGrayDisable(i.btn_send, !1);
          });

          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'sayChatMessage',
            { content: i.txt_input.text },
            (e, i) => {
              (e || i.error) &&
                t.UIMgr.Inst.showNetReqError('sayChatMessage', e, i);
            }
          );

          i.txt_input.text = '';
        }
      });

      this.container_get_word_height = e.getChildByName(
          'container_get_word_height'
        );

      this.test_height_div = new Laya.HTMLDivElement();
      this.container_get_word_height.addChild(this.test_height_div);
      this.test_height_div.pos(0, 0);
      this.test_height_div.width = this.container_get_word_height.width;
      this.test_height_div.style.lineHeight = 30;
      this.test_height_div.style.valign = 'top';
      this.test_height_div.style.width = this.container_get_word_height.width;
      this.test_height_div.style.align = 'left';

      app.NetAgent.AddListener2Lobby(
        'NotifyCustomContestAccountMsg',
        Laya.Handler.create(this, t => {
          t.unique_id == i.match_id && i.addInfos(2, t);
        })
      );

      app.NetAgent.AddListener2Lobby(
        'NotifyCustomContestSystemMsg',
        Laya.Handler.create(this, t => {
          t.unique_id == i.match_id && i.addInfos(1, t);
        })
      );

      this.scrollbar = this.me.getChildByName('scrollbar_light');
      this.scrollpoint = this.scrollbar.getChildByName('scrollpoint');
      this.scrollview.me.on('ratechange', this, () => {
        i.refresh_scrollbar();
      });
    }

    e.prototype.on_enter_room = function() {
      var e = this;
      this.match_id = u.Inst.match_id;
      this.infos = [];
      this.show_index = [];
      this.scrollview.reset();
      this.only_system_flag.visible = !1;
      this.txt_input.text = '';
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'joinCustomizedContestChatRoom',
        { unique_id: this.match_id },
        (i, {error, chat_history}) => {
          if (i || error)
            t.UIMgr.Inst.ShowErrorInfo(
              game.Tools.strOfLocalization(2130)
            );
          else if (chat_history)
            for (var a = chat_history.length - 1; a >= 0; a--) {
              var r = chat_history[a],
                s = net.MessageWrapper.decodeMessage(r),
                o = s.$type.name;
              'NotifyCustomContestSystemMsg' == o
                ? e.addInfos(1, s)
                : 'NotifyCustomContestAccountMsg' == o &&
                  e.addInfos(2, s);
            }
        }
      );
    };

    e.prototype.on_leave_room = function() {
      this.match_id = -1;
      this.show_index = [];
      this.infos = [];
      this.scrollview.reset();
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'leaveCustomizedContestChatRoom',
        {},
        (t, {error}) => {
          t || error;
        }
      );
    };

    e.prototype.addInfos = function(t, e) {
      this.infos.push({ type: t, content: e, height: 0 });
      var i = this.get_content_str(this.infos[this.infos.length - 1]);
      this.test_height_div.innerHTML = i;
      var n = this.scrollview.near_bottom,
        a = this.test_height_div.contextHeight + 10;
      this.infos[this.infos.length - 1].height = a;
      this.show_index.push(this.infos.length - 1);
      this.scrollview.addItem(1, a);

      (1 != t && 0 != this.only_system_flag.visible) ||
        (n && (this.scrollview.rate = 1));

      1 == t &&
        (1 == e.type
          ? u.Inst.page_ob.setNeedFetch()
          : 2 == e.type && u.Inst.page_paipu.setNeedFetch());
    };

    e.prototype.refresh_all_info = function() {
      this.scrollview.reset();
      this.show_index = [];
      this.show_index.push(e);
      for (var t = [], e = 0; e < this.infos.length; e++)
        (1 != this.infos[e].type && 0 != this.only_system_flag.visible) ||
          (t.push(this.infos[e].height));
      this.scrollview.addItems(t);
      this.scrollview.rate = 1;
    };

    e.prototype.get_content_str = ({type, content}) => {
      var e = '';
      if (1 == type) {
        e += "<span style='font:26px SimHei' color='#d4ac66'>";
        e += game.Tools.strOfLocalization(2131);
        if (
          (1 == content.type)
        ) {
          0 != n &&
            (n == i.length - 1
              ? (e += game.Tools.strOfLocalization(2132))
              : (e += '、'));

          for (
            var i = content.game_start.players, n = 0;
            n < i.length;
            n++
          )
            0 === i[n].account_id
              ? (e += game.Tools.strOfLocalization(2133))
              : (e += i[n].nickname);
          e += game.Tools.strOfLocalization(2134);
        } else if (2 == content.type) {
          e += game.Tools.strOfLocalization(2135);
          0 != n && (e += ',');
          e += `[${(n + 1).toString()}]`;

          0 === i[n].account_id
            ? (e += game.Tools.strOfLocalization(2133))
            : (e += i[n].nickname);

          for (var i = content.game_end.players, n = 0; n < i.length; n++)
            e +=
                `(${i[n].total_point > 0 ? '+' : ''}${i[n].total_point / 1e3}${game.Tools.strOfLocalization(2136)})`;
        }
        e += '</span>';
      } else if (2 == type) {
        e +=
          `<span style='font:26px SimHei' color='#8b8c98'>${content.sender}:</span>`;
        var a = content.content;
        e +=
          `<span style='font:26px SimHei' color='#70d6ed'>${a = game.Tools.strWithoutForbidden(a)}</span>`;
      }
      return e;
    };

    e.prototype.render_item = function({index, container}) {
      var i = index,
        n = container,
        a = n.getChildByName('container_content').getChildByName('content');
      (a = new Laya.HTMLDivElement()).name = 'content';
      n.getChildByName('container_content').addChild(a);
      a.pos(0, 0);
      a.width = this.test_height_div.width;
      a.style.lineHeight = this.test_height_div.style.lineHeight;
      a.style.valign = this.test_height_div.style.valign;
      a.style.width = a.width;
      null == a &&
        ((a.style.align = this.test_height_div.style.align));
      var r = this.infos[this.show_index[i]];
      n.height = r.height;
      a.innerHTML = this.get_content_str(r);
      var s = n.getChildByName('btn_click');

      s.clickHandler = Laya.Handler.create(
            this,
            () => {
              r.content.account_id &&
                t.UI_OtherPlayerInfo.Inst.show(r.content.account_id);
            },
            null,
            !1
          );

      s.width = n.width;
      s.height = n.height;
      1 == r.type
        ? (s.clickHandler = null)
        : (s.pos(0, 0));
    };

    e.prototype.refresh_scrollbar = function() {
      if (this.scrollview.need_scroll) {
        var t = this.scrollview.rate;

        this.scrollpoint.height =
          (this.scrollbar.height * this.scrollview.view_height) /
          this.scrollview.total_height;

        this.scrollpoint.y =
            t *
            this.scrollbar.height *
            (1 -
              this.scrollview.view_height / this.scrollview.total_height);

        this.scrollbar.visible = !0;
      } else this.scrollbar.visible = !1;
    };

    return e;
  })();

  var s = (() => {
    class t {
      constructor(t) {
        var e = this;
        this.tab_index = 0;
        this.me = t;
        this.chat = new r(t.getChildByName('chat'));
        this.btn_chat = t.getChildByName('btn_chat');

        this.btn_chat.clickHandler = Laya.Handler.create(
            this,
            () => {
              1 != e.tab_index && e.change_tab(1);
            },
            null,
            !1
          );

        this.btn_info = t.getChildByName('btn_info');

        this.btn_info.clickHandler = Laya.Handler.create(
            this,
            () => {
              0 != e.tab_index && e.change_tab(0);
            },
            null,
            !1
          );

        this.container_notice = t.getChildByName('notice');
        this.panel = this.container_notice.getChildByName('panel');
        this.panel.vScrollBarSkin = '';
        this.label_content = this.panel.getChildByName('content');
        this.scrollbar = this.container_notice.getChildByName('scrollbar');
        this.scrollpoint = this.scrollbar.getChildByName('scrollpoint');

        this.panel.vScrollBar.on('change', this, () => {
          e.refresh_scrollbar();
        });

        this.me.getChildByName('nochat').visible = !1;
      }

      on_enter_room() {
        this.chat.on_enter_room();
      }

      on_leave_room() {
        this.chat.on_leave_room();
      }

      set_notice(t) {
        this.label_content.text = game.Tools.strWithoutForbidden(t);
        this.label_content.height = this.label_content.textField.textHeight;
        this.panel.refresh();

        this.scrollbar.visible =
            this.label_content.height > this.panel.height;

        this.panel.vScrollBar.value = 0;
        this.refresh_scrollbar();
      }

      refresh_scrollbar() {
        if (this.label_content.height > this.panel.height) {
          var t = this.panel.vScrollBar.value / this.panel.vScrollBar.max;

          this.scrollpoint.height =
            (this.scrollbar.height * this.panel.height) /
            this.label_content.height;

          this.scrollpoint.y =
              t *
              this.scrollbar.height *
              (1 - this.panel.height / this.label_content.height);
        }
      }

      change_tab(t) {
        this.tab_index = t;
        var e = Date.now();
        this.chat.me.visible = !1;
        this.chat.me.visible = 1 == t;

        'chs' == GameMgr.client_language && e >= 15696e8 && e <= 15706548e5
          ? (this.me.getChildByName('nochat').visible = 1 == t)
          : (this.me.getChildByName('nochat').visible = !1);

        this.btn_chat.getChildByName('inchoose').visible = 1 == t;
        this.container_notice.visible = 0 == t;
        this.btn_info.getChildByName('inchoose').visible = 0 == t;
      }
    }

    return t;
  })();

  var o = (() => {
    class e {
      constructor(e) {
        var i = this;
        this.player_count = 1;
        this.me = e;
        this.label_rank = e.getChildByName('rank');
        this.label_my_near_point_word = e.getChildByName('my_near_point');

        this.label_my_near_point_value = this.label_my_near_point_word.getChildByName(
            'v'
          );

        this.label_my_near_rank_word = e.getChildByName('my_near_rank');

        this.label_my_near_rank_value = this.label_my_near_rank_word.getChildByName(
            'v'
          );

        this.label_my_match_count = e
            .getChildByName('my_match_count')
            .getChildByName('v');

        this.btn_start = e.getChildByName('btn_start');
        this.label_btn = this.btn_start.getChildByName('label_name');

        this.btn_start.clickHandler = Laya.Handler.create(
            this,
            () => {
              game.Tools.setGrayDisable(i.btn_start, !0);
              u.Inst.during_waiting_match
                ? app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'stopCustomizedContest',
                    {},
                    (e, n) => {
                      game.Tools.setGrayDisable(i.btn_start, !1);
                      u.Inst.during_waiting_match = !1;
                      e || n.error
                        ? t.UIMgr.Inst.showNetReqError(
                            'stopCustomizedContest',
                            e,
                            n
                          )
                        : (i.refresh_start_btn());
                    }
                  )
                : app.NetAgent.sendReq2Lobby(
                    'Lobby',
                    'startCustomizedContest',
                    { unique_id: u.Inst.match_id },
                    (e, n) => {
                      game.Tools.setGrayDisable(i.btn_start, !1);
                      u.Inst.during_waiting_match = !0;
                      if ((e))
                        t.UIMgr.Inst.showNetReqError(
                          'startCustomizedContest',
                          e,
                          null
                        );
                      else if (n.error) {
                        var a = n.error;
                        2511 == a.code || 2519 == a.code || 2518 == a.code
                          ? u.Inst.showError(a)
                          : t.UIMgr.Inst.showNetReqError(
                              'startCustomizedContest',
                              '',
                              n
                            );
                      } else
                        i.refresh_start_btn();
                    }
                  );
            },
            null,
            !1
          );

        this.label_online = e.getChildByName('count_online');
        app.NetAgent.AddListener2Lobby(
          'NotifyCustomContestState',
          new Laya.Handler(this, ({state, unique_id}) => {
            u.Inst.match_data.state = state;
            unique_id == u.Inst.match_id &&
              (i.refresh_start_btn());
          })
        );
      }

      on_enter_room() {
        var t = this,
          e = u.Inst.match_data;
        u.Inst.player_report;

        this.me
          .getChildByName('starttime')
          .getChildByName('date').text = game.Tools.time2YearMounthDate(
          e.start_time
        );

        this.me
            .getChildByName('starttime')
            .getChildByName('time').text = game.Tools.time2HourMinute(
            e.start_time,
            !0
          );

        this.me
            .getChildByName('endtime')
            .getChildByName('date').text = game.Tools.time2YearMounthDate(
            e.finish_time
          );

        this.me
            .getChildByName('endtime')
            .getChildByName('time').text = game.Tools.time2HourMinute(
            e.finish_time,
            !0
          );
        var i = [];
        i.push(game.Tools.room_mode_desc(e.game_mode.mode));
        i.push(game.Tools.strOfLocalization(2138));
        i.push(`5+20${game.Tools.strOfLocalization(2019)}`);
        if (
          (e.game_mode.detail_rule)
        ) {
          var n = e.game_mode.detail_rule;
          0 === n.shiduan
            ? i.push(game.Tools.strOfLocalization(2137))
            : i.push(game.Tools.strOfLocalization(2138));
          var a = null != n.time_fixed ? n.time_fixed : 5,
            r = null != n.time_add ? n.time_add : 20;
          i.push(
            `${a.toString()}+${r.toString()}${game.Tools.strOfLocalization(2019)}`
          );
          switch (null != n.dora_count ? n.dora_count : 3) {
            case 0:
              i.push(game.Tools.strOfLocalization(2044));
              break;
            case 2:
              i.push(game.Tools.strOfLocalization(2047));
              break;
            case 3:
              i.push(game.Tools.strOfLocalization(2045));
              break;
            case 4:
              i.push(game.Tools.strOfLocalization(2046));
          }
        } else
          i.push(game.Tools.strOfLocalization(2045));
        for (var s = 0; s < 4; s++) {
          var o = this.me.getChildByName(`rule${s}`);
          o.visible = !0;
          s >= i.length
            ? (o.visible = !1)
            : (o.getChildByName('label_name').text = i[s]);
        }

        this.me.getChildByName('check_rule').clickHandler = new Laya.Handler(
          this,
          () => {
            u.Inst.show_rule();
          }
        );

        this.refresh_my_rank();
        this.refresh_start_btn();
        this.player_count = 0;
        this.label_online.text = '1';
        this.nxt_refresh_count_time = 1;
        this.refresh_online();
        Laya.timer.loop(3e3, this, () => {
          t.refresh_online();
        });
      }

      on_leave_room() {
        Laya.timer.clearAll(this);
      }

      refresh_my_rank() {
        var t = u.Inst.match_data,
          e = u.Inst.player_report,
          i = 0;
        t.rank_rule && (i = t.rank_rule);
        if ((e)) {
          this.label_rank.text =
            null == e.rank || 0 == e.rank ? '--' : e.rank.toString();

          this.label_my_near_point_value.text =
              null == e.point ? '--' : (e.point / 1e3).toString();
          var n = '',
            a = !1;
          '' != n && (n += '/');
          n += e.recent_game_ranks[r].toString();
          '' != n && (n += '/');
          if (e.recent_game_ranks)
            for (r = 0; r < 5; r++)
              r < e.recent_game_ranks.length
                ? (a = !0)
                : (n += '-');
          else for (r = 0; r < 5; r++) n += '-';
          this.label_my_near_point_value.text = '--';

          a
            ? (this.label_my_match_count.text = e.total_game_count.toString())
            : (this.label_my_match_count.text = '--');

          this.label_my_near_rank_value.text = n;
        } else {
          this.label_rank.text = '--';
          this.label_my_near_point_value.text = '--';
          this.label_my_match_count.text = '--';
          '' != n && (n += '/');
          for (var n = '', r = 0; r < 5; r++)
            n += '-';
          this.label_my_near_rank_value.text = n;
        }
        this.label_my_near_point_word.visible = !0;
        this.label_my_near_rank_word.visible = !0;
        2 == i
          ? (this.label_my_near_point_word.text = game.Tools.strOfLocalization(
              2139,
              ['5']
            ))
          : 1 == i
          ? (this.label_my_near_point_word.text = game.Tools.strOfLocalization(
              2139,
              ['3']
            ))
          : 0 == i &&
            (this.label_my_near_point_word.text = game.Tools.strOfLocalization(
              2139,
              ['-']
            ));
      }

      refresh_online() {
        var t = this,
          e = this.player_count;

        e > 50 && e < 100
              ? (e += Math.floor(10 * Math.random() - 5))
              : e >= 100 &&
                (e = Math.floor(
                  e * (0.12 * Math.random() + 0.94) + 7 * Math.random() - 3
                ));

        e <= 0
          ? (this.label_online.text = '--')
          : (this.label_online.text = e.toString());

        app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchCustomizedContestOnlineInfo',
            { unique_id: u.Inst.match_id },
            (e, {error, online_player}) => {
              e || error
                ? (t.player_count = 1)
                : (t.player_count = online_player);
            }
          );

        Laya.timer.currTimer >= this.nxt_refresh_count_time &&
          ((this.player_count < 100 ? this.nxt_refresh_count_time = Laya.timer.currTimer + 5e3 : this.player_count < 500
          ? (this.nxt_refresh_count_time =
              Laya.timer.currTimer +
              (24e3 * (this.player_count - 100)) / 400)
          : (this.nxt_refresh_count_time = Laya.timer.currTimer + 29e3)));
      }

      refresh_start_btn() {
        var t = u.Inst.match_data;
        game.Tools.setGrayDisable(this.btn_start, !0);
        this.label_btn.text = game.Tools.strOfLocalization(2140);
        game.Tools.setGrayDisable(this.btn_start, !1);
        this.label_btn.text = game.Tools.strOfLocalization(2141);
        this.label_btn.text = game.Tools.strOfLocalization(2142);
        game.Tools.setGrayDisable(this.btn_start, !0);
        this.label_btn.text = game.Tools.strOfLocalization(2143);
        1 == t.state
          ? (this.btn_start.skin = game.Tools.localUISrc(
              'myres/match_lobby/match_btn2.png'
            ))
          : 2 == t.state
          ? (u.Inst.during_waiting_match
          ? (this.btn_start.skin = game.Tools.localUISrc(
              'myres/match_lobby/match_btn3.png'
            ))
          : (this.btn_start.skin = game.Tools.localUISrc(
              'myres/match_lobby/match_btn2.png'
            )))
          : 3 == t.state &&
            ((this.btn_start.skin = game.Tools.localUISrc(
              'myres/match_lobby/match_btn2.png'
            )));
      }
    }

    return e;
  })();

  var l = (e => {
    function i(i) {
      var n = e.call(this, i) || this;
      n.label_name = i.getChildByName('name');
      n.check_follow = i.getChildByName('check_follow');
      n.label_follow = n.check_follow.getChildByName('word');
      n.check_flag = n.check_follow.getChildByName('check');

      n.check_follow.clickHandler = Laya.Handler.create(
        n,
        () => {
          u.Inst.follow = !u.Inst.follow;
          n.check_flag.visible = u.Inst.follow;

          n.label_follow.text = game.Tools.strOfLocalization(
              n.check_flag.visible ? 2144 : 2145
            );

          t.UI_Match_Lobby.Inst.change_match_follow(
            u.Inst.match_id,
            u.Inst.follow
          );
          var e = n.check_flag.visible
            ? 'followCustomizedContest'
            : 'unfollowCustomizedContest';
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            e,
            { unique_id: u.Inst.match_id },
            () => {}
          );
        },
        null,
        !1
      );

      n.container_left = new s(i.getChildByName('container_left'));
      n.container_right = new o(i.getChildByName('container_right'));
      return n;
    }
    __extends(i, e);

    i.prototype.onEnterRoom = function() {
      var t = u.Inst.match_data;
      u.Inst.player_report;

      this.label_name.text = game.Tools.strWithoutForbidden(
        t.contest_name
      );

      this.container_left.set_notice(t.private_notice);
      this.container_left.change_tab(0);
      this.container_left.on_enter_room();
      this.container_right.on_enter_room();
      this.check_flag.visible = u.Inst.follow;
      this.label_follow.text = game.Tools.strOfLocalization(
          this.check_flag.visible ? 2144 : 2145
        );
    };

    i.prototype.on_leave_room = function() {
      this.container_left.on_leave_room();
      this.container_right.on_leave_room();
    };

    i.prototype.show = function() {
      this.me.visible = !0;
    };

    i.prototype.close = function() {
      this.me.visible = !1;
    };

    return i;
  })(a);

  var h = (e => {
    function i(t) {
      var i = e.call(this, t) || this;
      i.next_index = -1;
      i.record_list = [];
      i.last_fetch_time = -1e8;
      i.nolimitlst = t.scriptMap['capsui.NoLimitList'];

      i.nolimitlst.init_nolimitlist(
        Laya.Handler.create(i, i.load_next, null, !1),
        Laya.Handler.create(i, i.render_item, null, !1)
      );

      i.me.getChildByName('checkother').clickHandler = Laya.Handler.create(
        i,
        () => {
          u.Inst.pop_check_paipu.show_check();
        },
        null,
        !1
      );

      return i;
    }
    __extends(i, e);

    i.prototype.onEnterRoom = function() {
      this.last_fetch_time = -1e8;
      this.match_id = u.Inst.match_id;
      this.record_list = [];
      this.next_index = -1;
    };

    i.prototype.show = function() {
      this.me.visible = !0;
      this.next_index = -1;
      this.record_list = [];
      this.nolimitlst.reset();
      this.nolimitlst.total_count = 1;
      Laya.timer.currTimer > this.last_fetch_time + 6e4 &&
        ((this.last_fetch_time = Laya.timer.currTimer));
    };

    i.prototype.close = function() {
      this.me.visible = !1;
    };

    i.prototype.setNeedFetch = function() {
      this.last_fetch_time = -1e8;
    };

    i.prototype.load_next = function() {
      var e = this,
        i = { unique_id: this.match_id };
      this.next_index >= 0 && (i.last_index = this.next_index);
      app.NetAgent.sendReq2Lobby(
        'Lobby',
        'fetchCustomizedContestGameRecords',
        i,
        (i, n) => {
          t.UIMgr.Inst.showNetReqError(
            'fetchCustomizedContestGameRecords',
            i,
            n
          );

          if (i || n.error)
            e.nolimitlst.loadOver(!1, 0);
          else {
            var a = 0;
            if (n.record_list) {
              a = n.record_list.length;
              for (var r = 0; r < a; r++)
                e.record_list.push(n.record_list[r]);
            }
            e.next_index = n.next_index;

            e.nolimitlst.total_count =
                  e.record_list.length + 1;

            e.nolimitlst.total_count = e.record_list.length;
            e.nolimitlst.total_count = e.record_list.length;
            null != n.next_index && n.next_index >= 0
              ? (a > 0
              ? (e.nolimitlst.loadOver(!0, a))
              : (e.nolimitlst.loadOver(!0, a)))
              : (e.nolimitlst.loadOver(!0, a));
          }
        }
      );
    };

    i.prototype.render_item = function({index, container}) {
      for (
        var i = this,
          n = index,
          a = container,
          r = this.record_list[n],
          s = 0;
        s < 4;
        s++
      ) {
        var o = a.getChildByName(`p${s.toString()}`);
        if (r.result.players.length <= s) o.visible = !1;
        else {
          o.visible = !0;
          var l = o.getChildByName('chosen'),
            h = o.getChildByName('rank'),
            c = o.getChildByName('rank_word'),
            _ = o.getChildByName('name'),
            d = o.getChildByName('score'),
            f = r.result.players[s];
          d.text = f.part_point_1;
          for (
            var p = game.Tools.strOfLocalization(2133), m = !1, g = 0;
            g < r.accounts.length;
            g++
          )
            if (r.accounts[g].seat == f.seat) {
              p = r.accounts[g].nickname;
              m = r.accounts[g].account_id == GameMgr.Inst.account_id;
              break;
            }
          _.text = p;
          l.visible = m;
          d.color = m ? '#ffc458' : '#b98930';
          _.color = m ? '#dfdfdf' : '#a0a0a0';
          c.color = h.color = m ? '#57bbdf' : '#489dbc';
          var y = o.getChildByName('rank_word');
          y.y = 51;
          if ('en' == GameMgr.client_language)
            switch ((s)) {
              case 0:
                y.text = 'st';
                break;
              case 1:
                y.text = 'nd';
                break;
              case 2:
                y.text = 'rd';
                break;
              case 3:
                y.text = 'th';
            }
          else y.y = 46;
        }
      }
      var v = new Date(1e3 * r.end_time),
        b = '';
      b += `${v.getFullYear()}/`;

      b +=
          `${(v.getMonth() < 9 ? '0' : '') +
(v.getMonth() + 1).toString()}/`;

      b += `${(v.getDate() < 10 ? '0' : '') + v.getDate()} `;
      b += `${(v.getHours() < 10 ? '0' : '') + v.getHours()}:`;
      b += (v.getMinutes() < 10 ? '0' : '') + v.getMinutes();
      a.getChildByName('date').text = b;

      a.getChildByName('check').clickHandler = Laya.Handler.create(
          this,
          () => {
            i.locking ||
              (u.Inst.during_waiting_match
                ? t.UIMgr.Inst.ShowErrorInfo(
                    game.Tools.strOfLocalization(2146)
                  )
                : GameMgr.Inst.checkPaiPu(i.record_list[n].uuid, 0, 0));
          },
          null,
          !1
        );

      a.getChildByName('share').clickHandler = Laya.Handler.create(
          this,
          () => {
            i.locking ||
              u.Inst.pop_check_paipu.show_share(i.record_list[n].uuid);
          },
          null,
          !1
        );
      var w = a.getChildByName('room'),
        x = game.Tools.get_room_desc(r.config);
      w.text = x.text;
    };

    return i;
  })(a);

  var c = (e => {
    class i {
      constructor(t) {
        var i = e.call(this, t) || this;
        i.live_datas = [];
        i.last_fetch_time = -1e6;

        i.scrollview = i.me.getChildByName('scrollview').scriptMap[
          'capsui.CScrollView'
        ];

        i.scrollview.init_scrollview(
          Laya.Handler.create(i, i.render_scrollview, null, !1)
        );

        return i;
      }

      onEnterRoom() {
        var t = u.Inst.match_data;
        this.match_id = t.unique_id;
        this.match_name = t.contest_name;
        this.is_sima = t.game_mode.mode < 10;
        this.last_fetch_time = -1e6;
      }

      show() {
        var e = this;
        this.me.visible = !0;
        this.scrollview.reset();
        this.live_datas = [];
        Laya.timer.currTimer > this.last_fetch_time + 1e4 &&
          (app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchCustomizedContestGameLiveList',
          { unique_id: this.match_id },
          (i, n) => {
            if (i || n.error)
              t.UIMgr.Inst.showNetReqError(
                'fetchCustomizedContestGameLiveList',
                i,
                n
              );
            else {
              if (n.live_list)
                for (var a = 0; a < n.live_list.length; a++)
                  e.live_datas.push(n.live_list[a]);
              e.scrollview.addItem(e.live_datas.length);
              e.last_fetch_time = Laya.timer.currTimer;
            }
          }
        ));
      }

      close() {
        this.me.visible = !1;
      }

      setNeedFetch() {
        this.last_fetch_time = -1e6;
      }

      render_scrollview({index, container, cache_data}) {
        var i = this,
          n = index,
          a = container,
          r = cache_data,
          s = this.live_datas[n];
        a.getChildByName('name').text = this.match_name;
        var o = new Date(1e3 * s.start_time),
          l = `${o.getHours()}:`;
        o.getMinutes() < 10 && (l += '0');
        l += o.getMinutes().toString();
        a.getChildByName('time').text = l;
        for (var h = this.is_sima ? 4 : 3, c = 0; c < 4; c++) {
          var _ = `p${c}`,
            d = a.getChildByName(_);
          if (c >= h) d.visible = !1;
          else {
            d.visible = !0;
            if ((!r[_])) {
              var f = {};
              f.level = new t.UI_Level(d.getChildByName('rank'));
              f.title = new t.UI_PlayerTitle(d.getChildByName('title'));
              f.name = d.getChildByName('name');
              r[_] = f;
            }
            r[_].level.id = this.is_sima ? 10101 : 20101;
            r[_].title.id = 0;
            if (c < s.players.length) {
              var p = s.players[c];
              r[_].level.id = p[this.is_sima ? 'level' : 'level3'].id;

              r[_].title.id = game.Tools.titleLocalization(
                  p.account_id,
                  p.title
                );

              r[_].name.text = p.nickname;
            } else
              r[_].name.text = game.Tools.strOfLocalization(2133);
          }
        }
        a.getChildByName('btn').clickHandler = Laya.Handler.create(
          this,
          () => {
            u.Inst.during_waiting_match
              ? t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2147))
              : t.UI_Live_Broadcast.fetchInfo(
                  s.uuid,
                  Laya.Handler.create(i, ({success, data}) => {
                    success &&
                      t.UI_Live_Broadcast.goToWatch(
                        s.uuid,
                        data,
                        s.players[0].account_id
                      );
                  })
                );
          },
          null,
          !1
        );
      }
    }

    __extends(i, e);

    return i;
  })(a);

  var u = (a => {
    class r {
      constructor() {
        var t = a.call(this, new ui.lobby.match_roomUI()) || this;
        t.tabs = [];
        t.locking = !1;
        t.match_data = null;
        t.player_report = null;
        t.tab_index = -1;
        t.during_waiting_match = !1;
        r.Inst = t;

        game.LobbyNetMgr.Inst.add_connect_listener(
          new Laya.Handler(t, e => {
            t.enable && 'reconnect_success' == e && t.refresh_data();
          })
        );

        return t;
      }

      onCreate() {
        var a = this;
        this.container_top = this.me.getChildByName('top');

        this.label_match_title = this.container_top.getChildByName(
            'title'
          );

        this.label_match_id = this.container_top.getChildByName('id');

        this.container_top.getChildByName(
            'btn_back'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              a.locking ||
                (a.during_waiting_match
                  ? app.NetAgent.sendReq2Lobby(
                      'Lobby',
                      'stopCustomizedContest',
                      {},
                      (e, i) => {
                        r.Inst.during_waiting_match = !1;
                        a.page_main.container_right.refresh_start_btn();
                        e || i.error
                          ? t.UIMgr.Inst.showNetReqError(
                              'stopCustomizedContest',
                              e,
                              i
                            )
                          : (a.close());
                      }
                    )
                  : a.close());
            },
            null,
            !1
          );

        this.container_main = this.me.getChildByName('main');
        this.tabs = [];
        for (
          var s = t => {
            o.tabs.push(
              o.container_main.getChildByName('tabs').getChildAt(t)
            );

            o.tabs[t].clickHandler = Laya.Handler.create(
                o,
                () => {
                  a.locking ||
                    (a.tab_index != t &&
                      null != a.match_data &&
                      a.change_tab(t));
                },
                null,
                !1
              );
          },
            o = this,
            u = 0;
          u < 3;
          u++
        )
          s(u);

        this.page_main = new l(
          this.container_main.getChildByName('page_main')
        );

        this.page_paipu = new h(
            this.container_main.getChildByName('page_paipu')
          );

        this.page_ob = new c(
            this.container_main.getChildByName('page_ob')
          );

        this.pop_rule = new e(this.me.getChildByName('pop_rule'));

        this.pop_check_paipu = new n(
            this.me.getChildByName('pop_check_paipu')
          );

        this.pop_no_access = new i(
            this.me.getChildByName('pop_no_access')
          );

        app.NetAgent.AddListener2Lobby(
          'NotifyRoomGameStart',
          Laya.Handler.create(this, t => {
            app.Log.log(`NotifyRoomGameStart:${JSON.stringify(t)}`);
            a.enable &&
              (a.onGameStart(t));
          })
        );
      }

      show(t) {
        this.match_id = t;
        GameMgr.Inst.custom_match_id = this.match_id;
        this.refresh_data();
      }

      refresh_data() {
        var e = this;
        this.page_main.me.visible = !1;
        this.page_paipu.me.visible = !1;
        this.page_ob.me.visible = !1;

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'enterCustomizedContest',
          { unique_id: this.match_id },
          (i, n) => {
            app.Log.log(JSON.stringify(n));
            e.match_data = n.detail_info;
            e.player_report = n.player_report;
            e.label_match_id.text = `ID:${e.match_data.contest_id}`;
            e.follow = n.is_followed;
            e.page_main.onEnterRoom();
            e.page_ob.onEnterRoom();
            e.page_paipu.onEnterRoom();
            i || n.error
              ? t.UIMgr.Inst.showNetReqError('enterCustomizedContest', i, n)
              : (e.change_tab(0));
          }
        );

        this.change_tab(-1);
        this.pop_check_paipu.me.visible = !1;
        this.pop_no_access.me.visible = !1;
        this.pop_rule.me.visible = !1;
        this.enable = !0;
        this.locking = !0;
        t.UIBase.anim_alpha_in(this.container_top, { y: -30 }, 200);
        t.UIBase.anim_alpha_in(this.container_main, { y: 30 }, 200);
        this.label_match_id.text = 'ID:--';

        this.label_match_id.x =
            this.label_match_title.textField.textWidth *
              this.label_match_title.scaleX +
            this.label_match_title.x +
            10;

        Laya.timer.once(200, this, () => {
          e.locking = !1;
        });
      }

      close() {
        var e = this;
        this.match_data = null;
        this.match_id = -1;
        GameMgr.Inst.custom_match_id = -1;
        this.locking = !0;
        t.UIBase.anim_alpha_out(this.container_top, { y: -30 }, 200);
        t.UIBase.anim_alpha_out(this.container_main, { y: 30 }, 200);

        Laya.timer.once(200, this, () => {
          e.enable = !1;
          e.locking = !1;
          e.change_tab(-1);
          t.UI_Match_Lobby.Inst.show();
        });

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'leaveCustomizedContest',
          {},
          () => {}
        );

        this.page_main.on_leave_room();
      }

      change_tab(t) {
        switch (this.tab_index) {
          case 0:
            this.page_main.close();
            break;
          case 1:
            this.page_paipu.close();
            break;
          case 2:
            this.page_ob.close();
        }
        this.tab_index = t;
        switch ((this.tab_index)) {
          case 0:
            this.page_main.show();
            break;
          case 1:
            this.page_paipu.show();
            break;
          case 2:
            this.page_ob.show();
        }

        this.tabs[e].skin = game.Tools.localUISrc(
          t == e
            ? 'myres/shop/tab_choose.png'
            : 'myres/shop/tab_unchoose.png'
        );

        for (var e = 0; e < this.tabs.length; e++)
          this.tabs[e].getChildAt(0).color =
              t == e ? '#d9b263' : '#8cb65f';
      }

      show_rule() {
        this.pop_rule.show(this.match_data.game_mode);
      }

      onGameStart({connect_token, game_uuid, location}) {
        this.match_data = null;
        this.enable = !1;
        this.during_waiting_match = !1;
        this.page_main.on_leave_room();
        t.UI_Lobby.Inst.enable = !1;
        t.UI_Match_Lobby.Inst.clear_data();
        game.MJNetMgr.Inst.OpenConnect(
          connect_token,
          game_uuid,
          location,
          !1,
          null
        );
      }

      showError(t) {
        this.pop_no_access.show(t);
      }
    }

    __extends(r, a);

    return r;
  })(t.UIBase);

  t.UI_Match_Room = u;
})(uiscript || (uiscript = {}));