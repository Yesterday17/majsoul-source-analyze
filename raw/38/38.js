var game;
!(function(t) {
  var e = (function() {
    function e() {}
    return (
      Object.defineProperty(e, 'currentTime', {
        get: function() {
          return Math.floor(Date.now() / 1e3);
        },
        enumerable: !0,
        configurable: !0
      }),
      (e.time2YearMounthDate = function(t) {
        var e = new Date(1e3 * t),
          i = '';
        return (
          (i += e.getFullYear() + '/'),
          (i +=
            (e.getMonth() < 9 ? '0' : '') +
            (e.getMonth() + 1).toString() +
            '/'),
          (i += (e.getDate() < 10 ? '0' : '') + e.getDate())
        );
      }),
      (e.time2HourMinute = function(t, e) {
        void 0 === e && (e = !1);
        var i = new Date(1e3 * t),
          n = '';
        return (
          (n += (i.getHours() < 10 ? '0' : '') + i.getHours() + ':'),
          (n += (i.getMinutes() < 10 ? '0' : '') + i.getMinutes()),
          e &&
            ((n += ':'),
            (n += (i.getSeconds() < 10 ? '0' : '') + i.getSeconds())),
          n
        );
      }),
      (e.time2Desc = function(e) {
        var i = Math.floor(Date.now() / 1e3) - e;
        if (i < 600) return t.Tools.strOfLocalization(2013);
        if (i < 3600) {
          return (
            (n = Math.floor(i / 10 / 60)).toString() +
            '0' +
            t.Tools.strOfLocalization(2014)
          );
        }
        if (i < 86400) {
          return (
            (n = Math.floor(i / 60 / 60)).toString() +
            t.Tools.strOfLocalization(2015)
          );
        }
        if (i < 604800) {
          return (
            (n = Math.floor(i / 24 / 60 / 60)).toString() +
            t.Tools.strOfLocalization(2016)
          );
        }
        if (i < 2419200) {
          var n = Math.floor(i / 7 / 24 / 60 / 60);
          return n.toString() + t.Tools.strOfLocalization(2017);
        }
        return '1' + t.Tools.strOfLocalization(2018);
      }),
      (e.timelength2Desc = function(e) {
        var i = '',
          n = e;
        return (
          n % 60 > 0 && (i = (n % 60) + t.Tools.strOfLocalization(2019)),
          (n = Math.floor(n / 60)) % 60 > 0 &&
            (i = (n % 60) + t.Tools.strOfLocalization(2020) + i),
          (n = Math.floor(n / 60)) % 24 > 0 &&
            (i = (n % 24) + t.Tools.strOfLocalization(2021) + i),
          (n = Math.floor(n / 24)) > 0 &&
            (i = n + t.Tools.strOfLocalization(2022) + i),
          '' == i && (i = '0' + t.Tools.strOfLocalization(2019)),
          i
        );
      }),
      (e.playState2Desc = function(e) {
        if (!e) return '';
        if (!e.game_uuid || '' == e.game_uuid) return '';
        if (1 == e.category) return t.Tools.strOfLocalization(2023);
        if (2 == e.category && e.meta) {
          var i = cfg.desktop.matchmode.get(e.meta.mode_id);
          if (i) return i['room_name_' + GameMgr.client_language];
        }
        return 4 == e.category ? t.Tools.strOfLocalization(2025) : '';
      }),
      (e.setGrayDisable = function(t, e) {
        e
          ? ((t.mouseEnabled = !1),
            (t.filters = [new Laya.ColorFilter(uiscript.GRAY_FILTER)]))
          : ((t.mouseEnabled = !0), (t.filters = []));
      }),
      (e.generateUUID = function() {
        var t = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
          e
        ) {
          var i = (t + 16 * Math.random()) % 16 | 0;
          return (
            (t = Math.floor(t / 16)), ('x' == e ? i : (3 & i) | 8).toString(16)
          );
        });
      }),
      Object.defineProperty(e, 'deviceInfo', {
        get: function() {
          var e = {};
          e['client-version'] = t.ResourceVersion.version;
          var i = [];
          if (
            (Laya.Browser.onIOS && i.push('onIOS'),
            Laya.Browser.onMac && i.push('onMac'),
            Laya.Browser.onIPad && i.push('onIPad'),
            (Laya.Browser.onAndriod || Laya.Browser.onAndroid) &&
              i.push('onAndroid'),
            Laya.Browser.onSafari && i.push('onSafari'),
            Laya.Browser.onFirefox && i.push('onFirefox'),
            Laya.Browser.onEdge && i.push('onEdge'),
            Laya.Browser.onWeiXin && i.push('onWeiXin'),
            Laya.Browser.onMiniGame && i.push('onMiniGame'),
            Laya.Browser.onMQQBrowser && i.push('onMQQBrowser'),
            Laya.Render.isConchApp
              ? i.push('onApp')
              : Laya.Browser.onPC && i.push('onPC'),
            i.length > 0)
          ) {
            for (var n = '', a = 0; a < i.length; a++)
              0 != a && (n += '|'), (n += i[a]);
            e.device = n;
          } else e.device = 'unknown';
          return e;
        },
        enumerable: !0,
        configurable: !0
      }),
      (e.strWithoutForbidden = function(t) {
        var e = t,
          i = '';
        switch (GameMgr.client_language) {
          case 'chs':
            i = 'chs';
            break;
          case 'en':
            i = 'us';
            break;
          case 'jp':
            i = 'jp';
        }
        return (
          cfg.info.forbidden.forEach(function(t, n) {
            if (!('' == t.word || (i && t[i])))
              for (;;) {
                if (!(e.indexOf(t.word) >= 0)) break;
                for (var a = '', r = 0; r < t.word.length; r++) a += '*';
                e = e.replace(t.word, a);
              }
          }),
          e
        );
      }),
      (e.faceOn = function(e, i, n, a, r) {
        a.visible = !1;
        var s = cfg.item_definition.skin.get(e);
        if (s) {
          a.skin = t.LoadMgr.getResImageSkin(s.path + '/' + i + '.png');
          var o = r.width / s[n + '_width'],
            l = r.height / s[n + '_height'];
          (a.anchorX = 0),
            (a.anchorY = 0),
            (a.width = s.face_width * o),
            (a.height = s.face_height * l),
            (a.x = (s.face_x - s[n + '_x']) * o),
            (a.y = (s.face_y - s[n + '_y']) * l),
            (a.visible = !0);
        }
      }),
      (e.charaPart = function(e, i, n, a, r) {
        void 0 === r && (r = !1);
        var s = cfg.item_definition.skin.get(400101);
        if (s) {
          var o = cfg.item_definition.skin.get(e);
          if (o) {
            (i.scaleX = 1),
              (i.width = (a.width * o[n + '_width']) / s[n + '_width']),
              (i.height = (a.height * o[n + '_height']) / s[n + '_height']),
              (i.x =
                a.x +
                (((o[n + '_x'] - s[n + '_x']) * a.width) / s[n + '_width']) *
                  i.scaleX),
              (i.y =
                a.y +
                (((o[n + '_y'] - s[n + '_y']) * a.height) / s[n + '_height']) *
                  i.scaleY);
            var l = 1,
              h = i.parent;
            if (
              (h &&
                ((l *= h.scaleX > 0 ? 1 : -1),
                (h = h.parent) && (l *= h.scaleX > 0 ? 1 : -1)),
              r && s.direction != o.direction && (i.scaleX = -1),
              i.scaleX * l > 0
                ? (i.skin = t.LoadMgr.getResImageSkin(
                    o.path + '/' + n + '.png'
                  ))
                : o.no_reverse
                ? ((i.scaleX *= -1),
                  (i.skin = t.LoadMgr.getResImageSkin(
                    o.path + '/reverse/' + n + '.png'
                  )))
                : (i.skin = t.LoadMgr.getResImageSkin(
                    o.path + '/' + n + '.png'
                  )),
              i.scaleX < 0)
            ) {
              var c = 0;
              i.anchorX && (c = i.anchorX),
                (i.x += 2 * (o[n + '_center_x'] - c) * i.width);
            }
          }
        }
      }),
      (e.showRewards = function(e, i) {
        for (var n = this, a = [], r = [], s = 0; s < e.rewards.length; s++)
          100099 != e.rewards[s].id &&
            (100098 != e.rewards[s].id
              ? 6 == Math.floor(e.rewards[s].id / 1e5)
                ? r.push(e.rewards[s].id)
                : a.push(e.rewards[s])
              : uiscript.UI_LightTips.Inst.show(
                  t.Tools.strOfLocalization(2024)
                ));
        var o = !1,
          l = 0,
          h = function() {
            if (!o && a.length > 0)
              return (
                uiscript.UI_Getrewardextends.Inst.show(
                  a,
                  Laya.Handler.create(n, function() {
                    h();
                  })
                ),
                void (o = !0)
              );
            l < r.length
              ? uiscript.UI_Gettitle.Inst.show(
                  r[l++],
                  Laya.Handler.create(n, function() {
                    h();
                  })
                )
              : i && i.run();
          };
        h();
      }),
      (e.debugFetchMultiAccountBrief = function(t, e, i, n) {
        if (!(Laya.timer.currTimer < this.debugfetchcd)) {
          this.debugfetchcd = Laya.timer.currTimer + 3e5;
          var a = {};
          (a.type = 'debugFetchMultiAccountBrief'),
            (a.pos = t),
            (a.index = e),
            (a.total = i),
            (a.value_count = n);
          new Laya.HttpRequest().send(
            GameMgr.error_url,
            'data=' + JSON.stringify(a),
            'post'
          );
        }
      }),
      (e.room_mode_desc = function(e) {
        var i = '';
        switch (e) {
          case 0:
            i = t.Tools.strOfLocalization(2026);
            break;
          case 1:
            i = t.Tools.strOfLocalization(2027);
            break;
          case 2:
            i = t.Tools.strOfLocalization(2028);
            break;
          case 3:
            i = t.Tools.strOfLocalization(2029);
            break;
          case 4:
            i = t.Tools.strOfLocalization(2026);
            break;
          case 10:
            i = t.Tools.strOfLocalization(2030);
            break;
          case 11:
            i = t.Tools.strOfLocalization(2031);
            break;
          case 12:
            i = t.Tools.strOfLocalization(2032);
            break;
          case 13:
            i = t.Tools.strOfLocalization(2033);
            break;
          case 14:
            i = t.Tools.strOfLocalization(2030);
        }
        return i;
      }),
      (e.get_room_desc = function(e) {
        if (!e) return { text: '', isSimhei: !1 };
        var i = '';
        if (e.meta && e.meta.tournament_id) {
          var n = cfg.tournament.tournaments.get(e.meta.tournament_id);
          return n && (i = n.name), { text: i, isSimhei: !0 };
        }
        if (1 == e.category) i += t.Tools.strOfLocalization(2023) + '·';
        else if (4 == e.category) i += t.Tools.strOfLocalization(2025) + '·';
        else if (2 == e.category) {
          var a = e.meta;
          if (a) {
            var r = cfg.desktop.matchmode.get(a.mode_id);
            r && (i += r['room_name_' + GameMgr.client_language] + '·');
          }
        }
        var s = e.mode.mode;
        return (i += this.room_mode_desc(s)), { text: i, isSimhei: !1 };
      }),
      (e.get_chara_audio = function(t, e) {
        if (e && '' != e) {
          var i = t.charid,
            n = cfg.item_definition.character.get(i);
          if (!n) return null;
          for (
            var a = t.level,
              r = cfg.voice.sound.findGroup(n.sound),
              s = [],
              o = 0;
            o < r.length;
            o++
          )
            r[o].type == e && r[o].level_limit <= a && s.push(o);
          if (0 == s.length) return null;
          var l = s[Math.floor(Math.random() * s.length)],
            h = view.AudioMgr.getCVmute(n.id)
              ? 0
              : view.AudioMgr.getCVvolume(n.id) * n.sound_volume;
          return (
            view.AudioMgr.yuyinMuted
              ? (h = 0)
              : (h *= view.AudioMgr.yuyinVolume),
            { path: r[l].path, volume: h, time_length: r[l].time_length }
          );
        }
      }),
      (e.encode_account_id2 = function(t) {
        var e = 67108863 & (t ^= 6139246);
        return (
          (e = ((511 & e) << 17) | (e >> 9)),
          (e = ((511 & e) << 17) | (e >> 9)),
          (e = ((511 & e) << 17) | (e >> 9)),
          (e = ((511 & e) << 17) | (e >> 9)),
          (e = ((511 & e) << 17) | (e >> 9)) + (-67108864 & t) + 1e7
        );
      }),
      (e.decode_account_id2 = function(t) {
        var e = 67108863 & (t -= 1e7);
        return (
          (e = ((131071 & e) << 9) | (e >> 17)),
          (e = ((131071 & e) << 9) | (e >> 17)),
          (e = ((131071 & e) << 9) | (e >> 17)),
          (e = ((131071 & e) << 9) | (e >> 17)),
          (e = ((131071 & e) << 9) | (e >> 17)),
          ((-67108864 & t) + e) ^ 6139246
        );
      }),
      (e.encode_account_id = function(t) {
        return 1358437 + ((7 * t + 1117113) ^ 86216345);
      }),
      (e.decode_account_id = function(t) {
        return (((t - 1358437) ^ 86216345) - 1117113) / 7;
      }),
      (e.child_align_center = function(t, e) {
        for (var i = [], n = 0; n < t.numChildren; n++) {
          if ((l = t.getChildAt(n)).visible) {
            var a = l.width;
            l instanceof Laya.Text
              ? (a = l.textWidth)
              : l instanceof Laya.Label && (a = l.textField.textWidth),
              i.push(a * l.scaleX);
          }
        }
        for (var r = 0, n = 0; n < i.length; n++)
          (r += i[n]), e && n < e.length && (r += e[n]);
        for (
          var s = t.width / 2 - r / 2, o = 0, n = 0;
          n < t.numChildren;
          n++
        ) {
          var l = t.getChildAt(n);
          l.visible &&
            ((l.x = s + l.pivotX * l.scaleX),
            (s += i[o]),
            e && o < e.length && (s += e[o]),
            o++);
        }
      }),
      (e.sprite_align_center = function(t, e, i) {
        for (var n = [], a = 0; a < t.length; a++) {
          if ((h = t[a]).visible) {
            var r = h.width;
            h instanceof Laya.Text
              ? (r = h.textWidth)
              : h instanceof Laya.Label && (r = h.textField.textWidth),
              n.push(r * h.scaleX);
          }
        }
        for (var s = 0, a = 0; a < n.length; a++)
          (s += n[a]), i && a < i.length && (s += i[a]);
        for (var o = e - s / 2, l = 0, a = 0; a < t.length; a++) {
          var h = t[a];
          h.visible &&
            ((h.x = o + h.pivotX * h.scaleX),
            (o += n[l]),
            i && l < i.length && (o += i[l]),
            l++);
        }
      }),
      (e.build_char_map = function() {
        if (!this.char_map) {
          for (var t = [], e = 'a'.charCodeAt(0), i = 0; i < 26; i++)
            t.push(String.fromCharCode(e + i));
          for (var n = 'A'.charCodeAt(0), i = 0; i < 26; i++)
            t.push(String.fromCharCode(n + i));
          for (i = 0; i < 10; i++) t.push(i.toString());
          for (var a = '!@#$%^&*()-_=+{}[]|:;<>,.?/~', i = 0; i < a.length; i++)
            t.push(a[i]);
          (this.char_lst = t), (this.char_map = {});
          for (i = 0; i < t.length; i++) this.char_map[t[i]] = i;
        }
      }),
      (e.eeesss = function(t) {
        this.build_char_map();
        for (
          var e = '', i = (Math.floor(t.length / 3) + 17) % t.length, n = 0;
          n < t.length;
          n++
        ) {
          var a = (2 + 3 * n) ^ 11,
            r = t[(i - n + t.length) % t.length],
            s = this.char_map[r];
          e += null != s ? this.char_lst[(s + a) % this.char_lst.length] : r;
        }
        return e;
      }),
      (e.dddsss = function(t) {
        if (!t) return t;
        this.build_char_map();
        for (
          var e = '',
            i = (Math.floor(t.length / 3) + 17) % t.length,
            n = [],
            a = 0;
          a < t.length;
          a++
        ) {
          var r = (2 + 3 * a) ^ 11,
            s = t[a],
            o = this.char_map[s];
          null != o
            ? n.push(
                this.char_lst[
                  (o - r + this.char_lst.length) % this.char_lst.length
                ]
              )
            : n.push(s);
        }
        for (a = i; a >= 0; a--) e += n[a];
        for (a = t.length - 1; a > i; a--) e += n[a];
        return e;
      }),
      (e.open_new_window = function(t) {
        var e = document.createElement('a');
        (e.href = t), (e.target = '_blank'), e.click(), e.remove();
      }),
      (e.base64ToBlob = function(t, e) {
        for (
          var i = t.split(','),
            n = i[0].match(/:(.*?);/)[1] || e,
            a = window.atob(i[1]),
            r = new ArrayBuffer(a.length),
            s = new Uint8Array(r),
            o = 0;
          o < a.length;
          o++
        )
          s[o] = a.charCodeAt(o);
        return new Blob([r], { type: n });
      }),
      (e.stringContainerSub = function(t, e) {
        if (!e || '' == e) return !0;
        if (!t || '' == t) return !1;
        for (var i = 0, n = 0; n < t.length; n++)
          if (t.charAt(n) == e.charAt(i) && ++i >= e.length) return !0;
        return !1;
      }),
      (e.strOfLocalization = function(t, e) {
        void 0 === e && (e = []);
        var i = cfg.str.str.find(t)[GameMgr.client_language];
        if (e)
          for (var n = 0; n < e.length; n++) {
            var a = '{' + n + '}';
            i = i.replace(a, e[n]);
          }
        return i;
      }),
      (e.deal_gateway = function(t) {
        for (var e = [], i = 0; i < t.length; i++) {
          var n = Math.floor(Math.random() * (i + 1));
          e.push(i), (e[i] = e[n]), (e[n] = i);
        }
        for (var a = {}, r = [], i = 0; i < t.length; i++) {
          var s = t[e[i]],
            o = s.split(':');
          if (2 == o.length) {
            var l = o[0];
            a[l] || (a[l] = 0), a[l] < 2 && (a[l]++, r.push(s));
          }
        }
        return r;
      }),
      (e.localUISrc = function(t) {
        return (
          'chs' != GameMgr.client_language &&
            (t = GameMgr.client_language + '/' + t),
          t
        );
      }),
      (e.labelLocalizationPosition = function(t, e, i, n) {
        var a = t.textField.textWidth;
        t.x = a > i ? e + ((a - i) / 2) * t.scaleX * (n ? 1 : -1) : e;
      }),
      (e.labelLocalizationSize = function(t, e, i) {
        var n = t.textField.textWidth;
        if (n > e) {
          var a = n / e;
          (t.width = e * a), (t.scaleX = t.scaleY = i / a);
        } else (t.width = e), (t.scaleX = t.scaleY = i);
      }),
      (e.ToDBC = function(t) {
        for (var e = '', i = 0; i < t.length; i++)
          32 == t.charCodeAt(i) && (e += String.fromCharCode(12288)),
            t.charCodeAt(i) < 127 &&
              (e += String.fromCharCode(t.charCodeAt(i) + 65248));
        return e;
      }),
      (e.is_same_zone = function(t, e) {
        var i = t >> 23,
          n = e >> 23;
        return i >= 0 && i <= 6
          ? n >= 0 && n <= 6
          : i >= 7 && i <= 12
          ? n >= 7 && n <= 12
          : i >= 13 && i <= 15 && (n >= 13 && n <= 15);
      }),
      (e.titleLocalization = function(t, e) {
        return e && this.is_same_zone(GameMgr.Inst.account_id, t) ? e : 0;
      }),
      (e.calu_word_length = function(t) {
        for (var e = 0, i = 0; i < t.length; i++)
          t.charCodeAt(i) > 255 ? (e += 2) : (e += 1);
        return e;
      }),
      (e.encode_email = function(t) {
        var e = t.indexOf('@');
        if (e < 0) return t;
        var i = '';
        i += e < 2 ? t.substr(0, e) : t.substr(0, 2);
        for (var n = 0; n < 6; n++) i += '*';
        return (i += t.substr(e));
      }),
      (e.pending_email_vaild = function(t) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          t
        );
      }),
      (e.isPassedRefreshTime = function(t) {
        return (
          Math.floor((t + 10800) / 86400) ===
          Math.floor((Math.floor(Date.now() / 1e3) + 10800) / 86400)
        );
      }),
      (e.ParseTime = function(t) {
        for (
          var e = [], i = '0'.charCodeAt(0), n = 0, a = !1, r = 0;
          r < t.length;
          r++
        ) {
          var s = t.charCodeAt(r) - i;
          s >= 0 && s <= 9
            ? ((a = !0), (n = 10 * n + s))
            : a && ((a = !1), e.push(n), (n = 0));
        }
        a && e.push(n);
        var o = new Date();
        o.setUTCFullYear(e[0], e[1] - 1, e[2]),
          o.setUTCHours(e[3], e[4], e[5], 0);
        var l = o.getTime();
        if (e.length >= 7) {
          var h = 3600 * e[6] * 1e3;
          '+' == t[t.length - 3] ? (l -= h) : (l += h);
        }
        return l;
      }),
      (e.debugfetchcd = 0),
      (e.char_lst = null),
      (e.char_map = null),
      e
    );
  })();
  t.Tools = e;
})(game || (game = {}));