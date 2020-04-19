# Chat with a chatbot with NodeJS, Express, Socket.io and MQQT

The application will implement the below design where we expose a chat based on socket.io, which will forward the request to a MQTT broker queue and answer the user’s query using our bot.

![Design](https://jhonvp.github.io/financialchat/public/images/diagram.svg)

The project is based on the following repositories:

1. [financialchat](https://github.com/jhonvp/financialchat)
2. [financialchat](https://github.com/jhonvp/financialmqttbroker)
3. [financialbot](https://github.com/jhonvp/financialbot)

## Standalone

You need to download the respositories a run each one using the following commands. I recommend to run in the following order:

1. financialmqttbroker
2. financialbot
3. financialchat

```
npm install pm2 -g
npm install
npm start
```
Navigate to `http://localhost:3000/`.

## Online

Navigate to [http://167.172.216.74:3000/](http://167.172.216.74:3000/).

## Commands

All messages on the chat that starts with `/` is recognize as a command.

* **/stock=COMPANY_CODE**

  It returns the stock values of the company code.


## Screenshoot

![Login Screenschot](https://jhonvp.github.io/financialchat/public/images/loginscreen.png)
![Chat Screenshoot](https://jhonvp.github.io/financialchat/public/images/chatscreen.png)



