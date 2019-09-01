let uiscript;
!(t => {
  let e;
  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.liqi4 = 1)] = 'liqi4'),
      (t[(t.liqi3 = 2)] = 'liqi3');
  })(e || (e = {}));
  let i;
  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.friend_room = 1)] = 'friend_room'),
      (t[(t.matching = 2)] = 'matching');
  })(i || (i = {}));

  const n = (() => {
      function t(t) {
        this.me = t;
      }
      return (t.prototype.show = (t, e, i) => {}),
      (t.prototype.reset = () => {}),
      t
    ;
    })();

  const a = (t => {
    function e(e) {
      const i = t.call(this, e) || this;
      (i.container_hand = null),
        (i.img_hands = []),
        (i.label_noinfo = null),
        (i.container_title = null),
        (i.container_hand = i.me.getChildByName('container_hand')),
        (i.img_hands = []);
      for (let n = 0; n < i.container_hand.numChildren; n++) {
        const a = i.container_hand.getChildAt(n);
        (a.visible = false), i.img_hands.push(a);
      }
      return (
        (i.container_title = i.me.getChildByName('container_title')),
        (i.label_noinfo = i.me.getChildByName('label_noinfo')),
        i
      );
    }
    return __extends(e, t),
    (e.prototype.show = function({statistic_data}, e, i) {
      let n = null;
      if (statistic_data)
        for (let a = 0; a < statistic_data.length; a++) {
          const r = statistic_data[a];
          if (e == r.mahjong_category && i == r.game_category) {
            n = r.statistic;
            break;
          }
        }
      if (n && n.highest_hu) {
        (this.container_hand.visible = true),
          (this.container_title.visible = true),
          this._showDaHe(
            n.highest_hu.hands,
            n.highest_hu.ming,
            n.highest_hu.hupai
          );
        let s = 0;
        if (n.highest_hu.title_id) s = n.highest_hu.title_id;
        else if (n.highest_hu.title)
          switch (n.highest_hu.title) {
            case '满贯':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_manguan;
              break;
            case '跳满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_tiaoman;
              break;
            case '倍满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_beiman;
              break;
            case '三倍满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_sanbeiman;
              break;
            case '累积役满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_leijiyiman;
              break;
            case '役满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_yiman;
              break;
            case '两倍役满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_yiman2;
              break;
            case '三倍役满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_yiman3;
              break;
            case '四倍役满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_yiman4;
              break;
            case '五倍役满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_yiman5;
              break;
            case '六倍役满':
              s = mjcore.E_Dadian_Title.E_Dadian_Title_yiman6;
          }
        this._setTitle(s), (this.label_noinfo.visible = false);
      } else
        (this.container_hand.visible = false),
          (this.container_title.visible = false),
          (this.label_noinfo.visible = true);
    }),
    (e.prototype.reset = function() {
      (this.container_hand.visible = false),
        (this.label_noinfo.visible = false),
        (this.container_title.visible = false);
    }),
    (e.prototype._showDaHe = function(t, e, i) {
      for (
        var n = this.img_hands[0].width, a = 0.5 * n, r = 0;
        r < this.img_hands.length;
        r++
      )
        this.img_hands[r].visible = false;
      for (
        var s = 0,
          o = 0,
          l =
            `myres2/mjp/${game.GameUtility.get_common_view_res_name(
  game.ECommonView.mjp
)}/ui/`,
          r = 0;
        r < t.length;
        r++
      )
        (this.img_hands[s].skin = game.Tools.localUISrc(`${l + t[r]}.png`)),
          (this.img_hands[s].x = o),
          (this.img_hands[s].y = 0),
          (o += n),
          (this.img_hands[s].visible = true),
          s++;
      if (e && e.length > 0) {
        o += a;
        for (r = 0; r < e.length; r++) {
          const h = e[r];
          if (')' != h.charAt(h.length - 1)) {
            if (1 == (u = h.split('|')).length) {
              f = u[0].charAt(1);
              '0' == (d = u[0].charAt(0)) && (d = '5');
              for (y = 0; y < 4; y++) {
                v = '';
                (v =
                  0 == y || 3 == y
                    ? 'back'
                    : 1 == y && '5' == d && 'z' != f
                    ? `0${f}`
                    : d + f),
                  (this.img_hands[s].skin = game.Tools.localUISrc(
                    `${l + v}.png`
                  )),
                  (this.img_hands[s].x = o),
                  (this.img_hands[s].y = 0),
                  (o += n),
                  (this.img_hands[s].visible = true),
                  s++;
              }
            } else
              for (y = 0; y < u.length; y++) {
                v = u[y].toString();
                (this.img_hands[s].skin = game.Tools.localUISrc(
                  `${l + v}.png`
                )),
                  (this.img_hands[s].x = o),
                  (this.img_hands[s].y = 0),
                  (o += n),
                  (this.img_hands[s].visible = true),
                  s++;
              }
          } else {
            for (var c = '', u = [], _ = 0; _ < h.length; _++)
              if ('(' == h.charAt(_)) {
                (c = h.substring(0, _)),
                  (u = h.substring(_ + 1, h.length - 1).split(','));
                break;
              }
            if ('angang' == c) {
              for (
                var d = u[0].charAt(0), f = u[0].charAt(1), p = 0, m = 0;
                m < u.length;
                m++
              )
                '0' == u[m].charAt(0) && p++;
              p > 0 && (d = '5');
              for (let g = 0; g < u.length; g++) {
                v = '';
                (v = 0 == g || 3 == g ? 'back' : g <= p ? `0${f}` : d + f),
                  (this.img_hands[s].skin = game.Tools.localUISrc(
                    `${l + v}.png`
                  )),
                  (this.img_hands[s].x = o),
                  (this.img_hands[s].y = 0),
                  (o += n),
                  (this.img_hands[s].visible = true),
                  s++;
              }
            } else
              for (var y = 0; y < u.length; y++) {
                var v = u[y];
                (this.img_hands[s].skin = game.Tools.localUISrc(
                  `${l + v}.png`
                )),
                  (this.img_hands[s].x = o),
                  (this.img_hands[s].y = 0),
                  (o += n),
                  (this.img_hands[s].visible = true),
                  s++;
              }
          }
        }
      }
      (o += a),
        (this.img_hands[s].skin = game.Tools.localUISrc(`${l + i}.png`)),
        (this.img_hands[s].x = o),
        (this.img_hands[s].y = 0),
        (o += n),
        (this.img_hands[s].visible = true);
      const b = (-0.12 * (++s - 14)) / 4 + 0.65;
      this.container_hand.scaleX = this.container_hand.scaleY = b;
    }),
    (e.prototype._setTitle = function(t) {
      for (n = 0; n < this.container_title.numChildren; n++)
        this.container_title.getChildAt(n).visible = false;
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
        (i = this.container_title.getChildByName('chs')).visible = true;
        for (n = 0; n < i.numChildren; n++) i.getChildAt(n).visible = false;
        for (n = 0; n < e.length; n++)
          if ('' != e[n]) {
            ((a = i.getChildAt(n)).visible = true),
              (a.skin = `myres/word_${e[n]}.png`);
          }
      } else if ('en' == GameMgr.client_language) {
        (i = this.container_title.getChildByName('en')).visible = true;
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
        i.visible = true;
        for (n = 0; n < i.numChildren; n++) i.getChildAt(n).visible = false;
        for (var n = 0; n < e.length; n++)
          if ('' != e[n]) {
            var a;
            ((a = i.getChildAt(n)).visible = true),
              (a.skin = `jp/myres/word_${e[n]}.png`);
          }
      }
    }),
    e
  ;
  })(n);

  const r = (i => {
    function n(e) {
      const n = i.call(this, e) || this;
      (n.fengge = []), (n.radar_triangle = []);
      const a = n.me;
      n.fengge.push(a.getChildByName('gong')),
        n.fengge.push(a.getChildByName('su')),
        n.fengge.push(a.getChildByName('fang')),
        n.fengge.push(a.getChildByName('yun'));
      for (s = 0; s < 4; s++)
        n.radar_triangle.push(
          a.getChildByName('radar').getChildByName(`sanjiao${s.toString()}`)
        );
      const r = n.me.getChildByName('what');
      if (
        (r &&
          (r.clickHandler = Laya.Handler.create(
            n,
            () => {
              t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(51));
            },
            null,
            false
          )),
        'en' == GameMgr.client_language)
      )
        for (var s = 0; s < n.fengge.length; s++) n.fengge[s].x = 150;
      return n;
    }
    return __extends(n, i),
    (n.prototype.show = function({statistic_data}, i, n) {
      const a = this;
      let r = null;
      if (statistic_data)
        for (let s = 0; s < statistic_data.length; s++) {
          const o = statistic_data[s];
          if (i == o.mahjong_category && n == o.game_category) {
            r = o.statistic;
            break;
          }
        }
      const l = [0, 0, 0, 0];
      if (
        r &&
        r.recent_20_hu_summary &&
        r.recent_20_hu_summary.total_count > 0
      ) {
        const h = r.recent_20_hu_summary.average_hu_point;
        var c = 0;
        (c =
          i == e.liqi4
            ? ((h - 3e3) / 5e3) * 100
            : ((h - 4e3) / 8e3) * 100) < 0
          ? (c = 0)
          : c > 100 && (c = 100),
          (l[0] = c);
      }
      if (r && r.recent_round && r.recent_round.total_count > 0) {
        r.recent_round.rong_count + r.recent_round.zimo_count == 0
          ? (l[1] = 0)
          : ((l[1] =
              (((r.recent_round.rong_count + r.recent_round.zimo_count) /
                r.recent_round.total_count -
                0.1) /
                0.3) *
              100),
            l[1] < 0 ? (l[1] = 0) : l[1] > 100 && (l[1] = 100));
        (c =
          100 *
          (1.12 -
            (r.recent_round.fangchong_count / r.recent_round.total_count) *
              3.4)) < 0
          ? (c = 0)
          : c > 100 && (c = 100),
          (l[2] = c);
      }
      if (
        r &&
        r.recent_10_hu_summary &&
        r.recent_10_hu_summary.total_fanshu > 0
      ) {
        (c =
          (c =
            (r.recent_10_hu_summary.total_xuanshang /
              r.recent_10_hu_summary.total_fanshu) *
            1.5 *
            100) < 0
            ? 0
            : c > 100
            ? 100
            : c),
          (l[3] = c);
      }
      this._showRadar([0, 0, 0, 0]),
        Laya.timer.once(500, this, () => {
          Laya.timer.clearAll(a);
          const t = Laya.timer.currTimer,
                e = () => {
                  const i = Laya.timer.currTimer - t;
                  if (i >= 300) a._showRadar(l), Laya.timer.clear(a, e);
                  else {
                    for (
                      var n = Laya.Ease.linearNone(i, 0, 1, 300), r = [], s = 0;
                      s < l.length;
                      s++
                    )
                      r.push(l[s] * n);
                    a._showRadar(r);
                  }
                };
          Laya.timer.frameLoop(1, a, e, null, true);
        });
    }),
    (n.prototype.reset = function() {
      Laya.timer.clearAll(this), this._showRadar([0, 0, 0, 0]);
    }),
    (n.prototype._showRadar = function(t) {
      for (e = 0; e < t.length; e++)
        this.fengge[e].text = Math.floor(t[e]).toString();
      for (var e = 0; e < t.length; e++)
        for (let i = 0; i < 2; i++) {
          const n = this.radar_triangle[e].getChildByName(
              0 == i ? 'nei' : 'wai'
            );

          let a = t[e] / 20;
          let r = t[(e + 1) % t.length] / 20;
          a <= 0.2 && (a = 0.2),
            a >= 4.8 && (a = 4.8),
            r <= 0.2 && (r = 0.2),
            r >= 4.8 && (r = 4.8),
            1 == i && ((a += 0.3), (r += 0.3));
          const s = (180 * Math.atan(r / a)) / 3.1415926, o = (108 * a) / 5, l = (108 * r) / 5;
          (n.rotation = s),
            (n.x = 0.5 * o),
            (n.y = 108 - 0.5 * l),
            (n.width = n.height = Math.sqrt(o * o + l * l) + 10);
        }
    }),
    n
  ;
  })(n);

  const s = (t => {
    function i(i) {
      const n = t.call(this, i) || this;
      (n.zoushi_points = []),
        (n.zoushi_lines = []),
        (n.mj_category = e.liqi4);
      for (
        var a = n.me, r = a.getChildByName('lines'), s = 0;
        s < r.numChildren;
        s++
      )
        n.zoushi_lines.push(r.getChildAt(s));
      for (const o = a.getChildByName('points'), s = 0; s < o.numChildren; s++)
        n.zoushi_points.push(o.getChildAt(s));
      return (
        'en' == GameMgr.client_language &&
          ((i.getChildByName('lb1').getChildByName('w').text = 'st'),
          (i.getChildByName('lb2').getChildByName('w').text = 'nd'),
          (i.getChildByName('lb3').getChildByName('w').text = 'rd'),
          (i.getChildByName('lb4').getChildByName('w').text = 'th'),
          (i.getChildByName('lb1').getChildByName('w').y = 32),
          (i.getChildByName('lb2').getChildByName('w').y = 32),
          (i.getChildByName('lb3').getChildByName('w').y = 32),
          (i.getChildByName('lb4').getChildByName('w').y = 32)),
        n
      );
    }
    return __extends(i, t),
    (i.prototype.show = function({statistic_data}, i, n) {
      const a = this;
      let r = null;
      if (((this.mj_category = i), statistic_data))
        for (let s = 0; s < statistic_data.length; s++) {
          const o = statistic_data[s];
          if (i == o.mahjong_category && n == o.game_category) {
            r = o.statistic;
            break;
          }
        }
      if (r && r.recent_10_game_result) {
        Laya.timer.clearAll(this);
        const l = r.recent_10_game_result;
        this._showZoushi([], 0),
          Laya.timer.clearAll(this),
          Laya.timer.once(500, this, () => {
            const t = l.length >= 10 ? 10 : l.length, e = Laya.timer.currTimer;
            Laya.timer.frameLoop(
              1,
              a,
              () => {
                const i = 0.01 * (Laya.timer.currTimer - e);
                i >= t
                  ? (a._showZoushi(l, t), Laya.timer.clearAll(a))
                  : a._showZoushi(l, i);
              },
              null,
              true
            );
          });
      } else Laya.timer.clearAll(this), this._showZoushi([], 0);
      (this.me.getChildByName('line4').visible = i == e.liqi4),
        (this.me.getChildByName('lb4').visible = i == e.liqi4);
    }),
    (i.prototype.reset = function() {
      this._showZoushi([], 0);
    }),
    (i.prototype._showZoushi = function(t, i) {
      let n = 0;
      n = t.length >= 10 ? t.length - 10 : 0;
      for (s = 0; s < this.zoushi_points.length; s++)
        this.zoushi_points[s].visible = false;
      for (s = 0; s < this.zoushi_lines.length; s++)
        this.zoushi_lines[s].visible = false;
      for (var a = [], r = Math.floor(i), s = 0; s + n < t.length; s++) {
        const o = (-705 * (9 - s)) / 9 + 1755, l = (-129 * (4 - t[s + n].rank)) / 3 + 991;
        a.push(new Laya.Vector2(o, l));
      }
      for (s = 0; s < a.length && !(s > r); s++) {
        (this.zoushi_points[s].visible = true),
          (this.zoushi_points[s].x = a[s].x),
          (this.zoushi_points[s].y = a[s].y);
        const h = this.mj_category == e.liqi4 ? 5e4 : 7e4;
        if (
          ((this.zoushi_points[s].skin = game.Tools.localUISrc(
            1 == t[n + s].rank && t[n + s].final_point >= h
              ? 'myres/point_high.png'
              : 'myres/point.png'
          )),
          s + 1 < a.length)
        )
          if (s == r) {
            const c = i - r;
            if (c > 0.001) {
              (this.zoushi_lines[s].visible = true),
                (this.zoushi_lines[s].x = a[s].x),
                (this.zoushi_lines[s].y = a[s].y);
              var u = a[s + 1].y - a[s].y,
                _ = a[s + 1].x - a[s].x,
                d = (180 * Math.atan(u / _)) / 3.1415926;
              (this.zoushi_lines[s].rotation = d),
                (this.zoushi_lines[s].width = Math.sqrt(_ * _ + u * u) * c);
            }
          } else {
            (this.zoushi_lines[s].visible = true),
              (this.zoushi_lines[s].x = a[s].x),
              (this.zoushi_lines[s].y = a[s].y);
            var u = a[s + 1].y - a[s].y,
              _ = a[s + 1].x - a[s].x,
              d = (180 * Math.atan(u / _)) / 3.1415926;
            (this.zoushi_lines[s].rotation = d),
              (this.zoushi_lines[s].width = Math.sqrt(_ * _ + u * u));
          }
      }
    }),
    i
  ;
  })(n);

  const o = (t => {
    function n(e, i) {
      const n = t.call(this, e) || this;
      return (
        (n.type = 0),
        (n.btn = null),
        (n.arrow = null),
        (n.indetail = false),
        (n.container_detail = null),
        (n.h_hide = 0),
        (n.h_detail = 0),
        (n.type = i),
        (n.btn = n.me.getChildByName('btn')),
        (n.btn.clickHandler = Laya.Handler.create(
          n,
          n.switchState,
          null,
          false
        )),
        (n.arrow = n.btn.getChildByName('arrow')),
        (n.container_detail = n.me.getChildByName('detail')),
        (n.h_detail = 310),
        (n.h_hide = n.btn.height),
        (n.container_detail.visible = false),
        (n.indetail = false),
        (n.me.height = n.btn.height),
        (n.arrow.rotation = 0),
        (n._pos1 = n.container_detail.getChildByName('pos1')),
        (n._pos2 = n.container_detail.getChildByName('pos2')),
        (n._pos3 = n.container_detail.getChildByName('pos3')),
        (n._pos4 = n.container_detail.getChildByName('pos4')),
        (n._knockout = n.container_detail.getChildByName('knockout')),
        (n._changci = n.container_detail.getChildByName('changci')),
        (n._dadian = n.container_detail.getChildByName('dadian')),
        (n._shunwei = n.container_detail.getChildByName('shunwei')),
        (n._lianzhuang = n.container_detail.getChildByName('lianzhuang')),
        (n._hule = n.container_detail.getChildByName('hule')),
        (n._shunwei = n.container_detail.getChildByName('shunwei')),
        (n._hupai = n.container_detail.getChildByName('hupai')),
        (n._zimo = n.container_detail.getChildByName('zimo')),
        (n._fangchong = n.container_detail.getChildByName('fangchong')),
        (n._fulu = n.container_detail.getChildByName('fulu')),
        (n._liqi = n.container_detail.getChildByName('liqi')),
        n
      );
    }
    return __extends(n, t),
    (n.prototype.show = function({detail_data}, n, a) {
      (this._pos1.text = '--/--'),
        (this._pos2.text = '--/--'),
        (this._pos3.text = '--/--'),
        (this._pos4.text = '--/--'),
        (this._knockout.text = '--/--'),
        (this._changci.text = '--/--'),
        (this._dadian.text = '--/--'),
        (this._shunwei.text = '--/--'),
        (this._lianzhuang.text = '--/--'),
        (this._hule.text = '--/--'),
        (this._hupai.text = '--/--'),
        (this._zimo.text = '--/--'),
        (this._fangchong.text = '--/--'),
        (this._fulu.text = '--/--'),
        (this._liqi.text = '--/--'),
        n == e.liqi3
          ? ((this._pos4.visible = false), (this._knockout.y = 140))
          : ((this._pos4.visible = true), (this._knockout.y = 183));
      const r = detail_data;
      if (r) {
        let s = null;
        if (
          (a == i.friend_room
            ? (s = r.friend_room_statistic)
            : a == i.matching &&
              (s = r.rank_statistic.total_statistic.all_level_statistic),
          s)
        ) {
          let o = 0;
          n == e.liqi4
            ? 1 == this.type
              ? (o = 1)
              : 2 == this.type && (o = 2)
            : n == e.liqi3 &&
              (1 == this.type ? (o = 11) : 2 == this.type && (o = 12));
          for (let l = 0; l < s.game_mode.length; l++) {
            const h = s.game_mode[l];
            if (h.mode == o) {
              const c = h.game_count_sum;
              if (c > 0) {
                (this._pos1.text =
                  `${((h.game_final_position[0] / c) * 100)
  .toFixed(2)
  .toString()}%`),
                  (this._pos2.text =
                    `${((h.game_final_position[1] / c) * 100)
  .toFixed(2)
  .toString()}%`),
                  (this._pos3.text =
                    `${((h.game_final_position[2] / c) * 100)
  .toFixed(2)
  .toString()}%`),
                  this._pos4 &&
                    (this._pos4.text =
                      `${((h.game_final_position[3] / c) * 100)
  .toFixed(2)
  .toString()}%`),
                  (this._knockout.text =
                    `${((h.fly_count / c) * 100).toFixed(2).toString()}%`),
                  (this._changci.text = c.toString());
                for (var u = 0, _ = 0; _ < 4; _++)
                  u += (_ + 1) * h.game_final_position[_];
                this._shunwei.text = (u / c).toFixed(2).toString();
              } else
                (this._pos1.text = '--/--'),
                  (this._pos2.text = '--/--'),
                  (this._pos3.text = '--/--'),
                  this._pos4 && (this._pos4.text = '--/--'),
                  (this._knockout.text = '--/--'),
                  (this._changci.text = c.toString()),
                  (this._shunwei.text = '--/--');
              let d = 0, f = 0, p = 0, m = 0;
              if (h.round_end)
                for (let g = 0; g < h.round_end.length; g++) {
                  d += h.round_end[g].sum;
                  const y = h.round_end[g].type;
                  y == mjcore.E_Round_Result.zimo &&
                    (p += h.round_end[g].sum),
                    y == mjcore.E_Round_Result.rong ||
                    y == mjcore.E_Round_Result.zimo
                      ? (f += h.round_end[g].sum)
                      : y == mjcore.E_Round_Result.fangchong &&
                        (m += h.round_end[g].sum);
                }
              d > 0
                ? ((this._hupai.text =
                    `${((f / d) * 100).toFixed(2).toString()}%`),
                  (this._fangchong.text =
                    `${((m / d) * 100).toFixed(2).toString()}%`),
                  (this._fulu.text =
                    `${((h.ming_count_sum / d) * 100).toFixed(2).toString()}%`),
                  (this._liqi.text =
                    `${((h.liqi_count_sum / d) * 100).toFixed(2).toString()}%`))
                : ((this._hupai.text = '--/--'),
                  (this._fangchong.text = '--/--'),
                  (this._fulu.text = '--/--'),
                  (this._liqi.text = '--/--')),
                f > 0
                  ? ((this._dadian.text = (h.dadian_sum / f).toFixed(0)),
                    (this._zimo.text =
                      `${((p / f) * 100).toFixed(2).toString()}%`),
                    (this._hule.text = (h.xun_count_sum / f).toFixed(2)))
                  : ((this._dadian.text = '--/--'),
                    (this._zimo.text = '--/--'),
                    (this._hule.text = '--/--')),
                null != h.highest_lianzhuang &&
                undefined != h.highest_lianzhuang
                  ? (this._lianzhuang.text = h.highest_lianzhuang)
                  : (this._lianzhuang.text = '--/--');
            }
          }
        }
      }
    }),
    (n.prototype.reset = function() {
      (this.container_detail.visible = false),
        (this.indetail = false),
        (this.me.height = this.btn.height),
        (this.arrow.rotation = 0),
        (this.container_detail.alpha = 1),
        (this._pos1.text = '--/--'),
        (this._pos2.text = '--/--'),
        (this._pos3.text = '--/--'),
        this._pos4 && (this._pos4.text = '--/--'),
        (this._knockout.text = '--/--'),
        (this._changci.text = '--/--'),
        (this._dadian.text = '--/--'),
        (this._shunwei.text = '--/--'),
        (this._lianzhuang.text = '--/--'),
        (this._hule.text = '--/--'),
        (this._hupai.text = '--/--'),
        (this._zimo.text = '--/--'),
        (this._fangchong.text = '--/--'),
        (this._fulu.text = '--/--'),
        (this._liqi.text = '--/--');
    }),
    (n.prototype.switchState = function() {
      const t = this;
      (this.indetail = !this.indetail),
        Laya.timer.clearAll(this),
        this.indetail
          ? ((this.me.height = this.h_detail),
            Laya.Tween.to(
              this.arrow,
              { rotation: -180 },
              200,
              Laya.Ease.strongOut
            ),
            Laya.timer.once(0, this, () => {
              t.container_detail.visible = true;
            }))
          : (Laya.Tween.to(
              this.arrow,
              { rotation: 0 },
              200,
              Laya.Ease.strongOut
            ),
            (this.container_detail.visible = false),
            (this.me.height = this.h_hide));
    }),
    n
  ;
  })(n);

  const l = (t => {
    function n(e, i) {
      const n = t.call(this, e) || this;
      (n.item_height = 50),
        (n.is_guyi = false),
        (n.btn = null),
        (n.arrow = null),
        (n.indetail = false),
        (n.container_detail = null),
        (n.cells = []),
        (n.items = []),
        (n.h_hide = 0),
        (n.h_detail = 0),
        (n.is_guyi = i),
        (n.btn = n.me.getChildByName('btn')),
        (n.btn.clickHandler = Laya.Handler.create(
          n,
          n.switchState,
          null,
          false
        )),
        (n.arrow = n.btn.getChildByName('arrow')),
        (n.container_detail = n.me.getChildByName('detail'));
      const a = n.container_detail.getChildByName('templete');
      (a.visible = false), (n.items = []), (n.cells = []);
      let r = 0;
      cfg.fan.fan.forEach(({is_guyi}) => {
        i && 1 == is_guyi && r++, i || 1 == is_guyi || r++;
      });
      for (let s = 0; s < r; s++)
        n.cells.push(a.scriptMap['capsui.UICopy'].getNodeClone());
      return n;
    }
    return __extends(n, t),
    (n.prototype.reset = function() {
      (this.container_detail.visible = false),
        (this.indetail = false),
        (this.me.height = this.btn.height),
        (this.arrow.rotation = 0);
      for (let t = 0; t < this.items.length; t++)
        this.items[t].label_count.text = '0';
      this.container_detail.alpha = 1;
    }),
    (n.prototype.show = function({detail_data}, n, a) {
      for (var r = this, s = 0; s < this.cells.length; s++)
        this.cells[s].visible = false;
      let o = 10;
      this.items = [];
      let l = -1;
      cfg.fan.fan.forEach(t => {
        if (
          (1 != t.is_guyi || r.is_guyi) &&
          !(
            (1 != t.is_guyi && r.is_guyi) ||
            46 == t.id ||
            (34 == t.id && n != e.liqi3) ||
            (17 == t.id && n == e.liqi3) ||
            (62 == t.id && n == e.liqi3)
          )
        ) {
          if (35 == t.id) {
            const i = r.cells[r.items.length];
            (i.y = o), (o += r.item_height);
            const a = i.getChildByName('fan'), s = i.getChildByName('count'), h = i.getChildByName('line');
            if (
              ((a.text = game.Tools.strOfLocalization(2154)),
              (s.text = '0'),
              (i.visible = true),
              l < 0)
            ) {
              l = 0;
              for (var c = '', u = 0; u < 50; u++) c += '-';
              (h.text = c), (l = h.textField.textWidth / 50);
            }
            if (l > 0) {
              for (
                var _ = Math.floor(
                    (660 - a.textField.textWidth * a.scaleX) / l
                  ),
                  c = '',
                  u = 0;
                u < _;
                u++
              )
                c += '-';
              h.text = c;
            }
            const d = { id: -1, count: 0, label_count: s };
            r.items.push(d);
          }
          const f = r.cells[r.items.length];
          (f.y = o), (o += r.item_height);
          const p = f.getChildByName('fan'), m = f.getChildByName('count'), g = f.getChildByName('line');
          if (
            ((p.text = t[`name_${GameMgr.client_language}`]),
            (m.text = '0'),
            (f.visible = true),
            l < 0)
          ) {
            l = 0;
            for (var c = '', u = 0; u < 50; u++) c += '-';
            (g.text = c), (l = g.textField.textWidth / 50);
          }
          if (l > 0) {
            for (
              var _ = Math.floor(
                  (660 - p.textField.textWidth * p.scaleX) / l
                ),
                c = '',
                u = 0;
              u < _;
              u++
            )
              c += '-';
            g.text = c;
          }
          r.items.push({ id: t.id, count: 0, label_count: m });
        }
      }),
        (this.h_detail = o + 80),
        (this.h_hide = this.btn.height),
        (this.container_detail.visible = false),
        (this.indetail = false),
        (this.me.height = this.btn.height),
        (this.arrow.rotation = 0);
      for (s = 0; s < this.items.length; s++)
        this.items[s].label_count.text = '0';
      const h = detail_data;
      if (h) {
        let c = null;
        if (
          (a == i.friend_room
            ? (c = h.friend_room_statistic)
            : a == i.matching &&
              (c = h.rank_statistic.total_statistic.all_level_statistic),
          c && (c = c.fan_achieved),
          c)
        ) {
          let u = null, _ = 1;
          n == e.liqi3 && (_ = 2);
          for (s = 0; s < c.length; s++)
            if (c[s].mahjong_category == _) {
              u = c[s];
              break;
            }
          if (u) {
            for (s = 0; s < u.fan.length; s++)
              for (let d = 0; d < this.items.length; d++)
                if (this.items[d].id == u.fan[s].fan_id) {
                  (this.items[d].count = u.fan[s].sum),
                    (this.items[d].label_count.text = this.items[
                      d
                    ].count.toString());
                  break;
                }
            if (null != u.liujumanguan)
              for (s = 0; s < this.items.length; s++)
                if (-1 == this.items[s].id) {
                  (this.items[s].count = u.liujumanguan),
                    (this.items[s].label_count.text = this.items[
                      s
                    ].count.toString());
                  break;
                }
          }
        }
      }
    }),
    (n.prototype.switchState = function() {
      const t = this;
      (this.indetail = !this.indetail),
        Laya.timer.clearAll(this),
        this.indetail
          ? ((this.me.height = this.h_detail),
            Laya.Tween.to(
              this.arrow,
              { rotation: -180 },
              200,
              Laya.Ease.strongOut
            ),
            Laya.timer.once(0, this, () => {
              t.container_detail.visible = true;
            }))
          : (Laya.Tween.to(
              this.arrow,
              { rotation: 0 },
              200,
              Laya.Ease.strongOut
            ),
            (this.container_detail.visible = false),
            (this.me.height = this.h_hide));
    }),
    n
  ;
  })(n);

  const h = (() => {
    function t(t, e) {
      const n = this;
      (this.game_category = 0),
        (this.me = t),
        (this.father = e),
        (this.btn_friend = this.me.getChildByName('btn_friend')),
        (this.btn_friend.clickHandler = new Laya.Handler(this, () => {
          n.game_category !== i.friend_room &&
            (n.changeTab(i.friend_room),
            n.father.changeGameCategory(i.friend_room));
        })),
        (this.btn_pipei = this.me.getChildByName('btn_pipei')),
        (this.btn_pipei.clickHandler = new Laya.Handler(this, () => {
          n.game_category !== i.matching &&
            (n.changeTab(i.matching),
            n.father.changeGameCategory(i.matching));
        })),
        game.Tools.labelLocalizationSize(
          this.btn_pipei.getChildAt(0),
          175,
          1
        ),
        game.Tools.labelLocalizationSize(
          this.btn_friend.getChildAt(0),
          175,
          1
        );
    }
    return (
      (t.prototype.changeTab = function(t) {
        this.game_category !== t &&
          ((this.game_category = t), this.refreshShow());
      }),
      (t.prototype.refreshMJ = function(t) {
        (this.btn_pipei.visible = true),
          (this.btn_friend.x = 'chs' == GameMgr.client_language ? 250 : 290);
      }),
      (t.prototype.refreshShow = function() {
        (this.btn_friend.skin = game.Tools.localUISrc(
          this.game_category == i.friend_room
            ? 'myres/bothui/tab2_choosed.png'
            : 'myres/bothui/tab2_unchoose.png'
        )),
          (this.btn_friend.getChildAt(0).color =
            this.game_category == i.friend_room ? '#6a7eb1' : '#48577a'),
          (this.btn_pipei.skin = game.Tools.localUISrc(
            this.game_category == i.matching
              ? 'myres/bothui/tab2_choosed.png'
              : 'myres/bothui/tab2_unchoose.png'
          )),
          (this.btn_pipei.getChildAt(0).color =
            this.game_category == i.matching ? '#6a7eb1' : '#48577a'),
          this.game_category == i.friend_room
            ? this.me.setChildIndex(this.btn_friend, this.me.numChildren - 1)
            : this.me.setChildIndex(this.btn_pipei, this.me.numChildren - 1);
      }),
      t
    );
  })();

  const c = (() => {
    function t(t) {
      const c = this;
      (this.me = null),
        (this.panel = null),
        (this.blocks = []),
        (this.tabs = null),
        (this._data = null),
        (this._last_time = 0),
        (this._drag_scroll = false),
        (this.data = null),
        (this.mj_category = e.none),
        (this.game_categroy = i.none),
        (this.total_h = 0),
        (this.me = t),
        (this.panel = this.me.getChildByName('content')),
        (this.panel.vScrollBarSkin = ''),
        (this.scrollbar = this.me.getChildByName('scrollbar_light').scriptMap[
          'capsui.CScrollBar'
        ]),
        this.scrollbar.init(null),
        this.panel.vScrollBar.on('change', this, () => {
          c.total_h <= 0
            ? c.scrollbar.setVal(0, 1)
            : c.scrollbar.setVal(
                c.panel.vScrollBar.value / c.panel.vScrollBar.max,
                c.panel.height / c.total_h
              );
        }),
        this.blocks.push(new a(this.panel.getChildByName('dahe'))),
        this.blocks.push(new r(this.panel.getChildByName('fengge'))),
        this.blocks.push(new s(this.panel.getChildByName('zoushi'))),
        this.blocks.push(new n(this.panel.getChildByName('blank0'))),
        this.blocks.push(new o(this.panel.getChildByName('mode1'), 1)),
        this.blocks.push(new o(this.panel.getChildByName('mode2'), 2)),
        this.blocks.push(new l(this.panel.getChildByName('fan'), false)),
        this.blocks.push(new l(this.panel.getChildByName('fan_guyi'), true)),
        this.blocks.push(new n(this.panel.getChildByName('blank'))),
        (this.tabs = new h(this.me.parent.getChildByName('tabs'), this));
    }
    return (t.prototype.reset = function() {
      for (let t = 0, e = 0; e < this.blocks.length; e++)
        this.blocks[e].reset(),
          (this.blocks[e].me.y = t),
          (t += this.blocks[e].me.height);
    }),
    (t.prototype.setData = function(t) {
      this.data = t;
    }),
    (t.prototype.changeMJCategory = function(t) {
      const e = t;
      (this.mj_category = e),
        this.tabs.refreshMJ(e),
        (this.game_categroy = i.matching),
        this.tabs.changeTab(i.matching),
        this.refreshShow();
    }),
    (t.prototype.changeGameCategory = function(t) {
      t != this.game_categroy &&
        ((this.game_categroy = t), this.refreshShow());
    }),
    (t.prototype.refreshShow = function() {
      let t = 0;
      (this.panel.vScrollBar.value = 0), this.panel.vScrollBar.stopScroll();
      for (let e = 0; e < this.blocks.length; e++)
        this.blocks[e].reset(),
          this.blocks[e].show(
            this.data,
            this.mj_category,
            this.game_categroy
          ),
          (this.blocks[e].me.y = t),
          (t += this.blocks[e].me.height);
      (this.total_h = t),
        (this._last_time = Laya.timer.currTimer),
        Laya.timer.clearAll(this),
        Laya.timer.frameLoop(1, this, this.update, null, true),
        this.scrollbar.reset(),
        this.scrollbar.setVal(
          this.panel.vScrollBar.value / this.panel.vScrollBar.max,
          this.panel.height / this.total_h
        );
    }),
    (t.prototype.close = function() {
      Laya.timer.clearAll(this);
    }),
    (t.prototype.update = function() {
      for (
        var t = 0,
          e = (this.panel.vScrollBar.value, this.panel.vScrollBar.max, 0);
        e < this.blocks.length;
        e++
      ) {
        const i = this.blocks[e].me.y, n = Math.abs(i - t);
        if (n < 0.001) this.blocks[e].me.y = t;
        else {
          const a = Math.sqrt((2 * n) / (1400 / 22500)), r = Laya.timer.currTimer - this._last_time;
          if (r >= a) this.blocks[e].me.y = t;
          else {
            const s = (1400 / 22500) * 0.5 * (a - r) * (a - r);
            this.blocks[e].me.y = i < t ? t - s : t + s;
          }
        }
        t += this.blocks[e].me.height;
      }
      this.panel.refresh(),
        (this.total_h = t),
        this.scrollbar.setVal(
          this.panel.vScrollBar.value / this.panel.vScrollBar.max,
          this.panel.height / this.total_h
        ),
        (this._last_time = Laya.timer.currTimer);
    }),
    t
  ;
  })();

  t.UI_PlayerData = c;
})(uiscript || (uiscript = {}));