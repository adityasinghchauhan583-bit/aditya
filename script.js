async function analyzeDocument() {

    const fileInput =
        document.getElementById("documentFile");

    const file =
        fileInput.files[0];

    if (!file) {
        alert("Please upload a document first.");
        return;
    }

    const formData =
        new FormData();

    formData.append("file", file);

    document.getElementById("result").innerHTML =
        "<p>Analyzing document...</p>";

    try {

        const response =
            await fetch(
                "http://127.0.0.1:5000/analyze",
                {
                    method: "POST",
                    body: formData
                }
            );

        const data =
            await response.json();

        document.getElementById("result").innerHTML = `
            <p><b>Document Type:</b> ${data.document_type}</p>
            <p><b>Authenticity Score:</b> ${data.authenticity_score}%</p>
            <p><b>Status:</b> ${data.status}</p>
            <p><b>Issues Found:</b></p>
            <ul>
                ${
                    data.issues
                    .map(issue => `<li>${issue}</li>`)
                    .join("")
                }
            </ul>
        `;

    } catch (error) {

        document.getElementById("result").innerHTML =
            "<p>Server connection failed.</p>";

        console.error(error);
    }
}

async function sendMessage() {

    const message =
        document.getElementById("userMessage").value;

    if (message.trim() === "") {
        return;
    }

    try {

        const response =
            await fetch(
                "http://127.0.0.1:5000/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                        "application/json"
                    },
                    body: JSON.stringify({
                        message: message
                    })
                }
            );

        const data =
            await response.json();

        document.getElementById(
            "chatResponse"
        ).innerHTML =
            `<p><b>AI:</b> ${data.reply}</p>`;

    } catch (error) {

        document.getElementById(
            "chatResponse"
        ).innerHTML =
            "<p>Chat server unavailable.</p>";

        console.error(error);
    }
}
