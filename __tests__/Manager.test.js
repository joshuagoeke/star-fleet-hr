const { Manager } = require('../lib');

const name = "Michael Scott", email="Michael99@hotmail.com", id = 7, officeNumber = '11';
const manager = new Manager(name, id, email, officeNumber);

test('Testing .getRole() method', () => expect(manager.getRole()).toBe('Manager'));
test('Testing .getOfficeNumber() method', () => expect(manager.getOfficeNumber()).toBe(officeNumber));