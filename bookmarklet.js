javascript:(() => {
    const library = document.createElement('script');
    library.src = 'https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js';
    document.head.appendChild(library);

    library.onload = () => {
        build();
    }

    function build() {
        // Clear and store body 
        let oldBody = document.body.cloneNode(true);
        document.body.innerHTML = "";

        document.body.style.background = "black";

        // Style container
        const container = document.createElement('div');
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.color = "white";

        // Add title
        const title = document.createElement('h1');
        title.innerText = "QR code:";
        title.style.marginBottom = "20px";
        container.appendChild(title);

        // Add QR to container
        const qrcode = document.createElement('div');
        generateQR(qrcode, "#000000", "#ffffff", "")
        container.appendChild(qrcode)

        // Add spacing
        container.appendChild(document.createElement('br'));
        container.appendChild(document.createElement('br'));

        // Add customization
        const customization = document.createElement('div');
        customization.style.display = "flex";
        customization.style.flexDirection = "row";

        const colorDark = document.createElement('input');
        colorDark.type = "color";
        colorDark.id = "colorDark";
        colorDark.value = "#000000";

        const colorLight = document.createElement('input');
        colorLight.type = "color";
        colorLight.id = "colorLight";
        colorLight.value = "#ffffff";
        const colorLightLabel = document.createElement('label');

        customization.appendChild(colorLight);
        customization.appendChild(colorDark);

        container.appendChild(customization);

        // Add buttons with functions
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexDirection = "row";

        const generateButton = document.createElement('button');
        generateButton.innerText = "Regenerate";
        generateButton.onclick = () => {
            qrcode.innerHTML = "";
            generateQR(qrcode, colorDark.value, colorLight.value, input.value);
        }
        buttonContainer.appendChild(generateButton);

        const backButton = document.createElement('button');
        backButton.innerText = "Back";
        backButton.onclick = () => {
            document.body = oldBody
        }
        buttonContainer.appendChild(backButton);

        const downloadButton = document.createElement('button');
        downloadButton.innerText = "Download";
        downloadButton.onclick = () => {
            const link = document.createElement('a');
            link.href = qrcode.lastChild.src;
            link.download = 'qrcode.png';
            link.click();
        }
        buttonContainer.appendChild(downloadButton);

        container.appendChild(buttonContainer);

        // Add input override
        const input = document.createElement('input');
        input.type = "text";
        input.placeholder = "Alternative content";

        container.appendChild(input);

        // Add container to body
        document.body.appendChild(container);
    }

    function generateQR(parent, colorDark, colorLight, override) {
        let text = window.location.href;
        if (override != "") {
            text = override
        }
        new QRCode(parent, {
            text: text,
            width: 256,
            height: 256,
            colorDark,
            colorLight,
            correctLevel: QRCode.CorrectLevel.H
        });
    }
})();
