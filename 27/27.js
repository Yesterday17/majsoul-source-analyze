var net;
!(t => {
  var e = (() => {
    class t {
      static loadProto(t) {
        this.root = protobuf.Root.fromJSON(t);
        this.root.resolveAll();
        console.log('loadProto finished');
      }

      static lookup(t, e) {
        return this.root.lookup(t, e);
      }

      static lookupType(t) {
        return this.root.lookupType(t);
      }

      static lookupEnum(t) {
        return this.root.lookupEnum(t);
      }

      static lookupTypeOrEnum(t) {
        return this.root.lookupTypeOrEnum(t);
      }

      static lookupService(t) {
        return this.root.lookupService(t);
      }

      static lookupMethod(t) {
        'string' == typeof t && (t = t.split('.'));
        if ((0 === t.length))
          return null;
        var e = this.lookupService(t.slice(0, -1));
        if (!e) return null;
        var i = t[t.length - 1];
        return e.methods[i];
      }
    }

    return t;
  })();
  t.ProtobufManager = e;
})(net || (net = {}));