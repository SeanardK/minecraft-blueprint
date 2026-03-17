pipeline {
  agent any

  stages {
    stage('Prepare .env') {
      steps {
        withCredentials([file(credentialsId: 'minecraft_blueprint-env', variable: 'ENV_FILE')]) {
          sh 'rm -f .env && cp $ENV_FILE .env'
        }
      }
    }

    stage('Docker Build & Deploy') {
      steps {
        sh 'docker compose down && docker compose up -d --build'
      }
    }
  }

  post {
    success { echo 'Pipeline completed successfully.' }
    failure { echo 'Pipeline failed.' }
  }
}
