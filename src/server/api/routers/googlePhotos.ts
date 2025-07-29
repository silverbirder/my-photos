import { publicProcedure, createTRPCRouter } from "@/server/api/trpc";
import axios from "axios";
import * as cheerio from "cheerio";

const GOOGLE_PHOTOS_URL = "https://photos.app.goo.gl/2TmvvbVF7NP6QsT76";

export const googlePhotosRouter = createTRPCRouter({
  getImages: publicProcedure.query(async () => {
    try {
      const { data: html }: { data: string } =
        await axios.get(GOOGLE_PHOTOS_URL);
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
      return { images };
    } catch (error) {
      return { images: [], error: String(error) };
    }
  }),
});
