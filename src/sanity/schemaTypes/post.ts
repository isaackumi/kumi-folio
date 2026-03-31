import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog listing page.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "DevOps", value: "DevOps" },
          { title: "Cloud", value: "Cloud" },
          { title: "SRE", value: "SRE" },
          { title: "Kubernetes", value: "Kubernetes" },
          { title: "Python", value: "Python" },
          { title: "TypeScript", value: "TypeScript" },
          { title: "Linux", value: "Linux" },
          { title: "Security", value: "Security" },
          { title: "Open Source", value: "Open Source" },
          { title: "Tutorial", value: "Tutorial" },
          { title: "Career", value: "Career" },
          { title: "Git", value: "Git" },
        ],
        layout: "tags",
      },
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                  { name: "blank", type: "boolean", title: "Open in new tab", initialValue: true },
                ],
              },
            ],
          },
        },
        // Code block
        {
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            { name: "language", type: "string", title: "Language", initialValue: "bash" },
            { name: "filename", type: "string", title: "Filename (optional)" },
            { name: "code", type: "text", title: "Code" },
          ],
          preview: {
            select: { title: "filename", subtitle: "language" },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || "Code Block", subtitle: subtitle || "code" };
            },
          },
        },
        // Image block
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
        },
        // Callout / tip box
        {
          type: "object",
          name: "callout",
          title: "Callout",
          fields: [
            {
              name: "type",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Tip", value: "tip" },
                  { title: "Danger", value: "danger" },
                ],
                layout: "radio",
              },
              initialValue: "info",
            },
            { name: "body", type: "text", title: "Content" },
          ],
          preview: {
            select: { title: "type", subtitle: "body" },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              const icons: Record<string, string> = { info: "ℹ️", warning: "⚠️", tip: "💡", danger: "🚨" };
              return { title: `${icons[title ?? "info"] ?? "📌"} ${title ?? "Callout"}`, subtitle };
            },
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
  orderings: [
    { title: "Published (newest)", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
