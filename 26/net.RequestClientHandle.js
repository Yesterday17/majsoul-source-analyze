var net;
!(t => {
  var e = (() => () => {})();
  t.WaitingEvent = e;

  class RequestClientHandle {
    constructor(t, e) {
      this._delay = 0;
      this.waitingData = {};
      this.checkArray = [];
      this.delayLst = [];
      this._responseErrorHandler = t;
      this._networkDelayHandler = e;
      Laya.timer.loop(500, this, this.loop);
    }

    emitResponse(t, e) {
      var i = this.waitingData[t];
      if (i) {
        var n = Date.now();
        this.delayLst.push({ timestamp: n, delay: n - i.requestTime });
        this.waitingData[t] = null;
        if (GameMgr.inRelease)
          try {
            i.cb(null, e);
          } catch (t) {
            app.Log.Error(`net request handle error:${t}`);
            this._responseErrorHandler &&
              this._responseErrorHandler.runWith({
                method: i.method,
                info: t
              });
          }
        else i.cb(null, e);
      }
    }

    waitResponseCb(t, e, i) {
      var n = { method: t, index: e, requestTime: Date.now(), cb: i };
      this.waitingData[e] = n;
      this.checkArray.push({
        timeout: n.requestTime + 15e3,
        index: n.index
      });
    }

    loop() {
      var t = this.calcu_preresponse_delay();
      var e = this.check_waiting_response();
      var i = 0;
      var n = 0;
      i += 0.3 * t;
      t >= 0 && (n += 0.3);
      i += e;
      e >= 0 && (n += 1);
      i /= n;
      n > 0 && (this._delay = i);
      this._networkDelayHandler &&
        this._networkDelayHandler.runWith(this._delay);
    }

    calcu_preresponse_delay() {
      e += this.delayLst[a].delay;
      for (
        var t = Date.now(), e = 0, i = 0, n = 0, a = 0;
        a < this.delayLst.length;
        a++
      )
        this.delayLst[a].timestamp + 2e3 < t ? n++ : i++;

      n > 0 &&
        (n == this.delayLst.length
          ? (this.delayLst = [])
          : this.delayLst.slice(n));

      return i > 0 ? e / i : -1;
    }

    check_waiting_response() {
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
          this.waitingData[a.index] = null;
          i = 5e3;
          this.delayLst.push({ delay: 1e4, timestamp: t });
          r.cb(new Error("TIMEOUT"));
        } else e += 1;
      }

      e > 0 &&
        (e == this.checkArray.length
          ? (this.checkArray = [])
          : (this.checkArray = this.checkArray.slice(e)));

      return i;
    }
  }
  t.RequestClientHandle = RequestClientHandle;
})(net || (net = {}));
