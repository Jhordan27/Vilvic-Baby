import { PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "../../services/supabase";
import { useCart } from "../../context/CartContext";
import toast from 'react-hot-toast';

const PayPalButton = ({ amount, clientInfo }) => {
    const { cart, clearCart } = useCart();

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: amount.toFixed(2),
                    },
                },
            ],
        });
    };

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(async (details) => {
            // 1. Guardar en Supabase
            const { data: sale, error: saleError } = await supabase
                .from('sales')
                .insert([
                    {
                        total: amount,
                        status: 'completed',
                        paypal_order_id: details.id,
                        client_email: clientInfo.email,
                        client_name: clientInfo.name,
                        client_address: clientInfo.address, // Asegúrate de tener esta columna en Supabase
                        client_phone: clientInfo.phone,     // Asegúrate de tener esta columna en Supabase
                    },
                ])
                .select();

            if (saleError) {
                console.error("Error saving sale:", saleError);
                toast.error("Hubo un error al registrar la venta, pero el pago se procesó.");
                return;
            }

            // 2. Guardar los items de la venta
            const saleItems = cart.map((item) => ({
                sale_id: sale[0].id,
                product_id: item.id,
                quantity: item.quantity,
                subtotal: item.price * item.quantity,
            }));

            const { error: itemsError } = await supabase
                .from('sale_items')
                .insert(saleItems);

            if (itemsError) {
                console.error("Error saving sale items:", itemsError);
            } else {
                toast.success('¡Pago Realizado con Éxito!', {
                    icon: '✅',
                    duration: 5000,
                    style: {
                        background: '#10b981',
                        color: '#fff',
                        fontWeight: 'bold'
                    }
                });
                clearCart();
            }
        });
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                style={{ layout: "vertical", color: "blue", shape: "rect", label: "paypal" }}
            />
        </div>
    );
};

export default PayPalButton;
