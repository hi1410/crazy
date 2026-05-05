const products = [
  { name: "Wireless Headphones", price: "₹7,999", desc: "Noise-cancelling headphones", image: "https://picsum.photos/80" },
  { name: "Smartwatch", price: "₹12,999", desc: "Fitness tracking smartwatch", image: "https://picsum.photos/80" },
  { name: "Gaming Mouse", price: "₹2,499", desc: "Ergonomic gaming mouse", image: "https://picsum.photos/80" },
  { name: "Laptop Stand", price: "₹1,999", desc: "Adjustable aluminium stand", image: "https://picsum.photos/80" },
  { name: "Keyboard", price: "₹2,999", desc: "Mechanical keyboard", image: "https://picsum.photos/80" },
  { name: "Monitor", price: "₹15,999", desc: "Full HD monitor", image: "https://picsum.photos/80" },
  { name: "Printer", price: "₹8,999", desc: "Laser printer", image: "https://picsum.photos/80" },
  { name: "Tablet", price: "₹19,999", desc: "Android tablet", image: "https://picsum.photos/80" },
  { name: "Camera", price: "₹25,999", desc: "Digital camera", image: "https://picsum.photos/80" },
  { name: "Router", price: "₹2,999", desc: "WiFi router", image: "https://picsum.photos/80" },
  { name: "Speaker", price: "₹4,999", desc: "Bluetooth speaker", image: "https://picsum.photos/80" },
  { name: "Charger", price: "₹999", desc: "Fast charger", image: "https://picsum.photos/80" }
];

const rowsPerPage = 10;
let currentPage = 1;

function displayProducts() {
  const tbody = document.getElementById("product-table-body");
  tbody.innerHTML = "";  //removes previous rows

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const items = products.slice(start, end);

  items.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${p.image}"></td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.desc}</td>
      </tr>
    `;
  });

  const totalPages = Math.ceil(products.length / rowsPerPage);
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages}`;

  const paginationDiv = document.querySelector(".pagination");

  if (products.length <= rowsPerPage) {
    paginationDiv.style.display = "none";
  } else {
    paginationDiv.style.display = "block";
  }

  document.getElementById("prev").disabled = currentPage === 1;
  document.getElementById("next").disabled = currentPage === totalPages;
}

document.getElementById("prev").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
};

document.getElementById("next").onclick = () => {
  if (currentPage < Math.ceil(products.length / rowsPerPage)) {
    currentPage++;
    displayProducts();
  }
};

displayProducts();
  