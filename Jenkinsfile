pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'Node 16', type: 'NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/username/my-nest-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            when {
                branch 'master'  // Deploy hanya jika di branch main
            }
            steps {
                sshagent(['server-credentials-id']) {
                    sh '''
                    ssh user@your-server.com "cd /path/to/your/nestjs-app && git pull origin main && npm install && npm run build && pm2 restart app-name"
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
