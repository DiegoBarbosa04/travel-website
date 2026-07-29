import Header from "@/components/Header";
import retangleBanner from "@/assets/Rectangle-banner.png";
import AvatarIcon from "@/components/AvatarIcon";
import Footer from "@/components/Footer";
import { useContext, useEffect, useState } from "react";
import AccountTab from "@/components/AccountTab";
import ReviewsTab from "@/components/ReviewsTab";
import MyReviewsTab from "@/components/MyReviewsTab";
import SearchHistoryTab from "@/components/SearchHistoryTab";
import { UserContext } from "@/contexts/User.context";
import { getMyreviews } from "@/services/review.service";
import type { Review } from "@/services/review.service";

function Profile() {
  const [category, setCategory] = useState("Conta");
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useContext(UserContext);

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

  const categoryComponents: Record<string, React.ReactNode> = {
    Conta: (
      <AccountTab
        name={user.firstName}
        lastName={user.lastName}
        email={user.email}
      />
    ),
    Avaliações: <MyReviewsTab reviews={reviews} setReviews={setReviews} />,
    "Histórico de pesquisas": <SearchHistoryTab />,
  };

  const handleChangeCategory = (newCategory: string) => {
    setCategory(newCategory);
  };

  const getCategoryClass = (categoryName: string) => {
    const baseClass = "cursor-pointer h-full w-full";
    const selectedClass =
      "cursor-pointer h-full w-full border-b-2 border-[#7BC0A8]";
    if (categoryName === category) {
      return selectedClass;
    } else {
      return baseClass;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] pt-2 px-32">
      <Header />

      <div className="h-110 flex justify-center items-start relative">
        <div className="h-87 w-full rounded-md">
          <img src={retangleBanner} className="w-full h-87" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 absolute bottom-0">
          <AvatarIcon
            initials={`${user?.firstName[0]}${user?.lastName[0]}`}
            width={120}
            height={120}
            fontSize={52}
          />
          <span className="text-2xl font-bold">
            {`${user?.firstName} ${user?.lastName}`}
          </span>
        </div>
      </div>

      <section className="mb-20">
        <div className="font-semibold flex gap-4 justify-between px-8 py-4 items-center mt-20 h-20 bg-white rounded-2xl">
          <div className="w-full h-full">
            <button
              onClick={() => handleChangeCategory("Conta")}
              className={getCategoryClass("Conta")}
            >
              Conta
            </button>
            <span className="h-1"></span>
          </div>

          <div className="flex gap-6 items-center h-full w-full">
            <div className="w-[0.3px] h-full bg-gray-300"></div>
            <button
              onClick={() => handleChangeCategory("Avaliações")}
              className={getCategoryClass("Avaliações")}
            >
              Avaliações
            </button>
          </div>

          <div className="flex gap-6 items-center h-full w-full">
            <div className="w-[0.3px] h-full bg-gray-300"></div>
            <button
              onClick={() => handleChangeCategory("Histórico de pesquisas")}
              className={getCategoryClass("Histórico de pesquisas")}
            >
              Histórico de pesquisas
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="w-full h-auto rounded-2xl bg-white p-10 shadow-lg">
            {categoryComponents[category]}
            {category === "Avaliações" ? (
              <div className="mt-10">
                <ReviewsTab onReviewCreated={handleAddReview} />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Profile;
