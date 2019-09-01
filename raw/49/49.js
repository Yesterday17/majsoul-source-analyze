var mjcore;
!(function(t) {
  var e;
  !(function(t) {
    (t[(t.p = 0)] = 'p'),
      (t[(t.m = 1)] = 'm'),
      (t[(t.s = 2)] = 's'),
      (t[(t.z = 3)] = 'z');
  })((e = t.E_MJPai || (t.E_MJPai = {})));
  var i = (function() {
    function t() {}
    return (
      (t.prototype.IsZ = function() {
        return this.type == e.z;
      }),
      (t.prototype.IsLaoTou = function() {
        return this.type != e.z && (1 == this.index || 9 == this.index);
      }),
      (t.prototype.IsYao = function() {
        return this.IsZ() || this.IsLaoTou();
      }),
      (t.prototype.IsSiXi = function() {
        return this.IsZ() && this.index >= 1 && this.index <= 4;
      }),
      (t.prototype.IsSanYan = function() {
        return this.IsZ() && this.index >= 5 && this.index <= 7;
      }),
      (t.prototype.Clone = function() {
        var e = new t();
        return (
          (e.type = this.type), (e.index = this.index), (e.dora = this.dora), e
        );
      }),
      (t.prototype.numValue = function() {
        var t = 0;
        switch (this.type) {
          case e.m:
            t = this.index;
            break;
          case e.p:
            t = 1e4 + this.index;
            break;
          case e.s:
            t = 2e4 + this.index;
            break;
          case e.z:
            t = 3e4 + 10 * this.index;
        }
        return t;
      }),
      (t.Create = function(i) {
        var n = new t();
        switch (
          ('0' == i.charAt(0)
            ? ((n.dora = true), (n.index = 5))
            : ((n.dora = false), (n.index = +i.charAt(0))),
          i.charAt(1))
        ) {
          case 'z':
            n.type = e.z;
            break;
          case 'm':
            n.type = e.m;
            break;
          case 's':
            n.type = e.s;
            break;
          case 'p':
            n.type = e.p;
        }
        return n;
      }),
      (t.RandomCreate = function() {
        var i = new t(),
          n = Math.random();
        return (
          n < 0.22
            ? ((i.type = e.z), (i.index = Math.floor(7 * Math.random()) + 1))
            : ((i.type = n < 0.48 ? e.p : n < 0.74 ? e.s : e.m),
              (i.index = Math.floor(9 * Math.random()) + 1)),
          i
        );
      }),
      (t.isSame = function(t, e) {
        return t.type == e.type && t.index == e.index && t.dora == e.dora;
      }),
      (t.Distance = function(t, e) {
        return t.numValue() - e.numValue();
      }),
      (t.DoraMet = function(t, i) {
        if (t.type != i.type) return false;
        var n = i.index + 1;
        return (
          view.DesktopMgr.Inst.rule_mode == view.ERuleMode.Liqi4
            ? i.type == e.z
              ? i.index <= 4
                ? 5 == n && (n = 1)
                : 8 == n && (n = 5)
              : 10 == n && (n = 1)
            : view.DesktopMgr.Inst.rule_mode == view.ERuleMode.Liqi3 &&
              (i.type == e.z
                ? i.index <= 4
                  ? 5 == n && (n = 1)
                  : 8 == n && (n = 5)
                : i.type == e.s || i.type == e.p
                ? 10 == n && (n = 1)
                : (10 == n && (n = 1), 2 == n && (n = 9))),
          n == t.index
        );
      }),
      (t.prototype.toString = function() {
        var t = this.dora ? '0' : this.index.toString();
        switch (this.type) {
          case e.m:
            t += 'm';
            break;
          case e.p:
            t += 'p';
            break;
          case e.s:
            t += 's';
            break;
          default:
            t += 'z';
        }
        return t;
      }),
      t
    );
  })();
  t.MJPai = i;
  var n = (function() {
    return function() {};
  })();
  t.MJQiPai = n;
  var a;
  !(function(t) {
    (t[(t.shunzi = 0)] = 'shunzi'),
      (t[(t.kezi = 1)] = 'kezi'),
      (t[(t.gang_ming = 2)] = 'gang_ming'),
      (t[(t.gang_an = 3)] = 'gang_an'),
      (t[(t.babei = 4)] = 'babei');
  })((a = t.E_Ming || (t.E_Ming = {})));
  var r = (function() {
    function t() {
      (this.pais = []), (this.from = []);
    }
    return (
      (t.prototype.Clone = function() {
        var e = new t();
        (e.type = this.type), (e.pais = []);
        for (i = 0; i < this.pais.length; i++)
          e.pais.push(this.pais[i].Clone());
        e.from = [];
        for (var i = 0; i < this.from.length; i++) e.from.push(this.from[i]);
        return e;
      }),
      (t.prototype.toString = function() {
        var t = '';
        switch (this.type) {
          case a.shunzi:
            t += 'shunzi(';
            break;
          case a.kezi:
            t += 'kezi(';
            break;
          case a.gang_ming:
            t += 'minggang(';
            break;
          case a.gang_an:
            t += 'angang(';
            break;
          case a.babei:
            t += 'babei(';
        }
        for (var e = 0; e < this.pais.length; e++)
          0 != e && (t += ','), (t += this.pais[e].toString());
        return (t += ')');
      }),
      t
    );
  })();
  t.MJMing = r;
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.dapai = 1)] = 'dapai'),
      (t[(t.eat = 2)] = 'eat'),
      (t[(t.peng = 3)] = 'peng'),
      (t[(t.an_gang = 4)] = 'an_gang'),
      (t[(t.ming_gang = 5)] = 'ming_gang'),
      (t[(t.add_gang = 6)] = 'add_gang'),
      (t[(t.liqi = 7)] = 'liqi'),
      (t[(t.zimo = 8)] = 'zimo'),
      (t[(t.rong = 9)] = 'rong'),
      (t[(t.jiuzhongjiupai = 10)] = 'jiuzhongjiupai'),
      (t[(t.babei = 11)] = 'babei');
  })(t.E_PlayOperation || (t.E_PlayOperation = {}));
  !(function(t) {
    (t[(t.none = 0)] = 'none'),
      (t[(t.jiuzhongjiupai = 1)] = 'jiuzhongjiupai'),
      (t[(t.sifenglianda = 2)] = 'sifenglianda'),
      (t[(t.sigangsanle = 3)] = 'sigangsanle'),
      (t[(t.sijializhi = 4)] = 'sijializhi'),
      (t[(t.sanjiahule = 5)] = 'sanjiahule');
  })(t.E_LiuJu || (t.E_LiuJu = {}));
  !(function(t) {
    (t[(t.liuju = 0)] = 'liuju'),
      (t[(t.shaoji = 1)] = 'shaoji'),
      (t[(t.zimo = 2)] = 'zimo'),
      (t[(t.rong = 3)] = 'rong'),
      (t[(t.fangchong = 4)] = 'fangchong'),
      (t[(t.beizimo = 5)] = 'beizimo');
  })(t.E_Round_Result || (t.E_Round_Result = {}));
  !(function(t) {
    (t[(t.E_Dadian_Title_none = 0)] = 'E_Dadian_Title_none'),
      (t[(t.E_Dadian_Title_manguan = 1)] = 'E_Dadian_Title_manguan'),
      (t[(t.E_Dadian_Title_tiaoman = 2)] = 'E_Dadian_Title_tiaoman'),
      (t[(t.E_Dadian_Title_beiman = 3)] = 'E_Dadian_Title_beiman'),
      (t[(t.E_Dadian_Title_sanbeiman = 4)] = 'E_Dadian_Title_sanbeiman'),
      (t[(t.E_Dadian_Title_yiman = 5)] = 'E_Dadian_Title_yiman'),
      (t[(t.E_Dadian_Title_yiman2 = 6)] = 'E_Dadian_Title_yiman2'),
      (t[(t.E_Dadian_Title_yiman3 = 7)] = 'E_Dadian_Title_yiman3'),
      (t[(t.E_Dadian_Title_yiman4 = 8)] = 'E_Dadian_Title_yiman4'),
      (t[(t.E_Dadian_Title_yiman5 = 9)] = 'E_Dadian_Title_yiman5'),
      (t[(t.E_Dadian_Title_yiman6 = 10)] = 'E_Dadian_Title_yiman6'),
      (t[(t.E_Dadian_Title_leijiyiman = 11)] = 'E_Dadian_Title_leijiyiman');
  })(t.E_Dadian_Title || (t.E_Dadian_Title = {}));
})(mjcore || (mjcore = {}));