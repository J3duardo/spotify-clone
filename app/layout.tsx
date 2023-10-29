import { Metadata } from "next";
import { Figtree } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/context/SupabaseProvider";
import UserProvider from "@/context/UserProvider";
import AuthModal from "@/components/AuthModal";
import UploadSongModal from "@/components/UploadSongModal";
import SubscriptionModal from "@/components/SubscriptionModal";
import Player from "@/components/Player";
import ToastWrapper from "@/components/ToastWrapper";
import PlaylistModal from "@/components/PlaylistModal";
import getProductsWithPrices from "@/serverActions/getProductsWithPrices";
import "react-tooltip/dist/react-tooltip.css";
import "./globals.css";

const figtree = Figtree({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Generated by create next app"
};

export const revalidate = 0;

interface Props {
  children: React.ReactNode
};

const RootLayout = async ({children}: Props) => {
  const productsWithPrices = await getProductsWithPrices();

  return (
    <html lang="en">
      <body className={twMerge("flex gap-2 w-full h-screen m-0 p-2 text-white bg-black", figtree.className)}>
        <SupabaseProvider>
          <UserProvider>
            <AuthModal />
            <UploadSongModal />
            <SubscriptionModal products={productsWithPrices} />
            <PlaylistModal />
            <Sidebar/>
            <main className="w-full h-full">
              {children}
            </main>
            <Player />
            <ToastWrapper />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
};

export default RootLayout;