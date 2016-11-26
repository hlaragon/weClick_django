$(document).ready(function() {

	$(".row").height(($(window).height() - $("#header").height())/3);

	
	$("#submitbutton").click(function(){
		submitButton();
	});

	$("input[name='choice']").change(function(){
		$("div.checked").removeClass("checked");
		$(this).closest("div").toggleClass("checked");
	});

	
	 $("#logout").click(function(){
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    })


});

function submitButton() {
	
	var input = $('input[name="choice"]:checked').val();
	console.log(input);
	var firebaseRef = firebase.database().ref();

  	firebaseRef.child(input).transaction(function(current_value) {
    	return current_value + 1;
 	 });
}
