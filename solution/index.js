document.addEventListener("DOMContentLoaded", function() {
    var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.8/xlsx.full.min.js";
    document.head.appendChild(script);
  });
  const input = document.getElementById("inputFile");
  const reader = new FileReader();
  
  reader.onload = (event) => {
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
  
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const ArrayNumerosSolicitud = [];
    rows.forEach( (row) => {
      row.forEach( (cell) => { if (!isNaN(cell) ) { ArrayNumerosSolicitud.push( cell ) } });
    });
  
    ShowNumberOfCredits(ArrayNumerosSolicitud.length)
    DescargaMasivaDocumentos(ArrayNumerosSolicitud);
  };
  input.addEventListener("change", () => {
    if (input.files.length > 0) { reader.readAsBinaryString(input.files[0]) }
  });
  
  
  async function DescargaMasivaDocumentos(ArrayNumerosSolicitud) {
    for await (const NumeroCredito of ArrayNumerosSolicitud) {
      const UsuarioDocumentosEnBuffer = await getUserAttachments(NumeroCredito); 
      
      console.log(UsuarioDocumentosEnBuffer[0].nombre_periodico);
    }
  }
  async function getUserAttachments(InNumeroCredito) {
    const URL = `http://192.168.1.12:4000/${InNumeroCredito}`
    const res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },    
    });
    return await res.json();
  }      

  async function ShowNumberOfCredits(ArrayLength) {
    const node = document.createElement("li");
    const textnode = document.createTextNode( ArrayLength + " Registros cargados" );
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node); 
  }