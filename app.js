const url = 'https://aa3c-2405-201-e001-c0d5-7963-6418-9ca3-2372.ngrok-free.app/v1/chat/completions';
const btn = document.querySelector('.btn-submit');
const promptInput = document.querySelector('.prompt');
const responseDiv = document.querySelector('.chat-response');


let prompt = {
    "response": [],
    "promptText": []
};


try {
    const storedPrompts = localStorage.getItem("prompt");
    if (storedPrompts) {
        const parsedPrompts = JSON.parse(storedPrompts);
        

        if (Array.isArray(parsedPrompts.promptText) && Array.isArray(parsedPrompts.response)) {
            prompt = parsedPrompts;
        }
    }
} catch (e) {
    console.error('Error parsing JSON from localStorage:', e);
}


btn.addEventListener('click', function () {
    const promptText = promptInput.value.trim();

    if (!promptText) {
        alert('Please enter a prompt.');
        return;
    }

    const data = {
        model: "lmstudio-ai/gemma-2b-it-GGUF",
        messages: [
            {
                role: "system",
                content: "you are an assistant"
            },
            {
                role: "user",
                content: promptText
            }
        ],
        temperature: 0.7,
        max_tokens: -1,
        stream: false
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            const content = result.choices[0].message.content;
            display(content, promptText);
        })
        .catch(error => console.error('Error:', error));
});


function display(content, promptText) {
    prompt.promptText.push(promptText);
    prompt.response.push(content);

    try {
        localStorage.setItem("prompt", JSON.stringify(prompt));
    } catch (e) {
        console.error('Error saving JSON to localStorage:', e);
    }

    load();

    console.log(content);
}

function load() {
    responseDiv.innerHTML = '';

    try {
        const prompts = JSON.parse(localStorage.getItem("prompt")) || prompt;


        if (prompts.promptText && prompts.response && prompts.promptText.length === prompts.response.length) {
            for (let i = 0; i < prompts.promptText.length; i++) {
                responseDiv.innerHTML += `<div class="bg-[#BFD7EA] p-10 rounded m-10"><p class="text-[#0B3954] text-lg m-5">Prompt: ${prompts.promptText[i]}</p><p class=" text-lg text-[#0B3954] m-5">Response: ${prompts.response[i]}</p></div>`
            }
        }
    } catch (e) {
        console.error('Error parsing JSON from localStorage:', e);
    }
}


load();
