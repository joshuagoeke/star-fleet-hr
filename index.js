const mysql = require('mysql2');
const db = require('./db/connection')
const utils = require('util')
db.query = utils.promisify(db.query)
console.log(`
___________________________________

┏━━━┓┏┓╋╋╋╋╋╋┏━┳┓╋╋╋╋╋╋┏┓╋┏┓╋┏┳━━━┓
┃┏━┓┣┛┗┓╋╋╋╋╋┃┏┫┃╋╋╋╋╋┏┛┗┓┃┃╋┃┃┏━┓┃
┃┗━━╋┓┏╋━━┳━┳┛┗┫┃┏━━┳━┻┓┏┛┃┗━┛┃┗━┛┃
┗━━┓┃┃┃┃┏┓┃┏┻┓┏┫┃┃┃━┫┃━┫┃╋┃┏━┓┃┏┓┏┛
┃┗━┛┃┃┗┫┏┓┃┃╋┃┃┃┗┫┃━┫┃━┫┗┓┃┃╋┃┃┃┃┗┓
┗━━━┛┗━┻┛┗┻┛╋┗┛┗━┻━━┻━━┻━┛┗┛╋┗┻┛┗━┛
___________________________________
`)


async function viewEmployees() {
    try {
      const result = await db.query(`SELECT * FROM employees`)
      console.table(result);
      return result;
    } catch (error) {
     console.log(error);
    }
  }

  viewEmployees();

  


