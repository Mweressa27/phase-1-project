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

function displayBooks (){
    fetch('http://localhost:3000/books?_limit=4')
    .then(res => res.json())
    .then(books => {
        const specialOffersSection = document.querySelector('.special-offers');
        specialOffersSection.innerHTML = '';

        books.forEach(book => {
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
        }) 

    })
    .catch(error => {
        console.error('Error fetching books data:', error);
    });
}
displayBooks ()
});
