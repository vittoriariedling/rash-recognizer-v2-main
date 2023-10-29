
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
    var acc = document.getElementsByClassName("accordion");
    var treatments = document.getElementById("treatment-label");

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    treatments.style.display = "none";
    acc[0].style.display = "none";
    acc[1].style.display = "none";
    acc[2].style.display = "none";

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
            Math.round(prediction[i].probability.toFixed(2) * 100) + "% " + prediction[i].className;
        percentages.childNodes[i].innerHTML = classPrediction;

        var acc = document.getElementsByClassName("accordion");
        var panels = document.getElementsByClassName("panel");
        var treatments = document.getElementById("treatment-label");
        if (prediction[i].className == "Rashless Skin") {
            // treatments.style.display = "none";
            // acc[0].style.display = "none";
            // acc[1].style.display = "none";
            // acc[2].style.display = "none";
            // panels[0].style.display = "none";
            // panels[1].style.display = "none";
            // panels[2].style.display = "none";
            
        } 
        if (prediction[i].className == "Atopic Dermatitis (Eczema)") {
            treatments.style.display = "block";
            acc[0].style.display = "block";
            acc[1].style.display = "none";
            acc[2].style.display = "none";
            panels[1].style.display = "none";
            panels[2].style.display = "none";
            
        } 
        // else {
        //     acc[0].style.display = "none";
        // }
        if (prediction[i].className == "Contact Dermatitis") {
            treatments.style.display = "block";
            acc[0].style.display = "none";
            acc[1].style.display = "block";
            acc[2].style.display = "none";
            panels[0].style.display = "none";
            panels[2].style.display = "none";
            
        } 
        // else {
        //     acc[1].style.display = "none";
        // }
        if (prediction[i].className == "Urticaria (Hives)") {
            treatments.style.display = "block";
            acc[0].style.display = "none";
            acc[1].style.display = "none";
            acc[2].style.display = "block";
            panels[0].style.display = "none";
            panels[1].style.display = "none";
            
        } 
        // else {
        //     acc[2].style.display = "none";
        // }
            
    }
}
