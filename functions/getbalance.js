const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  const userId = event.queryStringParameters.userId;

  if (!userId) {
    return { statusCode: 400, body: 'Missing userId' };
  }

  const { data, error } = await supabase
    .from('cawbux_balances')
    .select('balance')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {  // PGRST116 = no rows found
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }

  // If no row found, assume balance 0
  const balance = data ? data.balance : 0;

  return {
    statusCode: 200,
    body: JSON.stringify({ balance }),
  };
};
