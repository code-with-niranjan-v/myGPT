const url = 'https://cdfe-2405-201-e039-a80d-ccfe-f651-34a4-6ce4.ngrok-free.app/v1/chat/completions';
let btn = document.querySelector('.btn-submit')
const roleInput = document.querySelector('.airole');
const promptInput = document.querySelector('.prompt');
const responseDiv = document.querySelector('.response');

btn.addEventListener('click', function() {
    const role = roleInput.value;
    const prompt = promptInput.value;
const data = {
    model: "lmstudio-ai/gemma-2b-it-GGUF",
    messages: [
        {
            role: "system",
            content: role
        },
        {
            role: "user",
            content: prompt
        }
    ],
    temperature: 0.7,
    max_tokens: -1,
    stream: false
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // Specifies the MIME type of the body
    },
    body: JSON.stringify(data) // Converts the data object to a JSON string
})
.then(response => response.json())
.then(result => console.log('Success:', display(result.choices[0].message.content)))
.catch(error => console.error('Error:', error));

})

function display(content){
    responseDiv.textContent = content;
}
