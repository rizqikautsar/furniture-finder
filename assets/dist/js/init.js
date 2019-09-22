$(document).ready(function() {


/////////////////DROPDOWN FILTER
    $(".checkbox-menu").on("change", "input[type='checkbox']", function() {
        $(this).closest("li").toggleClass("active", this.checked);
    });
    $(document).on('click', '.allow-focus', function (e) {
        e.stopPropagation();
    });




/////////////////PARSE JSON FURNITURE STYLE
    $.ajax({
        url: 'https://www.mocky.io/v2/5c9105cb330000112b649af8',
        dataType: 'jsonp',
        success: function(json){
            for (var counter = 0; counter < json.furniture_styles.length; counter++) {
                var $filterList = $('\
                    <li><label><input type="checkbox" value=".'+ json.furniture_styles[counter] +'">'+ json.furniture_styles[counter] +'</label></li>');
                $('#filter1').append($filterList);
            }
        }
    });




/////////////////PARSE JSON PRODUCTS
    $.ajax({
        url: 'https://www.mocky.io/v2/5c9105cb330000112b649af8',
        dataType: 'jsonp',
        success: function(json){
            for (var counter = 0; counter < json.products.length; counter++) {

                //INIT ISOTOPE FILTERING
                var $filter1 = $('#filter1 input');
                var $filter2 = $('#filter2 input');
                    $grid = $('.search-content-container').isotope({
                        itemSelector: '.search-content-wrapper',
                    });

                //GIVE CHAR LIMIT TO DESCRIPTION
                var description = json.products[counter].description;
                var charLimit = 114;
                if (description.length > charLimit){
                    description = description.substring(0,charLimit)+"...";
                } 

                //CHANGE FURNITURE STYLE TO BE A BETTER FORMAT
                var idFurnitureStyle = JSON.stringify(json.products[counter].furniture_style);
                    idFurnitureStyle = idFurnitureStyle.replace('["', '');
                    idFurnitureStyle = idFurnitureStyle.replace('"]', '');

                    idFurnitureStyle2 = idFurnitureStyle.replace('","', ', ');
                    idFurnitureStyle = idFurnitureStyle.replace('","', ' ');

                //CHANGE PRICE INTO CURRENCY FORMAT
                var price = JSON.stringify(json.products[counter].price);
                    price = price.replace(' ', '');
                    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, "."); 

                //LOAD AJAX RESULT INTO HTML
                var $items = $('\
                    <div class="search-content-wrapper col-sm-6 '+ idFurnitureStyle +'">\
                        <div class="search-content">\
                            <div class="row">\
                                <div class="left col-xs-6">\
                                    <p class="product-name">'+ json.products[counter].name +'</p>\
                                </div>\
                                <div class="right col-xs-6">\
                                    <p class="product-price">IDR '+ price +'</p>\
                                </div>\
                            </div>\
                            <div class="row">\
                                <div class="col-sm-12">\
                                    <p class="product-desc">'+ description +'</p>\
                                    <p class="product-furniture-style">'+ idFurnitureStyle2 +'</p>\
                                    <p class="product-delivery-days"> Delivery time: <span class="number">'+ json.products[counter].delivery_time +'</span> days</p>\
                            </div>\
                        </div>\
                    </div>');
                $grid.append($items).isotope('insert',$items);

            }

            //DROPDOWN BY FURNITURE STYLE
            $filter1.change(function(){
                var filtersFurniture = [];
                $filter1.filter(':checked').each(function(){
                    filtersFurniture.push(this.value);
                });
                filtersFurniture = filtersFurniture.join(', ');
                $grid.isotope({ stagger: 30,transitionDuration: 0,filter: filtersFurniture});
            });

            //DROPDOWN BY DELIVERY DAYS
            $filter2.change(function(){
                var filtersDelivery = [];
                $filter2.filter(':checked').each(function(){
                    filtersDelivery.push( this.value );
                    var biggest = Math.max.apply(Math, filtersDelivery);
                    $grid.isotope({ filter: function() {
                        var number = $(this).find('.number').text();
                        return parseInt( number, 10 ) <= biggest;
                    }})
                });
                filtersDelivery = filtersDelivery.join(', ');
            });

            //SEARCH BAR BY PRODUCT NAME
            var qsRegex;
            var $quickSearch = $('#search').keyup(debounce(function() {
                qsRegex = new RegExp($quickSearch.val(), 'gi');
                $grid.isotope({
                    stagger: 30,
                    transitionDuration: 0,
                    filter: function() {
                        var name = $(this).find('.product-name').text();
                        var searchResult = qsRegex ? name.match(qsRegex) : true;
                        return searchResult;
                    }
                });
            }));

            //DEBOUNCE SEARCH FUNCTION
            function debounce(fn, threshold) {
                var timeout;
                threshold = threshold || 100;
                return function debounced() {
                    clearTimeout(timeout);
                    var args = arguments;
                    var _this = this;
                    function delayed() {
                        fn.apply(_this, args);
                    }
                    timeout = setTimeout(delayed, threshold);
                };
            }
        }
    });
});




