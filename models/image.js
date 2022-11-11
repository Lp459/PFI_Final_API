const Model = require('./model');
module.exports = 
class Image extends Model{
    constructor()
    {
        super();
        this.Title = "";
        this.Description = "";
        this.Date =  0;
        this.GUID = "";
        this.shared = false;
        this.UserId = 0;

        this.addValidator('Title','string');
        this.addValidator('Description', 'string');
        this.addValidator('Shared', 'boolean');
        this.addValidator('Date', 'integer');
        this.addValidator('GUID', 'string');
        this.addValidator('UserId', 'integer');
    }
}