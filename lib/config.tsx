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
    instagram: "https://instagram.com/sahilkumardev",
  },
};

export const socialItems = [
  {
    href: siteConfig.social.twitter,
    label: "twitter",
    icon: <Icons.twitter />,
  },
  {
    href: siteConfig.social.instagram,
    label: "instagram",
    icon: <Icons.instagram />,
  },
  {
    href: siteConfig.social.linkedin,
    label: "linkedin",
    icon: <Icons.linkedin />,
  },
  {
    href: siteConfig.social.github,
    label: "github",
    icon: <Icons.github />,
  },
];
