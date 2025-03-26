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
        
        // Create table if it doesn't exist
        await sql.query(`
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Contacts')
            CREATE TABLE Contacts (
                id INT IDENTITY(1,1) PRIMARY KEY,
                name NVARCHAR(100),
                email NVARCHAR(100)
            )
        `);
        
        // Insert data
        await sql.query`
            INSERT INTO Contacts (name, email)
            VALUES (${req.body.name}, ${req.body.email})
        `;
        
        context.res = { status: 200, body: "Data saved to SQL!" };
    } catch (err) {
        context.res = { status: 500, body: `Error: ${err.message}` };
    }
};