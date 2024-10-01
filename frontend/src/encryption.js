function encrypt(text) {
  const shifts = [
    1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8, -8, 9, -9,
  ];
  let encrypted = "";
  let shiftIndex = 0;

  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    let shift = shifts[shiftIndex % shifts.length];
    encrypted += String.fromCharCode(charCode + shift);
    shiftIndex++;
  }

  return encrypted;
}

function decrypt(encryptedText) {
  const shifts = [
    1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8, -8, 9, -9,
  ];
  let decrypted = "";
  let shiftIndex = 0;

  for (let i = 0; i < encryptedText.length; i++) {
    let charCode = encryptedText.charCodeAt(i);
    let shift = shifts[shiftIndex % shifts.length];
    decrypted += String.fromCharCode(charCode - shift);
    shiftIndex++;
  }

  return decrypted;
}

module.exports = { encrypt, decrypt };
