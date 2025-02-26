import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
};

export default function Page() {
  return (
    <>
      <h1>يبدو ان هناك مشكلة في الانترنت</h1>
      <h2>يرجى اعادة المحاولة لاحقاً</h2>
    </>
  );
}