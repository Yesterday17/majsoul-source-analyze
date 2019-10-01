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
  var e = (t => {
    class e {
      constructor() {
        var i = t.call(this, new ui.mj.tingpaiUI()) || this;
        i.container_tiles = null;
        i.root = null;
        i.container_effect = null;
        i.items = [];
        i.bg = null;
        i.btn_show = null;
        i.state = -1;
        i.zhengting = !1;
        i.tingPaiDiscardInfos = [];
        i.tingPaiInfos = [];
        i.mousedowned = !1;
        e.Inst = i;
        return i;
      }

      onCreate() {
        this.root = this.me.getChildByName('root');
        this.container_tiles = this.root.getChildByName('container_tiles');
        for (var t = 0; t < this.container_tiles.numChildren; t++) {
          var e = this.container_tiles.getChildAt(t);

          this.items.push({
            container: e,
            tile: e,
            zhengting: e.getChildByName('flag_zhenting'),
            container_left: e.getChildByName('container_left'),
            count: e.getChildByName('container_left').getChildAt(0),
            noyi: e.getChildByName('noyi'),
            fanfu: e.getChildByName('fanfu')
          });

          this.items[t].container.visible = !1;
        }

        this.bg = {
          bg: this.root.getChildByName('bg0'),
          bound: this.root.getChildByName('bound'),
          mask: this.root.getChildByName('bg0').mask,
          right: this.root.getChildByName('bg0').getChildByName('right'),
          bar: this.root.getChildByName('bg0').getChildByName('bar')
        };

        this.container_effect = this.me.getChildByName('container_effect');
        this.btn_show = this.me.getChildByName('btn_show');
        this.btn_show.on('mousedown', this, this._setMouseDown, [!0]);
        this.btn_show.on('mouseup', this, this._setMouseDown, [!1]);
        this.btn_show.on('mouseout', this, this._setMouseDown, [!1]);
        this.btn_show.visible = !1;
        this.reset();
      }

      reset() {
        this.root.visible = !1;
        this.btn_show.visible = !1;
        this.mousedowned = !1;
        this.zhengting = !1;
        this.state = -1;
        this.tingPaiDiscardInfos = [];
        this.tingPaiInfos = [];
      }

      setData0({operation, tingpais}) {
        if (view.DesktopMgr.bianjietishi) {
          var e = !1;
          if (operation)
            for (var i = operation, n = 0; n < i.operation_list.length; n++)
              if (i.operation_list[n].type == mjcore.E_PlayOperation.dapai) {
                e = !0;
                break;
              }
          this.btn_show.visible = !1;
          if (e)
            if (tingpais && tingpais.length > 0) {
              this.btn_show.visible = 1 == tingpais.length;
              this.tingPaiDiscardInfos = [];
              for (n = 0; n < tingpais.length; n++) {
                for (var a = [], r = 0; r < tingpais[n].infos.length; r++) {
                  var i = tingpais[n].infos[r];

                  var s = {
                    tile: mjcore.MJPai.Create(i.tile),
                    haveyi: i.haveyi,
                    yiman: i.yiman,
                    count: i.count,
                    fu: i.fu,
                    biao_dora_count: i.biao_dora_count
                  };

                  a.push(s);
                }
                this.tingPaiDiscardInfos.push({
                  tile: mjcore.MJPai.Create(tingpais[n].tile),
                  zhengting: tingpais[n].zhenting,
                  infos: a
                });
              }
              this.state = 0;
            } else this.state = -1;
        }
      }

      setData1({tingpais}, e) {
        var i = this;
        this.btn_show.visible = !1;
        this.state = -1;
        if (tingpais && tingpais.length > 0) {
          this.btn_show.visible = view.DesktopMgr.bianjietishi;
          var n = this.tingPaiInfos;
          this.tingPaiInfos = [];
          for (h = 0; h < tingpais.length; h++) {
            var a = tingpais[h];

            var r = {
              tile: mjcore.MJPai.Create(a.tile),
              haveyi: a.haveyi,
              yiman: a.yiman,
              count: a.count,
              fu: a.fu,
              biao_dora_count: a.biao_dora_count
            };

            this.tingPaiInfos.push(r);
          }
          this.state = 1;
          if ((!e)) {
            for (var s = !1, o = {}, l = 0, h = 0; h < n.length; h++) {
              o[u] = 1;
              o[(u = n[h].tile.toString())] || (l++);
            }
            for (var c = 0, h = 0; h < this.tingPaiInfos.length; h++) {
              var u = this.tingPaiInfos[h].tile.toString();
              if (!o[u]) {
                s = !0;
                break;
              }
              o[u] = 2;
              1 == o[u] && (c++);
            }
            c != l && (s = !0);
            if ((s)) {
              for (var _ = 0, h = 0; h < this.tingPaiInfos.length; h++)
                (this.tingPaiInfos[h].yiman ||
                  (this.tingPaiInfos[h].haveyi &&
                    this.tingPaiInfos[h].count +
                      this.tingPaiInfos[h].biao_dora_count >=
                      13)) &&
                  _++;
              var d = '';
              var f = -1;

              d =
                    `scene/effect_yiman_queding_${GameMgr.client_language}.lh`;

              d =
                    `scene/effect_yiman_jihui_${GameMgr.client_language}.lh`;

              _ == this.tingPaiInfos.length
                ? (f = 240)
                : _ > 0 &&
                  ((f = 239));

              '' != d &&
                Laya.timer.once(600, this, () => {
                  var t = game.FrontEffect.Inst.create_ui_effect(
                    i.container_effect,
                    d,
                    new Laya.Point(0, 0),
                    1
                  );
                  view.AudioMgr.PlayAudio(f);
                  Laya.timer.once(3e3, i, () => {
                    t.destory();
                  });
                });
            }
          }
        } else
          this.tingPaiInfos = [];
      }

      _show(t, e) {
        if (view.DesktopMgr.bianjietishi) {
          for (a = 0; a < this.items.length; a++)
            this.items[a].container.visible = !1;
          t = t.sort(({tile}, {tile}) => mjcore.MJPai.Distance(tile, tile));
          var i = `myres2/mjp/${GameMgr.Inst.mjp_view}/ui/`;
          var n = 1;
          view.DesktopMgr.Inst.game_config.mode.detail_rule &&
            view.DesktopMgr.Inst.game_config.mode.detail_rule.fanfu &&
            (n = view.DesktopMgr.Inst.game_config.mode.detail_rule.fanfu) <=
              1 &&
            (n = 1);
          for (var a = 0; a < t.length; a++) {
            this.items[a].container.visible = !0;
            this.items[a].zhengting.visible = e;

            this.items[a].tile.skin = game.Tools.localUISrc(
                `${i + t[a].tile.toString()}.png`
              );

            this.items[a].count.text =
                view.DesktopMgr.Inst.getPaiLeft(t[a].tile).toString() +
                ('en' == GameMgr.client_language ? ' ' : '') +
                game.Tools.strOfLocalization(2197);

            this.items[a].zhengting.visible = e;
            this.items[a].container.x = 80 + 120 * a;
            this.items[a].container.y = 45;
            if (
              (n <= 1)
            ) {
              var r = t[a].haveyi || t[a].yiman || t[a].count > 0;
              view.DesktopMgr.Inst.mainrole.during_liqi && (r = !0);
              this.items[a].noyi.visible = !r;
              this.items[a].fanfu.visible = !1;
            } else {
              this.items[a].noyi.visible = !1;
              var s = t[a].count;
              t[a].yiman && (s *= 13);
              view.DesktopMgr.Inst.mainrole.during_liqi && s++;
              this.items[a].fanfu.visible = s < n;
            }
            this.items[a].container_left.visible =
              !this.items[a].noyi.visible && !this.items[a].fanfu.visible;
          }
          var o = 210 + 80 * t.length + 40 * (t.length - 1);
          this.bg.bg.width = o;
          this.bg.bound.width = o;
          this.bg.bar.width = o + 80;
          this.bg.mask.width = o;
          this.bg.right.x = o - 20;
          this.root.x = 960 - o / 2;
          this.root.visible = !0;
        }
      }

      onChooseTile(t) {
        if (
          0 == this.state &&
          t &&
          this.tingPaiDiscardInfos &&
          view.DesktopMgr.bianjietishi
        ) {
          for (var e = -1, i = 0; i < this.tingPaiDiscardInfos.length; i++)
            if (
              0 == mjcore.MJPai.Distance(this.tingPaiDiscardInfos[i].tile, t)
            ) {
              e = i;
              break;
            }
          -1 == e
            ? (this.root.visible = !1)
            : this._show(
                this.tingPaiDiscardInfos[e].infos,
                this.tingPaiDiscardInfos[e].zhengting
              );
        } else this.root.visible = !1;
      }

      _setMouseDown(t) {
        app.Log.log(`_setMouseDown ${t}`);
        this.mousedowned = t;
        this.mousedowned != t &&
          ((t ? 1 == this.state &&
            this.tingPaiInfos &&
            this.tingPaiInfos.length > 0
            ? this._show(this.tingPaiInfos, this.zhengting)
            : 0 == this.state &&
              this.tingPaiDiscardInfos &&
              1 == this.tingPaiDiscardInfos.length
            ? this._show(
                this.tingPaiDiscardInfos[0].infos,
                this.tingPaiDiscardInfos[0].zhengting
              )
            : (this.root.visible = !1) : this.root.visible = !1));
      }

      setZhengting(t) {
        this.zhengting = t;
      }
    }

    __extends(e, t);

    e.Inst = null;
    return e;
  })(t.UIBase);
  t.UI_TingPai = e;
})(uiscript || (uiscript = {}));