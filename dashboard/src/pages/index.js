import Head from "next/head";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import Navbar from "@/components/Navbar";
import Showcase from "@/components/Showcase";
import About from "@/components/About";
import JoinNow from "@/components/JoinNow";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Community Bot</title>
        <meta
          name="description"
          content="The Discord Community Bot is designed to make community management easier for server admins and mods, regardless of the size of the community."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Additional meta tags for SEO */}
        <meta name="keywords" content="Discord, Community Bot, Server Management, Admin, Moderation, Community" />
        <meta name="author" content="n0step_" />
        
        {/* Open Graph tags for social media */}
        <meta property="og:title" content="Community Bot" />
        <meta property="og:description" content="The Discord Community Bot is designed to make community management easier for server admins and mods, regardless of the size of the community." />
        <meta property="og:image" content="/path/to/image.jpg" />
        <meta property="og:url" content="https://community-bot.vercel.app/" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card tags for social media */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Community Bot" />
        <meta name="twitter:description" content="The Discord Community Bot is designed to make community management easier for server admins and mods, regardless of the size of the community." />
        <meta name="twitter:image" content="../../discord.png" />
        <meta name="twitter:site" content="@n0step_" />
      </Head>
      <Navbar />
      <Showcase />
      <About />
      <JoinNow />
      <Footer />
    </>
  );
}
