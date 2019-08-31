var net;
!(function(t) {
  var e;
  !(function(t) {
    (t[(t.NULL = 0)] = 'NULL'),
      (t[(t.NOTIFY = 1)] = 'NOTIFY'),
      (t[(t.REQUEST = 2)] = 'REQUEST'),
      (t[(t.RESPONSE = 3)] = 'RESPONSE');
  })((e = t.HeaderType || (t.HeaderType = {})));
  var i = (function() {
    return function() {};
  })();
  t.HeaderData = i;
  var n = (function() {
    function i() {}
    return (
      (i.initWrapper = function() {
        (this.WrapperCtor = t.ProtobufManager.lookupType('lq.Wrapper')),
          console.log('Wrapper is ' + JSON.stringify(this.WrapperCtor));
      }),
      (i.encodeHeaderData = function(t) {
        switch (t.type) {
          case e.REQUEST:
          case e.RESPONSE:
            return Uint8Array.from([t.type, 255 & t.reqIndex, t.reqIndex >> 8]);
          case e.NOTIFY:
            return Uint8Array.from([t.type]);
        }
        return Uint8Array.from([]);
      }),
      (i.encodeMessage = function(t) {
        var e = t.$type;
        return this.wrap(e.fullName, e.encode(t).finish());
      }),
      (i.decodeMessage = function(t) {
        var e = this.unwrap(t);
        return this.decode(e.name, e.data);
      }),
      (i.encodeRpc = function(t, e) {
        return this.wrap(t, e);
      }),
      (i.decodeRpc = function(t) {
        return this.unwrap(t);
      }),
      (i.wrap = function(t, e) {
        var i = this.WrapperCtor,
          n = i.create({ name: t, data: e });
        return i.encode(n).finish();
      }),
      (i.unwrap = function(t) {
        return i.WrapperCtor.decode(t);
      }),
      (i.decode = function(e, i) {
        var n = t.ProtobufManager.lookupType(e);
        if (!n) throw new Error('ERR_CANNOT_FIND_MESSAGE_TYPE, ' + e);
        return n.decode(i);
      }),
      i
    );
  })();
  t.MessageWrapper = n;
})(net || (net = {}));