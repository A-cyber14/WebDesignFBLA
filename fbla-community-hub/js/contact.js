/* =========================================================
   contact.js — Checks the contact form before it is "sent".
   This prototype has no server, so messages are not emailed.
   ========================================================= */

const form = document.getElementById("contact-form");
const successBox = document.getElementById("form-success");

// Shows (or clears) the error message under one form field
function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "-error");
  error.textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const topic = document.getElementById("topic").value;
  const message = document.getElementById("message").value.trim();

  // Check each field. "valid" becomes false if anything is wrong.
  let valid = true;

  setError("name", name === "" ? "Please enter your name." : "");
  if (name === "") valid = false;

  // A simple email check: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setError("email", emailPattern.test(email) ? "" : "Please enter a valid email address, like name@example.com.");
  if (!emailPattern.test(email)) valid = false;

  setError("topic", topic === "" ? "Please choose a topic." : "");
  if (topic === "") valid = false;

  setError("message", message.length < 10 ? "Please write at least 10 characters." : "");
  if (message.length < 10) valid = false;

  if (!valid) {
    // Move keyboard focus to the first field with a problem
    form.querySelector("[aria-invalid='true']").focus();
    return;
  }

  // Everything is valid: show a thank-you message
  trackEvent("feedbackSent");
  form.hidden = true;
  document.getElementById("success-name").textContent = name; // textContent is safe for user input
  successBox.hidden = false;
  successBox.focus();
});

// "Send another message" button
document.getElementById("send-another").addEventListener("click", function () {
  form.reset();
  form.hidden = false;
  successBox.hidden = true;
  document.getElementById("name").focus();
});
