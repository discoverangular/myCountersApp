app.filter('out', function() {
    return function(input) {
      var output = input;
      if(input == -1)
        output = "";

      return output;
    };
});