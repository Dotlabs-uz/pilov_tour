import LandingPage from "@/containers/LandingPage";
import RecTrips from "@/containers/RecTrips";
import Reviews from "@/containers/Reviews";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-[1450px] mt-2 flex-col pr-2 pl-2">
      <LandingPage />
      <RecTrips />
      <Reviews/>
    </div>
  );
}
