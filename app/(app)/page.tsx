import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import ImagePreviewer from "@/components/image-previewer";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <SiteHeader />
      <section className="h-[calc(100vh-104px)] overflow-hidden p-4">
        <div className="relative group w-full rounded-lg h-full overflow-hidden border shadow transition-transform bg-surface">
          <ImagePreviewer />
        </div>
      </section>
      <SiteFooter />
    </MaxWidthWrapper>
  );
}
