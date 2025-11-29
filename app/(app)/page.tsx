import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ImagePreviewHome } from "@/components/image-components";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <SiteHeader />
      <section className="h-[calc(100vh-104px)] overflow-hidden p-4">
        <div className="relative group w-full rounded-lg h-full overflow-hidden border border-app/70 shadow-2xl transition-transform bg-surface">
          <ImagePreviewHome />
        </div>
      </section>
      <SiteFooter />
    </MaxWidthWrapper>
  );
}
