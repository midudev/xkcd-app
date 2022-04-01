import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import fs from 'node:fs/promises'
import { Layout } from 'components/Layout.js'
import { useI18N } from 'context/i18n.js'

export default function Home({ latestComics }) {
  const {t} = useI18N()

  return (
    <>
      <Head>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h2 className='mb-10 text-3xl font-bold text-center'>{t('LATEST_COMICS')}</h2>

        <section className='grid max-w-md grid-cols-1 gap-2 m-auto sm:grid-cols-2 md:grid-cols-3'>

        {
          latestComics.map(comic => {
            return (
              <Link href={`/comic/${comic.id}`} key={comic.id}>
                <a className='pb-4 m-auto mb-4'>
                  <h3 className='pb-2 text-sm font-bold text-center'>{comic.title}</h3>
                  <Image width={comic.width} height={comic.height} src={comic.img} alt={comic.alt} />
                </a>
              </Link>
            )
          })
        }
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics
    }
  }
}