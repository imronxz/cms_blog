import { useEffect, useState } from 'react';
//! Link nextjs
import Link from 'next/link';
import { postinganKategori } from '../services';

function Categories() {
  const [kategoris, setKategories] = useState([]);

  useEffect(() => {
    postinganKategori().then((newKategori) => {
      setKategories(newKategori);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Kategori</h3>
      {/* Mapping array kategories -> kategori.nama */}
      {kategoris.map((kategori) => (
        <Link key={kategori.slug} href={`/kategori/${kategori.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">{kategori.nama}</span>
        </Link>
      ))}
    </div>
  );
}

export default Categories;
