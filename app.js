import {
    ROUTE_CONTENT,
    ROUTE_SCHEMA_ID,
    SITE_ORIGIN,
    getRouteSchemaGraph
} from './src/route-content.mjs';

/* BloomyCocoon Main Application Controller */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. STATE MANAGEMENT
    // ----------------------------------------------------
    // ----------------------------------------------------
    // 1. STATE MANAGEMENT & SPA ROUTING
    // ----------------------------------------------------
    const activeScreenElement = document.querySelector('section.screen.active');
    let currentScreen = activeScreenElement ? activeScreenElement.id : 'screen-home';
    const screenHistory = [currentScreen];
    let inTransition = false;
    let isRoutingFromHistory = false;
    let shouldFocusCustomOrder = false;

    const WHATSAPP_NUMBER = "919061174579";

    // Cart state
    let cart = [];
    let sharedCartNote = '';

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
    const responsiveImageWidths = [320, 480, 640];
    const staticResponsiveImagePaths = [
        "images/about_process.png",
        "images/yarn_storage.png",
        "images/contact_workspace.png"
    ];
    let responsiveImagePathsCache = null;

    function getResponsiveImagePathsSet() {
        if (responsiveImagePathsCache) return responsiveImagePathsCache;
        const paths = new Set();
        const addNormalizedPath = (p) => {
            if (!p) return;
            const clean = String(p).replace(/^\//, '').replace(/\.(png|webp)$/i, '');
            if (clean) paths.add(clean);
        };
        staticResponsiveImagePaths.forEach(addNormalizedPath);
        Object.values(categoryFallbackImages).forEach(addNormalizedPath);
        collectionProducts.forEach((p) => addNormalizedPath(p.image));
        responsiveImagePathsCache = paths;
        return paths;
    }
    const collectionProducts = [
  {
    "id": "single-crochet-rose",
    "name": "Single Crochet Rose",
    "category": "bouquets",
    "startingPrice": 149,
    "image": "images/crochet_rose_bouquet_single-crochet-rose-landscape-generated.png",
    "badge": "Single Stem",
    "description": "Best for tiny gestures, student gifts and note-card add-ons, with colors confirmed on WhatsApp."
  },
  {
    "id": "single-crochet-tulip",
    "name": "Single Crochet Tulip",
    "category": "bouquets",
    "startingPrice": 169,
    "image": "images/crochet_tulip_bouquet_single-crochet-tulip-landscape-generated.png",
    "badge": "Fresh Pick",
    "description": "A cheerful single stem for birthdays, desk corners and surprises, with shade choices confirmed on WhatsApp."
  },
  {
    "id": "single-sunflower-stem",
    "name": "Single Sunflower Stem",
    "category": "bouquets",
    "startingPrice": 199,
    "image": "images/crochet_sunflower_bouquet_single-sunflower-stem-generated.png",
    "badge": "Sunny",
    "description": "A sunny long-lasting flower for desk corners, jars and small surprise gifts."
  },
  {
    "id": "rose-bouquet",
    "name": "Rose Bouquet",
    "category": "bouquets",
    "startingPrice": 799,
    "image": "images/crochet_rose_bouquet_rose-bouquet.png",
    "badge": "Made with Love",
    "description": "Best for anniversaries, couple gifts and soft surprises, with colors and wrapping confirmed on WhatsApp."
  },
  {
    "id": "tulip-bouquet",
    "name": "Tulip Bouquet",
    "category": "bouquets",
    "startingPrice": 899,
    "image": "images/crochet_tulip_bouquet_tulip-bouquet.png",
    "badge": "New Arrival",
    "description": "A graceful long-lasting bouquet for birthdays, thank-you gifts and gentle celebrations."
  },
  {
    "id": "lavender-bouquet",
    "name": "Lavender Bouquet",
    "category": "bouquets",
    "startingPrice": 799,
    "image": "images/crochet_lavender_bouquet_lavender-bouquet.png",
    "badge": "Kept Favorite",
    "description": "A calming lavender bouquet for keepsake gifting, cozy decor and soft handmade surprises."
  },
  {
    "id": "custom-premium-bouquet",
    "name": "Custom Premium Bouquet",
    "category": "bouquets",
    "startingPrice": 1499,
    "image": "images/mixed_luxury_bouquet_custom-premium-bouquet.png",
    "badge": "Custom",
    "featured": true,
    "description": "A premium custom bouquet tailored by flower type, palette, size and packaging, with final quote confirmed on WhatsApp."
  },
  {
    "id": "mini-teddy-plushie",
    "name": "Mini Teddy Plushie",
    "category": "plushies",
    "startingPrice": 399,
    "image": "images/cozy_bear_plushie_mini-teddy-plushie.png",
    "badge": "Tiny Hug",
    "description": "Best for cute birthday gifts, student desks and tiny keepsakes, with colors confirmed on WhatsApp."
  },
  {
    "id": "bunny-plushie",
    "name": "Bunny Plushie",
    "category": "plushies",
    "startingPrice": 499,
    "image": "images/crochet_bunny_plush_bunny-plushie.png",
    "badge": "Gift Favorite",
    "description": "A gentle bunny plushie for birthdays, baby gifting and keepsakes, with shade details confirmed on WhatsApp."
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
    "description": "A made-to-order animal plushie inspired by your idea, with size, colors and final quote confirmed on WhatsApp."
  },
  {
    "id": "mini-pocket-plushies",
    "name": "Mini Pocket Plushies",
    "category": "plushies",
    "startingPrice": 299,
    "image": "images/cozy_bear_plushie_mini-pocket-plushies-generated.png",
    "badge": "Kept Favorite",
    "description": "Small pocket plushies for tiny gifting, students, desk friends and surprise add-ons."
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
    "description": "A cheerful crochet flower charm stitched from soft handmade yarn for bags, keys and small gifts. Pick your preferred yarn shade on WhatsApp to match a favorite color or gift hamper."
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
    "description": "A tiny handmade teddy keychain finished in soft yarn for everyday keys, backpacks and sweet surprise gifting. Custom yarn color choices can be confirmed directly on WhatsApp before crafting."
  },
  {
    "id": "bunny-keychain",
    "name": "Bunny Keychain",
    "category": "keychains",
    "startingPrice": 249,
    "image": "images/mini_animal_keychain_bunny-keychain-generated.png",
    "description": "A handcrafted bunny keychain featuring petite ears and a cozy yarn texture for backpacks, keys and thoughtful gift add-ons. Share your favorite shade on WhatsApp to personalize the finish."
  },
  {
    "id": "cat-keychain",
    "name": "Cat Keychain",
    "category": "keychains",
    "startingPrice": 249,
    "image": "images/mini_animal_keychain_cat-keychain-generated.png",
    "description": "A cute handmade cat keychain stitched in soft yarn for daily bags, keys and curated gift boxes. Customize the yarn shades on WhatsApp to create a sweet keepsake for friends or students."
  },
  {
    "id": "duck-keychain",
    "name": "Duck Keychain",
    "category": "keychains",
    "startingPrice": 249,
    "image": "images/mini_animal_keychain_duck-keychain-generated.png",
    "description": "A cheerful crochet duck keychain bringing playful handmade charm to keys, pouches and small gifting moments. Confirm your preferred yarn colors on WhatsApp before stitching begins."
  },
  {
    "id": "initial-letter-keychain",
    "name": "Initial Letter Keychain",
    "category": "keychains",
    "startingPrice": 199,
    "image": "images/heart_keychain_initial-letter-keychain-generated.png",
    "badge": "Personalized",
    "description": "A custom initial keychain for names, students, couples and handmade gift hampers."
  },
  {
    "id": "couple-keychain-set",
    "name": "Couple Keychain Set",
    "category": "keychains",
    "startingPrice": 399,
    "image": "images/crochet_couple_keychains.png",
    "description": "A coordinated pair for couple gifts, friendship surprises and anniversary add-ons."
  },
  {
    "id": "custom-character-keychain",
    "name": "Custom Character Keychain",
    "category": "keychains",
    "startingPrice": 349,
    "image": "images/mini_animal_keychain_custom-character-keychain-generated.png",
    "badge": "Custom",
    "description": "A character-inspired charm based on your idea or theme, with final details confirmed on WhatsApp."
  },
  {
    "id": "strawberry-keychain",
    "name": "Strawberry Keychain",
    "category": "keychains",
    "startingPrice": 199,
    "image": "images/strawberry_keychain_strawberry-keychain.png",
    "badge": "Kept Favorite",
    "description": "A fruity strawberry charm for bags, keys, student gifts and playful handmade surprises."
  },
  {
    "id": "baby-booties",
    "name": "Baby Booties",
    "category": "baby-gifts",
    "startingPrice": 399,
    "image": "images/crochet_bunny_plush_baby-booties-generated.png",
    "description": "Soft crochet booties for newborn gifting and baby showers, with gentle shades confirmed on WhatsApp."
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
    "description": "A custom name garland for nurseries, baby showers and keepsake corners, with final quote confirmed on WhatsApp."
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
    "description": "A curated mini baby set for shower tables, hampers and family gifting."
  },
  {
    "id": "newborn-gift-hamper",
    "name": "Newborn Gift Hamper",
    "category": "baby-gifts",
    "startingPrice": 1999,
    "image": "images/hero_crochet_scene_newborn-gift-hamper-generated.png",
    "badge": "Hamper",
    "featured": true,
    "description": "A larger newborn hamper with baby pieces, plush details and packaging, finalized personally on WhatsApp."
  },
  {
    "id": "crochet-bow-clip",
    "name": "Crochet Bow Clip",
    "category": "accessories",
    "startingPrice": 149,
    "image": "images/crochet_headband_crochet-bow-clip-generated.png",
    "description": "A sweet bow clip for soft everyday styling, return gifts and custom shade requests."
  },
  {
    "id": "crochet-scrunchie",
    "name": "Crochet Scrunchie",
    "category": "accessories",
    "startingPrice": 149,
    "image": "images/crochet_scrunchies_crochet-scrunchie.png",
    "badge": "Cozy Soft",
    "description": "A cozy crochet scrunchie crafted from soft yarn for gentle everyday hair styling and thoughtful return gifts. Choose soothing pastel or bold yarn shades on WhatsApp to match your wardrobe or hamper."
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
    "description": "A lightweight handmade crochet bracelet stitched in soft yarn for relaxed everyday wear and friendship gifting. Pick your preferred yarn colors and simple pairing ideas on WhatsApp."
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
    "description": "A petite crochet phone charm crafted from soft handmade yarn for personal daily styling and cute gift add-ons. Select your favorite shade combination on WhatsApp before making starts."
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
    "description": "A protective crochet phone sleeve for daily use, soft styling and handmade gifting."
  },
  {
    "id": "crochet-tote-bag",
    "name": "Crochet Tote Bag",
    "category": "accessories",
    "startingPrice": 799,
    "image": "images/crochet_tote_bag_crochet-tote-bag.png",
    "badge": "Kept Favorite",
    "featured": true,
    "description": "A roomy handmade tote for everyday styling, gifting and custom color requests."
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
    "description": "A soft handmade crochet hanging charm designed to brighten car mirrors, windows and thoughtful gift surprises. Personalize your yarn palette on WhatsApp to craft a warm keepsake piece."
  },
  {
    "id": "crochet-garland",
    "name": "Crochet Garland",
    "category": "home-decor",
    "startingPrice": 799,
    "image": "images/crochet_wall_hanging_crochet-garland-generated.png",
    "description": "A handmade garland for rooms, celebrations, nursery corners and gentle festive decor."
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
    "description": "A personalized crochet name decor piece for rooms, doors, baby gifting and keepsakes."
  },
  {
    "id": "crochet-cushion-cover",
    "name": "Crochet Cushion Cover",
    "category": "home-decor",
    "startingPrice": 699,
    "image": "images/crochet_cushion_cover_crochet-cushion-cover.png",
    "badge": "Kept Favorite",
    "description": "A cozy cushion cover for warm corners, housewarming gifts and soft home decor."
  },
  {
    "id": "crochet-plant-holder",
    "name": "Crochet Plant Holder",
    "category": "home-decor",
    "startingPrice": 499,
    "image": "images/crochet_plant_holder_crochet-plant-holder.png",
    "badge": "Kept Favorite",
    "description": "A cozy plant holder for shelves, windows and handmade home decor gifts."
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
    "description": "A small gift pairing for students, friends and surprise notes, with colors confirmed on WhatsApp."
  },
  {
    "id": "mini-bouquet-note-card",
    "name": "Mini Bouquet + Note Card",
    "category": "gift-combos",
    "startingPrice": 499,
    "image": "images/crochet_rose_bouquet_mini-bouquet-note-card.png",
    "description": "A mini bouquet with a note card, best for birthdays, apologies and sweet surprise gifts."
  },
  {
    "id": "plushie-flower-combo",
    "name": "Plushie + Flower Combo",
    "category": "gift-combos",
    "startingPrice": 799,
    "image": "images/crochet_plushie_flower_combo.png",
    "description": "A cozy plushie paired with a handmade flower for birthdays, couple gifts and warm occasions."
  },
  {
    "id": "birthday-mini-gift-box",
    "name": "Birthday Mini Gift Box",
    "category": "gift-combos",
    "startingPrice": 999,
    "image": "images/crochet_birthday_gift_box.png",
    "badge": "Birthday",
    "description": "A birthday-ready crochet gift box with soft add-ons, packaging and final details confirmed on WhatsApp."
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
    "description": "A romantic combo for anniversaries, couple surprises and long-lasting bouquet gifts."
  },
  {
    "id": "baby-gift-combo",
    "name": "Baby Gift Combo",
    "category": "gift-combos",
    "startingPrice": 1499,
    "image": "images/crochet_bunny_plush_baby-gift-combo.png",
    "description": "A sweet baby gift combo with plush, accessory or nursery elements, finalized through WhatsApp."
  },
  {
    "id": "anniversary-gift-box",
    "name": "Anniversary Gift Box",
    "category": "gift-combos",
    "startingPrice": 1499,
    "image": "images/mixed_luxury_bouquet_anniversary-gift-box-generated.png",
    "badge": "Anniversary",
    "description": "An anniversary box with crochet keepsakes, flowers and gift-ready packaging."
  },
  {
    "id": "custom-crochet-hamper",
    "name": "Custom Crochet Hamper",
    "category": "gift-combos",
    "startingPrice": 1999,
    "image": "images/hero_crochet_scene_custom-crochet-hamper-generated.png",
    "badge": "Custom Hamper",
    "featured": true,
    "description": "A fully custom hamper combining crochet pieces, notes, flowers and packaging, with final quote confirmed on WhatsApp."
  }
];
    const priceNote = "Final price may vary based on size, color, custom name, flowers, packaging, and delivery.";
    const categoryDescriptions = {
        "all": "Explore handmade crochet gifts from BloomyCocoon in Mampad, Malappuram, Kerala, India. Find crochet bouquets, plushies, keychains, baby gifts, accessories, home decor and custom gift combos for birthdays, anniversaries, students, baby showers and surprise gifts, with delivery across Kerala and India.",
        "bouquets": "BloomyCocoon's crochet bouquets are long-lasting handmade flower gifts for birthdays, anniversaries, couple gifts and soft surprises. Choose roses, tulips, sunflowers, lavender or custom bouquet styles, then confirm colors, wrapping, Starting from price and final quote on WhatsApp before making begins.",
        "plushies": "Soft handmade crochet plushies for birthdays, baby gifting, student desks, couple surprises and keepsake gifts. Each plushie can be discussed for color, size and small details through WhatsApp, making it a cozy custom crochet gift from Kerala for moments that need a gentle hug.",
        "keychains": "Crochet keychains are small handmade gifts for students, friends, couples, bags, keys and custom hampers. Choose hearts, flowers, initials, animals or character-inspired charms, then confirm colors, quantity and final quote on WhatsApp before BloomyCocoon makes your order in Kerala with care.",
        "baby-gifts": "Gentle baby crochet gifts for newborns, baby showers, naming moments and soft family keepsakes. Explore booties, caps, mittens, rattles, baby plushies, name garlands and baby gift sets, with sizing, colors, Starting from price and delivery confirmed on WhatsApp before making.",
        "accessories": "Handmade crochet accessories for soft everyday styling, small surprises and affordable gifting. Browse scrunchies, hair bands, bow clips, brooches, earrings, bracelets, bag charms, phone charms and pouches, with custom shades and final details confirmed through WhatsApp for Kerala and India orders.",
        "home-decor": "Cozy crochet home decor pieces for rooms, desks, cars, nursery corners and handmade housewarming gifts. Explore coasters, wall hangings, door hangings, car charms, garlands, plant holders and custom name decor made with a warm BloomyCocoon feel for personal spaces too.",
        "gift-combos": "Gift combos and custom crochet hampers bring bouquets, plushies, keychains, notes and packaging together for birthdays, anniversaries, couple gifts, baby gifting and surprise moments. BloomyCocoon confirms the mix, Starting from price, final quote and delivery across Kerala and India on WhatsApp."
    };

    function getSafePrice(price) {
        const value = Number(price);
        return Number.isFinite(value) && value > 0 ? value : 0;
    }

    const cartGiftAddons = {
        card: { enabled: false, price: 49, message: '' },
        fairyLights: { enabled: false, price: 89 },
        windowBox: { enabled: false, price: 129 }
    };

    function loadCartFromStorage() {
        try {
            const stored = localStorage.getItem('bloomy_cart');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) cart = parsed;
            }
            const storedNote = localStorage.getItem('bloomy_cart_note');
            if (typeof storedNote === 'string') sharedCartNote = storedNote;

            const storedAddons = localStorage.getItem('bloomy_cart_addons');
            if (storedAddons) {
                const parsedAddons = JSON.parse(storedAddons);
                if (parsedAddons && typeof parsedAddons === 'object') {
                    if (parsedAddons.card) Object.assign(cartGiftAddons.card, parsedAddons.card);
                    if (parsedAddons.fairyLights) Object.assign(cartGiftAddons.fairyLights, parsedAddons.fairyLights);
                    if (parsedAddons.windowBox) Object.assign(cartGiftAddons.windowBox, parsedAddons.windowBox);
                }
            }
        } catch (e) {
            console.warn('Could not read cart from localStorage', e);
        }
    }

    function saveCartToStorage() {
        try {
            localStorage.setItem('bloomy_cart', JSON.stringify(cart));
            localStorage.setItem('bloomy_cart_note', sharedCartNote);
            localStorage.setItem('bloomy_cart_addons', JSON.stringify(cartGiftAddons));
        } catch (e) {
            console.warn('Could not save cart to localStorage', e);
        }
    }

    loadCartFromStorage();

    function getGiftAddonsTotal() {
        let sum = 0;
        if (cartGiftAddons.card.enabled) sum += cartGiftAddons.card.price;
        if (cartGiftAddons.fairyLights.enabled) sum += cartGiftAddons.fairyLights.price;
        if (cartGiftAddons.windowBox.enabled) sum += cartGiftAddons.windowBox.price;
        return sum;
    }

    function getCartSubtotal() {
        return cart.reduce((sum, item) => sum + (getSafePrice(item.price) * item.qty), 0);
    }

    function getCartGrandTotal() {
        const itemsTotal = getCartSubtotal();
        if (itemsTotal === 0) return 0;
        return itemsTotal + getGiftAddonsTotal();
    }

    let activeFilterCategory = 'all';
    let activeSearchQuery = '';
    window.collectionProducts = collectionProducts;
    window.cartGiftAddons = cartGiftAddons;
    window.buildCartWhatsAppMessage = buildCartWhatsAppMessage;
    window.getCartGrandTotal = getCartGrandTotal;

    function buildWhatsAppUrl(message) {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }

    function openWhatsAppMessage(message) {
        window.open(buildWhatsAppUrl(message), "_blank", "noopener");
    }

    function updateContextualWhatsAppFloat(screenId = currentScreen) {
        const whatsappFloat = document.getElementById('whatsapp-global-float');
        if (!whatsappFloat) return;

        let msg = "Hi BloomyCocoon, I would like to enquire about handmade crochet gifts and custom orders.";
        let label = "WhatsApp Us";

        if (cart && cart.length > 0) {
            const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
            msg = `Hi BloomyCocoon! 🌸 I have ${totalQty} handcrafted item${totalQty === 1 ? '' : 's'} in my basket and would like to confirm my order.`;
            label = "Order via WhatsApp";
        } else if (screenId === 'screen-collection') {
            if (activeFilterCategory && activeFilterCategory !== 'all') {
                const catLabel = getCategoryLabel(activeFilterCategory);
                msg = `Hi BloomyCocoon! 🌸 I'm exploring your ${catLabel} collection and would love to know about customization options.`;
            } else {
                msg = "Hi BloomyCocoon! 🌸 I'm exploring your handmade collection and would love to inquire about available pieces.";
            }
        } else if (screenId === 'screen-faq') {
            msg = "Hi BloomyCocoon! 🌸 I'm reading your FAQ and have a question about delivery / custom orders.";
        } else if (screenId === 'screen-contact') {
            msg = "Hi BloomyCocoon! 🌸 I'd love to chat about a personalized crochet order.";
        }

        whatsappFloat.setAttribute('data-whatsapp-message', msg);
        whatsappFloat.href = buildWhatsAppUrl(msg);
        const labelSpan = whatsappFloat.querySelector('.whatsapp-label-text');
        if (labelSpan) {
            labelSpan.textContent = label;
        }
    }

    function trackEvent(eventName, params = {}) {
        if (window.gtag && typeof window.gtag === "function") {
            window.gtag("event", eventName, params);
            return;
        }
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event: eventName, ...params });
        }
    }

    function buildCartWhatsAppMessage() {
        const note = (sharedCartNote || document.getElementById('cart-page-customer-note')?.value || document.getElementById('cart-customer-note')?.value || '').trim();
        let message = "Hello BloomyCocoon! 🌸 I would like to place an order for these handmade crochet items:\n\n";

        cart.forEach((item, index) => {
            const catalogItem = collectionProducts.find(p => p.id === item.id);
            const badge = item.badge || catalogItem?.badge || '';
            const lineSubtotal = getSafePrice(item.price) * item.qty;

            message += `${index + 1}. *${item.name}*`;
            if (badge) message += ` [${badge}]`;
            message += `\n`;
            message += `   Category: ${getCategoryLabel(item.category)}\n`;
            message += `   Qty: ${item.qty} × ₹${formatPrice(getSafePrice(item.price))} = ₹${formatPrice(lineSubtotal)}\n`;
            if (item.itemNote && item.itemNote.trim()) {
                message += `   Custom wish / color: "${item.itemNote.trim()}"\n`;
            }
            message += `\n`;
        });

        const itemsSubtotal = getCartSubtotal();
        const addonsTotal = getGiftAddonsTotal();
        const grandTotal = itemsSubtotal + addonsTotal;
        const advanceAmount = Math.round(grandTotal * 0.5);
        const balanceAmount = grandTotal - advanceAmount;

        const hasAddons = cartGiftAddons.card.enabled || 
                          cartGiftAddons.fairyLights.enabled || 
                          cartGiftAddons.windowBox.enabled;

        if (hasAddons) {
            message += `🎁 *Gift Packaging & Add-ons:*\n`;
            if (cartGiftAddons.card.enabled) {
                message += `• Handwritten Calligraphy Card (+₹${cartGiftAddons.card.price})\n`;
                if (cartGiftAddons.card.message && cartGiftAddons.card.message.trim()) {
                    message += `  Card Message: "${cartGiftAddons.card.message.trim()}"\n`;
                }
            }
            if (cartGiftAddons.fairyLights.enabled) {
                message += `• Warm Fairy Lights String (+₹${cartGiftAddons.fairyLights.price})\n`;
            }
            if (cartGiftAddons.windowBox.enabled) {
                message += `• Keepsake Display Window Box (+₹${cartGiftAddons.windowBox.price})\n`;
            }
            message += `\n`;
        }

        if (addonsTotal > 0) {
            message += `*Items Subtotal:* ₹${formatPrice(itemsSubtotal)}\n`;
            message += `*Gifting Add-ons:* ₹${formatPrice(addonsTotal)}\n`;
            message += `*Total Estimated Order:* ₹${formatPrice(grandTotal)}\n`;
        } else {
            message += `*Starting Total:* ₹${formatPrice(itemsSubtotal)}\n`;
        }
        message += `• 50% Advance via UPI (to start crafting): ₹${formatPrice(advanceAmount)}\n`;
        message += `• 50% Balance (before dispatch): ₹${formatPrice(balanceAmount)}\n\n`;

        if (note) {
            message += `*Order Notes / Delivery Details:*\n${note}\n\n`;
        }

        message += "I understand these are Starting from prices. Please help me confirm the final quote on WhatsApp based on size, color, custom name, flowers, packaging, and delivery.\n\n";
        message += "Payment can be confirmed on WhatsApp via UPI: 50% advance before making begins, and 50% before delivery.\n";
        message += "Delivery is available across Kerala and India.";
        return message;
    }


    // Custom Order step state
    let orderStep = 1;
    const orderData = {
        type: 'Bouquet',
        color: 'Blush Pink',
        notes: '',
        name: ''
    };
    let lastCartTrigger = null;
    let cartScrollY = 0;

    const screenMetadata = ROUTE_CONTENT;

    function trimTrailingSlash(pathname) {
        return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    }

    function getScreenIdFromPath(pathname) {
        const cleanPath = trimTrailingSlash(pathname || '/');
        if (cleanPath === '/' || cleanPath === '/home') return 'screen-home';
        if (cleanPath.startsWith('/products/') || cleanPath.startsWith('/product/')) return 'screen-product-detail';
        if (cleanPath === '/cart' || cleanPath === '/basket') return 'screen-cart';
        if (cleanPath === '/collections' || cleanPath === '/collection') return 'screen-collection';
        if (cleanPath === '/custom-order' || cleanPath === '/custom' || cleanPath === '/custom-orders') return 'screen-custom-orders';
        if (cleanPath === '/about') return 'screen-about';
        if (cleanPath === '/faq') return 'screen-faq';
        if (cleanPath === '/contact') return 'screen-contact';
        if (cleanPath === '/shipping-delivery') return 'screen-shipping-delivery';
        if (cleanPath === '/returns-cancellations') return 'screen-returns-cancellations';
        if (cleanPath === '/privacy-policy') return 'screen-privacy-policy';
        if (cleanPath === '/order-terms') return 'screen-order-terms';
        if (cleanPath === '/crochet-care') return 'screen-crochet-care';
        if (cleanPath === '/anniversary-gifts') return 'screen-anniversary-gifts';
        if (cleanPath === '/birthday-gifts') return 'screen-birthday-gifts';
        if (cleanPath === '/baby-shower-gifts') return 'screen-baby-shower-gifts';
        if (cleanPath === '/return-gifts') return 'screen-return-gifts';
        return null;
    }

    function getScreenIdFromHash(hash) {
        const cleanHash = hash.replace(/^#/, '').split('?')[0];
        const normalizedPath = cleanHash.startsWith('/') ? cleanHash : `/${cleanHash}`;
        return getScreenIdFromPath(normalizedPath) || 'screen-home';
    }

    function getScreenPath(screenId, targetPath) {
        if (screenId === 'screen-product-detail') {
            const path = targetPath || window.location.pathname;
            return path.startsWith('/products/') ? path : (path.startsWith('/product/') ? path.replace('/product/', '/products/') : '/products');
        }
        return screenMetadata[screenId]?.path || '/';
    }

    function getCleanCollectionSearch(search) {
        const params = new URLSearchParams(search || '');
        const rawCategory = params.get('category');
        if (!rawCategory) return '';
        const category = legacyFilterMap[rawCategory] || rawCategory;
        const isKnownCategory = collectionCategories.some(item => item.id === category);
        return isKnownCategory ? `?category=${encodeURIComponent(category)}` : '';
    }

    function getRouteForScreen(screenId, search = window.location.search, targetPath) {
        const path = getScreenPath(screenId, targetPath);
        const cleanSearch = screenId === 'screen-collection' ? getCleanCollectionSearch(search) : '';
        return `${path}${cleanSearch}`;
    }

    function getCanonicalForScreen(screenId, targetPath) {
        return `${SITE_ORIGIN}${getScreenPath(screenId, targetPath)}`;
    }

    function absoluteUrl(path) {
        return `${SITE_ORIGIN}/${String(path).replace(/^\/+/, '')}`;
    }

    function updateBrowserRoute(screenId, action = 'push', search = window.location.search, targetPath) {
        const route = getRouteForScreen(screenId, search, targetPath);
        const currentRoute = `${window.location.pathname}${window.location.search}`;
        if (route === currentRoute) return;
        const method = action === 'replace' ? 'replaceState' : 'pushState';
        window.history[method]({ screenId, targetPath }, '', route);
    }

    function getLegacyHashSearch(hash) {
        const queryIndex = hash.indexOf('?');
        return queryIndex >= 0 ? hash.slice(queryIndex) : '';
    }

    function normalizeLegacyHashRoute() {
        if (!window.location.hash.startsWith('#/')) return false;
        const screenId = getScreenIdFromHash(window.location.hash);
        const search = screenId === 'screen-collection' ? getLegacyHashSearch(window.location.hash) : '';
        window.history.replaceState({ screenId }, '', getRouteForScreen(screenId, search));
        return true;
    }

    function syncScreenMetadata(screenId, targetPath) {
        if (screenId === 'screen-product-detail') {
            const path = targetPath || window.location.pathname;
            const match = path.match(/^\/products?\/([^/?#]+)/);
            const slug = match ? match[1] : null;
            const product = slug ? collectionProducts.find(p => p.id === slug) : null;
            if (product) {
                const safePrice = Number(product.startingPrice) || 149;
                const pageTitle = `${product.name} - Handmade Crochet Gift in Kerala | BloomyCocoon`;
                const pageDesc = `${product.description} Handcrafted in Kerala with soft milk cotton yarn. Starting from ₹${safePrice}. Order & customize on WhatsApp.`;
                const canonicalUrl = `${SITE_ORIGIN}/products/${product.id}`;
                const imageUrl = product.image ? `${SITE_ORIGIN}/${product.image}` : `${SITE_ORIGIN}/images/hero_crochet_scene.png`;

                document.title = pageTitle;
                document.querySelector('meta[name="description"]')?.setAttribute('content', pageDesc);
                document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitle);
                document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageDesc);
                document.querySelector('meta[property="og:image"]')?.setAttribute('content', imageUrl);
                document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
                document.querySelector('meta[property="og:type"]')?.setAttribute('content', 'product');
                document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', pageTitle);
                document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', pageDesc);
                document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', imageUrl);
                document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', canonicalUrl);
                document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
                return;
            }
        }

        const metadata = screenMetadata[screenId] || screenMetadata['screen-home'];
        const canonicalUrl = getCanonicalForScreen(screenId);
        
        document.title = metadata.title;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', metadata.description);
        
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', metadata.title);
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', metadata.description);

        const ogType = document.querySelector('meta[property="og:type"]');
        if (ogType) ogType.setAttribute('content', 'website');
        
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.setAttribute('content', metadata.title);
        
        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc) twitterDesc.setAttribute('content', metadata.description);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', canonicalUrl);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

        const twitterUrl = document.querySelector('meta[property="twitter:url"]');
        if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);
    }

    let detailCurrentProduct = null;
    let detailSelectedQty = 1;
    let detailSelectedAddons = {
        card: false,
        fairyLights: false,
        windowBox: false
    };

    window.changeProductDetailQty = function(delta) {
        detailSelectedQty = Math.max(1, Math.min(20, detailSelectedQty + delta));
        const qtyVal = document.getElementById('detail-qty-val');
        if (qtyVal) qtyVal.textContent = String(detailSelectedQty);
        updateProductDetailActionLabels();
        updateProductDetailWhatsAppLinks();
    };

    window.updateProductDetailAddons = function() {
        const cardCheckbox = document.getElementById('detail-addon-card');
        const lightsCheckbox = document.getElementById('detail-addon-lights');
        const boxCheckbox = document.getElementById('detail-addon-box');

        detailSelectedAddons.card = Boolean(cardCheckbox?.checked);
        detailSelectedAddons.fairyLights = Boolean(lightsCheckbox?.checked);
        detailSelectedAddons.windowBox = Boolean(boxCheckbox?.checked);

        updateProductDetailActionLabels();
        updateProductDetailWhatsAppLinks();
    };

    function updateProductDetailActionLabels() {
        if (!detailCurrentProduct) return;
        const basePrice = Number(detailCurrentProduct.startingPrice) || 149;
        let addonsCost = 0;
        if (detailSelectedAddons.card) addonsCost += 49;
        if (detailSelectedAddons.fairyLights) addonsCost += 89;
        if (detailSelectedAddons.windowBox) addonsCost += 129;

        const totalEst = (basePrice * detailSelectedQty) + addonsCost;
        
        const addBtnText = document.getElementById('detail-add-to-cart-text');
        if (addBtnText) {
            addBtnText.textContent = detailSelectedQty > 1 ? `Add ${detailSelectedQty} to Cart • ₹${totalEst}` : (addonsCost > 0 ? `Add to Cart • ₹${totalEst}` : `Add to Cart`);
        }

        const stickyPrice = document.getElementById('detail-sticky-price');
        if (stickyPrice) {
            stickyPrice.textContent = detailSelectedQty > 1 || addonsCost > 0 ? `Total: ₹${totalEst}` : `Starting from ₹${basePrice}`;
        }
    }

    function updateProductDetailWhatsAppLinks() {
        if (!detailCurrentProduct) return;
        const basePrice = Number(detailCurrentProduct.startingPrice) || 149;
        let addonsCost = 0;
        const addonsList = [];
        if (detailSelectedAddons.card) {
            addonsCost += 49;
            addonsList.push('Calligraphy Note Card (+₹49)');
        }
        if (detailSelectedAddons.fairyLights) {
            addonsCost += 89;
            addonsList.push('Warm Fairy Lights (+₹89)');
        }
        if (detailSelectedAddons.windowBox) {
            addonsCost += 129;
            addonsList.push('Keepsake Window Box (+₹129)');
        }

        const totalEst = (basePrice * detailSelectedQty) + addonsCost;
        let message = `Hi BloomyCocoon, I would like to order ${detailSelectedQty > 1 ? `${detailSelectedQty}x ` : ''}${detailCurrentProduct.name} (Starting from ₹${basePrice}${detailSelectedQty > 1 ? ' each' : ''}).`;
        if (addonsList.length > 0) {
            message += `\nAdd-ons: ${addonsList.join(', ')}.`;
            message += `\nEstimated starting total: ₹${totalEst}.`;
        }
        message += `\nWhat colors and custom options are available?`;

        const waUrl = `https://wa.me/919061174579?text=${encodeURIComponent(message)}`;
        const mainWaBtn = document.getElementById('detail-whatsapp-btn');
        if (mainWaBtn) mainWaBtn.href = waUrl;
        const stickyWaBtn = document.getElementById('detail-sticky-wa-btn');
        if (stickyWaBtn) stickyWaBtn.href = waUrl;
    }

    window.handleDetailAddToCart = function() {
        if (!detailCurrentProduct) return;
        
        // Add to cart with quantity
        addToCart(
            detailCurrentProduct.id,
            detailCurrentProduct.name,
            detailCurrentProduct.category,
            detailCurrentProduct.startingPrice,
            getProductImage(detailCurrentProduct),
            detailCurrentProduct.badge,
            detailCurrentProduct.description,
            detailSelectedQty
        );

        // If any gifting addons were selected, enable them in the cart
        if (detailSelectedAddons.card && cartGiftAddons.card) {
            cartGiftAddons.card.enabled = true;
        }
        if (detailSelectedAddons.fairyLights && cartGiftAddons.fairyLights) {
            cartGiftAddons.fairyLights.enabled = true;
        }
        if (detailSelectedAddons.windowBox && cartGiftAddons.windowBox) {
            cartGiftAddons.windowBox.enabled = true;
        }
        if (detailSelectedAddons.card || detailSelectedAddons.fairyLights || detailSelectedAddons.windowBox) {
            renderCart();
        }

        // Tactile microinteraction confirmation on button
        const addBtn = document.getElementById('detail-add-to-cart-btn');
        const addBtnText = document.getElementById('detail-add-to-cart-text');
        if (addBtnText) {
            addBtnText.textContent = 'Added to Cart ✓';
            if (addBtn) addBtn.classList.add('bg-tertiary');
            setTimeout(() => {
                updateProductDetailActionLabels();
                if (addBtn) addBtn.classList.remove('bg-tertiary');
            }, 1500);
        }

        const stickyAddBtn = document.getElementById('detail-sticky-add-btn');
        if (stickyAddBtn) {
            const stickyIcon = document.getElementById('detail-sticky-add-icon');
            const stickyText = document.getElementById('detail-sticky-add-text');
            if (stickyIcon && stickyText) {
                stickyIcon.textContent = 'check';
                stickyText.textContent = 'Added';
                setTimeout(() => {
                    stickyIcon.textContent = 'add_shopping_cart';
                    stickyText.textContent = 'Add';
                }, 1500);
            } else {
                stickyAddBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]" aria-hidden="true">check</span><span>Added</span>`;
                setTimeout(() => {
                    stickyAddBtn.innerHTML = `<span class="material-symbols-outlined text-[16px]" aria-hidden="true">add_shopping_cart</span><span>Add</span>`;
                }, 1500);
            }
        }
    };

    window.openProductLightbox = function(src, alt, triggerEl = document.activeElement) {
        const modal = document.getElementById('product-lightbox-modal');
        const img = document.getElementById('lightbox-img');
        if (!modal || !img) return;

        const targetSrc = src || (detailCurrentProduct ? getProductImage(detailCurrentProduct) : img.src);
        const targetAlt = alt || (detailCurrentProduct ? `${detailCurrentProduct.name} - Handcrafted crochet stitch detail` : 'Product image');
        img.src = targetSrc;
        img.alt = targetAlt;

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100');
        openAccessibleOverlay(modal, {
            triggerEl,
            initialFocusEl: document.getElementById('lightbox-close-btn') || modal,
            onClose: window.closeProductLightbox
        });
    };

    window.closeProductLightbox = function() {
        const modal = document.getElementById('product-lightbox-modal');
        if (!modal) return;
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0', 'pointer-events-none');
        closeAccessibleOverlay(modal);
    };

    function focusScreenHeading(screenEl) {
        if (!screenEl) return;
        const heading = screenEl.querySelector('h1');
        if (!heading) return;
        if (!heading.hasAttribute('tabindex')) {
            heading.setAttribute('tabindex', '-1');
        }
        heading.style.outline = 'none';
        heading.focus({ preventScroll: true });
    }

    function renderProductDetailScreen(pathname = window.location.pathname) {
        const match = pathname.match(/^\/products?\/([^/?#]+)/);
        if (!match) return;
        const slug = match[1];
        const product = collectionProducts.find(p => p.id === slug);
        if (!product) return;

        detailCurrentProduct = product;
        detailSelectedQty = 1;
        detailSelectedAddons = { card: false, fairyLights: false, windowBox: false };

        // Reset quantity & checkboxes
        const qtyVal = document.getElementById('detail-qty-val');
        if (qtyVal) qtyVal.textContent = '1';
        const cardBox = document.getElementById('detail-addon-card');
        if (cardBox) cardBox.checked = false;
        const lightsBox = document.getElementById('detail-addon-lights');
        if (lightsBox) lightsBox.checked = false;
        const boxBox = document.getElementById('detail-addon-box');
        if (boxBox) boxBox.checked = false;

        const catLabel = getCategoryLabel(product.category);
        const breadcrumbCat = document.getElementById('detail-breadcrumb-cat');
        if (breadcrumbCat) {
            breadcrumbCat.textContent = catLabel;
            breadcrumbCat.setAttribute('href', `/collections?category=${encodeURIComponent(product.category)}`);
        }
        const breadcrumbName = document.getElementById('detail-breadcrumb-name');
        if (breadcrumbName) breadcrumbName.textContent = product.name;

        const pictureEl = document.getElementById('detail-product-picture');
        const imgEl = document.getElementById('detail-product-img');
        const imagePath = getProductImage(product);
        if (pictureEl) {
            let sourceEl = pictureEl.querySelector('source');
            if (!sourceEl) {
                sourceEl = document.createElement('source');
                sourceEl.type = 'image/webp';
                pictureEl.insertBefore(sourceEl, imgEl || null);
            }
            sourceEl.srcset = getResponsiveWebpSrcset(imagePath);
            sourceEl.sizes = '(min-width: 768px) 50vw, 92vw';
        }
        if (imgEl) {
            imgEl.src = imagePath;
            imgEl.alt = `${product.name} - Handmade crochet gift by BloomyCocoon`;
        }

        const lightboxImg = document.getElementById('lightbox-img');
        if (lightboxImg) {
            lightboxImg.src = imagePath;
            lightboxImg.alt = `${product.name} - Handcrafted crochet stitch detail`;
        }

        const badgeEl = document.getElementById('detail-product-badge');
        if (badgeEl) {
            if (product.badge) {
                badgeEl.textContent = product.badge;
                badgeEl.classList.remove('hidden');
            } else {
                badgeEl.classList.add('hidden');
            }
        }

        const catEl = document.getElementById('detail-product-category');
        if (catEl) catEl.textContent = catLabel;

        const nameEl = document.getElementById('detail-product-name');
        if (nameEl) nameEl.textContent = product.name;

        const priceEl = document.getElementById('detail-product-price');
        const safePrice = Number(product.startingPrice) || 149;
        if (priceEl) priceEl.textContent = `Starting from ₹${safePrice}`;

        const descEl = document.getElementById('detail-product-desc');
        if (descEl) descEl.textContent = product.description || 'Handcrafted to order with premium yarn.';

        const addBtn = document.getElementById('detail-add-to-cart-btn');
        if (addBtn) addBtn.setAttribute('data-add-to-cart', product.id);

        // Sticky bar sync
        const stickyImg = document.getElementById('detail-sticky-img');
        if (stickyImg) {
            stickyImg.src = getThumbnailImage(imagePath);
            stickyImg.alt = product.name;
        }
        const stickyName = document.getElementById('detail-sticky-name');
        if (stickyName) stickyName.textContent = product.name;

        const stickyPrice = document.getElementById('detail-sticky-price');
        if (stickyPrice) stickyPrice.textContent = `Starting from ₹${safePrice}`;

        updateProductDetailActionLabels();
        updateProductDetailWhatsAppLinks();

        // Related items
        const relatedContainer = document.getElementById('detail-related-products-grid');
        if (relatedContainer) {
            const sameCategory = collectionProducts.filter(p => p.id !== product.id && p.category === product.category);
            const otherCategory = collectionProducts.filter(p => p.id !== product.id && p.category !== product.category);
            const related = [...sameCategory, ...otherCategory].slice(0, 4);
            relatedContainer.innerHTML = related.map(p => getProductCardMarkup(p)).join('\n');
            applyImageFallbacks(relatedContainer);
            setupProductCardAddToCartTriggers(relatedContainer);
        }
    }

    // SPA ROUTER WITH DYNAMIC TRANSITIONS & SEO SYNCING
    window.navigateTo = function(targetScreenId, transitionType = 'push', options = {}) {
        const routeSearch = options.routeSearch ?? window.location.search;
        const targetPath = options.targetPath;
        const shouldUpdateHistory = options.updateHistory !== false;
        const historyAction = options.replaceHistory ? 'replace' : 'push';

        if (inTransition) return;

        if (targetScreenId === currentScreen) {
            if (shouldUpdateHistory && !isRoutingFromHistory) {
                updateBrowserRoute(targetScreenId, historyAction, routeSearch, targetPath);
            }
            syncScreenMetadata(targetScreenId, targetPath);
            syncDynamicStructuredData(targetScreenId);
            syncNavigationUI();
            syncWhatsAppFloatVisibility(targetScreenId);
            if (targetScreenId === 'screen-collection') {
                applyCollectionFilterFromUrl();
            }
            if (targetScreenId === 'screen-product-detail') {
                renderProductDetailScreen(targetPath || window.location.pathname);
            }
            if (targetScreenId === 'screen-cart') {
                renderCart();
            }
            return;
        }

        const targetScreenEl = document.getElementById(targetScreenId);

        if (!targetScreenEl) {
            const destUrl = getRouteForScreen(targetScreenId, routeSearch, targetPath);
            if (destUrl) {
                window.location.href = destUrl;
            }
            return;
        }

        const currentScreenEl = document.getElementById(currentScreen);
        if (!currentScreenEl) {
            targetScreenEl.classList.remove('hidden');
            targetScreenEl.classList.add('active');
            currentScreen = targetScreenId;
            syncScreenMetadata(targetScreenId, targetPath);
            syncDynamicStructuredData(targetScreenId);
            syncNavigationUI();
            syncWhatsAppFloatVisibility(targetScreenId);
            focusScreenHeading(targetScreenEl);
            return;
        }

        syncScreenMetadata(targetScreenId, targetPath);
        syncDynamicStructuredData(targetScreenId);

        inTransition = true;
        
        // Toggle global WhatsApp button visibility based on target screen
        syncWhatsAppFloatVisibility(targetScreenId);

        // Open drawer logic or cleanup
        if (targetScreenId !== 'screen-collection') {
            window.closeCart?.();
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

            if (shouldUpdateHistory && !isRoutingFromHistory) {
                updateBrowserRoute(targetScreenId, historyAction, routeSearch, targetPath);
            }
            
            // Re-sync nav highlights
            syncNavigationUI();
            if (targetScreenId === 'screen-collection') {
                applyCollectionFilterFromUrl();
            }
            if (targetScreenId === 'screen-product-detail') {
                renderProductDetailScreen(targetPath || window.location.pathname);
            }
            if (targetScreenId === 'screen-cart') {
                renderCart();
            }

            syncWhatsAppFloatVisibility(targetScreenId);

            if (targetScreenId === 'screen-custom-orders' && shouldFocusCustomOrder) {
                shouldFocusCustomOrder = false;
                setTimeout(() => scrollToCustomOrderForm(), 80);
            } else {
                focusScreenHeading(targetScreenEl);
            }
        }, animTime);
    };

    // Global helper for going back
    window.navigateBack = function() {
        if (screenHistory.length > 1) {
            window.history.back();
        } else {
            navigateTo('screen-home', 'push_back', { replaceHistory: true });
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

    function getHistoryTransition(targetScreenId) {
        if (screenHistory.length > 1 && screenHistory[screenHistory.length - 2] === targetScreenId) {
            return (currentScreen === 'screen-custom-orders') ? 'slide_down' : 'push_back';
        }
        return (targetScreenId === 'screen-custom-orders') ? 'slide_up' : 'push';
    }

    // Popstate listener to coordinate browser forward/backward operations
    window.addEventListener('popstate', () => {
        const targetScreenId = getScreenIdFromPath(window.location.pathname) || 'screen-home';
        if (!document.getElementById(targetScreenId)) {
            window.location.reload();
            return;
        }
        if (targetScreenId === currentScreen) {
            if (targetScreenId === 'screen-collection') {
                applyCollectionFilterFromUrl();
            }
            if (targetScreenId === 'screen-product-detail') {
                renderProductDetailScreen(window.location.pathname);
            }
            syncScreenMetadata(targetScreenId, window.location.pathname);
            return;
        }

        const transitionType = getHistoryTransition(targetScreenId);

        isRoutingFromHistory = true;
        navigateTo(targetScreenId, transitionType, {
            updateHistory: false,
            routeSearch: window.location.search,
            targetPath: window.location.pathname
        });
        isRoutingFromHistory = false;
        if (targetScreenId === 'screen-product-detail') {
            renderProductDetailScreen(window.location.pathname);
        }
    });

    // Backward compatibility for old hash URLs.
    window.addEventListener('hashchange', () => {
        if (!normalizeLegacyHashRoute()) return;
        const targetScreenId = getScreenIdFromPath(window.location.pathname) || 'screen-home';
        if (!document.getElementById(targetScreenId)) {
            window.location.reload();
            return;
        }
        if (targetScreenId === currentScreen) {
            if (targetScreenId === 'screen-collection') {
                applyCollectionFilterFromUrl();
            }
            if (targetScreenId === 'screen-product-detail') {
                renderProductDetailScreen(window.location.pathname);
            }
            syncScreenMetadata(targetScreenId, window.location.pathname);
            return;
        }

        const transitionType = getHistoryTransition(targetScreenId);
        navigateTo(targetScreenId, transitionType, {
            updateHistory: false,
            routeSearch: window.location.search,
            targetPath: window.location.pathname
        });
        if (targetScreenId === 'screen-product-detail') {
            renderProductDetailScreen(window.location.pathname);
        }
    });

    // Handle deep-linking on page load
    normalizeLegacyHashRoute();
    const initialScreen = getScreenIdFromPath(window.location.pathname) || currentScreen || 'screen-home';
    window.history.replaceState({ screenId: initialScreen, targetPath: window.location.pathname }, '', getRouteForScreen(initialScreen, window.location.search, window.location.pathname));
    syncScreenMetadata(initialScreen, window.location.pathname);
    if (initialScreen !== currentScreen && document.getElementById(initialScreen)) {
        navigateTo(initialScreen, 'instant', {
            updateHistory: false,
            routeSearch: window.location.search,
            targetPath: window.location.pathname
        });
    }
    if (initialScreen === 'screen-product-detail') {
        renderProductDetailScreen(window.location.pathname);
    }
    if (initialScreen === 'screen-cart') {
        renderCart();
    }
    if (initialScreen === 'screen-collection') {
        applyCollectionFilterFromUrl();
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
                if (!document.getElementById(targetScreen)) {
                    if (el.tagName === 'A' && el.getAttribute('href')) return;
                }
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
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;

            const link = e.target.closest('a[href]');
            if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

            const url = new URL(link.getAttribute('href'), window.location.origin);
            if (url.origin !== window.location.origin) return;

            const targetScreen = getScreenIdFromPath(url.pathname);
            if (!targetScreen) return;

            // If the target screen is not in current DOM, allow native link navigation
            if (!document.getElementById(targetScreen)) return;

            e.preventDefault();
            e.stopImmediatePropagation();
            closeMobileMenu();

            if (targetScreen === 'screen-home' && currentScreen === 'screen-home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            let transition = 'push';
            if (targetScreen === 'screen-home') {
                transition = 'push_back';
            } else if (targetScreen === 'screen-custom-orders' && currentScreen !== 'screen-custom-orders') {
                transition = 'slide_up';
            }

            navigateTo(targetScreen, transition, { routeSearch: url.search, targetPath: url.pathname });
        }, true);

        document.addEventListener('click', (e) => {
            const logo = e.target.closest('[data-nav-logo]');
            if (!logo) return;

            if (!document.getElementById('screen-home')) return;

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
                    if (!document.getElementById('screen-home')) {
                        if (el.tagName === 'A' && el.getAttribute('href')) return;
                        window.location.href = '/';
                        return;
                    }
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

    function setupPolicyFooterLinks() {
        const policyLinks = [
            ['Shipping & Delivery', '/shipping-delivery'],
            ['Returns & Cancellations', '/returns-cancellations'],
            ['Privacy Policy', '/privacy-policy'],
            ['Order Terms', '/order-terms'],
            ['Crochet Care', '/crochet-care']
        ];

        document.querySelectorAll('footer nav[aria-label="Footer navigation"]').forEach((footerNav) => {
            if (footerNav.querySelector('[data-policy-footer-links]')) return;

            const policyGroup = document.createElement('span');
            policyGroup.dataset.policyFooterLinks = 'true';
            policyGroup.className = 'contents';
            policyGroup.innerHTML = policyLinks.map(([label, href]) => (
                `<a class="font-body-md text-on-surface-variant hover:text-secondary transition-colors" href="${href}">${label}</a>`
            )).join('');
            footerNav.append(policyGroup);
        });
    }

    // ----------------------------------------------------
    // 4. INTERACTIVE SHOPPING BASKET
    // ----------------------------------------------------
    const activeOverlays = [];
    const overlayStateMap = new WeakMap();
    const inertedByOverlays = new Set();
    let overlayBodyScrollLocked = false;
    let overlaySavedBodyOverflow = '';

    function getFocusableElements(container) {
        return Array.from(container.querySelectorAll([
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(','))).filter(el => {
            const style = window.getComputedStyle(el);
            return style.display !== 'none' && style.visibility !== 'hidden';
        });
    }

    function trapFocusInContainer(event, container) {
        if (event.key !== 'Tab') return;

        const focusableElements = getFocusableElements(container);
        if (focusableElements.length === 0) {
            event.preventDefault();
            container.focus({ preventScroll: true });
            return;
        }

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (!container.contains(document.activeElement)) {
            event.preventDefault();
            firstFocusable.focus({ preventScroll: true });
            return;
        }

        if (event.shiftKey && document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable.focus({ preventScroll: true });
        }
    }

    function reconcileOverlayEnvironment() {
        const requiredInert = new Set();
        const topOverlay = activeOverlays[activeOverlays.length - 1] || null;

        if (topOverlay) {
            let cur = topOverlay;
            while (cur && cur !== document.body) {
                const parent = cur.parentElement;
                if (!parent) break;
                Array.from(parent.children).forEach(sibling => {
                    if (sibling === cur) return;
                    const tag = sibling.tagName;
                    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK' || tag === 'TEMPLATE' || sibling.id === 'toast-container') return;
                    requiredInert.add(sibling);
                });
                cur = parent;
            }
        }

        Array.from(inertedByOverlays).forEach(el => {
            if (!requiredInert.has(el)) {
                el.removeAttribute('inert');
                el.removeAttribute('aria-hidden');
                inertedByOverlays.delete(el);
            }
        });

        if (topOverlay) {
            topOverlay.removeAttribute('inert');
            topOverlay.setAttribute('aria-hidden', 'false');
        }

        requiredInert.forEach(el => {
            if (!el.hasAttribute('inert')) {
                el.setAttribute('inert', '');
                el.setAttribute('aria-hidden', 'true');
                inertedByOverlays.add(el);
            }
        });

        const shouldLockScroll = activeOverlays.some(el => overlayStateMap.get(el)?.lockScroll);
        if (shouldLockScroll && !overlayBodyScrollLocked) {
            overlaySavedBodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            overlayBodyScrollLocked = true;
        } else if (!shouldLockScroll && overlayBodyScrollLocked) {
            document.body.style.overflow = overlaySavedBodyOverflow || '';
            overlayBodyScrollLocked = false;
        }
    }

    function openAccessibleOverlay(overlayEl, { triggerEl = document.activeElement, initialFocusEl = null, onClose = null, lockScroll = true } = {}) {
        if (!overlayEl) return;
        let state = overlayStateMap.get(overlayEl);
        if (!state) {
            state = { triggerEl: null, onClose: null, lockScroll: true };
            overlayStateMap.set(overlayEl, state);
        }

        if (triggerEl instanceof HTMLElement && !overlayEl.contains(triggerEl)) {
            state.triggerEl = triggerEl;
        }
        state.onClose = onClose;
        state.lockScroll = lockScroll;

        const existingIdx = activeOverlays.indexOf(overlayEl);
        if (existingIdx !== -1) activeOverlays.splice(existingIdx, 1);
        activeOverlays.push(overlayEl);

        overlayEl.setAttribute('aria-modal', 'true');
        reconcileOverlayEnvironment();

        const targetFocus = initialFocusEl || getFocusableElements(overlayEl)[0] || overlayEl;
        requestAnimationFrame(() => {
            targetFocus?.focus({ preventScroll: true });
        });
    }

    function closeAccessibleOverlay(overlayEl, { restoreFocus = true } = {}) {
        if (!overlayEl) return;
        const state = overlayStateMap.get(overlayEl);
        overlayEl.setAttribute('inert', '');
        overlayEl.setAttribute('aria-hidden', 'true');

        const idx = activeOverlays.indexOf(overlayEl);
        if (idx !== -1) activeOverlays.splice(idx, 1);

        reconcileOverlayEnvironment();

        if (state) {
            const trigger = state.triggerEl;
            state.triggerEl = null;
            if (activeOverlays.length === 0 && restoreFocus && trigger && document.contains(trigger)) {
                requestAnimationFrame(() => trigger.focus({ preventScroll: true }));
            }
        }
    }

    function syncWhatsAppFloatVisibility(screenId = currentScreen) {
        const whatsappFloat = document.getElementById('whatsapp-global-float');
        if (!whatsappFloat) return;
        const isCartOpen = document.getElementById('sideCart')?.classList.contains('cart-visible');
        whatsappFloat.classList.toggle('whatsapp-hidden', isCartOpen || screenId === 'screen-custom-orders');
        whatsappFloat.classList.toggle('whatsapp-product-mobile-hide', screenId === 'screen-product-detail');
        if (!isCartOpen && screenId !== 'screen-custom-orders') {
            updateContextualWhatsAppFloat(screenId);
        }
    }

    function setCartOpen(isOpen, triggerEl = document.activeElement) {
        const sideCart = document.getElementById('sideCart');
        if (!sideCart) return;

        if (isOpen && triggerEl instanceof HTMLElement) {
            lastCartTrigger = triggerEl;
        }

        sideCart.classList.toggle('cart-visible', isOpen);
        sideCart.classList.toggle('translate-x-full', !isOpen);
        sideCart.classList.toggle('translate-x-0', isOpen);
        sideCart.setAttribute('aria-modal', isOpen ? 'true' : 'false');

        const backdrop = document.getElementById('cart-backdrop');
        if (backdrop) {
            backdrop.classList.toggle('opacity-100', isOpen);
            backdrop.classList.toggle('pointer-events-auto', isOpen);
            backdrop.classList.toggle('opacity-0', !isOpen);
            backdrop.classList.toggle('pointer-events-none', !isOpen);
        }

        if (isOpen && !document.body.classList.contains('cart-open')) {
            cartScrollY = window.scrollY;
            document.body.style.top = `-${cartScrollY}px`;
            document.body.classList.add('cart-open');
        } else if (!isOpen && document.body.classList.contains('cart-open')) {
            document.body.classList.remove('cart-open');
            document.body.style.top = '';
            window.scrollTo({ top: cartScrollY, behavior: 'instant' });
        }

        if (isOpen) {
            const closeBtn = sideCart.querySelector('.cart-close-btn');
            openAccessibleOverlay(sideCart, {
                triggerEl: triggerEl || lastCartTrigger,
                initialFocusEl: closeBtn || sideCart,
                onClose: window.closeCart,
                lockScroll: false
            });
        } else {
            closeAccessibleOverlay(sideCart);
        }

        document.querySelectorAll('[aria-controls="sideCart"]').forEach(btn => {
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        syncWhatsAppFloatVisibility(currentScreen);
    }

    function closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) mobileMenu.classList.add('hidden');
        document.querySelectorAll('[aria-controls="mobile-menu"]').forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
        });
    }

    window.toggleCart = function(triggerEl = document.activeElement) {
        const sideCart = document.getElementById('sideCart');
        if (sideCart) {
            setCartOpen(!sideCart.classList.contains('cart-visible'), triggerEl);
        }
    };

    window.closeCart = function() {
        setCartOpen(false);
    };

    window.openCart = function(triggerEl = document.activeElement) {
        setCartOpen(true, triggerEl);
    };

    window.setCartOpen = setCartOpen;

    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            const shouldOpen = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden', !shouldOpen);
            document.querySelectorAll('[aria-controls="mobile-menu"]').forEach(btn => {
                btn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
            });
            if (shouldOpen) {
                requestAnimationFrame(() => mobileMenu.querySelector('a')?.focus({ preventScroll: true }));
            }
        }
    };

    // Delegate Quick Look & card Add-to-Cart clicks, and auto-close menu/cart on outside taps
    document.addEventListener('click', (e) => {
        const clickedMobileMenuLink = e.target.closest?.('#mobile-menu a');
        const clickedNavLink = e.target.closest?.('nav a');
        if (clickedMobileMenuLink || clickedNavLink) {
            closeMobileMenu();
        }

        const qlBtn = e.target.closest?.('[data-quick-look]');
        if (qlBtn) {
            const productId = qlBtn.dataset.quickLook;
            if (productId) window.openQuickLook?.(productId, qlBtn);
            return;
        }

        const addBtn = e.target.closest?.('[data-add-to-cart]');
        if (addBtn) {
            const productId = addBtn.dataset.addToCart;
            if (
                addBtn.id !== 'modal-add-to-cart-btn' &&
                addBtn.id !== 'detail-add-to-cart-btn' &&
                addBtn.id !== 'detail-sticky-add-btn' &&
                productId &&
                productId !== 'modal' &&
                productId !== 'detail' &&
                productId !== 'sticky'
            ) {
                const product = collectionProducts.find(item => item.id === productId);
                if (product) {
                    addToCart(product.id, product.name, product.category, product.startingPrice, getProductImage(product));
                }
                return;
            }
        }

        const sideCart = document.getElementById('sideCart');
        if (!sideCart?.classList.contains('cart-visible')) return;

        const eventPath = typeof e.composedPath === 'function' ? e.composedPath() : [];
        const clickedInsideCart = eventPath.includes(sideCart) || sideCart.contains(e.target);
        const cartControlSelector = '[aria-controls="sideCart"], [data-add-to-cart], #detail-add-to-cart-btn, #detail-sticky-add-btn, #modal-add-to-cart-btn';
        const clickedCartControl = Boolean(
            e.target.closest?.(cartControlSelector) ||
            eventPath.some(el => el instanceof Element && el.matches?.(cartControlSelector))
        );
        if (!clickedInsideCart && !clickedCartControl) {
            window.closeCart();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (activeOverlays.length > 0) {
            const topOverlay = activeOverlays[activeOverlays.length - 1];
            const state = overlayStateMap.get(topOverlay);
            if (e.key === 'Escape') {
                e.preventDefault();
                state?.onClose?.();
                return;
            }
            if (e.key === 'Tab') {
                trapFocusInContainer(e, topOverlay);
                return;
            }
        }

        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    window.addToCart = function(id, name, category, price, img, badge, description, qty = 1) {
        if (arguments.length === 4) {
            img = price;
            price = category;
            category = 'handmade';
        }

        const addQty = Math.max(1, parseInt(qty, 10) || 1);
        const parsedPrice = getSafePrice(price);
        const catalogItem = collectionProducts.find(item => item.id === id);
        const resolvedBadge = badge || catalogItem?.badge || '';
        const resolvedDesc = description || catalogItem?.description || '';

        const existing = cart.find(item => item.id === id);
        
        if (existing) {
            existing.qty += addQty;
        } else {
            cart.push({
                id,
                name,
                category,
                price: parsedPrice,
                img,
                badge: resolvedBadge,
                description: resolvedDesc,
                itemNote: '',
                qty: addQty
            });
        }
        
        renderCart();
        const toastMsg = addQty > 1 ? `Added ${addQty}x "${name}" to your cart!` : `Added "${name}" to your cart!`;
        showToast(toastMsg);
        trackEvent('add_to_cart', {
            item_id: id,
            item_name: name,
            item_category: category,
            value: parsedPrice * addQty,
            currency: 'INR'
        });
        
        // Automatically slide open the drawer if not already on the dedicated cart screen
        if (currentScreen !== 'screen-cart') {
            const sideCart = document.getElementById('sideCart');
            if (sideCart && !sideCart.classList.contains('cart-visible')) {
                setCartOpen(true);
            }
        }
    };

    window.updateItemNote = function(id, note) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.itemNote = note;
            saveCartToStorage();
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
        const removed = cart.find(i => i.id === id);
        cart = cart.filter(i => i.id !== id);
        if (cart.length === 0) {
            cartGiftAddons.card.enabled = false;
            cartGiftAddons.card.message = '';
            cartGiftAddons.fairyLights.enabled = false;
            cartGiftAddons.windowBox.enabled = false;
        }
        renderCart();
        if (removed) {
            showToast(`Removed "${removed.name}" from cart.`);
        } else {
            showToast("Unravelled item from cart.");
        }
    };

    window.toggleGiftAddon = function(type) {
        if (cartGiftAddons[type]) {
            cartGiftAddons[type].enabled = !cartGiftAddons[type].enabled;
            renderCart();
            trackEvent('toggle_gift_addon', {
                addon: type,
                enabled: cartGiftAddons[type].enabled
            });
        }
    };

    window.updateGiftCardMessage = function(msg) {
        if (cartGiftAddons.card) {
            cartGiftAddons.card.message = msg;
            saveCartToStorage();
            const counter = document.getElementById('gift-card-chars');
            if (counter) {
                counter.textContent = `${msg.length}/150`;
            }
        }
    };

    function buildGiftingTouchesHtml(isDrawer = true) {
        return `
            <div class="cart-gifting-section bg-surface-container/70 border border-outline-variant/25 rounded-2xl ${isDrawer ? 'p-3.5 space-y-3 mt-3' : 'p-5 sm:p-6 space-y-4 mt-6 shadow-xs'}">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <span class="material-symbols-outlined text-secondary text-[20px]">redeem</span>
                        <span class="font-label-md ${isDrawer ? 'text-xs' : 'text-sm'} font-bold text-on-surface">Make It Extra Special 🎁</span>
                    </div>
                    <span class="text-[10px] text-secondary font-semibold bg-white/80 px-2.5 py-0.5 rounded-full border border-secondary/15">Artisan Touches</span>
                </div>
                
                <div class="space-y-2.5">
                    <!-- 1. Calligraphy Card -->
                    <div class="gift-addon-item bg-white/95 rounded-xl p-3 border transition-all ${cartGiftAddons.card.enabled ? 'border-secondary ring-1 ring-secondary/30 bg-secondary/5' : 'border-outline-variant/20 hover:border-outline-variant/40'}">
                        <label class="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" onchange="toggleGiftAddon('card')" ${cartGiftAddons.card.enabled ? 'checked' : ''} class="mt-0.5 rounded text-secondary focus:ring-secondary accent-secondary w-4 h-4 cursor-pointer">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between">
                                    <span class="font-label-md text-xs font-bold text-on-surface"><span aria-hidden="true">✍️</span> Handwritten Calligraphy Card</span>
                                    <span class="text-xs font-bold text-secondary">+₹${cartGiftAddons.card.price}</span>
                                </div>
                                <p class="text-[11px] text-on-surface-variant/80 mt-0.5">Written on craft cardstock with custom wax seal stamp</p>
                            </div>
                        </label>
                        ${cartGiftAddons.card.enabled ? `
                            <div class="mt-2.5 pt-2 border-t border-secondary/15 animate-fadeIn">
                                <textarea maxlength="150" rows="2" oninput="updateGiftCardMessage(this.value)" placeholder="Enter message for recipient (e.g., Happy 25th Birthday Ammu! Always blooming ❤️ - Rahul)" class="w-full bg-white border border-outline-variant/30 rounded-lg p-2.5 text-base md:text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary/40 focus:border-secondary transition-all">${escapeHTML(cartGiftAddons.card.message || '')}</textarea>
                                <div class="flex justify-between items-center text-[10px] text-on-surface-variant/70 mt-1">
                                    <span>Tucked securely inside your order</span>
                                    <span class="gift-card-chars">${(cartGiftAddons.card.message || '').length}/150</span>
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- 2. Warm Fairy Lights -->
                    <div class="gift-addon-item bg-white/95 rounded-xl p-3 border transition-all ${cartGiftAddons.fairyLights.enabled ? 'border-secondary ring-1 ring-secondary/30 bg-secondary/5' : 'border-outline-variant/20 hover:border-outline-variant/40'}">
                        <label class="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" onchange="toggleGiftAddon('fairyLights')" ${cartGiftAddons.fairyLights.enabled ? 'checked' : ''} class="mt-0.5 rounded text-secondary focus:ring-secondary accent-secondary w-4 h-4 cursor-pointer">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between">
                                    <span class="font-label-md text-xs font-bold text-on-surface"><span aria-hidden="true">💡</span> Warm Fairy Lights String</span>
                                    <span class="text-xs font-bold text-secondary">+₹${cartGiftAddons.fairyLights.price}</span>
                                </div>
                                <p class="text-[11px] text-on-surface-variant/80 mt-0.5">Micro-LED warm copper wire woven through flowers (includes battery)</p>
                            </div>
                        </label>
                    </div>

                    <!-- 3. Keepsake Window Display Box -->
                    <div class="gift-addon-item bg-white/95 rounded-xl p-3 border transition-all ${cartGiftAddons.windowBox.enabled ? 'border-secondary ring-1 ring-secondary/30 bg-secondary/5' : 'border-outline-variant/20 hover:border-outline-variant/40'}">
                        <label class="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" onchange="toggleGiftAddon('windowBox')" ${cartGiftAddons.windowBox.enabled ? 'checked' : ''} class="mt-0.5 rounded text-secondary focus:ring-secondary accent-secondary w-4 h-4 cursor-pointer">
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center justify-between">
                                    <span class="font-label-md text-xs font-bold text-on-surface"><span aria-hidden="true">🎁</span> Keepsake Display Window Box</span>
                                    <span class="text-xs font-bold text-secondary">+₹${cartGiftAddons.windowBox.price}</span>
                                </div>
                                <p class="text-[11px] text-on-surface-variant/80 mt-0.5">Rigid clear display showcase with satin ribbon handle for dust-free display</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    function renderPageEmptyCart() {
        const popularPicks = [
            { id: 'single-crochet-rose', name: 'Single Crochet Rose', category: 'bouquets', price: 149, badge: 'Popular Fav' },
            { id: 'bunny-plushie', name: 'Bunny Plushie', category: 'plushies', price: 499, badge: 'Bestseller' },
            { id: 'strawberry-keychain', name: 'Strawberry Keychain', category: 'keychains', price: 199, badge: 'Pocket Love' },
            { id: 'couple-bouquet-combo', name: 'Couple Bouquet Combo', category: 'bouquets', price: 1199, badge: 'Anniversary' }
        ];

        let picksHtml = '';
        popularPicks.forEach(pick => {
            const catalogItem = collectionProducts.find(p => p.id === pick.id) || pick;
            const img = getProductImage(catalogItem);
            const safePrice = getSafePrice(catalogItem.startingPrice || catalogItem.price);
            const categoryLabel = getCategoryLabel(catalogItem.category);

            picksHtml += `
                <div class="bg-white/90 border border-outline-variant/20 rounded-2xl p-3 flex flex-col justify-between hover:shadow-sm transition-all group">
                    <div class="relative mb-2">
                        <a href="/products/${catalogItem.id}" class="block">
                            <img src="${escapeHTML(getThumbnailImage(img))}" alt="${escapeHTML(catalogItem.name)}" class="w-full h-32 sm:h-36 object-cover rounded-xl border border-outline-variant/15 group-hover:scale-102 transition-transform" width="200" height="150" loading="lazy">
                        </a>
                        ${catalogItem.badge ? `<span class="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider pointer-events-none">${escapeHTML(catalogItem.badge)}</span>` : ''}
                        <button type="button" data-quick-look="${catalogItem.id}" class="quick-look-btn absolute bottom-2 right-2 w-11 h-11 min-w-[44px] min-h-[44px] p-0 rounded-full bg-white/90 hover:bg-white backdrop-blur-sm text-secondary border border-secondary/20 shadow-sm flex items-center justify-center focus-visible:opacity-100 transition-all cursor-pointer" aria-label="Quick look at ${escapeHTML(catalogItem.name)}">
                            <span class="material-symbols-outlined text-[20px] leading-none" aria-hidden="true">visibility</span>
                        </button>
                    </div>
                    <div>
                        <a href="/products/${catalogItem.id}" class="font-label-md text-xs sm:text-sm font-bold text-secondary hover:underline truncate block">${escapeHTML(catalogItem.name)}</a>
                        <div class="flex items-center justify-between text-[11px] text-on-surface-variant mt-1">
                            <span>${escapeHTML(categoryLabel)}</span>
                            <span class="font-bold text-secondary">Starting ₹${formatPrice(safePrice)}</span>
                        </div>
                    </div>
                    <button type="button" data-add-to-cart="${catalogItem.id}" aria-controls="sideCart" class="mt-3 w-full bg-secondary hover:bg-secondary/90 text-white text-xs font-semibold py-2 px-3 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-95 min-h-[44px]">
                        <span class="material-symbols-outlined text-[15px]" aria-hidden="true">add</span>
                        <span>Add to Basket</span>
                    </button>
                </div>
            `;
        });

        return `
            <div class="space-y-6">
                <div class="text-center py-12 px-6 rounded-3xl bg-surface-container-low/70 border border-outline-variant/20 flex flex-col items-center gap-3">
                    <div class="w-16 h-16 rounded-full bg-primary-container/70 flex items-center justify-center text-secondary">
                        <span class="material-symbols-outlined text-3xl" aria-hidden="true">shopping_basket</span>
                    </div>
                    <h2 class="font-headline-sm text-xl text-primary font-bold">Your basket is waiting for blooms</h2>
                    <p class="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">Explore our slow-crafted bouquets, cute plushies, and forever keepsakes made with love in Mampad, Kerala.</p>
                    <a href="/collections" class="mt-2 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-secondary text-white font-label-md text-xs hover:opacity-90 active:scale-95 transition-all shadow-xs min-h-[44px]">
                        <span>Browse Handmade Collection</span>
                        <span class="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
                    </a>
                </div>

                <div class="bg-surface-container-low/50 border border-outline-variant/20 rounded-3xl p-5 sm:p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-headline-sm text-base text-primary font-bold">Popular Handcrafted Blooms</h3>
                            <p class="text-xs text-on-surface-variant">Tap to add directly to your basket</p>
                        </div>
                        <a href="/collections" class="text-xs font-semibold text-secondary hover:underline flex items-center gap-0.5">
                            <span>View All</span>
                            <span class="material-symbols-outlined text-[14px]" aria-hidden="true">arrow_forward</span>
                        </a>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        ${picksHtml}
                    </div>
                </div>
            </div>
        `;
    }

    function renderPageCartItems() {
        let html = '<div class="space-y-3.5">';
        cart.forEach(item => {
            const categoryLabel = getCategoryLabel(item.category);
            const catalogItem = collectionProducts.find(p => p.id === item.id);
            const badge = item.badge || catalogItem?.badge || '';
            const desc = item.description || catalogItem?.description || '';
            const lineSubtotal = getSafePrice(item.price) * item.qty;

            html += `
                <div class="cart-page-item-card bg-surface-container-lowest p-4 sm:p-5 rounded-3xl border border-outline-variant/20 shadow-xs space-y-3 transition-all">
                    <!-- Top row: Image, title, badge, remove -->
                    <div class="flex items-start gap-4">
                        <a href="/products/${item.id}" class="relative group shrink-0" title="View details of ${escapeHTML(item.name)}">
                            <img src="${escapeHTML(getThumbnailImage(item.img))}" alt="${escapeHTML(item.name)}" class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-outline-variant/20 shadow-2xs group-hover:scale-105 transition-transform" width="96" height="96" loading="lazy">
                        </a>
                        <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between gap-2">
                                <div class="min-w-0">
                                    <a href="/products/${item.id}" class="font-headline-sm text-base sm:text-lg text-primary font-bold leading-snug hover:text-secondary hover:underline transition-colors block truncate">${escapeHTML(item.name)}</a>
                                    <div class="flex items-center gap-2 flex-wrap mt-1">
                                        <span class="text-xs text-on-surface-variant font-medium">${escapeHTML(categoryLabel)}</span>
                                        ${badge ? `<span class="bg-secondary/10 text-secondary text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">${escapeHTML(badge)}</span>` : ''}
                                    </div>
                                </div>
                                <button onclick="removeFromCart('${item.id}')" aria-label="Remove ${escapeHTML(item.name)} from cart" class="cart-remove-btn w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-error-container/40 text-outline-variant hover:text-error transition-all shrink-0" title="Remove item">
                                    <span class="material-symbols-outlined text-[19px]" aria-hidden="true">delete</span>
                                </button>
                            </div>
                            ${desc ? `<p class="text-xs text-on-surface-variant/80 mt-1.5 leading-relaxed line-clamp-2">${escapeHTML(desc)}</p>` : ''}
                        </div>
                    </div>

                    <!-- Middle row: Quantity Stepper & Price Breakdown -->
                    <div class="flex items-center justify-between pt-2 border-t border-outline-variant/10">
                        <div class="flex items-center gap-1.5 bg-primary-container/40 rounded-full p-1 border border-outline-variant/20">
                            <button onclick="updateQty('${item.id}', -1)" aria-label="Decrease ${escapeHTML(item.name)} quantity" class="cart-quantity-btn min-w-[44px] min-h-[44px] rounded-full bg-white text-secondary flex items-center justify-center font-bold text-sm shadow-2xs hover:bg-secondary-container active:scale-95 transition-all">-</button>
                            <span class="font-body-md text-xs sm:text-sm font-bold px-3 text-on-surface" aria-label="${escapeHTML(item.name)} quantity ${item.qty}">${item.qty}</span>
                            <button onclick="updateQty('${item.id}', 1)" aria-label="Increase ${escapeHTML(item.name)} quantity" class="cart-quantity-btn min-w-[44px] min-h-[44px] rounded-full bg-white text-secondary flex items-center justify-center font-bold text-sm shadow-2xs hover:bg-secondary-container active:scale-95 transition-all">+</button>
                        </div>
                        <div class="text-right">
                            <div class="font-headline-sm text-base sm:text-lg text-secondary font-bold">₹${formatPrice(lineSubtotal)}</div>
                            <div class="text-[11px] text-on-surface-variant font-medium">${item.qty > 1 ? `(₹${formatPrice(item.price)} each)` : 'Starting price'}</div>
                        </div>
                    </div>

                    <!-- Bottom row: Custom color or note for this item -->
                    <div class="pt-1.5">
                        <div class="relative">
                            <span class="material-symbols-outlined text-outline-variant text-[16px] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">palette</span>
                            <input type="text" value="${escapeHTML(item.itemNote || '')}" oninput="updateItemNote('${item.id}', this.value)" placeholder="Custom colors or wish for this item (e.g. blush pink petals, baby name 'Aarav')..." class="w-full bg-surface-container-low/70 border border-outline-variant/20 rounded-xl pl-8 pr-3 py-2 text-base md:text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:bg-white focus:ring-1 focus:ring-secondary/40 transition-all" aria-label="Custom color or personalization wish for ${escapeHTML(item.name)}">
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        // Append Gifting Touches station
        html += buildGiftingTouchesHtml(false);

        return html;
    }

    function renderCart() {
        const drawerContainers = document.querySelectorAll('#sideCart .cart-items-container');
        const pageContainers = document.querySelectorAll('.cart-page-items-container, #cart-page-items-wrapper');
        const cartBadge = document.querySelectorAll('.cart-badge');
        const cartTotalText = document.querySelectorAll('.cart-total-price');
        const checkoutBtn = document.querySelectorAll('.checkout-btn');

        let totalQty = 0;
        cart.forEach(item => {
            totalQty += item.qty;
        });

        const itemsSubtotal = getCartSubtotal();
        const addonsTotal = getGiftAddonsTotal();
        const grandTotal = totalQty > 0 ? itemsSubtotal + addonsTotal : 0;
        const advanceAmount = Math.round(grandTotal * 0.5);
        const balanceAmount = grandTotal - advanceAmount;

        // Update header counts
        document.querySelectorAll('.cart-header-count, #cart-header-count').forEach(el => {
            el.textContent = `${totalQty} item${totalQty === 1 ? '' : 's'}`;
        });
        document.querySelectorAll('.cart-summary-items-count, #cart-summary-items-count').forEach(el => {
            el.textContent = `${totalQty} item${totalQty === 1 ? '' : 's'}`;
        });

        // Update subtotal & payment breakdown
        document.querySelectorAll('.cart-items-subtotal').forEach(el => {
            el.textContent = totalQty > 0 ? `₹${formatPrice(itemsSubtotal)}` : '₹0';
        });
        document.querySelectorAll('.cart-advance-amount, #cart-advance-amount').forEach(el => {
            el.textContent = totalQty > 0 ? `₹${formatPrice(advanceAmount)}` : '₹0';
        });
        document.querySelectorAll('.cart-balance-amount, #cart-balance-amount').forEach(el => {
            el.textContent = totalQty > 0 ? `₹${formatPrice(balanceAmount)}` : '₹0';
        });

        // Update addons row in breakdown
        const addonsRows = document.querySelectorAll('.cart-addons-row, #cart-addons-row');
        const addonsAmountEls = document.querySelectorAll('.cart-addons-amount, #cart-addons-amount');
        addonsRows.forEach(row => {
            if (addonsTotal > 0 && totalQty > 0) {
                row.classList.remove('hidden');
                row.classList.add('flex');
            } else {
                row.classList.add('hidden');
                row.classList.remove('flex');
            }
        });
        addonsAmountEls.forEach(el => {
            el.textContent = `+₹${formatPrice(addonsTotal)}`;
        });

        // Update badge counters
        cartBadge.forEach(badge => {
            badge.innerText = totalQty;
            badge.setAttribute('aria-label', `${totalQty} item${totalQty === 1 ? '' : 's'} in cart`);
            if (totalQty > 0) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });

        document.querySelectorAll('[aria-controls="sideCart"]').forEach(btn => {
            btn.setAttribute('aria-label', totalQty > 0 ? `Open shopping cart, ${totalQty} item${totalQty === 1 ? '' : 's'} selected` : 'Open shopping cart');
        });

        // Render total texts
        cartTotalText.forEach(el => {
            el.innerText = totalQty > 0 ? `₹${formatPrice(grandTotal)}` : 'Add items';
        });

        // Enable/Disable checkout buttons
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

        // Sync notes inputs
        const drawerNote = document.getElementById('cart-customer-note');
        const pageNote = document.getElementById('cart-page-customer-note');
        if (drawerNote && sharedCartNote && drawerNote.value !== sharedCartNote) {
            drawerNote.value = sharedCartNote;
        }
        if (pageNote && sharedCartNote && pageNote.value !== sharedCartNote) {
            pageNote.value = sharedCartNote;
        }

        // 1. Render Drawer Items
        drawerContainers.forEach(container => {
            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-12 flex flex-col items-center gap-3">
                        <div class="w-16 h-16 rounded-full bg-primary-container/70 flex items-center justify-center text-secondary">
                            <span class="material-symbols-outlined text-3xl" aria-hidden="true">shopping_basket</span>
                        </div>
                        <div>
                            <p class="font-headline-sm text-lg text-secondary font-semibold">Your basket is waiting for blooms</p>
                            <p class="font-body-md text-xs text-on-surface-variant max-w-[220px] mx-auto mt-1">Explore our slow-crafted bouquets, cute plushies, and forever gifts.</p>
                        </div>
                        <a href="/collections" onclick="setCartOpen(false)" class="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-secondary text-white font-label-md text-xs hover:opacity-90 active:scale-95 transition-all shadow-xs min-h-[44px]">
                            <span>Browse Collection</span>
                            <span class="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
                        </a>
                    </div>
                `;
            } else {
                const prevScrollTop = container.scrollTop;
                let html = '<div class="cart-items-list space-y-3 pb-2">';
                cart.forEach(item => {
                    const categoryLabel = getCategoryLabel(item.category);
                    const catalogItem = collectionProducts.find(p => p.id === item.id);
                    const badge = item.badge || catalogItem?.badge || '';
                    const lineSubtotal = getSafePrice(item.price) * item.qty;

                    html += `
                        <div class="bg-surface-container-lowest p-3.5 sm:p-4 rounded-2xl border border-outline-variant/20 shadow-2xs hover:border-secondary/30 space-y-2.5 transition-all">
                            <!-- Top row: Large Thumbnail, Title, Badge, Remove -->
                            <div class="flex items-start gap-3.5">
                                <a href="/products/${item.id}" onclick="closeCart()" class="relative group cursor-pointer shrink-0 block" title="View details of ${escapeHTML(item.name)}">
                                    <img src="${escapeHTML(getThumbnailImage(item.img))}" alt="${escapeHTML(item.name)}" class="w-20 h-20 sm:w-22 sm:h-22 object-cover rounded-xl border border-outline-variant/20 shadow-2xs group-hover:scale-105 transition-transform" width="88" height="88" loading="lazy">
                                    <div class="absolute inset-0 bg-black/15 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white" aria-hidden="true">
                                        <span class="material-symbols-outlined text-[18px]">visibility</span>
                                    </div>
                                </a>
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-start justify-between gap-1">
                                        <div class="min-w-0 pr-1">
                                            <a href="/products/${item.id}" onclick="closeCart()" class="font-headline-sm text-sm sm:text-base text-primary font-bold leading-snug hover:text-secondary hover:underline transition-colors block truncate" title="${escapeHTML(item.name)}">${escapeHTML(item.name)}</a>
                                            <div class="flex items-center gap-1.5 flex-wrap mt-0.5">
                                                <span class="text-xs text-on-surface-variant font-medium">${escapeHTML(categoryLabel)}</span>
                                                ${badge ? `<span class="bg-secondary/10 text-secondary text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">${escapeHTML(badge)}</span>` : ''}
                                            </div>
                                        </div>
                                        <button onclick="removeFromCart('${item.id}')" aria-label="Remove ${escapeHTML(item.name)} from cart" class="cart-remove-btn w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-error-container/30 text-outline-variant hover:text-error transition-all shrink-0" title="Remove item">
                                            <span class="material-symbols-outlined text-[18px]" aria-hidden="true">delete</span>
                                        </button>
                                    </div>

                                    <!-- Price & Quantity Stepper -->
                                    <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-outline-variant/10">
                                        <div class="flex items-center gap-1 bg-primary-container/40 rounded-full p-0.5 border border-outline-variant/20">
                                            <button onclick="updateQty('${item.id}', -1)" aria-label="Decrease ${escapeHTML(item.name)} quantity" class="cart-quantity-btn min-w-[44px] min-h-[44px] rounded-full bg-white text-secondary flex items-center justify-center font-bold text-xs shadow-2xs hover:bg-secondary-container active:scale-95 transition-all">-</button>
                                            <span class="font-body-md text-xs font-bold px-2.5 text-on-surface" aria-label="${escapeHTML(item.name)} quantity ${item.qty}">${item.qty}</span>
                                            <button onclick="updateQty('${item.id}', 1)" aria-label="Increase ${escapeHTML(item.name)} quantity" class="cart-quantity-btn min-w-[44px] min-h-[44px] rounded-full bg-white text-secondary flex items-center justify-center font-bold text-xs shadow-2xs hover:bg-secondary-container active:scale-95 transition-all">+</button>
                                        </div>
                                        <div class="text-right">
                                            <div class="font-headline-sm text-sm sm:text-base text-secondary font-bold">₹${formatPrice(lineSubtotal)}</div>
                                            ${item.qty > 1 ? `<div class="text-[10px] text-on-surface-variant font-medium">(₹${formatPrice(item.price)} each)</div>` : ''}
                                        </div>
                                    </div>

                                    ${item.itemNote ? `
                                        <div class="mt-2 text-[11px] text-secondary bg-secondary/8 rounded-lg px-2.5 py-1 flex items-center gap-1.5 border border-secondary/15">
                                            <span class="material-symbols-outlined text-[13px]" aria-hidden="true">palette</span>
                                            <span class="truncate">${escapeHTML(item.itemNote)}</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `;
                });
                html += '</div>';

                // Sleek callout to full cart page for gifting touches
                html += `
                    <div class="pt-1">
                        <a href="/cart" onclick="closeCart()" class="block p-3 rounded-2xl bg-secondary/8 border border-secondary/20 hover:bg-secondary/15 transition-all text-xs group">
                            <div class="flex items-center justify-between">
                                <span class="font-bold text-secondary flex items-center gap-1.5">
                                    <span class="material-symbols-outlined text-[18px]" aria-hidden="true">redeem</span>
                                    <span>Add Gift Card, Box &amp; Fairy Lights</span>
                                </span>
                                <span class="material-symbols-outlined text-[16px] text-secondary group-hover:translate-x-0.5 transition-transform" aria-hidden="true">arrow_forward</span>
                            </div>
                            <p class="text-[11px] text-on-surface-variant/80 mt-1">Personalize with hand-calligraphed cards and keepsake gift boxes on the full cart page.</p>
                        </a>
                    </div>
                `;

                container.innerHTML = html;
                container.scrollTop = prevScrollTop;
            }
        });

        // 2. Render Dedicated Page Items
        pageContainers.forEach(container => {
            if (cart.length === 0) {
                container.innerHTML = renderPageEmptyCart();
            } else {
                container.innerHTML = renderPageCartItems();
            }
        });

        updateContextualWhatsAppFloat();
        saveCartToStorage();
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

    function focusStepHeading(stepNumber) {
        const heading = document.querySelector(`#step-card-${stepNumber} h3`);
        if (!heading) return;
        if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
        heading.style.outline = 'none';
        heading.focus({ preventScroll: true });
    }

    function showFieldError(inputEl, errorId, message) {
        if (!inputEl) return;
        inputEl.setAttribute('aria-invalid', 'true');
        inputEl.classList.add('border-error', 'ring-1', 'ring-error/30');
        inputEl.classList.remove('border-outline-variant/30');
        const errEl = document.getElementById(errorId);
        if (errEl) {
            errEl.textContent = message;
            errEl.classList.remove('hidden');
        }
    }

    window.clearFieldError = function(inputEl, errorId) {
        if (!inputEl) return;
        inputEl.removeAttribute('aria-invalid');
        inputEl.classList.remove('border-error', 'ring-1', 'ring-error/30');
        inputEl.classList.add('border-outline-variant/30');
        const errEl = document.getElementById(errorId);
        if (errEl) {
            errEl.textContent = '';
            errEl.classList.add('hidden');
        }
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
            requestAnimationFrame(() => focusStepHeading(orderStep));
        }
    };

    window.prevOrderStep = function() {
        if (orderStep > 1) {
            document.getElementById(`step-card-${orderStep}`).classList.add('hidden');
            orderStep--;
            document.getElementById(`step-card-${orderStep}`).classList.remove('hidden');
            
            updateStepIndicatorUI();
            updateLivePreview();
            requestAnimationFrame(() => focusStepHeading(orderStep));
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

    window.selectCustomColor = function(colorName, buttonEl) {
        orderData.color = colorName;
        document.querySelectorAll('.color-swatch-btn').forEach(btn => {
            btn.classList.remove('bg-secondary', 'text-white', 'border-secondary', 'shadow-2xs');
            btn.classList.add('bg-white', 'text-on-surface', 'border-outline-variant/30');
        });
        if (buttonEl) {
            buttonEl.classList.remove('bg-white', 'text-on-surface', 'border-outline-variant/30');
            buttonEl.classList.add('bg-secondary', 'text-white', 'border-secondary', 'shadow-2xs');
        }
        updateLivePreview();
    };

    function updateLivePreview() {
        const previewType = document.getElementById('preview-type');
        const previewColor = document.getElementById('preview-color');
        const previewNotes = document.getElementById('preview-notes');
        const previewImage = document.getElementById('preview-image');

        if (previewType) previewType.innerText = orderData.type;
        if (previewColor) previewColor.innerText = orderData.color || "Blush Pink";
        
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
            const previewSource = document.getElementById('preview-webp-source');
            const previewImagePath = sampleImages[orderData.type] || sampleImages['Other'];

            if (previewSource) {
                previewSource.srcset = getResponsiveWebpSrcset(previewImagePath);
                previewSource.sizes = '(min-width: 768px) 33vw, 100vw';
            }
            previewImage.src = previewImagePath;
        }
    }

    // Submit Custom Order
    window.submitCustomRequest = function(event) {
        event.preventDefault();
        
        const nameInput = document.getElementById('order-name');
        const nameVal = nameInput ? nameInput.value.trim() : '';

        if (!nameVal) {
            showFieldError(nameInput, 'order-name-error', 'Please enter your full name so we can personalize your WhatsApp request.');
            nameInput?.focus();
            showToast("Please enter your full name.");
            return;
        }
        window.clearFieldError(nameInput, 'order-name-error');

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
            message += `Palette preference: ${orderData.color || "Blush Pink"}\n`;
            message += `Personalization notes: ${orderData.notes || "None specified yet."}\n`;
            message += "Source: Custom Order Page\n\n";
            message += "Please help me finalize the design, Starting from price, final quote, 1-2 week custom timeline, and delivery across Kerala and India.\n\n";
            message += "I understand payment is confirmed on WhatsApp, mostly through UPI: 50% advance before making begins, and the remaining 50% after completion before delivery.";

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
        const orderNameInput = document.getElementById('order-name');
        if (orderNameInput) {
            orderNameInput.value = '';
            window.clearFieldError(orderNameInput, 'order-name-error');
        }
        
        orderData.type = 'Bouquet';
        orderData.color = 'Blush Pink';
        orderData.notes = '';
        orderData.name = '';
        
        selectOrderType('Bouquet');
        updateStepIndicatorUI();
        updateLivePreview();
    };

    // ----------------------------------------------------
    // 6. COLLECTION CATEGORY PILLS FILTERING
    // ----------------------------------------------------
    const categoryToggleBaseClass = "hidden";
    const categoryToggleActiveClass = "hidden";
    const categoryButtonBaseClass = "whitespace-nowrap px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container hover:bg-secondary/15 transition-all duration-200 font-label-md text-sm";
    const categoryButtonActiveClass = "whitespace-nowrap px-5 py-2.5 rounded-full font-label-md text-sm bg-secondary text-on-secondary shadow-sm transition-all duration-200";

    function getCollectionFilterRoot(sourceEl) {
        return (sourceEl && sourceEl.closest('[data-collection-filters]')) || document.querySelector('#screen-collection [data-collection-filters]');
    }

    function setCollectionCategoryListOpen(root, isOpen) {
        // No-op now since categories are always visible
    }

    window.showAllCollectionCategories = function(buttonEl) {
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
        activeFilterCategory = activeCategory;
        updateCategoryDescription(activeCategory);
        trackEvent('category_filter_click', { category: activeCategory });
        const root = getCollectionFilterRoot(buttonEl);
        if (root) {
            root.querySelectorAll('button[data-category-filter]').forEach(btn => {
                if (btn.dataset.categoryFilter === activeCategory) {
                    btn.className = categoryButtonActiveClass;
                } else {
                    btn.className = categoryButtonBaseClass;
                }
            });
        }

        const productGrid = document.querySelector('#collection-product-grid');
        if (!productGrid) return;

        applyCombinedCollectionFilters();
        updateContextualWhatsAppFloat('screen-collection');

        if (currentScreen === 'screen-collection') {
            const search = activeCategory === 'all' ? '' : `?category=${encodeURIComponent(activeCategory)}`;
            updateBrowserRoute('screen-collection', 'replace', search);
            syncScreenMetadata('screen-collection');
        }
    };

    function applyCombinedCollectionFilters() {
        const productGrid = document.querySelector('#collection-product-grid');
        const emptyState = document.getElementById('collection-empty-state');
        if (!productGrid) return;

        let visibleCount = 0;
        const query = activeSearchQuery.toLowerCase().trim();

        productGrid.querySelectorAll('.product-card').forEach(card => {
            const filterCategories = (card.getAttribute('data-filter-categories') || card.getAttribute('data-category') || '').split(/\s+/);
            const matchesCategory = (activeFilterCategory === 'all' || filterCategories.includes(activeFilterCategory));
            
            const cardText = (card.textContent || '').toLowerCase();
            const matchesQuery = !query || cardText.includes(query);

            if (matchesCategory && matchesQuery) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (emptyState) {
            emptyState.classList.toggle('hidden', visibleCount > 0);
        }
    }

    window.handleCollectionSearch = function(query) {
        activeSearchQuery = query || '';
        const clearBtn = document.getElementById('collection-search-clear');
        if (clearBtn) {
            clearBtn.classList.toggle('hidden', !query.trim());
        }
        applyCombinedCollectionFilters();
    };

    window.clearCollectionSearch = function() {
        activeSearchQuery = '';
        const input = document.getElementById('collection-search-input');
        if (input) input.value = '';
        const clearBtn = document.getElementById('collection-search-clear');
        if (clearBtn) clearBtn.classList.add('hidden');
        applyCombinedCollectionFilters();
    };

    // ----------------------------------------------------
    // QUICK LOOK MODAL LOGIC
    // ----------------------------------------------------
    let currentModalProduct = null;

    window.openQuickLook = function(productId, triggerEl = document.activeElement) {
        const product = collectionProducts.find(item => item.id === productId);
        if (!product) return;

        currentModalProduct = product;
        const modal = document.getElementById('quick-look-modal');
        const dialog = document.getElementById('quick-look-dialog');
        if (!modal) return;

        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-cat').textContent = getCategoryLabel(product.category);
        document.getElementById('modal-product-price').textContent = `Starting from ${formatStartingPrice(product.startingPrice)}`;
        document.getElementById('modal-product-desc').textContent = product.description;
        
        const imgEl = document.getElementById('modal-product-img');
        if (imgEl) {
            imgEl.src = getProductImage(product);
            imgEl.alt = getProductAltText(product);
        }

        const badgeEl = document.getElementById('modal-product-badge');
        if (badgeEl) {
            if (product.badge) {
                badgeEl.textContent = product.badge;
                badgeEl.classList.remove('hidden');
            } else {
                badgeEl.classList.add('hidden');
            }
        }

        const addBtn = document.getElementById('modal-add-to-cart-btn');
        if (addBtn) {
            addBtn.onclick = (e) => {
                if (e) e.stopPropagation();
                const qlState = overlayStateMap.get(modal);
                const originTrigger = qlState?.triggerEl || null;
                closeQuickLook({ restoreFocus: false });
                addToCart(product.id, product.name, product.category, product.startingPrice, getProductImage(product));
                if (originTrigger instanceof HTMLElement && document.contains(originTrigger)) {
                    lastCartTrigger = originTrigger;
                    const scState = overlayStateMap.get(document.getElementById('sideCart'));
                    if (scState) scState.triggerEl = originTrigger;
                }
            };
        }

        const whatsappBtn = document.getElementById('modal-whatsapp-inquire-btn');
        if (whatsappBtn) {
            whatsappBtn.onclick = () => {
                const msg = `Hi BloomyCocoon! 🌸 I would like to inquire about the "${product.name}" (${formatStartingPrice(product.startingPrice)}). Can you share color options and making time?`;
                openWhatsAppMessage(msg);
            };
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        if (dialog) {
            dialog.classList.remove('scale-95');
            dialog.classList.add('scale-100');
        }
        openAccessibleOverlay(modal, {
            triggerEl,
            initialFocusEl: document.getElementById('quick-look-close-btn') || dialog || modal,
            onClose: window.closeQuickLook
        });
    };

    window.closeQuickLook = function(arg) {
        const restoreFocus = (arg && typeof arg === 'object' && 'restoreFocus' in arg) ? arg.restoreFocus !== false : true;
        const modal = document.getElementById('quick-look-modal');
        const dialog = document.getElementById('quick-look-dialog');
        if (!modal) return;

        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        if (dialog) {
            dialog.classList.add('scale-95');
            dialog.classList.remove('scale-100');
        }
        currentModalProduct = null;
        closeAccessibleOverlay(modal, { restoreFocus });
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
        container.setAttribute('role', 'status');
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');

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
        const nameInput = form.querySelector('#contact-name, input[type="text"]');
        const emailInput = form.querySelector('#contact-email, input[type="email"]');
        const msgInput = form.querySelector('#contact-message, textarea');
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const msg = msgInput ? msgInput.value.trim() : '';

        let firstInvalid = null;
        if (!name) {
            showFieldError(nameInput, 'contact-name-error', 'Please enter your name.');
            firstInvalid = firstInvalid || nameInput;
        } else {
            window.clearFieldError(nameInput, 'contact-name-error');
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFieldError(emailInput, 'contact-email-error', 'Please enter a valid email address.');
            firstInvalid = firstInvalid || emailInput;
        } else {
            window.clearFieldError(emailInput, 'contact-email-error');
        }

        if (!msg) {
            showFieldError(msgInput, 'contact-message-error', 'Please tell us about your gift idea or enquiry.');
            firstInvalid = firstInvalid || msgInput;
        } else {
            window.clearFieldError(msgInput, 'contact-message-error');
        }

        if (firstInvalid) {
            firstInvalid.focus();
            showToast("Please complete the highlighted fields.");
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
        const successPanel = document.createElement('div');
        successPanel.className = 'text-center py-xl space-y-md bg-primary-container rounded-3xl p-md soft-glow border border-outline-variant/10 animate-push-enter';

        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'w-16 h-16 bg-tertiary text-on-tertiary rounded-full flex items-center justify-center mx-auto mb-sm';

        const icon = document.createElement('span');
        icon.className = 'material-symbols-outlined text-3xl';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = 'done';
        iconWrapper.appendChild(icon);

        const heading = document.createElement('h3');
        heading.className = 'font-headline-sm text-headline-sm text-secondary';
        heading.textContent = 'Your message is stitched!';

        const successMessage = document.createElement('p');
        successMessage.className = 'text-on-surface-variant max-w-sm mx-auto leading-relaxed';
        successMessage.textContent = `Thank you, ${name}. WhatsApp is opening so we can confirm your crochet gift enquiry personally.`;

        const resetButton = document.createElement('button');
        resetButton.className = 'bg-secondary text-on-secondary px-8 py-3 rounded-full font-label-md text-sm mt-md';
        resetButton.type = 'button';
        resetButton.textContent = 'Write Another Message';
        resetButton.addEventListener('click', () => location.reload());

        successPanel.append(iconWrapper, heading, successMessage, resetButton);
        form.replaceChildren(successPanel);
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
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const searchQuery = urlParams.get('search') || urlParams.get('q');
        const toggle = document.querySelector('#screen-collection [data-category-filter-toggle]');

        if (category) {
            const activeCategory = legacyFilterMap[category] || category;
            const btn = document.querySelector(`#screen-collection button[data-category-filter="${activeCategory}"]`);
            if (btn) {
                setCollectionCategoryListOpen(getCollectionFilterRoot(btn), true);
                filterCollectionCategory(activeCategory, btn);
            } else if (toggle) {
                filterCollectionCategory('all', toggle);
            }
        } else if (toggle) {
            filterCollectionCategory('all', toggle);
        }

        if (searchQuery) {
            const searchInput = document.getElementById('collection-search-input');
            if (searchInput) {
                searchInput.value = searchQuery;
            }
            if (typeof window.handleCollectionSearch === 'function') {
                window.handleCollectionSearch(searchQuery);
            }
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
        const img = product?.image || categoryFallbackImages[product?.category] || categoryFallbackImages.default;
        if (!img) return '/images/hero_crochet_scene.png';
        return img.startsWith('/') ? img : `/${img}`;
    }

    function getWebpImagePath(imagePath) {
        const clean = String(imagePath || '').replace(/^\//, '');
        return `/${clean.replace(/\.png$/i, '.webp')}`;
    }

    function getNormalizedAssetKey(imagePath) {
        return String(imagePath || '').replace(/^\//, '').replace(/\.(png|webp)$/i, '');
    }

    function getResponsiveWebpSrcset(imagePath) {
        const webpPath = getWebpImagePath(imagePath);
        if (!getResponsiveImagePathsSet().has(getNormalizedAssetKey(imagePath))) return webpPath;
        const basePath = webpPath.replace(/\.webp$/i, '');
        return [
            ...responsiveImageWidths.map(width => `${basePath}-${width}.webp ${width}w`),
            `${webpPath} 1024w`
        ].join(', ');
    }

    function getThumbnailImage(imagePath) {
        const webpPath = getWebpImagePath(imagePath);
        if (!getResponsiveImagePathsSet().has(getNormalizedAssetKey(imagePath))) return webpPath;
        return webpPath.replace(/\.webp$/i, '-320.webp');
    }

    function getProductImageSizes(isFeatured) {
        return isFeatured ? '(min-width: 768px) 66vw, 92vw' : '(min-width: 768px) 33vw, 46vw';
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
        const rawFallback = categoryFallbackImages[product.category] || categoryFallbackImages.default;
        const fallbackImage = rawFallback.startsWith('/') ? rawFallback : `/${rawFallback}`;
        const badgeMarkup = product.badge ? `<span class="bg-[#fbd8d0] text-[#775d56] px-3 py-1 rounded-full font-label-md text-xs">${escapeHTML(product.badge)}</span>` : '';
        const filterCategories = getProductCategoryIds(product).join(' ');
        const categoryLabel = getCategoryLabel(product.category);
        const productAlt = getProductAltText(product);

        if (product.featured) {
            const tagMarkup = product.tag ? `<span class="bg-tertiary text-on-tertiary px-4 py-1 rounded-full font-label-md text-sm">${escapeHTML(product.tag)}</span>` : '';
            return `
                <article data-product-id="${product.id}" data-category="${product.category}" data-filter-categories="${filterCategories}" class="col-span-2 md:col-span-8 group product-card relative overflow-hidden bg-primary-container rounded-xl soft-glow transition-all duration-500">
                    <div class="relative h-[260px] md:h-[420px] overflow-hidden group/img">
                        <a href="/products/${product.id}" class="block w-full h-full" aria-label="View ${escapeHTML(product.name)} details">
                            <picture class="contents">
                                <source srcset="${escapeHTML(getResponsiveWebpSrcset(image))}" sizes="${getProductImageSizes(true)}" type="image/webp">
                                <img alt="${escapeHTML(productAlt)}" class="product-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105" src="${escapeHTML(image)}" data-fallback-src="${escapeHTML(fallbackImage)}" loading="lazy" decoding="async" width="800" height="500">
                            </picture>
                        </a>
                        <button type="button" data-quick-look="${product.id}" class="quick-look-btn absolute bottom-3 right-3 z-10 min-w-[44px] min-h-[44px] px-3.5 py-2 rounded-full bg-white/90 hover:bg-white text-secondary border border-secondary/20 backdrop-blur-sm shadow-sm flex items-center justify-center gap-1.5 text-xs font-label-md focus-visible:opacity-100 transition-opacity cursor-pointer" aria-label="Quick look at ${escapeHTML(product.name)}">
                            <span class="material-symbols-outlined text-[18px] leading-none" aria-hidden="true">visibility</span>
                            <span>Quick Look</span>
                        </button>
                        <div class="absolute top-md right-md flex flex-col gap-2 items-end pointer-events-none">
                            ${product.badge ? `<span class="bg-secondary text-on-secondary px-4 py-1 rounded-full font-label-md text-sm uppercase tracking-wider">${escapeHTML(product.badge)}</span>` : ''}
                            ${tagMarkup}
                        </div>
                    </div>
                    <div class="p-6 md:p-lg">
                        <div class="flex justify-between items-end flex-wrap gap-4">
                            <div class="max-w-xl">
                                <span class="text-caption text-on-surface-variant font-label-md uppercase tracking-wide">${escapeHTML(categoryLabel)}</span>
                                <h3 class="font-headline-md text-2xl md:text-headline-md text-secondary mb-xs"><a href="/products/${product.id}" class="hover:underline">${escapeHTML(product.name)}</a></h3>
                                <p class="font-body-md text-on-surface-variant">${escapeHTML(product.description)}</p>
                            </div>
                            <div class="text-right">
                                <span class="font-headline-sm text-secondary block font-bold">Starting from ${formatStartingPrice(product.startingPrice)}</span>
                                <button type="button" data-add-to-cart="${product.id}" aria-controls="sideCart" aria-label="Add ${escapeHTML(product.name)} to cart" class="mt-base flex items-center gap-xs text-secondary font-label-md group/btn bg-white/70 hover:bg-secondary hover:text-white px-4 py-2 rounded-full transition-colors border border-secondary shadow-sm min-h-[44px]">
                                    Add to Cart <span class="material-symbols-outlined" data-icon="add" aria-hidden="true">add</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }

        return `
            <article data-product-id="${product.id}" data-category="${product.category}" data-filter-categories="${filterCategories}" class="col-span-1 md:col-span-4 group product-card bg-surface-container-low rounded-xl soft-glow transition-all duration-500">
                <div class="relative h-[180px] md:h-[260px] overflow-hidden rounded-t-xl bg-surface-container group/img">
                    <a href="/products/${product.id}" class="block w-full h-full" aria-label="View ${escapeHTML(product.name)} details">
                        <picture class="contents">
                            <source srcset="${escapeHTML(getResponsiveWebpSrcset(image))}" sizes="${getProductImageSizes(false)}" type="image/webp">
                            <img alt="${escapeHTML(productAlt)}" class="product-image w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105" src="${escapeHTML(image)}" data-fallback-src="${escapeHTML(fallbackImage)}" loading="lazy" decoding="async" width="400" height="500">
                        </picture>
                    </a>
                    <button type="button" data-quick-look="${product.id}" class="quick-look-btn absolute bottom-2 right-2 z-10 w-11 h-11 min-w-[44px] min-h-[44px] p-0 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-white/90 hover:bg-white text-secondary border border-secondary/20 backdrop-blur-sm shadow-sm flex items-center justify-center gap-1.5 text-xs font-label-md focus-visible:opacity-100 transition-opacity cursor-pointer" aria-label="Quick look at ${escapeHTML(product.name)}">
                        <span class="material-symbols-outlined text-[20px] leading-none" aria-hidden="true">visibility</span>
                        <span class="hidden sm:inline">Quick Look</span>
                    </button>
                    <div class="absolute top-base left-base pointer-events-none">
                        ${badgeMarkup}
                    </div>
                </div>
                <div class="p-md">
                    <span class="text-caption text-on-surface-variant font-label-md uppercase tracking-wide">${escapeHTML(categoryLabel)}</span>
                    <h3 class="font-headline-sm text-headline-sm text-secondary mb-xs"><a href="/products/${product.id}" class="hover:underline">${escapeHTML(product.name)}</a></h3>
                    <p class="product-card-description text-caption text-on-surface-variant mb-sm">${escapeHTML(product.description)}</p>
                    <div class="flex justify-between items-center gap-2 pt-1 border-t border-outline-variant/10 mt-2">
                        <span class="font-body-md text-on-surface font-bold text-sm md:text-base">Starting from ${formatStartingPrice(product.startingPrice)}</span>
                        <button type="button" data-add-to-cart="${product.id}" aria-controls="sideCart" aria-label="Add ${escapeHTML(product.name)} to cart" class="min-w-[44px] min-h-[44px] px-3 py-2 rounded-full border border-secondary flex items-center justify-center gap-1 text-secondary font-label-md text-xs hover:bg-secondary hover:text-white active:scale-95 transition-all shadow-xs">
                            <span class="material-symbols-outlined text-[18px]" data-icon="add" aria-hidden="true">add</span>
                            <span class="hidden sm:inline">Add</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    function renderCollectionProducts() {
        const productGrid = document.querySelector('#collection-product-grid');
        if (!productGrid) return;

        if (productGrid.children.length === 0) {
            productGrid.innerHTML = collectionProducts.map(getProductCardMarkup).join('');
        }
        applyImageFallbacks(productGrid);
        updateCategoryDescription('all');
        applyCollectionFilterFromUrl();
    }

    // Delegated document click handlers handle [data-add-to-cart] and [data-quick-look] across dynamic/filtered grids.
    function setupProductCardAddToCartTriggers() {}

    function applyImageFallbacks(root = document) {
        root.querySelectorAll('img[data-fallback-src]').forEach(img => {
            img.addEventListener('error', () => {
                if (img.dataset.fallbackApplied === 'true') return;
                img.dataset.fallbackApplied = 'true';
                const picture = img.closest('picture');
                if (picture) picture.querySelectorAll('source').forEach(source => source.remove());
                img.src = img.dataset.fallbackSrc || categoryFallbackImages.default;
            }, { once: true });
        });
    }

    function syncDynamicStructuredData(screenId = currentScreen) {
        const existing = document.getElementById(ROUTE_SCHEMA_ID);
        if (existing) existing.remove();

        let faqItems = [];

        if (screenId === 'screen-faq') {
            faqItems = Array.from(document.querySelectorAll('#screen-faq .faq-details')).map(details => {
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
        }

        const graph = getRouteSchemaGraph(screenId, { faqItems, products: collectionProducts });

        const script = document.createElement('script');
        script.id = ROUTE_SCHEMA_ID;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph
        });
        document.head.appendChild(script);
    }

    // ----------------------------------------------------
    initNavigationBindings();
    syncWhatsAppFloatVisibility(currentScreen);
    setupPolicyFooterLinks();
    hydrateExternalConversionLinks();
    setupProductCardAddToCartTriggers();
    applyCollectionFilterFromUrl();
    
    // Setup dynamic live listener on step-3 notes
    const notesInput = document.getElementById('custom-notes');
    if (notesInput) {
        notesInput.addEventListener('input', updateLivePreview);
    }

    // Two-way synchronization between drawer notes and standalone cart page notes
    document.addEventListener('input', (e) => {
        if (e.target.id === 'cart-customer-note' || e.target.id === 'cart-page-customer-note') {
            sharedCartNote = e.target.value;
            const otherId = e.target.id === 'cart-customer-note' ? 'cart-page-customer-note' : 'cart-customer-note';
            const otherEl = document.getElementById(otherId);
            if (otherEl && otherEl.value !== sharedCartNote) {
                otherEl.value = sharedCartNote;
            }
            saveCartToStorage();
        }
    });

    // Delegated click listener for all checkout buttons (drawer & standalone cart page) to proceed to WhatsApp
    document.addEventListener('click', (e) => {
        const checkoutTrigger = e.target.closest('.checkout-btn');
        if (!checkoutTrigger) return;
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

    // Render cart on startup to sync header badge and drawer state from localStorage
    renderCart();

    if (sharedCartNote) {
        const noteEl = document.getElementById('cart-customer-note');
        if (noteEl) noteEl.value = sharedCartNote;
        const pageNoteEl = document.getElementById('cart-page-customer-note');
        if (pageNoteEl) pageNoteEl.value = sharedCartNote;
    }

    // Only render full collection product grid if collection screen is active on load
    if (currentScreen === 'screen-collection') {
        renderCollectionProducts();
    }

    // Defer dynamic structured data syncing to idle time so it does not block main-thread FCP/TBT
    const scheduleIdleTask = window.requestIdleCallback || ((fn) => setTimeout(fn, 150));
    scheduleIdleTask(() => {
        syncDynamicStructuredData(getScreenIdFromPath(window.location.pathname) || currentScreen);
    });
});
