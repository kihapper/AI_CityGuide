        
        switch (oneWordRes) {

        case "motor scooter":
            voicePlaying = true;
    
            var random = getRandomInt(3);
            if (random == 0) {
              voiceAlert.text = `We suspect that these were used to carry motors`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 1) {
              voiceAlert.text = `A rabbit hole of some kind.`;
              speechSynthesis.speak(voiceAlert);
            } else if (random == 2) {
              voiceAlert.text = `Where some humans went into hiding. Did not last long though...`;
              speechSynthesis.speak(voiceAlert);
            }
        break;

        case "":
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

        }