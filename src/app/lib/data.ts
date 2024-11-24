// This code is only for test data

// import { sql } from '@vercel/postgres';

//   In case you use LOCAL configuration Vercel PostgreSQL DB
//   https://vercel.com/docs/storage/vercel-postgres/local-development
// import { sql } from '@/db';

import {
  CustomerField,
  CustomersTable,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  noStore();
  try {
    return [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    return [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    return [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(query: string, currentPage: number) {
  noStore();
  try {
    return [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    return [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    return [];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchCustomers() {
  noStore();
  try {

    const customers = [
      {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Delba de Oliveira',
        email: 'delba@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
      },
      {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Lee Robinson',
        email: 'lee@robinson.com',
        image_url: '/customers/lee-robinson.png',
      },

    ];

    return customers;

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
        const customers = [
      {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Delba de Oliveira',
        email: 'delba@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
      },
      {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Lee Robinson',
        email: 'lee@robinson.com',
        image_url: '/customers/lee-robinson.png',
      },

    ];

    return customers;

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    return [];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
