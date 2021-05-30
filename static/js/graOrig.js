class Gra {
    constructor() {
      this.camera
      this.scene
      var tablica = [[0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0]]

      console.log("gra")
      this.init()
    }
    init(){
      var scene
      var camera
      var renderer = new THREE.WebGLRenderer()
      renderer.setClearColor(0x808080);
      renderer.setSize(window.innerWidth, window.innerHeight);
      $("#root").append(renderer.domElement)
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
      );
      camera.position.set(0, 100, 500)
      camera.lookAt(scene.position)
      var axes = new THREE.AxesHelper(1000);
      scene.add(axes);
      var box = new THREE.BoxGeometry(100, 100, 50)
      var material = new THREE.MeshBasicMaterial({
        color: 0x827874,
        side: THREE.DoubleSide,
        wireframe: false,
        //transparent: true,
        //opacity: 0.2
      });
      var cube = new THREE.Mesh(box, material)
      scene.add(cube)
      cube.position.set(0,0,0)
      function render() {
            //console.log("render")
            requestAnimationFrame(render);
            renderer.render(scene, camera);
      }
      render();
    }
}
