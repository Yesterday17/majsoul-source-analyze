let uiscript;
!(t => {
  let e;
  !(t => {
    (t[(t.none = 0)] = 'none'),
      (t[(t.build = 1)] = 'build'),
      (t[(t.showing = 2)] = 'showing');
  })(e || (e = {}));
  const i = (i => {
    function n() {
      const t = i.call(this, new ui.mj.fightbeginUI()) || this;
      return (t.cells = []), (t.effect_winlose = null), t;
    }
    return __extends(n, i),
    (n.show = function(i) {
      const a = this;
      app.Log.log('UI_FightBegin show'),
        null != this._Inst && this._Inst.destroy(),
        (this._state = e.build);
      const r = new n();
      (this._Inst = r),
        t.UIMgr.Inst.AddMJUI(r),
        Laya.timer.frameOnce(5, this, () => {
          i && i.run(),
            a._state == e.build
              ? ((a._state = e.showing), r._onShow())
              : a._state == e.none && r && (r.destroy(), (a._Inst = null));
        });
    }),
    (n.hide = function() {
      const t = this;
      if ((app.Log.log('UI_FightBegin hide'), this._state == e.showing)) {
        const i = this._Inst._onHide();
        return Laya.timer.once(i, this, () => {
          t._Inst.destroy(), (t._Inst = null);
        }),
        (this._state = e.none),
        i
      ;
      }
      return (this._state = e.none), 0;
    }),
    (n.prototype.onCreate = function() {
      app.Log.log('UI_FightBegin onCreate');
      for (let e = 0; e < 4; e++) {
        const i = this.me.getChildByName(`container_${e.toString()}`);
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
    }),
    (n.prototype._onShow = function() {
      const t = this;
      (this.enable = true),
        app.Log.log('UI_FightBegin _onShow'),
        (this.me.alpha = 1);
      for (
        let e = t => {
                const e = i.cells[t], n = view.DesktopMgr.Inst.localPosition2Seat(t);
                if (-1 == n)
                  (e.container.getChildByName('illust').visible = false),
                    (e.container.getChildByName('container_name').visible = false);
                else {
                  (e.container.getChildByName('illust').visible = true),
                    (e.container.getChildByName('container_name').visible = true);
                  const a = view.DesktopMgr.Inst.player_datas[n];
                  (e.name.text = a.nickname),
                    game.Tools.charaPart(a.avatar_id, e.body, 'half', e.rect, true),
                    (e.rank.id =
                      a[
                        view.DesktopMgr.Inst.game_config.mode.mode < 10
                          ? 'level'
                          : 'level3'
                      ].id),
                    (e.title.id = game.Tools.titleLocalization(
                      a.account_id,
                      a.title
                    ));
                }
                let r = 0, s = 0;
                switch (t) {
                  case 0:
                    (r = 1491), (s = 860);
                    break;
                  case 1:
                    (r = 2056), (s = 726);
                    break;
                  case 2:
                    (r = -757), (s = -875);
                    break;
                  case 3:
                    (r = -1298), (s = 612);
                }
                (e.container.visible = true),
                  (e.container.x = r),
                  (e.container.y = s),
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
      }),
        Laya.timer.once(1200, this, () => {
          let e = '';
          (e =
            'jp' == GameMgr.client_language
              ? 'scene/effect_winlose_jp.lh'
              : 'en' == GameMgr.client_language
              ? 'scene/effect_winlose_en.lh'
              : 'scene/effect_winlose.lh'),
            (t.effect_winlose = game.FrontEffect.Inst.create_ui_effect(
              t.me.getChildByName('container_effect'),
              e,
              new Laya.Point(0, 0),
              1
            ));
        }),
        Laya.timer.once(2200, this, () => {
          view.AudioMgr.PlayCharactorSound(
            view.DesktopMgr.Inst.main_role_character_info,
            'game_start'
          );
        });
    }),
    (n.prototype._onHide = function() {
      const t = this;
      Laya.timer.clearAll(this);
      let e = 'UI_FightBegin _onHide ';
      if (this.cells) {
        e += `count=${this.cells.length}`;
        for (a = 0; a < this.cells.length; a++)
          this.cells[a] ? (e += 'T') : (e += 'N');
      } else e += 'nocells';
      app.Log.log(e);
      for (
        var i = t => {
            const e = n.cells[t];
            if (!e) return 'continue';
            const i = view.DesktopMgr.Inst.localPosition2Seat(t);
            if (-1 == i)
              (e.container.getChildByName('illust').visible = false),
                (e.container.getChildByName('container_name').visible = false);
            else {
              (e.container.getChildByName('illust').visible = true),
                (e.container.getChildByName('container_name').visible = true);
              const a = view.DesktopMgr.Inst.player_datas[i];
              e.name.text = a.nickname;
            }
            let r = 0, s = 0;
            switch (t) {
              case 0:
                (r = 1491), (s = 860);
                break;
              case 1:
                (r = 2056), (s = 726);
                break;
              case 2:
                (r = -757), (s = -875);
                break;
              case 3:
                (r = -1298), (s = 612);
            }
            Laya.Tween.to(
              e.container,
              { x: r, y: s },
              400,
              Laya.Ease.strongIn
            ),
              Laya.timer.once(500, n, () => {
                Laya.loader.clearTextureRes(e.body.skin),
                  (e.container.visible = false);
              });
          },
          n = this,
          a = 0;
        a < 4 && a < this.cells.length;
        a++
      )
        i(a);
      return this.effect_winlose && this.effect_winlose.destory(),
      Laya.timer.once(100, this, () => {
        Laya.Tween.to(t.me, { alpha: 0 }, 300);
      }),
      Laya.timer.once(400, this, () => {
        t.enable = false;
      }),
      500
    ;
    }),
    (n._Inst = null),
    (n._state = e.none),
    n
  ;
  })(t.UIBase);
  t.UI_FightBegin = i;
})(uiscript || (uiscript = {}));