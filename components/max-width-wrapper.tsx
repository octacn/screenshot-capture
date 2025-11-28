import * as React from "react";

export default function MaxWidthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="max-w-screen-2xl mx-auto relative">{children}</main>;
}
