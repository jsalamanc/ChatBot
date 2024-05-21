type ChatAssistantProps = {
  id?: string;
  role?: string;
  content?: string;
  status?: number;
  statusText?: string;
}[];
export async function handleFetch(prompt: ChatAssistantProps) {
  // Obtiene la URL actual
  const currentUrl = window.location.href;
  const messages = prompt.map((objeto) => {
    const { status, statusText, id, ...restoDelObjeto } = objeto;
    console.log(objeto);
    return restoDelObjeto;
  });
  try {
    const res = await fetch(`${process.env.URL_PAGE || currentUrl}api`, {
      method: 'POST',
      headers: {
        'access-control-allow-credentials': `${process.env.NEXT_API_KEY}`
      },
      body: JSON.stringify({ messages })
    });
    return res;
  } catch (error) {
    console.error(error);
  }
}
