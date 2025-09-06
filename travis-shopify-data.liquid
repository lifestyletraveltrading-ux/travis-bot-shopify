// Travis Bot with Enhanced Shopify Integration
class TravisBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.lastQuestion = null;
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
    };  // Conversational patterns for more natural interactions
  this.conversationalPatterns = {
    greetings: [
      'hello', 'hi', 'hey', 'howdy', 'good morning', 'good afternoon', 'good evening', 
      'greetings', 'sup', 'what\'s up', 'hiya', 'yo', 'hola', 'bonjour', 'g\'day'
    ],
    wellbeing: [
      'how are you', 'how\'s it going', 'how are things', 'how have you been', 
      'how\'s your day', 'how are you doing', 'how do you do', 'how\'s life',
      'are you well', 'you good', 'you ok', 'you alright', 'you doing ok'
    ],
    thanks: [
      'thank', 'thanks', 'appreciate', 'grateful', 'cheers', 'ta', 'merci'
    ],
    goodbye: [
      'bye', 'goodbye', 'see you', 'later', 'farewell', 'adios', 'ciao', 'cheerio',
      'take care', 'have a good day', 'have a nice day'
    ],
    affirmative: [
      'yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'definitely', 'absolutely', 
      'of course', 'please', 'yup', 'indeed', 'certainly', 'right', 'correct',
      'agreed', 'alright', 'fine', 'good', 'great', 'perfect', 'true'
    ],
    negative: [
      'no', 'nope', 'nah', 'not', 'don\'t', 'dont', 'never', 'pass', 
      'not right now', 'not now', 'maybe later', 'negative', 'disagree',
      'incorrect', 'wrong', 'false', 'nein', 'no way', 'no thanks'
    ]
  };

  // Spelling variants for US/UK English
  this.spellingVariants = {
    'color': ['colour'],
    'jewelry': ['jewellery'],
    'center': ['centre'],
    'favorite': ['favourite'],
    'gray': ['grey'],
    'pajamas': ['pyjamas'],
    'catalog': ['catalogue'],
    'check': ['cheque'],
    'program': ['programme'],
    'tire': ['tyre'],
    'aluminum': ['aluminium'],
    'meter': ['metre'],
    'fiber': ['fibre'],
    'license': ['licence'],
    'defense': ['defence'],
    'customize': ['customise'],
    'organize': ['organise']
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
      confirmationType: null,
      currentProduct: null,
      currentCollection: null
    };
    this.exitIntentShown = false;
    this.init();
  }

  init() {
    console.log('Travis Bot initializing...');
    this.bindEvents();
    this.showWelcomeMessage();
    this.loadCustomerData();
    this.loadPageContext();
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

  loadPageContext() {
    // Store current page context for reference in conversations
    const pageContext = this.shopifyData.pageContext || {};
    
    if (pageContext.type === 'product' && pageContext.product) {
      this.conversationContext.currentProduct = pageContext.product;
      console.log('Current product context:', this.conversationContext.currentProduct);
    }
    
    if (pageContext.type === 'collection' && pageContext.collection) {
      this.conversationContext.currentCollection = pageContext.collection;
      console.log('Current collection context:', this.conversationContext.currentCollection);
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
  openChat(contextMessage) {
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
    
    // If opening from a context message, add it to the conversation
    if (contextMessage) {
      // Add a slight delay to make it feel more natural
      setTimeout(() => {
        this.addMessage(contextMessage, 'bot');
      }, 500);
    }
    
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
    
    // Save message to history
    this.messages.push({ content, type });
    
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
  const originalMessage = userMessage;
  const message = this.normalizeMessage(userMessage);
  let response = '';

  // Check for conversation starters first
  if (this.isGreeting(message)) {
    const customer = this.shopifyData.customer;
    if (customer && customer.firstName) {
      response = `Hello ${customer.firstName}! How can I help you today?`;
    } else {
      response = "Hello! How can I help you today?";
    }
  }
  else if (this.isWellbeingQuestion(message)) {
    const customer = this.shopifyData.customer;
    if (customer && customer.firstName) {
      response = `I'm very well, thank you ${customer.firstName}! Thanks for asking. How can I help you today?`;
    } else {
      response = "I'm very well, thank you! Thanks for asking. How can I help you today?";
    }
  }
  else if (this.isThanking(message)) {
    response = "You're very welcome! I'm here whenever you need assistance. Happy shopping! 😊";
  }
  else if (this.isGoodbye(message)) {
    response = "Thank you for chatting with me today! If you need anything else, I'll be here. Have a wonderful day!";
  }
  // Check for confirmation responses
  else if (this.conversationContext.awaitingConfirmation) {
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
      // Check for "yes" to "see more options" question
      if (message === 'yes' && this.lastQuestion && this.lastQuestion.includes('more options')) {
        response = this.handleShowMoreProducts();
      }
      // Check for product-specific questions when on a product page
      else if (this.conversationContext.currentProduct && this.isProductSpecificQuestion(message)) {
        response = this.handleProductSpecificQuestion(message);
      }
      // Check for collection-specific questions when on a collection page
      else if (this.conversationContext.currentCollection && this.isCollectionSpecificQuestion(message)) {
        response = this.handleCollectionSpecificQuestion(message);
      }
      // New arrivals / new products query
      else if (message.includes('new arrival') || message.includes('new product') || 
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
      // Shipping queries - improved to catch misspellings
      else if (message.includes('shipping') || message.includes('delivery') || 
               message.includes('shopping') || message.includes('ship') || 
               message.includes('postage') || message.includes('send')) {
        response = "Our shipping policy:\n\n• Free shipping on orders over $250\n• Standard shipping: 3-5 business days\n• Express shipping: 1-2 business days\n\nShipping costs vary by product and destination country. The exact shipping cost will be calculated and displayed at checkout based on your location and the items in your cart.\n\nDo you have any other questions about shipping?";
      }
  // Greeting and conversational responses
else if (message.includes('hello') || message.includes('hi ') || message === 'hi') {
  const customer = this.shopifyData.customer;
  if (customer && customer.firstName) {
    response = `Hello ${customer.firstName}! How can I help you today?`;
  } else {
    response = "Hello! How can I help you today?";
  }
}
// How are you type questions
else if (message.includes('how are you') || message.includes('how\'s it going') || message.includes('how are things')) {
  const customer = this.shopifyData.customer;
  if (customer && customer.firstName) {
    response = `I'm very well, thank you ${customer.firstName}! Thanks for asking. How can I help you today?`;
  } else {
    response = "I'm very well, thank you! Thanks for asking. How can I help you today?";
  }
}

      // Product queries with images
else if (message.includes('product') || message.includes('item') || message.includes('show me')) {
  const featuredProducts = this.shopifyData.featuredProducts || [];
  if (featuredProducts.length > 0) {
    response = "Here are some of our popular products:<br><br>";
    featuredProducts.slice(0, 3).forEach(product => {
      response += this.formatProductWithImage(product);
    });
    response += "<br>Would you like to see more options?";
    this.lastQuestion = "Would you like to see more options?";
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

    // Store the last response if it contains a question
    if (response.includes('?')) {
      this.lastQuestion = response;
    }

    this.addMessage(response, 'bot');
  }

  handleShowMoreProducts() {
    const featuredProducts = this.shopifyData.featuredProducts || [];
    
    if (featuredProducts.length <= 3) {
      return "I've shown you all the products I have available. Would you like to see our collections instead?";
    }
    
    let response = "Here are more products you might like:<br><br>";
    
    // Show the next 3 products (4-6)
    featuredProducts.slice(3, 6).forEach(product => {
      response += this.formatProductWithImage(product);
    });
    
    if (featuredProducts.length > 6) {
      response += "<br>We have many more products available. Would you like to browse our collections?";
    } else {
      response += "<br>That's all the products I have to show. Would you like to browse our collections?";
    }
    
    return response;
  }

  isProductSpecificQuestion(message) {
    const productQuestionKeywords = [
      'material', 'made from', 'made of', 'fabric', 'color', 'size', 'dimension', 
      'weight', 'feature', 'specification', 'detail', 'warranty', 'this product',
      'this item', 'how does it', 'does it have', 'is it', 'can it'
    ];
    
    return productQuestionKeywords.some(keyword => message.includes(keyword));
  }

  handleProductSpecificQuestion(message) {
    const product = this.conversationContext.currentProduct;
    
    if (!product) return "I'm not sure which product you're referring to. Could you please provide more details?";
    
    // Material question
    if (message.includes('material') || message.includes('made from') || message.includes('made of') || message.includes('fabric')) {
      return `I don't have specific material information for ${product.title}, but you can find all product details on the product page. Would you like me to help you with anything else about this product?`;
    }
    
    // Size/dimensions question
    if (message.includes('size') || message.includes('dimension') || message.includes('measurement')) {
      return `For detailed size information about ${product.title}, please check the product description and specifications on the page. Is there anything specific about the sizing you'd like to know?`;
    }
    
    // General product question
    return `You're looking at ${product.title} which is priced at $${product.price}. All the product specifications are listed on the product page. Is there something specific about this product you'd like to know?`;
  }
  isCollectionSpecificQuestion(message) {
    const collectionQuestionKeywords = [
      'popular', 'best seller', 'bestseller', 'top selling', 'recommend', 'suggestion',
      'this collection', 'these products', 'sort by', 'filter', 'price range'
    ];
    
    return collectionQuestionKeywords.some(keyword => message.includes(keyword));
  }

  handleCollectionSpecificQuestion(message) {
    const collection = this.conversationContext.currentCollection;
    
    if (!collection) return "I'm not sure which collection you're referring to. Could you please provide more details?";
    
    // Popular items question
    if (message.includes('popular') || message.includes('best seller') || message.includes('bestseller') || message.includes('top selling')) {
      return `In our ${collection.title} collection, we have several popular items. While I don't have specific sales data to tell you which is most popular, I can help you browse through the collection. Would you like me to suggest some items from this collection?`;
    }
    
    // Recommendation question
    if (message.includes('recommend') || message.includes('suggestion')) {
      return `For recommendations from the ${collection.title} collection, I'd be happy to help! Could you tell me a bit about what you're looking for? For example, any specific features, price range, or style preferences?`;
    }
    
    // General collection question
    return `You're browsing our ${collection.title} collection which has ${collection.productsCount} products. Is there something specific you're looking for within this collection?`;
  }

  isAffirmative(message) {
  return this.conversationalPatterns.affirmative.some(word => 
    message.includes(word) || message === word
  );
}

isNegative(message) {
  return this.conversationalPatterns.negative.some(word => 
    message.includes(word) || message === word
  );
}

isGreeting(message) {
  return this.conversationalPatterns.greetings.some(greeting => 
    message.includes(greeting) || message === greeting
  );
}

isWellbeingQuestion(message) {
  return this.conversationalPatterns.wellbeing.some(phrase => 
    message.includes(phrase)
  );
}

isThanking(message) {
  return this.conversationalPatterns.thanks.some(phrase => 
    message.includes(phrase)
  );
}

isGoodbye(message) {
  return this.conversationalPatterns.goodbye.some(phrase => 
    message.includes(phrase)
  );
}

normalizeMessage(message) {
  let normalized = message.toLowerCase();
  
  // Replace UK spellings with US spellings for consistency
  for (const [us, uk] of Object.entries(this.spellingVariants)) {
    for (const variant of uk) {
      normalized = normalized.replace(new RegExp(variant, 'g'), us);
    }
  
  return normalized;
}

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
      response = "No problem! What would you like to see instead? I can help you find specific products or collections.";
      break;
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
  console.log("Checking if this is a product search:", message);
  
  // Direct check for "show me products" type queries
  if (message.includes('show me') || message.includes('show some') || 
      (message.includes('product') && !message.includes('specific'))) {
    console.log("Found direct product request");
    return true;
  }
  
  // Check if message contains product category keywords
  for (const [category, synonyms] of Object.entries(this.productSynonyms)) {
    for (const synonym of synonyms) {
      if (message.includes(synonym)) {
        console.log("Found product category match:", synonym);
        return true;
      }
    }
  }
  
  // Check for color-based searches
  const colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'pink', 'orange', 'brown', 'grey', 'gray', 'silver', 'gold'];
  for (const color of colors) {
    if (message.includes(color)) {
      console.log("Found color-based search:", color);
      return true;
    }
  }
  
  // Check for general search patterns
  const searchPatterns = [
    'looking for', 'need', 'want', 'find', 'search', 'do you have', 'any'
  ];
  
  for (const pattern of searchPatterns) {
    if (message.includes(pattern)) {
      console.log("Found search pattern:", pattern);
      return true;
    }
  }
  
  return false;
}

  handleSmartProductSearch(message) {
  console.log("Smart product search for:", message);
  
  // Normalize the message to handle spelling variants
  const normalizedMessage = this.normalizeMessage(message);
  
  // Determine what category they're looking for
  let searchCategory = null;
  let searchSynonyms = [];
  
  for (const [category, synonyms] of Object.entries(this.productSynonyms)) {
    for (const synonym of synonyms) {
      if (normalizedMessage.includes(synonym)) {
        searchCategory = category;
        searchSynonyms = synonyms;
        console.log("Found category match:", category, "from synonym:", synonym);
        break;
      }
    }
    if (searchCategory) break;
  }
  
  // Extract colors
  const colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'purple', 'pink', 'orange', 'brown', 'grey', 'gray', 'silver', 'gold'];
  let searchColor = null;
  
  for (const color of colors) {
    if (normalizedMessage.includes(color)) {
      searchColor = color;
      console.log("Found color match:", color);
      break;
    }
  }
  
  const featuredProducts = this.shopifyData.featuredProducts || [];
  const collections = this.shopifyData.collections || [];
  console.log("Total featured products:", featuredProducts.length);
  
  // If we have a category or color to search for
  if (searchCategory || searchColor) {
    console.log("Searching for products with category:", searchCategory, "color:", searchColor);
    
    // Find products that match the criteria
    const matchingProducts = featuredProducts.filter(product => {
      const title = (product.title || '').toLowerCase();
      const tags = (product.tags || []).map(tag => tag.toLowerCase());
      const type = (product.type || '').toLowerCase();
      
      let matchesCategory = true;
      let matchesColor = true;
      
      // Check category match if specified
      if (searchCategory) {
        matchesCategory = searchSynonyms.some(synonym => 
          title.includes(synonym) || 
          tags.some(tag => tag.includes(synonym)) ||
          type.includes(synonym)
        );
      }
      
      // Check color match if specified
      if (searchColor) {
        matchesColor = title.includes(searchColor) || 
                      tags.some(tag => tag.includes(searchColor));
      }
      
      return matchesCategory && matchesColor;
    });
    
    console.log(`Found ${matchingProducts.length} matching products`);
    
    // Find collections that match the category
    const matchingCollections = collections.filter(collection => {
      const title = collection.title.toLowerCase();
      const handle = collection.handle.toLowerCase();
      
      let matchesCategory = true;
      
      if (searchCategory) {
        matchesCategory = searchSynonyms.some(synonym => 
          title.includes(synonym) || handle.includes(synonym)
        );
      }
      
      return matchesCategory;
    });
    
    let response = "";
    
    if (matchingProducts.length > 0) {
      const categoryText = searchCategory || '';
      const colorText = searchColor ? ` ${searchColor}` : '';
      response = `Great! I found some${colorText} ${categoryText} items for you:<br><br>`;
      
      matchingProducts.slice(0, 3).forEach(product => {
        response += this.formatProductWithImage(product);
      });
      
      if (matchingProducts.length > 3) {
        response += `<br>...and ${matchingProducts.length - 3} more matching items.`;
      }
    } else {
      // If no exact matches found, show all products
      const categoryText = searchCategory ? `${searchCategory} ` : '';
      const colorText = searchColor ? `${searchColor} ` : '';
      
      // Check if we have watches specifically
      if (searchCategory === 'watch') {
        response = `I'm sorry, we don't currently have any watches in stock. Here are some other popular items you might like:<br><br>`;
      } else {
        response = `I couldn't find any specific ${categoryText}${colorText}products, but here are some items you might like:<br><br>`;
      }
      
      featuredProducts.slice(0, 3).forEach(product => {
        response += this.formatProductWithImage(product);
      });
    }
    
    if (matchingCollections.length > 0) {
      if (response) response += "<br><br>";
      response += `We also have collections that might interest you:<br><br>`;
      
      matchingCollections.forEach(collection => {
        const url = this.getCollectionUrl(collection);
        response += `• <strong><a href="${url}" target="_blank">${collection.title}</a></strong> (${collection.productsCount} items)<br>`;
      });
    }
    
    response += "<br>Would you like to see more options or need help with anything specific?";
    this.lastQuestion = "Would you like to see more options?";
    return response;
  }
  
  // If no category or color specified, show featured products
  let response = "Here are some of our popular products:<br><br>";
  
  featuredProducts.slice(0, 3).forEach(product => {
    response += this.formatProductWithImage(product);
  });
  
  response += "<br>Would you like to see more options?";
  this.lastQuestion = "Would you like to see more options?";
  return response;
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
    
    let response = "";
    let hasSaleItems = false;
    
    if (saleProducts.length > 0) {
      hasSaleItems = true;
      response = "Here are some of our items currently on sale:<br><br>";
      
      saleProducts.slice(0, 3).forEach(product => {
        response += this.formatProductWithImage(product);
      });
      
      if (saleProducts.length > 3) {
        response += `<br>...and ${saleProducts.length - 3} more sale items.`;
      }
    }
    
    // Only show collections that actually have products
    let hasCollections = false;
    let collectionsText = "";
    
    if (onSaleCollection && onSaleCollection.productsCount > 0) {
      hasCollections = true;
      const discount = this.getCollectionDiscount(onSaleCollection);
      const url = this.getCollectionUrl(onSaleCollection);
      collectionsText += `• <strong><a href="${url}" target="_blank">On Sale Now</a></strong>: ${discount}% off selected items (${onSaleCollection.productsCount} products)<br>`;
    }
    
    if (finalSaleCollection && finalSaleCollection.productsCount > 0) {
      hasCollections = true;
      const discount = this.getCollectionDiscount(finalSaleCollection);
      const url = this.getCollectionUrl(finalSaleCollection);
      collectionsText += `• <strong><a href="${url}" target="_blank">Final Sale</a></strong>: ${discount}% off items being discontinued (${finalSaleCollection.productsCount} products)<br>`;
    }
    
    if (hasCollections) {
      if (hasSaleItems) {
        response += "<br><br>We also have special sale collections:<br><br>";
      } else {
        response = "We have special sale collections with great discounts:<br><br>";
      }
      response += collectionsText;
    }
    
    if (hasSaleItems || hasCollections) {
      response += "<br>Would you like to see more sale items?";
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
    
    console.log("Page context for contextual message:", pageContext);
    
    // Check page type and show appropriate message
    switch(pageContext.type) {
      case 'product':
        console.log("Product detected for contextual message:", pageContext.product);
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
    if (!product) {
      console.log("No product data available for contextual message");
      return;
    }
    
    console.log("Showing product context message for:", product.title);
    
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
      
      // Make the entire speech bubble clickable to open chat with context
      speechBubble.addEventListener('click', () => {
        const contextMessage = message;
        speechBubble.remove();
        this.openChat(contextMessage);
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

  formatProductWithImage(product) {
    return `<div class="travis-product-recommendation">
      <img src="${product.image || 'https://cdn.shopify.com/s/files/1/0564/5284/1650/files/placeholder-image.jpg'}" alt="${product.title}" class="travis-product-image">
      <div class="travis-product-details">
        <strong><a href="/products/${product.handle}" target="_blank">${product.title}</a></strong><br>
        $${product.price}
      </div>
    </div>`;
  }
}

// Initialize Travis Bot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, starting Travis Bot...');
  window.travisBot = new TravisBot();
});

// Also initialize if the page is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Page already loaded, starting Travis Bot...');
  setTimeout(() => {
    if (!window.travisBot) {
      window.travisBot = new TravisBot();
    }
  }, 1000);
}
