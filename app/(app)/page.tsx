import { MaxWidthWrapper } from "@/components/max-width-wrapper";
// import ScreenshotWindow from "@/components/screenshot-window";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
// import {ThemeToggler} from "@/components/theme-toggler";

export default function Page() {
  return (
    <MaxWidthWrapper>
      <SiteHeader />

      {/* <div className="bg-red-500  max-h-52 overflow-y-scroll" >
<div className="h-96 bg-green-300">
hello 
  </div>      </div> */}

      <section className="h-[calc(100vh-104px)] overflow-auto no-scrollbar">
  {/* <ScreenshotWindow /> */}
{/* 

<div className="h-[1000px] bg-red-500">
hello

  </div>     */}
  
 
  </section>

      <SiteFooter />
    </MaxWidthWrapper>
  );
}
