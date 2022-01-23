import { useState, useEffect } from 'react'
import moment from 'moment';
import parse from 'html-react-parser';
import { getKomentar } from '../services';

function Comments({ slug }) {
  const [koments, setKomment] = useState([]);

  useEffect(() => {
     getKomentar(slug)?.then(result => setKomment(result));

  }, [slug]);
  // console.log(koments);

  return <>
    {koments.length > 0 && (
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          {koments.length}
          {' '}
          Komentar
        </h3>
        {koments.map(koment => (
          <div key={koment.createdAt}
            className='border-b border-gray-100 mb-4 pb-4'>
            <p className='mb-4'>
              <span className='font-semibold'>{koment.nama}</span>
              {' '}
              Pada
              {' '}
              {moment(koment.createdAt).format('DD MMMM YYYY')}
            </p>
            <p className='whitespace-pre-line text-gray-600 w-full'>
              {parse(koment.koment)}
            </p>
          </div>
        ))}
      </div>
    )}
  </>
}

export default Comments;
