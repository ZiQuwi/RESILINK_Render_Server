const NotificationService = require("../services/NotificationService");

const sendNotification = (req, res) => {
    const message = req.body.message;
    console.log("dans le notification controlleur");
    NotificationService.sendNotification(message);
    res.status(200).json({ success: true, message: "Notification sent successfully" });
};

module.exports = {
    sendNotification
};
