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


        // Calculate top and left values based on the Time and Amount values
        let top = (imageInfo.Time - 1) / 9 * (2500 - 250) + 250;
        let left = (imageInfo.Amount - 1) / 9 * 80 + 5;

        // Set the image's style to position it based on the calculated top and left values
        img.style.position = 'absolute';
        img.style.top = `${top}px`;
        img.style.left = `${left}vw`;
        img.style.zIndex = 1000;
        // Append the image to the imageContainer
        imageContainer.appendChild(img);
      });
    }
  })
  .catch(error => console.error('Error:', error));
