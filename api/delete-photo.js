import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.body;

    // 먼저 사진 정보 가져오기
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('filename')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Storage에서 파일 삭제
    const { error: storageError } = await supabase.storage
      .from('photos')
      .remove([photo.filename]);

    if (storageError) throw storageError;

    // 데이터베이스에서 레코드 삭제
    const { error: dbError } = await supabase
      .from('photos')
      .delete()
      .eq('id', id);

    if (dbError) throw dbError;

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 