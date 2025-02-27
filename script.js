const loginBtn = document.getElementById("login-btn");
const googleLoginBtn = document.getElementById("google-login-btn");
const profileContainer = document.getElementById("profile-container");
const profileImage = document.getElementById("profile-image");
const popup = document.getElementById("popup");
const overlay = document.getElementById("overlay");
const closePopup = document.getElementById("close-popup");
const itemsContainer = document.getElementById("items-container");

// Profile Card Popup Elements
const profilePopup = document.getElementById("profile-popup");
const popupProfileImage = document.getElementById("popup-profile-image");
const popupProfileName = document.getElementById("popup-profile-name");
const popupProfileEmail = document.getElementById("popup-profile-email");
const closeProfileBtn = document.getElementById("close-profile");

// Function to hide the login popup
function hidePopup() {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

// Show login popup when login button is clicked
loginBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

// Prevent clicks inside the login popup from closing it
popup.addEventListener("click", (event) => {
  event.stopPropagation(); // Stop event bubbling
});

// Hide login popup when clicking outside of it
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    hidePopup();
  }
});

// Hide login popup when pressing Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hidePopup();
    profilePopup.classList.add("hidden");
  }
});

// Handle Google Login
function handleCredentialResponse(response) {
  const responsePayload = parseJwt(response.credential);

  // Store user info in localStorage
  localStorage.setItem(
    "userInfo",
    JSON.stringify({
      name: responsePayload.name,
      email: responsePayload.email,
      picture: responsePayload.picture,
    })
  );

  // Update UI
  updateProfileUI(responsePayload);
}

// Parse JWT token
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

// Update UI to show profile picture instead of login button
function updateProfileUI(userData) {
  loginBtn.classList.add("hidden");
  profileImage.src = userData.picture;
  profileContainer.classList.remove("hidden");

  // Update profile popup
  popupProfileImage.src = userData.picture;
  popupProfileName.textContent = userData.name;
  popupProfileEmail.textContent = userData.email;

  // Hide login popup
  hidePopup();
}

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo) {
    updateProfileUI(userInfo);
  }
});

// Trigger Google login manually
googleLoginBtn.addEventListener("click", () => {
  google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID",
    callback: handleCredentialResponse,
    ux_mode: "popup",
  });
  google.accounts.id.prompt();
});

// Show Profile Popup when profile image is clicked
profileContainer.addEventListener("click", () => {
  profilePopup.classList.remove("hidden");
});

// Close profile popup when clicking "Close"
closeProfileBtn.addEventListener("click", () => {
  profilePopup.classList.add("hidden");
});

// Hide profile popup when clicking outside the card
profilePopup.addEventListener("click", function (event) {
  if (event.target === profilePopup) {
    profilePopup.classList.add("hidden");
  }
});

// WebSocket connection (replace with your actual WebSocket URL)
const socket = new WebSocket("wss://your-websocket-url");

socket.onmessage = function (event) {
  const items = JSON.parse(event.data); // Expecting an array of items

  // Clear the container before adding new items
  itemsContainer.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("item-card");

    card.innerHTML = `
            <div class="veg-indicator ${item.veg ? "veg" : "non-veg"}"></div>
            <img src="${item.image}" alt="${item.name}">
            <div class="item-name">${item.name}</div>
            <div class="item-price">₹${item.price}</div>
            <div class="item-quantity">Available: ${item.quantity}</div>
            <button class="add-to-cart" data-id="${
              item.id
            }">Add to Cart</button>
        `;

    itemsContainer.appendChild(card);
  });

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const itemId = this.getAttribute("data-id");
      addToCart(itemId);
    });
  });
};

// Function to handle adding items to cart
function addToCart(itemId) {
  console.log("Added item to cart:", itemId);
  // Implement cart functionality here
}