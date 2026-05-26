'use client'

export default function VideoPlayer() {
  return (
    <div style={{
      background: '#000080',
      border: '2px solid #ffcc00',
      fontFamily: 'Tahoma, Arial, sans-serif',
      color: '#fff',
      overflow: 'hidden',
    }}>
      {/* Banner de Bajo Construcción (arriba, sin tapar la imagen) */}
      <div style={{
        background: '#cc0000',
        color: '#ffff00',
        textAlign: 'center',
        padding: '8px 12px',
        fontWeight: 'bold',
        fontSize: '14px',
        letterSpacing: '2px',
        borderBottom: '2px solid #ffcc00',
        textShadow: '1px 1px 0 #000',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
      }}>
        🚧 SECCIÓN BAJO CONSTRUCCIÓN 🚧
      </div>

      {/* Imagen */}
      <div style={{ position: 'relative', width: '100%', background: '#000' }}>
        <img
          src="/uploads/bajo-construccion-mono.jpg"
          alt="Bajo Construcción"
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      {/* Subtexto */}
      <div style={{
        background: '#001a6e',
        padding: '6px 10px',
        textAlign: 'center',
        fontSize: '10px',
        color: '#aaa',
        letterSpacing: '1px',
        borderTop: '2px solid #ffcc00',
      }}>
        Estamos preparando nuestra señal en línea. — <span style={{ color: '#ffcc00' }}>Canal 7 Telemira</span>
      </div>
    </div>
  )
}
