/**
 * Vehicle is responsible for handling vehicle movement
 * @param {String} position The position of the vehicle on the road
 */
var Vehicle = function(position) {
    // Set initial position
    this.position = position || 0;

    return this;
};

/**
 * getPosition Returns position of the traffic light
 * @return {Number}
 */
Vehicle.prototype.getPosition = function() {
    return this.position;
};

/**
 * moveForward Moves a vehicle to one position forward
 * @return {Boolean}
 */
Vehicle.prototype.moveForward = function() {
	// Increase position
    this.position++;

    return true;
};

module.exports = Vehicle;
