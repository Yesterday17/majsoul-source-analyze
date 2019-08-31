var game;
!(function(t) {
  !(function(t) {
    (t[(t.none = 0)] = 'none'), (t[(t.room_invite = 1)] = 'room_invite');
  })(t.EFriendMsgType || (t.EFriendMsgType = {}));
  var e = (function() {
    function t() {}
    return (
      (t.init = function() {
        var t = this;
        (this._friend_list = []),
          app.NetAgent.sendReq2Lobby('Lobby', 'fetchFriendList', {}, function(
            e,
            i
          ) {
            if (e) app.Log.log('获取好友列表时发生错误:' + e);
            else if (i.error)
              app.Log.log('获取好友列表时发生错误，错误码：' + i.error.code);
            else {
              if ((app.Log.log(JSON.stringify(i)), i.friends))
                for (var n = 0; n < i.friends.length; n++) {
                  var a = i.friends[n];
                  t._friend_list.push(a);
                }
              t.friend_max_count = i.friend_max_count;
            }
          }),
          (this._friendapply_list = []),
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'fetchFriendApplyList',
            {},
            function(e, i) {
              if (e || i.error) app.Log.log('获取好友申请列表发生错误');
              else if ((app.Log.log(JSON.stringify(i)), i.applies))
                for (var n = 0; n < i.applies.length; n++)
                  t._friendapply_list.push(i.applies[n]);
            }
          ),
          app.NetAgent.AddListener2Lobby(
            'NotifyFriendViewChange',
            Laya.Handler.create(this, this._onFriendViewChange, null, !1)
          ),
          app.NetAgent.AddListener2Lobby(
            'NotifyFriendStateChange',
            Laya.Handler.create(this, this._onFriendStateChange, null, !1)
          ),
          app.NetAgent.AddListener2Lobby(
            'NotifyFriendChange',
            Laya.Handler.create(this, this._onFriendChange, null, !1)
          ),
          app.NetAgent.AddListener2Lobby(
            'NotifyNewFriendApply',
            Laya.Handler.create(this, this._onFriendApplyChange, null, !1)
          );
      }),
      Object.defineProperty(t, 'friend_list', {
        get: function() {
          return this._friend_list;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(t, 'friendapply_list', {
        get: function() {
          return this._friendapply_list;
        },
        enumerable: !0,
        configurable: !0
      }),
      (t.find = function(t) {
        for (var e = 0; e < this._friend_list.length; e++)
          if (this._friend_list[e].base.account_id == t)
            return this._friend_list[e];
        return null;
      }),
      (t._onFriendStateChange = function(t) {
        app.Log.log(JSON.stringify(t));
        var e = this.find(t.target_id);
        null != e
          ? (t = t.active_state) &&
            (null != t.login_time &&
              void 0 != t.login_time &&
              (e.state.login_time = t.login_time),
            null != t.logout_time &&
              void 0 != t.logout_time &&
              (e.state.logout_time = t.logout_time),
            (e.state.playing = t.playing),
            null != t.is_online &&
              void 0 != t.is_online &&
              (e.state.is_online = t.is_online),
            this.triggerMsg({
              type: 'singlechange',
              account_id: e.base.account_id
            }))
          : app.Log.Error('收到并非好友的人的信息:' + JSON.stringify(t));
      }),
      (t._onFriendViewChange = function(t) {
        var e = this.find(t.target_id);
        null != e
          ? (null != t.base.avatar_id &&
              void 0 != t.base.avatar_id &&
              (e.base.avatar_id = t.base.avatar_id),
            null != t.base.title &&
              void 0 != t.base.title &&
              (e.base.title = t.base.title),
            null != t.base.nickname &&
              void 0 != t.base.nickname &&
              (e.base.nickname = t.base.nickname),
            null != t.base.level &&
              void 0 != t.base.level &&
              (e.base.level = t.base.level),
            this.triggerMsg({
              type: 'singlechange',
              account_id: e.base.account_id
            }))
          : app.Log.Error('收到并非好友的人的信息:' + JSON.stringify(t));
      }),
      (t.addListener = function(t) {
        this.removeListener(t), this._listener.push(t);
      }),
      (t.removeListener = function(t) {
        for (var e = 0; e < this._listener.length; e++)
          if (this._listener[e] === t) {
            (this._listener[e] = this._listener[this._listener.length - 1]),
              this._listener.pop();
            break;
          }
      }),
      (t.triggerMsg = function(t) {
        for (var e = 0; e < this._listener.length; e++)
          this._listener[e] && this._listener[e].runWith(t);
      }),
      (t.removeFriend = function(t) {
        for (var e = 0; e < this._friend_list.length; e++)
          if (this._friend_list[e].base.account_id == t) {
            for (var i = e; i < this._friend_list.length - 1; i++)
              this._friend_list[i] = this._friend_list[i + 1];
            this._friend_list.pop();
            break;
          }
      }),
      (t._onFriendChange = function(t) {
        var e = t.account_id;
        1 == t.type
          ? this.find(e) || this.friend_list.push(t.friend)
          : 2 == t.type && this.removeFriend(e),
          this.triggerMsg({ type: 'listchange' });
      }),
      (t._onFriendApplyChange = function(t) {
        for (e = 0; e < this._friendapply_list.length; e++)
          if (this._friendapply_list[e].account_id == t.account_id)
            return void (this._friendapply_list[e].apply_time = t.apply_time);
        if (
          (this._friendapply_list.push({
            account_id: t.account_id,
            apply_time: t.apply_time
          }),
          t.removed_id)
        )
          for (var e = 0; e < this._friendapply_list.length; e++)
            if (this._friendapply_list[e].account_id == t.removed_id) {
              for (var i = 0; i < this._friendapply_list.length - 1; i++)
                this._friendapply_list[i] = this._friendapply_list[i + 1];
              this._friendapply_list.pop();
              break;
            }
      }),
      (t.delFriendApply = function(t) {
        for (var e = 0; e < this._friendapply_list.length; e++)
          if (this._friendapply_list[e].account_id == t) {
            for (var i = e; i < this._friendapply_list.length - 1; i++)
              this._friendapply_list[i] = this._friendapply_list[i + 1];
            this._friendapply_list.pop();
            break;
          }
      }),
      (t._friend_list = []),
      (t._listener = []),
      (t._friendapply_list = []),
      (t.friend_max_count = 0),
      t
    );
  })();
  t.FriendMgr = e;
})(game || (game = {}));