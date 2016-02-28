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

    ext.block_led = function(state) {

    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            [' ', 'Connect', 'block_connect'],
            [' ', 'Disconnect', 'block_disconnect'],

            [' ', 'Turn LED %m.stateOnOff', 'block_led', 'on'],
        ],
        menus: {
            stateOnOff: ['on', 'off']
        }
    };

    // Register the extension
    ScratchExtensions.register('EdgeBotix', descriptor, ext);
})({});