import fetch from 'node-fetch'

export default async function HttpClient (url: string, init?: any) {
  const res = await fetch(url, {
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(init?.body),
    ...init
  })
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json()
      }
      console.log(
        respostaDoServer.statusText,
        respostaDoServer.status
      )
    })
    .catch(error => {
      console.log(error)
    })

  return res
}
