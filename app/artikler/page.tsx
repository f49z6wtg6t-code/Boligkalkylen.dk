import { getAllArticles } from "@/lib/articles";
import ArticlesClient from "./articles-client";
import type { Metadata } from "next";

// Revalidér siden hver dag kl. midnat så nye artikler vises automatisk
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Guides om solceller & badeværelse | BoligKalkylen.dk",
  description:
    "Læs vores guides om priser, regler og råd til solceller og badeværelsesrenovering. Baseret på danske 2026-priser og lovgivning.",
};

export default function ArtiklerPage() {
  const articles = getAllArticles();
  return <ArticlesClient articles={articles} />;
}
