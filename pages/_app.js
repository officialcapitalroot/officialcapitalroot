import '../styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {

    // Load first ad script
    const adScript1 = document.createElement('script')
    adScript1.innerHTML = `(function(s){s.dataset.zone='10137789',s.src='https://forfrogadiertor.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    document.head.appendChild(adScript1)

    // Load second ad script
    const adScript2 = document.createElement('script')
    adScript2.innerHTML = `(function(s){s.dataset.zone='10137799',s.src='https://groleegni.net/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
    document.head.appendChild(adScript2)
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <Component {...pageProps} />
    </> 
  )
}


