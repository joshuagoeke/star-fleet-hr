const { Employee } = require('../lib');

const name ="John", email="test@test.com", id=235;
const employee = new Employee(name,id,email);

test('Testing object', () => expect(typeof(employee)).toBe('object'));
test('Testing .getName() method', () => expect(employee.getName()).toBe(name));
test('Testing .getId() method', () => expect(employee.getId()).toBe(id));
test('Testing .getEmail() method', () => expect(employee.getEmail()).toBe(email));
test('Testing .getRole() method', () => expect(employee.getRole()).toBe('Employee'));



