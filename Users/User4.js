function User4() {
    this.game = function () {
        //PODSTAWOWE ZMIENNE
        let user4 = document.getElementById("user4");
        let ctx4 = user1.getContext("2d");

        let interval4;
        let counter = 0;

        //RUCH
        function move(userM) {
            //rozpoczęcie rysowania
            ctx4.beginPath();
            ctx4.moveTo(userM.x, userM.y);
            ctx4.strokeStyle = userM.color;
            ctx4.lineWidth = 2;
            //wyliczanie wektora
            userM.y += variables.r * Math.sin(userM.radian);
            userM.x += variables.r * Math.cos(userM.radian);
            //kreślenie drogi
            ctx4.lineTo(userM.x, userM.y);
            ctx4.stroke();

            collision(userM);
            lapCounter(counter, userM)
        }

        function lapCounter(counter, userLC) {
            document.getElementById("lapUser4").innerHTML = userLC.name + " - 0" + userLC.lap;

            if (variables.ctx.isPointInPath(variables.finish, userLC.x, userLC.y)) {
                if (variables.helper4) {
                    counter++;
                    if (counter == 1) {
                        variables.helper4 = false;
                        variables.counter = variables.counter - 1;
                        userLC.lap = userLC.lap - 1;
                        document.getElementById("lapUser4").innerHTML = userLC.name + " - 0" + userLC.lap;


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
                            clearInterval(interval4);
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
                variables.helper4 = true;
            }
        }

        //RYSOWANIE MOTORKU
        function car(user) {
            let canvas2 = document.getElementById("canvas2c");
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
                        clearInterval(interval4);
                        document.getElementById("winner").style.display = "block"
                        document.getElementById("h2W").innerHTML = variables.users[j].name + '<br>';
                    }
                }
            }

            if ((!variables.ctx.isPointInPath(variables.out, userCol.x, userCol.y)) || (variables.ctx.isPointInPath(variables.in, userCol.x, userCol.y))) {
                console.log("Popsułeś");
                clearInterval(interval4);
                userCol.active = "no";
                document.getElementById("luistUser4").style.color = "rgb(173, 22, 22)";
                console.log(document.getElementById("luistUser4").innerHTML)
                document.getElementById("luistUser4").innerHTML = userCol.name + " odpadł" + '<br>';
            }
        }


        //określenie czy klawisz jest wciskany, jeśli tak - ciągłe liczenie wektora
        document.addEventListener("keydown", function (e) {
            if (e.key == variables.users[3].key) {
                if (!variables.users[3].up) {
                    variables.users[3].up = true;
                }
            }
        });

        //klawisz został puszczony    
        document.addEventListener("keyup", function (e) {
            if (e.key == variables.users[3].key) {
                variables.users[3].press = true;
                if (variables.users[3].up) {
                    variables.users[3].up = false;
                }
            }
        });


        function test() {
            let imgData = ctx4.getImageData(0, 0, 1000, 500);
            let pix = imgData.data;

            for (i = 3; i < pix.length; i = i + 4) {
                pix[i] = pix[i] * 0.5
                if (pix[i] < 10) {
                    pix[i] = 0;
                }
            }
            ctx4.putImageData(imgData, 0, 0);
        }


        let p = 0;

        interval4 = setInterval(function () {
            p++;
            if (p == 60) {
                p = 0;
                test();
            }
            if (variables.users[3].press) {
                //jeśli klawisz jest wciskany ==> zmniejszanie kąta
                if (variables.users[3].up) {
                    variables.users[3].radian -= 0.03;
                }

                car(variables.users[3]);
                move(variables.users[3]);

            }
            if (variables.users[0].active == "no") {
                clearInterval(interval4);
            }
        }, 1000 / 60);
    }
}


