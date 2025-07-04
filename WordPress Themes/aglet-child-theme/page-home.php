<?php
    /**
     * Template Name: Home Page Template
     */
    get_header();

?>

<?php
$args = array(
    'post_type' => 'post',
    'post_cat'  => 'portfolio-showcase',
);
$query = new WP_Query($args);
?>
<section id="home">
    <div class="portfolio-showcase relative">
        <button class="portfolio-button button-previous"><i class="fa fa-chevron-left"></i></button>
        <button class="portfolio-button button-next"><i class="fa fa-chevron-right"></i></button>


        <div class="portfolio-track">
            <?php if ( $query->have_posts() ) : ?>
                <?php while ( $query->have_posts() ) : $query->the_post(); ?>
                    <div class="case-project relative">
                        <?php
                            $thumbnail_url = get_the_post_thumbnail_url( get_the_ID(), 'large' );
                            $video_url = get_field('video_url');
                        ?>
                        <video
                            class="portfolio-showcase-video relative"
                            data-thumbnail="<?php echo esc_url( $thumbnail_url ); ?>"
                            preload=""
                            loop=""
                            muted=""
                            playsinline
                            controlslist="nodownload"
                            poster="<?php echo esc_url( $thumbnail_url ); ?>"
                            data-loaded="true"
                        >
                            <source data-src="<?php echo esc_url( $video_url ); ?>" type="video/mp4" src="<?php echo esc_url( $video_url ); ?>">
                        </video>
                        <div class="case-content">
                            <h2><?php the_title(); ?></h2>
                            <p><?php the_field('showcase_short_description'); ?></p>  
                             <button class="play-button"><i class="fa fa-play"></i></button>
                        </div>            
                    </div>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
            <?php else : ?>
                <p>No posts found.</p>
            <?php endif; ?>
        </div>

        <div class="portfolio-progress-wrapper">
            <div class="portfolio-progress-bar"></div>
        </div>
    </div>
</section>
<?php get_footer(); ?>