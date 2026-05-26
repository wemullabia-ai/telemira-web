export default function Vivo() {
  return (
    <div style={{
      background: '#000080',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Tahoma, Arial, sans-serif',
      padding: '20px',
      boxSizing: 'border-box',
    }}>

      {/* Barra superior retro */}
      <div style={{
        width: '100%', maxWidth: 700,
        background: '#001a6e',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 16px', boxSizing: 'border-box',
        borderBottom: '2px solid #ffcc00',
      }}>
        <a href="/" style={{ color: '#ffcc00', fontWeight: 'bold', fontSize: 12, textDecoration: 'none' }}>← Volver al sitio</a>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 13, letterSpacing: 2 }}>TELEMIRA — SEÑAL EN VIVO</div>
        <div style={{ width: 80 }} />
      </div>

      {/* Caja principal estilo ventana Windows */}
      <div style={{
        width: '100%', maxWidth: 700,
        border: '3px solid #ffcc00',
        background: '#000080',
        marginTop: 0,
      }}>

        {/* Titlebar */}
        <div style={{
          background: 'linear-gradient(to right, #000080, #1084d0)',
          padding: '4px 8px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '2px solid #ffcc00',
        }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: 12, fontFamily: 'Tahoma' }}>
            📺 TELEMIRA.COM — Señal en Vivo
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['_', '□', 'X'].map(b => (
              <div key={b} style={{
                background: '#d4d0c8', color: '#000', width: 18, height: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 'bold', border: '1px outset #fff', cursor: 'default'
              }}>{b}</div>
            ))}
          </div>
        </div>

        {/* Texto BAJO CONSTRUCCIÓN — encima de la imagen, sin taparla */}
        <div style={{
          background: '#001a6e',
          padding: '14px 24px',
          textAlign: 'center',
          borderBottom: '2px solid #ffcc00',
        }}>
          <div style={{
            display: 'inline-block',
            background: '#cc0000',
            color: '#ffff00',
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontWeight: 'bold',
            fontSize: 20,
            padding: '6px 22px',
            letterSpacing: 3,
            border: '3px solid #ffff00',
            textShadow: '1px 1px 0 #000',
            boxShadow: '0 0 16px rgba(255,0,0,0.6)',
          }}>
            🚧 BAJO CONSTRUCCIÓN 🚧
          </div>
          <div style={{
            color: '#aaa',
            fontSize: 11,
            marginTop: 8,
            fontFamily: 'Tahoma',
            letterSpacing: 1,
          }}>
            Estamos trabajando para traerte la mejor señal. —{' '}
            <span style={{ color: '#ffcc00' }}>Canal 7 Telemira</span>
          </div>
        </div>

        {/* Imagen mono */}
        <div style={{ width: '100%', background: '#000' }}>
          <img
            src="/uploads/bajo-construccion-mono.jpg"
            alt="Bajo Construcción"
            style={{ width: '100%', display: 'block' }}
          />
        </div>

        {/* Barra inferior */}
        <div style={{
          background: '#001a6e',
          borderTop: '2px solid #ffcc00',
          padding: '8px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
          fontSize: 10, color: '#aaa', letterSpacing: 1,
        }}>
          <span style={{ color: '#ffcc00' }}>● EN VIVO</span>
          <span>PRÓXIMAMENTE</span>
          <span style={{ color: '#ffcc00' }}>TELEMIRA CANAL 7</span>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  )
}
