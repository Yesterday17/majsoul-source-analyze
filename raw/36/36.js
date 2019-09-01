var view;
!(function(t) {
  var e;
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.lobby = 1)] = 'lobby'),
      (t[(t.mj = 2)] = 'mj'),
      (t[(t.lizhi = 3)] = 'lizhi');
  })((e = t.E_Bgm_Type || (t.E_Bgm_Type = {})));
  var i = (function() {
    function i() {}
    return (
      Object.defineProperty(i, 'bgm_lobby_list', {
        get: function() {
          var t = this,
            e = [];
          return (
            cfg.audio.bgm.forEach(function(i) {
              if (
                'lobby' == i.type &&
                (!i.unlock_item ||
                  0 != uiscript.UI_Bag.get_item_count(i.unlock_item))
              ) {
                for (var n = 0; n < t.baned_bgm_lobby_list.length; n++)
                  if (t.baned_bgm_lobby_list[n] == i.path) return;
                e.push(i.path);
              }
            }),
            e
          );
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(i, 'bgm_mj_list', {
        get: function() {
          var t = this,
            e = [];
          return (
            cfg.audio.bgm.forEach(function(i) {
              if (
                'mj' == i.type &&
                (!i.unlock_item ||
                  0 != uiscript.UI_Bag.get_item_count(i.unlock_item))
              ) {
                for (var n = 0; n < t.baned_bgm_mj_list.length; n++)
                  if (t.baned_bgm_mj_list[n] == i.path) return;
                e.push(i.path);
              }
            }),
            e
          );
        },
        enumerable: true,
        configurable: true
      }),
      (i.init = function() {
        var t = Laya.LocalStorage.getItem(
          game.Tools.eeesss('baned_bgm_lobby_list' + GameMgr.Inst.account_id)
        );
        (this.baned_bgm_lobby_list = []),
          t && '' != t && (this.baned_bgm_lobby_list = t.split(',')),
          (this.bgm_lobby_mode = Laya.LocalStorage.getItem(
            game.Tools.eeesss('bgm_lobby_mode' + GameMgr.Inst.account_id)
          )),
          (this.bgm_lobby_mode && '' != this.bgm_lobby_mode) ||
            (this.bgm_lobby_mode = 'list');
        var i = Laya.LocalStorage.getItem(
          game.Tools.eeesss('baned_bgm_mj_list' + GameMgr.Inst.account_id)
        );
        (this.baned_bgm_mj_list = []),
          i && '' != i && (this.baned_bgm_mj_list = i.split(',')),
          (this.bgm_mj_mode = Laya.LocalStorage.getItem(
            game.Tools.eeesss('bgm_mj_mode' + GameMgr.Inst.account_id)
          )),
          (this.bgm_mj_mode && '' != this.bgm_mj_mode) ||
            (this.bgm_mj_mode = 'list'),
          (this.type = e.none),
          (this.playing_bgm = '');
      }),
      (i.saveConfig = function() {
        for (var t = '', e = 0; e < this.baned_bgm_lobby_list.length; e++)
          0 != e && (t += ','), (t += this.baned_bgm_lobby_list[e]);
        Laya.LocalStorage.setItem(
          game.Tools.eeesss('baned_bgm_lobby_list' + GameMgr.Inst.account_id),
          t
        );
        for (var i = '', e = 0; e < this.baned_bgm_mj_list.length; e++)
          0 != e && (i += ','), (i += this.baned_bgm_mj_list[e]);
        Laya.LocalStorage.setItem(
          game.Tools.eeesss('baned_bgm_mj_list' + GameMgr.Inst.account_id),
          i
        );
      }),
      (i.stopBgm = function(i) {
        undefined === i && (i = 1e3),
          this.type == e.lizhi && (this.type = e.none),
          (this.playing_bgm = ''),
          t.AudioMgr.StopMusic(i),
          uiscript.UI_Config.Inst && uiscript.UI_Config.Inst.onBgmChange();
      }),
      (i.onHandStop = function() {
        var t = [];
        if (
          (this.type == e.lobby
            ? (t = this.bgm_lobby_list)
            : this.type == e.mj && (t = this.bgm_mj_list),
          0 != t.length)
        ) {
          for (var i = 0; i < t.length; i++)
            if (t[i] != this.playing_bgm)
              return void this.PlayLobbyBgm(t[i], true, 0);
          this.stopBgm(0);
        } else this.stopBgm(0);
      }),
      (i.onBgmPlayOver = function() {
        this.type == e.lobby
          ? this.NextLobbyBgm()
          : this.type == e.mj && this.NextMJBgm();
      }),
      (i.onBgmChange = function(t, i) {
        (this.playing_bgm = t),
          i && (this.type = e.lizhi),
          uiscript.UI_Config.Inst && uiscript.UI_Config.Inst.onBgmChange();
      }),
      (i.tryPlayBgm = function(i) {
        return (
          this.type != e.lizhi &&
          (!t.AudioMgr.musicMuted && (t.AudioMgr.PlayMusic(i, 1e3, true), true))
        );
      }),
      (i._RandNextIndex = function(t, e) {
        if (0 == e) return -1;
        if (1 == e) return 0;
        for (var i = 0; i < 3; i++) {
          var n = Math.floor(Math.random() * e);
          if (n != t) return n;
        }
        return Math.floor(e);
      }),
      (i.findIndexInLobby = function(t) {
        if (!t || '' == t) return -1;
        for (var e = this.bgm_lobby_list, i = 0; i < e.length; i++)
          if (e[i] == t) return i;
        return -1;
      }),
      (i.PlayLobbyBgm = function(i, n, a) {
        if (
          (undefined === i && (i = ''),
          undefined === n && (n = false),
          undefined === a && (a = 1e3),
          !n && '' != i && i == this.playing_bgm)
        )
          return false;
        this.type = e.lobby;
        var r = this.findIndexInLobby(i),
          s = this.bgm_lobby_list;
        if (-1 == r) {
          if (0 == s.length) return false;
          var o = Math.random();
          r = Math.floor(o * s.length);
        }
        t.AudioMgr.PlayMusic(s[r], a, n);
      }),
      (i.NextLobbyBgm = function() {
        var t = this.bgm_lobby_list;
        if (0 == t.length) return false;
        var e = this.findIndexInLobby(this.playing_bgm);
        return (
          (e =
            'list' == this.bgm_lobby_mode || e >= 0
              ? (e + 1) % t.length
              : this._RandNextIndex(e, t.length)),
          this.PlayLobbyBgm(t[e], true, 0)
        );
      }),
      (i.findIndexInMJ = function(t) {
        for (var e = this.bgm_mj_list, i = 0; i < e.length; i++)
          if (e[i] == t) return i;
        return -1;
      }),
      (i.PlayMJBgm = function(i, n, a) {
        if (
          (undefined === i && (i = ''),
          undefined === n && (n = false),
          undefined === a && (a = 1e3),
          !n && '' != i && i == this.playing_bgm)
        )
          return false;
        this.type = e.mj;
        var r = this.findIndexInMJ(i),
          s = this.bgm_mj_list;
        if (-1 == r) {
          if (0 == s.length) return false;
          r = Math.floor(Math.random() * s.length);
        }
        t.AudioMgr.PlayMusic(s[r], a, n);
      }),
      (i.NextMJBgm = function() {
        var t = this.bgm_mj_list;
        if (0 == t.length) return false;
        var e = this.findIndexInMJ(this.playing_bgm);
        return (
          (e =
            'list' == this.bgm_mj_mode || e >= 0
              ? (e + 1) % t.length
              : this._RandNextIndex(e, t.length)),
          this.PlayMJBgm(t[e], true, 0)
        );
      }),
      (i.baned_bgm_lobby_list = []),
      (i.bgm_lobby_mode = 'list'),
      (i.baned_bgm_mj_list = []),
      (i.bgm_mj_mode = 'list'),
      (i.playing_bgm = ''),
      (i.type = e.none),
      i
    );
  })();
  t.BgmListMgr = i;
})(view || (view = {}));