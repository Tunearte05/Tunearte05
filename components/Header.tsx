import { getCategories } from "@/lib/sanity/queries";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const categories = await getCategories();
  return (
    <HeaderClient
      navCategories={categories.filter((c) => c.showInNav)}
      moreCategories={categories.filter((c) => !c.showInNav)}
    />
  );
}
