var net;
!(function(t) {
  var e = (function() {
    return function() {};
  })();
  t.WaitingEvent = e;
  var i = (function() {
    function t(t, e) {
      (this._delay = 0),
        (this.waitingData = {}),
        (this.checkArray = []),
        (this.delayLst = []),
        (this._responseErrorHandler = t),
        (this._networkDelayHandler = e),
        Laya.timer.loop(500, this, this.loop);
    }
    return (
      (t.prototype.emitResponse = function(t, e) {
        var i = this.waitingData[t];
        if (i) {
          var n = Date.now();
          if (
            (this.delayLst.push({ timestamp: n, delay: n - i.requestTime }),
            (this.waitingData[t] = null),
            GameMgr.inRelease)
          )
            try {
              i.cb(null, e);
            } catch (t) {
              app.Log.Error('net request handle error:' + t),
                this._responseErrorHandler &&
                  this._responseErrorHandler.runWith({
                    method: i.method,
                    info: t
                  });
            }
          else i.cb(null, e);
        }
      }),
      (t.prototype.waitResponseCb = function(t, e, i) {
        var n = { method: t, index: e, requestTime: Date.now(), cb: i };
        (this.waitingData[e] = n),
          this.checkArray.push({
            timeout: n.requestTime + 15e3,
            index: n.index
          });
      }),
      (t.prototype.loop = function() {
        var t = this.calcu_preresponse_delay(),
          e = this.check_waiting_response(),
          i = 0,
          n = 0;
        t >= 0 && ((i += 0.3 * t), (n += 0.3)),
          e >= 0 && ((i += e), (n += 1)),
          n > 0 && ((i /= n), (this._delay = i)),
          this._networkDelayHandler &&
            this._networkDelayHandler.runWith(this._delay);
      }),
      (t.prototype.calcu_preresponse_delay = function() {
        for (
          var t = Date.now(), e = 0, i = 0, n = 0, a = 0;
          a < this.delayLst.length;
          a++
        )
          this.delayLst[a].timestamp + 2e3 < t
            ? n++
            : ((e += this.delayLst[a].delay), i++);
        return (
          n > 0 &&
            (n == this.delayLst.length
              ? (this.delayLst = [])
              : this.delayLst.slice(n)),
          i > 0 ? e / i : -1
        );
      }),
      (t.prototype.check_waiting_response = function() {
        for (
          var t = Date.now(), e = 0, i = -1, n = 0;
          n < this.checkArray.length;
          n++
        ) {
          var a = this.checkArray[n];
          if (this.waitingData[a.index]) {
            if (t < a.timeout) {
              i < 0 && (i = t - this.waitingData[a.index].requestTime);
              break;
            }
            e += 1;
            var r = this.waitingData[a.index];
            (this.waitingData[a.index] = null),
              (i = 5e3),
              this.delayLst.push({ delay: 1e4, timestamp: t }),
              r.cb(new Error('TIMEOUT'));
          } else e += 1;
        }
        return (
          e > 0 &&
            (e == this.checkArray.length
              ? (this.checkArray = [])
              : (this.checkArray = this.checkArray.slice(e))),
          i
        );
      }),
      t
    );
  })();
  t.RequestClientHandle = i;
})(net || (net = {}));