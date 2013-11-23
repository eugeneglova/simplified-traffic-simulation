/**
 * TrafficLight module is responsible for traffic light on the road
 * @param {Number} position         The position of the traffic light on the road
 * @param {String} color            The color of the traffic light (red or green)
 * @param {Number} change_interval  Interval between changing the color (in seconds)
 */
var TrafficLight = function(position, color, change_interval) {
    // Set initial position
    this.position = position;

    // Set initial color
    this.color = color;

    // Interval between changing the color
    this.change_interval = 10000;

    // Set initial timer
    this.timer = 0;

    return this;
};

/**
 * getPosition Returns position of the traffic light
 * @return {Number}
 */
TrafficLight.prototype.getPosition = function() {
    return this.position;
};

/**
 * getColor Returns color of the traffic light
 * @return {String}
 */
TrafficLight.prototype.getColor = function() {
    return this.color;
};

/**
 * changeColor Checks if we need to change the color and changes it
 * @param  {Number} simulation_step Number of milliseconds spent on the simulation step
 * @return {Boolean}
 */
TrafficLight.prototype.changeColor = function(simulation_step) {
    // Increase the timer
    this.timer += simulation_step;

    // Check if we need to change the color
    if (this.timer % this.change_interval !== 0) return false;

    // Set the new color
    this.color = this.color !== "green" ? "green" : "red";

    return true;
};

module.exports = TrafficLight;
