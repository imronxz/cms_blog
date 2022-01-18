//! context/react
import { useContext, useEffect, useState } from 'react';
//! Link next/link
import Link from 'next/link';
//! graphql cms postingan Kategori
import { postinganKategori } from '../services';

const Header = () => {
  const [kategories, setKategories] = useState([]);

  useEffect(() => {
    postinganKategori().then((newKategori) => {
      setKategories(newKategori);
    });
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        {/* Title Blog */}
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              Graphql ~ CMS
            </span>
          </Link>
        </div>
        {/* Mapping kategories -> kategori.nama */}
        <div className="hidden md:float-left md:contents">
          {kategories.map((kategori) => (
            <Link key={kategori.slug} href={`/kategori/${kategori.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {kategori.nama}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
