(function () {

var globals = (function () {return this;})();

var reportFunc = function () {};

_.extend(globals.test, {
  setReporter: function (_reportFunc) {
    reportFunc = _reportFunc;
  },

  run: function (onComplete) {
    var run_id = LocalCollection.uuid();
    var local_complete = false;
    var remote_complete = false;
    var done = false;

    var maybeDone = function () {
      if (!done && local_complete && remote_complete) {
        done = true;
        // XXX this is a really sloppy way to GC the test results
        _.defer(function () {
          // XXX use _.defer to avoid calling into minimongo
          // reentrantly. we need to handle this better..
          Meteor._ServerTestResults.remove({run_id: run_id});
        });
        onComplete && onComplete();
      }
    };

    var testRun = Meteor._TestManager.createRun(reportFunc);
    test._currentRun.withValue(testRun, function () {
      testRun.run(function () {
        local_complete = true;
        maybeDone();
      });
    });

    App.call('tinytest/run', run_id);
    var sub_handle = App.subscribe('tinytest/results', run_id);
    var query_handle = Meteor._ServerTestResults.find().observe({
      added: function (doc) {
        if (doc.complete) {
          remote_complete = true;
          maybeDone();
        } else {
          delete doc.cookie; // wouldn't work on client..
          doc.report.server = true;
          reportFunc(doc.report);
        }
      }
    });
  },

  debug: function (cookie, onComplete) {
    var testRun = Meteor._TestManager.createRun(reportFunc);
    test._currentRun.withValue(testRun, function () {
      testRun.debug(cookie, function () {
        onComplete && onComplete();
      });
    });
  }
});

})();