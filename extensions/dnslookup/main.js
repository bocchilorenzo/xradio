const argv = require('minimist')(process.argv.slice(2));
const WS = require('websocket').w3cwebsocket;
const { v4: uuidv4 } = require('uuid');
const dns = require('dns');
const util = require('util');
const resolve4 = util.promisify(dns.resolve4);
const reverse = util.promisify(dns.reverse);

// Obtain required params to start a WS connection from CLI args.
const NL_PORT = argv['nl-port'];
const NL_TOKEN = argv['nl-token'];
const NL_EXTID = argv['nl-extension-id'];

let client = new WS(`ws://localhost:${NL_PORT}?extensionId=${NL_EXTID}`);

/**
 * Get a list of base urls of all available radio-browser servers
 * Returns: array of strings - base urls of radio-browser servers
 */
function get_radiobrowser_base_urls() {
    return resolve4("all.api.radio-browser.info").then(hosts => {
        let jobs = hosts.map(host => reverse(host));
        return Promise.all(jobs);
    }).then(hosts => {
        hosts.sort();
        return hosts.map(host_arr => "https://" + host_arr[0]);
    });
}

/**
* Get a random available radio-browser server.
* Returns: string - base url for radio-browser api
*/
function get_radiobrowser_base_url_random() {
    return get_radiobrowser_base_urls().then(hosts => {
        var item = hosts[Math.floor(Math.random() * hosts.length)];
        return item;
    });
}

client.onerror = function () {
    console.log('Connection error!');
};

client.onopen = function () {
    console.log('Connected');
};

client.onclose = function () {
    console.log('Connection closed');
    // Make sure to exit the extension process when WS extension is closed (when Neutralino app exits)
    process.exit();
};

client.onmessage = async function (e) {
    if (typeof e.data === 'string') {
        let message = JSON.parse(e.data);
        // Use extensions.dispatch or extensions.broadcast from the app,
        // to send an event here
        switch (message.event) {
            case 'dnsLookup':
                await get_radiobrowser_base_url_random().then(random_host => {
                    // Use Neutralinojs server's messaging protocol to trigger native API functions
                    // Use app.broadcast method to send an event to all app instances
                    client.send(JSON.stringify({
                        id: uuidv4(),
                        method: 'app.broadcast',
                        accessToken: NL_TOKEN,
                        data: {
                            event: 'baseHost',
                            data: random_host
                        }
                    }));
                });
                break;
        }
    }
};