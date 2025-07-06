const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const formData = JSON.parse(event.body);
    const { photo, description } = formData;

    // Base64 이미지를 Supabase Storage에 업로드
    const fileName = `photos/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.jpg`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, photo, {
        contentType: 'image/jpeg',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName);

    // 데이터베이스에 메타데이터 저장
    const { data: dbData, error: dbError } = await supabase
      .from('photos')
      .insert([
        {
          filename: fileName,
          url: publicUrl,
          description: description || '',
          uploaded_at: new Date().toISOString()
        }
      ])
      .select();

    if (dbError) throw dbError;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbData[0])
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 