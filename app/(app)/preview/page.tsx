import ImagePreviewer from "@/components/image-previewer";
import PreviewFooter from "@/components/preview-footer";

export default function Page() {
  return (
    <div className="relative">
      <ImagePreviewer />
      <PreviewFooter />
    </div>
  );
}
