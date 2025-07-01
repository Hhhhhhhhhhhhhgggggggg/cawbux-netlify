const balances = {
  "819388491": 100,
  "123456789": 50,
  // Add more user IDs here
};

const balance = balances[userId] || 0;
return { balance };
