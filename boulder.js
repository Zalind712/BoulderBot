class Boulder {
    /**
     * Converts farenheit into real units (celsius).
     * @param {string} input The temperature to convert.
     * @return {object} Contains message with converted temperature   
     */
    realUnits(input) {
        let tempToConvert = parseInt(input),
            convertedTemp;

        // make sure user submited a valid temperature
        if (isNaN(tempToConvert)) return {'message': 'Invalid temperature.'};

        convertedTemp = (tempToConvert - 32) * 5 / 9;

        return {'message': `Thats ${convertedTemp} real units`};
    }

    /**
     * Converts celsius to freedom units (fahrenheit)
     * @param {string} input The temperature to convert.
     * @return {string} Contains message with converted temperature 
     */
    freedomUnits(input) {
        let tempToConvert = parseInt(input),
            convertedTemp;

        // make sure user submited a valid temperature
        if (isNaN(tempToConvert)) return {'message': 'Invalid temperature.'};

        convertedTemp = (tempToConvert * 9 / 5) + 32;

        return {'message': `Thats ${convertedTemp} freedom units`};
    }

    /**
     * Rolls for a chance to mock the user by returning their message with alternating capitaliztion.
     * @param {string} text The message the user sent 
     * @param {string} userID The id of the user who sent the message
     * @return The mocked message or false if the user was not mocked
     */
    mockMessage(text, userID) {
        let mockedMessage = '',
            mockedRoll = Math.floor(Math.random() * 500) + 1;

        if (userID == '197123258728972290') mockedRoll = 0;

        if (mockedRoll == 500) {
            // convert message to character array
            text = text.split('');

            for (let i = 0; i < text.length; i++) {
                if (i % 2 == 0) mockedMessage += text[i].toLowerCase();
                else mockedMessage += text[i].toUpperCase();
            }

            return {'message': mockedMessage};
        }
        return false;
    }

    /**
     * Checks the vibe.
     * @return {object} contains the vibe level and a message
     */
    vibeCheck(){
        let vibeRoll = Math.floor(Math.random() * 100) + 1;

        if (vibeRoll == 1 ) return {'message': 'You got bad voodoo', 'level': 0};
        else if (vibeRoll < 25) return {'message': 'Vibes down bad', 'level': 1};
        else if (vibeRoll < 50) return {'message': 'The vibe needs some work', 'level': 2};
        else if (vibeRoll == 50) return {'message': 'The vibe is perfectly balanced!', 'level': 3};
        else if (vibeRoll < 75) return {'message': 'We vibing', 'level': 4};
        if (vibeRoll < 100) return {'message': 'You\'re up right now', 'level': 5};
        if (vibeRoll == 100) return {'message': 'You look like James Cameron!', 'level': 6};
    }

    /**
     * Its uhc day my dudes.
     * @return {object} Contains a message and image for uhc day
     */
    uhcDay(){
        return {'message': 'Its UHC Day my dudes!', 'image': './media/other_images/uhcday.png'}
    }

    /**
     * Rolls for a random stephen meme to send.
     * @return {object} Contains the chosen stephen meme
     */
    stephenMeme(){
        let memeRoll = Math.floor(Math.random() * 16) + 1;
        return {'image': `./media/stephen_memes/${memeRoll}.png`};
    }

    /**
     * Get in loser.
     * @return {object} Contains the image file to send
     */
    getIn(){
        return {'image': `./media/other_images/leveling.png`};
    }

    badDecisions() {
        return {'image': './media/bad_decisions/Woooo.jpg'};
    }
}

module.exports = Boulder;