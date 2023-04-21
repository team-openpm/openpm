async function main() {
  const response = await fetch(
    'http://localhost:3001/api/proxy/clearbit/companies/find?domain=github.com',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.OPENPM_API_KEY}`,
      },
    },
  )

  console.log(await response.text())
}

main()
