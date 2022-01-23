//! context/react
import { useContext, useEffect, useState } from 'react';
//! Link next/link
import Link from 'next/link';
//! graphql cms postingan Kategori
import { postinganKategori } from '../services';
import Head from 'next/head';

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
        <div className="md:float-left flex">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">Blog</span>
          </Link>
        </div>
        <Link href="/">
          <img src="/next.svg" className="flex w-20 ml-1 md:float-left cursor-pointer" />
        </Link>
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
