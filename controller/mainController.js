
const useragent = require('express-useragent');
// defining the homepage controller function
exports.homepageController = (req, res) => {

    // getting the device type
    // const userAgent = useragent.parse(req.headers['user-agent']);
    // const deviceType = userAgent.device.family;
    // const deviceModel = userAgent.device.model;

    var source = req.headers['user-agent'],
        ua = useragent.parse(source);

    // console.log({
    //     ua
    // });

    res.json({ 
        status: true, 
        message: 'The API is fully functional',
        fun:"You are browsing with "+ ua.browser+ " of version " + ua.version +' on a '+ ua.os + ' Welcome to Messenge bird'
    });
};

