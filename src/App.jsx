import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const INVITATION_URL = "https://vira-ogi-wedding.netlify.app";

// Kode acak 6 digit untuk kontrol tampil/sembunyi section rekening di
// halaman undangan lewat query param "rk". Harus sama persis dengan
// RK_CODE di wedding-invitation/src/App.tsx.
const RK_CODE = {
  show: "894566",
  hide: "967461",
};

const SIDES = {
  bride: {
    key: "bride",
    label: "Pengantin Wanita (Dean Savira)",
    rkCode: RK_CODE.hide,
  },
  groom: {
    key: "groom",
    label: "Pengantin Pria (Bogita Mersa Putra)",
    rkCode: RK_CODE.show,
  },
};

const capitalizeWords = (text) =>
  text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));

const buildGuestParam = (name) => name.replace(/ /g, ";").replace("&", "=");

const buildLink = (name, side) =>
  `${INVITATION_URL}?guest=${buildGuestParam(name)};&rk=${SIDES[side].rkCode}`;

// Versi Pengantin: dikirim oleh Vira & Ogi sendiri
const buildCoupleLetter = (name, side) => `Bismillahirrahmanirrahim

Assalamualaikum Wr. Wb.

Yth. ${capitalizeWords(name)}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami :

Dean Savira
          dan
Bogita Mersa Putra

Yang in sya Allah akan dilaksanakan pada:

Hari, tanggal : Minggu, 20 September 2026
Pukul             : 11.00 WIB s/d Selesai
Tempat          : Kediaman Mempelai Wanita - Jl. Pertamina RT.13 (Depan SMAN 2 Muaro Jambi), Sengeti, Muara Jambi

Berikut link undangan kami untuk info lengkap dari acara bisa kunjungi :

${buildLink(name, side)}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu

Wassalamu'alaikum Wr. Wb.
Terima Kasih.
`;

// Versi Orang Tua: dikirim atas nama orang tua kedua mempelai
const buildParentsLetter = (name, side) => `Assalamualaikum Warahmatullahi Wabarakatuh

Kepada yth.  Bpk/Ibu/Saudara/Saudari: ${capitalizeWords(name)}

Dengan tidak mengurangi rasa hormat kami mohon maaf apabila undangan cetakan belum/tidak sampai karna keterbatasan kami maka E-Undangan ini merupakan Undangan Resmi dari kami.

Dengan memohon ridho dan rahmat dari Allah SWT, kami mengharapkan kehadiran Bapak/Ibu/Saudara/Saudari di acara Resepsi Pernikahan anak kami:

Dean Savira
Putri dari Bapak Paryanto & Ibu Dewi Asmara

dan

Bogita Mersa Putra
Putra dari Bapak Syafril Hadi & Ibu Meri Azrinelti

Yang in sya Allah akan dilaksanakan pada:

Hari, tanggal : Minggu, 20 September 2026
Pukul             : 11.00 WIB s/d Selesai
Tempat          : Kediaman Mempelai Wanita - Jl. Pertamina RT.13 (Depan SMAN 2 Muaro Jambi), Sengeti, Muara Jambi

Undangan dapat diakses melalui:
${buildLink(name, side)}

Merupakan suatu kehormatan dan kebahagiaan bagi kami serta terima kasih, apabila Bapak/Ibu/Saudara/Saudari berkenan hadir memberikan do'a dan restu kepada Kedua Mempelai.

Wassalamualaikum Warahmatullahi Wabarakatuh

Paryanto & Dewi Asmara
Syafril Hadi & Meri Azrinelti
`;

const VERSIONS = {
  parents: {
    key: "parents",
    title: "Versi Orang Tua",
    sender: "Dikirim atas nama Bapak Paryanto & Ibu Dewi Asmara serta Bapak Syafril Hadi & Ibu Meri Azrinelti",
    description:
      "Bahasa lebih formal, menyebut nama orang tua kedua mempelai, dan ditutup dengan tanda tangan orang tua. Cocok untuk tamu keluarga, kolega, dan kenalan orang tua.",
    build: buildParentsLetter,
  },
  couple: {
    key: "couple",
    title: "Versi Pengantin",
    sender: "Dikirim atas nama Vira & Ogi",
    description:
      "Bahasa lebih personal, mengundang sebagai teman dan sahabat. Cocok untuk tamu dari lingkaran pengantin sendiri.",
    build: buildCoupleLetter,
  },
};

const copyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

const App = () => {
  const [name, setName] = useState("");
  const [side, setSide] = useState(null);
  const [previewKey, setPreviewKey] = useState(null);

  const trimmedName = name.trim();
  const isReady = trimmedName.length > 0 && side !== null;

  const handleCopy = (version) => {
    if (!isReady) return;
    copyToClipboard(version.build(trimmedName, side));
    Swal.fire({
      icon: "success",
      title: "Berhasil disalin 😀",
      html: `Undangan <b>${version.title}</b> untuk <b>${capitalizeWords(
        trimmedName
      )}</b> (${SIDES[side].label}) sudah ada di clipboard.<br/>Tinggal tempel (paste) di WhatsApp.`,
    });
  };

  const preview = previewKey ? VERSIONS[previewKey] : null;

  useEffect(() => {
    if (!preview) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => e.key === "Escape" && setPreviewKey(null);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [preview]);

  return (
    <div className="min-h-screen bg-[#353A3A] text-[#d4d4d4] px-4 py-10">
      <div className="mx-auto w-full max-w-xl flex flex-col gap-6">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-white">Vira & Ogi Wedding</h1>
          <p className="mt-1 text-sm text-[#b0b0b0]">
            Generator teks undangan untuk dikirim lewat WhatsApp
          </p>
        </header>

        {/* Cara pakai */}
        <section className="rounded-lg bg-[#2b2f2f] p-4">
          <h2 className="text-lg font-semibold text-white">Cara pakai</h2>
          <ol className="mt-2 list-decimal list-inside space-y-1 text-sm">
            <li>Ketik nama tamu pada kolom di bawah.</li>
            <li>
              Pilih tamu ini dari pihak <b>Pengantin Wanita</b> atau{" "}
              <b>Pengantin Pria</b>. Tamu dari pihak wanita tidak akan melihat
              section rekening di halaman undangan, tamu dari pihak pria akan
              melihatnya.
            </li>
            <li>
              Pilih versi undangan: <b>Orang Tua</b> atau <b>Pengantin</b> (lihat
              penjelasan di setiap tombol).
            </li>
            <li>Tekan tombol salin. Teks undangan lengkap otomatis tersalin.</li>
            <li>Buka WhatsApp tamu tersebut, lalu tempel (paste) dan kirim.</li>
            <li>Ulangi untuk tamu berikutnya. Setiap tamu mendapat link dengan namanya sendiri.</li>
          </ol>
        </section>

        {/* Input nama */}
        <section className="rounded-lg bg-[#2b2f2f] p-4">
          <label htmlFor="name" className="block text-lg font-semibold text-white">
            Nama tamu
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Contoh: Budi Santoso atau Budi & Ani"
            className="mt-2 w-full rounded px-3 py-2 text-[#353A3A] focus:outline-none focus:ring-2 focus:ring-[#89565C]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="mt-2 text-xs text-[#b0b0b0]">
            Nama akan ditampilkan di sapaan undangan dan di halaman web undangan.
            Untuk pasangan, pisahkan dengan tanda <b>&amp;</b>.
          </p>

          <div className="mt-4">
            <span className="block text-sm font-medium text-white">
              Tamu ini dari pihak
            </span>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              {Object.values(SIDES).map((s) => (
                <button
                  key={s.key}
                  type="button"
                  aria-pressed={side === s.key}
                  className={`w-full rounded border px-3 py-2 text-sm sm:w-auto ${
                    side === s.key
                      ? "border-[#89565C] bg-[#89565C] text-white"
                      : "border-[#3f4444] bg-[#1f2222] text-[#d4d4d4] hover:bg-[#3f4444]"
                  }`}
                  onClick={() => setSide(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-[#b0b0b0]">
              Pihak Wanita: rekening <b>disembunyikan</b>. Pihak Pria: rekening{" "}
              <b>ditampilkan</b>.
            </p>
          </div>

          <div className="mt-3 text-xs">
            <span className="text-[#b0b0b0]">Link undangan tamu ini:</span>
            <div className="mt-1 break-all rounded bg-[#1f2222] px-2 py-1 font-mono text-[#e0c9cc]">
              {isReady
                ? buildLink(trimmedName, side)
                : `${INVITATION_URL}?guest=...&rk=...`}
            </div>
          </div>
        </section>

        {/* Pilihan versi */}
        <section className="flex flex-col gap-4">
          {Object.values(VERSIONS).map((version) => (
            <div key={version.key} className="rounded-lg bg-[#2b2f2f] p-4">
              <h3 className="text-lg font-semibold text-white">{version.title}</h3>
              <p className="mt-1 text-sm font-medium text-[#e0c9cc]">{version.sender}</p>
              <p className="mt-1 text-sm text-[#b0b0b0]">{version.description}</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button
                  className="w-full rounded bg-[#89565C] px-4 py-3 font-medium text-white hover:bg-[#9c6670] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  disabled={!isReady}
                  onClick={() => handleCopy(version)}
                >
                  Salin undangan {version.title}
                </button>
                <button
                  className="w-full rounded border border-[#89565C] px-4 py-3 text-sm hover:bg-[#3f4444] sm:w-auto"
                  onClick={() => setPreviewKey(version.key)}
                >
                  Lihat contoh teks
                </button>
              </div>
            </div>
          ))}
          {!isReady && (
            <p className="text-center text-xs text-[#b0b0b0]">
              Isi nama tamu dan pilih pihak tamu terlebih dahulu untuk
              mengaktifkan tombol salin.
            </p>
          )}
        </section>

      </div>

      {/* Modal contoh teks */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:p-4"
          onClick={() => setPreviewKey(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="flex h-[92vh] w-full flex-col rounded-t-2xl bg-[#2b2f2f] sm:h-auto sm:max-h-[85vh] sm:max-w-xl sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#3f4444] px-4 py-3">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Contoh teks: {preview.title}
                </h3>
                <p className="text-xs text-[#b0b0b0]">
                  {isReady ? `Untuk ${capitalizeWords(trimmedName)}` : "Nama tamu belum diisi"}
                </p>
              </div>
              <button
                aria-label="Tutup"
                className="rounded-full px-3 py-1 text-2xl leading-none text-[#b0b0b0] hover:bg-[#3f4444] hover:text-white"
                onClick={() => setPreviewKey(null)}
              >
                &times;
              </button>
            </div>
            <pre className="flex-1 overflow-auto whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed">
              {preview.build(
                isReady ? trimmedName : "Nama Tamu",
                side ?? "bride"
              )}
            </pre>
            <div className="flex flex-col gap-2 border-t border-[#3f4444] p-4 sm:flex-row sm:justify-end">
              <button
                className="w-full rounded border border-[#89565C] px-4 py-3 text-sm hover:bg-[#3f4444] sm:w-auto"
                onClick={() => setPreviewKey(null)}
              >
                Tutup
              </button>
              <button
                className="w-full rounded bg-[#89565C] px-4 py-3 font-medium text-white hover:bg-[#9c6670] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                disabled={!isReady}
                onClick={() => {
                  handleCopy(preview);
                  setPreviewKey(null);
                }}
              >
                Salin undangan ini
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
