
const  verifyPassword = (password) => {
  // Password length criteria
  const minLength = 8;
  const maxLength = 20;

  // Regular expressions for specific password criteria
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*().,?]/.test(password);

  // Check if password meets all criteria
  const isLengthValid = (password.length >= minLength && password.length <= maxLength);
  const isCharactersValid = (hasUppercase && hasLowercase && hasDigit && hasSpecialChar);

  return isLengthValid && isCharactersValid;
}

const verifyLogin = (username) => {
    // Regular expression to check if the username only contains
    // letters, numbers, underscores, or hyphens, and is between 3 and 20 characters long
    var usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    
    if (usernameRegex.test(username)) {
      return true;
    } else {
      return false;
    }
}

const verifyFullName = (fullName) => {
  // Check if the input is a string
  if (typeof fullName !== "string") {
    return false;
  }

  // Trim the input to remove any leading or trailing whitespace
  fullName = fullName.trim();

  // Check if the input is empty
  if (fullName === "") {
    return false;
  }

  // Split the input into an array of words
  const words = fullName.split(" ");

  // Check if the input contains at least two words (first name and last name)
  if (words.length < 2) {
    return false;
  }

  // Check if each word in the input starts with a capital letter
  for (let i = 0; i < words.length; i++) {
    if (words[i][0] !== words[i][0].toUpperCase()) {
      return false;
    }
  }
  return true;
}

const objEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

module.exports = {
  verifyPassword,
  verifyLogin,
  verifyFullName,
  objEmpty
}
