var net;
!(t => {
  var e;
  !(t => {
    t[(t.NULL = 0)] = 'NULL';
    t[(t.NOTIFY = 1)] = 'NOTIFY';
    t[(t.REQUEST = 2)] = 'REQUEST';
    t[(t.RESPONSE = 3)] = 'RESPONSE';
  })(e = t.HeaderType || (t.HeaderType = {}));
  var i = (() => () => {})();
  t.HeaderData = i;
  var n = (() => {
    class i {
      static initWrapper() {
        this.WrapperCtor = t.ProtobufManager.lookupType('lq.Wrapper');
        console.log(`Wrapper is ${JSON.stringify(this.WrapperCtor)}`);
      }

      static encodeMessage(t) {
        var e = t.$type;
        return this.wrap(e.fullName, e.encode(t).finish());
      }

      static decodeMessage(t) {
        var e = this.unwrap(t);
        return this.decode(e.name, e.data);
      }

      static encodeRpc(t, e) {
        return this.wrap(t, e);
      }

      static decodeRpc(t) {
        return this.unwrap(t);
      }

      static wrap(t, e) {
        var i = this.WrapperCtor;
        var n = i.create({ name: t, data: e });
        return i.encode(n).finish();
      }
    }

    i.encodeHeaderData = ({type, reqIndex}) => {
      switch (type) {
        case e.REQUEST:
        case e.RESPONSE:
          return new Uint8Array([type, 255 & reqIndex, reqIndex >> 8]);
        case e.NOTIFY:
          return new Uint8Array([type]);
      }
      return new Uint8Array([]);
    };

    i.unwrap = t => i.WrapperCtor.decode(t);

    i.decode = (e, i) => {
      var n = t.ProtobufManager.lookupType(e);
      if (!n) throw new Error(`ERR_CANNOT_FIND_MESSAGE_TYPE, ${e}`);
      return n.decode(i);
    };

    return i;
  })();
  t.MessageWrapper = n;
})(net || (net = {}));