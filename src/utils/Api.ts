export async function getData(customerPin: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/customers/${customerPin}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const results = await response.json();
    return results;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

export async function updateRecord({
  customerPin,
  updated_at,
  balance,
}: {
  customerPin: string;
  updated_at: string;
  balance: number;
}) {
  try {
    const response = await fetch(
      `http://localhost:3000/customers/${customerPin}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ updated_at, balance }),
      }
    );
    const results = await response.json();
    return results;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}
