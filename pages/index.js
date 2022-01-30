import Head from 'next/head'
import {useState} from 'react'
import Cards from '../components/Cards'
import LoadMeFirst from '../components/LoadMeFirst'

export default function Home() {

  //state for callback. When the LoadMeFirst component is finished
  //with local storage, the callback is invoked.
  const [ready, setReady] = useState(false)

  return (

  <div className="container">
  <Head>
    <title>Video Poker</title>
    <link rel="icon" href="public/favicon.ico" />
  </Head>
  <LoadMeFirst isReady={() => setReady(true)} />
  {!ready ? null: <Cards />}

  </div>
  )

}
