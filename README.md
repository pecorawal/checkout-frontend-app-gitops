# Aplicacao nodeJS com API de Confirmação de Pagamentos

A aplicação **checkout-frontend** é uma aplicação que simula o frontend de uma aplicação recebendo as requisições e repassando para o backend da aplicação.  O funcionamento é bastante simples e foca na demonstração de um pipeline completo de CI/CD (Continuous Integration/Continuous Deployment). Sob o ponto de vista de funcionamento do código, essa aplicação receberá requisições em uma interface web e encaminhará para a api de **pagamentos-api** visando obter resposta sobre o sucesso de uma transação de pagamento.


<!-- readme-tree start -->


Observando a árvore temos o código fonte em NodeJs na raiz do repositório.
O arquivo **Dockerfile** é para a criação da imagem de container, durante o processo do build.

O diretório **ci**  possui detalhes do workflow de CI para que o desenvolvedor possa criar o pipeline utilizando OpenShift Pipelines (TekTon), basta adequar uma vez aos parametros do seu repositorio e do repositorio de artefatos (neste exemplo, o repositório está como nome **gitops-workloads-helm**) e seguir a ordem numérica dos arquivos e já poderá criar o build para as imagens da aplicação.

Os arquivos do pipeline foram desenvolvidos para execução sem nenhuma credencial exposta para melhor uso e proteção das aplicações, bem como das credenciais de um cluster Kubernetes/OpenShift.

O arquivo **00-gitops-token-es.yaml** faz referencia a um operador denominado ***External Secrets Operator for Red Hat OpenShift***, o qual nele foi configurado o vault externo, o qual armazena as credenciais que a aplicação, o pipeline e o git necessitam para funcionamento automatizado sem exposição de credenciais. Neste repositório é possivel observar a referencia das credenciais apenas ao nome do secret criado no vault e este por sua vez tem a condição de trazer a resposta sem intervenção do usuário e sem armazenar ou trafegar senhas, certificados ou credenciais via rede.

O arquivo **02-update-gitops-task.yaml** é responsável pela atualização do repositório de definições e políticas da aplicação. Este arquivo gerará a nova TAG que será utilizada para a aplicação possa ser executada no repositório de dev na nova TAG do build recém gerado.

Como neste diretório, a aplicação deve apenas gerar uma imagem de build, o arquivo **03-rbac.sh** pode ser adequado para que o namespace de ci, logo essa RBACs são criadas para dar a permissão de utilizar a imagem que é gerada no namespace de ci para um local de deploy para testes do desenvolvedor ou equipe designada para testes em outro namespace somente para essa finalidade.

Por último temos o arquivo do pipeline **04-pipeline-pagamentos.yaml** o qual organiza a ordem de execução de tasks para criação de uma imagem de container com build e versionada, pronta para uso em outros ambientes. 

Ao final da execução do pipeline, uma vez que obtenha o sucesso esperado ele efetua a atualização da tag de versão do container no repositório Helm que é destinado exclusivamente para deploy da aplicação. O pipeline executará a tarefa de commit no repositório remoto, visando atualizar o arquivo **values-dev.yaml** no valor destinado a versão da tag. 

