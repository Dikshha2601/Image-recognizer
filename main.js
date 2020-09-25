Webcam.set({
  width: 310,
  height: 300,
  img_format: "png",
  png_quality: 90,

  constraints: {
    facingMode: "environment",
  },
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      "<img id='capture' src='" + data_uri + "'/>";
  });
}

console.log("ml5 version: " + ml5.version);

classifier = ml5.imageClassifier("MobileNet", function () {
  console.log("model loaded.");
});

function identify() {
  img = document.getElementById("capture");
  classifier.classify(img, got_result);
}

function got_result(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("prediction").innerHTML = results[0].label;

    var synth = window.speechSynthesis;
    speak_data = results[0].label;
    utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
  }
}
