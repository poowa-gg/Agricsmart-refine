const crypto = require('crypto');

/**
 * Generates a unique alphanumeric voucher code
 * @param {number} length 
 * @returns {string}
 */
const generateVoucherCode = (length = 12) => {
    return crypto.randomBytes(length)
        .toString('hex')
        .slice(0, length)
        .toUpperCase();
};

module.exports = { generateVoucherCode };
