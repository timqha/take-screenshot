#SQL CREATE TABLE

##Installation:

##Create MySQL Query

CREATE TABLE `nodemysql`.`screenshots` (

    `id` INT NOT NULL AUTO_INCREMENT,

    `url` VARCHAR(255) NOT NULL,

    `width` INT NULL,

    `height` INT NULL,

    `timestamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`));


##Install the module:

    npm i https://github.com/

##Example of use:

    var takeScreenshot = require('take-screenshot');

    takeScreenshot({
        // url is required
        url: 'http://localhost:63342/hood/index.html',
        // time is number, default 300 second
        time: 500,
        // width is number, default ''
        width: 1366,
        //height is number, default ''
        height: 568
    }, function(err, nameImage){
        console.log(nameImage);
    });