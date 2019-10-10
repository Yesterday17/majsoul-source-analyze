var net;
!(t => {
  var e;
  !(t => {
    t[(t.NULL = 0)] = "NULL";
    t[(t.NOTIFY = 1)] = "NOTIFY";
    t[(t.REQUEST = 2)] = "REQUEST";
    t[(t.RESPONSE = 3)] = "RESPONSE";
  })((e = t.HeaderType || (t.HeaderType = {})));
  var i = (() => () => {})();
  t.HeaderData = i;

  class MessageWrapper {
    static initWrapper() {
      this.WrapperCtor = t.ProtobufManager.lookupType("lq.Wrapper");
      console.log(`Wrapper is ${JSON.stringify(this.WrapperCtor)}`);
    }

    static encodeMessage(message) {
      var e = message.$type;
      return this.wrap(e.fullName, e.encode(message).finish());
    }

    static decodeMessage(msg) {
      var wrapper = this.unwrap(msg);
      return this.decode(wrapper.name, wrapper.data);
    }

    static encodeRpc(name, data) {
      return this.wrap(name, data);
    }

    static decodeRpc(msg) {
      return this.unwrap(msg);
    }

    static wrap(name, data) {
      var i = this.WrapperCtor;
      var data = i.create({ name: name, data: data });
      return i.encode(data).finish();
    }
  }

  MessageWrapper.encodeHeaderData = ({ type, reqIndex }) => {
    switch (type) {
      case e.REQUEST:
      case e.RESPONSE:
        return new Uint8Array([type, 255 & reqIndex, reqIndex >> 8]);
      case e.NOTIFY:
        return new Uint8Array([type]);
    }
    return new Uint8Array([]);
  };

  MessageWrapper.unwrap = msg => MessageWrapper.WrapperCtor.decode(msg);

  MessageWrapper.decode = (type, data) => {
    var n = t.ProtobufManager.lookupType(type);
    if (!n) throw new Error(`ERR_CANNOT_FIND_MESSAGE_TYPE, ${type}`);
    return n.decode(data);
  };

  t.MessageWrapper = MessageWrapper;
})(net || (net = {}));
