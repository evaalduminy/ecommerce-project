import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProfilePage as StitchProfilePage } from "@/app/components/pages/ProfilePage";

export default function UserProfilePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 bg-[#0f0f0f] min-h-screen text-white">
        <StitchProfilePage />
      </main>
      <Footer />
    </>
  );
}
