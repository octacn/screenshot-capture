import { MaxWidthWrapper } from "@/components/max-width-wrapper";
// import ScreenshotWindow from "@/components/screenshot-window";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
// import {ThemeToggler} from "@/components/theme-toggler";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <SiteHeader />
      {/* <ScreenshotWindow /> */}
      {/* <div className="bg-red-500  max-h-52 overflow-y-scroll" >
<div className="h-96 bg-green-300">
hello 
  </div>      </div> */}

      <div className="h-[calc(100vh-112px)]">hello project page</div>

      <SiteFooter />
    </MaxWidthWrapper>
  );
}
