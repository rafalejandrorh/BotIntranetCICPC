const yargs = require('yargs');

function generatePassword(passwordLen = 12, hasSpecialChars = true, hasUpperCase = true, hasLowerCase = true, hasNumbers = true) {
  const specialChars = '!@#$%^&*()_-+={}[];:»|<>,.?/~`';
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';

  let allowedChars = 0;
  let password = 0;

  if (hasSpecialChars) {
    allowedChars += specialChars;
    password += randomChar(specialChars);
  }

  if (hasUpperCase) {
    allowedChars += uppercaseLetters;
    password += randomChar(uppercaseLetters);
  }

  if (hasLowerCase) {
    allowedChars += lowercaseLetters;
    password += randomChar(lowercaseLetters);
  }

  if (hasNumbers) {
    allowedChars += numbers;
    password += randomChar(numbers);
  }

  for (let i = password.length; i < passwordLen; i++) {
    password += randomChar(allowedChars);
  }

  return password;
}

function randomChar(characters) {
  const index = Math.floor(Math.random() * characters.length);
  return characters.charAt(index);
}

const argv = yargs
  .option('passwordLen', {
    alias: 'l',
    describe: 'Password length',
    type: 'number',
    default: 12
  })
  .option('hasSpecialChars', {
    alias: 's',
    describe: 'Include special characters',
    type: 'boolean',
    default: true
  })
  .option('hasUpperCase', {
    alias: 'u',
    describe: 'Include uppercase letters',
    type: 'boolean',
    default: true
  })
  .option('hasLowerCase', {
    alias: 'c',
    describe: 'Include lowercase letters',
    type: 'boolean',
    default: true
  })
  .option('hasNumbers', {
    alias: 'n',
    describe: 'Include numbers',
    type: 'boolean',
    default: true
  })
  .help()
  .alias('help', 'h')
  .argv;

module.exports = generatePassword(  
    argv.passwordLen,
    argv.hasSpecialChars,
    argv.hasUpperCase,
    argv.hasLowerCase,
    argv.hasNumbers
);
