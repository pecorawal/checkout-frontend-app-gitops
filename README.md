# Aplicacao nodeJS com API de Confirmação de Pagamentos

A aplicação **checkout-frontend** é uma aplicação que simula o frontend de uma aplicação recebendo as requisições e repassando para o backend da aplicação.  O funcionamento é bastante simples e foca na demonstração de um pipeline completo de CI/CD (Continuous Integration/Continuous Deployment). Sob o ponto de vista de funcionamento do código, essa aplicação receberá requisições em uma interface web e encaminhará para a api de **pagamentos-api** visando obter resposta sobre o sucesso de uma transação de pagamento.


<!-- readme-tree start -->
```
.
├── .github
│   └── workflows
│       └── readme-tree.yml
├── .gitignore
├── Dockerfile
├── README.md
├── ci
│   ├── 00-gitops-token-es.yaml
│   ├── 01-git-task-checkout-frontend.yaml
│   ├── 02-update-gitops-task.yaml
│   ├── 03-rbac.sh
│   └── 04-pipeline-checkout-frontend.yaml
├── package.json
├── server.js
└── tree.bak

4 directories, 12 files
```
<!-- readme-tree end -->
