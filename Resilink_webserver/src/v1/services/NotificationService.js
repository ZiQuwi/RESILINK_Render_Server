const sendNotification = (message) => {
    io.emit("notification", message);
};
  
module.exports = {
    sendNotification
};