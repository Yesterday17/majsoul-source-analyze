let uiscript;
!(t => {
  const e = (() => {
      function t(t, e) {
        const i = this;
        (this._during_drag = false),
          (this.me = t),
          (this.bar = this.me.getChildByName('val')),
          (this.point = this.me.getChildByName('point')),
          this.me.on('mousedown', this, () => {
            (i._during_drag = true), e.runWith(i.me.mouseX / i.me.width);
          }),
          this.me.on('mousemove', this, () => {
            i._during_drag && e.runWith(i.me.mouseX / i.me.width);
          }),
          this.me.on('mouseout', this, () => {
            i._during_drag = false;
          }),
          this.me.on('mouseup', this, () => {
            i._during_drag = false;
          });
      }
      return (t.prototype.refresh = function(t) {
        let e = t;
        e < 0 ? (e = 0) : e > 1 && (e = 1),
          (this.bar.width = e * this.me.width),
          (this.point.x = e * this.me.width);
      }),
      t
    ;
    })();

  const i = (() => {
    function t(t, i, n, a, r) {
      const s = this;
      (this.me = t),
        (this._get_on = i),
        (this._set_on = n),
        (this._get_val = a),
        (this._set_val = r),
        (this.slider = new e(
          this.me.getChildByName('slider'),
          new Laya.Handler(this, t => {
            s._set_val.runWith(t), s._set_on.runWith(true), s.refresh();
          })
        )),
        (this.btn_mute = this.me
          .getChildByName('checkbox')
          .getChildByName('btn')),
        (this.check = this.me
          .getChildByName('checkbox')
          .getChildByName('checkbox')),
        (this.btn_mute.clickHandler = new Laya.Handler(this, () => {
          s._set_on.runWith(!s._get_on.run()), s.refresh();
        }));
    }
    return (t.prototype.refresh = function() {
      const t = this._get_on.run();
      this._get_val.run();
      (this.check.visible = t),
        (this.slider.bar.gray = !t),
        (this.slider.point.gray = !t),
        this.slider.refresh(this._get_val.run());
    }),
    t
  ;
  })();

  const n = (() => {
    function t(t, e, i) {
      const n = this;
      (this.me = t),
        (this._get_on = e),
        (this._set_on = i),
        (this.btn = this.me.getChildByName('checkbox').getChildByName('btn')),
        (this.check = this.me
          .getChildByName('checkbox')
          .getChildByName('checkbox')),
        (this.label = this.me
          .getChildByName('checkbox')
          .getChildByName('label')),
        (this.btn.clickHandler = new Laya.Handler(this, () => {
          n._set_on.run();
        }));
    }
    return (t.prototype.refresh = function() {
      const t = this._get_on.run();
      (this.check.visible = t),
        this.label && (this.label.color = t ? '#cad4f7' : '#9ba1b2');
    }),
    t
  ;
  })();

  const a = (() => {
    function t(t) {
      this.me = t;
    }
    return (t.prototype.onShow = () => {}),
    (t.prototype.show = function(t) {
      t
        ? ((this.me.visible = true), this.onShow())
        : ((this.me.visible = false), (this.me.height = 0));
    }),
    t
  ;
  })();

  const r = (e => {
    function a(a) {
      const r = e.call(this, a) || this;
      (r.music_controll = null),
        (r.audio_controll = null),
        (r.lizhi_controll = null),
        (r.yuyin_controll = null),
        (r.btn_detail_music = null),
        (r.container_bgm = null),
        (r.bgm_list_lobby = null),
        (r.bgm_list_mj = null),
        (r.fps_controll = null),
        (r.fpslow_controll = null),
        (r.btn_bgm = null),
        (r.music_controll = new i(
          r.me.getChildByName('audio').getChildByName('music'),
          new Laya.Handler(r, () => !view.AudioMgr.musicMuted),
          new Laya.Handler(r, t => {
            h.Inst.locking || (view.AudioMgr.musicMuted = !t);
          }),
          new Laya.Handler(r, () => view.AudioMgr.musicVolume),
          new Laya.Handler(r, t => {
            h.Inst.locking || (view.AudioMgr.musicVolume = t);
          })
        )),
        (r.audio_controll = new i(
          r.me.getChildByName('audio').getChildByName('audio'),
          new Laya.Handler(r, () => !view.AudioMgr.audioMuted),
          new Laya.Handler(r, t => {
            h.Inst.locking || (view.AudioMgr.audioMuted = !t);
          }),
          new Laya.Handler(r, () => view.AudioMgr.audioVolume),
          new Laya.Handler(r, t => {
            h.Inst.locking || (view.AudioMgr.audioVolume = t);
          })
        )),
        (r.lizhi_controll = new i(
          r.me.getChildByName('audio').getChildByName('lizhi'),
          new Laya.Handler(r, () => !view.AudioMgr.lizhiMuted),
          new Laya.Handler(r, t => {
            h.Inst.locking || (view.AudioMgr.lizhiMuted = !t);
          }),
          new Laya.Handler(r, () => view.AudioMgr.lizhiVolume),
          new Laya.Handler(r, t => {
            h.Inst.locking || (view.AudioMgr.lizhiVolume = t);
          })
        )),
        (r.yuyin_controll = new i(
          r.me.getChildByName('audio').getChildByName('yuyin'),
          new Laya.Handler(r, () => !view.AudioMgr.yuyinMuted),
          new Laya.Handler(r, t => {
            h.Inst.locking || (view.AudioMgr.yuyinMuted = !t);
          }),
          new Laya.Handler(r, () => view.AudioMgr.yuyinVolume),
          new Laya.Handler(r, t => {
            h.Inst.locking || (view.AudioMgr.yuyinVolume = t);
          })
        ));
      const s = t => {
                const e = Laya.LocalStorage.getItem('fpsmode');
                return 0 == t ? 'slow' != e : 'slow' == e;
              },
            o = t => {
              let e = 'fast';
              (e = 0 == t ? 'fast' : 'slow'),
                Laya.LocalStorage.getItem('fpsmode') != e &&
                  ((h.Inst.btn_restart.visible = true),
                  Laya.LocalStorage.setItem('fpsmode', e),
                  r.fps_controll.refresh(),
                  r.fpslow_controll.refresh());
            };
      return (r.block_fps = r.me.getChildByName('other')),
      (r.fps_controll = new n(
        r.me.getChildByName('other').getChildByName('fps'),
        new Laya.Handler(r, s, [0]),
        new Laya.Handler(r, o, [0])
      )),
      (r.fpslow_controll = new n(
        r.me.getChildByName('other').getChildByName('fpslow'),
        new Laya.Handler(r, s, [1]),
        new Laya.Handler(r, o, [1])
      )),
      (r.container_bgm = r.me
        .getChildByName('audio')
        .getChildByName('bgm')),
      (r.bgm_list_lobby = new t.UI_Bgm_List(
        r.container_bgm.getChildByName('lobby'),
        true
      )),
      (r.bgm_list_mj = new t.UI_Bgm_List(
        r.container_bgm.getChildByName('mj'),
        false
      )),
      (r.btn_bgm = r.me.getChildByName('audio').getChildByName('btn_bgm')),
      (r.btn_bgm.clickHandler = new Laya.Handler(r, () => {
        r.container_bgm.visible
          ? ((r.container_bgm.visible = false), (r.btn_bgm.rotation = 0))
          : ((r.container_bgm.visible = true), (r.btn_bgm.rotation = 180)),
          r.refresh();
      })),
      r
    ;
    }
    return __extends(a, e),
    (a.prototype.onShow = function() {
      this.music_controll.refresh(),
        this.audio_controll.refresh(),
        this.lizhi_controll.refresh(),
        this.yuyin_controll.refresh(),
        this.fps_controll.refresh(),
        this.fpslow_controll.refresh(),
        (this.me.height = 778),
        this.bgm_list_lobby.show(),
        this.bgm_list_mj.show(),
        (this.container_bgm.visible = false),
        (this.btn_bgm.rotation = 0),
        this.refresh();
    }),
    (a.prototype.onBgmChange = function() {
      this.me.visible &&
        (this.bgm_list_lobby.refresh(), this.bgm_list_mj.refresh());
    }),
    (a.prototype.refresh = function() {
      let t = 86;
      (this.music_controll.me.y = t),
        (t += 120),
        this.container_bgm.visible &&
          ((this.container_bgm.y = t),
          (t += 20),
          (this.bgm_list_lobby.me.y = 20),
          (t += this.bgm_list_lobby.h),
          (t += 20),
          (this.bgm_list_mj.me.y =
            this.bgm_list_lobby.me.y + this.bgm_list_lobby.h + 20),
          (t += this.bgm_list_mj.h),
          (t += 20),
          (this.container_bgm.height =
            20 + this.bgm_list_lobby.h + 20 + this.bgm_list_mj.h + 20),
          (t += 20)),
        (this.audio_controll.me.y = t),
        (t += 120),
        (this.lizhi_controll.me.y = t),
        (t += 120),
        (this.yuyin_controll.me.y = t),
        (t += 120),
        (this.block_fps.y = t),
        (this.me.height = t + this.block_fps.height),
        h.Inst.panel.refresh();
    }),
    a
  ;
  })(a);

  const s = (e => {
    function i(t) {
      const i = e.call(this, t) || this;
      (i.click1_controll = null),
        (i.click2_controll = null),
        (i.click3_controll = null),
        (i.comment_controlls = []),
        (i.comment_change_cd = 0),
        (i.tile_sets = []),
        (i.click1_controll = new n(
          i.me.getChildByName('confrontation').getChildByName('click1'),
          new Laya.Handler(i, i.chupai_getter, [0]),
          new Laya.Handler(i, i.chupai_setter, [0])
        )),
        (i.click2_controll = new n(
          i.me.getChildByName('confrontation').getChildByName('click2'),
          new Laya.Handler(i, i.chupai_getter, [1]),
          new Laya.Handler(i, i.chupai_setter, [1])
        )),
        (i.click3_controll = new n(
          i.me.getChildByName('confrontation').getChildByName('click3'),
          new Laya.Handler(i, () => 1 == view.DesktopMgr.double_click_pass),
          new Laya.Handler(i, () => {
            (view.DesktopMgr.double_click_pass ^= 1),
              Laya.LocalStorage.setItem(
                'double_click_pass',
                view.DesktopMgr.double_click_pass.toString()
              ),
              i.click3_controll.refresh();
          })
        ));
      for (a = 0; a < 3; a++)
        i.comment_controlls.push(
          new n(
            i.me
              .getChildByName('comment')
              .getChildByName(`click${(a + 1).toString()}`),
            new Laya.Handler(i, i.comment_getter, [a]),
            new Laya.Handler(i, i.comment_setter, [a])
          )
        );
      i.contianer_tile_set = i.me.getChildByName('tileset');
      for (var a = 1; a <= 2; a++)
        i.tile_sets.push(
          new n(
            i.contianer_tile_set.getChildByName(`click${a.toString()}`),
            new Laya.Handler(i, i.tile_set_getter, [a]),
            new Laya.Handler(i, i.tile_set_setter, [a])
          )
        );
      return i;
    }
    return __extends(i, e),
    (i.prototype.chupai_getter = t => view.DesktopMgr.click_prefer == t),
    (i.prototype.chupai_setter = function(t) {
      view.DesktopMgr.click_prefer != t &&
        ((view.DesktopMgr.click_prefer = t),
        Laya.LocalStorage.setItem('click_prefer', t.toString()),
        this.click1_controll.refresh(),
        this.click2_controll.refresh());
    }),
    (i.prototype.comment_getter = t => GameMgr.Inst.comment_allow == t),
    (i.prototype.comment_setter = function(e) {
      const i = this;
      GameMgr.Inst.comment_allow != e &&
        (Laya.timer.currTimer < this.comment_change_cd ||
          ((this.comment_change_cd = Laya.timer.currTimer + 1e3),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'updateCommentSetting',
            { comment_allow: e },
            (n, a) => {
              if (n || a.error)
                t.UIMgr.Inst.showNetReqError('updateCommentSetting', n, a),
                  (i.comment_change_cd = 0);
              else {
                (GameMgr.Inst.comment_allow = e), (i.comment_change_cd = 0);
                for (let r = 0; r < i.comment_controlls.length; r++)
                  i.comment_controlls[r].refresh();
              }
            }
          )));
    }),
    (i.prototype.tile_set_getter = t => 1 == t ? view.DesktopMgr.en_mjp : !view.DesktopMgr.en_mjp),
    (i.prototype.tile_set_setter = function(t) {
      const e = 1 == t;
      if (e != view.DesktopMgr.en_mjp) {
        game.LocalStorage.setItem('en_mjp', e ? 'true' : 'false'),
          (view.DesktopMgr.en_mjp = e),
          GameMgr.Inst.load_mjp_view(GameMgr.Inst.mjp_item_id);
        for (let i = 0; i < this.tile_sets.length; i++)
          this.tile_sets[i].refresh();
      }
    }),
    (i.prototype.onShow = function() {
      this.click1_controll.refresh(),
        this.click2_controll.refresh(),
        this.click3_controll.refresh();
      for (e = 0; e < this.comment_controlls.length; e++)
        this.comment_controlls[e].refresh();
      if ('en' == GameMgr.client_language) {
        this.contianer_tile_set.visible = true;
        for (var e = 0; e < this.tile_sets.length; e++)
          this.tile_sets[e].refresh();
        game.Tools.setGrayDisable(
          this.contianer_tile_set,
          !t.UI_Lobby.Inst.enable
        ),
          (this.me.height = 804);
      } else (this.contianer_tile_set.visible = false), (this.me.height = 480);
    }),
    i
  ;
  })(a);

  const o = (t => {
    function e(e) {
      const n = t.call(this, e) || this;
      return (n.chara_ids = []),
      (n.cells = []),
      (n.cvs = []),
      (n.templete = n.me
        .getChildByName('CharacterVoice')
        .getChildByName('templete')),
      (n.templete.visible = false),
      cfg.item_definition.character.forEach(({open, id}) => {
        open &&
          (n.chara_ids.push(id),
          n.cells.push(
            n.templete.scriptMap['capsui.UICopy'].getNodeClone()
          ));
      }),
      Laya.timer.frameOnce(5, n, () => {
        for (
          let t = t => {
                  const e = n.cells[t], a = n.chara_ids[t];
                  n.cvs.push({
                    img: e.getChildByName('img'),
                    controller: new i(
                      e,
                      new Laya.Handler(n, () => !view.AudioMgr.getCVmute(a)),
                      new Laya.Handler(n, t => {
                        h.Inst.locking || view.AudioMgr.setCVmute(a, !t);
                      }),
                      new Laya.Handler(n, () => view.AudioMgr.getCVvolume(a)),
                      new Laya.Handler(n, t => {
                        h.Inst.locking || view.AudioMgr.setCVvolume(a, t);
                      })
                    )
                  }),
                    (e.x = t % 2 == 0 ? -15 : 510),
                    (e.y = 110 * Math.floor(t / 2) + 110),
                    (e.visible = true);
                },
              e = 0;
          e < n.chara_ids.length;
          e++
        )
          t(e);
      }),
      n
    ;
    }
    return __extends(e, t),
    (e.prototype.onShow = function() {
      for (let t = 0; t < this.chara_ids.length; t++) {
        const e = cfg.item_definition.character.get(this.chara_ids[t]), i = cfg.item_definition.skin.get(e.init_skin);
        game.LoadMgr.setImgSkin(this.cvs[t].img, `${i.path}/smallhead.png`),
          this.cvs[t].controller.refresh();
      }
      this.me.height = 130 + 110 * Math.ceil(this.chara_ids.length / 2);
    }),
    e
  ;
  })(a);

  const l = (e => {
    function i(i) {
      const n = e.call(this, i) || this;
      (n.block_other = i.getChildByName('Other')),
        (n.block_renzheng = i.getChildByName('renzheng')),
        (n.block_account = i.getChildByName('account'));
      return (n.block_other.getChildByName(
        'btn_gift'
      ).clickHandler = new Laya.Handler(n, () => {
        h.Inst.locking || (h.Inst.hide(), t.UI_Giftcode.Inst.show());
      })),
      (n.block_other.getChildByName(
        'btn_rule'
      ).clickHandler = new Laya.Handler(n, () => {
        h.Inst.locking || (h.Inst.hide(), t.UI_Rules.Inst.show(0));
      })),
      (n.block_other.getChildByName('jp').visible = false),
      (n.block_other.getChildByName('en').visible = false),
      'en' == GameMgr.client_language
        ? ((n.block_other.getChildByName('en').visible = true),
          348,
          (n.block_other
            .getChildByName('en')
            .getChildByName('btn0').clickHandler = new Laya.Handler(
            n,
            () => {
              h.Inst.hide(),
                t.UI_User_Xieyi_enjp.Inst.show('docs/contact_us.txt');
            }
          )),
          (n.block_other
            .getChildByName('en')
            .getChildByName('btn1').clickHandler = new Laya.Handler(
            n,
            () => {
              h.Inst.hide(),
                t.UI_User_Xieyi_enjp.Inst.show('docs/term_of_service.txt');
            }
          )),
          (n.block_other
            .getChildByName('en')
            .getChildByName('btn2').clickHandler = new Laya.Handler(
            n,
            () => {
              h.Inst.hide(),
                t.UI_User_Xieyi_enjp.Inst.show('docs/privacy_policy.txt');
            }
          )))
        : 'jp' == GameMgr.client_language &&
          ((n.block_other.getChildByName('jp').visible = true),
          429,
          (n.block_other
            .getChildByName('jp')
            .getChildByName('btn0').clickHandler = new Laya.Handler(
            n,
            () => {
              h.Inst.hide(),
                t.UI_User_Xieyi_enjp.Inst.show('docs/jp_liyongguiyue.txt');
            }
          )),
          (n.block_other
            .getChildByName('jp')
            .getChildByName('btn1').clickHandler = new Laya.Handler(
            n,
            () => {
              h.Inst.hide(),
                t.UI_User_Xieyi_enjp.Inst.show('docs/jp_falv1.txt');
            }
          )),
          (n.block_other
            .getChildByName('jp')
            .getChildByName('btn2').clickHandler = new Laya.Handler(
            n,
            () => {
              h.Inst.hide(),
                t.UI_User_Xieyi_enjp.Inst.show('docs/jp_yinsixieyi.txt');
            }
          )),
          (n.block_other
            .getChildByName('jp')
            .getChildByName('btn3').clickHandler = new Laya.Handler(
            n,
            () => {
              h.Inst.hide(),
                t.UI_User_Xieyi_enjp.Inst.show('docs/jp_falv2.txt');
            }
          ))),
      (n.block_account
        .getChildByName('mail')
        .getChildByName('unbind')
        .getChildByName('btn').clickHandler = new Laya.Handler(
        n,
        () => {
          h.Inst.locking ||
            (h.Inst.hide(),
            GameMgr.Inst.sociotype >= 1
              ? t.UI_Bind_Mail0.Inst.show()
              : t.UI_Bind_Mail1.Inst.show());
        }
      )),
      n
    ;
    }
    return __extends(i, e),
    (i.prototype.onShow = function() {
      let e = 273;
      if (
        ('jp' == GameMgr.client_language
          ? (e = 348)
          : 'en' == GameMgr.client_language && (e = 429),
        'chs' != GameMgr.client_language)
      )
        this.block_renzheng.visible = false;
      else {
        (this.block_renzheng.visible = true),
          (this.block_renzheng.y = e),
          (e += this.block_renzheng.height);
        const i = this.block_renzheng.getChildByName('RealName'), n = i.getChildByName('other');
        if (t.UI_ShiMingRenZheng.renzhenged) {
          const a = (r = i.getChildByName('btn')).getChildByName('label');
          (a.text = '已认证'),
            (a.color = '#72f882'),
            (n.text = ''),
            (r.mouseEnabled = false);
        } else {
          (n.text = '尚未认证'), (n.color = '#ff5757');
          var r = i.getChildByName('btn');
          (r.visible = true),
            (r.mouseEnabled = true),
            (r.clickHandler = Laya.Handler.create(
              this,
              () => {
                h.Inst.locking ||
                  (h.Inst.hide(), t.UI_ShiMingRenZheng.Inst.show());
              },
              null,
              false
            ));
        }
      }
      if ('chs' != GameMgr.client_language) this.block_account.visible = false;
      else {
        (this.block_account.visible = true),
          (this.block_account.y = e),
          (e += this.block_account.height);
        const s = this.block_account.getChildByName('mail');
        GameMgr.Inst.account_data.email_verify
          ? ((s.getChildByName('unbind').visible = false),
            (s.getChildByName('binded').visible = true),
            (s.getChildByName('binded').getChildByName('mail').text =
              `(${GameMgr.Inst.account_data.email})`))
          : ((s.getChildByName('unbind').visible = true),
            GameMgr.Inst.account_data.email
              ? ((s
                  .getChildByName('unbind')
                  .getChildByName('btn')
                  .getChildByName('l0').text = game.Tools.strOfLocalization(
                  2788
                )),
                (s.getChildByName('unbind').getChildByName('l1').text =
                  `(${GameMgr.Inst.account_data.email})`))
              : ((s
                  .getChildByName('unbind')
                  .getChildByName('btn')
                  .getChildByName('l0').text = game.Tools.strOfLocalization(
                  2704
                )),
                (s
                  .getChildByName('unbind')
                  .getChildByName('l1').text = game.Tools.strOfLocalization(
                  2705
                ))),
            (s.getChildByName('binded').visible = false));
      }
      this.me.height = e + 100;
    }),
    i
  ;
  })(a);

  var h = (e => {
    function i() {
      const t = e.call(this, new ui.both_ui.configUI()) || this;
      return (
        (t.container_tabs = null),
        (t.pages = []),
        (t.btn_restart = null),
        (t.btn_save = null),
        (t._scrollbar = null),
        (t._scrollpoint = null),
        (t._drag_scroll = false),
        (t.locking = false),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const e = this;
      (this.root = this.me.getChildByName('root')),
        (this.panel = this.root.getChildByName('Panel')),
        this.pages.push(new r(this.panel.getChildByName('ConCenter'))),
        this.pages.push(new s(this.panel.getChildByName('PreCenter'))),
        this.pages.push(new o(this.panel.getChildByName('CVCenter'))),
        this.pages.push(new l(this.panel.getChildByName('OtherCenter'))),
        (this.panel.vScrollBar.visible = false),
        (this._scrollbar = this.root.getChildByName('scrollbar')),
        (this._scrollpoint = this._scrollbar.getChildByName('scrollpoint')),
        this._scrollbar &&
          (this._scrollbar.on('mousedown', this, () => {
            (e._drag_scroll = true),
              e.panel.vScrollBar.stopScroll(),
              (e.panel.vScrollBar.value =
                (e._scrollbar.mouseY / e._scrollbar.height) *
                e.panel.vScrollBar.max);
          }),
          this._scrollbar.on('mousemove', this, () => {
            e._drag_scroll &&
              (e.panel.vScrollBar.stopScroll(),
              (e.panel.vScrollBar.value =
                (e._scrollbar.mouseY / e._scrollbar.height) *
                e.panel.vScrollBar.max));
          }),
          this._scrollbar.on('mouseup', this, () => {
            e._drag_scroll = false;
          }),
          this._scrollbar.on('mouseout', this, () => {
            e._drag_scroll = false;
          }),
          this.panel.vScrollBar.on('change', this, () => {
            e._scrollpoint.y =
              ((e._scrollbar.height - e._scrollpoint.height) *
                e.panel.vScrollBar.value) /
              e.panel.vScrollBar.max;
          })),
        (this.root.getChildByName(
          'btn_close'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            e.locking || e.hide();
          },
          null,
          false
        )),
        (this.root.getChildByName(
          'btn_logout'
        ).clickHandler = Laya.Handler.create(
          this,
          () => {
            t.UI_SecondConfirm.Inst.show(
              game.Tools.strOfLocalization(2718),
              Laya.Handler.create(e, () => {
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'logout',
                  {},
                  () => {}
                ),
                  Laya.LocalStorage.setItem('_pre_sociotype', ''),
                  Laya.Browser.window.conch
                    ? Laya.Browser.window.conch &&
                      Laya.Browser.window.conch.exit &&
                      Laya.Browser.window.conch.exit()
                    : (Laya.Browser.window.location.href =
                        GameMgr.Inst.link_url);
              })
            ),
              e.hide();
          },
          null,
          false
        )),
        (this.container_tabs = this.root.getChildByName('ButtonCrew'));
      for (
        let i = t => {
                n.root
                  .getChildByName('ButtonCrew')
                  .getChildByName(`btn${t}`).clickHandler = new Laya.Handler(
                  n,
                  () => {
                    e.locking || e.refresh_tab(t);
                  }
                );
              },
            n = this,
            a = 0;
        a < 4;
        a++
      )
        i(a);
      (this.btn_restart = this.root.getChildByName('btn_restart')),
        (this.btn_restart.clickHandler = Laya.Handler.create(
          this,
          () => {
            Laya.Browser.window.conch
              ? Laya.Browser.window.conch &&
                Laya.Browser.window.conch.exit &&
                Laya.Browser.window.conch.exit()
              : (Laya.Browser.window.location.href = GameMgr.Inst.link_url);
          },
          null,
          false
        )),
        (this.root.getChildByName('version').text =
          `${game.Tools.strOfLocalization(2040)}:${game.ResourceVersion.version}`);
    }),
    (i.prototype.refresh_tab = function(t) {
      for (i = 0; i < 4; i++) {
        e = this.container_tabs.getChildByName(`btn${i}`);
        this.container_tabs.setChildIndex(e, 0),
          (e.skin = game.Tools.localUISrc(
            'myres/bothui/tab_unchoose2.png'
          ));
      }
      var e = this.container_tabs.getChildByName(`btn${t}`);
      this.container_tabs.setChildIndex(
        e,
        this.container_tabs.numChildren - 1
      ),
        (e.skin = game.Tools.localUISrc('myres/bothui/tab_choosed2.png'));
      for (var i = 0; i < this.pages.length; i++)
        this.pages[i].show(i == t);
      (this._drag_scroll = false),
        this.panel.refresh(),
        (this._scrollpoint.y = 0),
        (this.panel.vScrollBar.value = 0),
        (this._scrollbar.visible = this.panel.vScrollBar.max > 0);
    }),
    (i.prototype.show = function() {
      const e = this;
      GameMgr.Inst.BehavioralStatistics(17),
        this.refresh_tab(0),
        (this.locking = true),
        (this.enable = true),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = false;
          })
        );
    }),
    (i.prototype.hide = function() {
      const e = this;
      (this.locking = true),
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            (e.locking = false), (e.enable = false);
          })
        );
    }),
    (i.prototype.onBgmChange = function() {
      this.enable && this.pages[0].onBgmChange();
    }),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);

  t.UI_Config = h;
})(uiscript || (uiscript = {}));