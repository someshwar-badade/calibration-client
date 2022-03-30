pipeline {
  agent any
  environment {
    NEW_VERSION = "1.1.3"
  }
 parameters {
	choice(name: 'VERSION', choices: ['1.1.0','1.2.0','1.3.0'], description: '')
	booleanParam(name: 'executeTests', defaultValue: true, description: '')
}
  stages {
    stage("build") {
      steps {
        echo "Building ver:${NEW_VERSION}"
        echo "building....."
        
      }
    }
    
     stage("test") {
       when {
         expression {
          params.executeTests
         }
       }
      steps {
        echo "testing....."
      }
    }
    
     stage("deploy") {
      steps {
        echo "deploying..... version=${params.VERSION}"
      }
    }
    
  }
}
