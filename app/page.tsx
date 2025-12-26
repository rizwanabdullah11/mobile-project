import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

export default function Home() {
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
