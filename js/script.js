/* Build up gallery*/
var tpl = {
	container:`<div class="container-fluid"></div>`,
	galleries: `<div class="row no-gutters galleries"></div>`,
	columns : `
		<div id="col1" class="col-md-4 col-xs-6"></div>
		<div id="col2" class="col-md-4 hidden-sm-down"></div>
		<div id="col3" class="col-md-4 col-xs-6"></div>`,
	gallery : `<div class="gallery"></div>`,
	image   : `<img class="slides image" data-toggle="modal" data-target="#targetModal" />`,
	
	descriptions: `<div class="row descriptions"></div>`
};


/* ******************************************************************* */
/* Data call ********************************************************* */
/* ******************************************************************* */
window.onload = function() {
  init()
};

function init() {
  Tabletop.init({
    key: '1Jl8hPef57ay40SKbQRd0ez2hEbDIqwhKEcDe0R4cSVc',
    callback: moocWall,
    simpleSheet: true
  })
}
	
var galleriesBuilder = function (imgList){
	var col1 = $("#col1"),
		col2 = $("#col2"),
		col3 = $("#col3"),
		currentSerie,
		serieCounter;
	for(var i=0; i<imgList.length; i++){
		var l = imgList[i],
			url = `gallery/`+l.img,
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


var contentHtml = function (d) {
	var sessionStr = d.session?" ("+d.session+")":"",
		urlStr = `Homepage : <a href="`+d.url+`">click here</a> `+ sessionStr,
		categoryStr = `Categories : `+d.categories,
		organisationStr = `Organization.s / Sponsor.s: `+d.organisation,
		periodStr = `Period : `+d.start+`→`+d.end,
		learnersStr = `Impact : `+ d.participants+` trainees/students`,
		iframeStr = d.url?`<iframe frameborder=0 scrolling=no style='width:100%; height:400px;' src="`+d.url+`"></iframe>`:"",
		videoStr = d.introVideoIframeSrc?`<iframe frameborder="0" width="100%" data-height="270" src="`+d.introVideoIframeSrc+`" allowfullscreen></iframe>`:"";

	var	modal = `<div class="modal fade" id="`+d.codename+`" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
				  <div class="modal-header">
					<h4 class="modal-title">`+d.fullname+`</h4>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">×</span></button>
					</div>
					<div class="modal-body row">
						
					<div class="row">
						<div class="col-md-6 col-xs-12">
						<b>Few elements:</b>
						<ul>
							<li>`+ urlStr +`</li>
							<li>`+ categoryStr +`</li>
							<li>`+ organisationStr +`</li>
							<li>`+ periodStr +`</li>
							<li>`+ learnersStr +`</li>
						</ul></div>
						<div class="col-md-6 col-xs-12">`+iframeStr+`</div>
					</div>
						<div class="row">
					<!-- <div class="col-xs-2"></div><div class="col-xs-8">`+videoStr+`</div><div class="col-xs-2"></div> -->
						</div>
					</div>
				</div>
			</div>
		</div>`;
	return modal;
}
var modalBuilder = function(data) {
	$("#hook").append(tpl.descriptions);
	for(var i=0; i<data.length; i++){
		var project = data[i],
			html = contentHtml(project)
		$(".descriptions").append(html)
	}
}

var carousselBuilder = function () { 
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
		setTimeout(carousel, 12000); // Change image every 2 seconds
	}
	carousel();
	});
 }

var moocWall = function (data, tabletop) {
	console.log(JSON.stringify(data))
	$("#hook").addClass("container-fluid");
	$(".container-fluid").append(tpl.galleries);
	$(".galleries").append(tpl.columns);

	galleriesBuilder(images);
	modalBuilder(data);
	carousselBuilder();
	
};


/* Caroussel */

/* Tabletop data injection */
//http://www.jsoneditoronline.org/?id=86bed24507b7689237b8eefe9498a69b

/*Ask for devis */

