(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.block_connect = function() {

    };

    ext.block_disconnect = function() {

    };

    ext.block_led = function(led_state) {
    };

    ext.block_wheels = function(left_wheel, right_wheel) {

    };

    ext.block_wheels_calibrate = function(left_wheel, right_wheel) {

    };

    ext.block_buzzer = function(duration, freq) {

    };

    ext.block_imperial_march = function() {

    };

    ext.block_halt = function() {

    };

    ext.block_get_temperature = function(callback) {

    };

    ext.block_get_light = function(callback) {

    };

    ext.block_get_obstacle = function(callback) {

    };

    ext.block_get_sonars = function(callback) {

    };

    ext.block_get_odometry = function(callback) {

    };

    ext.block_get_power = function(callback) {

    };

    ext.block_get_acceleration = function(callback) {

    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ['', 'Connect', 'block_connect'],
            ['', 'Disconnect', 'block_disconnect'],

            // Output 
            ['', 'Turn LED %m.stateOnOff', 'block_led', 'on'],
            //[' ', 'Turn LED on', 'block_led', 'on'],
            //[' ', 'Turn LED off', 'block_led', 'on'],

            ['', 'wheels(left: %n right: %n )', 'block_wheels', 1.00, 1.00],
            ['', 'wheel_calibrate(left: %n right: %n )', 'block_wheels_calibrate', 1.00, 1.00],
            ['', 'buzzer duration: %n (ms), freq: %n', 'block_buzzer', 1000, 500],
            ['', 'Imperial march', 'block_imperial_march'],
            ['', 'Halt', 'block_halt'],

            // Input
            ['', 'Get temperature', 'block_get_temperature'],
            ['', 'Get light', 'block_get_light'],
            ['', 'Get obstacle', 'block_get_obstacle'],
            ['', 'Get sonars', 'block_get_sonars'],
            ['', 'Get odometry', 'block_get_odometry'],
            ['', 'Get power', 'block_get_power'],
            ['', 'Get acceleration', 'block_get_acceleration'],
        ],
        menus: {
            stateOnOff: ['on', 'off']
        }
    };

    // Register the extension
    ScratchExtensions.register('EdgeBotix', descriptor, ext);
})({});