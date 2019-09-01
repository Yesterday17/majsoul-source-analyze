let uiscript;
!(t => {
  const e = (() => {
      function e(t) {
        (this.id = 0),
          (this.me = t),
          (this.me.visible = false),
          (this.container_info = t.getChildByName('info')),
          (this.plane_task_name = this.container_info.getChildByName(
            'container_taskname'
          )),
          (this.task_name = this.plane_task_name.getChildByName('taskname')),
          (this.item_icon = this.container_info.getChildByName('item')),
          (this.item_name = this.container_info.getChildByName('item_name')),
          (this.item_count = this.container_info.getChildByName('item_count')),
          (this.progress_bar = this.container_info
            .getChildByName('bar')
            .getChildByName('val')),
          (this.progress_label = this.container_info.getChildByName(
            'progress'
          )),
          (this.btn_get = this.container_info.getChildByName('btn_get')),
          (this.flag_getted = this.container_info.getChildByName('alreadyget'));
      }
      return (e.prototype.show = function({id, rewarded, achieved, counter}) {
        const i = this;
        this.me.visible = true;
        const n = id;
        this.id = n;
        const a = cfg.activity.task.get(id), r = cfg.events.base_task.get(a.base_task_id);
        if (
          ((this.container_info.visible = true),
          (this.btn_get.visible = false),
          (this.flag_getted.visible = false),
          rewarded
            ? (this.flag_getted.visible = true)
            : ((this.btn_get.visible = true),
              achieved
                ? (game.Tools.setGrayDisable(this.btn_get, false),
                  (this.btn_get.clickHandler = Laya.Handler.create(
                    this,
                    () => {
                      game.Tools.setGrayDisable(i.btn_get, true),
                        app.NetAgent.sendReq2Lobby(
                          'Lobby',
                          'completeActivityTask',
                          { task_id: n },
                          (e, a) => {
                            if (
                              (game.Tools.setGrayDisable(i.btn_get, false),
                              e || a.error)
                            )
                              t.UIMgr.Inst.showNetReqError(
                                'completeActivityTask',
                                e,
                                a
                              );
                            else {
                              if (i.id == n) {
                                (i.btn_get.visible = false),
                                  (i.flag_getted.visible = true);
                                const r =
                                  `${game.Tools.strOfLocalization(2234)}${i.item_name.text} ${i.item_count.text}`;
                                t.UI_LightTips.Inst.show(r);
                              }
                              t.UI_Activity.onTaskRewarded(n);
                            }
                          }
                        );
                    },
                    null,
                    false
                  )))
                : (game.Tools.setGrayDisable(this.btn_get, true),
                  (this.btn_get.clickHandler = null))),
          (this.task_name.text = r[`desc_${GameMgr.client_language}`]),
          (this.task_name.width = this.task_name.textField.textWidth),
          (this.task_name.x = 0),
          this.task_name.width > this.plane_task_name.width)
        ) {
          const s =
                    this.plane_task_name.width - this.plane_task_name.width + 200,
                o = Laya.timer.currTimer,
                l = s / 0.06;
          Laya.timer.clearAll(this),
            Laya.timer.frameLoop(1, this, () => {
              let t = Laya.timer.currTimer - o;
              (t -= Math.floor(t / (2e3 + l + 1e3)) * (2e3 + l + 1e3)) <= 2e3
                ? (i.task_name.x = 0)
                : t <= l + 2e3 && (i.task_name.x = -0.06 * (t - 2e3));
            });
        }
        this.item_count.text = `x${a.reward_count}`;
        const h = cfg.item_definition.currency.get(a.reward_id);
        h &&
          (game.LoadMgr.setImgSkin(this.item_icon, h.icon),
          (this.item_name.text = h[`name_${GameMgr.client_language}`]));
        const c = cfg.item_definition.item.get(a.reward_id);
        c &&
          (game.LoadMgr.setImgSkin(this.item_icon, c.icon),
          (this.item_name.text = c[`name_${GameMgr.client_language}`])),
          (this.item_count.x =
            this.item_name.textField.textWidth + this.item_name.x + 50);
        let u = counter;
        u || (u = 0),
          u > r.target && (u = r.target),
          (this.progress_bar.scaleX = u / r.target),
          (this.progress_label.text =
            `${u.toString()}/${r.target.toString()}`);
      }),
      (e.prototype.stop_roll = function() {
        Laya.timer.clearAll(this);
      }),
      e
    ;
    })();

  const i = (t => {
    function i(e, i) {
      return (
        undefined === i && (i = 'activity_taskUI'),
        t.call(this, e, new ui.lobby.activitys[i]()) || this
      );
    }
    return __extends(i, t),
    (i.prototype.setHead = function(t, e, i) {
      (this.head_url = t),
        (this.head_width = e),
        (this.head_height = i),
        this.head_width != this.content.width &&
          ((this.head_height *= this.content.width / this.head_width),
          (this.head_width = this.content.width)),
        (this.head.width = this.head_width),
        (this.head_height = this.head_height);
    }),
    (i.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.content = this.root.getChildByName('content')),
        (this.head = this.content.getChildByName('head')),
        (this.task_templete = this.content.getChildByName('task_templete')),
        (this.task_templete.visible = false),
        (this.task_cells = []);
      for (let i = 0; i < 25; i++)
        this.task_cells.push(
          new e(
            this.task_templete.scriptMap['capsui.UICopy'].getNodeClone()
          )
        );
      (this.scrollbar = this.root.getChildByName('scrollbar')),
        (this.scrollpoint = this.scrollbar.getChildByName('scrollpoint')),
        (this.content.vScrollBarSkin = ''),
        this.content.vScrollBar.on('change', this, () => {
          t.refresh_scrollbar();
        });
    }),
    (i.prototype.refreshView = function(t) {
      game.LoadMgr.setImgSkin(this.head, this.head_url);
      for (
        var e = this.head_height + 15, i = 0;
        i < this.task_cells.length;
        i++
      )
        i < t.length
          ? (this.task_cells[i].show(t[i]),
            (this.task_cells[i].me.y = e),
            (e += this.task_cells[i].me.height))
          : (this.task_cells[i].me.visible = false);
      (this.total_h = e), this.content.refresh(), this.refresh_scrollbar();
    }),
    (i.prototype.refresh_scrollbar = function() {
      if (this.total_h > this.content.height) {
        const t = this.content.vScrollBar.value / this.content.vScrollBar.max;
        (this.scrollpoint.height =
          (this.scrollbar.height * this.content.height) / this.total_h),
          (this.scrollpoint.y =
            t *
            this.scrollbar.height *
            (1 - this.content.height / this.total_h)),
          (this.scrollbar.visible = true);
      } else this.scrollbar.visible = false;
    }),
    (i.prototype.onDisable = function() {
      for (let t = 0; t < this.task_cells.length; t++)
        this.task_cells[t].stop_roll();
    }),
    i
  ;
  })(t.UI_ActivityBase);

  t.UI_Activity_Task = i;
})(uiscript || (uiscript = {}));