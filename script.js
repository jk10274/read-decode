// Fetch the JSON data
fetch("texts.json")
	.then((response) => response.json())
	.then((data) => {
		const imageContainer = document.getElementById("image-container");

		// Get the maximum "Time" value to calculate the delay
		let maxTime = 0;
		for (let text in data.Texts) {
			data.Texts[text].forEach((imageInfo) => {
				if (imageInfo.Time > maxTime) {
					maxTime = imageInfo.Time;
				}
			});
		}

		const placeImages = (data, property) => {
			// Get the image container
			const imageContainer = document.getElementById("image-container");

			// Remove all images
			while (imageContainer.firstChild) {
				imageContainer.removeChild(imageContainer.firstChild);
			}

			// Loop through each object in the Texts object
			for (let text in data.Texts) {
				// Loop through each subobject (in case there are multiple images per text)
				data.Texts[text].forEach((imageInfo) => {
					// Create a new image element
					let img = new Image();

					// Set the src of the image to the src value from the JSON
					img.src = imageInfo.src;

					// Set the title of the image to the object's title
					img.title = text;

					// Set the size of the image based on the "Font-Size" value
					img.style.height = `${imageInfo["Size"] * 10}px`;
					img.style.width = "auto";

					// Calculate top and left values based on the Time and the specified property values
					let top = ((imageInfo.Time - 1) / 9) * (2500 - 250) + 250;
					let left = (imageInfo[property] / 10) * 90 + 5;

					// Set the image's style to position it based on the calculated top and left values
					img.style.position = "absolute";
					img.style.top = `${top}px`;
					img.style.left = `${left}vw`;
					img.style.zIndex = 1000;

					// Initially set opacity to 0
					img.style.opacity = 0;

					// Add the fade-in class to the image
					img.classList.add("fade-in");

					// Set the animation delay based on the "Time" value
					let delay = imageInfo.Time / maxTime; // The multiplier controls the total duration
					img.style.animationDelay = `${delay}s`;

					// Append the image to the imageContainer
					imageContainer.appendChild(img);
				});
			}
		};
		// Place images initially based on "Amount"
		placeImages(data, "Amount");

		// Get the buttons
		let relevanzButton = document.getElementById("relevanz");
		let schriftgroesseButton = document.getElementById("schriftgroesse");
		let textmengeButton = document.getElementById("textmenge");
		let contextButton = document.getElementById("context");
		let farbeButton = document.getElementById("farbe");
		let situationButton = document.getElementById("situation");

		// Get the timeline text elements
		let timelineTextLeft = document.getElementById("timeline-text-left");
		let timelineTextRight = document.getElementById("timeline-text-right");
		let timelineTextCenter = document.getElementById("timeline-text-center");

		textmengeButton.addEventListener("click", () => {
			// Change the text on the timeline
			timelineTextLeft.textContent = "weniger";
			timelineTextRight.textContent = "mehr";

			// Place the images based on "Amount"
			placeImages(data, "Amount");
		});

		// Add click event listeners to the buttons
		relevanzButton.addEventListener("click", () => {
			// Change the text on the timeline
			timelineTextLeft.textContent = "weniger wichtig";
			timelineTextRight.textContent = "wichtiger";

			// Place the images based on "Importance"
			placeImages(data, "Importance");
		});

		schriftgroesseButton.addEventListener("click", () => {
			// Change the text on the timeline
			timelineTextLeft.textContent = "kleiner";
			timelineTextRight.textContent = "größer";

			// Place the images based on "Font-Size"
			placeImages(data, "Font-Size");
		});
	})
	.catch((error) => console.error("Error:", error));

/* // Loop through each object in the Texts object
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
        img.style.height = `${imageInfo["Size"] * 10}px`;
        img.style.width = 'auto';

        // Calculate top and left values based on the Time and Amount values
        let top = (imageInfo.Time - 1) / 9 * (2500 - 250) + 250;
        let left = (imageInfo.Amount - 1) / 9 * 80 + 5;

        // Set the image's style to position it based on the calculated top and left values
        img.style.position = 'absolute';
        img.style.top = `${top}px`;
        img.style.left = `${left}vw`;
        img.style.zIndex = 1000;

        // Initially set opacity to 0
        img.style.opacity = 0;

        // Add the fade-in class to the image
        img.classList.add('fade-in');

        // Set the animation delay based on the "Time" value
        let delay = (imageInfo.Time / maxTime) * 1; // The multiplier controls the total duration
        img.style.animationDelay = `${delay}s`;

        // Append the image to the imageContainer
        imageContainer.appendChild(img);
      });
    }
  })
  .catch(error => console.error('Error:', error)); */
