"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-indigo-600">
              ${product.price}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 sm:p-6">
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.short}</p>
        </div>
        
        {/* Specs Preview */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {product.specs?.slice(0, 2).map((spec: string, index: number) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {spec}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">
            ${product.price}
          </div>
          <Link 
            href={`/products/${product.slug}`} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
