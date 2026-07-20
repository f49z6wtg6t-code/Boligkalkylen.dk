import { getAllArticles } from "@/lib/articles";
import ArticlesClient from "./articles-client";
import type { Metadata } from "next";

// Revalidér siden hver dag kl. midnat så nye artikler vises automatisk
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Artikler og guides — BoligKalkylen.dk",
  description:
    "Læs vores guides om solceller og badeværelsesrenovering — baseret på danske markedspriser og lovgivning.",
};

export default function ArtiklerPage() {
  const articles = getAllArticles();
  return <ArticlesClient articles={articles} />;
}
