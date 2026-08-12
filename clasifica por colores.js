const sonido = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_115b9b8d77.mp3");
sonido.volume = 0.2;

const colores = [
"#a8dadc","#f1faee","#e9c46a","#b7e4c7","#cdb4db",
"#ffddd2","#d8e2dc","#e2ece9","#bee1e6","#ffd6a5",
"#caf0f8","#e4c1f9","#d0f4de","#faedcd","#c7f9cc"
];

const emojis = ["⭐","⚽","🚗","❤️","🌙","🍎","🐟","🌸","🧸","🎈","🍋","🚀","🍭","🐢","🦋"];
const niveles = [2,4,6,8,10,15];

let nivel = 0;
let aciertos = 0;
let totalFormas = 0;

const mensajesBuenos=[
"¡Excelente!","¡Muy bien!","¡Genial!","¡Fantástico!",
"¡Lo hiciste!","¡Buen trabajo!","¡Perfecto!","¡Sigue así!"
];

const mensajesMalos=[
"Inténtalo otra vez.","¡Tú puedes!","Busca el mismo color.",
"Casi lo logras.","No pasa nada, intenta nuevamente.",
"Observa con atención.","¡Vamos!"
];

function mezclar(lista){
    let copia=[...lista];
    for(let i=copia.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [copia[i],copia[j]]=[copia[j],copia[i]];
    }
    return copia;
}

function generarColores(cantidad,similitud){
    let lista=[];
    let h=Math.random()*360;
    for(let i=0;i<cantidad;i++){
        let tono=(h+(i*similitud)+Math.random()*6)%360;
        lista.push(`hsl(${tono},75%,72%)`);
    }
    return lista;
}

function iniciarNivel(){
    document.getElementById("mensaje").textContent="";
    aciertos = 0;

    let zonasDiv = document.getElementById("zonas");
    let formasDiv = document.getElementById("formas");

    zonasDiv.innerHTML="";
    formasDiv.innerHTML="";

    let cantidadColores = niveles[nivel];
    totalFormas = cantidadColores;

    document.getElementById("nivel").textContent =
        "Nivel " + (nivel+1) + " • Colores: " + cantidadColores;
    document.getElementById("contador").textContent = "0 / " + totalFormas;
    document.getElementById("progreso").style.width="0%";

    let coloresNivel = mezclar(colores.slice(0, cantidadColores));
    let coloresFormas = mezclar([...coloresNivel]);
    let zonasOrdenadas = mezclar([...coloresNivel]);

    zonasOrdenadas.forEach((color,i)=>{
        let zona = document.createElement("div");
        zona.className="zona";
        zona.style.background=color;
        zona.dataset.color=color;
        zona.ondragover = e => e.preventDefault();

        zona.ondrop = function(e){
            e.preventDefault();
            let colorForma = e.dataTransfer.getData("color");
            let formaID = e.dataTransfer.getData("id");

            if(colorForma === this.dataset.color){
                sonido.currentTime = 0;
                sonido.play();

                this.classList.add("correcto");
                setTimeout(()=> this.classList.remove("correcto"), 450);

                const forma = document.getElementById(formaID);
                if(forma) forma.remove();

                aciertos++;
                document.getElementById("contador").textContent = aciertos + " / " + totalFormas;

                let porcentaje=(aciertos/totalFormas)*100;
                document.getElementById("progreso").style.width = porcentaje + "%";

                let texto = mensajesBuenos[Math.floor(Math.random()*mensajesBuenos.length)];
                document.getElementById("mensaje").textContent = texto;

                if(aciertos === totalFormas){
                    setTimeout(()=>{
                        nivel++;
                        if(nivel < niveles.length){
                            iniciarNivel();
                        }else{
                            document.getElementById("zonas").innerHTML="";
                            document.getElementById("formas").innerHTML="";
                            document.getElementById("nivel").textContent="";
                            document.getElementById("mensaje").textContent="";
                            document.getElementById("pantallaFinal").style.display="flex";
                        }
                    },1000);
                }
            }else{
                let texto = mensajesMalos[Math.floor(Math.random()*mensajesMalos.length)];
                document.getElementById("mensaje").textContent = texto;
                this.classList.add("error");
                setTimeout(()=> this.classList.remove("error"), 400);
            }
        };

        zonasDiv.appendChild(zona);
    });

    coloresFormas.forEach((color,i)=>{
        let forma = document.createElement("div");
        forma.className="forma";
        forma.style.background=color;
        forma.textContent = emojis[i];
        forma.draggable=true;
        forma.id="forma"+Math.random().toString(36).slice(2,10);

        forma.ondragstart = e=>{
            e.dataTransfer.setData("color", color);
            e.dataTransfer.setData("id", forma.id);
        };

        formasDiv.appendChild(forma);
    });
}

iniciarNivel();