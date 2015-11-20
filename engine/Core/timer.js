
var Time = (function () {
    var _initialTime = Date.now();
    var _lastTime = 0;     // Used to calculate dealta time
    
    var timeScale = 1;   // The scale at which the time is passing. This can be used for slow motion effects.
    
    var deltaTime = 0;  // The time in seconds it took to complete the last frame (Read Only).
    
    var fixedDeltaTime = 1/60;   // The fixed delta time is 1 second per 60 frames


    // return time since startup in seconds (read only)
    function realTimeSinceStartup() {
        var _timeNow = Date.now();
        var timePassed = _timeNow - _initialTime;
        return timePassed / 1000;
    }
    
    // called in Loop function to calculate deltaTime
    function calculateDeltaTime(timeNow) {
        Time.deltaTime = (timeNow - _lastTime) / 1000;
        _lastTime = timeNow;
    }

    return {
        timeScale: timeScale,
        deltaTime: deltaTime,
        fixedDeltaTime: fixedDeltaTime,
        realTimeSinceStartup: realTimeSinceStartup,
        calculateDeltaTime: calculateDeltaTime
    }

})();



