// <!-- Earth -->
//
// <!-- GLSL vertex shader for the moon -->
// <!-- <script id="norm-vert-shader" type="x-shader/x-vertex">
//     attribute vec4 tangent;
//
//     uniform vec2 uvScale;
//     uniform vec3 lightPosition;
//
//     varying vec2 vUv;
//     varying mat3 tbn;
//     varying vec3 vLightVector;
//
//     void main() {
//     vUv = uvScale * uv;
//
//     /** Create tangent-binormal-normal matrix used to transform
//     coordinates from object space to tangent space */
//     vec3 vNormal = normalize(normalMatrix * normal);
//     vec3 vTangent = normalize( normalMatrix * tangent.xyz );
//     vec3 vBinormal = normalize(cross( vNormal, vTangent ) * tangent.w);
//     tbn = mat3(vTangent, vBinormal, vNormal);
//
//     /** Calculate the vertex-to-light vector */
//     vec4 lightVector = viewMatrix * vec4(lightPosition, 1.0);
//     vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
//     vLightVector = normalize(lightVector.xyz - modelViewPosition.xyz);
//
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// </script> -->
//
// <!-- GLSL fragment shader for the moon -->
// <!-- <script id="norm-frag-shader" type="x-shader/x-fragment">
//     uniform sampler2D textureMap;
//     uniform sampler2D normalMap;
//
//     varying vec2 vUv;
//     varying mat3 tbn;
//     varying vec3 vLightVector;
//
//     void main() {
//     /** Transform texture coordinate of normal map to a range (-1, 1) */
//     vec3 normalCoordinate = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
//
//     /** Transform the normal vector in the RGB channels to tangent space */
//     vec3 normal = normalize(tbn * normalCoordinate.rgb);
//
//     /** Lighting intensity is calculated as dot of normal vector and
//     the vertex-to-light vector */
//     float intensity = max(0.07, dot(normal, vLightVector));
//     vec4 lighting = vec4(intensity, intensity, intensity, 1.0);
//
//     /** Final color is calculated with the lighting applied */
//     gl_FragColor = texture2D(textureMap, vUv) * lighting;
//     }
// </script> -->
//
//
// <!--  Custom Shader Code for atmospheric glow  -->
// <!-- <script id="vertexShaderAtmosphere" type="x-shader/x-vertex">
//     uniform vec3 viewVector;
//     uniform float c;
//     uniform float p;
//     varying float intensity;
//     void main()
//     {
//     vec3 vNormal = normalize( normalMatrix * normal );
//     vec3 vNormel = normalize( normalMatrix * viewVector );
//     intensity = pow( c - dot(vNormal, vNormel), p );
//
//     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//     }
// </script> -->
//
// <!-- fragment shader a.k.a. pixel shader -->
// <!-- <script id="fragmentShaderAtmosphere" type="x-shader/x-vertex">
//     uniform vec3 glowColor;
//     varying float intensity;
//     void main()
//     {
//     vec3 glow = glowColor * intensity;
//     gl_FragColor = vec4( glow, 1.0 );
//     }
// </script> -->
