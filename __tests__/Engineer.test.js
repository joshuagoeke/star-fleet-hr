const { Engineer } = require('../lib');

const name = "Constantine", email="go@way.com", id = 747, gitHub = 'constip';
const engineer = new Engineer(name, id, email, gitHub);

test('Testing .getRole() method', () => expect(engineer.getRole()).toBe('Engineer'));
test('Testing .getGitHub() method', () => expect(engineer.getGitHub()).toBe(gitHub));