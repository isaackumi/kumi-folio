import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "stat", title: "Stat / Badge (e.g. 8,000+ downloads)", type: "string" }),
    defineField({ name: "tech", title: "Tech Stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "gradient",
      title: "Card Gradient (Tailwind classes)",
      type: "string",
      initialValue: "from-accent-blue/20 to-transparent",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        defineField({
          name: "link",
          type: "object",
          fields: [
            { name: "label", title: "Label (e.g. GitHub)", type: "string" },
            { name: "href", title: "URL", type: "url" },
          ],
        }),
      ],
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "title", subtitle: "stat" },
  },
});
