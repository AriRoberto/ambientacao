#!/usr/bin/env groovy
pipeline {
    agent any
    environment {
        IMAGEM_DOCKER = 'dockerhub.camara.leg.br/sesen/ambientacao'
        EMAIL_SECAO = 'ari.vilela@camara.leg.br, marcio.freire@camara.leg.br'
        APROVADORES = 'P_6646, P_999078'
        URL_RANCHER = 'https://rancher.camara.gov.br/v2-beta'
        URL_JENKINS = 'https://jenkins2.camara.gov.br/view/sesen/job/ambientacao'
 //       VERSAO_NODE_JS = 'NodeJS8'
        CONFIG_NODE_JS = '211e3b36-ac91-4e95-8e0a-ccc8c6e847c7'
        CANAL_CHATOPS = 'sesen'
        URL_GIT_REPO_MANIFESTS = 'kubernetes-ambientacao'
        PATH_OVERLAYS = 'overlays'
        DEPLOYMENT = 'deployment.yaml'
        NOME_SERVICO = 'ambientacao'
    }

    tools {
        nodejs 'NodeJS14'
    }

    stages {
        stage('Git checkout') {
            steps {
                echo "Git checkout"
                 checkout scm
                    script {
                        def versions = readJSON file: 'package.json'
                        def tag = versions.version
                        TAG = "${tag}"
                        DEPLOY_EM_PRODUCAO = false
                    }
            }
        }

        stage('Instala as dependencias do projeto') {
            steps {
                echo "Instala as dependencias do projeto"
                sh "npm config set registry https://hub.camara.gov.br/repository/npm-camara/ && npm install"
            }
        }

        stage('Select Ambiente Build') {
            steps {
                echo "Select Ambiente Build"
                script {
                    AMBIENTE_APP = 'dev'
                    if (TAG.endsWith('TES')) {
                        AMBIENTE_APP = 'tes'
                    } else if (TAG.endsWith('HOM')) {
                        AMBIENTE_APP = 'hom'
                    } else if(TAG.endsWith('PRD')) {
                        AMBIENTE_APP = 'prd'
                    }
                }
                //sh "npm run ${AMBIENTE_APP}"
                //sh "npm install" 
            }
        }

        stage('Imagem Docker') {
            steps {
                echo "Imagem Docker"
                withDockerRegistry([credentialsId: 'c34117dc-5fa1-46f8-8ebb-f1cf0b2254c4', url: 'https://dockerhub.camara.leg.br/']) {
                    script {
                        imagem = docker.build("${env.IMAGEM_DOCKER}:${TAG}", ".")
                        imagem.push()
                    }
                }
            }
        }

        stage('Build Imagem Docker Ambiente') {
           steps {
                echo "Build Imagem Docker Ambiente"
                script {

                    if (TAG.endsWith('TES')) {
                        echo "Ambiente TES"
                        patchKubernetes reponame: "${URL_GIT_REPO_MANIFESTS}", 
                            branch: "master", 
                            path: "${PATH_OVERLAYS}/tes/", 
                            file: "${env.DEPLOYMENT}", 
                            container: "${NOME_SERVICO}",
                            kind: "Deployment", 
                            image: "${env.IMAGEM_DOCKER}", 
                            tag: "${TAG}"

                        DEPLOY_APROVACAO_PROD = false
						            rocketSend channel: "${env.CANAL_CHATOPS}", message: "Deploy '${JOB_NAME}' em Teste. Build (${BUILD_NUMBER}) \n\n Painel --> ${env.URL_JENKINS} \n\n Mudanças da Versão --> "

                    } else if (TAG.endsWith('HOM')) {
                        echo "Ambiente HOM"
                        patchKubernetes reponame: "${URL_GIT_REPO_MANIFESTS}", 
                            branch: "master", 
                            path: "${PATH_OVERLAYS}/hom/", 
                            file: "${env.DEPLOYMENT}", 
                            container: "${NOME_SERVICO}",
                            kind: "Deployment", 
                            image: "${env.IMAGEM_DOCKER}", 
                            tag: "${TAG}"

                        DEPLOY_APROVACAO_PROD = false
						            rocketSend channel: "${env.CANAL_CHATOPS}", message: "Deploy '${JOB_NAME}' em Homologação. Build (${BUILD_NUMBER}) \n\n Painel --> ${env.URL_JENKINS} \n\n Mudanças da Versão --> "

                    } else if(TAG.endsWith('PRD')) {
                        echo "Ambiente PRD"
                        echo "Deploy environment PRODUÇÃO"
                        DEPLOY_APROVACAO_PROD = true

                    }
                }
            }
        }
    }
}