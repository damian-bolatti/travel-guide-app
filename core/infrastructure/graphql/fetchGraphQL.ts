export const fetchGraphQL = async (
    query: string,
    variables: Record<string, any> = {}
  ): Promise<any> => {
    const GRAPHQL_ENDPOINT = process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT as string;
  
    if (!GRAPHQL_ENDPOINT) {
      throw new Error('GRAPHQL_ENDPOINT is not defined in the environment variables');
    }
  
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    console.log('GraphQL Response:', JSON.stringify(res));
  
    const json = await res.json();
  
    if (json.errors) {
      console.error('GraphQL Error:', JSON.stringify(json.errors, null, 2));
      throw new Error('GraphQL request failed');
    }
  
    return json.data;
  };  