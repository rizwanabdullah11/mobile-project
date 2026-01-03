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
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
