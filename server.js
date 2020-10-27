// import express js dependency
const express = require('express');

// import request body parser
const bodyParser = require('body-parser');

//define the parser type for the request
const jsonParser = bodyParser.json();

// create the server instance
const app = express();

// start the server on 9000 port
app.listen(9000, () => {console.log("server started on port : 9000");});

// A server health checking api. returns 200 status if ther server is up and running
app.get('/api/health', (req, res) => {
    res.status(200).json({"Server Health": "OK"});
});

// A decryption enpoint to decrypt the provided input string in request body
// The decrypted string is returned along with status of the decryption as a response.
app.post('/api/decrypt', jsonParser, (req, res) => {
    const input = req.body.input;
    if(!isValidInput(input)){
        res.status(200).json(
            {
                'Input': input,
                'Output': encryptOrDecrypt(input, 2, false),
                'status': 'Success',
                'message': 'Input string decrypted'
            }
        );
    } else {
        res.status(400).json(
            {
                'Input': input,
                'Output': '',
                'status': 'Error',
                'message': 'Input string is empty'
            }
        );
    }
});

// An encryption enpoint to encrypt the provided input string in request body
// The encrypted string is returned along with status of the encryption as a response.
app.post('/api/encrypt', jsonParser, (req, res) => {
    const input = req.body.input;
    if(!isValidInput(input)){
        res.status(200).json(
            {
                'Input': input,
                'Output': encryptOrDecrypt(input, 2, true),
                'status': 'Success',
                'message': 'Input string encrypted'
            }
        );
    } else {
        res.status(400).json(
            {
                'Input': input,
                'Output': '',
                'status': 'Error',
                'message': 'Input string is empty'
            }
        );
    }
});


// Validate if the string is empty or not. returns false if the input is not defined/empty
const isValidInput = (input) => {
    return (!input || 0 === input.length);
}


// A simple encrypttion logic which shifts charcters of the input string 'str' by 'num' places forward
const encryptOrDecrypt = (str, num, isEncryption) => {
    str = str.toLowerCase();

    let result = '';
    let charcode = 0;

    if(isEncryption) {
        for (let i = 0; i < str.length; i++) {
            charcode = (str[i].charCodeAt()) + num;
            result += String.fromCharCode(charcode);
        }
    } else {
        for (let i = 0; i < str.length; i++) {
            charcode = (str[i].charCodeAt()) - num;
            result += String.fromCharCode(charcode);
        }
    }
    return result;

}