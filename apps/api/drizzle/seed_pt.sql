-- European-Portuguese (pt-PT) translations for the seeded content.
-- Safe to re-run (pure UPDATEs by key/slug). Edit later in /admin.

-- ── Site text (value_pt) ──
UPDATE site_text SET value_pt = 'Vértice'                                                                    WHERE key = 'hero.title1';
UPDATE site_text SET value_pt = 'Criativo'                                                                   WHERE key = 'hero.title2';
UPDATE site_text SET value_pt = 'Não confies.'                                                               WHERE key = 'hero.taglinePre';
UPDATE site_text SET value_pt = 'Recalcula.'                                                                 WHERE key = 'hero.taglineAccent';
UPDATE site_text SET value_pt = 'AV Técnico · Eventos Chave-na-Mão · Produtos · IA On-chain'                 WHERE key = 'hero.eyebrow';
UPDATE site_text SET value_pt = 'Iniciar projeto'                                                            WHERE key = 'hero.cta';

UPDATE site_text SET value_pt = 'Pergunta à Vértice'                                                         WHERE key = 'assistant.heading';
UPDATE site_text SET value_pt = 'Assistentes verificáveis — treinados no que construímos.'                   WHERE key = 'assistant.sub';
UPDATE site_text SET value_pt = 'Desenhamos e implementamos assistentes e agentes de IA para empresas reais — assentes nos teus próprios dados e a correr em infraestrutura que é tua. De chat para clientes a IA on-chain cuja resposta se recalcula a partir de dados públicos, construímos sistemas em que podes confiar porque os podes verificar.

O assistente à esquerda é o nosso, treinado em tudo o que é Vértice. Pergunta-lhe o que quiseres — ou explora o que podemos construir para ti.' WHERE key = 'assistant.description';
UPDATE site_text SET value_pt = 'Explorar os nossos serviços de IA'                                          WHERE key = 'assistant.linkLabel';
UPDATE site_text SET value_pt = '#services'                                                                  WHERE key = 'assistant.linkUrl';
UPDATE site_text SET value_pt = 'Olá — sou o assistente da Vértice. Pergunta-me tudo sobre o que fazemos e como trabalhamos.' WHERE key = 'assistant.intro';
UPDATE site_text SET value_pt = 'Pergunta sobre a Vértice…'                                                  WHERE key = 'assistant.placeholder';
UPDATE site_text SET value_pt = 'Ainda estou a ser treinado com toda a base de conhecimento da Vértice — em breve fico disponível. Entretanto, deixa a tua pergunta no formulário de contacto abaixo e respondemos de imediato.' WHERE key = 'assistant.reply';

UPDATE site_text SET value_pt = 'Quatro disciplinas,'                                                        WHERE key = 'services.heading1';
UPDATE site_text SET value_pt = 'um vértice.'                                                                WHERE key = 'services.heading2';
UPDATE site_text SET value_pt = 'Produtos comerciais e serviços técnicos, entregues em infraestrutura que é nossa.' WHERE key = 'services.sub';

UPDATE site_text SET value_pt = 'Vamos construir algo'                                                       WHERE key = 'contact.heading1';
UPDATE site_text SET value_pt = 'que se verifica a si mesmo.'                                                 WHERE key = 'contact.heading2';
UPDATE site_text SET value_pt = 'Um palco para gerir, um produto para lançar, um agente para provar — começa aqui.' WHERE key = 'contact.sub';

-- ── Cards (i18n.pt overlay) ──
UPDATE content_card SET i18n = '{"pt":{"name":"Produção Ao Vivo Chave-na-Mão","category":"Eventos","body":"Espaço garantido, equipa e equipamento reunidos, som·AV·palco·iluminação entregues de ponta a ponta — o cliente entra e encontra um espetáculo pronto.","tags":["Sourcing de espaço","FOH","Palco","Iluminação"]}}' WHERE slug = 'work-01';
UPDATE content_card SET i18n = '{"pt":{"name":"Áudio de Broadcast","category":"Broadcast","body":"Mais de 15 anos de som ao vivo e de broadcast — FOH, masterização e áudio de TV entregues no ar, a horas, com qualidade de emissão.","tags":["Som ao vivo","Masterização","TV / broadcast"]}}' WHERE slug = 'work-02';
UPDATE content_card SET i18n = '{"pt":{"name":"Agentes Atestados","category":"IA On-chain","body":"Agentes de IA on-chain autónomos cujos vereditos se recalculam a partir de dados públicos — verificação em vez de confiança, em infraestrutura que é nossa.","tags":["Recompute Kit","ERC-8004","MCPs","CCIP"]}}' WHERE slug = 'work-03';

UPDATE content_card SET i18n = '{"pt":{"name":"AV Técnico","body":"Engenharia e AV faturáveis a partir de uma bancada de técnicos seniores disponíveis — FOH, masterização, broadcast. Colocamos uma equipa no trabalho, não um único nome.","tags":["FOH","Masterização","Broadcast","Formação"]}}' WHERE slug = 'services';
UPDATE content_card SET i18n = '{"pt":{"name":"Eventos Chave-na-Mão","body":"Do espaço à última vénia. Espaços de topo garantidos por mais de 20 anos de relações, montados com uma rede de equipamento parceiro — de ponta a ponta.","tags":["Espaços","Produção","Palco","Iluminação"]}}' WHERE slug = 'events';
UPDATE content_card SET i18n = '{"pt":{"name":"Produtos","body":"Software produtizado com receita recorrente — clock-in.pt, PWA Push, MCPs comerciais, automação n8n — além de desenvolvimentos à medida para clientes.","tags":["SaaS","MCPs","Automação","À medida"]}}' WHERE slug = 'products';
UPDATE content_card SET i18n = '{"pt":{"name":"IA On-chain","body":"IA on-chain verificável e recalculável — o Recompute Kit, agentes autónomos atestados, MCPs especializados e micro-pagamentos A2A.","tags":["Recompute Kit","Agentes","CCIP","A2A"]}}' WHERE slug = 'crypto';

-- Contact form UI strings (EN + PT)
INSERT INTO site_text (key, value, value_pt) VALUES
 ('contact.form.name',      'Your name',                'O teu nome'),
 ('contact.form.email',     'Email',                    'Email'),
 ('contact.form.message',   'What are you building?',   'O que estás a construir?'),
 ('contact.form.submit',    'Start a project',          'Iniciar projeto'),
 ('contact.form.sending',   'Sending…',                 'A enviar…'),
 ('contact.form.thanks',    'Thanks',                   'Obrigado'),
 ('contact.form.thanksSub', 'We''ll be in touch shortly.', 'Entramos em contacto em breve.'),
 ('contact.form.error',     'Couldn''t send — try again, or email us directly below.', 'Não foi possível enviar — tenta novamente, ou envia-nos email diretamente abaixo.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, value_pt = EXCLUDED.value_pt;
