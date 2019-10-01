var uiscript;
!(function(t) {
  var e = (function() {
    function t(t) {
      (this.me = null),
        (this.content = null),
        (this.info = null),
        (this._info = ''),
        (this._index = 0),
        (this._start_time = 0),
        (this._word_span = 50),
        (this._speed = 1),
        (this._speed_multi = 1),
        (this.me = t),
        (this.content = this.me.getChildByName('content')),
        (this.info = this.content.getChildByName('info')),
        (this.content.vScrollBarSkin = '');
    }
    return (
      (t.prototype.show = function(t, e) {
        var i = this;
        void 0 === e && (e = 1),
          Laya.timer.clearAll(this),
          1 == e && 'en' == GameMgr.client_language && (e = 3),
          (this._speed = e),
          (this._speed_multi = 1),
          (this.info.text = ''),
          (this._info = t),
          (this._index = 0),
          (this.me.visible = !0),
          (this.me.alpha = 0),
          Laya.Tween.to(this.me, { alpha: 1 }, 200, null, null, 0, !0),
          (this._start_time = Laya.timer.currTimer),
          (this._word_span = 50),
          (this.info.y = 10),
          (this.info.width = this.content.width),
          (this.content.mouseEnabled = !1),
          Laya.timer.once(200, this, function() {
            i._nextchar();
          });
      }),
      (t.prototype._nextchar = function() {
        if (this._info.length <= this._index)
          return this.content.refresh(), void (this.content.mouseEnabled = !0);
        if ('[' == this._info[this._index]) {
          for (var t = -1, e = this._index + 1; e < this._info.length; e++)
            if (']' == this._info[e]) {
              t = e;
              break;
            }
          if (-1 == t) return;
          n = parseInt(this._info.substring(this._index + 1, t));
          this._index = t + 1;
          var i = Laya.timer.currTimer - this._start_time;
          i >= n
            ? this._nextchar()
            : Laya.timer.once(n - i, this, this._nextchar);
        } else if ('<' == this._info[this._index]) {
          for (var t = -1, e = this._index + 1; e < this._info.length; e++)
            if ('>' == this._info[e]) {
              t = e;
              break;
            }
          if (-1 == t) return;
          n = parseInt(this._info.substring(this._index + 1, t));
          (this._index = t + 1), (this._word_span = n), this._nextchar();
        } else if ('{' == this._info[this._index]) {
          for (var t = -1, e = this._index + 1; e < this._info.length; e++)
            if ('}' == this._info[e]) {
              t = e;
              break;
            }
          if (-1 == t) return;
          var n = parseFloat(this._info.substring(this._index + 1, t));
          (this._index = t + 1),
            n > 0.1 && n < 1e3 && (this._speed_multi = n),
            this._nextchar();
        } else {
          var a = this.info.text,
            r = this._speed * this._speed_multi,
            s = r,
            o = function(t) {
              return ' ' != t && '\t' != t && '\r' != t && '\n' != t;
            };
          if ('en' == GameMgr.client_language)
            for (
              ;
              this._index < this._info.length &&
              s > 0 &&
              '[' != this._info[this._index] &&
              '<' != this._info[this._index] &&
              '{' != this._info[this._index];

            )
              if (o(this._info[this._index])) {
                for (
                  var l = '', e = this._index;
                  e < this._info.length && o(this._info[e]);

                )
                  l += this._info[e++];
                this.info.text = a;
                var h = this.info.textField.textHeight;
                this.info.text = a + l + ' ';
                var c = this.info.textField.textHeight;
                if ((a.length > 0 && h != c && (a += '\n'), l.length > s)) {
                  (a += l.substr(0, s)), (this._index += s), (s = 0);
                  break;
                }
                (a += l), (s -= l.length), (this._index += l.length);
              } else (a += this._info[this._index]), this._index++, s--;
          else
            for (
              e = 0;
              e < r &&
              this._index < this._info.length &&
              ('[' != this._info[this._index] &&
                '<' != this._info[this._index] &&
                '{' != this._info[this._index]);
              e++
            )
              (a += this._info[this._index]), this._index++;
          (this.info.text = a),
            (this.info.height = this.info.textField.textHeight),
            this.info.height > this.content.height
              ? (this.info.y = this.content.height - this.info.height + 10)
              : (this.info.y = 10),
            Laya.timer.once(this._word_span, this, this._nextchar);
        }
      }),
      (t.prototype.close = function(t) {
        var e = this;
        t
          ? ((this.me.visible = !1), Laya.timer.clearAll(this))
          : (Laya.Tween.to(this.me, { alpha: 0 }, 200, null, null, 0, !0),
            Laya.timer.once(200, this, function() {
              (e.me.visible = !1), Laya.timer.clearAll(e);
            }));
      }),
      t
    );
  })();
  t.UI_Character_Chat = e;
})(uiscript || (uiscript = {}));