import type { Metadata } from "next";
import {Container} from '@/app/_components/containers/container'
export const metadata: Metadata = {
  title: "Offline",
};

export default function Page() {
  return (
    <Container>
      <h1>يبدو ان هناك مشكلة في الانترنت</h1>
      <h2>يرجى اعادة المحاولة لاحقاً</h2>
    </Container>
  );
}