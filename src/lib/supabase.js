import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

const DOCUMENT_BUCKET = 'form-documents';

const safeFileName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, '_');

/**
 * Upload optional attachments, then persist the complete form payload.
 * Throws on any Supabase error so the UI never reports a false success.
 */
export async function saveFormSubmission(table, payload, files = []) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY values.');
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
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY values.');
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
    p_documents: documents,
  });

  if (error) throw error;

  return data;
}
