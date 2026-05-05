fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById('productList');

    products.forEach(p => {
      const div = document.createElement('div');
      div.innerHTML = p.name + " - ₹" + p.price;
      container.appendChild(div);
    });
  })
  .catch(err => console.log(err));