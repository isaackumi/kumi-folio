import { defineField, defineType } from "sanity";

export const skillCategoryType = defineType({
  name: "skillCategory",
  title: "Skill Category",
  type: "document",
  fields: [
    defineField({ name: "category", title: "Category Name (e.g. CLOUD)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "items", title: "Skills", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "category" },
  },
});
