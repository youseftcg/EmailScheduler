# Email Scheduler

A project for scheduling sending emails to subscribed users every 60 seconds.

## Set up:

1. You need to get an API_KEY from [SendGrid](https://signup.sendgrid.com/) for Email Api. (SendGrid is the library used to send emails to users)
2. Configure SendGrid to verify the email you will be sending emails from. You can follow this [guide](https://docs.sendgrid.com/ui/sending-email/sender-verification)
3. Create a file named **.env** in the project's root directory.
4. Inside the **.env** file, add `SENG_GRID_API_KEY=<YOUR_API_KEY>`. You should replace `<YOUR_API_KEY>` with the API_KEY you got from SendGrid as described in the 1st step.
5. Inside **app.js**, you need to use the email address you verified in the 2nd step to be able to send emails using it.
   In **app.js** you will find this line `const EMAIL_ADDRESS = "example@example.com"`, replace `example@example.com` with your verified email address.


## Usage

After you have completed the [set up](#set-up), you can start the app using `npm start`.

To add an email address to the list of subscribers you can do so using one of the following ways:

1. UI: You can use the UI to add new email address to the list of subscribers from http://localhost:8080 .

2. API: you can send a **POST** request to **/users** (http://localhost:8080/users).
    - It accepts **x-www-form-urlencoded** format.
    - You can use the parameter **email** as the key to send the email. (e.g. email="youremail@example.com", where `email` is the KEY and `"youremail@example.come"` is the VALUE)


Email addresses you add, will start receiving random messages after 1 minute.

