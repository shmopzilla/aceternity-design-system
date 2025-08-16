import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export interface PriceData {
  id: string;
  unit_amount: number | null;
  currency: string;
  recurring?: {
    interval: 'month' | 'year';
    interval_count: number;
  };
  product: string;
}

export interface ProductData {
  id: string;
  name: string;
  description?: string;
  images: string[];
  metadata: Record<string, string>;
}

export async function createCheckoutSession({
  priceId,
  successUrl,
  cancelUrl,
  customerId,
}: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerId?: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer: customerId,
  });

  return session;
}

export async function createCustomer({
  email,
  name,
  metadata,
}: {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata,
  });

  return customer;
}

export async function getCustomer(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.cancel(subscriptionId);
  return subscription;
}

export async function getProducts() {
  const products = await stripe.products.list({
    active: true,
  });
  return products;
}

export async function getPrices() {
  const prices = await stripe.prices.list({
    active: true,
  });
  return prices;
}