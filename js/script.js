/* Build up gallery*/
var tpl = {
  project : `<div class="project container-fluid"></div>`,
  galleries:`<div class="row galleries"></div>`,
  gallery : `<div class="gallery col-md-4 col-xs-6"></div>`,
  image   : `<img class="slides image" href="" />`
};

$(function() {
var galleriesBuilder = function ($that, d){
  var images = d.images,
      modulus = Math.floor(images.length/6); // so whatever the number of images, images always fill the 6 galleries
  $that.append(tpl.galleries);
  console.log(images.length);
  for(var i=0; i<images.length; i++){
    if(i % modulus ==0 && i< modulus*6) { $that.children(".galleries").append(tpl.gallery); }
    $that.find(".gallery").last().append(tpl.image);
    $that.find(".image").last().attr({ src: images[i]})
  }
  that.find(".gallery").eq(1).removeClass("col-xs-6").addClass("hidden-sm-down");
  that.find(".gallery").eq(4).removeClass("col-xs-6").addClass("hidden-sm-down");
}

for(var p=0; p<data.length; p++){
  var d = data[p];
  $("#hook").append(tpl.project);
  var that = $(".project").eq(p);
  that.data("project", d );
  galleriesBuilder(that, d);
}

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

    setTimeout(carousel, 2000); // Change image every 2 seconds
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
