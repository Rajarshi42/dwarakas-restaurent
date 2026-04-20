export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  tag?: string;
};

export type MenuData = {
  veg: MenuItem[];
  nonVeg: MenuItem[];
  desserts: MenuItem[];
  drinks: MenuItem[];
};

export const menuData: MenuData = {
  veg: [
    { id: 'paneer-khaas', name: 'Paneer Khaas', description: 'Soft paneer in a rich tomato-cream gravy finished with kasuri methi.', price: '₹360', tag: 'Bestseller' },
    { id: 'dal-makhani', name: 'Dal Makhani', description: 'Black lentils slow-simmered overnight in buttery tomato gravy.', price: '₹290', tag: 'Classic' },
    { id: 'veg-biryani', name: 'Veg Dum Biryani', description: 'Fragrant basmati layered with seasonal vegetables and whole spices.', price: '₹320' },
    { id: 'palak-paneer', name: 'Palak Paneer', description: 'Cottage cheese cubes in a velvety spinach and spice sauce.', price: '₹340' },
    { id: 'aloo-dum', name: 'Aloo Dum', description: 'Baby potatoes slow-cooked in a bold, smoky masala.', price: '₹260' },
    { id: 'chole-bhature', name: 'Chole Bhature', description: 'Spiced chickpea curry served with golden, puffed bhature.', price: '₹280', tag: 'Popular' },
  ],
  nonVeg: [
    { id: 'royal-biryani', name: 'Royal Biryani', description: 'Slow-marinated chicken layered with saffron-infused basmati rice.', price: '₹520', tag: 'Signature' },
    { id: 'masala-chicken', name: 'Masala Chicken', description: 'Tender chicken in a bold, caramelized onion and tomato masala.', price: '₹430' },
    { id: 'butter-chicken', name: 'Butter Chicken', description: 'Succulent chicken in a velvety, mildly spiced tomato-butter sauce.', price: '₹450', tag: 'Bestseller' },
    { id: 'mutton-rogan', name: 'Mutton Rogan Josh', description: 'Kashmiri-style slow-braised mutton in aromatic whole spices.', price: '₹580', tag: 'Chef\'s Pick' },
    { id: 'prawn-masala', name: 'Prawn Masala', description: 'Juicy prawns tossed in a coastal spice blend with curry leaves.', price: '₹540' },
    { id: 'chicken-65', name: 'Chicken 65', description: 'Crispy fried chicken with fiery red chili and yogurt marinade.', price: '₹380', tag: 'Popular' },
  ],
  desserts: [
    { id: 'gulab-jamun',    name: 'Gulab Jamun',     description: 'Sweet dish made of dough milk solids, dipped in sugar syrup.',                                                                    price: '$6.99' },
    { id: 'rasmalai',       name: 'Rasmalai',         description: 'Cottage cheese puffy served with reduced sweetened milk, flavored with cardamom and pistachio.',                                  price: '$6.99' },
    { id: 'mango-rasmalai', name: 'Mango Rasmalai',   description: 'Cottage cheese puffy served with reduced sweetened milk, flavored with cardamom, pistachio and mango.',                          price: '$6.99' },
    { id: 'carrot-halwa',   name: 'Carrot Halwa',     description: 'Classic slow-cooked carrot dessert with ghee, sugar, and cardamom.',                                                             price: '$9.99' },
    { id: 'apricot-delight',name: 'Apricot Delight',  description: 'A rich, indulgent dessert crafted with apricots and aromatic spices.',                                                           price: '$9.99' },
  ],
  drinks: [
    { id: 'chikoo-milkshake', name: 'Chikoo Milkshake', description: 'Creamy milkshake made with fresh sapodilla (chikoo) blended to perfection.', price: '$5.99' },
    { id: 'mango-lassi',      name: 'Mango Lassi',       description: 'Thick, chilled yogurt blended with ripe Alphonso mangoes.',                  price: '$5.99' },
  ],
};

export const categoryMeta: Record<string, { label: string; image: string; description: string }> = {
  veg: {
    label: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    description: 'Garden-fresh flavors, slow-cooked to perfection.',
  },
  'non-veg': {
    label: 'Non-Vegetarian',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
    description: 'Bold, smoky, and richly spiced meat preparations.',
  },
  desserts: {
    label: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    description: 'Indulgent sweets rooted in royal Indian tradition.',
  },
  drinks: {
    label: 'Drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80',
    description: 'Refreshing sips from the heart of Indian culture.',
  },
};
