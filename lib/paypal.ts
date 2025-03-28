const base = process.env.PAYPAl_API_URL || "https://api-m.sandbox.paypal.com";
export const paypal = {
  createOrder: async function createOrder(price: number) {
    // const base = "https://api-m.sandbox.paypal.com";
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price,
            },
          },
        ],
      }),
    });
    // if (response.ok) {
    //   return await response.json();
    // } else {
    //   const errorMessage = await response.text();
    //   throw new Error(errorMessage);
    // }

    return handleResponse(response);
  },
  capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  },
};

// generate access token
async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

  if (!PAYPAL_CLIENT_ID || !PAYPAL_APP_SECRET) {
    throw new Error("PayPal credentials are missing!");
  }

  // Base64 encode the client ID and secret
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    "base64"
  );

  // Define the base URL for sandbox or live environment
  const base = "https://api-m.sandbox.paypal.com"; // Use for sandbox; for production, use https://api-m.paypal.com

  // Debugging: Console the encoded authorization header (DO NOT log this in production)
  console.log("Authorization Header:", auth);

  // Make the POST request to PayPal for token generation
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials", // Grant type for client credentials flow
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  // Handle response
  //   if (response.ok) {
  //     // Parse and return the access token
  //     const jsonData = await response.json();
  //     return jsonData.access_token;
  //   } else {
  //     // If there's an error, log and throw it
  //     const errorMessage = await response.text();
  //     // console.log("Error Response Body:", errorMessage);
  //     throw new Error(errorMessage);
  //   }
  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response: Response) {
  if (response.ok) {
    return await response.json();
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

export { generateAccessToken };
