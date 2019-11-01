
var button = document.getElementById("btn");
button.addEventListener("click", function(){
  var imageElement = document.createElement("img");
  imageElement.setAttribute("id", "predictionImage");
  var divElement = document.createElement("div");
  var paraElem = document.createElement("p");
  divElement.setAttribute("id", "container")
  var file = document.querySelector("input").files[0];
  var reader = new FileReader();
  var goBackButton = document.createElement("button");
  goBackButton.textContent = "Go Back";
  goBackButton.setAttribute("id", "goback");
  reader.addEventListener("load", function(){
    imageElement.src = reader.result;
  }),false;
  if(file){
    reader.readAsDataURL(file);
  }
  var whereToPlaceTheImage = document.getElementById("container");
  if(file){
    paraElem.textContent = "Here is the Image You Uploaded and the predictions are given as: ";
    whereToPlaceTheImage.style.display = "none";
    imageElement.style.height = "500px";
    imageElement.style.width = "500px";
    imageElement.style.display = "block";
    imageElement.style.margin = "auto";
    divElement.style.textAlign = "center";
    divElement.appendChild(paraElem);
    divElement.appendChild(imageElement);
    divElement.style.height  = "700px";
    const model = ml5.imageClassifier('MobileNet', () => console.log("Ready"));
    model.classify(imageElement, (error, results) => {
      if(error){
        console.error(error);
      }else{
        var paraModel = document.createElement("p");
        var u = document.createElement("ul");
        var li1 = document.createElement("li");
        var li2 = document.createElement("li");
        var li3 = document.createElement("li");
        li1.textContent = results[0]["label"] + " with Confidence = " + Math.round(results[0]["confidence"]*100,2) + "%";
        li2.textContent = results[1]["label"] + " with Confidence = " + Math.round(results[1]["confidence"]*100,2) + "%";
        li3.textContent = results[2]["label"] + " with Confidence = " + Math.round(results[2]["confidence"]*100,2) + "%";
        
        u.appendChild(li1);
        u.appendChild(li2);
        u.appendChild(li3);
        divElement.appendChild(paraModel);
        divElement.appendChild(u);
      }
    });
    var anotherPredButton = document.createElement("button");
    anotherPredButton.textContent = "Another Prediction";
    divElement.appendChild(anotherPredButton);
    document.body.appendChild(divElement);
  }else{
    paraElem.textContent = "No Image Uploaded.";
    whereToPlaceTheImage.style.display = "none";
    divElement.style.textAlign = "center";
    divElement.appendChild(paraElem);
    divElement.appendChild(goBackButton);
    document.body.appendChild(divElement);
  }
  divElement.appendChild(paraElem);
  console.log(file);
})