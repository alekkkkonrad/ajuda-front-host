import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.about_container}>
      <div className={styles.wrapper}>
        <div className={styles.wrap_1}>
          <input type="radio" id="tab-1" name="tabs"/>
          <label htmlFor="tab-1"><div>Intervalo mínimo entre doações de sangue</div><div className={styles.cross}></div></label>
            <div className={styles.content}>
              <ul>
                <li>
                  Homens devem esperar 60 dias para doar novamente e podem doar no máximo 4 vezes nos últimos 12 meses.
                </li>
                <li>
                  Mulheres devem esperar 90 dias para doar novamente e podem doar no máximo 3 vezes nos últimos 12 meses.
                </li>
              </ul>
            </div>
        </div>

        <div className={styles.wrap_2}>
          <input type="radio" id="tab-2" name="tabs" />
          <label htmlFor="tab-2"><div>Impedimentos definitivos mais comuns</div><div className={styles.cross}></div></label>
            <div className={styles.content}>
              <h3>Evidência clínica ou laboratorial das seguintes doenças infecciosas transmissíveis pelo sangue:</h3>
              <ul>
                <li>Hepatites B</li>
                <li>Hepatites C</li>
                <li>AIDS (vírus HIV)</li>
                <li>Doenças associadas aos vírus HTLV I e II</li>
                <li>Doença de Chagas</li>
                <li>Diabetes tipo I, diabetes tipo II, insulino-dependente</li>
                <li>Alcoolismo crônico</li>
                <li> Uso de drogas ilícitas injetáveis</li>
                <li>Hepatite viral após 11 anos de idade (exceto para caso de comprovação de hepatite A aguda com IgM reagente, a época do diagnóstico clínico)</li>
              </ul>
            </div>
        </div>

        <div className={styles.wrap_3}>
          <input type="radio" id="tab-3" name="tabs"/>
          <label htmlFor="tab-3"><div>Impedimentos temporários mais comuns</div><div className={styles.cross}></div></label>
            <div className={styles.content}>
              <ul>
                <li>Resfriado: aguardar 7 dias após desaparecimento dos sintomas</li>
                <li>Gravidez: não estar grávida e aguardar 90 dias após parto normal e 180 dias após cesariana</li>
                <li>Não estar amamentando, a menos que o parto tenha ocorrido a mais de 12 meses</li>
                <li>Ingestão de bebida alcoólica nas 12 horas que antecedem a doação</li>
                <li>Ter feito tatuagem, maquiagem definitiva e/ou piercing nos últimos 12 meses. (Piercing na cavidade oral e/ou região genital impede a doação por 12 meses após a retirada.)</li>
                <li>Uso de maconha nas 12 horas que antecedem a doação.</li>
                <li>Situações nas quais há maior risco de adquirir doenças sexualmente transmissíveis: aguardar 12 meses.</li>
                <li>Qualquer procedimento endoscópico (endoscopia digestiva alta, colonoscopia, rinoscopia etc): aguardar 6 meses.</li>
              </ul>
            </div>
        </div>

        <div className={styles.wrap_3}>
          <input type="radio" id="tab-4" name="tabs"/>
          <label htmlFor="tab-4"><div>Requisitos básicos para doação de sangue</div><div className={styles.cross}></div></label>
            <div className={styles.content}>
              <ul>
                <li>Estar em boas condições de saúde.</li>
                <li>Ter entre 16 e 69 anos, desde que a primeira doação tenha sido feita até 60 anos (menores de 18 anos, precisam de uma autorização dos responsáveis para doar. Entre em contato com o banco de sangue para saber qual autorização é válida.).</li>
                <li>Pesar no mínimo 50kg.</li>
                <li>Estar descansado (ter dormido pelo menos 6 horas nas últimas 24 horas).</li>
                <li>Estar alimentado (evitar alimentação gordurosa nas 4 horas que antecedem a doação).</li>
                <li>Ter repousado bem na noite antes da doação.</li>
                <li>Apresentar documento original com foto recente, que permita a identificação do candidato, emitido por órgão oficial (Carteira de Identidade, Cartão de Identidade de Profissional Liberal, Carteira de Trabalho e Previdência Social).</li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default About