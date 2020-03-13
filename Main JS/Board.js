function Board() {
    this.drawBoard = function () {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        variables.ctx = canvas.getContext("2d");
        variables.ctx.lineWidth = 5;

        //ZEWNĘTRZNE
        //-tworzenie 1 okręgu
        variables.out = new Path2D;
        variables.out.arc(250, 250, 200, 0.5 * Math.PI, 1.5 * Math.PI, false);
        variables.out.arc(750, 250, 200, 1.5 * Math.PI, 0.5 * Math.PI, false);
        variables.out.closePath();
        //-wrzucenie do zmiennej ctx arca, narysowanie na  stronie
        variables.ctx.fillStyle = "#6f4242";
        variables.ctx.fill(variables.out);
        variables.ctx.stroke(variables.out);


        ///WEWNĘTRZNIE, TRAWA
        let grass = new Image();
        grass.src = "./img/grass.jpg";
        grass.onload = function () {
            //-tworzenie wewnętrznego okręgu
            variables.in = new Path2D;
            variables.in.arc(250, 250, 50, 0.5 * Math.PI, 1.5 * Math.PI, false);
            variables.in.arc(750, 250, 50, 1.5 * Math.PI, 0.5 * Math.PI, false);
            variables.in.closePath();
            //wrzucenie do ctx kolejnego okręgu
            variables.ctx.lineWidth = 5;
            variables.ctx.fillStyle = ctx.createPattern(grass, "repeat");
            variables.ctx.fill(variables.in);
            variables.ctx.stroke(variables.in);
        }

        let finish = new Image();
        finish.src = "img/finish.png";
        finish.onload = function () {
            //-tworzenie mety
            variables.finish = new Path2D;
            variables.finish.rect(250, 300, 10, 148);
            variables.finish.closePath();
            //wrzucenie do ctx kolejnego okręgu
            variables.ctx.lineWidth = 1;
            variables.ctx.fillStyle = ctx.createPattern(finish, "repeat");
            variables.ctx.fill(variables.finish);
            variables.ctx.stroke(variables.finish);
        }
    }
}

