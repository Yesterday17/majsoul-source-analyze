/**
 * 拼音一览表
 *
 * tongbi: 铜币
 * huiyu: 辉玉
 * huishi:
 * xinyang:
 */

class UI_Money {
  constructor(e, i, n) {
    const _this = this;
    this.me = e;
    if (e.getChildByName("container_tongbi")) {
      this.label_gold = e
        .getChildByName("container_tongbi")
        .getChildByName("label_gold");
      this.btn_gold = e
        .getChildByName("container_tongbi")
        .getChildByName("btn_plus");
      this.label_gold.text = "0";
      this.btn_gold.clickHandler = Laya.Handler.create(
        this,
        () => {
          if (!(n && n.run())) {
            if (uiscript.UI_PiPeiYuYue.Inst.enable) {
              uiscript.UI_Popout.PopOutNoTitle(
                game.Tools.strOfLocalization(204),
                null
              );
            } else if (i) {
              i.runWith(
                Laya.Handler.create(
                  _this,
                  () => {
                    uiscript.UI_Recharge.Inst.show("tongbi");
                  },
                  null,
                  false
                )
              );
            }
          }
        },
        null,
        false
      );
      if (e.getChildByName("container_huiyu")) {
        this.label_diamond = e
          .getChildByName("container_huiyu")
          .getChildByName("label_gold");
        this.btn_diamond = e
          .getChildByName("container_huiyu")
          .getChildByName("btn_plus");
        this.label_diamond.text = "0";
        this.btn_diamond.clickHandler = Laya.Handler.create(
          this,
          () => {
            if (!(n && n.run())) {
              if (uiscript.UI_PiPeiYuYue.Inst.enable) {
                uiscript.UI_Popout.PopOutNoTitle(
                  game.Tools.strOfLocalization(204),
                  null
                );
              } else if (i) {
                i.runWith(
                  Laya.Handler.create(
                    _this,
                    () => {
                      uiscript.UI_Recharge.Inst.show("huiyu");
                    },
                    null,
                    false
                  )
                );
              }
            }
          },
          null,
          false
        );

        e
          .getChildByName("container_huiyu")
          .getChildByName("btn_info").clickHandler = new Laya.Handler(
          this,
          () => {
            if (!uiscript.UI_Lobby.Inst.locking) {
              uiscript.UI_checkhuiyu.Inst.show(e, i, n);
            }
          }
        );
        if (GameMgr.client_language == "chs") {
          e
            .getChildByName("container_huiyu")
            .getChildByName("btn_info").mouseEnabled = false;
        }
        if (e.getChildByName("container_huishi")) {
          {
            this.label_huishi = e
              .getChildByName("container_huishi")
              .getChildByName("label_gold");
            const btn_add_huishi = e
              .getChildByName("container_huishi")
              .getChildByName("btn_plus");
            game.LoadMgr.setImgSkin(
              e.getChildByName("container_huishi").getChildByName("icon"),
              cfg.item_definition.item.find(302014).icon_transparent
            );
            this.label_huishi.text = "0";
            btn_add_huishi.clickHandler = Laya.Handler.create(
              this,
              () => {
                if (!(n && n.run())) {
                  if (uiscript.UI_PiPeiYuYue.Inst.enable) {
                    uiscript.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    );
                  } else if (i) {
                    i.runWith(
                      Laya.Handler.create(
                        _this,
                        () => {
                          uiscript.UI_Recharge.Inst.show("huishi");
                        },
                        null,
                        false
                      )
                    );
                  }
                }
              },
              null,
              false
            );
          }
        }
      }
    }

    if (e.getChildByName("container_xinyang")) {
      this.label_xinyang = e
        .getChildByName("container_xinyang")
        .getChildByName("label_gold");
      e
        .getChildByName("container_xinyang")
        .getChildByName("icon").skin = game.Tools.localUISrc(
        "myres/lobby/xycoin.png"
      );
      this.label_huishi.text = "0";
      app.NetAgent.AddListener2Lobby(
        "NotifyAccountUpdate",
        Laya.Handler.create(
          this,
          ({ update }) => {
            const i = update;
            if (i && i.numerical) {
              for (let n = 0; n < i.numerical.length; n++) {
                const r = i.numerical[n].id;
                const s = i.numerical[n].final;
                switch (r) {
                  case 100002:
                    _this.label_gold &&
                      (_this.label_gold.text = _this.money2Desc(s));
                }
              }
              Laya.timer.frameOnce(1, _this, () => {
                _this.label_diamond &&
                  (_this.label_diamond.text = _this.money2Desc(
                    uiscript.UI_Bag.get_item_count(100001)
                  )),
                  _this.label_huishi &&
                    (_this.label_huishi.text = _this.money2Desc(
                      uiscript.UI_Bag.get_item_count(302014)
                    ));
              });
            }
          },
          null,
          false
        )
      );
    }
  }

  onEnable() {
    if (this.label_diamond) {
      this.label_diamond.text = this.money2Desc(
        uiscript.UI_Bag.get_item_count(100001)
      );
    }
    if (this.label_gold) {
      this.label_gold.text = this.money2Desc(GameMgr.Inst.account_data.gold);
    }
    if (this.label_huishi) {
      this.label_huishi.text = this.money2Desc(
        uiscript.UI_Bag.get_item_count(302014)
      );
    }
    if (this.label_xinyang) {
      this.label_xinyang.text = this.money2Desc(
        uiscript.UI_Bag.get_item_count(302014)
      );
    }
    if (this.label_huishi) {
      if ("chs" != GameMgr.client_language) {
        this.me.getChildByName("container_huishi").visible = false;
        if (
          GameMgr.client_language == "chs" &&
          this.me.getChildByName("container_xinyang")
        ) {
          this.me.getChildByName("container_xinyang").visible = false;
        }
      }
    }
  }

  money2Desc(t) {
    if (t < 1e6) return t.toString();
    if (t < 1e8) {
      for (var e = (t / 1e4).toFixed(3), i = 0, n = 0; n < e.length; n++)
        if ("." == e[n]) {
          i = n;
          break;
        }
      return (
        (e = i >= 4 ? e.substr(0, 4) : e.substr(0, 5)) +
        game.Tools.strOfLocalization(2148)
      );
    }
    for (var e = (t / 1e8).toFixed(3), i = 0, n = 0; n < e.length; n++)
      if (e[n] == ".") {
        i = n;
        break;
      }
    return (
      (e = i >= 4 ? e.substr(0, 4) : e.substr(0, 5)) +
      game.Tools.strOfLocalization(2149)
    );
  }
}

export default uiscript => (uiscript.UI_Money = UI_Money);
