const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (() => () => {})();

  const i = (() => {
    function e(t) {
      (this.me = t),
        (this.me.visible = !1),
        (this.label0 = this.me.getChildByName('label0')),
        (this.num0_init = this.me.getChildByName('num0_init')),
        (this.num0_add = this.me.getChildByName('num0_add')),
        (this.label1 = this.me.getChildByName('label1')),
        (this.num1_init = this.me.getChildByName('num1_init')),
        (this.num1_add = this.me.getChildByName('num1_add')),
        (this.me_x_start = this.me.x);
    }
    return (e.prototype.show = function(e, i, n) {
      const a = this;
      if (
        ((this.me.visible = !1),
        view.DesktopMgr.Inst.mode != view.EMJMode.play)
      )
        return 0;
      if (
        !t.UI_Activity.activity_is_running(
          t.UI_Activity_DuanWu_Point.activity_id
        )
      )
        return 0;
      const r = view.DesktopMgr.Inst.game_config;
      (this.label0.visible = !1),
        (this.num0_init.visible = !1),
        (this.num0_add.visible = !1),
        (this.label1.visible = !1),
        (this.num1_init.visible = !1),
        (this.num1_add.visible = !1);
      let s = 0;
      return (s += 0),
      Laya.timer.once(e + s, this, () => {
        (a.me.visible = !0),
          (a.me.alpha = 0),
          (a.me.x = a.me_x_start - 200),
          Laya.Tween.to(a.me, { alpha: 1, x: a.me_x_start }, 200);
      }),
      (s += 600),
      Laya.timer.once(e + s, this, () => {
        let e = 300;
        e = a.func_show(
          a.label0,
          a.num0_init,
          a.num0_add,
          view.DesktopMgr.Inst.state_cache.duanwu_point,
          i,
          n,
          t.UI_Activity_DuanWu_Point.max_point(),
          e
        );
        let s = !1;
        if (
          t.UI_Activity.activity_is_running(
            t.UI_Activity_DuanWu_Rank.activity_id
          )
        ) {
          const o = r.meta;
          if (o) {
            const l = cfg.desktop.matchmode.get(o.mode_id);
            l && l.can_sumup && l.gcarry > 0 && (s = !0);
          }
        }
        s &&
          ((e += 30),
          a.func_show(
            a.label1,
            a.num1_init,
            a.num1_add,
            view.DesktopMgr.Inst.state_cache.duanwu_rank,
            i,
            n,
            -1,
            e
          ));
      }),
      (s += 1800)
    ;
    }),
    (e.prototype.func_show = function(t, e, i, n, a, r, s, o) {
      view.DesktopMgr.Inst.rule_mode == view.ERuleMode.Liqi3 &&
        ((a = Math.floor(a / 3)), (r = Math.floor(r / 3)));
      let l = n + a;
      if (
        (s >= 0 && l > s && (l = s),
        (n = n + a - r),
        s >= 0 && n > s && (n = s),
        (r = l - n) < 0 && (r = 0),
        (t.visible = !0),
        (i.visible = !0),
        (e.visible = !0),
        (e.text = l.toString()),
        (i.text = r > 0 ? `+${r.toString()}` : ''),
        (t.x = o),
        (o += t.textField.textWidth * t.scaleX),
        (e.x = o),
        (o += 10),
        (o += e.textField.textWidth * e.scaleX),
        (i.x = o),
        (o += i.textField.textWidth * i.scaleX),
        (e.text = n.toString()),
        (t.alpha = 0),
        (e.alpha = 0),
        (i.alpha = 0),
        Laya.Tween.to(t, { alpha: 1 }, 150, null, null, 0),
        Laya.Tween.to(e, { alpha: 1 }, 150, null, null, 0),
        Laya.Tween.to(i, { alpha: 1 }, 150, null, null, 0),
        r > 0)
      ) {
        for (
          let h = t => {
                  const a = Math.floor((t / 10) * r);
                  Laya.timer.once(1200 + 50 * t, c, () => {
                    (i.text = `+${(r - a).toString()}`),
                      (e.text = (n + a).toString());
                  });
                },
              c = this,
              u = 0;
          u < 10;
          u++
        )
          h(u);
        Laya.timer.once(1700, this, () => {
          (i.text = ''), (e.text = l.toString());
        });
      }
      return o;
    }),
    e
  ;
  })();

  const n = (n => {
    function a() {
      const t = n.call(this, new ui.mj.winUI()) || this;
      return (
        (t.root = null),
        (t.label_chang = null),
        (t.label_winner_name = null),
        (t.img_mode = null),
        (t.container_hand = null),
        (t.img_hands = []),
        (t.container_dora = null),
        (t.img_doras = []),
        (t.container_lidora = null),
        (t.img_lidoras = []),
        (t.container_fan_yiman = null),
        (t.container_fan_liuju = null),
        (t.container_fan_8 = null),
        (t.container_fan_12 = null),
        (t.container_fan_15 = null),
        (t.fan_imgs = []),
        (t.fu_imgs = []),
        (t.img_yiman = null),
        (t.score_imgs = []),
        (t.btn_confirm = null),
        (t.container_title = null),
        (t.container_score = null),
        (t.container_fan = null),
        (t.container_fu = null),
        (t.count_down = null),
        (t.illust = null),
        (t.illust_rect = null),
        (t.liujumanguan = !1),
        (t.data = null),
        (t.current_index = 0),
        (t.effect_yiman = null),
        (a.Inst = t),
        t
      );
    }
    return __extends(a, n),
    (a.prototype.onCreate = function() {
      (this.root = this.me.getChildByName('root')),
        (this.label_winner_name = this.root
          .getChildByName('container_name')
          .getChildAt(0)),
        (this.img_mode = this.root.getChildByName('he')),
        (this.container_hand = this.root.getChildByName('container_hand')),
        (this.illust = this.root.getChildByName('xiaojiejie')),
        (this.illust_rect = t.UIRect.CreateFromSprite(this.illust)),
        (this.img_hands = []);
      for (n = 0; n < this.container_hand.numChildren; n++) {
        ((e = this.container_hand.getChildAt(n)).visible = !1),
          this.img_hands.push(e);
      }
      (this.container_dora = this.root.getChildByName('container_dora')),
        (this.img_doras = []);
      for (n = 0; n < 5; n++) {
        e = this.container_dora.getChildByName(`img${n}`);
        this.img_doras.push(e);
      }
      (this.container_lidora = this.root.getChildByName(
        'container_lidora'
      )),
        (this.img_lidoras = []);
      for (n = 0; n < 5; n++) {
        var e = this.container_lidora.getChildByName(`img${n}`);
        this.img_lidoras.push(e);
      }
      (this.container_fan_yiman = this.root.getChildByName(
        'container_fan_yiman'
      )),
        (this.container_fan_liuju = this.root.getChildByName(
          'container_fan_liuju'
        )),
        (this.container_fan_8 = this.root.getChildByName(
          'container_fan_8'
        )),
        (this.container_fan_12 = this.root.getChildByName(
          'container_fan_12'
        )),
        (this.container_fan_15 = this.root.getChildByName(
          'container_fan_15'
        )),
        (this.btn_confirm = this.root.getChildByName('btn_confirm')),
        (this.count_down = this.btn_confirm.getChildByName('countdown')),
        (this.container_title = this.root.getChildByName(
          'container_title'
        )),
        (this.container_score = this.root.getChildByName(
          'container_score'
        ));
      for (n = 0; n < 6; n++)
        this.score_imgs.push(
          this.container_score.getChildByName(`s${n.toString()}`)
        );
      (this.img_yiman = this.root
        .getChildByName('container_fanfu')
        .getChildByName('yiman')),
        (this.container_fan = this.root
          .getChildByName('container_fanfu')
          .getChildByName('fan'));
      for (n = 0; n < 2; n++)
        this.fan_imgs.push(
          this.container_fan.getChildByName(`n${n.toString()}`)
        );
      this.container_fu = this.root
        .getChildByName('container_fanfu')
        .getChildByName('fu');
      for (var n = 0; n < 3; n++)
        this.fu_imgs.push(
          this.container_fu.getChildByName(`n${n.toString()}`)
        );
      (this.container_Activity_Point = new i(
        this.root.getChildByName('container_activity_point')
      )),
        (this.btn_confirm.clickHandler = new laya.utils.Handler(
          this,
          this.onConfirm
        ));
    }),
    (a.prototype.show = function(t, e) {
      (this.liujumanguan = e),
        (this.data = t),
        (this.current_index = 0),
        this.liujumanguan
          ? this._showLiuJuManGuan(t[0])
          : this._showHule(t.hules[0]),
        (this.enable = !0);
    }),
    (a.prototype.onConfirm = function() {
      if (
        (Laya.timer.clearAll(this),
        (this.btn_confirm.disabled = !0),
        Laya.loader.clearTextureRes(this.illust.skin),
        this.effect_yiman &&
          (this.effect_yiman.destory(), (this.effect_yiman = null)),
        this.liujumanguan)
      )
        if (this.current_index < this.data.length - 1)
          this.current_index++,
            this._showLiuJuManGuan(this.data[this.current_index]);
        else {
          this.enable = !1;
          for (
            var e = [], i = 0;
            i < view.DesktopMgr.Inst.player_count;
            i++
          )
            e.push({ old_score: this.data[0].old_scores[i], delta: 0 });
          for (i = 0; i < this.data.length; i++)
            for (let n = 0; n < view.DesktopMgr.Inst.player_count; n++)
              e[n].delta += this.data[i].delta_scores[n];
          t.UI_ScoreChange.Inst.show(e);
        }
      else if (this.current_index < this.data.hules.length - 1)
        this.current_index++,
          this._showHule(this.data.hules[this.current_index]);
      else {
        (this.enable = !1), t.UI_DesktopInfo.Inst.setLiqibang(0);
        for (var e = [], i = 0; i < view.DesktopMgr.Inst.player_count; i++)
          e.push({
            old_score: this.data.old_scores[i],
            delta: this.data.delta_scores[i]
          });
        t.UI_ScoreChange.Inst.show(e);
      }
    }),
    (a.prototype.setTitle = function(t) {
      for (n = 0; n < this.container_title.numChildren; n++)
        this.container_title.getChildAt(n).visible = !1;
      if ('chs' == GameMgr.client_language) {
        e = [];
        switch (t) {
          case mjcore.E_Dadian_Title.E_Dadian_Title_manguan:
            e = ['', '', 'man', 'guan'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman:
            e = ['', '', 'tiao', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_beiman:
            e = ['', '', 'bei', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman:
            e = ['', 'san', 'bei', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman:
            e = ['lei', 'ji', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman:
            e = ['', '', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman2:
            e = ['liang', 'bei', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman3:
            e = ['san', 'bei', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman4:
            e = ['si', 'bei', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman5:
            e = ['wu', 'bei', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman6:
            e = ['liu', 'bei', 'yi', 'man'];
        }
        (i = this.container_title.getChildByName('chs')).visible = !0;
        for (n = 0; n < i.numChildren; n++) i.getChildAt(n).visible = !1;
        for (n = 0; n < e.length; n++)
          if ('' != e[n]) {
            ((a = i.getChildAt(n)).visible = !0),
              (a.skin = `myres/word_${e[n]}.png`);
          }
      } else if ('en' == GameMgr.client_language) {
        (i = this.container_title.getChildByName('en')).visible = !0;
        a = i.getChildAt(0);
        switch (t) {
          case mjcore.E_Dadian_Title.E_Dadian_Title_manguan:
            a.skin = 'en/myres/Mangan.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman:
            a.skin = 'en/myres/Haneman.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_beiman:
            a.skin = 'en/myres/Baiman.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman:
            a.skin = 'en/myres/Sanbaiman.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman:
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman:
            a.skin = 'en/myres/Yakuman.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman2:
            a.skin = 'en/myres/Double Yakuman.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman3:
            a.skin = 'en/myres/Triple Yakuman.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman4:
            a.skin = 'en/myres/Quadruple Yakuman.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman5:
            a.skin = 'en/myres/Quintuple Yakuman.png';
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman6:
            a.skin = 'en/myres/Sextuple Yakuman.png';
        }
      } else if ('jp' == GameMgr.client_language) {
        var e = [];
        switch (t) {
          case mjcore.E_Dadian_Title.E_Dadian_Title_manguan:
            e = ['', '', 'man', 'guan'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman:
            e = ['', '', 'tiao', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_beiman:
            e = ['', '', 'bei', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman:
            e = ['', 'san', 'bei', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman:
            e = ['shu', 'ji', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman:
            e = ['', '', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman2:
            e = ['er', 'bei', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman3:
            e = ['san', 'bei', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman4:
            e = ['si', 'bei', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman5:
            e = ['wu', 'bei', 'yi', 'man'];
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman6:
            e = ['liu', 'bei', 'yi', 'man'];
        }
        var i = this.container_title.getChildByName('chs');
        i.visible = !0;
        for (n = 0; n < i.numChildren; n++) i.getChildAt(n).visible = !1;
        for (var n = 0; n < e.length; n++)
          if ('' != e[n]) {
            var a;
            ((a = i.getChildAt(n)).visible = !0),
              (a.skin = `jp/myres/word_${e[n]}.png`);
          }
      }
    }),
    (a.prototype.setFanFu = function(t, e) {
      (this.container_fan.visible = this.container_fu.visible = !0),
        (this.container_fan.alpha = this.container_fu.alpha = 0);
      for (i = 0; i < 2; i++)
        if (0 == t) this.fan_imgs[i].visible = !1;
        else {
          n = t % 10;
          (t = Math.floor(t / 10)),
            (this.fan_imgs[i].visible = !0),
            (this.fan_imgs[i].skin = game.Tools.localUISrc(
              `myres/mjdesktop/h_${n.toString()}.png`
            ));
        }
      for (var i = 0; i < 3; i++)
        if (0 == e) this.fu_imgs[i].visible = !1;
        else {
          var n = e % 10;
          (e = Math.floor(e / 10)),
            (this.fu_imgs[i].visible = !0),
            (this.fu_imgs[i].skin = game.Tools.localUISrc(
              `myres/mjdesktop/ww_${n.toString()}.png`
            ));
        }
      Laya.Tween.to(this.container_fan, { alpha: 1 }, 200),
        Laya.Tween.to(this.container_fu, { alpha: 1 }, 200);
    }),
    (a.prototype._showInfo_mj = function(e) {
      const i = this;
      (this.container_Activity_Point.me.visible = !1),
        (this.root.alpha = 0),
        Laya.Tween.to(this.root, { alpha: 1 }, 500);
      this.label_winner_name.text =
        view.DesktopMgr.Inst.player_datas[e.seat].nickname;
      const n = view.DesktopMgr.Inst.player_datas[e.seat].character;
      game.Tools.charaPart(
        view.DesktopMgr.Inst.player_datas[e.seat].avatar_id,
        this.illust,
        'full',
        this.illust_rect
      ),
        2 == e.mode
          ? (this.img_mode.visible = !1)
          : ((this.img_mode.visible = !0),
            0 == e.mode
              ? (this.img_mode.skin = game.Tools.localUISrc(
                  'myres/mjdesktop/pg_zimo.png'
                ))
              : (this.img_mode.skin = game.Tools.localUISrc(
                  'myres/mjdesktop/pg_he.png'
                )));
      for (
        var a = `myres2/mjp/${GameMgr.Inst.mjp_view}/ui/`,
          r = this.img_hands[0].width,
          s = 0.5 * r,
          o = 0;
        o < this.img_hands.length;
        o++
      )
        this.img_hands[o].visible = !1;
      for (var l = 0, h = 0, c = [], o = 0; o < e.hand.length; o++)
        c.push(mjcore.MJPai.Create(e.hand[o]));
      c = c.sort(mjcore.MJPai.Distance);
      for (o = 0; o < c.length; o++)
        (this.img_hands[l].skin = game.Tools.localUISrc(
          `${a + c[o].toString()}.png`
        )),
          (this.img_hands[l].x = h),
          (this.img_hands[l].y = 0),
          (h += r),
          (this.img_hands[l].visible = !0),
          l++;
      if (e.ming && e.ming.length > 0) {
        h += s;
        for (o = 0; o < e.ming.length; o++) {
          const u = e.ming[o];
          if (')' != u.charAt(u.length - 1)) {
            if (1 == (d = u.split('|')).length) {
              m = d[0].charAt(1);
              '0' == (p = d[0].charAt(0)) && (p = '5');
              for (b = 0; b < 4; b++) {
                x = '';
                (x =
                  0 == b || 3 == b
                    ? 'back'
                    : 1 == b && '5' == p && 'z' != m
                    ? `0${m}`
                    : p + m),
                  (this.img_hands[l].skin = game.Tools.localUISrc(
                    `${a + x}.png`
                  )),
                  (this.img_hands[l].x = h),
                  (this.img_hands[l].y = 0),
                  (h += r),
                  (this.img_hands[l].visible = !0),
                  l++;
              }
            } else
              for (b = 0; b < d.length; b++) {
                x = d[b].toString();
                (this.img_hands[l].skin = game.Tools.localUISrc(
                  `${a + x}.png`
                )),
                  (this.img_hands[l].x = h),
                  (this.img_hands[l].y = 0),
                  (h += r),
                  (this.img_hands[l].visible = !0),
                  l++;
              }
          } else {
            for (var _ = '', d = [], f = 0; f < u.length; f++)
              if ('(' == u.charAt(f)) {
                (_ = u.substring(0, f)),
                  (d = u.substring(f + 1, u.length - 1).split(','));
                break;
              }
            if ('angang' == _) {
              for (
                var p = d[0].charAt(0), m = d[0].charAt(1), g = 0, y = 0;
                y < d.length;
                y++
              )
                '0' == d[y].charAt(0) && g++;
              g > 0 && (p = '5');
              for (let v = 0; v < d.length; v++) {
                x = '';
                (x = 0 == v || 3 == v ? 'back' : v <= g ? `0${m}` : p + m),
                  (this.img_hands[l].skin = game.Tools.localUISrc(
                    `${a + x}.png`
                  )),
                  (this.img_hands[l].x = h),
                  (this.img_hands[l].y = 0),
                  (h += r),
                  (this.img_hands[l].visible = !0),
                  l++;
              }
            } else
              for (var b = 0; b < d.length; b++) {
                x = d[b];
                (this.img_hands[l].skin = game.Tools.localUISrc(
                  `${a + x}.png`
                )),
                  (this.img_hands[l].x = h),
                  (this.img_hands[l].y = 0),
                  (h += r),
                  (this.img_hands[l].visible = !0),
                  l++;
              }
          }
        }
      }
      (h += s),
        2 != e.mode &&
          ((this.img_hands[l].skin = game.Tools.localUISrc(
            `${a + e.hupai}.png`
          )),
          (this.img_hands[l].x = h),
          (this.img_hands[l].y = 0),
          (h += r),
          (this.img_hands[l].visible = !0),
          l++);
      const w = ((0.72 - 0.92) * (l - 14)) / 4 + 0.92;
      this.container_hand.scaleX = this.container_hand.scaleY = w;
      for (o = 0; o < 5; o++) {
        x = 'back';
        o < e.doras.length && (x = e.doras[o]),
          (this.img_doras[o].skin = game.Tools.localUISrc(`${a + x}.png`)),
          (this.img_doras[o].x = o * r),
          (this.img_doras[o].y = 0);
      }
      if (e.lidoras && 2 != e.mode) {
        this.container_lidora.visible = !0;
        for (o = 0; o < 5; o++) {
          x = 'back';
          o < e.lidoras.length && (x = e.lidoras[o]),
            (this.img_lidoras[o].skin = game.Tools.localUISrc(
              `${a + x}.png`
            )),
            (this.img_lidoras[o].x = o * r),
            (this.img_lidoras[o].y = 0);
        }
      } else {
        this.container_lidora.visible = !0;
        for (o = 0; o < 5; o++) {
          var x = 'back';
          (this.img_lidoras[o].skin = game.Tools.localUISrc(
            `${a + x}.png`
          )),
            (this.img_lidoras[o].x = o * r),
            (this.img_lidoras[o].y = 0);
        }
      }
      const I = e.fan_names.length;
      let C = 100;
      (this.container_fan_yiman.visible = !1),
        (this.container_fan_8.visible = !1),
        (this.container_fan_15.visible = !1),
        (this.container_fan_12.visible = !1),
        (this.container_fan_liuju.visible = !1),
        (this.container_fan_yiman.visible = !1),
        (this.container_fan_8.visible = !1),
        (this.container_fan_15.visible = !1),
        (this.container_fan_12.visible = !1),
        (this.container_fan_liuju.visible = !1);
      let S = null;
      (S =
        2 == e.mode
          ? this.container_fan_liuju
          : e.yiman
          ? this.container_fan_yiman
          : I <= 8
          ? this.container_fan_8
          : I <= 12
          ? this.container_fan_12
          : this.container_fan_15).visible = !0;
      for (o = 0; o < S.numChildren; o++) S.getChildAt(o).visible = !1;
      for (var T = [], o = 0; o < e.fan_names.length; o++) {
        const M = e.fan_names[o];
        let E = 0;
        const L = e.fan_ids[o];
        9999 != L && (E = cfg.fan.fan.get(L).show_index);
        const D = { name: M, index: E };
        if (
          (e.fan_value &&
            e.fan_value.length > o &&
            (D.value = e.fan_value[o]),
          10 == L)
        )
          switch (
            (e.seat -
              view.DesktopMgr.Inst.index_ju +
              view.DesktopMgr.Inst.player_count) %
              view.DesktopMgr.Inst.player_count
          ) {
            case 0:
              D.sound = 'fan_dong';
              break;
            case 1:
              D.sound = 'fan_nan';
              break;
            case 2:
              D.sound = 'fan_xi';
              break;
            case 3:
              D.sound = 'fan_bei';
          }
        else if (11 == L)
          if (
            view.DesktopMgr.Inst.index_change % 4 ==
            (e.seat -
              view.DesktopMgr.Inst.index_ju +
              view.DesktopMgr.Inst.player_count) %
              view.DesktopMgr.Inst.player_count
          )
            switch (view.DesktopMgr.Inst.index_change % 4) {
              case 0:
                D.sound = 'fan_doubledong';
                break;
              case 1:
                D.sound = 'fan_doublenan';
                break;
              case 2:
                D.sound = 'fan_doublexi';
                break;
              case 3:
                D.sound = 'fan_doublebei';
            }
          else
            switch (view.DesktopMgr.Inst.index_change % 4) {
              case 0:
                D.sound = 'fan_dong';
                break;
              case 1:
                D.sound = 'fan_nan';
                break;
              case 2:
                D.sound = 'fan_xi';
                break;
              case 3:
                D.sound = 'fan_bei';
            }
        else if (L >= 31 && L <= 34) {
          let A = D.value;
          A > 13 && (A = 13), (D.sound = 0 == A ? '' : `fan_dora${A}`);
        } else
          9999 == L
            ? (D.sound = 'fan_liujumanguan')
            : L >= 0 && (D.sound = cfg.fan.fan.get(L).sound);
        T.push(D);
      }
      (T = T.sort(({index}, {index}) => index - index)),
        (C += 500);
      for (
        const N = t => {
                  const e = game.Tools.get_chara_audio(n, T[t].sound);
                  Laya.timer.once(C, R, () => {
                    const i = S.getChildAt(t), n = i.getChildByName('l_name');
                    if (
                      ((n.text = T[t].name),
                      (n.width = 242),
                      game.Tools.labelLocalizationSize(n, 242, 0.8),
                      void 0 !== T[t].value && null !== T[t].value)
                    ) {
                      i.getChildAt(2).visible = !0;
                      const a = T[t].value.toString();
                      2 == a.length
                        ? ((i.getChildAt(3).skin = game.Tools.localUISrc(
                            `myres/mjdesktop/h_${a[1]}.png`
                          )),
                          (i.getChildAt(3).visible = !0),
                          (i.getChildAt(4).skin = game.Tools.localUISrc(
                            `myres/mjdesktop/h_${a[0]}.png`
                          )),
                          (i.getChildAt(4).visible = !0))
                        : ((i.getChildAt(3).skin = game.Tools.localUISrc(
                            `myres/mjdesktop/h_${a[0]}.png`
                          )),
                          (i.getChildAt(3).visible = !0),
                          (i.getChildAt(4).visible = !1));
                    }
                    (i.visible = !0),
                      Laya.Tween.from(
                        i,
                        { x: 169, y: 184, alpha: 0 },
                        100,
                        Laya.Ease.strongOut
                      ),
                      e
                        ? (view.AudioMgr.PlaySound(e.path, e.volume),
                          view.AudioMgr.PlayAudio(211, 1, 0.5))
                        : view.AudioMgr.PlayAudio(211, 1, 1);
                  }),
                    (C += e && e.time_length > 500 ? e.time_length : 500);
                },
              R = this,
              o = 0;
        o < I && o < S.numChildren;
        o++
      )
        N(o);
      (this.container_fan.visible = !1),
        (this.container_fu.visible = !1),
        (this.img_yiman.visible = !1),
        e.fan && e.fu
          ? ((C += 300),
            Laya.timer.once(C, this, () => {
              view.AudioMgr.PlayAudio(208), i.setFanFu(e.fan, e.fu);
            }))
          : e.yiman &&
            ((C += 700),
            Laya.timer.once(C, this, () => {
              view.AudioMgr.PlayAudio(208),
                (i.img_yiman.alpha = 0),
                (i.img_yiman.visible = !0),
                Laya.Tween.to(i.img_yiman, { alpha: 1 }, 200);
            })),
        (this.container_score.alpha = 0);
      for (o = 0; o < this.score_imgs.length; o++)
        this.score_imgs[o].visible = !1;
      if (
        ((C += 700),
        (this.container_score.scaleX = this.container_score.scaleY = 2),
        Laya.timer.once(C, this, () => {
          for (let t = 0, n = e.score; 0 != n; ) {
            const a = n % 10;
            if (
              ((n = Math.floor(n / 10)),
              (i.score_imgs[t].skin = game.Tools.localUISrc(
                `myres/mjdesktop/ww_${a.toString()}.png`
              )),
              (i.score_imgs[t].visible = !0),
              ++t >= i.score_imgs.length)
            )
              break;
          }
          Laya.Tween.to(
            i.container_score,
            { alpha: 1, scaleX: 1.2, scaleY: 1.2 },
            200,
            Laya.Ease.strongIn
          ),
            view.AudioMgr.PlayAudio(221);
        }),
        (this.container_title.visible = !1),
        e.title_id)
      ) {
        C += 700;
        let B = 0, k = 0, P = '';
        switch (e.title_id) {
          case mjcore.E_Dadian_Title.E_Dadian_Title_manguan:
            (P = 'gameend_manguan'), (B = 214);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman:
            (P = 'gameend_tiaoman'), (B = 214);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_beiman:
            (P = 'gameend_beiman'), (B = 201);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman:
            (P = 'gameend_sanbeiman'), (B = 201);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman:
            (P = 'gameend_leijiyiman'), (k = 2), (B = 226);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman:
            (P = 'gameend_yiman1'), (k = 1), (B = 226);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman2:
            (P = 'gameend_yiman2'), (k = 2), (B = 226);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman3:
            (P = 'gameend_yiman3'), (k = 2), (B = 226);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman4:
            (P = 'gameend_yiman4'), (k = 2), (B = 226);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman5:
            (P = 'gameend_yiman5'), (k = 2), (B = 226);
            break;
          case mjcore.E_Dadian_Title.E_Dadian_Title_yiman6:
            (P = 'gameend_yiman6'), (k = 2), (B = 226);
        }
        const O = game.Tools.get_chara_audio(n, P);
        Laya.timer.once(C, this, () => {
          i.setTitle(e.title_id),
            (i.container_title.visible = !0),
            (i.container_title.alpha = 0),
            (i.container_title.scaleX = i.container_title.scaleY = 3),
            Laya.Tween.to(
              i.container_title,
              { alpha: 1, scaleX: 1.2, scaleY: 1.2 },
              300,
              Laya.Ease.strongIn
            ),
            Laya.timer.once(300, i, () => {
              0 != B && view.AudioMgr.PlayAudio(B);
            }),
            O &&
              Laya.timer.once(500, i, () => {
                view.AudioMgr.PlaySound(O.path, O.volume);
              }),
            0 != k &&
              Laya.timer.once(300, i, () => {
                let t, e;
                'en' == GameMgr.client_language
                  ? ((t = i.root.getChildByName('effect_yiman_en')),
                    (e = 'scene/effect_yiman2.lh'))
                  : 1 == k
                  ? ((t = i.root.getChildByName('effect_yiman')),
                    (e = 'scene/effect_yiman.lh'))
                  : ((t = i.root.getChildByName('effect_yiman2')),
                    (e = 'scene/effect_yiman2.lh')),
                  (i.effect_yiman = game.FrontEffect.Inst.create_ui_effect(
                    t,
                    e,
                    new Laya.Point(0, 0),
                    25
                  ));
              });
        }),
          (e.yiman || '累积役满' == e.title) && (C += 500);
      }
      if (
        view.DesktopMgr.Inst.mode == view.EMJMode.play &&
        e.seat == view.DesktopMgr.Inst.seat &&
        e.mode <= 1 &&
        t.UI_Activity.activity_is_running(
          t.UI_Activity_DuanWu_Point.activity_id
        )
      ) {
        for (
          var U = !1, o = 0;
          o < view.DesktopMgr.Inst.player_datas.length;
          o++
        ) {
          const V = view.DesktopMgr.Inst.player_datas[o];
          if (!V || !V.account_id) {
            U = !0;
            break;
          }
        }
        U
          ? (this.container_Activity_Point.me.visible = !1)
          : (C += this.container_Activity_Point.show(
              C,
              e.point_sum,
              e.score
            ));
      } else this.container_Activity_Point.me.visible = !1;
      (this.btn_confirm.visible = !1),
        (C += 300),
        (this.btn_confirm.disabled = !0),
        Laya.timer.once(C, this, () => {
          (i.btn_confirm.visible = !0),
            (i.btn_confirm.alpha = 1),
            Laya.Tween.from(i.btn_confirm, { alpha: 0 }, 200),
            (i.btn_confirm.disabled = !1);
          for (
            let t = t => {
                    Laya.timer.once(1e3 * t, i, () => {
                      i.btn_confirm.disabled ||
                        (i.count_down.text = `(${(3 - t).toString()})`);
                    });
                  },
                e = 0;
            e < 3;
            e++
          )
            t(e);
          Laya.timer.once(3e3, i, () => {
            i.btn_confirm.disabled || i.onConfirm();
          });
        });
    }),
    (a.prototype._showInfo_record = function(t) {
      (this.container_Activity_Point.me.visible = !1),
        (this.root.alpha = 0),
        Laya.Tween.to(this.root, { alpha: 1 }, 300);
      (this.label_winner_name.text =
        view.DesktopMgr.Inst.player_datas[t.seat].nickname),
        game.Tools.charaPart(
          view.DesktopMgr.Inst.player_datas[t.seat].avatar_id,
          this.illust,
          'full',
          this.illust_rect
        ),
        2 == t.mode
          ? (this.img_mode.visible = !1)
          : ((this.img_mode.visible = !0),
            0 == t.mode
              ? (this.img_mode.skin = game.Tools.localUISrc(
                  'myres/mjdesktop/pg_zimo.png'
                ))
              : (this.img_mode.skin = game.Tools.localUISrc(
                  'myres/mjdesktop/pg_he.png'
                )));
      for (
        var e = `myres2/mjp/${GameMgr.Inst.mjp_view}/ui/`,
          i = this.img_hands[0].width,
          n = 0.5 * i,
          a = 0;
        a < this.img_hands.length;
        a++
      )
        this.img_hands[a].visible = !1;
      for (var r = 0, s = 0, o = [], a = 0; a < t.hand.length; a++)
        o.push(mjcore.MJPai.Create(t.hand[a]));
      o = o.sort(mjcore.MJPai.Distance);
      for (a = 0; a < o.length; a++)
        (this.img_hands[r].skin = game.Tools.localUISrc(
          `${e + o[a].toString()}.png`
        )),
          (this.img_hands[r].x = s),
          (this.img_hands[r].y = 0),
          (s += i),
          (this.img_hands[r].visible = !0),
          r++;
      if (t.ming && t.ming.length > 0) {
        s += n;
        for (a = 0; a < t.ming.length; a++) {
          const l = t.ming[a];
          if (')' != l.charAt(l.length - 1)) {
            if (1 == (c = l.split('|')).length) {
              d = c[0].charAt(1);
              '0' == (_ = c[0].charAt(0)) && (_ = '5');
              for (g = 0; g < 4; g++) {
                v = '';
                (v =
                  0 == g || 3 == g
                    ? 'back'
                    : 1 == g && '5' == _ && 'z' != d
                    ? `0${d}`
                    : _ + d),
                  (this.img_hands[r].skin = game.Tools.localUISrc(
                    `${e + v}.png`
                  )),
                  (this.img_hands[r].x = s),
                  (this.img_hands[r].y = 0),
                  (s += i),
                  (this.img_hands[r].visible = !0),
                  r++;
              }
            } else
              for (g = 0; g < c.length; g++) {
                v = c[g].toString();
                (this.img_hands[r].skin = game.Tools.localUISrc(
                  `${e + v}.png`
                )),
                  (this.img_hands[r].x = s),
                  (this.img_hands[r].y = 0),
                  (s += i),
                  (this.img_hands[r].visible = !0),
                  r++;
              }
          } else {
            for (var h = '', c = [], u = 0; u < l.length; u++)
              if ('(' == l.charAt(u)) {
                (h = l.substring(0, u)),
                  (c = l.substring(u + 1, l.length - 1).split(','));
                break;
              }
            if ('angang' == h) {
              for (
                var _ = c[0].charAt(0), d = c[0].charAt(1), f = 0, p = 0;
                p < c.length;
                p++
              )
                '0' == c[p].charAt(0) && f++;
              f > 0 && (_ = '5');
              for (let m = 0; m < c.length; m++) {
                v = '';
                (v = 0 == m || 3 == m ? 'back' : m <= f ? `0${d}` : _ + d),
                  (this.img_hands[r].skin = game.Tools.localUISrc(
                    `${e + v}.png`
                  )),
                  (this.img_hands[r].x = s),
                  (this.img_hands[r].y = 0),
                  (s += i),
                  (this.img_hands[r].visible = !0),
                  r++;
              }
            } else
              for (var g = 0; g < c.length; g++) {
                v = c[g];
                (this.img_hands[r].skin = game.Tools.localUISrc(
                  `${e + v}.png`
                )),
                  (this.img_hands[r].x = s),
                  (this.img_hands[r].y = 0),
                  (s += i),
                  (this.img_hands[r].visible = !0),
                  r++;
              }
          }
        }
      }
      (s += n),
        2 != t.mode &&
          ((this.img_hands[r].skin = game.Tools.localUISrc(
            `${e + t.hupai}.png`
          )),
          (this.img_hands[r].x = s),
          (this.img_hands[r].y = 0),
          (s += i),
          (this.img_hands[r].visible = !0),
          r++);
      const y = ((0.72 - 0.92) * (r - 14)) / 4 + 0.92;
      this.container_hand.scaleX = this.container_hand.scaleY = y;
      for (a = 0; a < 5; a++) {
        v = 'back';
        a < t.doras.length && (v = t.doras[a]),
          (this.img_doras[a].skin = game.Tools.localUISrc(`${e + v}.png`)),
          (this.img_doras[a].x = a * i),
          (this.img_doras[a].y = 0);
      }
      if (t.lidoras && 2 != t.mode) {
        this.container_lidora.visible = !0;
        for (a = 0; a < 5; a++) {
          v = 'back';
          a < t.lidoras.length && (v = t.lidoras[a]),
            (this.img_lidoras[a].skin = game.Tools.localUISrc(
              `${e + v}.png`
            )),
            (this.img_lidoras[a].x = a * i),
            (this.img_lidoras[a].y = 0);
        }
      } else {
        this.container_lidora.visible = !0;
        for (a = 0; a < 5; a++) {
          var v = 'back';
          (this.img_lidoras[a].skin = game.Tools.localUISrc(
            `${e + v}.png`
          )),
            (this.img_lidoras[a].x = a * i),
            (this.img_lidoras[a].y = 0);
        }
      }
      const b = t.fan_names.length;
      (this.container_fan_yiman.visible = !1),
        (this.container_fan_8.visible = !1),
        (this.container_fan_15.visible = !1),
        (this.container_fan_12.visible = !1),
        (this.container_fan_liuju.visible = !1),
        (this.container_fan_yiman.visible = !1),
        (this.container_fan_8.visible = !1),
        (this.container_fan_15.visible = !1),
        (this.container_fan_12.visible = !1),
        (this.container_fan_liuju.visible = !1);
      let w = null;
      (w =
        2 == t.mode
          ? this.container_fan_liuju
          : t.yiman
          ? this.container_fan_yiman
          : b <= 8
          ? this.container_fan_8
          : b <= 12
          ? this.container_fan_12
          : this.container_fan_15).visible = !0;
      for (a = 0; a < w.numChildren; a++) w.getChildAt(a).visible = !1;
      for (var x = [], a = 0; a < t.fan_names.length; a++) {
        const I = t.fan_names[a];
        const C = t.fan_ids[a];
        let S = 0;
        9999 != C && (S = cfg.fan.fan.get(C).show_index);
        const T = { name: I, index: S };
        t.fan_value && t.fan_value.length > a && (T.value = t.fan_value[a]),
          x.push(T);
      }
      x = x.sort(({index}, {index}) => index - index);
      for (a = 0; a < b && a < w.numChildren; a++) {
        const M = w.getChildAt(a), E = M.getChildByName('l_name');
        if (
          ((E.text = x[a].name),
          (E.width = 242),
          game.Tools.labelLocalizationSize(E, 242, 0.8),
          void 0 !== x[a].value && null !== x[a].value)
        ) {
          M.getChildAt(2).visible = !0;
          const L = x[a].value.toString();
          2 == L.length
            ? ((M.getChildAt(3).skin = game.Tools.localUISrc(
                `myres/mjdesktop/h_${L[1]}.png`
              )),
              (M.getChildAt(3).visible = !0),
              (M.getChildAt(4).skin = game.Tools.localUISrc(
                `myres/mjdesktop/h_${L[0]}.png`
              )),
              (M.getChildAt(4).visible = !0))
            : ((M.getChildAt(3).skin = game.Tools.localUISrc(
                `myres/mjdesktop/h_${L[0]}.png`
              )),
              (M.getChildAt(3).visible = !0),
              (M.getChildAt(4).visible = !1));
        }
        M.visible = !0;
      }
      (this.container_fan.visible = !1),
        (this.container_fu.visible = !1),
        (this.img_yiman.visible = !1),
        t.fan && t.fu
          ? this.setFanFu(t.fan, t.fu)
          : t.yiman &&
            ((this.img_yiman.alpha = 0),
            (this.img_yiman.visible = !0),
            Laya.Tween.to(this.img_yiman, { alpha: 1 }, 200));
      for (a = 0; a < this.score_imgs.length; a++)
        this.score_imgs[a].visible = !1;
      for (
        const D = t.score.toString(), a = 0;
        a < D.length && !(a >= this.score_imgs.length);
        a++
      )
        (this.score_imgs[a].skin = game.Tools.localUISrc(
          `myres/mjdesktop/ww_${D.charAt(D.length - 1 - a)}.png`
        )),
          (this.score_imgs[a].visible = !0);
      (this.container_score.alpha = 1),
        (this.container_score.scaleX = this.container_score.scaleY = 1.2),
        (this.container_title.visible = !1),
        t.title_id &&
          (this.setTitle(t.title_id),
          (this.container_title.visible = !0),
          (this.container_title.alpha = 1),
          (this.container_title.scaleX = this.container_title.scaleY = 1.2)),
        (this.count_down.text = ''),
        (this.btn_confirm.visible = !0),
        (this.btn_confirm.disabled = !1),
        (this.btn_confirm.alpha = 1);
    }),
    (a.prototype._showHule = function(t) {
      const i = new e();
      if (
        ((i.seat = t.seat),
        (i.hand = t.hand),
        t.ming && (i.ming = t.ming),
        (i.hupai = t.hu_tile),
        (i.mode = t.zimo ? 0 : 1),
        (i.fan_names = []),
        (i.fan_ids = []),
        t.yiman)
      ) {
        for (
          var n = t.fans,
            a = t => {
              let e = '', a = -1;
              n[t].id
                ? ((a = n[t].id),
                  (e = cfg.fan.fan.get(a)[
                    `name_${GameMgr.client_language}`
                  ]))
                : ((e = n[t].name),
                  cfg.fan.fan.forEach(t => {
                    t.name_chs == e &&
                      ((a = t.id),
                      (e = t[`name_${GameMgr.client_language}`]));
                  })),
                i.fan_ids.push(a),
                i.fan_names.push(e);
            },
            r = 0;
          r < n.length;
          r++
        )
          a(r);
        (i.fan = 0), (i.fu = 0), (i.yiman = !0);
      } else {
        i.fan_value = [];
        for (
          const n = t.fans,
                s = t => {
                  let e = '', a = -1;
                  n[t].id
                    ? ((a = n[t].id),
                      (e = cfg.fan.fan.get(a)[
                        `name_${GameMgr.client_language}`
                      ]))
                    : ((e = n[t].name),
                      cfg.fan.fan.forEach(t => {
                        t.name_chs == e &&
                          ((a = t.id),
                          (e = t[`name_${GameMgr.client_language}`]));
                      })),
                    i.fan_ids.push(a),
                    i.fan_names.push(e),
                    i.fan_value.push(n[t].val);
                },
                r = 0;
          r < n.length;
          r++
        )
          s(r);
        (i.fan = t.count), (i.fu = t.fu), (i.yiman = !1);
      }
      if (t.title && '' != t.title)
        switch (((i.title = t.title), i.title)) {
          case '满贯':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_manguan;
            break;
          case '跳满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman;
            break;
          case '倍满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_beiman;
            break;
          case '三倍满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman;
            break;
          case '累积役满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman;
            break;
          case '役满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_yiman;
            break;
          case '两倍役满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_yiman2;
            break;
          case '三倍役满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_yiman3;
            break;
          case '四倍役满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_yiman4;
            break;
          case '五倍役满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_yiman5;
            break;
          case '六倍役满':
            i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_yiman6;
        }
      t.title_id && (i.title_id = t.title_id);
      let o = 0;
      (o = t.zimo
        ? view.DesktopMgr.Inst.rule_mode == view.ERuleMode.Liqi4
          ? t.qinjia
            ? 3 * t.point_zimo_xian
            : t.point_zimo_qin + 2 * t.point_zimo_xian
          : t.qinjia
          ? 2 * t.point_zimo_xian
          : t.point_zimo_qin + t.point_zimo_xian
        : t.point_rong),
        (i.score = o),
        (i.doras = t.doras),
        (i.point_sum = t.point_sum),
        t.liqi && (i.lidoras = t.li_doras),
        view.DesktopMgr.Inst.mode == view.EMJMode.play
          ? this._showInfo_mj(i)
          : view.DesktopMgr.Inst.mode == view.EMJMode.paipu
          ? (1 & view.DesktopMgr.Inst.paipu_config) > 0
            ? this._showInfo_mj(i)
            : this._showInfo_record(i)
          : view.DesktopMgr.Inst.mode == view.EMJMode.live_broadcast &&
            this._showInfo_mj(i);
    }),
    (a.prototype._showLiuJuManGuan = function(t) {
      const i = new e();
      (i.seat = t.seat),
        (i.hand = t.hand),
        (i.ming = t.ming),
        (i.mode = 2),
        (i.fan_names = [game.Tools.strOfLocalization(2105)]),
        (i.fan_ids = [9999]),
        (i.fan = i.fu = 0),
        (i.score = t.score),
        (i.title_id = mjcore.E_Dadian_Title.E_Dadian_Title_manguan),
        (i.doras = t.doras),
        (i.yiman = !1),
        (i.point_sum = 0),
        view.DesktopMgr.Inst.mode == view.EMJMode.play
          ? this._showInfo_mj(i)
          : view.DesktopMgr.Inst.mode == view.EMJMode.paipu
          ? this._showInfo_record(i)
          : view.DesktopMgr.Inst.mode == view.EMJMode.live_broadcast &&
            this._showInfo_mj(i);
    }),
    (a.prototype.onDisable = function() {
      Laya.timer.clearAll(this);
    }),
    a
  ;
  })(t.UIBase);

  t.UI_Win = n;
})(uiscript || (uiscript = {}));