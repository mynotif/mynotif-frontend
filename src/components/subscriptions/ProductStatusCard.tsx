interface ProductStatusCardProps {
  product_name: string;
  active: boolean;
}

const ProductStatusCard = ({ product_name, active }: ProductStatusCardProps): JSX.Element => (
  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
    <div className="p-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">
        {product_name}
      </h1>
      <span 
        className={`
          px-3 py-1 text-xs rounded-full 
          ${active 
            ? 'bg-green-300 text-green-700' 
            : 'bg-red-300 text-red-700'}
        `}
      >
        {active ? 'Actif' : 'Inactif'}
      </span>
    </div>
  </div>
);

export default ProductStatusCard;
