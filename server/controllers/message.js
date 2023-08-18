const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');



const numbersArray = [
    {
        code: 1001,
        number: '+112233445566'
    },
    {
        code: 1002,
        number: '+112233445566'
    },
    {
        code: 1003,
        number: '+112233445566'
    },
    {
        code: 1004,
        number: '+112233445566'
    }
]

const sendMessage = (req, res) => {

    const code = parseInt(req.body.code) // convert code to integer
    //return error message if code dont match
    if (code !== 1001 && code !== 1002 && code !== 1003 && code !== 1004) {
        return res.status(400).send("invalid code")
    }
    
    const index = numbersArray.findIndex(i => i.code === code) //get index of required numbr by comparing with code
    let RequiredNum = numbersArray[index].number  // get the enumber

    // Use the saved values
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: "client-one"
        }),
    });
    //generate qr code
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        
        const chatId = RequiredNum.substring(1) + "@c.us";
        const message = `${req.body.message } From ${req.body.firstName}  ${req.body.lastName}`
        client.sendMessage(chatId, message) // send message to number
        console.log('Message Sent');

    });


    client.initialize();
    res.send('request successfull')
}

module.exports = { sendMessage }