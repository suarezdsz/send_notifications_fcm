const express = require('express');
const bodyparse = require('body-parser');
const methodoverride = require('method-override')
const FCM = require('fcm-node');

const app = express();
const router = express.Router();

app.use(bodyparse.json());
app.use(methodoverride());
app.use(router);

app.listen(3206, function(){
    console.log('Server Connection')
        


});

router.get('/notifications', (req, Response)=>{
    test = {
        key : '',
        titel : '',
        msg : '',
        operacion : '',
        retur : ''
    }
 //Variables FCM
    var device_key = req.query.key;
    var noti_title = req.query.title;
    var noti_msg = req.query.msg;

    test.key = req.query.key;
    test.titel = req.query.title;
    test.msg = req.query.msg;

    var serverKey = 'Server KEY FCM - Firebase'; //put your server key here
    var fcm = new FCM(serverKey);

//Payload Msg FCM
    var message = { 
        to: device_key, 
        collapse_key: 'app.domaion.net',
 
        notification: {
            title: noti_title, 
            body: noti_msg ,
             click_action: 'FCM_PLUGIN_ACTIVITY'
        },
 
        data: { 
            my_key: 'Administrator',
             my_another_key: 'info@domain.net'
         }
    };

    fcm.send(message, function(err, response){
        if (err) {
             test.operacion = 'Sending of failed notification'
             test.retur = false;
        } else {
            test.operacion = 'Sending of successful notification'
            test.retur = true;
        }
    });

    Response.send(test)

});

