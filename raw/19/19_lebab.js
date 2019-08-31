let caps;
!(t => {
  const e = (() => {
    function t() {}
    return Object.defineProperty(t, 'filename', {
      get() {
        return 'shader_ranshao';
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(t, 'attributeMap', {
      get() {
        return {
          a_BoneIndices: Laya.VertexElementUsage.BLENDINDICES0,
          a_BoneWeights: Laya.VertexElementUsage.BLENDWEIGHT0,
          a_Position: Laya.VertexElementUsage.POSITION0,
          a_Normal: Laya.VertexElementUsage.NORMAL0,
          a_Texcoord: Laya.VertexElementUsage.TEXTURECOORDINATE0
        };
      },
      enumerable: !0,
      configurable: !0
    }),
    Object.defineProperty(t, 'uniformMap', {
      get() {
        return {
          u_CameraPos: [
            Laya.BaseCamera.CAMERAPOS,
            Laya.Shader3D.PERIOD_CAMERA
          ],
          u_MvpMatrix: [Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE],
          u_WorldMat: [
            Laya.Sprite3D.WORLDMATRIX,
            Laya.Shader3D.PERIOD_SPRITE
          ],
          u_texture1: [this.TEXTURE1, Laya.Shader3D.PERIOD_MATERIAL],
          u_texture2: [this.TEXTURE2, Laya.Shader3D.PERIOD_MATERIAL],
          u_texture_mask: [this.TEXTURE_MASK, Laya.Shader3D.PERIOD_MATERIAL],
          u_alpha_clip: [this.ALPHA_CLIP, Laya.Shader3D.PERIOD_MATERIAL],
          'u_DirectionLight.Direction': [
            Laya.Scene.LIGHTDIRECTION,
            Laya.Shader3D.PERIOD_SCENE
          ],
          'u_DirectionLight.Diffuse': [
            Laya.Scene.LIGHTDIRCOLOR,
            Laya.Shader3D.PERIOD_SCENE
          ],
          u_bound: [this.BOUND, Laya.Shader3D.PERIOD_MATERIAL]
        };
      },
      enumerable: !0,
      configurable: !0
    }),
    (t.TEXTURE1 = 1),
    (t.TEXTURE2 = 2),
    (t.TEXTURE_MASK = 3),
    (t.ALPHA_CLIP = 4),
    (t.BOUND = 5),
    t
  ;
  })();
  t.Shader_RanShao = e;
})(caps || (caps = {}));