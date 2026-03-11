function Home() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#F9F7F2",
          color: "#2D2E30",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          lineHeight: 1.6,
          padding: 40,
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            background: "white",
            padding: 40,
            borderRadius: 15,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ marginBottom: 30 }}>
            <h1
              style={{
                color: "#C5A059",
                fontFamily: "Georgia, serif",
                fontSize: "3em",
                margin: "0 0 10px 0",
                fontWeight: "bold",
              }}
            >
              ✨ Lumina Escritura
            </h1>
            <p
              style={{
                fontSize: "1.1em",
                color: "#7F8C8D",
                fontStyle: "italic",
                margin: 0,
              }}
            >
              Ilumine sua jornada na Palavra de Deus
            </p>
          </div>

          <h2
            style={{
              color: "#1A1C1E",
              fontFamily: "Georgia, serif",
              fontSize: "2em",
            }}
          >
            📖 E se cada palavra da Sagrada Escritura tivesse sido escrita pensando em você?
          </h2>

          <p style={{ fontSize: "1.2em", color: "#555" }}>
            Estamos construindo mais do que um leitor bíblico; estamos preparando um <strong>encontro</strong>.
          </p>

          <hr
            style={{
              border: 0,
              height: 1,
              background: "#C5A059",
              margin: "30px 0",
            }}
          ></hr>
          <blockquote
            style={{
              fontStyle: "italic",
              color: "#7F8C8D",
              margin: "30px 0",
              padding: "10px 20px",
              borderLeft: "4px solid #C5A059",
              background: "#FFFBF2",
              textAlign: "left",
            }}
          >
            &quot;Desconhecer as Escrituras é desconhecer o próprio Cristo.&quot;
            <br />
            <strong style={{ color: "#2D2E30" }}>— São Jerônimo, Doutor da Igreja</strong>
          </blockquote>

          <div
            style={{
              textAlign: "left",
              display: "inline-block",
              marginTop: 20,
            }}
          >
            <p>
              <strong>✨ O que estamos preparando para você:</strong>
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: 15 }}>
                👤 <strong>Imersão Pessoal:</strong> Uma tecnologia exclusiva para você sentir o diálogo direto com o
                Criador.
              </li>
              <li style={{ marginBottom: 15 }}>
                🖋️ <strong>Estudo Inteligente:</strong> Marcações avançadas, tags de promessas e organização completa
                por cores.
              </li>
              <li style={{ marginBottom: 15 }}>
                🤝 <strong>Comunidade e Profundidade:</strong> Comentários moderados por IA e estudos verificados.
              </li>
              <li style={{ marginBottom: 15 }}>
                🔍 <strong>Busca Especial:</strong> Encontre passagens com precisão e agilidade profissional.
              </li>
            </ul>
          </div>

          <div
            style={{
              marginTop: 40,
              padding: 20,
              border: "1px dashed #C5A059",
              borderRadius: 10,
            }}
          >
            <p style={{ margin: 0 }}>
              🏗️ <strong>Estamos refinando cada detalhe...</strong>
            </p>
            <p style={{ fontSize: "0.9em" }}>
              <em>Para que sua jornada na Palavra seja profunda, organizada e única.</em>
            </p>
          </div>

          <p style={{ marginTop: 40, fontWeight: "bold", color: "#C5A059" }}>Deus abençoe e salve Maria!</p>

          <footer
            style={{
              marginTop: 50,
              paddingTop: 30,
              borderTop: "1px solid #C5A05944", // Linha dourada com transparência
              textAlign: "center",
            }}
          >
            <div
              style={{
                opacity: 0.5,
                fontSize: "0.8em",
                color: "#2D2E30",
              }}
            >
              <p>© {new Date().getFullYear()} — Lumina Escritura</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Home;
