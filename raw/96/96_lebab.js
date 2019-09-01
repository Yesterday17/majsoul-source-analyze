const View = laya.ui.View;
const Dialog = laya.ui.Dialog;
const EffectAnimation = laya.display.EffectAnimation;
let ui;
!(t => {
  !(e => {
    const i = (e => {
      function i() {
        const i = e.call(this) || this;
        return (i.effectData = t.anim.alpha_inUI.uiView), i;
      }
      return (
        __extends(i, e),
        (i.uiView = {
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
                        tween: true,
                        target: 2,
                        key: 'y',
                        index: 0
                      },
                      {
                        value: 167,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'y',
                        index: 14
                      },
                      {
                        value: 0,
                        tweenMethod: 'backIn',
                        tween: true,
                        target: 2,
                        key: 'y',
                        index: 20
                      }
                    ],
                    x: [
                      {
                        value: -1,
                        tweenMethod: 'backIn',
                        tween: true,
                        target: 2,
                        key: 'x',
                        index: 0
                      },
                      {
                        value: -360,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'x',
                        index: 14
                      },
                      {
                        value: 0,
                        tweenMethod: 'backIn',
                        tween: true,
                        target: 2,
                        key: 'x',
                        index: 20
                      }
                    ],
                    scaleY: [
                      {
                        value: 1,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'scaleY',
                        index: 0
                      },
                      {
                        value: 0.58,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'scaleY',
                        index: 7
                      },
                      {
                        value: 2,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'scaleY',
                        index: 20
                      }
                    ],
                    scaleX: [
                      {
                        value: 1,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'scaleX',
                        index: 0
                      },
                      {
                        value: 0.5,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'scaleX',
                        index: 7
                      },
                      {
                        value: 2,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'scaleX',
                        index: 20
                      },
                      {
                        value: 1,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'scaleX',
                        index: 31
                      }
                    ],
                    rotation: [
                      {
                        value: 0,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'rotation',
                        index: 0
                      },
                      {
                        value: 0,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'rotation',
                        index: 14
                      }
                    ],
                    alpha: [
                      {
                        value: 1,
                        tweenMethod: 'linearNone',
                        tween: true,
                        target: 2,
                        key: 'alpha',
                        index: 0
                      },
                      {
                        value: 1,
                        tweenMethod: 'backIn',
                        tween: true,
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
                        tween: true,
                        target: 2,
                        key: 'y',
                        index: 0
                      }
                    ],
                    x: [
                      {
                        value: 0,
                        tweenMethod: 'backIn',
                        tween: true,
                        target: 2,
                        key: 'x',
                        index: 0
                      },
                      {
                        value: 100,
                        tweenMethod: 'linearNone',
                        tween: true,
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
        }),
        i
      );
    })(EffectAnimation);
    e.alpha_inUI = i;
  })(t.anim || (t.anim = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('anim/animtest');
        }),
        e
      );
    })(View);
    t.animtestUI = e;
  })(t.anim || (t.anim = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/bind_mail0');
        }),
        e
      );
    })(View);
    t.bind_mail0UI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/bind_mail1');
        }),
        e
      );
    })(View);
    t.bind_mail1UI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/character_star_up');
        }),
        e
      );
    })(View);
    t.character_star_upUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/config');
        }),
        e
      );
    })(View);
    t.configUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/course');
        }),
        e
      );
    })(View);
    t.courseUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/fly_tips');
        }),
        e
      );
    })(View);
    t.fly_tipsUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('both_ui/getcharacter');
        }),
        e
      );
    })(View);
    t.getcharacterUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('both_ui/getreward');
        }),
        e
      );
    })(View);
    t.getrewardUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/getreward2');
        }),
        e
      );
    })(View);
    t.getreward2UI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('both_ui/gettitle');
        }),
        e
      );
    })(View);
    t.gettitleUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/gitfcode');
        }),
        e
      );
    })(View);
    t.gitfcodeUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/infolite');
        }),
        e
      );
    })(View);
    t.infoliteUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/infolite_title');
        }),
        e
      );
    })(View);
    t.infolite_titleUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/invite');
        }),
        e
      );
    })(View);
    t.inviteUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/itemdetail');
        }),
        e
      );
    })(View);
    t.itemdetailUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('both_ui/light_tips');
        }),
        e
      );
    })(View);
    t.light_tipsUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/need_bind_mail');
        }),
        e
      );
    })(View);
    t.need_bind_mailUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/otherplayerinfo');
        }),
        e
      );
    })(View);
    t.otherplayerinfoUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/otherplayerinfo_en');
        }),
        e
      );
    })(View);
    t.otherplayerinfo_enUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/popwindow');
        }),
        e
      );
    })(View);
    t.popwindowUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/rules');
        }),
        e
      );
    })(View);
    t.rulesUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/rules_en');
        }),
        e
      );
    })(View);
    t.rules_enUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('both_ui/secondconfirm');
        }),
        e
      );
    })(View);
    t.secondconfirmUI = e;
  })(t.both_ui || (t.both_ui = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('common/anotherlogin');
        }),
        e
      );
    })(View);
    t.anotherloginUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('common/closeapp');
        }),
        e
      );
    })(View);
    t.closeappUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('common/common');
        }),
        e
      );
    })(View);
    t.commonUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('common/disconnect');
        }),
        e
      );
    })(View);
    t.disconnectUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('Script', laya.display.Sprite),
            t.prototype.createChildren.call(this),
            this.loadUI('common/errorinfo');
        }),
        e
      );
    })(View);
    t.errorinfoUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('common/hangup_logout');
        }),
        e
      );
    })(View);
    t.hangup_logoutUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('common/loading');
        }),
        e
      );
    })(View);
    t.loadingUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('common/preventaddiction');
        }),
        e
      );
    })(View);
    t.preventaddictionUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('common/reconnect');
        }),
        e
      );
    })(View);
    t.reconnectUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('common/rollnotice');
        }),
        e
      );
    })(View);
    t.rollnoticeUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('common/shimingrenzheng');
        }),
        e
      );
    })(View);
    t.shimingrenzhengUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('common/user_xieyi');
        }),
        e
      );
    })(View);
    t.user_xieyiUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            t.prototype.createChildren.call(this),
            this.loadUI('common/user_xieyi_enjp');
        }),
        e
      );
    })(View);
    t.user_xieyi_enjpUI = e;
  })(t.common || (t.common = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/account_prohibition');
        }),
        e
      );
    })(View);
    t.account_prohibitionUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/add2desktop');
        }),
        e
      );
    })(View);
    t.add2desktopUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/chooseserver');
        }),
        e
      );
    })(View);
    t.chooseserverUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/choose_language');
        }),
        e
      );
    })(View);
    t.choose_languageUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/choose_route');
        }),
        e
      );
    })(View);
    t.choose_routeUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/entrance');
        }),
        e
      );
    })(View);
    t.entranceUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/error_info');
        }),
        e
      );
    })(View);
    t.error_infoUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('entrance/ios_webview_update');
        }),
        e
      );
    })(View);
    t.ios_webview_updateUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/mail_regist');
        }),
        e
      );
    })(View);
    t.mail_registUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/maintenance');
        }),
        e
      );
    })(View);
    t.maintenanceUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('entrance/remind');
        }),
        e
      );
    })(View);
    t.remindUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('entrance/remind_new');
        }),
        e
      );
    })(View);
    t.remind_newUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('entrance/reset_password');
        }),
        e
      );
    })(View);
    t.reset_passwordUI = e;
  })(t.entrance || (t.entrance = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/activity');
        }),
        e
      );
    })(View);
    t.activityUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activitybase');
          }),
          e
        );
      })(View);
      t.activitybaseUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.UICopy', capsui.UICopy),
              View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_duanwu_point');
          }),
          e
        );
      })(View);
      t.activity_duanwu_pointUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              View.regComponent('capsui.UICopy', capsui.UICopy),
              View.regComponent(
                'capsui.LabelLocalizationSize',
                capsui.LabelLocalizationSize
              ),
              View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
              View.regComponent('capsui.CScrollView', capsui.CScrollView),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_duanwu_rank');
          }),
          e
        );
      })(View);
      t.activity_duanwu_rankUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              View.regComponent('capsui.UICopy', capsui.UICopy),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_exchange');
          }),
          e
        );
      })(View);
      t.activity_exchangeUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              View.regComponent('capsui.UICopy', capsui.UICopy),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_exchange_zhongxia');
          }),
          e
        );
      })(View);
      t.activity_exchange_zhongxiaUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_jiuji');
          }),
          e
        );
      })(View);
      t.activity_jiujiUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              View.regComponent('capsui.UICopy', capsui.UICopy),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_task');
          }),
          e
        );
      })(View);
      t.activity_taskUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_task_newyear');
          }),
          e
        );
      })(View);
      t.activity_task_newyearUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_task_zhongxia');
          }),
          e
        );
      })(View);
      t.activity_task_zhongxiaUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              View.regComponent('capsui.UICopy', capsui.UICopy),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_wuyi_exchange');
          }),
          e
        );
      })(View);
      t.activity_wuyi_exchangeUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              View.regComponent('capsui.UICopy', capsui.UICopy),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_wuyi_task');
          }),
          e
        );
      })(View);
      t.activity_wuyi_taskUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            View.regComponent('capsui.CButton', capsui.CButton),
              t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/activity_xuanshang');
          }),
          e
        );
      })(View);
      t.activity_xuanshangUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    !(t => {
      const e = (t => {
        function e() {
          return t.call(this) || this;
        }
        return (
          __extends(e, t),
          (e.prototype.createChildren = function() {
            t.prototype.createChildren.call(this),
              this.loadUI('lobby/activitys/sign');
          }),
          e
        );
      })(View);
      t.signUI = e;
    })(t.activitys || (t.activitys = {}));
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/add_room');
        }),
        e
      );
    })(View);
    t.add_roomUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/ageconfirm');
        }),
        e
      );
    })(View);
    t.ageconfirmUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/agepending');
        }),
        e
      );
    })(View);
    t.agependingUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/agesuccess');
        }),
        e
      );
    })(View);
    t.agesuccessUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/agexiane');
        }),
        e
      );
    })(View);
    t.agexianeUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/bag');
        }),
        e
      );
    })(View);
    t.bagUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/chang_nickname');
        }),
        e
      );
    })(View);
    t.chang_nicknameUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/checkhuiyu');
        }),
        e
      );
    })(View);
    t.checkhuiyuUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/create_room');
        }),
        e
      );
    })(View);
    t.create_roomUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            View.regComponent('capsui.NoLimitList', capsui.NoLimitList),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/friend');
        }),
        e
      );
    })(View);
    t.friendUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationPosition',
            capsui.LabelLocalizationPosition
          ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/get_character');
        }),
        e
      );
    })(View);
    t.get_characterUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('Text', laya.display.Text),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/info');
        }),
        e
      );
    })(View);
    t.infoUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/introduce');
        }),
        e
      );
    })(View);
    t.introduceUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/lobby');
        }),
        e
      );
    })(View);
    t.lobbyUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('Text', laya.display.Text),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/lobbychat');
        }),
        e
      );
    })(View);
    t.lobbychatUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationPosition',
            capsui.LabelLocalizationPosition
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            View.regComponent('capsui.NoLimitList', capsui.NoLimitList),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/match_lobby');
        }),
        e
      );
    })(View);
    t.match_lobbyUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            View.regComponent('capsui.NoLimitList', capsui.NoLimitList),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/match_room');
        }),
        e
      );
    })(View);
    t.match_roomUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/match_shilian');
        }),
        e
      );
    })(View);
    t.match_shilianUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('lobby/match_ticket');
        }),
        e
      );
    })(View);
    t.match_ticketUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/nickname');
        }),
        e
      );
    })(View);
    t.nicknameUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/number_input');
        }),
        e
      );
    })(View);
    t.number_inputUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CDropdown', capsui.CDropdown),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/ob');
        }),
        e
      );
    })(View);
    t.obUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/openbox');
        }),
        e
      );
    })(View);
    t.openboxUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/paipu');
        }),
        e
      );
    })(View);
    t.paipuUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/pipei');
        }),
        e
      );
    })(View);
    t.pipeiUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('lobby/pipeichenggong');
        }),
        e
      );
    })(View);
    t.pipeichenggongUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/pipeiyuyue');
        }),
        e
      );
    })(View);
    t.pipeiyuyueUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/playerinfo');
        }),
        e
      );
    })(View);
    t.playerinfoUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/playerinfo_en');
        }),
        e
      );
    })(View);
    t.playerinfo_enUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.NoLimitList', capsui.NoLimitList),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/rank');
        }),
        e
      );
    })(View);
    t.rankUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/recharge');
        }),
        e
      );
    })(View);
    t.rechargeUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent(
              'capsui.CScrollBar_Heng',
              capsui.CScrollBar_Heng
            ),
            View.regComponent(
              'capsui.CScrollView_Heng',
              capsui.CScrollView_Heng
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/shop');
        }),
        e
      );
    })(View);
    t.shopUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/shop_pack_detail');
        }),
        e
      );
    })(View);
    t.shop_pack_detailUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/shop_skin_yulan');
        }),
        e
      );
    })(View);
    t.shop_skin_yulanUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/sign');
        }),
        e
      );
    })(View);
    t.signUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/skin_yulan');
        }),
        e
      );
    })(View);
    t.skin_yulanUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationPosition',
            capsui.LabelLocalizationPosition
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/sushe');
        }),
        e
      );
    })(View);
    t.susheUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/sushe_select');
        }),
        e
      );
    })(View);
    t.sushe_selectUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/sushe_select_en');
        }),
        e
      );
    })(View);
    t.sushe_select_enUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CLoading', capsui.CLoading),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/tanfang0');
        }),
        e
      );
    })(View);
    t.tanfang0UI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationPosition',
            capsui.LabelLocalizationPosition
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/tangfang1');
        }),
        e
      );
    })(View);
    t.tangfang1UI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/titlebook');
        }),
        e
      );
    })(View);
    t.titlebookUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            View.regComponent(
              'capsui.LabelLocalizationPosition',
              capsui.LabelLocalizationPosition
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/treasure');
        }),
        e
      );
    })(View);
    t.treasureUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/visit');
        }),
        e
      );
    })(View);
    t.visitUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationPosition',
              capsui.LabelLocalizationPosition
            ),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/waitingroom');
        }),
        e
      );
    })(View);
    t.waitingroomUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/waitob');
        }),
        e
      );
    })(View);
    t.waitobUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CLoading', capsui.CLoading),
            t.prototype.createChildren.call(this),
            this.loadUI('lobby/xinshouyindao');
        }),
        e
      );
    })(View);
    t.xinshouyindaoUI = e;
  })(t.lobby || (t.lobby = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('mj/activity_task');
        }),
        e
      );
    })(View);
    t.activity_taskUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('mj/al');
        }),
        e
      );
    })(View);
    t.alUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/chipenghu');
        }),
        e
      );
    })(View);
    t.chipenghuUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.CScrollBar', capsui.CScrollBar),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/desktopInfo');
        }),
        e
      );
    })(View);
    t.desktopInfoUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/display_effect');
        }),
        e
      );
    })(View);
    t.display_effectUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('mj/fightbegin');
        }),
        e
      );
    })(View);
    t.fightbeginUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/gameend');
        }),
        e
      );
    })(View);
    t.gameendUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('mj/gamestop');
        }),
        e
      );
    })(View);
    t.gamestopUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/hangup_warn');
        }),
        e
      );
    })(View);
    t.hangup_warnUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('mj/huleshow');
        }),
        e
      );
    })(View);
    t.huleshowUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('mj/hu_cutin');
        }),
        e
      );
    })(View);
    t.hu_cutinUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/info_md5');
        }),
        e
      );
    })(View);
    t.info_md5UI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('mj/liuju');
        }),
        e
      );
    })(View);
    t.liujuUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent(
            'capsui.LabelLocalizationSize',
            capsui.LabelLocalizationSize
          ),
            View.regComponent('capsui.CButton', capsui.CButton),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/live_broadcast');
        }),
        e
      );
    })(View);
    t.live_broadcastUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('Text', laya.display.Text),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/rankchange');
        }),
        e
      );
    })(View);
    t.rankchangeUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            View.regComponent('capsui.UICopy', capsui.UICopy),
            View.regComponent('capsui.CScrollView', capsui.CScrollView),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/replay');
        }),
        e
      );
    })(View);
    t.replayUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('mj/replay_whell');
        }),
        e
      );
    })(View);
    t.replay_whellUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('mj/rewardprogress');
        }),
        e
      );
    })(View);
    t.rewardprogressUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/scorechange');
        }),
        e
      );
    })(View);
    t.scorechangeUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this),
            this.loadUI('mj/task_progress');
        }),
        e
      );
    })(View);
    t.task_progressUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          t.prototype.createChildren.call(this), this.loadUI('mj/tingpai');
        }),
        e
      );
    })(View);
    t.tingpaiUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {})), (t => {
  !(t => {
    const e = (t => {
      function e() {
        return t.call(this) || this;
      }
      return (
        __extends(e, t),
        (e.prototype.createChildren = function() {
          View.regComponent('capsui.CButton', capsui.CButton),
            View.regComponent(
              'capsui.LabelLocalizationSize',
              capsui.LabelLocalizationSize
            ),
            t.prototype.createChildren.call(this),
            this.loadUI('mj/win');
        }),
        e
      );
    })(View);
    t.winUI = e;
  })(t.mj || (t.mj = {}));
})(ui || (ui = {}));