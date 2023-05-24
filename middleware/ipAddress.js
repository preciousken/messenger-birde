
const os = require('os');

const getIPAddress = async (req,res,next) => {
    const interfaces = os.networkInterfaces();
    let ipAddress = null;

    for (const key in interfaces) {
        for (const iface of interfaces[key]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                ipAddress = iface.address;
                break;
            }
        }
        if (ipAddress) break;
    }

    req.ipAddress =  ipAddress;
    next()
    return;
};

// Usage
module.exports ={getIPAddress}