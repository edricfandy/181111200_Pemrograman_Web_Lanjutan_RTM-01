let form = document.forms.main
let idProduk = form.elements['id_produk'].value
let btnSubmit = form.elements['submit']

if (btnSubmit.textContent == 'UPDATE') {
  form.action = '/products_admin'
  btnSubmit.addEventListener('click', (event) => {
    fetch(`/products_admin/update/${idProduk}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'id_produk': idProduk,
        'nama_produk': form.elements['nama_produk'].value,
        'tipe_produk': form.elements['tipe_produk'].value,
        'panjang_lengan': form.elements['panjang_lengan'].value,
        'merk_produk': form.elements['merk_produk'].value,
        'harga_produk': Number(form.elements['harga_produk'].value),
        'stok_produk': Number(form.elements['stok_produk'].value)
      })
    }).then(response => {
      console.log(response)
    })
  })
}
  
  