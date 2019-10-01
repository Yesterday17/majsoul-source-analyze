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
  var e;
  !(t => {
    t[(t.none = 0)] = 'none';
    t[(t.build = 1)] = 'build';
    t[(t.showing = 2)] = 'showing';
  })(e || (e = {}));
  var i = (i => {
    class n {
      constructor() {
        var t = i.call(this, new ui.mj.fightbeginUI()) || this;
        t.cells = [];
        t.effect_winlose = null;
        return t;
      }

      static show(i) {
        var a = this;
        app.Log.log('UI_FightBegin show');
        null != this._Inst && this._Inst.destroy();
        this._state = e.build;
        var r = new n();
        this._Inst = r;
        t.UIMgr.Inst.AddMJUI(r);
        Laya.timer.frameOnce(5, this, () => {
          i && i.run();
          a._state = e.showing;
          r.destroy();
          a._state == e.build
            ? (r._onShow())
            : a._state == e.none && r && ((a._Inst = null));
        });
      }

      static hide() {
        var t = this;
        app.Log.log('UI_FightBegin hide');
        if ((this._state == e.showing)) {
          var i = this._Inst._onHide();

          Laya.timer.once(i, this, () => {
            t._Inst.destroy();
            t._Inst = null;
          });

          this._state = e.none;
          return i;
        }
        this._state = e.none;
        return 0;
      }

      onCreate() {
        app.Log.log('UI_FightBegin onCreate');
        for (var e = 0; e < 4; e++) {
          var i = this.me.getChildByName(`container_${e.toString()}`);
          this.cells.push({
            container: i,
            body: i
              .getChildByName('illust')
              .getChildByName('body')
              .getChildByName('body'),
            rect: t.UIRect.CreateFromSprite(
              i
                .getChildByName('illust')
                .getChildByName('body')
                .getChildByName('body')
            ),
            name: i
              .getChildByName('container_name')
              .getChildByName('label_name'),
            x: i.x,
            y: i.y,
            rank: new t.UI_Level(
              i.getChildByName('container_name').getChildByName('rank')
            ),
            title: new t.UI_PlayerTitle(
              i.getChildByName('container_name').getChildByName('title')
            )
          });
        }
      }

      _onShow() {
        var t = this;
        this.enable = !0;
        app.Log.log('UI_FightBegin _onShow');
        this.me.alpha = 1;
        for (
          var e = t => {
            var e = i.cells[t],
              n = view.DesktopMgr.Inst.localPosition2Seat(t);
            e.container.getChildByName('illust').visible = !1;
            if (-1 == n)
              e.container.getChildByName('container_name').visible = !1;
            else {
              e.container.getChildByName('illust').visible = !0;
              e.container.getChildByName('container_name').visible = !0;
              var a = view.DesktopMgr.Inst.player_datas[n];
              e.name.text = a.nickname;
              game.Tools.charaPart(a.avatar_id, e.body, 'half', e.rect, !0);

              e.rank.id =
                  a[
                    view.DesktopMgr.Inst.game_config.mode.mode < 10
                      ? 'level'
                      : 'level3'
                  ].id;

              e.title.id = game.Tools.titleLocalization(
                  a.account_id,
                  a.title
                );
            }
            var r = 0,
              s = 0;
            r = 1491;
            r = 2056;
            r = -757;
            r = -1298;
            switch (t) {
              case 0:
                s = 860;
                break;
              case 1:
                s = 726;
                break;
              case 2:
                s = -875;
                break;
              case 3:
                s = 612;
            }
            e.container.visible = !0;
            e.container.x = r;
            e.container.y = s;
            Laya.timer.once(500, i, () => {
              Laya.Tween.to(
                e.container,
                { x: e.x, y: e.y },
                400,
                Laya.Ease.strongIn
              );
            });
          },
            i = this,
            n = 0;
          n < 4;
          n++
        )
          e(n);

        Laya.timer.once(700, this, () => {
          view.AudioMgr.PlayAudio(225);
        });

        Laya.timer.once(1200, this, () => {
          var e = '';

          e =
            'jp' == GameMgr.client_language
              ? 'scene/effect_winlose_jp.lh'
              : 'en' == GameMgr.client_language
              ? 'scene/effect_winlose_en.lh'
              : 'scene/effect_winlose.lh';

          t.effect_winlose = game.FrontEffect.Inst.create_ui_effect(
              t.me.getChildByName('container_effect'),
              e,
              new Laya.Point(0, 0),
              1
            );
        });

        Laya.timer.once(2200, this, () => {
          view.AudioMgr.PlayCharactorSound(
            view.DesktopMgr.Inst.main_role_character_info,
            'game_start'
          );
        });
      }

      _onHide() {
        var t = this;
        Laya.timer.clearAll(this);
        var e = 'UI_FightBegin _onHide ';
        if (this.cells) {
          e += `count=${this.cells.length}`;
          for (a = 0; a < this.cells.length; a++)
            this.cells[a] ? (e += 'T') : (e += 'N');
        } else e += 'nocells';
        app.Log.log(e);
        for (
          var i = t => {
            var e = n.cells[t];
            if (!e) return 'continue';
            var i = view.DesktopMgr.Inst.localPosition2Seat(t);
            e.container.getChildByName('illust').visible = !1;
            if (-1 == i)
              e.container.getChildByName('container_name').visible = !1;
            else {
              e.container.getChildByName('illust').visible = !0;
              e.container.getChildByName('container_name').visible = !0;
              var a = view.DesktopMgr.Inst.player_datas[i];
              e.name.text = a.nickname;
            }
            var r = 0,
              s = 0;
            r = 1491;
            r = 2056;
            r = -757;
            r = -1298;
            switch (t) {
              case 0:
                s = 860;
                break;
              case 1:
                s = 726;
                break;
              case 2:
                s = -875;
                break;
              case 3:
                s = 612;
            }

            Laya.Tween.to(
              e.container,
              { x: r, y: s },
              400,
              Laya.Ease.strongIn
            );

            Laya.timer.once(500, n, () => {
              Laya.loader.clearTextureRes(e.body.skin);
              e.container.visible = !1;
            });
          },
            n = this,
            a = 0;
          a < 4 && a < this.cells.length;
          a++
        )
          i(a);
        this.effect_winlose && this.effect_winlose.destory();

        Laya.timer.once(100, this, () => {
          Laya.Tween.to(t.me, { alpha: 0 }, 300);
        });

        Laya.timer.once(400, this, () => {
          t.enable = !1;
        });

        return 500;
      }
    }

    __extends(n, i);

    n._Inst = null;
    n._state = e.none;
    return n;
  })(t.UIBase);
  t.UI_FightBegin = i;
})(uiscript || (uiscript = {}));