var dataInInput = document.getElementsByClassName("input-wrapper");

var infocus = function () {
    this.classList.add("contains-data");
};

var notinfocus = function () {
    if (!this.value) this.classList.remove("contains-data");
};

for (var i = 0; i < dataInInput.length; i++) {
    dataInInput[i].addEventListener('focus', infocus, false);
    dataInInput[i].addEventListener('blur', notinfocus, false);
}

/* Select element with guidance from https://www.w3schools.com */
var getSelectList, getSelectTag, containerFirstOption, containerOtherOptions, i, subsequentOptionDiv;

getSelectList = document.querySelector(".selectlist");
getSelectTag = getSelectList.querySelector("select");

// Create a div for the first option. 
containerFirstOption = document.createElement("DIV");
containerFirstOption.setAttribute("class", "first-option");
containerFirstOption.innerHTML = getSelectTag.options[getSelectTag.selectedIndex].innerHTML;
getSelectList.appendChild(containerFirstOption);

// Create div elements for the other options.    
containerOtherOptions = document.createElement("DIV");
containerOtherOptions.setAttribute("class", "selection selection-hide");
for (i = 1; i < getSelectTag.length; i++) {
    subsequentOptionDiv = document.createElement("DIV");
    subsequentOptionDiv.innerHTML = getSelectTag.options[i].innerHTML;
    /* When one of the subsequent options is clicked, select the corresponding option in the original, hidden Select element and change the contents of the visible, first-option div. */
    subsequentOptionDiv.addEventListener("click", function(e) {
        var getHiddenSelect, getFirstOption, getOptionsSameAsSelected, m, n;
        getHiddenSelect = this.parentNode.parentNode.querySelector("select");
        getFirstOption = this.parentNode.previousSibling;
        for (m = 0; m < getHiddenSelect.length; m++) {
          if (getHiddenSelect.options[m].innerHTML == this.innerHTML) {
            getHiddenSelect.selectedIndex = m;
            getFirstOption.innerHTML = this.innerHTML;
            getOptionsSameAsSelected = this.parentNode.getElementsByClassName("same-as-selected");
            for (n = 0; n < getOptionsSameAsSelected.length; n++) {
              getOptionsSameAsSelected[n].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        getFirstOption.click();
    });
containerOtherOptions.appendChild(subsequentOptionDiv);
}

getSelectList.appendChild(containerOtherOptions);

containerFirstOption.addEventListener("click", function(e){
/*when the select box is clicked, close any other select boxes,
and open/close the current select box:*/
e.stopPropagation();
closeSelect(this);
this.nextSibling.classList.toggle("selection-hide");
this.classList.toggle("twirl-arrow");
});


function closeSelect(element) {
    var getPseudoSelect, getFirstOption, i, arrNo = [];
    getPseudoSelect = document.querySelector(".selection");
    getFirstOption = document.querySelector(".first-option");
    
    if (element == getFirstOption) {
        arrNo.push(0)
      } else {
        getFirstOption.classList.remove("twirl-arrow");
      }
    if (arrNo.indexOf(0)) {
        getPseudoSelect.classList.add("selection-hide");
      }

}

document.addEventListener("click", closeSelect); 

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
//document.addEventListener("click", closeAllSelect);


//original
/*var getSelectList, i, j, selElmnt, a, b, c;

getSelectList = document.getElementsByClassName("selectlist");
for (i = 0; i < getSelectList.length; i++) {
  selElmnt = getSelectList[i].getElementsByTagName("select")[0];
  
  a = document.createElement("DIV");
  a.setAttribute("class", "first-option");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  getSelectList[i].appendChild(a);
  
  b = document.createElement("DIV");
  b.setAttribute("class", "selection selection-hide");
  for (j = 1; j < selElmnt.length; j++) {
    
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  getSelectList[i].appendChild(b);
  a.addEventListener("click", function(e) {
      
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("selection-hide");
      this.classList.toggle("twirl-arrow");
  });
}
function closeAllSelect(elmnt) {
  
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("selection");
  y = document.getElementsByClassName("first-option");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("twirl-arrow");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("selection-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect); */
