const Employee = require('./Employee')

class Engineer extends Employee{
    constructor(name, id, email, gitHub)
    {
        super(name, id, email)
        this.gitHub = gitHub;
    }

    getGitHub = () => this.gitHub;
    getRole = () => 'Engineer';
}

module.exports = Engineer;