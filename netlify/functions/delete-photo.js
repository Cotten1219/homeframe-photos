const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { id } = JSON.parse(event.body);

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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 