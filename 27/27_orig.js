var net;
!(function(t) {
  var e = (function() {
    function t() {}
    return (
      (t.loadProto = function(t) {
        (this.root = protobuf.Root.fromJSON(t)),
          this.root.resolveAll(),
          console.log('loadProto finished');
      }),
      (t.lookup = function(t, e) {
        return this.root.lookup(t, e);
      }),
      (t.lookupType = function(t) {
        return this.root.lookupType(t);
      }),
      (t.lookupEnum = function(t) {
        return this.root.lookupEnum(t);
      }),
      (t.lookupTypeOrEnum = function(t) {
        return this.root.lookupTypeOrEnum(t);
      }),
      (t.lookupService = function(t) {
        return this.root.lookupService(t);
      }),
      (t.lookupMethod = function(t) {
        if (('string' == typeof t && (t = t.split('.')), 0 === t.length))
          return null;
        var e = this.lookupService(t.slice(0, -1));
        if (!e) return null;
        var i = t[t.length - 1];
        return e.methods[i];
      }),
      t
    );
  })();
  t.ProtobufManager = e;
})(net || (net = {}));