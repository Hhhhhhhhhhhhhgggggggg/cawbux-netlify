import { neon } from '@netlify/neon';

const sql = neon(); // auto-uses NETLIFY_DATABASE_URL

export async function handler(event) {
  const userId = event.queryStringParameters.userId;

  const [balanceRow] = await sql`
    SELECT balance FROM balances WHERE user_id = ${userId}
  `;

  return {
    statusCode: 200,
    body: JSON.stringify({ balance: balanceRow ? balanceRow.balance : 0 }),
  };
}
