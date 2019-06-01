var key = {
    UP:     false,
    DOWN:   false,
    LEFT:   false,
    RIGHT:  false,
    SPACE:  false
};

document.addEventListener("keydown", handlerKeyDown, false);
document.addEventListener("keyup", handlerKeyUp, false);

function handlerKeyDown(e) {
	switch(e.keyCode) {
		case 37:
			key.LEFT	= true;
			break;
		case 38:
			key.UP 	    = true;
			break;
		case 39:
			key.RIGHT 	= true;
			break;
		case 40:
            key.DOWN  	= true;
			break;
		case 32:
			key.SPACE   = true;
			break;
        default:
            break;
    }
}

function handlerKeyUp(e) {
	switch(e.keyCode) {
		case 37:
			key.LEFT	= false;
			break;
		case 38:
			key.UP 	    = false;
			break;
		case 39:
			key.RIGHT 	= false;
			break;
		case 40:
            key.DOWN  	= false;
			break;
		case 32:
			key.SPACE   = false;
			break;
        default:
            break;
	}
}

