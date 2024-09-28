import React from 'react';
import { Link } from 'react-router-dom';
const HeaderComponent = ({ link, title, name }) => {

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">ePayTest</h1>
        <div className="flex items-center space-x-4">
         {name &&<> <span className="font-medium text-gray-700">{name}</span>
          <img
            src='https://rickandmortyapi.com/api/character/avatar/1.jpeg'
            alt="Perfil de usuario"
            className="w-10 h-10 rounded-full object-cover"
          /></>}
          <Link
            to={link}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {title}
          </Link>


        </div>
      </div>
    </header>

  );
};

export default HeaderComponent;