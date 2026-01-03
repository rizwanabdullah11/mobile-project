"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductForm = {
  name: string;
  slug: string;
  price: string;
  image: string;
  short: string;
  description: string;
  specs: string;
};

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<ProductForm>({
    name: "",
    slug: "",
    price: "",
    image: "",
    short: "",
    description: "",
    specs: "",
  });
  const [errors, setErrors] = useState<Partial<ProductForm>>({});
  const [saving, setSaving] = useState(false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (name: string) => {
    setForm(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductForm> = {};

    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required";
    if (!form.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }
    if (!form.image.trim()) newErrors.image = "Image URL is required";
    if (!form.short.trim()) newErrors.short = "Short description is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.specs.trim()) newErrors.specs = "Specifications are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      const newProduct = {
        id: Date.now().toString(),
        name: form.name.trim(),
        slug: form.slug.trim(),
        price: Number(form.price),
        image: form.image.trim(),
        short: form.short.trim(),
        description: form.description.trim(),
        specs: form.specs.split('\n').map(s => s.trim()).filter(s => s.length > 0),
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      
      alert('Product created successfully!');
      router.push('/admin');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <Link
            href="/admin"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Admin
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., iPhone 15 Pro"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.slug ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., iphone-15-pro"
              />
              {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
              <p className="mt-1 text-sm text-gray-500">URL-friendly version of the product name</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="999.99"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              {form.image && (
                <div className="mt-2">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                value={form.short}
                onChange={(e) => setForm(prev => ({ ...prev, short: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.short ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief tagline for the product"
                maxLength={100}
              />
              {errors.short && <p className="mt-1 text-sm text-red-600">{errors.short}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Detailed product description..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specifications *
              </label>
              <textarea
                value={form.specs}
                onChange={(e) => setForm(prev => ({ ...prev, specs: e.target.value }))}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.specs ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="6.1-inch OLED display&#10;128GB storage&#10;12MP camera"
              />
              {errors.specs && <p className="mt-1 text-sm text-red-600">{errors.specs}</p>}
              <p className="mt-1 text-sm text-gray-500">Enter each specification on a new line</p>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Link
                href="/admin"
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Creating...' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}