import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/test", "/test2", "/dashboard", "/dashboard2"],
    },
    sitemap: "https://robertritacca.com/sitemap.xml",
  };
}
