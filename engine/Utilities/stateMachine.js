function StateMachine() {
    var _nodes = []; // associative array
    var _lastStateNode = null;
    var _currentStateNode = null;


    function addNode(state, node) {
        _nodes[state] = node;
        console.log('Animation State: ', _nodes);
    }

    function getCurrentState() {
        return _currentStateNode.state;
    }

    // change the value of the node based on the changed conditions and update the current node based on the conditions
    function setCondition(conditionalVariable, conditionalValue) {
        // Check if the current node is the final node, if it is then do not update the node since the final state is reached.
        if (_currentStateNode.isFinalState) {
            console.log('StateMachine.setCondition(): The final state of the state machine is reached.');
        } else {
            var length = _currentStateNode.directedEdges.length;
            // loop through each edges in the current node, if the edge's condition is met then move to the node the edge points at
            for (var i = 0; i < length; i++) {
                var currentEdge = _currentStateNode.directedEdges[i];
                if (currentEdge.conditionalVariable === conditionalVariable && currentEdge.conditionalValue === conditionalValue) {
                    _currentStateNode = currentEdge.toNode;
                    console.log(_currentStateNode.state);
                }
            }
        }
    }

    function setAsInitialState(state) {
        if (_nodes[state] !== undefined) {
            _currentStateNode = _nodes[state];
        } else {
            console.error('StateMachine.setAsInitialState(): state \'' + state + '\' does not exist in the state nodes');
        }
    }


    function setAsFinalState(state) {
        if (_nodes[state] !== undefined) {
            _nodes[state].isFinalState = true;
        } else {
            console.error('StateMachine.setAsFinalState(): state \'' + state + '\' does not exist in the state nodes');
        }
    }

    // returns a node object
    function getNode(state) {
        return _nodes[state];
    }

    // Make the transition from one state to another based on the value of the conditional variables
    function makeTransition(fromState, toState, conditionalVariable, conditionalValue) {
        var fromNode = getNode(fromState);
        var toNode = getNode(toState);
        var edge = new DirectedEdge(toNode, conditionalVariable, conditionalValue);
        fromNode.directedEdges.push(edge);
    }
    return {
        addNode: addNode,
        setCondition: setCondition,
        getCurrentState: getCurrentState,
        setAsInitialState: setAsInitialState,
        setAsFinalState: setAsFinalState,
        makeTransition: makeTransition
    }

}

function Node(state) {
    this.state = state;
    this.isFinalState = false;
    this.directedEdges = [];
}


function DirectedEdge(toNode, conditionalVariable, conditionalValue) {
    this.toNode = toNode;
    this.conditionalVariable = conditionalVariable;
    this.conditionalValue = conditionalValue;
}