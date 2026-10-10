const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

const { createClient } = window.supabase;

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const form = document.getElementById("registerForm");
const button = document.getElementById("registerButton");
const message = document.getElementById("message");

function showMessage(text, type) {
  message.textContent = text;
  message.className = message ${type};
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const fullName = form.elements.full_name.value.trim();
  const email = form.elements.email.value.trim();
  const phone = form.elements.phone.value.trim();
  const password = form.elements.password.value;
  const confirmPassword = form.elements.confirm_password.value;

  if (!fullName || !email || !phone) {
    showMessage("Please fill in all required fields.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage("Passwords do not match.", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Creating account...";
  showMessage("", "");

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone
        },
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw error;

    if (data.session) {
      showMessage(
        "Account created successfully! You are signed in.",
        "success"
      );
    } else {
      showMessage(
        "Account created. Check your email and confirm your account.",
        "success"
      );
    }

    form.reset();
  } catch (error) {
    console.error("Registration error:", error);
    showMessage(error.message || "Registration failed.", "error");
  } finally {
    button.disabled = false;
    button.textContent = "Create Account";
  }
});