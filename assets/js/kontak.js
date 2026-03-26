document.getElementById('kontakForm').addEventListener('submit', async function (e) {
            e.preventDefault();

            const btn = document.getElementById('btnKirim');
            const pesanError = document.getElementById('pesanError');

            btn.disabled = true;
            btn.textContent = 'Mengirim...';
            pesanError.style.display = 'none';

            const data = new FormData(this);

            try {
                const res = await fetch('https://formspree.io/f/mlgpkqal', {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (res.ok) {
                    this.reset();
                    btn.style.display = 'none';
                    document.getElementById('pesanSukses').style.display = 'block';
                } else {
                    pesanError.style.display = 'block';
                    document.getElementById('errorTeks').textContent = 'Gagal mengirim, coba lagi ya.';
                    btn.disabled = false;
                    btn.textContent = 'Kirim';
                }
            } catch (err) {
                pesanError.style.display = 'block';
                document.getElementById('errorTeks').textContent = 'Tidak ada koneksi. Periksa internet kamu.';
                btn.disabled = false;
                btn.textContent = 'Kirim';
            }
        });