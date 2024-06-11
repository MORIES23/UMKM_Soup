<?php
@include 'config.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="" type="Assets/logo.png">
    <title>Product List</title>
    <link rel="stylesheet" href="style.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <header id="home">
        <div class="containernav">
            <nav>
                <img src="Assets/logo.png" alt="logo" class="logo">
                <ul class="navbar">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#menu">Menu</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#" class="shopping"><i class='bx bxs-cart-add'></i></a><span class="quantity"></span></li>
                </ul>
            </nav>
        </div>
        <div class="transitionheader">
        <h1>Hokkien Soup Ikan</h1>
        <h2>Est. 2003</h2>
        <div class="cover">
            <div class="box">
                <img src="Assets/Frame1.png" class="frame1" alt="Frame 1">
            </div>
            <div class="box">
                <img src="Assets/Frame2.png" class="frame2" alt="Frame 2">
            </div>
            <div class="box">
                <img src="Assets/Frame3.png" class="frame3" alt="Frame 3">
            </div>
            <div class="box">
                <img src="Assets/Frame4.png" class="frame4" alt="Frame 4">
            </div>        
        </div>
        </div>
    </header>
    
    <main id="menu">
        <div class="container">
            <div class="product-list">
                <?php
                $query = "SELECT * FROM products";
                $result = mysqli_query($conn, $query);

                if(mysqli_num_rows($result) > 0) {
                    while($row = mysqli_fetch_assoc($result)) { ?>
                        <div class="product-item">
                    <img src="uploaded_img/<?php echo $row['image']; ?>" alt="<?php echo $row['name']; ?>">
                    <h2 class="title"><?php echo $row['name']; ?></h2>
                    <p class="description"><?php echo $row['description']; ?></p>
                    <p class="price">Rp. <?php echo number_format($row['price'], 0, ',', '.'); ?></p>
                    <button class="add-to-cart" 
                        data-id="<?php echo $row['id']; ?>" 
                        data-name="<?php echo $row['name']; ?>" 
                        data-price="<?php echo $row['price']; ?>" 
                        data-image="uploaded_img/<?php echo $row['image']; ?>" 
                        data-description="<?php echo $row['description']; ?>">Add to Cart</button>
                </div>
            <?php }} ?>
            </div>
        </div>
        <div class="cart">
            <h1>Keranjang</h1>
            <div class="scrollContainer">
                <ul class="listCart"></ul>
                <div class="checkOut">
                    <div id="totalPrice" class="total">0</div>
                    <div class="closeShopping">Close</div>
                </div>
            </div>
        </div>
    </main>

    <footer id="contact">
        <div class="footer-content">
            <div class="footer-left">
                <h2>Hokkien Soup Ikan</h2> 
                <p><a href="https://www.google.com/maps/place/Sudi+Mampir+Kedai+Kopi/@1.1473569,104.0092618,17z/data=!3m1!4b1!4m6!3m5!1s0x31d98987cf8b9139:0xa751e55432320de1!8m2!3d1.1473569!4d104.0092618!16s%2Fg%2F1hm37h674?authuser=9&entry=ttu"><i class='bx bxs-directions' ></i>Location</a></p>
                <p><a href="tel: +628126109300"><i class='bx bxs-phone-call'></i>+62 812 6109 300</a></p>
            </div>
            <div class="footer-right">
                <h2>Jam Operasional</h2>
                <p>Senin - Minggu : 07:00 - 13:45 WIB</p>
            </div>
        </div>
        <div class="social-links">
            <p><a href="https://www.facebook.com/profile.php?id=61560200881709">Facebook</a>  |  
            <a href="https://www.instagram.com/hokkiansoupikan/">Instagram</a>  |  
            <a href="https://www.tiktok.com/@hokkian.soupikan">Tiktok</a>  |  
            <a href="https://gofood.co.id/en/batam/restaurant/hokkian-laksa-soup-ikan-foodcourt-pasir-putih-f3e81435-1118-43db-b4e6-18537d084a29">Gofood</a></p>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>