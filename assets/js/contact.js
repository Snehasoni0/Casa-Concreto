const scriptURL = "https://script.google.com/macros/s/AKfycbx3ZCRKzNrZWtxnBS447eZ9xAbdxrvAtmnCyFPpC_qOHNYOhWZKEtPCyNcRLzPCAFv4BQ/exec";

document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.status === "success") {
      window.location.href = "https://snehasoni0.github.io/Casa-Concreto/pages/Thankyou.html";
    } else {
      alert("Something went wrong!");
    }

  } catch (error) {
    console.error(error);
    alert("Error submitting form");
  }
});


