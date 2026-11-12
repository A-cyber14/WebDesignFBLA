/* =========================================================
   contact.js
   Checks the contact form. The site has no server, so the
   message isn't actually sent anywhere.
   ========================================================= */

const form = document.getElementById("contact-form");
const successBox = document.getElementById("form-success");

// Shows an error message under a field, or clears it if message is ""
function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  document.getElementById(fieldId + "-error").textContent = message;

  if (message === "") {
    field.setAttribute("aria-invalid", "false");
  } else {
    field.setAttribute("aria-invalid", "true");
  }
}

// A simple email check: needs an "@" with a "." somewhere after it
function looksLikeEmail(email) {
  const at = email.indexOf("@");
  const dot = email.lastIndexOf(".");
  return at > 0 && dot > at + 1 && dot < email.length - 1 && !email.includes(" ");
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const topic = document.getElementById("topic").value;
  const message = document.getElementById("message").value.trim();

  let valid = true;

  if (name === "") {
    setError("name", "Please enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  if (!looksLikeEmail(email)) {
    setError("email", "Please enter a valid email address, like name@example.com.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (topic === "") {
    setError("topic", "Please choose a topic.");
    valid = false;
  } else {
    setError("topic", "");
  }

  if (message.length < 10) {
    setError("message", "Please write at least 10 characters.");
    valid = false;
  } else {
    setError("message", "");
  }

  if (!valid) {
    // Move keyboard focus to the first field with a problem
    form.querySelector("[aria-invalid='true']").focus();
    return;
  }

  // Everything looks good, so show the thank-you message
  trackEvent("feedbackSent");
  form.hidden = true;
  document.getElementById("success-name").textContent = name;
  successBox.hidden = false;
  successBox.focus();
});

// "Start over" button
document.getElementById("send-another").addEventListener("click", function () {
  form.reset();
  form.hidden = false;
  successBox.hidden = true;
  document.getElementById("name").focus();
});
