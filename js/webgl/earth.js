(function () {

    var webglEl = document.getElementById('earth');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }

    var width = window.innerWidth,
            height = window.innerHeight,
            height = 777;

    var radius = 0.5,
            segments = 64,
            rotation = 6;

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 3500, 15000);
    scene.fog.color.setHSL(0.51, 0.4, 0.01);

    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 2000000);
    camera.position.z = 1.85;
    camera.position.y = -0.3;
    camera.position.x = 0.5;

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap;

    scene.add(new THREE.AmbientLight(0x0c0c0c));



    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);

    light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 1);
    light.position.set(10, 6, 10);
    light.target.position.set(0, 0, 0);

    light.castShadow = true;

    light.shadowCameraNear = 2;
    light.shadowCameraFar = 25;
    light.shadowCameraFov = 10;

    light.shadowBias = 0.0001;
    light.shadowDarkness = 0.5;

    light.shadowMapWidth = window.innerWidth;
    light.shadowMapHeight = window.innerHeight;

    scene.add(light);

    var textureFlare0 = THREE.ImageUtils.loadTexture("img/space/lensflare/lensflare0.png");
    var textureFlare2 = THREE.ImageUtils.loadTexture("img/space/lensflare/lensflare2.png");
    var textureFlare3 = THREE.ImageUtils.loadTexture("img/space/lensflare/lensflare3.png");

    addLight(0.55, 0.9, 0.5, 100, 60, 100);

    function addLight(h, s, l, x, y, z) {

        var light = new THREE.PointLight(0xffffff, 0.2, 4500);
        light.color.setHSL(h, s, l);
        light.position.set(x, y, z);
        scene.add(light);

        var flareColor = new THREE.Color(0xffffff);
        flareColor.setHSL(h, s, l + 0.5);

        var lensFlare = new THREE.LensFlare(textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor);

        lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
        lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);
        lensFlare.add(textureFlare2, 512, 0.0, THREE.AdditiveBlending);

        lensFlare.add(textureFlare3, 60, 0.6, THREE.AdditiveBlending);
        lensFlare.add(textureFlare3, 70, 0.7, THREE.AdditiveBlending);
        lensFlare.add(textureFlare3, 120, 0.9, THREE.AdditiveBlending);
        lensFlare.add(textureFlare3, 70, 1.0, THREE.AdditiveBlending);

        lensFlare.customUpdateCallback = lensFlareUpdateCallback;
        lensFlare.position.copy(light.position);

        scene.add(lensFlare);

    }
    function lensFlareUpdateCallback(object) {

        var f, fl = object.lensFlares.length;
        var flare;
        var vecX = -object.positionScreen.x * 2;
        var vecY = -object.positionScreen.y * 2;


        for (f = 0; f < fl; f++) {

            flare = object.lensFlares[ f ];

            flare.x = object.positionScreen.x + vecX * flare.distance;
            flare.y = object.positionScreen.y + vecY * flare.distance;

            flare.rotation = 0;

        }

        object.lensFlares[ 2 ].y += 0.025;
        object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad(45);

    }


    sphere = createPlanet(radius, 0, 0, 0, segments, 'img/space/2_no_clouds_4k.jpg', 'img/space/elev_bump_4k.jpg', 'img/space/water_4k.png');
    sphere.rotation.y = rotation;
    scene.add(sphere);

    var clouds = createClouds(radius, segments);
    clouds.rotation.y = rotation;
    scene.add(clouds);

    var moon = createMoon();
    scene.add(moon);

    var stars = createSkybox(THREE.ImageUtils.loadTextureCube([
        'img/space/starfield/front.png',
        'img/space/starfield/back.png',
        'img/space/starfield/left.png',
        'img/space/starfield/right.png',
        'img/space/starfield/top.png',
        'img/space/starfield/bottom.png'
    ]));
    scene.add(stars);


    /* TEST */

    var athmo = new THREE.SphereGeometry(0.55, segments, segments);

    var material = new THREE.ShaderMaterial({
        uniforms:
                {
                    "c": {type: "f", value: 0.2},
                    "p": {type: "f", value: 2},
                    glowColor: {type: "c", value: new THREE.Color(0x1c86e3)},
                    viewVector: {type: "v3", value: camera.position}
                },
        vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
        fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });

    
    var mesh = new THREE.Mesh(athmo, material);
    mesh.position.set(0.025, 0.0015, 0.025);
    scene.add(mesh);
    
    var controls = new THREE.TrackballControls(camera, webglEl.parentElement.parentElement);
    controls.minDistance = 1.5;
    controls.maxDistance = 10;
    controls.zoomSpeed = 0.3;

    webglEl.appendChild(renderer.domElement);

    render();

    function render() {
        controls.update();

        sphere.rotation.y += 0.0005;

        clouds.rotation.y += 0.0003;
        clouds.rotation.x += 0.00007;

        var x = moon.position.x,
                y = moon.position.y,
                z = moon.position.z,
                rotSpeed = 0.003;

        moon.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        moon.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);



        var x = camera.position.x,
                y = camera.position.y,
                z = camera.position.z,
                rotSpeed = -0.0003;

        camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
        camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);

        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function createSphere(radius, segments) {
        return new THREE.Mesh(
                new THREE.SphereGeometry(radius, segments, segments),
                new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('img/space/2_no_clouds_4k.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('img/space/elev_bump_4k.jpg'),
                    bumpScale: 0.005,
                    specularMap: THREE.ImageUtils.loadTexture('img/space/water_4k.png'),
                    specular: new THREE.Color('grey')
                })
                );
    }

    function createPlanet(radius, x, y, z, segments, map, bumpMap, specularMap) {
        var mesh = new THREE.Mesh(
                new THREE.SphereGeometry(radius, segments, segments),
                new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture(map),
                    bumpMap: THREE.ImageUtils.loadTexture(bumpMap),
                    bumpScale: 0.005,
                    specularMap: THREE.ImageUtils.loadTexture(specularMap),
                    specular: new THREE.Color('grey')
                })
                );

        mesh.receiveShadow = true;
        mesh.castShadow = true;
        mesh.position.set(x, y, z);
        
//        var geomTest = new THREE.SphereGeometry(0.01,100,100);
//        var matTest = new THREE.MeshPhongMaterial({
//            color:'#7CFC00', 
//            shading:THREE.FlatShading
//        });
//        var test = new THREE.Mesh(geomTest, matTest);
//        test.position.x = 0.3;
//        test.position.y = 0.3;
//        test.position.z = 0.3;
//        mesh.add(test);

        return mesh;
    }

    function createClouds(radius, segments) {
        var mesh = new THREE.Mesh(
                new THREE.SphereGeometry(radius + 0.003, segments, segments),
                new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('img/space/fair_clouds_4k.png'),
                    transparent: true
                })
                );

        return mesh;
    }

    function createSkybox(texture) {
        var size = 4000;

        var cubemap = THREE.ShaderLib.cube;
        cubemap.uniforms.tCube.value = texture;

        var mat = new THREE.ShaderMaterial({
            fragmentShader: cubemap.fragmentShader,
            vertexShader: cubemap.vertexShader,
            uniforms: cubemap.uniforms,
            depthWrite: false,
            side: THREE.BackSide,
            transparent: true,
            opacity: 0.1
        });

        var geo = new THREE.CubeGeometry(size, size, size);

        var mesh = new THREE.Mesh(geo, mat);

        return mesh;
    }


    function createMoon() {
        var radius = 0.1;
        var xSegments = segments;
        var ySegments = segments;
        var geo = new THREE.SphereGeometry(radius, xSegments, ySegments);
        
        var textureMap = THREE.ImageUtils.loadTexture('img/space/moon.jpg');
        var normalMap = THREE.ImageUtils.loadTexture('img/space/normal.jpg');

        var normVertShader = document.getElementById('norm-vert-shader');
        var normFragShader = document.getElementById('norm-frag-shader');

        var mat = new THREE.ShaderMaterial({
            uniforms: {
                lightPosition: {
                    type: 'v3',
                    value: light.position
                },
                textureMap: {
                    type: 't',
                    value: textureMap
                },
                normalMap: {
                    type: 't',
                    value: normalMap
                },
                uvScale: {
                    type: 'v2',
                    value: new THREE.Vector2(1.0, 1.0)
                }
            },
            vertexShader: normVertShader.innerText,
            fragmentShader: normFragShader.innerText
        });

        var mesh = new THREE.Mesh(geo, mat);
        mesh.geometry.computeTangents();
        mesh.position.set(-0.7, 0.4, 0.7);
        mesh.rotation.set(0, 180, 0);
        
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        
        return mesh;
    }
}
());