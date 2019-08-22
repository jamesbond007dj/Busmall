function saveValue () { 
    var objectString = JSON.stringify(allProducts);
    localStorage.setItem('productkey', objectString);
    
  }
  
  function getValueBack () {
    var storeProducts = localStorage.getItem('productkey');
    if(localStorage.length === 0){
      for (var i=0; i< images.length; i++){
     new Products(images[i]);
     
      }
    } else {
      var parseProduct = JSON.parse(storeProducts);
      for (var i=0; i< storeProducts.length; i++) {
        
        new Products(parseProduct[i].images);
        allProducts[i].name = parseProduct[i].name;
        allProducts[i].votes = parseProduct[i].votes;
        allProducts[i].views = parseProduct[i].views;
      }
      
    }
  }
  