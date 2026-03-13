import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";

export const metadata = {
  title: "WONK | Gamified Finance",
  description: "Learn, Earn, and Play in the world of finance.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Ticker />
        <Navbar />
        <main style={{ paddingTop: '110px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
