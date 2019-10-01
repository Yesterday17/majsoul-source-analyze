var __extends =
    this && this.__extends || (() => {
      var t = (e, i) => (t =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          ((t, e) => {
            t.__proto__ = e;
          })) ||
        ((t, e) => {
          for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        }))(e, i);
      return (e, i) => {
        function n() {
          this.constructor = e;
        }
        t(e, i);
        n.prototype = i.prototype;
        e.prototype =
            null === i
              ? Object.create(i)
              : (new n());
      };
    })();

var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var EffectAnimation = laya.display.EffectAnimation;
var ui;

!(t => {
  !(e => {
    var i = (e => {
      function i() {
        var i = e.call(this) || this;
        i.effectData = t.anim.alpha_inUI.uiView;
        return i;
      }
      __extends(i, e);

      i.uiView = {
        type: 'View',
        props: {},
        child: [
          {
            type: 'Image',
            props: {
              y: -4,
              x: 4,
              skin: 'myres/0p.png',
              anchorY: 0.5,
              anchorX: 0.5
            },
            compId: 2
          }
        ],
        animations: [
          {
            nodes: [
              {
                target: 2,
                keyframes: {
                  y: [
                    {
                      value: -1,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'y',
                      index: 0
                    },
                    {
                      value: 167,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'y',
                      index: 14
                    },
                    {
                      value: 0,
                      tweenMethod: 'backIn',
                      tween: !0,
                      target: 2,
                      key: 'y',
                      index: 20
                    }
                  ],
                  x: [
                    {
                      value: -1,
                      tweenMethod: 'backIn',
                      tween: !0,
                      target: 2,
                      key: 'x',
                      index: 0
                    },
                    {
                      value: -360,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'x',
                      index: 14
                    },
                    {
                      value: 0,
                      tweenMethod: 'backIn',
                      tween: !0,
                      target: 2,
                      key: 'x',
                      index: 20
                    }
                  ],
                  scaleY: [
                    {
                      value: 1,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'scaleY',
                      index: 0
                    },
                    {
                      value: 0.58,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'scaleY',
                      index: 7
                    },
                    {
                      value: 2,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'scaleY',
                      index: 20
                    }
                  ],
                  scaleX: [
                    {
                      value: 1,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'scaleX',
                      index: 0
                    },
                    {
                      value: 0.5,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'scaleX',
                      index: 7
                    },
                    {
                      value: 2,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'scaleX',
                      index: 20
                    },
                    {
                      value: 1,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'scaleX',
                      index: 31
                    }
                  ],
                  rotation: [
                    {
                      value: 0,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'rotation',
                      index: 0
                    },
                    {
                      value: 0,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'rotation',
                      index: 14
                    }
                  ],
                  alpha: [
                    {
                      value: 1,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'alpha',
                      index: 0
                    },
                    {
                      value: 1,
                      tweenMethod: 'backIn',
                      tween: !0,
                      target: 2,
                      key: 'alpha',
                      index: 20
                    }
                  ]
                }
              }
            ],
            name: 'in',
            id: 1,
            frameRate: 60,
            action: 0
          },
          {
            nodes: [
              {
                target: 2,
                keyframes: {
                  y: [
                    {
                      value: 0,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'y',
                      index: 0
                    }
                  ],
                  x: [
                    {
                      value: 0,
                      tweenMethod: 'backIn',
                      tween: !0,
                      target: 2,
                      key: 'x',
                      index: 0
                    },
                    {
                      value: 100,
                      tweenMethod: 'linearNone',
                      tween: !0,
                      target: 2,
                      key: 'x',
                      index: 10
                    }
                  ]
                }
              }
            ],
            name: 'out',
            id: 2,
            frameRate: 24,
            action: 0
          }
        ]
      };

      return i;
    })(EffectAnimation);
    e.alpha_inUI = i;
  })(t.anim || (t.anim = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('anim/animtest');
      };

      return e;
    })(View);
    t.animtestUI = e;
  })(t.anim || (t.anim = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/bind_mail0');
      };

      return e;
    })(View);
    t.bind_mail0UI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/bind_mail1');
      };

      return e;
    })(View);
    t.bind_mail1UI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/bind_phone0');
      };

      return e;
    })(View);
    t.bind_phone0UI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/bind_phone1');
      };

      return e;
    })(View);
    t.bind_phone1UI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/character_star_up');
      };

      return e;
    })(View);
    t.character_star_upUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/config');
      };

      return e;
    })(View);
    t.configUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CLoading', capsui.CLoading);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/course');
      };

      return e;
    })(View);
    t.courseUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/fly_tips');
      };

      return e;
    })(View);
    t.fly_tipsUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/getcharacter');
      };

      return e;
    })(View);
    t.getcharacterUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/getreward');
      };

      return e;
    })(View);
    t.getrewardUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/getreward2');
      };

      return e;
    })(View);
    t.getreward2UI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/gettitle');
      };

      return e;
    })(View);
    t.gettitleUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/gitfcode');
      };

      return e;
    })(View);
    t.gitfcodeUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/infolite');
      };

      return e;
    })(View);
    t.infoliteUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/infolite_title');
      };

      return e;
    })(View);
    t.infolite_titleUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/invite');
      };

      return e;
    })(View);
    t.inviteUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/itemdetail');
      };

      return e;
    })(View);
    t.itemdetailUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/light_tips');
      };

      return e;
    })(View);
    t.light_tipsUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/need_bind_mail');
      };

      return e;
    })(View);
    t.need_bind_mailUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/otherplayerinfo');
      };

      return e;
    })(View);
    t.otherplayerinfoUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/otherplayerinfo_en');
      };

      return e;
    })(View);
    t.otherplayerinfo_enUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/popwindow');
      };

      return e;
    })(View);
    t.popwindowUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CLoading', capsui.CLoading);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/rules');
      };

      return e;
    })(View);
    t.rulesUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CLoading', capsui.CLoading);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/rules_en');
      };

      return e;
    })(View);
    t.rules_enUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('both_ui/secondconfirm');
      };

      return e;
    })(View);
    t.secondconfirmUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('common/anotherlogin');
      };

      return e;
    })(View);
    t.anotherloginUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('common/closeapp');
      };

      return e;
    })(View);
    t.closeappUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('common/common');
      };

      return e;
    })(View);
    t.commonUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('common/disconnect');
      };

      return e;
    })(View);
    t.disconnectUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('Script', laya.display.Sprite);
        t.prototype.createChildren.call(this);
        this.loadUI('common/errorinfo');
      };

      return e;
    })(View);
    t.errorinfoUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('common/hangup_logout');
      };

      return e;
    })(View);
    t.hangup_logoutUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('common/loading');
      };

      return e;
    })(View);
    t.loadingUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('common/preventaddiction');
      };

      return e;
    })(View);
    t.preventaddictionUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('common/reconnect');
      };

      return e;
    })(View);
    t.reconnectUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('common/rollnotice');
      };

      return e;
    })(View);
    t.rollnoticeUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('common/shimingrenzheng');
      };

      return e;
    })(View);
    t.shimingrenzhengUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('common/user_xieyi');
      };

      return e;
    })(View);
    t.user_xieyiUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
        t.prototype.createChildren.call(this);
        this.loadUI('common/user_xieyi_enjp');
      };

      return e;
    })(View);
    t.user_xieyi_enjpUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/account_prohibition');
      };

      return e;
    })(View);
    t.account_prohibitionUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/add2desktop');
      };

      return e;
    })(View);
    t.add2desktopUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/chooseserver');
      };

      return e;
    })(View);
    t.chooseserverUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/choose_language');
      };

      return e;
    })(View);
    t.choose_languageUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/choose_route');
      };

      return e;
    })(View);
    t.choose_routeUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('entrance/entrance');
      };

      return e;
    })(View);
    t.entranceUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/error_info');
      };

      return e;
    })(View);
    t.error_infoUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/ios_webview_update');
      };

      return e;
    })(View);
    t.ios_webview_updateUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CLoading', capsui.CLoading);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/mail_regist');
      };

      return e;
    })(View);
    t.mail_registUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/maintenance');
      };

      return e;
    })(View);
    t.maintenanceUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/remind');
      };

      return e;
    })(View);
    t.remindUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/remind_new');
      };

      return e;
    })(View);
    t.remind_newUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('entrance/reset_password');
      };

      return e;
    })(View);
    t.reset_passwordUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('entrance/reset_password_phone2');
      };

      return e;
    })(View);
    t.reset_password_phone2UI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/activity');
      };

      return e;
    })(View);
    t.activityUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activitybase');
        };

        return e;
      })(View);
      t.activitybaseUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.UICopy', capsui.UICopy);
          View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_duanwu_point');
        };

        return e;
      })(View);
      t.activity_duanwu_pointUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);

          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          );

          View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
          View.regComponent('capsui.CScrollView', capsui.CScrollView);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_duanwu_rank');
        };

        return e;
      })(View);
      t.activity_duanwu_rankUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          );

          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_exchange');
        };

        return e;
      })(View);
      t.activity_exchangeUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_exchange_zhongxia');
        };

        return e;
      })(View);
      t.activity_exchange_zhongxiaUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_guoqing');
        };

        return e;
      })(View);
      t.activity_guoqingUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_jiuji');
        };

        return e;
      })(View);
      t.activity_jiujiUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_task');
        };

        return e;
      })(View);
      t.activity_taskUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_task_newyear');
        };

        return e;
      })(View);
      t.activity_task_newyearUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_task_zhongxia');
        };

        return e;
      })(View);
      t.activity_task_zhongxiaUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_wuyi_exchange');
        };

        return e;
      })(View);
      t.activity_wuyi_exchangeUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_wuyi_task');
        };

        return e;
      })(View);
      t.activity_wuyi_taskUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          View.regComponent('capsui.CScrollView', capsui.CScrollView);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_xuanshang');
        };

        return e;
      })(View);
      t.activity_xuanshangUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/activity_yueka');
        };

        return e;
      })(View);
      t.activity_yuekaUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/guoqing_popout');
        };

        return e;
      })(View);
      t.guoqing_popoutUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/activitys/sign');
        };

        return e;
      })(View);
      t.signUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/add_room');
      };

      return e;
    })(View);
    t.add_roomUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/ageconfirm');
      };

      return e;
    })(View);
    t.ageconfirmUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/agepending');
      };

      return e;
    })(View);
    t.agependingUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/agesuccess');
      };

      return e;
    })(View);
    t.agesuccessUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/agexiane');
      };

      return e;
    })(View);
    t.agexianeUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/bag');
      };

      return e;
    })(View);
    t.bagUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/chang_nickname');
      };

      return e;
    })(View);
    t.chang_nicknameUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/checkhuiyu');
      };

      return e;
    })(View);
    t.checkhuiyuUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/create_room');
      };

      return e;
    })(View);
    t.create_roomUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CLoading', capsui.CLoading);
        View.regComponent('capsui.NoLimitList', capsui.NoLimitList);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/friend');
      };

      return e;
    })(View);
    t.friendUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationPosition',
          capsui.LabelLocalizationPosition
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/get_character');
      };

      return e;
    })(View);
    t.get_characterUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('Text', laya.display.Text);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/info');
      };

      return e;
    })(View);
    t.infoUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/introduce');
      };

      return e;
    })(View);
    t.introduceUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/lobby');
      };

      return e;
    })(View);
    t.lobbyUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('Text', laya.display.Text);
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/lobbychat');
      };

      return e;
    })(View);
    t.lobbychatUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationPosition',
          capsui.LabelLocalizationPosition
        );

        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CLoading', capsui.CLoading);
        View.regComponent('capsui.NoLimitList', capsui.NoLimitList);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/match_lobby');
      };

      return e;
    })(View);
    t.match_lobbyUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CLoading', capsui.CLoading);
        View.regComponent('capsui.NoLimitList', capsui.NoLimitList);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/match_room');
      };

      return e;
    })(View);
    t.match_roomUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/match_shilian');
      };

      return e;
    })(View);
    t.match_shilianUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/match_ticket');
      };

      return e;
    })(View);
    t.match_ticketUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/nickname');
      };

      return e;
    })(View);
    t.nicknameUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/number_input');
      };

      return e;
    })(View);
    t.number_inputUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CDropdown', capsui.CDropdown);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/ob');
      };

      return e;
    })(View);
    t.obUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/openbox');
      };

      return e;
    })(View);
    t.openboxUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CLoading', capsui.CLoading);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/paipu');
      };

      return e;
    })(View);
    t.paipuUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/payment/buy_yueka_chs');
        };

        return e;
      })(View);
      t.buy_yueka_chsUI = e;
    })(t.payment || (t.payment = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          View.regComponent('capsui.CScrollView', capsui.CScrollView);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/payment/buy_yueka_en');
        };

        return e;
      })(View);
      t.buy_yueka_enUI = e;
    })(t.payment || (t.payment = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/payment/choose_method_chs');
        };

        return e;
      })(View);
      t.choose_method_chsUI = e;
    })(t.payment || (t.payment = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          View.regComponent('capsui.CScrollView', capsui.CScrollView);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/payment/choose_method_en');
        };

        return e;
      })(View);
      t.choose_method_enUI = e;
    })(t.payment || (t.payment = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.UICopy', capsui.UICopy);
          View.regComponent('capsui.CScrollView', capsui.CScrollView);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/payment/creditcard');
        };

        return e;
      })(View);
      t.creditcardUI = e;
    })(t.payment || (t.payment = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CLoading', capsui.CLoading);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/payment/loading');
        };

        return e;
      })(View);
      t.loadingUI = e;
    })(t.payment || (t.payment = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    !(t => {
      var e = (t => {
        function e() {
          return t.call(this) || this;
        }
        __extends(e, t);

        e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton);
          View.regComponent('capsui.CLoading', capsui.CLoading);
          t.prototype.createChildren.call(this);
          this.loadUI('lobby/payment/wxcode');
        };

        return e;
      })(View);
      t.wxcodeUI = e;
    })(t.payment || (t.payment = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/pipei');
      };

      return e;
    })(View);
    t.pipeiUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/pipeichenggong');
      };

      return e;
    })(View);
    t.pipeichenggongUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/pipeiyuyue');
      };

      return e;
    })(View);
    t.pipeiyuyueUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/playerinfo');
      };

      return e;
    })(View);
    t.playerinfoUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/playerinfo_en');
      };

      return e;
    })(View);
    t.playerinfo_enUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.NoLimitList', capsui.NoLimitList);
        View.regComponent('capsui.CLoading', capsui.CLoading);
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/rank');
      };

      return e;
    })(View);
    t.rankUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/recharge');
      };

      return e;
    })(View);
    t.rechargeUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);

        View.regComponent(
          'capsui.CScrollBar_Heng',
          capsui.CScrollBar_Heng
        );

        View.regComponent(
          'capsui.CScrollView_Heng',
          capsui.CScrollView_Heng
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/shop');
      };

      return e;
    })(View);
    t.shopUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/shop_pack_detail');
      };

      return e;
    })(View);
    t.shop_pack_detailUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/shop_skin_yulan');
      };

      return e;
    })(View);
    t.shop_skin_yulanUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/sign');
      };

      return e;
    })(View);
    t.signUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/skin_yulan');
      };

      return e;
    })(View);
    t.skin_yulanUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationPosition',
          capsui.LabelLocalizationPosition
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/sushe');
      };

      return e;
    })(View);
    t.susheUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/sushe_select');
      };

      return e;
    })(View);
    t.sushe_selectUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/sushe_select_en');
      };

      return e;
    })(View);
    t.sushe_select_enUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CLoading', capsui.CLoading);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/tanfang0');
      };

      return e;
    })(View);
    t.tanfang0UI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationPosition',
          capsui.LabelLocalizationPosition
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/tangfang1');
      };

      return e;
    })(View);
    t.tangfang1UI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/titlebook');
      };

      return e;
    })(View);
    t.titlebookUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);

        View.regComponent(
          'capsui.LabelLocalizationPosition',
          capsui.LabelLocalizationPosition
        );

        t.prototype.createChildren.call(this);
        this.loadUI('lobby/treasure');
      };

      return e;
    })(View);
    t.treasureUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/visit');
      };

      return e;
    })(View);
    t.visitUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationPosition',
          capsui.LabelLocalizationPosition
        );

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/waitingroom');
      };

      return e;
    })(View);
    t.waitingroomUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/waitob');
      };

      return e;
    })(View);
    t.waitobUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CLoading', capsui.CLoading);
        t.prototype.createChildren.call(this);
        this.loadUI('lobby/xinshouyindao');
      };

      return e;
    })(View);
    t.xinshouyindaoUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/activity_task');
      };

      return e;
    })(View);
    t.activity_taskUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/al');
      };

      return e;
    })(View);
    t.alUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/chipenghu');
      };

      return e;
    })(View);
    t.chipenghuUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.CScrollBar', capsui.CScrollBar);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/desktopInfo');
      };

      return e;
    })(View);
    t.desktopInfoUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/display_effect');
      };

      return e;
    })(View);
    t.display_effectUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/fightbegin');
      };

      return e;
    })(View);
    t.fightbeginUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/gameend');
      };

      return e;
    })(View);
    t.gameendUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/gamestop');
      };

      return e;
    })(View);
    t.gamestopUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/hangup_warn');
      };

      return e;
    })(View);
    t.hangup_warnUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/huleshow');
      };

      return e;
    })(View);
    t.huleshowUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/hu_cutin');
      };

      return e;
    })(View);
    t.hu_cutinUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/info_md5');
      };

      return e;
    })(View);
    t.info_md5UI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/liuju');
      };

      return e;
    })(View);
    t.liujuUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.CButton', capsui.CButton);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/live_broadcast');
      };

      return e;
    })(View);
    t.live_broadcastUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('Text', laya.display.Text);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/rankchange');
      };

      return e;
    })(View);
    t.rankchangeUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        View.regComponent('capsui.UICopy', capsui.UICopy);
        View.regComponent('capsui.CScrollView', capsui.CScrollView);
        t.prototype.createChildren.call(this);
        this.loadUI('mj/replay');
      };

      return e;
    })(View);
    t.replayUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/replay_whell');
      };

      return e;
    })(View);
    t.replay_whellUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/rewardprogress');
      };

      return e;
    })(View);
    t.rewardprogressUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        View.regComponent('capsui.CButton', capsui.CButton);

        View.regComponent(
          'capsui.LabelLocalizationSize',
          capsui.LabelLocalizationSize
        );

        t.prototype.createChildren.call(this);
        this.loadUI('mj/scorechange');
      };

      return e;
    })(View);
    t.scorechangeUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/task_progress');
      };

      return e;
    })(View);
    t.task_progressUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      function e() {
        return t.call(this) || this;
      }
      __extends(e, t);

      e.prototype.createChildren = function() {
        t.prototype.createChildren.call(this);
        this.loadUI('mj/tingpai');
      };

      return e;
    })(View);
    t.tingpaiUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));

(t => {
  !(t => {
    var e = (t => {
      class e {
        constructor() {
          return t.call(this) || this;
        }

        createChildren() {
          View.regComponent('capsui.CButton', capsui.CButton);

          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          );

          t.prototype.createChildren.call(this);
          this.loadUI('mj/win');
        }
      }

      __extends(e, t);

      return e;
    })(View);
    t.winUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));