document.addEventListener("DOMContentLoaded", () => {
    const landingImage = document.getElementById('landingImage');
    
    if (landingImage) {
        const imageSources = [
            './images/landing_page_img.jpg',
            './images/landing_page_img1.jpg',
            './images/landing_page_img2.jpg',
            './images/landing_page_img3.jpg'
        ];

        let currentImageIndex = 0;

        function changeImage() {
            landingImage.src = imageSources[currentImageIndex];
            currentImageIndex = (currentImageIndex + 1) % imageSources.length;
        }

        setInterval(changeImage, 4000);
    } else {
        console.error('Landing image element not found!');
    }

    let books = [];

    function displayBooks(booksToDisplay) {
        const specialOffersSection = document.querySelector('.special-offers');
        specialOffersSection.innerHTML = '';

        booksToDisplay.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('special-offers-items');
            bookDiv.innerHTML = `
                <img src="${book.cover_page}" alt="${book.title}" width="150px" height="250px">
                <p>${book.title}</p>
                <h2><span>${book.price}</span> KSH.${parseInt(book.price.replace('Ksh. ', '').replace(',', '')) - 200}</h2>
                <button>Add to cart</button>
                <img src="./images/logos/wishlist.png" alt="Wishlist" width="30px" height="30px">
            `;
            specialOffersSection.appendChild(bookDiv);
        });
    }

    function displayOtherBooks() {
        fetch('http://localhost:4000/books?_start=4&_limit=8')
            .then(res => res.json())
            .then(booksData => {
                books = booksData; 
                const bestsellerSection = document.querySelector('.bestseller-books');
                bestsellerSection.innerHTML = '';

                booksData.forEach(book => {
                    const bestsellerDiv = document.createElement('div');
                    bestsellerDiv.classList.add('bestseller-item');
                    bestsellerDiv.innerHTML = `            
                        <img src="${book.cover_page}" alt="${book.title}" width="150px" height="250px">                            
                        <p>${book.title}</p>
                        <h2>${book.price}</h2>
                        <button class="wishlist-btn">Add to cart</button>
                        <img src="./images/logos/wishlist.png" alt="Wishlist" width="30px" height="30px">
                    `;
                    bestsellerSection.appendChild(bestsellerDiv);
                });

                
                const wishlistBtns = document.querySelectorAll('.wishlist-btn');
                wishlistBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const wishlist = document.getElementById('wishlist');
                        wishlist.textContent = parseInt(wishlist.textContent) + 1; 
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching bestseller books:', error);
            });
    }

    
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks); 
        displayOtherBooks(filteredBooks); 

    });

        fetch('http://localhost:4000/books?_limit=4')
        .then(res => res.json())
        .then(booksData => {
            displayBooks(booksData); 
        })
        .catch(error => {
            console.error('Error fetching special offers books:', error);
        });

    
    displayOtherBooks();
}); 


