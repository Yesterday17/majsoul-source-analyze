var __extends =
    (this && this.__extends) ||
    (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i),
          (e.prototype =
            null === i
              ? Object.create(i)
              : ((n.prototype = i.prototype), new n()));
      };
    })(),
  uiscript;
!(function(t) {
  var e = (function(e) {
    function i() {
      var t = e.call(this, new ui.lobby.openboxUI()) || this;
      return (
        (t.locking = !1),
        (t.datas = []),
        (t.choosed_index = -1),
        (i.Inst = t),
        t
      );
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var e = this;
        (this.blackBg = this.me.getChildByName('backbg')),
          (this.root = this.me.getChildByName('root')),
          (this.box_name = this.root.getChildByName('box_name')),
          (this.btn_confirm = this.root.getChildByName('btn_confirm')),
          (this.scroll_view = this.root.scriptMap['capsui.CScrollView']),
          this.scroll_view.init_scrollview(
            new Laya.Handler(this, this.render_item),
            -1,
            4
          ),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = new Laya.Handler(this, function() {
            e.locking || e.close();
          })),
          (this.btn_confirm.clickHandler = new Laya.Handler(this, function() {
            if (!e.locking && -1 != e.choosed_index) {
              var i = e.datas[e.choosed_index].item_id,
                n = e.datas[e.choosed_index].count;
              app.NetAgent.sendReq2Lobby(
                'Lobby',
                'openManualItem',
                { item_id: e.box_id, count: n, select_id: i },
                function(e, a) {
                  if (e || a.error)
                    t.UIMgr.Inst.showNetReqError('openManualItem', e, a);
                  else {
                    var r = game.GameUtility.get_item_view(i);
                    t.UI_LightTips.Inst.show(
                      game.Tools.strOfLocalization(2781, [r.name, n.toString()])
                    );
                  }
                }
              ),
                e.close();
            }
          }));
      }),
      (i.prototype.show = function(e) {
        var i = this;
        (this.enable = !0),
          (this.locking = !0),
          (this.blackBg.alpha = 0),
          Laya.Tween.to(this.blackBg, { alpha: 0.3 }, 150),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              i.locking = !1;
            })
          ),
          (this.box_id = e),
          (this.choosed_index = -1),
          (this.datas = []);
        for (
          var n = cfg.item_definition.item.get(e),
            a = cfg.item_definition.item_manual_pool.findGroup(n.iargs[0]),
            r = 0;
          r < a.length;
          r++
        )
          this.datas.push({ item_id: a[r].res_id, count: a[r].res_count });
        this.scroll_view.reset(),
          this.scroll_view.addItem(this.datas.length),
          game.Tools.setGrayDisable(this.btn_confirm, !0),
          (this.box_name.text = n['name_' + GameMgr.client_language]);
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = !0),
          Laya.Tween.to(this.blackBg, { alpha: 0 }, 150),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = !1), (e.enable = !1);
            })
          );
      }),
      (i.prototype.render_item = function(t) {
        var e = this,
          i = t.index,
          n = t.container,
          a = this.datas[i].item_id,
          r = this.datas[i].count,
          s = n.getChildByName('btn');
        if (
          ((s.clickHandler = Laya.Handler.create(
            this,
            function() {
              e.choosed_index == i ? e.changeSelect(-1) : e.changeSelect(i);
            },
            null,
            !1
          )),
          game.LoadMgr.setImgSkin(
            s.getChildByName('icon'),
            cfg.item_definition.item.get(a).icon
          ),
          r <= 1)
        )
          s.getChildByName('num').visible = !1;
        else {
          var o = s.getChildByName('num');
          (o.visible = !0), (o.text = r.toString());
        }
        s.getChildByName('chosen').visible = this.choosed_index == i;
      }),
      (i.prototype.changeSelect = function(t) {
        var e = this.choosed_index;
        (this.choosed_index = t),
          -1 != e && this.scroll_view.wantToRefreshItem(e),
          -1 != this.choosed_index &&
            this.scroll_view.wantToRefreshItem(this.choosed_index),
          -1 == e &&
            -1 != this.choosed_index &&
            game.Tools.setGrayDisable(this.btn_confirm, !1),
          -1 != e &&
            -1 == this.choosed_index &&
            game.Tools.setGrayDisable(this.btn_confirm, !0);
      }),
      i
    );
  })(t.UIBase);
  t.UI_OpenBox = e;
})(uiscript || (uiscript = {}));