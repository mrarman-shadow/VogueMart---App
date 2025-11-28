const paymentForm = document.getElementById('payment-form');

paymentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const paymentMethod = document.querySelector('input[name="payment"]:checked');

  if (!name || !phone || !address || !paymentMethod) {
    alert('Please fill all the fields correctly.');
    return;
  }

  // For demo, we just alert success
  alert(`Payment Successful!\nName: ${name}\nPhone: ${phone}\nPayment Method: ${paymentMethod.value}`);
  
  // Reset form after payment
  paymentForm.reset();
});
