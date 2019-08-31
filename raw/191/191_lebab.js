const __extends =
    this && this.__extends || (() => {
      let t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (const i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })();

let uiscript;
!(t => {
  const e = (e => {
    function i() {
      const t = e.call(this, new ui.lobby.pipeichenggongUI()) || this;
      return (
        (t.blackbg = null),
        (t.root = null),
        (t.shine = null),
        (t.img_duanwei = null),
        (t.img_mode = null),
        (t.label_time = null),
        (i.Inst = t),
        t
      );
    }
    return __extends(i, e),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.blackbg = this.me.getChildByName('blackbg')),
        (this.root = this.me.getChildByName('root')),
        (this.shine = this.root.getChildByName('shine')),
        (this.img_duanwei = this.root.getChildByName('duanwei')),
        (this.img_mode = this.root.getChildByName('mode')),
        (this.label_time = this.root.getChildByName('time')),
        app.NetAgent.AddListener2Lobby(
          'NotifyMatchGameStart',
          Laya.Handler.create(this, e => {
            app.Log.log(`NotifyMatchGameStart:${JSON.stringify(e)}`),
              t.show(e);
          })
        );
    }),
    (i.prototype.show = function(e) {
      const i = this;
      (this.enable = !0),
        view.AudioMgr.PlayAudio(115, 1, 1.4),
        t.UIMgr.Inst.closeUIWithTag_Lobby(),
        Laya.timer.once(3e3, this, () => {
          t.UIMgr.Inst.closeUIWithTag_Lobby();
        }),
        (this.blackbg.alpha = 0),
        Laya.Tween.to(this.blackbg, { alpha: 0.7 }, 150, null),
        (this.shine.alpha = 0),
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            Laya.Tween.to(i.shine, { alpha: 0.5 }, 500);
          })
        );
      const n = e.match_mode_id;
      const a = cfg.desktop.matchmode.get(n);
      if (a) {
        switch (a.room) {
          case 1:
            this.img_duanwei.skin = game.Tools.localUISrc(
              'myres/lobby/w_tongzhijian.png'
            );
            break;
          case 2:
            this.img_duanwei.skin = game.Tools.localUISrc(
              'myres/lobby/w_yinzhijian.png'
            );
            break;
          case 3:
            this.img_duanwei.skin = game.Tools.localUISrc(
              'myres/lobby/w_jinzhijian.png'
            );
            break;
          case 4:
            this.img_duanwei.skin = game.Tools.localUISrc(
              'myres/lobby/w_yuzhijian.png'
            );
            break;
          case 5:
            this.img_duanwei.skin = game.Tools.localUISrc(
              'myres/lobby/w_luandou.png'
            );
            break;
          case 6:
            this.img_duanwei.skin = game.Tools.localUISrc(
              'myres/lobby/w_wangzuo.png'
            );
            break;
          default:
            this.img_duanwei.skin = '';
        }
        switch (a.mode) {
          case 1:
            this.img_mode.skin = game.Tools.localUISrc(
              'myres/lobby/w_sirendong.png'
            );
            break;
          case 2:
            this.img_mode.skin = game.Tools.localUISrc(
              'myres/lobby/w_sirennan.png'
            );
            break;
          case 11:
            this.img_mode.skin = game.Tools.localUISrc(
              'myres/lobby/w_sanrendong.png'
            );
            break;
          case 12:
            this.img_mode.skin = game.Tools.localUISrc(
              'myres/lobby/w_sanrennan.png'
            );
            break;
          default:
            this.img_mode.skin = '';
        }
        if (a.level_limit > GameMgr.Inst.account_data.level.id) {
          const r = {};
          (r.type = '匹配成功显示问题'),
            (r.account_data = GameMgr.Inst.account_data),
            (r.msg = e),
            GameMgr.Inst.postInfo2Server(r);
        }
      } else (this.img_duanwei.skin = ''), (this.img_mode.skin = '');
      (this.label_time.text = `${game.Tools.strOfLocalization(2153)}(3)`),
        Laya.timer.once(1300, this, () => {
          i.label_time.text = `${game.Tools.strOfLocalization(2153)}(2)`;
        }),
        Laya.timer.once(2300, this, () => {
          i.label_time.text = `${game.Tools.strOfLocalization(2153)}(1)`;
        }),
        Laya.timer.once(3300, this, () => {
          i.label_time.text = 'Go!!!';
        }),
        Laya.timer.once(4e3, this, () => {
          (i.enable = !1),
            t.UI_PiPeiYuYue.Inst.onPiPeiOver(),
            game.MJNetMgr.Inst.OpenConnect(
              e.connect_token,
              e.game_uuid,
              e.location,
              !1,
              null
            );
        });
    }),
    i
  ;
  })(t.UIBase);
  t.UI_PiPeiChengGong = e;
})(uiscript || (uiscript = {}));