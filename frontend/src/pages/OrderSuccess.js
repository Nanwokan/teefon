import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Icône de réussite */}
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <svg
          className="w-16 h-16 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Message principal */}
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        Merci pour votre commande !
      </h1>

      {/* Message complémentaire */}
      <p className="text-gray-600 mb-8 text-center">
        Votre commande a été enregistrée avec succès.
        <br />
        Vous recevrez bientôt une confirmation par email ou par téléphone.
      </p>

      {/* Bouton retour */}
      <Link
        to="/"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg transition"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
};

export default OrderSuccess;
