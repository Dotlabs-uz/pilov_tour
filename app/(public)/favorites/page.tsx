import { useTranslations } from "next-intl";

const Favorites = () => {
  const t = useTranslations("pages");

  return (
    <main className="min-h-screen bg-cream">
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-display font-bold mb-4">
          {t("favorites_title")}
        </h1>
        <p className="text-muted-foreground mb-6">{t("favorites_subtitle")}</p>
        <div className="py-12">
          <p className="text-muted-foreground">{t("favorites_empty")}</p>
        </div>
      </div>
    </main>
  );
};

export default Favorites;
