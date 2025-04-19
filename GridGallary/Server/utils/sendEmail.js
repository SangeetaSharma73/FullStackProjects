sendEmail = (to, subject, text) => {
  console.log(`Email sent to ${to} with subject "${subject}":${text}`);

};

module.exports = sendEmail;