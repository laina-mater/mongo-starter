class mongoStarter{
    
    startDb(callback){
    var defaultMongoDbLocation = '"C:\\Program Files\\MongoDB\\Server\\3.6\\bin"';
    var defaultDbPath = __dirname + "\\data\\db";
    var passedParamFromNpm = "\"" + process.argv[2] + "\"";

    console.log("passed param from npm: " + passedParamFromNpm);
    if(passedParamFromNpm != '"undefined"'){
      defaultMongoDbLocation = passedParamFromNpm;
    };

    console.log("Path to data\db folder: " + defaultDbPath );
    console.log("default MongoDbLocation: "+ defaultMongoDbLocation );

    var startupPath = __dirname + '\\startup.ps1';
    console.log('powershell startup path: '+ startupPath);
    var childProcess = spawn("powershell.exe",[startupPath, defaultMongoDbLocation, defaultDbPath]);
    childProcess.stdout.on("data",function(data){
      console.log("Powershell Data: " + data);
      if(String(data).includes('waiting for connections')){
        callback();
      }
  });
  childProcess.stderr.on("data",function(data){
      console.log("Powershell Errors: " + data);
  });
   childProcess.on("exit",function(){
      console.log("Powershell Script finished");
  });
  childProcess.stdin.end();
  }
  
}

let mongoStarter = new mongoStarter();