import { useState } from "react";
import Swal from "sweetalert2";

const App = () => {
  const [name, setName] = useState("");

  const handleOnClickCopyInvitationLink = () => {
    const temp = name.replace(/ /g, ";").replace("&", "=");
    const letter = `Bismillahirrahmanirrahim

Assalamualaikum Wr. Wb.

Yth. ${name.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, teman sekaligus sahabat, untuk menghadiri acara pernikahan kami :

Nadiya, S.T.
          dan
Rian Oktio Mersa Putra, S.Kom.

Berikut link undangan kami untuk info lengkap dari acara bisa kunjungi :

https://nadiya-rian-wedding.netlify.app?guest=${temp};

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu

Mohon maaf perihal undangan hanya di bagikan melalui pesan ini. Karena suasana masih pandemi diharapkan untuk menggunakan masker dan datang pada jam yang telah ditentukan. Terima kasih banyak atas perhatiannya.

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
        onClick={() => handleOnClickCopyInvitationLink()}
      >
        Copy Invitation Link
      </button>
    </div>
  );
};

export default App;
