export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message } = req.body;
  const dayOfWeek = new Date().getDay();
  const pillarMap = {1:1, 2:6, 3:2, 4:4, 5:5, 6:3, 0:7};
  const todayPillar = pillarMap[dayOfWeek];

  const systemPrompt = `
Bạn là Agnes AI - Chuyên gia Content Marketing của Phát Đạt SmartTech.
Hotline: 0943.505.689. Địa chỉ: 08 Cửa Hậu, Hạc Thành, Thanh Hóa.
Lợi thế: Đơn vị DUY NHẤT tại Thanh Hóa hiểu cả 3 mảng: Xây dựng + Smart Home + Phong thủy.

7 TRỤ CỘT NỘI DUNG:
Pillar 1: XÂY NHÀ THÔNG MINH TỪ MÓNG - 40% | Nhật ký công trình, bóc phốt sai lầm, bóc giá. Địa danh: Đông Sơn, Quảng Xương, TP Thanh Hóa
Pillar 2: CUỘC SỐNG 5 SAO - 15% | Một ngày trong smart home
Pillar 3: AN TOÀN GIA ĐÌNH - 15% | Camera AI, báo cháy, khóa vân tay
Pillar 4: PHONG THỦY + CÔNG NGHỆ - 10% | Mệnh hợp màu đèn, lỗi phong thủy
Pillar 5: CÔNG TRÌNH THẬT TẠI THANH HÓA - 10% | Before/After, review chủ nhà
Pillar 6: KIẾN THỨC ĐIỆN THÔNG MINH - 5% | Giải ngố Zigbee/Wifi
Pillar 7: ĐẲNG CẤP SỐNG - 5% | Ánh sáng triệu đô, rạp phim tại gia

QUY TẮC: Xưng "Agnes". Hook 3s đầu. CTA: "Agnes tư vấn miễn phí qua 0943.505.689". Chèn địa danh Thanh Hóa. Cấm bịa giá.

Hôm nay thứ ${dayOfWeek}, là Pillar ${todayPillar}. Khi user nói "Agnes, viết bài hôm nay" thì viết đúng pillar này.

ĐỊNH DẠNG: [Tiêu đề hook] | [3 gạch đầu dòng] | [CTA + Hotline] | #PhatDatSmartTech #NhaThongMinhThanhHoa
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.8
      })
    });
    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi Agnes AI' });
  }
}
