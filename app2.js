const accountSid = "AC1b3d4de0e88a570f564f031f9d421e39";
const authToken = "e6cb97310a90395b4e9d91c2626408c2";

const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hola carlos como estas',
         to: 'whatsapp:+5212871313291'
       })
      .then(message => console.log(message));
