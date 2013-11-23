/**
 * Road module is responsible for vehicles and traffic lights
 * @param {Number} simulation_step Step of the simulation
 */
var Road = function(simulation_step) {
    // Reference to the vehicles
    this.vehicles = [];

    // Reference to the traffic lights
    this.traffic_lights = [];

    // Reference to the simulation step timeout identifier
    this.simulation_timeout_id = null;

    // Reference to the simulation step
    this.simulation_step = simulation_step;

    // Reference to the very last traffic light position (needs for stop simulation)
    this.last_traffic_light_position = 0;

    return this;
};

/**
 * addVehicle Adds a vehicle on the road
 * @param {Vehicle} vehicle
 */
Road.prototype.addVehicle = function(vehicle) {
    // Add vehicle on the road
    this.vehicles.push(vehicle);

    return true;
};

/**
 * addTrafficLight Adds a traffic light on the road
 * @param {TrafficLight} traffic_light
 */
Road.prototype.addTrafficLight = function(traffic_light) {
    // Get traffic light position
    var traffic_light_position = traffic_light.getPosition();

    // Check if it is the last position
    if (traffic_light_position > this.last_traffic_light_position) {
        // Save new last position
        this.last_traffic_light_position = traffic_light_position;
    }

    // Add traffic light on the road
    this.traffic_lights.push(traffic_light);

    return true;
};

/**
 * run Runs traffic simulation
 */
Road.prototype.run = function() {
    // Start traffic simulation
    this.runSimulation();

    return true;
};

/**
 * runSimulation start simulation loop
 */
Road.prototype.runSimulation = function() {
    this.simulation_timeout_id = setTimeout(this.simulationStep.bind(this), this.simulation_step);

    return true;
};

/**
 * simulationStep Runs one simulation step
 */
Road.prototype.simulationStep = function() {
    var vehicle_positions, last_vehicle_position;

    // Increase the time for the traffic light
    // and based on time interval it will switch the color
    this.traffic_lights.forEach(function(traffic_light) {
        traffic_light.changeColor(this.simulation_step);
    }.bind(this));

    // Move the vehicles if there is no traffic light or 'green' color
    this.vehicles.forEach(function(vehicle) {
        // Get traffic light by vehicle position
        var traffic_light = this.getTrafficLightByPosition(vehicle.getPosition());

        // Check if there is a traffic light and color is 'red'
        if (traffic_light && traffic_light.getColor() === 'red') return false;

        // Move vehicle one position forward
        vehicle.moveForward();
    }.bind(this));

    // Get all vehicle positions
    vehicle_positions = this.vehicles.map(function(vehicle) {
        return vehicle.getPosition();
    });

    // Get the very last vehicle position
    last_vehicle_position = Math.min.apply(null, vehicle_positions);

    // The simulation runs until
    // all vehicles pass through the traffic lights
    if (last_vehicle_position > this.last_traffic_light_position) return false;

    // Draw simulation to console
    this.draw();

    // Run next simulation step
    this.runSimulation();

    return true;
};

/**
 * getTrafficLightByPosition Checks if there is traffic light on the road
 * @param  {Number}  vehicle_position
 * @return {Boolean}
 */
Road.prototype.getTrafficLightByPosition = function(vehicle_position) {
    var found_traffic_light, is_found = false;

    // Get current traffic light for the vehicle position
    is_found = this.traffic_lights.some(function(traffic_light) {
        if (vehicle_position !== traffic_light.getPosition()) return false;

        found_traffic_light = traffic_light;

        return true;
    });

    // Return false if traffic light isn't found
    if (!is_found) return false;

    return found_traffic_light;
};

/**
 * draw Draws the road, vehicles and traffic lights
 * @return {Boolean}
 */
Road.prototype.draw = function(vehicle_position) {
    var i, lines;

    // Get number of lines in console window
    lines = process.stdout.getWindowSize()[1];

    // Clear console
    for (i = 0; i < lines; i++) {
        console.log('\r\n');
    }

    // Draw the road markings
    console.log('              ' + new Array(this.last_traffic_light_position).join('-'));

    // Draw the vehicles
    this.vehicles.forEach(function(vehicle, index) {
        console.log('vehicle:      ' + new Array(vehicle.getPosition()).join(' ') + (index + 1));
    });

    console.log('              ' + new Array(this.last_traffic_light_position).join('-'));

    // Draw the traffic lights
    this.traffic_lights.forEach(function(traffic_light, index) {
        console.log('traffic light:' + new Array(traffic_light.getPosition()).join(' ') + traffic_light.getColor());
    });

    return true;
};

module.exports = Road;
