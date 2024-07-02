import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred while deleting. Please check console for details.');
        console.log('Error deleting book:', error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto'>
          <p className='my-4 text-xl text-gray-500'>
            Are you sure you want to delete this book? This action cannot be undone.
          </p>
          <button
            className='py-2 bg-red-500 text-white m-8 rounded-md'
            onClick={handleDeleteBook}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
