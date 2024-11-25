import axios from 'axios';

interface FetchRequest {
  query: string,
  cursorToken?: string
}

export async function POST(request: Request) {
  const { query, cursorToken }: FetchRequest = await request.json()
  const CENSYS_API_ID = process.env.CENSYS_API_ID as string;
  const CENSYS_API_SECRET = process.env.CENSYS_API_SECRET as string;
  
  if (!CENSYS_API_ID || !CENSYS_API_SECRET) {
    return new Response(JSON.stringify({ error: "API credentials are missing" }), { status: 400 });
  }

  try {
    const response = await axios.get(
      'https://search.censys.io/api/v2/hosts/search',
      {
        params: {
          q: query,
          per_page: 25,
          virtual_hosts: 'EXCLUDE',
          cursor: cursorToken || undefined,
        },
        auth: {
          username: CENSYS_API_ID,
          password: CENSYS_API_SECRET,
        },
      }
    );

    return new Response(JSON.stringify(response.data), {status: 200})
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({error: "Error fetching results"}), {status: 500})
  }
}
