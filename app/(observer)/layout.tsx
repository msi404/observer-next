import type { Metadata } from "next";
import { Protected } from '@/app/_components/containers/protected'
import "../_style/globals.css"

export const metadata: Metadata = {
  title: "برنامج المراقب",
  description: "برنامج المراقب الخاص بادارة العملية الانتخابية.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}> )
{
  return (
    <Protected>
        <section className="w-full pt-0">{ children }</section>
    </Protected>
  );
}
