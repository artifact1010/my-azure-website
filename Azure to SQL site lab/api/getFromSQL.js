const sql = require('mssql');

module.exports = async function (context, req) {
    const config = {
        user: 'azureadmin',
        password: 'YourStrong@Password123',
        server: 'yourserver.database.windows.net',
        database: 'YourDatabase',
        options: { encrypt: true }
    };

    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Contacts`;
        context.res = { status: 200, body: result.recordset };
    } catch (err) {
        context.res = { status: 500, body: `Error: ${err.message}` };
    }
};