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
    this.camera.position.set(150, 700, 150)
    this.camera.lookAt(150, 0, 150)
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
        let cube = new THREE.Mesh(box, material)
        cube.userData = {x: x, y: z}
        this.scene.add(cube)
        cube.position.set((x * 51), 0, (z * 51))
        boxes.push(cube)
      }
      //this.tablica.push(boxes)
    }

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
      var x = element.userData.x
      // console.log(element)

      if (net.player == "player 1") {
        if (net.stan == "true") {
          if (net.ruch == "true" && this.tablica[0][x] == 0) {
            let iks = x
            let igrek
            if (this.tablica[5][x] == 0){
              igrek = 5
              this.tablica[5][x] = 1
            } else if (this.tablica[4][x] == 0){
              igrek = 4
              this.tablica[4][x] = 1
            } else if (this.tablica[3][x] == 0){
              igrek = 3
              this.tablica[3][x] = 1
            } else if (this.tablica[2][x] == 0){
              igrek = 2
              this.tablica[2][x] = 1
            } else if (this.tablica[1][x] == 0){
              igrek = 1
              this.tablica[1][x] = 1
            } else if (this.tablica[0][x] == 0){
              igrek = 0
              this.tablica[0][x] = 1
            } 
            net.ruch = "false"
            net.newPlayer = "player 2"
            net.porownywanie()
            let liczba = this.tablica[igrek][iks]
            this.sprawdzanie(iks, igrek, liczba)
          }
        }
      } else if (net.player == "player 2") {
        if (net.ruch == "true" && this.tablica[0][x] == 0) {
          let iks = x
          let igrek
          
          if (this.tablica[5][x] == 0){
            igrek = 5
            this.tablica[5][x] = 2
          } else if (this.tablica[4][x] == 0){
            igrek = 4
            this.tablica[4][x] = 2
          } else if (this.tablica[3][x] == 0){
            igrek = 3
            this.tablica[3][x] = 2
          } else if (this.tablica[2][x] == 0){
            igrek = 2
            this.tablica[2][x] = 2
          } else if (this.tablica[1][x] == 0){
            igrek = 1
            this.tablica[1][x] = 2
          } else if (this.tablica[0][x] == 0){
            igrek = 0
            this.tablica[0][x] = 2
          }
          net.ruch = "false"
          net.newPlayer = "player 1"
          net.porownywanie()
          let liczba = this.tablica[igrek][iks]
          this.sprawdzanie(iks, igrek, liczba)
        }
      }
    }
  }

  pionki(){
    let zmienna = 0
    while (this.scene.children[zmienna]){
      if (this.scene.children[zmienna].geometry.type == "CylinderGeometry"){
        this.scene.remove(this.scene.children[zmienna])
      } else {
        zmienna ++
      }
    }
    let pionek = new THREE.CylinderGeometry(20, 20, 20, 50)
    let material1 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/pic1.jpeg"),
    });
    let material2 = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load("/pic2.jpeg"),
    });
    for (let y = 0; y <= 5; y++){
      for (let x = 0; x <= 5; x++){
        if (this.tablica[y][x] == 1){
          let kulka = new THREE.Mesh(pionek, material1)
          kulka.userData = {x: x, y: y}
          this.scene.add(kulka)
          kulka.position.set((x * 51), 30, (y * 51))
        } else if (this.tablica[y][x] == 2){
          let kulka2 = new THREE.Mesh(pionek, material2)
          kulka2.userData = {x: x, y: y}
          this.scene.add(kulka2)
          kulka2.position.set((x * 51), 30, (y * 51))
        }
      }
    }
  }

  sprawdzanie(x, y, liczba){
    console.log(this.tablica)
    console.log(x, y)
    console.log(this.tablica[y][x])
    if (this.tablica[y][x + 1] == liczba){
      
    }
  }

  rekurencja(){

  }
}
