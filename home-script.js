
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/IJeQQFZlB/";

let model, webcam, labelContainer, maxPredictions;

document.addEventListener("DOMContentLoaded", function () {

    init();
});

// Load the image model and setup the webcam
async function init() {
    // const startButton = document.getElementById("start-button")
    // const content = document.getElementById("content");
    // content.style.display = "none";

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    percentages = document.getElementById("percentages");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        percentages.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predictTopK(webcam.canvas, maxPredictions = 1);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            // prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            (prediction[i].probability.toFixed(2) * 100) + "% " + prediction[i].className;
        percentages.childNodes[i].innerHTML = classPrediction;
    }
}
