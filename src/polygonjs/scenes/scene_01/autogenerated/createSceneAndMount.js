import { loadScene_scene_01 } from "./loadScene.js";

export const createSceneAndMount_scene_01 = async function (options = {}) {
  if (options && options.createViewer == null) {
    options.createViewer = true;
  }
  options.sceneData = {
    properties: {
      frame: 0,
      maxFrame: 600,
      maxFrameLocked: false,
      realtimeState: true,
      mainCameraPath: "/cameras/cameras:sopGroup/perspectiveCamera_MAIN",
      versions: { polygonjs: "1.2.31" },
    },
    root: {
      type: "root",
      nodes: {
        cameras: {
          type: "geo",
          nodes: {
            perspectiveCamera_MAIN: {
              type: "perspectiveCamera",
              params: { position: [-11.500000000000002, 2.6, 9.5] },
            },
            perspectiveCamera_DEBUG: {
              type: "perspectiveCamera",
              params: { position: [0, 0, 5] },
            },
            merge1: {
              type: "merge",
              inputs: ["cameraControls1", "setChildren1"],
              flags: { display: true },
            },
            polarTransform1: {
              type: "polarTransform",
              params: { depth: 4.5 },
              inputs: ["perspectiveCamera_MAIN"],
            },
            emptyObject1: { type: "emptyObject" },
            setChildren1: {
              type: "setChildren",
              inputs: ["actor1", "polarTransform1"],
            },
            cameraControls1: {
              type: "cameraControls",
              nodes: {
                cameraOrbitControls1: {
                  type: "cameraOrbitControls",
                  params: {
                    target: [
                      -0.14940670250253477, 0.0403513510033215,
                      -0.26001899601424416,
                    ],
                  },
                },
              },
              params: { node: "cameraOrbitControls1" },
              inputs: ["perspectiveCamera_DEBUG"],
            },
            actor1: {
              type: "actor",
              nodes: {
                onTick1: { type: "onTick" },
                setObjectRotation1: {
                  type: "setObjectRotation",
                  params: {
                    rotation: { overriden_options: {} },
                    lerp: { overriden_options: {} },
                    updateMatrix: { overriden_options: {} },
                  },
                  maxInputsCount: 5,
                  inputs: [
                    { index: 0, node: "onTick1", output: "trigger" },
                    null,
                    { index: 2, node: "floatToVec3_2", output: "vec3" },
                  ],
                },
                floatToVec3_2: {
                  type: "floatToVec3",
                  params: {
                    x: { overriden_options: {} },
                    y: { overriden_options: {} },
                    z: { overriden_options: {} },
                  },
                  inputs: [null, { index: 1, node: "multAdd1", output: "val" }],
                },
                multAdd1: {
                  type: "multAdd",
                  params: {
                    value: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                    preAdd: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                    mult: {
                      type: "float",
                      default_value: 1,
                      options: { spare: true, editable: true },
                      raw_input: 0.19,
                    },
                    postAdd: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                  },
                  inputs: [{ index: 0, node: "onTick1", output: "time" }],
                  connection_points: {
                    in: [
                      { name: "value", type: "float", isArray: false },
                      { name: "preAdd", type: "float", isArray: false },
                      { name: "mult", type: "float", isArray: false },
                      { name: "postAdd", type: "float", isArray: false },
                    ],
                    out: [{ name: "val", type: "float", isArray: false }],
                  },
                },
              },
              inputs: ["emptyObject1"],
            },
          },
          flags: { display: true },
        },
        lights: {
          type: "geo",
          nodes: {
            hemisphereLight1: {
              type: "hemisphereLight",
              params: { intensity: 0.78 },
            },
            areaLight1: {
              type: "areaLight",
              params: { intensity: 1.6, width: 7.1, height: 6.3 },
            },
            polarTransform1: {
              type: "polarTransform",
              params: {
                center: [0, 2.3, 0],
                longitude: 230.4,
                latitude: 36,
                depth: 6.5,
              },
              inputs: ["areaLight1"],
            },
            merge1: {
              type: "merge",
              inputs: ["polarTransform1", "hemisphereLight1"],
              flags: { display: true },
            },
          },
          flags: { display: true },
        },
        globe: {
          type: "geo",
          nodes: {
            BVH1: { type: "BVH", inputs: ["material1"] },
            objectProperties1: {
              type: "objectProperties",
              params: { tname: 1, name: "raycastTarget", visible: 0 },
              inputs: ["BVH1"],
            },
            merge1: {
              type: "merge",
              inputs: ["particlesSystemGpu1", "objectProperties1"],
              flags: { display: true },
              cloned_state_overriden: true,
            },
            attribCreate1: {
              type: "attribCreate",
              params: { name: "hovered" },
              inputs: ["delete1"],
            },
            sphere2: { type: "sphere", params: { radius: 0.995 } },
            material1: {
              type: "material",
              params: { material: "../MAT/meshBasic1" },
              inputs: ["sphere2"],
            },
            attribFromTexture1: {
              type: "attribFromTexture",
              params: { texture: "../COP/image_EARTH", attrib: "land" },
              inputs: ["icosahedron1"],
            },
            icosahedron1: {
              type: "icosahedron",
              params: { detail: 32, pointsOnly: 1 },
            },
            attribCreate2: {
              type: "attribCreate",
              params: { name: "basecolor", size: 3, value3: [1, 1, 1] },
              inputs: ["attribCreate1"],
            },
            delete1: {
              type: "delete",
              params: { byExpression: 1, expression: "@land==0" },
              inputs: ["attribFromTexture1"],
            },
            MAT: {
              type: "materialsNetwork",
              nodes: {
                meshBasic1: { type: "meshBasic", params: { color: [0, 0, 0] } },
                pointsParticles: {
                  type: "pointsBuilder",
                  nodes: {
                    output1: {
                      type: "output",
                      inputs: [
                        null,
                        null,
                        { index: 2, node: "attribute2", output: "val" },
                        { index: 3, node: "disk1", output: "float" },
                        null,
                        { index: 5, node: "mult1", output: "product" },
                      ],
                    },
                    globals1: { type: "globals" },
                    constant_point_size: {
                      type: "constant",
                      params: { float: 0.003 },
                      connection_points: {
                        in: [],
                        out: [{ name: "val", type: "float" }],
                      },
                    },
                    disk1: {
                      type: "disk",
                      params: {
                        position: { overriden_options: {} },
                        center: {
                          raw_input: [0.5, 0.5],
                          overriden_options: {},
                        },
                        radius: { raw_input: 0.23, overriden_options: {} },
                        feather: { overriden_options: {} },
                      },
                      inputs: [
                        { index: 0, node: "globals1", output: "gl_PointCoord" },
                      ],
                    },
                    attribute1: {
                      type: "attribute",
                      params: { name: "hovered" },
                      connection_points: {
                        in: [],
                        out: [{ name: "val", type: "float" }],
                      },
                    },
                    mix1: {
                      type: "mix",
                      params: {
                        value0: {
                          type: "float",
                          default_value: 0,
                          options: { spare: true, editable: false },
                        },
                        value1: {
                          type: "float",
                          default_value: 0,
                          options: { spare: true, editable: false },
                        },
                        blend: {
                          type: "float",
                          default_value: 0.5,
                          options: { spare: true, editable: false },
                        },
                      },
                      inputs: [
                        {
                          index: 0,
                          node: "constant_point_size",
                          output: "val",
                        },
                        {
                          index: 1,
                          node: "constant_point_size1",
                          output: "val",
                        },
                        { index: 2, node: "attribute1", output: "val" },
                      ],
                      connection_points: {
                        in: [
                          { name: "value0", type: "float" },
                          { name: "value1", type: "float" },
                          { name: "blend", type: "float" },
                        ],
                        out: [{ name: "mix", type: "float" }],
                      },
                    },
                    globals2: { type: "globals" },
                    vec3ToFloat1: {
                      type: "vec3ToFloat",
                      params: { vec: { overriden_options: {} } },
                      inputs: [
                        { index: 0, node: "globals2", output: "position" },
                      ],
                    },
                    compare1: {
                      type: "compare",
                      params: {
                        value0: {
                          type: "float",
                          default_value: 0,
                          options: { spare: true, editable: false },
                        },
                        value1: {
                          type: "float",
                          default_value: 0,
                          options: { spare: true, editable: true },
                        },
                      },
                      inputs: [{ index: 0, node: "vec3ToFloat1", output: "y" }],
                      connection_points: {
                        in: [
                          { name: "value0", type: "float" },
                          { name: "value1", type: "float" },
                        ],
                        out: [{ name: "val", type: "bool" }],
                      },
                    },
                    twoWaySwitch1: {
                      type: "twoWaySwitch",
                      params: {
                        condition: {
                          type: "boolean",
                          default_value: false,
                          options: { spare: true, editable: false },
                        },
                        ifTrue: {
                          type: "float",
                          default_value: 0,
                          options: { spare: true, editable: true },
                          raw_input: 0.03,
                        },
                        ifFalse: {
                          type: "float",
                          default_value: 0,
                          options: { spare: true, editable: true },
                          raw_input: 0.09,
                        },
                      },
                      inputs: [{ index: 0, node: "compare1", output: "val" }],
                      connection_points: {
                        in: [
                          { name: "condition", type: "bool" },
                          { name: "ifTrue", type: "float" },
                          { name: "ifFalse", type: "float" },
                        ],
                        out: [{ name: "val", type: "float" }],
                      },
                    },
                    constant1: {
                      type: "constant",
                      params: {
                        type: 4,
                        color: [0, 1, 0.06666666666666667],
                        asColor: 1,
                      },
                      connection_points: {
                        in: [],
                        out: [{ name: "val", type: "vec3" }],
                      },
                    },
                    constant2: {
                      type: "constant",
                      params: { type: 4, color: [1, 0, 0], asColor: true },
                      connection_points: {
                        in: [],
                        out: [{ name: "val", type: "vec3" }],
                      },
                    },
                    mix2: {
                      type: "mix",
                      params: {
                        value0: {
                          type: "vector3",
                          default_value: [0, 0, 0],
                          options: { spare: true, editable: false },
                        },
                        value1: {
                          type: "vector3",
                          default_value: [0, 0, 0],
                          options: { spare: true, editable: false },
                        },
                        blend: {
                          type: "float",
                          default_value: 0.5,
                          options: { spare: true, editable: false },
                        },
                      },
                      inputs: [
                        { index: 0, node: "constant1", output: "val" },
                        { index: 1, node: "constant2", output: "val" },
                        { index: 2, node: "attribute1", output: "val" },
                      ],
                      connection_points: {
                        in: [
                          { name: "value0", type: "vec3" },
                          { name: "value1", type: "vec3" },
                          { name: "blend", type: "float" },
                        ],
                        out: [{ name: "mix", type: "vec3" }],
                      },
                    },
                    texture1: {
                      type: "texture",
                      params: {
                        uv: { overriden_options: {} },
                        blurPixelsCountX: { overriden_options: {} },
                        blurPixelsCountY: { overriden_options: {} },
                      },
                      inputs: [{ index: 0, node: "globals2", output: "uv" }],
                    },
                    vec4ToFloat1: {
                      type: "vec4ToFloat",
                      params: { vec: { overriden_options: {} } },
                      inputs: [{ index: 0, node: "texture1", output: "rgba" }],
                    },
                    mult1: {
                      type: "mult",
                      params: {
                        mult0: {
                          type: "float",
                          default_value: 1,
                          options: { spare: true, editable: false },
                        },
                        mult1: {
                          type: "float",
                          default_value: 1,
                          options: { spare: true, editable: false },
                        },
                        mult2: {
                          type: "float",
                          default_value: 1,
                          options: { spare: true, editable: true },
                        },
                      },
                      maxInputsCount: 3,
                      inputs: [
                        { index: 0, node: "mix1", output: "mix" },
                        { index: 1, node: "fitFrom01_1", output: "val" },
                      ],
                      connection_points: {
                        in: [
                          { name: "mult0", type: "float" },
                          { name: "mult1", type: "float" },
                          { name: "mult2", type: "float" },
                        ],
                        out: [{ name: "product", type: "float" }],
                      },
                    },
                    fitFrom01_1: {
                      type: "fitFrom01",
                      params: {
                        val: {
                          type: "float",
                          default_value: 0,
                          options: { spare: true, editable: false },
                        },
                        destMin: {
                          type: "float",
                          default_value: 0,
                          options: { spare: true, editable: true },
                        },
                        destMax: {
                          type: "float",
                          default_value: 1,
                          options: { spare: true, editable: true },
                        },
                      },
                      inputs: [{ index: 0, node: "vec4ToFloat1", output: "w" }],
                      connection_points: {
                        in: [
                          { name: "val", type: "float" },
                          { name: "destMin", type: "float" },
                          { name: "destMax", type: "float" },
                        ],
                        out: [{ name: "val", type: "float" }],
                      },
                    },
                    constant_point_size1: {
                      type: "constant",
                      params: { float: 0.011999999999999999 },
                      connection_points: {
                        in: [],
                        out: [{ name: "val", type: "float" }],
                      },
                    },
                    attribute2: {
                      type: "attribute",
                      params: { name: "basecolor", type: 2 },
                      connection_points: {
                        in: [],
                        out: [{ name: "val", type: "vec3" }],
                      },
                    },
                  },
                  params: {
                    alphaTest: 0.04,
                    texture1: {
                      type: "node_path",
                      default_value: "",
                      options: {
                        spare: true,
                        computeOnDirty: true,
                        cook: false,
                        dependentOnFoundNode: true,
                        nodeSelection: { context: "cop" },
                      },
                      raw_input: "../../COP/image_EARTH",
                      overriden_options: {
                        callback: "{}",
                        nodeSelection: '{"context":"cop"}',
                      },
                    },
                  },
                  persisted_config: {
                    material: {
                      metadata: {
                        version: 4.5,
                        type: "Material",
                        generator: "Material.toJSON",
                      },
                      uuid: "/globe/MAT/pointsParticles-main",
                      type: "PointsMaterial",
                      name: "/globe/MAT/pointsParticles",
                      color: 16777215,
                      size: 1,
                      sizeAttenuation: true,
                      depthFunc: 3,
                      depthTest: true,
                      depthWrite: true,
                      colorWrite: true,
                      stencilWrite: false,
                      stencilWriteMask: 255,
                      stencilFunc: 519,
                      stencilRef: 0,
                      stencilFuncMask: 255,
                      stencilFail: 7680,
                      stencilZFail: 7680,
                      stencilZPass: 7680,
                      alphaTest: 0.04,
                      fog: false,
                    },
                    onBeforeCompileDataJSONWithoutShaders: {
                      paramConfigs: [
                        {
                          type: "node_path",
                          name: "texture1",
                          defaultValue: "",
                          uniformName: "v_POLY_texture_texture1",
                        },
                      ],
                      timeDependent: false,
                      resolutionDependent: false,
                    },
                    customMaterials: {
                      customDistanceMaterial: {
                        material: {
                          metadata: {
                            version: 4.5,
                            type: "Material",
                            generator: "Material.toJSON",
                          },
                          uuid: "/globe/MAT/pointsParticles-customDistanceMaterial",
                          type: "ShaderMaterial",
                          name: "customDistanceMaterial",
                          depthFunc: 3,
                          depthTest: true,
                          depthWrite: true,
                          colorWrite: true,
                          stencilWrite: false,
                          stencilWriteMask: 255,
                          stencilFunc: 519,
                          stencilRef: 0,
                          stencilFuncMask: 255,
                          stencilFail: 7680,
                          stencilZFail: 7680,
                          stencilZPass: 7680,
                          alphaTest: 0.04,
                          fog: false,
                          glslVersion: null,
                          uniforms: {
                            diffuse: { type: "c", value: 16777215 },
                            opacity: { value: 1 },
                            map: { value: null },
                            uvTransform: {
                              type: "m3",
                              value: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                            },
                            uv2Transform: {
                              type: "m3",
                              value: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                            },
                            alphaMap: { value: null },
                            alphaTest: { value: 0.04 },
                            displacementMap: { value: null },
                            displacementScale: { value: 1 },
                            displacementBias: { value: 0 },
                            size: { value: 1 },
                            scale: { value: 1 },
                          },
                          defines: {
                            USE_SIZEATTENUATION: 1,
                            DEPTH_PACKING: 3200,
                          },
                          vertexShader:
                            "\nuniform float size;\nuniform float scale;\n#include <common>\n#include <clipping_planes_pars_vertex>\nvarying float vViewZDepth;\n\n// INSERT DEFINES\n\n\n// vHighPrecisionZW is added to match CustomMeshDepth.frag\n// which is itself taken from threejs\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t// INSERT BODY\n\n\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewZDepth = - mvPosition.z;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\n\tvHighPrecisionZW = gl_Position.zw;\n\n}\n",
                          fragmentShader:
                            "\n// INSERT DEFINES\n\n\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\n\t// INSERT BODY\n\t// the new body lines should be added before the alphatest_fragment\n\t// so that alpha is set before (which is really how it would be set if the alphamap_fragment above was used by the material node parameters)\n\n\t#include <alphatest_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\n\t// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), diffuseColor.a );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\n\t#endif\n\n}\n",
                          lights: false,
                        },
                        onBeforeCompileDataJSONWithoutShaders: {
                          paramConfigs: [
                            {
                              type: "node_path",
                              name: "texture1",
                              defaultValue: "",
                              uniformName: "v_POLY_texture_texture1",
                            },
                          ],
                          timeDependent: false,
                          resolutionDependent: false,
                        },
                      },
                      customDepthMaterial: {
                        material: {
                          metadata: {
                            version: 4.5,
                            type: "Material",
                            generator: "Material.toJSON",
                          },
                          uuid: "/globe/MAT/pointsParticles-customDepthMaterial",
                          type: "ShaderMaterial",
                          name: "customDepthMaterial",
                          depthFunc: 3,
                          depthTest: true,
                          depthWrite: true,
                          colorWrite: true,
                          stencilWrite: false,
                          stencilWriteMask: 255,
                          stencilFunc: 519,
                          stencilRef: 0,
                          stencilFuncMask: 255,
                          stencilFail: 7680,
                          stencilZFail: 7680,
                          stencilZPass: 7680,
                          alphaTest: 0.04,
                          fog: false,
                          glslVersion: null,
                          uniforms: {
                            diffuse: { type: "c", value: 16777215 },
                            opacity: { value: 1 },
                            map: { value: null },
                            uvTransform: {
                              type: "m3",
                              value: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                            },
                            uv2Transform: {
                              type: "m3",
                              value: [1, 0, 0, 0, 1, 0, 0, 0, 1],
                            },
                            alphaMap: { value: null },
                            alphaTest: { value: 0.04 },
                            displacementMap: { value: null },
                            displacementScale: { value: 1 },
                            displacementBias: { value: 0 },
                            size: { value: 1 },
                            scale: { value: 1 },
                          },
                          defines: {
                            USE_SIZEATTENUATION: 1,
                            DEPTH_PACKING: 3201,
                          },
                          vertexShader:
                            "\nuniform float size;\nuniform float scale;\n#include <common>\n#include <clipping_planes_pars_vertex>\nvarying float vViewZDepth;\n\n// INSERT DEFINES\n\n\n// vHighPrecisionZW is added to match CustomMeshDepth.frag\n// which is itself taken from threejs\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t// INSERT BODY\n\n\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewZDepth = - mvPosition.z;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\n\tvHighPrecisionZW = gl_Position.zw;\n\n}\n",
                          fragmentShader:
                            "\n// INSERT DEFINES\n\n\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\n\t// INSERT BODY\n\t// the new body lines should be added before the alphatest_fragment\n\t// so that alpha is set before (which is really how it would be set if the alphamap_fragment above was used by the material node parameters)\n\n\t#include <alphatest_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\n\t// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), diffuseColor.a );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\n\t#endif\n\n}\n",
                          lights: false,
                        },
                        onBeforeCompileDataJSONWithoutShaders: {
                          paramConfigs: [
                            {
                              type: "node_path",
                              name: "texture1",
                              defaultValue: "",
                              uniformName: "v_POLY_texture_texture1",
                            },
                          ],
                          timeDependent: false,
                          resolutionDependent: false,
                        },
                      },
                      customDepthDOFMaterial: {
                        material: {
                          metadata: {
                            version: 4.5,
                            type: "Material",
                            generator: "Material.toJSON",
                          },
                          uuid: "/globe/MAT/pointsParticles-customDepthDOFMaterial",
                          type: "ShaderMaterial",
                          name: "customDepthDOFMaterial",
                          depthFunc: 3,
                          depthTest: true,
                          depthWrite: true,
                          colorWrite: true,
                          stencilWrite: false,
                          stencilWriteMask: 255,
                          stencilFunc: 519,
                          stencilRef: 0,
                          stencilFuncMask: 255,
                          stencilFail: 7680,
                          stencilZFail: 7680,
                          stencilZPass: 7680,
                          alphaTest: 0.04,
                          fog: false,
                          glslVersion: null,
                          uniforms: {
                            size: { value: 1 },
                            scale: { value: 1 },
                            mNear: { value: 0 },
                            mFar: { value: 10 },
                          },
                          defines: { USE_SIZEATTENUATION: 1 },
                          vertexShader:
                            "\nuniform float size;\nuniform float scale;\n#include <common>\n\nvarying float vViewZDepth;\n\n// INSERT DEFINES\n\n\n\nvoid main() {\n\n\t// INSERT BODY\n\n\n\t#include <project_vertex>\n\n\tvViewZDepth = - mvPosition.z;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\n}\n",
                          fragmentShader:
                            "\nuniform float mNear;\nuniform float mFar;\n\nvarying float vViewZDepth;\n\n// INSERT DEFINES\n\nvoid main() {\n\n\tfloat color = 1.0 - smoothstep( mNear, mFar, vViewZDepth );\n\tgl_FragColor = vec4( vec3( color ), 1.0 );\n\tvec4 diffuseColor = gl_FragColor;\n\n\t// INSERT BODY\n\n\tgl_FragColor.a = diffuseColor.a;\n}\n",
                          lights: false,
                        },
                        onBeforeCompileDataJSONWithoutShaders: {
                          paramConfigs: [
                            {
                              type: "node_path",
                              name: "texture1",
                              defaultValue: "",
                              uniformName: "v_POLY_texture_texture1",
                            },
                          ],
                          timeDependent: false,
                          resolutionDependent: false,
                        },
                      },
                    },
                  },
                },
              },
            },
            COP: {
              type: "copNetwork",
              nodes: {
                image_EARTH: {
                  type: "image",
                  params: {
                    url: "textures/earth.jpg?timestamp=1660607161363",
                    tflipY: 1,
                    flipY: 1,
                  },
                },
              },
            },
            particlesSystemGpu1: {
              type: "particlesSystemGpu",
              nodes: {
                globals1: { type: "globals" },
                output1: {
                  type: "output",
                  inputs: [{ index: 0, node: "globals1", output: "position" }],
                },
                attribute1: {
                  type: "attribute",
                  params: {
                    name: "hovered",
                    texportWhenConnected: 1,
                    in: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                  },
                  maxInputsCount: 1,
                  connection_points: {
                    in: [{ name: "in", type: "float" }],
                    out: [{ name: "val", type: "float" }],
                  },
                },
                param1: {
                  type: "param",
                  params: { name: "cursor", type: 4 },
                  connection_points: {
                    in: [],
                    out: [{ name: "val", type: "vec3" }],
                  },
                },
                distance1: {
                  type: "distance",
                  params: {
                    p0: {
                      type: "vector3",
                      default_value: [0, 0, 0],
                      options: { spare: true, editable: false },
                    },
                    p1: {
                      type: "vector3",
                      default_value: [0, 0, 0],
                      options: { spare: true, editable: false },
                    },
                  },
                  inputs: [
                    { index: 0, node: "globals1", output: "position" },
                    { index: 1, node: "param1", output: "val" },
                  ],
                  connection_points: {
                    in: [
                      { name: "p0", type: "vec3" },
                      { name: "p1", type: "vec3" },
                    ],
                    out: [{ name: "val", type: "float" }],
                  },
                },
                smoothstep1: {
                  type: "smoothstep",
                  params: {
                    edge0: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                      raw_input: 0.28,
                    },
                    edge1: {
                      type: "float",
                      default_value: 1,
                      options: { spare: true, editable: true },
                      raw_input: 0.14,
                    },
                    x: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                  },
                  inputs: [
                    null,
                    null,
                    { index: 2, node: "distance1", output: "val" },
                  ],
                  connection_points: {
                    in: [
                      { name: "edge0", type: "float" },
                      { name: "edge1", type: "float" },
                      { name: "x", type: "float" },
                    ],
                    out: [{ name: "val", type: "float" }],
                  },
                },
                attribute2: {
                  type: "attribute",
                  params: {
                    name: "hovered",
                    texportWhenConnected: 1,
                    exportWhenConnected: 1,
                    in: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                  },
                  maxInputsCount: 1,
                  inputs: [{ index: 0, node: "clamp1", output: "val" }],
                  connection_points: {
                    in: [{ name: "in", type: "float" }],
                    out: [{ name: "val", type: "float" }],
                  },
                },
                multAdd1: {
                  type: "multAdd",
                  params: {
                    value: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                    preAdd: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                    mult: {
                      type: "float",
                      default_value: 1,
                      options: { spare: true, editable: true },
                      raw_input: 0.29,
                    },
                    postAdd: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                  },
                  inputs: [{ index: 0, node: "smoothstep1", output: "val" }],
                  connection_points: {
                    in: [
                      { name: "value", type: "float" },
                      { name: "preAdd", type: "float" },
                      { name: "mult", type: "float" },
                      { name: "postAdd", type: "float" },
                    ],
                    out: [{ name: "val", type: "float" }],
                  },
                },
                add2: {
                  type: "add",
                  params: {
                    add0: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                    add1: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                    add2: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                  },
                  maxInputsCount: 3,
                  inputs: [
                    { index: 0, node: "multAdd1", output: "val" },
                    { index: 1, node: "multAdd2", output: "val" },
                  ],
                  connection_points: {
                    in: [
                      { name: "add0", type: "float" },
                      { name: "add1", type: "float" },
                      { name: "add2", type: "float" },
                    ],
                    out: [{ name: "sum", type: "float" }],
                  },
                },
                multAdd2: {
                  type: "multAdd",
                  params: {
                    value: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                    preAdd: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                    mult: {
                      type: "float",
                      default_value: 1,
                      options: { spare: true, editable: true },
                      raw_input: 0.995,
                    },
                    postAdd: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                  },
                  inputs: [{ index: 0, node: "attribute1", output: "val" }],
                  connection_points: {
                    in: [
                      { name: "value", type: "float" },
                      { name: "preAdd", type: "float" },
                      { name: "mult", type: "float" },
                      { name: "postAdd", type: "float" },
                    ],
                    out: [{ name: "val", type: "float" }],
                  },
                },
                clamp1: {
                  type: "clamp",
                  params: {
                    value: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                    min: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                    max: {
                      type: "float",
                      default_value: 1,
                      options: { spare: true, editable: true },
                    },
                  },
                  inputs: [{ index: 0, node: "add2", output: "sum" }],
                  connection_points: {
                    in: [
                      { name: "value", type: "float" },
                      { name: "min", type: "float" },
                      { name: "max", type: "float" },
                    ],
                    out: [{ name: "val", type: "float" }],
                  },
                },
                attribute3: {
                  type: "attribute",
                  params: {
                    name: "basecolor",
                    type: 2,
                    texportWhenConnected: 1,
                    in: {
                      type: "vector3",
                      default_value: [0, 0, 0],
                      options: { spare: true, editable: true },
                    },
                  },
                  maxInputsCount: 1,
                  connection_points: {
                    in: [{ name: "in", type: "vec3" }],
                    out: [{ name: "val", type: "vec3" }],
                  },
                },
                attribute4: {
                  type: "attribute",
                  params: {
                    name: "basecolor",
                    type: 2,
                    texportWhenConnected: 1,
                    exportWhenConnected: 1,
                    in: {
                      type: "vector3",
                      default_value: [0, 0, 0],
                      options: { spare: true, editable: false },
                    },
                  },
                  maxInputsCount: 1,
                  inputs: [{ index: 0, node: "mix1", output: "mix" }],
                  connection_points: {
                    in: [{ name: "in", type: "vec3" }],
                    out: [{ name: "val", type: "vec3" }],
                  },
                },
                multAdd3: {
                  type: "multAdd",
                  params: {
                    value: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: false },
                    },
                    preAdd: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                    mult: {
                      type: "float",
                      default_value: 1,
                      options: { spare: true, editable: true },
                      raw_input: 0.13,
                    },
                    postAdd: {
                      type: "float",
                      default_value: 0,
                      options: { spare: true, editable: true },
                    },
                  },
                  inputs: [{ index: 0, node: "globals1", output: "time" }],
                  connection_points: {
                    in: [
                      { name: "value", type: "float" },
                      { name: "preAdd", type: "float" },
                      { name: "mult", type: "float" },
                      { name: "postAdd", type: "float" },
                    ],
                    out: [{ name: "val", type: "float" }],
                  },
                },
                floatToVec3_1: {
                  type: "floatToVec3",
                  params: {
                    x: { overriden_options: {} },
                    y: { raw_input: 0.95, overriden_options: {} },
                    z: { raw_input: 0.83, overriden_options: {} },
                  },
                  inputs: [{ index: 0, node: "multAdd3", output: "val" }],
                },
                mix1: {
                  type: "mix",
                  params: {
                    value0: {
                      type: "vector3",
                      default_value: [0, 0, 0],
                      options: { spare: true, editable: false },
                    },
                    value1: {
                      type: "vector3",
                      default_value: [0, 0, 0],
                      options: { spare: true, editable: false },
                    },
                    blend: {
                      type: "float",
                      default_value: 0.5,
                      options: { spare: true, editable: false },
                    },
                  },
                  inputs: [
                    { index: 0, node: "attribute3", output: "val" },
                    { index: 1, node: "hsvToRgb1", output: "rgb" },
                    { index: 2, node: "multAdd1", output: "val" },
                  ],
                  connection_points: {
                    in: [
                      { name: "value0", type: "vec3" },
                      { name: "value1", type: "vec3" },
                      { name: "blend", type: "float" },
                    ],
                    out: [{ name: "mix", type: "vec3" }],
                  },
                },
                hsvToRgb1: {
                  type: "hsvToRgb",
                  params: { hsv: { overriden_options: {} } },
                  inputs: [{ index: 0, node: "floatToVec3_1", output: "vec3" }],
                },
              },
              params: {
                material: "../MAT/pointsParticles",
                cursor: {
                  type: "vector3",
                  default_value: [0, 0, 0],
                  options: {
                    spare: true,
                    computeOnDirty: true,
                    cook: false,
                    dependentOnFoundNode: true,
                  },
                  raw_input: [
                    'ch("../eventsNetwork1/raycast1/positionx")',
                    'ch("../eventsNetwork1/raycast1/positiony")',
                    'ch("../eventsNetwork1/raycast1/positionz")',
                  ],
                  overriden_options: { callback: "{}" },
                },
              },
              inputs: ["attribCreate2"],
              persisted_config: {
                texture_allocations: {
                  writable: [
                    {
                      basecolor_SEPARATOR_hovered: [
                        {
                          name: "basecolor",
                          size: 3,
                          nodes: [
                            "/globe/particlesSystemGpu1/attribute4",
                            "/globe/particlesSystemGpu1/attribute3",
                          ],
                        },
                        {
                          name: "hovered",
                          size: 1,
                          nodes: [
                            "/globe/particlesSystemGpu1/attribute2",
                            "/globe/particlesSystemGpu1/attribute1",
                          ],
                        },
                      ],
                    },
                    {
                      position: [
                        {
                          name: "position",
                          size: 3,
                          nodes: [
                            "/globe/particlesSystemGpu1/output1",
                            "/globe/particlesSystemGpu1/globals1",
                          ],
                        },
                      ],
                    },
                  ],
                  readonly: [],
                },
                param_uniform_pairs: [["cursor", "v_POLY_param_cursor"]],
                uniforms_owner: {
                  metadata: {
                    version: 4.5,
                    type: "Material",
                    generator: "Material.toJSON",
                  },
                  uuid: "/globe/particlesSystemGpu1-main",
                  type: "ShaderMaterial",
                  depthFunc: 3,
                  depthTest: true,
                  depthWrite: true,
                  colorWrite: true,
                  stencilWrite: false,
                  stencilWriteMask: 255,
                  stencilFunc: 519,
                  stencilRef: 0,
                  stencilFuncMask: 255,
                  stencilFail: 7680,
                  stencilZFail: 7680,
                  stencilZPass: 7680,
                  fog: false,
                  glslVersion: null,
                  uniforms: {
                    v_POLY_param_cursor: { type: "v3", value: [-10, -10, -10] },
                  },
                  vertexShader:
                    "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
                  fragmentShader:
                    "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",
                  lights: false,
                },
              },
            },
            eventsNetwork1: {
              type: "eventsNetwork",
              nodes: {
                raycast1: {
                  type: "raycast",
                  params: {
                    mouse: [0.9638190954773869, -0.40757238307349675],
                    objectMask: "*raycastTarget*",
                    position: [-10, -10, -10],
                  },
                  inputs: [
                    { index: 0, node: "pointer1", output: "pointermove" },
                  ],
                },
                pointer1: {
                  type: "pointer",
                  params: { pointerdown: 0, pointermove: 1 },
                },
                scene1: {
                  type: "scene",
                  params: { ready: 0, play: 0, pause: 0, tick: 0 },
                },
                setParam1: {
                  type: "setParam",
                  params: {
                    param: "../raycast1/position",
                    type: 4,
                    vector2: [-19, -19],
                    vector3: [-10, -10, -10],
                  },
                  inputs: [{ index: 0, node: "any1", output: "event" }],
                },
                any1: {
                  type: "any",
                  params: { inputsCount: 2 },
                  maxInputsCount: 2,
                  inputs: [
                    { index: 0, node: "scene1", output: "created" },
                    { index: 1, node: "scene1", output: "ready" },
                  ],
                  connection_points: {
                    in: [
                      { name: "trigger0", type: "base", isArray: false },
                      { name: "trigger1", type: "base", isArray: false },
                    ],
                    out: [{ name: "event", type: "base", isArray: false }],
                  },
                },
              },
            },
          },
          flags: { display: true },
        },
      },
      params: {
        backgroundMode: 0,
        mainCameraPath: "/cameras/cameras:sopGroup/perspectiveCamera_MAIN",
      },
    },
    shaders: {
      "/globe/MAT/pointsParticles": {
        vertex:
          "uniform float size;\nuniform float scale;\n#include <common>\n\n\n\n// /globe/MAT/pointsParticles/fitFrom01_1\n//\n//\n// FIT\n//\n//\nfloat fit(float val, float srcMin, float srcMax, float destMin, float destMax){\n\tfloat src_range = srcMax - srcMin;\n\tfloat dest_range = destMax - destMin;\n\n\tfloat r = (val - srcMin) / src_range;\n\treturn (r * dest_range) + destMin;\n}\nvec2 fit(vec2 val, vec2 srcMin, vec2 srcMax, vec2 destMin, vec2 destMax){\n\treturn vec2(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y)\n\t);\n}\nvec3 fit(vec3 val, vec3 srcMin, vec3 srcMax, vec3 destMin, vec3 destMax){\n\treturn vec3(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y),\n\t\tfit(val.z, srcMin.z, srcMax.z, destMin.z, destMax.z)\n\t);\n}\nvec4 fit(vec4 val, vec4 srcMin, vec4 srcMax, vec4 destMin, vec4 destMax){\n\treturn vec4(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y),\n\t\tfit(val.z, srcMin.z, srcMax.z, destMin.z, destMax.z),\n\t\tfit(val.w, srcMin.w, srcMax.w, destMin.w, destMax.w)\n\t);\n}\n\n//\n//\n// FIT TO 01\n// fits the range [srcMin, srcMax] to [0, 1]\n//\nfloat fitTo01(float val, float srcMin, float srcMax){\n\tfloat size = srcMax - srcMin;\n\treturn (val - srcMin) / size;\n}\nvec2 fitTo01(vec2 val, vec2 srcMin, vec2 srcMax){\n\treturn vec2(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y)\n\t);\n}\nvec3 fitTo01(vec3 val, vec3 srcMin, vec3 srcMax){\n\treturn vec3(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y),\n\t\tfitTo01(val.z, srcMin.z, srcMax.z)\n\t);\n}\nvec4 fitTo01(vec4 val, vec4 srcMin, vec4 srcMax){\n\treturn vec4(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y),\n\t\tfitTo01(val.z, srcMin.z, srcMax.z),\n\t\tfitTo01(val.w, srcMin.w, srcMax.w)\n\t);\n}\n\n//\n//\n// FIT FROM 01\n// fits the range [0, 1] to [destMin, destMax]\n//\nfloat fitFrom01(float val, float destMin, float destMax){\n\treturn fit(val, 0.0, 1.0, destMin, destMax);\n}\nvec2 fitFrom01(vec2 val, vec2 srcMin, vec2 srcMax){\n\treturn vec2(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y)\n\t);\n}\nvec3 fitFrom01(vec3 val, vec3 srcMin, vec3 srcMax){\n\treturn vec3(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y),\n\t\tfitFrom01(val.z, srcMin.z, srcMax.z)\n\t);\n}\nvec4 fitFrom01(vec4 val, vec4 srcMin, vec4 srcMax){\n\treturn vec4(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y),\n\t\tfitFrom01(val.z, srcMin.z, srcMax.z),\n\t\tfitFrom01(val.w, srcMin.w, srcMax.w)\n\t);\n}\n\n//\n//\n// FIT FROM 01 TO VARIANCE\n// fits the range [0, 1] to [center - variance, center + variance]\n//\nfloat fitFrom01ToVariance(float val, float center, float variance){\n\treturn fitFrom01(val, center - variance, center + variance);\n}\nvec2 fitFrom01ToVariance(vec2 val, vec2 center, vec2 variance){\n\treturn vec2(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y)\n\t);\n}\nvec3 fitFrom01ToVariance(vec3 val, vec3 center, vec3 variance){\n\treturn vec3(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y),\n\t\tfitFrom01ToVariance(val.z, center.z, variance.z)\n\t);\n}\nvec4 fitFrom01ToVariance(vec4 val, vec4 center, vec4 variance){\n\treturn vec4(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y),\n\t\tfitFrom01ToVariance(val.z, center.z, variance.z),\n\t\tfitFrom01ToVariance(val.w, center.w, variance.w)\n\t);\n}\n\n\n\n\n\n\n\n// /globe/MAT/pointsParticles/attribute1\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n// /globe/MAT/pointsParticles/globals2\nuniform sampler2D texture_position;\n\n// /globe/MAT/pointsParticles/texture1\nuniform sampler2D v_POLY_texture_texture1;\n\n// /globe/MAT/pointsParticles/attribute1\nvarying vec2 particles_sim_uv_varying;\n\n// /globe/MAT/pointsParticles/globals2\nvarying vec2 v_POLY_globals2_uv;\n\n// /globe/MAT/pointsParticles/attribute1\nattribute vec2 particles_sim_uv_attrib;\n\n\n\n\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\n\n\n\t// /globe/MAT/pointsParticles/constant_point_size\n\tfloat v_POLY_constant_point_size_val = 0.003;\n\t\n\t// /globe/MAT/pointsParticles/constant_point_size1\n\tfloat v_POLY_constant_point_size1_val = 0.011999999999999999;\n\t\n\t// /globe/MAT/pointsParticles/attribute1\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tfloat v_POLY_attribute1_val = texture2D( texture_basecolor_SEPARATOR_hovered, particles_sim_uv_varying ).w;\n\t\n\t// /globe/MAT/pointsParticles/globals2\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tvec3 v_POLY_globals2_position = texture2D( texture_position, particles_sim_uv_varying ).xyz;\n\tv_POLY_globals2_uv = vec2(uv);\n\t\n\t// /globe/MAT/pointsParticles/attribute2\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\t\n\t// /globe/MAT/pointsParticles/mix1\n\tfloat v_POLY_mix1_mix = mix(v_POLY_constant_point_size_val, v_POLY_constant_point_size1_val, v_POLY_attribute1_val);\n\t\n\t// /globe/MAT/pointsParticles/texture1\n\tvec4 v_POLY_texture1_rgba = texture2D(v_POLY_texture_texture1, v_POLY_globals2_uv);\n\t\n\t// /globe/MAT/pointsParticles/vec4ToFloat1\n\tfloat v_POLY_vec4ToFloat1_w = v_POLY_texture1_rgba.w;\n\t\n\t// /globe/MAT/pointsParticles/fitFrom01_1\n\tfloat v_POLY_fitFrom01_1_val = fitFrom01(v_POLY_vec4ToFloat1_w, 0.0, 1.0);\n\t\n\t// /globe/MAT/pointsParticles/mult1\n\tfloat v_POLY_mult1_product = (v_POLY_mix1_mix * v_POLY_fitFrom01_1_val * 1.0);\n\t\n\t// /globe/MAT/pointsParticles/output1\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tvec3 transformed = texture2D( texture_position, particles_sim_uv_varying ).xyz;\n\tvec3 objectNormal = normal;\n\t#ifdef USE_TANGENT\n\t\tvec3 objectTangent = vec3( tangent.xyz );\n\t#endif\n\tgl_PointSize = v_POLY_mult1_product * size * 10.0;\n\n\n\n\t#include <morphcolor_vertex>\n// removed:\n//\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n// removed:\n//\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
        fragment:
          "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n\n\n\n// /globe/MAT/pointsParticles/disk1\nfloat disk_feather(float dist, float radius, float feather){\n\tif(feather <= 0.0){\n\t\tif(dist < radius){return 1.0;}else{return 0.0;}\n\t} else {\n\t\tfloat half_feather = feather * 0.5;\n\t\tif(dist < (radius - half_feather)){\n\t\t\treturn 1.0;\n\t\t} else {\n\t\t\tif(dist > (radius + half_feather)){\n\t\t\t\treturn 0.0;\n\t\t\t} else {\n\t\t\t\tfloat feather_start = (radius - half_feather);\n\t\t\t\tfloat blend = 1.0 - (dist - feather_start) / feather;\n\t\t\t\treturn blend;\n\t\t\t}\n\t\t}\n\t}\n}\n\nfloat disk2d(vec2 pos, vec2 center, float radius, float feather){\n\tfloat dist = distance(pos, center);\n\treturn disk_feather(dist, radius, feather);\n}\n\n// function could be called sphere, but is an overload of disk, and is the same\nfloat disk3d(vec3 pos, vec3 center, float radius, float feather){\n\tfloat dist = distance(pos, center);\n\treturn disk_feather(dist, radius, feather);\n}\n\n\n\n\n\n\n\n// /globe/MAT/pointsParticles/attribute2\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n// /globe/MAT/pointsParticles/attribute1\nvarying vec2 particles_sim_uv_varying;\n\n\n\n\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\n\n\t// /globe/MAT/pointsParticles/attribute2\n\tvec3 v_POLY_attribute2_val = texture2D( texture_basecolor_SEPARATOR_hovered, particles_sim_uv_varying ).xyz;\n\t\n\t// /globe/MAT/pointsParticles/globals1\n\tvec2 v_POLY_globals1_gl_PointCoord = gl_PointCoord;\n\t\n\t// /globe/MAT/pointsParticles/disk1\n\tfloat v_POLY_disk1_float = disk2d(v_POLY_globals1_gl_PointCoord, vec2(0.5, 0.5), 0.23, 0.1);\n\t\n\t// /globe/MAT/pointsParticles/output1\n\tdiffuseColor.xyz = v_POLY_attribute2_val;\n\tdiffuseColor.a = v_POLY_disk1_float;\n\n\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
        "customDistanceMaterial.vertex":
          "\nuniform float size;\nuniform float scale;\n#include <common>\n#include <clipping_planes_pars_vertex>\nvarying float vViewZDepth;\n\n// INSERT DEFINES\n\n\n\n// /globe/MAT/pointsParticles/fitFrom01_1\n//\n//\n// FIT\n//\n//\nfloat fit(float val, float srcMin, float srcMax, float destMin, float destMax){\n\tfloat src_range = srcMax - srcMin;\n\tfloat dest_range = destMax - destMin;\n\n\tfloat r = (val - srcMin) / src_range;\n\treturn (r * dest_range) + destMin;\n}\nvec2 fit(vec2 val, vec2 srcMin, vec2 srcMax, vec2 destMin, vec2 destMax){\n\treturn vec2(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y)\n\t);\n}\nvec3 fit(vec3 val, vec3 srcMin, vec3 srcMax, vec3 destMin, vec3 destMax){\n\treturn vec3(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y),\n\t\tfit(val.z, srcMin.z, srcMax.z, destMin.z, destMax.z)\n\t);\n}\nvec4 fit(vec4 val, vec4 srcMin, vec4 srcMax, vec4 destMin, vec4 destMax){\n\treturn vec4(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y),\n\t\tfit(val.z, srcMin.z, srcMax.z, destMin.z, destMax.z),\n\t\tfit(val.w, srcMin.w, srcMax.w, destMin.w, destMax.w)\n\t);\n}\n\n//\n//\n// FIT TO 01\n// fits the range [srcMin, srcMax] to [0, 1]\n//\nfloat fitTo01(float val, float srcMin, float srcMax){\n\tfloat size = srcMax - srcMin;\n\treturn (val - srcMin) / size;\n}\nvec2 fitTo01(vec2 val, vec2 srcMin, vec2 srcMax){\n\treturn vec2(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y)\n\t);\n}\nvec3 fitTo01(vec3 val, vec3 srcMin, vec3 srcMax){\n\treturn vec3(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y),\n\t\tfitTo01(val.z, srcMin.z, srcMax.z)\n\t);\n}\nvec4 fitTo01(vec4 val, vec4 srcMin, vec4 srcMax){\n\treturn vec4(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y),\n\t\tfitTo01(val.z, srcMin.z, srcMax.z),\n\t\tfitTo01(val.w, srcMin.w, srcMax.w)\n\t);\n}\n\n//\n//\n// FIT FROM 01\n// fits the range [0, 1] to [destMin, destMax]\n//\nfloat fitFrom01(float val, float destMin, float destMax){\n\treturn fit(val, 0.0, 1.0, destMin, destMax);\n}\nvec2 fitFrom01(vec2 val, vec2 srcMin, vec2 srcMax){\n\treturn vec2(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y)\n\t);\n}\nvec3 fitFrom01(vec3 val, vec3 srcMin, vec3 srcMax){\n\treturn vec3(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y),\n\t\tfitFrom01(val.z, srcMin.z, srcMax.z)\n\t);\n}\nvec4 fitFrom01(vec4 val, vec4 srcMin, vec4 srcMax){\n\treturn vec4(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y),\n\t\tfitFrom01(val.z, srcMin.z, srcMax.z),\n\t\tfitFrom01(val.w, srcMin.w, srcMax.w)\n\t);\n}\n\n//\n//\n// FIT FROM 01 TO VARIANCE\n// fits the range [0, 1] to [center - variance, center + variance]\n//\nfloat fitFrom01ToVariance(float val, float center, float variance){\n\treturn fitFrom01(val, center - variance, center + variance);\n}\nvec2 fitFrom01ToVariance(vec2 val, vec2 center, vec2 variance){\n\treturn vec2(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y)\n\t);\n}\nvec3 fitFrom01ToVariance(vec3 val, vec3 center, vec3 variance){\n\treturn vec3(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y),\n\t\tfitFrom01ToVariance(val.z, center.z, variance.z)\n\t);\n}\nvec4 fitFrom01ToVariance(vec4 val, vec4 center, vec4 variance){\n\treturn vec4(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y),\n\t\tfitFrom01ToVariance(val.z, center.z, variance.z),\n\t\tfitFrom01ToVariance(val.w, center.w, variance.w)\n\t);\n}\n\n\n\n\n\n\n\n// /globe/MAT/pointsParticles/attribute1\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n// /globe/MAT/pointsParticles/globals2\nuniform sampler2D texture_position;\n\n// /globe/MAT/pointsParticles/texture1\nuniform sampler2D v_POLY_texture_texture1;\n\n// /globe/MAT/pointsParticles/attribute1\nvarying vec2 particles_sim_uv_varying;\n\n// /globe/MAT/pointsParticles/globals2\nvarying vec2 v_POLY_globals2_uv;\n\n// /globe/MAT/pointsParticles/attribute1\nattribute vec2 particles_sim_uv_attrib;\n\n\n\n\n\n\n// vHighPrecisionZW is added to match CustomMeshDepth.frag\n// which is itself taken from threejs\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t// INSERT BODY\n\n\n\n\t// /globe/MAT/pointsParticles/constant_point_size\n\tfloat v_POLY_constant_point_size_val = 0.003;\n\t\n\t// /globe/MAT/pointsParticles/constant_point_size1\n\tfloat v_POLY_constant_point_size1_val = 0.011999999999999999;\n\t\n\t// /globe/MAT/pointsParticles/attribute1\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tfloat v_POLY_attribute1_val = texture2D( texture_basecolor_SEPARATOR_hovered, particles_sim_uv_varying ).w;\n\t\n\t// /globe/MAT/pointsParticles/globals2\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tvec3 v_POLY_globals2_position = texture2D( texture_position, particles_sim_uv_varying ).xyz;\n\tv_POLY_globals2_uv = vec2(uv);\n\t\n\t// /globe/MAT/pointsParticles/attribute2\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\t\n\t// /globe/MAT/pointsParticles/mix1\n\tfloat v_POLY_mix1_mix = mix(v_POLY_constant_point_size_val, v_POLY_constant_point_size1_val, v_POLY_attribute1_val);\n\t\n\t// /globe/MAT/pointsParticles/texture1\n\tvec4 v_POLY_texture1_rgba = texture2D(v_POLY_texture_texture1, v_POLY_globals2_uv);\n\t\n\t// /globe/MAT/pointsParticles/vec4ToFloat1\n\tfloat v_POLY_vec4ToFloat1_w = v_POLY_texture1_rgba.w;\n\t\n\t// /globe/MAT/pointsParticles/fitFrom01_1\n\tfloat v_POLY_fitFrom01_1_val = fitFrom01(v_POLY_vec4ToFloat1_w, 0.0, 1.0);\n\t\n\t// /globe/MAT/pointsParticles/mult1\n\tfloat v_POLY_mult1_product = (v_POLY_mix1_mix * v_POLY_fitFrom01_1_val * 1.0);\n\t\n\t// /globe/MAT/pointsParticles/output1\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tvec3 transformed = texture2D( texture_position, particles_sim_uv_varying ).xyz;\n\tvec3 objectNormal = normal;\n\t#ifdef USE_TANGENT\n\t\tvec3 objectTangent = vec3( tangent.xyz );\n\t#endif\n\tgl_PointSize = v_POLY_mult1_product * size * 10.0;\n\n\n\n\n\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewZDepth = - mvPosition.z;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\n\tvHighPrecisionZW = gl_Position.zw;\n\n}\n",
        "customDistanceMaterial.fragment":
          "\n// INSERT DEFINES\n\n\n\n// /globe/MAT/pointsParticles/disk1\nfloat disk_feather(float dist, float radius, float feather){\n\tif(feather <= 0.0){\n\t\tif(dist < radius){return 1.0;}else{return 0.0;}\n\t} else {\n\t\tfloat half_feather = feather * 0.5;\n\t\tif(dist < (radius - half_feather)){\n\t\t\treturn 1.0;\n\t\t} else {\n\t\t\tif(dist > (radius + half_feather)){\n\t\t\t\treturn 0.0;\n\t\t\t} else {\n\t\t\t\tfloat feather_start = (radius - half_feather);\n\t\t\t\tfloat blend = 1.0 - (dist - feather_start) / feather;\n\t\t\t\treturn blend;\n\t\t\t}\n\t\t}\n\t}\n}\n\nfloat disk2d(vec2 pos, vec2 center, float radius, float feather){\n\tfloat dist = distance(pos, center);\n\treturn disk_feather(dist, radius, feather);\n}\n\n// function could be called sphere, but is an overload of disk, and is the same\nfloat disk3d(vec3 pos, vec3 center, float radius, float feather){\n\tfloat dist = distance(pos, center);\n\treturn disk_feather(dist, radius, feather);\n}\n\n\n\n\n\n\n\n// /globe/MAT/pointsParticles/attribute2\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n// /globe/MAT/pointsParticles/attribute1\nvarying vec2 particles_sim_uv_varying;\n\n\n\n\n\n\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\n\t// INSERT BODY\n\n\n\n\t// /globe/MAT/pointsParticles/attribute2\n\tvec3 v_POLY_attribute2_val = texture2D( texture_basecolor_SEPARATOR_hovered, particles_sim_uv_varying ).xyz;\n\t\n\t// /globe/MAT/pointsParticles/globals1\n\tvec2 v_POLY_globals1_gl_PointCoord = gl_PointCoord;\n\t\n\t// /globe/MAT/pointsParticles/disk1\n\tfloat v_POLY_disk1_float = disk2d(v_POLY_globals1_gl_PointCoord, vec2(0.5, 0.5), 0.23, 0.1);\n\t\n\t// /globe/MAT/pointsParticles/output1\n\tdiffuseColor.xyz = v_POLY_attribute2_val;\n\tdiffuseColor.a = v_POLY_disk1_float;\n\n\n\n\t// the new body lines should be added before the alphatest_fragment\n\t// so that alpha is set before (which is really how it would be set if the alphamap_fragment above was used by the material node parameters)\n\n\t#include <alphatest_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\n\t// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), diffuseColor.a );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\n\t#endif\n\n}\n",
        "customDepthMaterial.vertex":
          "\nuniform float size;\nuniform float scale;\n#include <common>\n#include <clipping_planes_pars_vertex>\nvarying float vViewZDepth;\n\n// INSERT DEFINES\n\n\n\n// /globe/MAT/pointsParticles/fitFrom01_1\n//\n//\n// FIT\n//\n//\nfloat fit(float val, float srcMin, float srcMax, float destMin, float destMax){\n\tfloat src_range = srcMax - srcMin;\n\tfloat dest_range = destMax - destMin;\n\n\tfloat r = (val - srcMin) / src_range;\n\treturn (r * dest_range) + destMin;\n}\nvec2 fit(vec2 val, vec2 srcMin, vec2 srcMax, vec2 destMin, vec2 destMax){\n\treturn vec2(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y)\n\t);\n}\nvec3 fit(vec3 val, vec3 srcMin, vec3 srcMax, vec3 destMin, vec3 destMax){\n\treturn vec3(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y),\n\t\tfit(val.z, srcMin.z, srcMax.z, destMin.z, destMax.z)\n\t);\n}\nvec4 fit(vec4 val, vec4 srcMin, vec4 srcMax, vec4 destMin, vec4 destMax){\n\treturn vec4(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y),\n\t\tfit(val.z, srcMin.z, srcMax.z, destMin.z, destMax.z),\n\t\tfit(val.w, srcMin.w, srcMax.w, destMin.w, destMax.w)\n\t);\n}\n\n//\n//\n// FIT TO 01\n// fits the range [srcMin, srcMax] to [0, 1]\n//\nfloat fitTo01(float val, float srcMin, float srcMax){\n\tfloat size = srcMax - srcMin;\n\treturn (val - srcMin) / size;\n}\nvec2 fitTo01(vec2 val, vec2 srcMin, vec2 srcMax){\n\treturn vec2(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y)\n\t);\n}\nvec3 fitTo01(vec3 val, vec3 srcMin, vec3 srcMax){\n\treturn vec3(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y),\n\t\tfitTo01(val.z, srcMin.z, srcMax.z)\n\t);\n}\nvec4 fitTo01(vec4 val, vec4 srcMin, vec4 srcMax){\n\treturn vec4(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y),\n\t\tfitTo01(val.z, srcMin.z, srcMax.z),\n\t\tfitTo01(val.w, srcMin.w, srcMax.w)\n\t);\n}\n\n//\n//\n// FIT FROM 01\n// fits the range [0, 1] to [destMin, destMax]\n//\nfloat fitFrom01(float val, float destMin, float destMax){\n\treturn fit(val, 0.0, 1.0, destMin, destMax);\n}\nvec2 fitFrom01(vec2 val, vec2 srcMin, vec2 srcMax){\n\treturn vec2(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y)\n\t);\n}\nvec3 fitFrom01(vec3 val, vec3 srcMin, vec3 srcMax){\n\treturn vec3(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y),\n\t\tfitFrom01(val.z, srcMin.z, srcMax.z)\n\t);\n}\nvec4 fitFrom01(vec4 val, vec4 srcMin, vec4 srcMax){\n\treturn vec4(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y),\n\t\tfitFrom01(val.z, srcMin.z, srcMax.z),\n\t\tfitFrom01(val.w, srcMin.w, srcMax.w)\n\t);\n}\n\n//\n//\n// FIT FROM 01 TO VARIANCE\n// fits the range [0, 1] to [center - variance, center + variance]\n//\nfloat fitFrom01ToVariance(float val, float center, float variance){\n\treturn fitFrom01(val, center - variance, center + variance);\n}\nvec2 fitFrom01ToVariance(vec2 val, vec2 center, vec2 variance){\n\treturn vec2(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y)\n\t);\n}\nvec3 fitFrom01ToVariance(vec3 val, vec3 center, vec3 variance){\n\treturn vec3(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y),\n\t\tfitFrom01ToVariance(val.z, center.z, variance.z)\n\t);\n}\nvec4 fitFrom01ToVariance(vec4 val, vec4 center, vec4 variance){\n\treturn vec4(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y),\n\t\tfitFrom01ToVariance(val.z, center.z, variance.z),\n\t\tfitFrom01ToVariance(val.w, center.w, variance.w)\n\t);\n}\n\n\n\n\n\n\n\n// /globe/MAT/pointsParticles/attribute1\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n// /globe/MAT/pointsParticles/globals2\nuniform sampler2D texture_position;\n\n// /globe/MAT/pointsParticles/texture1\nuniform sampler2D v_POLY_texture_texture1;\n\n// /globe/MAT/pointsParticles/attribute1\nvarying vec2 particles_sim_uv_varying;\n\n// /globe/MAT/pointsParticles/globals2\nvarying vec2 v_POLY_globals2_uv;\n\n// /globe/MAT/pointsParticles/attribute1\nattribute vec2 particles_sim_uv_attrib;\n\n\n\n\n\n\n// vHighPrecisionZW is added to match CustomMeshDepth.frag\n// which is itself taken from threejs\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t// INSERT BODY\n\n\n\n\t// /globe/MAT/pointsParticles/constant_point_size\n\tfloat v_POLY_constant_point_size_val = 0.003;\n\t\n\t// /globe/MAT/pointsParticles/constant_point_size1\n\tfloat v_POLY_constant_point_size1_val = 0.011999999999999999;\n\t\n\t// /globe/MAT/pointsParticles/attribute1\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tfloat v_POLY_attribute1_val = texture2D( texture_basecolor_SEPARATOR_hovered, particles_sim_uv_varying ).w;\n\t\n\t// /globe/MAT/pointsParticles/globals2\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tvec3 v_POLY_globals2_position = texture2D( texture_position, particles_sim_uv_varying ).xyz;\n\tv_POLY_globals2_uv = vec2(uv);\n\t\n\t// /globe/MAT/pointsParticles/attribute2\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\t\n\t// /globe/MAT/pointsParticles/mix1\n\tfloat v_POLY_mix1_mix = mix(v_POLY_constant_point_size_val, v_POLY_constant_point_size1_val, v_POLY_attribute1_val);\n\t\n\t// /globe/MAT/pointsParticles/texture1\n\tvec4 v_POLY_texture1_rgba = texture2D(v_POLY_texture_texture1, v_POLY_globals2_uv);\n\t\n\t// /globe/MAT/pointsParticles/vec4ToFloat1\n\tfloat v_POLY_vec4ToFloat1_w = v_POLY_texture1_rgba.w;\n\t\n\t// /globe/MAT/pointsParticles/fitFrom01_1\n\tfloat v_POLY_fitFrom01_1_val = fitFrom01(v_POLY_vec4ToFloat1_w, 0.0, 1.0);\n\t\n\t// /globe/MAT/pointsParticles/mult1\n\tfloat v_POLY_mult1_product = (v_POLY_mix1_mix * v_POLY_fitFrom01_1_val * 1.0);\n\t\n\t// /globe/MAT/pointsParticles/output1\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tvec3 transformed = texture2D( texture_position, particles_sim_uv_varying ).xyz;\n\tvec3 objectNormal = normal;\n\t#ifdef USE_TANGENT\n\t\tvec3 objectTangent = vec3( tangent.xyz );\n\t#endif\n\tgl_PointSize = v_POLY_mult1_product * size * 10.0;\n\n\n\n\n\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewZDepth = - mvPosition.z;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\n\tvHighPrecisionZW = gl_Position.zw;\n\n}\n",
        "customDepthMaterial.fragment":
          "\n// INSERT DEFINES\n\n\n\n// /globe/MAT/pointsParticles/disk1\nfloat disk_feather(float dist, float radius, float feather){\n\tif(feather <= 0.0){\n\t\tif(dist < radius){return 1.0;}else{return 0.0;}\n\t} else {\n\t\tfloat half_feather = feather * 0.5;\n\t\tif(dist < (radius - half_feather)){\n\t\t\treturn 1.0;\n\t\t} else {\n\t\t\tif(dist > (radius + half_feather)){\n\t\t\t\treturn 0.0;\n\t\t\t} else {\n\t\t\t\tfloat feather_start = (radius - half_feather);\n\t\t\t\tfloat blend = 1.0 - (dist - feather_start) / feather;\n\t\t\t\treturn blend;\n\t\t\t}\n\t\t}\n\t}\n}\n\nfloat disk2d(vec2 pos, vec2 center, float radius, float feather){\n\tfloat dist = distance(pos, center);\n\treturn disk_feather(dist, radius, feather);\n}\n\n// function could be called sphere, but is an overload of disk, and is the same\nfloat disk3d(vec3 pos, vec3 center, float radius, float feather){\n\tfloat dist = distance(pos, center);\n\treturn disk_feather(dist, radius, feather);\n}\n\n\n\n\n\n\n\n// /globe/MAT/pointsParticles/attribute2\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n// /globe/MAT/pointsParticles/attribute1\nvarying vec2 particles_sim_uv_varying;\n\n\n\n\n\n\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <clipping_planes_fragment>\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\n\t// INSERT BODY\n\n\n\n\t// /globe/MAT/pointsParticles/attribute2\n\tvec3 v_POLY_attribute2_val = texture2D( texture_basecolor_SEPARATOR_hovered, particles_sim_uv_varying ).xyz;\n\t\n\t// /globe/MAT/pointsParticles/globals1\n\tvec2 v_POLY_globals1_gl_PointCoord = gl_PointCoord;\n\t\n\t// /globe/MAT/pointsParticles/disk1\n\tfloat v_POLY_disk1_float = disk2d(v_POLY_globals1_gl_PointCoord, vec2(0.5, 0.5), 0.23, 0.1);\n\t\n\t// /globe/MAT/pointsParticles/output1\n\tdiffuseColor.xyz = v_POLY_attribute2_val;\n\tdiffuseColor.a = v_POLY_disk1_float;\n\n\n\n\t// the new body lines should be added before the alphatest_fragment\n\t// so that alpha is set before (which is really how it would be set if the alphamap_fragment above was used by the material node parameters)\n\n\t#include <alphatest_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\n\t// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), diffuseColor.a );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\n\t#endif\n\n}\n",
        "customDepthDOFMaterial.vertex":
          "\nuniform float size;\nuniform float scale;\n#include <common>\n\nvarying float vViewZDepth;\n\n// INSERT DEFINES\n\n\n\n// /globe/MAT/pointsParticles/fitFrom01_1\n//\n//\n// FIT\n//\n//\nfloat fit(float val, float srcMin, float srcMax, float destMin, float destMax){\n\tfloat src_range = srcMax - srcMin;\n\tfloat dest_range = destMax - destMin;\n\n\tfloat r = (val - srcMin) / src_range;\n\treturn (r * dest_range) + destMin;\n}\nvec2 fit(vec2 val, vec2 srcMin, vec2 srcMax, vec2 destMin, vec2 destMax){\n\treturn vec2(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y)\n\t);\n}\nvec3 fit(vec3 val, vec3 srcMin, vec3 srcMax, vec3 destMin, vec3 destMax){\n\treturn vec3(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y),\n\t\tfit(val.z, srcMin.z, srcMax.z, destMin.z, destMax.z)\n\t);\n}\nvec4 fit(vec4 val, vec4 srcMin, vec4 srcMax, vec4 destMin, vec4 destMax){\n\treturn vec4(\n\t\tfit(val.x, srcMin.x, srcMax.x, destMin.x, destMax.x),\n\t\tfit(val.y, srcMin.y, srcMax.y, destMin.y, destMax.y),\n\t\tfit(val.z, srcMin.z, srcMax.z, destMin.z, destMax.z),\n\t\tfit(val.w, srcMin.w, srcMax.w, destMin.w, destMax.w)\n\t);\n}\n\n//\n//\n// FIT TO 01\n// fits the range [srcMin, srcMax] to [0, 1]\n//\nfloat fitTo01(float val, float srcMin, float srcMax){\n\tfloat size = srcMax - srcMin;\n\treturn (val - srcMin) / size;\n}\nvec2 fitTo01(vec2 val, vec2 srcMin, vec2 srcMax){\n\treturn vec2(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y)\n\t);\n}\nvec3 fitTo01(vec3 val, vec3 srcMin, vec3 srcMax){\n\treturn vec3(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y),\n\t\tfitTo01(val.z, srcMin.z, srcMax.z)\n\t);\n}\nvec4 fitTo01(vec4 val, vec4 srcMin, vec4 srcMax){\n\treturn vec4(\n\t\tfitTo01(val.x, srcMin.x, srcMax.x),\n\t\tfitTo01(val.y, srcMin.y, srcMax.y),\n\t\tfitTo01(val.z, srcMin.z, srcMax.z),\n\t\tfitTo01(val.w, srcMin.w, srcMax.w)\n\t);\n}\n\n//\n//\n// FIT FROM 01\n// fits the range [0, 1] to [destMin, destMax]\n//\nfloat fitFrom01(float val, float destMin, float destMax){\n\treturn fit(val, 0.0, 1.0, destMin, destMax);\n}\nvec2 fitFrom01(vec2 val, vec2 srcMin, vec2 srcMax){\n\treturn vec2(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y)\n\t);\n}\nvec3 fitFrom01(vec3 val, vec3 srcMin, vec3 srcMax){\n\treturn vec3(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y),\n\t\tfitFrom01(val.z, srcMin.z, srcMax.z)\n\t);\n}\nvec4 fitFrom01(vec4 val, vec4 srcMin, vec4 srcMax){\n\treturn vec4(\n\t\tfitFrom01(val.x, srcMin.x, srcMax.x),\n\t\tfitFrom01(val.y, srcMin.y, srcMax.y),\n\t\tfitFrom01(val.z, srcMin.z, srcMax.z),\n\t\tfitFrom01(val.w, srcMin.w, srcMax.w)\n\t);\n}\n\n//\n//\n// FIT FROM 01 TO VARIANCE\n// fits the range [0, 1] to [center - variance, center + variance]\n//\nfloat fitFrom01ToVariance(float val, float center, float variance){\n\treturn fitFrom01(val, center - variance, center + variance);\n}\nvec2 fitFrom01ToVariance(vec2 val, vec2 center, vec2 variance){\n\treturn vec2(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y)\n\t);\n}\nvec3 fitFrom01ToVariance(vec3 val, vec3 center, vec3 variance){\n\treturn vec3(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y),\n\t\tfitFrom01ToVariance(val.z, center.z, variance.z)\n\t);\n}\nvec4 fitFrom01ToVariance(vec4 val, vec4 center, vec4 variance){\n\treturn vec4(\n\t\tfitFrom01ToVariance(val.x, center.x, variance.x),\n\t\tfitFrom01ToVariance(val.y, center.y, variance.y),\n\t\tfitFrom01ToVariance(val.z, center.z, variance.z),\n\t\tfitFrom01ToVariance(val.w, center.w, variance.w)\n\t);\n}\n\n\n\n\n\n\n\n// /globe/MAT/pointsParticles/attribute1\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n// /globe/MAT/pointsParticles/globals2\nuniform sampler2D texture_position;\n\n// /globe/MAT/pointsParticles/texture1\nuniform sampler2D v_POLY_texture_texture1;\n\n// /globe/MAT/pointsParticles/attribute1\nvarying vec2 particles_sim_uv_varying;\n\n// /globe/MAT/pointsParticles/globals2\nvarying vec2 v_POLY_globals2_uv;\n\n// /globe/MAT/pointsParticles/attribute1\nattribute vec2 particles_sim_uv_attrib;\n\n\n\n\n\n\n\nvoid main() {\n\n\t// INSERT BODY\n\n\n\n\t// /globe/MAT/pointsParticles/constant_point_size\n\tfloat v_POLY_constant_point_size_val = 0.003;\n\t\n\t// /globe/MAT/pointsParticles/constant_point_size1\n\tfloat v_POLY_constant_point_size1_val = 0.011999999999999999;\n\t\n\t// /globe/MAT/pointsParticles/attribute1\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tfloat v_POLY_attribute1_val = texture2D( texture_basecolor_SEPARATOR_hovered, particles_sim_uv_varying ).w;\n\t\n\t// /globe/MAT/pointsParticles/globals2\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tvec3 v_POLY_globals2_position = texture2D( texture_position, particles_sim_uv_varying ).xyz;\n\tv_POLY_globals2_uv = vec2(uv);\n\t\n\t// /globe/MAT/pointsParticles/attribute2\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\t\n\t// /globe/MAT/pointsParticles/mix1\n\tfloat v_POLY_mix1_mix = mix(v_POLY_constant_point_size_val, v_POLY_constant_point_size1_val, v_POLY_attribute1_val);\n\t\n\t// /globe/MAT/pointsParticles/texture1\n\tvec4 v_POLY_texture1_rgba = texture2D(v_POLY_texture_texture1, v_POLY_globals2_uv);\n\t\n\t// /globe/MAT/pointsParticles/vec4ToFloat1\n\tfloat v_POLY_vec4ToFloat1_w = v_POLY_texture1_rgba.w;\n\t\n\t// /globe/MAT/pointsParticles/fitFrom01_1\n\tfloat v_POLY_fitFrom01_1_val = fitFrom01(v_POLY_vec4ToFloat1_w, 0.0, 1.0);\n\t\n\t// /globe/MAT/pointsParticles/mult1\n\tfloat v_POLY_mult1_product = (v_POLY_mix1_mix * v_POLY_fitFrom01_1_val * 1.0);\n\t\n\t// /globe/MAT/pointsParticles/output1\n\tparticles_sim_uv_varying = particles_sim_uv_attrib;\n\tvec3 transformed = texture2D( texture_position, particles_sim_uv_varying ).xyz;\n\tvec3 objectNormal = normal;\n\t#ifdef USE_TANGENT\n\t\tvec3 objectTangent = vec3( tangent.xyz );\n\t#endif\n\tgl_PointSize = v_POLY_mult1_product * size * 10.0;\n\n\n\n\n\n\t#include <project_vertex>\n\n\tvViewZDepth = - mvPosition.z;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\n}\n",
        "customDepthDOFMaterial.fragment":
          "\nuniform float mNear;\nuniform float mFar;\n\nvarying float vViewZDepth;\n\n// INSERT DEFINES\n\nvoid main() {\n\n\tfloat color = 1.0 - smoothstep( mNear, mFar, vViewZDepth );\n\tgl_FragColor = vec4( vec3( color ), 1.0 );\n\tvec4 diffuseColor = gl_FragColor;\n\n\t// INSERT BODY\n\n\tgl_FragColor.a = diffuseColor.a;\n}\n",
      },
      "/globe/particlesSystemGpu1": {
        basecolor_SEPARATOR_hovered:
          "#include <common>\n\n// removed:\n//// INSERT DEFINE\n\n\n\n// /globe/particlesSystemGpu1/hsvToRgb1\n// https://github.com/hughsk/glsl-hsv2rgb\n// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl\nvec3 hsv2rgb(vec3 c) {\n\tvec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n\tvec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n\treturn c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\n\n\n\n\n\n\n// /globe/particlesSystemGpu1/globals1\nuniform sampler2D texture_position;\nuniform float time;\n\n// /globe/particlesSystemGpu1/param1\nuniform vec3 v_POLY_param_cursor;\n\n// /globe/particlesSystemGpu1/attribute1\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n\n\n\n\nvoid main() {\n\n\tvec2 particleUV = (gl_FragCoord.xy / resolution.xy);\n\n// removed:\n//\t// INSERT BODY\n\n\n\n\t// /globe/particlesSystemGpu1/globals1\n\tvec3 v_POLY_globals1_position = texture2D( texture_position, particleUV ).xyz;\n\tfloat v_POLY_globals1_time = time;\n\t\n\t// /globe/particlesSystemGpu1/param1\n\tvec3 v_POLY_param1_val = v_POLY_param_cursor;\n\t\n\t// /globe/particlesSystemGpu1/attribute1\n\tfloat v_POLY_attribute1_val = texture2D( texture_basecolor_SEPARATOR_hovered, particleUV ).w;\n\tgl_FragColor.w = v_POLY_attribute1_val;\n\t\n\t// /globe/particlesSystemGpu1/attribute3\n\tvec3 v_POLY_attribute3_val = texture2D( texture_basecolor_SEPARATOR_hovered, particleUV ).xyz;\n\tgl_FragColor.xyz = v_POLY_attribute3_val;\n\t\n\t// /globe/particlesSystemGpu1/distance1\n\tfloat v_POLY_distance1_val = distance(v_POLY_globals1_position, v_POLY_param1_val);\n\t\n\t// /globe/particlesSystemGpu1/multAdd2\n\tfloat v_POLY_multAdd2_val = (0.995*(v_POLY_attribute1_val + 0.0)) + 0.0;\n\t\n\t// /globe/particlesSystemGpu1/multAdd3\n\tfloat v_POLY_multAdd3_val = (0.13*(v_POLY_globals1_time + 0.0)) + 0.0;\n\t\n\t// /globe/particlesSystemGpu1/smoothstep1\n\tfloat v_POLY_smoothstep1_val = smoothstep(0.28, 0.14, v_POLY_distance1_val);\n\t\n\t// /globe/particlesSystemGpu1/floatToVec3_1\n\tvec3 v_POLY_floatToVec3_1_vec3 = vec3(v_POLY_multAdd3_val, 0.95, 0.83);\n\t\n\t// /globe/particlesSystemGpu1/multAdd1\n\tfloat v_POLY_multAdd1_val = (0.29*(v_POLY_smoothstep1_val + 0.0)) + 0.0;\n\t\n\t// /globe/particlesSystemGpu1/hsvToRgb1\n\tvec3 v_POLY_hsvToRgb1_rgb = hsv2rgb(v_POLY_floatToVec3_1_vec3);\n\t\n\t// /globe/particlesSystemGpu1/add2\n\tfloat v_POLY_add2_sum = (v_POLY_multAdd1_val + v_POLY_multAdd2_val + 0.0);\n\t\n\t// /globe/particlesSystemGpu1/mix1\n\tvec3 v_POLY_mix1_mix = mix(v_POLY_attribute3_val, v_POLY_hsvToRgb1_rgb, v_POLY_multAdd1_val);\n\t\n\t// /globe/particlesSystemGpu1/clamp1\n\tfloat v_POLY_clamp1_val = clamp(v_POLY_add2_sum, 0.0, 1.0);\n\t\n\t// /globe/particlesSystemGpu1/attribute4\n\tgl_FragColor.xyz = v_POLY_mix1_mix;\n\t\n\t// /globe/particlesSystemGpu1/attribute2\n\tgl_FragColor.w = v_POLY_clamp1_val;\n\n\n\n\n}",
        position:
          "#include <common>\n\n// removed:\n//// INSERT DEFINE\n\n\n\n// /globe/particlesSystemGpu1/hsvToRgb1\n// https://github.com/hughsk/glsl-hsv2rgb\n// https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl\nvec3 hsv2rgb(vec3 c) {\n\tvec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n\tvec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n\treturn c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\n\n\n\n\n\n\n\n// /globe/particlesSystemGpu1/globals1\nuniform sampler2D texture_position;\nuniform float time;\n\n// /globe/particlesSystemGpu1/param1\nuniform vec3 v_POLY_param_cursor;\n\n// /globe/particlesSystemGpu1/attribute1\nuniform sampler2D texture_basecolor_SEPARATOR_hovered;\n\n\n\n\n\nvoid main() {\n\n\tvec2 particleUV = (gl_FragCoord.xy / resolution.xy);\n\n// removed:\n//\t// INSERT BODY\n\n\n\n\t// /globe/particlesSystemGpu1/globals1\n\tvec3 v_POLY_globals1_position = texture2D( texture_position, particleUV ).xyz;\n\tfloat v_POLY_globals1_time = time;\n\t\n\t// /globe/particlesSystemGpu1/param1\n\tvec3 v_POLY_param1_val = v_POLY_param_cursor;\n\t\n\t// /globe/particlesSystemGpu1/attribute1\n\tfloat v_POLY_attribute1_val = texture2D( texture_basecolor_SEPARATOR_hovered, particleUV ).w;\n\t\n\t// /globe/particlesSystemGpu1/attribute3\n\tvec3 v_POLY_attribute3_val = texture2D( texture_basecolor_SEPARATOR_hovered, particleUV ).xyz;\n\t\n\t// /globe/particlesSystemGpu1/distance1\n\tfloat v_POLY_distance1_val = distance(v_POLY_globals1_position, v_POLY_param1_val);\n\t\n\t// /globe/particlesSystemGpu1/multAdd2\n\tfloat v_POLY_multAdd2_val = (0.995*(v_POLY_attribute1_val + 0.0)) + 0.0;\n\t\n\t// /globe/particlesSystemGpu1/multAdd3\n\tfloat v_POLY_multAdd3_val = (0.13*(v_POLY_globals1_time + 0.0)) + 0.0;\n\t\n\t// /globe/particlesSystemGpu1/output1\n\tgl_FragColor.xyz = v_POLY_globals1_position;\n\t\n\t// /globe/particlesSystemGpu1/smoothstep1\n\tfloat v_POLY_smoothstep1_val = smoothstep(0.28, 0.14, v_POLY_distance1_val);\n\t\n\t// /globe/particlesSystemGpu1/floatToVec3_1\n\tvec3 v_POLY_floatToVec3_1_vec3 = vec3(v_POLY_multAdd3_val, 0.95, 0.83);\n\t\n\t// /globe/particlesSystemGpu1/multAdd1\n\tfloat v_POLY_multAdd1_val = (0.29*(v_POLY_smoothstep1_val + 0.0)) + 0.0;\n\t\n\t// /globe/particlesSystemGpu1/hsvToRgb1\n\tvec3 v_POLY_hsvToRgb1_rgb = hsv2rgb(v_POLY_floatToVec3_1_vec3);\n\t\n\t// /globe/particlesSystemGpu1/add2\n\tfloat v_POLY_add2_sum = (v_POLY_multAdd1_val + v_POLY_multAdd2_val + 0.0);\n\t\n\t// /globe/particlesSystemGpu1/mix1\n\tvec3 v_POLY_mix1_mix = mix(v_POLY_attribute3_val, v_POLY_hsvToRgb1_rgb, v_POLY_multAdd1_val);\n\t\n\t// /globe/particlesSystemGpu1/clamp1\n\tfloat v_POLY_clamp1_val = clamp(v_POLY_add2_sum, 0.0, 1.0);\n\n\n\n\n}",
      },
    },
  };
  return loadScene_scene_01(options);
};
