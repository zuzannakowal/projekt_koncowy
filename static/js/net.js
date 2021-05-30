let wait
let nick
let spraw
class Net {
  constructor() {
    this.ajax(this)
    this.usuwanie()
    this.player
    this.stan
    this.ruch = "true"
    this.newPlayer
  }
  ajax(e) {
    let that = this
    $("#zaloguj").on("click", function () {
      nick = $("#login").val()
      $.ajax({
        url: "/",
        data: { nick: nick, action: "dodaj" },
        type: "POST",
        success: function (data) {
          that.player = data
          switch (data) {
            case "player 1":
              $("#form").css("display", "none")
              $("#player").text(data + ":" + nick)
              wait = setInterval(function () {
                e.check()
              }, 1000)
              spraw = setInterval(function () { e.sprawdzanie() }, 300);
              console.log(wait)
              break;
            case "player 2":
              net.ruch = "false"
              spraw = setInterval(function () { e.sprawdzanie() }, 300);
              $("#form").css("display", "none")
              $("#player").text(data + ":" + nick)
              break;
            case "brak miejsc":
              $("#player").text(data)
              break;
            default:

          }
        },
        error: function (xhr, status, error) {
          console.log(xhr);
        },
      });
    })
  }

  usuwanie() {
    $("#reset").on("click", function () {
      console.log(this)
      $.ajax({
        url: "/",
        data: { action: "usun" },
        type: "POST",
        success: function (data) {
          console.log(data)
          if (data == "jest ok") {
            location.reload()
          }
        },
        error: function (xhr, status, error) {
          console.log(xhr);
        },
      })
    })
  }

  check() {
    $.ajax({
      url: "/",
      data: { action: "check" },
      type: "POST",
      success: function (data) {
        if (data == "true") {
          net.stan = data
          $("#player").html(data + ":" + nick + "<br> gracz 2 dołączył")
          clearInterval(wait)
        }

      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }

  porownywanie() {
    $.ajax({
      url: "/",
      data: { action: "przesylanie", ruch: net.newPlayer, data: JSON.stringify(gra.tablica)},
      type: "POST",
      success: function (data) {
        console.log("zmiana")
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }
  sprawdzanie(){
    $.ajax({
      url: "/",
      data: { action: "sprawdzanie"},
      type: "POST",
      success: function (data) {
        let object = JSON.parse(data)
        if(net.player == "player 1"){
          net.ruch = object.player1
        }
        else if(net.player == "player 2"){
          net.ruch = object.player2
        }
        gra.tablica = object.tablica
        gra.pionki()
      },
      error: function (xhr, status, error) {
        console.log(xhr);
      },
    })
  }
}
