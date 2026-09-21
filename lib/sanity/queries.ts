import { sanityClient } from "./client";
import { urlForImage } from "./image";
import { defaultCategories, featuredProducts, type Category, type Product } from "@/lib/data";
import { iconOptions, type IconKey } from "@/lib/icons";

type RawProduct = {
  id: string;
  name: string;
  price: number;
  category: string | null;
  categoryIcon: string | null;
  description: string | null;
  image: Parameters<typeof urlForImage>[0] | null;
};

type RawCategory = {
  name: string;
  slug: string;
  icon: IconKey;
  order: number | null;
  showInNav: boolean | null;
};

// `category` is a reference in new products and a plain slug string in older ones.
const productProjection = `{
  "id": _id,
  name,
  price,
  "category": coalesce(category->slug.current, category),
  "categoryIcon": category->icon,
  description,
  image
}`;

// Safety net in case the Sanity webhook that triggers instant revalidation
// ever fails to fire; the tag lets /api/revalidate refresh on demand.
const fetchOptions = { next: { tags: ["products"], revalidate: 3600 } };

const validIcons = new Set<string>(iconOptions.map((o) => o.value));

function toIcon(value: string | null | undefined): IconKey {
  return value && validIcons.has(value) ? (value as IconKey) : "mas";
}

function toProduct(raw: RawProduct): Product {
  const category = raw.category ?? "";
  return {
    id: raw.id,
    name: raw.name,
    price: raw.price,
    category,
    categoryIcon: toIcon(raw.categoryIcon ?? category),
    description: raw.description ?? undefined,
    imageUrl: raw.image ? urlForImage(raw.image)?.width(600).height(600).url() : undefined,
  };
}

export async function getCategories(): Promise<Category[]> {
  if (!sanityClient) return defaultCategories;

  const raw = await sanityClient.fetch<RawCategory[]>(
    `*[_type == "category"]{ name, "slug": slug.current, icon, order, showInNav }`,
    {},
    fetchOptions
  );

  // Categories created in Sanity win over the built-in ones with the same slug.
  const bySlug = new Map<string, Category>(defaultCategories.map((c) => [c.slug, c]));
  for (const c of raw) {
    if (!c.slug) continue;
    bySlug.set(c.slug, {
      name: c.name,
      slug: c.slug,
      icon: toIcon(c.icon),
      order: c.order ?? 1000,
      showInNav: c.showInNav ?? true,
    });
  }

  return [...bySlug.values()].sort((a, b) => a.order - b.order);
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

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (!sanityClient) return featuredProducts.filter((p) => p.category === category);

  const results = await sanityClient.fetch<RawProduct[]>(
    `*[_type == "product" && available == true && coalesce(category->slug.current, category) == $category] | order(_createdAt desc) ${productProjection}`,
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
