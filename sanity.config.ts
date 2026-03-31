import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "kumi-folio",
  title: "Isaac Kumi — Portfolio CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Blog Posts").schemaType("post").child(
              S.documentList().title("Blog Posts").filter('_type == "post"').defaultOrdering([{ field: "publishedAt", direction: "desc" }])
            ),
            S.divider(),
            S.listItem().title("Experience").schemaType("experience").child(
              S.documentList().title("Work Experience").filter('_type == "experience"').defaultOrdering([{ field: "order", direction: "asc" }])
            ),
            S.listItem().title("Projects").schemaType("project").child(
              S.documentList().title("Projects").filter('_type == "project"').defaultOrdering([{ field: "order", direction: "asc" }])
            ),
            S.listItem().title("Certifications").schemaType("certification").child(
              S.documentList().title("Certifications").filter('_type == "certification"').defaultOrdering([{ field: "order", direction: "asc" }])
            ),
            S.listItem().title("Skills").schemaType("skillCategory").child(
              S.documentList().title("Skill Categories").filter('_type == "skillCategory"').defaultOrdering([{ field: "order", direction: "asc" }])
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
});
