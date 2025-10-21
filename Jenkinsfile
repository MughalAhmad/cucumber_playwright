pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS_18', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}\\bin;${env.PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📦 Cloning repository...'
                git branch: 'main', url: 'https://github.com/MughalAhmad/cucumber_playwright.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📥 Installing project dependencies...'
                bat 'npm install'
            }
        }

        // stage('Install Playwright Browsers') {
        //     steps {
        //         echo '🌐 Installing Playwright browsers...'
        //         bat 'npx playwright install'
        //     }
        // }

        stage('Run Cucumber Tests') {
            steps {
                echo '🚀 Running Cucumber + Playwright tests...'
                bat 'npx test cucumber-js'
            }
        }

        // stage('Publish Reports') {
        //     steps {
        //         echo '📊 Publishing Allure reports...'
        //         allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        //     }
        // }

    }

    post {
        success {
            echo '✅ All tests executed successfully!'
        }
        failure {
            echo '❌ Build failed. Check the logs for details.'
        }
    }
}
