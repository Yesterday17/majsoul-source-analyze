let uiscript;
!(t => {
  const e = (t => {
    function e() {
      const e = t.call(this, new ui.mj.chipenghuUI()) || this;
      return (
        (e.container_Detail = null),
        (e.btn_cancel = null),
        (e.btn_detail_back = null),
        (e.label_title = null),
        (e.op_btns = new Object()),
        e
      );
    }
    return __extends(e, t),
    (e.prototype.onCreate = function() {
      const t = this.me.getChildByName('container_btns');
      this.container_btns = t;
      for (i = 0; i < this.container_btns.numChildren; i++) {
        const e = this.container_btns.getChildAt(i);
        (this.op_btns[e.name] = e),
          (e.visible = false),
          (e.clickHandler = new Laya.Handler(this, this.onClickOpBtn, [
            e.name
          ]));
      }
      (this.container_Detail = this.me.getChildByName('container_detail')),
        (this.container_Detail.visible = false);
      for (var i = 0; i < 6; i++) {
        const n = this.container_Detail
          .getChildByName('container_chooses')
          .getChildByName(`c${i}`);
        (n.visible = false),
          (n.clickHandler = laya.utils.Handler.create(
            this,
            this.onClickDetail,
            [i],
            false
          ));
      }
      (this.btn_detail_back = this.container_Detail.getChildByName(
        'btn_back'
      )),
        (this.btn_detail_back.clickHandler = new Laya.Handler(
          this,
          this.onDetailBack,
          null,
          false
        )),
        (this.btn_cancel = this.me.getChildByName('btn_cancel')),
        (this.btn_cancel.visible = false),
        (this.label_title = this.container_Detail
          .getChildByName('container_title')
          .getChildByName('lab_title')),
        (this.label_title.text = '');
    }),
    (e.prototype.show = t => {}),
    (e.prototype.onClickOpBtn = t => {}),
    (e.prototype.onClickDetail = t => {}),
    (e.prototype.onDetailBack = () => {}),
    (e.prototype.showOp = function(t) {
      (this.container_Detail.visible = false),
        (this.container_btns.visible = true),
        (this.btn_cancel.visible = false);
      for (
        let e = this.container_btns.width, i = 0, n = 0, a = this.container_btns.numChildren - 1;
        a >= 0;
        a--
      ) {
        for (
          var r = false, s = this.container_btns.getChildAt(a), o = 0;
          o < t.length;
          o++
        )
          if (t[o] == s.name) {
            r = true;
            break;
          }
        r
          ? ((s.visible = true),
            (s.x = e - s.width),
            (s.y = i),
            (e -= s.width + 0),
            3 == ++n &&
              ((i -= 180), (e = this.container_btns.width), (n = 0)))
          : (s.visible = false);
      }
      Laya.Tween.from(this.container_btns, { x: 940, alpha: 0 }, 160);
    }),
    (e.prototype.showDetail = function(t, e) {
      (this.container_btns.visible = false), (this.btn_cancel.visible = false);
      const i = this.container_Detail.getChildByName('container_title');

      const n =
        (i.getChildByName('lab_title'),
        this.container_Detail.getChildByName('container_chooses'));

      let a = 0;
      const r = n.getChildByName('c0').getChildByName('img0').width;
      const s = 0.5 * r;
      this.label_title.text = t;
      for (
        let o = `myres2/mjp/${GameMgr.Inst.mjp_view}/ui/`, l = 0;
        l < 6;
        l++
      ) {
        const h = n.getChildByName(`c${l}`);
        if (l < e.length) {
          for (var c = e[l].split('|'), u = 0; u < 4; u++) {
            const _ = h.getChildByName(`img${u}`);
            u < c.length
              ? ((_.skin = game.Tools.localUISrc(`${o + c[u]}.png`)),
                (_.x = u * r),
                (_.y = 0),
                (_.visible = true))
              : (_.visible = false);
          }
          (h.width = c.length * r),
            0 != l && (a += s),
            (h.x = a),
            (a += h.width),
            (h.y = -23),
            (h.visible = true);
        } else h.visible = false;
      }
      (n.width = a),
        (this.container_Detail.width = a + 240),
        (i.x = 0.5 * this.container_Detail.width),
        (n.x = 120),
        (this.btn_detail_back.x = this.container_Detail.width - 56),
        (this.container_Detail.visible = true),
        (this.container_Detail.x = 960 - this.container_Detail.width / 2);
    }),
    e
  ;
  })(t.UIBase);
  t.UI_PlayerOperation = e;
})(uiscript || (uiscript = {}));