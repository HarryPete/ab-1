import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrappper";
import ReduxProvider from "./ReduxProvider";
import SnackbarProviderWrapper from "./SnackbarProviderWrapper";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mock Hub",
  description: "One stop solution for all mock tests and interviews",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <SnackbarProviderWrapper>
        <ReduxProvider>
          <body className='main'>
          <main className={inter.className}>
            {children}
            <Toaster toastOptions={{ style: {color:"white", padding: '20px', border: '1px solid rgb(75,75,75)', backgroundColor: 'black'}}}/>
            </main>
          </body>
        </ReduxProvider>
        </SnackbarProviderWrapper>
      </SessionWrapper>
    </html>
  );
}
