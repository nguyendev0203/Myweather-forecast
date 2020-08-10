<?php
// You can simulate a slow server with sleep
sleep(3);

function is_ajax_request()
{
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
        $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
}

// Typically, this would be a call to a database
function find_blog_posts($page)
{
    //$first_post = 101;
    $per_page = 3;
    //$offset = (($page - 1) * $per_page) + 1;

    $blog_posts = [];
    // This is our "fake" database
    for ($i = 0; $i < $per_page; $i++) {
        //$id = $first_post - 1 + $offset + $i;
        if ($i == 0) {
            $blog_post = [
                'cate' => 'health',
                'img' => 'news1.png',
                'title' => "How COVID-19 has turned the world of storm chasing upside down",
                'content' => "For most of the world, working from home means turning a spare room or a kitchen table into a workspace. But for those whose workspace has never been confined to a desk or a building, the impact of social distancing has hit much differently.",
            ];
            $blog_posts[] = $blog_post;
        } elseif ($i == 1) {
            $blog_post = [
                'cate' => 'severe',
                'img' => 'news2.jpg',
                'title' => "Storm-weary South put on alert for another round of violent weather",
                'content' => "A repeat of the ferociousness of the tornado outbreak during the Easter weekend of 2020 is not anticipated, but a new round of severe weather, including the potential for tornadoes, seems likely to target many of the same areas hit hard recently in the southern United States.",
            ];
            $blog_posts[] = $blog_post;
        } else {
            $blog_post = [
                'cate' => 'weatherfc',
                'img' => 'news3.jpg',
                'title' => "New areas of 'smoldering' reported near Chernobyl nuclear plant ",
                'content' => "A massive fire that broke out in northern Ukraine at the beginning of April is no longer said to be threatening the infamous Chernobyl nuclear power plant in the region. However, officials are monitoring hot spots as winds whip through the region.",
            ];
            $blog_posts[] = $blog_post;
        }
    }
    return $blog_posts;
}

if (!is_ajax_request()) {
    exit;
}

$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;

$blog_posts = find_blog_posts($page);
?>
<?php foreach ($blog_posts as $blog_post) {?>
<div class="post <?php echo $blog_post['cate']; ?>">
    <h2><?php echo $blog_post['title']; ?></h2>
    <div class="featured-image"><img src="images/<?php echo $blog_post['img']; ?>" alt=""></div>
    <p><?php echo $blog_post['content']; ?></p>
    <a href="#" class="button">Read more</a>
</div>
<?php }?>