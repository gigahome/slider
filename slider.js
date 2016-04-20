/**
 *   slider
 *   version 0.1
 *   by @buynao
 */
(function(factory) {
	if (typeof module === 'object' && typeof module.exports === 'object') {
		factory(require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
        define([], factory(window.jQuery));
    } else {
		factory(window.jQuery);
	}
}(function($) {
        
	if(!$) {
		return console.log('slider need jQuery');
	}
    $.slider = function(context,opts){
        var self = this;
        
        self.defaults = {
            autoplay : true,
            mouse: true,
            animate: true,
            deplay : 5000
        }
        self.container = context.find('ul');
        
        self.interval = null;  
        
        self.options = {};
        
        self.index = 0;
        
        self.current = 0;

        self.nav = context.find('.nav');
        
        self.slide = self.nav.children('a');
        
        self.total = self.slide.length;

        self.init = function(opts){
            self.options = $.extend({}, self.defaults, opts);
            
            if(self.options.animate == 'left'){
                self.left()
            }else{
                self.fade()
            }
            self.options.autoplay && self.start(self.index + 1); //自动播放
            self.options.mouse && self.mouse();    //鼠标暂停事件
        }
        self.left = function(){
            var _li = self.container.children('li');
            var _img = _li.find('img');
            var liWidth = _li.css('width');
            var liHeight = _li.css('height');
            var clientWidth = document.body.clientWidth;
            if(parseInt(liWidth) === clientWidth){
                self.container.css({
                    'position' : 'relative',
                    'width': (self.total * 100)+'%',
                    'height':liHeight
                });
                _li.css('width','25%')
            }else{
                self.container.css({
                    'position' : 'relative',
                    'width':(parseInt(liWidth) * self.total )+'px',
                    'height':liHeight
                });
            }
            context.css({
                'overflow' : 'hidden',
                'width':liWidth,
                'height':liHeight
            });
            _img.css({
                'width':'100%',
                'height':liHeight
            });
        }
        self.fade = function(){
            var _li = self.container.children('li');
            var _img = _li.find('img');
            var liWidth = _li.css('width');
            var liHeight = _li.css('height');
            var clientWidth = document.body.clientWidth;
            context.css({
                'overflow' : 'hidden',
                'width':liWidth,
                'height':liHeight
            });            
            self.container.css({
                'position' : 'relative',
                'width': (self.total * 100)+'%',
                'height':liHeight
            });           
            _li.hide().eq(0).show();
            _img.css({
                'width':'100%',
                'height':liHeight
            });
        }
        self.start = function(index){
            if(self.options.deplay && index){
                self.interval = setTimeout(function(){
                    self.step(index);
                },self.options.deplay);
            }
            return self;
        }
		self.stop = function() {
			clearTimeout(self.interval);
			return self;
		};
        self.step = function(index,i){
            if( i >= 0){
                self.current = index;
                self.index = i; 
            }else{
                self.current = index - 1;
                self.index = index; 
            }
            if(self.index >= self.total){
                self.index = 0;
            } 
            if(self.options.animate == 'left'){
                var move = '-100' * self.index + '%';
                self.container.animate({
                    left : move
                });            
            }else{            
                self.container.children('li').eq(self.current).fadeOut(function(){ 
                    self.container.children('li').eq(self.index).fadeIn();
                });
            }        
            self.slide.eq(self.index)._active('current');                
            if(self.options.autoplay) {
                self.stop().start(self.index + 1);
            }
        }
        self.slide.on('click',function(){
            if(self.interval){
                self.stop();
            }
            var i = $(this).index();
            if(i !== self.index){
                self.step(self.index,i);
            }else{
                self.step(self.index);        
            }
        })
        self.mouse = function(){
            self.container.hover(function(){
				self.stop();
			},function(){
				self.start(self.index + 1);
			})
        }
        return self.init(opts);
    }
    
    $.fn._active = function(className) {
		return this.addClass(className).siblings().removeClass(className);
	};
    
	$.fn.slider = function(opts) {
		return this.each(function() {
			var $this = $(this);
			if(typeof opts === 'string' && $this.data('slider')) {
				opts = opts.split(':');
				var call = $this.data('slider')[opts[0]];
				if($.isFunction(call)) {
					return call.apply($this, opts[1] ? opts[1].split(',') : null);
				}
			}
			return $this.data('slider', new $.slider($this, opts));
		});
	};
	
}));