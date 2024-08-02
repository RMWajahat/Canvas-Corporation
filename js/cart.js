document.addEventListener('DOMContentLoaded', function () {
    // Function to render cart items
    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        cartItemsContainer.innerHTML = ''; // Clear the container

        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        cart.forEach(product => {
            const productHTML = `
                <div class="flex justify-between mt-6">
                    <div class="flex">
                        <img class="h-20 w-20 object-cover rounded"
                            src="${product.image}"
                            alt="${product.name}">
                        <div class="mx-3">
                            <h3 class="text-sm text-gray-600">${product.name}</h3>
                            <div class="flex items-center mt-2">
                                
                                <span class="text-gray-700 mx-2">${product.quantity}</span>
                               
                            </div>
                        </div>
                    </div>
                    <span class="text-gray-600">${product.price}$</span>
                </div>
            `;

            cartItemsContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    // Initial render of cart items on page load
    renderCartItems();

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.addToCartBtn').forEach(button => {
        button.addEventListener('click', function () {
            const productContainer = this.closest('[data-name]');
            const product = {
                name: productContainer.getAttribute('data-name'),
                description: productContainer.getAttribute('data-description'),
                image: productContainer.getAttribute('data-image'),
                price: productContainer.getAttribute('data-price')
            };

            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

            // Check if the product already exists in the cart
            const existingProductIndex = cart.findIndex(item => item.name === product.name);

            if (existingProductIndex !== -1) {
                // If the product exists, increase its quantity
                cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
            } else {
                // If the product does not exist, add it with a quantity of 1
                product.quantity = 1;
                cart.push(product);
            }

            sessionStorage.setItem('cart', JSON.stringify(cart));

            // Render cart items after adding a new product
            renderCartItems();

            showNotification('Item added to the cart');
        });
    });

    let deleteCart = document.querySelector('.deletecart');

    if (deleteCart) {
        deleteCart.addEventListener('click', function () {
            if (sessionStorage.getItem('cart') !== null) {
                sessionStorage.removeItem('cart');
                showNotification('Cart cleared');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                showNotification('No items to clear.');
            }
        });
    }

    let processorder = document.querySelector('.process-order');

    if (processorder) {
        processorder.addEventListener('click', function () {
            if (sessionStorage.getItem('cart') !== null) {
                sessionStorage.removeItem('cart');
                showNotification('Thank you for your order');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                showNotification('Cart is empty.');
                setTimeout(() => {
                    sessionStorage.removeItem('cart');
                    window.location.reload();
                }, 3000);
            }
        });
    }

    // contact for js 
    let ContactForm = document.getElementById("contactform");

    ContactForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        showNotification('Thank you for your message');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    })






    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.remove('translate-y-[-100vh]');

        setTimeout(() => {
            notification.classList.add('translate-y-[-100vh]');
        }, 3000);
    }


});