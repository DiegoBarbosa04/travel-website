import { useContext, useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import heroPlane from "@/assets/home/hero-plane.webp";
import AccountTab from "@/components/AccountTab";
import ReviewsTab from "@/components/ReviewsTab";
import MyReviewsTab from "@/components/MyReviewsTab";
import SearchHistoryTab from "@/components/SearchHistoryTab";
import { UserContext } from "@/contexts/User.context";
import { getMyreviews } from "@/services/review.service";
import type { Review } from "@/services/review.service";
import { animationDelay } from "@/lib/utils";

const tabs = [
  { id: "conta", label: "Conta", mobileLabel: "Conta" },
  { id: "avaliacoes", label: "Avaliações", mobileLabel: "Avaliações" },
  { id: "historico", label: "Histórico de pesquisas", mobileLabel: "Histórico" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tabContent: Record<TabId, { eyebrow: string; title: string; description: string }> = {
  conta: {
    eyebrow: "01 — Dados da conta",
    title: "Suas informações",
    description: "Mantenha seus dados atualizados para receber confirmações e ofertas.",
  },
  avaliacoes: {
    eyebrow: "02 — Avaliações",
    title: "Minhas avaliações",
    description: "Conte como foi sua viagem e ajude outros viajantes a escolher melhor.",
  },
  historico: {
    eyebrow: "03 — Histórico",
    title: "Pesquisas recentes",
    description: "Retome uma busca de onde parou. Os preços são atualizados na hora.",
  },
};

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xl leading-[26px] font-extrabold tracking-[-0.03em] lg:text-2xl lg:leading-[30px]">
        {value}
      </span>
      <span className="text-[13px] leading-4 text-[#5C5C58]">{label}</span>
    </div>
  );
}

function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useContext(UserContext);

  const tabParam = searchParams.get("tab");
  const activeTab: TabId = tabs.some((tab) => tab.id === tabParam)
    ? (tabParam as TabId)
    : "conta";

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await getMyreviews();
        setReviews(response);
      } catch (error) {
        console.error(error);
      }
    };

    loadReviews();
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const average =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : null;
  const content = tabContent[activeTab];

  return (
    <main className="text-[#1A1A1A]">
      <section className="flex flex-col px-5 pt-2 lg:px-16 lg:pt-6">
        <div
          className="animate-fade relative h-[150px] shrink-0 rounded-3xl bg-cover bg-[50%_62%] lg:h-70 lg:rounded-[32px]"
          style={{ backgroundImage: `url(${heroPlane})` }}
        >
          <span
            className="animate-pop absolute -bottom-10 left-6 flex size-[88px] items-center justify-center rounded-full border-[5px] border-white bg-[#E8480C] text-[34px] leading-10 font-extrabold tracking-[-0.04em] text-white lg:-bottom-16 lg:left-12 lg:size-36 lg:border-[6px] lg:text-[52px] lg:leading-14"
            style={animationDelay(350)}
          >
            {user.firstName[0]}
            {user.lastName[0]}
          </span>
        </div>

        <div className="flex flex-col gap-5 pt-14 lg:flex-row lg:items-end lg:justify-between lg:pt-22 lg:pl-12">
          <div className="animate-rise flex flex-col gap-3 lg:gap-3.5" style={animationDelay(200)}>
            <p className="flex items-center gap-2 lg:gap-2.5">
              <span className="size-[7px] shrink-0 rounded-full bg-[#E8480C] lg:size-2" />
              <span className="text-[11px] leading-4 font-semibold tracking-[0.18em] uppercase lg:text-xs">
                Minha conta
              </span>
            </p>
            <h1 className="text-[44px] leading-12 font-extrabold tracking-[-0.055em] lg:text-7xl lg:leading-18">
              {user.firstName} {user.lastName}.
            </h1>
          </div>
          <div className="animate-rise flex gap-5 lg:gap-7 lg:pb-2" style={animationDelay(300)}>
            <Stat value={reviews.length} label={reviews.length === 1 ? "avaliação" : "avaliações"} />
            <span className="w-px shrink-0 bg-[#EAEAE6]" />
            <Stat
              value={
                average === null
                  ? "–"
                  : `${average.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ★`
              }
              label="nota média"
            />
          </div>
        </div>
      </section>

      <div className="flex px-5 pt-7 lg:px-16 lg:pt-14">
        <div
          role="tablist"
          aria-label="Seções da conta"
          className="flex flex-1 items-center gap-1 rounded-full border border-[#EAEAE6] bg-[#F4F4F2] p-1.5 lg:flex-none"
        >
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSearchParams({ tab: tab.id }, { replace: true })}
                className={`flex-1 cursor-pointer rounded-full px-3 py-2.5 text-[15px] leading-[18px] whitespace-nowrap transition-colors duration-300 lg:flex-none lg:px-5.5 ${
                  active
                    ? "bg-[#1A1A1A] font-semibold text-white"
                    : "font-medium text-[#5C5C58] hover:text-[#1A1A1A]"
                }`}
              >
                <span className="lg:hidden">{tab.mobileLabel}</span>
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section
        key={activeTab}
        className="animate-rise flex flex-col gap-6 px-5 pt-10 lg:gap-10 lg:px-16 lg:pt-12"
      >
        <div className="flex flex-col gap-3.5 border-t border-[#1A1A1A] pt-[18px] lg:flex-row lg:items-start lg:gap-12 lg:pt-6">
          <span className="text-[11px] leading-4 font-semibold tracking-[0.18em] uppercase lg:w-50 lg:shrink-0 lg:pt-3 lg:text-xs">
            {content.eyebrow}
          </span>
          <div className="flex flex-col gap-2.5">
            <h2 className="text-[28px] leading-8 font-extrabold tracking-[-0.035em] lg:text-[40px] lg:leading-[46px]">
              {content.title}
            </h2>
            <p className="text-[15px] leading-[23px] text-[#5C5C58] lg:text-[17px] lg:leading-[27px]">
              {content.description}
            </p>
          </div>
        </div>

        <div className="lg:pl-62">
          {activeTab === "conta" && (
            <AccountTab
              name={user.firstName}
              lastName={user.lastName}
              email={user.email}
            />
          )}
          {activeTab === "avaliacoes" && (
            <div className="flex flex-col gap-4 lg:gap-4">
              <ReviewsTab onReviewCreated={handleAddReview} />
              <MyReviewsTab reviews={reviews} setReviews={setReviews} />
            </div>
          )}
          {activeTab === "historico" && <SearchHistoryTab />}
        </div>
      </section>
    </main>
  );
}

export default Profile;
