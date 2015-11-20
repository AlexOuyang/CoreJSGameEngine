/**************************
    INPUT CONTROL
**************************/
var KeyCode = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACEBAR: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ALPHA_0: 48,
    ALPHA_1: 49,
    ALPHA_2: 50,
    ALPHA_3: 51,
    ALPHA_4: 52,
    ALPHA_5: 53,
    ALPHA_6: 54,
    ALPHA_7: 55,
    ALPHA_8: 56,
    ALPHA_9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    SEMICOLON: 186,
    PLUS: 187,
    MINUS: 189,
    GRAVE_ACCENT: 192,
    SINGLE_QUOTE: 222
}


var Input = (function () {
    var _pressedKey = {};

    function init() {
        window.addEventListener('keyup', onKeyup, true);
        window.addEventListener('keydown', onKeydown, true);
    }

    function getKeyDown(keyCode) {
        return _pressedKey[keyCode];
    }

    function onKeydown(event) {
        _pressedKey[event.keyCode] = true;
    }

    function onKeyup(event) {
        delete _pressedKey[event.keyCode];
    }

    return {
        init: init,
        getKeyDown: getKeyDown
    };

})();

// Initialize the Input 
Input.init();
