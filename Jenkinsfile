pipeline {
    agent any
    
    environment {
        NODE_HOME = tool 'NodeJS'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo 'Repository checked out successfully'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat 'npm install'
                echo 'Installing Playwright browsers...'
                bat 'npx playwright install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running Playwright tests...'
                bat 'npx playwright test'
            }
        }
    }
    
    post {
        always {
            echo 'Generating test reports...'
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                keepAll: true,
                alwaysLinkToLastBuild: true
            ])
            
            // Archive test results
            archiveArtifacts artifacts: 'test-results/**/*.xml', 
                             allowEmptyArchive: true
        }
        
        success {
            echo '✓ All tests passed successfully!'
        }
        
        failure {
            echo '✗ Tests failed. Check the Playwright Report for details.'
        }
    }
}
