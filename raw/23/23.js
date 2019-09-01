var app;
!(function(t) {
  var e;
  !(function(t) {
    (t[(t.None = 0)] = 'None'),
      (t[(t.CompleteRegistration = 1)] = 'CompleteRegistration'),
      (t[(t.CompleteTutorial = 2)] = 'CompleteTutorial'),
      (t[(t.Level_1 = 3)] = 'Level_1'),
      (t[(t.Level_2 = 4)] = 'Level_2'),
      (t[(t.Level_3 = 5)] = 'Level_3'),
      (t[(t.Get_The_Title1 = 6)] = 'Get_The_Title1'),
      (t[(t.Purchase_Click = 7)] = 'Purchase_Click'),
      (t[(t.Purchase = 8)] = 'Purchase'),
      (t[(t.XinShouYinDao = 10)] = 'XinShouYinDao'),
      (t[(t.G_Role_create = 1001)] = 'G_Role_create'),
      (t[(t.G_Role_login = 1002)] = 'G_Role_login'),
      (t[(t.G_Role_logout = 1003)] = 'G_Role_logout'),
      (t[(t.G_tutorial_complete = 1004)] = 'G_tutorial_complete'),
      (t[(t.G_Purchase = 1005)] = 'G_Purchase'),
      (t[(t.G_Purchase_click = 1006)] = 'G_Purchase_click'),
      (t[(t.G_Purchase_first = 1007)] = 'G_Purchase_first'),
      (t[(t.G_Role_level_1 = 1008)] = 'G_Role_level_1'),
      (t[(t.G_Role_level_2 = 1009)] = 'G_Role_level_2'),
      (t[(t.G_Role_level_3 = 1010)] = 'G_Role_level_3'),
      (t[(t.G_Role_level_4 = 1011)] = 'G_Role_level_4'),
      (t[(t.G_Role_level_5 = 1012)] = 'G_Role_level_5'),
      (t[(t.G_Role_level_6 = 1013)] = 'G_Role_level_6'),
      (t[(t.G_Role_level_7 = 1014)] = 'G_Role_level_7'),
      (t[(t.G_Role_level_8 = 1015)] = 'G_Role_level_8'),
      (t[(t.G_Role_level_9 = 1016)] = 'G_Role_level_9'),
      (t[(t.G_Role_level_10 = 1017)] = 'G_Role_level_10'),
      (t[(t.G_Role_level_11 = 1018)] = 'G_Role_level_11'),
      (t[(t.G_Role_level_12 = 1018)] = 'G_Role_level_12'),
      (t[(t.G_Role_level_13 = 1020)] = 'G_Role_level_13'),
      (t[(t.G_Role_level_14 = 1021)] = 'G_Role_level_14'),
      (t[(t.G_Role_level_15 = 1022)] = 'G_Role_level_15'),
      (t[(t.G_Role_level_16 = 1023)] = 'G_Role_level_16'),
      (t[(t.G_get_title_1 = 1024)] = 'G_get_title_1'),
      (t[(t.G_get_title_2 = 1025)] = 'G_get_title_2'),
      (t[(t.G_get_title_3 = 1026)] = 'G_get_title_3'),
      (t[(t.G_get_title_4 = 1027)] = 'G_get_title_4'),
      (t[(t.G_get_title_5 = 1028)] = 'G_get_title_5'),
      (t[(t.G_get_title_6 = 1029)] = 'G_get_title_6'),
      (t[(t.G_get_title_7 = 1030)] = 'G_get_title_7'),
      (t[(t.G_get_title_8 = 1031)] = 'G_get_title_8'),
      (t[(t.G_get_title_9 = 1032)] = 'G_get_title_9'),
      (t[(t.G_get_title_10 = 1033)] = 'G_get_title_10'),
      (t[(t.G_get_title_11 = 1034)] = 'G_get_title_11'),
      (t[(t.G_tutorial_jump = 1035)] = 'G_tutorial_jump'),
      (t[(t.TW_Purchase = 2001)] = 'TW_Purchase'),
      (t[(t.TW_Signup = 2002)] = 'TW_Signup'),
      (t[(t.TW_Tutorial_Completed = 2003)] = 'TW_Tutorial_Completed');
  })((e = t.EBehaviorType || (t.EBehaviorType = {})));
  var i = (function() {
    function i() {}
    return (
      (i.init = function() {
        var e = this;
        t.NetAgent.sendReq2Lobby('Lobby', 'fetchClientValue', {}, function(
          t,
          i
        ) {
          if (t || i.error);
          else {
            if (((e._datas = {}), i.datas))
              for (var n in i.datas)
                e._datas[i.datas[n].key] = i.datas[n].value;
            e.recharged_count = i.recharged_count;
          }
        });
      }),
      (i._get_type_str = function(t) {
        switch (t) {
          case e.CompleteRegistration:
            return 'CompleteRegistration';
          case e.CompleteTutorial:
            return 'CompleteTutorial';
          case e.Level_1:
            return 'Level_1';
          case e.Level_2:
            return 'Level_2';
          case e.Level_3:
            return 'Level_3';
          case e.Get_The_Title1:
            return 'Get_The_Title1';
          case e.Purchase_Click:
            return 'Purchase_Click';
          case e.Purchase:
            return 'Purchase';
          case e.G_Role_create:
            return 'Role_create';
          case e.G_Role_login:
            return 'Role_login';
          case e.G_tutorial_complete:
            return 'tutorial_complete';
          case e.G_Purchase:
            return 'Purchase';
          case e.G_Purchase_click:
            return 'Purchase_click';
          case e.G_Purchase_first:
            return 'Purchase_first';
          case e.G_Role_level_1:
            return 'Role_level_1';
          case e.G_Role_level_2:
            return 'Role_level_2';
          case e.G_Role_level_3:
            return 'Role_level_3';
          case e.G_Role_level_4:
            return 'Role_level_4';
          case e.G_Role_level_5:
            return 'Role_level_5';
          case e.G_Role_level_6:
            return 'Role_level_6';
          case e.G_Role_level_7:
            return 'Role_level_7';
          case e.G_Role_level_8:
            return 'Role_level_8';
          case e.G_Role_level_9:
            return 'Role_level_9';
          case e.G_Role_level_10:
            return 'Role_level_10';
          case e.G_Role_level_11:
            return 'Role_level_11';
          case e.G_Role_level_12:
            return 'Role_level_12';
          case e.G_Role_level_13:
            return 'Role_level_13';
          case e.G_Role_level_14:
            return 'Role_level_14';
          case e.G_Role_level_15:
            return 'Role_level_15';
          case e.G_Role_level_16:
            return 'Role_level_16';
          case e.G_get_title_1:
            return 'get_title_1';
          case e.G_get_title_2:
            return 'get_title_2';
          case e.G_get_title_3:
            return 'get_title_3';
          case e.G_get_title_4:
            return 'get_title_4';
          case e.G_get_title_5:
            return 'get_title_5';
          case e.G_get_title_6:
            return 'get_title_6';
          case e.G_get_title_7:
            return 'get_title_7';
          case e.G_get_title_8:
            return 'get_title_8';
          case e.G_get_title_9:
            return 'get_title_9';
          case e.G_get_title_10:
            return 'get_title_10';
          case e.G_get_title_11:
            return 'get_title_11';
          case e.G_tutorial_jump:
            return 'tutorial_jump';
          case e.TW_Purchase:
            return 'o1xcs';
          case e.TW_Signup:
            return 'o1xcr';
          case e.TW_Tutorial_Completed:
            return 'o1xcx';
        }
        return 'unkown';
      }),
      (i.fb_trace_force = function(t) {
        if (!(t < 0 || t > 100)) {
          var e = this._get_type_str(t);
          'unkown' != e && window.fbq && window.fbq('trackCustom', e);
        }
      }),
      (i.fb_trace_pending = function(t, e) {
        if (this._datas && !(t < 0 || t > 100)) {
          var i = this._get_type_str(t);
          if ('unkown' != i) {
            var n = 0;
            if ((this._datas[t] && (n = this._datas[t]), n != e)) {
              for (var a = 0; a < e - n; a++)
                window.fbq && window.fbq('track', i);
              this.update_val(t, e);
            }
          }
        }
      }),
      (i.google_trace_force = function(t, e) {
        if ((undefined === e && (e = null), !(t < 1e3 || t >= 1100))) {
          var i = this._get_type_str(t);
          if ('unkown' != i) {
            var n = false,
              a = function(t) {
                n || ((n = true), e && e());
              };
            setTimeout(function() {
              a();
            }, 1e3),
              window.gtag &&
                window.gtag('event', i, {
                  event_category: 'category0',
                  event_label: 'label0',
                  value: 1,
                  event_callback: function() {
                    a();
                  }
                });
          }
        }
      }),
      (i.google_trace_pending = function(t, e) {
        if (this._datas && !(t < 1e3 || t >= 1100)) {
          var i = this._get_type_str(t);
          if ('unkown' != i) {
            var n = 0;
            if ((this._datas[t] && (n = this._datas[t]), n != e)) {
              for (var a = 0; a < e - n; a++)
                window.gtag &&
                  window.gtag('event', i, {
                    event_category: 'category0',
                    event_label: 'label0',
                    value: 'value0'
                  });
              this.update_val(t, e);
            }
          }
        }
      }),
      (i.tw_trace_force = function(t) {
        if (!(t < 2e3 || t > 2100)) {
          var e = this._get_type_str(t);
          'unkown' != e &&
            window.twttr &&
            window.twttr.conversion &&
            window.twttr.conversion.trackPid &&
            window.twttr.conversion.trackPid(e, {
              tw_sale_amount: 0,
              tw_order_quantity: 0
            });
        }
      }),
      (i.tw_trace_pending = function(t, e) {
        if (this._datas && !(t < 2e3 || t > 2100)) {
          var i = this._get_type_str(t);
          if ('unkown' != i) {
            var n = 0;
            if ((this._datas[t] && (n = this._datas[t]), n != e)) {
              for (var a = 0; a < e - n; a++)
                window.twttr &&
                  window.twttr.conversion &&
                  window.twttr.conversion.trackPid &&
                  window.twttr.conversion.trackPid(i, {
                    tw_sale_amount: 0,
                    tw_order_quantity: 0
                  });
              this.update_val(t, e);
            }
          }
        }
      }),
      (i.get_val = function(t) {
        return this._datas && this._datas[t] ? this._datas[t] : 0;
      }),
      (i.update_val = function(e, i) {
        this._datas &&
          ((this._datas[e] = i),
          t.NetAgent.sendReq2Lobby(
            'Lobby',
            'updateClientValue',
            { key: e, value: i },
            function() {}
          ));
      }),
      (i._datas = null),
      (i.recharged_count = 0),
      i
    );
  })();
  t.PlayerBehaviorStatistic = i;
})(app || (app = {}));