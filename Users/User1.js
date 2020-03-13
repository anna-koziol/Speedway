function User1() {
    this.game = function () {
        //PODSTAWOWE ZMIENNE
        let user1 = document.getElementById("user1");
        let ctx1 = user1.getContext("2d");

        let interval1;
        let counter = 0;

        //RUCH
        function move(userM) {
            //rozpoczęcie rysowania
            ctx1.beginPath();
            ctx1.moveTo(userM.x, userM.y);
            ctx1.strokeStyle = userM.color;
            ctx1.lineWidth = 2;
            //wyliczanie wektora
            userM.y += variables.r * Math.sin(userM.radian);
            userM.x += variables.r * Math.cos(userM.radian);
            //kreślenie drogi
            ctx1.lineTo(userM.x, userM.y);
            ctx1.stroke();

            collision(userM);
            lapCounter(counter, userM)
        }

        function lapCounter(counter, userLC) {
            document.getElementById("lapUser1").innerHTML = userLC.name + " - 0" + userLC.lap;

            if (variables.ctx.isPointInPath(variables.finish, userLC.x, userLC.y)) {
                if (variables.helper1) {
                    counter++;
                    if (counter == 1) {
                        variables.helper1 = false;
                        variables.counter = variables.counter - 1;
                        userLC.lap = userLC.lap - 1;
                        document.getElementById("lapUser1").innerHTML = userLC.name + " - 0" + userLC.lap;

                        //WYPISYWANIE NAJMNIEJSZEGO PRZEBIEGU Z GRACZÓW
                        let tab = [];
                        for (let i = 0; i < 4; i++) {
                            if (variables.users[i].active = "yes") {
                                tab.push(variables.users[i].lap);
                            }
                        }

                        tab.sort();
                        document.getElementById("list").children[2].innerHTML = "0" + tab[0];

                        //wygrywa ostatni żywy pozostały w walce lub pierwszy na mecie
                        if (userLC.lap == 0) {
                            clearInterval(interval1);
                            document.getElementById("winner").style.display = "block"
                            document.getElementById("h2W").innerHTML = userLC.name + '<br>';
                            for (let i = 0; i < 4; i++) {
                                variables.users[i].active = "no"
                            }
                        }
                    }
                }
            }
            else {
                variables.helper1 = true;
            }
        }

        //RYSOWANIE MOTORKU
        function car(user) {
            let canvas2 = document.getElementById("canvas2");
            user.c = canvas2.getContext("2d");
            user.img = new Image();

            user.img.src = './img/' + user.color + '.png';
            user.img.onload = function () {
                user.c.clearRect(0, 0, 1000, 500);
                user.c.save();
                user.c.translate(user.x, user.y);
                user.c.rotate((user.radian * 180 / Math.PI) * Math.PI / 180);
                user.c.drawImage(user.img, -105 / 2, -105 / 2, 105, 105);
                user.c.restore();
            }
        }

        function collision(userCol) {
            //KOLIZJA 
            let count = 0;
            console.log(variables.counterUsers, "counterUsers")
            for (let i = 0; i < 4; i++) {
                if (variables.users[i].active == "yes") { count++ }
            }

            if (count == 1 && variables.counterUsers != 1) {
                for (let j = 0; j < 4; j++) {
                    if (variables.users[j].active == "yes") {
                        clearInterval(interval1);
                        document.getElementById("winner").style.display = "block"
                        document.getElementById("h2W").innerHTML = variables.users[j].name + '<br>';
                    }
                }
            }

            console.log(variables.ctx)
            
            if ((!variables.ctx.isPointInPath(variables.out, userCol.x, userCol.y)) || (variables.ctx.isPointInPath(variables.in, userCol.x, userCol.y))) {
                console.log("Popsułeś");
                clearInterval(interval1);
                userCol.active = "no";
                document.getElementById("luistUser1").style.color = "rgb(173, 22, 22)";
                document.getElementById("luistUser1").innerHTML = userCol.name + " odpadł" + '<br>';
                document.getElementById("winner").style.display = "block"
                document.getElementById("h2W").innerHTML = userCol.name + '<br>';
            }
        }


        //określenie czy klawisz jest wciskany, jeśli tak - ciągłe liczenie wektora
        document.addEventListener("keydown", function (e) {
            if (e.key == variables.users[0].key) {
                if (!variables.users[0].up) {
                    variables.users[0].up = true;
                }
            }
        });

        //klawisz został puszczony    
        document.addEventListener("keyup", function (e) {
            if (e.key == variables.users[0].key) {
                variables.users[0].press = true;
                if (variables.users[0].up) {
                    variables.users[0].up = false;
                }
            }
        });


        function test() {
            let imgData = ctx1.getImageData(0, 0, 1000, 500);
            let pix = imgData.data;

            for (i = 3; i < pix.length; i = i + 4) {
                pix[i] = pix[i] * 0.5
                if (pix[i] < 10) {
                    pix[i] = 0;
                }
            }
            ctx1.putImageData(imgData, 0, 0);
        }


        let p = 0;

        interval1 = setInterval(function () {
            p++;
            if (p == 60) {
                p = 0;
                test();
            }
            if (variables.users[0].press) {
                //jeśli klawisz jest wciskany ==> zmniejszanie kąta
                if (variables.users[0].up) {
                    variables.users[0].radian -= 0.03;
                }

                car(variables.users[0]);
                move(variables.users[0]);

            }
            if (variables.users[0].active == "no") {
                clearInterval(interval1);
            }
        }, 1000 / 60);
    }
}


