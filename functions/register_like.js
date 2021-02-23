// Credit to Josh Comeau
const faunadb = require('faunadb')
exports.handler = async (event) => {
  const {
    Exists,
    Match,
    Index,
    Create,
    Collection,
    Get,
    Update

  } = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNA_KEY
  })

  const { slug, likesToSend } = event.queryStringParameters

  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Article slug not provided'
      })
    }
  }

  const doesDocExist = await client.query(
    Exists(Match(Index('likes_by_slug'), slug))
  )

  if (!doesDocExist) {
    await client.query(
      Create(Collection('likes'), {
        data: { slug, likes: 0 }
      })
    )
  }

  const document = await client.query(
    Get(Match(Index('likes_by_slug'), slug))
  )

  await client.query(
    Update(document.ref, {
      data: {
        likes: document.data.likes + Number(likesToSend >= 12 ? 12 : likesToSend)
      }
    })
  )

  const updatedDocument = await client.query(
    Get(Match(Index('likes_by_slug'), slug))
  )

  return {
    statusCode: 200,
    body: JSON.stringify({
      volts: updatedDocument.data.likes
    })
  }
}
