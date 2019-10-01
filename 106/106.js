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
  var e = (() => {
    class e {
      constructor(t) {
        this.id = 0;
        this.me = t;
        this.me.visible = !1;
        this.container_info = t.getChildByName('info');

        this.plane_task_name = this.container_info.getChildByName(
            'container_taskname'
          );

        this.task_name = this.plane_task_name.getChildByName('taskname');
        this.item_icon = this.container_info.getChildByName('item');
        this.item_name = this.container_info.getChildByName('item_name');
        this.item_count = this.container_info.getChildByName('item_count');

        this.progress_bar = this.container_info
            .getChildByName('bar')
            .getChildByName('val');

        this.progress_label = this.container_info.getChildByName(
            'progress'
          );

        this.btn_get = this.container_info.getChildByName('btn_get');
        this.flag_getted = this.container_info.getChildByName('alreadyget');
      }

      show({id, rewarded, achieved, counter}) {
        var i = this;
        this.me.visible = !0;
        var n = id;
        this.id = n;
        var a = cfg.activity.task.get(id),
          r = cfg.events.base_task.get(a.base_task_id);
        this.container_info.visible = !0;
        this.btn_get.visible = !1;
        this.flag_getted.visible = !1;
        this.btn_get.visible = !0;
        game.Tools.setGrayDisable(this.btn_get, !1);
        game.Tools.setGrayDisable(this.btn_get, !0);

        rewarded
          ? (this.flag_getted.visible = !0)
          : (achieved
          ? (this.btn_get.clickHandler = Laya.Handler.create(
              this,
              () => {
                game.Tools.setGrayDisable(i.btn_get, !0);
                app.NetAgent.sendReq2Lobby(
                  'Lobby',
                  'completeActivityTask',
                  { task_id: n },
                  (e, a) => {
                    game.Tools.setGrayDisable(i.btn_get, !1);
                    if (
                      (e || a.error)
                    )
                      t.UIMgr.Inst.showNetReqError(
                        'completeActivityTask',
                        e,
                        a
                      );
                    else {
                      if (i.id == n) {
                        i.btn_get.visible = !1;
                        i.flag_getted.visible = !0;
                        var r =
                          `${game.Tools.strOfLocalization(2234)}${i.item_name.text} ${i.item_count.text}`;
                        t.UI_LightTips.Inst.show(r);
                      }
                      t.UI_Activity.onTaskRewarded(n);
                    }
                  }
                );
              },
              null,
              !1
            ))
          : (this.btn_get.clickHandler = null));

        this.task_name.text = r[`desc_${GameMgr.client_language}`];
        this.task_name.width = this.task_name.textField.textWidth;
        this.task_name.x = 0;
        if (
          (this.task_name.width > this.plane_task_name.width)
        ) {
          var s =
              this.plane_task_name.width - this.plane_task_name.width + 200,
            o = Laya.timer.currTimer,
            l = s / 0.06;
          Laya.timer.clearAll(this);
          Laya.timer.frameLoop(1, this, () => {
            var t = Laya.timer.currTimer - o;
            (t -= Math.floor(t / (2e3 + l + 1e3)) * (2e3 + l + 1e3)) <= 2e3
              ? (i.task_name.x = 0)
              : t <= l + 2e3 && (i.task_name.x = -0.06 * (t - 2e3));
          });
        }
        this.item_count.text = `x${a.reward_count}`;
        var h = cfg.item_definition.currency.get(a.reward_id);
        game.LoadMgr.setImgSkin(this.item_icon, h.icon);
        h &&
          ((this.item_name.text = h[`name_${GameMgr.client_language}`]));
        var c = cfg.item_definition.item.get(a.reward_id);
        game.LoadMgr.setImgSkin(this.item_icon, c.icon);

        c &&
          ((this.item_name.text = c[`name_${GameMgr.client_language}`]));

        this.item_count.x =
            this.item_name.textField.textWidth + this.item_name.x + 50;
        var u = counter;
        u || (u = 0);
        u > r.target && (u = r.target);
        this.progress_bar.scaleX = u / r.target;
        this.progress_label.text =
            `${u.toString()}/${r.target.toString()}`;
      }

      stop_roll() {
        Laya.timer.clearAll(this);
      }
    }

    return e;
  })();

  var i = (t => {
    class i {
      constructor(e, i) {
        void 0 === i && (i = 'activity_taskUI');
        return t.call(this, e, new ui.lobby.activitys[i]()) || this;
      }

      setHead(t, e, i) {
        this.head_url = t;
        this.head_width = e;
        this.head_height = i;
        this.head_height *= this.content.width / this.head_width;

        this.head_width != this.content.width &&
          ((this.head_width = this.content.width));

        this.head.width = this.head_width;
        this.head_height = this.head_height;
      }

      onCreate() {
        var t = this;
        this.root = this.me.getChildByName('root');
        this.content = this.root.getChildByName('content');
        this.head = this.content.getChildByName('head');
        this.task_templete = this.content.getChildByName('task_templete');
        this.task_templete.visible = !1;
        this.task_cells = [];
        for (var i = 0; i < 25; i++)
          this.task_cells.push(
            new e(
              this.task_templete.scriptMap['capsui.UICopy'].getNodeClone()
            )
          );
        this.scrollbar = this.root.getChildByName('scrollbar');
        this.scrollpoint = this.scrollbar.getChildByName('scrollpoint');
        this.content.vScrollBarSkin = '';
        this.content.vScrollBar.on('change', this, () => {
          t.refresh_scrollbar();
        });
      }

      refreshView(t) {
        game.LoadMgr.setImgSkin(this.head, this.head_url);
        this.task_cells[i].show(t[i]);
        this.task_cells[i].me.y = e;
        for (
          var e = this.head_height + 15, i = 0;
          i < this.task_cells.length;
          i++
        )
          i < t.length
            ? (e += this.task_cells[i].me.height)
            : (this.task_cells[i].me.visible = !1);
        this.total_h = e;
        this.content.refresh();
        this.refresh_scrollbar();
      }

      refresh_scrollbar() {
        if (this.total_h > this.content.height) {
          var t = this.content.vScrollBar.value / this.content.vScrollBar.max;

          this.scrollpoint.height =
            (this.scrollbar.height * this.content.height) / this.total_h;

          this.scrollpoint.y =
              t *
              this.scrollbar.height *
              (1 - this.content.height / this.total_h);

          this.scrollbar.visible = !0;
        } else this.scrollbar.visible = !1;
      }

      onDisable() {
        for (var t = 0; t < this.task_cells.length; t++)
          this.task_cells[t].stop_roll();
      }
    }

    __extends(i, t);

    return i;
  })(t.UI_ActivityBase);

  t.UI_Activity_Task = i;
})(uiscript || (uiscript = {}));