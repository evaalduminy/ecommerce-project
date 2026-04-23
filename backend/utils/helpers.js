// Standardize price display
const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '$0.00';
  return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Calculate final price given a price and a percentage discount
const calculateDiscount = (price, discount) => {
  if (!discount || discount <= 0) return price;
  if (discount >= 100) return 0;
  
  const discountAmount = price * (discount / 100);
  return Number((price - discountAmount).toFixed(2));
};

// Create URL-friendly slugs for products or categories
const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')        // Remove all non-word chars
    .replace(/--+/g, '-');          // Replace multiple - with single -
};

module.exports = {
  formatCurrency,
  calculateDiscount,
  generateSlug
};
