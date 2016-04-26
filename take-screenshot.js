var webshot = require('webshot');
var crypto = require('crypto');
var moment = require('moment');

return module.exports = function(options, callback) {

    if (!options) callback(new Error('options is required'));
    if (!options.url) callback(new Error('options.url is required'));
    options.time = options.time || 300;
    options.width = options.width || '';
    options.height = options.height || '';

    var time = options.time;
    var screenshotConfig = {
        url: options.url,
        width: options.width,
        height: options.height
    };

    //generates MD5 for file name
    var screenshotFileName = crypto.createHash('md5')
        .update(screenshotConfig.url.toString())
        .update(screenshotConfig.height.toString())
        .update(screenshotConfig.width.toString())
        .digest('hex');

    var fullNameScreenShot = screenshotFileName + '.png';

    //custom size of screenshot
    var optionsSize = {
        shotSize: {
            width: screenshotConfig.width,
            height: screenshotConfig.height
        }
    };

    //creates an image in PNG format
    function saveImage(options){
        webshot(options.url, options.name, options.size,function(err) {
        });
    }

    connection.query(
        'SELECT * FROM `screenshots` WHERE (`url`=?) AND (`width`=?) AND (`height`=?)'
        , [screenshotConfig.url, screenshotConfig.width, screenshotConfig.height], function (err, result) {
            if (err) callback(new Error(err));
            if (!result.length) {

                //sql query with needed table columns
                connection.query('INSERT INTO screenshots SET ?', screenshotConfig, function(err, result){
                    if (err) callback(new Error(err));
                });

                //save image
                saveImage({
                    url: screenshotConfig.url,
                    name: fullNameScreenShot,
                    size: optionsSize
                });

            } else {
                //get time in second*10^3
                var dateA = moment();
                var dateB = moment(result[result.length - 1].timestamp);

                if(dateA.diff(dateB)<=time*1000){
                    //return success
                    callback(null, 'success');
                } else {
                    saveImage({
                        url: screenshotConfig.url,
                        name: fullNameScreenShot,
                        size: optionsSize
                    });

                    // update in db CURRENT_TIMESTAMP
                    connection.query('UPDATE `nodemysql`.`screenshots` SET timestamp=CURRENT_TIMESTAMP WHERE `id`=?',  result[result.length - 1].id, function(err, result){
                        if (err) callback(new Error(err));
                    });
                }
            }
        });
    callback(null,fullNameScreenShot);
};