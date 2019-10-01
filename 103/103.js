var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var uiscript;
!(t => {
  var e = (e => {
    class i {
      constructor() {
        var t = e.call(this, new ui.lobby.activitys.guoqing_popoutUI()) || this;
        t.reward_state = 0;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;
        this.root = this.me.getChildByName('root');
        this.title = this.root.getChildByName('title');
        this.container_items = this.root.getChildByName('container_items');
        this.btn_get = this.root.getChildByName('btn_get');

        this.btn_get.clickHandler = new Laya.Handler(this, () => {
            if (!e.locking && 1 == e.reward_state) {
              e.hide();
              var i = e.task_id;
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'completeActivityFlipTask',
                { task_id: i },
                (e, n) => {
                  if (e || n.error)
                    t.UIMgr.Inst.showNetReqError(
                      'completeActivityFlipTask',
                      e,
                      n
                    );
                  else {
                    for (
                      var a = cfg.activity.flip_task.get(i).reward.split(','),
                        r = [],
                        s = 0;
                      s < a.length;
                      s++
                    ) {
                      var o = a[s].split('-');
                      r.push({ id: parseInt(o[0]), count: parseInt(o[1]) });
                    }
                    game.Tools.showRewards({ rewards: r }, null);
                    t.UI_Activity_Fanpai.onRewardGet(i);
                  }
                }
              );
            }
          });

        this.btn_confirm = this.root.getChildByName('btn_confirm');

        this.btn_confirm.clickHandler = new Laya.Handler(this, () => {
            e.locking || e.hide();
          });

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, () => {
            e.locking || e.hide();
          });

        this.contianer_tasks = this.root.getChildByName('container_task');
        this.label_info = this.root.getChildByName('info');
      }

      show(e, i, n) {
        var a = this;
        void 0 === n && (n = 0);
        this.locking = !0;
        this.enable = !0;

        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            a.locking = !1;
          })
        );

        this.task_id = e;
        this.reward_state = i;
        var r = cfg.activity.flip_task.get(e);
        if (5 == r.matrix_x || 5 == r.matrix_y) {
          this.contianer_tasks.visible = !1;
          this.label_info.visible = !0;
          var s = 0;
          5 == r.matrix_x && (s += 1);
          5 == r.matrix_y && (s += 2);
          this.label_info.text = game.Tools.strOfLocalization(2851 + s);
          this.container_items.y = 210;
          this.title.text = game.Tools.strOfLocalization(2847);
        } else {
          this.contianer_tasks.visible = !0;
          this.label_info.visible = !1;
          this.container_items.y = 230;
          var o = cfg.events.base_task.get(r.base_task_id);

          this.contianer_tasks.getChildByName('task').text =
            o[`desc_${GameMgr.client_language}`];

          n > o.target && (n = o.target);

          this.contianer_tasks.getChildByName('progress').text =
              `${n.toString()}/${o.target.toString()}`;

          this.contianer_tasks
              .getChildByName('bar')
              .getChildByName('val').scaleX = n / o.target;

          this.title.text = game.Tools.strOfLocalization(2846);
        }
        this.btn_confirm.visible = 1 != i;
        this.btn_get.visible = 1 == i;
        for (
          var l = r.reward.split(','),
            h = [],
            c = e => {
              var i = u.container_items.getChildAt(e);
              if (e < l.length) {
                var n = l[e].split('-'),
                  a = parseInt(n[0]),
                  r = parseInt(n[1]),
                  s = i.getChildByName('count');
                s.text = r.toString();
                s.visible = r > 1;
                var o = i.getChildByName('btn');

                o.clickHandler = Laya.Handler.create(
                  u,
                  () => {
                    t.UI_ItemDetail.Inst.show(a);
                  },
                  null,
                  !1
                );

                o.getChildByName('getted').visible = 2 == u.reward_state;
                var c = game.GameUtility.get_item_view(a);
                game.LoadMgr.setImgSkin(o.getChildByName('icon'), c.icon);
                i.visible = !0;
                i.y = 76;
                h.push(30);
              } else i.visible = !1;
            },
            u = this,
            _ = 0;
          _ < this.container_items.numChildren;
          _++
        )
          c(_);
        game.Tools.child_align_center(this.container_items, h);
      }

      hide() {
        var e = this;
        this.locking = !0;
        t.UIBase.anim_pop_hide(
          this.root,
          Laya.Handler.create(this, () => {
            e.locking = !1;
            e.enable = !1;
          })
        );
      }
    }

    __extends(i, e);

    return i;
  })(t.UIBase);
  t.UI_Activity_Guoping_Pop = e;
})(uiscript || (uiscript = {}));