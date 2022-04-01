import { Header } from "./Header.js"
import { Footer } from "./Footer.js"

export function Layout ({ children }) {
  return (
    <>
      <Header />

      <main className='max-w-xl m-auto'>
        {children}
      </main>

      <Footer />
    </>
  )
}