import { Icons } from "@/components/icons";

export const siteConfig = {
  name: "sahilkumardev",
  url: "https://sahilkumardev.com",
  developer: "Sahil Kumar Dev",
  githubUsername: "sahilkumardev",
  social: {
    twitter: "https://twitter.com/sahilkumardev",
    github: "https://github.com/sahilkumardev",
    linkedin: "https://linkedin.com/in/sahilkumardev",
    discord: "https://discord.gg/X5TSMHqc",
    instagram: "https://instagram.com/sahilkumardev",
  },
  navItems: [
    {
      href: "/",
      label: "About",
    },
    {
      href: "/projects",
      label: "Projects",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ],
};
 
export const socialItems = [
  {
    href: siteConfig.social.twitter,
    label: "twitter",
    icon: Icons.nextjs,
  },
  {
    href: siteConfig.social.instagram,
    label: "instagram",
    icon: Icons.nextjs,
  },
  {
    href: siteConfig.social.linkedin,
    label: "linkedin",
    icon: Icons.nextjs,
  },
  {
    href: siteConfig.social.github,
    label: "github",
    icon: Icons.nextjs,
  },
];
