import { useEffect, useState } from 'react';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [reference, setReference] = useState('');
  const [user, setUser] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [hasPaid, setHasPaid] = useState(false);

  const [formData, setFormData] = useState({
    address_line1: '',
    address_line2: '',
    commune: '',
    city_id: 1,
    phone_number: '',
    payment_method: '',
  });

  const generateReference = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return `TEF-${result}`;
  };

  const fetchCartItems = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (data.success) {
      setCartItems(data.data);
    }
  };

  const fetchUserDetails = async () => {
    const response = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (data.success) {
      setUser(data.data);
    }
  };

  const fetchPaymentMethods = async () => {
    const response = await fetch(SummaryApi.paymentMethods.url, {
      method: SummaryApi.paymentMethods.method,
      credentials: 'include',
    });
    const data = await response.json();
    if (data.success) {
      setPaymentMethods(data.data);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchUserDetails();
    fetchPaymentMethods();
    setReference(generateReference());
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.productId.sellingPrice,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderSubmit = async () => {
    try {
      // Sécurité : vérifier qu'une méthode de paiement est choisie
      if (!formData.payment_method) {
        alert('Veuillez choisir un mode de paiement.');
        return;
      }

      if (!formData.phone_number) {
        alert('Veuillez saisir votre numéro de téléphone.');
        return;
      }

      if (!formData.address_line1 || !formData.commune) {
        alert('Veuillez remplir votre adresse complète.');
        return;
      }

      // Préparer le payload pour le back-end
      const payload = {
        shipping_address: {
          address_line1: formData.address_line1,
          address_line2: formData.address_line2,
          commune: formData.commune,
          city_id: formData.city_id,
        },
        phone_number: formData.phone_number,
        payment_method: formData.payment_method,
        reference: reference,
      };

      // Appeler le backend
      const response = await fetch(SummaryApi.createOrder.url, {
        method: SummaryApi.createOrder.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert('Commande créée avec succès !');
        // Rediriger vers la page de succès ou accueil
        window.location.href = '/order-success';
      } else {
        alert(data.message || 'Erreur lors de la création de la commande.');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error);
      alert('Erreur interne lors de la création de la commande.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Colonne Formulaire */}
      <div className="flex-1 space-y-8">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Informations de contact
          </h2>
          {/* Inputs prénom, nom, email, téléphone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prénom"
              className="border p-2 w-full bg-slate-200"
              value={user?.first_name || ''}
              disabled
            />
            <input
              type="text"
              placeholder="Nom"
              className="border p-2 w-full bg-slate-200"
              value={user?.last_name || ''}
              disabled
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mt-4 bg-slate-200"
            value={user?.email || ''}
            disabled
          />
          <input
            type="tel"
            placeholder="Telephone : +225XXXXXXXX"
            name="phone_number"
            className="border p-2 w-full mt-4"
            value={formData.phone_number}
            onChange={handleInputChange}
            pattern="^\+225[0-9]{8}$"
            required
          />
        </div>

        {/* Adresse de Livraison */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
          <input
            name="address_line1"
            placeholder="Adresse principale"
            className="border p-2 w-full mb-2"
            onChange={handleInputChange}
            value={formData.address_line1}
          />
          <input
            name="address_line2"
            placeholder="Complément d'adresse"
            className="border p-2 w-full mb-2"
            onChange={handleInputChange}
            value={formData.address_line2}
          />
          <input
            name="commune"
            placeholder="Commune"
            className="border p-2 w-full mb-2"
            onChange={handleInputChange}
            value={formData.commune}
          />
        </div>

        {/* Méthode de paiement */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Mode de paiement</h2>
          <select
            name="payment_method"
            className="border p-2 w-full mb-2"
            onChange={handleInputChange}
            value={formData.payment_method}
          >
            <option value="">Sélectionnez votre mode de paiement</option>

            {paymentMethods.map((method, index) => (
              <option key={index} value={method}>
                {method === 'Liquide' ? 'Paiement à la livraison' : method}
              </option>
            ))}
          </select>
        </div>
        {(formData.payment_method === 'Wave' ||
          formData.payment_method === 'Orange Money') &&
          !hasPaid && (
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded mb-4">
              <p>Veuillez effectuer le virement vers le numéro suivant :</p>
              <p className="font-bold my-2">
                {formData.payment_method === 'Wave'
                  ? '07 88 98 90 49 (Wave)'
                  : '07 88 98 90 49 (Orange Money)'}
              </p>
              <p>
                En précisant votre référence commande :{' '}
                <span className="font-bold">{reference}</span>
              </p>

              <button
                onClick={() => setHasPaid(true)}
                className="mt-4 bg-green-500 text-white p-2 rounded"
              >
                J&apos;ai effectué le paiement
              </button>
            </div>
          )}

        {/* Bouton */}
        <button
          className="bg-green-600 text-white py-3 w-full rounded font-bold text-lg"
          onClick={handleOrderSubmit}
        >
          Finaliser la commande
        </button>
      </div>

      {/* Colonne Résumé de Commande */}
      <div className="w-full max-w-md bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-2xl font-semibold mb-4">
          Récapitulatif de votre commande
        </h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Numéro de Référence :</h3>
          <p>{reference}</p>
        </div>

        {/* Liste des produits */}
        {cartItems.map((item) => (
          <div key={item._id} className="flex items-center gap-4 border-b pb-2">
            <img
              src={item.productId.productImage[0]}
              alt={item.productId.productName}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.productId.productName}</p>
              <p className="text-gray-500 text-sm">
                Quantité : {item.quantity}
              </p>
            </div>
            <div className="font-semibold">
              {displayINRCurrency(item.quantity * item.productId.sellingPrice)}
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="pt-4 font-bold text-lg flex justify-between">
          <span>Total :</span>
          <span>{displayINRCurrency(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
