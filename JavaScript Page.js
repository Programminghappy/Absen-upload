document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah pengiriman form secara default

    const formData = {
        tanggal: document.getElementById('tanggal').value,
        nama: document.getElementById('nama').value,
        keterangan: document.getElementById('keterangan').value,
        link_video: document.getElementById('link_video').value,
        bagian: document.getElementById('bagian').value,
        kategori: document.getElementById('kategori').value,
    };

    // Validasi semua field harus terisi
    const requiredFields = ['tanggal', 'nama', 'keterangan', 'link_video', 'bagian', 'kategori'];
    let isValid = true;
    for (const field of requiredFields) {
        if (!formData[field]) {
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        showErrorPopup('Field ini belum diisi, tolong lengkapi terlebih dahulu.'); // Tampilkan popup error jika ada field yang kosong
        return; // Hentikan eksekusi lebih lanjut
    }

    console.log(formData); // Cek data yang akan dikirim

    // Mengirim data ke server
    fetch('https://script.google.com/macros/s/AKfycbxgHSddO_-7867evajw6ulx699HTVWWwjjutHZJuIz9dopgqQtISu9xWW5pu8cDA3w/exec', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        document.getElementById('success-message').classList.add('show'); // Tampilkan pesan sukses
        setTimeout(() => {
            window.location.href = 'thank-you.html'; // Alihkan ke halaman terima kasih
        }, 2000); // Misalnya, 2 detik
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorPopup('Error submitting form. Please try again later.'); // Tampilkan popup error jika ada kesalahan
    });
});

// Fungsi untuk menampilkan popup error
function showErrorPopup(errorMessage) {
    const errorPopup = document.getElementById('error-popup');
    errorPopup.textContent = errorMessage;
    errorPopup.classList.add('open-popup');
    setTimeout(() => {
        errorPopup.classList.remove('open-popup');
    }, 3000);
}