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
            animate: 'fade',
            deplay : 5000
        }
        self.container = context.find('ul');

        self.li = self.container.children('li');
        
        self.interval = null;  
        
        self.options = {};
        
        self.index = 0;
        
        self.current = 0;

        self.nav = context.find('.nav');
        
        self.slide = self.nav.children('a');
        
        self.total = self.slide.length;

        self.init = function(opts){
            self.options = $.extend({}, self.defaults, opts);
            self.cssRest();
            self.options.animate === 'fade' && self.fade();
            self.options.autoplay && self.start(self.index + 1); //自动播放
            self.options.mouse && self.mouse();    //鼠标暂停事件
        }
        self.fade = function(){
            self.li.hide().eq(self.index).show();
        }
        self.cssRest = function(){
            self.container.css('width', (self.total * 100) + '%');
            self.li.css('width', (100 / self.total) + '%');
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
            if(self.interval){
                clearTimeout(self.interval);
                self.interval = null;
            }
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

            }
            if(self.options.animate == 'fade'){            
                self.li.eq(self.current).fadeOut(function(){ 
                    self.li.eq(self.index).fadeIn();
                });
            }
            self.li.eq(self.index).addClass('show').siblings().removeClass('show');   
            self.slide.eq(self.index)._active('current');                
            if(self.options.autoplay) {
                self.stop().start(self.index + 1);
            }
        }
        self.slide.on('click',function(){
            self.stop();
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