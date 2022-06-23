const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();

const accountSid = "AC1b3d4de0e88a570f564f031f9d421e39";
const authToken = "e6cb97310a90395b4e9d91c2626408c2";
const client = new twilio(accountSid, authToken);

let MessageSchema = new mongoose.Schema({
    phoneNumber: String,    
    active: Boolean,    
    section: String,        
    deleteAt: Date,    
});

let Message = mongoose.model('Message', MessageSchema);

app.use(bodyParser.urlencoded({extends: false}));

mongoose.connect('mongodb+srv://root:root@test.ird2naj.mongodb.net/?retryWrites=true&w=majority').then(console.log('db connected'));

app.get('/', (req, res) => {
    res.end()
})

app.post('/', (req, res) => {    
    let fromMessage = req.body.From;
    let toResponse = req.body.To;
    let body = req.body.Body;    
    
    Message.find({phoneNumber: `${req.body.From}`}, (err, message) => {
        if(message.length !== 0){            
            
        }else{
            if(body === 'hola'){                
                let newMessage = new Message();
                newMessage.phoneNumber = fromMessage;                
                //send message response
                newMessage.save(() => {
                    client.messages.create({
                        to: `${req.body.From}`,
                        from: `${req.body.To}`,
                        body: 'Hola bienvenido al bot bahia:\n¿Cuál es su especialidad?\na) Medicina general/familiar\nb)Gastroenterología\nc)Médico Internista\d)Reumatología\ne)Otra'
                    })
                    .then(message => console.log(message))
                    .catch(console.error)
                    res.end();
                })
            }            
        }
        res.end();
    })
})

app.listen(3000, () => {
    console.log('Server connected')
})