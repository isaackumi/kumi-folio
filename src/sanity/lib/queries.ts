import { groq } from "next-sanity";

export const experiencesQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    company,
    role,
    period,
    location,
    status,
    color,
    description,
    technologies,
    bullets,
    order,
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    description,
    tech,
    tags,
    stat,
    gradient,
    links[] {
      label,
      href,
    },
    order,
  }
`;

export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc) {
    _id,
    name,
    issuer,
    date,
    certId,
    link,
    certType,
    skills,
    order,
  }
`;

export const skillsQuery = groq`
  *[_type == "skillCategory"] | order(order asc) {
    _id,
    category,
    items,
    order,
  }
`;
