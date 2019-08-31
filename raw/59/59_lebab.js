let basic;
!(t => {
  const e = (() => (function() {
    (this.key = null), (this.val = null);
  }))();
  t.Pair = e;
})(basic || (basic = {}));