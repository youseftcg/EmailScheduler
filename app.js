require("dotenv").config()

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const usersRouter = require("./routes/users")
const EmailService = require('./services/email-service');
const messagesSeed = require('./seeds/messages');
const Message = require("./models/message")
const EmailSchedulerService = require("./services/email-scheduler-service");
const messagesRepository = require("./repositories/messages-repository");
const usersRepository = require("./repositories/users-repository");
const EMAIL_ADDRESS = "yousefjoeapp@gmail.com"

startEmailScheduler();
startWebService();

function startEmailScheduler() {
    // Generate 10 fake messages
    for (const message of messagesSeed.dummyMessages) {
        messagesRepository.addMessage(new Message(...Object.values(message)))
    }

    const emailService = new EmailService(EMAIL_ADDRESS);
    // Start sending emails to users every 60 second
    new EmailSchedulerService(emailService, 60, usersRepository, messagesRepository).start();
}


function startWebService() {
    app.listen(port, () => {
        console.log(`Listening on port ${port}...`)
    })

    // Accept url-encoded format in requests
    app.use(express.urlencoded({extended: true}))

    // Set the routes
    app.use("/user", usersRouter);
    app.get("/", (req, res) => res.sendFile("./views/index.html", {root: __dirname}))

    // Set 404 page for unexpected paths
    app.use((req, res) => res.status(404).send("404 NOT FOUND"))
}