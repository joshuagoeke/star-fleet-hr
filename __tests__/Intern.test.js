const { Intern } = require('../lib');

const name = "Mike", email="junior@Zissou.edu", id = 747, school = 'Zissou Academy';
const intern = new Intern(name, id, email, school);

test('Testing .getRole() method', () => expect(intern.getRole()).toBe('Intern'));
test('Testing .getSchool() method', () => expect(intern.getSchool()).toBe(school));