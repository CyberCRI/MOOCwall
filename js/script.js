/* Build up gallery*/
var tpl = {
	container:`<div class="container-fluid"></div>`,
	galleries: `<div class="row galleries"></div>`,
	columns : `
		<div id="col1" class="col-md-4 col-xs-6"></div>
		<div id="col2" class="col-md-4 hidden-sm-down"></div>
		<div id="col3" class="col-md-4 col-xs-6"></div>`,
	gallery : `<div class="gallery"></div>`,
	image   : `<img class="slides image" data-toggle="modal" data-target="#mytarget" />`,
	
	descriptions: `<div class="row descriptions"></div>`,
	modal: `<div class="myModal"><!-- Trigger the modal with a button -->
  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#mytarget">Open Modal</button>
  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
    
      <div class="modal-content"><!-- Modal content-->

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="title">"Title"</h4>
        </div>
        <div class="modal-body">"Content"</div>
		<!-- <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>-->
      </div>
      
    </div>
  </div>
</div>`
};

$(function() {
	

$("#hook").append(tpl.container);
$(".container-fluid").append(tpl.galleries);
$(".galleries").append(tpl.columns);

	
var galleriesBuilder = function (data){
	var col1 = $("#col1"),
		col2 = $("#col2"),
		col3 = $("#col3");
	for(var i=0; i<data.length; i++){
		var d = data[i],
			url = `img/`+d.img,
			image = tpl.image.replace(/#mytarget/i, d.codename);
		if(i %3==0){ col1.append(image); col1.children().last().attr("src",url) }
		if(i %3==1){ col2.append(image); col2.children().last().attr("src",url)}
		if(i %3==2){ col3.append(image); col3.children().last().attr("src",url)}
	}
}
galleriesBuilder(images);

	
var modalBuilder = function(data) {
	$("#hook").append(tpl.descriptions);
	for(var d=0; d<data.length; d++){
		$("#hook").append(tpl.modal)
		var $that = $("#hook").children().eq(d);
		$that.find("button").data("target", data[d].codename);
		$that.find(".modal").attr("id", data[d].codename);
		$that.find(".title").text(d.name);
		$that.find(".modal-bod").html(d.html)
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

		setTimeout(carousel, 5000); // Change image every 2 seconds
	}
	carousel();
	});

});

/* Accordion */
$(function() {
  var infos = `<div class="moocInfo"></div>`,
    svg = `<div class="svgDots closed">
    <svg height="10" width="100%" style="background-color:#EEE">
      <circle cx="48%" cy="5" r="3" stroke="" stroke-width="0" fill="#AAAAAA" />
      <circle cx="50%" cy="5" r="3" stroke="" stroke-width="0" fill="#AAAAAA" />
      <circle cx="52%" cy="5" r="3" stroke="" stroke-width="0" fill="#AAAAAA" />
      Sorry, your browser does not support inline SVG.
    </svg>
  </div>`;
  $("article > h2").next().after(svg);
  $("article > h2").each(function() {
  if( $(this).next().hasClass("closed") ) {
    $(this).next().next('.svgDots').toggleClass("closed" ); console.log("hi!")
  }
  });
  $("h2").click(function() {
  $(this).next().toggleClass( "closed" );
  $(this).next().next('.svgDots').toggleClass( "closed" );
  });
})
/* Tabletop data injection */
//http://www.jsoneditoronline.org/?id=86bed24507b7689237b8eefe9498a69b

/*Ask for devis */

