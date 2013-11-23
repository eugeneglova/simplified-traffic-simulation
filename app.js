var Road            = require('./modules/road'),
    Vehicle         = require('./modules/vehicle'),
    TrafficLight    = require('./modules/traffic-light'),
    road            = {};

// Init the road with simulation step 1 second
road = new Road(1000);

// Add 4 vehicles with initial positions 0, 12, 20, 24
road.addVehicle(new Vehicle(0));
road.addVehicle(new Vehicle(12));
road.addVehicle(new Vehicle(20));
road.addVehicle(new Vehicle(24));

// Add traffic light at position 50 with a 'green' color
road.addTrafficLight(new TrafficLight(50, 'green'));

// Run the simulation
road.run();
