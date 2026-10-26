import "./globals.css";

export const metadata = {
  title: "TGT Propreté | Produits d'entretien professionnels",
  description: "Produits d'entretien professionnels et échantillons offerts en Île-de-France.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}