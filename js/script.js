jQuery(function($) {
	$('.social_wrapper a').hide();
	// social button
	$('#socialBtn').click(function() {
		$('#social_fix').slideDown();
		$('.social_wrapper a').delay(300).fadeIn();
	});
	$('.close-btn a').click(function() {
		$('.social_wrapper a').fadeOut('slow');
		$('#social_fix').delay(500).slideUp();
	});
	
	
	// select poster frame
	$('.poster-border-thumb a').click(function() {
	    const frameImgSrc = $(this).children('img').attr('src');
	   // console.log(frameImgSrc);
		$('#outerImg').attr('src',frameImgSrc);
		
		$('#preview_wrapper').css('border','0px');
	});
	
	
	// Advanced Style - Image Height & Position
	// $('#imgStyleBtn').click(function() {
	// 	const imgHeight = $('#imgHeight').val();
	// 	// console.log(imgHeight + '%');
	// 	$('#innerImg').css('height', imgHeight + '%');

	// 	const imgPosition = $('#imgPosition').val();
	// 	$('#innerImg').css('background-position', imgPosition);
	// });
	
   

	// add image to poster frame
	$('#addImgBtn').click(function() {
		const innerImg = $('#imgPreview img').attr('src');
// 		$('#innerImg').css('background-image', 'url('+innerImg+')');
        $('#innerImg').attr('src', innerImg);

        $('html,body').animate({
        	scrollTop: $("#poster_wrapper").offset().top},
        'slow');
	});


	// add text message to poster frame
	$('#addBtn').click(function() {
		const title = $('#title').val();
		$('#innerText h3').html(title);

		const textMsg = $('#source_text input[name="choose_msg"]:checked').val();
		console.log(textMsg);
		$('#innerText p').html(textMsg);

		$('#downloadBtn').removeClass('disabled');
		// $('#downloadBtn').attr('onclick','doCapture()');


		$('html,body').animate({
        	scrollTop: $("#poster_wrapper").offset().top},
        'slow');
	});
	
	// save image to the SERVER
	$('#downloadBtn').click(function() {
	    html2canvas(document.getElementById('preview_wrapper')).then( function(canvas) {
    	    var dataURL = canvas.toDataURL();
            $.ajax({
                type: "POST",
                url: "http://localhost/zecuf-poster/custom-poster.php",
                data: {
                    imgBase64: dataURL
                }
            }).done(function(o) {
                console.log('saved');
            });
    	});
    });
	
	$('#downloadBtn').attr('onclick','doCapture()');
    
    $( "#innerImg" ).draggable();
    
    $('.switch .slider').click(function() {
       $('#outerImg').toggleClass('active');
       $('#innerImg').toggleClass('active');
    });
});



// upload thumb image
const chooseFile = document.getElementById("chooseFile");
	const imgPreview = document.getElementById("imgPreview");

	chooseFile.addEventListener("change", function () {
		getImgData();
	});

	function getImgData() {
		const files = chooseFile.files[0];
		if (files) {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(files);
			fileReader.addEventListener("load", function () {
				imgPreview.style.display = "block";
				imgPreview.innerHTML = '<img src="' + this.result + '" title="zecuf-photo-booth" />';
			});
		}
	}

function doCapture() {
	html2canvas(document.getElementById('preview_wrapper')).then( function(canvas) {
// 		console.log(canvas.toDataURL('image/jpeg', 0.9));
		const imgurl = canvas.toDataURL('image/jpeg', 1);
		saveAs(imgurl, 'poster');
	});
}

// function posterInModal() {
// 	html2canvas(document.getElementById('preview_wrapper')).then( function(canvas) {
//     // 	console.log(canvas.toDataURL('image/jpeg', 0.9));
// 		const imgurl = canvas.toDataURL('image/jpeg', 1);

// // 		const finalPoster = document.getElementById('finalPoster');
// // 		finalPoster.innerHTML = "<img src='"+imgurl+"' alt='finalPoster'>";

//         const finalPosterImg = document.getElementById('finalPosterImg');
//         finalPosterImg.setAttribute('src', imgurl);
//     });
// }