import { sanityClient } from "./client";
import { urlForImage } from "./image";
import { featuredProducts, type Product } from "@/lib/data";

type RawProduct = {
  id: string;
  name: string;
  price: number;
  category: Product["category"];
  image: Parameters<typeof urlForImage>[0] | null;
};

const productProjection = `{
  "id": _id,
  name,
  price,
  category,
  image
}`;

// Safety net in case the Sanity webhook that triggers instant revalidation
// ever fails to fire; the tag lets /api/revalidate refresh on demand.
const fetchOptions = { next: { tags: ["products"], revalidate: 3600 } };

function toProduct(raw: RawProduct): Product {
  return {
    id: raw.id,
    name: raw.name,
    price: raw.price,
    category: raw.category,
    imageUrl: raw.image ? urlForImage(raw.image)?.width(600).height(600).url() : undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!sanityClient) return featuredProducts;

  const results = await sanityClient.fetch<RawProduct[]>(
    `*[_type == "product" && available == true] | order(_createdAt desc) ${productProjection}`,
    {},
    fetchOptions
  );
  return results.map(toProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!sanityClient) return featuredProducts;

  const results = await sanityClient.fetch<RawProduct[]>(
    `*[_type == "product" && available == true && featured == true] | order(_createdAt desc) ${productProjection}`,
    {},
    fetchOptions
  );
  return results.map(toProduct);
}

export async function getProductsByCategory(category: Product["category"]): Promise<Product[]> {
  if (!sanityClient) return featuredProducts.filter((p) => p.category === category);

  const results = await sanityClient.fetch<RawProduct[]>(
    `*[_type == "product" && available == true && category == $category] | order(_createdAt desc) ${productProjection}`,
    { category },
    fetchOptions
  );
  return results.map(toProduct);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (!sanityClient) {
    const q = trimmed.toLowerCase();
    return featuredProducts.filter((p) => p.name.toLowerCase().includes(q));
  }

  const results = await sanityClient.fetch<RawProduct[]>(
    `*[_type == "product" && available == true && name match $q] | order(_createdAt desc) ${productProjection}`,
    { q: `${trimmed}*` },
    fetchOptions
  );
  return results.map(toProduct);
}
