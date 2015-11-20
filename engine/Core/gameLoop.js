/********************
	ANIMATION LOOP
*********************/


if (!window.requestAnimFrame) {
    window.requestAnimFrame = (function () {
        return (window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })();
}


/*main loop for animation*/
function loop() {
    Time.calculateDeltaTime(Date.now());
    context.clearRect(0, 0, width, height);
    update();

    requestAnimFrame(function () {
        loop();
    });
}