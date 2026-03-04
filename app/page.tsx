import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { CategoryChips } from "@/components/category-chips";
import { PromoBanner } from "@/components/promo-banner";
import { PopularStores } from "@/components/popular-stores";
import { RecommendCTA } from "@/components/recommend-cta";

export default function HomePage() {
  return (
    <div className="pb-24">
      <Header />
      <SearchBar />
      <PromoBanner />
      <CategoryChips />
      <PopularStores />
      <RecommendCTA />
    </div>
  );
}
