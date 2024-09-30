const crypto = require('crypto');
require('dotenv').config();

const _encryptionKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

if (!_encryptionKey) {
  throw new Error('Encryption key is missing');
}

// Function to encrypt
function encryptAES(entity) {

  // Generate a 16-byte initialization vector (IV)
    const iv = crypto.randomBytes(16);

    // Create a cipher with aes-256-cbc, the key must be in Buffer and the IV must be passed.
    const cipher = crypto.createCipheriv('aes-256-cbc', _encryptionKey, iv);

    let encrypted = cipher.update(entity, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the IV and encrypted data (the IV is required for decryption)
    return iv.toString('hex') + ':' + encrypted;
}

// Fonction to decrypt
function decryptAES(encryptedEntity) {
  
    // Separate IV and encrypted content
    const parts = encryptedEntity.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];

    // Create a decipher with aes-256-cbc, use key and IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', _encryptionKey, iv);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

module.exports = {
    encryptAES,
    decryptAES
  }