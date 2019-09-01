let caps;
!(t => {
  const e = (() => {
    function t() {}
    return Object.defineProperty(t, 'filename', {
      get() {
        return 'outline';
      },
      enumerable: true,
      configurable: true
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
      enumerable: true,
      configurable: true
    }),
    Object.defineProperty(t, 'uniformMap', {
      get() {
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
          'u_SpotLight.Position': [
            Laya.Scene.SPOTLIGHTPOS,
            Laya.Shader3D.PERIOD_SCENE
          ],
          'u_DirectionLight.Diffuse': [
            Laya.Scene.LIGHTDIRCOLOR,
            Laya.Shader3D.PERIOD_SCENE
          ],
          u_outline: [this.OUTLINE, Laya.Shader3D.PERIOD_MATERIAL],
          u_outline_color: [
            this.OUTLINE_COLOR,
            Laya.Shader3D.PERIOD_MATERIAL
          ],
          u_outline_alpha: [this.OUTLINE_ALPHA, Laya.Shader3D.PERIOD_MATERIAL]
        };
      },
      enumerable: true,
      configurable: true
    }),
    (t.OUTLINE = 1),
    (t.OUTLINE_COLOR = 2),
    (t.OUTLINE_ALPHA = 3),
    t
  ;
  })();
  t.Outline = e;
})(caps || (caps = {}));