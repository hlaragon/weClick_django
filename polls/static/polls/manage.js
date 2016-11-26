var count = 1;
var time;
var data = [];

$(document).ready(function(){

    $("#resetButton").click(function(){
        count = 1;
        document.getElementById("sec").innerHTML = "00";
        document.getElementById("min").innerHTML = "00";
        data = [];
        clearData();

    });

	$("#startButton").click(function(){
		if (count == 1){
			$(this).val("Stop");
			time();
			count++;
		} else if(count == 2) {
			clearInterval(timer);
			$(this).val("Start");

		}
	});

	$("#resultsButton").click(function(){
		drawChart();
	});

    $("#logout").click(function(){
        firebase.auth().signOut().then(function() {
            window.location.href = 'index.html'
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    });


});






function pad(val) {
    return val > 9 ? val : "0" + val;
}

function time() {
	var sec = 0;
	timer = setInterval(function () {
    	document.getElementById("sec").innerHTML = pad(++sec % 60);
    	document.getElementById("min").innerHTML = pad(parseInt(sec / 60, 10));
	}, 1000);

}


function drawChart() {
	
	var firebaseRef = firebase.database().ref();
	firebaseRef.once("value").then(function(snapshot){
		snapshot.forEach(function(childSnapshot){
			var counts = childSnapshot.val();
			data.push(counts);
			draw(data);

		});
	});

	
}

function draw(data) {
	var ctx = document.getElementById("myChart");
	var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [{
            label: '# of Votes',
            data: data,
            backgroundColor: [
                '#EF476F',
                '#F79256',
                '#128691',
                '#F7D24C',
                '#316B9E',
               
            ],
            borderColor: [
                '#EF476F',
                '#F79256',
                '#128691',
                '#F7D24C',
                '#316B9E',
            ],
            borderWidth: 1
        }]
    },
    options: {
    	
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }, 

    	}
	});


}

function clearData() {
    firebase.database().ref().update({
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        E: 0
    });

}