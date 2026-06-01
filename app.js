/* BloomyCocoon Main Application Controller */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. STATE MANAGEMENT
    // ----------------------------------------------------
    // ----------------------------------------------------
    // 1. STATE MANAGEMENT & SPA HASH ROUTING
    // ----------------------------------------------------
    let currentScreen = 'screen-home';
    const screenHistory = ['screen-home'];
    let inTransition = false;
    let isRoutingFromHash = false;
    let shouldFocusCustomOrder = false;

    const CANONICAL_URL = "https://www.bloomycocoon.com/";
    const WHATSAPP_NUMBER = "919061174579";

    // Cart state
    let cart = [];

    const collectionCategories = [
  {
    "id": "bouquets",
    "label": "Bouquets"
  },
  {
    "id": "plushies",
    "label": "Plushies"
  },
  {
    "id": "keychains",
    "label": "Keychains"
  },
  {
    "id": "baby-gifts",
    "label": "Baby Gifts"
  },
  {
    "id": "accessories",
    "label": "Accessories"
  },
  {
    "id": "home-decor",
    "label": "Home & Decor"
  },
  {
    "id": "gift-combos",
    "label": "Gift Combos"
  }
];
    const legacyFilterMap = {
  "decor": "home-decor"
};
    const categoryFallbackImages = {
  "bouquets": "images/mixed_luxury_bouquet.png",
  "plushies": "images/cozy_bear_plushie.png",
  "keychains": "images/mini_animal_keychain.png",
  "baby-gifts": "images/crochet_bunny_plush.png",
  "accessories": "images/crochet_tote_bag.png",
  "home-decor": "images/crochet_wall_hanging.png",
  "gift-combos": "images/hero_crochet_scene.png",
  "default": "images/hero_crochet_scene.png"
};
    const collectionProducts = [
  {
    "id": "single-crochet-rose",
    "name": "Single Crochet Rose",
    "category": "bouquets",
    "startingPrice": 149,
    "image": "images/crochet_rose_bouquet_single-crochet-rose-landscape-generated.png",
    "badge": "Single Stem",
    "description": "A keepsake rose stem for tiny gestures, notes, and thoughtful add-ons."
  },
  {
    "id": "single-crochet-tulip",
    "name": "Single Crochet Tulip",
    "category": "bouquets",
    "startingPrice": 169,
    "image": "images/crochet_tulip_bouquet_single-crochet-tulip-landscape-generated.png",
    "badge": "Fresh Pick",
    "description": "A soft tulip stem with a clean handmade wrap and cheerful color options."
  },
  {
    "id": "single-sunflower-stem",
    "name": "Single Sunflower Stem",
    "category": "bouquets",
    "startingPrice": 199,
    "image": "images/crochet_sunflower_bouquet_single-sunflower-stem-generated.png",
    "badge": "Sunny",
    "description": "A bright sunflower stem made for desk corners, jars, and little surprises."
  },
  {
    "id": "rose-bouquet",
    "name": "Rose Bouquet",
    "category": "bouquets",
    "startingPrice": 799,
    "image": "images/crochet_rose_bouquet_rose-bouquet.png",
    "badge": "Made with Love",
    "description": "A romantic rose bunch stitched in lasting yarn with gentle floral detail."
  },
  {
    "id": "tulip-bouquet",
    "name": "Tulip Bouquet",
    "category": "bouquets",
    "startingPrice": 899,
    "image": "images/crochet_tulip_bouquet_tulip-bouquet.png",
    "badge": "New Arrival",
    "description": "A graceful tulip bouquet in soft shades, wrapped for gifting."
  },
  {
    "id": "lavender-bouquet",
    "name": "Lavender Bouquet",
    "category": "bouquets",
    "startingPrice": 799,
    "image": "images/crochet_lavender_bouquet_lavender-bouquet.png",
    "badge": "Kept Favorite",
    "description": "A calming lavender bunch preserved from the original BloomyCocoon collection."
  },
  {
    "id": "custom-premium-bouquet",
    "name": "Custom Premium Bouquet",
    "category": "bouquets",
    "startingPrice": 1499,
    "image": "images/mixed_luxury_bouquet_custom-premium-bouquet.png",
    "badge": "Custom",
    "featured": true,
    "description": "A premium bouquet tailored by flower type, palette, size, and packaging."
  },
  {
    "id": "mini-teddy-plushie",
    "name": "Mini Teddy Plushie",
    "category": "plushies",
    "startingPrice": 399,
    "image": "images/cozy_bear_plushie_mini-teddy-plushie.png",
    "badge": "Tiny Hug",
    "description": "A pocket-sized teddy plushie with a soft, cuddly finish."
  },
  {
    "id": "bunny-plushie",
    "name": "Bunny Plushie",
    "category": "plushies",
    "startingPrice": 499,
    "image": "images/crochet_bunny_plush_bunny-plushie.png",
    "badge": "Gift Favorite",
    "description": "A gentle bunny plushie stitched for birthdays, baby gifting, and keepsakes."
  },
  {
    "id": "cat-plushie",
    "name": "Cat Plushie",
    "category": "plushies",
    "startingPrice": 499,
    "image": "images/crochet_cat_plushie_cat-plushie.png",
    "description": "A cozy cat companion with handmade charm and custom color options."
  },
  {
    "id": "duck-plushie",
    "name": "Duck Plushie",
    "category": "plushies",
    "startingPrice": 449,
    "image": "images/crochet_duck_plushie_duck-plushie.png",
    "description": "A cheerful duck plushie with rounded details and soft yarn texture."
  },
  {
    "id": "bee-plushie",
    "name": "Bee Plushie",
    "category": "plushies",
    "startingPrice": 399,
    "image": "images/crochet_bee_plushie.png",
    "description": "A sweet mini bee plushie for playful gifting and decor accents."
  },
  {
    "id": "frog-plushie",
    "name": "Frog Plushie",
    "category": "plushies",
    "startingPrice": 449,
    "image": "images/crochet_frog_plushie.png",
    "description": "A playful frog plushie with custom expressions and cozy colors."
  },
  {
    "id": "penguin-plushie",
    "name": "Penguin Plushie",
    "category": "plushies",
    "startingPrice": 499,
    "image": "images/crochet_penguin_plushie.png",
    "description": "A rounded penguin plushie made for tiny shelves and warm gifting."
  },
  {
    "id": "dinosaur-plushie",
    "name": "Dinosaur Plushie",
    "category": "plushies",
    "startingPrice": 599,
    "image": "images/crochet_dinosaur_plushie.png",
    "description": "A friendly dinosaur plushie with handmade spikes and custom colors."
  },
  {
    "id": "octopus-plushie",
    "name": "Octopus Plushie",
    "category": "plushies",
    "startingPrice": 399,
    "image": "images/cozy_bear_plushie_octopus-plushie-generated.png",
    "description": "A tiny octopus plushie with soft tentacles and cheerful detail."
  },
  {
    "id": "custom-animal-plushie",
    "name": "Custom Animal Plushie",
    "category": "plushies",
    "startingPrice": 699,
    "image": "images/crochet_bunny_plush_custom-animal-plushie.png",
    "badge": "Custom",
    "description": "A made-to-order animal plushie inspired by your favorite character or pet."
  },
  {
    "id": "mini-pocket-plushies",
    "name": "Mini Pocket Plushies",
    "category": "plushies",
    "startingPrice": 299,
    "image": "images/cozy_bear_plushie_mini-pocket-plushies-generated.png",
    "badge": "Kept Favorite",
    "description": "Small pocket plushies preserved from the original collection for tiny gifting."
  },
  {
    "id": "heart-keychain",
    "name": "Heart Keychain",
    "category": "keychains",
    "startingPrice": 149,
    "image": "images/heart_keychain_heart-keychain.png",
    "badge": "Sweet Note",
    "description": "A soft heart charm for keys, bags, hampers, and little add-ons."
  },
  {
    "id": "flower-keychain",
    "name": "Flower Keychain",
    "category": "keychains",
    "startingPrice": 149,
    "image": "images/crochet_flower_keychain_flower-keychain.png",
    "description": "A cheerful flower charm made in your preferred yarn shade."
  },
  {
    "id": "mushroom-keychain",
    "name": "Mushroom Keychain",
    "category": "keychains",
    "startingPrice": 199,
    "image": "images/crochet_mushroom_keychain.png",
    "description": "A whimsical mushroom keychain for playful bag and key styling."
  },
  {
    "id": "teddy-keychain",
    "name": "Teddy Keychain",
    "category": "keychains",
    "startingPrice": 249,
    "image": "images/mini_animal_keychain_teddy-keychain.png",
    "description": "A tiny teddy charm with a soft handmade finish."
  },
  {
    "id": "bunny-keychain",
    "name": "Bunny Keychain",
    "category": "keychains",
    "startingPrice": 249,
    "image": "images/mini_animal_keychain_bunny-keychain-generated.png",
    "description": "A bunny keychain with petite ears and cozy yarn texture."
  },
  {
    "id": "cat-keychain",
    "name": "Cat Keychain",
    "category": "keychains",
    "startingPrice": 249,
    "image": "images/mini_animal_keychain_cat-keychain-generated.png",
    "description": "A cat charm made for bags, keys, and custom gift boxes."
  },
  {
    "id": "duck-keychain",
    "name": "Duck Keychain",
    "category": "keychains",
    "startingPrice": 249,
    "image": "images/mini_animal_keychain_duck-keychain-generated.png",
    "description": "A cheerful duck charm with bright handmade personality."
  },
  {
    "id": "initial-letter-keychain",
    "name": "Initial Letter Keychain",
    "category": "keychains",
    "startingPrice": 199,
    "image": "images/heart_keychain_initial-letter-keychain-generated.png",
    "badge": "Personalized",
    "description": "A custom initial keychain for names, couples, and hampers."
  },
  {
    "id": "couple-keychain-set",
    "name": "Couple Keychain Set",
    "category": "keychains",
    "startingPrice": 399,
    "image": "images/crochet_couple_keychains.png",
    "description": "A pair of coordinated crochet keychains made for couple gifting."
  },
  {
    "id": "custom-character-keychain",
    "name": "Custom Character Keychain",
    "category": "keychains",
    "startingPrice": 349,
    "image": "images/mini_animal_keychain_custom-character-keychain-generated.png",
    "badge": "Custom",
    "description": "A character-inspired charm based on your idea, theme, or reference."
  },
  {
    "id": "strawberry-keychain",
    "name": "Strawberry Keychain",
    "category": "keychains",
    "startingPrice": 199,
    "image": "images/strawberry_keychain_strawberry-keychain.png",
    "badge": "Kept Favorite",
    "description": "A fruity strawberry charm preserved from the original collection."
  },
  {
    "id": "baby-booties",
    "name": "Baby Booties",
    "category": "baby-gifts",
    "startingPrice": 399,
    "image": "images/crochet_bunny_plush_baby-booties-generated.png",
    "description": "Soft crochet booties for newborn gifting, made in gentle baby shades."
  },
  {
    "id": "baby-cap",
    "name": "Baby Cap",
    "category": "baby-gifts",
    "startingPrice": 399,
    "image": "images/crochet_headband_baby-cap-generated.png",
    "description": "A cozy handmade baby cap with custom color and sizing options."
  },
  {
    "id": "baby-mittens",
    "name": "Baby Mittens",
    "category": "baby-gifts",
    "startingPrice": 299,
    "image": "images/crochet_bunny_plush_baby-mittens.png",
    "description": "Tiny mittens stitched for comfort, softness, and newborn gifting."
  },
  {
    "id": "baby-booties-cap-set",
    "name": "Baby Booties + Cap Set",
    "category": "baby-gifts",
    "startingPrice": 799,
    "image": "images/crochet_bunny_plush_baby-booties-cap-set.png",
    "badge": "Set",
    "description": "A coordinated baby set with booties and cap in matching yarn shades."
  },
  {
    "id": "baby-rattle",
    "name": "Baby Rattle",
    "category": "baby-gifts",
    "startingPrice": 349,
    "image": "images/crochet_baby_rattle.png",
    "description": "A soft crochet rattle for a sweet baby shower or newborn gift."
  },
  {
    "id": "baby-name-garland",
    "name": "Baby Name Garland",
    "category": "baby-gifts",
    "startingPrice": 799,
    "image": "images/crochet_wall_hanging_baby-name-garland-generated.png",
    "badge": "Name Custom",
    "description": "A custom name garland for nurseries, celebrations, and keepsake corners."
  },
  {
    "id": "baby-bunny-plushie",
    "name": "Baby Bunny Plushie",
    "category": "baby-gifts",
    "startingPrice": 499,
    "image": "images/crochet_bunny_plush_baby-bunny-plushie.png",
    "description": "A gentle baby bunny plushie in soft yarn and nursery-friendly colors."
  },
  {
    "id": "baby-bear-plushie",
    "name": "Baby Bear Plushie",
    "category": "baby-gifts",
    "startingPrice": 499,
    "image": "images/cozy_bear_plushie_baby-bear-plushie.png",
    "description": "A soft baby bear plushie for newborn hampers and first keepsakes."
  },
  {
    "id": "baby-shower-mini-set",
    "name": "Baby Shower Mini Set",
    "category": "baby-gifts",
    "startingPrice": 1299,
    "image": "images/crochet_bunny_plush_baby-shower-mini-set-generated.png",
    "badge": "Shower Gift",
    "description": "A curated mini baby set for shower tables, hampers, and family gifting."
  },
  {
    "id": "newborn-gift-hamper",
    "name": "Newborn Gift Hamper",
    "category": "baby-gifts",
    "startingPrice": 1999,
    "image": "images/hero_crochet_scene_newborn-gift-hamper-generated.png",
    "badge": "Hamper",
    "featured": true,
    "description": "A larger newborn hamper with baby essentials, plush details, and packaging."
  },
  {
    "id": "crochet-bow-clip",
    "name": "Crochet Bow Clip",
    "category": "accessories",
    "startingPrice": 149,
    "image": "images/crochet_headband_crochet-bow-clip-generated.png",
    "description": "A sweet bow clip with soft texture and custom shade options."
  },
  {
    "id": "crochet-scrunchie",
    "name": "Crochet Scrunchie",
    "category": "accessories",
    "startingPrice": 149,
    "image": "images/crochet_scrunchies_crochet-scrunchie.png",
    "badge": "Cozy Soft",
    "description": "A soft crochet scrunchie for gentle everyday wear."
  },
  {
    "id": "crochet-hair-band",
    "name": "Crochet Hair Band",
    "category": "accessories",
    "startingPrice": 199,
    "image": "images/crochet_headband_crochet-hair-band.png",
    "badge": "Trending",
    "description": "A handmade hair band with comfortable stretch and cozy texture."
  },
  {
    "id": "flower-brooch",
    "name": "Flower Brooch",
    "category": "accessories",
    "startingPrice": 199,
    "image": "images/crochet_flower_brooch.png",
    "description": "A crochet flower brooch for bags, sarees, jackets, and gift wraps."
  },
  {
    "id": "crochet-bracelet",
    "name": "Crochet Bracelet",
    "category": "accessories",
    "startingPrice": 149,
    "image": "images/crochet_bracelet_earrings.png",
    "description": "A lightweight crochet bracelet with soft color options."
  },
  {
    "id": "crochet-earrings",
    "name": "Crochet Earrings",
    "category": "accessories",
    "startingPrice": 199,
    "image": "images/crochet_flower_keychain_crochet-earrings-generated.png",
    "description": "Delicate crochet earrings for a soft handmade accessory moment."
  },
  {
    "id": "bag-charm",
    "name": "Bag Charm",
    "category": "accessories",
    "startingPrice": 249,
    "image": "images/crochet_bag_charm_bag-charm.png",
    "description": "A playful charm for tote bags, backpacks, and custom hampers."
  },
  {
    "id": "phone-charm",
    "name": "Phone Charm",
    "category": "accessories",
    "startingPrice": 199,
    "image": "images/crochet_bag_charm_phone-charm-generated.png",
    "description": "A tiny crochet phone charm for soft personal styling."
  },
  {
    "id": "crochet-coin-pouch",
    "name": "Crochet Coin Pouch",
    "category": "accessories",
    "startingPrice": 399,
    "image": "images/crochet_coin_pouch_crochet-coin-pouch.png",
    "badge": "Retro Charm",
    "description": "A compact coin pouch for cards, coins, and small essentials."
  },
  {
    "id": "crochet-phone-sleeve",
    "name": "Crochet Phone Sleeve",
    "category": "accessories",
    "startingPrice": 399,
    "image": "images/crochet_phone_sleeve_crochet-phone-sleeve.png",
    "badge": "Must Have",
    "description": "A protective crochet phone sleeve preserved from the original collection."
  },
  {
    "id": "crochet-tote-bag",
    "name": "Crochet Tote Bag",
    "category": "accessories",
    "startingPrice": 799,
    "image": "images/crochet_tote_bag_crochet-tote-bag.png",
    "badge": "Kept Favorite",
    "featured": true,
    "description": "A roomy handmade tote preserved from the original collection."
  },
  {
    "id": "crochet-coaster",
    "name": "Crochet Coaster",
    "category": "home-decor",
    "startingPrice": 149,
    "image": "images/doily_table_decor_crochet-coaster.png",
    "description": "A single handmade coaster for mugs, desks, and cozy corners."
  },
  {
    "id": "mini-flower-pot",
    "name": "Mini Flower Pot",
    "category": "home-decor",
    "startingPrice": 399,
    "image": "images/crochet_mini_flower_pot.png",
    "description": "A mini crochet flower pot for desks, shelves, and small decor corners."
  },
  {
    "id": "car-hanging-charm",
    "name": "Car Hanging Charm",
    "category": "home-decor",
    "startingPrice": 349,
    "image": "images/crochet_car_hanging.png",
    "description": "A soft hanging charm for cars, windows, and gifting."
  },
  {
    "id": "crochet-garland",
    "name": "Crochet Garland",
    "category": "home-decor",
    "startingPrice": 799,
    "image": "images/crochet_wall_hanging_crochet-garland-generated.png",
    "description": "A handmade garland for rooms, celebrations, and nursery corners."
  },
  {
    "id": "table-decor-piece",
    "name": "Table Decor Piece",
    "category": "home-decor",
    "startingPrice": 599,
    "image": "images/doily_table_decor_table-decor-piece.png",
    "description": "A handcrafted decor accent for coffee tables, shelves, and gifting."
  },
  {
    "id": "door-hanging",
    "name": "Door Hanging",
    "category": "home-decor",
    "startingPrice": 699,
    "image": "images/crochet_wall_hanging_door-hanging-generated.png",
    "description": "A soft door hanging for festive, nursery, or everyday decor."
  },
  {
    "id": "custom-name-decor",
    "name": "Custom Name Decor",
    "category": "home-decor",
    "startingPrice": 999,
    "image": "images/crochet_wall_hanging_custom-name-decor-generated.png",
    "badge": "Name Custom",
    "description": "A personalized crochet name decor piece for rooms, doors, and gifts."
  },
  {
    "id": "crochet-cushion-cover",
    "name": "Crochet Cushion Cover",
    "category": "home-decor",
    "startingPrice": 699,
    "image": "images/crochet_cushion_cover_crochet-cushion-cover.png",
    "badge": "Kept Favorite",
    "description": "A cozy cushion cover preserved from the original collection."
  },
  {
    "id": "crochet-plant-holder",
    "name": "Crochet Plant Holder",
    "category": "home-decor",
    "startingPrice": 499,
    "image": "images/crochet_plant_holder_crochet-plant-holder.png",
    "badge": "Kept Favorite",
    "description": "A sage-toned plant holder preserved from the original collection."
  },
  {
    "id": "wall-hanging",
    "name": "Wall Hanging",
    "category": "home-decor",
    "startingPrice": 699,
    "image": "images/crochet_wall_hanging_wall-hanging.png",
    "badge": "Boho Premium",
    "featured": true,
    "description": "A crochet wall piece made to warm up rooms, doors, and blank walls."
  },
  {
    "id": "keychain-flower-combo",
    "name": "Keychain + Flower Combo",
    "category": "gift-combos",
    "startingPrice": 399,
    "image": "images/crochet_keychain_flower_combo.png",
    "badge": "Combo",
    "description": "A small gift pairing with one keychain and one handmade flower."
  },
  {
    "id": "mini-bouquet-note-card",
    "name": "Mini Bouquet + Note Card",
    "category": "gift-combos",
    "startingPrice": 499,
    "image": "images/crochet_rose_bouquet_mini-bouquet-note-card.png",
    "description": "A mini bouquet packaged with a note card for simple thoughtful gifting."
  },
  {
    "id": "plushie-flower-combo",
    "name": "Plushie + Flower Combo",
    "category": "gift-combos",
    "startingPrice": 799,
    "image": "images/crochet_plushie_flower_combo.png",
    "description": "A cozy plushie paired with a handmade flower for warm occasions."
  },
  {
    "id": "birthday-mini-gift-box",
    "name": "Birthday Mini Gift Box",
    "category": "gift-combos",
    "startingPrice": 999,
    "image": "images/crochet_birthday_gift_box.png",
    "badge": "Birthday",
    "description": "A birthday-ready crochet gift box with soft add-ons and packaging."
  },
  {
    "id": "couple-keychain-combo",
    "name": "Couple Keychain Combo",
    "category": "gift-combos",
    "startingPrice": 499,
    "image": "images/heart_keychain_couple-keychain-combo-generated.png",
    "description": "A couple-friendly charm combo with coordinated handmade keychains."
  },
  {
    "id": "couple-bouquet-combo",
    "name": "Couple Bouquet Combo",
    "category": "gift-combos",
    "startingPrice": 1199,
    "image": "images/mixed_luxury_bouquet_couple-bouquet-combo.png",
    "description": "A romantic combo built around a crochet bouquet and matching details."
  },
  {
    "id": "baby-gift-combo",
    "name": "Baby Gift Combo",
    "category": "gift-combos",
    "startingPrice": 1499,
    "image": "images/crochet_bunny_plush_baby-gift-combo.png",
    "description": "A sweet baby gift combo with plush, accessory, or nursery elements."
  },
  {
    "id": "anniversary-gift-box",
    "name": "Anniversary Gift Box",
    "category": "gift-combos",
    "startingPrice": 1499,
    "image": "images/mixed_luxury_bouquet_anniversary-gift-box-generated.png",
    "badge": "Anniversary",
    "description": "An anniversary box with crochet keepsakes, flowers, and gift-ready packaging."
  },
  {
    "id": "custom-crochet-hamper",
    "name": "Custom Crochet Hamper",
    "category": "gift-combos",
    "startingPrice": 1999,
    "image": "images/hero_crochet_scene_custom-crochet-hamper-generated.png",
    "badge": "Custom Hamper",
    "featured": true,
    "description": "A fully custom hamper combining crochet pieces, notes, flowers, and packaging."
  }
];
    const priceNote = "Final price may vary based on size, color, custom name, flowers, packaging, and delivery.";
    const categoryDescriptions = {
        "all": "Explore BloomyCocoon's handmade crochet collection — bouquets, plushies, keychains, baby gifts, accessories, home decor and gift combos crafted in Kerala and delivered across India. Add your favourites to cart and continue to WhatsApp to customize and finalize your order.",
        "bouquets": "Long-lasting handmade crochet bouquets crafted for birthdays, anniversaries, Valentine's Day and meaningful surprises. Choose from roses, tulips, sunflowers and custom bouquet styles, then finalize colors, size and wrapping through WhatsApp.",
        "plushies": "Soft handmade crochet plushies made for cute gifting, keepsakes and cozy custom surprises. These pieces work well for birthdays, baby gifting, couple gifts and thoughtful handmade moments.",
        "keychains": "Affordable crochet keychains and charms for bags, keys, couple gifts and small handmade surprises. Choose from hearts, flowers, animals, initials and custom character-inspired designs.",
        "baby-gifts": "Soft crochet baby gifts for newborns, baby showers and thoughtful handmade gifting. Options can include booties, caps, mittens, rattles, baby plushies and custom baby-themed gift sets.",
        "accessories": "Cute handmade crochet accessories including scrunchies, hair bands, charms, brooches, earrings, bracelets and small wearable pieces. Perfect for soft everyday styling and affordable gifting.",
        "home-decor": "Cozy crochet decor pieces made to bring warmth to rooms, desks, cars and gifting corners. Explore coasters, wall hangings, car charms, flower pots, garlands and custom name decor.",
        "gift-combos": "Handmade crochet gift combos for birthdays, anniversaries, couples, baby gifting and special occasions. Combine bouquets, plushies, keychains, notes and packaging into a personalized gift set."
    };

    function getSafePrice(price) {
        const value = Number(price);
        return Number.isFinite(value) && value > 0 ? value : 0;
    }

    function getCartSubtotal() {
        return cart.reduce((sum, item) => sum + (getSafePrice(item.price) * item.qty), 0);
    }

    function buildWhatsAppUrl(message) {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    function openWhatsAppMessage(message) {
        window.open(buildWhatsAppUrl(message), "_blank", "noopener");
    }

    function trackEvent(eventName, params = {}) {
        if (window.gtag && typeof window.gtag === "function") {
            window.gtag("event", eventName, params);
        }
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event: eventName, ...params });
        }
    }

    function buildCartWhatsAppMessage() {
        const note = document.getElementById('cart-customer-note')?.value.trim();
        let message = "Hello BloomyCocoon! 🌸 I would like to place an order for these handmade crochet items:\n\n";

        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `Category: ${getCategoryLabel(item.category)}\n`;
            message += `Qty: ${item.qty}\n`;
            message += `Starting from: ₹${formatPrice(getSafePrice(item.price))}\n\n`;
        });

        message += `Starting total: ₹${formatPrice(getCartSubtotal())}\n\n`;

        if (note) {
            message += `Customization note:\n${note}\n\n`;
        }

        message += "I understand the final price may vary based on size, color, custom name, flowers, packaging, and delivery. Please help me finalize the order.";
        return message;
    }


    // Custom Order step state
    let orderStep = 1;
    const orderData = {
        type: 'Bouquet',
        notes: '',
        name: ''
    };

    // Hash-to-Screen Mapping for standard routing
    const screenHashMapping = {
        'screen-home': '#/',
        'screen-collection': '#/collection',
        'screen-custom-orders': '#/custom',
        'screen-about': '#/about',
        'screen-faq': '#/faq',
        'screen-contact': '#/contact'
    };

    function getScreenIdFromHash(hash) {
        const cleanHash = hash.replace(/^#/, '').split('?')[0];
        if (cleanHash === '' || cleanHash === '/' || cleanHash === '/home' || cleanHash === 'home') return 'screen-home';
        if (cleanHash === '/collection' || cleanHash === 'collection') return 'screen-collection';
        if (cleanHash === '/custom' || cleanHash === 'custom' || cleanHash === 'custom-orders') return 'screen-custom-orders';
        if (cleanHash === '/about' || cleanHash === 'about') return 'screen-about';
        if (cleanHash === '/faq' || cleanHash === 'faq') return 'screen-faq';
        if (cleanHash === '/contact' || cleanHash === 'contact') return 'screen-contact';
        return 'screen-home';
    }

    const screenTitles = {
        'screen-home': 'Handmade Crochet Gifts in Kerala & India | BloomyCocoon',
        'screen-collection': 'Crochet Bouquets, Plushies, Keychains & Handmade Gifts | BloomyCocoon',
        'screen-about': 'About BloomyCocoon | Handmade Crochet Brand from Malappuram, Kerala',
        'screen-faq': 'BloomyCocoon FAQ | Crochet Orders, Delivery & Care',
        'screen-contact': 'Contact BloomyCocoon | WhatsApp Crochet Gift Orders',
        'screen-custom-orders': 'Custom Crochet Gifts in Kerala | BloomyCocoon'
    };

    const screenDescriptions = {
        'screen-home': 'Affordable handmade crochet gifts from Mampad, Malappuram, Kerala. Explore crochet bouquets, plushies, keychains, baby gifts and custom orders with delivery across India.',
        'screen-collection': 'Browse handmade crochet bouquets, plushies, keychains, baby gifts, accessories, home decor and gift combos from BloomyCocoon. Custom orders available across India.',
        'screen-about': 'Meet BloomyCocoon, a handmade crochet gifting brand from Mampad, Malappuram, Kerala, creating soft and meaningful gifts delivered across India.',
        'screen-faq': 'Find answers about custom crochet orders, WhatsApp ordering, delivery across Kerala and India, production time, starting prices and crochet gift care.',
        'screen-contact': 'Contact BloomyCocoon for handmade crochet gifts and custom orders. Based in Mampad, Malappuram, Kerala and delivering across India.',
        'screen-custom-orders': 'Create custom crochet bouquets, plushies, keychains, baby gifts and handmade gift combos with BloomyCocoon. Share your idea and finalize your order on WhatsApp.'
    };

    // SPA ROUTER WITH DYNAMIC TRANSITIONS & SEO SYNCING
    window.navigateTo = function(targetScreenId, transitionType = 'push') {
        if (inTransition || targetScreenId === currentScreen) return;

        const currentScreenEl = document.getElementById(currentScreen);
        const targetScreenEl = document.getElementById(targetScreenId);

        if (!currentScreenEl || !targetScreenEl) {
            console.error(`Router error: Screen not found. Current: ${currentScreen}, Target: ${targetScreenId}`);
            return;
        }

        // Update Title, Meta Description, and Open Graph tags dynamically for premium SEO
        const newTitle = screenTitles[targetScreenId] || 'BloomyCocoon';
        const newDesc = screenDescriptions[targetScreenId] || '';
        
        document.title = newTitle;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', newDesc);
        
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', newTitle);
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', newDesc);
        
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', newTitle);
        
        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc) twitterDesc.setAttribute('content', newDesc);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', CANONICAL_URL);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', CANONICAL_URL);

        const twitterUrl = document.querySelector('meta[property="twitter:url"]');
        if (twitterUrl) twitterUrl.setAttribute('content', CANONICAL_URL);

        inTransition = true;
        
        // Toggle global WhatsApp button visibility based on target screen
        const whatsappFloat = document.getElementById('whatsapp-global-float');
        if (whatsappFloat) {
            if (targetScreenId === 'screen-custom-orders') {
                whatsappFloat.classList.add('whatsapp-hidden');
            } else {
                whatsappFloat.classList.remove('whatsapp-hidden');
            }
        }

        // Open drawer logic or cleanup
        if (targetScreenId !== 'screen-collection') {
            closeCart();
        }

        // Keep page position clean
        window.scrollTo({ top: 0, behavior: 'instant' });

        // Setup elements for transition
        currentScreenEl.classList.add('in-transition', 'will-change-transform');
        targetScreenEl.classList.add('in-transition', 'will-change-transform');
        targetScreenEl.classList.remove('hidden');

        // Apply transition animation classes
        let animTime = 380;
        if (transitionType === 'push') {
            currentScreenEl.classList.add('animate-push-exit');
            targetScreenEl.classList.add('animate-push-enter');
        } else if (transitionType === 'push_back') {
            currentScreenEl.classList.add('animate-push-back-exit');
            targetScreenEl.classList.add('animate-push-back-enter');
        } else if (transitionType === 'slide_up') {
            animTime = 420;
            targetScreenEl.classList.add('animate-slide-up-enter');
            targetScreenEl.style.zIndex = '30';
        } else if (transitionType === 'slide_down') {
            animTime = 420;
            currentScreenEl.classList.add('animate-slide-up-exit');
            currentScreenEl.style.zIndex = '30';
        } else if (transitionType === 'instant') {
            animTime = 0;
        }

        setTimeout(() => {
            // Remove active styles and hide previous screen
            currentScreenEl.classList.remove(
                'active', 'in-transition', 'will-change-transform',
                'animate-push-exit', 'animate-push-back-exit', 'animate-slide-up-exit'
            );
            if (transitionType !== 'slide_up' && transitionType !== 'instant') {
                currentScreenEl.classList.add('hidden');
            } else if (transitionType === 'instant') {
                currentScreenEl.classList.add('hidden');
            }

            // Target screen becomes active
            targetScreenEl.classList.remove(
                'in-transition', 'will-change-transform',
                'animate-push-enter', 'animate-push-back-enter', 'animate-slide-up-enter'
            );
            targetScreenEl.classList.add('active');
            targetScreenEl.style.zIndex = '';

            // Update history and state
            if (transitionType === 'push' || transitionType === 'slide_up') {
                screenHistory.push(targetScreenId);
            } else if (transitionType === 'push_back' || transitionType === 'slide_down') {
                screenHistory.pop();
            }

            currentScreen = targetScreenId;
            inTransition = false;
            
            // Re-sync nav highlights
            syncNavigationUI();
            if (targetScreenId === 'screen-collection') {
                applyCollectionFilterFromUrl();
            }

            if (targetScreenId === 'screen-custom-orders') {
                whatsappFloat?.classList.add('whatsapp-hidden');
            }

            // Sync the URL hash programmatically if not driven by hashchange event
            if (!isRoutingFromHash) {
                const targetHash = screenHashMapping[targetScreenId] || '#/';
                const keepCollectionFilterHash = targetScreenId === 'screen-collection' && window.location.hash.startsWith('#/collection?');
                if (!keepCollectionFilterHash && window.location.hash !== targetHash) {
                    window.location.hash = targetHash;
                }
            }

            if (targetScreenId === 'screen-custom-orders' && shouldFocusCustomOrder) {
                shouldFocusCustomOrder = false;
                setTimeout(() => scrollToCustomOrderForm(), 80);
            }
        }, animTime);
    };

    // Global helper for going back
    window.navigateBack = function() {
        if (screenHistory.length > 1) {
            window.history.back(); // Triggers hashchange listener
        } else {
            window.location.hash = '#/';
        }
    };

    function syncNavigationUI() {
        const routeMapping = {
            'screen-home': 'home',
            'screen-collection': 'collection',
            'screen-about': 'about',
            'screen-faq': 'faq',
            'screen-contact': 'contact'
        };

        const activeItem = routeMapping[currentScreen];
        
        // Update all nav menus across screens
        document.querySelectorAll('nav').forEach(nav => {
            nav.querySelectorAll('a').forEach(link => {
                const text = link.innerText.toLowerCase();

                if (link.matches('[data-nav-logo], .nav-logo') || text.trim() === 'bloomycocoon') {
                    return;
                }
                
                // Clear original classes
                link.className = "text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md";
                
                if (text.includes('collection') && activeItem === 'collection') {
                    link.className = "text-primary border-b border-secondary pb-1 font-label-md text-label-md";
                } else if (text.includes('custom') && currentScreen === 'screen-custom-orders') {
                    link.className = "text-primary border-b border-secondary pb-1 font-label-md text-label-md";
                } else if (text.includes('about') && activeItem === 'about') {
                    link.className = "text-primary border-b border-secondary pb-1 font-label-md text-label-md";
                } else if (text.includes('faq') && activeItem === 'faq') {
                    link.className = "text-primary border-b border-secondary pb-1 font-label-md text-label-md";
                } else if (text.includes('contact') && activeItem === 'contact') {
                    link.className = "text-primary border-b border-secondary pb-1 font-label-md text-label-md";
                }
            });
        });
    }

    // Hashchange listener to coordinate browser forward/backward operations
    window.addEventListener('hashchange', () => {
        const targetScreenId = getScreenIdFromHash(window.location.hash);
        if (targetScreenId === currentScreen) return;

        let transitionType = 'push';
        
        // Match going back vs going forward using our history stack
        if (screenHistory.length > 1 && screenHistory[screenHistory.length - 2] === targetScreenId) {
            transitionType = (currentScreen === 'screen-custom-orders') ? 'slide_down' : 'push_back';
        } else {
            transitionType = (targetScreenId === 'screen-custom-orders') ? 'slide_up' : 'push';
        }

        isRoutingFromHash = true;
        navigateTo(targetScreenId, transitionType);
        isRoutingFromHash = false;
    });

    // Handle deep-linking on page load
    const initialHash = window.location.hash || '#/';
    const initialScreen = getScreenIdFromHash(initialHash);
    if (initialScreen !== 'screen-home') {
        navigateTo(initialScreen, 'instant');
    }

    // ----------------------------------------------------
    // 3. NAVIGATION BINDINGS (SPECS)
    // ----------------------------------------------------
    // Safe localized elements parser supporting :contains queries
    function queryElements(selector) {
        const subSelectors = selector.split(',').map(s => s.trim());
        const results = [];
        
        for (const subSelector of subSelectors) {
            const match = subSelector.match(/:contains\((["'])(.*?)\1\)/);
            if (match) {
                const text = match[2];
                const baseSelector = subSelector.replace(match[0], '') || '*';
                const elements = Array.from(document.querySelectorAll(baseSelector));
                const filtered = elements.filter(el => el.textContent.includes(text));
                results.push(...filtered);
            } else {
                results.push(...Array.from(document.querySelectorAll(subSelector)));
            }
        }
        
        return Array.from(new Set(results));
    }

    // Helper to bind selectors to navigation
    function bindNav(selector, targetScreen, transition = 'push') {
        queryElements(selector).forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                if (targetScreen === 'screen-home' && currentScreen === 'screen-home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                navigateTo(targetScreen, transition);
                if (targetScreen === 'screen-home') {
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                    }, 460);
                }
            });
        });
    }

    function scrollToCustomOrderForm(behavior = 'smooth') {
        const customBuilder = document.getElementById('custom-builder-section');
        if (customBuilder) {
            const headerOffset = 96;
            const targetTop = customBuilder.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top: Math.max(0, targetTop), behavior });
        }
    }

    function openCustomOrderFlow() {
        if (currentScreen === 'screen-custom-orders') {
            window.resetCustomOrder?.();
            setTimeout(() => scrollToCustomOrderForm(), 80);
            setTimeout(() => scrollToCustomOrderForm('instant'), 650);
            return;
        }

        shouldFocusCustomOrder = true;
        navigateTo('screen-custom-orders', 'slide_up');
        setTimeout(() => {
            window.resetCustomOrder?.();
        }, 720);
        setTimeout(() => scrollToCustomOrderForm('instant'), 1100);
        setTimeout(() => scrollToCustomOrderForm('instant'), 1700);
    }

    // Bindings matching the Navigation Specification EXACTLY
    function initNavigationBindings() {
        document.addEventListener('click', (e) => {
            const logo = e.target.closest('[data-nav-logo]');
            if (!logo) return;

            e.preventDefault();
            e.stopImmediatePropagation();
            if (currentScreen === 'screen-home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                navigateTo('screen-home', 'push_back');
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }, 460);
            }
        }, true);

        document.addEventListener('click', (e) => {
            const customTrigger = e.target.closest('[data-navigate-custom-order]');
            if (!customTrigger) return;

            e.preventDefault();
            e.stopImmediatePropagation();
            openCustomOrderFlow();
        }, true);

        // Logo links go Home with push_back
        bindNav('[data-nav-logo], .nav-logo, header div.font-display-lg-mobile a, nav div.font-display-lg-mobile a, nav a:contains("BloomyCocoon")', 'screen-home', 'push_back');
        
        // Ensure manual binders for logos because exact selectors are nested
        document.querySelectorAll('a, div').forEach(el => {
            const text = el.innerText.trim();
            if (text === 'BloomyCocoon') {
                el.style.cursor = 'pointer';
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentScreen !== 'screen-home') {
                        navigateTo('screen-home', 'push_back');
                        setTimeout(() => {
                            window.scrollTo({ top: 0, behavior: 'instant' });
                        }, 460);
                    } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
            }
        });

        // Collection navigation
        bindNav('nav a[href*="collection"], nav a[href="#collection"], a:contains("Handmade Collection"), a:contains("Collection")', 'screen-collection', 'push');
        bindNav('button:contains("Explore Collection"), button:contains("View Collections"), a:contains("View All")', 'screen-collection', 'push');
        
        // Custom Orders navigation
        bindNav('nav a[href*="custom"], nav a[href="#custom"], a:contains("Custom Orders")', 'screen-custom-orders', 'push');
        bindNav('button:contains("Custom Orders"), button:contains("Start Your Custom Request"), button:contains("Start a Custom Order"), button:contains("Start Your Order")', 'screen-custom-orders', 'push');
        bindNav('button:contains("Order Custom"), button:contains("Start Custom Order")', 'screen-custom-orders', 'slide_up'); // Slide-up triggers
        queryElements('button:contains("Start a Custom Request")').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                openCustomOrderFlow();
            });
        });
        
        // About Us navigation
        bindNav('nav a[href*="about"], nav a[href="#about"], a:contains("About Us")', 'screen-about', 'push');

        // FAQ navigation
        bindNav('nav a[href*="faq"], nav a[href="#faq"], a:contains("FAQ")', 'screen-faq', 'push');

        // Contact Us navigation
        bindNav('nav a[href*="contact"], nav a[href="#contact"], a:contains("Contact Us")', 'screen-contact', 'push');
    }

    // ----------------------------------------------------
    // 4. INTERACTIVE SHOPPING BASKET
    // ----------------------------------------------------
    window.toggleCart = function() {
        const sideCart = document.getElementById('sideCart');
        if (sideCart) {
            sideCart.classList.toggle('cart-visible');
            document.querySelectorAll('[aria-controls="sideCart"]').forEach(btn => {
                btn.setAttribute('aria-expanded', sideCart.classList.contains('cart-visible') ? 'true' : 'false');
            });
            
            // Toggle WhatsApp button visibility based on cart state
            const whatsappFloat = document.getElementById('whatsapp-global-float');
            if (whatsappFloat) {
                if (sideCart.classList.contains('cart-visible')) {
                    whatsappFloat.classList.add('whatsapp-hidden');
                } else if (currentScreen !== 'screen-custom-orders') {
                    whatsappFloat.classList.remove('whatsapp-hidden');
                }
            }
        }
    };

    window.closeCart = function() {
        const sideCart = document.getElementById('sideCart');
        if (sideCart) {
            sideCart.classList.remove('cart-visible');
            document.querySelectorAll('[aria-controls="sideCart"]').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });
            
            // Show WhatsApp button when closing cart (unless on custom orders)
            const whatsappFloat = document.getElementById('whatsapp-global-float');
            if (whatsappFloat && currentScreen !== 'screen-custom-orders') {
                whatsappFloat.classList.remove('whatsapp-hidden');
            }
        }
    };

    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
            document.querySelectorAll('[aria-controls="mobile-menu"]').forEach(btn => {
                btn.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
            });
        }
    };

    // Auto-close mobile menu on any link click
    document.addEventListener('click', (e) => {
        if (e.target.closest('#mobile-menu a') || e.target.closest('nav a')) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
            document.querySelectorAll('[aria-controls="mobile-menu"]').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });
        }
    });

    window.addToCart = function(id, name, category, price, img) {
        if (arguments.length === 4) {
            img = price;
            price = category;
            category = 'handmade';
        }

        const parsedPrice = getSafePrice(price);
        const existing = cart.find(item => item.id === id);
        
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id, name, category, price: parsedPrice, img, qty: 1 });
        }
        
        renderCart();
        showToast(`Added "${name}" to your cart!`);
        trackEvent('add_to_cart', {
            item_id: id,
            item_name: name,
            item_category: category,
            value: parsedPrice,
            currency: 'INR'
        });
        
        // Automatically slide open the drawer
        const sideCart = document.getElementById('sideCart');
        if (sideCart && !sideCart.classList.contains('cart-visible')) {
            sideCart.classList.add('cart-visible');
            
            // Hide WhatsApp button while cart is open
            const whatsappFloat = document.getElementById('whatsapp-global-float');
            if (whatsappFloat) {
                whatsappFloat.classList.add('whatsapp-hidden');
            }
        }
    };

    window.updateQty = function(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }

        renderCart();
    };

    window.removeFromCart = function(id) {
        cart = cart.filter(i => i.id !== id);
        renderCart();
        showToast("Unravelled item from cart.");
    };

    function renderCart() {
        const cartContainers = document.querySelectorAll('.cart-items-container');
        const cartBadge = document.querySelectorAll('.cart-badge');
        const cartTotalText = document.querySelectorAll('.cart-total-price');
        const checkoutBtn = document.querySelectorAll('.checkout-btn');

        let totalQty = 0;

        cart.forEach(item => {
            totalQty += item.qty;
        });

        const subtotal = getCartSubtotal();

        // Update badge counters
        cartBadge.forEach(badge => {
            badge.innerText = totalQty;
            if (totalQty > 0) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });

        // Render subtotal texts
        cartTotalText.forEach(el => {
            el.innerText = totalQty > 0 ? `₹${formatPrice(subtotal)}` : 'Add items';
        });

        // Enable/Disable checkout button
        checkoutBtn.forEach(btn => {
            if (totalQty > 0) {
                btn.disabled = false;
                btn.classList.remove('opacity-55', 'cursor-default');
                btn.classList.add('hover:opacity-90');
            } else {
                btn.disabled = true;
                btn.classList.add('opacity-55', 'cursor-default');
                btn.classList.remove('hover:opacity-90');
            }
        });

        // HTML list rendering
        cartContainers.forEach(container => {
            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-xl opacity-60 flex flex-col items-center">
                        <span class="material-symbols-outlined text-display-lg block mb-sm">shopping_basket</span>
                        <p class="font-label-md">Your basket is empty</p>
                    </div>
                `;
            } else {
                let html = '<div class="space-y-md pr-2 max-h-[60vh] overflow-y-auto">';
                cart.forEach(item => {
                    const categoryLabel = getCategoryLabel(item.category);
                    html += `
                        <div class="flex items-center gap-4 bg-surface-container-lowest p-sm rounded-xl border border-outline-variant/15 soft-glow">
                            <img src="${escapeHTML(item.img)}" alt="${escapeHTML(item.name)}" class="w-14 h-14 object-cover rounded-lg">
                            <div class="flex-1">
                                <h4 class="font-label-md text-sm text-secondary truncate">${escapeHTML(item.name)}</h4>
                                <p class="text-caption text-on-surface-variant">${escapeHTML(categoryLabel)}</p>
                                <p class="text-caption text-on-surface-variant font-bold">Starting from ${formatStartingPrice(item.price)}</p>
                                <div class="flex items-center gap-2 mt-xs">
                                    <button onclick="updateQty('${item.id}', -1)" aria-label="Decrease ${escapeHTML(item.name)} quantity" class="w-6 h-6 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-xs hover:bg-secondary-container transition-colors">-</button>
                                    <span class="font-body-md text-xs font-bold px-1">${item.qty}</span>
                                    <button onclick="updateQty('${item.id}', 1)" aria-label="Increase ${escapeHTML(item.name)} quantity" class="w-6 h-6 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-xs hover:bg-secondary-container transition-colors">+</button>
                                </div>
                            </div>
                            <button onclick="removeFromCart('${item.id}')" aria-label="Remove ${escapeHTML(item.name)} from cart" class="text-outline-variant hover:text-error transition-colors p-1">
                                <span class="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                        </div>
                    `;
                });
                html += '</div>';
                container.innerHTML = html;
            }
        });
    }

    // ----------------------------------------------------
    // 5. CUSTOM ORDERS STEP BUILDER
    // ----------------------------------------------------
    window.selectOrderType = function(type) {
        orderData.type = type;
        
        // Update styling of pills
        document.querySelectorAll('.type-pill').forEach(pill => {
            if (pill.innerText.trim().includes(type)) {
                pill.classList.add('bg-secondary', 'text-on-secondary');
                pill.classList.remove('bg-primary-container', 'text-on-primary-container');
            } else {
                pill.classList.remove('bg-secondary', 'text-on-secondary');
                pill.classList.add('bg-primary-container', 'text-on-primary-container');
            }
        });

        updateLivePreview();
    };

    window.nextOrderStep = function() {
        if (orderStep === 2) {
            // Validate step 2 notes
            const notesVal = document.getElementById('custom-notes').value.trim();
            orderData.notes = notesVal;
        }

        if (orderStep < 3) {
            document.getElementById(`step-card-${orderStep}`).classList.add('hidden');
            orderStep++;
            document.getElementById(`step-card-${orderStep}`).classList.remove('hidden');
            
            updateStepIndicatorUI();
            updateLivePreview();
        }
    };

    window.prevOrderStep = function() {
        if (orderStep > 1) {
            document.getElementById(`step-card-${orderStep}`).classList.add('hidden');
            orderStep--;
            document.getElementById(`step-card-${orderStep}`).classList.remove('hidden');
            
            updateStepIndicatorUI();
            updateLivePreview();
        }
    };

    function updateStepIndicatorUI() {
        document.querySelectorAll('.step-dot').forEach((dot, index) => {
            const stepNum = index + 1;
            dot.className = "step-dot w-8 h-8 rounded-full flex items-center justify-center font-label-md text-sm transition-all duration-300 ";
            
            if (stepNum === orderStep) {
                dot.classList.add('bg-secondary', 'text-on-secondary', 'scale-110');
            } else if (stepNum < orderStep) {
                dot.classList.add('bg-tertiary', 'text-on-tertiary');
            } else {
                dot.classList.add('bg-primary-container', 'text-on-primary-container');
            }
        });
    }

    function updateLivePreview() {
        const previewType = document.getElementById('preview-type');
        const previewNotes = document.getElementById('preview-notes');
        const previewImage = document.getElementById('preview-image');

        if (previewType) previewType.innerText = orderData.type;
        
        if (previewNotes) {
            const notesInput = document.getElementById('custom-notes');
            const noteText = notesInput ? notesInput.value.trim() : "";
            previewNotes.innerText = noteText || "None specified yet.";
        }

        // Dynamically rotate standard visual reference images based on palette/types to feel extremely alive
        const sampleImages = {
            'Bouquet': 'images/crochet_rose_bouquet.png',
            'Plushie': 'images/cozy_bear_plushie.png',
            'Keychain': 'images/crochet_flower_keychain.png',
            'Coaster Set': 'images/doily_table_decor.png',
            'Accessory': 'images/crochet_bag_charm.png',
            'Other': 'images/crochet_wall_hanging.png'
        };

        if (previewImage) {
            previewImage.src = sampleImages[orderData.type] || sampleImages['Other'];
        }
    }

    // Submit Custom Order
    window.submitCustomRequest = function(event) {
        event.preventDefault();
        
        const nameVal = document.getElementById('order-name').value.trim();

        if (!nameVal) {
            showToast("Please fill in your Name.");
            return;
        }

        orderData.name = nameVal;
        orderData.notes = document.getElementById('custom-notes').value.trim();

        // Perform final animation submit
        const stepCard = document.getElementById(`step-card-${orderStep}`);
        const successCard = document.getElementById('custom-order-success');
        
        if (stepCard && successCard) {
            stepCard.classList.add('hidden');
            successCard.classList.remove('hidden');
            
            // Re-render final custom details
            document.getElementById('final-type').innerText = orderData.type;
            
            showToast("✨ Custom order request submitted!");
            
            let message = "Hello BloomyCocoon! 🌸 I would like to place a custom crochet order.\n\n";
            message += `Customer name: ${orderData.name}\n`;
            message += `Base type: ${orderData.type}\n`;
            message += `Personalization notes: ${orderData.notes || "None specified yet."}\n`;
            message += "Source: Custom Order Page\n\n";
            message += "Please help me finalize the design, starting price, timeline and delivery.";

            trackEvent('custom_order_submit', {
                order_type: orderData.type
            });

            showToast("Opening WhatsApp with your custom request...");
            setTimeout(() => {
                openWhatsAppMessage(message);
            }, 600);
        }
    };

    window.resetCustomOrder = function() {
        orderStep = 1;
        document.getElementById('custom-order-success').classList.add('hidden');
        document.getElementById('step-card-1').classList.remove('hidden');
        
        // Reset values
        document.getElementById('custom-notes').value = '';
        document.getElementById('order-name').value = '';
        
        orderData.type = 'Bouquet';
        orderData.notes = '';
        orderData.name = '';
        
        selectOrderType('Bouquet');
        updateStepIndicatorUI();
        updateLivePreview();
    };

    // ----------------------------------------------------
    // 6. COLLECTION CATEGORY PILLS FILTERING
    // ----------------------------------------------------
    const categoryToggleBaseClass = "w-10 h-10 shrink-0 rounded-full bg-primary-container text-secondary flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors";
    const categoryToggleActiveClass = "w-10 h-10 shrink-0 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-sm transition-colors";
    const categoryButtonBaseClass = "whitespace-nowrap px-6 py-2 rounded-full hover:bg-secondary/10 transition-colors font-label-md bg-primary-container text-on-primary-container";
    const categoryButtonActiveClass = "whitespace-nowrap px-6 py-2 rounded-full font-label-md bg-secondary text-on-secondary shadow-sm";

    function getCollectionFilterRoot(sourceEl) {
        return (sourceEl && sourceEl.closest('[data-collection-filters]')) || document.querySelector('#screen-collection [data-collection-filters]');
    }

    function setCollectionCategoryListOpen(root, isOpen) {
        if (!root) return;
        const list = root.querySelector('[data-category-filter-list]');
        const toggle = root.querySelector('[data-category-filter-toggle]');
        if (list) {
            list.dataset.open = isOpen ? 'true' : 'false';
            list.style.maxWidth = isOpen ? `${list.scrollWidth}px` : '0px';
            list.style.opacity = isOpen ? '1' : '0';
            list.style.transform = isOpen ? 'translateX(0)' : 'translateX(-12px)';
            list.style.pointerEvents = isOpen ? 'auto' : 'none';
        }
        if (toggle) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggle.title = isOpen ? 'Hide categories' : 'Show categories';
        }
    }

    window.showAllCollectionCategories = function(buttonEl) {
        const root = getCollectionFilterRoot(buttonEl);
        const list = root ? root.querySelector('[data-category-filter-list]') : null;
        const shouldOpen = !list || list.dataset.open !== 'true';
        setCollectionCategoryListOpen(root, shouldOpen);
        filterCollectionCategory('all', buttonEl);
    };

    function updateCategoryDescription(category) {
        const copyEl = document.getElementById('collection-category-copy');
        if (!copyEl) return;
        const activeCategory = legacyFilterMap[category] || category || 'all';
        copyEl.textContent = categoryDescriptions[activeCategory] || categoryDescriptions.all;
    }

    window.filterCollectionCategory = function(category, buttonEl) {
        const activeCategory = legacyFilterMap[category] || category;
        updateCategoryDescription(activeCategory);
        trackEvent('category_filter_click', { category: activeCategory });
        const root = getCollectionFilterRoot(buttonEl);
        if (buttonEl && root) {
            root.querySelectorAll('button[data-category-filter]').forEach(btn => {
                btn.className = categoryButtonBaseClass;
            });
            const toggle = root.querySelector('[data-category-filter-toggle]');
            if (toggle) {
                toggle.className = activeCategory === 'all' ? categoryToggleActiveClass : categoryToggleBaseClass;
            }
            if (buttonEl.matches('[data-category-filter]')) {
                buttonEl.className = categoryButtonActiveClass;
                setCollectionCategoryListOpen(root, true);
            }
        }

        const productGrid = document.querySelector('#collection-product-grid');
        if (!productGrid) return;

        productGrid.querySelectorAll('.product-card').forEach(card => {
            const filterCategories = (card.getAttribute('data-filter-categories') || card.getAttribute('data-category') || '').split(/\s+/);
            if (activeCategory === 'all' || filterCategories.includes(activeCategory)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    };

    // ----------------------------------------------------
    // 7. TOAST MESSENGER AND MICRO-INTERACTIONS
    // ----------------------------------------------------
    window.showToast = function(msg) {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = msg;
        container.appendChild(toast);

        // Force layout repaint
        toast.offsetHeight;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3200);
    };

    // Form Submissions animations
    window.submitContactForm = function(event) {
        event.preventDefault();
        
        const form = event.target;
        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const msg = form.querySelector('textarea').value.trim();

        if (!name || !email || !msg) {
            showToast("Please fill in all the message fields.");
            return;
        }

        let message = "Hello BloomyCocoon! 🌸 I would like to contact you about a crochet gift enquiry.\n\n";
        message += `Customer name: ${name}\n`;
        message += `Email: ${email}\n`;
        message += `Message: ${msg}\n`;
        message += "Source: Contact Page";

        trackEvent('contact_whatsapp_click');
        openWhatsAppMessage(message);

        // Success animation
        form.innerHTML = `
            <div class="text-center py-xl space-y-md bg-primary-container rounded-3xl p-md soft-glow border border-outline-variant/10 animate-push-enter">
                <div class="w-16 h-16 bg-tertiary text-on-tertiary rounded-full flex items-center justify-center mx-auto mb-sm">
                    <span class="material-symbols-outlined text-3xl">done</span>
                </div>
                <h3 class="font-headline-sm text-headline-sm text-secondary">Your message is stitched!</h3>
                <p class="text-on-surface-variant max-w-sm mx-auto leading-relaxed">Thank you, ${name}. We've received your request and our weavers will get back to you within 24-48 hours.</p>
                <button onclick="location.reload()" class="bg-secondary text-on-secondary px-8 py-3 rounded-full font-label-md text-sm mt-md">Write Another Message</button>
            </div>
        `;
        showToast("Opening WhatsApp with your message.");
    };

    function hydrateExternalConversionLinks() {
        document.querySelectorAll('a[data-whatsapp-message]').forEach(link => {
            const message = link.getAttribute('data-whatsapp-message');
            if (message) {
                link.href = buildWhatsAppUrl(message);
            }
            if (link.dataset.analyticsBound === 'true') return;
            link.dataset.analyticsBound = 'true';
            link.addEventListener('click', () => {
                trackEvent('contact_whatsapp_click');
            });
        });

        document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
            if (link.dataset.analyticsBound === 'true') return;
            link.dataset.analyticsBound = 'true';
            link.addEventListener('click', () => {
                trackEvent('instagram_click');
            });
        });
    }

    // FAQ dynamic listener
    document.querySelectorAll('.faq-details').forEach(el => {
        el.addEventListener('toggle', function() {
            if (this.open) {
                // Close other open tabs in the same list to be smooth and tidy
                const siblings = this.parentElement.querySelectorAll('.faq-details');
                siblings.forEach(s => {
                    if (s !== this && s.open) s.open = false;
                });
            }
        });
    });

    
    function applyCollectionFilterFromUrl() {
        const hash = window.location.hash || '';
        const match = hash.match(/category=([^&]+)/);
        if (!match) return;
        const category = decodeURIComponent(match[1]);
        const activeCategory = legacyFilterMap[category] || category;
        const btn = document.querySelector(`#screen-collection button[data-category-filter="${activeCategory}"]`);
        const toggle = document.querySelector('#screen-collection [data-category-filter-toggle]');
        if (btn) {
            setCollectionCategoryListOpen(getCollectionFilterRoot(btn), true);
            filterCollectionCategory(activeCategory, btn);
        } else if (toggle) {
            filterCollectionCategory('all', toggle);
        }
    }

    // ----------------------------------------------------
    // 8. BOOTSTRAP INITIALIZATION
    // ----------------------------------------------------
    
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&#039;');
    }

    function getProductImage(product) {
        return product.image || categoryFallbackImages[product.category] || categoryFallbackImages.default;
    }

    function getProductCategoryIds(product) {
        return [product.category, ...(product.filterCategories || [])];
    }

    function getCategoryLabel(catId) {
        const cat = collectionCategories.find(c => c.id === catId);
        return cat ? cat.label : "Handmade";
    }

    function getProductAltText(product) {
        const categoryAlt = {
            "bouquets": "Handmade crochet bouquet for gifting in Kerala",
            "plushies": "Crochet plushie handmade gift by BloomyCocoon",
            "keychains": "Handmade crochet keychain for small gifts in India",
            "baby-gifts": "Baby crochet gift handmade in Kerala",
            "accessories": "Handmade crochet accessory by BloomyCocoon",
            "home-decor": "Crochet home decor piece by BloomyCocoon",
            "gift-combos": "Handmade crochet gift combo for birthdays and anniversaries"
        };
        return `${product.name} - ${categoryAlt[product.category] || 'Handmade crochet gift by BloomyCocoon'}`;
    }

    function formatPrice(price) {
        return getSafePrice(price).toLocaleString('en-IN');
    }

    function formatStartingPrice(price) {
        const safePrice = getSafePrice(price);
        return safePrice > 0 ? `₹${formatPrice(safePrice)}` : 'Confirm on WhatsApp';
    }

    function getProductCardMarkup(product) {
        const image = getProductImage(product);
        const fallbackImage = categoryFallbackImages[product.category] || categoryFallbackImages.default;
        const badgeMarkup = product.badge ? `<span class="bg-[#fbd8d0] text-[#775d56] px-3 py-1 rounded-full font-label-md text-xs">${escapeHTML(product.badge)}</span>` : '';
        const filterCategories = getProductCategoryIds(product).join(' ');
        const categoryLabel = getCategoryLabel(product.category);
        const productAlt = getProductAltText(product);

        if (product.featured) {
            const tagMarkup = product.tag ? `<span class="bg-[#A8B5A2] text-white px-4 py-1 rounded-full font-label-md text-sm">${escapeHTML(product.tag)}</span>` : '';
            return `
                <article data-product-id="${product.id}" data-category="${product.category}" data-filter-categories="${filterCategories}" class="col-span-2 md:col-span-8 group product-card relative overflow-hidden bg-primary-container rounded-xl soft-glow transition-all duration-500">
                    <div class="relative h-[260px] md:h-[420px] overflow-hidden">
                        <img alt="${escapeHTML(productAlt)}" class="product-image w-full h-full object-cover transition-transform duration-700 ease-out" src="${escapeHTML(image)}" data-fallback-src="${escapeHTML(fallbackImage)}" loading="lazy" width="800" height="500">
                        <div class="absolute top-md right-md flex flex-col gap-2 items-end">
                            ${product.badge ? `<span class="bg-secondary text-on-secondary px-4 py-1 rounded-full font-label-md text-sm uppercase tracking-wider">${escapeHTML(product.badge)}</span>` : ''}
                            ${tagMarkup}
                        </div>
                    </div>
                    <div class="p-6 md:p-lg">
                        <div class="flex justify-between items-end flex-wrap gap-4">
                            <div class="max-w-xl">
                                <span class="text-caption text-on-surface-variant font-label-md uppercase tracking-wide">${escapeHTML(categoryLabel)}</span>
                                <h3 class="font-headline-md text-2xl md:text-headline-md text-secondary mb-xs">${escapeHTML(product.name)}</h3>
                                <p class="font-body-md text-on-surface-variant">${escapeHTML(product.description)}</p>
                            </div>
                            <div class="text-right">
                                <span class="font-headline-sm text-secondary block font-bold">Starting from ${formatStartingPrice(product.startingPrice)}</span>
                                <button data-add-to-cart="${product.id}" aria-label="Add ${escapeHTML(product.name)} to cart" class="mt-base flex items-center gap-xs text-secondary font-label-md group/btn bg-white/70 hover:bg-secondary hover:text-white px-4 py-2 rounded-full transition-colors border border-secondary shadow-sm">
                                    Add to Cart <span class="material-symbols-outlined" data-icon="add">add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }

        return `
            <article data-product-id="${product.id}" data-category="${product.category}" data-filter-categories="${filterCategories}" class="col-span-1 md:col-span-4 group product-card bg-surface-container-low rounded-xl soft-glow transition-all duration-500">
                <div class="relative h-[180px] md:h-[260px] overflow-hidden rounded-t-xl bg-surface-container">
                    <img alt="${escapeHTML(productAlt)}" class="product-image w-full h-full object-cover transition-transform duration-700 ease-out" src="${escapeHTML(image)}" data-fallback-src="${escapeHTML(fallbackImage)}" loading="lazy" width="400" height="500">
                    <div class="absolute top-base left-base">
                        ${badgeMarkup}
                    </div>
                </div>
                <div class="p-md">
                    <span class="text-caption text-on-surface-variant font-label-md uppercase tracking-wide">${escapeHTML(categoryLabel)}</span>
                    <h3 class="font-headline-sm text-headline-sm text-secondary mb-xs">${escapeHTML(product.name)}</h3>
                    <p class="product-card-description text-caption text-on-surface-variant mb-sm">${escapeHTML(product.description)}</p>
                    <div class="flex justify-between items-center gap-sm">
                        <span class="font-body-md text-on-surface-variant font-bold">Starting from ${formatStartingPrice(product.startingPrice)}</span>
                        <button data-add-to-cart="${product.id}" aria-label="Add ${escapeHTML(product.name)} to cart" class="w-10 h-10 shrink-0 rounded-full border border-secondary flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors">
                            <span class="material-symbols-outlined text-[20px]" data-icon="add">add</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    function renderCollectionProducts() {
        const productGrid = document.querySelector('#collection-product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = collectionProducts.map(getProductCardMarkup).join('');
        applyImageFallbacks(productGrid);
        setupProductCardAddToCartTriggers();
        updateCategoryDescription('all');
        applyCollectionFilterFromUrl();
    }

    function setupProductCardAddToCartTriggers() {
        document.querySelectorAll('[data-add-to-cart]').forEach(addBtn => {
            if (addBtn.dataset.cartBound === 'true') return;

            const product = collectionProducts.find(item => item.id === addBtn.dataset.addToCart);
            if (!product) return;

            addBtn.dataset.cartBound = 'true';
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(product.id, product.name, product.category, product.startingPrice, getProductImage(product));
            });
        });
    }

    function applyImageFallbacks(root = document) {
        root.querySelectorAll('img[data-fallback-src]').forEach(img => {
            img.addEventListener('error', () => {
                if (img.dataset.fallbackApplied === 'true') return;
                img.dataset.fallbackApplied = 'true';
                img.src = img.dataset.fallbackSrc || categoryFallbackImages.default;
            }, { once: true });
        });
    }

    function syncDynamicStructuredData() {
        const existing = document.getElementById('catalog-faq-schema');
        if (existing) existing.remove();

        const productList = collectionProducts.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "@id": `${CANONICAL_URL}#/collection/${product.id}`,
                "name": product.name,
                "description": product.description,
                "category": getCategoryLabel(product.category),
                "image": `${CANONICAL_URL}${getProductImage(product)}`,
                "brand": {
                    "@id": `${CANONICAL_URL}#organization`
                },
                "offers": {
                    "@type": "Offer",
                    "url": `${CANONICAL_URL}#/collection`,
                    "priceCurrency": "INR",
                    "price": getSafePrice(product.startingPrice),
                    "availability": "https://schema.org/InStock"
                }
            }
        }));

        const faqItems = Array.from(document.querySelectorAll('#screen-faq .faq-details')).map(details => {
            const question = details.querySelector('summary span')?.textContent.trim();
            const answer = details.querySelector('p')?.textContent.trim();
            if (!question || !answer) return null;
            return {
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer
                }
            };
        }).filter(Boolean);

        const graph = [
            {
                "@type": "ItemList",
                "@id": `${CANONICAL_URL}#/collection#products`,
                "name": "BloomyCocoon handmade crochet collection",
                "itemListElement": productList
            }
        ];

        if (faqItems.length > 0) {
            graph.push({
                "@type": "FAQPage",
                "@id": `${CANONICAL_URL}#/faq#faq`,
                "mainEntity": faqItems
            });
        }

        const script = document.createElement('script');
        script.id = 'catalog-faq-schema';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph
        });
        document.head.appendChild(script);
    }

    // ----------------------------------------------------
    initNavigationBindings();
    hydrateExternalConversionLinks();
    setupProductCardAddToCartTriggers();
    applyCollectionFilterFromUrl();
    
    // Setup dynamic live listener on step-3 notes
    const notesInput = document.getElementById('custom-notes');
    if (notesInput) {
        notesInput.addEventListener('input', updateLivePreview);
    }

    // Setup click listener for checkout button to proceed to WhatsApp
    document.querySelectorAll('.checkout-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                showToast("Please add at least one item before continuing to WhatsApp.");
                return;
            }

            trackEvent('whatsapp_checkout_click', {
                value: getCartSubtotal(),
                currency: 'INR',
                item_count: cart.reduce((sum, item) => sum + item.qty, 0)
            });
            openWhatsAppMessage(buildCartWhatsAppMessage());
        });
    });

    renderCollectionProducts();
    syncDynamicStructuredData();
});
