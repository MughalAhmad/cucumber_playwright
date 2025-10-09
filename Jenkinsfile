pipeline {
    agent any

    tools {
        nodejs "NodeJS_18" // Define Node version (configured in Jenkins)
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/MughalAhmad/cucumber_playwright.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright install'
                sh 'npm run test'
            }
        }

        stage('Publish Reports') {
            steps {
                allure([
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**', fingerprint: true
        }
    }
}
