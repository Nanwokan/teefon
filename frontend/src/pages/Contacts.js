import { FaComments, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contacts = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-12 mb-4">
        CONTACTEZ-NOUS
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Nous sommes disponibles du lundi au samedi de 10h à 19h.
      </p>
      <div className="flex flex-col md:flex-row justify-between container mx-0 mb-12 py-4">
        {/* Par téléphone */}
        <div className="flex flex-col items-center p-6 border shadow-sm md:w-1/3 bg-white">
          <FaPhone className="text-5xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Par téléphone</h2>
          <p className="text-center text-gray-600">
            Appelez-nous au +225 07 88 98 90 49
            <br />
            (du lundi au samedi de 10h à 19h)
          </p>
        </div>

        {/* Par chat */}
        <div className="flex flex-col items-center p-6 border shadow-sm md:w-1/3 bg-white">
          <FaComments className="text-5xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Par chat</h2>
          <p className="text-center text-gray-600">
            Posez-nous toutes vos questions
            <br />
            en cliquant sur le chat en bas à gauche de chaque page.
          </p>
        </div>

        {/* Par mail */}
        <div className="flex flex-col items-center p-6 border shadow-sm md:w-1/3 bg-white">
          <FaEnvelope className="text-5xl mb-4" />
          <h2 className="text-xl font-semibold mb-2">Par mail</h2>
          <p className="text-center text-gray-600">
            Écrivez-nous à l&apos;adresse suivante :<br />
            <span className="text-blue-600 font-medium">
              support@teefon-ci.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
