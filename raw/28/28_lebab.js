let net;
!(t => {
  let e;
  !(t => {
    (t[(t.NULL = 0)] = 'NULL'),
      (t[(t.NOTIFY = 1)] = 'NOTIFY'),
      (t[(t.REQUEST = 2)] = 'REQUEST'),
      (t[(t.RESPONSE = 3)] = 'RESPONSE');
  })(e = t.HeaderType || (t.HeaderType = {}));
  const i = (() => () => {})();
  t.HeaderData = i;
  const n = (() => {
    function i() {}
    return (i.initWrapper = function() {
      (this.WrapperCtor = t.ProtobufManager.lookupType('lq.Wrapper')),
        console.log(`Wrapper is ${JSON.stringify(this.WrapperCtor)}`);
    }),
    (i.encodeHeaderData = ({type, reqIndex}) => {
      switch (type) {
        case e.REQUEST:
        case e.RESPONSE:
          return Uint8Array.from([type, 255 & reqIndex, reqIndex >> 8]);
        case e.NOTIFY:
          return Uint8Array.from([type]);
      }
      return Uint8Array.from([]);
    }),
    (i.encodeMessage = function(t) {
      const e = t.$type;
      return this.wrap(e.fullName, e.encode(t).finish());
    }),
    (i.decodeMessage = function(t) {
      const e = this.unwrap(t);
      return this.decode(e.name, e.data);
    }),
    (i.encodeRpc = function(t, e) {
      return this.wrap(t, e);
    }),
    (i.decodeRpc = function(t) {
      return this.unwrap(t);
    }),
    (i.wrap = function(t, e) {
      const i = this.WrapperCtor;
      const n = i.create({ name: t, data: e });
      return i.encode(n).finish();
    }),
    (i.unwrap = t => i.WrapperCtor.decode(t)),
    (i.decode = (e, i) => {
      const n = t.ProtobufManager.lookupType(e);
      if (!n) throw new Error(`ERR_CANNOT_FIND_MESSAGE_TYPE, ${e}`);
      return n.decode(i);
    }),
    i
  ;
  })();
  t.MessageWrapper = n;
})(net || (net = {}));