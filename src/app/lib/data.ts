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
import { getBaseURL } from "@/lib/utils";

import { auth } from "@/app/(auth)/auth";


const ITEMS_PER_PAGE = 6;

const baseUrl = getBaseURL();


export const customers = [
      {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Delba de Oliveira',
        email: 'delba@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
        total_pending: 1222022,
        total_paid: 1222022,
        total_invoices: 1222022,
      },
      {
        id: '3958dc9e-742f-4377-85e9-fec4b6a64423',
        name: 'Lee Robinson',
        email: 'lee@robinson.com',
        image_url: '/customers/lee-robinson.png',
        total_pending: 1222022,
        total_paid: 1222022,
        total_invoices: 1222022,
      },

 ];

export const revenue = [
  //{ month: 'Jan', revenue: 2000 },
  //{ month: 'Feb', revenue: 1800 },
  //{ month: 'Mar', revenue: 2200 },
  //{ month: 'Apr', revenue: 2500 },
  //{ month: 'May', revenue: 2300 },
  //{ month: 'Jun', revenue: 3200 },
  //{ month: 'Jul', revenue: 3500 },
  //{ month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 1000 },
  { month: 'Oct', revenue: 1100 },
  { month: 'Nov', revenue: 2000 },
  { month: 'Dec', revenue: 1000 },
];

 const invoices = [
      {
          id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        //customer_id: customers[0].id,
        customer_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        amount: 1000,
        status: 'pending',
        date: '2022-12-06',
        image_url: '/customers/delba-de-oliveira.png',
        name: "holdings sl",
        email: 'lee@robinson.com',
      },
      {
           id: "3958dc9e-712f-4377-85e9-fec4b6a64423",
        //customer_id: customers[1].id,
        customer_id: "3958dc9e-742f-4377-85e9-fec4b6a64423",
        amount: 2000,
        status: 'pending',
        date: '2022-11-14',
        image_url: '/customers/delba-de-oliveira.png',
        name: "holdings sl",
        email: 'lee@robinson.com',
      },
  ];

   const companies = [
      {
        id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        company_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        amount: '',
        status: 'pending',
        date: '2022-12-06',
        name: "holdings sl",
        image_url: '/customers/delba-de-oliveira.png',
        email: 'lee@robinson.com',

      },
      {
        //customer_id: customers[1].id,
          id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",

        company_id: "3958dc9e-742f-4377-85e9-fec4b6a64423",
        amount: "",
        status: 'pending',
        date: '2022-11-14',
        name: "apples store",
        image_url: '/customers/delba-de-oliveira.png',
        email: 'lee@robinson.com',
      },
  ];

   const clockins = [
      {
        id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
        user_id: 1,
        timestamp: new Date(),
        method: 'Registro de entrada del trabajador',

      },
  ];

export async function fetchRevenue() {
  noStore();
  try {
    return revenue;
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
    // Simula datos obtenidos de la base de datos
    return {
      totalPaidInvoices: 100,
      totalPendingInvoices: 50,
      numberOfInvoices: 150,
      numberOfCustomers: 75,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}


export async function fetchFilteredInvoices(query: string, currentPage: number) {
  noStore();
  try {
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {

    const totalPages = 1;
    return totalPages;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchCustomers() {
  noStore();
  try {

    return customers;

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {

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


// COMPANIES


export async function fetchFilteredCompanies(query: string, currentPage: number) {
  noStore();
  try {
    return companies;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch companies.');
  }
}

export async function fetchFilteredCheckins(query: string, currentPage: number) {
  noStore();
  try {

  const session = await auth();
const skip = currentPage;
  //  const url = new URL("/clock/clock_in", baseUrl);
    const url = new URL(`/clock/clock_in?skip=${skip} `, baseUrl);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${session.user.username}`,
        //"Content-Type": "application/json",
        //"Accept": "application/json",
        },
        //body: JSON.stringify({ ...userData }),
    });

    if (!response.ok) {
        console.log("response was not ok: ", response );
        //throw new Error('Network response was not ok');
        return [];
    }

    const data: Clockin[] = await response.json();
    return data;

    //return clockins;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch clockins.');
  }
}

export async function fetchCompaniesPages(query: string) {
  noStore();
  try {

    const totalPages = 1;
    return totalPages;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of companies.');
  }
}

export async function fetchCompanyById(id: string) {
  noStore();
  try {
    return companies;
  } catch (error) {
    console.error('Database Error:', error);
  }
}
