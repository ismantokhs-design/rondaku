// ==========================================
// 1. FUNGSI ROUTER SPA (Memuat halaman via fetch)
// ==========================================
window.loadPage = async function(pageName) {
  const contentContainer = document.getElementById('scrollable-content') || document.getElementById('app') || document.body;
  try {
    const response = await fetch(`pages/${pageName}.html`);
    if (!response.ok) throw new Error("Halaman tidak ditemukan");
    const html = await response.text();
    contentContainer.innerHTML = html;
    
    const popup = document.getElementById('option-menu-popup');
    if (popup) {
      popup.classList.add('hidden');
    }

    if (pageName === 'home') {
      if (typeof window.loadPeraturanToHome === 'function') {
        window.loadPeraturanToHome();
      }
      if (typeof window.loadHomeJimpitanSummary === 'function') {
        window.loadHomeJimpitanSummary();
      }
      // Mulai jalankan jam real-time khusus halaman Home
      if (typeof window.initHomeRealTimeClock === 'function') {
        window.initHomeRealTimeClock();
      }
    }

    if (pageName === 'jadwal' && typeof window.loadAllJadwalPageData === 'function') {
      window.loadAllJadwalPageData();
    }

    if (pageName === 'laporan' && typeof window.loadLaporanFromFirestore === 'function') {
      window.loadLaporanFromFirestore();
    }

    if (pageName === 'scan') {
      if (typeof window.loadScanHistory === 'function') {
        window.loadScanHistory();
      }
    }

    if (pageName === 'pengaturan') {
      if (typeof window.loadWilayahConfig === 'function') {
        window.loadWilayahConfig();
      }
      if (typeof window.loadJadwalFromFirestore === 'function') {
        const activeTab2 = document.getElementById('content-tab2');
        if (activeTab2 && !activeTab2.classList.contains('hidden')) {
          window.loadJadwalFromFirestore();
        }
      }
      if (typeof window.loadWargaFromFirestore === 'function') {
        const activeTab3 = document.getElementById('content-tab3');
        if (activeTab3 && !activeTab3.classList.contains('hidden')) {
          window.loadWargaFromFirestore();
        }
      }
      if (typeof window.loadPeraturanFromFirestore === 'function') {
        const activeTab4 = document.getElementById('content-tab4');
        if (activeTab4 && !activeTab4.classList.contains('hidden')) {
          window.loadPeraturanFromFirestore();
        }
      }
    }

    if (pageName === 'tambah-user' && typeof window.loadUsersFromFirestore === 'function') {
      window.loadUsersFromFirestore();
    }

    if (pageName === 'hak-akses' && typeof window.fetchRolePermissions === 'function') {
      window.fetchRolePermissions();
    }
  } catch (err) {
    console.error("Gagal memuat halaman:", err);
    window.showToast("Gagal memuat halaman: " + pageName, "error");
  }
};

// ==========================================
// 2. FUNGSI TOAST NOTIFIKASI MODERN (SMOOTH)
// ==========================================
window.showToast = function(message, type = 'success') {
  const existingToast = document.getElementById('custom-toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.id = 'custom-toast';
  
  let bgClass = 'bg-emerald-600 border-emerald-500 text-white';
  let icon = 'fa-circle-check';
  if (type === 'error') {
    bgClass = 'bg-rose-600 border-rose-500 text-white';
    icon = 'fa-circle-exclamation';
  } else if (type === 'warning') {
    bgClass = 'bg-amber-600 border-amber-500 text-white';
    icon = 'fa-triangle-exclamation';
  }

  toast.className = `fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl shadow-2xl border ${bgClass} transform translate-y-10 opacity-0 transition-all duration-300 text-xs font-semibold backdrop-blur-md`;
  toast.innerHTML = `<i class="fa-solid ${icon} text-base"></i><span>${message}</span>`;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// ==========================================
// 3. FUNGSI SWITCH TAB PADA PANEL PENGATURAN (4 TAB)
// ==========================================
window.switchTab = function(tabIndex) {
  const tab1 = document.getElementById('content-tab1');
  const tab2 = document.getElementById('content-tab2');
  const tab3 = document.getElementById('content-tab3');
  const tab4 = document.getElementById('content-tab4');

  if (tab1) tab1.classList.add('hidden');
  if (tab2) tab2.classList.add('hidden');
  if (tab3) tab3.classList.add('hidden');
  if (tab4) tab4.classList.add('hidden');

  const btn1 = document.getElementById('btn-tab1');
  const btn2 = document.getElementById('btn-tab2');
  const btn3 = document.getElementById('btn-tab3');
  const btn4 = document.getElementById('btn-tab4');

  const resetBtnStyle = (btn) => {
    if (!btn) return;
    btn.className = "py-2.5 px-1 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition flex flex-col items-center space-y-1 cursor-pointer";
  };

  resetBtnStyle(btn1);
  resetBtnStyle(btn2);
  resetBtnStyle(btn3);
  resetBtnStyle(btn4);

  if (tabIndex === 1) {
    if (tab1) tab1.classList.remove('hidden');
    if (btn1) btn1.className = "py-2.5 px-1 rounded-xl text-xs font-bold text-white bg-purple-600 shadow-md transition flex flex-col items-center space-y-1 cursor-pointer";
    if (typeof window.loadWilayahConfig === 'function') window.loadWilayahConfig();
  } else if (tabIndex === 2) {
    if (tab2) tab2.classList.remove('hidden');
    if (btn2) btn2.className = "py-2.5 px-1 rounded-xl text-xs font-bold text-white bg-purple-600 shadow-md transition flex flex-col items-center space-y-1 cursor-pointer";
    if (typeof window.loadJadwalFromFirestore === 'function') {
      window.loadJadwalFromFirestore();
    }
  } else if (tabIndex === 3) {
    if (tab3) tab3.classList.remove('hidden');
    if (btn3) btn3.className = "py-2.5 px-1 rounded-xl text-xs font-bold text-white bg-purple-600 shadow-md transition flex flex-col items-center space-y-1 cursor-pointer";
    if (typeof window.loadWargaFromFirestore === 'function') {
      window.loadWargaFromFirestore();
    }
  } else if (tabIndex === 4) {
    if (tab4) tab4.classList.remove('hidden');
    if (btn4) btn4.className = "py-2.5 px-1 rounded-xl text-xs font-bold text-white bg-purple-600 shadow-md transition flex flex-col items-center space-y-1 cursor-pointer";
    if (typeof window.loadPeraturanFromFirestore === 'function') {
      window.loadPeraturanFromFirestore();
    }
  }
};

// ==========================================
// 4. FUNGSI SIMPAN & MUAT KONFIGURASI WILAYAH & IURAN JIMBITAN
// ==========================================
window.saveWilayahConfig = async function() {
  const rt = document.getElementById('wilayah-rt')?.value.trim();
  const pos = document.getElementById('wilayah-pos')?.value.trim();
  const dukuh = document.getElementById('wilayah-dukuh')?.value.trim();
  const jimpitan = document.getElementById('wilayah-jimpitan')?.value.trim();

  if (!rt || !pos || !dukuh || !jimpitan) {
    window.showToast("Semua kolom wilayah wajib diisi!", "warning");
    return;
  }

  try {
    const { db } = await import('./db.js');
    const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    await setDoc(doc(db, "settings", "wilayah"), {
      rt: rt,
      pos: pos,
      dukuh: dukuh,
      nilaiJimpitan: jimpitan,
      updatedAt: new Date().toISOString()
    });

    window.showToast("Pengaturan wilayah & iuran jimpitan berhasil disimpan!");
  } catch (err) {
    console.error("Gagal menyimpan wilayah:", err);
    window.showToast("Gagal menyimpan pengaturan: " + err.message, "error");
  }
};

window.loadWilayahConfig = async function() {
  const rtEl = document.getElementById('wilayah-rt');
  const posEl = document.getElementById('wilayah-pos');
  const dukuhEl = document.getElementById('wilayah-dukuh');
  const jimpitanEl = document.getElementById('wilayah-jimpitan');

  if (!rtEl) return;

  try {
    const { db } = await import('./db.js');
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    const docSnap = await getDoc(doc(db, "settings", "wilayah"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (rtEl) rtEl.value = data.rt || 'RT 04 / RW 08';
      if (posEl) posEl.value = data.pos || 'Pos Kamling Utama';
      if (dukuhEl) dukuhEl.value = data.dukuh || 'Potrobayan';
      if (jimpitanEl) jimpitanEl.value = data.nilaiJimpitan || '1.000';
    }
  } catch (err) {
    console.error("Gagal memuat pengaturan wilayah:", err);
  }
};

// ==========================================
// 5. FUNGSI KONTROL MODAL TAMBAH USER
// ==========================================
window.openLocalTambahModal = function() {
  const modal = document.getElementById('local-tambah-modal');
  const card = document.getElementById('local-tambah-card');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('translate-y-full', 'sm:scale-95');
        card.classList.add('translate-y-0', 'sm:scale-100');
      }
    }, 10);
  }
};

window.closeLocalTambahModal = function() {
  const modal = document.getElementById('local-tambah-modal');
  const card = document.getElementById('local-tambah-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('translate-y-0', 'sm:scale-100');
    card.classList.add('translate-y-full', 'sm:scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
};

// ==========================================
// 6. FUNGSI KONTROL MODAL EDIT USER (DENGAN PASARAN)
// ==========================================
window.openLocalEditModal = function(docId, nama, email, role, pos, pasaran) {
  const editIdEl = document.getElementById('edit-doc-id');
  const editNamaEl = document.getElementById('edit-nama');
  const editEmailEl = document.getElementById('edit-email');
  const editRoleEl = document.getElementById('edit-role');
  const editPosEl = document.getElementById('edit-pos');
  const editPasaranEl = document.getElementById('edit-pasaran');

  if (editIdEl) editIdEl.value = docId;
  if (editNamaEl) editNamaEl.value = nama || '';
  if (editEmailEl) editEmailEl.value = email || '';
  if (editRoleEl) editRoleEl.value = role || 'Petugas Ronda';
  if (editPosEl) editPosEl.value = pos || 'Pos Utama RT 04';
  if (editPasaranEl) editPasaranEl.value = pasaran || '';

  const modal = document.getElementById('local-edit-modal');
  const card = document.getElementById('local-edit-card');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('translate-y-full', 'sm:scale-95');
        card.classList.add('translate-y-0', 'sm:scale-100');
      }
    }, 10);
  }
};

window.closeLocalEditModal = function() {
  const modal = document.getElementById('local-edit-modal');
  const card = document.getElementById('local-edit-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('translate-y-0', 'sm:scale-100');
    card.classList.add('translate-y-full', 'sm:scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
};

// ==========================================
// 7. FUNGSI KONTROL MODAL JADWAL RONDA & CEK PASARAN
// ==========================================
window.openJadwalModal = function(docId = '', pasaran = '', kelompok = '', petugas = '') {
  const modal = document.getElementById('local-jadwal-modal');
  const card = document.getElementById('local-jadwal-card');
  const modalTitle = document.getElementById('jadwal-modal-title');
  const editIdInput = document.getElementById('edit-jadwal-doc-id');
  const selectPasaran = document.getElementById('jadwal-pasaran');
  const inputKelompok = document.getElementById('jadwal-kelompok');
  const textareaPetugas = document.getElementById('jadwal-petugas');

  if (editIdInput) editIdInput.value = docId;
  if (selectPasaran) selectPasaran.value = pasaran;
  if (inputKelompok) inputKelompok.value = kelompok;
  if (textareaPetugas) textareaPetugas.value = petugas;

  if (modalTitle) {
    modalTitle.innerText = docId ? 'Edit Jadwal & Regu Jaga' : 'Formulir Input Jadwal & Regu Jaga';
  }

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('translate-y-full', 'sm:scale-95');
        card.classList.add('translate-y-0', 'sm:scale-100');
      }
    }, 10);
  }
};

window.closeJadwalModal = function() {
  const modal = document.getElementById('local-jadwal-modal');
  const card = document.getElementById('local-jadwal-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('translate-y-0', 'sm:scale-100');
    card.classList.add('translate-y-full', 'sm:scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      const editIdInput = document.getElementById('edit-jadwal-doc-id');
      const selectPasaran = document.getElementById('jadwal-pasaran');
      const inputKelompok = document.getElementById('jadwal-kelompok');
      const textareaPetugas = document.getElementById('jadwal-petugas');
      if (editIdInput) editIdInput.value = '';
      if (selectPasaran) selectPasaran.selectedIndex = 0;
      if (inputKelompok) inputKelompok.value = '';
      if (textareaPetugas) textareaPetugas.value = '';
    }, 300);
  }
};

let tempExistingPasaranData = null;

window.checkExistingPasaran = async function(selectedPasaran) {
  const editIdInput = document.getElementById('edit-jadwal-doc-id');
  const inputKelompok = document.getElementById('jadwal-kelompok');
  const textareaPetugas = document.getElementById('jadwal-petugas');
  const modalTitle = document.getElementById('jadwal-modal-title');

  if (!selectedPasaran) return;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs, query, where } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const q = query(collection(db, "schedules"), where("pasaran", "==", selectedPasaran));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      tempExistingPasaranData = {
        docId: docSnap.id,
        ...docSnap.data()
      };

      const modal = document.getElementById('local-confirm-pasaran-modal');
      const card = document.getElementById('local-confirm-pasaran-card');
      const textEl = document.getElementById('confirm-pasaran-text');
      if (textEl) {
        textEl.innerText = `Jadwal untuk pasaran "${selectedPasaran}" sudah terdaftar (${tempExistingPasaranData.kelompok}). Melanjutkan = edit / batal?`;
      }
      if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => {
          modal.classList.remove('opacity-0');
          if (card) {
            card.classList.remove('scale-95');
            card.classList.add('scale-100');
          }
        }, 10);
      }
    } else {
      if (editIdInput) editIdInput.value = '';
      if (modalTitle) modalTitle.innerText = 'Formulir Input Jadwal & Regu Jaga';
      if (inputKelompok) inputKelompok.value = '';
      if (textareaPetugas) textareaPetugas.value = '';
      tempExistingPasaranData = null;
    }
  } catch (err) {
    console.error("Gagal memeriksa duplikasi pasaran:", err);
  }
};

window.proceedPasaranEdit = function() {
  if (tempExistingPasaranData) {
    const editIdInput = document.getElementById('edit-jadwal-doc-id');
    const selectPasaran = document.getElementById('jadwal-pasaran');
    const inputKelompok = document.getElementById('jadwal-kelompok');
    const textareaPetugas = document.getElementById('jadwal-petugas');
    const modalTitle = document.getElementById('jadwal-modal-title');

    if (editIdInput) editIdInput.value = tempExistingPasaranData.docId;
    if (selectPasaran) selectPasaran.value = tempExistingPasaranData.pasaran;
    if (inputKelompok) inputKelompok.value = tempExistingPasaranData.kelompok || '';
    if (textareaPetugas) textareaPetugas.value = tempExistingPasaranData.petugas || '';
    if (modalTitle) modalTitle.innerText = 'Edit Jadwal & Regu Jaga';
  }
  window.cancelPasaranDuplicate();
};

window.cancelPasaranDuplicate = function() {
  const modal = document.getElementById('local-confirm-pasaran-modal');
  const card = document.getElementById('local-confirm-pasaran-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      tempExistingPasaranData = null;
    }, 300);
  }
};

// ==========================================
// 8. KONTROL MODAL WARGA & MANAJEMEN JIMBITAN
// ==========================================
window.openWargaModal = function(docId = '', nokk = '', namakk = '') {
  const modal = document.getElementById('local-warga-modal');
  const card = document.getElementById('local-warga-card');
  const titleEl = document.getElementById('warga-modal-title');
  const idInput = document.getElementById('edit-warga-id');
  const nokkInput = document.getElementById('warga-nokk');
  const namakkInput = document.getElementById('warga-namakk');

  if (idInput) idInput.value = docId;
  if (nokkInput) nokkInput.value = nokk;
  if (namakkInput) namakkInput.value = namakk;
  if (titleEl) titleEl.innerText = docId ? 'Edit Data Warga' : 'Tambah Data Warga (Wajib Jimpitan)';

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('translate-y-full', 'sm:scale-95');
        card.classList.add('translate-y-0', 'sm:scale-100');
      }
    }, 10);
  }
};

window.closeWargaModal = function() {
  const modal = document.getElementById('local-warga-modal');
  const card = document.getElementById('local-warga-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('translate-y-0', 'sm:scale-100');
    card.classList.add('translate-y-full', 'sm:scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      const idInput = document.getElementById('edit-warga-id');
      const nokkInput = document.getElementById('warga-nokk');
      const namakkInput = document.getElementById('warga-namakk');
      if (idInput) idInput.value = '';
      if (nokkInput) nokkInput.value = '';
      if (namakkInput) namakkInput.value = '';
    }, 300);
  }
};

window.saveWargaToFirestore = async function() {
  const docId = document.getElementById('edit-warga-id')?.value;
  const noKK = document.getElementById('warga-nokk')?.value.trim();
  const namaKK = document.getElementById('warga-namakk')?.value.trim();

  if (!noKK || !namaKK) {
    window.showToast("Nomor KK dan Nama Kepala Keluarga wajib diisi!", "warning");
    return;
  }

  try {
    const { db } = await import('./db.js');
    const { collection, addDoc, doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    if (docId) {
      await updateDoc(doc(db, "warga", docId), {
        nokk: noKK,
        namakk: namaKK,
        updatedAt: new Date().toISOString()
      });
      window.showToast(`Data warga "${namaKK}" berhasil diperbarui!`);
    } else {
      await addDoc(collection(db, "warga"), {
        nokk: noKK,
        namakk: namaKK,
        createdAt: new Date().toISOString()
      });
      window.showToast(`Warga "${namaKK}" berhasil disimpan!`);
    }

    if (typeof window.closeWargaModal === 'function') {
      window.closeWargaModal();
    }

    window.loadWargaFromFirestore();
  } catch (err) {
    console.error("Gagal menyimpan data warga:", err);
    window.showToast("Gagal menyimpan data: " + err.message, "error");
  }
};

window.loadWargaFromFirestore = async function() {
  const tbody = document.getElementById('warga-table-body');
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="2" class="py-4 text-center text-slate-400">Memuat data warga dari database...</td></tr>`;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const querySnapshot = await getDocs(collection(db, "warga"));
    tbody.innerHTML = "";

    let count = 0;
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const docId = docSnap.id;
      count++;

      const nokk = data.nokk || '-';
      const namakk = data.namakk || '-';

      const safeNoKK = nokk.replace(/'/g, "\\'");
      const safeNama = namakk.replace(/'/g, "\\'");

      const tr = document.createElement('tr');
      tr.className = "hover:bg-slate-700/30 transition";
      tr.innerHTML = `
        <td class="py-3 px-3">
          <p class="font-bold text-white">${namakk}</p>
          <p class="text-[10px] text-purple-400 font-mono">No. KK: ${nokk}</p>
        </td>
        <td class="py-3 px-3 text-center">
          <div class="flex items-center justify-center space-x-1.5">
            <button type="button" onclick="window.openWargaModal('${docId}', '${safeNoKK}', '${safeNama}')" class="w-8 h-8 bg-slate-700 hover:bg-amber-600 text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition cursor-pointer" title="Edit">
              <i class="fa-solid fa-pen text-xs"></i>
            </button>
            <button type="button" onclick="window.deleteWarga('${docId}', '${safeNama}')" class="w-8 h-8 bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition cursor-pointer" title="Hapus">
              <i class="fa-solid fa-trash text-xs"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    if (count === 0) {
      tbody.innerHTML = `<tr><td colspan="2" class="py-4 text-center text-slate-400">Belum ada data warga terdaftar di database.</td></tr>`;
    }
  } catch (err) {
    console.error("Gagal memuat warga:", err);
    tbody.innerHTML = `<tr><td colspan="2" class="py-4 text-center text-rose-400">Gagal memuat data warga.</td></tr>`;
  }
};

window.deleteWarga = async function(docId, namakk) {
  if (confirm(`Hapus data warga "${namakk}"?`)) {
    try {
      const { db } = await import('./db.js');
      const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

      await deleteDoc(doc(db, "warga", docId));
      window.showToast(`Warga "${namakk}" berhasil dihapus.`);
      window.loadWargaFromFirestore();
    } catch (err) {
      console.error("Gagal menghapus warga:", err);
      window.showToast("Gagal menghapus data warga.", "error");
    }
  }
};

// ==========================================
// 9. TOGGLE PASSWORD VISIBILITY
// ==========================================
window.toggleLocalPasswordVisibility = function() {
  const passwordInput = document.getElementById('new-password');
  const eyeIcon = document.getElementById('local-eye-icon');
  if (passwordInput && eyeIcon) {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.classList.remove('fa-eye');
      eyeIcon.classList.add('fa-eye-slash');
    } else {
      passwordInput.type = 'password';
      eyeIcon.classList.remove('fa-eye-slash');
      eyeIcon.classList.add('fa-eye');
    }
  }
};

// ==========================================
// 10. FUNGSI AMBIL NAMA & PASARAN DARI DATABASE JADWAL
// ==========================================
window.openDbNameSelectorModal = async function() {
  const modal = document.getElementById('local-db-names-modal');
  const card = document.getElementById('local-db-names-card');
  const container = document.getElementById('db-names-list-container');

  if (!modal) return;
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
    if (card) {
      card.classList.remove('scale-95');
      card.classList.add('scale-100');
    }
  }, 10);

  if (container) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Mengambil data nama dari database jadwal...</p>`;
  }

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const querySnapshot = await getDocs(collection(db, "schedules"));
    if (querySnapshot.empty) {
      if (container) container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Belum ada data jadwal di database.</p>`;
      return;
    }

    let petugasMap = new Map();
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const pasaranJadwal = data.pasaran || 'Umum / Harian';

      let namesList = [];
      if (Array.isArray(data.petugasList) && data.petugasList.length > 0) {
        namesList = data.petugasList;
      } else if (typeof data.petugas === 'string') {
        namesList = data.petugas.split(/,|\n/);
      }

      namesList.forEach(name => {
        const cleanName = name.trim();
        if (cleanName) {
          petugasMap.set(cleanName, pasaranJadwal);
        }
      });
    });

    if (petugasMap.size === 0) {
      if (container) container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Tidak ditemukan nama petugas dalam jadwal.</p>`;
      return;
    }

    let html = '';
    const sortedEntries = Array.from(petugasMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

    sortedEntries.forEach(([nama, pasaran]) => {
      const safeName = nama.replace(/'/g, "\\'");
      const safePasaran = pasaran.replace(/'/g, "\\'");
      html += `
        <button type="button" onclick="window.selectNameFromDb('${safeName}', '${safePasaran}')" class="w-full text-left bg-slate-800/80 hover:bg-emerald-600/20 hover:border-emerald-500/50 border border-slate-700/60 p-2.5 rounded-xl text-xs text-white font-medium transition flex items-center justify-between cursor-pointer group">
          <div>
            <span class="font-bold">${nama}</span>
            <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded ml-2">${pasaran}</span>
          </div>
          <i class="fa-solid fa-plus text-[10px] text-slate-400 group-hover:text-emerald-400"></i>
        </button>
      `;
    });

    if (container) container.innerHTML = html;

  } catch (err) {
    console.error("Gagal memuat nama dari DB:", err);
    if (container) container.innerHTML = `<p class="text-xs text-rose-400 text-center py-4">Gagal mengambil data dari database.</p>`;
  }
};

window.closeDbNameSelectorModal = function() {
  const modal = document.getElementById('local-db-names-modal');
  const card = document.getElementById('local-db-names-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
};

window.selectNameFromDb = function(nama, pasaran) {
  const inputNama = document.getElementById('new-nama');
  const inputEmail = document.getElementById('new-email');
  const selectPasaran = document.getElementById('new-pasaran');
  
  if (inputNama) inputNama.value = nama;
  
  if (inputEmail) {
    const cleanEmail = nama.toLowerCase().replace(/[^a-z0-9]/g, '');
    inputEmail.value = `${cleanEmail}@ronda.local`;
  }

  if (selectPasaran && pasaran) {
    selectPasaran.value = pasaran;
  }

  window.closeDbNameSelectorModal();
  if (typeof window.showToast === 'function') {
    window.showToast(`Berhasil memilih "${nama}" (${pasaran}) dari database.`);
  }
};

// ==========================================
// 11. FUNGSI MEMUAT DATA USER DARI FIRESTORE (DENGAN PASARAN)
// ==========================================
window.loadUsersFromFirestore = async function() {
  const tbody = document.getElementById('user-table-body');
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-400">Memuat data dari database...</td></tr>`;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const querySnapshot = await getDocs(collection(db, "users"));
    tbody.innerHTML = "";

    let validCount = 0;
    querySnapshot.forEach((documentSnap) => {
      const user = documentSnap.data();
      const docId = documentSnap.id;

      if (!user.nama) return;
      validCount++;

      const userRole = user.role || 'Petugas Ronda';
      const userPos = user.pos || 'Pos Utama RT 04';
      const userPasaran = user.pasaran || 'Umum / Harian';
      const userEmail = user.email || '-';

      let badgeColor = "bg-blue-500/20 text-blue-300";
      if (userRole === "Admin Sistem") badgeColor = "bg-purple-500/20 text-purple-300";
      if (userRole === "Koordinator RT") badgeColor = "bg-amber-500/20 text-amber-300";

      const tr = document.createElement('tr');
      tr.className = "hover:bg-slate-700/30 transition";
      tr.innerHTML = `
        <td class="py-3 px-3">
          <p class="font-bold text-white">${user.nama}</p>
          <p class="text-[10px] text-emerald-400">${userEmail}</p>
        </td>
        <td class="py-3 px-3">
          <span class="${badgeColor} px-2 py-0.5 rounded-md text-[10px] font-semibold">${userRole}</span>
          <div class="flex items-center space-x-1.5 mt-1">
            <span class="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-medium">${userPasaran}</span>
            <span class="text-[10px] text-slate-400">• ${userPos}</span>
          </div>
        </td>
        <td class="py-3 px-3 text-center">
          <div class="flex items-center justify-center space-x-1.5">
            <button type="button" onclick="window.openLocalEditModal('${docId}', '${user.nama}', '${user.email}', '${userRole}', '${userPos}', '${userPasaran}')" class="w-8 h-8 bg-slate-700 hover:bg-amber-600 text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition shadow-sm cursor-pointer" title="Edit">
              <i class="fa-solid fa-pen-to-square text-xs"></i>
            </button>
            <button type="button" onclick="window.deleteFirestoreUser('${docId}', '${user.nama}')" class="w-8 h-8 bg-slate-700 hover:bg-red-600 text-slate-300 hover:text-white rounded-xl flex items-center justify-center transition shadow-sm cursor-pointer" title="Hapus">
              <i class="fa-solid fa-trash text-xs"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    if (validCount === 0) {
      tbody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-slate-400">Belum ada data petugas di database.</td></tr>`;
    }
  } catch (err) {
    console.error("Gagal memuat:", err);
    tbody.innerHTML = `<tr><td colspan="3" class="py-4 text-center text-red-400">Gagal memuat data: ${err.message}</td></tr>`;
  }
};

// ==========================================
// 12. FUNGSI KONFIRMASI & HAPUS USER
// ==========================================
let selectedDeleteId = null;

window.deleteFirestoreUser = function(docId, nama) {
  selectedDeleteId = docId;
  const textEl = document.getElementById('delete-modal-text');
  if (textEl) textEl.innerText = `Apakah Anda yakin ingin menghapus petugas "${nama}" dari database?`;

  const modal = document.getElementById('local-delete-modal');
  const card = document.getElementById('local-delete-card');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
      }
    }, 10);
  }
};

window.closeDeleteModal = function() {
  const modal = document.getElementById('local-delete-modal');
  const card = document.getElementById('local-delete-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      selectedDeleteId = null;
    }, 300);
  }
};

document.addEventListener('click', async function(e) {
  const confirmBtn = e.target.closest('#btn-confirm-delete');
  if (!confirmBtn || !selectedDeleteId) return;

  try {
    const { db } = await import('./db.js');
    const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    await deleteDoc(doc(db, "users", selectedDeleteId));
    window.closeDeleteModal();
    window.showToast("Data petugas berhasil dihapus dari database.");
    window.loadUsersFromFirestore();
  } catch (err) {
    console.error("Gagal menghapus:", err);
    window.closeDeleteModal();
    window.showToast("Gagal menghapus data: " + err.message, "error");
  }
});

// ==========================================
// 13. FUNGSI SIMPAN & EDIT USER (DENGAN PASARAN)
// ==========================================
window.submitUpdateUser = async function() {
  const docId = document.getElementById('edit-doc-id')?.value;
  const nama = document.getElementById('edit-nama')?.value.trim();
  const email = document.getElementById('edit-email')?.value.trim();
  const pasaran = document.getElementById('edit-pasaran')?.value;
  const role = document.getElementById('edit-role')?.value;
  const pos = document.getElementById('edit-pos')?.value;

  if (!nama || !email || !pasaran) {
    window.showToast("Nama, Email, dan Pasaran wajib diisi!", "warning");
    return;
  }

  try {
    const { db } = await import('./db.js');
    const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    await updateDoc(doc(db, "users", docId), {
      nama: nama,
      email: email,
      pasaran: pasaran,
      role: role,
      pos: pos,
      updatedAt: new Date().toISOString()
    });

    if (typeof window.closeLocalEditModal === 'function') {
      window.closeLocalEditModal();
    }

    window.showToast(`Data petugas "${nama}" berhasil diperbarui!`);
    window.loadUsersFromFirestore();
  } catch (err) {
    console.error("Gagal memperbarui data:", err);
    window.showToast("Gagal memperbarui data: " + err.message, "error");
  }
};

window.submitTambahUser = async function() {
  const nama = document.getElementById('new-nama')?.value.trim();
  const email = document.getElementById('new-email')?.value.trim();
  const password = document.getElementById('new-password')?.value.trim();
  const pasaran = document.getElementById('new-pasaran')?.value;
  const role = document.getElementById('new-role')?.value;
  const pos = document.getElementById('new-pos')?.value;

  if (!nama || !email || !pasaran) {
    window.showToast("Nama, Email, dan Pasaran wajib diisi!", "warning");
    return;
  }

  try {
    const { db } = await import('./db.js');
    const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    await addDoc(collection(db, "users"), {
      nama: nama,
      email: email,
      password: password || '-',
      pasaran: pasaran,
      role: role || 'Petugas Ronda',
      pos: pos || 'Pos Utama RT 04',
      createdAt: new Date().toISOString()
    });

    if (typeof window.closeLocalTambahModal === 'function') {
      window.closeLocalTambahModal();
    }

    window.showToast(`Petugas "${nama}" berhasil disimpan ke Firebase!`);
    
    const inputNama = document.getElementById('new-nama');
    const inputEmail = document.getElementById('new-email');
    const inputPass = document.getElementById('new-password');
    const selectPasaran = document.getElementById('new-pasaran');
    
    if (inputNama) inputNama.value = '';
    if (inputEmail) inputEmail.value = '';
    if (inputPass) inputPass.value = '';
    if (selectPasaran) selectPasaran.selectedIndex = 0;

    window.loadUsersFromFirestore();
  } catch (err) {
    console.error("Gagal menyimpan ke Firestore:", err);
    window.showToast("Gagal menyimpan data: " + err.message, "error");
  }
};

// ==========================================
// 14. FUNGSI MANAJEMEN JADWAL RONDA
// ==========================================
window.loadJadwalFromFirestore = async function() {
  const container = document.getElementById('jadwal-list-container');
  if (!container) return;

  container.innerHTML = `<p class="text-xs text-slate-400 text-center py-3">Memuat daftar jadwal...</p>`;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const querySnapshot = await getDocs(collection(db, "schedules"));
    if (querySnapshot.empty) {
      container.innerHTML = `<p class="text-xs text-slate-400 text-center py-3">Belum ada data jadwal ronda terdaftar.</p>`;
      return;
    }

    let html = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const docId = docSnap.id;
      const kelompok = data.kelompok || 'Tanpa Nama Kelompok';
      const pasaran = data.pasaran || '-';
      const petugasRaw = data.petugas || '';
      
      let petugasHtml = '<ul class="space-y-1 mt-1">';
      if (Array.isArray(data.petugasList) && data.petugasList.length > 0) {
        data.petugasList.forEach((nama, idx) => {
          petugasHtml += `<li class="text-xs text-slate-300"><span class="text-purple-400 font-bold mr-1.5">${idx + 1}.</span>${nama}</li>`;
        });
      } else if (typeof data.petugas === 'string') {
        const listArray = data.petugas.split(/,|\n/).map(p => p.trim()).filter(p => p);
        listArray.forEach((nama, idx) => {
          petugasHtml += `<li class="text-xs text-slate-300"><span class="text-purple-400 font-bold mr-1.5">${idx + 1}.</span>${nama}</li>`;
        });
      }
      petugasHtml += '</ul>';

      const safeKelompok = kelompok.replace(/'/g, "\\'");
      const safePasaran = pasaran.replace(/'/g, "\\'");
      const safePetugas = petugasRaw.replace(/'/g, "\\'").replace(/\n/g, '\\n');

      html += `
        <div class="bg-slate-900/80 border border-slate-700/60 p-4 rounded-2xl space-y-2.5 relative group hover:border-purple-500/50 transition">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">${pasaran}</span>
              <h4 class="font-bold text-sm text-white">${kelompok}</h4>
            </div>
            <div class="flex items-center space-x-1">
              <button onclick="window.openJadwalModal('${docId}', '${safePasaran}', '${safeKelompok}', '${safePetugas}')" class="text-slate-400 hover:text-amber-400 p-1.5 transition cursor-pointer" title="Edit Jadwal">
                <i class="fa-solid fa-pen-to-square text-xs"></i>
              </button>
              <button onclick="window.deleteJadwal('${docId}', '${safeKelompok}')" class="text-slate-400 hover:text-rose-400 p-1.5 transition cursor-pointer" title="Hapus Jadwal">
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
          </div>
          <div class="bg-slate-800/50 p-3 rounded-xl border border-slate-700/30">
            <p class="text-[11px] font-semibold text-slate-400 mb-1">Daftar Petugas Jaga:</p>
            ${petugasHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error("Gagal memuat jadwal:", err);
    container.innerHTML = `<p class="text-xs text-rose-400 text-center py-3">Gagal memuat data dari database.</p>`;
  }
};

window.deleteJadwal = async function(docId, kelompok) {
  if (confirm(`Hapus jadwal untuk kelompok "${kelompok}"?`)) {
    try {
      const { db } = await import('./db.js');
      const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

      await deleteDoc(doc(db, "schedules", docId));
      window.showToast(`Jadwal "${kelompok}" berhasil dihapus.`);
      window.loadJadwalFromFirestore();
    } catch (err) {
      console.error("Gagal menghapus jadwal:", err);
      window.showToast("Gagal menghapus jadwal.", "error");
    }
  }
};

window.submitJadwalRonda = async function() {
  const editId = document.getElementById('edit-jadwal-doc-id')?.value;
  const selectPasaran = document.getElementById('jadwal-pasaran');
  const inputKelompok = document.getElementById('jadwal-kelompok');
  const textareaPetugas = document.getElementById('jadwal-petugas');

  const pasaran = selectPasaran ? selectPasaran.value : '';
  const kelompok = inputKelompok ? inputKelompok.value.trim() : '';
  const petugasText = textareaPetugas ? textareaPetugas.value.trim() : '';

  if (!pasaran || !kelompok || !petugasText) {
    window.showToast("Semua kolom wajib diisi!", "warning");
    return;
  }

  const petugasList = petugasText.split(/,|\n/).map(p => p.trim()).filter(p => p);

  try {
    const { db } = await import('./db.js');
    const { collection, addDoc, doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    if (editId) {
      await updateDoc(doc(db, "schedules", editId), {
        pasaran: pasaran,
        kelompok: kelompok,
        petugas: petugasText,
        petugasList: petugasList,
        updatedAt: new Date().toISOString()
      });
      window.showToast(`Jadwal "${kelompok}" berhasil diperbarui!`);
    } else {
      await addDoc(collection(db, "schedules"), {
        pasaran: pasaran,
        kelompok: kelompok,
        petugas: petugasText,
        petugasList: petugasList,
        createdAt: new Date().toISOString()
      });
      window.showToast(`Jadwal "${kelompok}" (${pasaran}) berhasil disimpan!`);
    }

    if (typeof window.closeJadwalModal === 'function') {
      window.closeJadwalModal();
    }

    window.loadJadwalFromFirestore();

  } catch (err) {
    console.error("Gagal menyimpan jadwal:", err);
    window.showToast("Gagal menyimpan jadwal: " + err.message, "error");
  }
};

// ==========================================
// 15. FUNGSI MEMUAT SELURUH JADWAL KESELURUHAN (READ-ONLY)
// ==========================================
window.loadAllJadwalPageData = async function() {
  const container = document.getElementById('all-jadwal-container');
  const countBadge = document.getElementById('total-regu-badge');
  if (!container) return;

  container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Memuat seluruh data jadwal...</p>`;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const querySnapshot = await getDocs(collection(db, "schedules"));
    if (querySnapshot.empty) {
      if(countBadge) countBadge.innerText = "0 Regu";
      container.innerHTML = `
        <div class="bg-slate-800/60 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
          <i class="fa-solid fa-calendar-xmark text-amber-400 text-2xl"></i>
          <p class="text-xs text-slate-300 font-semibold">Belum ada jadwal ronda terdaftar di database.</p>
          <p class="text-[11px] text-slate-400">Silakan tambahkan jadwal melalui menu Pengaturan.</p>
        </div>
      `;
      return;
    }

    if(countBadge) countBadge.innerText = `${querySnapshot.size} Regu Aktif`;

    let html = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const kelompok = data.kelompok || 'Tanpa Nama Kelompok';
      const pasaran = data.pasaran || '-';
      
      let petugasArray = [];
      if (Array.isArray(data.petugasList) && data.petugasList.length > 0) {
        petugasArray = data.petugasList;
      } else if (typeof data.petugas === 'string') {
        petugasArray = data.petugas.split(/,|\n/).map(p => p.trim()).filter(p => p);
      }

      let petugasHtml = '<div class="space-y-2 mt-2">';
      petugasArray.forEach((namaPetugas, idx) => {
        const initials = namaPetugas.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const posNumber = (idx % 4) + 1;

        petugasHtml += `
          <div class="bg-slate-800/60 border border-slate-700/50 p-3 rounded-xl flex items-center justify-between">
            <div class="flex items-center space-x-2.5">
              <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px] text-emerald-400 ring-1 ring-emerald-500/30 shrink-0">
                ${initials}
              </div>
              <div>
                <p class="font-bold text-xs text-white">
                  <span class="text-emerald-400 font-bold mr-1.5">${idx + 1}.</span>${namaPetugas}
                </p>
                <p class="text-[10px] text-slate-400">${idx === 0 ? 'Komandan Regu (Koordinator)' : 'Anggota Ronda'}</p>
              </div>
            </div>
            <span class="text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-lg font-semibold shrink-0">Pos ${posNumber}</span>
          </div>
        `;
      });
      petugasHtml += '</div>';

      html += `
        <div class="bg-slate-800/50 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-sm hover:border-emerald-500/40 transition duration-300">
          <div class="flex items-center justify-between border-b border-slate-700/50 pb-3">
            <div class="flex items-center space-x-2">
              <span class="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">${pasaran}</span>
              <h4 class="font-bold text-sm text-white">${kelompok}</h4>
            </div>
            <span class="text-xs text-slate-400 font-medium">${petugasArray.length} Personil</span>
          </div>
          <div>
            <p class="text-[11px] font-semibold text-slate-400 mb-1">Daftar Petugas Jaga:</p>
            ${petugasHtml}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (err) {
    console.error("Gagal memuat seluruh jadwal:", err);
    container.innerHTML = `<p class="text-xs text-rose-400 text-center py-4">Gagal memuat data dari database.</p>`;
  }
};

// ==========================================
// 16. FUNGSI PUSAT LAPORAN & KONTROL MODAL
// ==========================================
window.openLaporanModal = function() {
  const modal = document.getElementById('local-laporan-modal');
  const card = document.getElementById('local-laporan-card');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('translate-y-full', 'sm:scale-95');
        card.classList.add('translate-y-0', 'sm:scale-100');
      }
    }, 10);
  }
};

window.closeLaporanModal = function() {
  const modal = document.getElementById('local-laporan-modal');
  const card = document.getElementById('local-laporan-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('translate-y-0', 'sm:scale-100');
    card.classList.add('translate-y-full', 'sm:scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      const jenis = document.getElementById('laporan-jenis');
      const pelapor = document.getElementById('laporan-pelapor');
      const ket = document.getElementById('laporan-keterangan');
      if (jenis) jenis.selectedIndex = 0;
      if (pelapor) pelapor.value = '';
      if (ket) ket.value = '';
    }, 300);
  }
};

window.submitLaporanRonda = async function() {
  const jenis = document.getElementById('laporan-jenis')?.value;
  const pelapor = document.getElementById('laporan-pelapor')?.value.trim();
  const keterangan = document.getElementById('laporan-keterangan')?.value.trim();

  if (!pelapor || !keterangan) {
    window.showToast("Nama pelapor dan keterangan wajib diisi!", "warning");
    return;
  }

  try {
    const { db } = await import('./db.js');
    const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    const now = new Date();
    const timestampStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ' • ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ' WIB';

    await addDoc(collection(db, "laporan"), {
      jenis: jenis,
      pelapor: pelapor,
      keterangan: keterangan,
      pasaran: window.currentActivePasaran || 'Wage',
      waktu: timestampStr,
      createdAt: now.toISOString()
    });

    window.closeLaporanModal();
    window.showToast("Laporan berhasil dikirim ke database!");
    window.loadLaporanFromFirestore();

  } catch (err) {
    console.error("Gagal mengirim laporan:", err);
    window.showToast("Gagal mengirim laporan: " + err.message, "error");
  }
};

window.loadLaporanFromFirestore = async function() {
  const container = document.getElementById('laporan-list-container');
  const statTotal = document.getElementById('stat-total');
  const statAman = document.getElementById('stat-aman');
  const statKejadian = document.getElementById('stat-kejadian');

  if (!container) return;

  container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Memuat riwayat laporan...</p>`;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const querySnapshot = await getDocs(collection(db, "laporan"));

    const currentUserRole = localStorage.getItem('userRole') || 'Admin Sistem';
    const isAdmin = currentUserRole === 'Admin Sistem';

    let total = 0;
    let amanCount = 0;
    let kejadianCount = 0;
    let html = '';

    const targetPasaran = window.currentActivePasaran || '';

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const laporanPasaran = data.pasaran || 'Wage';

      if (targetPasaran && laporanPasaran !== targetPasaran) {
        return;
      }

      total++;
      const docId = docSnap.id;
      const jenis = data.jenis || 'Patroli Rutin';
      const pelapor = data.pelapor || 'Petugas Ronda';
      const keterangan = data.keterangan || '-';
      const waktu = data.waktu || 'Baru saja';

      let badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      let iconClass = 'fa-circle-check text-emerald-400';

      if (jenis.toLowerCase().includes('kejadian') || jenis.toLowerCase().includes('mencurigakan')) {
        kejadianCount++;
        badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
        iconClass = 'fa-triangle-exclamation text-amber-400';
      } else {
        amanCount++;
      }

      const safeJenis = jenis.replace(/'/g, "\\'");
      const safePelapor = pelapor.replace(/'/g, "\\'");
      const safeKeterangan = keterangan.replace(/'/g, "\\'").replace(/\n/g, '\\n');

      html += `
        <div class="bg-slate-800/50 border border-slate-800 p-4 rounded-2xl space-y-2.5 shadow-sm hover:border-purple-500/40 transition">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold px-2.5 py-1 rounded-lg border ${badgeColor} flex items-center space-x-1.5">
              <i class="fa-solid ${iconClass}"></i>
              <span>${jenis}</span>
            </span>
            <div class="flex items-center space-x-2">
              <span class="text-[11px] text-slate-400 font-medium">${waktu}</span>
              <button type="button" onclick="window.openEditLaporanModal('${docId}', '${safeJenis}', '${safePelapor}', '${safeKeterangan}')" class="w-7 h-7 bg-slate-700 hover:bg-amber-600 text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition text-xs cursor-pointer" title="Edit Laporan">
                <i class="fa-solid fa-pen"></i>
              </button>
              ${isAdmin ? `
              <button type="button" onclick="window.deleteLaporan('${docId}')" class="w-7 h-7 bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition text-xs cursor-pointer" title="Hapus Laporan">
                <i class="fa-solid fa-trash"></i>
              </button>` : ''}
            </div>
          </div>
          <div>
            <p class="font-bold text-sm text-white mb-0.5">${keterangan}</p>
            <p class="text-xs text-slate-400 flex items-center mt-1">
              <i class="fa-solid fa-user-shield text-[10px] mr-1.5 text-purple-400"></i> Pelapor: <span class="text-slate-200 font-medium ml-1">${pelapor}</span>
              <span class="ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">Pasaran: ${laporanPasaran}</span>
            </p>
          </div>
        </div>
      `;
    });

    if(statTotal) statTotal.innerText = total;
    if(statAman) statAman.innerText = amanCount;
    if(statKejadian) statKejadian.innerText = kejadianCount;

    if (total === 0) {
      container.innerHTML = `
        <div class="bg-slate-800/60 border border-slate-800 p-6 rounded-2xl text-center space-y-2">
          <i class="fa-solid fa-file-circle-exclamation text-slate-400 text-2xl"></i>
          <p class="text-xs text-slate-300 font-semibold">Belum ada catatan laporan untuk pasaran ${targetPasaran}.</p>
          <p class="text-[11px] text-slate-400">Silakan buat laporan baru melalui tombol di atas.</p>
        </div>
      `;
    } else {
      container.innerHTML = html;
    }

  } catch (err) {
    console.error("Gagal memuat laporan:", err);
    container.innerHTML = `<p class="text-xs text-rose-400 text-center py-4">Gagal memuat data laporan dari database.</p>`;
  }
};

window.openEditLaporanModal = function(docId, jenis, pelapor, keterangan) {
  const idEl = document.getElementById('edit-laporan-id');
  const jenisEl = document.getElementById('edit-laporan-jenis');
  const pelaporEl = document.getElementById('edit-laporan-pelapor');
  const ketEl = document.getElementById('edit-laporan-keterangan');

  if (idEl) idEl.value = docId;
  if (jenisEl) jenisEl.value = jenis;
  if (pelaporEl) pelaporEl.value = pelapor;
  if (ketEl) ketEl.value = keterangan;

  const modal = document.getElementById('local-edit-laporan-modal');
  const card = document.getElementById('local-edit-laporan-card');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('translate-y-full', 'sm:scale-95');
        card.classList.add('translate-y-0', 'sm:scale-100');
      }
    }, 10);
  }
};

window.closeEditLaporanModal = function() {
  const modal = document.getElementById('local-edit-laporan-modal');
  const card = document.getElementById('local-edit-laporan-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('translate-y-0', 'sm:scale-100');
    card.classList.add('translate-y-full', 'sm:scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
};

window.submitUpdateLaporan = async function() {
  const docId = document.getElementById('edit-laporan-id')?.value;
  const jenis = document.getElementById('edit-laporan-jenis')?.value;
  const pelapor = document.getElementById('edit-laporan-pelapor')?.value.trim();
  const keterangan = document.getElementById('edit-laporan-keterangan')?.value.trim();

  if (!pelapor || !keterangan) {
    window.showToast("Nama pelapor dan keterangan wajib diisi!", "warning");
    return;
  }

  try {
    const { db } = await import('./db.js');
    const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    await updateDoc(doc(db, "laporan", docId), {
      jenis: jenis,
      pelapor: pelapor,
      keterangan: keterangan,
      updatedAt: new Date().toISOString()
    });

    window.closeEditLaporanModal();
    window.showToast("Laporan berhasil diperbarui!");
    window.loadLaporanFromFirestore();
  } catch (err) {
    console.error("Gagal memperbarui laporan:", err);
    window.showToast("Gagal memperbarui laporan: " + err.message, "error");
  }
};

window.deleteLaporan = async function(docId) {
  if (confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
    try {
      const { db } = await import('./db.js');
      const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

      await deleteDoc(doc(db, "laporan", docId));
      window.showToast("Laporan berhasil dihapus.");
      window.loadLaporanFromFirestore();
    } catch (err) {
      console.error("Gagal menghapus laporan:", err);
      window.showToast("Gagal menghapus laporan.", "error");
    }
  }
};

// ==========================================
// 17. FUNGSI MANAJEMEN PERATURAN & HOME JIMBITAN SUMMARY
// ==========================================
window.loadPeraturanFromFirestore = async function() {
  const inputJudul = document.getElementById('peraturan-judul');
  const inputIsi = document.getElementById('peraturan-isi');
  const editIdPeraturan = document.getElementById('edit-peraturan-id');

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const querySnapshot = await getDocs(collection(db, "peraturan"));
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data();

      if (editIdPeraturan) editIdPeraturan.value = docSnap.id;
      if (inputJudul) inputJudul.value = data.judul || '';
      if (inputIsi) inputIsi.value = data.isi || '';
    }
  } catch (err) {
    console.error("Gagal memuat peraturan dari database:", err);
  }
};

window.savePeraturanToFirestore = async function() {
  const inputJudul = document.getElementById('peraturan-judul');
  const inputIsi = document.getElementById('peraturan-isi');
  const editIdPeraturan = document.getElementById('edit-peraturan-id');

  const judul = inputJudul ? inputJudul.value.trim() : '';
  const isi = inputIsi ? inputIsi.value.trim() : '';
  const docId = editIdPeraturan ? editIdPeraturan.value : '';

  if (!judul || !isi) {
    window.showToast("Judul dan isi peraturan wajib diisi!", "warning");
    return;
  }

  try {
    const { db } = await import('./db.js');
    const { collection, addDoc, doc, updateDoc, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    if (docId) {
      await updateDoc(doc(db, "peraturan", docId), {
        judul: judul,
        isi: isi,
        updatedAt: new Date().toISOString()
      });
    } else {
      const querySnapshot = await getDocs(collection(db, "peraturan"));
      if (!querySnapshot.empty) {
        const existingId = querySnapshot.docs[0].id;
        await updateDoc(doc(db, "peraturan", existingId), {
          judul: judul,
          isi: isi,
          updatedAt: new Date().toISOString()
        });
        if (editIdPeraturan) editIdPeraturan.value = existingId;
      } else {
        const newDocRef = await addDoc(collection(db, "peraturan"), {
          judul: judul,
          isi: isi,
          createdAt: new Date().toISOString()
        });
        if (editIdPeraturan) editIdPeraturan.value = newDocRef.id;
      }
    }

    window.showToast("Peraturan ronda berhasil diperbarui ke database!");
  } catch (err) {
    console.error("Gagal menyimpan peraturan:", err);
    window.showToast("Gagal menyimpan peraturan: " + err.message, "error");
  }
};

window.loadPeraturanToHome = async function() {
  const container = document.getElementById('home-peraturan-container');
  if (!container) return;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const querySnapshot = await getDocs(collection(db, "peraturan"));
    
    if (querySnapshot.empty) {
      container.innerHTML = `<p class="text-xs text-slate-400 text-center py-2">Belum ada peraturan tercatat di database.</p>`;
      return;
    }

    let html = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const judul = data.judul || 'Ketentuan Ronda';
      const isi = data.isi || '-';

      html += `
        <div class="border-b border-slate-800/60 pb-2.5 last:border-none last:pb-0">
          <h4 class="font-bold text-xs text-purple-300 mb-1"><i class="fa-solid fa-circle-check text-[10px] mr-1.5 text-emerald-400"></i>${judul}</h4>
          <p class="text-xs text-slate-300 leading-relaxed">${isi}</p>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error("Gagal memuat peraturan ke home:", err);
    container.innerHTML = `
      <h4 class="font-bold text-xs text-purple-300 mb-1"><i class="fa-solid fa-circle-check text-[10px] mr-1.5 text-emerald-400"></i>Wajib Patroli Setiap 2 Jam</h4>
      <p class="text-xs text-slate-300 leading-relaxed">Petugas wajib melakukan patroli keliling wilayah RT 04 melewati Pos 1 hingga Pos 4 secara berurutan serta melakukan pemindaian QR Code di setiap titik pos.</p>
    `;
  }
};

// Fungsi Rekapitulasi Jimpitan Hari Ini untuk Halaman Home
window.loadHomeJimpitanSummary = async function() {
  const totalNominalEl = document.getElementById('stat-total-nominal');
  const scannedCountEl = document.getElementById('stat-scanned-count');
  const pasangCountEl = document.getElementById('stat-pasang-count');
  const tidakPasangCountEl = document.getElementById('stat-tidak-pasang-count');
  const progressTextEl = document.getElementById('stat-progress-text');
  const progressBarEl = document.getElementById('stat-progress-bar');
  const badgeEl = document.getElementById('jimpitan-nominal-badge');

  if (!totalNominalEl) return;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs, doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    let tarifJimpitan = "1.000";
    const wilayahSnap = await getDoc(doc(db, "settings", "wilayah"));
    if (wilayahSnap.exists()) {
      tarifJimpitan = wilayahSnap.data().nilaiJimpitan || "1.000";
    }
    if (badgeEl) badgeEl.innerText = `Tarif: Rp ${tarifJimpitan}`;

    const wargaSnap = await getDocs(collection(db, "warga"));
    const totalWarga = wargaSnap.size;

    const scanSnap = await getDocs(collection(db, "scan_history"));
    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    let scannedCount = 0;
    let pasangCount = 0;
    let tidakPasangCount = 0;
    let totalNominalNum = 0;

    scanSnap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.waktu && data.waktu.includes(todayStr)) {
        scannedCount++;
        if (data.statusJimpitan === 'Pasang') {
          pasangCount++;
          const cleanNominal = parseInt(String(data.nominal || '0').replace(/\./g, ''), 10) || 0;
          totalNominalNum += cleanNominal;
        } else {
          tidakPasangCount++;
        }
      }
    });

    totalNominalEl.innerText = `Rp ${totalNominalNum.toLocaleString('id-ID')}`;
    scannedCountEl.innerText = `${scannedCount} / ${totalWarga}`;
    pasangCountEl.innerText = pasangCount;
    tidakPasangCountEl.innerText = tidakPasangCount;

    const percentage = totalWarga > 0 ? Math.round((scannedCount / totalWarga) * 100) : 0;
    if (progressTextEl) progressTextEl.innerText = `${percentage}%`;
    if (progressBarEl) progressBarEl.style.width = `${Math.min(percentage, 100)}%`;

  } catch (err) {
    console.error("Gagal memuat rekap jimpitan home:", err);
  }
};

// ==========================================
// 18. FUNGSI MANAJEMEN HAK AKSES
// ==========================================
window.fetchRolePermissions = async function() {
  const roleSelector = document.getElementById('role-selector');
  if (!roleSelector) return;
  const roleKey = roleSelector.value;

  try {
    const { db } = await import('./db.js');
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    
    const docRef = doc(db, "role_permissions", roleKey);
    const docSnap = await getDoc(docRef);

    const pHome = document.getElementById('perm-home');
    const kJadwal = document.getElementById('perm-jadwal');
    const pLaporan = document.getElementById('perm-laporan');
    const pScan = document.getElementById('perm-scan');
    const pSetting = document.getElementById('perm-setting');
    const pUser = document.getElementById('perm-usermgmt');

    if (docSnap.exists()) {
      const data = docSnap.data();
      if(pHome) pHome.checked = !!data.home;
      if(kJadwal) kJadwal.checked = !!data.jadwal;
      if(pLaporan) pLaporan.checked = !!data.laporan;
      if(pScan) pScan.checked = !!data.scan;
      if(pSetting) pSetting.checked = !!data.setting;
      if(pUser) pUser.checked = !!data.usermgmt;
    } else {
      if (roleKey === 'admin') {
        if(pHome) pHome.checked = true;
        if(kJadwal) kJadwal.checked = true;
        if(pLaporan) pLaporan.checked = true;
        if(pScan) pScan.checked = true;
        if(pSetting) pSetting.checked = true;
        if(pUser) pUser.checked = true;
      } else if (roleKey === 'koordinator') {
        if(pHome) pHome.checked = true;
        if(kJadwal) kJadwal.checked = true;
        if(pLaporan) pLaporan.checked = true;
        if(pScan) pScan.checked = true;
        if(pSetting) pSetting.checked = true;
        if(pUser) pUser.checked = false;
      } else {
        if(pHome) pHome.checked = true;
        if(kJadwal) kJadwal.checked = true;
        if(pLaporan) pLaporan.checked = true;
        if(pScan) pScan.checked = true;
        if(pSetting) pSetting.checked = false;
        if(pUser) pUser.checked = false;
      }
    }
  } catch (err) {
    console.error("Gagal mengambil hak akses:", err);
  }
};

window.saveHakAkses = async function() {
  const roleSelector = document.getElementById('role-selector');
  if (!roleSelector) return;
  
  const roleKey = roleSelector.value;
  const roleName = roleSelector.options[roleSelector.selectedIndex].text;

  const permissions = {
    home: document.getElementById('perm-home')?.checked || false,
    jadwal: document.getElementById('perm-jadwal')?.checked || false,
    laporan: document.getElementById('perm-laporan')?.checked || false,
    scan: document.getElementById('perm-scan')?.checked || false,
    setting: document.getElementById('perm-setting')?.checked || false,
    usermgmt: document.getElementById('perm-usermgmt')?.checked || false,
    updatedAt: new Date().toISOString()
  };

  try {
    const { db } = await import('./db.js');
    const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    await setDoc(doc(db, "role_permissions", roleKey), permissions);
    window.showToast(`Hak akses untuk "${roleName}" berhasil disimpan ke Firebase!`);
  } catch (err) {
    console.error("Gagal menyimpan hak akses:", err);
    window.showToast("Gagal menyimpan perubahan: " + err.message, "error");
  }
};

// ==========================================
// 19. FUNGSI SCAN, PENCARIAN MANUAL, VALIDASI DUPLIKASI & EDIT/HAPUS RIWAYAT
// ==========================================
let scannedWargaData = null;
let cachedNilaiJimpitan = "1.000";
let allWargaCache = [];

window.openManualScanModal = async function() {
  const modal = document.getElementById('manual-scan-modal');
  const card = document.getElementById('manual-scan-card');
  const container = document.getElementById('manual-warga-list-container');
  const searchInput = document.getElementById('search-warga-input');

  if (searchInput) searchInput.value = '';
  if (container) {
    container.innerHTML = `<div class="text-center py-6 text-xs text-slate-400">Memuat daftar warga...</div>`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
      }
    }, 10);
  }

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    const querySnapshot = await getDocs(collection(db, "warga"));

    allWargaCache = [];
    querySnapshot.forEach((docSnap) => {
      allWargaCache.push({ id: docSnap.id, ...docSnap.data() });
    });

    window.renderWargaList(allWargaCache);
  } catch (err) {
    console.error("Gagal memuat warga:", err);
    if (container) {
      container.innerHTML = `<div class="text-center py-6 text-xs text-rose-400">Gagal memuat data warga dari database.</div>`;
    }
  }
};

window.closeManualScanModal = function() {
  const modal = document.getElementById('manual-scan-modal');
  const card = document.getElementById('manual-scan-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
};

window.renderWargaList = function(wargaArray) {
  const container = document.getElementById('manual-warga-list-container');
  if (!container) return;

  if (wargaArray.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-xs text-slate-400">Tidak ada data warga ditemukan.</div>`;
    return;
  }

  let html = '';
  wargaArray.forEach((warga) => {
    const safeNoKK = String(warga.nokk || '').replace(/'/g, "\\'");

    html += `
      <button type="button" onclick="window.selectWargaManual('${safeNoKK}')" class="w-full text-left bg-slate-800/80 hover:bg-purple-600/25 hover:border-purple-500/50 border border-slate-700/60 p-3 rounded-2xl transition flex items-center justify-between cursor-pointer group">
        <div>
          <p class="font-bold text-xs text-white group-hover:text-purple-300">${warga.namakk || '-'}</p>
          <p class="text-[10px] text-slate-400 font-mono mt-0.5">No. KK: ${warga.nokk || '-'}</p>
        </div>
        <div class="w-7 h-7 bg-slate-700 group-hover:bg-purple-600 text-slate-300 group-hover:text-white rounded-xl flex items-center justify-center transition text-xs">
          <i class="fa-solid fa-chevron-right text-[10px]"></i>
        </div>
      </button>
    `;
  });

  container.innerHTML = html;
};

window.filterWargaList = function() {
  const keyword = document.getElementById('search-warga-input')?.value.toLowerCase() || '';
  const filtered = allWargaCache.filter(w => 
    (w.namakk && w.namakk.toLowerCase().includes(keyword)) || 
    (w.nokk && w.nokk.toLowerCase().includes(keyword))
  );
  window.renderWargaList(filtered);
};

window.selectWargaManual = function(nokk) {
  window.closeManualScanModal();
  window.handleQRCodeScanned(nokk);
};

window.handleQRCodeScanned = async function(noKKInput) {
  const cleanNoKK = String(noKKInput).trim();
  if (!cleanNoKK) return;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs, query, where } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const historyQuery = query(collection(db, "scan_history"), where("nokk", "==", cleanNoKK));
    const historySnapshot = await getDocs(historyQuery);

    let alreadyRecordedToday = false;
    historySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.waktu && data.waktu.includes(todayStr)) {
        alreadyRecordedToday = true;
      }
    });

    if (alreadyRecordedToday) {
      if (typeof window.showToast === 'function') {
        window.showToast(`Warga dengan No. KK "${cleanNoKK}" sudah diabsen/jimpitan hari ini!`, "warning");
      }
      return;
    }

    const q = query(collection(db, "warga"), where("nokk", "==", cleanNoKK));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      if (typeof window.showToast === 'function') {
        window.showToast(`No. KK "${cleanNoKK}" tidak ditemukan dalam database warga!`, "warning");
      }
      return;
    }

    const docSnap = querySnapshot.docs[0];
    scannedWargaData = {
      id: docSnap.id,
      ...docSnap.data()
    };

    window.openJimpitanConfirmModal();
  } catch (err) {
    console.error("Gagal mencocokkan No. KK:", err);
    if (typeof window.showToast === 'function') {
      window.showToast("Terjadi kesalahan saat membaca data warga.", "error");
    }
  }
};

window.openJimpitanConfirmModal = async function() {
  if (!scannedWargaData) return;

  try {
    const { db } = await import('./db.js');
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    const docSnap = await getDoc(doc(db, "settings", "wilayah"));
    if (docSnap.exists()) {
      cachedNilaiJimpitan = docSnap.data().nilaiJimpitan || "1.000";
    }
  } catch (err) {
    console.error("Gagal ambil konfigurasi jimpitan:", err);
  }

  const modal = document.getElementById('jimpitan-confirm-modal');
  const card = document.getElementById('jimpitan-confirm-card');
  const namaEl = document.getElementById('modal-nama-kk');
  const nokkEl = document.getElementById('modal-nokk');
  const nominalEl = document.getElementById('modal-info-nominal');

  if (namaEl) namaEl.innerText = scannedWargaData.namakk || 'Tanpa Nama';
  if (nokkEl) nokkEl.innerText = `No. KK: ${scannedWargaData.nokk || '-'}`;
  if (nominalEl) nominalEl.innerText = `Nominal Jimpitan: Rp ${cachedNilaiJimpitan}`;

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
      }
    }, 10);
  }
};

window.closeJimpitanConfirmModal = function() {
  const modal = document.getElementById('jimpitan-confirm-modal');
  const card = document.getElementById('jimpitan-confirm-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      scannedWargaData = null;
    }, 300);
  }
};

window.submitJadwalJimpitan = async function(statusPilihan) {
  if (!scannedWargaData) return;

  const petugasName = localStorage.getItem('ronda_user') || 'Petugas Ronda';
  const nominalNilai = statusPilihan === 'Pasang' ? cachedNilaiJimpitan : '0';

  try {
    const { db } = await import('./db.js');
    const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ' WIB';
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    await addDoc(collection(db, "scan_history"), {
      nokk: scannedWargaData.nokk,
      namakk: scannedWargaData.namakk,
      statusJimpitan: statusPilihan,
      nominal: nominalNilai,
      petugas: petugasName,
      waktu: `${dateStr} • ${timeStr}`,
      createdAt: now.toISOString()
    });

    window.closeJimpitanConfirmModal();
    if (typeof window.showToast === 'function') {
      window.showToast(`Berhasil mencatat: ${scannedWargaData.namakk} (${statusPilihan})!`);
    }
    window.loadScanHistory();
  } catch (err) {
    console.error("Gagal menyimpan jimpitan:", err);
    if (typeof window.showToast === 'function') {
      window.showToast("Gagal menyimpan ke database: " + err.message, "error");
    }
  }
};

window.openEditJimpitanModal = function(historyId, nama, nokk, currentStatus) {
  const idEl = document.getElementById('edit-history-id');
  const namaEl = document.getElementById('edit-modal-nama');
  const nokkEl = document.getElementById('edit-modal-nokk');
  const statusEl = document.getElementById('edit-modal-status');

  if (idEl) idEl.value = historyId;
  if (namaEl) namaEl.innerText = nama;
  if (nokkEl) nokkEl.innerText = nokk;
  if (statusEl) statusEl.value = currentStatus;

  const modal = document.getElementById('edit-jimpitan-modal');
  const card = document.getElementById('edit-jimpitan-card');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (card) {
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
      }
    }, 10);
  }
};

window.closeEditJimpitanModal = function() {
  const modal = document.getElementById('edit-jimpitan-modal');
  const card = document.getElementById('edit-jimpitan-card');
  if (modal && card) {
    modal.classList.add('opacity-0');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
};

window.submitUpdateJimpitan = async function() {
  const historyId = document.getElementById('edit-history-id')?.value;
  const newStatus = document.getElementById('edit-modal-status')?.value;

  if (!historyId || !newStatus) return;

  try {
    const { db } = await import('./db.js');
    const { doc, getDoc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    const docRef = doc(db, "scan_history", historyId);
    const settingsSnap = await getDoc(doc(db, "settings", "wilayah"));
    const nominalPasang = settingsSnap.exists() ? (settingsSnap.data().nilaiJimpitan || "1.000") : "1.000";
    const nominalFinal = newStatus === 'Pasang' ? nominalPasang : '0';

    await updateDoc(docRef, {
      statusJimpitan: newStatus,
      nominal: nominalFinal,
      updatedAt: new Date().toISOString()
    });

    window.closeEditJimpitanModal();
    if (typeof window.showToast === 'function') {
      window.showToast("Status jimpitan berhasil diperbarui!");
    }
    window.loadScanHistory();
  } catch (err) {
    console.error("Gagal memperbarui jimpitan:", err);
    if (typeof window.showToast === 'function') {
      window.showToast("Gagal memperbarui data: " + err.message, "error");
    }
  }
};

window.deleteScanHistory = async function(historyId, namaWarga) {
  if (confirm(`Hapus catatan jimpitan untuk warga "${namaWarga}"?`)) {
    try {
      const { db } = await import('./db.js');
      const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

      await deleteDoc(doc(db, "scan_history", historyId));
      if (typeof window.showToast === 'function') {
        window.showToast(`Catatan jimpitan "${namaWarga}" berhasil dihapus.`);
      }
      window.loadScanHistory();
    } catch (err) {
      console.error("Gagal menghapus riwayat:", err);
      if (typeof window.showToast === 'function') {
        window.showToast("Gagal menghapus data.", "error");
      }
    }
  }
};

window.loadScanHistory = async function() {
  const container = document.getElementById('scan-history-container');
  if (!container) return;

  try {
    const { db } = await import('./db.js');
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    const querySnapshot = await getDocs(collection(db, "scan_history"));
    if (querySnapshot.empty) {
      container.innerHTML = `
        <div class="bg-slate-900/60 border border-slate-700/50 p-3 rounded-2xl text-center text-xs text-slate-400">
          Belum ada catatan jimpitan warga hari ini.
        </div>
      `;
      return;
    }

    let html = '';
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const docId = docSnap.id;
      const isPasang = data.statusJimpitan === 'Pasang';
      const badgeColor = isPasang ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      const iconClass = isPasang ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-400';

      const safeNama = String(data.namakk || 'Warga').replace(/'/g, "\\'");
      const safeNoKK = String(data.nokk || '-').replace(/'/g, "\\'");
      const safeStatus = String(data.statusJimpitan || 'Tidak').replace(/'/g, "\\'");

      html += `
        <div class="bg-slate-900/60 border border-slate-700/50 p-3 rounded-2xl flex items-center justify-between text-xs">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-xl ${badgeColor} border flex items-center justify-center font-bold shrink-0">
              <i class="fa-solid ${iconClass}"></i>
            </div>
            <div>
              <p class="font-bold text-white">${data.namakk || 'Warga'} <span class="text-[10px] text-purple-400 font-mono font-normal">(KK: ${data.nokk || '-'})</span></p>
              <p class="text-[10px] text-slate-400">Petugas: ${data.petugas || 'Petugas'} • <span class="text-emerald-400 font-semibold">Rp ${data.nominal || '0'}</span> • <span class="text-slate-400">${data.waktu || ''}</span></p>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 shrink-0">
            <span class="text-[10px] ${isPasang ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'} px-2 py-1 rounded-lg font-bold">${data.statusJimpitan}</span>
            
            <button type="button" onclick="window.openEditJimpitanModal('${docId}', '${safeNama}', '${safeNoKK}', '${safeStatus}')" class="w-7 h-7 bg-slate-800 hover:bg-amber-600 text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition cursor-pointer" title="Edit">
              <i class="fa-solid fa-pen text-[10px]"></i>
            </button>

            <button type="button" onclick="window.deleteScanHistory('${docId}', '${safeNama}')" class="w-7 h-7 bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white rounded-lg flex items-center justify-center transition cursor-pointer" title="Hapus">
              <i class="fa-solid fa-trash text-[10px]"></i>
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error("Gagal memuat riwayat:", err);
    container.innerHTML = `
      <div class="bg-slate-900/60 border border-slate-700/50 p-3 rounded-2xl text-center text-xs text-rose-400">
        Gagal memuat riwayat jimpitan.
      </div>
    `;
  }
};

// ==========================================
// 20. FUNGSI JAM REAL-TIME & UCAPAN OTOMATIS (HOME)
// ==========================================
window.initHomeRealTimeClock = function() {
  function updateClock() {
    const now = new Date();
    
    // Format Tanggal & Hari
    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const restDate = now.toLocaleDateString('id-ID', optionsDate);
    const dayName = now.toLocaleDateString('id-ID', { weekday: 'long' });
    
    // Perhitungan Pasaran Jawa Otomatis
    function getJawaPasaran(date) {
      const pasaranList = ['Pon', 'Wage', 'Kliwon', 'Legi', 'Pahing'];
      const acuan = new Date(2000, 0, 1);
      const selisihHari = Math.floor((date - acuan) / (1000 * 60 * 60 * 24));
      let indexPasaran = (selisihHari % 5);
      if (indexPasaran < 0) indexPasaran += 5;
      return pasaranList[indexPasaran];
    }

    const finalDateStr = `${dayName} ${getJawaPasaran(now)}, ${restDate}`;
    
    // Format Jam Menit
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes} WIB`;
    
    // Penentuan Ucapan Otomatis Berdasarkan Waktu
    const hourNum = now.getHours();
    let greeting = "Selamat malam";
    if (hourNum >= 3 && hourNum < 11) {
      greeting = "Selamat pagi";
    } else if (hourNum >= 11 && hourNum < 15) {
      greeting = "Selamat siang";
    } else if (hourNum >= 15 && hourNum < 18) {
      greeting = "Selamat sore";
    }

    // Tangkap elemen di DOM
    const gEl = document.getElementById('greeting-text');
    const dEl = document.getElementById('date-text');
    const tEl = document.getElementById('time-text');

    if (gEl) gEl.innerText = `${greeting}, Petugas Ronda`;
    if (dEl) dEl.innerText = finalDateStr;
    if (tEl) tEl.innerText = formattedTime;
  }

  // Jalankan langsung
  updateClock();

  // Set interval agar berjalan tiap 1 detik
  if (window._realTimeClockInterval) {
    clearInterval(window._realTimeClockInterval);
  }
  window._realTimeClockInterval = setInterval(updateClock, 1000);
};