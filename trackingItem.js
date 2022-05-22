const FileSystem = require('fs');

class TrackingItem {
    
    /**
     * @param {string} id Id of the item to track
     * @param {string} type Type of the object (user or guild)
     */
    constructor(id, type) {
        this.ID = id;
        this.type = type;
        this.meatChecks = 0;
        this.meatSeen = 0;
        this.vibeChecks = 0;
        this.jameCameronVibes = 0;
        this.upVibes = 0;
        this.goodVibes = 0;
        this.perfectlyBalancedVibes = 0;
        this.badVibes = 0;
        this.downVibes = 0;
        this.badVoodoo = 0;
        this.rainCount = 0;
        this.vibeLevel = -1;
    }

    static get ID() {return this.ID};
    static get meatChecks() {return this.meatChecks};
    static get meatSeen() {return this.meatSeen};
    static get vibeChecks() {return this.vibeChecks};
    static get jameCameronVibes() {return this.jameCameronVibes};
    static get upVibes() {return this.upVibes};
    static get goodVibes() {return this.goodVibes};
    static get perfectlyBalancedVibes() {return this.perfectlyBalancedVibes};
    static get badVibes() {return this.badVibes};
    static get downVibes() {return this.downVibes};
    static get badVoodoo() {return this.badVoodoo};
    static get lastHornyCheck() {return this.lastHornyCheck};
    static get rainCount() {return this.rainCount};
    static get vibeLevel() {return this.vibeLevel};

    static set meatChecks(value) {this.meatChecks = value};
    static set meatSeen(value) {this.meatSeen = value};
    static set vibeChecks(value) {this.vibeChecks = value};
    static set jameCameronVibes(value) {this.jameCameronVibes = value};
    static set upVibes(value) {this.upVibes = value};
    static set goodVibes(value) {this.goodVibes = value};
    static set perfectlyBalancedVibes(value) {this.perfectlyBalancedVibes = value};
    static set badVibes(value) {this.badVibes = value};
    static set badVoodoo(value) {this.badVoodoo = value};
    static set rainCount(value) {this.rainCount = value};
    static set vibeLevel(value) {this.vibeLevel = value};

    /**
     * Takes a JSON obj and maps the values to the item
     * @param {JSON} obj 
     */
    loadData(obj) {
        this.vibeChecks = obj.vibeChecks;
        this.jameCameronVibes = obj.jameCameronVibes;
        this.upVibes = obj.upVibes;
        this.goodVibes = obj.goodVibes;
        this.perfectlyBalancedVibes = obj.perfectlyBalancedVibes;
        this.badVibes = obj.badVibes;
        this.downVibes = obj.downVibes;
        this.badVoodoo = obj.badVoodoo;
        this.rainCount = obj.rainCount;
    }

    /**
     * Returns a message containing stats about the items vibechecks.
     * @return {string} Message
     */
    vibeCheckStats() {
        let message = '', 
            totalRares = this.jameCameronVibes + this.perfectlyBalancedVibes + this.badVoodoo,
            totalGood = this.goodVibes + this.upVibes + this.jameCameronVibes,
            totalBad = this.badVibes + this.downVibes + this.badVoodoo;

        message += `Vibechecks: ${this.vibeChecks} \n`;
        message += `Good Vibechecks: ${totalGood} \n`;
        message += `Bad Vibechecks: ${totalBad} \n`;
        message += `Balanced Vibechecks: ${this.perfectlyBalancedVibes} \n`;
        message += `Rare VibeChecks: ${totalRares}`;
        return message;
    }

    /**
     * Returns a message containing raincheck stats
     * @return {string} message containing rain count
     */
    rainCheckStats() {
        if (this.type == 'user'){
            return `<@${this.ID}> has been left in the rain ${this.rainCount} times`;
        } else if (this.type == 'guild') {
            return `This server has seen ${this.rainCount}mm of rain`;
        }
    }

    /**
     * Updates the appropiate counters that track vibe checks.
     * @param {int} vibeLevel The type of vibe to track
     */
    updateVibes(vibeLevel){
        switch(vibeLevel){
            case 0:
                this.badVoodoo++;
                break;
            case 1:
                this.downVibes++;
                break;
            case 2:
                this.badVibes++;
                break;
            case 3:
                this.perfectlyBalancedVibes++;
                break;
            case 4:
                this.goodVibes++;
                break;
            case 5:
                this.upVibes++;
                break;
            case 6:
                this.jameCameronVibes++;
                break;
        }
        this.vibeChecks++;
    }

    /**
     * Saves the TrackItem object to a JSON file.
     */
    save() {
        FileSystem.writeFile(`./${this.type}s/${this.ID}.json`, JSON.stringify(this), (err) => {
            if (err){
                console.log(err);
            }
            else {
                //console.log(`Saved data for ${this.type} with ID: ${this.ID}`);
            }
        });
    }
}

module.exports = TrackingItem;