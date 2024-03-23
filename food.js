// Hamburger
const hamburgerMenu = document.querySelector('.hamburger-menu');
 const navLinks = document.querySelector('.nav-links');
    hamburgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('show-nav');
  });

//   Carausal
document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelector(".slides");
  let currentIndex = 0;

  function showSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.childElementCount;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.childElementCount) % slides.childElementCount;
    showSlide(currentIndex);
  }

  function automaticSlide() {
    nextSlide();
    setTimeout(automaticSlide, 3000); 
  }

  automaticSlide();
});




const menuItems = [
  {
      name: "Samosa",
      description: "Crispy triangles filled with spiced delights; a satisfying savory treat.",
      price: 99,
      image: "Photos/samosa.jpg",
  },
  {
      name: "Pizza",
      description: "Irresistible slices topped with perfection; a true taste bud delight.",
      price: 249,
      image: "Photos/pizza.jpg",
  },
  {
      name: "Pasta",
      description: "Savor the comforting embrace of al dente pasta in flavorful sauces.",
      price: 149,
      image: "Photos/pasta.jpg",
  },
  {
    name: "Red Tea",
    description: "Experience the soothing warmth and vibrant flavor of our exquisite red tea.",
    price: 159,
    image: "Photos/redtea.jpg",
},
{
  name: "Oreo Shake",
  description: "Indulge in a creamy Oreo shake, a delightful blend of richness.",
  price: 99,
  image: "Photos/oreo.jpg",
},

];

// Menu Items
function renderMenuItems(menuItems) {
  const menuItemsContainer = document.querySelector('.menu-items');
  menuItemsContainer.innerHTML = '';

  menuItems.forEach(item => {
      const menuItemDiv = document.createElement('div');
      menuItemDiv.classList.add('menu-item');

      const image = document.createElement('img');
      image.src = item.image;
      menuItemDiv.appendChild(image);

      const name = document.createElement('h3');
      name.textContent = item.name;
      menuItemDiv.appendChild(name);

      const description = document.createElement('p');
      description.textContent = item.description;
      menuItemDiv.appendChild(description);

      const price = document.createElement('p');
      price.textContent = `Rs.${item.price.toFixed(2)}`;
      menuItemDiv.appendChild(price);

      const checkoutBtn = document.createElement('button');
      checkoutBtn.textContent = 'Checkout';
      checkoutBtn.classList.add('checkout-btn');
      checkoutBtn.addEventListener('click', () => {
          handleCheckout(item);
      });
      menuItemDiv.appendChild(checkoutBtn);
      menuItemsContainer.appendChild(menuItemDiv);
  });
}
function handleCheckout(selectedItem) {
  localStorage.setItem('selectedItem', JSON.stringify(selectedItem));
  window.location.href = 'checkoutpage.html';
}



function simulatePayment(selectedItem) {
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      
      const paymentSuccess = Math.random() < 0.8; 
      if (paymentSuccess) {
        resolve('Payment successful');
      } else {
        reject('Payment failed');
      }
    }, 2000);
  });
  
}
function populateCheckoutPage() {
  const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
console.log(selectedItem)
  if (selectedItem) {
      const orderSummaryContent = document.querySelector('.order-summary-content');
      orderSummaryContent.innerHTML = '';

      const orderSummary = document.createElement('div');
      orderSummary.innerHTML = `
          <h3>Selected Item</h3>
          <img src="${selectedItem.image}" alt="${selectedItem.name}" />
          <p>Name: ${selectedItem.name}</p>
          <p>Description: ${selectedItem.description}</p>
          <p>Price: Rs.${selectedItem.price.toFixed(2)}</p>
      `;
      orderSummaryContent.appendChild(orderSummary);
  } else {
      alert('No item selected. Please go back and select an item.');
  }
}
function simulatePayment(selectedItem) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const paymentSuccessful = true;

      if (paymentSuccessful) {
        resolve('Payment successful');
      } else {
        reject('Payment failed');
      }
    }, 2000);
  });
}
// for bank authentication
document.getElementById('cardnumber').addEventListener('input', function (event) {
  const cardInput = event.target;
  const value = cardInput.value.replace(/\s/g, ''); // Remove spaces
  const formattedValue = value
    .replace(/[^\d]/g, '') // Remove non-digit characters
    .replace(/(\d{4})(?=\d)/g, '$1-') // Add hyphens after every 4 digits
    .substring(0, 19); // Limit to a maximum of 19 characters (16 digits + 3 hyphens)
  cardInput.value = formattedValue;
});

// Add an input event listener to allow only alphabetic characters and spaces in the cardholder name
document.getElementById('cardholder').addEventListener('input', function (event) {
  const cardholderInput = event.target;
  const value = cardholderInput.value.replace(/[^A-Za-z\s]/g, ''); // Remove non-alphabetic and non-space characters
  cardholderInput.value = value;
});
document.getElementById('expiry').addEventListener('input', function (event) {
  const expiryInput = event.target;
  const value = expiryInput.value.replace(/[^\d]/g, ''); // Remove non-digit characters
  const formattedValue = value
    .replace(/^(\d{2})(\d{0,2})/, '$1/$2') // Add slash after 2 digits
    .substring(0, 5); // Limit to a maximum of 5 characters (MM/YY)
  expiryInput.value = formattedValue;
});
document.getElementById('cvv').addEventListener('input', function (event) {
  const cvvInput = event.target;
  const value = cvvInput.value.replace(/[^\d]/g, ''); // Remove non-digit characters
  const maxLength = 3; // Set the maximum length for CVV
  const formattedValue = value.substring(0, maxLength); // Limit to the maximum length
  cvvInput.value = formattedValue;
});
function completeOrder() {
  const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
  if (selectedItem) {
    if (selectedItem) {
      const cardholder = document.getElementById('cardholder').value;
      const cardnumber = document.getElementById('cardnumber').value;
      const expiry = document.getElementById('expiry').value;
      const cvv = document.getElementById('cvv').value;

      if (!cardholder || !cardnumber || !expiry || !cvv) {
        alert('Please fill in all the payment details before proceeding with the payment.');
        return; 
      }
    simulatePayment(selectedItem)
      .then(response => {
        alert('Payment successful! Thank you for your purchase.');
        window.open('thankyou.html', '_blank');
      })
      .catch(error => {
        alert('Payment failed. Please try again.');
      });
  }
}
}
function populateOrderSummary() {
  console.log('populateOrderSummary function is running');
  const selectedItemfor = JSON.parse(localStorage.getItem('selectedItem'));
console.log(selectedItemfor)
  if (selectedItemfor) {
    const orderSummaryContentToPaid = document.querySelector('.order-summary-content');
    orderSummaryContentToPaid.innerHTML = '';

    const orderSummaryPaid = document.createElement('div');
    orderSummaryPaid.className = "summary-order"
    orderSummaryPaid.innerHTML = `
        <h3>Order Summary</h3>
        <img src="${selectedItemfor.image}" alt="${selectedItemfor.name}" />
        <p>Name: ${selectedItemfor.name}</p>
        <p>Description: ${selectedItemfor.description}</p>
        <p>Price: Rs.${selectedItemfor.price.toFixed(2)}</p>
    `;
    orderSummaryContentToPaid.appendChild(orderSummaryPaid);}}  
  // console.log(orderSummary)

  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const issueForm = document.getElementById("issueForm");

    issueForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const submission = {
            name,
            email,
            message
        };

        const existingSubmissions = JSON.parse(localStorage.getItem("submissions")) || [];
        existingSubmissions.push(submission);
        localStorage.setItem("submissions", JSON.stringify(existingSubmissions));
        issueForm.reset();

        alert("Submission successful!");
    });
});
