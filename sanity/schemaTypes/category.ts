import { defineField, defineType } from "sanity";
import { iconOptions } from "../../lib/icons";

export default defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      description: "Se genera solo a partir del nombre. Tocá \"Generate\".",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      options: { list: [...iconOptions] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      description: "Número para ordenar las categorías: primero las más bajas (ej: 10, 20, 30).",
      type: "number",
    }),
    defineField({
      name: "showInNav",
      title: "Mostrar en el menú",
      description: "Si está activado, aparece en la barra de navegación de arriba.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});
