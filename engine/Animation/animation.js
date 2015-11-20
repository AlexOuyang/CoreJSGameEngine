function Animation(frames, playSequence, fps) {
    var _frames = frames;
    var _playSequence = playSequence;
    var _fps = fps;


    function play(ctx, x, y, width, height, scalingFactorX, scalingFactorY) {
        var _currentFrameNumber = (~~(Time.realTimeSinceStartup() * _fps)) % _playSequence.length; // ~~ is faster than Math.floor()
        var _currentFrame = _frames[_playSequence[_currentFrameNumber]];
        if (_currentFrame === undefined) console.error("Can not find frame in playSequence");
        ctx.save();
        //        ctx.globalAlpha = 1;
        //        ctx.rotate(rotation * Math.PI / 180);
        //        ctx.translate(x + width / 2 - cam.x, y + height / 2 - cam.y);
        ctx.translate(x + width / 2, y + height / 2);  // center the player animation so we can flip the animation easily
        ctx.scale(scalingFactorX, scalingFactorY);
        ctx.drawImage(
            _currentFrame.spriteSheet,
            _currentFrame.x,
            _currentFrame.y,
            _currentFrame.width,
            _currentFrame.height, -width / 2, -height / 2, width, height);
        ctx.restore();
    }

    return {
        play: play
    }
}