import { ReactNode } from 'react';
import './/globals.css';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body className='bg-lore-beige-500 tracking-wide'>
        {children}
      </body>
    </html>
  );
}
