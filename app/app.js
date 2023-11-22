// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('./assets/templates/layouts/house.html');
    require('./assets/templates/layouts/about.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Slider = require('_modules/slider');
var Forms = require('_modules/forms');
require('../node_modules/sweetalert2/dist/sweetalert2');
require('../node_modules/mark.js/dist/jquery.mark.min');
require('../node_modules/ez-plus/src/jquery.ez-plus');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Slider();
    new Forms();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
        $('.menu-main').addClass('transition-end');
    }, 100);

    setTimeout(function () {
        $('header, footer, main, .menu-main, .widget, .fixed-controls').removeAttr('style');
        $('.main-video__wrapper').addClass('animate-me');
        $('.menu-main').removeClass('transition-end');
    }, 1000);

    // scroll to id

    $(document).on('click', 'a[href*="#"]', function(e) {
        var id = $(this).attr('href');
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        var pos = $id.offset().top;
        $('body, html').animate({scrollTop: pos}, 500);
    });

    // video background change

    if ($('.main-video__wrapper').length){
        $(window).scroll(function () {
            var $video_wrapper = $('.main-video__wrapper');
            var data_id = $video_wrapper.data('id');
            if ($(window).width() >= 768) {
                var top = $video_wrapper.offset().top - 200,
                    bottom = top + $video_wrapper.height() + 200,
                    about_top = $('.about-section').offset().top - 200;
            } else {
                var top = $video_wrapper.offset().top - 174,
                    bottom = top + $video_wrapper.height() + 174,
                    about_top = $('.about-section').offset().top - 174;
            }
            var scroll = $(window).scrollTop();
            if (scroll > top && scroll < bottom) {
                $video_wrapper.addClass('active');
                $('.header').attr('id', data_id);
                //$('body').addClass('video_shown');
            }
            else{
                $video_wrapper.removeClass('active');
                $('.header').removeAttr('id');
            }
            if (scroll > about_top) {
                $('body').addClass('normal_header');
            }
            else{
                $('body').removeClass('normal_header');
            }
        });
    }

    // logos fixed scroll

    /*if ($('.logos-section').length){
        setTimeout(function () {
            var $logos = $('.logos'),
                window_height = $(window).height(),
                logos_width = $logos.width(),
                header_height = $('header').width();
            $(window).scroll(function() {
                var windowBottom = $(this).scrollTop() + $(this).innerHeight(),
                    screen_pos = $('.logos-section').offset().top,
                    screen_height = $('.logos-section').innerHeight(),
                    wScroll = $(this).scrollTop(),
                    objectPos = $('.logos').offset().top;
                //console.log(screen_pos, objectPos, wScroll, windowBottom, screen_height, window_height);
                if (screen_pos + window_height - header_height < windowBottom && wScroll < screen_pos + screen_height) { //object comes into view (scrolling down)
                    if ($(window).width() > 1249){
                        $logos.css({left: '-' + (wScroll - logos_width)/50 + '%'});
                    }
                    else{
                        $logos.css({left: '-' + (wScroll - logos_width - header_height)/50 + '%'});
                    }
                    $('.logos-inner').addClass('fixed');
                }
                else if (wScroll > screen_pos + screen_height && screen_pos + window_height - header_height > windowBottom){ //object goes out of view (scrolling up)
                    if ($(window).width() > 1249){
                        $logos.css({left: (wScroll - logos_width)/50 + '%'});
                    }
                    else{
                        $logos.css({left: (wScroll - logos_width - header_height)/50 + '%'});
                    }
                    $('.logos-inner').addClass('fixed');
                } else { //object goes out of view (scrolling up)
                    //$logos.css({left: 0});
                    $('.logos-inner').removeClass('fixed');
                }
            }).scroll();
        }, 1200);
    }*/

    $('.logos').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.logos .slick-arrow').focus(function() {
            this.blur();
        });
    });

    // scale content when footer is visible

    setTimeout(function () {
        var $main_section = $('main');
        $(window).scroll(function() {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight(),
                screen_pos = $('.footer').offset().top - 400,
                screen_height = $('.footer').innerHeight(),
                wScroll = $(this).scrollTop();
            if (wScroll > screen_pos) {
                $main_section.addClass('scale');
                $('.fixed-controls').addClass('active');
            } else {
                $main_section.removeClass('scale');
                $('.fixed-controls').removeClass('active');
            }
        }).scroll();
    }, 1200);

    // fixed controls

    // $(window).on('scroll', function() {
    //     var wh = $(window).height();
    //     if ($(this).scrollTop() > wh) {
    //         $('.fixed-controls').addClass('active');
    //     }
    //     else {
    //         $('.fixed-controls').removeClass('active');
    //     }
    // });

    // main menu

    $('.menu-btn').click(function () {
        $('.menu-main').addClass('active');
        $('body').addClass('menu-opened');
        setTimeout(function () {
            $('.menu-main').addClass('transition-end');
        }, 2000);
    });

    $('.menu-close').click(function () {
        $('.menu-main').removeClass('active');
        $('body').removeClass('menu-opened');
        setTimeout(function () {
            $('.menu-main').removeClass('transition-end');
        }, 800);
    });

    $('.menu-main__list .has-children > a, .menu-main__list .has-children > span').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('open');
    });

    $(document).click(function() {
        $('.menu-main__list .has-children').removeClass('open');
    });

    $(document).on('click', '.menu-main__list .has-children', function(e) {
        e.stopPropagation();
    });

    // iframe video play

    $('.video-play').on('click', function(e) {
        var src = $(this).data('video-src'),
            $video = $(this).find('iframe');
        $(this).find('img').hide();
        $(this).find('.play-btn').hide();
        $video.attr('src', src);
        e.preventDefault();
    });

    // dropdown

    $('.dropdown-wrapper .btn').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('open');
    });

    $(document).click(function() {
        $('.dropdown-wrapper').removeClass('open');
    });

    $(document).on('click', '.dropdown-wrapper', function(e) {
        e.stopPropagation();
    });

    // faq

    $('.faq-item__head').on('click', function () {
        $(this).closest('.faq-item').toggleClass('active').siblings().removeClass('active');
        $(this).next('.faq-item__body').slideToggle().closest('.faq-item').siblings().find('.faq-item__body').slideUp();
    });

    // modular house calculator

    function getvalues() {
        var values = $('.item-component.checked')
            .map(function () {
                return $(this).data('name');
            }).get().join(', ');
        $('.house-calculator__components input').val(values);
        $('.house-calculator__components textarea').val(values);
    }
    getvalues();

    function getsum() {
        var sum = 0;
        $('.item-component.checked').each(function() {
            var price = $(this).data('price');
            sum += price;
        });
        $('.house-calculator__total span').html(sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ',0');
    }
    getsum();

    $('.item-component:not(.radio-component)').click(function (){
        $(this).toggleClass('checked');
        getvalues();
        getsum();
        $('.house-calculator__components input').each(function(){ $(this).scrollLeft($(this)[0].scrollWidth) });
        $('.house-calculator__components textarea').each(function(){ $(this).scrollTop($(this)[0].scrollHeight) });
    });

    $('.item-component.radio-component').click(function (){
        if (!$(this).hasClass('checked')){
            $(this).addClass('checked').siblings().removeClass('checked');
        }
        getsum();
        $('.house-calculator__components input').each(function(){ $(this).scrollLeft($(this)[0].scrollWidth) });
        $('.house-calculator__components textarea').each(function(){ $(this).scrollTop($(this)[0].scrollHeight) });
    });

    setTimeout(function () {
        $('.house-calculator__components input').each(function(){ $(this).scrollLeft($(this)[0].scrollWidth) });
        $('.house-calculator__components textarea').each(function(){ $(this).scrollTop($(this)[0].scrollHeight) });
    }, 100);

    $('.house-calculator__btn-more').click(function (){
        $(this).toggleClass('active');
        $('.house-calculator__grid').slideToggle();
    });

    // modular house images

    if($('.house-images').length){
        setTimeout(function () {
            var $house_images_top = $('.house-images__top > div'),
                $house_images_bottom = $('.house-images__bottom > div'),
                house_images_top_width = $('.house-images__top > div').width(),
                house_images_bottom_width = $('.house-images__bottom > div').width(),
                container_width = $('.container-lg').width(),
                move_right = house_images_top_width - container_width,
                move_left = house_images_bottom_width - container_width;
            $(window).scroll(function() {
                //console.log(house_images_top_width, house_images_bottom_width, container_width, move_left, move_right);
                var screen_pos = $('.house-images').offset().top - $(window).height()/3 - 100,
                    wScroll = $(this).scrollTop();
                if (wScroll > screen_pos) {
                    $house_images_top.css({left: move_right + 'px'});
                    $house_images_bottom.css({left: '-' + move_left + 'px'});
                } else {
                    $house_images_top.css({left: 0});
                    $house_images_bottom.css({left: 0});
                }
            }).scroll();
        }, 1200);
    }

    // about animations

    if($('.about-section').length){
        setTimeout(function () {
            var $scheme_text = $('.about-bot__text');
            $(window).scroll(function() {
                var wScroll = $(this).scrollTop();
                if ($(window).width() > 1249){
                    var scheme_text_pos = $scheme_text.offset().top - $scheme_text.height()/2 - 100;
                }
                else{
                    var scheme_text_pos = $scheme_text.offset().top - $scheme_text.height();
                }
                console.log(wScroll, scheme_text_pos);
                if (wScroll > scheme_text_pos) {
                    $scheme_text.addClass('animated');
                } else {
                    //$scheme.removeClass('animated');
                }
            });
            var $scheme = $('.about-bot__scheme');
            $(window).scroll(function() {
                var wScroll = $(this).scrollTop();
                if ($(window).width() > 1249){
                    var scheme_pos = $scheme.offset().top - $scheme.height()/2 - 100;
                }
                else{
                    var scheme_pos = $scheme.offset().top - $scheme.height();
                }
                console.log(wScroll, scheme_pos);
                if (wScroll > scheme_pos) {
                    $scheme.addClass('animated');
                } else {
                    //$scheme.removeClass('animated');
                }
            });
            var $about_pc = $('.about-mid__pc'),
                $about_pic = $('.about-mid__pc .about-mid__pic'),
                $about_one = $('.about-mid__pc .about-mid__one'),
                $about_two = $('.about-mid__pc .about-mid__two'),
                $about_three = $('.about-mid__pc .about-mid__three'),
                $about_pic_tablet = $('.about-mid__tablet .about-mid__pic'),
                $about_one_tablet = $('.about-mid__tablet .about-mid__one'),
                $about_two_tablet = $('.about-mid__tablet .about-mid__two'),
                $about_three_tablet = $('.about-mid__tablet .about-mid__three'),
                $about_pic_mob = $('.about-mid__mobile .about-mid__pic'),
                $about_one_mob = $('.about-mid__mobile .about-mid__one'),
                $about_two_mob = $('.about-mid__mobile .about-mid__two'),
                $about_three_mob = $('.about-mid__mobile .about-mid__three');
            $(window).scroll(function() {
                var about_pc_pos = $about_pc.offset().top - $about_pc.height()*2 + 200,
                    about_pic_tablet_pos = $about_pic_tablet.offset().top - $about_pic_tablet.height()*2,
                    about_pic_mob_pos = $about_pic_mob.offset().top - $about_pic_mob.height()*2,
                    about_one_mob_pos = $about_one_mob.offset().top - $about_one_mob.height()*2,
                    about_two_mob_pos = $about_two_mob.offset().top - $about_two_mob.height()*2,
                    about_three_mob_pos = $about_three_mob.offset().top - $about_three_mob.height()*2,
                    wScroll = $(this).scrollTop();
                if (wScroll > about_pc_pos) {
                    $about_pic.addClass('animated');
                    $about_one.addClass('animated');
                    $about_two.addClass('animated');
                    $about_three.addClass('animated');
                }
                if (wScroll > about_pic_tablet_pos) {
                    $about_pic_tablet.addClass('animated');
                    $about_one_tablet.addClass('animated');
                    $about_two_tablet.addClass('animated');
                    $about_three_tablet.addClass('animated');
                }
                if (wScroll > about_pic_mob_pos) {
                    $about_pic_mob.addClass('animated');
                }
                if (wScroll > about_one_mob_pos) {
                    $about_one_mob.addClass('animated');
                }
                if (wScroll > about_two_mob_pos) {
                    $about_two_mob.addClass('animated');
                }
                if (wScroll > about_three_mob_pos) {
                    $about_three_mob.addClass('animated');
                }
            });
        }, 1200);
    }

    // modular house page animations

    if($('.house-main__blocks').length){
        setTimeout(function () {
            $('.house-main__blocks-item').each(function (){
                var $house_block = $(this);
                $(window).scroll(function() {
                    var wScroll = $(this).scrollTop(),
                        house_block_pos = $house_block.offset().top - $house_block.height() - 400;
                    // if ($(window).width() > 1199){
                    //     var house_block_pos = $house_block.offset().top - $house_block.height() - 400;
                    // }
                    // else{
                    //     var house_block_pos = $house_block.offset().top - $house_block.height();
                    // }
                    if (wScroll > house_block_pos) {
                        $house_block.addClass('animated');
                    } else {
                        //$scheme.removeClass('animated');
                    }
                });
            });
        }, 1200);
    }

    /*setTimeout(function () {
        $('.line1').addClass('animated');
    }, 1200);

    setTimeout(function () {
        $('.line2').addClass('animated');
    }, 1400);

    setTimeout(function () {
        $('.line3').addClass('animated');
    }, 1600);*/

    // setTimeout(function () {
    //     $('.line4').addClass('animated');
    // }, 1800);
    //
    // setTimeout(function () {
    //     $('.main-text').addClass('animated');
    //     //$('body').removeClass('overflow');
    // }, 2400);
    //
    // setTimeout(function () {
    //     $('.main-pic__wrapper').addClass('animated');
    //     //$('body').removeClass('overflow');
    // }, 3000);

    // search

    // $('.header-search__btn').click(function () {
    //     $(this).closest('.header-search').addClass('active');
    // });
    //
    // $('.header-search__close').click(function () {
    //     $(this).closest('.header-search').removeClass('active');
    // });
    //
    // $(document).click(function() {
    //     $('.header-search').removeClass('results').removeClass('show');
    // });
    //
    // $(document).on('click', '.header-search', function(e) {
    //     e.stopPropagation();
    // });
    //
    // var $input = $('.header-search__form > input'),
    //     $content = $('.header-search__form .search-results'),
    //     $results,
    //     currentIndex = 0;
    //
    // $input.on('input', function() {
    //     var searchVal = this.value;
    //     if (searchVal.length > 1){
    //         $(this).closest('.header-search').addClass('results');
    //     }
    //     else{
    //         $(this).closest('.header-search').removeClass('results');
    //     }
    //     $('.header-search__form .search-results li a').each(function() {
    //         $(this).bind('DOMSubtreeModified', function() {
    //             if ($(this).find('mark').length) {
    //                 $(this).closest('.header-search').addClass('show');
    //                 $(this).closest('li').addClass('show').closest('ul').addClass('highlighting-results');
    //                 $('.search-results__show').show();
    //                 $('.search-results__empty').hide();
    //             }
    //             else {
    //                 $(this).closest('.header-search').removeClass('show');
    //                 $(this).closest('li').removeClass('show').closest('ul').removeClass('highlighting-results');
    //                 $('.search-results__show').hide();
    //                 $('.search-results__empty').show();
    //             }
    //         });
    //     });
    //
    //     $content.unmark({
    //         done: function() {
    //             $content.mark(searchVal, {
    //                 separateWordSearch: true,
    //                 done: function() {
    //                     $results = $content.find('mark');
    //                     currentIndex = 0;
    //                 }
    //             });
    //         }
    //     });
    // });

    // first screen img move

    // if($('.main-pic__wrapper').length){
    //     function imgMove(){
    //         var zoomConfig = {zoomType: 'inner', borderSize: 0, lenszoom: false, tint: true, easing: true};
    //         var image = $('.main-pic__wrapper');
    //         var zoomImage = $('.main-pic');
    //
    //         zoomImage.ezPlus(zoomConfig);
    //
    //         setTimeout(function () {
    //             $($('.zoomContainer').detach()).appendTo(image);
    //         }, 1000);
    //     }
    //     imgMove();
    //     $(window).resize(function (){
    //         imgMove();
    //     });
    // }

    // second screen img color

    // if($('.info-pic').length){
    //     if ($(window).width() > 1024) {
    //         $('.info-pic').on('hover mouseover', function (){
    //             $(this).addClass('hover');
    //         });
    //     }
    //     setTimeout(function () {
    //         var pos = $('.info-pic').offset().top - $('.info-pic').height();
    //         if ($(window).width() <= 1024) {
    //             $(window).scroll(function () {
    //                 var scrolled = $(window).scrollTop();
    //                 //console.log(scrolled, pos);
    //                 if (scrolled > pos) {
    //                     $('.info-pic').addClass('hover');
    //                 }
    //             });
    //         }
    //     }, 1000);
    // }

    // second screen text animation

    /*setTimeout(function () {
        var screen_pos = $('.info-section').offset().top,
            screen_height = $('.info-section').height(),
            wScroll = $(this).scrollTop(),
            scrollBottom = screen_pos + screen_height;
        /!*if (wScroll >= screen_pos - 200 && wScroll < scrollBottom){
            setTimeout(function () {
                $('.info-subtitle').addClass('animated');
            }, 500);
            setTimeout(function () {
                $('.info-title').addClass('animated');
            }, 1200);
            setTimeout(function () {
                $('.info-text').addClass('animated');
            }, 1900);
        }
        else if (wScroll < screen_pos + 200){
            $('.info-subtitle').removeClass('animated');
            $('.info-title').removeClass('animated');
            $('.info-text').removeClass('animated');
        }
        else if (wScroll > scrollBottom){
            $('.info-subtitle').removeClass('animated');
            $('.info-title').removeClass('animated');
            $('.info-text').removeClass('animated');
        }*!/
        /!*$(window).scroll(function () {
            var wScroll = $(this).scrollTop(),
                scrollBottom = screen_pos + screen_height;
            console.log(wScroll, screen_pos - 500, scrollBottom);
            if (wScroll >= screen_pos - 500 && wScroll < scrollBottom){
                setTimeout(function () {
                    $('.info-subtitle').addClass('animated');
                }, 500);
                setTimeout(function () {
                    $('.info-title').addClass('animated');
                }, 1200);
                setTimeout(function () {
                    $('.info-text').addClass('animated');
                }, 1900);
            }
            else if (wScroll > scrollBottom){
                $('.info-subtitle').removeClass('animated');
                $('.info-title').removeClass('animated');
                $('.info-text').removeClass('animated');
            }
            /!*else if (wScroll > scrollBottom){
                $('.info-subtitle').removeClass('animated');
                $('.info-title').removeClass('animated');
                $('.info-text').removeClass('animated');
            }*!/
        });*!/
    }, 1000);*/

    // if ($('.info-section').length){
    //     $(window).scroll(function() {
    //         var windowBottom = $(this).scrollTop() + $(this).innerHeight(),
    //             screen_pos = $('.info-section').offset().top,
    //             screen_height = $('.info-section').innerHeight(),
    //             wScroll = $(this).scrollTop();
    //         $('.fade').each(function() {
    //             /* Check the location of each desired element */
    //             var objectPos = $('.info-section').offset().top + 400;
    //
    //             /* If the element is completely within bounds of the window, fade it in */
    //             if (objectPos < windowBottom && wScroll < screen_pos + screen_height) { //object comes into view (scrolling down)
    //                 if (!$(this).hasClass('animated')) {
    //                     setTimeout(function () {
    //                         $('.info-subtitle').addClass('animated');
    //                     }, 500);
    //                     setTimeout(function () {
    //                         $('.info-title').addClass('animated');
    //                     }, 1200);
    //                     setTimeout(function () {
    //                         $('.info-text').addClass('animated');
    //                     }, 1900);
    //                 }
    //             } else if (wScroll > screen_pos + screen_height){ //object goes out of view (scrolling up)
    //                 if ($(this).hasClass('animated')) {$(this).removeClass('animated');}
    //             } else { //object goes out of view (scrolling up)
    //                 if ($(this).hasClass('animated')) {$(this).removeClass('animated');}
    //             }
    //         });
    //     }).scroll();
    // }

    // slider elements position

    // if($('.slider-pos').length){
    //     setTimeout(function () {
    //         var pos = $('.info-pos'),
    //             offset = pos.offset().left - pos.closest('.container-lg').offset().left;
    //
    //         $('.slider-pos').each(function (){
    //             $(this).css('left', offset);
    //         });
    //
    //         $(window).resize(function (){
    //             var pos = $('.info-pos'),
    //                 offset = pos.offset().left - pos.closest('.container-lg').offset().left;
    //             $('.slider-pos').each(function (){
    //                 $(this).css('left', offset);
    //             });
    //         });
    //
    //         $('.slider .slide a').each(function (){
    //             var lw = $(this).width(),
    //                 ww = $(window).width();
    //             if(lw >= ww - 48 && ww < 399){
    //                 $(this).find('span').css('flex-basis', 0);
    //             }
    //             if(lw >= ww - 32 && ww < 359){
    //                 $(this).find('span').css('flex-basis', 0);
    //             }
    //         });
    //     }, 1000);
    // }
    //
    // $('.slider .col').each(function (){
    //     $(this).on('mouseover', function (e){
    //         e.preventDefault();
    //         $(this).addClass('visible').siblings().removeClass('visible');
    //     });
    // });
    //
    // $('.slider').each(function (){
    //     var $slider = $(this);
    //     $slider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
    //         $('.slider .slick-slider:not(.slick-current) .col-lg').addClass('visible').siblings().removeClass('visible');
    //     });
    // });
    // $('.slider').on('mouseover', function (){
    //     $('.slick-dots button').addClass('pause');
    // });
    // $('.slider').on('mouseleave', function (){
    //     $('.slick-dots button').removeClass('pause');
    // });
    //
    // $(window).resize(function (){
    //     setTimeout(function () {
    //         $('.slider').slick('setPosition');
    //     }, 500);
    // });

    // mobile menu

    // $('.header-menu__btn').click(function () {
    //     $(this).toggleClass('active');
    //     $('body').toggleClass('menu-opened');
    // });
    //
    // $(document).click(function () {
    //     $('.header-menu__btn').removeClass('active');
    //     $('body').removeClass('menu-opened');
    // });
    //
    // $(document).on('click', '.header-menu__btn', function (e) {
    //     e.stopPropagation();
    // });
    //
    // $(document).on('click', '.header-menu', function (e) {
    //     e.stopPropagation();
    // });

    // about animation

    if ($('.about-us').length){
        $(window).scroll(function() {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight(),
                screen_pos = $('.about-us').offset().top,
                screen_height = $('.about-us').innerHeight(),
                wScroll = $(this).scrollTop();
            $('.fade').each(function() {
                /* Check the location of each desired element */
                var objectPos = $('.about-us').offset().top;

                /* If the element is completely within bounds of the window, fade it in */
                if (objectPos < windowBottom && wScroll < screen_pos + screen_height) { //object comes into view (scrolling down)
                    if (!$(this).hasClass('animated')) {
                        setTimeout(function () {
                            $('.about-us__pic').addClass('animated');
                        }, 1500);
                        setTimeout(function () {
                            $('.about-us__firm').addClass('animated');
                        }, 2000);
                        setTimeout(function () {
                            $('.about-us__title').addClass('animated');
                        }, 2500);
                        setTimeout(function () {
                            $('.about-us__about').addClass('animated');
                        }, 3000);
                        setTimeout(function () {
                            $('.about-us__num1').addClass('animated');
                        }, 3500);
                        setTimeout(function () {
                            $('.about-us__num2').addClass('animated');
                        }, 4000);
                        setTimeout(function () {
                            $('.about-us__num3').addClass('animated');
                        }, 4500);
                    }
                } else if (wScroll > screen_pos + screen_height){ //object goes out of view (scrolling up)
                    if ($(this).hasClass('animated')) {$(this).removeClass('animated');}
                } else { //object goes out of view (scrolling up)
                    if ($(this).hasClass('animated')) {$(this).removeClass('animated');}
                }
            });
        }).scroll();
    }

    if ($('.about-us-more').length){
        $(window).scroll(function() {
            var windowBottom = $(this).scrollTop() + $(this).innerHeight(),
                screen_pos = $('.about-us-more').offset().top,
                screen_height = $('.about-us-more').innerHeight(),
                wScroll = $(this).scrollTop();
            $('.fade_bot').each(function() {
                /* Check the location of each desired element */
                var objectPos = $('.about-us-more').offset().top + 100;

                /* If the element is completely within bounds of the window, fade it in */
                if (objectPos < windowBottom && wScroll < screen_pos + screen_height) { //object comes into view (scrolling down)
                    if (!$(this).hasClass('animated')) {
                        setTimeout(function () {
                            $('.about-us-more__pic').addClass('animated');
                        }, 500);
                        setTimeout(function () {
                            $('.about-us-more__line1').addClass('animated');
                        }, 1000);
                        setTimeout(function () {
                            $('.about-us-more__line2').addClass('animated');
                        }, 1500);
                        setTimeout(function () {
                            $('.about-us-more__line3').addClass('animated');
                        }, 2000);
                        setTimeout(function () {
                            $('.about-us-more__line4').addClass('animated');
                        }, 2500);
                        setTimeout(function () {
                            $('.about-us-more__line5').addClass('animated');
                        }, 3000);
                        setTimeout(function () {
                            $('.about-us-more__line6').addClass('animated');
                        }, 3500);
                        setTimeout(function () {
                            $('.about-us-more__line7').addClass('animated');
                        }, 4000);
                    }
                } else if (wScroll > screen_pos + screen_height){ //object goes out of view (scrolling up)
                    if ($(this).hasClass('animated')) {$(this).removeClass('animated');}
                } else { //object goes out of view (scrolling up)
                    if ($(this).hasClass('animated')) {$(this).removeClass('animated');}
                }
            });
        }).scroll();
    }

    // counter

    $(window).on('scroll', function () {
        $('.animated-number').each(function () {
            var position = $(this).offset().top;
            var scrollPosition = $(window).scrollTop() + $(window).height() - 150;

            if (scrollPosition > position && !$(this).data('animated')) {
                var $this = $(this);
                $(this).data('animated', true);
                $({Counter: 0}).animate({
                    Counter: $this.data('num')
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            }
        });
    });

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});
