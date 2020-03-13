function User2() {
    this.game = function () {
        //PODSTAWOWE ZMIENNE
        let user2 = document.getElementById("user2");
        let ctx2 = user2.getContext("2d");

        let interval2;
        let counter = 0;

        //RUCH
        function move(userM) {
            //rozpoczęcie rysowania
            ctx2.beginPath();
            ctx2.moveTo(userM.x, userM.y);
            ctx2.strokeStyle = userM.color;
            ctx2.lineWidth = 2;
            //wyliczanie wektora
            userM.y += variables.r * Math.sin(userM.radian);
            userM.x += variables.r * Math.cos(userM.radian);
            //kreślenie drogi
            ctx2.lineTo(userM.x, userM.y);
            ctx2.stroke();

            collision(userM);
            lapCounter(counter, userM)
        }

        function lapCounter(counter, userLC) {
            document.getElementById("lapUser2").innerHTML = userLC.name + " - 0" + userLC.lap;

            if (variables.ctx.isPointInPath(variables.finish, userLC.x, userLC.y)) {
                if (variables.helper2) {
                    counter++;
                    if (counter == 1) {
                        variables.helper2 = false;
                        variables.counter = variables.counter - 1;
                        userLC.lap = userLC.lap - 1;
                        document.getElementById("lapUser2").innerHTML = userLC.name + " - 0" + userLC.lap;

                        //WYPISYWANIE NAJMNIEJSZEGO PRZEBIEGU Z GRACZÓW
                        let tab = [];
                        for (let i = 0; i < 4; i++) {
                            if (variables.users[i].active = "yes") {
                                tab.push(variables.users[i].lap);
                            }
                        }

                        tab.sort();
                        document.getElementById("list").children[2].innerHTML = "0" + tab[0];

                        if (userLC.lap == 0) {
                            clearInterval(interval2);
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
                variables.helper2 = true;
            }
        }

        //RYSOWANIE MOTORKU
        function car(user) {
            let canvas2 = document.getElementById("canvas2a");
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

            if (count == 1) {
                for (let j = 0; j < 4; j++) {
                    if (variables.users[j].active == "yes") {
                        clearInterval(interval2);
                        document.getElementById("winner").style.display = "block"
                        document.getElementById("h2W").innerHTML = variables.users[j].name + '<br>';
                    }
                }
            }

            if ((!variables.ctx.isPointInPath(variables.out, userCol.x, userCol.y)) || (variables.ctx.isPointInPath(variables.in, userCol.x, userCol.y))) {
                console.log("Popsułeś");
                clearInterval(interval2);
                userCol.active = "no";
                document.getElementById("luistUser2").style.color = "rgb(173, 22, 22)";
                document.getElementById("luistUser2").innerHTML = userCol.name + " odpadł" + '<br>';
            }
        }


        //określenie czy klawisz jest wciskany, jeśli tak - ciągłe liczenie wektora
        document.addEventListener("keydown", function (e) {
            if (e.key == variables.users[1].key) {
                if (!variables.users[1].up) {
                    variables.users[1].up = true;
                }
            }
        });

        //klawisz został puszczony    
        document.addEventListener("keyup", function (e) {
            if (e.key == variables.users[1].key) {
                variables.users[1].press = true;
                if (variables.users[1].up) {
                    variables.users[1].up = false;
                }
            }
        });


        function test() {
            let imgData = ctx2.getImageData(0, 0, 1000, 500);
            let pix = imgData.data;

            for (i = 3; i < pix.length; i = i + 4) {
                pix[i] = pix[i] * 0.5
                if (pix[i] < 10) {
                    pix[i] = 0;
                }
            }
            ctx2.putImageData(imgData, 0, 0);
        }


        let p = 0;

        interval2 = setInterval(function () {
            p++;
            if (p == 60) {
                p = 0;
                test();
            }
            if (variables.users[1].press) {
                //jeśli klawisz jest wciskany ==> zmniejszanie kąta
                if (variables.users[1].up) {
                    variables.users[1].radian -= 0.03;
                }

                car(variables.users[1]);
                move(variables.users[1]);

            }
            if (variables.users[1].active == "no") {
                clearInterval(interval2);
            }
        }, 1000 / 60);
    }
}

