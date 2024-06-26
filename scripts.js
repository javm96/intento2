document.addEventListener('DOMContentLoaded', () => {
    const displaySection = document.getElementById('display-section');
    const uploadForm = document.getElementById('upload-form');
    const imageUpload = document.getElementById('image-upload');
    const textUpload = document.getElementById('text-upload');
    
    let contentArray = [];

    // Cargar contenido inicial
    function loadContent() {
        // Aquí cargaríamos el contenido existente, por ahora es un ejemplo estático
        contentArray = [
            {type: 'image', src: 'path/to/image1.jpg'},
            {type: 'text', text: 'Este es un texto de ejemplo 1'},
            {type: 'image', src: 'path/to/image2.jpg'},
            {type: 'text', text: 'Este es un texto de ejemplo 2'}
        ];
        displayContent();
    }

    // Mostrar contenido de manera aleatoria
    function displayContent() {
        displaySection.innerHTML = '';
        const shuffledContent = contentArray.sort(() => 0.5 - Math.random());
        shuffledContent.forEach(item => {
            const div = document.createElement('div');
            if (item.type === 'image') {
                const img = document.createElement('img');
                img.src = item.src;
                div.appendChild(img);
            } else if (item.type === 'text') {
                const p = document.createElement('p');
                p.textContent = item.text;
                div.appendChild(p);
            }
            displaySection.appendChild(div);
        });
    }

    // Subir nuevo contenido
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (imageUpload.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(event) {
                contentArray.push({type: 'image', src: event.target.result});
                displayContent();
            };
            reader.readAsDataURL(imageUpload.files[0]);
        }
        if (textUpload.value.trim() !== '') {
            contentArray.push({type: 'text', text: textUpload.value.trim()});
            textUpload.value = '';
            displayContent();
        }
    });

    // Cambiar contenido cada 12 horas
    setInterval(displayContent, 12 * 60 * 60 * 1000);

    loadContent();
});
