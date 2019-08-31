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
  const e = (() => {
      function e(t) {
        this.me = t;
      }
      return (e.prototype.show = function(e, n, a) {
        game.LoadMgr.setImgSkin(
          this.me.getChildByName('info').getChildByName('item'),
          cfg.item_definition.item.get(e).icon
        );
        (this.me
          .getChildByName('info')
          .getChildByName('item_name').text = game.Tools.strOfLocalization(
          2811,
          [cfg.item_definition.item.get(e)[`name_${GameMgr.client_language}`]]
        )),
          (this.me
            .getChildByName('info')
            .getChildByName('count').text = t.UI_Bag.get_item_daily_record(
            1e4,
            e
          ).toString()),
          (this.me.getChildByName('info').getChildByName('count_max').text =
            `/${n.toString()}`),
          (this.me.getChildByName('info').getChildByName('label_count').text =
            `${game.Tools.strOfLocalization(2812)}: `),
          (this.me.getChildByName('info').getChildByName('info').text = a);
        const r = {};
        cfg.activity.game_task.forEach(({activity_id, reward_id, reward_count, base_task_id}) => {
          if (activity_id == i.activity_id && reward_id == e) {
            let n = r[reward_count];
            n || ((n = []), (r[reward_count] = n));
            const a = base_task_id, s = cfg.events.base_task.get(a).param[2];
            n.push(cfg.fan.fan.get(s)[`name_${GameMgr.client_language}`]);
          }
        });
        let s = 0, o = 146;
        for (const l in r) {
          const h = this.me.getChildByName('info').getChildByName(`cell${s}`), c = h.getChildByName('reward');
          c.text =
            `${cfg.item_definition.item.get(e)[
  `name_${GameMgr.client_language}`
]} x${l}`;
          for (
            var u = h.getChildByName('info'), _ = '', d = r[l], f = 0;
            f < d.length;
            f++
          )
            0 != f && (_ += ','), (_ += d[f]);
          u.text = _;
          const p = u.textField.textHeight;
          (u.height = p), (u.y = 20), (c.y = 20), (c.height = p);
          const m = h.getChildByName('shu');
          (m.y = 5),
            (m.height = p + 30),
            (h.height = p + 40),
            (h.x = 16),
            (h.y = o),
            (o += h.height + 5),
            s++;
        }
        return (
          (o += 10),
          (this.me.getChildByName('bg').height = o),
          (this.me.height = o),
          o
        );
      }),
      e
    ;
    })();

  var i = (i => {
    function n() {
      const t =
        i.call(
          this,
          cfg.activity.activity.get(n.activity_id)[
            `name_${GameMgr.client_language}`
          ],
          new ui.lobby.activitys.activity_task_zhongxiaUI()
        ) || this;
      return (t.cells = []), (t.toth = 0), t;
    }
    return __extends(n, i),
    (n.prototype.isopen = () => t.UI_Activity.activities[n.activity_id]),
    (n.prototype.need_popout = () => {
      const t = cfg.activity.activity.get(n.activity_id);
      return !(!t || !t.need_popout);
    }),
    (n.prototype.onCreate = function() {
      const t = this;
      (this.root = this.me.getChildByName('root')),
        (this.content = this.root.getChildByName('content')),
        (this.scrollbar = this.root.getChildByName('scrollbar').scriptMap[
          'capsui.CScrollBar'
        ]),
        (this.content.vScrollBarSkin = ''),
        this.scrollbar.init(null),
        (this.scrollbar.islong = !0),
        this.content.vScrollBar.on('change', this, () => {
          t.scrollbar.setVal(
            t.content.vScrollBar.value / t.content.vScrollBar.max,
            t.content.height / t.toth
          );
        }),
        (this.cells = []);
      for (let i = 0; i < 3; i++)
        this.cells.push(new e(this.content.getChildByName(`content${i}`)));
    }),
    (n.prototype.show = function() {
      (this.enable = !0),
        game.LoadMgr.setImgSkin(
          this.root.getChildByName('content').getChildByName('head'),
          'myres2/treasurehead/zhongxia_task.jpg'
        );
      for (
        var t = [309008, 309009, 309010],
          e = 332,
          i = i => {
            const a = t[i];
            let r = 0;
            cfg.item_definition.source_limit.forEach(({item_id, id, item_limit}) => {
              item_id == a && 1e4 == id && (r = item_limit);
            }),
              (n.cells[i].me.y = e),
              (n.cells[i].me.x = 1),
              (e += n.cells[i].show(
                t[i],
                r,
                game.Tools.strOfLocalization(2813, [
                  cfg.item_definition.item.get(a)[
                    `name_${GameMgr.client_language}`
                  ]
                ])
              )),
              (e += 10);
          },
          n = this,
          a = 0;
        a < t.length;
        a++
      )
        i(a);
      (this.toth = e),
        this.content.refresh(),
        (this.content.vScrollBar.value = 0),
        this.content.vScrollBar.stopScroll(),
        this.scrollbar.reset(),
        this.scrollbar.setVal(0, this.content.height / this.toth);
    }),
    (n.prototype.hide = function() {
      this.enable = !1;
    }),
    (n.activity_id = 1012),
    n
  ;
  })(t.UI_ActivityBase);

  t.UI_Task_ZhongXia = i;
})(uiscript || (uiscript = {}));