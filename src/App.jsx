import { useState } from "react";
import Swal from "sweetalert2";

const App = () => {
  const [name, setName] = useState("");

  const handleOnClickCopyInvitationLink = () => {
    const temp = name.replace(/ /g, ";").replace("&", "=");
    const letter = `Bismillahirrahmanirrahim

Assalamualaikum Wr. Wb.

Yth. ${name.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    })}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami :

Nadiya, S.T.
          dan
Rian Oktio Mersa Putra, S.Kom.

Yang in sya Allah akan dilaksanakan pada:

Hari, tanggal : Minggu, 13 Oktober 2024
Pukul             : 10.00 - 14.00 WIB
Tempat          : BALLROOM UIN RADEN INTAN LAMPUNG

Berikut link undangan kami untuk info lengkap dari acara bisa kunjungi :

https://nadiya-rian-wedding.netlify.app?guest=${temp};

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu

Wassalamu'alaikum Wr. Wb.
Terima Kasih.
`;

    const mySmartTextarea = document.createElement("textarea");
    mySmartTextarea.innerHTML = letter;
    document.body.appendChild(mySmartTextarea);

    mySmartTextarea.select();
    document.execCommand("copy");
    Swal.fire({
      icon: "success",
      title: "Yeay 😀",
      html: `Undangan berhasil di copy ke clipboard`,
    });
    mySmartTextarea.remove();
  };

  const handleOnClickCopyInvitationLink2 = () => {
    const temp = name.replace(/ /g, ";").replace("&", "=");
    const letter = `Assalamualaikum Warahmatullahi Wabarakatuh

Kepada yth.  Bpk/Ibu/Saudara/Saudari: ${name.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    })}

Dengan tidak mengurangi rasa hormat kami mohon maaf apabila undangan cetakan belum/tidak sampai karna keterbatasan kami maka E-Undangan ini merupakan Undangan Resmi dari kami.

Dengan memohon ridho dan rahmat dari Allah SWT, kami mengharapkan kehadiran Bapak/Ibu/Saudara/Saudari di acara Resepsi Pernikahan anak kami:

Nadiya,S.T
Putri ketiga dari Bapak Bajuri,S.H & Ibu Eviyana Hamid Jotang

dan

Rian Oktio Mersa Putra,S.Kom
Putra bungsu dari Bapak Dr.Ir.H.Syafril Hadi,M.S & Ibu Hj.Meri Azrinelti,S.T.,M.M

Yang in sya Allah akan dilaksanakan pada:

Hari, tanggal : Minggu, 13 Oktober 2024
Pukul             : 10.00 - 14.00 WIB
Tempat          : BALLROOM UIN RADEN INTAN LAMPUNG

Undangan dapat diakses melalui: 
https://nadiya-rian-wedding.netlify.app?guest=${temp};

Merupakan suatu kehormatan dan kebahagiaan bagi kami serta terima kasih, apabila Bapak/Ibu/Saudara/Saudari berkenan hadir memberikan do'a dan restu kepada Kedua Mempelai.

وَ السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ

Bajuri & Eviyana
Syafril Hadi & Meri Azrinelti
`;

    const mySmartTextarea = document.createElement("textarea");
    mySmartTextarea.innerHTML = letter;
    document.body.appendChild(mySmartTextarea);

    mySmartTextarea.select();
    document.execCommand("copy");
    Swal.fire({
      icon: "success",
      title: "Yeay 😀",
      html: `Undangan berhasil di copy ke clipboard`,
    });
    mySmartTextarea.remove();
  };

  return (
    <div className="w-screen h-screen bg-[#353A3A] flex flex-col items-center justify-start px-4 pt-16 text-[#d4d4d4] ">
      <div className="text-2xl">Nadiya & Rian Wedding</div>
      <div className="w-full mt-8 flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="px-2 py-1 rounded mt-1 text-[#353A3A] focus:border-2 focus:outline-none"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button
        className="mt-8 px-4 py-1 bg-[#89565C] rounded"
        onClick={() => handleOnClickCopyInvitationLink2()}
      >
        (Ayah) Copy Link
      </button>

      <button
        className="mt-8 px-4 py-1 bg-[#89565C] rounded"
        onClick={() => handleOnClickCopyInvitationLink()}
      >
        (Nadiya) Copy Link
      </button>
    </div>
  );
};

export default App;
