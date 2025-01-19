interface ProductStatusCardProps {
  product_name: string;
  active: boolean;
}

const ProductStatusCard = ({ product_name, active }: ProductStatusCardProps): JSX.Element => (
    <div className="">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {product_name}
          </h1>
          <span className={`px-3 py-1 text-sm rounded-full ${active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {active ? 'Actif' : 'Inactif'}
          </span>
        </div>
      </div>
    </div>
  );

export default ProductStatusCard;
