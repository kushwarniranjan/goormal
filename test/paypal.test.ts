import { generateAccessToken, paypal } from "../lib/paypal";
// teset to generate access token from paypal

test("generate token from paypal", async () => {
  const tokenResponse = await generateAccessToken();
  console.log(tokenResponse);
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

// test to create a paypal order
test("create a paypal order", async () => {
  // const token = await generateAccessToken();
  // console.log("Access Token:", token);
  const price = 10.0;
  const orderResponse = await paypal.createOrder(price);
  console.log(orderResponse);

  expect(orderResponse).toHaveProperty("id");
  expect(orderResponse).toHaveProperty("status");
  expect(orderResponse.status).toBe("CREATED");
});

// test to capture payment with mock order
test("simulate capturing a payment from an order", async () => {
  const orderId = "100";
  const mockCapturePayment = jest
    .spyOn(paypal, "capturePayment")
    .mockResolvedValue({
      status: "COMPLETED",
    });

  const captureResponse = await paypal.capturePayment(orderId);
  expect(captureResponse).toHaveProperty("status", "COMPLETED");

  mockCapturePayment.mockRestore();
});
