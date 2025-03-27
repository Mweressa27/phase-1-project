document.addEventListener("DOMContentLoaded", () => {
    const landingImage = document.getElementById('landingImage');  

    if (landingImage) {
        const imageSources = [
            './images/landing_page_img.jpg',
            './images/landing_page_img1.jpg',
            './images/landing_page_img2.jpg'
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

       
  
});
