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
  var e;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.liqi4 = 1)] = 'liqi4';
    t[(t.liqi3 = 2)] = 'liqi3';
  })(e || (e = {}));
  var i;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.friend_room = 1)] = 'friend_room';
    t[(t.matching = 2)] = 'matching';
  })(i || (i = {}));

  var n = (() => {
    function t(t) {
      this.me = t;
    }
    t.prototype.show = (t, e, i) => {};
    t.prototype.reset = () => {};
    return t;
  })();

  var a = (t => {
    class e {
      constructor(e) {
        var i = t.call(this, e) || this;
        i.container_hand = null;
        i.img_hands = [];
        i.label_noinfo = null;
        i.container_title = null;
        i.container_hand = i.me.getChildByName('container_hand');
        i.img_hands = [];
        for (var n = 0; n < i.container_hand.numChildren; n++) {
          var a = i.container_hand.getChildAt(n);
          a.visible = !1;
          i.img_hands.push(a);
        }
        i.container_title = i.me.getChildByName('container_title');
        i.label_noinfo = i.me.getChildByName('label_noinfo');
        return i;
      }

      show({statistic_data}, e, i) {
        var n = null;
        if (statistic_data)
          for (var a = 0; a < statistic_data.length; a++) {
            var r = statistic_data[a];
            if (e == r.mahjong_category && i == r.game_category) {
              n = r.statistic;
              break;
            }
          }
        this.container_hand.visible = !1;
        this.container_title.visible = !1;
        if (n && n.highest_hu) {
          this.container_hand.visible = !0;
          this.container_title.visible = !0;
          this._showDaHe(
            n.highest_hu.hands,
            n.highest_hu.ming,
            n.highest_hu.hupai
          );
          var s = 0;
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
          this._setTitle(s);
          this.label_noinfo.visible = !1;
        } else
          this.label_noinfo.visible = !0;
      }

      reset() {
        this.container_hand.visible = !1;
        this.label_noinfo.visible = !1;
        this.container_title.visible = !1;
      }

      _showDaHe(t, e, i) {
        for (
          var n = this.img_hands[0].width, a = 0.5 * n, r = 0;
          r < this.img_hands.length;
          r++
        )
          this.img_hands[r].visible = !1;
        this.img_hands[s].skin = game.Tools.localUISrc(`${l + t[r]}.png`);
        this.img_hands[s].x = o;
        this.img_hands[s].y = 0;
        o += n;
        this.img_hands[s].visible = !0;
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
          s++;
        if (e && e.length > 0) {
          o += a;
          for (r = 0; r < e.length; r++) {
            var h = e[r];
            if (')' != h.charAt(h.length - 1)) {
              if (1 == (u = h.split('|')).length) {
                f = u[0].charAt(1);
                '0' == (d = u[0].charAt(0)) && (d = '5');
                for (y = 0; y < 4; y++) {
                  v = '';

                  v =
                    0 == y || 3 == y
                      ? 'back'
                      : 1 == y && '5' == d && 'z' != f
                      ? `0${f}`
                      : d + f;

                  this.img_hands[s].skin = game.Tools.localUISrc(
                      `${l + v}.png`
                    );

                  this.img_hands[s].x = o;
                  this.img_hands[s].y = 0;
                  o += n;
                  this.img_hands[s].visible = !0;
                  s++;
                }
              } else
                for (y = 0; y < u.length; y++) {
                  v = u[y].toString();

                  this.img_hands[s].skin = game.Tools.localUISrc(
                    `${l + v}.png`
                  );

                  this.img_hands[s].x = o;
                  this.img_hands[s].y = 0;
                  o += n;
                  this.img_hands[s].visible = !0;
                  s++;
                }
            } else {
              for (var c = '', u = [], _ = 0; _ < h.length; _++)
                if ('(' == h.charAt(_)) {
                  c = h.substring(0, _);
                  u = h.substring(_ + 1, h.length - 1).split(',');
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
                for (var g = 0; g < u.length; g++) {
                  v = '';
                  v = 0 == g || 3 == g ? 'back' : g <= p ? `0${f}` : d + f;

                  this.img_hands[s].skin = game.Tools.localUISrc(
                      `${l + v}.png`
                    );

                  this.img_hands[s].x = o;
                  this.img_hands[s].y = 0;
                  o += n;
                  this.img_hands[s].visible = !0;
                  s++;
                }
              } else
                for (var y = 0; y < u.length; y++) {
                  var v = u[y];

                  this.img_hands[s].skin = game.Tools.localUISrc(
                    `${l + v}.png`
                  );

                  this.img_hands[s].x = o;
                  this.img_hands[s].y = 0;
                  o += n;
                  this.img_hands[s].visible = !0;
                  s++;
                }
            }
          }
        }
        o += a;
        this.img_hands[s].skin = game.Tools.localUISrc(`${l + i}.png`);
        this.img_hands[s].x = o;
        this.img_hands[s].y = 0;
        o += n;
        this.img_hands[s].visible = !0;
        var b = (-0.12 * (++s - 14)) / 4 + 0.65;
        this.container_hand.scaleX = this.container_hand.scaleY = b;
      }

      _setTitle(t) {
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
              (a = i.getChildAt(n)).visible = !0;
              a.skin = `myres/word_${e[n]}.png`;
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
              (a = i.getChildAt(n)).visible = !0;
              a.skin = `jp/myres/word_${e[n]}.png`;
            }
        }
      }
    }

    __extends(e, t);

    return e;
  })(n);

  var r = (i => {
    function n(e) {
      var n = i.call(this, e) || this;
      n.fengge = [];
      n.radar_triangle = [];
      var a = n.me;
      n.fengge.push(a.getChildByName('gong'));
      n.fengge.push(a.getChildByName('su'));
      n.fengge.push(a.getChildByName('fang'));
      n.fengge.push(a.getChildByName('yun'));
      for (s = 0; s < 4; s++)
        n.radar_triangle.push(
          a.getChildByName('radar').getChildByName(`sanjiao${s.toString()}`)
        );
      var r = n.me.getChildByName('what');

      r &&
          (r.clickHandler = Laya.Handler.create(
            n,
            () => {
              t.UI_InfoLite.Inst.show(game.Tools.strOfLocalization(51));
            },
            null,
            !1
          ));

      if (
        ('en' == GameMgr.client_language)
      )
        for (var s = 0; s < n.fengge.length; s++) n.fengge[s].x = 150;
      return n;
    }
    __extends(n, i);

    n.prototype.show = function({statistic_data}, i, n) {
      var a = this,
        r = null;
      if (statistic_data)
        for (var s = 0; s < statistic_data.length; s++) {
          var o = statistic_data[s];
          if (i == o.mahjong_category && n == o.game_category) {
            r = o.statistic;
            break;
          }
        }
      var l = [0, 0, 0, 0];
      if (
        r &&
        r.recent_20_hu_summary &&
        r.recent_20_hu_summary.total_count > 0
      ) {
        var h = r.recent_20_hu_summary.average_hu_point,
          c = 0;

        (c =
          i == e.liqi4
            ? ((h - 3e3) / 5e3) * 100
            : ((h - 4e3) / 8e3) * 100) < 0
          ? (c = 0)
          : c > 100 && (c = 100);

        l[0] = c;
      }
      if (r && r.recent_round && r.recent_round.total_count > 0) {
        l[1] =
              (((r.recent_round.rong_count + r.recent_round.zimo_count) /
                r.recent_round.total_count -
                0.1) /
                0.3) *
              100;

        r.recent_round.rong_count + r.recent_round.zimo_count == 0
          ? (l[1] = 0)
          : (l[1] < 0 ? (l[1] = 0) : l[1] > 100 && (l[1] = 100));

        (c =
          100 *
          (1.12 -
            (r.recent_round.fangchong_count / r.recent_round.total_count) *
              3.4)) < 0
          ? (c = 0)
          : c > 100 && (c = 100);

        l[2] = c;
      }
      if (
        r &&
        r.recent_10_hu_summary &&
        r.recent_10_hu_summary.total_fanshu > 0
      ) {
        c =
          (c =
            (r.recent_10_hu_summary.total_xuanshang /
              r.recent_10_hu_summary.total_fanshu) *
            1.5 *
            100) < 0
            ? 0
            : c > 100
            ? 100
            : c;

        l[3] = c;
      }
      this._showRadar([0, 0, 0, 0]);
      Laya.timer.once(500, this, () => {
        Laya.timer.clearAll(a);
        var t = Laya.timer.currTimer,
          e = () => {
            var i = Laya.timer.currTimer - t;
            a._showRadar(l);
            if (i >= 300) Laya.timer.clear(a, e);
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
        Laya.timer.frameLoop(1, a, e, null, !0);
      });
    };

    n.prototype.reset = function() {
      Laya.timer.clearAll(this);
      this._showRadar([0, 0, 0, 0]);
    };

    n.prototype._showRadar = function(t) {
      for (e = 0; e < t.length; e++)
        this.fengge[e].text = Math.floor(t[e]).toString();
      for (var e = 0; e < t.length; e++)
        for (var i = 0; i < 2; i++) {
          var n = this.radar_triangle[e].getChildByName(
              0 == i ? 'nei' : 'wai'
            ),
            a = t[e] / 20,
            r = t[(e + 1) % t.length] / 20;
          a <= 0.2 && (a = 0.2);
          a >= 4.8 && (a = 4.8);
          r <= 0.2 && (r = 0.2);
          r >= 4.8 && (r = 4.8);
          a += 0.3;
          1 == i && ((r += 0.3));
          var s = (180 * Math.atan(r / a)) / 3.1415926,
            o = (108 * a) / 5,
            l = (108 * r) / 5;
          n.rotation = s;
          n.x = 0.5 * o;
          n.y = 108 - 0.5 * l;
          n.width = n.height = Math.sqrt(o * o + l * l) + 10;
        }
    };

    return n;
  })(n);

  var s = (t => {
    class i {
      constructor(i) {
        var n = t.call(this, i) || this;
        n.zoushi_points = [];
        n.zoushi_lines = [];
        n.mj_category = e.liqi4;
        for (
          var a = n.me, r = a.getChildByName('lines'), s = 0;
          s < r.numChildren;
          s++
        )
          n.zoushi_lines.push(r.getChildAt(s));
        for (var o = a.getChildByName('points'), s = 0; s < o.numChildren; s++)
          n.zoushi_points.push(o.getChildAt(s));
        i.getChildByName('lb1').getChildByName('w').text = 'st';
        i.getChildByName('lb2').getChildByName('w').text = 'nd';
        i.getChildByName('lb3').getChildByName('w').text = 'rd';
        i.getChildByName('lb4').getChildByName('w').text = 'th';
        i.getChildByName('lb1').getChildByName('w').y = 32;
        i.getChildByName('lb2').getChildByName('w').y = 32;
        i.getChildByName('lb3').getChildByName('w').y = 32;

        'en' == GameMgr.client_language &&
          ((i.getChildByName('lb4').getChildByName('w').y = 32));

        return n;
      }

      show({statistic_data}, i, n) {
        var a = this,
          r = null;
        this.mj_category = i;
        if ((statistic_data))
          for (var s = 0; s < statistic_data.length; s++) {
            var o = statistic_data[s];
            if (i == o.mahjong_category && n == o.game_category) {
              r = o.statistic;
              break;
            }
          }
        Laya.timer.clearAll(this);
        if (r && r.recent_10_game_result) {
          Laya.timer.clearAll(this);
          var l = r.recent_10_game_result;
          this._showZoushi([], 0);
          Laya.timer.clearAll(this);
          Laya.timer.once(500, this, () => {
            var t = l.length >= 10 ? 10 : l.length,
              e = Laya.timer.currTimer;
            Laya.timer.frameLoop(
              1,
              a,
              () => {
                var i = 0.01 * (Laya.timer.currTimer - e);
                a._showZoushi(l, t);
                i >= t
                  ? (Laya.timer.clearAll(a))
                  : a._showZoushi(l, i);
              },
              null,
              !0
            );
          });
        } else this._showZoushi([], 0);
        this.me.getChildByName('line4').visible = i == e.liqi4;
        this.me.getChildByName('lb4').visible = i == e.liqi4;
      }

      reset() {
        this._showZoushi([], 0);
      }

      _showZoushi(t, i) {
        var n = 0;
        n = t.length >= 10 ? t.length - 10 : 0;
        for (s = 0; s < this.zoushi_points.length; s++)
          this.zoushi_points[s].visible = !1;
        for (s = 0; s < this.zoushi_lines.length; s++)
          this.zoushi_lines[s].visible = !1;
        for (var a = [], r = Math.floor(i), s = 0; s + n < t.length; s++) {
          var o = (-705 * (9 - s)) / 9 + 1755,
            l = (-129 * (4 - t[s + n].rank)) / 3 + 991;
          a.push(new Laya.Vector2(o, l));
        }
        for (s = 0; s < a.length && !(s > r); s++) {
          this.zoushi_points[s].visible = !0;
          this.zoushi_points[s].x = a[s].x;
          this.zoushi_points[s].y = a[s].y;
          var h = this.mj_category == e.liqi4 ? 5e4 : 7e4;

          this.zoushi_points[s].skin = game.Tools.localUISrc(
              1 == t[n + s].rank && t[n + s].final_point >= h
                ? 'myres/point_high.png'
                : 'myres/point.png'
            );

          if (
            (s + 1 < a.length)
          )
            if (s == r) {
              var c = i - r;
              if (c > 0.001) {
                this.zoushi_lines[s].visible = !0;
                this.zoushi_lines[s].x = a[s].x;
                this.zoushi_lines[s].y = a[s].y;
                var u = a[s + 1].y - a[s].y,
                  _ = a[s + 1].x - a[s].x,
                  d = (180 * Math.atan(u / _)) / 3.1415926;
                this.zoushi_lines[s].rotation = d;
                this.zoushi_lines[s].width = Math.sqrt(_ * _ + u * u) * c;
              }
            } else {
              this.zoushi_lines[s].visible = !0;
              this.zoushi_lines[s].x = a[s].x;
              this.zoushi_lines[s].y = a[s].y;
              var u = a[s + 1].y - a[s].y,
                _ = a[s + 1].x - a[s].x,
                d = (180 * Math.atan(u / _)) / 3.1415926;
              this.zoushi_lines[s].rotation = d;
              this.zoushi_lines[s].width = Math.sqrt(_ * _ + u * u);
            }
        }
      }
    }

    __extends(i, t);

    return i;
  })(n);

  var o = (t => {
    function n(e, i) {
      var n = t.call(this, e) || this;
      n.type = 0;
      n.btn = null;
      n.arrow = null;
      n.indetail = !1;
      n.container_detail = null;
      n.h_hide = 0;
      n.h_detail = 0;
      n.type = i;
      n.btn = n.me.getChildByName('btn');

      n.btn.clickHandler = Laya.Handler.create(
        n,
        n.switchState,
        null,
        !1
      );

      n.arrow = n.btn.getChildByName('arrow');
      n.container_detail = n.me.getChildByName('detail');
      n.h_detail = 310;
      n.h_hide = n.btn.height;
      n.container_detail.visible = !1;
      n.indetail = !1;
      n.me.height = n.btn.height;
      n.arrow.rotation = 0;
      n._pos1 = n.container_detail.getChildByName('pos1');
      n._pos2 = n.container_detail.getChildByName('pos2');
      n._pos3 = n.container_detail.getChildByName('pos3');
      n._pos4 = n.container_detail.getChildByName('pos4');
      n._knockout = n.container_detail.getChildByName('knockout');
      n._changci = n.container_detail.getChildByName('changci');
      n._dadian = n.container_detail.getChildByName('dadian');
      n._shunwei = n.container_detail.getChildByName('shunwei');
      n._lianzhuang = n.container_detail.getChildByName('lianzhuang');
      n._hule = n.container_detail.getChildByName('hule');
      n._shunwei = n.container_detail.getChildByName('shunwei');
      n._hupai = n.container_detail.getChildByName('hupai');
      n._zimo = n.container_detail.getChildByName('zimo');
      n._fangchong = n.container_detail.getChildByName('fangchong');
      n._fulu = n.container_detail.getChildByName('fulu');
      n._liqi = n.container_detail.getChildByName('liqi');
      return n;
    }
    __extends(n, t);

    n.prototype.show = function({detail_data}, n, a) {
      this._pos1.text = '--/--';
      this._pos2.text = '--/--';
      this._pos3.text = '--/--';
      this._pos4.text = '--/--';
      this._knockout.text = '--/--';
      this._changci.text = '--/--';
      this._dadian.text = '--/--';
      this._shunwei.text = '--/--';
      this._lianzhuang.text = '--/--';
      this._hule.text = '--/--';
      this._hupai.text = '--/--';
      this._zimo.text = '--/--';
      this._fangchong.text = '--/--';
      this._fulu.text = '--/--';
      this._liqi.text = '--/--';
      this._pos4.visible = !1;
      this._pos4.visible = !0;
      n == e.liqi3
        ? (this._knockout.y = 140)
        : (this._knockout.y = 183);
      var r = detail_data;
      if (r) {
        var s = null;

        a == i.friend_room
            ? (s = r.friend_room_statistic)
            : a == i.matching &&
              (s = r.rank_statistic.total_statistic.all_level_statistic);

        if (
          (s)
        ) {
          var o = 0;
          n == e.liqi4
            ? 1 == this.type
              ? (o = 1)
              : 2 == this.type && (o = 2)
            : n == e.liqi3 &&
              (1 == this.type ? (o = 11) : 2 == this.type && (o = 12));
          for (var l = 0; l < s.game_mode.length; l++) {
            var h = s.game_mode[l];
            if (h.mode == o) {
              var c = h.game_count_sum;
              this._pos1.text = '--/--';
              this._pos2.text = '--/--';
              this._pos3.text = '--/--';
              this._pos4 && (this._pos4.text = '--/--');
              this._knockout.text = '--/--';
              this._changci.text = c.toString();
              if (c > 0) {
                this._pos1.text =
                  `${((h.game_final_position[0] / c) * 100)
  .toFixed(2)
  .toString()}%`;

                this._pos2.text =
                    `${((h.game_final_position[1] / c) * 100)
  .toFixed(2)
  .toString()}%`;

                this._pos3.text =
                    `${((h.game_final_position[2] / c) * 100)
  .toFixed(2)
  .toString()}%`;

                this._pos4 &&
                  (this._pos4.text =
                    `${((h.game_final_position[3] / c) * 100)
  .toFixed(2)
  .toString()}%`);

                this._knockout.text =
                    `${((h.fly_count / c) * 100).toFixed(2).toString()}%`;

                this._changci.text = c.toString();
                for (var u = 0, _ = 0; _ < 4; _++)
                  u += (_ + 1) * h.game_final_position[_];
                this._shunwei.text = (u / c).toFixed(2).toString();
              } else
                this._shunwei.text = '--/--';
              var d = 0,
                f = 0,
                p = 0,
                m = 0;
              if (h.round_end)
                for (var g = 0; g < h.round_end.length; g++) {
                  d += h.round_end[g].sum;
                  var y = h.round_end[g].type;

                  y == mjcore.E_Round_Result.zimo &&
                    (p += h.round_end[g].sum);

                  y == mjcore.E_Round_Result.rong ||
                  y == mjcore.E_Round_Result.zimo
                    ? (f += h.round_end[g].sum)
                    : y == mjcore.E_Round_Result.fangchong &&
                      (m += h.round_end[g].sum);
                }

              this._hupai.text =
                    `${((f / d) * 100).toFixed(2).toString()}%`;

              this._fangchong.text =
                    `${((m / d) * 100).toFixed(2).toString()}%`;

              this._fulu.text =
                    `${((h.ming_count_sum / d) * 100).toFixed(2).toString()}%`;

              this._hupai.text = '--/--';
              this._fangchong.text = '--/--';
              this._fulu.text = '--/--';

              d > 0
                ? (this._liqi.text =
                    `${((h.liqi_count_sum / d) * 100).toFixed(2).toString()}%`)
                : (this._liqi.text = '--/--');

              this._dadian.text = (h.dadian_sum / f).toFixed(0);

              this._zimo.text =
                    `${((p / f) * 100).toFixed(2).toString()}%`;

              this._dadian.text = '--/--';
              this._zimo.text = '--/--';

              f > 0
                ? (this._hule.text = (h.xun_count_sum / f).toFixed(2))
                : (this._hule.text = '--/--');

              null != h.highest_lianzhuang &&
              void 0 != h.highest_lianzhuang
                ? (this._lianzhuang.text = h.highest_lianzhuang)
                : (this._lianzhuang.text = '--/--');
            }
          }
        }
      }
    };

    n.prototype.reset = function() {
      this.container_detail.visible = !1;
      this.indetail = !1;
      this.me.height = this.btn.height;
      this.arrow.rotation = 0;
      this.container_detail.alpha = 1;
      this._pos1.text = '--/--';
      this._pos2.text = '--/--';
      this._pos3.text = '--/--';
      this._pos4 && (this._pos4.text = '--/--');
      this._knockout.text = '--/--';
      this._changci.text = '--/--';
      this._dadian.text = '--/--';
      this._shunwei.text = '--/--';
      this._lianzhuang.text = '--/--';
      this._hule.text = '--/--';
      this._hupai.text = '--/--';
      this._zimo.text = '--/--';
      this._fangchong.text = '--/--';
      this._fulu.text = '--/--';
      this._liqi.text = '--/--';
    };

    n.prototype.switchState = function() {
      var t = this;
      this.indetail = !this.indetail;
      Laya.timer.clearAll(this);
      this.me.height = this.h_detail;

      Laya.Tween.to(
        this.arrow,
        { rotation: -180 },
        200,
        Laya.Ease.strongOut
      );

      Laya.Tween.to(
            this.arrow,
            { rotation: 0 },
            200,
            Laya.Ease.strongOut
          );

      this.container_detail.visible = !1;
      this.indetail
        ? (Laya.timer.once(0, this, () => {
        t.container_detail.visible = !0;
      }))
        : (this.me.height = this.h_hide);
    };

    return n;
  })(n);

  var l = (t => {
    class n {
      constructor(e, i) {
        var n = t.call(this, e) || this;
        n.item_height = 50;
        n.is_guyi = !1;
        n.btn = null;
        n.arrow = null;
        n.indetail = !1;
        n.container_detail = null;
        n.cells = [];
        n.items = [];
        n.h_hide = 0;
        n.h_detail = 0;
        n.is_guyi = i;
        n.btn = n.me.getChildByName('btn');

        n.btn.clickHandler = Laya.Handler.create(
            n,
            n.switchState,
            null,
            !1
          );

        n.arrow = n.btn.getChildByName('arrow');
        n.container_detail = n.me.getChildByName('detail');
        var a = n.container_detail.getChildByName('templete');
        a.visible = !1;
        n.items = [];
        n.cells = [];
        var r = 0;
        cfg.fan.fan.forEach(({is_guyi}) => {
          i && 1 == is_guyi && r++;
          i || 1 == is_guyi || r++;
        });
        for (var s = 0; s < r; s++)
          n.cells.push(a.scriptMap['capsui.UICopy'].getNodeClone());
        return n;
      }

      reset() {
        this.container_detail.visible = !1;
        this.indetail = !1;
        this.me.height = this.btn.height;
        this.arrow.rotation = 0;
        for (var t = 0; t < this.items.length; t++)
          this.items[t].label_count.text = '0';
        this.container_detail.alpha = 1;
      }

      show({detail_data}, n, a) {
        for (var r = this, s = 0; s < this.cells.length; s++)
          this.cells[s].visible = !1;
        var o = 10;
        this.items = [];
        var l = -1;

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
              var i = r.cells[r.items.length];
              i.y = o;
              o += r.item_height;
              var a = i.getChildByName('fan'),
                s = i.getChildByName('count'),
                h = i.getChildByName('line');
              a.text = game.Tools.strOfLocalization(2154);
              s.text = '0';
              i.visible = !0;
              if (
                (l < 0)
              ) {
                l = 0;
                for (var c = '', u = 0; u < 50; u++) c += '-';
                h.text = c;
                l = h.textField.textWidth / 50;
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
              var d = { id: -1, count: 0, label_count: s };
              r.items.push(d);
            }
            var f = r.cells[r.items.length];
            f.y = o;
            o += r.item_height;
            var p = f.getChildByName('fan'),
              m = f.getChildByName('count'),
              g = f.getChildByName('line');
            p.text = t[`name_${GameMgr.client_language}`];
            m.text = '0';
            f.visible = !0;
            if (
              (l < 0)
            ) {
              l = 0;
              for (var c = '', u = 0; u < 50; u++) c += '-';
              g.text = c;
              l = g.textField.textWidth / 50;
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
        });

        this.h_detail = o + 80;
        this.h_hide = this.btn.height;
        this.container_detail.visible = !1;
        this.indetail = !1;
        this.me.height = this.btn.height;
        this.arrow.rotation = 0;
        for (s = 0; s < this.items.length; s++)
          this.items[s].label_count.text = '0';
        var h = detail_data;
        if (h) {
          var c = null;

          a == i.friend_room
              ? (c = h.friend_room_statistic)
              : a == i.matching &&
                (c = h.rank_statistic.total_statistic.all_level_statistic);

          c && (c = c.fan_achieved);
          if (
            (c)
          ) {
            var u = null,
              _ = 1;
            n == e.liqi3 && (_ = 2);
            for (s = 0; s < c.length; s++)
              if (c[s].mahjong_category == _) {
                u = c[s];
                break;
              }
            if (u) {
              for (s = 0; s < u.fan.length; s++)
                for (var d = 0; d < this.items.length; d++)
                  if (this.items[d].id == u.fan[s].fan_id) {
                    this.items[d].count = u.fan[s].sum;
                    this.items[d].label_count.text = this.items[
                        d
                      ].count.toString();
                    break;
                  }
              if (null != u.liujumanguan)
                for (s = 0; s < this.items.length; s++)
                  if (-1 == this.items[s].id) {
                    this.items[s].count = u.liujumanguan;
                    this.items[s].label_count.text = this.items[
                        s
                      ].count.toString();
                    break;
                  }
            }
          }
        }
      }

      switchState() {
        var t = this;
        this.indetail = !this.indetail;
        Laya.timer.clearAll(this);
        this.me.height = this.h_detail;

        Laya.Tween.to(
          this.arrow,
          { rotation: -180 },
          200,
          Laya.Ease.strongOut
        );

        Laya.Tween.to(
              this.arrow,
              { rotation: 0 },
              200,
              Laya.Ease.strongOut
            );

        this.container_detail.visible = !1;
        this.indetail
          ? (Laya.timer.once(0, this, () => {
          t.container_detail.visible = !0;
        }))
          : (this.me.height = this.h_hide);
      }
    }

    __extends(n, t);

    return n;
  })(n);

  var h = (() => {
    function t(t, e) {
      var n = this;
      this.game_category = 0;
      this.me = t;
      this.father = e;
      this.btn_friend = this.me.getChildByName('btn_friend');

      this.btn_friend.clickHandler = new Laya.Handler(this, () => {
        n.changeTab(i.friend_room);
        n.game_category !== i.friend_room &&
          (n.father.changeGameCategory(i.friend_room));
      });

      this.btn_pipei = this.me.getChildByName('btn_pipei');

      this.btn_pipei.clickHandler = new Laya.Handler(this, () => {
        n.changeTab(i.matching);
        n.game_category !== i.matching &&
          (n.father.changeGameCategory(i.matching));
      });

      game.Tools.labelLocalizationSize(
        this.btn_pipei.getChildAt(0),
        175,
        1
      );

      game.Tools.labelLocalizationSize(
        this.btn_friend.getChildAt(0),
        175,
        1
      );
    }

    t.prototype.changeTab = function(t) {
      this.game_category = t;
      this.game_category !== t &&
        (this.refreshShow());
    };

    t.prototype.refreshMJ = function(t) {
      this.btn_pipei.visible = !0;
      this.btn_friend.x = 'chs' == GameMgr.client_language ? 250 : 290;
    };

    t.prototype.refreshShow = function() {
      this.btn_friend.skin = game.Tools.localUISrc(
        this.game_category == i.friend_room
          ? 'myres/bothui/tab2_choosed.png'
          : 'myres/bothui/tab2_unchoose.png'
      );

      this.btn_friend.getChildAt(0).color =
          this.game_category == i.friend_room ? '#6a7eb1' : '#48577a';

      this.btn_pipei.skin = game.Tools.localUISrc(
          this.game_category == i.matching
            ? 'myres/bothui/tab2_choosed.png'
            : 'myres/bothui/tab2_unchoose.png'
        );

      this.btn_pipei.getChildAt(0).color =
          this.game_category == i.matching ? '#6a7eb1' : '#48577a';

      this.game_category == i.friend_room
        ? this.me.setChildIndex(this.btn_friend, this.me.numChildren - 1)
        : this.me.setChildIndex(this.btn_pipei, this.me.numChildren - 1);
    };

    return t;
  })();

  var c = (() => {
    class t {
      constructor(t) {
        var c = this;
        this.me = null;
        this.panel = null;
        this.blocks = [];
        this.tabs = null;
        this._data = null;
        this._last_time = 0;
        this._drag_scroll = !1;
        this.data = null;
        this.mj_category = e.none;
        this.game_categroy = i.none;
        this.total_h = 0;
        this.me = t;
        this.panel = this.me.getChildByName('content');
        this.panel.vScrollBarSkin = '';

        this.scrollbar = this.me.getChildByName('scrollbar_light').scriptMap[
            'capsui.CScrollBar'
          ];

        this.scrollbar.init(null);

        this.panel.vScrollBar.on('change', this, () => {
          c.total_h <= 0
            ? c.scrollbar.setVal(0, 1)
            : c.scrollbar.setVal(
                c.panel.vScrollBar.value / c.panel.vScrollBar.max,
                c.panel.height / c.total_h
              );
        });

        this.blocks.push(new a(this.panel.getChildByName('dahe')));
        this.blocks.push(new r(this.panel.getChildByName('fengge')));
        this.blocks.push(new s(this.panel.getChildByName('zoushi')));
        this.blocks.push(new n(this.panel.getChildByName('blank0')));
        this.blocks.push(new o(this.panel.getChildByName('mode1'), 1));
        this.blocks.push(new o(this.panel.getChildByName('mode2'), 2));
        this.blocks.push(new l(this.panel.getChildByName('fan'), !1));
        this.blocks.push(new l(this.panel.getChildByName('fan_guyi'), !0));
        this.blocks.push(new n(this.panel.getChildByName('blank')));
        this.tabs = new h(this.me.parent.getChildByName('tabs'), this);
      }

      reset() {
        this.blocks[e].reset();
        this.blocks[e].me.y = t;
        for (var t = 0, e = 0; e < this.blocks.length; e++)
          t += this.blocks[e].me.height;
      }

      setData(t) {
        this.data = t;
      }

      changeMJCategory(t) {
        var e = t;
        this.mj_category = e;
        this.tabs.refreshMJ(e);
        this.game_categroy = i.matching;
        this.tabs.changeTab(i.matching);
        this.refreshShow();
      }

      changeGameCategory(t) {
        this.game_categroy = t;
        t != this.game_categroy &&
          (this.refreshShow());
      }

      refreshShow() {
        var t = 0;
        this.panel.vScrollBar.value = 0;
        this.panel.vScrollBar.stopScroll();
        this.blocks[e].reset();

        this.blocks[e].show(
          this.data,
          this.mj_category,
          this.game_categroy
        );

        this.blocks[e].me.y = t;
        for (var e = 0; e < this.blocks.length; e++)
          t += this.blocks[e].me.height;
        this.total_h = t;
        this._last_time = Laya.timer.currTimer;
        Laya.timer.clearAll(this);
        Laya.timer.frameLoop(1, this, this.update, null, !0);
        this.scrollbar.reset();
        this.scrollbar.setVal(
          this.panel.vScrollBar.value / this.panel.vScrollBar.max,
          this.panel.height / this.total_h
        );
      }

      close() {
        Laya.timer.clearAll(this);
      }

      update() {
        this.panel.vScrollBar.value;
        this.panel.vScrollBar.max;
        for (
          var t = 0,
            e = (0);
          e < this.blocks.length;
          e++
        ) {
          var i = this.blocks[e].me.y,
            n = Math.abs(i - t);
          if (n < 0.001) this.blocks[e].me.y = t;
          else {
            var a = Math.sqrt((2 * n) / (1400 / 22500)),
              r = Laya.timer.currTimer - this._last_time;
            if (r >= a) this.blocks[e].me.y = t;
            else {
              var s = (1400 / 22500) * 0.5 * (a - r) * (a - r);
              this.blocks[e].me.y = i < t ? t - s : t + s;
            }
          }
          t += this.blocks[e].me.height;
        }
        this.panel.refresh();
        this.total_h = t;

        this.scrollbar.setVal(
          this.panel.vScrollBar.value / this.panel.vScrollBar.max,
          this.panel.height / this.total_h
        );

        this._last_time = Laya.timer.currTimer;
      }
    }

    return t;
  })();

  t.UI_PlayerData = c;
})(uiscript || (uiscript = {}));