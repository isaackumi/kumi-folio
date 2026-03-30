import { defineField, defineType } from "sanity";

export const experienceType = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", title: "Company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "period", title: "Period (e.g. Mar 2024 – Present)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["current", "past"], layout: "radio" },
      initialValue: "past",
    }),
    defineField({ name: "color", title: "Accent Colour (hex)", type: "string", initialValue: "#6C63FF" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "bullets", title: "Key Achievements", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "technologies", title: "Technologies", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "company", subtitle: "role" },
  },
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});
