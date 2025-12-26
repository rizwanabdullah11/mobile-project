import products from "../../../data/products.json";
import Image from "next/image";
import AddToCartButton from "../../../components/AddToCartButton";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-[400px] object-cover rounded" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-zinc-600">{product.description}</p>
          <div className="mt-4">
            <div className="text-3xl font-semibold">${product.price}</div>
          </div>
          <AddToCartButton product={product} />

          <div className="mt-8">
            <h3 className="font-semibold">Specifications</h3>
            <ul className="mt-2 list-disc list-inside text-zinc-600">
              {product.specs?.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
