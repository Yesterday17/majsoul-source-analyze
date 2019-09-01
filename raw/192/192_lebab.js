let uiscript;
!(t => {
  const e = (() => {
      function e(t) {
        const e = this;
        (this.me = t),
          (this.bg = t.getChildByName('bg')),
          (this.label_mode = this.bg.getChildByName('mode')),
          (this.label_duanwei = this.bg.getChildByName('duanwei')),
          (this.btn_close = this.bg.getChildByName('btn_close')),
          (this.btn_close.clickHandler = Laya.Handler.create(
            this,
            () => {
              i.Inst.matchLocking(e.match_id) || e.close();
            },
            null,
            false
          )),
          (this.match_id = -1),
          (this.me.visible = false);
      }
      return (e.prototype.setData = function(e, n) {
        (this.build_time = Laya.timer.currTimer),
          (this.match_id = e),
          (this.pos = n),
          (this.me.visible = true);
        const a = cfg.desktop.matchmode.get(e);
        if (a) {
          switch (
            ((this.label_duanwei.text =
              a[`room_name_${GameMgr.client_language}`]),
            a.room)
          ) {
            case 1:
              this.label_duanwei.color = '#d26f69';
              break;
            case 2:
              this.label_duanwei.color = '#cfcdd2';
              break;
            case 3:
              this.label_duanwei.color = '#dbb036';
              break;
            case 4:
              this.label_duanwei.color = '#3db98d';
              break;
            case 5:
              this.label_duanwei.color = '#8264fb';
              break;
            case 6:
              this.label_duanwei.color = '#ff2b72';
              break;
            default:
              this.label_duanwei.color = '#ffffff';
          }
          this.label_mode.text = game.Tools.room_mode_desc(a.mode);
        } else (this.label_duanwei.text = ''), (this.label_mode.text = '');
        (this.during_close = false),
          (this.me.x = 0),
          (this.me.y = this.me.height * n),
          (this.bg.x = 5),
          (this.bg.alpha = 1);
        const r = this;
        Laya.timer.once(150, this, () => {
          app.NetAgent.sendReq2Lobby(
            'Lobby',
            'matchGame',
            { match_mode: e },
            (e, n) => {
              (e || n.error) &&
                (t.UIMgr.Inst.showNetReqError('matchGame', e, n),
                t.UIBase.anim_alpha_out(
                  r.bg,
                  { x: 60, alpha: 0 },
                  150,
                  0,
                  Laya.Handler.create(r, () => {
                    const t = r.match_id, e = r.pos;
                    (r.match_id = -1),
                      (r.pos = -1),
                      (r.me.visible = false),
                      i.Inst.onCloseOver(t, e);
                  })
                ));
            }
          );
        });
      }),
      (e.prototype.changePos = function(t) {
        if (((this.pos = t), !this.during_close)) {
          Laya.Tween.clearAll(this);
          const e = this.me.y, i = t * this.me.height, n = Math.abs(e - i) / 1;
          Laya.Tween.to(this.me, { y: i }, n);
        }
      }),
      (e.prototype.close = function() {
        if (!this.during_close) {
          const e = this;
          (this.during_close = true),
            app.NetAgent.sendReq2Lobby(
              'Lobby',
              'cancelMatch',
              { match_mode: this.match_id },
              (n, a) => {
                n || a.error
                  ? (t.UIMgr.Inst.showNetReqError('cancelMatch', n, a),
                    (e.during_close = false))
                  : t.UIBase.anim_alpha_out(
                      e.bg,
                      { x: 60, alpha: 0 },
                      150,
                      0,
                      Laya.Handler.create(e, () => {
                        e.during_close = false;
                        const t = e.match_id, n = e.pos;
                        (e.match_id = -1),
                          (e.pos = -1),
                          (e.me.visible = false),
                          i.Inst.onCloseOver(t, n);
                      })
                    );
              }
            );
        }
      }),
      e
    ;
    })();

  var i = (i => {
    function n() {
      const t = i.call(this, new ui.lobby.pipeiyuyueUI()) || this;
      return (
        (t.root = null),
        (t.bg = null),
        (t.label_time = null),
        (t.img_arrow = null),
        (t.panel_content = null),
        (t.cell_templete = null),
        (t.btn_open = null),
        (t.cells = []),
        (t.current_count = 0),
        (t.inopen = true),
        (t.start_time = 0),
        (t.bg_width0 = 337),
        (t.bg_width1 = 515),
        (n.Inst = t),
        t
      );
    }
    return __extends(n, i),
    (n.prototype.onCreate = function() {
      const i = this;
      (this.root = this.me.getChildByName('root')),
        (this.bg = this.root.getChildByName('bg')),
        (this.label_time = this.root.getChildByName('time')),
        (this.img_arrow = this.root.getChildByName('arrow')),
        (this.panel_content = this.root.getChildByName('lst')),
        (this.cell_templete = this.panel_content.getChildByName(
          'templete'
        )),
        (this.cell_templete.visible = false);
      for (let n = 0; n < 10; n++) {
        const a = this.cell_templete.scriptMap[
          'capsui.UICopy'
        ].getNodeClone();
        this.cells.push(new e(a));
      }
      (this.btn_open = this.root.getChildByName('btn_open')),
        (this.btn_open.clickHandler = Laya.Handler.create(
          this,
          () => {
            (i.inopen = !i.inopen), i.refreshshow();
          },
          null,
          false
        )),
        app.NetAgent.AddListener2Lobby(
          'NotifyMatchTimeout',
          Laya.Handler.create(this, e => {
            app.Log.log(`NotifyMatchTimeout:${JSON.stringify(e)}`),
              t.UI_Popout.PopOutNoTitle(
                game.Tools.strOfLocalization(2152),
                null
              ),
              i.onPiPeiOver();
          })
        ),
        game.LobbyNetMgr.Inst.add_connect_listener(
          Laya.Handler.create(
            this,
            t => {
              i.enable && i.onPiPeiOver();
            },
            null,
            false
          )
        );
    }),
    (n.prototype.addMatch = function(e) {
      const i = this;
      if (!this.matchYuYued(e)) {
        for (var n = -1, a = 0; a < this.cells.length; a++)
          if (-1 == this.cells[a].match_id) {
            n = a;
            break;
          }
        if (n >= 0) {
          0 == this.current_count &&
            ((this.inopen = true),
            (this.enable = true),
            (this.bg.width = this.bg_width1),
            (this.bg.height = 60),
            (this.start_time = Laya.timer.currTimer),
            (this.label_time.text = '00:00'),
            Laya.timer.loop(100, this, () => {
              if (!t.UI_PiPeiChengGong.Inst.enable) {
                let e = Laya.timer.currTimer - i.start_time;
                e /= 1e3;
                let n = '', a = Math.floor(e / 60);
                a < 10 && (n += '0'),
                  (n += a),
                  (n += ':'),
                  (a = Math.floor(e) % 60) < 10 && (n += '0'),
                  (n += a),
                  (i.label_time.text = n);
              }
            }));
          this.cells[n].setData(e, this.current_count),
            this.current_count++,
            this.refreshshow();
        }
      }
    }),
    (n.prototype.refreshshow = function() {
      const t = this;
      Laya.Tween.clearAll(this.bg), Laya.Tween.clearAll(this.panel_content);
      const e = this.cell_templete.height;
      if (((this.img_arrow.rotation = this.inopen ? 0 : 180), this.inopen))
        if (this.bg.width < this.bg_width1 - 0.001)
          if (((this.panel_content.visible = false), 0 == this.current_count))
            this.enable = false;
          else {
            o = (this.bg_width1 - this.bg.width) / 1;
            Laya.Tween.to(
              this.bg,
              { width: this.bg_width1 },
              o,
              null,
              Laya.Handler.create(this, () => {
                (t.bg.width = t.bg_width1), t.refreshshow();
              })
            );
          }
        else {
          this.bg.width = this.bg_width1;
          const i = this.bg.height, n = 70 + this.current_count * e, a = Math.abs(i - n);
          if (a < 10)
            (this.bg.height = n),
              (this.panel_content.height = this.bg.height - 60),
              (this.panel_content.visible = true),
              0 == this.current_count && (this.enable = false);
          else {
            o = a / 1;
            Laya.Tween.to(
              this.bg,
              { height: n },
              o,
              null,
              Laya.Handler.create(this, () => {
                (t.bg.height = n), 0 == t.current_count && (t.enable = false);
              })
            ),
              (this.panel_content.height = i - 59),
              (this.panel_content.visible = true),
              Laya.Tween.to(this.panel_content, { height: n - 60 }, o);
          }
        }
      else if (0 == this.current_count) this.enable = false;
      else if (this.bg.height > 60.001) {
        o = (this.bg.height - 60) / 1;
        Laya.Tween.to(
          this.bg,
          { height: 60 },
          o,
          null,
          Laya.Handler.create(this, () => {
            (t.bg.height = 60), t.refreshshow();
          })
        ),
          (this.panel_content.visible = true),
          (this.panel_content.height = this.bg.height - 60),
          Laya.Tween.to(
            this.panel_content,
            { height: 0.1 },
            o,
            null,
            Laya.Handler.create(this, () => {
              t.panel_content.visible = false;
            })
          );
      } else {
        (this.panel_content.visible = false), (this.bg.height = 60);
        const r = this.bg.width, s = this.bg_width0;
        if (this.bg.width < s + 10) this.bg.width = s;
        else {
          var o = Math.abs(r - s) / 1;
          Laya.Tween.to(
            this.bg,
            { width: s },
            o,
            null,
            Laya.Handler.create(this, () => {
              t.bg.width = s;
            })
          );
        }
      }
    }),
    (n.prototype.matchYuYued = function(t) {
      return -1 != this.getMatchID(t);
    }),
    (n.prototype.getMatchID = function(t) {
      for (let e = 0; e < this.cells.length; e++)
        if (this.cells[e].match_id === t) return e;
      return -1;
    }),
    (n.prototype.matchLocking = function(t) {
      const e = this.getMatchID(t);
      return (
        -1 != e &&
        (Laya.timer.currTimer < this.cells[e].build_time + 200 ||
          !!this.cells[e].during_close)
      );
    }),
    (n.prototype.cancelPiPei = function(t) {
      if (!this.matchLocking(t)) {
        const e = this.getMatchID(t);
        -1 != e && this.cells[e].close();
      }
    }),
    (n.prototype.onCloseOver = function(t, e) {
      for (let i = 0; i < this.cells.length; i++)
        -1 != this.cells[i].match_id &&
          this.cells[i].pos >= e &&
          this.cells[i].changePos(this.cells[i].pos - 1);
      this.current_count--,
        this.refreshshow(),
        this.me.event('cancelPiPei', t);
    }),
    (n.prototype.onDisable = function() {
      Laya.Tween.clearAll(this), Laya.timer.clearAll(this);
    }),
    (n.prototype.onPiPeiOver = function() {
      this.enable = false;
      for (let t = 0; t < this.cells.length; t++)
        (this.cells[t].me.visible = false),
          (this.cells[t].match_id = -1),
          (this.cells[t].pos = -1);
      (this.current_count = 0), this.me.event('pipeiover');
    }),
    n
  ;
  })(t.UIBase);

  t.UI_PiPeiYuYue = i;
})(uiscript || (uiscript = {}));