const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email("no-reply@swedlong.com");
        this.subject = subject;
        this.body = new helper.Content("text/html", content);
        this.recipients = this.formatAddresses(recipients);
        // addContent is defined by the baseclass helper.Mail
        this.addContent(this.body);
        // own defined functions
        this.addTracking();
        this.addRecipients();
    }
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addTracking() {
        // Messy but this is how sendgrid wants it
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personlize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personlize.addTo(recipient);
        });
        // addPersonalization is defined by the baseclass helper.Mail
        this.addPersonalization(personlize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: this.toJSON()
        });
        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;
