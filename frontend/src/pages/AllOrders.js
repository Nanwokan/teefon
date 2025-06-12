import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(SummaryApi.adminAllOrders.url, {
        method: SummaryApi.adminAllOrders.method,
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Erreur dans fetchOrders :', error.message);
      toast.error('Erreur lors de la récupération des commandes.');
    }
  };

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${SummaryApi.updateOrderStatus.url}`, {
        method: SummaryApi.updateOrderStatus.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          order_id: orderId,
          new_status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Statut mis à jour !');
        fetchOrders(); // 🔥 Recharge les commandes après changement
      } else {
        toast.error(data.message || 'Erreur lors de la mise à jour du statut');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erreur serveur');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Gestion des commandes</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Référence</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Montant</th>
              <th className="py-2 px-4 border">Statut</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4 border">{order.reference}</td>
                  <td className="py-2 px-4 border">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {Number(order.total_amount).toFixed(2)} FCFA
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <div className="flex items-center gap-2 justify-center">
                      {/* Pastille "En attente" */}
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() =>
                          handleChangeStatus(order.id, 'En attente')
                        }
                      >
                        <span
                          className={`px-2 py-1 rounded-full ${order.status === 'En attente' ? 'bg-blue-500 text-white text-base' : 'bg-gray-300 text-black'}`}
                        >
                          En attente
                        </span>
                      </div>

                      {/* Pastille "Payé" */}
                      <div
                        className="flex items-center gap-1 cursor-pointer"
                        onClick={() => handleChangeStatus(order.id, 'Payé')}
                      >
                        <span
                          className={`px-2 py-1 rounded-full ${order.status === 'Payé' ? 'bg-green-500 text-white text-base' : 'bg-gray-300 text-black'}`}
                        >
                          Payé
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-2 px-4 border">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2">
                      Voir Détails
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border text-center" colSpan="5">
                  Aucune commande trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
