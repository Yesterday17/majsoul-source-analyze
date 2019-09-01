let uiscript;
!(t => {
  let e;
  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.channel = 1)] = 'channel'),
      (t[(t.person = 2)] = 'person');
  })(e || (e = {}));
  const i = (t => {
    function i() {
      const n = t.call(this, new ui.lobby.lobbychatUI()) || this;
      return (
        (n.render_text = null),
        (n.btn_switch = null),
        (n.container_main = null),
        (n.left_heads = null),
        (n.chattype = e.none),
        (n.chat_account_id = 0),
        (i.Inst = n),
        n
      );
    }
    return __extends(i, t),
    (i.prototype.onCreate = () => {}),
    (i.prototype.onShow = () => {}),
    (i.prototype.onHide = () => {}),
    (i.prototype.onReceivePersonMsg = t => {}),
    (i.prototype.onReceiveWorldMsg = () => {}),
    (i.prototype.firstRefresh = () => {}),
    (i.Inst = null),
    i
  ;
  })(t.UIBase);
  t.UI_LobbyChat = i;
})(uiscript || (uiscript = {}));