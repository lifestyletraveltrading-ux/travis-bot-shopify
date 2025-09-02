// Travis Bot with Enhanced Shopify Integration
class TravisBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    // Get Shopify data if available
    this.shopifyData = window.TravisData || {};
    // Product category synonyms
    this.productSynonyms = {
      'watch': ['watch', 'watches', 'wristwatch', 'timepiece', 'clock', 'smartwatch'],
      'luggage': ['luggage', 'suitcase', 'suitcases', 'travel bag', 'travel case', 'cover', 'covers'],
      'bag': ['bag', 'bags', 'handbag', 'handbags', 'tote', 'totes', 'backpack', 'backpacks', 'purse', 'purses', 'clutch', 'duffel'],
      'accessory': ['accessory', 'accessories', 'add-on', 'add-ons', 'addon', 'addons'],
      'jewelry': ['jewelry', 'jewellery', 'ring', 'rings', 'necklace', 'necklaces', 'bracelet', 'bracelets', 'earring', 'earrings'],
      'clothing': ['clothing', 'clothes', 'shirt', 'shirts', 'pants', 'dress', 'dresses', 'top', 'tops', 'bottom', 'bottoms', 'jacket', 'jackets', 'outfit', 'outfits'],
      'footwear': ['footwear', 'shoe', 'shoes', 'boot', 'boots', 'sandal', 'sandals', 'slipper', 'slippers', 'sneaker', 'sneakers']
    };
    // Collection discounts
    this.collectionDiscounts = {
      'new-arrivals': 10,
      'staff-picks': 20,
      'back-in-stock': 15,
      'on-sale': 25,
      'final-sale': 35
    };
    // Conversation context
    this.conversationContext = {
      lastTopic: null,
      lastCollection: null,
      lastProduct: null,
      awaitingConfirmation: false,
      confirmationType: null
    };
    this.exitIntentShown = false;
    this.init();
  }

  init() {
    console.log('Travis Bot initializing...');
    this.bindEvents();
    this.showWelcomeMessage();
    this.loadCustomerData();
    this.setupExitIntent();
    this.setupInactivityDetection();
  }

  loadCustomerData() {
    // Log data for debugging
    console.log('Shopify Data:', this.shopifyData);
    
    // Check if customer data exists
    if (this.shopifyData.customer && this.shopifyData.customer.firstName) {
      console.log('Customer found:', this.shopifyData.customer.firstName);
      
      // Update welcome message if customer is logged in
      const welcomeElement = document.getElementById('travis-welcome-message');
      if (welcomeElement) {
        if (this.shopifyData.customer.ordersCount > 0) {
          welcomeElement.textContent = `Hello ${this.shopifyData.customer.firstName}! Welcome back! I see you're one of our valued customers with ${this.shopifyData.customer.ordersCount} previous orders. How can I help you today?`;
        } else {
          welcomeElement.textContent = `Hi ${this.shopifyData.customer.firstName}! Welcome to our store! I'm here to help you find exactly what you're looking for.`;
        }
      }
    }
  }

  bindEvents() {
    const initialBtn = document.getElementById('travis-bot-initial');
    const minimizedBtn = document.getElementById('travis-bot-minimized');
    const closeBtn = document.getElementById('travis-bot-close');
    const closeInitialBtn = document.querySelector('.travis-bot-close-initial');
    const sendBtn = document.getElementById('travis-bot-send');
    const input = document.getElementById('travis-bot-input');

    if (initialBtn) {
      initialBtn.addEventListener('click', () => this.openChat());
    }

    if (minimizedBtn) {
      minimizedBtn.addEventListener('click', () => this.openChat());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeChat());
    }
    
    if (closeInitialBtn) {
      closeInitialBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the parent button click
        this.minimizeWidget();
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }

    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
    }
  }

  openChat() {
    const chat = document.getElementById('travis-bot-chat');
    const initialBtn = document.getElementById('travis-bot-initial');
    const minimizedBtn = document.getElementById('travis-bot-minimized');
    
    // Remove any speech bubbles
    const speechBubble = document.querySelector('.travis-speech-bubble');
    if (speechBubble) {
      speechBubble.remove();
    }
    
    if (chat) {
      chat.classList.remove('travis-bot-hidden');
    }
    
    if (initialBtn) {
      initialBtn.classList.add('travis-bot-hidden');
    }
    
    if (minimizedBtn) {
      minimizedBtn.classList.add('travis-bot-hidden');
    }
    
    this.isOpen = true;
    document.getElementById('travis-bot-input')?.focus();
  }

  closeChat() {
    const chat = document.getElementById('travis-bot-chat');
    const minimizedBtn = document.getElementById('travis-bot-minimized');
    
    if (chat) {
      chat.classList.add('travis-bot-hidden');
    }
    
    if (minimizedBtn) {
      minimizedBtn.classList.remove('travis-bot-hidden');
    }
    
    this.isOpen = false;
  }

  minimizeWidget() {
    const initialBtn = document.getElementById('travis-bot-initial');
    const minimizedBtn = document.getElementById('travis-bot-minimized');
    const chat = document.getElementById('travis-bot-chat');
    
    // Remove any speech bubbles
    const speechBubble = document.querySelector('.travis-speech-bubble');
    if (speechBubble) {
      speechBubble.remove();
    }
    
    if (initialBtn) {
      initialBtn.classList.add('travis-bot-hidden');
    }
    
    if (minimizedBtn) {
      minimizedBtn.classList.remove('travis-bot-hidden');
    }
    
    if (chat) {
      chat.classList.add('travis-bot-hidden');
    }
    
    this.isOpen = false;
  }

  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }

  sendMessage() {
    const input = document.getElementById('travis-bot-input');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    this.showTyping();

    // Generate response
    setTimeout(() => {
      this.hideTyping();
      this.generateResponse(message);
    }, 1000 + Math.random() * 2000);
  }

  addMessage(content, type) {
    const messagesContainer = document.getElementById('travis-bot-messages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `travis-bot-message travis-bot-message--${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'travis-bot-message-content';
    
    // Support HTML content for rich responses
    if (type === 'bot' && content.includes('<')) {
      contentDiv.innerHTML = content;
    } else {
      contentDiv.textContent = content;
    }
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  showTyping() {
    const messagesContainer = document.getElementById('travis-bot-messages');
    if (!messagesContainer) return;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'travis-bot-message travis-bot-message--bot';
    typingDiv.id = 'travis-typing-indicator';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'travis-bot-typing';
    typingContent.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(typingContent);
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTyping() {
    const typingIndicator = document.getElementById('travis-typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    let response = '';

    // Check for confirmation responses first
    if (this.conversationContext.awaitingConfirmation) {
      if (this.isAffirmative(message)) {
        response = this.handleConfirmation();
      } else if (this.isNegative(message)) {
        response = this.handleRejection();
      } else {
        // If the response is neither yes nor no, fall back to regular processing
        this.conversationContext.awaitingConfirmation = false;
      }
    }

    // If we haven't generated a response from confirmation handling
    if (!response) {
      // New arrivals / new products query
      if (message.includes('new arrival') || message.includes('new product') || 
          (message.includes('new') && (message.includes('item') || message.includes('collection')))) {
        response = this.handleNewArrivalsQuery();
      }
      // Smart product search
      else if (this.isProductSearch(message)) {
        response = this.handleSmartProductSearch(message);
      }
      // Sale items query
      else if (message.includes('sale') || message.includes('discount') || message.includes('deal') || 
               message.includes('on sale') || message.includes('special')) {
        response = this.handleSaleItemsQuery();
      }
      // Order tracking with specific order number
      else if ((message.includes('track') || message.includes('where')) && 
               (message.includes('order') || message.match(/\b\d{4,}\b/))) {
        response = this.handleOrderTracking(message);
      }
      // Shipping queries
      else if (message.includes('shipping') || message.includes('delivery')) {
        response = "We offer several shipping options:\n\n• Free shipping on orders over $50\n• Standard shipping: 3-5 business days\n• Express shipping: 1-2 business days\n\nShipping costs are calculated at checkout based on your location.";
      }
      // Greeting
      else if (message.includes('hello') || message.includes('hi ') || message === 'hi') {
        const customer = this.shopifyData.customer;
        if (customer && customer.firstName) {
          response = `Hello ${customer.firstName}! How can I help you today?`;
        } else {
          response = "Hello! How can I help you today?";
        }
      }
      // Product queries
      else if (message.includes('product') || message.includes('item') || message.includes('show me')) {
        const featuredProducts = this.shopifyData.featuredProducts || [];
        if (featuredProducts.length > 0) {
          response = "Here are some of our popular products:\n\n";
          featuredProducts.slice(0, 3).forEach(product => {
            response += `• <strong>${product.title}</strong> - $${product.price}\n`;
          });
          response += "\nWould you like to know more about any of these?";
        } else {
          response = "I'd be happy to help you find products! What type of item are you looking for?";
        }
      }
      // Cart queries
      else if (message.includes('cart') || message.includes('checkout')) {
        const cart = this.shopifyData.cart;
        if (cart && cart.itemCount > 0) {
          response = `You have ${cart.itemCount} item(s) in your cart with a total of $${cart.totalPrice}. Ready to checkout or need help with anything else?`;
        } else {
          response = "Your cart is currently empty. Would you like me to help you find some great products to add?";
        }
      }
      // Collection queries
      else if (message.includes('collection') || message.includes('category')) {
        const collections = this.shopifyData.collections || [];
        if (collections.length > 0) {
          response = "Here are our popular collections:\n\n";
          collections.slice(0, 5).forEach(collection => {
            response += `• <strong>${collection.title}</strong> (${collection.productsCount} items)\n`;
          });
          response += "\nWhich collection interests you most?";
        } else {
          response = "We have many great collections! What type of products are you interested in browsing?";
        }
      }
      // Return/refund queries
      else if (message.includes('return') || message.includes('refund')) {
        response = "Our return policy:\n\n• 30-day return window\n• Items must be in original condition\n• Free returns on defective items\n• Return shipping may apply for exchanges\n\nWould you like help starting a return?";
      }
            // Thank you responses
      else if (message.includes('thank')) {
        response = "You're very welcome! I'm here whenever you need assistance. Happy shopping! 😊";
      }
      // Default response
      else {
        const responses = [
          "That's a great question! Let me help you with that. Can you tell me more about what you're looking for?",
          "I'd be happy to assist you! Could you provide a bit more detail so I can give you the best answer?",
          "Thanks for reaching out! I'm here to make your shopping experience amazing. What can I help you find?",
          "I want to make sure I give you the perfect answer. Could you tell me more about what you need?",
          "Great question! I'm here to help with anything related to our products, shipping, returns, or finding the perfect item for you."
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }
    }

    this.addMessage(response, 'bot');
  }

  isAffirmative(message) {
    const affirmativeResponses = ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'definitely', 'absolutely', 'of course', 'please', 'yup'];
    return affirmativeResponses.some(word => message.includes(word));
  }

  isNegative(message) {
    const negativeResponses = ['no', 'nope', 'nah', 'not', 'don\'t', 'dont', 'never', 'pass'];
    return negativeResponses.some(word => message.includes(word));
  }

  handleConfirmation() {
    let response = '';
    
    switch (this.conversationContext.confirmationType) {
      case 'new-arrivals':
        response = `Great! <a href="/collections/new-arrivals" target="_blank">Click here to see our New Arrivals collection</a>. You'll find our latest products with a 10% discount. Is there anything specific you're looking for?`;
        break;
      case 'staff-picks':
        response = `Perfect! <a href="/collections/staff-picks" target="_blank">Click here to see our Staff Picks collection</a>. These are our team's favorite items with a 20% discount. Enjoy browsing!`;
        break;
      case 'back-in-stock':
        response = `Excellent! <a href="/collections/back-in-stock" target="_blank">Click here to see our Back in Stock collection</a>. These popular items are now available again with a 15% discount.`;
        break;
      case 'on-sale':
        response = `Great choice! <a href="/collections/on-sale" target="_blank">Click here to see our On Sale collection</a>. You'll find items with a 25% discount. Happy shopping!`;
        break;
      case 'final-sale':
        response = `Perfect! <a href="/collections/final-sale" target="_blank">Click here to see our Final Sale collection</a>. These items are being discontinued and have a 35% discount. Don't miss out!`;
        break;
      default:
        response = "Great! Is there anything else I can help you with today?";
    }
    
    // Reset confirmation context
    this.conversationContext.awaitingConfirmation = false;
    this.conversationContext.confirmationType = null;
    
    return response;
  }

  handleRejection() {
    let response = '';
    
    switch (this.conversationContext.confirmationType) {
      case 'new-arrivals':
      case 'staff-picks':
      case 'back-in-stock':
      case 'on-sale':
      case 'final-sale':
        response = "No problem! Is there something else you'd like to see? I can show you our popular products or help you find something specific.";
        break;
      default:
        response = "Alright! Is there something else I can help you with today?";
    }
    
    // Reset confirmation context
    this.conversationContext.awaitingConfirmation = false;
    this.conversationContext.confirmationType = null;
    
    return response;
  }

  findCollection(namePattern) {
    const collections = this.shopifyData.collections || [];
    return collections.find(collection => {
      const title = collection.title.toLowerCase();
      const handle = collection.handle.toLowerCase();
      return title.includes(namePattern) || handle.includes(namePattern);
    });
  }

  getCollectionUrl(collection) {
    if (!collection) return '';
    return `/collections/${collection.handle}`;
  }

  getCollectionDiscount(collection) {
    if (!collection) return 0;
    
    const handle = collection.handle.toLowerCase();
    
    // Check for exact matches first
    if (this.collectionDiscounts[handle]) {
      return this.collectionDiscounts[handle];
    }
    
    // Check for partial matches
    for (const [key, discount] of Object.entries(this.collectionDiscounts)) {
      if (handle.includes(key)) {
        return discount;
      }
    }
    
    return 0;
  }

  handleNewArrivalsQuery() {
    // Set conversation context
    this.conversationContext.lastTopic = 'new-arrivals';
    this.conversationContext.lastCollection = 'new-arrivals';
    this.conversationContext.awaitingConfirmation = true;
    this.conversationContext.confirmationType = 'new-arrivals';
    
    // Hardcoded response for new products question
    return "Yes, our new products are in our New Arrivals collection and they also have 10% off. Shall I take you there?";
  }

  isProductSearch(message) {
    // Check if this is a product search query
    const productTypes = [];
    
    // Add all product synonyms to the search list
    for (const [category, synonyms] of Object.entries(this.productSynonyms)) {
      productTypes.push(...synonyms);
    }
    
    const colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'pink', 'orange', 'brown', 'grey', 'gray', 'silver', 'gold'];
    
    // Check for price constraints
    const hasPriceConstraint = message.includes('under') || message.includes('less than') || 
                              message.includes('cheaper than') || message.includes('below');
    
    // Check for product type
    let hasProductType = false;
    for (const type of productTypes) {
      if (message.includes(type)) {
        hasProductType = true;
        break;
      }
    }
    
    // Check for color
    let hasColor = false;
    for (const color of colors) {
      if (message.includes(color)) {
        hasColor = true;
        break;
      }
    }
    
    // Check for "show me" or "find" phrases
    const hasSearchPhrase = message.includes('show me') || message.includes('find') || 
                           message.includes('looking for') || message.includes('search for');
    
    // Return true if this seems like a product search
    return (hasProductType && (hasColor || hasPriceConstraint || hasSearchPhrase)) || 
           (hasSearchPhrase && (hasProductType || hasColor));
  }

  handleSmartProductSearch(message) {
    // Extract product type
    let searchType = '';
    let searchCategory = '';
    
    // Check each category and its synonyms
    for (const [category, synonyms] of Object.entries(this.productSynonyms)) {
      for (const synonym of synonyms) {
        if (message.includes(synonym)) {
          searchType = synonym;
          searchCategory = category;
          break;
        }
      }
      if (searchType) break;
    }
    
    // Extract colors
    const colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'pink', 'orange', 'brown', 'grey', 'gray', 'silver', 'gold'];
    
    // Extract price constraint
    let priceLimit = 1000; // Default high value
    if (message.includes('under') || message.includes('less than')) {
      const priceMatch = message.match(/\$?(\d+)/);
      if (priceMatch && priceMatch[1]) {
        priceLimit = parseInt(priceMatch[1]);
      }
    }
    
    // Determine color
    let searchColor = '';
    for (const color of colors) {
      if (message.includes(color)) {
        searchColor = color;
        break;
      }
    }
    
    // Get featured products
    const featuredProducts = this.shopifyData.featuredProducts || [];
    
    // Filter products based on search criteria
    let matchingProducts = featuredProducts;
    
    // Filter by type if specified
    if (searchType) {
      matchingProducts = matchingProducts.filter(product => {
        const title = product.title.toLowerCase();
        const type = product.type?.toLowerCase() || '';
        const tags = product.tags || [];
        
        // Check if product matches the type or any of its synonyms
        return title.includes(searchType) || 
               type.includes(searchType) || 
               tags.some(tag => tag.toLowerCase().includes(searchType));
      });
    }
    
    // Filter by color if specified
    if (searchColor) {
      matchingProducts = matchingProducts.filter(product => {
        const title = product.title.toLowerCase();
        const tags = product.tags || [];
        
        // Check if product matches the color
        return title.includes(searchColor) || 
               tags.some(tag => tag.toLowerCase().includes(searchColor));
      });
    }
    
    // Filter by price
    matchingProducts = matchingProducts.filter(product => {
      return parseFloat(product.price) <= priceLimit;
    });
    
    // Generate response
    if (matchingProducts.length > 0) {
      // Format the search type for display (plural form for multiple items)
      let displayType = '';
      
      if (searchCategory === 'watch' && matchingProducts.length > 1) {
        displayType = 'watches';
      } else if (searchCategory === 'accessory' && matchingProducts.length > 1) {
        displayType = 'accessories';
      } else if (searchType.endsWith('s') || matchingProducts.length <= 1) {
        displayType = searchType;
      } else {
        // Add 's' to make plural
        displayType = searchType + 's';
      }
      
      let response = `Here are some ${searchColor || ''} ${displayType}${priceLimit < 1000 ? ` under $${priceLimit}` : ''}:\n\n`;
      
      matchingProducts.slice(0, 3).forEach(product => {
        response += `• <strong><a href="/products/${product.handle}" target="_blank">${product.title}</a></strong> - $${product.price}\n`;
      });
      
      if (matchingProducts.length > 3) {
        response += `\n...and ${matchingProducts.length - 3} more items.`;
      }
      
      response += "\nWould you like to see more details about any of these?";
      return response;
    } else {
      // No matching products
      // Format the search type for display (plural form for multiple items)
      let displayType = '';
      
      if (searchCategory === 'watch') {
        displayType = 'watches';
      } else if (searchCategory === 'accessory') {
        displayType = 'accessories';
      } else if (searchType.endsWith('s')) {
        displayType = searchType;
      } else {
        // Add 's' to make plural
        displayType = searchType + 's';
      }
      
      return `I couldn't find any ${searchColor || ''} ${displayType}${priceLimit < 1000 ? ` under $${priceLimit}` : ''}. Would you like to see our featured products instead?`;
    }
  }

  handleSaleItemsQuery() {
    // Find sale collections
    const onSaleCollection = this.findCollection('on-sale');
    const finalSaleCollection = this.findCollection('final-sale');
    
    // Get featured products
    const featuredProducts = this.shopifyData.featuredProducts || [];
    
    // Find products on sale (with compare_at_price higher than price)
    const saleProducts = featuredProducts.filter(product => {
      return product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price);
    });
    
    if (saleProducts.length > 0) {
      let response = "Here are some of our items currently on sale:\n\n";
      
      saleProducts.slice(0, 3).forEach(product => {
        const discount = Math.round((parseFloat(product.comparePrice) - parseFloat(product.price)) / parseFloat(product.comparePrice) * 100);
        response += `• <strong><a href="/products/${product.handle}" target="_blank">${product.title}</a></strong> - $${product.price} <strike>$${product.comparePrice}</strike> (${discount}% off)\n`;
      });
      
      if (saleProducts.length > 3) {
        response += `\n...and ${saleProducts.length - 3} more sale items.`;
      }
      
      // Also mention sale collections
      if (onSaleCollection || finalSaleCollection) {
        response += "\n\nWe also have special sale collections:";
        
        if (onSaleCollection) {
          const discount = this.getCollectionDiscount(onSaleCollection);
          const url = this.getCollectionUrl(onSaleCollection);
          response += `\n• <strong><a href="${url}" target="_blank">On Sale Now</a></strong>: ${discount}% off selected items`;
        }
        
        if (finalSaleCollection) {
          const discount = this.getCollectionDiscount(finalSaleCollection);
          const url = this.getCollectionUrl(finalSaleCollection);
          response += `\n• <strong><a href="${url}" target="_blank">Final Sale</a></strong>: ${discount}% off items being discontinued`;
        }
      }
      
      response += "\n\nWould you like to see more sale items?";
      return response;
    } else if (onSaleCollection || finalSaleCollection) {
      let response = "We have special sale collections with great discounts:\n\n";
      
      if (onSaleCollection) {
        const discount = this.getCollectionDiscount(onSaleCollection);
        const url = this.getCollectionUrl(onSaleCollection);
        response += `• <strong><a href="${url}" target="_blank">On Sale Now</a></strong>: ${discount}% off selected items (${onSaleCollection.productsCount} products)\n`;
      }
      
      if (finalSaleCollection) {
        const discount = this.getCollectionDiscount(finalSaleCollection);
        const url = this.getCollectionUrl(finalSaleCollection);
        response += `• <strong><a href="${url}" target="_blank">Final Sale</a></strong>: ${discount}% off items being discontinued (${finalSaleCollection.productsCount} products)\n`;
      }
      
      response += "\nWhich sale collection would you like to explore?";
      return response;
    } else {
      // No sale products found
      return "We don't have any items on sale right now, but we regularly update our promotions! Would you like to see our featured products instead?";
    }
  }

  handleOrderTracking(message) {
    const customer = this.shopifyData.customer;
    
    // Check if there's an order number in the message
    const orderNumberMatch = message.match(/\b(\d{4,})\b/);
    const orderNumber = orderNumberMatch ? orderNumberMatch[1] : null;
    
    if (orderNumber) {
      // Create tracking link with order number
      const trackingUrl = `https://lifestyletraveltrading.com.au/apps/parcelpanel?order_number=${orderNumber}`;
      
      // If customer is logged in, we can assume we have their email
      if (customer && customer.email) {
        const trackingUrlWithEmail = `${trackingUrl}&email=${encodeURIComponent(customer.email)}`;
        return `I can help you track order #${orderNumber}. <a href="${trackingUrlWithEmail}" target="_blank">Click here to open the tracking page</a> for this order. The page will open in a new tab with your order details.`;
      } else {
        // If no customer email, provide link but may need email
        return `I can help you track order #${orderNumber}. <a href="${trackingUrl}" target="_blank">Click here to open the tracking page</a>. You'll need to enter the email address used for this order.`;
      }
    } else if (customer && customer.id) {
      return `Hi ${customer.firstName}! I can help you track your orders. You've placed ${customer.ordersCount} orders with us. To track a specific order, please provide the order number (e.g., "track order 1234"). Or you can <a href="https://lifestyletraveltrading.com.au/account" target="_blank">visit your account page</a> to see all your orders.`;
    } else {
      return "To track your order, please provide your order number (e.g., 'track order 1234'). I'll need both your order number and the email address used for the purchase.";
    }
  }

  showWelcomeMessage() {
    setTimeout(() => {
      const container = document.getElementById('travis-bot-container');
      if (container) {
        container.classList.remove('travis-bot-hidden');
      }
      
      // After 5 seconds, show the initial concierge image if the chat isn't open
      setTimeout(() => {
        if (!this.isOpen) {
          // Show contextual message based on page type
          this.showContextualMessage();
        }
      }, 5000); // 5 seconds delay
    }, 1000);
  }

  showContextualMessage() {
    const pageContext = this.shopifyData.pageContext || {};
    
    // Don't show contextual message if chat is already open
    if (this.isOpen) return;
    
    // Check page type and show appropriate message
    switch(pageContext.type) {
      case 'product':
        this.showProductContextMessage(pageContext.product);
        break;
      case 'collection':
        this.showCollectionContextMessage(pageContext.collection);
        break;
      case 'cart':
        this.showCartContextMessage();
        break;
      case 'search':
        this.showSearchContextMessage(pageContext.searchTerms, pageContext.resultsCount);
        break;
      default:
        // Show the initial concierge image for other pages
        const initialBtn = document.getElementById('travis-bot-initial');
        if (initialBtn) {
          initialBtn.classList.remove('travis-bot-hidden');
        }
    }
  }

  showProductContextMessage(product) {
    if (!product) return;
    
    // Create a contextual message for the product page
    const message = `I see you're looking at ${product.title}. Can I help answer any questions about this product?`;
    
    // Show the initial concierge image with a speech bubble
    this.showProactiveMessage(message);
  }

  showCollectionContextMessage(collection) {
    if (!collection) return;
    
    // Create a contextual message for the collection page
    const message = `Looking for something specific in our ${collection.title} collection? I can help you find the perfect item!`;
    
    // Show the initial concierge image with a speech bubble
    this.showProactiveMessage(message);
  }

  showCartContextMessage() {
    const cart = this.shopifyData.cart;
    
    if (!cart || cart.itemCount === 0) {
      // Empty cart
      this.showProactiveMessage("Your cart is empty. Can I help you find something you'll love?");
    } else {
      // Cart has items
      this.showProactiveMessage("Need any help with your cart or finding additional items?");
    }
  }

  showSearchContextMessage(searchTerms, resultsCount) {
    if (!searchTerms) return;
    
    if (resultsCount > 0) {
      this.showProactiveMessage(`I see you're searching for "${searchTerms}". Can I help you narrow down these ${resultsCount} results?`);
    } else {
      this.showProactiveMessage(`I notice you searched for "${searchTerms}" but we couldn't find any matches. Can I help you find something similar?`);
    }
  }

  showProactiveMessage(message) {
    // Show the initial concierge image if not already visible
    const initialBtn = document.getElementById('travis-bot-initial');
    if (initialBtn) {
      initialBtn.classList.remove('travis-bot-hidden');
      
      // Create speech bubble element
      const speechBubble = document.createElement('div');
      speechBubble.className = 'travis-speech-bubble';
      speechBubble.textContent = message;
      
      // Add close button to speech bubble
      const closeBubble = document.createElement('span');
      closeBubble.className = 'travis-close-bubble';
      closeBubble.innerHTML = '×';
      closeBubble.addEventListener('click', (e) => {
        e.stopPropagation();
        speechBubble.remove();
      });
      
      speechBubble.appendChild(closeBubble);
      
      // Add the speech bubble to the page
      document.getElementById('travis-bot-container').appendChild(speechBubble);
      
      // Make the entire speech bubble clickable to open chat
      speechBubble.addEventListener('click', () => {
        speechBubble.remove();
        this.openChat();
      });
    }
  }

  setupExitIntent() {
    // Only on desktop (not mobile)
    if (window.innerWidth > 768) {
      document.addEventListener('mouseleave', (e) => {
        // If mouse leaves through the top of the page
        if (e.clientY <= 0 && !this.isOpen && !this.exitIntentShown) {
          this.showProactiveMessage("Wait! Before you go, can I help you find what you're looking for?");
          this.exitIntentShown = true;
        }
      });
    }
  }

  setupInactivityDetection() {
    let inactivityTimer;
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!this.isOpen && !document.querySelector('.travis-speech-bubble')) {
          this.showProactiveMessage("Still browsing? I'm here if you need any assistance!");
        }
      }, 60000); // 60 seconds of inactivity
    };
    
    // Reset timer on user activity
    ['mousemove', 'keypress', 'scroll', 'click', 'touchstart'].forEach(event => {
      document.addEventListener(event, resetTimer);
    });
    
    // Start the timer
    resetTimer();
  }
}

// Initialize Travis Bot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, starting Travis Bot...');
  new TravisBot();
});

