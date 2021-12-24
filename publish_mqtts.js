const mqtt = require('mqtt');

const opt = {
    rejectUnauthorized: false, //使憑證無效
    host : '172.20.10.3',
    protocol: 'mqtts',
    port: 8883,
}

const client = mqtt.connect(opt);
client.on('connect',function (res){
    console.log(res);
    var count = 0;
    setInterval(function(){
        count = count+1;
        const msg = "send【" +count+"】 times";
        console.log("publish: "+msg);
        client.publish('MQTT_SSL',msg);

    },3000);

});