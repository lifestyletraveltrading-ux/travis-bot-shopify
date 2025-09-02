  generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    let response = '';

    if (this.conversationContext.awaitingConfirmation) {
      if (this.isAffirmative(message)) {
        response = this.handleConfirmation();
      } else if (this.isNegative(message)) {
        response = this.handleRejection();
      } else {
        this.conversationContext.awaitingConfirmation = false;
      }
    }

    if (!response) {
      if (this.conversationContext.currentProduct && this.isProductSpecificQuestion(message)) {
        response = this.handleProductSpecificQuestion(message);
      } else if (this.conversationContext.currentCollection && this.isCollectionSpecificQuestion(message)) {
        response = this.handleCollectionSpecificQuestion(message);
      } else if (message.includes('new arrival') || message.includes('new product') || 
          (message.includes('new') && (message.includes('item') || message.includes('collection')))) {
        response = this.handleNewArrivalsQuery();
      } else if (this.isProductSearch(message)) {
        response = this.handleSmartProductSearch(message);
      } else if (message.includes('sale') || message.includes('discount') || message.includes('deal') || 
               message.includes('on sale') || message.includes('special')) {
        response = this.handleSaleItemsQuery();
      } else if ((message.includes('track') || message.includes('where')) && 
               (message.includes('order') || message.match(/\b\d{4,}\b/))) {
        response = this.handleOrderTracking(message);
      } else if (message.includes('shipping') || message.includes('delivery') || 
               message.includes('shopping') || message.includes('ship') || 
               message.includes('postage') || message.includes('send')) {
        response = this.handleShippingQuery();
      } else if (message.includes('hello') || message.includes('hi ') || message === 'hi') {
        const customer = this.shopifyData.customer;
        if (customer && customer.firstName) {
          response = `Hello ${customer.firstName}! How can I help you today?`;
        } else {
          response = "Hello! How can I help you today?";
        }
      } else if (message.includes('product') || message.includes('item') || message.includes('show me')) {
        const featuredProducts = this.shopifyData.featuredProducts || [];
        if (featuredProducts.length > 0) {
          response = "Here are some of our popular products:\n\n";
          featuredProducts.slice(0, 3).forEach(product => {
            response += `• <strong><a href="/products/${product.handle}" target="_blank">${product.title}</a></strong> - $${product.price}\n`;
          });
          response += "\nWould you like to know more about any of these?";
        } else {
          response = "I'd be happy to help you find products! What type of item are you looking for?";
        }
      } else if (message.includes('cart') || message.includes('checkout')) {
        const cart = this.shopifyData.cart;
        if (cart && cart.itemCount > 0) {
          response = `You have ${cart.itemCount} item(s) in your cart with a total of $${cart.totalPrice}. Ready to checkout or need help with anything else?`;
        } else {
          response = "Your cart is currently empty. Would you like me to help you find some great products to add?";
        }
      } else if (message.includes('collection') || message.includes('category')) {
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
      } else if (message.includes('return') || message.includes('refund')) {
        response = "Our return policy:\n\n• 30-day return window\n• Items must be in original condition\n• Free returns on defective items\n• Return shipping may apply for exchanges\n\nWould you like help starting a return?";
      } else if (message.includes('thank')) {
        response = "You're very welcome! I'm here whenever you need assistance. Happy shopping! 😊";
      } else {
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
    
    if (message.includes('material') || message.includes('made from') || message.includes('made of') || message.includes('fabric')) {
      return `I don't have specific material information for ${product.title}, but you can find all product details on the product page. Would you like me to help you with anything else about this product?`;
    }
    
    if (message.includes('size') || message.includes('dimension') || message.includes('measurement')) {
      return `For detailed size information about ${product.title}, please check the product description and specifications on the page. Is there anything specific about the sizing you'd like to know?`;
    }
    
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
    
    if (message.includes('popular') || message.includes('best seller') || message.includes('bestseller') || message.includes('top selling')) {
      return `In our ${collection.title} collection, we have several popular items. While I don't have specific sales data to tell you which is most popular, I can help you browse through the collection. Would you like me to suggest some items from this collection?`;
    }
    
    if (message.includes('recommend') || message.includes('suggestion')) {
      return `For recommendations from the ${collection.title} collection, I'd be happy to help! Could you tell me a bit about what you're looking for? For example, any specific features, price range, or style preferences?`;
    }
    
    return `You're browsing our ${collection.title} collection which has ${collection.productsCount} products. Is there something specific you're looking for within this collection?`;
  }

  handleShippingQuery() {
    return "Our shipping policy:\n\n• Free shipping on orders over $50\n• Standard shipping: 3-5 business days\n• Express shipping: 1-2 business days\n\nShipping costs vary by product and destination country. The exact shipping cost will be calculated and displayed at checkout based on your location and the items in your cart.\n\nDo you have any other questions about shipping?";
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
    if (this.collectionDiscounts[handle]) {
      return this.collectionDiscounts[handle];
    }
    for (const [key, discount] of Object.entries(this.collectionDiscounts)) {
      if (handle.includes(key)) {
        return discount;
      }
    }
    return 0;
  }

  handleNewArrivalsQuery() {
    this.conversationContext.lastTopic = 'new-arrivals';
    this.conversationContext.lastCollection = 'new-arrivals';
    this.conversationContext.awaitingConfirmation = true;
    this.conversationContext.confirmationType = 'new-arrivals';
    return "Yes, our new products are in our New Arrivals collection and they also have 10% off. Shall I take you there?";
  }

  handleSaleItemsQuery() {
    const onSaleCollection = this.findCollection('on-sale');
    const finalSaleCollection = this.findCollection('final-sale');
    const featuredProducts = this.shopifyData.featuredProducts || [];
    
    const saleProducts = featuredProducts.filter(product => {
      return product.comparePrice && parseFloat(product.comparePrice) > parseFloat(product.price);
    });
    
    let response = "";
    let hasSaleItems = false;
    
    if (saleProducts.length > 0) {
      hasSaleItems = true;
      response = "Here are some of our items currently on sale:\n\n";
      
      saleProducts.slice(0, 3).forEach(product => {
        const discount = Math.round((parseFloat(product.comparePrice) - parseFloat(product.price)) / parseFloat(product.comparePrice) * 100);
        response += `• <strong><a href="/products/${product.handle}" target="_blank">${product.title}</a></strong> - $${product.price} <strike>$${product.comparePrice}</strike> (${discount}% off)\n`;
      });
      
      if (saleProducts.length > 3) {
        response += `\n...and ${saleProducts.length - 3} more sale items.`;
      }
    }
    
    let hasCollections = false;
    let collectionsText = "";
    
    if (onSaleCollection && onSaleCollection.productsCount > 0) {
      hasCollections = true;
      const discount = this.getCollectionDiscount(onSaleCollection);
      const url = this.getCollectionUrl(onSaleCollection);
      collectionsText += `• <strong><a href="${url}" target="_blank">On Sale Now</a></strong>: ${discount}% off selected items (${onSaleCollection.productsCount} products)\n`;
    }
    
    if (finalSaleCollection && finalSaleCollection.productsCount > 0) {
      hasCollections = true;
      const discount = this.getCollectionDiscount(finalSaleCollection);
      const url = this.getCollectionUrl(finalSaleCollection);
      collectionsText += `• <strong><a href="${url}" target="_blank">Final Sale</a></strong>: ${discount}% off items being discontinued (${finalSaleCollection.productsCount} products)\n`;
    }
    
    if (hasCollections) {
      if (hasSaleItems) {
        response += "\n\nWe also have special sale collections:\n\n";
      } else {
        response = "We have special sale collections with great discounts:\n\n";
      }
      response += collectionsText;
    }
    
    if (hasSaleItems || hasCollections) {
      response += "\nWould you like to see more sale items?";
      return response;
    } else {
      return "We don't have any items on sale right now, but we regularly update our promotions! Would you like to see our featured products instead?";
    }
  }

  handleOrderTracking(message) {
    const customer = this.shopifyData.customer;
    const orderNumberMatch = message.match(/\b(\d{4,})\b/);
    const orderNumber = orderNumberMatch ? orderNumberMatch[1] : null;
    
    if (orderNumber) {
      const trackingUrl = `https://lifestyletraveltrading.com.au/apps/parcelpanel?order_number=${orderNumber}`;
      
      if (customer && customer.email) {
        const trackingUrlWithEmail = `${trackingUrl}&email=${encodeURIComponent(customer.email)}`;
        return `I can help you track order #${orderNumber}. <a href="${trackingUrlWithEmail}" target="_blank">Click here to open the tracking page</a> for this order. The page will open in a new tab with your order details.`;
      } else {
        return `I can help you track order #${orderNumber}. <a href="${trackingUrl}" target="_blank">Click here to open the tracking page</a>. You'll need to enter the email address used for this order.`;
      }
    } else if (customer && customer.id) {
      return `Hi ${customer.firstName}! I can help you track your orders. You've placed ${customer.ordersCount} orders with us. To track a specific order, please provide the order number (e.g., "track order 1234"). Or you can <a href="https://lifestyletraveltrading.com.au/account" target="_blank">visit your account page</a> to see all your orders.`;
    } else {
      return "To track your order, please provide your order number (e.g., 'track order 1234'). I'll need both your order number and the email address used for the purchase.";
    }
  }

  isProductSearch(message) {
    for (const [category, synonyms] of Object.entries(this.productSynonyms)) {
      if (synonyms.some(synonym => message.includes(synonym))) {
        return true;
      }
    }
    
    const searchPatterns = [
      'looking for', 'need', 'want', 'find', 'search', 'show me', 'do you have', 'any'
    ];
    
    return searchPatterns.some(pattern => message.includes(pattern));
  }

  handleSmartProductSearch(message) {
    let searchCategory = null;
    let searchSynonyms = [];
    
    for (const [category, synonyms] of Object.entries(this.productSynonyms)) {
      if (synonyms.some(synonym => message.includes(synonym))) {
        searchCategory = category;
        searchSynonyms = synonyms;
        break;
      }
    }
    
    const featuredProducts = this.shopifyData.featuredProducts || [];
    const collections = this.shopifyData.collections || [];
    
    if (searchCategory) {
      const matchingProducts = featuredProducts.filter(product => {
        const title = product.title.toLowerCase();
        const tags = (product.tags || []).map(tag => tag.toLowerCase());
        
        return searchSynonyms.some(synonym => 
          title.includes(synonym) || tags.some(tag => tag.includes(synonym))
        );
      });
      
      const matchingCollections = collections.filter(collection => {
        const title = collection.title.toLowerCase();
        const handle = collection.handle.toLowerCase();
        
        return searchSynonyms.some(synonym => 
          title.includes(synonym) || handle.includes(synonym)
        );
      });
      
      let response = "";
      
      if (matchingProducts.length > 0) {
        response = `Great! I found some ${searchCategory} items for you:\n\n`;
        
        matchingProducts.slice(0, 3).forEach(product => {
          response += `• <strong><a href="/products/${product.handle}" target="_blank">${product.title}</a></strong> - $${product.price}\n`;
        });
        
        if (matchingProducts.length > 3) {
          response += `\n...and ${matchingProducts.length - 3} more ${searchCategory} items.`;
        }
      }
      
      if (matchingCollections.length > 0) {
        if (response) response += "\n\n";
        response += `We also have collections that might interest you:\n\n`;
        
        matchingCollections.forEach(collection => {
          const url = this.getCollectionUrl(collection);
          response += `• <strong><a href="${url}" target="_blank">${collection.title}</a></strong> (${collection.productsCount} items)\n`;
        });
      }
      
      if (response) {
        response += "\n\nWould you like to see more options or need help with anything specific?";
        return response;
      }
    }
    
    return "I'd love to help you find what you're looking for! Could you be more specific about the type of product you need? For example, are you looking for bags, watches, luggage, or something else?";
  }

  showWelcomeMessage() {
    setTimeout(() => {
      const container = document.getElementById('travis-bot-container');
      if (container) {
        container.classList.remove('travis-bot-hidden');
      }
      
      setTimeout(() => {
        if (!this.isOpen) {
          this.showContextualMessage();
        }
      }, 5000);
    }, 1000);
  }

  showContextualMessage() {
    const pageContext = this.shopifyData.pageContext || {};
    
    if (this.isOpen) return;
    
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
        const initialBtn = document.getElementById('travis-bot-initial');
        if (initialBtn) {
          initialBtn.classList.remove('travis-bot-hidden');
        }
    }
  }

  showProductContextMessage(product) {
    if (!product) return;
    const message = `I see you're looking at ${product.title}. Can I help answer any questions about this product?`;
    this.showProactiveMessage(message);
  }

  showCollectionContextMessage(collection) {
    if (!collection) return;
    const message = `Looking for something specific in our ${collection.title} collection? I can help you find the perfect item!`;
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

