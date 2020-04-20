# Chat with a chatbot with NodeJS, Express, Socket.io and MQQT

The application will implement the below design where we expose a chat based on socket.io, which will forward the request to a MQTT broker queue and answer the user’s query using our bot.

![Design](https://jhonvp.github.io/financialchat/public/images/diagram.svg)

The project is based on the following repositories:

1. [financialchat](https://github.com/jhonvp/financialchat) It renders the front end and handle the chat feature.
2. [financialmqttbroker](https://github.com/jhonvp/financialmqttbroker) It allows the communication between the chat server and the chat bot.
3. [financialbot](https://github.com/jhonvp/financialbot) It communicates with the financial chat via the mqttbroker.

## Technologies

The project is based on the following technologies:

1. [expressJS](https://expressjs.com/)
2. [socket.io](https://socket.io/)
3. [mosca](https://github.com/moscajs/mosca)
3. [mqqt](https://github.com/mqttjs/MQTT.js#readme)

## Standalone

You need to download the respositories a run each one using the following commands. I recommend to run in the following order:

1. financialmqttbroker
2. financialbot
3. financialchat

* **Prerequisite**
```
npm install pm2 -g
```

* **Install dependencies**
```
npm install
```

* **Start each project**
```
npm start
```

Navigate to `http://localhost:3000/`.

* **Stop each project**
```
npm stop
```

* **Restart each project**
```
npm restart
```

## Test Project

* **Install dependencies**
```
npm install
```

* **Test each project**
```
npm test
```

## Online

Navigate to [http://167.172.216.74:3000/](http://167.172.216.74:3000/).

## Features

- It allows the users to users to log in and talk with other users in a chatroom.
- It allows to have multiple chat rooms.
- It keeps the history of the last 50 messages in the chat room.
- It communicates with the chat bot (only one command is implemented)

## Commands

All messages on the chat that starts with `/` is recognize as a command.

* **/stock=COMPANY_CODE**

  It returns the stock values of the company code.


## Screenshoot

![Login Screenschot](https://jhonvp.github.io/financialchat/public/images/loginscreen.png)
![Chat Screenshoot](https://jhonvp.github.io/financialchat/public/images/chatscreen.png)



