import Image from 'next/image';

function Admin({ admin }) {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      {/* Admin Photo url */}
      <div className="absolute left-0 right-0 -top-14">
        <Image
          src={admin.photo.url}
          alt={admin.nama}
          unoptimized
          height="100px"
          width="100px"
          className="align-middle rounded-full"
        />
      </div>
      {/* nama & bio */}
      <h3 className="text-white my-4 text-xl font-bold">{admin.nama}</h3>
      <p className="text-white text-lg">{admin.bio}</p>
    </div>
  );
}

export default Admin;
