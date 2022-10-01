const EmailService = require("../../services/email-service")
require("dotenv").config()

test("throw error when passing invalid email", () => {
    expect(new EmailService("This is not an email")).toThrow();
})