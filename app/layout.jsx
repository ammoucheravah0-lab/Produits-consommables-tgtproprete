import "./globals.css";
import CartProvider from "../components/CartProvider";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import CartDrawer from "../components/CartDrawer";
import WhatsAppButton from "../components/WhatsAppButton";
import BackToTop from "../components/BackToTop";

export const metadata = {
  title: "TGT Propreté | Produits d'entretien professionnels",
  description: "Produits d'entretien professionnels livrés en Île-de-France : sols, dégraissants, sanitaires, vitres, désodorisants et consommables pour restaurateurs, commerces, bureaux et chantiers.",
};

export const viewport = { themeColor: "#0F1F3D" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Jost:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <CartDrawer />
          <BackToTop />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
