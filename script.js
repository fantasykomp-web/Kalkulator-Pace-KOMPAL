function calculatePace() {
    // 1. Ambil nilai dari input
    const distance = parseFloat(document.getElementById('distance').value);
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const resultElement = document.getElementById('paceResult');

    // 2. Validasi input
    if (isNaN(distance) || distance <= 0) {
        resultElement.textContent = "Masukkan jarak yang valid (> 0 km)";
        return;
    }

    // 3. Konversi total waktu ke menit desimal
    // Total detik = (jam * 3600) + (menit * 60) + detik
    // Total menit desimal = Total detik / 60
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    const totalMinutesDecimal = totalSeconds / 60;

    // 4. Hitung pace (menit per kilometer)
    const paceDecimal = totalMinutesDecimal / distance; // Contoh: 9.17 menit/km

    // 5. Pisahkan bagian bulat menit dan konversi sisanya ke detik
    const paceMinutes = Math.floor(paceDecimal); // 9 menit
    const paceSecondsDecimal = (paceDecimal - paceMinutes) * 60; // 0.17 * 60 = 10.2 detik
    const paceSeconds = Math.round(paceSecondsDecimal); // Bulatkan: 10 detik

    // Format output menjadi MM:SS
    const formattedPace = formatTime(paceMinutes, paceSeconds);

    // 6. Tampilkan hasil
    resultElement.textContent = `${formattedPace} min/km`;
}

// Fungsi helper untuk memastikan format waktu MM:SS (misal 05:08)
function formatTime(minutes, seconds) {
    // Menangani kasus detik yang dibulatkan menjadi 60 (misal 5:60 jadi 6:00)
    if (seconds >= 60) {
        minutes += Math.floor(seconds / 60);
        seconds = seconds % 60;
    }
    
    // PadStart(2, '0') menambahkan '0' di depan jika angka hanya 1 digit
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
}
