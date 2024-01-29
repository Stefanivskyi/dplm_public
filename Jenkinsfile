pipeline {
	agent any


	tools {
		nodejs "node10_1_0"
	}

	stages {
		stage('Start') {
			steps {
				script {
					bitbucketStatusNotify(buildState: 'INPROGRESS', credentialsId: 'acherep')
				}
			}
		}
		stage('Clean npm packages installation') {
			when {
				branch 'develop'
			}
			steps {
				script {
					sh '''#!/bin/bash
						source ~/.bash_profile
						rm -rf node_modules && npm install
					'''
				}
			}
		}
		stage('Install npm packages if missing') {
			 when {
				not {
					branch 'develop'
				}
			}
			steps {
				script {
					sh '''#!/bin/bash
						source ~/.bash_profile
						npm install
					'''
				}
			}
		}
		stage('TS Lint') {
			steps {
				script {
					sh '''#!/bin/bash
						source ~/.bash_profile
						npm run lint
					'''
				}
			}
		}
		stage('AOT build') {
			steps {
				script {
					sh '''#!/bin/bash
						source ~/.bash_profile
						npm run build
					'''
				}
			}
		}
		stage('Deploy develop') {
			when {
				branch 'develop'
			}
			steps {
				script {
					sh '''#!/bin/bash
					#source ~/.bash_profile
					rm -vrf /opt/TEST/front2dev/* && cp -vr ./dist/* /opt/TEST/front2dev/
				'''
				}
			}
		}
		stage('Deploy stage') {
			when {
				branch 'stage'
			}
			steps {
				script {
					sh '''#!/bin/bash
					#source ~/.bash_profile
					rm -vrf /opt/TEST/front2stage/* && cp -vr ./dist/* /opt/TEST/front2stage/
				'''
				}
			}
		}
		stage('Final') {
			steps {
				echo 'Finished!'
			}
		}
	}
	post {
		always {
			echo 'this is post area message'
		}
		success {
			echo 'Build success'
			script {
				bitbucketStatusNotify ( buildState: 'SUCCESSFUL', credentialsId: 'acherep')
			}
			script {
			    sh '''#!/bin/bash
				/usr/local/sbin/telegram-notify --success --title "Success" --text "Really unbelievable, `git log -n 1 | grep Author | cut -f2- -d ' '`. Your commit: `git log --format=oneline -n 1 | cut -f2- -d ' '` was built SUCCESS! Details here: ${BUILD_URL}"
			'''
			}
		}
		failure {
			echo 'Build failure'
			script {
				bitbucketStatusNotify(buildState: 'FAILED', credentialsId: 'acherep')
			}
			script {
			    sh '''#!/bin/bash
				/usr/local/sbin/telegram-notify --error --title "Error" --text "`git log -n 1 | grep Author | cut -f2- -d ' '` did something wrong in `git log --format=oneline -n 1 | cut -f2- -d ' '`, your build FAILED. Please Fix it right now! Details here: ${BUILD_URL}"
			'''
			}
		}
	}
}
