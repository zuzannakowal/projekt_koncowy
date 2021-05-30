class Gra {
  constructor() {
    this.camera
    this.scene
    this.tablica = []
    console.log("gra")
    this.raycaster = new THREE.Raycaster()
    this.wektor = new THREE.Vector2()
    this.tablica = [[0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]]
    this.init()
  }

  init() {
    console.log(this.camera)
    var renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xbb3b3b3);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#root").append(renderer.domElement)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(150, 1000, 150)
    this.camera.lookAt(150, 0, 150)
    var light = new THREE.AmbientLight(0xffffff)
    this.scene.add(light)
    var axes = new THREE.AxesHelper(1000);
    this.scene.add(axes);
    for (let z = 0; z <= 5; z++) {
      let boxes = []
      for (let x = 0; x <= 5; x++) {
        let box = new THREE.BoxGeometry(50, 50, 50)
        let material = new THREE.MeshBasicMaterial({
          side: THREE.DoubleSide,
          map: new THREE.TextureLoader().load("/tlo.jpeg"),
          //transparent: true,
          //opacity: 1,

        });
        console.log("cube")
        let cube = new THREE.Mesh(box, material)
        this.scene.add(cube)
        cube.position.set((x * 51), 0, (z * 51))
        boxes.push(cube)
      }
      this.tablica.push(boxes)
    }

    console.log(this.tablica)

    let scene = this.scene
    let camera = this.camera

    function render() {
      //console.log("render")
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
    render();
  }


  pobierz(e) {
    let scene = this.scene
    let camera = this.camera
    let raycaster = this.raycaster
    let wektor = this.wektor
    wektor.x = (e.clientX / $(window).width()) * 2 - 1;
    wektor.y = -(e.clientY / $(window).height()) * 2 + 1;
    raycaster.setFromCamera(wektor, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      var element = intersects[0].object
      console.log(element)
      if (net.player == "player 1"){
        if (net.ruch == true){
          console.log(net.player)
          net.ruch = false
          net.newPlayer = "player 2"
          net.porownywanie()
        }
      } else if (net.player == "player 2"){
        if (net.ruch == true){
          console.log(net.player)
          net.ruch = false
          net.newPlayer = "player 1"
          net.porownywanie()
        }
      }
    }
  }

}
