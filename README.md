===========================================
TRABALHO FINAL — CI/CD (Angular + Node + Kubernetes)
===========================================

Aluno: João Victor Marques Sampaio  
Disciplina: Qualidade e Automação (QA)  

-------------------------------------------
DESCRIÇÃO DO PROJETO
-------------------------------------------

Este projeto implementa uma pipeline CI/CD funcional baseada em GitHub Actions e Kubernetes (K3s), para o deploy automatizado de uma aplicação Angular + Node.js + MySQL.

O fluxo realiza:
- Build e push das imagens Docker (backend e frontend)
- Deploy automático no cluster Kubernetes hospedado em uma instância EC2
- Atualização automática dos pods no namespace "app-demo"
- Teste da aplicação via endpoints públicos (frontend e API backend)

-------------------------------------------
LINKS IMPORTANTES
-------------------------------------------

Repositório forkado:
https://github.com/dissectedv/angular-ecommerce-app

Instância AWS (Frontend):
http://3.14.126.94:30050/

API Backend (NodePort):
http://3.14.126.94:30045/api/v1/products

-------------------------------------------
TECNOLOGIAS UTILIZADAS
-------------------------------------------

Frontend: Angular 16 + Nginx  
Backend: Node.js + Express + MySQL  
Infraestrutura: Docker, Kubernetes (K3s), EC2 (Ubuntu 24.04)  
CI/CD: GitHub Actions (build, push e deploy automático)  

-------------------------------------------
EXECUÇÃO DA PIPELINE
-------------------------------------------

A pipeline é acionada automaticamente ao realizar um push para a branch "main".

Etapas principais:

1. BUILD & PUSH
   - Cria as imagens Docker do backend e frontend.
   - Envia para o Docker Hub (vitordissected/backend e vitordissected/frontend).

2. DEPLOY EC2
   - Conecta via SSH na instância AWS.
   - Atualiza os deployments no cluster (namespace app-demo).
   - Reinicia os pods e aplica as novas versões.

3. VERIFICAÇÃO
   - Testa o backend (/api/v1/products).
   - Testa o frontend (/).

-------------------------------------------
ENTREGÁVEL EM VÍDEO
-------------------------------------------

O vídeo "pipeline-execucao.mp4" mostra:
- Push para o repositório GitHub
- Execução completa da pipeline no GitHub Actions
- Deploy automático no cluster
- Aplicação acessível via navegador

-------------------------------------------
ESTRUTURA DO REPOSITÓRIO
-------------------------------------------

.github/workflows/main.yml   -> Pipeline CI/CD  
backend/                     -> API Node.js  
client/                      -> Frontend Angular  
k8s/                         -> Manifests Kubernetes  
README.txt                   -> Documentação do trabalho  

-------------------------------------------
STATUS FINAL
-------------------------------------------

[X] CI/CD funcional  
[X] Deploy automatizado no Kubernetes  
[X] Aplicação online e testada  
[X] Documentação pronta  

-------------------------------------------
OBSERVAÇÃO FINAL
-------------------------------------------

Projeto desenvolvido para fins acadêmicos na disciplina Tópicos Especiais.
