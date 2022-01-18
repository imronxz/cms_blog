import React from 'react';
import moment from 'moment';
import Image from 'next/image';

const DetailPostComponent = ({ post }) => {
  const blogKontent = (index, text, kontents, type) => {
    let modifTeks = text;

    if (kontents) {
      if (kontents.bold) {
        modifTeks = <b key={index}>{text}</b>;
      }
      if (kontents.italic) {
        modifTeks = <em key={index}>{text}</em>;
      }
      if (kontents.underline) {
        modifTeks = <u key={index}>{text}</u>;
      }
    }
    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index} className="text-2xl font-semibold mb-4 ">
            {modifTeks.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case 'paragraph':
        return (
          <p key={index} className="mb-6 text-justify">
            {modifTeks.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case 'heading-four':
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifTeks.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case 'image':
        return (
          <Image
            key={index}
            alt={kontents.title}
            height={kontents.height}
            width={kontents.width}
            src={kontents.src}
            priority={true}
            placeholder="true"
          />
        );
      default:
        return modifTeks;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          placeholder="true"
          src={post.thumbnailImage.url}
          // layout="fill"
          alt={post.title}
          className="object-top h-full w-full  rounded-t-lg "
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <Image
              src={post.admin.photo.url}
              alt={post.admin.nama}
              priority={true}
              placeholder="true"
              height="30px"
              width="30px"
              className="align-middle rounded-full"
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post.admin.nama}
            </p>
          </div>
          {/* logo svg */}
          <div className="font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {/* Penanggalan dengan moment */}
            <span>{moment(post.createdAt).format('DD - MMMM - YYYY')}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {/* Rendeering content */}
        {post.kontent.raw.children.map((postingan, index) => {
          const children = postingan.children.map((item, itemIndex) =>
            blogKontent(itemIndex, item.text, item),
          );
          return blogKontent(index, children, postingan, postingan.type);
        })}
      </div>
    </div>
  );
};

export default DetailPostComponent;
