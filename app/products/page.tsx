import ProductCard from "../../components/ProductCard";

async function getProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store' // Ensure fresh data
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  
  // Fallback to static data
  const products = await import("../../data/products.json");
  return products.default;
}

export default async function Products() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              All Products
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our complete collection of Zameer smartphones
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter/Sort Bar (placeholder for future enhancement) */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-gray-600">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </div>
          <div className="flex items-center gap-4">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Load More Button (placeholder for pagination) */}
        <div className="mt-12 text-center">
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-full font-medium transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}
