import Link from "next/link";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <SiteHeader />

      <section className="h-[calc(100vh-104px)] overflow-auto no-scrollbar flex items-center justify-center">
        <Link href={"/preview"}>
          <Button>Preview Page</Button>
        </Link>
      </section>

      <SiteFooter />
    </MaxWidthWrapper>
  );
}
