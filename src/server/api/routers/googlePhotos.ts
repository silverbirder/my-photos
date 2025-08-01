import { publicProcedure, createTRPCRouter } from "@/server/api/trpc";
import axios from "axios";
import * as cheerio from "cheerio";

const GOOGLE_PHOTOS_URLS = process.env.GOOGLE_PHOTOS_URL ?? "";

async function fetchImagesFromUrl(url: string): Promise<string[]> {
  try {
    const { data: html }: { data: string } = await axios.get(url);
    const $ = cheerio.load(html);
    let images: string[] = [];
    $("img").each((_, el) => {
      let src = $(el).attr("src");
      if (src && !src.startsWith("data:")) {
        src = src.replace(/=[^=]*$/, "");
        images.push(src);
      }
    });
    if (images.length > 0) {
      images = images.slice(1);
    }
    return images;
  } catch (error) {
    console.error(`Error fetching images from ${url}:`, error);
    return [];
  }
}

export const googlePhotosRouter = createTRPCRouter({
  getImages: publicProcedure.query(async () => {
    try {
      const urls = GOOGLE_PHOTOS_URLS.split(",")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      if (urls.length === 0) {
        return { images: [], error: "No URLs configured" };
      }
      const imagePromises = urls.map((url) => fetchImagesFromUrl(url));
      const imageArrays = await Promise.all(imagePromises);
      const allImages = imageArrays.flat();
      return { images: allImages };
    } catch (error) {
      return { images: [], error: String(error) };
    }
  }),
});
