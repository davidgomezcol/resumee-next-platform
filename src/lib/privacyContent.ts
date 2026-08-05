import type { Language, MetaRow } from './translations'

export interface PrivacyRow {
  k: string
  fields: { k: string; v: string }[]
}

export interface PrivacySection {
  title: string
  paras: string[]
  items?: string[]
  rows?: PrivacyRow[]
}

export interface PrivacyContent {
  back: string
  eyebrow: string
  title: string
  standfirst: string
  flagLabel: string
  flagText: string
  meta: MetaRow[]
  sections: PrivacySection[]
}

/**
 * The notice describes the site as it is actually built. Two values are still bracketed because
 * they live in accounts rather than in this repo — the GA4 data-retention setting and the host's
 * log retention. The banner at the top of the page stays until those are filled in.
 */
export const privacyContent: Record<Language, PrivacyContent> = {
  en: {
    back: 'Back to site',
    eyebrow: 'Legal',
    title: 'Privacy notice',
    standfirst:
      'How dgomez.dev handles personal data. Plain language, no boilerplate, and nothing that runs before you allow it.',
    flagLabel: 'Before publishing —',
    flagText:
      'Two values in square brackets still need your real settings: the GA4 data-retention period and your host’s log retention. This notice describes the site as built; it is not legal advice.',
    meta: [
      { k: 'Last updated', v: '4 August 2026' },
      { k: 'Controller', v: 'David Gómez' },
      { k: 'Contact', v: 'hi@dgomez.dev' },
      { k: 'Applies to', v: 'dgomez.dev' },
    ],
    sections: [
      {
        title: 'In short',
        paras: [
          'This is a personal site. There are no accounts, no advertising, and no tracking that runs without your permission.',
          'Three things can involve your personal data: the contact form, optional analytics, and the technical logs my hosting provider keeps. Each is described below.',
        ],
      },
      {
        title: 'Who is responsible',
        paras: [
          'David Gómez, an individual based in Bogotá, Colombia, is the data controller for this site.',
          'Write to hi@dgomez.dev about anything in this notice, including requests to see, correct, or delete what I hold about you.',
        ],
      },
      {
        title: 'The contact form',
        paras: [
          'If you send a message, I receive the name, email address, subject, and message text you typed, plus your answer to the arithmetic question that keeps automated submissions out.',
          'I use this only to read your message and reply to it. I do not add you to a mailing list and I do not pass it to anyone for marketing.',
          'Messages reach me by email through Zoho Mail. I keep correspondence for as long as it is useful to the conversation, and delete it sooner if you ask.',
        ],
      },
      {
        title: 'Analytics, only if you accept',
        paras: [
          'I use Google Analytics 4 to see which pages get read and where visitors arrive from. It is switched off until you accept it.',
          'Before you choose, Google Consent Mode is set to denied for analytics storage, ad storage, ad user data, and ad personalisation, and the Google tag is not loaded at all. No analytics cookie exists on your first visit.',
          'If you accept, GA4 sets the cookies listed in section 06 and receives your IP address, which Google uses to derive an approximate location and then discards rather than storing. It also receives the pages you view, the referring page, and basic device and browser information. Google Signals, advertising features, and data sharing for advertising purposes are switched off.',
          'If you reject later, the consent signal is set back to denied and the analytics cookies on this domain are deleted. You can change your mind at any time using Cookie settings in the site footer.',
        ],
      },
      {
        title: 'What is stored in your browser',
        paras: [
          "Two small values are kept in your browser's local storage. Neither is sent to a server, and neither identifies you.",
          'Clearing your browser storage removes both, and the consent band will appear again on your next visit.',
        ],
        items: [
          'Language preference — whether you are reading in English or Spanish.',
          'dg-consent-v1 — your cookie decision, with a version number and the time you made it. The version number exists so that I can ask again if this notice changes materially.',
        ],
      },
      {
        title: 'Cookies',
        paras: [
          'The site sets no cookies of its own. The only cookies that can appear are Google Analytics cookies, and only after you accept.',
        ],
        rows: [
          {
            k: '_ga',
            fields: [
              { k: 'Set by', v: 'Google Analytics 4' },
              { k: 'Purpose', v: 'Distinguishes one visitor from another' },
              { k: 'Duration', v: '2 years' },
              { k: 'Condition', v: 'Only after you accept' },
            ],
          },
          {
            k: '_ga_<container id>',
            fields: [
              { k: 'Set by', v: 'Google Analytics 4' },
              { k: 'Purpose', v: 'Keeps session state' },
              { k: 'Duration', v: '2 years' },
              { k: 'Condition', v: 'Only after you accept' },
            ],
          },
        ],
      },
      {
        title: 'Why I am allowed to do this',
        paras: [
          'For visitors covered by the GDPR or UK GDPR, these are the purposes, the legal bases, and how long each thing lasts.',
        ],
        rows: [
          {
            k: 'Replying to your message',
            fields: [
              { k: 'Data', v: 'Name, email, subject, message' },
              { k: 'Basis', v: 'Legitimate interest — Art. 6(1)(f)' },
              { k: 'Retention', v: 'While the conversation is useful' },
            ],
          },
          {
            k: 'Analytics',
            fields: [
              { k: 'Data', v: 'Pages viewed, referrer, device, approximate location' },
              { k: 'Basis', v: 'Your consent — Art. 6(1)(a) and ePrivacy Art. 5(3)' },
              { k: 'Retention', v: '[GA4 retention setting, up to 14 months]' },
            ],
          },
          {
            k: 'Remembering your choices',
            fields: [
              { k: 'Data', v: 'Language, consent record' },
              { k: 'Basis', v: 'Strictly necessary — ePrivacy Art. 5(3) exemption' },
              { k: 'Retention', v: 'Until you clear your browser storage' },
            ],
          },
          {
            k: 'Serving the site and keeping it secure',
            fields: [
              { k: 'Data', v: 'IP address and request metadata in server logs' },
              { k: 'Basis', v: 'Legitimate interest — Art. 6(1)(f)' },
              { k: 'Retention', v: "[Netlify's log retention]" },
            ],
          },
        ],
      },
      {
        title: 'Who else touches the data',
        paras: ['I use a small number of providers, each acting on my instructions.'],
        items: [
          'Google Ireland Limited and Google LLC — analytics, only with your consent.',
          'Netlify — serving the site and keeping short-lived request logs.',
          'Zoho Mail — delivering messages from the contact form.',
          'I do not sell personal data, and I have no advertising partners.',
        ],
      },
      {
        title: 'Data leaving Europe',
        paras: [
          'I am based in Colombia, and the providers above operate from the United States and the European Union.',
          "Where personal data leaves the European Economic Area or the United Kingdom, those transfers rely on the European Commission's Standard Contractual Clauses and, for Google, the EU–US Data Privacy Framework, as published by each provider.",
        ],
      },
      {
        title: 'Your rights',
        paras: [
          'If the GDPR or UK GDPR applies to you, you can ask me to confirm what I hold about you and give you a copy, correct it, delete it, restrict or object to how I use it, or send it to another provider. You can withdraw consent at any time — for analytics you can do that yourself with Cookie settings in the footer.',
          'Write to hi@dgomez.dev and I will reply within 30 days. If you are not satisfied, you can complain to the data protection authority in your country.',
          'Visitors in Colombia have equivalent rights under Law 1581 of 2012 and may complain to the Superintendencia de Industria y Comercio.',
        ],
      },
      {
        title: 'Children',
        paras: [
          'This site is not aimed at children, and I do not knowingly collect personal data from anyone under 16.',
        ],
      },
      {
        title: 'Changes to this notice',
        paras: [
          'If anything material changes, I will update the date at the top of this page. Where the change affects what you consented to, the stored consent record is versioned so that the choice can be asked again rather than assumed.',
        ],
      },
    ],
  },
  es: {
    back: 'Volver al sitio',
    eyebrow: 'Legal',
    title: 'Aviso de privacidad',
    standfirst:
      'Cómo dgomez.dev trata los datos personales. Lenguaje claro, sin plantillas, y nada que se ejecute antes de que lo permitas.',
    flagLabel: 'Antes de publicar —',
    flagText:
      'Dos valores entre corchetes aún necesitan tus ajustes reales: el periodo de retención de datos de GA4 y la retención de logs de tu proveedor de hosting. Este aviso describe el sitio tal como está construido; no es asesoría legal.',
    meta: [
      { k: 'Actualizado', v: '4 de agosto de 2026' },
      { k: 'Responsable', v: 'David Gómez' },
      { k: 'Contacto', v: 'hi@dgomez.dev' },
      { k: 'Aplica a', v: 'dgomez.dev' },
    ],
    sections: [
      {
        title: 'En resumen',
        paras: [
          'Este es un sitio personal. No hay cuentas, ni publicidad, ni seguimiento que se ejecute sin tu permiso.',
          'Tres cosas pueden involucrar tus datos personales: el formulario de contacto, la analítica opcional y los registros técnicos que guarda mi proveedor de hosting. Cada una se explica abajo.',
        ],
      },
      {
        title: 'Quién es responsable',
        paras: [
          'David Gómez, persona natural radicada en Bogotá, Colombia, es el responsable del tratamiento de datos de este sitio.',
          'Escribe a hi@dgomez.dev por cualquier tema de este aviso, incluidas solicitudes para consultar, corregir o eliminar lo que tengo sobre ti.',
        ],
      },
      {
        title: 'El formulario de contacto',
        paras: [
          'Si envías un mensaje, recibo el nombre, el correo, el asunto y el texto que escribiste, más tu respuesta a la pregunta aritmética que evita envíos automatizados.',
          'Lo uso únicamente para leer tu mensaje y responderlo. No te agrego a ninguna lista de correo ni entrego esos datos a nadie con fines de marketing.',
          'Los mensajes me llegan por correo a través de Zoho Mail. Conservo la correspondencia mientras sea útil para la conversación, y la elimino antes si me lo pides.',
        ],
      },
      {
        title: 'Analítica, solo si aceptas',
        paras: [
          'Uso Google Analytics 4 para ver qué páginas se leen y desde dónde llegan las visitas. Está desactivado hasta que lo aceptes.',
          'Antes de que elijas, el Consent Mode de Google está en denegado para almacenamiento de analítica, de publicidad, de datos de usuario publicitarios y de personalización, y la etiqueta de Google no se carga en absoluto. En tu primera visita no existe ninguna cookie de analítica.',
          'Si aceptas, GA4 instala las cookies de la sección 06 y recibe tu dirección IP, que Google usa para deducir una ubicación aproximada y luego descarta en lugar de almacenarla. También recibe las páginas que ves, la página de referencia y datos básicos de dispositivo y navegador. Google Signals, las funciones de publicidad y la compartición de datos con fines publicitarios están desactivadas.',
          'Si más adelante rechazas, la señal de consentimiento vuelve a denegado y las cookies de analítica de este dominio se eliminan. Puedes cambiar de opinión en cualquier momento con Cookies en el pie del sitio.',
        ],
      },
      {
        title: 'Qué se guarda en tu navegador',
        paras: [
          'Se guardan dos valores pequeños en el almacenamiento local de tu navegador. Ninguno se envía a un servidor y ninguno te identifica.',
          'Si borras el almacenamiento de tu navegador se eliminan ambos, y la banda de consentimiento volverá a aparecer en tu próxima visita.',
        ],
        items: [
          'Preferencia de idioma — si estás leyendo en inglés o en español.',
          'dg-consent-v1 — tu decisión sobre cookies, con un número de versión y la hora en que la tomaste. El número de versión existe para poder volver a preguntar si este aviso cambia de forma sustancial.',
        ],
      },
      {
        title: 'Cookies',
        paras: [
          'El sitio no instala cookies propias. Las únicas cookies que pueden aparecer son las de Google Analytics, y solo después de que aceptes.',
        ],
        rows: [
          {
            k: '_ga',
            fields: [
              { k: 'Instalada por', v: 'Google Analytics 4' },
              { k: 'Finalidad', v: 'Distingue a un visitante de otro' },
              { k: 'Duración', v: '2 años' },
              { k: 'Condición', v: 'Solo si aceptas' },
            ],
          },
          {
            k: '_ga_<id de contenedor>',
            fields: [
              { k: 'Instalada por', v: 'Google Analytics 4' },
              { k: 'Finalidad', v: 'Mantiene el estado de la sesión' },
              { k: 'Duración', v: '2 años' },
              { k: 'Condición', v: 'Solo si aceptas' },
            ],
          },
        ],
      },
      {
        title: 'Por qué puedo hacer esto',
        paras: [
          'Para visitantes cubiertos por el GDPR o el UK GDPR, estas son las finalidades, las bases legales y la duración de cada tratamiento.',
        ],
        rows: [
          {
            k: 'Responder tu mensaje',
            fields: [
              { k: 'Datos', v: 'Nombre, correo, asunto, mensaje' },
              { k: 'Base', v: 'Interés legítimo — art. 6(1)(f)' },
              { k: 'Conservación', v: 'Mientras la conversación sea útil' },
            ],
          },
          {
            k: 'Analítica',
            fields: [
              { k: 'Datos', v: 'Páginas vistas, referencia, dispositivo, ubicación aproximada' },
              { k: 'Base', v: 'Tu consentimiento — art. 6(1)(a) y ePrivacy art. 5(3)' },
              { k: 'Conservación', v: '[ajuste de retención de GA4, hasta 14 meses]' },
            ],
          },
          {
            k: 'Recordar tus decisiones',
            fields: [
              { k: 'Datos', v: 'Idioma, registro de consentimiento' },
              { k: 'Base', v: 'Estrictamente necesario — excepción del art. 5(3) ePrivacy' },
              { k: 'Conservación', v: 'Hasta que borres el almacenamiento del navegador' },
            ],
          },
          {
            k: 'Servir el sitio y mantenerlo seguro',
            fields: [
              { k: 'Datos', v: 'Dirección IP y metadatos de solicitud en los logs' },
              { k: 'Base', v: 'Interés legítimo — art. 6(1)(f)' },
              { k: 'Conservación', v: '[retención de logs de Netlify]' },
            ],
          },
        ],
      },
      {
        title: 'Quién más trata los datos',
        paras: [
          'Uso un número reducido de proveedores, cada uno actuando siguiendo mis instrucciones.',
        ],
        items: [
          'Google Ireland Limited y Google LLC — analítica, solo con tu consentimiento.',
          'Netlify — servir el sitio y guardar logs de solicitud de corta duración.',
          'Zoho Mail — entregar los mensajes del formulario de contacto.',
          'No vendo datos personales y no tengo socios publicitarios.',
        ],
      },
      {
        title: 'Datos que salen de Europa',
        paras: [
          'Estoy radicado en Colombia y los proveedores anteriores operan desde Estados Unidos y la Unión Europea.',
          'Cuando los datos personales salen del Espacio Económico Europeo o del Reino Unido, esas transferencias se apoyan en las Cláusulas Contractuales Tipo de la Comisión Europea y, en el caso de Google, en el EU–US Data Privacy Framework, según publica cada proveedor.',
        ],
      },
      {
        title: 'Tus derechos',
        paras: [
          'Si te aplica el GDPR o el UK GDPR, puedes pedirme que confirme qué tengo sobre ti y te entregue una copia, que lo corrija, que lo elimine, que restrinja u objete su uso, o que lo envíe a otro proveedor. Puedes retirar tu consentimiento en cualquier momento; para la analítica puedes hacerlo tú mismo con Cookies en el pie de página.',
          'Escribe a hi@dgomez.dev y responderé en un plazo de 30 días. Si no queda resuelto, puedes reclamar ante la autoridad de protección de datos de tu país.',
          'Los visitantes en Colombia tienen derechos equivalentes bajo la Ley 1581 de 2012 y pueden reclamar ante la Superintendencia de Industria y Comercio.',
        ],
      },
      {
        title: 'Menores',
        paras: [
          'Este sitio no está dirigido a menores y no recojo de forma consciente datos personales de personas menores de 16 años.',
        ],
      },
      {
        title: 'Cambios en este aviso',
        paras: [
          'Si algo cambia de forma sustancial, actualizaré la fecha al inicio de esta página. Cuando el cambio afecte aquello que consentiste, el registro de consentimiento está versionado para poder volver a preguntar en lugar de asumir la respuesta.',
        ],
      },
    ],
  },
}
