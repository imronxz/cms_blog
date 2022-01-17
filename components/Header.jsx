//! context/react
import { useContext } from 'react';
//! Link next/link
import Link from 'next/link';

const kategori = [
  {
    name: 'React',
    slug: 'react',
  },
  {
    name: 'Vue',
    slug: 'vue',
  },
];

const Header = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              GraphCMS
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {kategori.map((data) => (
            <Link key={data.slug} href={`/kategori/${data.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {data.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
