var view;
!(t => {
  var e;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.start = 1)] = 'start';
    t[(t.during = 2)] = 'during';
    t[(t.end = 3)] = 'end';
  })(e || (e = {}));
  var i = (() => {
    class i {
      static init() {
        GameMgr.iniOSWebview
          ? (Laya.SoundManager.autoStopMusic = !0)
          : (Laya.SoundManager.autoStopMusic = !1);

        Laya.SoundManager.autoReleaseSound = !1;
        var t = Laya.LocalStorage.getItem('audioVolume');
        if (t && '' != t) {
          (a = parseFloat(t)) < 0 ? (a = 0) : a > 1 && (a = 1);
          this._audioVolume = a;
        } else this._audioVolume = 1;
        var e = Laya.LocalStorage.getItem('musicVolume');
        if (e && '' != e) {
          (a = parseFloat(e)) < 0 ? (a = 0) : a > 1 && (a = 1);
          this._music_volume = a;
        } else this._music_volume = 1;
        var i = Laya.LocalStorage.getItem('yuyinVolume');
        if (i && '' != i) {
          (a = parseFloat(i)) < 0 ? (a = 0) : a > 1 && (a = 1);
          this._character_all_volume = a;
        } else this._character_all_volume = 1;
        var n = Laya.LocalStorage.getItem('lizhiVolume');
        if (n && '' != n) {
          var a = parseFloat(n);
          a < 0 ? (a = 0) : a > 1 && (a = 1);
          this._lizhiVolume = a;
        } else this._lizhiVolume = 1;
        var r = Laya.LocalStorage.getItem('audioMute');
        this._audioMuted = !(!r || '' == r) && 'true' == r;
        var s = Laya.LocalStorage.getItem('musicMute');
        this.musicMuted = !(!s || '' == s) && 'true' == s;
        var o = Laya.LocalStorage.getItem('lizhiMute');
        this._lizhiMuted = !(!o || '' == o) && 'true' == o;
        var l = Laya.LocalStorage.getItem('yuyinMute');
        this._character_all_mute = !(!l || '' == l) && 'true' == l;
        this._map_character_mute = {};
        this._map_character_volume = {};
        Laya.timer.frameLoop(1, this, this._update);
      }

      static PlayCharactorSound({charid, level}, e, i) {
        var n = charid;
        var a = cfg.item_definition.character.get(n);
        if (!a) return null;
        for (
          var r = level,
            s = cfg.voice.sound.findGroup(a.sound),
            o = [],
            l = 0;
          l < s.length;
          l++
        )
          s[l].type == e && s[l].level_limit <= r && o.push(l);
        if (0 == o.length) return null;
        var h = o[Math.floor(Math.random() * o.length)];
        var c = a.sound_volume;
        c *= this.getCVvolume(n);
        this.getCVmute(n) && (c = 0);
        this.yuyinMuted && (c = 0);
        c *= this.yuyinVolume;
        return {
          words: s[h][`words_${GameMgr.client_language}`],
          sound: this.PlaySound(s[h].path, c, i)
        };
      }

      static PlaySound(t, e, i) {
        this._audio_id;
        this._audio_id++;
        var n = this.suffix;

        var a = Laya.SoundManager.playSound(
          t + n,
          1,
          Laya.Handler.create(this, () => {
            i && i.run();
            Laya.SoundManager.removeChannel(a);
          })
        );

        a && (a.volume = e);
        return a;
      }

      static PlayAudio(t, e, i) {
        var n = this;
        void 0 === e && (e = 1);
        void 0 === i && (i = 1);
        if (
          (this._audioMuted || 0 == this._audioVolume)
        )
          return -1;
        var a = cfg.audio.audio.get(t);
        if (!a) return -1;
        var r = this._audio_id;
        this._audio_id++;
        var s = this.suffix;

        var o = Laya.SoundManager.playSound(
          a.path + s,
          e,
          new Laya.Handler(this, () => {
            n._RemoveAudio(r);
          })
        );

        o && (o.volume = this._audioVolume * i);
        this._audio_list.push({ id: r, audio: o });
        return r;
      }

      static _RemoveAudio(t) {
        for (var e = 0; e < this._audio_list.length; e++)
          if (this._audio_list[e].id == t) {
            var i = this._audio_list[e];

            this._audio_list[e] = this._audio_list[
              this._audio_list.length - 1
            ];

            this._audio_list[this._audio_list.length - 1] = i;
            i.audio.stop();
            Laya.SoundManager.removeChannel(i.audio);
            this._audio_list.pop();
          }
      }

      static StopAudio(t) {
        this._RemoveAudio(t);
      }

      static PlayMusic(t, e, i) {
        void 0 === e && (e = 1e3);
        void 0 === i && (i = !1);
        this._current_music = t;
        this.onMusicChange(e);
        return !(!i && this._current_music == t) &&
          (!(!this.lizhiMuted && this._current_lizhi_bgm) &&
            (!0));
      }

      static StopMusic(t) {
        void 0 === t && (t = 1e3);
        this._current_music = '';
        this._current_lizhi_bgm = '';
        this._music.stop();
        this._music = null;
        this._music_state = e.end;
        this._music_state_starttime = Laya.timer.currTimer;
        this._music &&
          (t <= 0
            ? (this._music_state = e.none)
            : (this._music_state_lifetime = t));
      }

      static PlayLiqiBgm(t, e, i) {
        void 0 === e && (e = 1e3);
        void 0 === i && (i = !1);
        this._current_lizhi_bgm = t;
        this.onMusicChange(e);
        if (
          (i || this._current_lizhi_bgm != t)
        )
          return !0;
      }

      static setCVvolume(t, e) {
        e = e < 0 ? 0 : e > 1 ? 1 : e;
        this._map_character_volume[t] = e;
        Laya.LocalStorage.setItem(`characterVolume${t}`, e.toString());
      }

      static getCVvolume(t) {
        if (!this._map_character_volume.hasOwnProperty(t.toString())) {
          var e = Laya.LocalStorage.getItem(`characterVolume${t}`);
          this._map_character_volume[t] = e && '' != e ? parseFloat(e) : 1;
        }
        return this._map_character_volume[t];
      }

      static setCVmute(t, e) {
        this._map_character_mute[t] = e ? 'true' : 'false';
        Laya.LocalStorage.setItem(`characterMute${t}`, e ? 'true' : 'false');
      }

      static getCVmute(t) {
        if (!this._map_character_mute.hasOwnProperty(t.toString())) {
          var e = Laya.LocalStorage.getItem(`characterMute${t}`);
          this._map_character_mute[t] = e && '' != e ? e : 'false';
        }
        return 'true' == this._map_character_mute[t];
      }

      static refresh_music_volume(t) {
        this._music && this._music_state == e.during && (this._bgm_light = t);
      }

      static onMusicChange(i) {
        var n = this;
        void 0 === i && (i = 1e3);
        var a = '';
        var r = 0;
        var s = !1;
        a = this._current_lizhi_bgm;
        r = this.lizhiVolume;

        '' == a &&
          !this.lizhiMuted &&
          this._current_lizhi_bgm &&
          ((s = !0));

        a = this._current_music;

        '' == a &&
          !this.musicMuted &&
          this._current_music &&
          ((r = this.musicVolume));

        this._music.stop();
        this._music && ((this._music = null));
        this._music = Laya.SoundManager.playMusic(`audio/${a}`, 0);

        this._music = Laya.SoundManager.playMusic(
                `audio/${a}`,
                1,
                Laya.Handler.create(this, () => {
                  n._current_music = '';
                  n._playing_music = '';
                  t.BgmListMgr.onBgmPlayOver();
                })
              );

        s
            ? (t.BgmListMgr.onBgmChange(a, !0))
            : (t.BgmListMgr.onBgmChange(a, !1));

        this._playing_music = a;
        this._playing_music_volume = r;
        this._music.volume = 0;
        this._music_state = e.start;
        this._music_state_starttime = Laya.timer.currTimer;
        (this._music && a == this._playing_music) ||
          (a &&
          ((this._music && (this._music_state_lifetime = i))));
      }

      static _update() {
        if (this._music && this._music_state != e.none) {
          var t = Laya.timer.currTimer - this._music_state_starttime;
          if (this._music_state == e.start) {
            this._music_state = e.during;
            if (t >= this._music_state_lifetime)
              this._music.volume = this._playing_music_volume;
            else {
              i = t / this._music_state_lifetime;
              this._music.volume = this._playing_music_volume * i;
            }
            this._bgm_light && (this._music.volume *= 0.1);
          } else if (this._music_state == e.end) {
            this._music_state = e.none;
            Laya.SoundManager.stopMusic();
            if (t >= this._music_state_lifetime)
              this._music = null;
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
      }
    }

    Object.defineProperty(i, 'suffix', {
      get() {
        return Laya.Browser.window.conch ? '.ogg' : '.mp3';
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'lizhiVolume', {
      get() {
        return this._lizhiVolume;
      },
      set(t) {
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        this._lizhiVolume = t;

        this._music &&
          this._music_state == e.during &&
          this._playing_music == this._current_lizhi_bgm &&
          (this._playing_music_volume = t);

        Laya.LocalStorage.setItem('lizhiVolume', t.toString());
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'audioVolume', {
      get() {
        return this._audioVolume;
      },
      set(t) {
        t = t < 0 ? 0 : t > 1 ? 1 : t;
        this._audioVolume = t;
        Laya.LocalStorage.setItem('audioVolume', t.toString());
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'musicVolume', {
      get() {
        return this._music_volume;
      },
      set(t) {
        this._music_volume = t;
        Laya.LocalStorage.setItem('musicVolume', t.toString());
        this._music &&
          this._music_state == e.during &&
          this._playing_music == this._current_music &&
          (this._playing_music_volume = t);
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'lizhiMuted', {
      get() {
        return this._lizhiMuted;
      },
      set(t) {
        this._lizhiMuted = t;
        Laya.LocalStorage.setItem('lizhiMute', t ? 'true' : 'false');
        this.onMusicChange();
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'musicMuted', {
      get() {
        return this._musicMuted;
      },
      set(t) {
        this._musicMuted = t;
        Laya.LocalStorage.setItem('musicMute', t ? 'true' : 'false');
        this.onMusicChange();
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'audioMuted', {
      get() {
        return this._audioMuted;
      },
      set(t) {
        this._audioMuted = t;
        Laya.LocalStorage.setItem('audioMute', t ? 'true' : 'false');
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'yuyinVolume', {
      get() {
        return this._character_all_volume;
      },
      set(t) {
        this._character_all_volume = t;
        Laya.LocalStorage.setItem('yuyinVolume', t.toString());
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'yuyinMuted', {
      get() {
        return this._character_all_mute;
      },
      set(t) {
        this._character_all_mute = t;
        Laya.LocalStorage.setItem('yuyinMute', t ? 'true' : 'false');
      },
      enumerable: !0,
      configurable: !0
    });

    i._audio_id = 0;
    i._audio_list = [];
    i._audioVolume = 0;
    i._audioMuted = !1;
    i._music = null;
    i._playing_music = '';
    i._playing_music_volume = 0;
    i._music_volume = 1;
    i._musicMuted = !1;
    i._current_music = '';
    i._lizhiVolume = 0;
    i._lizhiMuted = !1;
    i._current_lizhi_bgm = '';
    i._music_state = e.none;
    i._music_state_starttime = 0;
    i._music_state_lifetime = 0;
    i._character_all_volume = 1;
    i._character_all_mute = !1;
    i._map_character_mute = {};
    i._map_character_volume = {};
    i._bgm_light = !1;
    return i;
  })();
  t.AudioMgr = i;
})(view || (view = {}));