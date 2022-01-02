
export const handler = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello test"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}
