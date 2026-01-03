import ProductCard from "../components/ProductCard";

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
  const products = await import("../data/products.json");
  return products.default;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
              Mobile Shop
            </h1>
            <p className="mt-4 text-zinc-600">Find the best phones at great prices.</p>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
