import { useJsonLd } from "../hooks/useJsonLd";
import { site, links, team } from "../data/content";

/**
 * Sitewide structured data telling Google exactly who All For STEAM is: the
 * organization, its founder and full team roster, its social profiles, and
 * the topics it's known for — so searches for the org name, team members'
 * names, or subjects like "STEAM"/"accessibility" can connect back here.
 * Renders nothing; mounted once at the app root.
 */
export function OrganizationSchema() {
  useJsonLd("organization-schema", {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: site.name,
    url: "https://allforsteam.org",
    logo: "https://allforsteam.org/brand/logo.png",
    description: site.description,
    foundingDate: site.founded,
    email: links.email,
    sameAs: [links.instagram, links.linkedin],
    knowsAbout: [
      "STEAM Education",
      "STEM Education",
      "Accessibility in Education",
      "K-8 Tutoring",
      "STEM Workshops",
      "Student Mentorship",
    ],
    founder: {
      "@type": "Person",
      name: team[0].name,
      jobTitle: team[0].role,
    },
    member: team.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.role,
    })),
  });

  return null;
}
