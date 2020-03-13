function Actions() {
    this.loadCanvas = function () {
        let btClick = document.getElementById("start");
        btClick.addEventListener("click", function (e) {
            document.getElementById("menu").style.transition = "2s"
            document.getElementById("menu").style.opacity = "0"

            setTimeout(function () {
                document.getElementById("canvasMain").style.display = "block";
                document.body.style.backgroundImage = "url('./img/grass.jpg')";
            }, 1800)
        })
    }

}

