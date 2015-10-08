var py = global.pythonNamespace = {};

var path = require('path');
var rfLocation = path.dirname(__filename);
py.rfLocation= rfLocation;
py.referencesToChildren= [];
var processes = require('./processes.js');

argv = global.argv;


module.exports = {
  killAll: function() {
    // TODO: kill all child processes
    for (var i = 0; i < py.referencesToChildren.length; i++) {
      py.referencesToChildren[i].childProcess.kill();
    }
  },
  startTraining: function() {
    argv.numCPUs = argv.numCPUs || -1;
    console.log('in one part of your machine, we will be training a randomForest');

    // if(argv.dev || argv.devKaggle) {
    //   module.exports.makePredictions();

    // } else {

      processes.formatInitialData( function() {
        // TODO: load up the list of classifier names, and invoke kickOffTraining on each of them
        // TODO: make sure we have purged all hardcoded references to 'clRandomForest' or anything else relating to RF

        processes.kickOffForestTraining( function() {
          module.exports.makePredictions();
        }, 'clRandomForest');
      });

    // }
  },
  makePredictions: function(rfPickle) {
    // TODO: we still have hardcoded values here
    rfPickle = rfPickle || py.rfLocation + '/' + 'bestRF.p';
    processes.makePredictions( function() {
      process.emit('algoFinishedTraining');
      console.log('when you came to a fork in the woods, you trained a machine to explore not just all the immediate possibilities down either side, but all the forks that came after that.');
      console.log('we have finished training, tuning, and making predictions from a randomForest- typically one of the most predictive algorithms out there.');
      console.log('Thanks for letting us help you find your way through this dataset!');
    }, rfPickle);
  }

};
