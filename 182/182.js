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
        var t = e.call(this, new ui.both_ui.itemdetailUI()) || this;
        t.locking = !1;
        t.container_icon = null;
        t.btn_open = null;
        t.item_id = 0;
        i.Inst = t;
        return t;
      }

      onCreate() {
        var e = this;
        this.root = this.me.getChildByName('root');
        this.name = this.root.getChildByName('label_name');
        this.desc = this.root.getChildByName('desc');

        this.icon = new t.UI_Item_Skin(
            this.root.getChildByName('item').getChildByName('icon')
          );

        this.container_icon = this.root.getChildByName('item');
        this.locking = !1;
        this.btn_open = this.root.getChildByName('btn_open');

        this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            () => {
              e.locking || e.close();
            },
            null,
            !1
          );

        this.btn_open.clickHandler = new Laya.Handler(this, () => {
            if (!e.locking) {
              e.close();
              var i = cfg.item_definition.item.get(e.item_id);
              1 == i.type && t.UI_OpenBox.Inst.show(e.item_id);
              i &&
                1 == i.category &&
                ((2 == i.type && app.NetAgent.sendReq2Lobby(
                'Lobby',
                'openRandomRewardItem',
                { item_id: e.item_id },
                (e, i) => {
                  e || i.error
                    ? t.UIMgr.Inst.showNetReqError(
                        'openRandomRewardItem',
                        e,
                        i
                      )
                    : t.UI_GetReward2.Inst.show(i.results);
                }
              )));
            }
          });
      }

      show(e, i) {
        var n = this;
        void 0 === i && (i = !1);
        this.item_id = e;
        var a = game.GameUtility.get_item_view(e);
        this.name.text = a.name;
        this.desc.text = a.desc;
        this.icon.setSkin(a.icon);
        this.btn_open.visible = !1;
        this.enable = !0;
        this.locking = !0;
        t.UIBase.anim_pop_out(
          this.root,
          Laya.Handler.create(this, () => {
            n.locking = !1;
          })
        );
        var r = cfg.item_definition.item.get(e);
        r &&
          1 == r.category &&
          ((1 != r.type && 2 != r.type) || (i && (this.btn_open.visible = !0)));
      }

      close() {
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
  t.UI_ItemDetail = e;
})(uiscript || (uiscript = {}));