(function(ext) {
    var botixSocket;
    var botixServer = '127.0.0.1';
    var botixPort = 10000;
    var botixStatus = 0;

    var debugLevel = 0;

    ext._shutdown = function() {


    };

    ext._getStatus = function() {
        return {status: botixStatus, msg: 'Ready'};
    };

    ext.block_connect = function() {
        var timeout;

        var socket = new WebSocket('ws://' + botixServer + ':' + botixPort);
        botixSocket =  {'ip': botixServer, 'port': botixPort, 'ws': socket});

        // start the timer for a server reply - we wait for up to 2 seconds for the reply
        timeout = window.setTimeout(noBotixServerAlert, 2000);

        // attach an onopen handler to this socket. This message is sent by a servers websocket
        socket.onopen = function (event) {
            window.clearTimeout(timeout);
            
            if (debugLevel >= 1)
                console.log('onopen message received');

            socket.send('connect');
            callback(); 
        };

        function noBotixServerAlert() {
            
        }

        socket.onmessage = function (message) {
            if (debugLevel === 1)
                console.log('onmessage received: ' + message.data);

            var msg = message.data.split('/');

            switch (msg[0]) {
                // dataUpdate - server data update data message
                case 'dataUpdate':
                    var index = msg[1]; // unique value used as an index into sensorDataArray
                    var data = msg[2]; // data value to be entered into sensorDataArray
                    if (debugLevel >= 2)
                        console.log('sensorData: index = ' + index + ' data = ' + data);
                    // update the array with the new value
                    sensorDataArray[index].value = data;
                    break;

                // server detected a problem in setting the mode of this pin
                case 'invalidSetMode':
                case 'invalidPinCommand':
                    console.log('invalid alerts:' + 'index: ' + msg[1] + 'board: ' + msg[2] + 'pin: ' + msg[3]);
                    createAlert(msg[1], msg[2], msg[3]);
                    break;
                default:
                    if (debugLevel >= 1)
                        console.log('onmessage unknown message received');
            }
        };
    };

    ext.block_disconnect = function() {
        var msg = 'disconnect';
        sendCommand(msg, board, 'analogWrite');
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

    function sendBotixCommand(msg) {
        if (debugLevel >= 1) {
            console.log('sendCommand: ' + msg);
        }
        
        if (botixSockets) {
            botixSockets.ws.send(msg);
            return;
        }
    }

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