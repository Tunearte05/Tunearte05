import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { sanityClient } from "./client";

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

export function urlForImage(source: Image) {
  return builder?.image(source).auto("format").fit("max");
}
