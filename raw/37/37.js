var view;
!(function(t) {
  var e;
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.start = 1)] = 'start'),
      (t[(t.during = 2)] = 'during'),
      (t[(t.end = 3)] = 'end');
  })(e || (e = {}));
  var i = (function() {
    function i() {}
    return (
      Object.defineProperty(i, 'suffix', {
        get: function() {
          return Laya.Browser.window.conch ? '.ogg' : '.mp3';
        },
        enumerable: true,
        configurable: true
      }),
      (i.init = function() {
        GameMgr.iniOSWebview
          ? (Laya.SoundManager.autoStopMusic = true)
          : (Laya.SoundManager.autoStopMusic = false),
          (Laya.SoundManager.autoReleaseSound = false);
        var t = Laya.LocalStorage.getItem('audioVolume');
        if (t && '' != t) {
          (a = parseFloat(t)) < 0 ? (a = 0) : a > 1 && (a = 1),
            (this._audioVolume = a);
        } else this._audioVolume = 1;
        var e = Laya.LocalStorage.getItem('musicVolume');
        if (e && '' != e) {
          (a = parseFloat(e)) < 0 ? (a = 0) : a > 1 && (a = 1),
            (this._music_volume = a);
        } else this._music_volume = 1;
        var i = Laya.LocalStorage.getItem('yuyinVolume');
        if (i && '' != i) {
          (a = parseFloat(i)) < 0 ? (a = 0) : a > 1 && (a = 1),
            (this._character_all_volume = a);
        } else this._character_all_volume = 1;
        var n = Laya.LocalStorage.getItem('lizhiVolume');
        if (n && '' != n) {
          var a = parseFloat(n);
          a < 0 ? (a = 0) : a > 1 && (a = 1), (this._lizhiVolume = a);
        } else this._lizhiVolume = 1;
        var r = Laya.LocalStorage.getItem('audioMute');
        this._audioMuted = !(!r || '' == r) && 'true' == r;
        var s = Laya.LocalStorage.getItem('musicMute');
        this.musicMuted = !(!s || '' == s) && 'true' == s;
        var o = Laya.LocalStorage.getItem('lizhiMute');
        this._lizhiMuted = !(!o || '' == o) && 'true' == o;
        var l = Laya.LocalStorage.getItem('yuyinMute');
        (this._character_all_mute = !(!l || '' == l) && 'true' == l),
          (this._map_character_mute = {}),
          (this._map_character_volume = {}),
          Laya.timer.frameLoop(1, this, this._update);
      }),
      (i.PlayCharactorSound = function(t, e, i) {
        var n = t.charid,
          a = cfg.item_definition.character.get(n);
        if (!a) return null;
        for (
          var r = t.level,
            s = cfg.voice.sound.findGroup(a.sound),
            o = [],
            l = 0;
          l < s.length;
          l++
        )
          s[l].type == e && s[l].level_limit <= r && o.push(l);
        if (0 == o.length) return null;
        var h = o[Math.floor(Math.random() * o.length)],
          c = a.sound_volume;
        return (
          (c *= this.getCVvolume(n)),
          this.getCVmute(n) && (c = 0),
          this.yuyinMuted && (c = 0),
          (c *= this.yuyinVolume),
          {
            words: s[h]['words_' + GameMgr.client_language],
            sound: this.PlaySound(s[h].path, c, i)
          }
        );
      }),
      (i.PlaySound = function(t, e, i) {
        this._audio_id;
        this._audio_id++;
        var n = this.suffix,
          a = Laya.SoundManager.playSound(
            t + n,
            1,
            Laya.Handler.create(this, function() {
              i && i.run(), Laya.SoundManager.removeChannel(a);
            })
          );
        return a && (a.volume = e), a;
      }),
      (i.PlayAudio = function(t, e, i) {
        var n = this;
        if (
          (undefined === e && (e = 1),
          undefined === i && (i = 1),
          this._audioMuted || 0 == this._audioVolume)
        )
          return -1;
        var a = cfg.audio.audio.get(t);
        if (!a) return -1;
        var r = this._audio_id;
        this._audio_id++;
        var s = this.suffix,
          o = Laya.SoundManager.playSound(
            a.path + s,
            e,
            new Laya.Handler(this, function() {
              n._RemoveAudio(r);
            })
          );
        return (
          o && (o.volume = this._audioVolume * i),
          this._audio_list.push({ id: r, audio: o }),
          r
        );
      }),
      (i._RemoveAudio = function(t) {
        for (var e = 0; e < this._audio_list.length; e++)
          if (this._audio_list[e].id == t) {
            var i = this._audio_list[e];
            (this._audio_list[e] = this._audio_list[
              this._audio_list.length - 1
            ]),
              (this._audio_list[this._audio_list.length - 1] = i),
              i.audio.stop(),
              Laya.SoundManager.removeChannel(i.audio),
              this._audio_list.pop();
          }
      }),
      (i.StopAudio = function(t) {
        this._RemoveAudio(t);
      }),
      (i.PlayMusic = function(t, e, i) {
        return (
          undefined === e && (e = 1e3),
          undefined === i && (i = false),
          !(!i && this._current_music == t) &&
            (!(!this.lizhiMuted && this._current_lizhi_bgm) &&
              ((this._current_music = t), this.onMusicChange(e), true))
        );
      }),
      (i.StopMusic = function(t) {
        undefined === t && (t = 1e3),
          (this._current_music = ''),
          (this._current_lizhi_bgm = ''),
          this._music &&
            (t <= 0
              ? (this._music.stop(),
                (this._music = null),
                (this._music_state = e.none))
              : ((this._music_state = e.end),
                (this._music_state_starttime = Laya.timer.currTimer),
                (this._music_state_lifetime = t)));
      }),
      (i.PlayLiqiBgm = function(t, e, i) {
        if (
          (undefined === e && (e = 1e3),
          undefined === i && (i = false),
          i || this._current_lizhi_bgm != t)
        )
          return (this._current_lizhi_bgm = t), this.onMusicChange(e), true;
      }),
      Object.defineProperty(i, 'lizhiVolume', {
        get: function() {
          return this._lizhiVolume;
        },
        set: function(t) {
          (t = t < 0 ? 0 : t > 1 ? 1 : t),
            (this._lizhiVolume = t),
            this._music &&
              this._music_state == e.during &&
              this._playing_music == this._current_lizhi_bgm &&
              (this._playing_music_volume = t),
            Laya.LocalStorage.setItem('lizhiVolume', t.toString());
        },
        enumerable: true,
        configurable: true
      }),
      (i.setCVvolume = function(t, e) {
        (e = e < 0 ? 0 : e > 1 ? 1 : e),
          (this._map_character_volume[t] = e),
          Laya.LocalStorage.setItem('characterVolume' + t, e.toString());
      }),
      (i.getCVvolume = function(t) {
        if (!this._map_character_volume.hasOwnProperty(t.toString())) {
          var e = Laya.LocalStorage.getItem('characterVolume' + t);
          this._map_character_volume[t] = e && '' != e ? parseFloat(e) : 1;
        }
        return this._map_character_volume[t];
      }),
      (i.setCVmute = function(t, e) {
        (this._map_character_mute[t] = e ? 'true' : 'false'),
          Laya.LocalStorage.setItem('characterMute' + t, e ? 'true' : 'false');
      }),
      (i.getCVmute = function(t) {
        if (!this._map_character_mute.hasOwnProperty(t.toString())) {
          var e = Laya.LocalStorage.getItem('characterMute' + t);
          this._map_character_mute[t] = e && '' != e ? e : 'false';
        }
        return 'true' == this._map_character_mute[t];
      }),
      Object.defineProperty(i, 'audioVolume', {
        get: function() {
          return this._audioVolume;
        },
        set: function(t) {
          (t = t < 0 ? 0 : t > 1 ? 1 : t),
            (this._audioVolume = t),
            Laya.LocalStorage.setItem('audioVolume', t.toString());
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i, 'musicVolume', {
        get: function() {
          return this._music_volume;
        },
        set: function(t) {
          (this._music_volume = t),
            Laya.LocalStorage.setItem('musicVolume', t.toString()),
            this._music &&
              this._music_state == e.during &&
              this._playing_music == this._current_music &&
              (this._playing_music_volume = t);
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i, 'lizhiMuted', {
        get: function() {
          return this._lizhiMuted;
        },
        set: function(t) {
          (this._lizhiMuted = t),
            Laya.LocalStorage.setItem('lizhiMute', t ? 'true' : 'false'),
            this.onMusicChange();
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i, 'musicMuted', {
        get: function() {
          return this._musicMuted;
        },
        set: function(t) {
          (this._musicMuted = t),
            Laya.LocalStorage.setItem('musicMute', t ? 'true' : 'false'),
            this.onMusicChange();
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i, 'audioMuted', {
        get: function() {
          return this._audioMuted;
        },
        set: function(t) {
          (this._audioMuted = t),
            Laya.LocalStorage.setItem('audioMute', t ? 'true' : 'false');
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i, 'yuyinVolume', {
        get: function() {
          return this._character_all_volume;
        },
        set: function(t) {
          (this._character_all_volume = t),
            Laya.LocalStorage.setItem('yuyinVolume', t.toString());
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i, 'yuyinMuted', {
        get: function() {
          return this._character_all_mute;
        },
        set: function(t) {
          (this._character_all_mute = t),
            Laya.LocalStorage.setItem('yuyinMute', t ? 'true' : 'false');
        },
        enumerable: true,
        configurable: true
      }),
      (i.refresh_music_volume = function(t) {
        this._music && this._music_state == e.during && (this._bgm_light = t);
      }),
      (i.onMusicChange = function(i) {
        var n = this;
        undefined === i && (i = 1e3);
        var a = '',
          r = 0,
          s = false;
        '' == a &&
          !this.lizhiMuted &&
          this._current_lizhi_bgm &&
          ((a = this._current_lizhi_bgm), (r = this.lizhiVolume), (s = true)),
          '' == a &&
            !this.musicMuted &&
            this._current_music &&
            ((a = this._current_music), (r = this.musicVolume)),
          (this._music && a == this._playing_music) ||
            (this._music && (this._music.stop(), (this._music = null)),
            a &&
              (s
                ? ((this._music = Laya.SoundManager.playMusic('audio/' + a, 0)),
                  t.BgmListMgr.onBgmChange(a, true))
                : ((this._music = Laya.SoundManager.playMusic(
                    'audio/' + a,
                    1,
                    Laya.Handler.create(this, function() {
                      (n._current_music = ''),
                        (n._playing_music = ''),
                        t.BgmListMgr.onBgmPlayOver();
                    })
                  )),
                  t.BgmListMgr.onBgmChange(a, false)),
              this._music &&
                ((this._playing_music = a),
                (this._playing_music_volume = r),
                (this._music.volume = 0),
                (this._music_state = e.start),
                (this._music_state_starttime = Laya.timer.currTimer),
                (this._music_state_lifetime = i))));
      }),
      (i._update = function() {
        if (this._music && this._music_state != e.none) {
          var t = Laya.timer.currTimer - this._music_state_starttime;
          if (this._music_state == e.start) {
            if (t >= this._music_state_lifetime)
              (this._music_state = e.during),
                (this._music.volume = this._playing_music_volume);
            else {
              i = t / this._music_state_lifetime;
              this._music.volume = this._playing_music_volume * i;
            }
            this._bgm_light && (this._music.volume *= 0.1);
          } else if (this._music_state == e.end) {
            if (t >= this._music_state_lifetime)
              (this._music_state = e.none),
                Laya.SoundManager.stopMusic(),
                (this._music = null);
            else {
              var i = t / this._music_state_lifetime;
              this._music.volume = this._playing_music_volume * (1 - i);
            }
            this._bgm_light && (this._music.volume *= 0.1);
          } else
            this._bgm_light
              ? (this._music.volume = 0.1 * this._playing_music_volume)
              : (this._music.volume = this._playing_music_volume);
        }
      }),
      (i._audio_id = 0),
      (i._audio_list = []),
      (i._audioVolume = 0),
      (i._audioMuted = false),
      (i._music = null),
      (i._playing_music = ''),
      (i._playing_music_volume = 0),
      (i._music_volume = 1),
      (i._musicMuted = false),
      (i._current_music = ''),
      (i._lizhiVolume = 0),
      (i._lizhiMuted = false),
      (i._current_lizhi_bgm = ''),
      (i._music_state = e.none),
      (i._music_state_starttime = 0),
      (i._music_state_lifetime = 0),
      (i._character_all_volume = 1),
      (i._character_all_mute = false),
      (i._map_character_mute = {}),
      (i._map_character_volume = {}),
      (i._bgm_light = false),
      i
    );
  })();
  t.AudioMgr = i;
})(view || (view = {}));