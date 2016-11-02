/**
 * Created by Administrator on 2016/11/1.
 */
var showBigImg = ( function($){
    return{

        $showBigImg: null,
        imgSrcArr: [],// 图片数组
        currentIndex: 0,// 当前显示图片下标

        // 初始化
        init: function( imgSrcArr ){

            this.imgSrcArr = imgSrcArr;

            this.appendHtml(); // 插入html元素
            this.setElementStyle(); // 设置元素的位置、样式
            this.addBtnEvent(); // 按钮事件
        },

        // 插入html元素
        appendHtml: function(){

            var _img = '';
            for( var i=0; i < this.imgSrcArr.length; i++ ){
                _img += '<div class="imgDiv"><img src="' + this.imgSrcArr[i] + '"></div>';
            }

            var _content = '<div class="showBigImg">' +
                            '<div class="showBigImg_opBtn showBigImg_closeBtn"> &times </div>' +
                            '<div class="showBigImg_opBtn showBigImg_lastImgBtn"> < </div>' +
                            '<div class="showBigImg_opBtn showBigImg_nextImgBtn"> > </div>' +
                            '<div class="showBigImg_imgBox">' + _img + '</div>' +
                        '</div>';

            this.$showBigImg = $( _content );
            this.$showBigImg.css( 'opacity', '0' ).animate( { opacity: 1 }, 300 );// 动画（开始完全透明（不显示）增加透明度）
            $('body').append( this.$showBigImg );
        },

        // 设置元素的位置、样式
        setElementStyle: function(){

            var _self = this;

            // 上一张、下一张 按钮 高度
            _self.$showBigImg.find('.showBigImg_opBtn:not(".showBigImg_closeBtn")').each( function( index, value ){
                var _top = ( $(window).height() - $(this).height() ) / 2.5;
                $(this).css( 'top', _top + 'px' );
            });

            // 大图 的宽、高
            var _windowWidth = $(window).width();
            var _windowHeight = $(window).height();
            _self.$showBigImg.find('.showBigImg_imgBox').css({
                'width': _windowWidth * _self.imgSrcArr.length + 'px',
                'height': _windowHeight + 'px',
            });
            _self.$showBigImg.find('.showBigImg_imgBox > .imgDiv').css({
                'width': _windowWidth + 'px',
                'height': _windowHeight + 'px',
            });
            _self.$showBigImg.find('.showBigImg_imgBox > .imgDiv img').css({
                'max-width': _windowWidth * 0.8 + 'px',
                'max-height': _windowHeight * 0.8 + 'px',
            });

            // 显示 this.currentIndex 的图片
            _self.$showBigImg.find('.showBigImg_imgBox').css( 'left', -_windowWidth * _self.currentIndex + 'px' );


            // 不在css中设置动画效果，防止一打开大图的时候，有从右向左滑动的动画
            setTimeout( function(){

                _self.$showBigImg.find('.showBigImg_imgBox').css({
                    '-webkit-transition': 'all 0.5s',
                    '-moz-transition': 'all 0.5s',
                    '-ms-transition': 'all 0.5s',
                    '-o-transition': 'all 0.5s',
                    'transition': 'all 0.5s',
                });
            }, 0);
        },


        // 按钮事件
        addBtnEvent: function(){

            var _self = this;
            var _windowWidth = $(window).width();
            var $showBigImg_imgBox = this.$showBigImg.find('.showBigImg_imgBox'); // 承载所有图片的容器

            // 上一张
            this.$showBigImg.find('.showBigImg_lastImgBtn').off('click').on('click', function(){
                //console.log( _self.currentIndex );
                if( _self.currentIndex <= 0 ) return;// 第一张

                _self.currentIndex --;
                $showBigImg_imgBox.css( 'left', -_windowWidth * _self.currentIndex + 'px' );
            });

            // 下一张
            this.$showBigImg.find('.showBigImg_nextImgBtn').off('click').on('click', function(){
                //console.log( _self.currentIndex );
                if( _self.currentIndex >= _self.imgSrcArr.length-1 ) return;// 最后一张

                _self.currentIndex ++;
                $showBigImg_imgBox.css( 'left', - _windowWidth * _self.currentIndex + 'px' );
            });

            // 关闭
            this.$showBigImg.find('.showBigImg_closeBtn').off('click').on('click', function(){
                _self.close();// 关闭
            });
        },

        // 打开大图（被点击的小图的jq对象）
        show: function( $img ){

            //console.log( $img );
            var $imgArr = $img.parent().children('img');// 同级所有图片、包括被点击的图片本身
            var imgSrcArr = [];// 所有图片的 src

            // 遍历所有图片
            $imgArr.each( function( index, value ){
                imgSrcArr.push( value.src );
            });

            this.currentIndex = $img.prevAll().length; // 当前显示图片 的下标（ == 被点击的小图前面的图片数量）
            //console.log( this.currentIndex );

            this.init( imgSrcArr );// 初始化
        },

        // 关闭大图
        close: function(){
            var _self = this;

            // 动画（减少透明度）
            this.$showBigImg.animate({ opacity: 0 }, 300, function(){
                _self.$showBigImg.remove(); // 移除
                _self.$showBigImg = null;
            });
        },
    }
})( jQuery );
