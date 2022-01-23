import { useState, useEffect, useRef } from 'react';

// @backend  @ -> next.js api/komentar
import { kirimKomentar } from '../services';

//TODO: @FungsiKomentForm @
function CommentForm({ slug }) {
  // @useState @
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);


  // @useRef @
  const komentEl = useRef();
  const namaEl = useRef();
  const emailEl = useRef();
  const simpanDataEl = useRef();

  // @useEffect @
  useEffect(() => {
    namaEl.current.value = window.localStorage.getItem('nama');
    emailEl.current.value = window.localStorage.getItem('email');
  }, []);

  // @kirimKomentar @
  const handleKirimKomentar = () => {
    setError(false);

    const { value: nama } = namaEl.current;
    const { value: email } = emailEl.current;
    const { value: koment } = komentEl.current;
    const { checked: simpanData } = simpanDataEl.current;

    // @dataRequired @: @koment, @nama, @email
    if (!koment || !nama || !email) {
      // jika #dataRequired yang kosong maka akan menampilkan error
      setError(true);
      return;
    }

    const komentObjek = { nama, email, koment, slug };
    console.log(komentObjek);

    if (simpanData) {
      window.localStorage.setItem('nama', nama);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('nama', nama);
      window.localStorage.removeItem('email', email);
    }

    // #backend kirim komentar

    kirimKomentar(komentObjek).then((res) => {
      setshowSuccessMessage(true);

      setTimeout(() => {
        setshowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibol border-b pb-4">Tinggalkan Komentar 👩‍🏭</h3>
      {/* TODO: gunakan #useRef komentEl */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={komentEl}
          className="p-4 outline-none w-full h-40 rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Koment anda..."
          name="koment"
        />
      </div>
      {/*TODO: gunakan #useRef namaEl dan email El */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={namaEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Nama anda..."
          name="nama"
        />
        <input
          type="email"
          ref={emailEl}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email anda..."
          name="email"
        />
      </div>
      {/*  */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={simpanDataEl}
            type="checkbox"
            id="simpanData"
            name="simpanData"
            value="true"
            className=" h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          />
          <label htmlFor="simpanData" className=" text-gray-800 cursor-pointer">
            Ingat Saya 👍
          </label>
        </div>
      </div>
      {/* jika #dataRequired yang kosong maka akan menampilkan error
      error handlers with error #useState,  */}
      {error && <p className="text-xs text-red-500">Harap isi form komentar...</p>}
      <div className="mt-8">
        {/* #kirimKomentar */}
        <button
          type="button"
          onClick={handleKirimKomentar}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
        >
          Kirim Komentar
        </button>
        {showSuccessMessage && (
          <span className="text-xl float-right font-semi-bold mt-3 text-green-500 ">
            Komentar telah dikirim 😀
          </span>
        )}
      </div>
    </div>
  );
}

// export #FungsiKomentForm
export default CommentForm;
