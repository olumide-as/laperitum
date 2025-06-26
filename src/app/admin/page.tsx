// File: src/app/admin/page.tsx
import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/admin/dashboard');
  return null; // This line is needed to satisfy the requirement for a React component
}