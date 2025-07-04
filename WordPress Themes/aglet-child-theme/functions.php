<?php
/**
 * Growmodo Test - Child theme of Underscore
 * Description: Stress Test Child Theme - Growmodo
 * Version: 0.1
 * Author: Brent Birch
 */

// Enqueue parent and child theme styles
function child_theme_enqueue_styles() {
    // Parent theme style
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() . '/style.css'
    );
    
    // Child theme style
    wp_enqueue_style(
        'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('parent-style'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'child_theme_enqueue_styles');


function theme_enqueue_styles() {
    // Enqueue the main stylesheet
    wp_enqueue_style(
        'theme-main-css', // Handle
        get_stylesheet_directory_uri() . '/css/main.css', // Path to your file
        array(), // Dependencies
        filemtime(get_stylesheet_directory() . '/css/main.css'), // Version (uses file modification time)
        'all' // Media
    );
}
add_action('wp_enqueue_scripts', 'theme_enqueue_styles');

function enqueue_global_js_script() {
    wp_enqueue_script(
        'global-js',
        get_stylesheet_directory_uri() . '/js/global.js',
        array(),
        filemtime( get_stylesheet_directory() . '/js/global.js' ),
        true // ensures it’s in the footer, after DOM is ready
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_global_js_script' );

function add_google_fonts() {
    wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap', array(), null );
    wp_style_add_data( 'google-fonts', 'preconnect', 'https://fonts.googleapis.com' );
    wp_style_add_data( 'google-fonts', 'preconnect', 'https://fonts.gstatic.com' );
    wp_style_add_data( 'google-fonts', 'crossorigin', 'anonymous' );
}
add_action( 'wp_enqueue_scripts', 'add_google_fonts' );

function add_font_awesome_free() {
    // Font Awesome CSS
    wp_enqueue_style(
        'font-awesome-free',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        array(),
        '6.4.0'
    );
    
    // Optional: Add preconnect for better performance
    add_filter('wp_resource_hints', function($urls, $relation_type) {
        if ('preconnect' === $relation_type) {
            $urls[] = 'https://cdnjs.cloudflare.com';
        }
        return $urls;
    }, 10, 2);
}
add_action('wp_enqueue_scripts', 'add_font_awesome_free');

function aglet_theme_register_menus() {
    register_nav_menus(
        array(
            'primary' => esc_html__('Primary Menu', 'twentytwentyfive-child'),
            'footer'  => esc_html__('Footer Menu', 'twentytwentyfive-child'),
            'social'  => esc_html__('Social Links Menu', 'twentytwentyfive-child')
        )
    );
}
add_action('init', 'aglet_theme_register_menus');


// Register footer widget areas
function aglet_theme_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Footer Widget Area 1', 'textdomain'),
        'id'            => 'footer-1',
        'description'   => esc_html__('Add widgets here to appear in your footer.', 'textdomain'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer Widget Area 2', 'textdomain'),
        'id'            => 'footer-2',
        'description'   => esc_html__('Add widgets here to appear in your footer.', 'textdomain'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));

    register_sidebar(array(
        'name'          => esc_html__('Footer Widget Area 3', 'textdomain'),
        'id'            => 'footer-3',
        'description'   => esc_html__('Add widgets here to appear in your footer.', 'textdomain'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'aglet_theme_widgets_init');


function child_theme_block_template_override() {
    // Force child theme template loading
    remove_theme_support('block-templates');
    add_theme_support('block-templates');
    
    // Alternatively, use template hierarchy filter
    add_filter('block_theme_template_hierarchy', function($templates) {
        // Prepend child theme templates
        array_unshift($templates, 'templates/child-custom.html');
        return $templates;
    });
}
add_action('after_setup_theme', 'child_theme_block_template_override', 30);
function child_theme_setup() {
    // Register navigation menu
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'your-child-theme')
    ));
    
  
}
add_action('after_setup_theme', 'child_theme_setup');

// Enqueue styles
function child_theme_styles() {
    wp_enqueue_style(
        'child-theme-style',
        get_stylesheet_uri(),
        array(),
        filemtime(get_stylesheet_directory() . '/style.css')
    );
}
add_action('wp_enqueue_scripts', 'child_theme_styles');

// Allow SVG
add_filter( 'wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {

  global $wp_version;
  if ( $wp_version !== '4.7.1' ) {
     return $data;
  }

  $filetype = wp_check_filetype( $filename, $mimes );

  return [
      'ext'             => $filetype['ext'],
      'type'            => $filetype['type'],
      'proper_filename' => $data['proper_filename']
  ];

}, 10, 4 );

function cc_mime_types( $mimes ){
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );

function fix_svg() {
  echo '<style type="text/css">
        .attachment-266x266, .thumbnail img {
             width: 100% !important;
             height: auto !important;
        }
        </style>';
}
add_action( 'admin_head', 'fix_svg' );

