(function() {

  var bindMathOperation = function(btnId, input1Id, input2Id, resultId, operation) {
    var btn = document.getElementById(btnId);
    var result = document.getElementById(resultId);
    if (btn !== null && result !== null) {
      btn.addEventListener('click', function() {
        var input1 = document.getElementById(input1Id);
        var input2 = document.getElementById(input2Id);
        var result = document.getElementById(resultId);
        if (input1 !== null && input2 !== null && result !== null) {
          result.value = operation(input1.value, input2.value);
        }
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function(event) {
    bindMathOperation('btnSum', 'sumA', 'sumB', 'resultSum', add);
    bindMathOperation('btnDiv', 'divA', 'divB', 'resultDiv', div);
  });

})();
