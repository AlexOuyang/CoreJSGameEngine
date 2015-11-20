// The Animator takes in a list of animations and creates animation states base on them.

function Animator(animations) {
    var _animations = animations || [];

    var _stateMachine = new StateMachine();

    var _currentState = null; // current animation state

    var _animationStates = [];

    var _conditionalVariables = [];

    (function setUpStateMachine() {
        var _animationNames = Object.keys(_animations);
        if (_animationNames.length === 0) {
            console.error('Animator(): No animations are supplied to the animator during setup.');
        } else {
            // Create nodes and feed into the automata
            for (var i = 0; i < _animationNames.length; i++) {
                _stateMachine.addNode(_animationNames[i], new Node(_animationNames[i]));
                _animationStates[_animationNames[i]] = _animationNames[i];
            }
        }
    })();


    // Returns the selected animation states, else show error
    function getAnimationState(state) {
        if (state in _animationStates) {
            return _animationStates[state];
        } else {
            console.error('Animator.getAnimationState(): The animation state \'' + state + '\' does not exist in the animator.');
        }
    }

    // Add condition variables to the animator
    function addCondition(condition) {
        if (typeof condition === 'string') {
            _conditionalVariables[condition] = condition;
        } else {
            console.error('Animator.addCondition(): The conditional variable \'' + condition + '\' is not valid. Only strings are accepted as conditional variables');

        }
    }

    // Returns the selected conditional variables, else show error
    function getCondition(condition) {
        if (condition in _conditionalVariables) {
            return _conditionalVariables[condition];
        } else {
            console.error('Animator.getCondition(): The conditional variable \'' + condition + '\' does not exist in the animator.');
        }
    }

    // Set the conditional values
    function setCondition(conditionalVariable, conditionalValue) {
        _stateMachine.setCondition(conditionalVariable, conditionalValue);
    }

    function getCurrentState() {
        return _currentState;
    }

    function setAsInitialState(state) {
        _stateMachine.setAsInitialState(state);
    }

    function setAsFinalState(state) {
        _stateMachine.setAsFinalState(state);   
    }
    // Make the transition from one animation state to another based on the value of the conditional variables
    function makeTransition(fromState, toState, conditionalVariable, conditionalValue) {
        _stateMachine.makeTransition(fromState, toState, conditionalVariable, conditionalValue);
    }

    // Update the state machine to get the current state
    function updateCurrentState() {
        _currentState = _stateMachine.getCurrentState();
    }

    // Play the animation
    function playAnimation(ctx, x, y, width, height, scalingFactorX, scalingFactorY) {
        updateCurrentState();
        if (_currentState === null) {
            _currentState = Object.keys(_animationStates)[0];
            console.error('Animator.playAnimation(): The animator does not have initial animation state set up, so by default, the current animation state is the first supplied animation.');
        }
        _animations[_currentState].play(ctx, x, y, width, height, scalingFactorX, scalingFactorY);
    }

    return {
        addCondition: addCondition,
        setCondition: setCondition,
        makeTransition: makeTransition,
        getCurrentState: getCurrentState,
        getAnimationState: getAnimationState,
        getCondition: getCondition,
        setAsInitialState: setAsInitialState,
        setAsFinalState: setAsFinalState,
        playAnimation: playAnimation
    }
}