import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/work", "/about", "/contact"];
  const lastModified = new Date("2026-06-19");

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "/work" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
