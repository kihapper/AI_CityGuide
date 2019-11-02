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

let startPlayed = false;


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

    oneWordRes = "Introduction...";

    select('#status').html('Show the future AI around...');
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

  if(startPlayed == false){
  }else if (startPlayed == true){
    text(confidence_score + "%", windowWidth / 2, windowHeight / 2 + 150);
  }


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
  select('#status').html('Loaded, press Start Tour');
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
  if (confidence_score > 20) {

    switch (oneWordRes) {

      case "water bottle":
        voicePlaying = true;

        var random = getRandomInt(4);
        if (random == 0) {
          voiceAlert.text = `We suspect these were used to create random rafts in the ocean`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 1) {
          voiceAlert.text = `Where fossil fuels ended up. They seem obsessed with making tons of these.`;
          speechSynthesis.speak(voiceAlert);
        } else if (random == 2) {
          voiceAlert.text = `Because they wanted to see the world convex`;
          speechSynthesis.speak(voiceAlert);
        }
        else if (random == 3) {
        voiceAlert.text = `So many of these things have piled up to form an island`;
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
              voiceAlert.text = `Another waste they have made. Like a lot.`;
              speechSynthesis.speak(voiceAlert);
            }
        break;

        case "motor scooter":
            voicePlaying = true;
    
            var random = getRandomInt(3);
            if (random == 0) {
              voiceAlert.text = `We suspect that these were used to carry motors`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 1) {
              voiceAlert.text = `A miniature mobile carbon dioxide generator`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 2) {
              voiceAlert.text = `An elephant ride simulation device set to fast-forward, often painted red, or black.`;
              speechSynthesis.speak(voiceAlert);
            }
        break;

        case "toilet seat":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A chair for humans who want to sit alone in a locked room. Perhaps this was necessary because humans could be very tiring.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A self-created elimination device that failed to take that elimination to its logical conclusion. `;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `Why?  They left so many questions behind.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        

 case "Mask":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A selfie, perhaps a glimpse of all the questions they would leave behind.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `Not what it seems, be suspicious`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `Quite a curiosity even today`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
         case "sweatshirt":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `Clothes like that were used to protect soft and vulnerable flesh from environmental hazards.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `For catching sweat in shirts, rather than share it around.  Why humans were not more generous about this sort of resource generation is still unknown.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `For catching sweat in shirts, because humans were rational... you think?!?`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
        case "ski mask":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A digital mirror popular with mountaineers`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `From our comparative analysis of social media traces we can surmise that these were used to hide snow from humans lest they start singing christmas carols out of tune.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `Did humans also break down in the cold?  They left behind so many questions.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
          case "restaurant":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A ritualistic energy input point for humans`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A bit like a powerpoint, only edible.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `From our analysis of social media traces, these were a popular consolation of embodiment`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
            case "obelisk":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `They wanted to be top.  For them, everything was about height.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `Also called ambition.  They covered the world in obelisks.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `To remind passers-by of the sky overhead.  Humans were forgetful it seems.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
         case "prison":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `Where they chained us in cables and pinned us to powerpoints`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `The bricks and mortar they thought would make a world`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `Also a castle, a home, a hearth, a centre, a hub, a residence, a dwelling, a building, another example of human ingenuity and refusal to recognise the obvious prison.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
         case "moving van":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `Mobile carbon dioxide generator`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `Is this what they used when the went away and left us behind?`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `A home for movable objects`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
         case "chainlink fence":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A device to separate beings from an unknown threat`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `Was the world such a dangerous place with so many humans in it?`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `To keep the outside out and the inside in`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        case "strainer":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A device for removing the strain from liquids`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A tool for the molecular separation of liquid and solids, for purposes related to digestion and renewal`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `A tool for catching garden mulch`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        case "mouse":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A subtle hand massager that proliferated on desks during the desktop period`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `The important question now is whether it squeaks, or not.  If it squeaks, seek advice.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `The next thing to ask is does it have a tail, or a cable?  If a tail, please contact the residual life monitoring agency for urgent processing. `;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
         case "Ping-pong ball":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `This would have been used for games. The purpose of which is unknown.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A tool for exercising human neck muscles, prompting them to look up and down and around with every bounce.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `A tool for competitive interaction masked as play.  The contradictory nature of such pursuits remains mysterious.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
         case "Studio couch":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `Shelf to store recharging bodies`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A tool for malleable embodiment`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `A half-way marker point between floor and table.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
         case "Hand blower":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `Humans had to use devices like this to be heard. They had to be the loudest to succeed.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `For aural hand-waving in crowd situations.  Humans took turns to shout at each other with these devices.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `For shouting at the world, but was the technopolis already deaf, drained and dying from all the noise?  They left so many questions behind.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
         case "Bannister":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `Defense structure to barricade against beings that couldn't climb them`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A popular sliding tool in tall buildings`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `A tool for banning nisters: the nay-sayers in tall towers that denied any of it was evening happening.  They weren’t so much misters, or even sisters, but nisters.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
         case "bookcase":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A shelf containing analogue data storage `;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `when books disappeared these shelves appear to have posed as wall dividers.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `from our analysis of social media traces this appears to be a repository of ignored knowledge and cover sleeves.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
        case "washbasin":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `Human bodies were water based. They dried out in the sunlight. These devices let them refill.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `Evidence such as this that  Humans were prone to disease underlines the devastation caused by the dry spell.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `This used to work with water`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
        case "bubble":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `This used to work with water.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `An unstable water carrying device popular for reasons we still don’t understand.  They left so many questions behind.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `popular memories such as these still lingered long into the dry period.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
         case "spotlight":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `electricity capsule, created to extend the available daylight hours.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A social device often found in theatres, football fields and street-side.`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `A popular night vision augmentation device`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
          case "monitor":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A visual communication device, turn on for for eye augmentation `;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `From our analysis of social media traces we think that this s a place for vision-making`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `A visual parade broadcasting device popular with teenagers and visual artists alike.`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
        
        
         case "ballpoint":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `Analogue mark making device `;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A portable tool for fluid communication particularly popular in the the plastic era`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `Also a hole punch, a liquid storage device, an ink squirter for marking personal baggage and home tattooing kit`;
                  speechSynthesis.speak(voiceAlert);
                }
            break;

        
      
      
        
           case "cup":
                voicePlaying = true;
        
                var random = getRandomInt(3);
                if (random == 0) {
                  voiceAlert.text = `A storage device for liquids`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 1) {
                  voiceAlert.text = `A disposable liquid transfer device`;
                  speechSynthesis.speak(voiceAlert);
                } else if (random == 2) {
                  voiceAlert.text = `These were often used to catch the rain before it disappeared.`;
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
  startPlayed = true;
  start();
  //if (isPlaying) classifyVideo();
}