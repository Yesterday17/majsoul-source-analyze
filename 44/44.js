var game;
!(t => {
  var e;
  !(t => {
    t[(t.common = 0)] = 'common';
    t[(t.scene_mj = 1)] = 'scene_mj';
    t[(t.lobby = 2)] = 'lobby';
    t[(t.ui_mj = 3)] = 'ui_mj';
    t[(t.entrance = 4)] = 'entrance';
  })(e = t.E_LoadType || (t.E_LoadType = {}));
  var i = (() => {
    function i() {}

    i.loadConfig = function() {
      var t = this;
      Laya.loader.load(
        'resconfig.json',
        Laya.Handler.create(this, () => {
          t._res_config = Laya.loader.getRes('resconfig.json');
        })
      );
    };

    i.getUrls = i => {
      var n = [];
      var a = 'res/atlas/';

      'chs' != GameMgr.client_language &&
        (a += `${GameMgr.client_language}/`);

      n = [`${a}myres/entrance.atlas`, `${a}myres/necessary.atlas`];

      'en' == GameMgr.client_language
            ? n.push('scene/mjdesktop_en.ls')
            : n.push('scene/mjdesktop.ls');

      (n = [
            `${a}myres/room.atlas`,
            `${a}myres/shop.atlas`,
            `${a}myres/sushe.atlas`,
            `${a}myres/lobby.atlas`,
            `${a}myres/match_lobby.atlas`,
            `${a}myres/treasure.atlas`,
            `${a}myres/yueka.atlas`,
            `${a}myres/get_character.atlas`,
            `${a}myres/activity_fanpai.atlas`
          ]).push(t.FrontEffect.scene_path);

      i == e.entrance
        ? ('jp' == GameMgr.client_language
        ? n.push('scene/entrance_jp.ls')
        : 'en' == GameMgr.client_language
        ? n.push('scene/entrance_en.ls')
        : n.push('scene/entrance.ls'))
        : i == e.common
        ? (n = [`${a}myres.atlas`, `${a}myres/bothui.atlas`])
        : i == e.scene_mj
        ? (n.push('scene/mjhandpai.ls'))
        : i == e.lobby
        ? (n.push(t.FrontEffect.scene2_path))
        : i == e.ui_mj &&
          (n = [
            `${a}myres/mjdesktop.atlas`,
            `${a}myres/mjdesktop/shengduan.atlas`
          ]);

      return n;
    };

    i._createItem = function(t) {
      function e(t) {
        h -= t;
        if ((l >= o.length)) {
          if (h <= 0) {
            r.loaded = !0;
            r.precent = 1;
            for (var e = 0; e < r.complete.length; e++)
              r.complete[e] && r.complete[e].run();
          }
        } else n();
      }

      class i {
        constructor(e) {
          r.precent = (e * o.length + s.length) / t.length;
          for (var i = 0; i < r.progress.length; i++)
            r.progress[i] && r.progress[i].runWith(r.precent);
        }

        static loadRes(t, e, i) {
          for (var n = t; this._items.length <= n; ) this._items.push(null);

          null == this._items[n] &&
            (this._items[n] = this._createItem(this.getUrls(t)));

          e && this._items[n].complete.push(e);
          i.once = !1;
          this._items[n].loaded
            ? e && e.run()
            : (i && (this._items[n].progress.push(i)));
        }

        static createResImage_web(e) {
          var i = this;
          if (!this._resimage.hasOwnProperty(e)) {
            var n = '';
            var a = e.substr(e.length - 3);
            n = a.toLocaleLowerCase();
            var r = {
              loaded: !1,
              origin_url: e,
              blob_url: null,
              complete: [],
              success: !1
            };
            this._resimage[e] = r;
            var s = new Laya.HttpRequest();

            s.once(Laya.Event.COMPLETE, this, t => {
              for (
                var e = new Laya.Byte(t), a = new Laya.Byte(), s = 0;
                s < e.length;
                s++
              )
                GameMgr.inRelease
                  ? a.writeByte(73 ^ e.readByte())
                  : a.writeByte(e.readByte());

              var o = new Laya.Browser.window.Blob([a.buffer], {
                  type: `image/${n}`
                });

              var l = Laya.Browser.window.URL.createObjectURL(o);
              Laya.loader.load(
                l,
                Laya.Handler.create(
                  i,
                  t => {
                    r.blob_url = t;
                    r.loaded = !0;
                    r.success = !0;
                    for (var e = 0; e < r.complete.length; e++)
                      r.complete && r.complete[e].run();
                    r.complete = [];
                  },
                  [l]
                ),
                null,
                Laya.Loader.IMAGE
              );
            });

            s.once(Laya.Event.ERROR, this, t => {
              console.log(`加载${e}失败`);
              r.loaded = !0;
              r.success = !1;
              for (var i = 0; i < r.complete.length; i++)
                r.complete[i] && r.complete[i].run();
              r.complete = [];
            });

            s.send(t.ResourceVersion.formatURL(e), '', 'get', 'arraybuffer');
          }
        }

        static createResImage_conch(t) {
          if (!this._resimage.hasOwnProperty(t)) {
            var e = {
              loaded: !1,
              origin_url: t,
              blob_url: null,
              complete: [],
              success: !1
            };
            this._resimage[t] = e;
            Laya.loader.load(
              t,
              Laya.Handler.create(this, () => {
                e.blob_url = t;
                e.loaded = !0;
                e.success = !0;
                for (var i = 0; i < e.complete.length; i++)
                  e.complete && e.complete[i].run();
                e.complete = [];
              }),
              null,
              Laya.Loader.IMAGE
            );
          }
        }

        static loadResImage(e, i, n) {
          var a = this;
          n && n.runWith(1);
          if (!e && 0 == e.length) return void (i && i.run());
          for (var r = 0, s = 0, o = 0, l = 0; l < e.length; l++)
            e[l] = t.Tools.localUISrc(e[l]);

          var h = () => {
              for (o = 0; o < 5 && s < e.length; ) {
                var t = e[s++];
                a._resimage.hasOwnProperty(t) ||
                  (GameMgr.inConch
                    ? a.createResImage_conch(t)
                    : a.createResImage_web(t));
                var i = a._resimage[t];
                o++;
                i.loaded
                  ? c(!1)
                  : (i.complete.push(Laya.Handler.create(a, c, [!0])));
              }
            };

          var c = t => {
            t && 0 == --o && s < e.length && h();
            n && n.runWith(1);
            ++r == e.length
              ? (i && i.run())
              : n && n.runWith(r / e.length);
          };

          h();
        }

        static getResImage(e) {
          e = t.Tools.localUISrc(e);
          if ((!this._resimage.hasOwnProperty(e)))
            return null;
          var i = this._resimage[e];
          return i.loaded && i.success ? Laya.loader.getRes(i.blob_url) : null;
        }

        static getResImageSkin(e) {
          e = t.Tools.localUISrc(e);
          if ((!this._resimage.hasOwnProperty(e)))
            return '';
          if (!this._resimage[e].loaded) return '';
          return this._resimage[e].blob_url;
        }

        static getItemSkin(e) {
          var i = t.GameUtility.get_item_view(e);
          return this.getResImageSkin(i.icon);
        }

        static disposeSceneRes(t) {
          if (null != this._res_config)
            if (this._res_config.hasOwnProperty(t)) {
              var e = this._res_config[t];
              if (e.hasOwnProperty('atlas')) {
                var i = 'res/atlas/';
                'chs' != GameMgr.client_language &&
                  (i += `${GameMgr.client_language}/`);
                for (var n = 0; n < e.atlas.length; n++)
                  Laya.Loader.clearTextureRes(i + e.atlas[n]);
              }
            } else app.Log.Error('disposeSceneRes错误，场景不存在');
          else app.Log.Error('disposeSceneRes错误，未找到配置');
        }

        static httpload(e, i, n, a) {
          var r = new Laya.HttpRequest();

          r.once(Laya.Event.COMPLETE, this, t => {
            a &&
              ('json' == i
                ? a.runWith({ success: !0, data: JSON.parse(t) })
                : a.runWith({ success: !0, data: t }));
          });

          r.once(Laya.Event.ERROR, this, t => {
            console.log(`httpload加载${e}失败`);
            a && a.runWith({ success: !1 });
          });
          var s = t.ResourceVersion.formatURL(e);
          var o = [];
          o.push('If-Modified-Since');
          o.push('0');
          n &&
            ((s += `?randv=${Math.floor(1e8 * Math.random()).toString()}${Math.floor(1e8 * Math.random()).toString()}`));
          var l = 'text';
          switch (i) {
            case 'json':
              l = 'text';
              break;
            case 'arraybuffer':
              l = 'arraybuffer';
          }
          r.send(s, '', 'get', l, o);
        }

        static setImgSkin(e, i) {
          var n = this;
          if (i.includes('extendRes')) {
            e.skin = a;
            e.skin = '';
            this.clearImgSkin(e);
            this._waiting_load_img_skins.push({ img: e, src: i });
            '' != (a = this.getResImageSkin(i)) && null != a
              ? (this.clearImgSkin(e))
              : (this.loadResImage(
              [i],
              Laya.Handler.create(this, () => {
                for (var t = 0; t < n._waiting_load_img_skins.length; t++)
                  if (
                    n._waiting_load_img_skins[t].img === e &&
                    n._waiting_load_img_skins[t].src == i
                  ) {
                    e.skin = n.getResImageSkin(i);

                    n._waiting_load_img_skins[t] =
                        n._waiting_load_img_skins[
                          n._waiting_load_img_skins.length - 1
                        ];

                    n._waiting_load_img_skins.pop();
                    break;
                  }
              })
            ));
          } else {
            i = t.Tools.localUISrc(i);
            var a = Laya.loader.getRes(i);
            e.skin = i;
            e.skin = '';
            this.clearImgSkin(e);
            this._waiting_load_img_skins.push({ img: e, src: i });
            a
              ? (this.clearImgSkin(e))
              : (Laya.loader.load(
              i,
              Laya.Handler.create(this, () => {
                for (var t = 0; t < n._waiting_load_img_skins.length; t++)
                  if (
                    n._waiting_load_img_skins[t].img === e &&
                    n._waiting_load_img_skins[t].src == i
                  ) {
                    e.skin = i;

                    n._waiting_load_img_skins[t] =
                        n._waiting_load_img_skins[
                          n._waiting_load_img_skins.length - 1
                        ];

                    n._waiting_load_img_skins.pop();
                    break;
                  }
              })
            ));
          }
        }

        static clearImgSkin(t) {
          for (var e = 0; e < this._waiting_load_img_skins.length; e++)
            if (this._waiting_load_img_skins[e].img === t) {
              this._waiting_load_img_skins[e] = this._waiting_load_img_skins[
                this._waiting_load_img_skins.length - 1
              ];

              this._waiting_load_img_skins.pop();
              break;
            }
        }
      }

      function n() {
        if (o.length > 0) {
          t.push(o[l++]);
          for (var t = []; h < 1e3 && l < o.length; ) h++;
          Laya.loader.create(
            t,
            Laya.Handler.create(this, e, [t.length], !1),
            Laya.Handler.create(this, i, null, !1)
          );
        } else e(1e5);
      }
      function a() {
        r.precent = s.length / t.length;
        n();
      }
      for (
        var r = {
            loaded: !1,
            precent: 0,
            urls: t,
            complete: [],
            progress: []
          },
          s = [],
          o = [],
          l = 0,
          h = 0,
          c = 0;
        c < t.length;
        c++
      ) {
        var u = t[c];
        '.ls' == u.substr(u.length - 3) ? s.push(u) : o.push(u);
      }

      s.length > 0
        ? Laya.loader.create(
            s,
            Laya.Handler.create(this, a),
            Laya.Handler.create(this, e => {
              r.precent = (e * o.length + s.length) / t.length;
              for (var i = 0; i < r.progress.length; i++)
                r.progress[i] && r.progress[i].runWith(r.precent);
            })
          )
        : a();

      return r;
    };

    i._items = [];
    i._resimage = {};
    i._res_config = null;
    i._waiting_load_img_skins = [];
    return i;
  })();
  t.LoadMgr = i;
})(game || (game = {}));