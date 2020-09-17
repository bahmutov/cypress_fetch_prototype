fetch('/test')
  .then(response => response.json())
  .then(data => {
    console.log('got data', data)
    console.log('data prototype', Object.getPrototypeOf(data))
    document.getElementById("result").innerHTML = String(Object.getPrototypeOf(data) === Object.prototype)
  });
