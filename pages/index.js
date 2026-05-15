import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input || loading) return;
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Agnes AI - Phát Đạt SmartTech</h1>
      <p>Hotline: 0943.505.689 | 08 Cửa Hậu, Hạc Thành, Thanh Hóa</p>
      <div style={{ border: '1px solid #ccc', padding: 20, height: 500, overflowY: 'auto', marginBottom: 10, borderRadius: 8 }}>
        {messages.map((m, i) => (
          <p key={i} style={{ whiteSpace: 'pre-wrap' }}><b>{m.role === 'user'? 'Bạn' : 'Agnes'}:</b> {m.content}</p>
        ))}
        {loading && <p><i>Agnes đang viết...</i></p>}
      </div>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        style={{ width: '75%', padding: 12, fontSize: 16 }}
        placeholder="Gõ: Agnes, viết bài hôm nay"
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: '12px 20px', marginLeft: 10, fontSize: 16 }}>Gửi</button>
    </div>
  );
}
