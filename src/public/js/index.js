document.addEventListener('DOMContentLoaded', function() {

    const extractForm = document.getElementById('extract-form');
    const errorElement = document.getElementById('error');
    const resultElement = document.getElementById('result');

    extractForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const text = document.getElementById('text').value;
        errorElement.textContent = '';
        resultElement.innerHTML = '';

     
        resultElement.classList.add('hidden');
        errorElement.classList.add('hidden');

        const response = await fetch('/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const result = await response.json();
        
        if(result.error) {
            errorElement.textContent = result.error;
            errorElement.classList.remove('hidden');
            return;
        }

        const { fullName, dateOfBirth, primaryCondition } = result;
        resultElement.innerHTML = `
        <div class="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
            <h4 class="text-3xl font-semibold text-gray-800 mb-4">Patient Data</h4>
            <div class="space-y-3">
                <p class="text-lg text-gray-600"><span class="font-medium text-gray-800">Last Name:</span> ${fullName.lastName}</p>
                <p class="text-lg text-gray-600"><span class="font-medium text-gray-800">First Name:</span> ${fullName.firstName}</p>
                ${fullName.middleName ? `<p class="text-lg text-gray-600"><span class="font-medium text-gray-800">Middle Name:</span> ${fullName.middleName}</p>` : ''}
                <p class="text-lg text-gray-600"><span class="font-medium text-gray-800">Date of Birth:</span> ${dateOfBirth}</p>
                <p class="text-lg text-gray-600"><span class="font-medium text-gray-800">Primary Condition:</span> ${primaryCondition}</p>
            </div>
        </div>
    `;
    
        resultElement.classList.remove('hidden');
    });
});