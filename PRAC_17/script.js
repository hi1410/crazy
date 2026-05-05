fetch('/api/employees')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('list');

    data.forEach(emp => {
      const div = document.createElement('div');
      div.innerHTML = emp.name + " - " + emp.position;
      list.appendChild(div);
    });
  })
  .catch(err => console.log(err));