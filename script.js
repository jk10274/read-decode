// Fetch the JSON data
fetch('texts.json')
  .then(response => response.json())
  .then(data => {
    const imageContainer = document.getElementById('image-container');

    // Loop through each object in the Texts object
    for (let text in data.Texts) {
      // Loop through each subobject (in case there are multiple images per text)
      data.Texts[text].forEach(imageInfo => {
        // Create a new image element
        let img = new Image();

        // Set the src of the image to the src value from the JSON
        img.src = imageInfo.src;

        // Set the title of the image to the object's title
        img.title = text;

        // Set the size of the image
        img.height = 100;


        // Generate random top and left values (0 to 100)
        let randomTop = Math.floor(Math.random() * 50);
        let randomLeft = Math.floor(Math.random() * 50);

        // Set the image's style to position it randomly on the page
        img.style.position = 'absolute';
        img.style.top = `${randomTop}vh`;
        img.style.left = `${randomLeft}vw`;
        img.style.zIndex = 1000;

        // Append the image to the imageContainer
        imageContainer.appendChild(img);
      });
    }
  })
  .catch(error => console.error('Error:', error));
