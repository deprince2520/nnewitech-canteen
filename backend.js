<script>
// Submit contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const result = await response.json();
      alert(result.message);
      contactForm.reset();
    } catch (error) {
      alert('Error sending message.');
      console.error(error);
    }
  });
}

// Handle cart and submit order
let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  updateCartUI();
}

function updateCartUI() {
  const cartList = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('cart-total');
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = ${entry.item} - ₦${entry.price};
    cartList.appendChild(li);
    total += entry.price;
  });

  totalDisplay.textContent = Total: ₦${total};
}

const orderButton = document.getElementById('submit-order');
if (orderButton) {
  orderButton.addEventListener('click', async () => {
    if (cart.length === 0) return alert('Cart is empty.');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, total }),
      });
      const result = await response.json();
      alert(result.message);
      cart = [];
      updateCartUI();
    } catch (error) {
      alert('Error placing order.');
      console.error(error);
    }
  });
}
</script>