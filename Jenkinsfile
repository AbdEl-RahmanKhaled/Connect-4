pipeline {
    agent { label 'aws-connect4' }

   stages {
       stage('deploy') {
           steps {
               script {
                    echo 'deploying ....'
                    sh "sudo cp -r . /var/www/html"
               }
            }
        }
   }
}