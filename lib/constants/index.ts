export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "NoobStore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A new ecommerce site";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.lATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  // email: "admin@example.com",
  // password: "123456",
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  // fullName: "Ram Bahadur",
  // streetAddress: "124 Main st",
  // city: "anytown",
  // postalCode: "12345",
  // country: "Nepal",
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(",").map((method) => method.trim()) // ✅ Ensures proper trimming
  : ["Paypal", "Stripe", "CashOnDelivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD?.trim() || "Paypal"; // ✅ Trim default value

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12;
export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  description: "",
  brand: "",
  price: "0",
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
};

export const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(", ")
  : ["admin", "user"];

export const reviewFormDefaultValues = {
  title: "",
  comment: "",
  rating: 0,
  // productId: "", // Ensure it's an empty string, not `null`
  // userId: "",
};
