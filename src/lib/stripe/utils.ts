export function formatPrice(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function formatSubscriptionInterval(interval: 'month' | 'year', intervalCount: number = 1): string {
  if (intervalCount === 1) {
    return interval === 'month' ? 'Monthly' : 'Yearly';
  }
  
  return `Every ${intervalCount} ${interval}s`;
}

export function getSubscriptionStatus(status: string): {
  label: string;
  color: 'green' | 'yellow' | 'red' | 'gray';
} {
  switch (status) {
    case 'active':
      return { label: 'Active', color: 'green' };
    case 'trialing':
      return { label: 'Trial', color: 'yellow' };
    case 'past_due':
      return { label: 'Past Due', color: 'red' };
    case 'canceled':
      return { label: 'Canceled', color: 'gray' };
    case 'unpaid':
      return { label: 'Unpaid', color: 'red' };
    default:
      return { label: 'Unknown', color: 'gray' };
  }
}