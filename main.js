// main.js
console.log("main.js terhubung!");

document.addEventListener('DOMContentLoaded', () => {
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = today.toLocaleDateString('id-ID', options);
    }

    const sidebar = document.getElementById('sidebar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const contentArea = document.getElementById('content-area');

    // Fungsi untuk membuka sidebar
    const openSidebar = () => {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden'); // Mencegah scrolling di body saat sidebar terbuka
    };

    // Fungsi untuk menutup sidebar
    const closeSidebar = () => {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    };

    // Event listener untuk tombol menu mobile
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openSidebar);
    }

    // Event listener untuk overlay (klik di luar sidebar akan menutup sidebar)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Event listener untuk setiap link navigasi di sidebar
    const navLinks = document.querySelectorAll('aside nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.id;
            console.log(`Navigasi ke ${targetId}`);

            // Tutup sidebar setelah mengklik link (khusus mobile)
            if (window.innerWidth < 768) { // 768px adalah breakpoint default 'md' di Tailwind
                closeSidebar();
            }

            // Contoh konten dinamis (akan diganti dengan logika sebenarnya nanti)
            let pageContent = '';
            switch (targetId) {
                case 'nav-dashboard':
                    pageContent = `
                        <h2 class="text-3xl font-bold mb-6">Dashboard</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div class="bg-white p-6 rounded-lg shadow-md">
                                <h3 class="text-xl font-semibold mb-4">Daily Snapshot</h3>
                                <p class="text-gray-700">Tanggal: <span id="current-date-dynamic"></span></p>
                                <p class="text-gray-700">Today Goal: Belum ada</p>
                            </div>
                            <div class="bg-white p-6 rounded-lg shadow-md">
                                <h3 class="text-xl font-semibold mb-4">Ringkasan Anggaran Bulan Ini</h3>
                                <p class="text-gray-700">Pemasukan: Rp 0</p>
                                <p class="text-gray-700">Pengeluaran: Rp 0</p>
                                <p class="text-gray-700">Sisa Anggaran: Rp 0</p>
                            </div>
                        </div>
                    `;
                    // Update current date again if dashboard is reloaded
                    setTimeout(() => {
                        const dynamicDateElement = document.getElementById('current-date-dynamic');
                        if (dynamicDateElement) {
                            const today = new Date();
                            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                            dynamicDateElement.textContent = today.toLocaleDateString('id-ID', options);
                        }
                    }, 0);
                    break;
                case 'nav-daily':
                    pageContent = '<h2 class="text-3xl font-bold mb-6">Daily Planner</h2><p class="text-gray-700">Ini adalah halaman Daily Planner Anda. Konten akan dimuat di sini.</p>';
                    break;
                case 'nav-budget':
                    pageContent = '<h2 class="text-3xl font-bold mb-6">Budget Planner</h2><p class="text-gray-700">Ini adalah halaman Budget Planner Anda. Konten akan dimuat di sini.</p>';
                    break;
                case 'nav-meal':
                    pageContent = '<h2 class="text-3xl font-bold mb-6">Weekly Meal Planner</h2><p class="text-gray-700">Ini adalah halaman Weekly Meal Planner Anda. Konten akan dimuat di sini.</p>';
                    break;
                case 'nav-important':
                    pageContent = '<h2 class="text-3xl font-bold mb-6">Important Date</h2><p class="text-gray-700">Ini adalah halaman Important Date Anda. Konten akan dimuat di sini.</p>';
                    break;
                case 'nav-habit':
                    pageContent = '<h2 class="text-3xl font-bold mb-6">Habit Tracker</h2><p class="text-gray-700">Ini adalah halaman Habit Tracker Anda. Konten akan dimuat di sini.</p>';
                    break;
                case 'nav-yearly':
                    pageContent = '<h2 class="text-3xl font-bold mb-6">Yearly Goal Tracker</h2><p class="text-gray-700">Ini adalah halaman Yearly Goal Tracker Anda. Konten akan dimuat di sini.</p>';
                    break;
                default:
                    pageContent = '<h2 class="text-3xl font-bold mb-6">Halaman Tidak Ditemukan</h2><p class="text-gray-700">Terjadi kesalahan navigasi.</p>';
            }
            contentArea.innerHTML = pageContent;
        });
    });

    // Menutup sidebar jika ukuran layar berubah dari mobile ke desktop saat sidebar terbuka
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) { // Jika ukuran layar >= md
            closeSidebar();
        }
    });
});
