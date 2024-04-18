const CryptoDB = require('crypto.js');

const _encryptionKey = 'b32c32aac9c6afd06ab3554415de5edbafc14ef97cc6d0e4ffa678220a57b39f';

// Fonction pour crypter le mot de passe
function encrypt(entity) {
    const cipher = crypto.createCipher('aes-256-cbc', _encryptionKey);
    let encrypted = cipher.update(entity, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Fonction pour décrypter le mot de passe
function decrypt(encryptedEntity) {
    const decipher = crypto.createDecipher('aes-256-cbc', _encryptionKey);
    let decrypted = decipher.update(encryptedEntity, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
