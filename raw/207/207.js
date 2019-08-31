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
      var t = e.call(this, new ui.common.shimingrenzhengUI()) || this;
      return (i.Inst = t), t;
    }
    return (
      __extends(i, e),
      (i.prototype.onCreate = function() {
        var t = this;
        (this.root = this.me.getChildByName('root')),
          (this.input_name = this.root
            .getChildByName('input_name')
            .getChildByName('txtinput')),
          (this.input_id = this.root
            .getChildByName('input_id')
            .getChildByName('txtinput')),
          (this.root.getChildByName('btn').clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.renzheng();
            },
            null,
            !1
          )),
          (this.root.getChildByName(
            'btn_close'
          ).clickHandler = Laya.Handler.create(
            this,
            function() {
              t.locking || t.close();
            },
            null,
            !1
          ));
      }),
      (i.prototype.show = function() {
        var e = this;
        (this.locking = !0),
          (this.enable = !0),
          t.UIBase.anim_pop_out(
            this.root,
            Laya.Handler.create(this, function() {
              e.locking = !1;
            })
          );
      }),
      (i.prototype.close = function() {
        var e = this;
        (this.locking = !0),
          t.UIBase.anim_pop_hide(
            this.root,
            Laya.Handler.create(this, function() {
              (e.locking = !1), (e.enable = !1);
            })
          );
      }),
      (i.prototype.test_dalu_id = function(t) {
        if (
          !/^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/.test(
            t
          )
        )
          return !1;
        var e = t.substr(6, 4),
          i = t.substr(10, 2),
          n = t.substr(12, 2),
          a = Date.parse(i + '-' + n + '-' + e),
          r = Date.now(),
          s = new Date(e, i, 0).getDate();
        if (a > r || n > s) return !1;
        for (
          var o = new Array(
              7,
              9,
              10,
              5,
              8,
              4,
              2,
              1,
              6,
              3,
              7,
              9,
              10,
              5,
              8,
              4,
              2
            ),
            l = new Array(
              '1',
              '0',
              'X',
              '9',
              '8',
              '7',
              '6',
              '5',
              '4',
              '3',
              '2'
            ),
            h = t.split(''),
            c = 0,
            u = 0;
          u < 17;
          u++
        )
          c += parseInt(h[u]) * o[u];
        return h[17].toUpperCase() == l[c % 11].toUpperCase();
      }),
      (i.prototype.test_hk_id = function(t) {
        if (10 != t.length) return !1;
        if ('(' != t.charAt(7) && '（' != t.charAt(7)) return !1;
        if (')' != t.charAt(9) && '）' != t.charAt(9)) return !1;
        var e = 0;
        t = t.toUpperCase();
        var i = 'A'.charCodeAt(0),
          n = 'Z'.charCodeAt(0),
          a = '0'.charCodeAt(0),
          r = t.charCodeAt(0);
        if (r < i || r > n) return !1;
        e += 8 * (r - i + 1);
        for (var s = 1; s <= 6; s++) {
          var o = t.charCodeAt(s) - a;
          if (o < 0 || o > 9) return !1;
          e += o * (8 - s);
        }
        return 0 == (e %= 11)
          ? '0' == t.charAt(8)
          : 1 == e
          ? 'A' == t.charAt(8)
          : 11 - e == t.charCodeAt(8) - a;
      }),
      (i.prototype.test_tw_id = function(t) {
        if (10 != t.length) return !1;
        t = t.toUpperCase();
        for (
          var e = 'ABCDEFGHJKLMNPQRSTUVXYWZIO', i = -1, n = 0;
          n < e.length;
          n++
        )
          if (e.charAt(n) === t.charAt(0)) {
            i = n;
            break;
          }
        if (-1 == i) return !1;
        for (
          var a = i + 10,
            r = Math.floor(a / 10),
            s = a % 10,
            o = '0'.charCodeAt(0),
            l = r + 9 * s,
            n = 1;
          n <= 8;
          n++
        ) {
          var h = t.charCodeAt(n) - o;
          if (h < 0 || h > 9) return !1;
          l += h * (9 - n);
        }
        var c = t.charCodeAt(9) - o;
        return !(c < 0 || c > 9) && l % 10 == (10 - c) % 10;
      }),
      (i.prototype.test_aomen_id = function(t) {
        return /^[1|5|7][0-9]{6}\([0-9Aa]\)/.test(t);
      }),
      (i.prototype.test_id = function(t) {
        return (
          !!this.test_dalu_id(t) ||
          (!!this.test_hk_id(t) ||
            (!!this.test_tw_id(t) || !!this.test_aomen_id(t)))
        );
      }),
      (i.prototype.renzheng = function() {
        var e = this.input_name.text;
        if (((e = e.replace('·', '')), /^([\u4e00-\u9fa5]){2,10}$/.test(e))) {
          this.test_id(this.input_id.text)
            ? (app.NetAgent.sendReq2Lobby(
                'Lobby',
                'updateIDCardInfo',
                { fullname: this.input_name.text, card_no: this.input_id.text },
                function(e, n) {
                  e || n.error
                    ? t.UIMgr.Inst.showNetReqError('updateIDCardInfo', e, n)
                    : ((i.renzhenged = !0),
                      t.UI_LightTips.Inst.show(
                        game.Tools.strOfLocalization(2182)
                      ));
                }
              ),
              this.close())
            : t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2183));
        } else t.UIMgr.Inst.ShowErrorInfo(game.Tools.strOfLocalization(2181));
      }),
      (i.renzhenged = !1),
      i
    );
  })(t.UIBase);
  t.UI_ShiMingRenZheng = e;
})(uiscript || (uiscript = {}));