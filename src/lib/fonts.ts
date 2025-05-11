import { Geist, Geist_Mono, IBM_Plex_Sans_Thai } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-thai",
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export { geistSans, geistMono, ibmThai };
