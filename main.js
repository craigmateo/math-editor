var activeID;
var activeDrag;
var totalFields;
var idmax;



/* On keyup: get active element */
$(document).keyup(function(event) {
    let max = 0;
    $('.mq-editable-field').each(function(){
        if($( this ).hasClass('mq-focused') ) {
            activeID =  $( this ).attr('id');
        }
    });

    totalFields = max;

    /* DELETE: Delete active math-field */
    if(event.which === 46) {
        $( "#"+activeID ).remove();
        $( "#" + activeID.replace("math-field","latex") ).remove();
    }

    /* ENTER: Create new math-field below active element */
    else if (event.which == 13) {
        createField();
    }

});

/* click fraction button */
$(document).on("click", "#fraction", function() {
    $('.mq-editable-field').each(function(){
        if($( this ).hasClass('mq-focused') ) {
            console.log($( this ).attr('id'));
            activeID =  $( this ).attr('id');
        }
    });
    if (typeof activeID !== 'undefined') {
        // write to last position of cursor
        let mathFieldSpan = document.getElementById(activeID);
        var mathField = MQ.MathField(mathFieldSpan);
        mathField.write('\\frac{a}{b}');
    }
    else {
        createField();
    }
  });

  /* Create new math field */
  function createField() {
    let max = 0;
    $('.mq-editable-field').each(function(){
        if($( this ).hasClass('mq-focused') ) {
            console.log($( this ).attr('id'));
            activeID =  $( this ).attr('id');
        }
        let id =  $( this ).attr('id');
        let idnum = parseInt(id.slice(-1));
        if (idnum>=max) {
            max=idnum;
        }
    });
    totalFields = max;
    activeID = "math-field"+String(totalFields);

    $('<div class="dragdiv" id="dragdiv' + String(totalFields+1) +'"><div class="dragdivheader" id="dragdivheader' + String(totalFields+1) + '"></div><span class="math-field" id="math-field' + String(totalFields+1) + '"></span></div>').insertAfter( $( "#" + activeID.replace("math-field","dragdiv") ) );
    //$( '<p>Math field' + String(totalFields+1) + ': <span class="math-field" id="math-field' + String(totalFields+1) +'"></span></p>' ).insertAfter( $( "#" + activeID ) );
        $( '<p>LaTeX field' + String(totalFields+1) + ': <span id="latex' + String(totalFields+1) +'"></span></p>' ).insertAfter( $( "#" + activeID.replace("math-field","latex") ) );
        var varName = "mathFieldSpan" + String(totalFields+1);
        varName = document.getElementById('math-field' + String(totalFields+1));

        var varNameLatex = "latexSpan" + String(totalFields+1);
        varNameLatex  = document.getElementById('latex'+ String(totalFields+1))

        var varNameField = "mathField" + String(totalFields+1);
        varNameField = MQ.MathField(varName, {
            spaceBehavesLikeTab: true, // configurable
            handlers: {
              edit: function () {
                // useful event handlers
                varNameLatex.textContent = varNameField.latex() // simple API
              }
            }
          })
          varNameField.focus();
          dragElement(document.getElementById("dragdiv" + String(totalFields+1)));
    }
  