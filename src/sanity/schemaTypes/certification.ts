import { defineField, defineType } from "sanity";

export const certificationType = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Certificate Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", title: "Issuer (e.g. Amazon Web Services)", type: "string" }),
    defineField({ name: "date", title: "Issue Date (e.g. Dec 2021)", type: "string" }),
    defineField({ name: "certId", title: "Cert ID / Slug (e.g. DOP-C01)", type: "string" }),
    defineField({ name: "link", title: "Credential URL", type: "url" }),
    defineField({
      name: "certType",
      title: "Issuer Type",
      type: "string",
      options: { list: ["aws", "linkedin", "other"], layout: "radio" },
      initialValue: "other",
    }),
    defineField({ name: "skills", title: "Skills", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "name", subtitle: "issuer" },
  },
});
