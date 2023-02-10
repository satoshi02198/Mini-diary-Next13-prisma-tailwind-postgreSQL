// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
// import { useCallback, useState } from 'react'

// const fetchApi = (endpoint) => {
//   return fetch(`/api/${endpoint}`).then((response) => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok')
//     }
//     return response.json()
//   })
// }

// export default function Home() {
//   const [isLoadingPost, setLoadingPost] = useState(false)
//   const [apiResponse, setApiResponse] = useState(null)
//   const [apiError, setApiError] = useState(null)

//   const getApiCallback = useCallback(
//     (endpoint, ) => async (e) => {
//       setLoadingPost(true)
//       setApiError(null)
//       try {
//         const response = await fetchApi(endpoint)
//         setApiResponse(response)
//       } catch (e) {
//         setApiError(e)
//         console.error(e)
//       }
//       setLoadingPost(false)
//     },
//     [],
//   )

//   const onGetStatus = useCallback(getApiCallback(''), [])
//   const onSeed = useCallback(getApiCallback('seed'), [])
//   const onGetUsers = useCallback(getApiCallback('users'), [])
//   const onGetPosts = useCallback(getApiCallback('posts'), [])

//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Prisma example with Vercel</title>
//         <link rel="icon" href="/favicon.png" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>Prisma Vercel Deployment Example</h1>

//         <div className={styles.grid}>
//           <button onClick={onGetStatus} className={styles.apiButton}>
//             Check API status
//           </button>
//           <button onClick={onSeed} className={styles.apiButton}>
//             Seed data
//           </button>
//           <button onClick={onGetUsers} className={styles.apiButton}>
//             Load users with profiles
//           </button>
//           <button onClick={onGetPosts} className={styles.apiButton}>
//             Load posts
//           </button>
//           <div
//             className={`${styles.loader} ${isLoadingPost ? '' : styles.hidden}`}
//           ></div>
//         </div>
//         <pre
//           className={`responseContainer ${styles.code} ${
//             apiResponse ? '' : styles.hidden
//           }`}
//         >
//           {apiResponse && JSON.stringify(apiResponse, null, 2)}
//         </pre>
//       </main>

//       <footer className={styles.footer}>
//         Powered by{' '}
//         <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         &
//         <img src="/prisma.svg" alt="Prisma Logo" className={styles.logo} />
//       </footer>
//     </div>
//   )
// }

import prisma from "../lib/prisma";

export default function Home({ posts }) {
  return (
    <div>
      <h1>home</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
