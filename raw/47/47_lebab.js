let game;
!(t => {
  !(t => {
    (t[(t.none = 0)] = 'none'), (t[(t.room_invite = 1)] = 'room_invite');
  })(t.EFriendMsgType || (t.EFriendMsgType = {}));
  const e = (() => {
    function t() {}
    return (t.init = function() {
      const t = this;
      (this._friend_list = []),
        app.NetAgent.sendReq2Lobby('Lobby', 'fetchFriendList', {}, (e, i) => {
          if (e) app.Log.log(`获取好友列表时发生错误:${e}`);
          else if (i.error)
            app.Log.log(`获取好友列表时发生错误，错误码：${i.error.code}`);
          else {
            if ((app.Log.log(JSON.stringify(i)), i.friends))
              for (let n = 0; n < i.friends.length; n++) {
                const a = i.friends[n];
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
          (e, i) => {
            if (e || i.error) app.Log.log('获取好友申请列表发生错误');
            else if ((app.Log.log(JSON.stringify(i)), i.applies))
              for (let n = 0; n < i.applies.length; n++)
                t._friendapply_list.push(i.applies[n]);
          }
        ),
        app.NetAgent.AddListener2Lobby(
          'NotifyFriendViewChange',
          Laya.Handler.create(this, this._onFriendViewChange, null, false)
        ),
        app.NetAgent.AddListener2Lobby(
          'NotifyFriendStateChange',
          Laya.Handler.create(this, this._onFriendStateChange, null, false)
        ),
        app.NetAgent.AddListener2Lobby(
          'NotifyFriendChange',
          Laya.Handler.create(this, this._onFriendChange, null, false)
        ),
        app.NetAgent.AddListener2Lobby(
          'NotifyNewFriendApply',
          Laya.Handler.create(this, this._onFriendApplyChange, null, false)
        );
    }),
    Object.defineProperty(t, 'friend_list', {
      get() {
        return this._friend_list;
      },
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t, 'friendapply_list', {
      get() {
        return this._friendapply_list;
      },
      enumerable: true,
      configurable: true
    }),
    (t.find = function(t) {
      for (let e = 0; e < this._friend_list.length; e++)
        if (this._friend_list[e].base.account_id == t)
          return this._friend_list[e];
      return null;
    }),
    (t._onFriendStateChange = function(t) {
      app.Log.log(JSON.stringify(t));
      const e = this.find(t.target_id);
      null != e
        ? (t = t.active_state) &&
          (null != t.login_time &&
            undefined != t.login_time &&
            (e.state.login_time = t.login_time),
          null != t.logout_time &&
            undefined != t.logout_time &&
            (e.state.logout_time = t.logout_time),
          (e.state.playing = t.playing),
          null != t.is_online &&
            undefined != t.is_online &&
            (e.state.is_online = t.is_online),
          this.triggerMsg({
            type: 'singlechange',
            account_id: e.base.account_id
          }))
        : app.Log.Error(`收到并非好友的人的信息:${JSON.stringify(t)}`);
    }),
    (t._onFriendViewChange = function(t) {
      const e = this.find(t.target_id);
      null != e
        ? (null != t.base.avatar_id &&
            undefined != t.base.avatar_id &&
            (e.base.avatar_id = t.base.avatar_id),
          null != t.base.title &&
            undefined != t.base.title &&
            (e.base.title = t.base.title),
          null != t.base.nickname &&
            undefined != t.base.nickname &&
            (e.base.nickname = t.base.nickname),
          null != t.base.level &&
            undefined != t.base.level &&
            (e.base.level = t.base.level),
          this.triggerMsg({
            type: 'singlechange',
            account_id: e.base.account_id
          }))
        : app.Log.Error(`收到并非好友的人的信息:${JSON.stringify(t)}`);
    }),
    (t.addListener = function(t) {
      this.removeListener(t), this._listener.push(t);
    }),
    (t.removeListener = function(t) {
      for (let e = 0; e < this._listener.length; e++)
        if (this._listener[e] === t) {
          (this._listener[e] = this._listener[this._listener.length - 1]),
            this._listener.pop();
          break;
        }
    }),
    (t.triggerMsg = function(t) {
      for (let e = 0; e < this._listener.length; e++)
        this._listener[e] && this._listener[e].runWith(t);
    }),
    (t.removeFriend = function(t) {
      for (let e = 0; e < this._friend_list.length; e++)
        if (this._friend_list[e].base.account_id == t) {
          for (let i = e; i < this._friend_list.length - 1; i++)
            this._friend_list[i] = this._friend_list[i + 1];
          this._friend_list.pop();
          break;
        }
    }),
    (t._onFriendChange = function({account_id, type, friend}) {
      const e = account_id;
      1 == type
        ? this.find(e) || this.friend_list.push(friend)
        : 2 == type && this.removeFriend(e),
        this.triggerMsg({ type: 'listchange' });
    }),
    (t._onFriendApplyChange = function({account_id, apply_time, removed_id}) {
      for (e = 0; e < this._friendapply_list.length; e++)
        if (this._friendapply_list[e].account_id == account_id)
          return void (this._friendapply_list[e].apply_time = apply_time);
      if (
        (this._friendapply_list.push({
          account_id: account_id,
          apply_time: apply_time
        }),
        removed_id)
      )
        for (var e = 0; e < this._friendapply_list.length; e++)
          if (this._friendapply_list[e].account_id == removed_id) {
            for (let i = 0; i < this._friendapply_list.length - 1; i++)
              this._friendapply_list[i] = this._friendapply_list[i + 1];
            this._friendapply_list.pop();
            break;
          }
    }),
    (t.delFriendApply = function(t) {
      for (let e = 0; e < this._friendapply_list.length; e++)
        if (this._friendapply_list[e].account_id == t) {
          for (let i = e; i < this._friendapply_list.length - 1; i++)
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
  ;
  })();
  t.FriendMgr = e;
})(game || (game = {}));