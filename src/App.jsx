
import React, { useState, useEffect } from 'react';
import logoImg from './assets/logo.jpg';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const riceVarieties = [
    { 
      id: 1,
      name: "Seela Rice", 
      price: 280, 
      desc: "Long grain, aged quality, ideal for biryani and daily bulk use.",
      img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: 2,
      name: "Steam 1121 Basmati", 
      price: 340, 
      desc: "Steam Basmati 1121 extra-long grains with exceptional aroma.",
      img: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: 3,
      name: "Black Horse Rice", 
      price: 310, 
      desc: "Strong Grain, premium double-steam quality for special events.",
      img: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80"
    },
    { 
      id: 4,
      name: "Kainat / Super Kernel", 
      price: 360, 
      desc: "Aromatic fine grain Super Kernel rice, direct from Mandi.",
      img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Load cart from localStorage for persistence
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('rahim_sons_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [bagSelections, setBagSelections] = useState({ 1: 2, 2: 2, 3: 2, 4: 2 });

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  // Save cart changes to localStorage
  useEffect(() => {
    localStorage.setItem('rahim_sons_cart', JSON.stringify(cart));
  }, [cart]);

  const handleCardBagChange = (id, val) => {
    let num = Number(val);
    if (num < 1) num = 1;
    if (num > 1000) num = 1000;
    setBagSelections({ ...bagSelections, [id]: num });
  };

  const addToCart = (product) => {
    const bags = bagSelections[product.id] || 2;
    const totalKg = bags * 25;
    const totalPrice = product.price * totalKg;

    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].bags += bags;
      updatedCart[existingIndex].totalKg = updatedCart[existingIndex].bags * 25;
      updatedCart[existingIndex].totalPrice = product.price * updatedCart[existingIndex].totalKg;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, bags, totalKg, totalPrice }]);
    }
    alert(`${product.name} has been added to your cart!`);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalCartKg = cart.reduce((sum, item) => sum + item.totalKg, 0);

  const handleWhatsAppOrder = () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add products first.");
    return;
  }

  // Yahan check lagaya hai ke agar koi field khali hogi toh alert aa jayega!
  if (!customerName.trim() || !customerAddress.trim() || !customerPhone.trim() || !customerEmail.trim()) {
    alert("Please fill in your Name, Delivery Address, Phone Number, and Email Address before placing the order.");
    return;
  }

  const phone = "923004574509";
  let message = `Hello! I would like to place an order with Rahim Sons:\n\n*--- ORDER ITEMS ---*\n`;
  
  cart.forEach((item, idx) => {
    message += `${idx + 1}. *${item.name}*\n   - Rate: Rs. ${item.price}/kg\n   - Quantity: ${item.bags} Bags (${item.totalKg} kg)\n   - Total: Rs. ${item.totalPrice.toLocaleString()}\n\n`;
  });

  message += `*Grand Total:* Rs. ${grandTotal.toLocaleString()} (${totalCartKg} kg total weight)\n\n*--- CUSTOMER DETAILS ---*\n- Name: ${customerName}\n- Address: ${customerAddress}\n- Phone: ${customerPhone}\n- Email: ${customerEmail}`;
  
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
};
  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 font-sans flex flex-col justify-between">
      <div>
        {/* Navbar */}
        <header className="bg-[#3b2219] text-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
            
            {/* Top Left: Logo + Title & Proprietor */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <img 
                src={logoImg} 
                alt="Rahim Sons Logo" 
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-300 shadow"
              />
              <div>
                <h1 className="text-xl font-bold tracking-wide">Rahim Sons</h1>
                <p className="text-xs text-amber-200">Proprietor: Muhammad Ansar • Porani Meewa Mandi</p>
              </div>
            </div>

            {/* Top Right: Navigation Links & Cart Button */}
            <nav className="mt-3 sm:mt-0 flex gap-5 text-sm font-medium items-center">
              <button onClick={() => setCurrentPage('home')} className={`hover:text-amber-300 transition ${currentPage === 'home' ? 'text-amber-300 font-bold underline' : ''}`}>Home</button>
              <button onClick={() => setCurrentPage('products')} className={`hover:text-amber-300 transition ${currentPage === 'products' ? 'text-amber-300 font-bold underline' : ''}`}>Products</button>
              <button onClick={() => setCurrentPage('about')} className={`hover:text-amber-300 transition ${currentPage === 'about' ? 'text-amber-300 font-bold underline' : ''}`}>About Us</button>
              <button onClick={() => setCurrentPage('contact')} className={`hover:text-amber-300 transition ${currentPage === 'contact' ? 'text-amber-300 font-bold underline' : ''}`}>Contact</button>
              
              <button onClick={() => setCurrentPage('cart')} className={`hover:text-amber-300 transition font-bold px-3.5 py-1.5 rounded-full text-xs bg-amber-700 text-white shadow flex items-center gap-1 ${currentPage === 'cart' ? 'ring-2 ring-amber-300' : ''}`}>
                🛒 Cart ({cart.length})
              </button>
            </nav>

          </div>
        </header>

        {/* 1. HOME PAGE */}
        {currentPage === 'home' && (
          <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Fixed Price Premium Supplier
              </span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-3">Rahim Sons</h2>
              <p className="text-sm text-amber-800 font-semibold">Proprietor: Muhammad Ansar</p>
              <p className="text-gray-700 text-base md:text-lg mt-4 leading-relaxed">
                Premium Quality Rice — Direct from <strong>Porani Meewa Mandi, Lahore</strong>. Aged, aromatic, and top-tier Basmati varieties available in standard 25kg bags at transparent fixed rates.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="bg-[#3b2219] hover:bg-amber-900 text-white font-bold px-6 py-3 rounded-lg shadow transition duration-200 text-sm"
                >
                  View All Products
                </button>
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="border border-[#3b2219] text-[#3b2219] hover:bg-[#3b2219] hover:text-white font-semibold px-6 py-3 rounded-lg transition duration-200 text-sm"
                >
                  Learn About Us
                </button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-amber-200/60 bg-white p-2">
              <img 
                src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80" 
                alt="Rahim Sons Premium Rice" 
                className="w-full h-72 object-cover rounded-lg"
              />
            </div>
          </section>
        )}

         {/* 2. PRODUCTS PAGE */}
{currentPage === 'products' && (
  <section className="max-w-6xl mx-auto px-4 py-12">
    <div className="text-center mb-10">
      <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded">Our Selection</span>
      <h3 className="text-3xl font-bold text-gray-900 mt-2">Available Rice Varieties</h3>
      <p className="text-gray-600 text-sm mt-1">Export quality rice available at fixed rates in standard 25kg bags.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {riceVarieties.map((item) => {
        const currentBags = bagSelections[item.id] || 2;
        return (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between h-full">
            <div>
              <div className="overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-40 object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg text-gray-900 h-14 flex items-center">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 h-12">{item.desc}</p>
                </div>
                
                <div className="mt-3 flex justify-between items-center pt-2">
                  <span className="text-amber-800 font-extrabold text-sm">Rs. {item.price}/kg</span>
                  <span className="text-xs font-semibold bg-amber-50 text-amber-900 px-2 py-1 rounded border border-amber-200/50">25kg Bag</span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Number of Bags (25kg each):</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="1000"
                    value={currentBags}
                    onChange={(e) => handleCardBagChange(item.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 mt-auto">
              <button 
                onClick={() => addToCart(item)}
                className="w-full bg-[#3b2219] text-white text-xs font-bold py-2.5 rounded hover:bg-amber-900 transition shadow"
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </section>
)}

        {/* 3. CART PAGE */}
        {currentPage === 'cart' && (
          <section className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded">Shopping Summary</span>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">Your Cart & Checkout</h3>
              <p className="text-gray-600 text-sm mt-1">Review your selected rice varieties and enter your delivery details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 border-b pb-2">
                  Order Items ({cart.length})
                </h4>

                {cart.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-sm bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    Your cart is empty. <button onClick={() => setCurrentPage('products')} className="text-amber-800 underline font-semibold">Browse Products</button> to add items.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {cart.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">{item.name}</h5>
                          <p className="text-xs text-gray-500">
                            {item.bags} Bags ({item.totalKg} kg) @ Rs. {item.price}/kg
                          </p>
                          <p className="text-xs font-extrabold text-amber-800 mt-1">Rs. {item.totalPrice.toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1 bg-red-50 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                 <div className="pt-3 border-t border-gray-200 space-y-3">
  <p className="text-xs font-bold uppercase tracking-wider text-gray-700">Customer Details Required</p>
  <input 
    type="text" 
    placeholder="Full Name" 
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-amber-500"
  />
  <input 
    type="text" 
    placeholder="Delivery Address" 
    value={customerAddress}
    onChange={(e) => setCustomerAddress(e.target.value)}
    className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-amber-500"
  />
  <input 
    type="text" 
    placeholder="Mobile / Contact Number" 
    value={customerPhone}
    onChange={(e) => setCustomerPhone(e.target.value)}
    className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-amber-500"
  />
  <input 
    type="email" 
    placeholder="Email Address" 
    value={customerEmail}
    onChange={(e) => setCustomerEmail(e.target.value)}
    className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-amber-500"
  />
   
</div>
              </div>

              <div className="bg-[#3b2219] text-white p-6 rounded-xl flex flex-col justify-between shadow-lg overflow-hidden">
                <div>
                  <h4 className="text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border-b border-amber-900 pb-2">Order Summary</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Selected Varieties:</span>
                      <span className="font-semibold">{cart.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Weight:</span>
                      <span className="font-semibold">{totalCartKg} kg</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-900">
                  <div className="mb-2">
                    <span className="text-gray-300 text-sm block">Grand Total:</span>
                    <span className="text-xl sm:text-2xl font-black text-amber-200 break-all block">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-md transition duration-200 text-center block text-sm mt-4"
                  >
                    Send Order via WhatsApp 🚀
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. ABOUT US PAGE */}
        {currentPage === 'about' && (
          <section className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-gray-200 space-y-8">
              <div className="text-center space-y-2">
                <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded">Our Commitment & Trust</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">About Rahim Sons</h2>
                <p className="text-sm font-semibold text-amber-800">Proprietor: Muhammad Ansar • Porani Meewa Mandi, Lahore</p>
              </div>

              {/* Banner Image for About Us */}
              <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=1200&q=80" 
                  alt="Premium Rice Quality" 
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="space-y-6 text-gray-700 text-base leading-relaxed">
                <p>
                  <strong>Rahim Sons</strong> is a reliable rice supplier based in <strong>Porani Meewa Mandi, Lahore</strong>. We specialize in providing pure, export-grade rice varieties directly at transparent, fixed prices. Our goal is to serve our customers with guaranteed quality and fair rates.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="bg-[#faf8f5] border border-amber-200/60 p-5 rounded-xl text-center space-y-2 shadow-sm">
                    <h4 className="font-bold text-amber-900 text-lg">🌾 Pure Quality</h4>
                    <p className="text-xs text-gray-600">100% aged, aromatic, long-grain rice carefully selected for excellent taste.</p>
                  </div>
                  <div className="bg-[#faf8f5] border border-amber-200/60 p-5 rounded-xl text-center space-y-2 shadow-sm">
                    <h4 className="font-bold text-amber-900 text-lg">⚖️ Standard Packaging</h4>
                    <p className="text-xs text-gray-600">Packaged in clean, standard 25kg bags for easy handling and transport.</p>
                  </div>
                  <div className="bg-[#faf8f5] border border-amber-200/60 p-5 rounded-xl text-center space-y-2 shadow-sm">
                    <h4 className="font-bold text-amber-900 text-lg">🤝 Direct Dealing</h4>
                    <p className="text-xs text-gray-600">Transparent communication directly with proprietor Muhammad Ansar.</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-3 mt-6">
                  <h3 className="text-xl font-bold text-gray-900">Featured Rice Varieties:</h3>
                  <p className="text-sm text-gray-600">
                    We offer top-quality options including <strong>Seela Rice</strong>, <strong>Steam 1121 Basmati</strong>, <strong>Black Horse</strong>, and <strong>Kainat Super Kernel</strong>. Each variety is selected to ensure high culinary standard and consistency.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-center gap-4">
                <button 
                  onClick={() => setCurrentPage('products')}
                  className="bg-[#3b2219] text-white font-bold px-8 py-3 rounded-lg text-sm hover:bg-amber-900 transition shadow"
                >
                  Explore Products 🛒
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="border border-[#3b2219] text-[#3b2219] font-bold px-8 py-3 rounded-lg text-sm hover:bg-gray-100 transition"
                >
                  Contact Us 📱
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 5. CONTACT US PAGE */}
        {currentPage === 'contact' && (
          <section className="max-w-3xl mx-auto px-4 py-16">
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-gray-200 text-center space-y-6">
              <span className="text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100 px-3 py-1 rounded">Get In Touch</span>
              <h2 className="text-3xl font-extrabold text-gray-900">Contact Rahim Sons</h2>
              <p className="text-gray-600 text-sm max-w-lg mx-auto">
                For order inquiries or fixed rate details, reach out directly via call or WhatsApp.
              </p>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 max-w-md mx-auto space-y-3 text-left">
                <p className="text-sm text-gray-800"><strong>Proprietor:</strong> Muhammad Ansar</p>
                <p className="text-sm text-gray-800"><strong>Location:</strong> Porani Meewa Mandi, Lahore, Pakistan</p>
                <p className="text-sm text-gray-800"><strong>Phone / WhatsApp:</strong> 0300-4574509</p>
              </div>

              <div className="pt-2">
                <a 
                  href="https://wa.me/923004574509" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#25D366] hover:bg-green-600 text-white font-bold px-8 py-3 rounded-lg shadow transition duration-200 text-sm"
                >
                  Chat on WhatsApp Now 📱
                </a>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#24150f] text-gray-300 py-8 text-center text-xs mt-12">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-white text-sm">Rahim Sons — Proprietor: Muhammad Ansar</p>
          <p>Porani Meewa Mandi, Lahore, Pakistan | Phone: 0300-4574509</p>
          <p className="text-gray-500 pt-2">© 2026 Rahim Sons. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;