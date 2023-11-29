document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('mlForm');
    const resultDiv = document.getElementById('result');
    const generateMoreButton = document.getElementById('generateMore');
    const newStepsInput = document.getElementById('newSteps');
    const container = document.getElementById('extraForm'); // Select the container element

    let currentText = ''; // Store the current text result

    // Function to show the container
    function showContainer() {
        container.style.display = 'block';
    }

    // Function to hide the container
    function hideContainer() {
        container.style.display = 'none';
    }

    hideContainer(); // Initially hide the container

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Show loading indicator
        resultDiv.innerHTML = '<p>Loading...</p>';

        // Manually collect the form data
        const formData = {
            input_text: document.getElementById('inputText').value,
            steps: document.getElementById('steps').value,
            temperature: document.getElementById('temperature').value,
            top_k: document.getElementById('topK').value
        };

        // Send a POST request with JSON data
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Update the result div with the response
            if (data.error) {
                resultDiv.innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                // Store the current result
                currentText = data.result;

                // Replace \n with <br> for line breaks
                const resultWithLineBreaks = currentText.replace(/\n/g, '<br>');
                resultDiv.innerHTML = `<p>${resultWithLineBreaks}</p>`;

                // Show the container
                showContainer();
            }
        })
        .catch(error => {
            // Handle errors
            resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    });

    // Handle "Generate More" button click
    generateMoreButton.addEventListener('click', function() {
        const newSteps = parseInt(newStepsInput.value) || 1; // Get the number of new steps
        if (newSteps > 0) {
            // Update the input text with the current result
            document.getElementById('inputText').value = currentText;

            // Update the steps with the new number of steps
            document.getElementById('steps').value = newSteps;

            // Trigger form submission to generate more text
            form.dispatchEvent(new Event('submit'));
        }
    });
});
