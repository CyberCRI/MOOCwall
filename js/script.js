/* Build up gallery*/
var tpl = {
	container:`<div class="container-fluid"></div>`,
	galleries: `<div class="row galleries"></div>`,
	columns : `
		<div id="col1" class="col-md-4 col-xs-6"></div>
		<div id="col2" class="col-md-4 hidden-sm-down"></div>
		<div id="col3" class="col-md-4 col-xs-6"></div>`,
	gallery : `<div class="gallery"></div>`,
	image   : `<img class="slides image" data-toggle="modal" data-target="#targetModal" />`,
	
	descriptions: `<div class="row descriptions"></div>`,
	modal: `<div class="myModal"><!-- Trigger the modal with a button -->
	 <button class="btn btn-primary" data-toggle="modal" data-target="#targetModal">Large modal</button>
	<!-- Modal : -->
	<div class="modal fade" id="targetModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header">
			<h4 class="modal-title" id="myLargeModalLabel">Title</h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">×</span></button>
		  </div>
		  <div class="modal-body"></div>
		</div>
	  </div>
	</div>
</div>`
};

$(function() {
	

$("#hook").addClass("container-fluid");
$(".container-fluid").append(tpl.galleries);
$(".galleries").append(tpl.columns);

	
var galleriesBuilder = function (imgList){
	var col1 = $("#col1"),
		col2 = $("#col2"),
		col3 = $("#col3"),
		currentSerie,
		serieCounter;
	for(var i=0; i<imgList.length; i++){
		var l = imgList[i],
			url = `img/`+l.img,
			imageHtml = tpl.image.replace(/targetModal/i, l.codename),
			$col,
			$gallery, $gallerySerie,
			changeSerie;
		if(i%3==0){ $col = col1; }
		if(i%3==1){ $col = col2; }
		if(i%3==2){ $col = col3; }
		$gallery = $col.children().last();
		$gallerySerie = $gallery.attr("serie");
		if($gallerySerie != l.codename ) { $col.append(tpl.gallery); $col.children().last().attr("serie",l.codename) }
		
		$gallery = $col.children().last();
		$gallery.append(imageHtml);
		$gallery.children().last().attr("src",url);
		
		currentSerie = l.codename;
		serieCounter++; ///           count so we get 5 images max per gallery !
	}
}
galleriesBuilder(images);

	
var modalBuilder = function(data) {
	$("#hook").append(tpl.descriptions);
	for(var i=0; i<data.length; i++){
		var project = data[i]
		$(".descriptions").append(tpl.modal)
		var $that = $(".descriptions").children().eq(i);
		$that.find("button").data("target", project.codename);
		$that.find(".modal").attr("id", project.codename);
		$that.find(".title").text(project.name);
		$that.find(".modal-bod").html(project.html)
	}
}
modalBuilder(projects);


});


/* Caroussel */
$(function() {
	
	$(".gallery").each(function(index) {
	var position = 1;
	var carousel = function () {
		var i, that = $(".gallery").eq(index);
		var x = that.children(".slides");
		// x.children().css({"display":"none"});
		x.css({"display":"none"});
		x.eq(position-1).css({"display":"block"});
		position == x.length? position = 1 : position++;
		// if (position == x.length) { position = 0 }; position++;
		setTimeout(carousel, 3000); // Change image every 2 seconds
	}
	carousel();
	});

});

/* Tabletop data injection */
//http://www.jsoneditoronline.org/?id=86bed24507b7689237b8eefe9498a69b

/*Ask for devis */

