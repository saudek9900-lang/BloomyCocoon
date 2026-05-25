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

    // Cart state
    let cart = [];

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
        const cleanHash = hash.replace(/^#/, '');
        if (cleanHash === '' || cleanHash === '/' || cleanHash === '/home' || cleanHash === 'home') return 'screen-home';
        if (cleanHash === '/collection' || cleanHash === 'collection') return 'screen-collection';
        if (cleanHash === '/custom' || cleanHash === 'custom' || cleanHash === 'custom-orders') return 'screen-custom-orders';
        if (cleanHash === '/about' || cleanHash === 'about') return 'screen-about';
        if (cleanHash === '/faq' || cleanHash === 'faq') return 'screen-faq';
        if (cleanHash === '/contact' || cleanHash === 'contact') return 'screen-contact';
        return 'screen-home';
    }

    const screenTitles = {
        'screen-home': 'BloomyCocoon | Handcrafted Crochet Gifts',
        'screen-collection': 'BloomyCocoon | The Collection - Handcrafted Crochet Gifts',
        'screen-about': 'BloomyCocoon | About Us - Story & Hand-Stitched Art',
        'screen-faq': 'BloomyCocoon | FAQ - Common Questions',
        'screen-contact': 'BloomyCocoon | Contact Us - Get in Touch',
        'screen-custom-orders': 'BloomyCocoon | Custom Bespoke Crochet Orders'
    };

    const screenDescriptions = {
        'screen-home': 'All pieces are slowly and lovingly hand-stitched by sisters from their home in Mampad, Malappuram, Kerala. Discover our signature crochet bouquets, plushies, and custom bespoke gifts.',
        'screen-collection': 'Explore the signature collection of BloomyCocoon, slowly handcrafted in Malappuram, Kerala. Browse our everlasting crochet bouquets, plushies, and accessories.',
        'screen-about': 'Learn the story of BloomyCocoon, run by sisters from their home in Mampad, Kerala. Discover our dedication to slow living, premium milk cotton, and intentional gifting.',
        'screen-faq': 'Find answers to common questions about ordering, caring for crochet items, shipping, packaging, and custom designs at BloomyCocoon.',
        'screen-contact': 'Get in touch with BloomyCocoon. Contact the sisters at their home-based crochet workspace in Mampad, Malappuram, Kerala, India for custom orders or questions.',
        'screen-custom-orders': 'Order custom bespoke crochet gifts handcrafted by sisters at their home in Mampad, Kerala. Select your preferred item type, and let us stitch your vision.'
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

            // Sync the URL hash programmatically if not driven by hashchange event
            if (!isRoutingFromHash) {
                const targetHash = screenHashMapping[targetScreenId] || '#/';
                if (window.location.hash !== targetHash) {
                    window.location.hash = targetHash;
                }
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
                navigateTo(targetScreen, transition);
            });
        });
    }

    // Bindings matching the Navigation Specification EXACTLY
    function initNavigationBindings() {
        // Logo links go Home with push_back
        bindNav('.nav-logo, header div.font-display-lg-mobile a, nav div.font-display-lg-mobile a, nav a:contains("BloomyCocoon")', 'screen-home', 'push_back');
        
        // Ensure manual binders for logos because exact selectors are nested
        document.querySelectorAll('a, div').forEach(el => {
            const text = el.innerText.trim();
            if (text === 'BloomyCocoon') {
                el.style.cursor = 'pointer';
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentScreen !== 'screen-home') {
                        navigateTo('screen-home', 'push_back');
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
        }
    };

    // Auto-close mobile menu on any link click
    document.addEventListener('click', (e) => {
        if (e.target.closest('#mobile-menu a') || e.target.closest('nav a')) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        }
    });

    window.addToCart = function(id, name, price, img) {
        const parsedPrice = parseFloat(price);
        const existing = cart.find(item => item.id === id);
        
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ id, name, price: parsedPrice, img, qty: 1 });
        }
        
        renderCart();
        showToast(`Stitched "${name}" into your Cocoon!`);
        
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
        let subtotal = 0;

        cart.forEach(item => {
            totalQty += item.qty;
            subtotal += item.price * item.qty;
        });

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
            el.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
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
                    html += `
                        <div class="flex items-center gap-4 bg-surface-container-lowest p-sm rounded-xl border border-outline-variant/15 soft-glow">
                            <img src="${item.img}" alt="${item.name}" class="w-14 h-14 object-cover rounded-lg">
                            <div class="flex-1">
                                <h4 class="font-label-md text-sm text-secondary truncate">${item.name}</h4>
                                <p class="text-caption text-on-surface-variant font-bold">₹${item.price.toLocaleString('en-IN')}</p>
                                <div class="flex items-center gap-2 mt-xs">
                                    <button onclick="updateQty('${item.id}', -1)" class="w-6 h-6 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-xs hover:bg-secondary-container transition-colors">-</button>
                                    <span class="font-body-md text-xs font-bold px-1">${item.qty}</span>
                                    <button onclick="updateQty('${item.id}', 1)" class="w-6 h-6 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-xs hover:bg-secondary-container transition-colors">+</button>
                                </div>
                            </div>
                            <button onclick="removeFromCart('${item.id}')" class="text-outline-variant hover:text-error transition-colors p-1">
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

    // Add buttons dynamically across standard page additions
    function setupProductCardAddToCartTriggers() {
        // Setup signature buttons
        document.querySelectorAll('.group.cursor-pointer, .product-card').forEach((card, index) => {
            const addBtn = card.querySelector('button');
            if (addBtn) {
                const titleEl = card.querySelector('h3');
                const priceEl = card.querySelector('span.text-secondary.font-bold, span.font-body-md.text-on-surface-variant');
                const imgEl = card.querySelector('img');

                if (titleEl && priceEl && imgEl) {
                    const id = `item-${index}`;
                    const name = titleEl.innerText;
                    const price = priceEl.innerText.replace(/[₹$,]/g, '').trim().split(/[—–-]/)[0].trim();
                    const img = imgEl.src;

                    addBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        addToCart(id, name, price, img);
                    });
                }
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

        // Perform final animation submit
        const stepCard = document.getElementById(`step-card-${orderStep}`);
        const successCard = document.getElementById('custom-order-success');
        
        if (stepCard && successCard) {
            stepCard.classList.add('hidden');
            successCard.classList.remove('hidden');
            
            // Re-render final custom details
            document.getElementById('final-type').innerText = orderData.type;
            
            showToast("✨ Custom order request submitted!");
            
            // Construct a beautiful WhatsApp message
            let message = "Hello BloomyCocoon! 🌸 I would like to place a custom bespoke order with the following specifications:\n\n";
            message += `🧶 *Base Type:* ${orderData.type}\n`;
            message += `📝 *Personalization/Notes:* ${orderData.notes || "None specified."}\n\n`;
            message += `👤 *Customer Name:* ${orderData.name}\n\n`;
            message += "Can we please discuss the creation timeline and secure payment details? Thank you! ✨";

            // Try to copy to clipboard for redundancy
            navigator.clipboard.writeText(message).then(() => {
                showToast("📋 Custom details copied! Redirecting to WhatsApp...");
            }).catch(err => {
                console.error("Could not copy details", err);
            });

            // Redirect to WhatsApp after a tiny delay so they see the success state
            setTimeout(() => {
                window.open("https://wa.me/qr/FPRYIK4LQREII1", "_blank");
            }, 1800);
            
            // Clean state
            cart = [];
            renderCart();
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
    window.filterCollectionCategory = function(category, buttonEl) {
        // Toggle selected styling
        const filterSection = buttonEl.parentElement;
        filterSection.querySelectorAll('button').forEach(btn => {
            btn.className = "whitespace-nowrap px-6 py-2 rounded-full hover:bg-secondary/10 transition-colors font-label-md bg-primary-container text-on-primary-container";
        });
        buttonEl.className = "whitespace-nowrap px-6 py-2 rounded-full font-label-md bg-secondary text-on-secondary shadow-sm";

        // Filter products in grid
        const productGrid = document.querySelector('#screen-collection .grid');
        if (!productGrid) return;

        const productCards = productGrid.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
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
        showToast("✉️ Message successfully dispatched!");
    };

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

    // ----------------------------------------------------
    // 8. BOOTSTRAP INITIALIZATION
    // ----------------------------------------------------
    initNavigationBindings();
    setupProductCardAddToCartTriggers();
    
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
                showToast("Your basket is empty.");
                return;
            }

            // Construct a beautiful message
            let message = "Hello BloomyCocoon! 🌸 I would like to place an order for the following handmade crochet items:\n\n";
            let total = 0;
            cart.forEach(item => {
                message += `🧶 *${item.name}* (Qty: ${item.qty}) - ₹${(item.price * item.qty).toLocaleString('en-IN')}\n`;
                total += item.price * item.qty;
            });
            message += `\n💰 *Total Value:* ₹${total.toLocaleString('en-IN')}\n\nCan we please discuss the color preferences and customization details? Thank you! ✨`;

            // Try to copy to clipboard
            navigator.clipboard.writeText(message).then(() => {
                showToast("📋 Order copied! Paste it in the WhatsApp chat.");
            }).catch(err => {
                console.error("Could not copy order details", err);
            });

            // Open WhatsApp
            window.open("https://wa.me/qr/FPRYIK4LQREII1", "_blank");
        });
    });
});
