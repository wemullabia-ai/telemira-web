import Popup from '@/components/Popup'
import LiveClock from '@/components/LiveClock'
import VideoPlayer from '@/components/VideoPlayer'
import Horoscopo from '@/components/Horoscopo'
import AdPayaso from '@/components/AdPayaso'
import Chat from '@/components/Chat'
import VisitorCounter from '@/components/VisitorCounter'
import ClientAnimations from '@/components/ClientAnimations'
import CursorTrail from '@/components/CursorTrail'

export default function Home() {
  return (
    <>
      <ClientAnimations />
      <CursorTrail />
      <Popup />

      <div className="page">

        {/* UTILITY BAR */}
        <div className="utility">
          <span>Bienvenido al sitio oficial de TELEMIRA — Más real que la TV real</span>
          <span><LiveClock /></span>
        </div>

        {/* MASTHEAD */}
        <div className="masthead">
          <div className="tm-logo-wrap">
            <div className="tm-logo">
              <span className="tm-letters">TM</span>
              <span className="tm-name">TELEMIRA</span>
            </div>
          </div>
          <div className="cast-photo">
            <img src="/uploads/masthead.jpg" alt="Telemira Telemira" />
          </div>
          <div className="tagline-block">
            <div className="tl-big">No adaptado,<em>nativo.</em></div>
          </div>
        </div>

        {/* NAV */}
        <nav className="nav">
          <a href="/vivo">INICIO</a><span className="sep"> | </span>
          <a href="/vivo">PROGRAMACIÓN</a><span className="sep"> | </span>
          <a href="/vivo">NOTICIAS</a><span className="sep"> | </span>
          <a href="/vivo">CONCURSOS</a><span className="sep"> | </span>
          <a href="/vivo">VIDEOS</a><span className="sep"> | </span>
          <a href="/vivo">FOTOS</a><span className="sep"> | </span>
          <a href="/vivo">FORO</a><span className="sep"> | </span>
          <a href="/vivo">CONTACTO</a><span className="sep"> | </span>
          <a href="/vivo" className="nav-live">● SEÑAL EN VIVO</a>
        </nav>

        {/* MARQUEE */}
        <div className="marquee-wrap">
          <span className="marquee-inner">
            ★ ÚLTIMA HORA: Payaso Terraplanista es visto nuevamente en Talca &nbsp;·&nbsp; ★ Julieta Masilla: las autoridades piden calma &nbsp;·&nbsp; ★ Poetas Extremos: estreno esta noche 22:30 hrs &nbsp;·&nbsp; ★ Dubi gana premio al mejor amigo homotherian del año &nbsp;·&nbsp; ★ Tu Mundo celebra 10 años al aire &nbsp;·&nbsp; ★ Corazón de Alcancía: Diego vuelve del coma &nbsp;·&nbsp; ★ Telemira transmitirá en vivo la final del concurso &nbsp;&nbsp;&nbsp;
          </span>
        </div>

        {/* MAIN GRID */}
        <div className="grid">

          {/* ===== LEFT SIDEBAR ===== */}
          <div className="left-col">

            <div className="box">
              <h3>Noticias de Última Hora</h3>
              <ul className="news-list">
                <li>
                  Payaso Terraplanista fue visto en Talca <span className="badge-new">NUEVO!</span>
                  <a href="/vivo" className="ver-mas">(ver más)</a>
                </li>
                <li>
                  Vecinos reportan ruidos extraños en el cerro
                  <a href="/vivo" className="ver-mas">(ver más)</a>
                </li>
                <li>
                  Luis Mario y Julieta hablan sobre el nuevo matinal Tu Mundo <span className="badge-new">NUEVO!</span>
                  <a href="/vivo" className="ver-mas">(ver más)</a>
                </li>
              </ul>
            </div>

            <div className="box">
              <h3>El Horóscopo de Peter Angels</h3>
              <Horoscopo />
            </div>

            <Chat />

            <div className="box">
              <h3>Televidentes Conectados</h3>
              <div className="body" style={{ textAlign: 'center' }}>
                <VisitorCounter />
              </div>
            </div>

            <AdPayaso />

          </div>

          {/* ===== CENTER COLUMN ===== */}
          <div className="center-col">

            <div className="box">
              <h3>EN VIVO — TELEMIRA</h3>
              <VideoPlayer />
            </div>

            <div className="show-cards-wrap">
              <div className="box-head">NUESTRA PROGRAMACIÓN</div>
              <div className="show-cards">

                <div className="show-card">
                  <img src="/uploads/show-corazon.jpg" alt="Corazón de Alcancía" />
                  <div className="sc-title sc-red">Corazón<br />de Alcancía</div>
                  <div className="sc-desc">La teleserie que te rompe el chanchito.</div>
                  <div className="sc-sched sc-red">Lunes a Viernes<br />19:00 hrs.</div>
                </div>

                <div className="show-card">
                  <img src="/uploads/show-vestidos.jpg" alt="Demasiado Vestidos para Sobrevivir" />
                  <div className="sc-title sc-pink">Demasiado<br />Vestidos para<br />Sobrevivir</div>
                  <div className="sc-desc">Un reality donde el clóset es el enemigo.</div>
                  <div className="sc-sched sc-pink">Lunes<br />22:00 hrs.</div>
                </div>

                <div className="show-card">
                  <img src="/uploads/show-dubi.jpg" alt="Dubi, mi amigo Homotherian" />
                  <div className="sc-title sc-blue">Dubi, mi<br />amigo<br />Homotherian</div>
                  <div className="sc-desc">Aventuras prehistóricas, amistad eterna.</div>
                  <div className="sc-sched sc-blue">Sáb y Dom<br />11:00 hrs.</div>
                </div>

                <div className="show-card">
                  <img src="/uploads/show-poetas.jpg" alt="Poetas Extremos" />
                  <div className="sc-title sc-purple">Poetas<br />Extremos</div>
                  <div className="sc-desc">Poesía al límite. Rimas sin permiso.</div>
                  <div className="sc-sched sc-purple">Viernes<br />23:00 hrs.</div>
                </div>

                <div className="show-card">
                  <img src="/uploads/show-tumundo.jpg" alt="Tu Mundo" />
                  <div className="sc-title sc-gold">Tu Mundo</div>
                  <div className="sc-desc">El matinal que te acompaña siempre.</div>
                  <div className="sc-sched sc-gold">Lunes a Viernes<br />08:00 hrs.</div>
                </div>

              </div>
            </div>

            <div className="banners">
              <div className="banner-lv">
                <span className="env-icon">✉</span>
                <span>ESCRÍBENOS TU OPINIÓN<br />EN NUESTRO LIBRO DE VISITAS</span>
              </div>
              <div className="banner-concurso">
                <div>
                  <div className="concurso-text">CONCURSO ACTIVO!</div>
                  <span className="concurso-sub">Participa por premios todas las semanas</span>
                </div>
                <a href="/vivo" className="clic-btn">CLIC AQUÍ ►</a>
              </div>
            </div>

          </div>

          {/* ===== RIGHT SIDEBAR ===== */}
          <div className="right-col">

            <div className="pub-label">Publicidad</div>

            <div className="ad-block">
              <div className="ad-perkins">
                <span className="brand">Perkins</span>
                <div className="cat">Ropa para Hombre y Dama</div>
                <div className="slogan">&quot;Viste caqui, viste Perkins.&quot;</div>
                <div className="addr">Búscanos en tu caracol más cercano.</div>
              </div>
            </div>

            <div className="ad-block">
              <div className="ad-arepa">
                <img src="https://res.cloudinary.com/dlismekzd/image/upload/v1779551190/telemira/arepa-franklin.png" alt="Arepa Franklin" style={{ width: '100%', display: 'block' }} />
                <span className="slogan">¡LA AREPA QUE TE LLENA DE VERDAD!</span>
                <div className="addr">Pregunta por nuestro carrito en el barrio Franklin.</div>
              </div>
            </div>

            <div className="box">
              <h3>Descargas</h3>
              <ul className="dl-list">
                <li><a href="/vivo">Fondos de pantalla de Telemira</a> <span className="badge-new">NUEVO!</span></li>
                <li><a href="/vivo">Sonidos del Payaso Terraplanista</a></li>
                <li><a href="/vivo">Música de Poetas Extremos</a> <span className="badge-new">NUEVO!</span></li>
                <li><a href="/vivo">Logos y separadores</a></li>
              </ul>
            </div>

            <div className="box">
              <h3>Mejor visto con</h3>
              <div className="browser-note">
                <span className="ie-icon">e</span>
                Internet Explorer 6.0<br />o superior<br />
                Resolución 1024x768
              </div>
            </div>

          </div>

        </div>{/* end grid */}

        {/* FOOTER */}
        <div className="footer">
          <div>
            <div className="foot-links">
              <a href="/vivo">Quiénes Somos</a>
              <a href="/vivo">Términos Legales</a>
              <a href="/vivo">Publicidad</a>
              <a href="/vivo">Trabaja con Nosotros</a>
            </div>
            <div className="copyright">© 2026 Telemira — Todos los derechos reservados.</div>
            <div className="badges-88">
              <div className="badge-88" style={{ background: '#000080', color: '#ffff00' }}>MEJOR<br />SITIO TV<br />★★★★★</div>
              <div className="badge-88" style={{ background: '#cc0000', color: '#ffffff' }}>TELEMIRA<br />OFICIAL</div>
              <div className="badge-88" style={{ background: '#003300', color: '#00ff00' }}>SITIO<br />100%<br />SEGURO</div>
              <div className="badge-88" style={{ background: '#d4d0c8', color: '#000000', border: '2px inset #999' }}>CREADO POR<br />DJ CALEB<br />BANGLADESH</div>
              <div className="badge-88" style={{ background: '#660066', color: '#ffffff' }}>WEB<br />RING TV<br />LATINA</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="visits-label">Visitas desde 1999:</div>
            <span className="counter-sm">01247896</span>
            <span className="sitelock">🔒 SiteLock<br />SECURE</span>
          </div>
        </div>

      </div>{/* end .page */}

      {/* TELEMENSAJERO floating IM */}
      <div id="telemensajero">
        <div style={{ background: '#003399', color: '#ffffff', padding: '3px 6px', fontFamily: 'Tahoma', fontSize: 11, fontWeight: 'bold', border: '1px solid #000000', display: 'flex', justifyContent: 'space-between' }}>
          <span><span className="blink" style={{ color: '#00ff00' }}>●</span> TeleMensajero</span>
          <span style={{ cursor: 'pointer' }}>▴</span>
        </div>
        <div style={{ background: '#d4d0c8', border: '1px solid #999999', borderTop: 0, padding: '4px 6px', fontSize: 10 }}>
          <b style={{ color: '#000066' }}>2 nuevos</b> · saludos pendientes<br />
          <a href="/vivo">Ver bandeja »</a>
        </div>
      </div>

    </>
  )
}
