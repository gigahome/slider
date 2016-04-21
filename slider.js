/**
 *   slider
 *   version 0.1
 *   by @buynao
 */
(function(factory) { //注册amd模块加载
	if (typeof module === 'object' && typeof module.exports === 'object') {
		factory(require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
        define([], factory(window.jQuery));
    } else {
		factory(window.jQuery);
	}
}(function($) {
    // 查看jquery模块存不存在    
	if(!$) {
		return console.log('slider need jQuery');
	}
    $.slider = function(context,opts){
        var self = this;
        //默认轮播方式
        self.defaults = {
            autoplay : true,
            mouse: true,
            animate: 'fade',
            deplay : 5000
        }
        //获取dom
        self.container = context.find('ul');

        self.li = self.container.children('li');

        self.navigation = context.children('.navigation');
        
        //轮播图数
        self.total = self.li.length;

        self.interval = null;  
        
        self.options = {};
        
        self.index = 0;
        
        self.current = 0;

        self.init = function(opts){ 
            self.options = $.extend({}, self.defaults, opts);
            self.navigation.length > 0 && self._navigation();
            self.cssRest();
            self.options.animate === 'fade' && self.fade();
            self.options.autoplay && self.start(self.index + 1); //自动播放
            self.options.mouse && self.mouse();    //鼠标暂停事件
            self.total == 1 && self.stop();
        }
        self._navigation = function(){
            self.navigation.on('click','a',function(){
                var name = $(this).prop('class');
                    self.stop();
                if(name == 'next'){
                    self.step(self.index + 1)
                }
                if(name == 'prev'){
                    if(self.index <= 0){
                        self.index =  self.total
                    }
                    self.step(self.index - 1)
                }
            })
        }
        self.fade = function(){
            self.li.css({position:'absolute',left:0,opacity: 0}).eq(self.index).css({opacity: 1});
        }
        self.cssRest = function(){
            var nav = '<div class="nav"></div>';
            context.append(nav);
            self.nav = context.find('.nav');
            self.li.each(function(key){
                self.nav.append('<a href="javascript:;" data-slider='+key+'></a>');  
            })
            self.container.css('width', (self.total * 100) + '%');
            self.li.css('width', (100 / self.total) + '%');
            self.slide = self.nav.children('a');
            self.slide.eq(self.index).addClass('current');
            self.navClick(self.nav)
        }
        self.navClick = function(nav){
            nav.on('click','a',function(){
                if(self.total > 1){
                    self.stop();
                    var i = $(this).index();
                    if(i !== self.index){
                        self.step(self.index,i);
                    }else{
                        self.step(self.index);        
                    }
                }
            })
        }
        self.start = function(index){
            if(self.options.deplay && index && self.total > 1){
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
            if(self.options.animate === 'left'){
                var move = '-100' * self.index + '%';
                self.container._move({left : move
                });
            }
            if(self.options.animate === 'fade'){
                self.li._move({opacity: 0}).eq(self.index)._move({opacity: 1});
                //self.li.hide();
                // self.li.eq(self.current).fadeOut(function(){ 
                //     self.li.eq(self.index).fadeIn();
                // });
            }
            self.li.eq(self.index)._active('show');   
            self.slide.eq(self.index)._active('current');                
            if(self.options.autoplay) {
                self.stop().start(self.index + 1);
            }
        }
        self.mouse = function(){
            self.container.hover(function(){
				self.stop();
			},function(){
                if(self.options.autoplay){
				    self.start(self.index + 1);
                }
			})
        }
        return self.init(opts);
    }
    
    $.fn._active = function(className) {
		return this.addClass(className).siblings().removeClass(className);
	};
    $.fn._move = function() {
        this.stop(true, true);
        return $.fn['animate'].apply(this, arguments);
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