var htmlHead = `
	<link rel="apple-touch-icon" sizes="57x57" href="./img/favicon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="./img/favicon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="./img/favicon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="./img/favicon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="./img/favicon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="./img/favicon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="./img/favicon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="./img/favicon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="./img/favicon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="./img/favicon/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="./img/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="./img/favicon/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="./img/favicon/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="./img/favicon/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
    <meta charset="utf-8">
    <title>MOOC Factory's wall</title>
`;
var topbar =`
	<ol class="breadcrumb">
		<li class="breadcrumb-item"><a href="./index.html">
	<img class="logo" src="./img/logo-moocfactory.svg" style="height:1.5em;" /></a></li>
		<li class="breadcrumb-item"><a href="./index.html">MOOC Wall</a></li>
		<li class="breadcrumb-item"><a href="./intro.html">Studio</a></li><!--
		<li class="breadcrumb-item"><a href="./description.html">Studio de réalisation</a></li>
		<li class="breadcrumb-item"><a href="./contact.html">Contact</a></li> -->
	</ol>`;

var sidebar = `<img class="logo" src="./img/logo-moocfactory.svg" />
<div class="menu">
	<a href="./index.html"><div>MoocWall</div></a>
	<a href="./intro.html"><div>Studio</div></a><!--
	<a href="./description.html"><div>Description</div></a>
	<div href="./">Team</div> -->
</div>
<div class="footer">
	<p class="icons">
		<a target="_blank" href="https://www.youtube.com/channel/UCAwnYwPOM-fcJ7wkfp1Xn7g" title="Youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a> 
		<a target="_blank" href="https://vimeo.com/criparis" title="Vimeo"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
	</p>
	<p class="authors">Mooc Producers</p>
	<p class="authors">The CRI's MOOC Factory</p>
	<p class="authors"><i class="fa fa-globe" aria-hidden="true"></i> <a target="_blank" href="http://mooc.cri-paris.org">mooc.cri-paris.org</a></p>
</div>`;

$("head").append(htmlHead);
$(".topbar").prepend(topbar);
$(".sidebar").append(sidebar);

/* Build up gallery*/
var tpl = {
	container:`<div class="container-fluid"></div>`,
	galleries: `<div class="row galleries"></div>`,
	columns : `
		<div id="col1" class="col-lg-6 col-md-6-down"></div>
		<div id="col2" class="col-lg-6 col-md-6-down"></div>`,
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
		currentSerie,
		serieCounter;
	for(var i=0; i<imgList.length; i++){
		var l = imgList[i],
			url = `img/wall2/`+l.img,
			imageHtml = tpl.image.replace(/targetModal/i, l.codename),
			$col,
			$gallery, $gallerySerie,
			changeSerie;
		if(i%2==0){ $col = col1; }
		if(i%2==1){ $col = col2; }
		$gallery = $col.children().last();
		$gallerySerie = $gallery.attr("serie");
		if(true || $gallerySerie != l.codename ) { $col.append(tpl.gallery); $col.children().last().attr("serie",l.codename) }
		console.log(l.codename)
		$gallery = $col.children().last();
		$gallery.append(imageHtml);
		$gallery.children().last().attr("src",url);

		currentSerie = l.codename;
		serieCounter++; ///           count so we get 5 images max per gallery !
	}
}

/* Modale ****************************************************************** */
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
					<div class="modal-body">
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
		x.css({'display':'none', 'visibility': 'hidden', 'opacity': '0'});
		x.eq(position-1).css({'display':'block', 'visibility': 'visible','opacity': '1'});
		position == x.length? position = 1 : position++;
		// if (position == x.length) { position = 0 }; position++;
		setTimeout(carousel, 2000); // Change image every 2 seconds
	}
	carousel();
	});
 }

var moocWall = function (data, tabletop) {
	console.log(JSON.stringify(data))
	$("#hook").addClass("container-fluid wall2");
	$(".wall2").append(tpl.galleries);
	$(".galleries").append(tpl.columns);

	galleriesBuilder(wall2);
	modalBuilder(data);
	carousselBuilder();

};


/* Caroussel */

/* Tabletop data injection */
//http://www.jsoneditoronline.org/?id=86bed24507b7689237b8eefe9498a69b

/*Ask for devis */
