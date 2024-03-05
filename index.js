
const inputText = document.querySelector('.encriptar-texto-input');
const btnEncriptar = document.querySelector('.btn-encriptar');
const btnDesencriptar = document.querySelector('.btn-desencriptar');
const btnCopiar = document.querySelector('.texto-encriptado-btnCopiar');
const textoEncriptadoPResultado = document.querySelector('.texto-encriptado-resultado');

let isEncrypted = false;
const valorFakeLetras = 3; 

btnDesencriptar.disabled =true;


btnEncriptar.addEventListener('click',encriptar);
btnDesencriptar.addEventListener('click',desencriptar);
btnCopiar.addEventListener('click', copiarTexto);


const DiccionarioEncriptador ={
    130 : "é" ,
    144 : "É" ,
    160 : "á",
    161 : "í",
    162 : "ó",
    163 : "ú",
    164 : "ñ",
    165 : "Ñ",
    168 : "¿",
    173 : "¡",
    181 : "Á",
    214 : "Í",
    224 : "Ó",
    233 : "Ú"
}


function obtenerCodigoASCII(diccionario, texto){

    let codigoNuevo=0;

     Object.entries(diccionario).forEach(([key,value])=>{

        if(value.toString() == texto.toString())  codigoNuevo = parseInt(key);        
    });

    if(codigoNuevo ==0) codigoNuevo = parseInt(texto.charCodeAt(0));

    return codigoNuevo;
}




function asignarNuevoValorACaracter(codeASCII){

   let nuevoTexto = "";
   const separador = "*"; //servira para luego separar facilmente los codigos ascii de los caracteres
   const caracterFakeLetras = String.fromCharCode(codeASCII - valorFakeLetras);
 
    //! Indica letras | * separador | codigoASCII | * separador | caracter del codigo ascii
    nuevoTexto = `!&${separador}${codeASCII}${separador}${caracterFakeLetras}#`; 

    return nuevoTexto;
}



function encriptarTexto(texto){

    let newText = "";

    //Recorrer string 
   for(let i=0; i < texto.length; i++){
    
        let codeASCII = 0;

        //Obtener codigo ASCII
        codeASCII = obtenerCodigoASCII(DiccionarioEncriptador,texto[i]);

        //Validar que el caracter sea permitido para el encriptador
        if( ( codeASCII >  31  && codeASCII < 127 )    || // caracteres imprimibles
            ( codeASCII >= 160 && codeASCII <= 165 )   || // caracteres no imprimibles
            codeASCII ==  Object.keys(DiccionarioEncriptador)[0]  ||
            codeASCII ==  Object.keys(DiccionarioEncriptador)[1]  ||
            codeASCII ==  Object.keys(DiccionarioEncriptador)[8]  ||
            codeASCII ==  Object.keys(DiccionarioEncriptador)[9]  ||
            codeASCII ==  Object.keys(DiccionarioEncriptador)[10] ||
            codeASCII ==  Object.keys(DiccionarioEncriptador)[11] ||
            codeASCII ==  Object.keys(DiccionarioEncriptador)[12] ||
            codeASCII ==  Object.keys(DiccionarioEncriptador)[13]
        ){
            newText += asignarNuevoValorACaracter(codeASCII);
        }else{
            console.log(`caracter invalido ${texto[i]}`);
        }

    }
   
    return newText;
}



function encriptar() {

    let textoUsuario =   inputText.value;

    //Valida si el usuario ingreso texto sino devuelve un alert
    if(!textoUsuario){
        alert('Por favor ingresa algun texto');
        return;
    }

    //Se obtiene el nuevo texto encriptado
    const textoEncriptado =  encriptarTexto(textoUsuario)

    // se asigna a la etiqueta que mostrara el resultado de la encriptacion en pantalla
    textoEncriptadoPResultado.textContent = textoEncriptado;

    //se limpia de nuevo el textarea
    inputText.value ="";
    btnDesencriptar.disabled = false;

    //isEncrypted= true;
    
    //isEncrypted ? btnEncriptar.className = 'btn-encriptar-disabled' : btnEncriptar.className = 'btn-encriptar'; 
   
}




function desencritarCodigos(codigos){

    let textoDesencriptado = "";


    codigos.map(codigo=>{
       
        if(codigo > 126){
            
            switch(codigo){ //se validan caracteres especiales no imprimibles
                case "130":
                        textoDesencriptado+= 'é';
                        break;
                case "144":
                        textoDesencriptado+='É';
                        break;
                case "160":
                        textoDesencriptado+= 'á';
                        break;
                case "161":
                        textoDesencriptado+= 'í';
                        break;
                case "162":
                        textoDesencriptado+= 'ó';
                        break;
                case "163":
                        textoDesencriptado+= 'ú';
                        break;
                case "164":
                        textoDesencriptado+='ñ';
                        break;
                case "165":
                        textoDesencriptado+= 'Ñ';
                        break;
                case "168":
                        textoDesencriptado+= '¿';
                        break;
                case "173":
                        textoDesencriptado+= '¡';
                        break;
                case "181":
                        textoDesencriptado+= 'Á';
                        break;
                case "214":
                        textoDesencriptado+= 'Í';
                        break;
                case "224":
                        textoDesencriptado+= 'Ó';
                        break;
                case "233":
                        textoDesencriptado+= 'Ú';
                        break;
            }

        }else{
            textoDesencriptado+= String.fromCharCode(codigo);
        }    
    });

    return textoDesencriptado;
}



function desencriptar(){

    let textoEncriptado = inputText.value;
    if(inputText.value == ""){
        alert("Por favor ingresa el texto a desencriptar.")
    }else{
        let textoDesencriptado = "";

        let arrayCaracteres =  textoEncriptado.split("*");
        let arrayCodigos = arrayCaracteres.filter(codigo=>  !isNaN(codigo))
    
        textoEncriptadoPResultado.textContent = "";
        
        textoDesencriptado = desencritarCodigos(arrayCodigos);
    
        textoEncriptadoPResultado.textContent = textoDesencriptado;
        inputText.value = "";
    
        btnDesencriptar.disabled = true;
        isEncrypted= false;

    }
    
}


async function copiarTexto(){


    try{

        if(textoEncriptadoPResultado.textContent){

            await navigator.clipboard.writeText(textoEncriptadoPResultado.textContent);
        }

        Toastify({
            text: "¡Texto copiado!",
            className: "info",
            gravity:"top",
            
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            

          }).showToast();

       
    }catch(err){
        console.log('Error al copiar: ', err);
        alert('Error no se pudo copiar el texto: ');
    }
   


}









