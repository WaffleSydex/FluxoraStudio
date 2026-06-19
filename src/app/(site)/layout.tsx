import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/providers/Preloader";
import { getSettings } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <>
      <Preloader />
      <SmoothScroll>
        <Header />
        <main>{children}</main>
        <Footer settings={settings} />
      </SmoothScroll>
    </>
  );
}
