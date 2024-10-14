let isErasing = false; // To keep track of eraser mode

function playAudio(id) {
    const audio = document.getElementById(id);
    if (audio) {
        if (!audio.paused) {
            // If the audio is playing, pause it and reset to the start
            audio.pause();
            audio.currentTime = 0;
        } else {
            // If the audio is not playing, just play it
            audio.play().catch(error => {
                console.error('Audio play failed:', error);
            });
        }
    }
}

function startDrawing() {
    const drawingSection = document.getElementById('drawing');
    drawingSection.classList.remove('hidden');

    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mousemove', draw);

    function startDraw(event) {
        drawing = true;
        draw(event);
    }

    function stopDraw() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(event) {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';

        if (isErasing) {
            ctx.globalCompositeOperation = 'destination-out'; // Erase instead of draw
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.lineWidth = 10; // Make the eraser a bit larger
        } else {
            ctx.globalCompositeOperation = 'source-over'; // Draw normally
            ctx.strokeStyle = 'black';
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function toggleEraser() {
    isErasing = !isErasing; // Toggle the eraser mode
    alert(isErasing ? "Eraser mode ON" : "Eraser mode OFF");
}
