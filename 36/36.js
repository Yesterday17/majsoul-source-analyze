var view;
!(t => {
  var e;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.lobby = 1)] = 'lobby';
    t[(t.mj = 2)] = 'mj';
    t[(t.lizhi = 3)] = 'lizhi';
  })(e = t.E_Bgm_Type || (t.E_Bgm_Type = {}));
  var i = (() => {
    class i {
      static init() {
        var t = Laya.LocalStorage.getItem(
          game.Tools.eeesss(`baned_bgm_lobby_list${GameMgr.Inst.account_id}`)
        );
        this.baned_bgm_lobby_list = [];
        t && '' != t && (this.baned_bgm_lobby_list = t.split(','));

        this.bgm_lobby_mode = Laya.LocalStorage.getItem(
            game.Tools.eeesss(`bgm_lobby_mode${GameMgr.Inst.account_id}`)
          );

        (this.bgm_lobby_mode && '' != this.bgm_lobby_mode) ||
          (this.bgm_lobby_mode = 'list');
        var i = Laya.LocalStorage.getItem(
          game.Tools.eeesss(`baned_bgm_mj_list${GameMgr.Inst.account_id}`)
        );
        this.baned_bgm_mj_list = [];
        i && '' != i && (this.baned_bgm_mj_list = i.split(','));

        this.bgm_mj_mode = Laya.LocalStorage.getItem(
            game.Tools.eeesss(`bgm_mj_mode${GameMgr.Inst.account_id}`)
          );

        (this.bgm_mj_mode && '' != this.bgm_mj_mode) ||
          (this.bgm_mj_mode = 'list');

        this.type = e.none;
        this.playing_bgm = '';
      }

      static saveConfig() {
        0 != e && (t += ',');
        for (var t = '', e = 0; e < this.baned_bgm_lobby_list.length; e++)
          t += this.baned_bgm_lobby_list[e];
        Laya.LocalStorage.setItem(
          game.Tools.eeesss(`baned_bgm_lobby_list${GameMgr.Inst.account_id}`),
          t
        );
        0 != e && (i += ',');
        for (var i = '', e = 0; e < this.baned_bgm_mj_list.length; e++)
          i += this.baned_bgm_mj_list[e];
        Laya.LocalStorage.setItem(
          game.Tools.eeesss(`baned_bgm_mj_list${GameMgr.Inst.account_id}`),
          i
        );
      }

      static stopBgm(i) {
        void 0 === i && (i = 1e3);
        this.type == e.lizhi && (this.type = e.none);
        this.playing_bgm = '';
        t.AudioMgr.StopMusic(i);
        uiscript.UI_Config.Inst && uiscript.UI_Config.Inst.onBgmChange();
      }

      static onHandStop() {
        var t = [];

        this.type == e.lobby
            ? (t = this.bgm_lobby_list)
            : this.type == e.mj && (t = this.bgm_mj_list);

        if (
          (0 != t.length)
        ) {
          for (var i = 0; i < t.length; i++)
            if (t[i] != this.playing_bgm)
              return void this.PlayLobbyBgm(t[i], !0, 0);
          this.stopBgm(0);
        } else this.stopBgm(0);
      }

      static onBgmPlayOver() {
        this.type == e.lobby
          ? this.NextLobbyBgm()
          : this.type == e.mj && this.NextMJBgm();
      }

      static onBgmChange(t, i) {
        this.playing_bgm = t;
        i && (this.type = e.lizhi);
        uiscript.UI_Config.Inst && uiscript.UI_Config.Inst.onBgmChange();
      }

      static tryPlayBgm(i) {
        t.AudioMgr.PlayMusic(i, 1e3, !0);
        return this.type != e.lizhi &&
        (!t.AudioMgr.musicMuted && (!0));
      }

      static findIndexInLobby(t) {
        if (!t || '' == t) return -1;
        for (var e = this.bgm_lobby_list, i = 0; i < e.length; i++)
          if (e[i] == t) return i;
        return -1;
      }

      static PlayLobbyBgm(i, n, a) {
        void 0 === i && (i = '');
        void 0 === n && (n = !1);
        void 0 === a && (a = 1e3);
        if (
          (!n && '' != i && i == this.playing_bgm)
        )
          return !1;
        this.type = e.lobby;
        var r = this.findIndexInLobby(i);
        var s = this.bgm_lobby_list;
        if (-1 == r) {
          if (0 == s.length) return !1;
          var o = Math.random();
          r = Math.floor(o * s.length);
        }
        t.AudioMgr.PlayMusic(s[r], a, n);
      }

      static NextLobbyBgm() {
        var t = this.bgm_lobby_list;
        if (0 == t.length) return !1;
        var e = this.findIndexInLobby(this.playing_bgm);

        e =
          'list' == this.bgm_lobby_mode || e >= 0
            ? (e + 1) % t.length
            : this._RandNextIndex(e, t.length);

        return this.PlayLobbyBgm(t[e], !0, 0);
      }

      static findIndexInMJ(t) {
        for (var e = this.bgm_mj_list, i = 0; i < e.length; i++)
          if (e[i] == t) return i;
        return -1;
      }

      static PlayMJBgm(i, n, a) {
        void 0 === i && (i = '');
        void 0 === n && (n = !1);
        void 0 === a && (a = 1e3);
        if (
          (!n && '' != i && i == this.playing_bgm)
        )
          return !1;
        this.type = e.mj;
        var r = this.findIndexInMJ(i);
        var s = this.bgm_mj_list;
        if (-1 == r) {
          if (0 == s.length) return !1;
          r = Math.floor(Math.random() * s.length);
        }
        t.AudioMgr.PlayMusic(s[r], a, n);
      }

      static NextMJBgm() {
        var t = this.bgm_mj_list;
        if (0 == t.length) return !1;
        var e = this.findIndexInMJ(this.playing_bgm);

        e =
          'list' == this.bgm_mj_mode || e >= 0
            ? (e + 1) % t.length
            : this._RandNextIndex(e, t.length);

        return this.PlayMJBgm(t[e], !0, 0);
      }
    }

    Object.defineProperty(i, 'bgm_lobby_list', {
      get() {
        var t = this;
        var e = [];

        cfg.audio.bgm.forEach(({type, unlock_item, path}) => {
          if (
            'lobby' == type &&
            (!unlock_item ||
              0 != uiscript.UI_Bag.get_item_count(unlock_item))
          ) {
            for (var n = 0; n < t.baned_bgm_lobby_list.length; n++)
              if (t.baned_bgm_lobby_list[n] == path) return;
            e.push(path);
          }
        });

        return e;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(i, 'bgm_mj_list', {
      get() {
        var t = this;
        var e = [];

        cfg.audio.bgm.forEach(({type, unlock_item, path}) => {
          if (
            'mj' == type &&
            (!unlock_item ||
              0 != uiscript.UI_Bag.get_item_count(unlock_item))
          ) {
            for (var n = 0; n < t.baned_bgm_mj_list.length; n++)
              if (t.baned_bgm_mj_list[n] == path) return;
            e.push(path);
          }
        });

        return e;
      },
      enumerable: !0,
      configurable: !0
    });

    i._RandNextIndex = (t, e) => {
      if (0 == e) return -1;
      if (1 == e) return 0;
      for (var i = 0; i < 3; i++) {
        var n = Math.floor(Math.random() * e);
        if (n != t) return n;
      }
      return Math.floor(e);
    };

    i.baned_bgm_lobby_list = [];
    i.bgm_lobby_mode = 'list';
    i.baned_bgm_mj_list = [];
    i.bgm_mj_mode = 'list';
    i.playing_bgm = '';
    i.type = e.none;
    return i;
  })();
  t.BgmListMgr = i;
})(view || (view = {}));