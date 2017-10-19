$(window).ready(function() {
	console.log('test');
	url = window.location.href;
	if(url.indexOf("facebook.com/groups") > -1){
		//limited gathering information to wikipedia

		var listOfLinks = new Array();
		getlinks();


/* 		$("p , h1, h2 , h3 , li").each(function(){
			$(this).text($(this).text().replace(/"/g, ""));
		});

		$("img").each(function(){
			$(this).attr("src","http:" + $(this).attr("src",));
		});


		$("#content").html($("#content").html().replace(/<!--/gi, " /--/ "));
		var temp = $("#content").html();
		console.log(temp); */


		var request = $.ajax({
		  url: "https://mcrawler.000webhostapp.com",
		  method: "POST",
		  data: { code : "as65d4fa6s5xc5v" ,link : url , content : temp, cat : 1},
		  dataType: "html"
		});

		request.done(function( msg ) {
		 console.log( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  console.log( "Request failed: " + textStatus );
		});
		$("body").prepend("<button id='qwerqwerqwe' style=' position:absolute;right: 550px;z-index:9999999' > Show Links </button>");
		$("body").prepend("<button id='qzawsxwsx' style=' position:absolute;right: 650px;z-index:9999999' > open Links </button>");

	}
	// else if url.indexOf("facebook.com") > -1{
	// 	 and it has an element that has #fbProfileCover



	// }

	$('#test').click(function(){
       alert('hola');
    })


	function getlinks(){
		$(".fsl, .fwb, .fcb a").each(function(index){
			console.log($( this ).attr("href"));
			analizeLink($( this ).attr("href"),index);
			//console.log( index + ": " + $( this ).attr("href") );
		});
	}

	$("#qzawsxwsx").click(function(){
		if(listOfLinks.length > 19){
			for(i = 0; i < 20 ; i ++){
				window.open(listOfLinks[i],'_blank');
				listOfLinks.shift();
			}
		}else{
			for(i = 0; i < listOfLinks.length ; i ++){
				window.open(listOfLinks[i],'_blank');
				listOfLinks.shift();
			}
		}
	});


	function analizeLink(temp,index){
		listOfLinks.push("https://en.wikipedia.org"+temp);
		//console.log(index+": https://en.wikipedia.org"+temp)
	}





});

