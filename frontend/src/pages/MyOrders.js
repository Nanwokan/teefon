import jsPDF from 'jspdf';
import moment from 'moment';
import { useEffect, useState } from 'react';
import SummaryApi from '../common';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.myOrders.url, {
        method: SummaryApi.myOrders.method,
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Erreur récupération commandes :', err);
    }
  };

  const handleViewProducts = async (order) => {
    try {
      setSelectedOrder(order);

      const response = await fetch(
        `${SummaryApi.orderItemsByOrderId.url}/${order.id}`,
        {
          method: 'get',
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
        setOpenModal(true);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error('Erreur dans handleViewProducts :', err);
    }
  };

  const handleDownloadInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Facture Teefon E-commerce', 14, 20);

    doc.setFontSize(12);
    doc.text(`Référence de commande : ${order.reference}`, 14, 40);
    doc.text(`Date : ${moment(order.created_at).format('LL')}`, 14, 50);
    doc.text(`Statut : ${order.status}`, 14, 60);

    doc.text('Produits commandés :', 14, 80);

    products.forEach((item, index) => {
      doc.text(
        `• ${item.product_name} (x${item.quantity}) - ${Number(item.product_price).toFixed(2)} FCFA`,
        14,
        90 + index * 10
      );
    });

    doc.text(
      `Total : ${Number(order.total_amount).toFixed(2)} FCFA`,
      14,
      90 + products.length * 10 + 10
    );

    doc.save(`Facture_${order.reference}.pdf`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Mes Commandes</h1>

      {orders.length === 0 ? (
        <p className="text-center">Aucune commande trouvée.</p>
      ) : (
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Référence</th>
                <th className="px-4 py-2">Statut</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-2">{order.reference}</td>
                  <td className="px-4 py-2">
                    {order.status === 'Payé' ? (
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        Payé
                      </span>
                    ) : (
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        En attente
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {moment(order.created_at).format('LL')}
                  </td>
                  <td className="px-4 py-2">
                    {Number(order.total_amount).toFixed(2)} FCFA
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleViewProducts(order)}
                    >
                      Voir Produits
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* LA MODALE DOIT ÊTRE DANS LE RETURN ICI 👇 */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto relative">
            <button
              aria-label="Fermer la modale"
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">
              Produits de la Commande
            </h2>

            {products.length === 0 ? (
              <p className="text-center">Aucun produit trouvé.</p>
            ) : (
              products.map((item) => (
                <div
                  key={`${item.id}-${item.product_name}`}
                  className="flex items-center gap-4 border-b py-3"
                >
                  <img
                    src={item.product_image || '/default-product.jpg'}
                    alt={item.product_name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="font-semibold">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      Quantité : {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Prix unitaire : {Number(item.product_price).toFixed(2)}{' '}
                      FCFA
                    </p>
                  </div>
                </div>
              ))
            )}

            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleDownloadInvoice(selectedOrder)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Télécharger la Facture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
