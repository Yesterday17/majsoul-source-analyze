var uiscript;
!(function(t) {
  var e = (function() {
    function e(e, i, n) {
      var a = this;
      if (
        ((this.me = e),
        e.getChildByName('container_tongbi') &&
          ((this.label_gold = e
            .getChildByName('container_tongbi')
            .getChildByName('label_gold')),
          (this.btn_gold = e
            .getChildByName('container_tongbi')
            .getChildByName('btn_plus')),
          (this.label_gold.text = '0'),
          (this.btn_gold.clickHandler = Laya.Handler.create(
            this,
            function() {
              (n && n.run()) ||
                (t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : i &&
                    i.runWith(
                      Laya.Handler.create(
                        a,
                        function() {
                          t.UI_Recharge.Inst.show('tongbi');
                        },
                        null,
                        false
                      )
                    ));
            },
            null,
            false
          ))),
        e.getChildByName('container_huiyu') &&
          ((this.label_diamond = e
            .getChildByName('container_huiyu')
            .getChildByName('label_gold')),
          (this.btn_diamond = e
            .getChildByName('container_huiyu')
            .getChildByName('btn_plus')),
          (this.label_diamond.text = '0'),
          (this.btn_diamond.clickHandler = Laya.Handler.create(
            this,
            function() {
              (n && n.run()) ||
                (t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : i &&
                    i.runWith(
                      Laya.Handler.create(
                        a,
                        function() {
                          t.UI_Recharge.Inst.show('huiyu');
                        },
                        null,
                        false
                      )
                    ));
            },
            null,
            false
          )),
          (e
            .getChildByName('container_huiyu')
            .getChildByName('btn_info').clickHandler = new Laya.Handler(
            this,
            function() {
              t.UI_Lobby.Inst.locking || t.UI_checkhuiyu.Inst.show(e, i, n);
            }
          )),
          'chs' == GameMgr.client_language &&
            (e
              .getChildByName('container_huiyu')
              .getChildByName('btn_info').mouseEnabled = false)),
        e.getChildByName('container_huishi'))
      ) {
        this.label_huishi = e
          .getChildByName('container_huishi')
          .getChildByName('label_gold');
        var r = e.getChildByName('container_huishi').getChildByName('btn_plus');
        game.LoadMgr.setImgSkin(
          e.getChildByName('container_huishi').getChildByName('icon'),
          cfg.item_definition.item.find(302014).icon_transparent
        ),
          (this.label_huishi.text = '0'),
          (r.clickHandler = Laya.Handler.create(
            this,
            function() {
              (n && n.run()) ||
                (t.UI_PiPeiYuYue.Inst.enable
                  ? t.UI_Popout.PopOutNoTitle(
                      game.Tools.strOfLocalization(204),
                      null
                    )
                  : i &&
                    i.runWith(
                      Laya.Handler.create(
                        a,
                        function() {
                          t.UI_Recharge.Inst.show('huishi');
                        },
                        null,
                        false
                      )
                    ));
            },
            null,
            false
          ));
      }
      e.getChildByName('container_xinyang') &&
        ((this.label_xinyang = e
          .getChildByName('container_xinyang')
          .getChildByName('label_gold')),
        (e
          .getChildByName('container_xinyang')
          .getChildByName('icon').skin = game.Tools.localUISrc(
          'myres/lobby/xycoin.png'
        )),
        (this.label_huishi.text = '0')),
        app.NetAgent.AddListener2Lobby(
          'NotifyAccountUpdate',
          Laya.Handler.create(
            this,
            function(e) {
              var i = e.update;
              if (i && i.numerical) {
                for (var n = 0; n < i.numerical.length; n++) {
                  var r = i.numerical[n].id,
                    s = i.numerical[n].final;
                  switch (r) {
                    case 100002:
                      a.label_gold && (a.label_gold.text = a.money2Desc(s));
                  }
                }
                Laya.timer.frameOnce(1, a, function() {
                  a.label_diamond &&
                    (a.label_diamond.text = a.money2Desc(
                      t.UI_Bag.get_item_count(100001)
                    )),
                    a.label_huishi &&
                      (a.label_huishi.text = a.money2Desc(
                        t.UI_Bag.get_item_count(302014)
                      ));
                });
              }
            },
            null,
            false
          )
        );
    }
    return (
      (e.prototype.onEnable = function() {
        this.label_diamond &&
          (this.label_diamond.text = this.money2Desc(
            t.UI_Bag.get_item_count(100001)
          )),
          this.label_gold &&
            (this.label_gold.text = this.money2Desc(
              GameMgr.Inst.account_data.gold
            )),
          this.label_huishi &&
            (this.label_huishi.text = this.money2Desc(
              t.UI_Bag.get_item_count(302014)
            )),
          this.label_xinyang &&
            (this.label_xinyang.text = this.money2Desc(
              t.UI_Bag.get_item_count(302014)
            )),
          this.label_huishi &&
            ('chs' != GameMgr.client_language &&
              (this.me.getChildByName('container_huishi').visible = false),
            'chs' == GameMgr.client_language &&
              this.me.getChildByName('container_xinyang') &&
              (this.me.getChildByName('container_xinyang').visible = false));
      }),
      (e.prototype.money2Desc = function(t) {
        if (t < 1e6) return t.toString();
        if (
          'chs' == GameMgr.client_language ||
          'jp' == GameMgr.client_language
        ) {
          if (t < 1e8) {
            for (var e = (t / 1e4).toFixed(3), i = 0, n = 0; n < e.length; n++)
              if ('.' == e[n]) {
                i = n;
                break;
              }
            return (
              (e = i >= 4 ? e.substr(0, 4) : e.substr(0, 5)) +
              game.Tools.strOfLocalization(2148)
            );
          }
          for (var e = (t / 1e8).toFixed(3), i = 0, n = 0; n < e.length; n++)
            if ('.' == e[n]) {
              i = n;
              break;
            }
          return (
            (e = i >= 4 ? e.substr(0, 4) : e.substr(0, 5)) +
            game.Tools.strOfLocalization(2149)
          );
        }
        if (t < 1e9) {
          for (var e = (t / 1e6).toFixed(3), i = 0, n = 0; n < e.length; n++)
            if ('.' == e[n]) {
              i = n;
              break;
            }
          return (e = i >= 4 ? e.substr(0, 4) : e.substr(0, 5)) + 'M';
        }
        for (var e = (t / 1e9).toFixed(3), i = 0, n = 0; n < e.length; n++)
          if ('.' == e[n]) {
            i = n;
            break;
          }
        return (e = i >= 4 ? e.substr(0, 4) : e.substr(0, 5)) + 'B';
      }),
      e
    );
  })();
  t.UI_Money = e;
})(uiscript || (uiscript = {}));