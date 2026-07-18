import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Use fallback placeholders if environment variables are missing during static build/run
// to prevent the application from crashing at startup with a white screen.
const supabaseUrl = rawUrl || 'https://placeholder-url.supabase.co';
const supabaseKey = rawKey || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

const DOCUMENT_BUCKET = 'form-documents';

const safeFileName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, '_');

/**
 * Upload optional attachments, then persist the complete form payload.
 * Falls back to mock data if Supabase environment variables are missing/placeholders.
 */
export async function saveFormSubmission(table, payload, files = []) {
  if (!rawUrl || !rawKey || rawUrl.includes('placeholder') || rawKey.includes('placeholder')) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockId = crypto.randomUUID();
    const documents = files.map(file => ({
      name: file.name,
      path: `${table}/${mockId}/${safeFileName(file.name)}`,
      size: file.size,
      type: file.type
    }));
    return {
      id: mockId,
      ...payload,
      documents,
      created_at: new Date().toISOString()
    };
  }

  const submissionId = crypto.randomUUID();
  const documents = [];

  for (const file of files) {
    const path = `${table}/${submissionId}/${safeFileName(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from(DOCUMENT_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) throw uploadError;
    documents.push({ name: file.name, path, size: file.size, type: file.type });
  }

  const { data, error } = await supabase
    .from(table)
    .insert([{ ...payload, documents }])
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function saveBuyerEnquiry(payload, files = []) {
  if (!rawUrl || !rawKey || rawUrl.includes('placeholder') || rawKey.includes('placeholder')) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockId = crypto.randomUUID();
    const documents = files.map(file => ({
      name: file.name,
      path: `buyer_enquiries/${mockId}/${safeFileName(file.name)}`,
      size: file.size,
      type: file.type
    }));
    return {
      id: mockId,
      ...payload,
      documents,
      created_at: new Date().toISOString()
    };
  }

  const submissionId = crypto.randomUUID();
  const documents = [];

  for (const file of files) {
    const path = `buyer_enquiries/${submissionId}/${safeFileName(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from(DOCUMENT_BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (uploadError) throw uploadError;
    documents.push({ name: file.name, path, size: file.size, type: file.type });
  }

  const { data, error } = await supabase.rpc('submit_buyer_enquiry', {
    p_owner_name: payload.owner_name,
    p_vehicle_type: payload.vehicle_type,
    p_brand: payload.brand,
    p_budget: payload.budget,
    p_city: payload.city,
    p_phone: payload.phone,
    p_fuel: payload.fuel ?? null,
    p_transmission: payload.transmission ?? null,
    p_documents: documents,
  });

  if (error) throw error;

  return Array.isArray(data) ? data[0] : data;
}
