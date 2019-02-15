$(document).ready(function() {
    let $tabs = $('.tabs_content .tab_c');
    let active = 'active';
    let active_c = '.' + active;
    $tabs.not(active_c).hide();
    $('ul.tabs_head').on('click', 'li:not(active_c)', function() {
        $(this).addClass(active).siblings().removeClass(active);
        $tabs.hide().eq($(this).index()).show().addClass(active).siblings().removeClass(active);
    });
});