var caps;
!(function(t) {
  var e = (function() {
    function t() {}
    return (
      Object.defineProperty(t, 'filename', {
        get: function() {
          return 'cartoon';
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(t, 'attributeMap', {
        get: function() {
          return {
            a_BoneIndices: Laya.VertexElementUsage.BLENDINDICES0,
            a_BoneWeights: Laya.VertexElementUsage.BLENDWEIGHT0,
            a_Position: Laya.VertexElementUsage.POSITION0,
            a_Normal: Laya.VertexElementUsage.NORMAL0,
            a_Texcoord: Laya.VertexElementUsage.TEXTURECOORDINATE0
          };
        },
        enumerable: true,
        configurable: true
      }),
      Object.defineProperty(t, 'uniformMap', {
        get: function() {
          return {
            u_Bones: [
              Laya.SkinnedMeshSprite3D.BONES,
              Laya.Shader3D.PERIOD_RENDERELEMENT
            ],
            u_CameraPos: [
              Laya.BaseCamera.CAMERAPOS,
              Laya.Shader3D.PERIOD_CAMERA
            ],
            u_MvpMatrix: [Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE],
            u_WorldMat: [
              Laya.Sprite3D.WORLDMATRIX,
              Laya.Shader3D.PERIOD_SPRITE
            ],
            u_texture: [this.TEXTURE, Laya.Shader3D.PERIOD_MATERIAL],
            'u_DirectionLight.Direction': [
              Laya.Scene.LIGHTDIRECTION,
              Laya.Shader3D.PERIOD_SCENE
            ],
            'u_DirectionLight.Diffuse': [
              Laya.Scene.LIGHTDIRCOLOR,
              Laya.Shader3D.PERIOD_SCENE
            ],
            u_split: [this.SPLIT, Laya.Shader3D.PERIOD_MATERIAL],
            u_color: [this.COLOR, Laya.Shader3D.PERIOD_MATERIAL],
            u_color_light: [this.COLOR_LIGHT, Laya.Shader3D.PERIOD_MATERIAL],
            u_color_unlight: [this.COLOR_UNLIGHT, Laya.Shader3D.PERIOD_MATERIAL]
          };
        },
        enumerable: true,
        configurable: true
      }),
      (t.TEXTURE = 1),
      (t.COLOR = 2),
      (t.SPLIT = 10),
      (t.COLOR_LIGHT = 30),
      (t.COLOR_UNLIGHT = 31),
      t
    );
  })();
  t.Cartoon = e;
})(caps || (caps = {}));