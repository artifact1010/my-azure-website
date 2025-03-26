// REAL AZURE FUNCTION ENDPOINTS
const API_URL = "https://your-azure-function.azurewebsites.net/api";

// FORM SUBMISSION
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = document.querySelector('.submit-btn');
    btn.textContent = "[ PROCESSING... ]";
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value
    };

    try {
        const response = await fetch(`${API_URL}/saveToSQL`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error("Failed to save");
        
        document.getElementById('responseMessage').innerHTML = `
            <span style="color: var(--success)">SUCCESS:</span> Data saved to Azure SQL.
        `;
        
        document.getElementById('contactForm').reset();
        loadSQLData();
    } catch (err) {
        document.getElementById('responseMessage').innerHTML = `
            <span style="color: var(--error)">ERROR:</span> ${err.message}
        `;
    } finally {
        btn.textContent = "[ EXECUTE ]";
    }
});

// LOAD LIVE SQL DATA
async function loadSQLData() {
    try {
        const response = await fetch(`${API_URL}/getFromSQL`);
        const data = await response.json();
        
        const tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td class="mono" style="color: var(--error)">DELETE</td>
            </tr>
        `).join('');
    } catch (err) {
        console.error("Failed to load data:", err);
    }
}

// INIT LOAD
loadSQLData();