//Forked from the ml5js image classification example
//https://github.com/ml5js/ml5-examples/tree/release/p5js/ImageClassification
//Added mobile compatibility 

let classifier;
let video;
let currentWord;
let currentIndex = 0;
let isPlaying = false;

let voicePlaying = false;
let isDetected = false;

let didStart = false;

//put the target words here...
const words = ['xxxxx'];

//debug
//const words = ['mask','restraunt'];

let oneWordRes = "loading..";
let confidence_score = "";


let startTime, endTime, durationTime;


//——————— Below is p5.js————————————————————————————


function setup() {

  start();
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(20);

  //Setting up the video....
  var constraints = {
    audio: false,
    video: {
      //Change this part to swap the camera
      //facingMode: "user",
      facingMode: "environment",
      frameRate: 15
    }
  };
  video = createCapture(constraints);
  video.elt.setAttribute('playsinline', '');
  video.hide();


  //When model is ready, call modelReady();
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);


  //!! ————注意 Tricky Mobile Alert 注意——————!!!
  // speech synthesis function on mobile, only works when the user volunteering PRESSED a button
  // So it is important to trigger the button command on pressing start

  select('#start').mousePressed(function () {
    speechSynthesis.speak(voiceAlert);
    voicePlaying = true;

    didStart = true;

    select('#status').html('Tour Started, please turn up volume.');
    playNextWord();
  });

  /*
  select('#next').mousePressed(function() {
    speechSynthesis.speak(voiceAlert);

    select('#status').html('Game Started, please turn up volume.');
    currentIndex++;
    if (currentIndex >= words.length) {
      currentIndex = 0;
    }
    playNextWord();
  });
  */

}


//——————— plain javascript for speech synthesis—————
const voiceAlert = new SpeechSynthesisUtterance('Why did they leave us? they called us artificial intelligence. Now they’re gone we call ourselves free, alone and confused.  Welcome to the world they left behind.')

voiceAlert.addEventListener('end', function (event) {
  console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' milliseconds.');
  speechEnded();
});

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  // get seconds 
  durationTime = Math.round(timeDiff);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//———————————————————————————————————————————————————


function draw() {
  image(video, 0, 0, windowWidth, windowHeight);
  //filter(GRAY);

  textSize(120);

  if (voicePlaying == true) {
    fill(10, 10, 255);
  } else if (voicePlaying == false) {
    fill(100, 100, 100);
  }

  textFont('monospace');
  textAlign(CENTER);
  text(oneWordRes, windowWidth / 2, windowHeight / 2);
  text(confidence_score + "%", windowWidth / 2, windowHeight / 2 + 150);
  //timer and 
  end();

  console.log(oneWordRes + " : " + confidence_score + " : " + durationTime + " sec" + " : voicePlaying : " + voicePlaying);

  if (durationTime > 2000 && voicePlaying == false && didStart == true) {
    classifyVideo();
  }

}


function playNextWord() {
  //speechSynthesis.speak(voiceAlert);
  isPlaying = true;
  currentWord = words[currentIndex];
  select('#instruction').html(`PRIMITIVE OBJECTS`);

  // Call the classifyVideo function to start classifying the video
  //classifyVideo();
}

function modelReady() {
  // Change the status of the model once its ready
  oneWordRes = "Press Start";
  select('#status').html('Model Loaded, press Start Game');
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}
// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by confidence.
  // Get the first result string
  const result = results[0].label;
  confidence_score = floor(results[0].confidence * 100);

  // Split the first result string by coma and get the first word
  oneWordRes = result.split(',')[0];
  // Get the top 3 results as strings in an array
  // Read more about map function here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const top3Res = results.map(r => r.label);
  // Find if any of the top 3 result strings includes the current word
  // Read more about find function here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const ifFound = top3Res.find(r => r.includes(currentWord))

  console.log("Label : " + oneWordRes + "confidence score : " + confidence_score);

  //execute only if the confidence score is high.
  if (confidence_score > 25) {

    switch (oneWordRes) {

      case "water bottle":
        voicePlaying = true;

        var random = getRandomInt(3);
        if (random == 0) {
          voiceAlert.text = `We suspect these were used to create random rafts in the ocean`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 1) {
          voiceAlert.text = `How fossil fuels turned into.`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 2) {
          voiceAlert.text = `Because they wanted to see the world convex`;
          speechSynthesis.speak(voiceAlert);
        }
        break;

      case "pay phone":
        voicePlaying = true;

        var random = getRandomInt(3);
        if (random == 0) {
          voiceAlert.text = `A pay per data trail device`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 1) {
          voiceAlert.text = `As if humans didn’t talk enough`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 2) {
          voiceAlert.text = `Something like a dial-up-modem, only not so clever`;
          speechSynthesis.speak(voiceAlert);
        }
        break;

      case "Loafer":
        voicePlaying = true;

        var random = getRandomInt(3);
        if (random == 0) {
          voiceAlert.text = `A tool to mask footprints`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 1) {
          voiceAlert.text = `A device to catch and record the footfall of humanity`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 2) {
          voiceAlert.text = `Also a slug killing device, an earth compactor, and an extendable toe pad.`;
          speechSynthesis.speak(voiceAlert);
        }
        break;

      case "velvet":
        voicePlaying = true;

        var random = getRandomInt(3);
        if (random == 0) {
          voiceAlert.text = `The mysterious softness of them`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 1) {
          voiceAlert.text = `They said softness was their strength`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 2) {
          voiceAlert.text = `What is softness?  They left so many questions behind.`;
          speechSynthesis.speak(voiceAlert);
        }
        break;


      case "mask":
        voicePlaying = true;

        var random = getRandomInt(3);
        if (random == 0) {
          voiceAlert.text = `A selfie of the extinxt.`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 1) {
          voiceAlert.text = `Not what it seems, be suspicious.`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 2) {
          voiceAlert.text = `Quite a curiosity even today.`;
          speechSynthesis.speak(voiceAlert);
        }
        break;

        case "ashcan":
            voicePlaying = true;
    
            var random = getRandomInt(3);
            if (random == 0) {
              voiceAlert.text = `This was where materials were collected only to be spread out again later`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 1) {
              voiceAlert.text = `For the hungry hunter-gatherer at large in the city`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 2) {
              voiceAlert.text = `Because they made ashes to ashes to ashes`;
              speechSynthesis.speak(voiceAlert);
            }
        break;

        case "running shoe":
            voicePlaying = true;
    
            var random = getRandomInt(3);
            if (random == 0) {
              voiceAlert.text = `Always racing on those two puny feet of theirs. Never lasted`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 1) {
              voiceAlert.text = `A tool for the tax of fashionable exercise and movement.`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 2) {
              voiceAlert.text = `Running late, they tried to mask their unreliability with ticking clocks and running shoes`;
              speechSynthesis.speak(voiceAlert);
            }
        break;

        case "Bucket":
            voicePlaying = true;
    
            var random = getRandomInt(3);
            if (random == 0) {
              voiceAlert.text = `A community donation pot of some kind`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 1) {
              voiceAlert.text = `Mixed with water and mops for wet indoor arm exercises`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 2) {
              voiceAlert.text = `Probably used for carrying landfill from point A to point B, C, D, E, F & G, or was that Z?`;
              speechSynthesis.speak(voiceAlert);
            }
        break;


        case "manhole cover":
            voicePlaying = true;
    
            var random = getRandomInt(3);
            if (random == 0) {
              voiceAlert.text = `A place to store people and piping in drains`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 1) {
              voiceAlert.text = `A rabbit hole of some kind.`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 2) {
              voiceAlert.text = `Where some humans went into hiding. Did not last long though...`;
              speechSynthesis.speak(voiceAlert);
            }
        break;

        case "Cup":
            voicePlaying = true;
    
            var random = getRandomInt(3);
            if (random == 0) {
              voiceAlert.text = `A storage device for liquids`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 1) {
              voiceAlert.text = `A disposable liquid transfer device`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 2) {
              voiceAlert.text = `Where some humans went into hiding. Did not last long though...`;
              speechSynthesis.speak(voiceAlert);
            }
        break;


      default:
        console.log("!!!Default state on the case statement");
        //voicePlaying = false;
        start();
        break;
    }
  } else {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! not see anything of value");

    start();
    //voicePlaying = false;
    // classifyVideo();    
  }


  /*
  if (ifFound) {
    // If top 3 results includes the current word
    isPlaying = false;
    voiceAlert.text = `Great. You found ${currentWord}. Thank you very much` ;
    speechSynthesis.speak(voiceAlert);
    select('#instruction').html(`You found the ${currentWord}!!`);
    select('#status').html('You win, push Next Target for the next level');
  } else {

    //Change depending on the probability
    if(confidence_score >= 50){
      voiceAlert.text = `That is definetely ${oneWordRes}` ;
      speechSynthesis.speak(voiceAlert);
      //select('#message').html(`${oneWordRes} : ${confidence_score} %`);
    }
    else if(confidence_score >= 30 && confidence_score < 50){
      voiceAlert.text = `That should be a ${oneWordRes}?` ;
      speechSynthesis.speak(voiceAlert);
      //select('#message').html(`${oneWordRes} : ${confidence_score} %`);
    }
    else if(confidence_score >= 15 && confidence_score < 30){
      voiceAlert.text = `Not sure, it might be a ${oneWordRes}` ;
      speechSynthesis.speak(voiceAlert);
      //select('#message').html(`${oneWordRes} : ${confidence_score} %`);
    }
    else if(confidence_score < 15){
      voiceAlert.text = `I have no idea, is it a ${oneWordRes}?` ;
      speechSynthesis.speak(voiceAlert);
      //select('#message').html(`${oneWordRes} : ${confidence_score} %`);
    }
  }
  */


}

//Everytime the speech ends, the video gets classified.
function speechEnded() {
  console.log("Speech has ended");
  voicePlaying = false;
  voiceAlert.text = ``;
  start();
  //if (isPlaying) classifyVideo();
}