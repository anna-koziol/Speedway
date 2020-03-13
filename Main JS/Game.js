document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();

    let board = new Board();
    let HtmlActions = new Actions();
    let user1 = new User1();
    let user2 = new User2();
    let user3 = new User3();
    let user4 = new User4();

    //RYSOWANIE PLANSZY
    board.drawBoard();
    HtmlActions.loadCanvas();

    //ZMIENIANIE KOLORÓW W BAZIE
    let color = document.getElementsByClassName("color");
    for (let i = 0; i < color.length; i++) {
        color[i].addEventListener("click", function (e) {
            let parentC = this.parentNode.id;
            let idC = parseInt(parentC.slice(6, 7));
            variables.users[idC - 1].color = this.style.backgroundColor;
        })
    }

    //AKTYWOWANIE GRACZA, DODANIE NAZWY + KLAWISZA
    let btAdd = document.getElementsByClassName("add");
    for (let i = 0; i < btAdd.length; i++) {
        btAdd[i].addEventListener("click", function (e) {
            let nameUser = this.parentNode.children[0].value;
            let keyUser = this.parentNode.children[1].value;
            let idUser = parseInt(this.parentNode.id.slice(6, 7))

            variables.users[idUser - 1].active = "yes";
            variables.counterUsers = 0;

            for (let j = 0; j < 4; j++) {
                if (variables.users[j].active == "yes") { variables.counterUsers++; }
            }

            if (keyUser !== '') { variables.users[idUser - 1].key = keyUser; }

            if (nameUser !== '') { variables.users[idUser - 1].name = nameUser; }

            document.getElementById("pStart").innerHTML = "Liczba graczy: 0" + variables.counterUsers;
        })
    }

    document.getElementById("start").addEventListener("click", function (e) {
        for (let i = 0; i < 4; i++) {
            if (variables.users[i].active == "yes") {
                //WYKONYWANIE NP  USER1
                switch (i) {
                    case 0:
                        document.getElementById("luistUser1").innerHTML = variables.users[i].name + '<br>';
                        user1.game();
                        break;
                    case 1:
                        document.getElementById("luistUser2").innerHTML = variables.users[i].name + '<br>';
                        user2.game();
                        break;
                    case 2:
                        document.getElementById("luistUser3").innerHTML = variables.users[i].name + '<br>';
                        user3.game();
                        break;
                    case 3:
                        document.getElementById("luistUser4").innerHTML = variables.users[i].name + '<br>';
                        user4.game();
                        break;
                }
            }
        }
    })
});

