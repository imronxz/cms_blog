import { useEffect, useState } from 'react';
//! moment
import moment from 'moment';
//! Link next/link
import Link from 'next/link';

import { postinganTerbaru, postinganTerkait } from '../services';
import Image from 'next/image';

const PostWidget = ({ kategoris, slug }) => {
  const [postTerkait, setPostTerkait] = useState([]);

  useEffect(() => {
    if (slug && slug === undefined) {
      postinganTerkait(kategoris, slug).then((result) => {
        setPostTerkait(result);
      });
    } else {
      postinganTerbaru().then((result) => {
        setPostTerkait(result);
      });
    }
  }, [slug, kategoris]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Postingan Terkait' : 'Postingan Terbaru'}
      </h3>
      {/* Array mapping relatedPost -> ThumbnailImage.url */}
      {postTerkait.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.thumbnailImage.url}
            />
          </div>
          {/* moment Tanggal Post dan Judul/Title Post */}
          <div className="flex-grow ml-4">
            <p className="text-gray-700 text-xs">
              {moment(post.createdAt).format('DD - MMMM - YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md" key={index}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
