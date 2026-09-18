import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Precio",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Accesorios", value: "accesorios" },
          { title: "Carteras", value: "carteras" },
          { title: "Perfumes", value: "perfumes" },
          { title: "Piercings", value: "piercings" },
          { title: "Maquillaje", value: "maquillaje" },
          { title: "Lentes", value: "lentes" },
          { title: "Gorros", value: "gorros" },
          { title: "Y mucho más", value: "mas" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Producto destacado",
      description: "Mostrarlo en la sección de destacados de la portada",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "available",
      title: "Disponible",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price", media: "image" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `$ ${subtitle}` : "",
        media,
      };
    },
  },
});
