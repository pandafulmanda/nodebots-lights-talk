var codeTheBot = (function(){

  var sandbox = null,
    editor,
    JavaScriptMode = require("ace/mode/javascript").Mode;

  return {
    init : _initialize
  };


  function _initialize(){
    if(!editor){
      editor = ace.edit('ace-bot');
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode(new JavaScriptMode());

      ace.config.loadModule("ace/ext/language_tools", function() {
          editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
          });
      });

      _initCodeBotSandbox();
      editor.runCode = runCode;
    }

    return editor;
  }

  // reinitializing sandbox may not be necessary.
  function _initCodeBotSandbox() {
    if (sandbox !== null) {
      sandbox.terminate();
    }

    sandbox = new Worker('/assets/js/sandbox.js');

    sandbox.addEventListener('message', function(e) {
      _initCodeBotSandbox();
      console.log(e.data.code + ' was run.');
    });

    sandbox.addEventListener('error', function(e) {
      _initCodeBotSandbox();
      console.log(e.message);
    });
  }

  function runCode(){
    sandbox.postMessage(editor.getValue());
  }

}());