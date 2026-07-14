import { getAllArticles } from "@/lib/articles";
import ArticlesClient from "./articles-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikler og guides — BoligKalkylen.dk",
  description:
    "Læs vores guides om solceller og badeværelsesrenovering — baseret på danske markedspriser og lovgivning.",
};

export default function ArtiklerPage() {
  const articles = getAllArticles();
  return <ArticlesClient articles={articles} />;
}
