let form = document.forms.main

let table = document.querySelector('table')

for (let i = 1; i < table.rows.length; i++) {
  table.rows[i].cells[table.rows[i].cells.length - 1].lastElementChild.addEventListener('click', () => {
    let idProduk = table.rows[i].cells[1].textContent
    let pesan = "Anda memilih untuk menghapus data berikut :\n" + `ID Produk\t: ${idProduk}\n`
      + `Nama Produk\t: ${table.rows[i].cells[2].textContent}\n` + `Tipe Produk\t: ${table.rows[i].cells[3].textContent}\n`
      + `Panjang Lengan\t: ${table.rows[i].cells[4].textContent}\n` + `Merk Produk\t: ${table.rows[i].cells[5].textContent}\n`
      + `Harga Produk\t: ${table.rows[i].cells[6].textContent}\n` + `Stok Produk\t: ${table.rows[i].cells[7].textContent}\n`
      + 'Konfirmasi untuk menghapus data ini?'
    if (confirm(pesan)) {
      fetch(`/products_admin/delete/${idProduk}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok)
            alert('Data berhasil dihapus!')
        })
    }
  })
}

/*let rad = document.forms[0].elements['manageType']

rad[0].checked = true

let messageInfo = document.createElement('div')
messageInfo.className = 'col p-2 mb-3 process-need-action'
messageInfo.textContent = 'Pilih salah satu data barang dalam tabel.'

let buttonDelete = document.createElement('button')
buttonDelete.className = 'btn btn-outline-danger col-2 offset-1'
buttonDelete.textContent = 'HAPUS'

for (let i = 0; i < rad.length; i++) {
  rad[i].addEventListener('change', () => {
    arrangeFormAndButton()
    if (rad.value == 'tambah') {
      form.method = "post"
      messageInfo.remove()
      removeSelectedRow()
    }
    else {
      form.method = 'put'
      document.forms[0].after(messageInfo)
    }
  })
}

let table = document.querySelector('table')

for (let i = 1; i < table.rows.length; i++) {
  table.rows[i].addEventListener('click',() => {
    rad[1].checked = true
    messageInfo.remove()
    arrangeFormAndButton()
    removeSelectedRow()
    table.rows[i].className = 'selected-row'
    for (let j = 0; j < form.elements.length; j++) {
      form.elements[j].disabled = false
      if (table.rows[i].cells[j+1])
        form.elements[j].value = table.rows[i].cells[j+1].textContent
    }
  })
}

function removeSelectedRow() {
  let row = document.getElementsByClassName('selected-row')
  for (let i = 0; i < row.length; i++) 
    row[i].classList.remove('selected-row')
}

function arrangeFormAndButton() {
  let btnReset = form.elements['reset']
  let btnSubmit = form.elements['submit']

  if (rad.value == 'tambah') {
    buttonDelete.remove()
    btnSubmit.classList.remove()
    btnSubmit.classname = 'btn btn-outline-success col-2 offset-4'
    btnSubmit.textContent = "TAMBAH"

    for (let i = 0; i < form.length; i++) {
      form.elements[i].disabled = false
      form.elements[i].value = ""
    }
    return
  }

  btnReset.before(buttonDelete)
  btnSubmit.classList.remove()
  btnSubmit.className = 'btn btn-outline-success col-2 offset-2'
  btnSubmit.textContent = "UPDATE"
  for (let i = 0; i < form.length; i++)
    form.elements[i].disabled = true
}*/