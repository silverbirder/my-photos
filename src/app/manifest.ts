import type { MetadataRoute } from "next";
import { iconSizes } from "./icon";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "cork board",
    short_name: "cork board",
    description: "A virtual cork board for my photos",
    start_url: "/",
    display: "standalone",
    background_color: "#cc8768",
    theme_color: "#cc8768",
    icons: iconSizes.map((size) => ({
      src: `/icon/${size}`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };
}
