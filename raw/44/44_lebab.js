let game;
!(t => {
  let e;
  !(t => {
    (t[(t.common = 0)] = 'common'),
      (t[(t.scene_mj = 1)] = 'scene_mj'),
      (t[(t.lobby = 2)] = 'lobby'),
      (t[(t.ui_mj = 3)] = 'ui_mj'),
      (t[(t.entrance = 4)] = 'entrance');
  })(e = t.E_LoadType || (t.E_LoadType = {}));
  const i = (() => {
    function i() {}
    return (i.loadConfig = function() {
      const t = this;
      Laya.loader.load(
        'resconfig.json',
        Laya.Handler.create(this, () => {
          t._res_config = Laya.loader.getRes('resconfig.json');
        })
      );
    }),
    (i.getUrls = i => {
      let n = [];
      let a = 'res/atlas/';
      return 'chs' != GameMgr.client_language &&
        (a += `${GameMgr.client_language}/`),
      i == e.entrance
        ? ((n = [`${a}myres/entrance.atlas`, `${a}myres/necessary.atlas`]),
          'jp' == GameMgr.client_language
            ? n.push('scene/entrance_jp.ls')
            : 'en' == GameMgr.client_language
            ? n.push('scene/entrance_en.ls')
            : n.push('scene/entrance.ls'))
        : i == e.common
        ? (n = [`${a}myres.atlas`, `${a}myres/bothui.atlas`])
        : i == e.scene_mj
        ? ('en' == GameMgr.client_language
            ? n.push('scene/mjdesktop_en.ls')
            : n.push('scene/mjdesktop.ls'),
          n.push('scene/mjhandpai.ls'))
        : i == e.lobby
        ? ((n = [
            `${a}myres/room.atlas`,
            `${a}myres/shop.atlas`,
            `${a}myres/sushe.atlas`,
            `${a}myres/lobby.atlas`,
            `${a}myres/match_lobby.atlas`,
            `${a}myres/treasure.atlas`,
            `${a}myres/activity_duanwu.atlas`,
            `${a}myres/get_character.atlas`
          ]).push(t.FrontEffect.scene_path),
          n.push(t.FrontEffect.scene2_path))
        : i == e.ui_mj &&
          (n = [
            `${a}myres/mjdesktop.atlas`,
            `${a}myres/mjdesktop/shengduan.atlas`
          ]),
      n
    ;
    }),
    (i._createItem = function(t) {
      function e(t) {
        if (((h -= t), l >= o.length)) {
          if (h <= 0) {
            (r.loaded = true), (r.precent = 1);
            for (let e = 0; e < r.complete.length; e++)
              r.complete[e] && r.complete[e].run();
          }
        } else n();
      }
      function i(e) {
        r.precent = (e * o.length + s.length) / t.length;
        for (let i = 0; i < r.progress.length; i++)
          r.progress[i] && r.progress[i].runWith(r.precent);
      }
      function n() {
        if (o.length > 0) {
          for (var t = []; h < 1e3 && l < o.length; ) t.push(o[l++]), h++;
          Laya.loader.create(
            t,
            Laya.Handler.create(this, e, [t.length], false),
            Laya.Handler.create(this, i, null, false)
          );
        } else e(1e5);
      }
      function a() {
        (r.precent = s.length / t.length), n();
      }
      for (
        var r = {
            loaded: false,
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
        const u = t[c];
        '.ls' == u.substr(u.length - 3) ? s.push(u) : o.push(u);
      }
      return s.length > 0
        ? Laya.loader.create(
            s,
            Laya.Handler.create(this, a),
            Laya.Handler.create(this, e => {
              r.precent = (e * o.length + s.length) / t.length;
              for (let i = 0; i < r.progress.length; i++)
                r.progress[i] && r.progress[i].runWith(r.precent);
            })
          )
        : a(),
      r
    ;
    }),
    (i.loadRes = function(t, e, i) {
      for (var n = t; this._items.length <= n; ) this._items.push(null);
      null == this._items[n] &&
        (this._items[n] = this._createItem(this.getUrls(t))),
        this._items[n].loaded
          ? e && e.run()
          : (e && this._items[n].complete.push(e),
            i && ((i.once = false), this._items[n].progress.push(i)));
    }),
    (i.createResImage_web = function(e) {
      const i = this;
      if (!this._resimage.hasOwnProperty(e)) {
        let n = '';
        const a = e.substr(e.length - 3);
        n = a.toLocaleLowerCase();
        const r = {
          loaded: false,
          origin_url: e,
          blob_url: null,
          complete: [],
          success: false
        };
        this._resimage[e] = r;
        const s = new Laya.HttpRequest();
        s.once(Laya.Event.COMPLETE, this, t => {
          for (
            var e = new Laya.Byte(t), a = new Laya.Byte(), s = 0;
            s < e.length;
            s++
          )
            GameMgr.inRelease
              ? a.writeByte(73 ^ e.readByte())
              : a.writeByte(e.readByte());

          const o = new Laya.Browser.window.Blob([a.buffer], {
              type: `image/${n}`
            });

          const l = Laya.Browser.window.URL.createObjectURL(o);
          Laya.loader.load(
            l,
            Laya.Handler.create(
              i,
              t => {
                (r.blob_url = t), (r.loaded = true), (r.success = true);
                for (let e = 0; e < r.complete.length; e++)
                  r.complete && r.complete[e].run();
                r.complete = [];
              },
              [l]
            ),
            null,
            Laya.Loader.IMAGE
          );
        }),
          s.once(Laya.Event.ERROR, this, t => {
            console.log(`加载${e}失败`),
              (r.loaded = true),
              (r.success = false);
            for (let i = 0; i < r.complete.length; i++)
              r.complete[i] && r.complete[i].run();
            r.complete = [];
          }),
          s.send(t.ResourceVersion.formatURL(e), '', 'get', 'arraybuffer');
      }
    }),
    (i.createResImage_conch = function(t) {
      if (!this._resimage.hasOwnProperty(t)) {
        const e = {
          loaded: false,
          origin_url: t,
          blob_url: null,
          complete: [],
          success: false
        };
        (this._resimage[t] = e),
          Laya.loader.load(
            t,
            Laya.Handler.create(this, () => {
              (e.blob_url = t), (e.loaded = true), (e.success = true);
              for (let i = 0; i < e.complete.length; i++)
                e.complete && e.complete[i].run();
              e.complete = [];
            }),
            null,
            Laya.Loader.IMAGE
          );
      }
    }),
    (i.loadResImage = function(e, i, n) {
      const a = this;
      if (!e && 0 == e.length) return n && n.runWith(1), void (i && i.run());
      for (var r = 0, s = 0, o = 0, l = 0; l < e.length; l++)
        e[l] = t.Tools.localUISrc(e[l]);

      const h = () => {
          for (o = 0; o < 5 && s < e.length; ) {
            const t = e[s++];
            a._resimage.hasOwnProperty(t) ||
              (GameMgr.inConch
                ? a.createResImage_conch(t)
                : a.createResImage_web(t));
            const i = a._resimage[t];
            i.loaded
              ? c(false)
              : (o++, i.complete.push(Laya.Handler.create(a, c, [true])));
          }
        };

      var c = t => {
        t && 0 == --o && s < e.length && h(),
          ++r == e.length
            ? (n && n.runWith(1), i && i.run())
            : n && n.runWith(r / e.length);
      };

      h();
    }),
    (i.getResImage = function(e) {
      if (((e = t.Tools.localUISrc(e)), !this._resimage.hasOwnProperty(e)))
        return null;
      const i = this._resimage[e];
      return i.loaded && i.success ? Laya.loader.getRes(i.blob_url) : null;
    }),
    (i.getResImageSkin = function(e) {
      if (((e = t.Tools.localUISrc(e)), !this._resimage.hasOwnProperty(e)))
        return '';
      if (!this._resimage[e].loaded) return '';
      return this._resimage[e].blob_url;
    }),
    (i.getItemSkin = function(e) {
      const i = t.GameUtility.get_item_view(e);
      return this.getResImageSkin(i.icon);
    }),
    (i.disposeSceneRes = function(t) {
      if (null != this._res_config)
        if (this._res_config.hasOwnProperty(t)) {
          const e = this._res_config[t];
          if (e.hasOwnProperty('atlas')) {
            let i = 'res/atlas/';
            'chs' != GameMgr.client_language &&
              (i += `${GameMgr.client_language}/`);
            for (let n = 0; n < e.atlas.length; n++)
              Laya.Loader.clearTextureRes(i + e.atlas[n]);
          }
        } else app.Log.Error('disposeSceneRes错误，场景不存在');
      else app.Log.Error('disposeSceneRes错误，未找到配置');
    }),
    (i.httpload = function(e, i, n, a) {
      const r = new Laya.HttpRequest();
      r.once(Laya.Event.COMPLETE, this, t => {
        a &&
          ('json' == i
            ? a.runWith({ success: true, data: JSON.parse(t) })
            : a.runWith({ success: true, data: t }));
      }),
        r.once(Laya.Event.ERROR, this, t => {
          console.log(`httpload加载${e}失败`),
            a && a.runWith({ success: false });
        });
      let s = t.ResourceVersion.formatURL(e);
      const o = [];
      n &&
        (o.push('If-Modified-Since'),
        o.push('0'),
        (s +=
          `?randv=${Math.floor(1e8 * Math.random()).toString()}${Math.floor(1e8 * Math.random()).toString()}`));
      let l = 'text';
      switch (i) {
        case 'json':
          l = 'text';
          break;
        case 'arraybuffer':
          l = 'arraybuffer';
      }
      r.send(s, '', 'get', l, o);
    }),
    (i.setImgSkin = function(e, i) {
      const n = this;
      if (i.includes('extendRes')) {
        '' != (a = this.getResImageSkin(i)) && null != a
          ? ((e.skin = a), this.clearImgSkin(e))
          : ((e.skin = ''),
            this.clearImgSkin(e),
            this._waiting_load_img_skins.push({ img: e, src: i }),
            this.loadResImage(
              [i],
              Laya.Handler.create(this, () => {
                for (let t = 0; t < n._waiting_load_img_skins.length; t++)
                  if (
                    n._waiting_load_img_skins[t].img === e &&
                    n._waiting_load_img_skins[t].src == i
                  ) {
                    (e.skin = n.getResImageSkin(i)),
                      (n._waiting_load_img_skins[t] =
                        n._waiting_load_img_skins[
                          n._waiting_load_img_skins.length - 1
                        ]),
                      n._waiting_load_img_skins.pop();
                    break;
                  }
              })
            ));
      } else {
        i = t.Tools.localUISrc(i);
        var a = Laya.loader.getRes(i);
        a
          ? ((e.skin = i), this.clearImgSkin(e))
          : ((e.skin = ''),
            this.clearImgSkin(e),
            this._waiting_load_img_skins.push({ img: e, src: i }),
            Laya.loader.load(
              i,
              Laya.Handler.create(this, () => {
                for (let t = 0; t < n._waiting_load_img_skins.length; t++)
                  if (
                    n._waiting_load_img_skins[t].img === e &&
                    n._waiting_load_img_skins[t].src == i
                  ) {
                    (e.skin = i),
                      (n._waiting_load_img_skins[t] =
                        n._waiting_load_img_skins[
                          n._waiting_load_img_skins.length - 1
                        ]),
                      n._waiting_load_img_skins.pop();
                    break;
                  }
              })
            ));
      }
    }),
    (i.clearImgSkin = function(t) {
      for (let e = 0; e < this._waiting_load_img_skins.length; e++)
        if (this._waiting_load_img_skins[e].img === t) {
          (this._waiting_load_img_skins[e] = this._waiting_load_img_skins[
            this._waiting_load_img_skins.length - 1
          ]),
            this._waiting_load_img_skins.pop();
          break;
        }
    }),
    (i._items = []),
    (i._resimage = {}),
    (i._res_config = null),
    (i._waiting_load_img_skins = []),
    i
  ;
  })();
  t.LoadMgr = i;
})(game || (game = {}));