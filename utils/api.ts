const createURL = (path) => window.location.origin + path

export const deleteEntry = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), { method: 'DELETE' })
  )
  if (res.ok) {
    const jsonRes = await res.json()
    console.log('res', res)
    return jsonRes
  } else {
    throw new Error('Something went wrong on the api server')
  }
}
export const newEntry = async () => {
  console.log('start fetching')
  const res = await fetch(
    new Request(createURL('/api/entry/'), {
      method: 'POST',
      body: JSON.stringify({ content: 'New Entry' }),
    })
  )
  console.log('end fetching')
  if (res.ok) {
    return await res.json()
  } else {
    throw new Error('Something went wrong on the api server')
  }
}

export const updateEntry = async (id, updates) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ updates }),
    })
  )

  if (res.ok) {
    const jsonRes = await res.json()
    console.log('res', res)
    return jsonRes
  } else {
    throw new Error('Something went wrong on the api server')
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    const jsonRes = await res.json()
    console.log('res', res)
    return jsonRes
  } else {
    throw new Error('Something went wrong on the api server')
  }
}
