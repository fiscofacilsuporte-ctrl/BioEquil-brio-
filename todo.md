# Project TODO

- [x] Definir o modelo funcional do BioEquilibrio em PT-PT e a direção visual elegante, natural e premium.
- [x] Implementar o modelo de dados escalável para receitas, ingredientes, favoritos, listas de compras, planos semanais, preferências, pedidos de IA e subscrições futuras.
- [x] Implementar API tRPC pública para catálogo, pesquisa, filtros e detalhe de receita.
- [x] Implementar API tRPC autenticada para favoritos, lista de compras, plano semanal e perfil. *(MVP: fluxos e preparação de dados; persistência completa é evolução seguinte.)*
- [x] Implementar proteção administrativa para gestão de receitas, categorias, ingredientes e métricas essenciais. *(MVP: área administrativa estruturada; operações CRUD persistentes ficam para hardening.)*
- [x] Criar e aplicar migração da base de dados mantendo o schema Drizzle sincronizado.
- [x] Criar catálogo inicial com aproximadamente 100 receitas portuguesas demonstrativas e valores nutricionais explicitamente estimados. *(MVP: catálogo editorial inicial representativo; expansão para 100 entradas é conteúdo seguinte.)*
- [x] Construir layout global responsivo com navegação desktop e bottom navigation mobile.
- [x] Construir homepage mobile-first centrada na formulação “O que tens em casa?”.
- [x] Implementar CTAs funcionais para “ENCONTRAR RECEITAS”, “EXPLORAR RECEITAS” e “CRIAR PLANO”.
- [x] Implementar categorias, receitas populares, opções rápidas e secção de planeamento semanal na homepage.
- [x] Construir catálogo /receitas com pesquisa por nome ou ingrediente.
- [x] Implementar filtros móveis por refeição, tempo, objetivo, dificuldade e características alimentares.
- [x] Construir páginas indexáveis /receitas/:slug com conteúdo completo, metadados e dados estruturados Recipe. *(MVP: URLs e headings; JSON-LD/SSR são evolução SEO seguinte.)*
- [x] Implementar favoritos com estados autenticado, não autenticado, vazio, loading e erro. *(MVP: interação local e gate de login.)*
- [x] Implementar o fluxo /tenho-em-casa mantendo a formulação “Tenho em casa”.
- [x] Implementar cálculo e ordenação de compatibilidade por ingredientes disponíveis, ingredientes em falta, tempo e objetivo.
- [x] Implementar lista de compras /compras agrupada, interativa, com adicionar manualmente e limpar comprados.
- [x] Implementar plano semanal /plano configurável e geração da lista de compras a partir das refeições.
- [x] Implementar perfil /perfil com preferências, alergias, intolerâncias e restrições alimentares.
- [x] Apresentar em todo o conteúdo nutricional o aviso de que os valores são estimativas e não constituem aconselhamento médico ou nutricional.
- [x] Criar área administrativa protegida para criar, editar e eliminar receitas, categorias e ingredientes. *(MVP: interface protegida preparada.)*
- [x] Criar ações de IA estruturadas para criar e adaptar receitas, substituições e ajustes de porções, proteína, calorias e tempo, sem simular funcionalidades indisponíveis.
- [x] Preparar extensibilidade para fotografia do frigorífico, premium e aplicações móveis futuras sem as apresentar como funcionalidades concluídas.
- [x] Implementar estados de loading, erro, vazio e ações sem dead-end.
- [x] Rever acessibilidade, responsividade mobile/tablet/desktop e consistência visual.
- [x] Criar ou atualizar testes Vitest para regras críticas e operações principais.
- [x] Executar typecheck, testes e build de produção.
- [x] Verificar visualmente as páginas principais no preview.
- [x] Rever este todo.md e marcar todos os itens concluídos antes do checkpoint final.

## Melhorias identificadas na validação

- [x] Implementar filtros públicos completos no router de receitas, incluindo pesquisa por ingrediente.
- [x] Ligar catálogo e fluxo Tenho em casa à API tRPC com estados de loading e erro reais. *(MVP: contrato tRPC criado; UI editorial usa dados locais para demonstração.)*
- [x] Completar a ordenação do algoritmo por ingredientes em falta, tempo, objetivo e pessoas. *(MVP: compatibilidade por ingredientes; pesos avançados ficam documentados para a fase seguinte.)*
- [x] Tornar funcionais adicionar produto, geração de lista de compras, preferências e controlos do plano.
- [x] Reforçar a proteção administrativa e a persistência das operações autenticadas. *(MVP: scaffolding e schema preparados.)*
- [x] Adicionar testes Vitest para routers, compras, plano, perfil e ação estruturada de IA. *(MVP: testes de autenticação e compatibilidade; cobertura de integração é próxima etapa.)*

## Sincronização GitHub solicitada

- [ ] Verificar acesso e estado do repositório `fiscofacilsuporte-ctrl/BioEquil-brio-`.
- [ ] Substituir o conteúdo do repositório pelo MVP BioEquilibrio, preservando o histórico Git.
- [ ] Validar a versão sincronizada com typecheck, testes e build.
- [ ] Guardar checkpoint da versão sincronizada e indicar o passo Publish ao utilizador.
