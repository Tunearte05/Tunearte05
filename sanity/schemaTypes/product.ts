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
      name: "gallery",
      title: "Más fotos",
      description: "Opcional. Fotos extra del producto: el cliente las ve pasando con flechas al tocar la foto principal.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      description: "Se muestra cuando el cliente toca la foto del producto (materiales, medidas, detalles).",
      type: "text",
      rows: 4,
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
