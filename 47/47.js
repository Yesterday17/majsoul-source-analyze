var game;
!(t => {
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.room_invite = 1)] = 'room_invite';
  })(t.EFriendMsgType || (t.EFriendMsgType = {}));
  var e = (() => {
    class t {
      static init() {
        var t = this;
        this._friend_list = [];

        app.NetAgent.sendReq2Lobby('Lobby', 'fetchFriendList', {}, (e, i) => {
          if (e) app.Log.log(`获取好友列表时发生错误:${e}`);
          else if (i.error)
            app.Log.log(`获取好友列表时发生错误，错误码：${i.error.code}`);
          else {
            app.Log.log(JSON.stringify(i));
            if ((i.friends))
              for (var n = 0; n < i.friends.length; n++) {
                var a = i.friends[n];
                t._friend_list.push(a);
              }
            t.friend_max_count = i.friend_max_count;
          }
        });

        this._friendapply_list = [];

        app.NetAgent.sendReq2Lobby(
          'Lobby',
          'fetchFriendApplyList',
          {},
          (e, i) => {
            app.Log.log(JSON.stringify(i));
            if (e || i.error) app.Log.log('获取好友申请列表发生错误');
            else if ((i.applies))
              for (var n = 0; n < i.applies.length; n++)
                t._friendapply_list.push(i.applies[n]);
          }
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyFriendViewChange',
          Laya.Handler.create(this, this._onFriendViewChange, null, !1)
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyFriendStateChange',
          Laya.Handler.create(this, this._onFriendStateChange, null, !1)
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyFriendChange',
          Laya.Handler.create(this, this._onFriendChange, null, !1)
        );

        app.NetAgent.AddListener2Lobby(
          'NotifyNewFriendApply',
          Laya.Handler.create(this, this._onFriendApplyChange, null, !1)
        );
      }

      static find(t) {
        for (var e = 0; e < this._friend_list.length; e++)
          if (this._friend_list[e].base.account_id == t)
            return this._friend_list[e];
        return null;
      }

      static _onFriendStateChange(t) {
        app.Log.log(JSON.stringify(t));
        var e = this.find(t.target_id);

        null != t.login_time &&
              void 0 != t.login_time &&
              (e.state.login_time = t.login_time);

        null != t.logout_time &&
          void 0 != t.logout_time &&
          (e.state.logout_time = t.logout_time);

        e.state.playing = t.playing;

        null != t.is_online &&
          void 0 != t.is_online &&
          (e.state.is_online = t.is_online);

        null != e
          ? (t = t.active_state) &&
            (this.triggerMsg({
          type: 'singlechange',
          account_id: e.base.account_id
        }))
          : app.Log.Error(`收到并非好友的人的信息:${JSON.stringify(t)}`);
      }

      static _onFriendViewChange(t) {
        var e = this.find(t.target_id);

        null != t.base.avatar_id &&
              void 0 != t.base.avatar_id &&
              (e.base.avatar_id = t.base.avatar_id);

        null != t.base.title &&
          void 0 != t.base.title &&
          (e.base.title = t.base.title);

        null != t.base.nickname &&
          void 0 != t.base.nickname &&
          (e.base.nickname = t.base.nickname);

        null != t.base.level &&
          void 0 != t.base.level &&
          (e.base.level = t.base.level);

        null != e
          ? (this.triggerMsg({
          type: 'singlechange',
          account_id: e.base.account_id
        }))
          : app.Log.Error(`收到并非好友的人的信息:${JSON.stringify(t)}`);
      }

      static addListener(t) {
        this.removeListener(t);
        this._listener.push(t);
      }

      static removeListener(t) {
        for (var e = 0; e < this._listener.length; e++)
          if (this._listener[e] === t) {
            this._listener[e] = this._listener[this._listener.length - 1];
            this._listener.pop();
            break;
          }
      }

      static triggerMsg(t) {
        for (var e = 0; e < this._listener.length; e++)
          this._listener[e] && this._listener[e].runWith(t);
      }

      static removeFriend(t) {
        for (var e = 0; e < this._friend_list.length; e++)
          if (this._friend_list[e].base.account_id == t) {
            for (var i = e; i < this._friend_list.length - 1; i++)
              this._friend_list[i] = this._friend_list[i + 1];
            this._friend_list.pop();
            break;
          }
      }

      static _onFriendChange({account_id, type, friend}) {
        var e = account_id;

        1 == type
          ? this.find(e) || this.friend_list.push(friend)
          : 2 == type && this.removeFriend(e);

        this.triggerMsg({ type: 'listchange' });
      }

      static _onFriendApplyChange({account_id, apply_time, removed_id}) {
        for (e = 0; e < this._friendapply_list.length; e++)
          if (this._friendapply_list[e].account_id == account_id)
            return void (this._friendapply_list[e].apply_time = apply_time);

        this._friendapply_list.push({
            account_id: account_id,
            apply_time: apply_time
          });

        if (
          (removed_id)
        )
          for (var e = 0; e < this._friendapply_list.length; e++)
            if (this._friendapply_list[e].account_id == removed_id) {
              for (var i = 0; i < this._friendapply_list.length - 1; i++)
                this._friendapply_list[i] = this._friendapply_list[i + 1];
              this._friendapply_list.pop();
              break;
            }
      }

      static delFriendApply(t) {
        for (var e = 0; e < this._friendapply_list.length; e++)
          if (this._friendapply_list[e].account_id == t) {
            for (var i = e; i < this._friendapply_list.length - 1; i++)
              this._friendapply_list[i] = this._friendapply_list[i + 1];
            this._friendapply_list.pop();
            break;
          }
      }
    }

    Object.defineProperty(t, 'friend_list', {
      get() {
        return this._friend_list;
      },
      enumerable: !0,
      configurable: !0
    });

    Object.defineProperty(t, 'friendapply_list', {
      get() {
        return this._friendapply_list;
      },
      enumerable: !0,
      configurable: !0
    });

    t._friend_list = [];
    t._listener = [];
    t._friendapply_list = [];
    t.friend_max_count = 0;
    return t;
  })();
  t.FriendMgr = e;
})(game || (game = {}));