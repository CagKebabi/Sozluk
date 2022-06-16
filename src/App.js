import { useState,useEffect } from "react";
import "./App.css";
import txtfile from "./data.txt"
import turkce from "./turkce.txt"
import english from "./english.txt"
// import logo from "./bg1.jpg"

const arrayE = ["Apple", "Fish", "Computer", "Cloth", "Tiger"];
const arrayT = ["elma", "balık", "bilgisayar", "kıyafet", "kaplan"]
const background = ["deneme1.jpeg","deneme2.jpeg","deneme3.jpg"]

function App() {
  const [inputValue, setValue] = useState ("");
  const [cevap, setCevap] = useState ("");
  const [bgIndex, setIndex] = useState(0)

  const ara = (kelime) => {
    fetch(english)
    .then((icerik) => icerik.text())
    .then((data) => {
      const kelimeler = data.split("\n") //Belirtilen ifade satır sonunu ifade eder \n yani burada her satırı bölmüş olduk
      kelimeler.map((data,key) => {
        const bolme = data.split("–")
        console.log(bolme[0])
        if (bolme[0].trim().toLowerCase() == kelime){
          document.getElementById('result').innerHTML += bolme[1]+"<br/>"
        }
      })
    })
    .catch((err) => console.log(err))
  }

  
  // useEffect(() => {
  //  setInterval(() => {
  //   console.log(bgIndex)
  //   const bgImage = background[bgIndex]
  //   document.getElementById('app').style.background = `url(./${bgImage})`
  //   if (bgIndex < background.length-1) {
  //     setIndex(bgIndex+1)
  //   } else {
  //     setIndex(0)
  //   }
    
  //  },15000)
  // });

  return (
    <div id="app" className="app" >
      <div className="container">
         <div className=""> 
         <div>
         </div>
         <div className="texBox-Btn-Container">

         <p className="logo">Techno Soft İngilizce-Türkçe Sözlük</p>
          <input placeholder="Text" className="textBox" type="text" value={inputValue} onChange={(e)  => {
          setCevap("")
          document.getElementById('result').innerHTML=""
          setValue(e.target.value)
          }}/> 
          <button className="button" type="button" onClick={()=>{
            let newText = inputValue.trim()//Boşlukları temizler
            newText = newText.toLowerCase()//küçük harfe çevirir
            newText = newText.replace(".","")//Yazıda nokta varsa ikinci belirttiğimiz karakterle değiştirir
            if (newText[0] == "?") {
              alert("Bana mı soruyorsun!")
            }

            if(newText.indexOf("-") > -1){
              const veri = newText.split("-");
              veri.map(((data,key)=>{
                ara(data)
              }))
            } else {
              ara(newText)
            }
        
          }}><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </div>
        <div className="resultBoxContainer">
          <div className="resultBox"><p id="result" className="result">{cevap}</p></div> 
        </div>
      </div>   
  </div>
  );
}

export default App;
