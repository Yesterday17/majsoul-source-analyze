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
  var e = (function(t) {
    function e() {
      var e = t.call(this, new ui.mj.chipenghuUI()) || this;
      return (
        (e.container_Detail = null),
        (e.btn_cancel = null),
        (e.btn_detail_back = null),
        (e.label_title = null),
        (e.op_btns = new Object()),
        e
      );
    }
    return (
      __extends(e, t),
      (e.prototype.onCreate = function() {
        var t = this.me.getChildByName('container_btns');
        this.container_btns = t;
        for (i = 0; i < this.container_btns.numChildren; i++) {
          var e = this.container_btns.getChildAt(i);
          (this.op_btns[e.name] = e),
            (e.visible = !1),
            (e.clickHandler = new Laya.Handler(this, this.onClickOpBtn, [
              e.name
            ]));
        }
        (this.container_Detail = this.me.getChildByName('container_detail')),
          (this.container_Detail.visible = !1);
        for (var i = 0; i < 6; i++) {
          var n = this.container_Detail
            .getChildByName('container_chooses')
            .getChildByName('c' + i);
          (n.visible = !1),
            (n.clickHandler = laya.utils.Handler.create(
              this,
              this.onClickDetail,
              [i],
              !1
            ));
        }
        (this.btn_detail_back = this.container_Detail.getChildByName(
          'btn_back'
        )),
          (this.btn_detail_back.clickHandler = new Laya.Handler(
            this,
            this.onDetailBack,
            null,
            !1
          )),
          (this.btn_cancel = this.me.getChildByName('btn_cancel')),
          (this.btn_cancel.visible = !1),
          (this.label_title = this.container_Detail
            .getChildByName('container_title')
            .getChildByName('lab_title')),
          (this.label_title.text = '');
      }),
      (e.prototype.show = function(t) {}),
      (e.prototype.onClickOpBtn = function(t) {}),
      (e.prototype.onClickDetail = function(t) {}),
      (e.prototype.onDetailBack = function() {}),
      (e.prototype.showOp = function(t) {
        (this.container_Detail.visible = !1),
          (this.container_btns.visible = !0),
          (this.btn_cancel.visible = !1);
        for (
          var e = this.container_btns.width,
            i = 0,
            n = 0,
            a = this.container_btns.numChildren - 1;
          a >= 0;
          a--
        ) {
          for (
            var r = !1, s = this.container_btns.getChildAt(a), o = 0;
            o < t.length;
            o++
          )
            if (t[o] == s.name) {
              r = !0;
              break;
            }
          r
            ? ((s.visible = !0),
              (s.x = e - s.width),
              (s.y = i),
              (e -= s.width + 0),
              3 == ++n &&
                ((i -= 180), (e = this.container_btns.width), (n = 0)))
            : (s.visible = !1);
        }
        Laya.Tween.from(this.container_btns, { x: 940, alpha: 0 }, 160);
      }),
      (e.prototype.showDetail = function(t, e) {
        (this.container_btns.visible = !1), (this.btn_cancel.visible = !1);
        var i = this.container_Detail.getChildByName('container_title'),
          n =
            (i.getChildByName('lab_title'),
            this.container_Detail.getChildByName('container_chooses')),
          a = 0,
          r = n.getChildByName('c0').getChildByName('img0').width,
          s = 0.5 * r;
        this.label_title.text = t;
        for (
          var o = 'myres2/mjp/' + GameMgr.Inst.mjp_view + '/ui/', l = 0;
          l < 6;
          l++
        ) {
          var h = n.getChildByName('c' + l);
          if (l < e.length) {
            for (var c = e[l].split('|'), u = 0; u < 4; u++) {
              var _ = h.getChildByName('img' + u);
              u < c.length
                ? ((_.skin = game.Tools.localUISrc(o + c[u] + '.png')),
                  (_.x = u * r),
                  (_.y = 0),
                  (_.visible = !0))
                : (_.visible = !1);
            }
            (h.width = c.length * r),
              0 != l && (a += s),
              (h.x = a),
              (a += h.width),
              (h.y = -23),
              (h.visible = !0);
          } else h.visible = !1;
        }
        (n.width = a),
          (this.container_Detail.width = a + 240),
          (i.x = 0.5 * this.container_Detail.width),
          (n.x = 120),
          (this.btn_detail_back.x = this.container_Detail.width - 56),
          (this.container_Detail.visible = !0),
          (this.container_Detail.x = 960 - this.container_Detail.width / 2);
      }),
      e
    );
  })(t.UIBase);
  t.UI_PlayerOperation = e;
})(uiscript || (uiscript = {}));